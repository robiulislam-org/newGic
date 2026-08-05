import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8', errors='surrogatepass') as f:
    content = f.read()

fixes = [
    # Fix card titles 
    (
        '&#127760; Traffic Source Analysis</span>\n          <span class="sub">Where visitors are coming from</span>',
        '\U0001f310 \u099f\u09cd\u09b0\u09be\u09ab\u09bf\u0995 \u09b8\u09cb\u09b0\u09cd\u09b8 \u09ac\u09bf\u09b6\u09cd\u09b2\u09c7\u09b7\u09a3</span>\n          <span class="sub">\u0995\u09cb\u09a5\u09be \u09a5\u09c7\u0995\u09c7 \u09ad\u09bf\u099c\u09bf\u099f\u09b0 \u0986\u09b8\u099b\u09c7</span>'
    ),
    (
        '&#9201; Page Time Analysis</span>\n          <span class="sub">Average time on page (seconds)</span>',
        '\u23f1\ufe0f \u09aa\u09c7\u099c \u099f\u09be\u0987\u09ae \u09ac\u09bf\u09b6\u09cd\u09b2\u09c7\u09b7\u09a3</span>\n          <span class="sub">\u0997\u09a1\u09bc \u09b8\u09ae\u09af\u09bc (\u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1)</span>'
    ),
    (
        '&#128225; Source Details (All Time)',
        '\ud83d\udce1 \u09b8\u09cb\u09b0\u09cd\u09b8 \u09a1\u09bf\u099f\u09c7\u0987\u09b2\u09b8 (\u09b8\u09b0\u09cd\u09ac\u0995\u09be\u09b2\u09c0\u09a8)'
    ),
    (
        '&#127919; UTM Campaign Tracking',
        '\ud83c\udfaf UTM \u0995\u09cd\u09af\u09be\u09ae\u09cd\u09aa\u09c7\u0987\u09a8 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995\u09bf\u0982'
    ),
    (
        '&#128273; Top Pages by Views',
        '\ud83d\udd11 \u09b8\u09b0\u09cd\u09ac\u09be\u09a7\u09bf\u0995 \u09ad\u09bf\u0989 \u09aa\u09c7\u099c\u09b8\u09ae\u09c2\u09b9'
    ),
    (
        '&#8987; Average Time per Page',
        '\u231b \u09aa\u09c7\u099c \u0985\u09a8\u09c1\u09af\u09be\u09af\u09bc\u09c0 \u0997\u09a1\u09bc \u09b8\u09ae\u09af\u09bc'
    ),
    (
        '&#128172; WhatsApp Click Source Pages',
        '\ud83d\udcac \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa \u0995\u09cd\u09b2\u09bf\u0995 \u0989\u09ce\u09b8 \u09aa\u09c7\u099c'
    ),
    (
        '&#127757; Top Visitor Regions',
        '\ud83c\udf0d \u09aa\u09cd\u09b0\u09a7\u09be\u09a8 \u09ad\u09bf\u099c\u09bf\u099f\u09b0 \u0985\u099e\u09cd\u099a\u09b2\u09b8\u09ae\u09c2\u09b9'
    ),
    # Column headers
    ('<th>Campaign</th><th>Medium</th><th>Visits</th>',
     '<th>\u0995\u09cd\u09af\u09be\u09ae\u09cd\u09aa\u09c7\u0987\u09a8</th><th>\u09ae\u09bf\u09a1\u09bf\u09af\u09bc\u09be\u09ae</th><th>\u09ad\u09bf\u099c\u09bf\u099f</th>'),
    ('<th>Page Name</th><th>Total Views</th>',
     '<th>\u09aa\u09c7\u099c\u09c7\u09b0 \u09a8\u09be\u09ae</th><th>\u09ae\u09cb\u099f \u09ad\u09bf\u0989</th>'),
    ('<th>Page</th><th>Avg Time</th><th>Sessions</th>',
     '<th>\u09aa\u09c7\u099c</th><th>\u0997\u09a1\u09bc \u09b8\u09ae\u09af\u09bc</th><th>\u09b8\u09c7\u09b6\u09a8</th>'),
    ('<th>Source Page</th><th>Clicks</th>',
     '<th>\u0989\u09ce\u09b8 \u09aa\u09c7\u099c</th><th>\u0995\u09cd\u09b2\u09bf\u0995</th>'),
    ('<th>Country &amp; City</th><th>Events</th>',
     '<th>\u09a6\u09c7\u09b6 \u0993 \u09b6\u09b9\u09b0</th><th>\u0987\u09ad\u09c7\u09a8\u09cd\u099f</th>'),
    # "No data" messages
    ('No data yet</td></tr>', '\u0995\u09cb\u09a8\u09cb \u09a1\u09be\u099f\u09be \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf</td></tr>'),
    ('No UTM data</td></tr>', '\u0995\u09cb\u09a8\u09cb UTM \u09a1\u09be\u099f\u09be \u09a8\u09c7\u0987</td></tr>'),
    ('No data found</td></tr>', '\u0995\u09cb\u09a8\u09cb \u09a1\u09be\u099f\u09be \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf</td></tr>'),
    # sessions text
    (' sessions</td>', ' \u09b8\u09c7\u09b6\u09a8</td>'),
]

count = 0
for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        count += 1

# Encode back safely - remove surrogates first
content_bytes = content.encode('utf-8', errors='replace')
content_clean = content_bytes.decode('utf-8', errors='replace')

with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content_clean)

print(f"Done. Applied {count}/{len(fixes)} fixes. File length: {len(content_clean)}")
