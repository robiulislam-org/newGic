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
    site_sub: "Quran Learning Online",
    logo_url: "logo.jpg",
    favicon_url: "favicon.png",
    phone_primary: "+880 1733-017521",
    phone_secondary: "+880 1712-345678",
    whatsapp_number: "8801733017521",
    whatsapp_default_msg: "আসসালামু আলাইকুম! আমি Global Islamic Care সম্পর্কে বিস্তারিত জানতে চাই।",
    email: "globalislamiccare@gmail.com",
    address: "ঢাকা, বাংলাদেশ (অনলাইন বিশ্বব্যাপী পাঠদান)",
    office_hours: "শনি – বৃহস্পতি: সকাল ৯:০০ – রাত ১০:০০",
    social_facebook: "https://facebook.com/globalislamiccare",
    social_youtube: "https://youtube.com/@globalislamiccare",
    social_telegram: "https://t.me/globalislamiccare",
    social_instagram: "",
    social_tiktok: "",
    announcement_enabled: false,
    announcement_text: "🌙 পবিত্র মাহে রমজান উপলক্ষে সকল কোর্সে বিশেষ ছাড় চলছে! সীমিত আসন।",
    announcement_link: "#courses"
  },
  hero: {
    badge: "ভর্তি চলছে",
    title_line1: "কোরআনের আলোয়",
    title_line2: "জীবন গড়ুন",
    arabic_ayah: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
    description: "অভিজ্ঞ শিক্ষকদের সাথে সহীহ শুদ্ধ কোরআন শিক্ষা। শিশু থেকে বয়স্ক — পরিবারের সকলের জন্য। বিশ্বের যেকোনো দেশ থেকে বাংলায় শিখুন।",
    wa_btn_text: "💬 WhatsApp করুন",
    courses_btn_text: "কোর্স দেখুন →",
    points: [
      "শনি–বুধ, প্রতিদিন ৫০ মিনিট ক্লাস",
      "কোরআন ও সুন্নাহর আদর্শে চরিত্র গঠন",
      "একই পরিবারের ২-৩ জন একসাথে শেখার সুবিধা",
      "সম্পূর্ণ বাংলায় পাঠদান"
    ],
    booking_title: "ফ্রি পরামর্শ বুক করুন",
    booking_sub: "সম্পূর্ণ বিনামূল্যে · কোনো বাধ্যবাধকতা নেই",
    booking_btn_text: "💬 WhatsApp-এ পরামর্শ নিন",
    booking_guarantee: "✓ সম্পূর্ণ বিনামূল্যে · ✓ কোনো বাধ্যবাধকতা নেই"
  },
  ticker: {
    items: [
      "অভিজ্ঞ শিক্ষকবৃন্দ",
      "সম্পূর্ণ বাংলায় পাঠদান",
      "কোরআন ও সুন্নাহর আদর্শ",
      "নৈতিক চরিত্র গঠন",
      "বিশ্বের যেকোনো দেশ থেকে",
      "শিশু থেকে বয়স্ক সবার জন্য",
      "পরিবারের ২-৩ জন একসাথে শেখার সুবিধা",
      "ফ্রি কাউন্সেলিং সেশন"
    ]
  },
  why_us: {
    label: "কেন আমরা?",
    title: "Global Islamic Care-এ কেন শিখবেন?",
    subtitle: "আধুনিক পদ্ধতি, অভিজ্ঞ শিক্ষক এবং সম্পূর্ণ বাংলায় পাঠদানের মাধ্যমে অনন্য শিক্ষার অভিজ্ঞতা।",
    cards: [
      { id: 1, icon: "🎓", title: "অভিজ্ঞ শিক্ষকবৃন্দ", desc: "আমাদের সকল শিক্ষক সনদপ্রাপ্ত — তাজউইদে দক্ষ এবং আন্তর্জাতিক মানের পাঠদানে অভিজ্ঞ।" },
      { id: 2, icon: "🌍", title: "যেকোনো দেশ থেকে", desc: "বাংলাদেশ, ইউকে, মালয়েশিয়া বা বিশ্বের যেকোনো প্রান্ত থেকে ক্লাস করুন — শুধু ইন্টারনেট থাকলেই হবে।" },
      { id: 3, icon: "🗣️", title: "সম্পূর্ণ বাংলায়", desc: "প্রতিটি ক্লাস শুদ্ধ বাংলায় পরিচালিত। মাতৃভাষায় শেখা সবচেয়ে সহজ ও কার্যকর।" },
      { id: 4, icon: "👨‍👩‍👧‍👦", title: "পরিবারের সকলের জন্য", desc: "৭ বছরের শিশু থেকে বয়স্ক — একই পরিবারের ২-৩ জন একসাথে গ্রুপে ক্লাস করার অনন্য সুযোগ।" },
      { id: 5, icon: "❤️", title: "কোরআনের প্রতি ভালোবাসা", desc: "আমরা চেষ্টা করি যেন আপনার সন্তানের মনে কুরআনের প্রতি ভালোবাসা সৃষ্টি হয় এবং সে নিজে থেকেই কুরআন ও সুন্নাহকে নিজের জীবনে ধারণ করার চেষ্টা করে।" },
      { id: 6, icon: "📅", title: "নিয়মিত সময়সূচি", desc: "শনিবার থেকে বুধবার, প্রতিটি ক্লাস ৫০ মিনিট। নিয়মিত পড়ায় দ্রুত উন্নতি নিশ্চিত।" }
    ]
  },
  methodology: {
    label: "শিক্ষাদান পদ্ধতি",
    title: "সহজ ও কার্যকর পদ্ধতিতে পাঠদান",
    subtitle: "শিশু থেকে বয়স্ক — প্রতিটি শিক্ষার্থীর জন্য রয়েছে সুনির্দিষ্ট ও আধুনিক কারিকুলাম।",
    cards: [
      {
        id: 1,
        icon: "📚",
        title: "📚 তেলাওয়াত পদ্ধতি",
        desc: "একেবারে বেসিক থেকে শুরু করে সহীহ শুদ্ধভাবে কোরআন পড়া শেখানো হয়। ৭+ বছর বয়সীরা দেড়–দুই মাসে এবং ১০+ বছর বয়সীরা এক মাসে কোরআন পড়তে শিখে যান।",
        highlight: "✓ নূরানী কায়দা থেকে শুরু করে সহীহ মাখরাজ ও তাজউইদ"
      },
      {
        id: 2,
        icon: "🏆",
        title: "🏆 হেফজ পদ্ধতি",
        desc: "শুরুতে একপেজ, তারপর ধীরে ধীরে বাড়ানো হয়। পুরনো পাঠ যেন ভুলে না যায় সেদিকে বিশেষ মনোযোগ দেওয়া হয়। তিন বছরের টার্গেটে সম্পূর্ণ হেফজ সম্পন্ন করা হয়।",
        highlight: "✓ নিয়মিত রিভিশন (দৌর), সবকী ও ৩ বছরের সম্পূর্ণ রোডম্যাপ"
      }
    ]
  },
  process: {
    label: "কিভাবে শুরু করবেন",
    title: "মাত্র ৪টি সহজ ধাপে শুরু করুন",
    subtitle: "ভর্তি থেকে ক্লাস শুরু — পুরো প্রক্রিয়া সহজ এবং ঝামেলামুক্ত।",
    steps: [
      { num: "১", title: "যোগাযোগ করুন", desc: "WhatsApp-এ মেসেজ করুন অথবা ফ্রি পরামর্শ বুক করুন।" },
      { num: "২", title: "পরামর্শ নিন", desc: "আপনার প্রয়োজন ও লক্ষ্য অনুযায়ী সঠিক কোর্স বেছে নিন।" },
      { num: "৩", title: "পেমেন্ট করুন", desc: "bKash, Nagad বা ব্যাংকে সহজে মাসিক ফি পরিশোধ করুন।" },
      { num: "৪", title: "ক্লাস শুরু!", desc: "নির্ধারিত সময়ে লাইভ ক্লাসে যোগ দিন এবং শেখা শুরু করুন।" }
    ]
  },
  paid_courses: {
    label: "আমাদের কোর্সসমূহ",
    title: "সহীহ কোরআন শিক্ষার সম্পূর্ণ প্যাকেজ",
    subtitle: "বেসিক থেকে হেফজ — সকল পর্যায়ের শিক্ষার্থীদের জন্য উপযুক্ত কোর্স।",
    courses: [
      {
        id: 1,
        theme: "blue",
        emoji: "📖",
        title: "কোরআন তেলাওয়াত",
        tagline: "বেসিক থেকে সহীহ পড়া পর্যন্ত",
        badge: "সাশ্রয়ী",
        admission_fee: "৳১,০০০",
        old_price: "৳৭,০০০",
        discount: "-৳২,০০০ ছাড়",
        price: "৳৫,০০০",
        period: "/মাস",
        features: [
          "হরফ চেনা থেকে শুরু — একেবারে বেসিক",
          "৭+ বছর বয়সী শিশুদের জন্য আদর্শ",
          "দেড়–দুই মাসে সহীহ তেলাওয়াত শিখুন",
          "সম্পূর্ণ বাংলায় পাঠদান",
          "শনি–বুধ, ৫০ মিনিট প্রতিটি ক্লাস"
        ],
        btn_text: "ভর্তি হতে WhatsApp করুন",
        wa_message: "আসসালামু আলাইকুম! আমি 'কোরআন তেলাওয়াত' কোর্সে ভর্তি হতে আগ্রহী।"
      },
      {
        id: 2,
        theme: "gold",
        emoji: "🌟",
        title: "তাজউইদ ও সহীহ কেরাত",
        tagline: "শুদ্ধ উচ্চারণ ও মাখরাজ শিক্ষা",
        badge: "জনপ্রিয়",
        admission_fee: "৳১,৫০০",
        old_price: "৳৮,০০০",
        discount: "-৳২,৫০০ ছাড়",
        price: "৳৫,৫০০",
        period: "/মাস",
        features: [
          "তাজউইদের সকল নিয়ম বিস্তারিত শিক্ষা",
          "মাখরাজ ও সিফাত সহ শুদ্ধ উচ্চারণ",
          "১০+ বছর বয়সীদের জন্য উপযুক্ত",
          "বড়দের জন্যও বিশেষ ব্যবস্থা",
          "এক মাসে উল্লেখযোগ্য উন্নতি"
        ],
        btn_text: "ভর্তি হতে WhatsApp করুন",
        wa_message: "আসসালামু আলাইকুম! আমি 'তাজউইদ ও সহীহ কেরাত' কোর্সে ভর্তি হতে আগ্রহী।"
      },
      {
        id: 3,
        theme: "teal",
        emoji: "🏆",
        title: "হেফজ প্রোগ্রাম",
        tagline: "সম্পূর্ণ কোরআন হিফজ করুন",
        badge: "বিশেষ কোর্স",
        admission_fee: "৳২,০০০",
        old_price: "৳৯,০০০",
        discount: "-৳২,০০০ ছাড়",
        price: "৳৭,০০০",
        period: "/মাস",
        features: [
          "৩ বছরের টার্গেটে সম্পূর্ণ হেফজ",
          "বেসিক থেকে শুরু — ধীরে ধীরে বৃদ্ধি",
          "পুরনো পাঠ ভুলে না যায় সেদিকে বিশেষ মনোযোগ",
          "নিয়মিত রিভিশন ও মনিটরিং",
          "ফ্রি কাউন্সেলিং সেশন অন্তর্ভুক্ত"
        ],
        btn_text: "ভর্তি হতে WhatsApp করুন",
        wa_message: "আসসালামু আলাইকুম! আমি 'হেফজ প্রোগ্রাম' কোর্সে ভর্তি হতে আগ্রহী।"
      }
    ],
    family_offer: {
      emoji: "👨‍👩‍👧‍👦",
      title: "পারিবারিক গ্রুপ অফার",
      desc: "একই পরিবারের ২-৩ জন একসাথে গ্রুপে পড়তে পারবেন — মাসিক ফি একজনের মতোই। একটি ভর্তি ফি দিয়ে পুরো পরিবারের সাশ্রয়। পরিবারের সকলে একসাথে কোরআন শিখুন।",
      btn_text: "💬 পারিবারিক প্যাকেজ সম্পর্কে জানুন",
      wa_message: "আসসালামু আলাইকুম! আমি পারিবারিক গ্রুপ অফার সম্পর্কে বিস্তারিত জানতে চাই।"
    }
  },
  faq: {
    label: "সাধারণ জিজ্ঞাসা",
    title: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
    items: [
      { q: "ক্লাস কীভাবে হবে?", a: "ক্লাসগুলো Zoom অথবা Google Meet-এর মাধ্যমে লাইভ অনুষ্ঠিত হবে। শিক্ষক ও শিক্ষার্থী সরাসরি কথা বলতে ও স্ক্রিন শেয়ার করে পড়তে পারবেন।" },
      { q: "কোন বয়সে শুরু করা যাবে?", a: "৭ বছর বয়স থেকে শুরু করে যেকোনো বয়সের পুরুষ ও নারী আমাদের কাছে শিখতে পারেন। সবার জন্য আলাদা ব্যাচ ও উপযুক্ত কারিকুলাম রয়েছে।" },
      { q: "একই পরিবারের একাধিক সদস্য কি একসাথে পড়তে পারবে?", a: "হ্যাঁ! আমাদের বিশেষ পারিবারিক প্যাকেজে একই পরিবারের ২-৩ জন শিক্ষার্থী একসাথে একটি গ্রুপে ক্লাস করতে পারেন।" },
      { q: "মাসিক ফি কীভাবে পরিশোধ করতে হবে?", a: "bKash, Nagad, রকেট বা যেকোনো বাংলাদেশি ব্যাংক অ্যাকাউন্টে এবং বিদেশ থেকে রেমিট্যান্স/মানিগ্রাম বা কার্ডের মাধ্যমে সহজে ফি প্রদান করা যায়।" },
      { q: "ক্লাসের সময়সূচি কেমন?", a: "শনিবার থেকে বুধবার সপ্তাহে ৫ দিন ক্লাস। প্রতিদিন ৫০ মিনিট করে ক্লাস হয়। শিক্ষার্থী ও শিক্ষকের পারস্পরিক সুবিধাজনক সময় নির্ধারণ করা হয়।" }
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
    title: "এখনই শুরু করুন — ফ্রি পরামর্শ নিন",
    desc: "কোন কোর্স আপনার জন্য সঠিক জানতে WhatsApp করুন।",
    btn_text: "💬 WhatsApp: +880 1733-017521",
    phone: "+880 1733-017521"
  },
  about: {
    title: "আমাদের সম্পর্কে",
    subtitle: "Global Islamic Care একটি আন্তর্জাতিক মানের অনলাইন কোরআন শিক্ষা প্রতিষ্ঠান।",
    story: "আমাদের লক্ষ্য বিশ্বব্যাপী ছড়িয়ে থাকা বাংলাভাষী মুসলিমদের কাছে বিশুদ্ধ কোরআনের শিক্ষা সহজে পৌঁছে দেওয়া। দেশ-বিদেশের অভিজ্ঞ ও যোগ্য শিক্ষকদের তত্ত্বাবধানে আমরা শিক্ষার্থীদের আন্তরিকতার সাথে গড়ে তুলছি।",
    mission: "প্রতিটি ঘরে ঘরে সহীহ শুদ্ধ কোরআনের বাণী পৌঁছে দেওয়া এবং কোরআন-সুন্নাহ ভিত্তিক আদর্শ প্রজন্ম গড়ে তোলা।",
    vision: "একটি বিশ্বস্ত ও আধুনিক ইসলামিক শিক্ষাকেন্দ্র হিসেবে বিশ্বজুড়ে মুসলিমদের দ্বীনি শিক্ষায় পথপ্রদর্শক হওয়া।",
    stats: [
      { num: "৫,০০০+", label: "সফল শিক্ষার্থী" },
      { num: "১০০+", label: "যোগ্য ও অভিজ্ঞ শিক্ষক" },
      { num: "২০+", label: "দেশ থেকে শিক্ষার্থী" },
      { num: "৯৮%", label: "সন্তুষ্টি হার" }
    ]
  },
  contact: {
    title: "যোগাযোগ করুন",
    subtitle: "যেকোনো তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।",
    phone1: "+880 1733-017521",
    phone2: "+880 1712-345678",
    whatsapp: "+880 1733-017521",
    email: "globalislamiccare@gmail.com",
    address: "মিরপুর, ঢাকা - ১২১৬, বাংলাদেশ",
    hours: "প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত",
    map_embed_url: ""
  },
  policies: {
    privacy_policy: "Global Islamic Care-এ আমরা আমাদের শিক্ষার্থীদের ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত করি। আপনার নাম, ফোন নম্বর, ইমেইল বা অন্যান্য ব্যক্তিগত তথ্য শুধুমাত্র ক্লাস ও অ্যাকাডেমিক যোগাযোগের জন্য ব্যবহৃত হয় এবং কোনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
    payment_policy: "ভর্তির পূর্বে বিনামূল্যে পরামর্শ গ্রহণ করা যায়। ভর্তি নিশ্চিত করার পর নির্ধারিত মাসিক ফি মাসের প্রথম সপ্তাহে পরিশোধযোগ্য। বিশেষ পরিস্থিতিতে কোর্স পরিবর্তন বা রিফান্ডের জন্য কর্তৃপক্ষের সাথে যোগাযোগ করতে হবে।",
    terms_conditions: "সকল শিক্ষার্থী ও অভিভাবককে ক্লাসের নির্দিষ্ট সময়সূচি মেনে চলতে হবে। কোনো কারণে ক্লাস মিস হলে শিক্ষকের সাথে সমন্বয় করে মেকআপ ক্লাস নেওয়ার সুযোগ থাকবে।"
  },
  footer: {
    about_text: "Global Islamic Care — দেশ ও বিদেশের বাংলাভাষীদের জন্য আধুনিক ও বিশ্বস্ত অনলাইন কোরআন শিক্ষা প্রতিষ্ঠান।",
    copyright: "© ২০২৬ Global Islamic Care. সর্বস্বত্ব সংরক্ষিত।",
    developer_credit: "Powered by Global Islamic Care Tech"
  }
};

// Global active site content instance
window.GIC_SITE_CONTENT = { ...DEFAULT_SITE_CONTENT };

// ── INITIALIZE & LOAD FROM STORAGE / DATABASE ────────────────────────
function initGicContent() {
  // 1. Try loading cached data instantly
  try {
    const cached = localStorage.getItem('gic_site_content');
    if (cached) {
      const parsed = JSON.parse(cached);
      window.GIC_SITE_CONTENT = { ...DEFAULT_SITE_CONTENT, ...parsed };
      applyDynamicContent(window.GIC_SITE_CONTENT);
    } else {
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
      titleEl.innerHTML = `<span class="gold">${h.title_line1}</span><br>${h.title_line2 ? `জীবন <span class="blue">${h.title_line2}</span>` : ''}`;
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
                    <span class="amount">${c.price || '৳৫,০০০'}</span>
                    <span class="period">${c.period || '/মাস'}</span>
                    ${c.badge ? `<span class="badge" style="margin-left:auto;">${c.badge}</span>` : ''}
                  </div>
                </div>
                <a href="${waUrl}" target="_blank" class="${btnClass}">${c.btn_text || 'ভর্তি হতে WhatsApp করুন'}</a>
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
