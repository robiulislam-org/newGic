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
    "site_sub": "Quran Learning Online",
    "logo_url": "logo.jpg",
    "favicon_url": "favicon.png",
    "phone_primary": "+880 1733-017521",
    "phone_secondary": "+880 1712-345678",
    "whatsapp_number": "8801733017521",
    "whatsapp_default_msg": "আসসালামু আলাইকুম! আমি Global Islamic Care সম্পর্কে বিস্তারিত জানতে চাই।",
    "email": "globalislamiccare@gmail.com",
    "address": "ঢাকা, বাংলাদেশ (অনলাইন বিশ্বব্যাপী পাঠদান)",
    "office_hours": "শনি – বৃহস্পতি: সকাল ৯:০০ – রাত ১০:০০",
    "social_facebook": "https://facebook.com/globalislamiccare",
    "social_youtube": "https://youtube.com/@globalislamiccare",
    "social_telegram": "https://t.me/globalislamiccare",
    "social_instagram": "",
    "social_tiktok": "",
    "announcement_enabled": false,
    "announcement_text": "🌙 পবিত্র মাহে রমজান উপলক্ষে সকল কোর্সে বিশেষ ছাড় চলছে! সীমিত আসন।",
    "announcement_link": "#courses"
  }'::jsonb
)
on conflict (key) do nothing;

-- Hero
insert into site_content (key, section, data)
values (
  'hero',
  'hero',
  '{
    "badge": "ভর্তি চলছে",
    "title_line1": "কোরআনের আলোয়",
    "title_line2": "জীবন গড়ুন",
    "arabic_ayah": "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    "description": "দেশ-বিদেশের অভিজ্ঞ শিক্ষকদের সাথে সহীহ শুদ্ধ কোরআন শিক্ষা। শিশু থেকে বয়স্ক — পরিবারের সকলের জন্য আপনার পছন্দের ভাষায় ঘরে বসে শিখুন।",
    "wa_btn_text": "💬 WhatsApp করুন",
    "courses_btn_text": "কোর্স দেখুন →",
    "points": [
      "সুবিধাজনক দিন ও সময়ে ক্লাস",
      "কোরআন ও সুন্নাহর আদর্শে চরিত্র গঠন",
      "একই পরিবারের ২-৩ জন একসাথে শেখার সুবিধা",
      "পছন্দের ভাষায় পাঠদানের সুযোগ"
    ],
    "booking_title": "ফ্রি পরামর্শ বুক করুন",
    "booking_sub": "সম্পূর্ণ বিনামূল্যে · কোনো বাধ্যবাধকতা নেই",
    "booking_btn_text": "💬 WhatsApp-এ পরামর্শ নিন",
    "booking_guarantee": "✓ সম্পূর্ণ বিনামূল্যে · ✓ কোনো বাধ্যবাধকতা নেই"
  }'::jsonb
)
on conflict (key) do nothing;

-- Ticker
insert into site_content (key, section, data)
values (
  'ticker',
  'ticker',
  '{
    "items": [
      "অভিজ্ঞ শিক্ষকবৃন্দ",
      "দেশ-বিদেশের বহুভাষী শিক্ষক",
      "কোরআন ও সুন্নাহর আদর্শ",
      "নৈতিক চরিত্র গঠন",
      "বিশ্বের যেকোনো দেশ থেকে",
      "শিশু থেকে বয়স্ক সবার জন্য",
      "পরিবারের ২-৩ জন একসাথে শেখার সুবিধা",
      "ফ্রি কাউন্সেলিং সেশন"
    ]
  }'::jsonb
)
on conflict (key) do nothing;

-- Why Us
insert into site_content (key, section, data)
values (
  'why_us',
  'why_us',
  '{
    "label": "কেন আমরা?",
    "title": "Global Islamic Care-এ কেন শিখবেন?",
    "subtitle": "আধুনিক পদ্ধতি, আন্তর্জাতিক মানের অভিজ্ঞ শিক্ষক এবং পছন্দের ভাষায় পাঠদানের মাধ্যমে অনন্য শিক্ষার অভিজ্ঞতা।",
    "cards": [
      { "id": 1, "icon": "🎓", "title": "অভিজ্ঞ শিক্ষকবৃন্দ", "desc": "আমাদের সকল শিক্ষক সনদপ্রাপ্ত — তাজউইদে দক্ষ এবং আন্তর্জাতিক মানের পাঠদানে অভিজ্ঞ।" },
      { "id": 2, "icon": "🌍", "title": "যেকোনো দেশ থেকে", "desc": "বাংলাদেশ, ইউকে, মালয়েশিয়া বা বিশ্বের যেকোনো প্রান্ত থেকে ক্লাস করুন — শুধু ইন্টারনেট থাকলেই হবে।" },
      { "id": 3, "icon": "🗣️", "title": "বহুভাষী শিক্ষক ও পাঠদান", "desc": "দেশ-বিদেশের অভিজ্ঞ শিক্ষকদের সাথে বাংলা, English, আরবি বা উর্দুতে পছন্দের ভাষায় ক্লাস করার সুযোগ।" },
      { "id": 4, "icon": "👨‍👩‍👧‍👦", "title": "পরিবারের সকলের জন্য", "desc": "৭ বছরের শিশু থেকে বয়স্ক — একই পরিবারের ২-৩ জন একসাথে গ্রুপে ক্লাস করার অনন্য সুযোগ।" },
      { "id": 5, "icon": "❤️", "title": "কোরআনের প্রতি ভালোবাসা", "desc": "আমরা চেষ্টা করি যেন আপনার সন্তানের মনে কুরআনের প্রতি ভালোবাসা সৃষ্টি হয় এবং সে নিজে থেকেই কুরআন ও সুন্নাহকে নিজের জীবনে ধারণ করার চেষ্টা করে।" },
      { "id": 6, "icon": "📅", "title": "সুবিধাজনক সময়সূচি", "desc": "শিক্ষক ও শিক্ষার্থীর পছন্দ অনুযায়ী সুবিধাজনক দিন ও সময়ে ক্লাস করার সুযোগ।" }
    ]
  }'::jsonb
)
on conflict (key) do nothing;

-- Methodology
insert into site_content (key, section, data)
values (
  'methodology',
  'methodology',
  '{
    "label": "শিক্ষাদান পদ্ধতি",
    "title": "সহজ ও কার্যকর পদ্ধতিতে পাঠদান",
    "subtitle": "শিশু থেকে বয়স্ক — প্রতিটি শিক্ষার্থীর জন্য রয়েছে সুনির্দিষ্ট ও আধুনিক কারিকুলাম।",
    "cards": [
      {
        "id": 1,
        "icon": "📚",
        "title": "📚 তেলাওয়াত পদ্ধতি",
        "desc": "একেবারে বেসিক থেকে শুরু করে সহীহ শুদ্ধভাবে কোরআন পড়া শেখানো হয়। ৭+ বছর বয়সীরা দেড়–দুই মাসে এবং ১০+ বছর বয়সীরা এক মাসে কোরআন পড়তে শিখে যান।",
        "highlight": "✓ নূরানী কায়দা থেকে শুরু করে সহীহ মাখরাজ ও তাজউইদ"
      },
      {
        "id": 2,
        "icon": "🏆",
        "title": "🏆 হেফজ পদ্ধতি",
        "desc": "শুরুতে একপেজ, তারপর ধীরে ধীরে বাড়ানো হয়। পুরনো পাঠ যেন ভুলে না যায় সেদিকে বিশেষ মনোযোগ দেওয়া হয়। তিন বছরের টার্গেটে সম্পূর্ণ হেফজ সম্পন্ন করা হয়।",
        "highlight": "✓ নিয়মিত রিভিশন (দৌর), সবকী ও ৩ বছরের সম্পূর্ণ রোডম্যাপ"
      }
    ]
  }'::jsonb
)
on conflict (key) do nothing;

-- Process
insert into site_content (key, section, data)
values (
  'process',
  'process',
  '{
    "label": "কিভাবে শুরু করবেন",
    "title": "মাত্র ৪টি সহজ ধাপে শুরু করুন",
    "subtitle": "ভর্তি থেকে ক্লাস শুরু — পুরো প্রক্রিয়া সহজ এবং ঝামেলামুক্ত।",
    "steps": [
      { "num": "১", "title": "যোগাযোগ করুন", "desc": "WhatsApp-এ মেসেজ করুন অথবা ফ্রি পরামর্শ বুক করুন।" },
      { "num": "২", "title": "পরামর্শ নিন", "desc": "আপনার প্রয়োজন ও লক্ষ্য অনুযায়ী সঠিক কোর্স বেছে নিন।" },
      { "num": "৩", "title": "পেমেন্ট করুন", "desc": "bKash, Nagad বা ব্যাংকে সহজে মাসিক ফি পরিশোধ করুন।" },
      { "num": "৪", "title": "ক্লাস শুরু!", "desc": "নির্ধারিত সময়ে লাইভ ক্লাসে যোগ দিন এবং শেখা শুরু করুন।" }
    ]
  }'::jsonb
)
on conflict (key) do nothing;

-- Paid Courses
insert into site_content (key, section, data)
values (
  'paid_courses',
  'paid_courses',
  '{
    "label": "আমাদের কোর্সসমূহ",
    "title": "সহীহ কোরআন শিক্ষার সম্পূর্ণ প্যাকেজ",
    "subtitle": "বেসিক থেকে হেফজ — সকল পর্যায়ের শিক্ষার্থীদের জন্য উপযুক্ত কোর্স।",
    "courses": [
      {
        "id": 1,
        "theme": "blue",
        "emoji": "📖",
        "title": "কোরআন তেলাওয়াত",
        "tagline": "বেসিক থেকে সহীহ পড়া পর্যন্ত",
        "badge": "সাশ্রয়ী",
        "admission_fee": "৳১,০০০",
        "old_price": "৳৭,০০০",
        "discount": "-৳২,০০০ ছাড়",
        "price": "৳৫,০০০",
        "period": "/মাস",
        "features": [
          "হরফ চেনা থেকে শুরু — একেবারে বেসিক",
          "৭+ বছর বয়সী শিশুদের জন্য আদর্শ",
          "দেড়–দুই মাসে সহীহ তেলাওয়াত শিখুন",
          "পছন্দের ভাষায় পাঠদানের সুবিধা",
          "সুবিধাজনক দিন ও সময়ে ক্লাস"
        ],
        "btn_text": "ভর্তি হতে WhatsApp করুন",
        "wa_message": "আসসালামু আলাইকুম! আমি ''কোরআন তেলাওয়াত'' কোর্সে ভর্তি হতে আগ্রহী।"
      },
      {
        "id": 2,
        "theme": "gold",
        "emoji": "🌟",
        "title": "তাজউইদ ও সহীহ কেরাত",
        "tagline": "শুদ্ধ উচ্চারণ ও মাখরাজ শিক্ষা",
        "badge": "জনপ্রিয়",
        "admission_fee": "৳১,৫০০",
        "old_price": "৳৮,০০০",
        "discount": "-৳২,৫০০ ছাড়",
        "price": "৳৫,৫০০",
        "period": "/মাস",
        "features": [
          "তাজউইদের সকল নিয়ম বিস্তারিত শিক্ষা",
          "মাখরাজ ও সিফাত সহ শুদ্ধ উচ্চারণ",
          "১০+ বছর বয়সীদের জন্য উপযুক্ত",
          "বড়দের জন্যও বিশেষ ব্যবস্থা",
          "এক মাসে উল্লেখযোগ্য উন্নতি"
        ],
        "btn_text": "ভর্তি হতে WhatsApp করুন",
        "wa_message": "আসসালামু আলাইকুম! আমি ''তাজউইদ ও সহীহ কেরাত'' কোর্সে ভর্তি হতে আগ্রহী।"
      },
      {
        "id": 3,
        "theme": "teal",
        "emoji": "🏆",
        "title": "হেফজ প্রোগ্রাম",
        "tagline": "সম্পূর্ণ কোরআন হিফজ করুন",
        "badge": "বিশেষ কোর্স",
        "admission_fee": "৳২,০০০",
        "old_price": "৳৯,০০০",
        "discount": "-৳২,০০০ ছাড়",
        "price": "৳৭,০০০",
        "period": "/মাস",
        "features": [
          "৩ বছরের টার্গেটে সম্পূর্ণ হেফজ",
          "বেসিক থেকে শুরু — ধীরে ধীরে বৃদ্ধি",
          "পুরনো পাঠ ভুলে না যায় সেদিকে বিশেষ মনোযোগ",
          "নিয়মিত রিভিশন ও মনিটরিং",
          "ফ্রি কাউন্সেলিং সেশন অন্তর্ভুক্ত"
        ],
        "btn_text": "ভর্তি হতে WhatsApp করুন",
        "wa_message": "আসসালামু আলাইকুম! আমি ''হেফজ প্রোগ্রাম'' কোর্সে ভর্তি হতে আগ্রহী।"
      }
    ],
    "family_offer": {
      "emoji": "👨‍👩‍👧‍👦",
      "title": "পারিবারিক গ্রুপ অফার",
      "desc": "একই পরিবারের ২-৩ জন একসাথে গ্রুপে পড়তে পারবেন — মাসিক ফি একজনের মতোই। একটি ভর্তি ফি দিয়ে পুরো পরিবারের সাশ্রয়। পরিবারের সকলে একসাথে কোরআন শিখুন।",
      "btn_text": "💬 পারিবারিক প্যাকেজ সম্পর্কে জানুন",
      "wa_message": "আসসালামু আলাইকুম! আমি পারিবারিক গ্রুপ অফার সম্পর্কে বিস্তারিত জানতে চাই।"
    }
  }'::jsonb
)
on conflict (key) do nothing;

-- FAQ
insert into site_content (key, section, data)
values (
  'faq',
  'faq',
  '{
    "label": "সাধারণ জিজ্ঞাসা",
    "title": "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    "items": [
      { "q": "ক্লাস কীভাবে হবে?", "a": "ক্লাসগুলো Zoom অথবা Google Meet-এর মাধ্যমে লাইভ অনুষ্ঠিত হবে। শিক্ষক ও শিক্ষার্থী সরাসরি কথা বলতে ও স্ক্রিন শেয়ার করে পড়তে পারবেন।" },
      { "q": "কোন বয়সে শুরু করা যাবে?", "a": "৭ বছর বয়স থেকে শুরু করে যেকোনো বয়সের পুরুষ ও নারী আমাদের কাছে শিখতে পারেন। সবার জন্য আলাদা ব্যাচ ও উপযুক্ত কারিকুলাম রয়েছে।" },
      { "q": "একই পরিবারের একাধিক সদস্য কি একসাথে পড়তে পারবে?", "a": "হ্যাঁ! আমাদের বিশেষ পারিবারিক প্যাকেজে একই পরিবারের ২-৩ জন শিক্ষার্থী একসাথে একটি গ্রুপে ক্লাস করতে পারেন।" },
      { "q": "মাসিক ফি কীভাবে পরিশোধ করতে হবে?", "a": "bKash, Nagad, রকেট বা যেকোনো বাংলাদেশি ব্যাংক অ্যাকাউন্টে এবং বিদেশ থেকে রেমিট্যান্স/মানিগ্রাম বা কার্ডের মাধ্যমে সহজে ফি প্রদান করা যায়।" },
      { "q": "ক্লাসের সময়সূচি কেমন?", "a": "শিক্ষার্থী ও শিক্ষকের পারস্পরিক পছন্দ ও সুবিধাজনক দিন ও সময়ে ক্লাস নির্ধারণ করা হয়।" }
    ]
  }'::jsonb
)
on conflict (key) do nothing;

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
on conflict (key) do nothing;

-- CTA Banners
insert into site_content (key, section, data)
values (
  'cta',
  'cta',
  '{
    "title": "এখনই শুরু করুন — ফ্রি পরামর্শ নিন",
    "desc": "কোন কোর্স আপনার জন্য সঠিক জানতে WhatsApp করুন।",
    "btn_text": "💬 WhatsApp: +880 1733-017521",
    "phone": "+880 1733-017521"
  }'::jsonb
)
on conflict (key) do nothing;

-- About Us
insert into site_content (key, section, data)
values (
  'about',
  'about',
  '{
    "title": "আমাদের সম্পর্কে",
    "subtitle": "Global Islamic Care একটি আন্তর্জাতিক মানের অনলাইন কোরআন শিক্ষা প্রতিষ্ঠান।",
    "story": "আমাদের লক্ষ্য বিশ্বব্যাপী মুসলিমদের কাছে বিশুদ্ধ কোরআনের শিক্ষা সহজে পৌঁছে দেওয়া। দেশ-বিদেশের বিভিন্ন ভাষাভাষী অভিজ্ঞ ও যোগ্য শিক্ষকদের তত্ত্বাবধানে আমরা শিক্ষার্থীদের আন্তরিকতার সাথে গড়ে তুলছি।",
    "mission": "প্রতিটি ঘরে ঘরে সহীহ শুদ্ধ কোরআনের বাণী পৌঁছে দেওয়া এবং কোরআন-সুন্নাহ ভিত্তিক আদর্শ প্রজন্ম গড়ে তোলা।",
    "vision": "একটি বিশ্বস্ত ও আধুনিক ইসলামিক শিক্ষাকেন্দ্র হিসেবে বিশ্বজুড়ে মুসলিমদের দ্বীনি শিক্ষায় পথপ্রদর্শক হওয়া।",
    "stats": [
      { "num": "৫,০০০+", "label": "সফল শিক্ষার্থী" },
      { "num": "১০০+", "label": "যোগ্য ও অভিজ্ঞ শিক্ষক" },
      { "num": "২০+", "label": "দেশ থেকে শিক্ষার্থী" },
      { "num": "৯৮%", "label": "সন্তুষ্টি হার" }
    ]
  }'::jsonb
)
on conflict (key) do nothing;

-- Contact Info
insert into site_content (key, section, data)
values (
  'contact',
  'contact',
  '{
    "title": "যোগাযোগ করুন",
    "subtitle": "যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।",
    "phone1": "+880 1733-017521",
    "phone2": "+880 1712-345678",
    "whatsapp": "+880 1733-017521",
    "email": "globalislamiccare@gmail.com",
    "address": "মিরপুর, ঢাকা - ১২১৬, বাংলাদেশ",
    "hours": "প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত",
    "map_embed_url": ""
  }'::jsonb
)
on conflict (key) do nothing;

-- Policies
insert into site_content (key, section, data)
values (
  'policies',
  'policies',
  '{
    "privacy_policy": "Global Islamic Care-এ আমরা আমাদের শিক্ষার্থীদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করি। আপনার নাম, ফোন নম্বর, ইমেইল বা অন্যান্য ব্যক্তিগত তথ্য শুধুমাত্র ক্লাস ও অ্যাকাডেমিক যোগাযোগের জন্য ব্যবহৃত হয় এবং কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
    "payment_policy": "ভর্তির পূর্বে বিনামূল্যে পরামর্শ গ্রহণ করা যায়। ভর্তি নিশ্চিত করার পর নির্ধারিত মাসিক ফি মাসের প্রথম সপ্তাহে পরিশোধযোগ্য। বিশেষ পরিস্থিতিতে কোর্স পরিবর্তন বা রিফান্ডের জন্য কর্তৃপক্ষের সাথে যোগাযোগ করতে হবে।",
    "terms_conditions": "সকল শিক্ষার্থী ও অভিভাবককে ক্লাসের নির্দিষ্ট সময়সূচি মেনে চলতে হবে। কোনো কারণে ক্লাস মিস হলে শিক্ষকের সাথে সমন্বয় করে মেকআপ ক্লাস নেওয়ার সুযোগ থাকবে।"
  }'::jsonb
)
on conflict (key) do nothing;

-- Footer
insert into site_content (key, section, data)
values (
  'footer',
  'footer',
  '{
    "about_text": "Global Islamic Care — দেশ ও বিদেশের শিক্ষার্থীদের জন্য আধুনিক ও বিশ্বস্ত অনলাইন কোরআন শিক্ষা প্রতিষ্ঠান।",
    "copyright": "© ২০২৬ Global Islamic Care. সর্বস্বত্ব সংরক্ষিত।",
    "developer_credit": "Powered by Global Islamic Care Tech"
  }'::jsonb
)
on conflict (key) do nothing;
