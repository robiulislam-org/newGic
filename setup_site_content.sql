-- =====================================================================
-- 🌐 GIC COMPLETE WEBSITE CONTENT MANAGEMENT SYSTEM (CMS) v1.0
-- Run this script in the Supabase SQL Editor to enable full dynamic CMS.
-- Safe to run multiple times.
-- =====================================================================

-- ── 1. CREATE site_content TABLE ─────────────────────────────────────
create table if not exists site_content (
  key         text primary key,
  section     text not null default 'general',
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ── 2. ROW LEVEL SECURITY (RLS) ──────────────────────────────────────
alter table site_content enable row level security;

-- Drop existing policies if any
drop policy if exists "Allow public reads on site_content"   on site_content;
drop policy if exists "Disable public writes on site_content" on site_content;

-- Public can read all site content freely (fast rendering for visitors)
create policy "Allow public reads on site_content"
  on site_content for select
  using (true);

-- Direct client write blocked (writes happen through secure RPC functions)
create policy "Disable public writes on site_content"
  on site_content for insert
  with check (false);

-- ── 3. HELPER: GET ADMIN PASSWORD ────────────────────────────────────
create or replace function _get_admin_password()
returns text
security definer
language plpgsql
as $$
declare
  v_pass text;
begin
  if exists (select 1 from information_schema.tables where table_name = 'admin_config') then
    select value into v_pass from admin_config where key = 'admin_password';
  end if;
  return coalesce(v_pass, 'gicadmin786');
end;
$$;

-- ── 4. RPC: GET ALL SITE CONTENT IN A SINGLE CALL ─────────────────────
create or replace function get_all_site_content()
returns json
security definer
language plpgsql
as $$
declare
  result json;
begin
  select json_object_agg(key, data) into result from site_content;
  return coalesce(result, '{}'::json);
end;
$$;

-- ── 5. RPC: SAVE / UPDATE INDIVIDUAL SECTION ─────────────────────────
create or replace function save_site_content(
  pass_code text,
  p_key text,
  p_section text,
  p_data jsonb
)
returns json
security definer
language plpgsql
as $$
declare
  expected_password text;
begin
  expected_password := _get_admin_password();
  if pass_code != expected_password then
    return json_build_object('success', false, 'message', 'Unauthorized: Invalid password');
  end if;

  insert into site_content (key, section, data, updated_at)
  values (p_key, p_section, p_data, now())
  on conflict (key) do update
  set section    = excluded.section,
      data       = excluded.data,
      updated_at = now();

  return json_build_object('success', true, 'key', p_key, 'updated_at', now());
end;
$$;

-- ── 6. RPC: BULK SAVE ALL SITE CONTENT (BACKUP RESTORE) ───────────────
create or replace function bulk_save_site_content(
  pass_code text,
  p_items jsonb
)
returns json
security definer
language plpgsql
as $$
declare
  expected_password text;
  elem record;
begin
  expected_password := _get_admin_password();
  if pass_code != expected_password then
    return json_build_object('success', false, 'message', 'Unauthorized: Invalid password');
  end if;

  for elem in select * from jsonb_each(p_items)
  loop
    insert into site_content (key, section, data, updated_at)
    values (elem.key, elem.key, elem.value, now())
    on conflict (key) do update
    set data       = excluded.data,
        updated_at = now();
  end loop;

  return json_build_object('success', true, 'count', (select count(*) from jsonb_each(p_items)));
end;
$$;

-- ── 7. SEED INITIAL CONTENT ──────────────────────────────────────────

-- General & Branding
insert into site_content (key, section, data)
values (
  'general',
  'general',
  '{
    "site_name": "Global Islamic Care",
    "site_sub": "Online Quran Teachers & Platform",
    "logo_url": "logo.jpg",
    "favicon_url": "favicon.png",
    "phone_primary": "+880 1733-017521",
    "phone_secondary": "+880 1712-345678",
    "whatsapp_number": "8801733017521",
    "whatsapp_default_msg": "আসসালামু আলাইকুম! আমি Global Islamic Care-এ কোরআন শিক্ষক ও ক্লাস সম্পর্কে বিস্তারিত জানতে চাই।",
    "email": "globalislamiccare@gmail.com",
    "address": "ঢাকা, বাংলাদেশ (বিশ্বব্যাপী অনলাইন শিক্ষক প্ল্যাটফর্ম)",
    "office_hours": "শনি – বৃহস্পতি: সকাল ৯:০০ – রাত ১০:০০",
    "social_facebook": "https://facebook.com/globalislamiccare",
    "social_youtube": "https://youtube.com/@globalislamiccare",
    "social_telegram": "https://t.me/globalislamiccare",
    "social_instagram": "",
    "social_tiktok": "",
    "announcement_enabled": false,
    "announcement_text": "✨ দেশ-বিদেশের অভিজ্ঞ হাফেজ ও আলেম শিক্ষকদের সাথে ফ্রি ট্রায়াল ক্লাস বুক করুন!",
    "announcement_link": "teachers.html"
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Hero
insert into site_content (key, section, data)
values (
  'hero',
  'hero',
  '{
    "badge": "বিশ্বস্ত কোরআন শিক্ষক প্ল্যাটফর্ম",
    "title_line1": "পছন্দের কোরআন শিক্ষক",
    "title_line2": "খুঁজুন ও শিখুন",
    "arabic_ayah": "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    "description": "দেশ-বিদেশের অভিজ্ঞ হাফেজ ও আলেম শিক্ষকদের প্রোফাইল, ডেমো তেলাওয়াত ও ফি দেখে সরাসরি পছন্দের শিক্ষক বেছে নিন। আপনার সুবিধাজনক সময়ে ঘরে বসে শিখুন সহীহ কোরআন।",
    "wa_btn_text": "🔍 শিক্ষক খুঁজুন →",
    "courses_btn_text": "🎓 শিক্ষক হিসেবে আবেদন",
    "points": [
      "১০০% ভেরিফাইড সনদপ্রাপ্ত শিক্ষকবৃন্দ",
      "ফ্রি ট্রায়াল ক্লাস করার বিশেষ সুবিধা",
      "পছন্দমতো সময় ও সাশ্রয়ী নমনীয় ফি",
      "মা-বোন ও শিশুদের জন্য অভিজ্ঞ শিক্ষিকা"
    ],
    "booking_title": "ফ্রি ট্রায়াল ক্লাস রিকোয়েস্ট",
    "booking_sub": "পছন্দের শিক্ষক বাছাই ও পরামর্শের জন্য",
    "booking_btn_text": "💬 WhatsApp-এ পরামর্শ নিন",
    "booking_guarantee": "✓ সম্পূর্ণ বিনামূল্যে · ✓ কোনো বাধ্যবাধকতা নেই"
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Ticker
insert into site_content (key, section, data)
values (
  'ticker',
  'ticker',
  '{
    "items": [
      "হাফেজ ও আলেম শিক্ষকবৃন্দ",
      "দেশ-বিদেশের বহুভাষী শিক্ষক",
      "১-অন-১ লাইভ ব্যক্তিগত ক্লাস",
      "পছন্দমতো সময় ও নমনীয় ফি",
      "বিশ্বের যেকোনো দেশ থেকে",
      "শিশু, নারী ও পুরুষ সবার জন্য",
      "ফ্রি ট্রায়াল ক্লাসের সুবিধা",
      "ভেরিফাইড শিক্ষক প্রোফাইল"
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Why Us
insert into site_content (key, section, data)
values (
  'why_us',
  'why_us',
  '{
    "label": "কেন Global Islamic Care?",
    "title": "বিশ্বস্ত শিক্ষক প্ল্যাটফর্মে কেন শিখবেন?",
    "subtitle": "সনদপ্রাপ্ত শিক্ষক, ডেমো তেলাওয়াত ও ভিডিও প্রোফাইল এবং সরাসরি ১-অন-১ লাইভ ক্লাসের সুবিধা।",
    "cards": [
      { "id": 1, "icon": "🎓", "title": "যাচাইকৃত শিক্ষকবৃন্দ", "desc": "আমাদের সকল শিক্ষক সনদপ্রাপ্ত ও NID যাচাইকৃত — তাজউইদে দক্ষ এবং আন্তর্জাতিক মানের পাঠদানে অভিজ্ঞ।" },
      { "id": 2, "icon": "🌍", "title": "যেকোনো দেশ থেকে", "desc": "বাংলাদেশ, ইউকে, সৌদি আরব, মালয়েশিয়া বা বিশ্বের যেকোনো প্রান্ত থেকে ক্লাস করুন — শুধু ইন্টারনেট থাকলেই হবে।" },
      { "id": 3, "icon": "🗣️", "title": "বহুভাষী শিক্ষক ও পাঠদান", "desc": "দেশ-বিদেশের অভিজ্ঞ শিক্ষকদের সাথে বাংলা, English, আরবি বা উর্দুতে আপনার পছন্দের ভাষায় ক্লাস করার সুযোগ।" },
      { "id": 4, "icon": "👨‍👩‍👧‍👦", "title": "পরিবারের সকলের জন্য", "desc": "ছোট সোনামণি থেকে শুরু করে মা-বোন ও বয়স্কদের জন্য রয়েছে আলাদা আলাদা অভিজ্ঞ শিক্ষক ও শিক্ষিকা।" },
      { "id": 5, "icon": "❤️", "title": "কোরআনের প্রতি ভালোবাসা", "desc": "আমরা চেষ্টা করি যেন আপনার ও আপনার সন্তানের মনে কোরআনের প্রতি গভীর ভালোবাসা ও সহীহ তেলাওয়াতের আগ্রহ তৈরি হয়।" },
      { "id": 6, "icon": "📅", "title": "নমনীয় সময় ও ফি", "desc": "শিক্ষকের সাথে আলোচনা করে আপনার সুবিধাজনক দিন, সময় ও সাশ্রয়ী মাসিক ফিতে ক্লাস শুরু করতে পারবেন।" }
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Methodology
insert into site_content (key, section, data)
values (
  'methodology',
  'methodology',
  '{
    "label": "পাঠদানের বিষয়সমূহ",
    "title": "পছন্দের বিষয়ে বিশেষজ্ঞ শিক্ষক বেছে নিন",
    "subtitle": "শিশু থেকে বয়স্ক — প্রতিটি বিষয়ের জন্য আমাদের রয়েছে আলাদা আলাদা অভিজ্ঞ শিক্ষকবৃন্দ।",
    "cards": [
      {
        "id": 1,
        "icon": "👶",
        "title": "👶 নূরানী কায়দা ও আমপারা",
        "desc": "হরফ চেনা, সঠিক মাখরাজ ও ছোট ছোট সূরা দিয়ে আনন্দের সাথে শিশুদের কোরআন শিক্ষার ভিত্তি তৈরি।",
        "highlight": "✓ সহজে ও আনন্দদায়ক পদ্ধতিতে পাঠদান"
      },
      {
        "id": 2,
        "icon": "📖",
        "title": "📖 সহীহ তেলাওয়াত ও তাজউইদ",
        "desc": "তাজউইদের সকল নিয়ম মেনে মিষ্টি ও সুন্দর সুরে শুদ্ধ কোরআন তেলাওয়াত শিক্ষা।",
        "highlight": "✓ সহীহ মাখরাজ ও আন্তর্জাতিক তাজউইদ নিয়ম"
      },
      {
        "id": 3,
        "icon": "🕌",
        "title": "🕌 হিফজুল কোরআন প্রোগ্রাম",
        "desc": "হাফেজ শিক্ষকের নিবিড় তত্ত্বাবধানে সম্পূর্ণ কোরআন মুখস্থ ও নিয়মিত রিভিশন (দৌর)।",
        "highlight": "✓ ১-অন-১ নিবিড় মনিটরিং ও নিয়মিত রিভিশন"
      }
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Process
insert into site_content (key, section, data)
values (
  'process',
  'process',
  '{
    "label": "কিভাবে শুরু করবেন",
    "title": "মাত্র ৩টি সহজ ধাপে ক্লাস শুরু করুন",
    "subtitle": "শিক্ষক নির্বাচন থেকে সরাসরি ক্লাস শুরু — পুরো প্রক্রিয়া সহজ এবং ঝামেলামুক্ত।",
    "steps": [
      { "num": "১", "title": "শিক্ষক পছন্দ করুন", "desc": "শিক্ষকদের প্রোফাইল, যোগ্যতা, ডেমো তেলাওয়াত ও ফি দেখে পছন্দের শিক্ষক বেছে নিন।" },
      { "num": "২", "title": "ফ্রি ট্রায়াল বুক করুন", "desc": "শিক্ষকের সাথে সুবিধাজনক সময়ে সম্পূর্ণ ফ্রিতে ১টি ট্রায়াল ক্লাস করে নিশ্চিত হোন।" },
      { "num": "৩", "title": "নিয়মিত পড়া শুরু!", "desc": "শিক্ষকের সাথে ক্লাস শিডিউল ও ফি চূড়ান্ত করে নিয়মিত লাইভ ক্লাসে অংশ নিন।" }
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Paid Courses
insert into site_content (key, section, data)
values (
  'paid_courses',
  'paid_courses',
  '{
    "label": "শিক্ষক ক্যাটাগরি",
    "title": "বিষয়ভিত্তিক অভিজ্ঞ কোরআন শিক্ষকবৃন্দ",
    "subtitle": "আপনার প্রয়োজন অনুযায়ী শিক্ষক প্রোফাইল ও ডেমো দেখে সরাসরি বেছে নিন।",
    "courses": [
      {
        "id": 1,
        "theme": "blue",
        "emoji": "👶",
        "title": "নূরানী কায়দা ও আমপারা",
        "tagline": "বেসিক থেকে সহীহ পড়া পর্যন্ত",
        "badge": "জনপ্রিয়",
        "admission_fee": "",
        "old_price": "",
        "discount": "",
        "price": "শিক্ষকের প্রোফাইল অনুযায়ী",
        "period": "/মাসিক ফি",
        "features": [
          "হরফ চেনা থেকে শুরু — একেবারে বেসিক",
          "ছোট সোনামণি ও নতুনদের জন্য আদর্শ",
          "সহীহ মাখরাজ ও সুন্দর উচ্চারণ শিক্ষা",
          "১-অন-১ পার্সোনাল লাইভ ক্লাস",
          "পছন্দমতো দিন ও সুবিধাজনক সময়ে ক্লাস"
        ],
        "btn_text": "শিক্ষক ডিরেক্টরি দেখুন →",
        "wa_message": "আসসালামু আলাইকুম! আমি নূরানী কায়দা ও আমপারা বিষয়ে শিক্ষক খুঁজতে চাই।"
      },
      {
        "id": 2,
        "theme": "gold",
        "emoji": "📖",
        "title": "সহীহ তেলাওয়াত ও তাজউইদ",
        "tagline": "শুদ্ধ উচ্চারণ ও মিষ্টি সুরে তেলাওয়াত",
        "badge": "সেরা পছন্দ",
        "admission_fee": "",
        "old_price": "",
        "discount": "",
        "price": "শিক্ষকের প্রোফাইল অনুযায়ী",
        "period": "/মাসিক ফি",
        "features": [
          "তাজউইদের সকল নিয়ম বিস্তারিত শিক্ষা",
          "মাখরাজ ও সিফাত সহ শুদ্ধ উচ্চারণ",
          "শিশু, কিশোর ও বয়স্ক সবার জন্য উপযুক্ত",
          "১-অন-১ লাইভ ক্লাসে সরাসরি সংশোধন",
          "পছন্দের ভাষায় (বাংলা/English/আরবি) ক্লাস"
        ],
        "btn_text": "শিক্ষক ডিরেক্টরি দেখুন →",
        "wa_message": "আসসালামু আলাইকুম! আমি তাজউইদ ও কেরাত বিষয়ে শিক্ষক খুঁজতে চাই।"
      },
      {
        "id": 3,
        "theme": "teal",
        "emoji": "🕌",
        "title": "হিফজুল কোরআন প্রোগ্রাম",
        "tagline": "সম্পূর্ণ কোরআন হিফজ ও দৌর",
        "badge": "বিশেষ প্রোগ্রাম",
        "admission_fee": "",
        "old_price": "",
        "discount": "",
        "price": "শিক্ষকের প্রোফাইল অনুযায়ী",
        "period": "/মাসিক ফি",
        "features": [
          "অভিজ্ঞ হাফেজ শিক্ষকের নিবিড় তত্ত্বাবধান",
          "দৈনিক ছবক ও নিয়মিত রিভিশন (দৌর)",
          "সহীহ তাজউইদ সহ কোরআন হিফজ",
          "ব্যক্তিগত গতি অনুযায়ী শেখার সুবিধা",
          "ফ্রি ট্রায়াল ও কাউন্সেলিং সেশন"
        ],
        "btn_text": "শিক্ষক ডিরেক্টরি দেখুন →",
        "wa_message": "আসসালামু আলাইকুম! আমি হিফজুল কোরআন বিষয়ে শিক্ষক খুঁজতে চাই।"
      }
    ],
    "family_offer": {
      "emoji": "👨‍👩‍👧‍👦",
      "title": "পারিবারিক ক্লাসের সুবিধা",
      "desc": "একই পরিবারের একাধিক সদস্য সুবিধাজনক সময়ে আলাদা বা একসাথে ক্লাস করার জন্য শিক্ষকদের সাথে আলোচনা করে শিডিউল ঠিক করতে পারেন।",
      "btn_text": "💬 শিক্ষক বাছাইয়ে সহায়তা নিন",
      "wa_message": "আসসালামু আলাইকুম! আমি পরিবারের সদস্যদের জন্য শিক্ষক বাছাইয়ে পরামর্শ চাই।"
    }
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- FAQ
insert into site_content (key, section, data)
values (
  'faq',
  'faq',
  '{
    "label": "সাধারণ জিজ্ঞাসা",
    "title": "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    "items": [
      { "q": "আমি কীভাবে আমার পছন্দের শিক্ষক খুঁজে পাবো?", "a": "আমাদের ''শিক্ষক ডিরেক্টরি'' পেজে গিয়ে বিষয় (নূরানী, তাজউইদ, হিফজ), শিক্ষক টাইপ (পুরুষ শিক্ষক / মহিলা শিক্ষিকা), দেশ ও ভাষা অনুযায়ী ফিল্টার করে ডেমো তেলাওয়াত ও প্রোফাইল দেখে খুব সহজেই শিক্ষক বেছে নিতে পারবেন।" },
      { "q": "শিক্ষকের মাসিক ফি কীভাবে নির্ধারিত হয়?", "a": "আমাদের প্ল্যাটফর্মে শিক্ষকরা তাঁদের নিজস্ব যোগ্যতা ও অভিজ্ঞতা অনুযায়ী ফি নির্ধারণ করেন। প্রতিটি শিক্ষকের প্রোফাইলে ফি উল্লেখ থাকে এবং আপনি সরাসরি শিক্ষকের সাথে আলোচনা করেও ফি নির্ধারণ করতে পারেন।" },
      { "q": "ফ্রি ট্রায়াল ক্লাস কীভাবে করা যাবে?", "a": "যেকোনো শিক্ষকের প্রোফাইলে গিয়ে ''ফ্রি ট্রায়াল রিকোয়েস্ট'' পাঠালে সরাসরি শিক্ষকের সাথে আপনার সমন্বয় করে দেওয়া হবে এবং একটি ফ্রি ট্রায়াল ক্লাসে অংশ নিতে পারবেন।" },
      { "q": "ক্লাস কীভাবে পরিচালিত হয়?", "a": "ক্লাসগুলো Zoom অথবা Google Meet-এর মাধ্যমে ১-অন-১ লাইভ অনুষ্ঠিত হয়। শিক্ষক ও শিক্ষার্থী সরাসরি স্ক্রিন শেয়ার করে পড়তে পারেন।" },
      { "q": "বিদেশ থেকে কি পড়া সম্ভব?", "a": "হ্যাঁ, বিশ্বের যেকোনো দেশ (UK, USA, কানাডা, মধ্যপ্রাচ্য, ইউরোপ ইত্যাদি) থেকে আপনার স্থানীয় সুবিধাজনক সময় অনুযায়ী অনলাইনে ১-অন-১ লাইভ ক্লাসে অংশ নিতে পারবেন।" },
      { "q": "আমি একজন শিক্ষক, আমি কীভাবে যুক্ত হতে পারি?", "a": "উপরে ''শিক্ষক হিসেবে যুক্ত হোন'' বাটনে ক্লিক করে আপনার যোগ্যতা, NID ও প্রয়োজনীয় তথ্য দিয়ে সম্পূর্ণ ফ্রিতে আবেদন করতে পারবেন।" }
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Digital Library
insert into site_content (key, section, data)
values (
  'library',
  'library',
  '{
    "label": "ডিজিটাল লাইব্রেরি",
    "title": "ইসলামিক বই ও কিতাবসমূহ",
    "subtitle": "বিনামূল্যে কুরআন, কায়দা ও ইসলামিক কিতাব অনলাইনে পড়ুন ও ডাউনলোড করুন।",
    "books": [
      {
        "id": 1,
        "title": "১৫ লাইন হাফেজী কুরআন শরীফ (ইমদাদিয়া)",
        "category": "কুরআন শরীফ",
        "cover": "📖",
        "desc": "আন্তর্জাতিক ১৫ লাইনের ইমদাদিয়া হাফেজী কোরআন শরীফ। ১১৪টি সূরা ও ৩০ পারা সমন্বিত।",
        "pdf_url": "Emdadia-Hafezi-Quran.pdf",
        "pages": "৬১১ পৃষ্ঠা",
        "language": "আরবি",
        "is_featured": true
      },
      {
        "id": 2,
        "title": "আমপারা (নাদিয়াতুল কায়দা সংবলিত)",
        "category": "কায়দা ও আমপারা",
        "cover": "📗",
        "desc": "সহজ তাজবিদ শেখার নাদিয়াতুল কায়দা ও ৩০তম পারা। শিশু ও নতুন শিক্ষার্থীদের জন্য আদর্শ।",
        "pdf_url": "Ampara_Nadiatul.pdf",
        "pages": "৬৪ পৃষ্ঠা",
        "language": "বাংলা ও আরবি",
        "is_featured": true
      },
      {
        "id": 3,
        "title": "নূরানী পদ্ধতিতে কুরআন শিক্ষা",
        "category": "কুরআন শিক্ষা",
        "cover": "📘",
        "desc": "সহজ নূরানী নিয়মে দ্রুত কুরআন শেখার পূর্ণাঙ্গ নির্দেশিকা ও নিয়মাবলী।",
        "pdf_url": "Nurani Podhotite Quran Shikkha.pdf",
        "pages": "৪৮ পৃষ্ঠা",
        "language": "বাংলা ও আরবি",
        "is_featured": true
      },
      {
        "id": 4,
        "title": "তালাওয়াত কায়দা (Tilawat Qaida)",
        "category": "তাজউইদ ও কায়দা",
        "cover": "📙",
        "desc": "সহীহ মাখরাজ ও তাজউইদ অনুশীলনের জন্য অনন্য কিতাব।",
        "pdf_url": "Tilawat Qaida.pdf",
        "pages": "৩২ পৃষ্ঠা",
        "language": "বাংলা ও আরবি",
        "is_featured": false
      },
      {
        "id": 5,
        "title": "Norani Qaida (English Edition)",
        "category": "English Qaida",
        "cover": "🌍",
        "desc": "Complete Norani Qaida with English instructions for overseas students and children.",
        "pdf_url": "norani-qaida-english.pdf",
        "pages": "৪০ পৃষ্ঠা",
        "language": "English & Arabic",
        "is_featured": false
      }
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- CTA Banners
insert into site_content (key, section, data)
values (
  'cta',
  'cta',
  '{
    "title": "আজই আপনার পছন্দের শিক্ষকের সাথে কোরআন শিক্ষা শুরু করুন",
    "desc": "বিশ্বের যেকোনো প্রান্ত থেকে অভিজ্ঞ কোরআন শিক্ষকদের প্রোফাইল দেখে সরাসরি ফ্রি ট্রায়াল বুক করুন।",
    "btn_text": "🔍 শিক্ষক খুঁজুন ও ডেমো নিন",
    "phone": "+880 1733-017521"
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- About Us
insert into site_content (key, section, data)
values (
  'about',
  'about',
  '{
    "title": "আমাদের সম্পর্কে",
    "subtitle": "Global Islamic Care বিশ্বের বিভিন্ন প্রান্তের শিক্ষার্থী ও অভিজ্ঞ শিক্ষকদের মাঝে একটি নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম।",
    "story": "আমাদের লক্ষ্য বিশ্বব্যাপী মুসলিমদের কাছে বিশুদ্ধ কোরআনের শিক্ষা সহজে পৌঁছে দেওয়া। দেশ-বিদেশের বিভিন্ন ভাষাভাষী অভিজ্ঞ ও যোগ্য শিক্ষকদের প্রোফাইল ও ডেমো দেখে শিক্ষার্থীরা সরাসরি পছন্দের শিক্ষকের কাছে ১-অন-১ লাইভ ক্লাসে কোরআন শিখতে পারেন।",
    "mission": "প্রতিটি ঘরে ঘরে সহীহ শুদ্ধ কোরআনের শিক্ষা পৌঁছে দেওয়া এবং যোগ্য শিক্ষকদের জন্য বিশ্বমানের সম্মানজনক শিক্ষকতার সুযোগ তৈরি করা।",
    "vision": "বিশ্বের সবচেয়ে বিশ্বস্ত ও আধুনিক অনলাইন ইসলামিক টিচার প্ল্যাটফর্ম ও শিক্ষাকেন্দ্র হিসেবে শিক্ষার্থীদের দ্বীনি শিক্ষায় সহায়তা করা।",
    "stats": [
      { "num": "৫,০০০+", "label": "সফল শিক্ষার্থী" },
      { "num": "১০০+", "label": "যোগ্য ও অভিজ্ঞ শিক্ষক" },
      { "num": "২০+", "label": "দেশ থেকে শিক্ষার্থী" },
      { "num": "৯৮%", "label": "সন্তুষ্টি হার" }
    ]
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Contact Info
insert into site_content (key, section, data)
values (
  'contact',
  'contact',
  '{
    "title": "যোগাযোগ করুন",
    "subtitle": "শিক্ষক বাছাই বা যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।",
    "phone1": "+880 1733-017521",
    "phone2": "+880 1712-345678",
    "whatsapp": "+880 1733-017521",
    "email": "globalislamiccare@gmail.com",
    "address": "ঢাকা, বাংলাদেশ (অনলাইন বিশ্বব্যাপী সেবা)",
    "hours": "প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত",
    "map_embed_url": ""
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Policies
insert into site_content (key, section, data)
values (
  'policies',
  'policies',
  '{
    "privacy_policy": "Global Islamic Care-এ আমরা শিক্ষার্থী ও শিক্ষক উভয়ের তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করি। আপনার নাম, ফোন নম্বর, ইমেইল বা ব্যক্তিগত তথ্য শুধুমাত্র ক্লাস ও অ্যাকাডেমিক যোগাযোগের জন্য ব্যবহৃত হয় এবং কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
    "payment_policy": "শিক্ষক ও শিক্ষার্থী ট্রায়াল ক্লাসের মাধ্যমে পারস্পরিক সম্মতি গ্রহণের পর মাসিক ফি নির্ধারিত হয়। কোনো শিক্ষক ক্লাস মিস করলে মেকআপ ক্লাস অথবা ওই ক্লাসের ফি সমন্বয় নিশ্চিত করা হয়।",
    "terms_conditions": "সকল শিক্ষার্থী ও শিক্ষককে ক্লাসের সময়সূচি মেনে চলতে হবে। পারস্পরিক বোঝাপড়ার মাধ্যমে সুবিধাজনক সময়ে ১-অন-১ লাইভ ক্লাস সম্পন্ন করতে হবে।"
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;

-- Footer
insert into site_content (key, section, data)
values (
  'footer',
  'footer',
  '{
    "about_text": "Global Islamic Care — দেশ ও বিদেশের শিক্ষার্থীদের জন্য বিশ্বস্ত অনলাইন কোরআন শিক্ষক প্ল্যাটফর্ম।",
    "copyright": "© ২০২৬ Global Islamic Care. সর্বস্বত্ব সংরক্ষিত।",
    "developer_credit": "Powered by Global Islamic Care Tech"
  }'::jsonb
)
on conflict (key) do update set data = excluded.data;
