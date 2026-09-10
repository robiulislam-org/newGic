import os

checks = {}

# Verify index.html meta upgrades
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

checks['Title upgraded'] = '\u09b9\u09c7\u09ab\u099c, \u09a8\u09be\u099c\u09c7\u09b0\u09be, \u09a4\u09be\u09ab\u09b8\u09c0\u09b0' in idx
checks['Desc upgraded'] = '\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6\u09c7\u09b0 \u09b8\u09c7\u09b0\u09be \u0985\u09a8\u09b2\u09be\u0987\u09a8' in idx
checks['Keywords expanded'] = 'arabic language teacher online' in idx
checks['Geo meta added'] = 'geo.region' in idx
checks['Course schema present'] = idx.count('@type') > 15
checks['ItemList schema'] = 'ItemList' in idx
checks['BreadcrumbList schema'] = 'BreadcrumbList' in idx
checks['FAQ expanded'] = idx.count('Question') >= 12
checks['SiteLinksSearchBox'] = 'SearchAction' in idx

# Verify teachers.html
with open('teachers.html', 'r', encoding='utf-8') as f:
    tch = f.read()
checks['Teachers meta upgraded'] = '\u09a8\u09be\u099c\u09c7\u09b0\u09be \u09b6\u09bf\u0995\u09cd\u09b7\u0995' in tch
checks['Teachers schema added'] = 'CollectionPage' in tch

# Verify AI files
checks['llms.txt exists'] = os.path.exists('llms.txt')
checks['ai-plugin.json exists'] = os.path.exists('.well-known/ai-plugin.json')
checks['security.txt exists'] = os.path.exists('.well-known/security.txt')

# Verify robots.txt
with open('robots.txt', 'r', encoding='utf-8') as f:
    rob = f.read()
checks['robots.txt GPTBot allowed'] = 'GPTBot' in rob
checks['robots.txt dashboard blocked'] = 'dashboard' in rob
checks['robots.txt ClaudeBot allowed'] = 'ClaudeBot' in rob

# Verify sitemap.xml
with open('sitemap.xml', 'r', encoding='utf-8') as f:
    sit = f.read()
checks['sitemap has services'] = 'services/hefz' in sit
checks['sitemap has llms.txt'] = 'llms.txt' in sit
checks['sitemap has hreflang'] = 'hreflang' in sit

# Verify service pages
for svc in ['quran-shikkha', 'hefz', 'nazera', 'tafseer', 'arabic-language', 'masla-masayel', 'dua-shikkha']:
    path = 'services/' + svc + '.html'
    checks['Service: ' + svc] = os.path.exists(path)

print('=== SEO VERIFICATION RESULTS ===')
all_ok = True
for check, result in checks.items():
    status = 'PASS' if result else 'FAIL'
    if not result:
        all_ok = False
    print(status + ' : ' + check)

print()
print('Overall: ALL PASSED' if all_ok else 'WARNING: Some checks failed')
