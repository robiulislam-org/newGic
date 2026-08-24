/**
 * =====================================================================
 * 🌐 GLOBAL ISLAMIC CARE — DYNAMIC CONTENT ENGINE (CMS LOADER) v1.0
 * Loads and renders all website content dynamically from Supabase & Cache.
 * Zero-latency initial render with instant local cache + background cloud sync.
 * =====================================================================
 */

const GIC_SUPA_URL = "https://abpweawndpnaftkcsdcp.supabase.co";
const GIC_SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicHdlYXduZHBuYWZ0a2NzZGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1Njc1ODMsImV4cCI6MjA5NTE0MzU4M30.B3rV8pp0HL9xYBhGDcJGJD3b1unjtNk1ChB_4_OgW9Y";

// ── DEFAULT FALLBACK CONTENT (Used on first load or offline) ─────────
const DEFAULT_SITE_CONTENT = {
  general: {
    site_name: "Global Islamic Care",
    site_sub: "Online Quran Teachers & Marketplace",
    logo_url: "logo.jpg",
    favicon_url: "favicon.png",
    phone_primary: "+880 1733-017521",
    phone_secondary: "+880 1712-345678",
    whatsapp_number: "8801733017521",
    whatsapp_default_msg: "আসসালামু আলাইকুম! আমি Global Islamic Care-এ কোরআন শিক্ষক ও ক্লাস সম্পর্কে বিস্তারিত জানতে চাই।",
    email: "globalislamiccare@gmail.com",
    address: "ঢাকা, বাংলাদেশ (বিশ্বব্যাপী অনলাইন শিক্ষক মার্কেটপ্লেস)",
    office_hours: "শনি – বৃহস্পতি: সকাল ৯:০০ – রাত ১০:০০",
    social_facebook: "https://facebook.com/globalislamiccare",
    social_youtube: "https://youtube.com/@globalislamiccare",
    social_telegram: "https://t.me/globalislamiccare",
    social_instagram: "",
    social_tiktok: "",
    announcement_enabled: false,
    announcement_text: "✨ দেশ-বিদেশের অভিজ্ঞ হাফেজ ও আলেম শিক্ষকদের সাথে ফ্রি ট্রায়াল ক্লাস বুক করুন!",
    announcement_link: "teachers.html"
  },
  hero: {
    badge: "বিশ্বস্ত কোরআন শিক্ষক মার্কেটপ্লেস",
    title_line1: "পছন্দের কোরআন শিক্ষক",
    title_line2: "খুঁজুন ও শিখুন",
    arabic_ayah: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    description: "দেশ-বিদেশের অভিজ্ঞ হাফেজ ও আলেম শিক্ষকদের প্রোফাইল, ডেমো তেলাওয়াত ও ফি দেখে সরাসরি পছন্দের শিক্ষক বেছে নিন। আপনার সুবিধাজনক সময়ে ঘরে বসে শিখুন সহীহ কোরআন।",
    wa_btn_text: "🔍 শিক্ষক খুঁজুন →",
    courses_btn_text: "🎓 শিক্ষক হিসেবে আবেদন",
    points: [
      "১০০% ভেরিফাইড সনদপ্রাপ্ত শিক্ষকবৃন্দ",
      "ফ্রি ট্রায়াল ক্লাস করার বিশেষ সুবিধা",
      "পছন্দমতো সময় ও সাশ্রয়ী নমনীয় ফি",
      "মা-বোন ও শিশুদের জন্য অভিজ্ঞ শিক্ষিকা"
    ],
    booking_title: "ফ্রি ট্রায়াল ক্লাস রিকোয়েস্ট",
    booking_sub: "পছন্দের শিক্ষক বাছাই ও পরামর্শের জন্য",
    booking_btn_text: "💬 WhatsApp-এ পরামর্শ নিন",
    booking_guarantee: "✓ সম্পূর্ণ বিনামূল্যে · ✓ কোনো বাধ্যবাধকতা নেই"
  },
  ticker: {
    items: [
      "হাফেজ ও আলেম শিক্ষকবৃন্দ",
      "দেশ-বিদেশের বহুভাষী শিক্ষক",
      "১-অন-১ লাইভ ব্যক্তিগত ক্লাস",
      "পছন্দমতো সময় ও নমনীয় ফি",
      "বিশ্বের যেকোনো দেশ থেকে",
      "শিশু, নারী ও পুরুষ সবার জন্য",
      "ফ্রি ট্রায়াল ক্লাসের সুবিধা",
      "ভেরিফাইড শিক্ষক প্রোফাইল"
    ]
  },
  why_us: {
    label: "কেন Global Islamic Care?",
    title: "বিশ্বস্ত শিক্ষক প্ল্যাটফর্মে কেন শিখবেন?",
    subtitle: "সনদপ্রাপ্ত শিক্ষক, ডেমো তেলাওয়াত ও ভিডিও প্রোফাইল এবং সরাসরি ১-অন-১ লাইভ ক্লাসের সুবিধা।",
    cards: [
      { id: 1, icon: "🎓", title: "যাচাইকৃত শিক্ষকবৃন্দ", desc: "আমাদের সকল শিক্ষক সনদপ্রাপ্ত ও NID যাচাইকৃত — তাজউইদে দক্ষ এবং আন্তর্জাতিক মানের পাঠদানে অভিজ্ঞ।" },
      { id: 2, icon: "🌍", title: "যেকোনো দেশ থেকে", desc: "বাংলাদেশ, ইউকে, সৌদি আরব, মালয়েশিয়া বা বিশ্বের যেকোনো প্রান্ত থেকে ক্লাস করুন — শুধু ইন্টারনেট থাকলেই হবে।" },
      { id: 3, icon: "🗣️", title: "বহুভাষী শিক্ষক ও পাঠদান", desc: "দেশ-বিদেশের অভিজ্ঞ শিক্ষকদের সাথে বাংলা, English, আরবি বা উর্দুতে আপনার পছন্দের ভাষায় ক্লাস করার সুযোগ।" },
      { id: 4, icon: "👨‍👩‍👧‍👦", title: "পরিবারের সকলের জন্য", desc: "ছোট সোনামণি থেকে শুরু করে মা-বোন ও বয়স্কদের জন্য রয়েছে আলাদা আলাদা অভিজ্ঞ শিক্ষক ও শিক্ষিকা।" },
      { id: 5, icon: "❤️", title: "কোরআনের প্রতি ভালোবাসা", desc: "আমরা চেষ্টা করি যেন আপনার ও আপনার সন্তানের মনে কোরআনের প্রতি গভীর ভালোবাসা ও সহীহ তেলাওয়াতের আগ্রহ তৈরি হয়।" },
      { id: 6, icon: "📅", title: "নমনীয় সময় ও ফি", desc: "শিক্ষকের সাথে আলোচনা করে আপনার সুবিধাজনক দিন, সময় ও সাশ্রয়ী মাসিক ফিতে ক্লাস শুরু করতে পারবেন।" }
    ]
  },
  methodology: {
    label: "পাঠদানের বিষয়সমূহ",
    title: "পছন্দের বিষয়ে বিশেষজ্ঞ শিক্ষক বেছে নিন",
    subtitle: "শিশু থেকে বয়স্ক — প্রতিটি বিষয়ের জন্য আমাদের রয়েছে আলাদা আলাদা অভিজ্ঞ শিক্ষকবৃন্দ।",
    cards: [
      {
        id: 1,
        icon: "👶",
        title: "👶 নূরানী কায়দা ও আমপারা",
        desc: "হরফ চেনা, সঠিক মাখরাজ ও ছোট ছোট সূরা দিয়ে আনন্দের সাথে শিশুদের কোরআন শিক্ষার ভিত্তি তৈরি।",
        highlight: "✓ সহজে ও আনন্দদায়ক পদ্ধতিতে পাঠদান"
      },
      {
        id: 2,
        icon: "📖",
        title: "📖 সহীহ তেলাওয়াত ও তাজউইদ",
        desc: "তাজউইদের সকল নিয়ম মেনে মিষ্টি ও সুন্দর সুরে শুদ্ধ কোরআন তেলাওয়াত শিক্ষা।",
        highlight: "✓ সহীহ মাখরাজ ও আন্তর্জাতিক তাজউইদ নিয়ম"
      },
      {
        id: 3,
        icon: "🕌",
        title: "🕌 হিফজুল কোরআন প্রোগ্রাম",
        desc: "হাফেজ শিক্ষকের নিবিড় তত্ত্বাবধানে সম্পূর্ণ কোরআন মুখস্থ ও নিয়মিত রিভিশন (দৌর)।",
        highlight: "✓ ১-অন-১ নিবিড় মনিটরিং ও নিয়মিত রিভিশন"
      }
    ]
  },
  process: {
    label: "কিভাবে শুরু করবেন",
    title: "মাত্র ৩টি সহজ ধাপে ক্লাস শুরু করুন",
    subtitle: "শিক্ষক নির্বাচন থেকে সরাসরি ক্লাস শুরু — পুরো প্রক্রিয়া সহজ এবং ঝামেলামুক্ত।",
    steps: [
      { num: "১", title: "শিক্ষক পছন্দ করুন", desc: "শিক্ষকদের প্রোফাইল, যোগ্যতা, ডেমো তেলাওয়াত ও ফি দেখে পছন্দের শিক্ষক বেছে নিন।" },
      { num: "২", title: "ফ্রি ট্রায়াল বুক করুন", desc: "শিক্ষকের সাথে সুবিধাজনক সময়ে সম্পূর্ণ ফ্রিতে ১টি ট্রায়াল ক্লাস করে নিশ্চিত হোন।" },
      { num: "৩", title: "নিয়মিত পড়া শুরু!", desc: "শিক্ষকের সাথে ক্লাস শিডিউল ও ফি চূড়ান্ত করে নিয়মিত লাইভ ক্লাসে অংশ নিন।" }
    ]
  },
  paid_courses: {
    label: "শিক্ষক ক্যাটাগরি",
    title: "বিষয়ভিত্তিক অভিজ্ঞ কোরআন শিক্ষকবৃন্দ",
    subtitle: "আপনার প্রয়োজন অনুযায়ী শিক্ষক প্রোফাইল ও ডেমো দেখে সরাসরি বেছে নিন।",
    courses: [
      {
        id: 1,
        theme: "blue",
        emoji: "👶",
        title: "নূরানী কায়দা ও আমপারা",
        tagline: "বেসিক থেকে সহীহ পড়া পর্যন্ত",
        badge: "জনপ্রিয়",
        admission_fee: "",
        old_price: "",
        discount: "",
        price: "শিক্ষকের প্রোফাইল অনুযায়ী",
        period: "/মাসিক ফি",
        features: [
          "হরফ চেনা থেকে শুরু — একেবারে বেসিক",
          "ছোট সোনামণি ও নতুনদের জন্য আদর্শ",
          "সহীহ মাখরাজ ও সুন্দর উচ্চারণ শিক্ষা",
          "১-অন-১ পার্সোনাল লাইভ ক্লাস",
          "পছন্দমতো দিন ও সুবিধাজনক সময়ে ক্লাস"
        ],
        btn_text: "শিক্ষক ডিরেক্টরি দেখুন →",
        wa_message: "আসসালামু আলাইকুম! আমি নূরানী কায়দা ও আমপারা বিষয়ে শিক্ষক খুঁজতে চাই।"
      },
      {
        id: 2,
        theme: "gold",
        emoji: "📖",
        title: "সহীহ তেলাওয়াত ও তাজউইদ",
        tagline: "শুদ্ধ উচ্চারণ ও মিষ্টি সুরে তেলাওয়াত",
        badge: "সেরা পছন্দ",
        admission_fee: "",
        old_price: "",
        discount: "",
        price: "শিক্ষকের প্রোফাইল অনুযায়ী",
        period: "/মাসিক ফি",
        features: [
          "তাজউইদের সকল নিয়ম বিস্তারিত শিক্ষা",
          "মাখরাজ ও সিফাত সহ শুদ্ধ উচ্চারণ",
          "শিশু, কিশোর ও বয়স্ক সবার জন্য উপযুক্ত",
          "১-অন-১ লাইভ ক্লাসে সরাসরি সংশোধন",
          "পছন্দের ভাষায় (বাংলা/English/আরবি) ক্লাস"
        ],
        btn_text: "শিক্ষক ডিরেক্টরি দেখুন →",
        wa_message: "আসসালামু আলাইকুম! আমি তাজউইদ ও কেরাত বিষয়ে শিক্ষক খুঁজতে চাই।"
      },
      {
        id: 3,
        theme: "teal",
        emoji: "🕌",
        title: "হিফজুল কোরআন প্রোগ্রাম",
        tagline: "সম্পূর্ণ কোরআন হিফজ ও দৌর",
        badge: "বিশেষ প্রোগ্রাম",
        admission_fee: "",
        old_price: "",
        discount: "",
        price: "শিক্ষকের প্রোফাইল অনুযায়ী",
        period: "/মাসিক ফি",
        features: [
          "অভিজ্ঞ হাফেজ শিক্ষকের নিবিড় তত্ত্বাবধান",
          "দৈনিক ছবক ও নিয়মিত রিভিশন (দৌর)",
          "সহীহ তাজউইদ সহ কোরআন হিফজ",
          "ব্যক্তিগত গতি অনুযায়ী শেখার সুবিধা",
          "ফ্রি ট্রায়াল ও কাউন্সেলিং সেশন"
        ],
        btn_text: "শিক্ষক ডিরেক্টরি দেখুন →",
        wa_message: "আসসালামু আলাইকুম! আমি হিফজুল কোরআন বিষয়ে শিক্ষক খুঁজতে চাই।"
      }
    ],
    family_offer: {
      emoji: "👨‍👩‍👧‍👦",
      title: "পারিবারিক ক্লাসের সুবিধা",
      desc: "একই পরিবারের একাধিক সদস্য সুবিধাজনক সময়ে আলাদা বা একসাথে ক্লাস করার জন্য শিক্ষকদের সাথে আলোচনা করে শিডিউল ঠিক করতে পারেন।",
      btn_text: "💬 শিক্ষক বাছাইয়ে সহায়তা নিন",
      wa_message: "আসসালামু আলাইকুম! আমি পরিবারের সদস্যদের জন্য শিক্ষক বাছাইয়ে পরামর্শ চাই।"
    }
  },
  faq: {
    label: "সাধারণ জিজ্ঞাসা",
    title: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    items: [
      { q: "আমি কীভাবে আমার পছন্দের শিক্ষক খুঁজে পাবো?", a: "আমাদের 'শিক্ষক ডিরেক্টরি' পেজে গিয়ে বিষয় (নূরানী, তাজউইদ, হিফজ), শিক্ষক টাইপ (পুরুষ শিক্ষক / মহিলা শিক্ষিকা), দেশ ও ভাষা অনুযায়ী ফিল্টার করে ডেমো তেলাওয়াত ও প্রোফাইল দেখে খুব সহজেই শিক্ষক বেছে নিতে পারবেন।" },
      { q: "শিক্ষকের মাসিক ফি কীভাবে নির্ধারিত হয়?", a: "আমাদের প্ল্যাটফর্মে শিক্ষকরা তাঁদের নিজস্ব যোগ্যতা ও অভিজ্ঞতা অনুযায়ী ফি নির্ধারণ করেন। প্রতিটি শিক্ষকের প্রোফাইলে ফি উল্লেখ থাকে এবং আপনি সরাসরি শিক্ষকের সাথে আলোচনা করেও ফি নির্ধারণ করতে পারেন।" },
      { q: "ফ্রি ট্রায়াল ক্লাস কীভাবে করা যাবে?", a: "যেকোনো শিক্ষকের প্রোফাইলে গিয়ে 'ফ্রি ট্রায়াল রিকোয়েস্ট' পাঠালে সরাসরি শিক্ষকের সাথে আপনার সমন্বয় করে দেওয়া হবে এবং একটি ফ্রি ট্রায়াল ক্লাসে অংশ নিতে পারবেন।" },
      { q: "ক্লাস কীভাবে পরিচালিত হয়?", a: "ক্লাসগুলো Zoom অথবা Google Meet-এর মাধ্যমে ১-অন-১ লাইভ অনুষ্ঠিত হয়। শিক্ষক ও শিক্ষার্থী সরাসরি স্ক্রিন শেয়ার করে পড়তে পারেন।" },
      { q: "বিদেশ থেকে কি পড়া সম্ভব?", a: "হ্যাঁ, বিশ্বের যেকোনো দেশ (UK, USA, কানাডা, মধ্যপ্রাচ্য, ইউরোপ ইত্যাদি) থেকে আপনার স্থানীয় সুবিধাজনক সময় অনুযায়ী অনলাইনে ১-অন-১ লাইভ ক্লাসে অংশ নিতে পারবেন।" },
      { q: "আমি একজন শিক্ষক, আমি কীভাবে যুক্ত হতে পারি?", a: "উপরে 'শিক্ষক হিসেবে যুক্ত হোন' বাটনে ক্লিক করে আপনার যোগ্যতা, NID ও প্রয়োজনীয় তথ্য দিয়ে সম্পূর্ণ ফ্রিতে আবেদন করতে পারবেন।" }
    ]
  },
  library: {
    label: "ডিজিটাল লাইব্রেরি",
    title: "ইসলামিক বই ও কিতাবসমূহ",
    subtitle: "বিনামূল্যে কুরআন, কায়দা ও ইসলামিক কিতাব অনলাইনে পড়ুন ও ডাউনলোড করুন।",
    books: [
      {
        id: 1,
        title: "১৫ লাইন হাফেজী কুরআন শরীফ (ইমদাদিয়া)",
        category: "কুরআন শরীফ",
        cover: "📖",
        desc: "আন্তর্জাতিক ১৫ লাইনের ইমদাদিয়া হাফেজী কোরআন শরীফ। ১১৪টি সূরা ও ৩০ পারা সমন্বিত।",
        pdf_url: "Emdadia-Hafezi-Quran.pdf",
        pages: "৬১১ পৃষ্ঠা",
        language: "আরবি",
        is_featured: true
      },
      {
        id: 2,
        title: "আমপারা (নাদিয়াতুল কায়দা সংবলিত)",
        category: "কায়দা ও আমপারা",
        cover: "📗",
        desc: "সহজ তাজবিদ শেখার নাদিয়াতুল কায়দা ও ৩০তম পারা। শিশু ও নতুন শিক্ষার্থীদের জন্য আদর্শ।",
        pdf_url: "Ampara_Nadiatul.pdf",
        pages: "৬৪ পৃষ্ঠা",
        language: "বাংলা ও আরবি",
        is_featured: true
      },
      {
        id: 3,
        title: "নূরানী পদ্ধতিতে কুরআন শিক্ষা",
        category: "কুরআন শিক্ষা",
        cover: "📘",
        desc: "সহজ নূরানী নিয়মে দ্রুত কুরআন শেখার পূর্ণাঙ্গ নির্দেশিকা ও নিয়মাবলী।",
        pdf_url: "Nurani Podhotite Quran Shikkha.pdf",
        pages: "৪৮ পৃষ্ঠা",
        language: "বাংলা ও আরবি",
        is_featured: true
      },
      {
        id: 4,
        title: "তালাওয়াত কায়দা (Tilawat Qaida)",
        category: "তাজউইদ ও কায়দা",
        cover: "📙",
        desc: "সহীহ মাখরাজ ও তাজউইদ অনুশীলনের জন্য অনন্য কিতাব।",
        pdf_url: "Tilawat Qaida.pdf",
        pages: "৩২ পৃষ্ঠা",
        language: "বাংলা ও আরবি",
        is_featured: false
      },
      {
        id: 5,
        title: "Norani Qaida (English Edition)",
        category: "English Qaida",
        cover: "🌍",
        desc: "Complete Norani Qaida with English instructions for overseas students and children.",
        pdf_url: "norani-qaida-english.pdf",
        pages: "৪০ পৃষ্ঠা",
        language: "English & Arabic",
        is_featured: false
      }
    ]
  },
  cta: {
    title: "আজই আপনার পছন্দের শিক্ষকের সাথে <span style=\"color:var(--gold-light)\">কোরআন শিক্ষা শুরু করুন</span>",
    desc: "বিশ্বের যেকোনো প্রান্ত থেকে অভিজ্ঞ কোরআন শিক্ষকদের প্রোফাইল দেখে সরাসরি ফ্রি ট্রায়াল বুক করুন।",
    btn_text: "🔍 শিক্ষক খুঁজুন ও ডেমো নিন",
    phone: "+880 1733-017521"
  },
  about: {
    title: "আমাদের সম্পর্কে",
    subtitle: "Global Islamic Care বিশ্বের বিভিন্ন প্রান্তের শিক্ষার্থী ও অভিজ্ঞ শিক্ষকদের মাঝে একটি নির্ভরযোগ্য অনলাইন প্ল্যাটফর্ম।",
    story: "আমাদের লক্ষ্য বিশ্বব্যাপী মুসলিমদের কাছে বিশুদ্ধ কোরআনের শিক্ষা সহজে পৌঁছে দেওয়া। দেশ-বিদেশের বিভিন্ন ভাষাভাষী অভিজ্ঞ ও যোগ্য শিক্ষকদের প্রোফাইল ও ডেমো দেখে শিক্ষার্থীরা সরাসরি পছন্দের শিক্ষকের কাছে ১-অন-১ লাইভ ক্লাসে কোরআন শিখতে পারেন।",
    mission: "প্রতিটি ঘরে ঘরে সহীহ শুদ্ধ কোরআনের শিক্ষা পৌঁছে দেওয়া এবং যোগ্য শিক্ষকদের জন্য বিশ্বমানের সম্মানজনক শিক্ষকতার সুযোগ তৈরি করা।",
    vision: "বিশ্বের সবচেয়ে বিশ্বস্ত ও আধুনিক অনলাইন ইসলামিক টিচার মার্কেটপ্লেস ও শিক্ষাকেন্দ্র হিসেবে শিক্ষার্থীদের দ্বীনি শিক্ষায় সহায়তা করা।",
    stats: [
      { num: "৫,০০০+", label: "সফল শিক্ষার্থী" },
      { num: "১০০+", label: "যোগ্য ও অভিজ্ঞ শিক্ষক" },
      { num: "২০+", label: "দেশ থেকে শিক্ষার্থী" },
      { num: "৯৮%", label: "সন্তুষ্টি হার" }
    ]
  },
  contact: {
    title: "যোগাযোগ করুন",
    subtitle: "শিক্ষক বাছাই বা যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।",
    phone1: "+880 1733-017521",
    phone2: "+880 1712-345678",
    whatsapp: "+880 1733-017521",
    email: "globalislamiccare@gmail.com",
    address: "ঢাকা, বাংলাদেশ (অনলাইন বিশ্বব্যাপী সেবা)",
    hours: "প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত",
    map_embed_url: ""
  },
  policies: {
    privacy_policy: "Global Islamic Care-এ আমরা শিক্ষার্থী ও শিক্ষক উভয়ের তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করি। আপনার নাম, ফোন নম্বর, ইমেইল বা ব্যক্তিগত তথ্য শুধুমাত্র ক্লাস ও অ্যাকাডেমিক যোগাযোগের জন্য ব্যবহৃত হয় এবং কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
    payment_policy: "শিক্ষক ও শিক্ষার্থী ট্রায়াল ক্লাসের মাধ্যমে পারস্পরিক সম্মতি গ্রহণের পর মাসিক ফি নির্ধারিত হয়। কোনো শিক্ষক ক্লাস মিস করলে মেকআপ ক্লাস অথবা ওই ক্লাসের ফি সমন্বয় নিশ্চিত করা হয়।",
    terms_conditions: "সকল শিক্ষার্থী ও শিক্ষককে ক্লাসের সময়সূচি মেনে চলতে হবে। পারস্পরিক বোঝাপড়ার মাধ্যমে সুবিধাজনক সময়ে ১-অন-১ লাইভ ক্লাস সম্পন্ন করতে হবে।"
  },
  footer: {
    about_text: "Global Islamic Care — দেশ ও বিদেশের শিক্ষার্থীদের জন্য বিশ্বস্ত অনলাইন কোরআন শিক্ষক মার্কেটপ্লেস ও প্ল্যাটফর্ম।",
    copyright: "© ২০২৬ Global Islamic Care. সর্বস্বত্ব সংরক্ষিত।",
    developer_credit: "Powered by Global Islamic Care Tech"
  }
};

const GIC_CONTENT_VERSION = "2026.08.24.v3";

// Global active site content instance
window.GIC_SITE_CONTENT = { ...DEFAULT_SITE_CONTENT };

// ── INITIALIZE & LOAD FROM STORAGE / DATABASE ────────────────────────
function initGicContent() {
  // 1. Try loading cached data instantly
  try {
    const cachedVer = localStorage.getItem('gic_site_content_ver');
    const cached = localStorage.getItem('gic_site_content');
    if (cached && cachedVer === GIC_CONTENT_VERSION) {
      const parsed = JSON.parse(cached);
      window.GIC_SITE_CONTENT = { ...DEFAULT_SITE_CONTENT, ...parsed };
      applyDynamicContent(window.GIC_SITE_CONTENT);
    } else {
      // Outdated or missing cache version -> clear old cache and use default
      try { localStorage.removeItem('gic_site_content'); } catch (e) {}
      window.GIC_SITE_CONTENT = { ...DEFAULT_SITE_CONTENT };
      applyDynamicContent(DEFAULT_SITE_CONTENT);
    }
  } catch (e) {
    console.warn('GIC CMS: LocalCache read failed:', e);
    applyDynamicContent(DEFAULT_SITE_CONTENT);
  }

  // 2. Fetch fresh content from Supabase in the background
  fetchCloudSiteContent();
}

// ── FETCH LATEST CONTENT FROM SUPABASE ────────────────────────────────
async function fetchCloudSiteContent() {
  try {
    const url = `${GIC_SUPA_URL}/rest/v1/site_content?select=key,data`;
    const res = await fetch(url, {
      headers: {
        'apikey': GIC_SUPA_KEY,
        'Authorization': `Bearer ${GIC_SUPA_KEY}`
      }
    });

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows) && rows.length > 0) {
        const cloudData = { ...DEFAULT_SITE_CONTENT };
        rows.forEach(r => {
          if (r.key && r.data) {
            cloudData[r.key] = r.data;
          }
        });
        window.GIC_SITE_CONTENT = cloudData;
        try {
          localStorage.setItem('gic_site_content', JSON.stringify(cloudData));
          localStorage.setItem('gic_site_content_ver', GIC_CONTENT_VERSION);
        } catch (e) {}
        applyDynamicContent(cloudData);
      }
    }
  } catch (err) {
    console.warn('GIC CMS: Cloud fetch failed, continuing with cache/defaults:', err);
  }
}

// ── APPLY DYNAMIC CONTENT TO DOM ─────────────────────────────────────
function applyDynamicContent(content) {
  if (!content) return;

  // 1. GENERAL & BRANDING
  if (content.general) {
    const g = content.general;
    // Site name / Title across header, navbar & footer
    document.querySelectorAll('[data-cms="site_name"], .lt-main').forEach(el => el.textContent = g.site_name || "Global Islamic Care");
    document.querySelectorAll('[data-cms="site_sub"], .lt-sub').forEach(el => el.textContent = g.site_sub || "Quran Learning Online");
    
    // Logo
    if (g.logo_url) {
      document.querySelectorAll('img.logo-img, .sidebar-logo img').forEach(img => {
        img.src = g.logo_url;
      });
    }

    // Top Announcement Bar
    let bar = document.getElementById('top-announcement-bar');
    if (g.announcement_enabled && g.announcement_text) {
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'top-announcement-bar';
        bar.style.cssText = "background:linear-gradient(90deg, #1e3d6e, #0f2744);color:#e5b95c;padding:8px 16px;text-align:center;font-size:13px;font-weight:600;display:flex;justify-content:center;align-items:center;gap:10px;border-bottom:1px solid rgba(200,151,42,0.3);position:relative;z-index:999;";
        document.body.prepend(bar);
      }
      bar.innerHTML = `<span>${g.announcement_text}</span> ${g.announcement_link ? `<a href="${g.announcement_link}" style="color:#fff;text-decoration:underline;font-size:12px;margin-left:6px;">বিস্তারিত দেখুন →</a>` : ''}`;
      bar.style.display = 'flex';
    } else if (bar) {
      bar.style.display = 'none';
    }

    // WhatsApp Floating / Links
    if (g.whatsapp_number) {
      const cleanWa = g.whatsapp_number.replace(/[^0-9]/g, '');
      const waUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(g.whatsapp_default_msg || '')}`;
      document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        if (!a.dataset.customWa) {
          a.href = waUrl;
        }
      });
    }
  }

  // 2. HERO SECTION
  if (content.hero) {
    const h = content.hero;
    const badgeEl = document.querySelector('.hero-badge');
    if (badgeEl && h.badge) {
      badgeEl.innerHTML = `<div class="pulse"></div>${h.badge}`;
    }

    const titleEl = document.querySelector('.hero-title');
    if (titleEl && h.title_line1) {
      titleEl.innerHTML = `<span class="gold">${h.title_line1}</span><br>${h.title_line2 ? `<span class="blue">${h.title_line2}</span>` : ''}`;
    }

    const arabicEl = document.querySelector('.hero-arabic');
    if (arabicEl && h.arabic_ayah) {
      arabicEl.textContent = h.arabic_ayah;
    }

    const descEl = document.querySelector('.hero-desc');
    if (descEl && h.description) {
      descEl.textContent = h.description;
    }

    // Hero Points
    const pointsContainer = document.querySelector('.hero-points');
    if (pointsContainer && Array.isArray(h.points) && h.points.length > 0) {
      pointsContainer.innerHTML = h.points.map(pt => `
        <div class="hero-point"><div class="hero-point-dot">✓</div>${pt}</div>
      `).join('');
    }

    // Hero Card / Booking
    const heroCardTitle = document.querySelector('.hero-card-title h3');
    if (heroCardTitle && h.booking_title) heroCardTitle.textContent = h.booking_title;
    const heroCardSub = document.querySelector('.hero-card-title p');
    if (heroCardSub && h.booking_sub) heroCardSub.textContent = h.booking_sub;
    const heroBookingBtn = document.querySelector('.hero-card button.btn-primary');
    if (heroBookingBtn && h.booking_btn_text) heroBookingBtn.innerHTML = h.booking_btn_text;
  }

  // 3. TICKER
  if (content.ticker && Array.isArray(content.ticker.items)) {
    const tickerTrack = document.getElementById('ticker');
    if (tickerTrack && content.ticker.items.length > 0) {
      const repeatedItems = [...content.ticker.items, ...content.ticker.items];
      tickerTrack.innerHTML = repeatedItems.map(item => `
        <span class="ticker-item"><span class="ticker-dot"></span>${item}</span>
      `).join('');
    }
  }

  // 4. WHY US
  if (content.why_us) {
    const w = content.why_us;
    const section = document.querySelector('.why-section');
    if (section) {
      const labelEl = section.querySelector('.section-label');
      if (labelEl && w.label) labelEl.textContent = w.label;
      const titleEl = section.querySelector('.section-title');
      if (titleEl && w.title) titleEl.innerHTML = w.title.replace('শিখবেন?', '<span>শিখবেন?</span>');
      const subEl = section.querySelector('.section-sub');
      if (subEl && w.subtitle) subEl.textContent = w.subtitle;

      const grid = section.querySelector('.why-grid');
      if (grid && Array.isArray(w.cards) && w.cards.length > 0) {
        grid.innerHTML = w.cards.map((c, idx) => `
          <div class="why-card reveal" style="transition-delay:${(idx % 3) * 0.1}s">
            <div class="why-icon">${c.icon || '🎓'}</div>
            <div class="why-title">${c.title || ''}</div>
            <p class="why-desc">${c.desc || ''}</p>
          </div>
        `).join('');
      }
    }
  }

  // 5. METHODOLOGY
  if (content.methodology) {
    const m = content.methodology;
    const mSection = document.querySelector('section[style*="rgba(15,39,68,0.02)"]');
    if (mSection) {
      const label = mSection.querySelector('.section-label');
      if (label && m.label) label.textContent = m.label;
      const title = mSection.querySelector('.section-title');
      if (title && m.title) title.innerHTML = m.title;
      const sub = mSection.querySelector('.section-sub');
      if (sub && m.subtitle) sub.textContent = m.subtitle;

      const container = mSection.querySelector('.container > div[style*="grid-template-columns"]');
      if (container && Array.isArray(m.cards) && m.cards.length > 0) {
        container.innerHTML = m.cards.map(c => `
          <div class="card" style="background:#fff;border:1.5px solid var(--border);border-radius:20px;padding:32px;box-shadow:var(--shadow);transition:transform 0.3s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="width:52px;height:52px;border-radius:14px;background:rgba(30,96,145,0.1);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:18px;">${c.icon || '📚'}</div>
            <h3 style="font-size:20px;font-weight:800;color:var(--blue-dark);margin-bottom:12px;">${c.title || ''}</h3>
            <p style="color:var(--text);font-size:15px;line-height:1.8;margin-bottom:14px;">${c.desc || ''}</p>
            ${c.highlight ? `<div style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:700;color:var(--blue);">${c.highlight}</div>` : ''}
          </div>
        `).join('');
      }
    }
  }

  // 6. PROCESS (4 Steps)
  if (content.process) {
    const p = content.process;
    const pSection = document.querySelector('.process-section');
    if (pSection) {
      const label = pSection.querySelector('.section-label');
      if (label && p.label) label.textContent = p.label;
      const title = pSection.querySelector('.section-title');
      if (title && p.title) title.innerHTML = p.title;
      const sub = pSection.querySelector('.section-sub');
      if (sub && p.subtitle) sub.textContent = p.subtitle;

      const stepsContainer = pSection.querySelector('.process-steps');
      if (stepsContainer && Array.isArray(p.steps) && p.steps.length > 0) {
        stepsContainer.innerHTML = p.steps.map((st, idx) => `
          <div class="p-step reveal" style="transition-delay:${idx * 0.1}s">
            <div class="p-step-num">${st.num || (idx + 1)}</div>
            <div class="p-step-title">${st.title || ''}</div>
            <p class="p-step-desc">${st.desc || ''}</p>
          </div>
        `).join('');
      }
    }
  }

  // 7. PAID COURSES
  if (content.paid_courses) {
    const pc = content.paid_courses;
    const coursesSection = document.querySelector('#page-courses .courses-section');
    if (coursesSection) {
      const grid = coursesSection.querySelector('.courses-grid');
      if (grid && Array.isArray(pc.courses) && pc.courses.length > 0) {
        const waNumber = content.general?.whatsapp_number || '8801733017521';
        grid.innerHTML = pc.courses.map((c, idx) => {
          const themeClass = c.theme === 'gold' ? 'course-head-gold' : c.theme === 'teal' ? 'course-head-teal' : 'course-head-blue';
          const btnClass = c.theme === 'gold' ? 'btn btn-primary btn-full' : 'btn btn-blue btn-full';
          const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(c.wa_message || `আসসালামু আলাইকুম! আমি '${c.title}' কোর্সে ভর্তি হতে আগ্রহী।`)}`;
          
          return `
            <div class="course-card reveal" style="transition-delay:${idx * 0.1}s">
              <div class="course-head ${themeClass}">
                <span class="course-emoji">${c.emoji || '📖'}</span>
                <div class="course-title-text">${c.title || ''}</div>
                <div class="course-tagline">${c.tagline || ''}</div>
              </div>
              <div class="course-body">
                <ul class="course-features">
                  ${(c.features || []).map(f => `<li>${f}</li>`).join('')}
                </ul>
                ${c.admission_fee ? `
                  <div class="admission-fee-row">
                    <span class="admission-fee-label">🎓 ভর্তি ফি (একবার)</span>
                    <span class="admission-fee-amount">${c.admission_fee}</span>
                  </div>
                ` : ''}
                <div class="course-price">
                  ${c.old_price ? `
                    <div class="course-price-top">
                      <span class="amount-old">${c.old_price}</span>
                      ${c.discount ? `<span class="discount-badge">${c.discount}</span>` : ''}
                    </div>
                  ` : ''}
                  <div style="display:flex;align-items:baseline;gap:6px;">
                    <span class="amount">${c.price || 'শিক্ষকের প্রোফাইল অনুযায়ী'}</span>
                    <span class="period">${c.period || '/মাসিক ফি'}</span>
                    ${c.badge ? `<span class="badge" style="margin-left:auto;">${c.badge}</span>` : ''}
                  </div>
                </div>
                <a href="${waUrl}" target="_blank" class="${btnClass}">${c.btn_text || 'শিক্ষক ডিরেক্টরি দেখুন →'}</a>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  }

  // 8. FAQ
  if (content.faq) {
    const faqData = content.faq;
    const faqSection = document.querySelector('.faq-section');
    if (faqSection) {
      const label = faqSection.querySelector('.section-label');
      if (label && faqData.label) label.textContent = faqData.label;
      const title = faqSection.querySelector('.section-title');
      if (title && faqData.title) title.innerHTML = faqData.title;

      const faqGrid = faqSection.querySelector('.faq-grid') || faqSection.querySelector('.faq-list');
      if (faqGrid && Array.isArray(faqData.items) && faqData.items.length > 0) {
        faqGrid.innerHTML = faqData.items.map((item, idx) => `
          <div class="faq-item reveal">
            <button class="faq-q" onclick="toggleFaq(this)">
              <span>${item.q}</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-a">
              <p>${item.a}</p>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // 9. CTA BANNERS
  if (content.cta) {
    const c = content.cta;
    document.querySelectorAll('.cta-section').forEach(ctaSec => {
      const titleEl = ctaSec.querySelector('.cta-title');
      if (titleEl && c.title) titleEl.innerHTML = c.title;
      const descEl = ctaSec.querySelector('.cta-desc');
      if (descEl && c.desc) descEl.textContent = c.desc;
      const btnEl = ctaSec.querySelector('.cta-btns a');
      if (btnEl && c.btn_text) btnEl.textContent = c.btn_text;
    });
  }

  // 10. ABOUT US
  if (content.about) {
    const ab = content.about;
    const aboutPage = document.getElementById('page-about');
    if (aboutPage) {
      const title = aboutPage.querySelector('h1, .section-title');
      if (title && ab.title) title.textContent = ab.title;
    }
  }

  // 11. CONTACT US
  if (content.contact) {
    const con = content.contact;
    const contactPage = document.getElementById('page-contact');
    if (contactPage) {
      document.querySelectorAll('[data-cms="phone1"]').forEach(el => el.textContent = con.phone1 || "");
      document.querySelectorAll('[data-cms="phone2"]').forEach(el => el.textContent = con.phone2 || "");
      document.querySelectorAll('[data-cms="email"]').forEach(el => el.textContent = con.email || "");
      document.querySelectorAll('[data-cms="address"]').forEach(el => el.textContent = con.address || "");
      document.querySelectorAll('[data-cms="hours"]').forEach(el => el.textContent = con.hours || "");
    }
  }

  // 12. FOOTER
  if (content.footer) {
    const ft = content.footer;
    const footerAbout = document.querySelector('footer .footer-about p, [data-cms="footer_about"]');
    if (footerAbout && ft.about_text) footerAbout.textContent = ft.about_text;
    const footerCopy = document.querySelector('footer .footer-bottom, [data-cms="copyright"]');
    if (footerCopy && ft.copyright) footerCopy.innerHTML = ft.copyright;
  }
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGicContent);
} else {
  initGicContent();
}


// ── LISTEN FOR REAL-TIME CMS PREVIEW UPDATES ─────────────────────────
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GIC_CMS_PREVIEW' && event.data.content) {
    window.GIC_SITE_CONTENT = event.data.content;
    applyDynamicContent(event.data.content);
  }
});
