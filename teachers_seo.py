content = open('teachers.html', 'r', encoding='utf-8').read()

# Replace old minimal head with comprehensive one
old_head = '''  <!-- SEO Meta — updated dynamically by JS -->
  <link rel="icon" type="image/jpeg" href="logo.jpg">
  <link rel="apple-touch-icon" href="logo.jpg">
  <title id="pg-title">\u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 | GIC \u2014 Global Islamic Care</title>
  <meta name="description" id="pg-desc" content="GIC-\u098f\u09b0 \u09af\u09cb\u0997\u09cd\u09af \u0993 \u0985\u09ad\u09bf\u099c\u09cd\u099e \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09b8\u09b9\u09c0\u09b9 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0996\u09c1\u09a8\u0964 \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09c7\u09b0 \u09af\u09cb\u0997\u09cd\u09af\u09a4\u09be, \u0985\u09ad\u09bf\u099c\u09cd\u099e\u09a4\u09be \u0993 \u09b8\u09ae\u09af\u09bc\u09b8\u09c2\u099a\u09bf \u09a6\u09c7\u0996\u09c1\u09a8 \u098f\u09ac\u0982 \u09aa\u099b\u09a8\u09cd\u09a6\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc\u09c7 \u0995\u09cd\u09b2\u09be\u09b8 \u09ac\u09c1\u0995 \u0995\u09b0\u09c1\u09a8\u0964">
  <meta name="keywords" id="pg-kw" content="\u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09a4\u09be\u099c\u0989\u0987\u09a6 \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0995\u09cb\u09b0\u0986\u09a8, GIC">
  <meta name="robots" content="index, follow">
  <link rel="canonical" id="pg-canonical" href="https://globalislamiccare.com/teachers.html">

  <!-- Open Graph -->
  <meta property="og:locale" content="bn_BD">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="GIC \u2014 Global Islamic Care">
  <meta property="og:title" id="og-title" content="\u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 | GIC">
  <meta property="og:description" id="og-desc" content="GIC-\u098f\u09b0 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 \u09a6\u09c7\u0996\u09c1\u09a8\u0964">
  <meta property="og:image" id="og-img" content="https://globalislamiccare.com/og-image.jpg">
  <meta property="og:url" id="og-url" content="https://globalislamiccare.com/teachers.html">
  <meta name="twitter:card" content="summary_large_image">'''

new_head = '''  <!-- SEO Meta Tags -->
  <link rel="icon" type="image/jpeg" href="logo.jpg">
  <link rel="apple-touch-icon" href="logo.jpg">
  <title id="pg-title">\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 — \u09b9\u09c7\u09ab\u099c, \u09a8\u09be\u099c\u09c7\u09b0\u09be, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0, \u0986\u09b0\u09ac\u09bf \u09b6\u09bf\u0995\u09cd\u09b7\u0995 | Global Islamic Care</title>
  <meta name="description" id="pg-desc" content="Global Islamic Care-\u098f \u09af\u09be\u099a\u09be\u0987\u0995\u09c3\u09a4 \u09b9\u09be\u09ab\u09c7\u099c \u0993 \u0986\u09b2\u09c7\u09ae \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 \u09a6\u09c7\u0996\u09c1\u09a8\u0964 \u09b8\u09b9\u09c0\u09b9 \u0995\u09cb\u09b0\u0986\u09a8, \u09b9\u09c7\u09ab\u099c, \u09a8\u09be\u099c\u09c7\u09b0\u09be, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0, \u0986\u09b0\u09ac\u09bf \u09ad\u09be\u09b7\u09be, \u09ae\u09be\u09b8\u09b2\u09be-\u09ae\u09be\u09b8\u09be\u09af\u09bc\u09c7\u09b2 \u0993 \u09a6\u09c1\u09af\u09bc\u09be \u09b6\u09bf\u0996\u09be\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8 \u098f\u09ae\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u0996\u09c1\u0981\u099c\u09c1\u09a8 \u0993 \u09b8\u09b0\u09be\u09b8\u09b0\u09bf WhatsApp-\u098f \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964 \u09ab\u09cd\u09b0\u09bf \u099f\u09cd\u09b0\u09be\u09af\u09bc\u09be\u09b2 \u09b8\u09c1\u09ac\u09bf\u09a7\u09be\u09b8\u09b9\u0964">
  <meta name="keywords" id="pg-kw" content="\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09b9\u09be\u09ab\u09c7\u099c \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09a4\u09be\u099c\u09ac\u09c0\u09a6 \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09a8\u09be\u099c\u09c7\u09b0\u09be \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0 \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u0986\u09b0\u09ac\u09bf \u09ad\u09be\u09b7\u09be \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09ae\u09be\u09b8\u09b2\u09be \u09ae\u09be\u09b8\u09be\u09af\u09bc\u09c7\u09b2 \u09b6\u09bf\u0995\u09cd\u09b7\u0995, \u09a6\u09c1\u09af\u09bc\u09be \u09b6\u09bf\u0995\u09cd\u09b7\u09be, \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6, \u0987\u09b8\u09b2\u09be\u09ae\u09bf\u0995 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u0985\u09a8\u09b2\u09be\u0987\u09a8, \u09ac\u09bf\u09a8\u09be\u09ae\u09c2\u09b2\u09cd\u09af\u09c7 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2, GIC \u09b6\u09bf\u0995\u09cd\u09b7\u0995, online quran teacher, hafez teacher online, tajweed teacher online, nazera teacher, tafseer teacher, arabic teacher online bangladesh, global islamic care teachers, quran tutor bangladesh, online islamic teacher, quran teacher for kids online, hifz teacher online, best quran teacher online">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-image-preview:large">
  <meta name="rating" content="general">
  <meta name="language" content="Bengali">
  <meta name="geo.region" content="BD">
  <meta name="coverage" content="Worldwide">
  <link rel="canonical" id="pg-canonical" href="https://globalislamiccare.com/teachers.html">
  <link rel="alternate" hreflang="bn" href="https://globalislamiccare.com/teachers.html">
  <link rel="alternate" hreflang="x-default" href="https://globalislamiccare.com/teachers.html">

  <!-- Open Graph -->
  <meta property="og:locale" content="bn_BD">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Global Islamic Care">
  <meta property="og:title" id="og-title" content="\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 — \u09b9\u09c7\u09ab\u099c, \u09a8\u09be\u099c\u09c7\u09b0\u09be, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0, \u0986\u09b0\u09ac\u09bf \u09b6\u09bf\u0995\u09cd\u09b7\u0995 | GIC">
  <meta property="og:description" id="og-desc" content="\u09af\u09be\u099a\u09be\u0987\u0995\u09c3\u09a4 \u09b9\u09be\u09ab\u09c7\u099c \u0993 \u0986\u09b2\u09c7\u09ae \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 \u09a6\u09c7\u0996\u09c1\u09a8 \u2014 \u09af\u09cb\u0997\u09cd\u09af\u09a4\u09be, \u09ab\u09bf \u0993 \u09b8\u09ae\u09af\u09bc\u09b8\u09c2\u099a\u09bf \u09a6\u09c7\u0996\u09c7 \u09b8\u09b0\u09be\u09b8\u09b0\u09bf WhatsApp-\u098f \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964">
  <meta property="og:image" id="og-img" content="https://globalislamiccare.com/og-image.jpg">
  <meta property="og:url" id="og-url" content="https://globalislamiccare.com/teachers.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 | Global Islamic Care">
  <meta name="twitter:description" content="\u09af\u09be\u099a\u09be\u0987\u0995\u09c3\u09a4 \u09b9\u09be\u09ab\u09c7\u099c \u0993 \u0986\u09b2\u09c7\u09ae \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09e7-\u0985\u09a8-\u09e7 \u09b8\u09b9\u09c0\u09b9 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09c1\u09a8\u0964">
  <meta name="twitter:image" content="https://globalislamiccare.com/og-image.jpg">'''

content = content.replace(old_head, new_head)

# Replace old minimal structured data placeholder with proper schema
old_sd = '<script type="application/ld+json" id="structured-data">{}</script>'
new_sd = '''<script type="application/ld+json" id="structured-data">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://globalislamiccare.com/teachers.html",
      "url": "https://globalislamiccare.com/teachers.html",
      "name": "\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0995\u09cb\u09b0\u0986\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 — Global Islamic Care",
      "description": "\u09af\u09be\u099a\u09be\u0987\u0995\u09c3\u09a4 \u09b9\u09be\u09ab\u09c7\u099c \u0993 \u0986\u09b2\u09c7\u09ae \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2 \u09a6\u09c7\u0996\u09c1\u09a8 \u2014 \u09b8\u09b9\u09c0\u09b9 \u0995\u09cb\u09b0\u0986\u09a8, \u09b9\u09c7\u09ab\u099c, \u09a8\u09be\u099c\u09c7\u09b0\u09be, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0, \u0986\u09b0\u09ac\u09bf \u09ad\u09be\u09b7\u09be, \u09ae\u09be\u09b8\u09b2\u09be-\u09ae\u09be\u09b8\u09be\u09af\u09bc\u09c7\u09b2 \u09b6\u09bf\u0996\u09be\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7\u09a8 \u098f\u09ae\u09a8 \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09b8\u09be\u09a5\u09c7 \u09b8\u09b0\u09be\u09b8\u09b0\u09bf \u09af\u09cb\u0997\u09be\u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964",
      "isPartOf": {"@id": "https://globalislamiccare.com/#website"},
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type": "ListItem", "position": 1, "name": "\u09b9\u09cb\u09ae", "item": "https://globalislamiccare.com/"},
          {"@type": "ListItem", "position": 2, "name": "\u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2", "item": "https://globalislamiccare.com/teachers.html"}
        ]
      },
      "inLanguage": "bn-BD",
      "publisher": {"@id": "https://globalislamiccare.com/#organization"}
    },
    {
      "@type": "ItemList",
      "name": "\u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0987\u09b8\u09b2\u09be\u09ae\u09bf\u0995 \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2",
      "description": "Global Islamic Care-\u098f \u09af\u09be\u099a\u09be\u0987\u0995\u09c3\u09a4 \u0995\u09cb\u09b0\u0986\u09a8, \u09b9\u09c7\u09ab\u099c, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0, \u0986\u09b0\u09ac\u09bf \u09ad\u09be\u09b7\u09be \u09b6\u09bf\u0995\u09cd\u09b7\u0995\u09a6\u09c7\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be",
      "url": "https://globalislamiccare.com/teachers.html",
      "numberOfItems": "50+",
      "itemListOrder": "https://schema.org/ItemListUnordered"
    }
  ]
}
</script>'''

content = content.replace(old_sd, new_sd)

open('teachers.html', 'w', encoding='utf-8').write(content)
print('SUCCESS: teachers.html SEO upgraded')
