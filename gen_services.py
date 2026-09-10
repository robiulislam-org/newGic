import os

def make_service_page(filename, title_bn, title_en, desc_bn, keywords_bn, keywords_en,
                      arabic_text, h1_bn, h1_span, hero_desc,
                      features, faq_items, other_links, service_teaches):
    
    other_html = ''
    for link_text, link_href in other_links:
        other_html += f'      <div class="card" style="padding:16px;"><a href="{link_href}" style="color:#0D3D6B; text-decoration:none; font-weight:700;">{link_text} &rarr;</a></div>\n'

    features_html = ''
    for icon, ftitle, fdesc in features:
        features_html += f'''    <div class="card">
      <div class="icon">{icon}</div>
      <h3>{ftitle}</h3>
      <p>{fdesc}</p>
    </div>\n'''

    faq_html = ''
    for q, a in faq_items:
        faq_html += f'''  <div class="faq-item">
    <h3>{q}</h3>
    <p>{a}</p>
  </div>\n'''

    faq_schema = ''
    for q, a in faq_items[:3]:
        faq_schema += f'''        {{
          "@type": "Question",
          "name": "{q}",
          "acceptedAnswer": {{"@type": "Answer", "text": "{a}"}}
        }},\n'''
    faq_schema = faq_schema.rstrip(',\n')

    teaches_json = '", "'.join(service_teaches)

    url = f'https://globalislamiccare.com/services/{filename}'
    breadcrumb_name = title_bn.split('—')[0].strip()

    html = f'''<!DOCTYPE html>
<html lang="bn">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8EEYP7ER25"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());

    gtag('config', 'G-8EEYP7ER25');
  </script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title_bn} | অনলাইন ইসলামিক শিক্ষক | Global Islamic Care</title>
<meta name="description" content="{desc_bn}">
<meta name="keywords" content="{keywords_bn}, {keywords_en}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="Global Islamic Care">
<meta name="language" content="Bengali">
<meta name="geo.region" content="BD">
<meta name="coverage" content="Worldwide">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="bn" href="{url}">
<link rel="alternate" hreflang="x-default" href="{url}">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{title_bn} | Global Islamic Care">
<meta property="og:description" content="{desc_bn}">
<meta property="og:image" content="https://globalislamiccare.com/og-image.jpg">
<meta property="og:site_name" content="Global Islamic Care">
<meta property="og:locale" content="bn_BD">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title_bn} | Global Islamic Care">
<meta name="twitter:description" content="{desc_bn}">
<meta name="twitter:image" content="https://globalislamiccare.com/og-image.jpg">
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@graph": [
    {{
      "@type": "Course",
      "name": "{title_bn}",
      "description": "{desc_bn}",
      "provider": {{
        "@type": "EducationalOrganization",
        "name": "Global Islamic Care",
        "url": "https://globalislamiccare.com"
      }},
      "url": "{url}",
      "educationalLevel": "Beginner to Advanced",
      "courseMode": "online",
      "inLanguage": ["Bengali", "English"],
      "teaches": ["{teaches_json}"]
    }},
    {{
      "@type": "WebPage",
      "url": "{url}",
      "name": "{title_bn} | Global Islamic Care",
      "breadcrumb": {{
        "@type": "BreadcrumbList",
        "itemListElement": [
          {{"@type": "ListItem", "position": 1, "name": "\u09b9\u09cb\u09ae", "item": "https://globalislamiccare.com/"}},
          {{"@type": "ListItem", "position": 2, "name": "\u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8", "item": "https://globalislamiccare.com/#services"}},
          {{"@type": "ListItem", "position": 3, "name": "{breadcrumb_name}", "item": "{url}"}}
        ]
      }}
    }},
    {{
      "@type": "FAQPage",
      "mainEntity": [
{faq_schema}
      ]
    }}
  ]
}}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ font-family: 'Noto Serif Bengali', serif; background: #FBF7F0; color: #1C2B3A; line-height: 1.7; }}
  .hero {{ background: linear-gradient(135deg, #0A1628 0%, #0D3D6B 100%); padding: 80px 24px 60px; text-align: center; }}
  .hero-arabic {{ font-family: 'Amiri', serif; font-size: 28px; color: #C8972A; direction: rtl; margin-bottom: 12px; }}
  .hero h1 {{ color: #fff; font-size: clamp(22px, 4vw, 38px); margin-bottom: 14px; font-weight: 900; }}
  .hero p {{ color: rgba(255,255,255,0.75); font-size: 16px; max-width: 620px; margin: 0 auto 28px; }}
  .btn {{ display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #C8972A, #E4B94A); color: #0A1628; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 16px; text-decoration: none; }}
  .container {{ max-width: 880px; margin: 0 auto; padding: 60px 24px; }}
  .section-title {{ font-size: 26px; color: #0D3D6B; margin-bottom: 24px; }}
  .cards {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px; }}
  .card {{ background: #fff; border: 1.5px solid rgba(26,95,158,0.12); border-radius: 16px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }}
  .card .icon {{ font-size: 32px; margin-bottom: 12px; }}
  .card h3 {{ color: #0D3D6B; font-size: 17px; margin-bottom: 8px; }}
  .card p {{ color: #5A7A9A; font-size: 14px; line-height: 1.7; }}
  .cta-block {{ background: linear-gradient(135deg, #0D3D6B, #1A5F9E); border-radius: 20px; padding: 40px; text-align: center; color: #fff; }}
  .cta-block h2 {{ font-size: 24px; margin-bottom: 12px; }}
  .cta-block p {{ opacity: 0.8; margin-bottom: 24px; }}
  .nav {{ background: #0A1628; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }}
  .nav-logo {{ color: #E4B94A; font-weight: 700; font-size: 18px; text-decoration: none; }}
  .nav a {{ color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; padding: 8px 12px; }}
  .faq-item {{ background: #fff; border: 1px solid rgba(26,95,158,0.12); border-radius: 12px; padding: 20px 24px; margin-bottom: 12px; }}
  .faq-item h3 {{ color: #0D3D6B; font-size: 16px; margin-bottom: 8px; }}
  .faq-item p {{ color: #5A7A9A; font-size: 14px; }}
  footer {{ background: #0A1628; color: rgba(255,255,255,0.7); text-align: center; padding: 24px; font-size: 13px; }}
  footer a {{ color: #E4B94A; text-decoration: none; }}
</style>
</head>
<body>
<nav class="nav">
  <a href="/" class="nav-logo">&#9770; Global Islamic Care</a>
  <div>
    <a href="/">\u09b9\u09cb\u09ae</a>
    <a href="/teachers.html">\u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u0996\u09c1\u0981\u099c\u09c1\u09a8</a>
    <a href="/library.html">\u09b2\u09be\u0987\u09ac\u09cd\u09b0\u09c7\u09b0\u09bf</a>
  </div>
</nav>
<div class="hero">
  <div class="hero-arabic">{arabic_text}</div>
  <h1>{h1_bn}<br><span style="color:#E4B94A;">{h1_span}</span></h1>
  <p>{hero_desc}</p>
  <a href="/teachers.html" class="btn">&#127891; \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u0996\u09c1\u0981\u099c\u09c1\u09a8 \u2014 \u09ac\u09bf\u09a8\u09be\u09ae\u09c2\u09b2\u09cd\u09af\u09c7 &rarr;</a>
</div>
<div class="container">
  <h2 class="section-title">&#128218; \u0995\u09c0 \u0995\u09c0 \u09b6\u09bf\u0996\u09ac\u09c7\u09a8?</h2>
  <div class="cards">
{features_html}  </div>

  <h2 class="section-title" style="margin-top:8px;">&#10067; \u09b8\u099a\u09b0\u09be\u099a\u09b0 \u099c\u09bf\u099c\u09cd\u099e\u09be\u09b8\u09be</h2>
{faq_html}

  <div class="cta-block" style="margin-top:48px;">
    <h2>\u0986\u099c\u0987 \u09b6\u09c1\u09b0\u09c1 \u0995\u09b0\u09c1\u09a8 \u2014 \u09ab\u09cd\u09b0\u09bf \u099f\u09cd\u09b0\u09be\u09af\u09bc\u09be\u09b2 \u0995\u09cd\u09b2\u09be\u09b8</h2>
    <p>\u09aa\u099b\u09a8\u09cd\u09a6\u09c7\u09b0 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09ac\u09c7\u099b\u09c7 \u09a8\u09bf\u09a8, WhatsApp-\u098f \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8 \u098f\u09ac\u0982 \u09ab\u09cd\u09b0\u09bf \u099f\u09cd\u09b0\u09be\u09af\u09bc\u09be\u09b2 \u0995\u09cd\u09b2\u09be\u09b8\u09c7\u09b0 \u09ac\u09cd\u09af\u09ac\u09b8\u09cd\u09a5\u09be \u0995\u09b0\u09c1\u09a8\u0964</p>
    <a href="/teachers.html" class="btn">&#128269; \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u0996\u09c1\u0981\u099c\u09c1\u09a8 &rarr;</a>
  </div>

  <div style="margin-top:48px; border-top: 1px solid rgba(26,95,158,0.12); padding-top:32px;">
    <h2 class="section-title">\u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af \u0987\u09b8\u09b2\u09be\u09ae\u09bf\u0995 \u09b6\u09bf\u0995\u09cd\u09b7\u09be \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8</h2>
    <div class="cards" style="gap:12px;">
{other_html}    </div>
  </div>
</div>
<footer>
  <p>&copy; 2026 <a href="/">\u0997\u09cd\u09b2\u09cb\u09ac\u09be\u09b2 \u0987\u09b8\u09b2\u09be\u09ae\u09bf\u0995 \u0995\u09c7\u09af\u09bc\u09be\u09b0</a> \u2014 \u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0987\u09b8\u09b2\u09be\u09ae\u09bf\u0995 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b2\u09cd\u09af\u09be\u099f\u09ab\u09b0\u09cd\u09ae | &#9742; +8801733017521</p>
  <p style="margin-top:8px;">
    <a href="/">\u09b9\u09cb\u09ae</a> &nbsp;|&nbsp;
    <a href="/teachers.html">\u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u0996\u09c1\u0981\u099c\u09c1\u09a8</a> &nbsp;|&nbsp;
    <a href="/library.html">\u09a1\u09bf\u099c\u09bf\u099f\u09be\u09b2 \u09b2\u09be\u0987\u09ac\u09cd\u09b0\u09c7\u09b0\u09bf</a>
  </p>
</footer>
</body>
</html>'''
    return html


os.makedirs('services', exist_ok=True)

COMMON_LINKS_ALL = [
    ('📗 হেফজুল কোরআন', '/services/hefz.html'),
    ('📘 নাজেরা পড়া', '/services/nazera.html'),
    ('📙 কোরআন তাফসীর', '/services/tafseer.html'),
    ('🇸🇦 আরবি ভাষা', '/services/arabic-language.html'),
    ('📕 মাসলা-মাসায়েল', '/services/masla-masayel.html'),
    ('🤲 দুয়া শিক্ষা', '/services/dua-shikkha.html'),
    ('📖 কোরআন তেলাওয়াত', '/services/quran-shikkha.html'),
]

# ── HEFZ PAGE ──────────────────────────────────────────────────────────────
page = make_service_page(
    filename='hefz.html',
    title_bn='হেফজুল কোরআন — অনলাইনে সম্পূর্ণ কোরআন হিফজ শিক্ষা',
    title_en='Online Hifz Quran Teacher',
    desc_bn='Global Islamic Care-এ সনদপ্রাপ্ত হাফেজ শিক্ষকের সাথে অনলাইনে হেফজুল কোরআন শিখুন। নিয়মিত পাঠ পরিকল্পনা, পুনরাবৃত্তি পদ্ধতি ও সরাসরি ১-অন-১ লাইভ ক্লাসে সম্পূর্ণ কোরআন মুখস্থ করুন।',
    keywords_bn='হেফজুল কোরআন, হিফজ শিক্ষক অনলাইন, অনলাইন হেফজ, কোরআন মুখস্থ শিক্ষক, হাফেজ শিক্ষক',
    keywords_en='online hifz teacher, quran memorization teacher, hafez teacher online, quran hifz online bangladesh',
    arabic_text='وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ',
    h1_bn='হেফজুল কোরআন',
    h1_span='অনলাইনে সম্পূর্ণ কোরআন হিফজ',
    hero_desc='সনদপ্রাপ্ত হাফেজ শিক্ষকের সাথে নিয়মিত পাঠ পরিকল্পনায় সম্পূর্ণ কোরআন মুখস্থ করুন। ১-অন-১ লাইভ ক্লাস, নিজের সময়মতো।',
    features=[
        ('📗', 'নিয়মিত সবক', 'প্রতিদিনের সবক পরিকল্পনা এবং মুতালাআ পদ্ধতিতে কোরআন মুখস্থ শেখানো হয়।'),
        ('🔄', 'পুনরাবৃত্তি পদ্ধতি', 'পুরনো পাঠ মজবুত করতে সাবক, মানযিল ও দাওর পদ্ধতিতে হিফজ সংরক্ষণ।'),
        ('🎓', 'সনদপ্রাপ্ত শিক্ষক', 'সনদপ্রাপ্ত হাফেজ শিক্ষক যারা নিজেরা হাফেজ এবং শেখানোতে অভিজ্ঞ।'),
    ],
    faq_items=[
        ('অনলাইনে হিফজ করা কি সম্ভব?', 'হ্যাঁ। অনেক শিক্ষার্থী অনলাইনে ১-অন-১ ক্লাসে সফলভাবে কোরআন হিফজ করেছেন।'),
        ('হিফজ কতদিনে শেষ হয়?', 'নিয়মিতভাবে পড়লে সাধারণত ২ থেকে ৫ বছরে সম্পূর্ণ হিফজ হয়। তবে এটি ব্যক্তিভেদে ভিন্ন।'),
        ('হেফজ শিক্ষক কোথায় পাব?', 'globalislamiccare.com/teachers.html-এ গিয়ে হেফজ বিষয়ক শিক্ষকদের প্রোফাইল দেখুন।'),
    ],
    other_links=[l for l in COMMON_LINKS_ALL if 'hefz' not in l[1]],
    service_teaches=['Quran Memorization', 'Hifz', 'Sabak', 'Manzil', 'Dawr'],
)
open('services/hefz.html', 'w', encoding='utf-8').write(page)
print('hefz.html created')

# ── NAZERA PAGE ────────────────────────────────────────────────────────────
page = make_service_page(
    filename='nazera.html',
    title_bn='নাজেরা কোরআন পড়া — ধারাবাহিকভাবে সম্পূর্ণ কোরআন পড়া',
    title_en='Online Nazera Quran Teacher',
    desc_bn='Global Islamic Care-এ যোগ্য শিক্ষকের সাথে অনলাইনে নাজেরা কোরআন পড়া শিখুন। সহীহ তলফ্ফুজ দিয়ে ধারাবাহিকভাবে সম্পূর্ণ কোরআন পড়ার দক্ষতা অর্জন করুন।',
    keywords_bn='নাজেরা শিক্ষক, কোরআন নাজেরা অনলাইন, নাজেরা পড়া শিক্ষক, অনলাইন নাজেরা',
    keywords_en='nazera teacher online, quran fluent reading teacher, online quran teacher bangladesh, learn quran fluently',
    arabic_text='إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي',
    h1_bn='নাজেরা কোরআন পড়া',
    h1_span='ধারাবাহিকভাবে সম্পূর্ণ কোরআন পড়ুন',
    hero_desc='সহীহ তলফ্ফুজ ও প্রবাহ দিয়ে ধারাবাহিকভাবে সম্পূর্ণ কোরআন পড়ার দক্ষতা অর্জন করুন। অভিজ্ঞ শিক্ষকের সাথে ১-অন-১ লাইভ ক্লাস।',
    features=[
        ('📘', 'প্রবাহ শিক্ষা', 'থামা-থামা পড়া থেকে মুক্তি — ধারাবাহিকভাবে সুন্দরভাবে কোরআন পড়া শিখুন।'),
        ('🗣️', 'সঠিক উচ্চারণ', 'মাখরাজ ও সিফাত অনুযায়ী প্রতিটি হরফের সঠিক উচ্চারণ নিশ্চিত করা হয়।'),
        ('🌟', 'পারা শেষ করা', 'ক্রমান্বয়ে পারা শেষ করে সম্পূর্ণ কোরআন পড়া শেষ করার লক্ষ্যে কাজ।'),
    ],
    faq_items=[
        ('নাজেরা ও তেলাওয়াতের পার্থক্য কী?', 'তেলাওয়াত মানে পড়তে পারা, নাজেরা মানে সুন্দরভাবে প্রবাহে পুরো কোরআন পড়তে পারা।'),
        ('নাজেরা শিখতে কতদিন লাগবে?', 'যিনি ইতিমধ্যে কায়দা জানেন তার জন্য সাধারণত ৬ মাস থেকে ১ বছর লাগে।'),
        ('নাজেরা শিক্ষক পাব কোথায়?', 'globalislamiccare.com/teachers.html-এ গিয়ে নাজেরা বিষয়ক শিক্ষক খুঁজুন।'),
    ],
    other_links=[l for l in COMMON_LINKS_ALL if 'nazera' not in l[1]],
    service_teaches=['Nazera', 'Fluent Quran Reading', 'Tajweed Application', 'Quran Fluency'],
)
open('services/nazera.html', 'w', encoding='utf-8').write(page)
print('nazera.html created')

# ── TAFSEER PAGE ───────────────────────────────────────────────────────────
page = make_service_page(
    filename='tafseer.html',
    title_bn='কোরআন তাফসীর ও অর্থ শিক্ষা — অনলাইন কোরআন তাফসীর শিক্ষক',
    title_en='Online Quran Tafseer Teacher',
    desc_bn='Global Islamic Care-এ যোগ্য আলেম শিক্ষকের সাথে কোরআন মাজীদের অর্থ (বাংলা/ইংরেজি) ও তাফসীর ক্লাস করুন। আয়াতের গভীর ব্যাখ্যা, শানে নুযুল এবং কোরআনের বার্তা বুঝুন।',
    keywords_bn='কোরআন তাফসীর শিক্ষক, কোরআন অর্থ শিক্ষা অনলাইন, তাফসীর ক্লাস বাংলা, কোরআন বাংলা অর্থ শিক্ষক',
    keywords_en='quran tafseer teacher online, quran translation class, tafseer class bangla, quran meaning teacher, online tafseer class',
    arabic_text='كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ',
    h1_bn='কোরআন তাফসীর ও অর্থ শিক্ষা',
    h1_span='কোরআনের গভীর বার্তা বুঝুন',
    hero_desc='যোগ্য আলেম শিক্ষকের সাথে কোরআন মাজীদের অর্থ ও তাফসীর শিখুন। বাংলায় বা ইংরেজিতে ব্যাখ্যা সহ কোরআন বোঝার সুযোগ।',
    features=[
        ('📙', 'বাংলায় তাফসীর', 'প্রতিটি আয়াতের বাংলা অনুবাদ ও বিস্তারিত তাফসীর সহজ ভাষায় বোঝানো হয়।'),
        ('📚', 'শানে নুযুল', 'কোন আয়াত কখন কেন নাযিল হয়েছে তার ঐতিহাসিক প্রেক্ষাপট আলোচনা।'),
        ('💡', 'জীবনে প্রয়োগ', 'কোরআনের বার্তা দৈনন্দিন জীবনে কিভাবে প্রয়োগ করবেন তার নির্দেশনা।'),
    ],
    faq_items=[
        ('তাফসীর শিক্ষার জন্য কতটুকু কোরআন জানা থাকতে হবে?', 'তাফসীর শিক্ষার জন্য কোরআন পড়তে পারলেই হবে। শিক্ষক আয়াত পড়ে বাংলায় ব্যাখ্যা করবেন।'),
        ('কোন তাফসীর গ্রন্থ অনুসরণ করা হয়?', 'শিক্ষকের বিশেষজ্ঞতা অনুযায়ী তাফসীরে ইবনে কাসীর, জালালাইন বা অন্য নির্ভরযোগ্য তাফসীর অনুসরণ করা হয়।'),
        ('তাফসীর শিক্ষক কোথায় পাব?', 'globalislamiccare.com/teachers.html-এ গিয়ে তাফসীর বিষয়ক আলেম শিক্ষক খুঁজুন।'),
    ],
    other_links=[l for l in COMMON_LINKS_ALL if 'tafseer' not in l[1]],
    service_teaches=['Quran Tafseer', 'Quran Translation', 'Quran Exegesis', 'Shane Nuzool'],
)
open('services/tafseer.html', 'w', encoding='utf-8').write(page)
print('tafseer.html created')

# ── ARABIC LANGUAGE PAGE ───────────────────────────────────────────────────
page = make_service_page(
    filename='arabic-language.html',
    title_bn='আরবি ভাষা শিক্ষা — কোরআনি আরবি ও কথ্য আরবি অনলাইনে',
    title_en='Online Arabic Language Teacher Bangladesh',
    desc_bn='Global Islamic Care-এ আরবি ভাষা শিক্ষকের সাথে কোরআনি আরবি, নহব ও সরফ এবং কথ্য আরবি শিখুন। বাংলা ও ইংরেজিভাষী শিক্ষার্থীদের জন্য বিশেষভাবে তৈরি আরবি ভাষা কোর্স।',
    keywords_bn='আরবি ভাষা শিক্ষক অনলাইন, কোরআনি আরবি শিক্ষা, নহব সরফ শিক্ষক, আরবি ভাষা বাংলাদেশ, আরবি শিক্ষা অনলাইন',
    keywords_en='arabic language teacher online, arabic teacher bangladesh, quranic arabic teacher, arabic grammar teacher online, learn arabic online bangla',
    arabic_text='إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا',
    h1_bn='আরবি ভাষা শিক্ষা',
    h1_span='কোরআনি আরবি থেকে কথ্য আরবি',
    hero_desc='বাংলায় বোঝানো হয় এমন অভিজ্ঞ শিক্ষকের সাথে আরবি ভাষা শিখুন। নহব, সরফ এবং কথ্য আরবির বিশেষ কোর্স।',
    features=[
        ('🇸🇦', 'কোরআনি আরবি', 'কোরআন মাজীদ বোঝার জন্য কোরআনি আরবি ব্যাকরণ (নহব ও সরফ) শিক্ষা।'),
        ('💬', 'কথ্য আরবি', 'সৌদি আরবসহ আরব দেশে কাজের জন্য বা যোগাযোগের জন্য কথ্য আরবি শিক্ষা।'),
        ('📖', 'আরবি পড়া ও লেখা', 'আরবি হরফ পরিচিতি থেকে শুরু করে পড়া ও লেখার সম্পূর্ণ দক্ষতা অর্জন।'),
    ],
    faq_items=[
        ('বাংলা জেনে আরবি শেখা কি সহজ?', 'হ্যাঁ। GIC-এর শিক্ষকরা বাংলায় ব্যাখ্যা করে আরবি শেখান যা শেখাকে অনেক সহজ করে।'),
        ('কোরআন বোঝার জন্য কতটুকু আরবি শিখতে হবে?', 'কোরআনের ৭০%-এর বেশি শব্দ মাত্র ৩০০টি মূল শব্দ থেকে। এই ভিত্তি তৈরি হলে কোরআন বোঝা অনেক সহজ হয়।'),
        ('আরবি ভাষা শিক্ষক কোথায় পাব?', 'globalislamiccare.com/teachers.html-এ গিয়ে আরবি ভাষা বিষয়ক শিক্ষক খুঁজুন।'),
    ],
    other_links=[l for l in COMMON_LINKS_ALL if 'arabic' not in l[1]],
    service_teaches=['Arabic Language', 'Quranic Arabic', 'Nahw', 'Sarf', 'Conversational Arabic'],
)
open('services/arabic-language.html', 'w', encoding='utf-8').write(page)
print('arabic-language.html created')

# ── MASLA MASAYEL PAGE ─────────────────────────────────────────────────────
page = make_service_page(
    filename='masla-masayel.html',
    title_bn='মাসলা-মাসায়েল শিক্ষা — ইসলামিক ফিকহ অনলাইন ক্লাস',
    title_en='Online Islamic Masla Masayel Teacher',
    desc_bn='Global Islamic Care-এ মুফতি ও আলেম শিক্ষকের সাথে নামাজ, রোজা, যাকাত, হালাল-হারাম, পারিবারিক বিধান সহ প্রয়োজনীয় মাসলা-মাসায়েল শিখুন। দৈনন্দিন জীবনের ইসলামিক সমাধান।',
    keywords_bn='মাসলা মাসায়েল শিক্ষক, ইসলামিক ফিকহ অনলাইন, নামাজের মাসলা, ইসলামিক বিধান শিক্ষা, মুফতি শিক্ষক অনলাইন',
    keywords_en='masla masayel teacher online, islamic fiqh teacher, online islamic jurisprudence, daily masala teacher, mufti teacher online bangladesh',
    arabic_text='وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ',
    h1_bn='প্রয়োজনীয় মাসলা-মাসায়েল',
    h1_span='দৈনন্দিন জীবনের ইসলামিক বিধান',
    hero_desc='মুফতি ও আলেম শিক্ষকের সাথে নামাজ, রোজা, যাকাত, পারিবারিক বিধান ও দৈনন্দিন জীবনের মাসলা-মাসায়েল শিখুন।',
    features=[
        ('🕌', 'ইবাদতের মাসলা', 'নামাজ, রোজা, যাকাত, হজ্জ সহ সকল ইবাদতের বিস্তারিত মাসলা শিখুন।'),
        ('👨‍👩‍👧', 'পারিবারিক বিধান', 'বিবাহ, তালাক, মিরাস সহ পারিবারিক জীবনের ইসলামিক বিধান জানুন।'),
        ('💼', 'মুয়ামালাত', 'ব্যবসা-বাণিজ্য, ক্রয়-বিক্রয়, সুদ-ঘুষ সংক্রান্ত হালাল-হারামের বিধান।'),
    ],
    faq_items=[
        ('মাসলা-মাসায়েল কি অনলাইনে শেখা যায়?', 'হ্যাঁ। GIC-তে মুফতি ও আলেম শিক্ষকরা ১-অন-১ ক্লাসে বিস্তারিত মাসলা-মাসায়েল শেখান।'),
        ('মাসলা-মাসায়েল শিখতে কতদিন লাগবে?', 'বেসিক মাসলা শিখতে ৩-৬ মাস, বিস্তারিত জানতে আরও বেশি সময় লাগে। ধাপে ধাপে শেখা হয়।'),
        ('মাসলা-মাসায়েল শিক্ষক কোথায় পাব?', 'globalislamiccare.com/teachers.html-এ গিয়ে মুফতি ও আলেম শিক্ষক খুঁজুন।'),
    ],
    other_links=[l for l in COMMON_LINKS_ALL if 'masla' not in l[1]],
    service_teaches=['Islamic Jurisprudence', 'Fiqh', 'Masla Masayel', 'Ibadah Rules', 'Halal Haram'],
)
open('services/masla-masayel.html', 'w', encoding='utf-8').write(page)
print('masla-masayel.html created')

# ── DUA SHIKKHA PAGE ───────────────────────────────────────────────────────
page = make_service_page(
    filename='dua-shikkha.html',
    title_bn='দুয়া ও যিকর শিক্ষা — মাসনুন দুয়া মুখস্থ ও অর্থ বোঝা',
    title_en='Online Dua and Dhikr Teacher',
    desc_bn='Global Islamic Care-এ দৈনন্দিন জীবনের মাসনুন দুয়া, যিকর এবং কোরআন-হাদিসের দুয়া মুখস্থ করুন ও অর্থ বুঝুন। যোগ্য শিক্ষকের সাথে ১-অন-১ অনলাইন ক্লাস।',
    keywords_bn='দুয়া শিক্ষা অনলাইন, মাসনুন দুয়া শিক্ষক, যিকর শিক্ষা, ইসলামিক দুয়া শিখুন, হাদিসের দুয়া',
    keywords_en='dua teacher online, learn duas online, masnoon dua teacher, dhikr teacher, islamic dua learning bangladesh',
    arabic_text='وَاذْكُرُوا اللَّهَ كَثِيرًا',
    h1_bn='দুয়া ও যিকর শিক্ষা',
    h1_span='মাসনুন দুয়া মুখস্থ ও অর্থ বোঝা',
    hero_desc='দৈনন্দিন জীবনের গুরুত্বপূর্ণ মাসনুন দুয়া, যিকর এবং কোরআন-হাদিসের দুয়া শিখুন। অর্থ ও প্রেক্ষাপট সহ।',
    features=[
        ('🤲', 'মাসনুন দুয়া', 'ঘুম, ঘুম থেকে ওঠা, খাওয়া, বের হওয়া সহ দৈনন্দিন সকল মাসনুন দুয়া শেখানো হয়।'),
        ('📿', 'যিকর ও তাসবীহ', 'সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার সহ সকল যিকর ও তাসবীহ।'),
        ('💡', 'অর্থ ও প্রেক্ষাপট', 'প্রতিটি দুয়ার বাংলা অর্থ, গুরুত্ব ও কখন পড়তে হয় তা বিস্তারিত শেখানো হয়।'),
    ],
    faq_items=[
        ('দুয়া কি অনলাইনে শেখা সম্ভব?', 'হ্যাঁ। GIC-তে শিক্ষক উচ্চারণ শিখিয়ে, অর্থ বুঝিয়ে এবং নিয়মিত প্র্যাকটিসের মাধ্যমে দুয়া শেখান।'),
        ('শিশুদের দুয়া শেখানোর জন্য শিক্ষক আছে?', 'হ্যাঁ। শিশুদের জন্য বিশেষভাবে মজাদার পদ্ধতিতে দুয়া শেখানোর অভিজ্ঞতাসম্পন্ন শিক্ষক আছেন।'),
        ('দুয়া শিক্ষক কোথায় পাব?', 'globalislamiccare.com/teachers.html-এ গিয়ে দুয়া ও যিকর বিষয়ক শিক্ষক খুঁজুন।'),
    ],
    other_links=[l for l in COMMON_LINKS_ALL if 'dua' not in l[1]],
    service_teaches=['Duas', 'Dhikr', 'Masnoon Duas', 'Tasbih', 'Islamic Supplications'],
)
open('services/dua-shikkha.html', 'w', encoding='utf-8').write(page)
print('dua-shikkha.html created')

print('\nALL 6 service pages created successfully!')
