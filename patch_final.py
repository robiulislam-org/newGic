import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

fixes = [
    # Fix live table header - add Source column
    (
        '<th>\u0985\u099e\u09cd\u099a\u09b2 / \u09b6\u09b9\u09b0</th>\r\n                 <th>\u09b8\u0995\u09cd\u09b0\u09bf\u09af\u09bc \u09aa\u09c7\u099c</th>\r\n               </tr>',
        '<th>\u0985\u099e\u09cd\u099a\u09b2 / \u09b6\u09b9\u09b0</th>\r\n                 <th>\u09b8\u0995\u09cd\u09b0\u09bf\u09af\u09bc \u09aa\u09c7\u099c</th>\r\n                 <th>\u09b8\u09cb\u09b0\u09cd\u09b8</th>\r\n               </tr>'
    ),
    # Fix Traffic Source card title - add Bengali
    (
        '<span>&#127760; Traffic Source Analysis</span>\n          <span class="sub">Where visitors are coming from</span>',
        '<span>\U0001f310 \u099f\u09cd\u09b0\u09be\u09ab\u09bf\u0995 \u09b8\u09cb\u09b0\u09cd\u09b8 \u09ac\u09bf\u09b6\u09cd\u09b2\u09c7\u09b7\u09a3</span>\n          <span class="sub">\u0995\u09cb\u09a5\u09be \u09a5\u09c7\u0995\u09c7 \u09ad\u09bf\u099c\u09bf\u099f\u09b0 \u0986\u09b8\u099b\u09c7</span>'
    ),
    # Fix Page Time card title
    (
        '<span>&#9201; Page Time Analysis</span>\n          <span class="sub">Average time on page (seconds)</span>',
        '<span>\u23f1\ufe0f \u09aa\u09c7\u099c \u099f\u09be\u0987\u09ae \u09ac\u09bf\u09b6\u09cd\u09b2\u09c7\u09b7\u09a3</span>\n          <span class="sub">\u0997\u09a1\u09bc \u09b8\u09ae\u09af\u09bc (\u09b8\u09c7\u0995\u09c7\u09a8\u09cd\u09a1)</span>'
    ),
    # Fix Source Details card title
    (
        '<div class="card-title">&#128225; Source Details (All Time)</div>',
        '<div class="card-title">\ud83d\udce1 \u09b8\u09cb\u09b0\u09cd\u09b8 \u09a1\u09bf\u099f\u09c7\u0987\u09b2\u09b8 (\u09b8\u09b0\u09cd\u09ac\u0995\u09be\u09b2\u09c0\u09a8)</div>'
    ),
    # Fix UTM Campaigns card title
    (
        '<div class="card-title">&#127919; UTM Campaign Tracking</div>',
        '<div class="card-title">\ud83c\udfaf UTM \u0995\u09cd\u09af\u09be\u09ae\u09cd\u09aa\u09c7\u0987\u09a8 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995\u09bf\u0982</div>'
    ),
    # Fix Top Pages card title
    (
        '<div class="card-title">&#128273; Top Pages by Views</div>',
        '<div class="card-title">\ud83d\udd11 \u09b8\u09b0\u09cd\u09ac\u09be\u09a7\u09bf\u0995 \u09ad\u09bf\u0989 \u09aa\u09c7\u099c\u09b8\u09ae\u09c2\u09b9</div>'
    ),
    # Fix Page Time table card title
    (
        '<div class="card-title">&#8987; Average Time per Page</div>',
        '<div class="card-title">\u231b \u09aa\u09c7\u099c \u0985\u09a8\u09c1\u09af\u09be\u09af\u09bc\u09c0 \u0997\u09a1\u09bc \u09b8\u09ae\u09af\u09bc</div>'
    ),
    # Fix WhatsApp card title
    (
        '<div class="card-title">&#128172; WhatsApp Click Source Pages</div>',
        '<div class="card-title">\ud83d\udcac \u09b9\u09cb\u09af\u09bc\u09be\u099f\u09b8\u0985\u09cd\u09af\u09be\u09aa \u0995\u09cd\u09b2\u09bf\u0995 \u0989\u09ce\u09b8 \u09aa\u09c7\u099c</div>'
    ),
    # Fix Top Regions card title
    (
        '<div class="card-title">&#127757; Top Visitor Regions</div>',
        '<div class="card-title">\ud83c\udf0d \u09aa\u09cd\u09b0\u09a7\u09be\u09a8 \u09ad\u09bf\u099c\u09bf\u099f\u09b0 \u0985\u099e\u09cd\u099a\u09b2\u09b8\u09ae\u09c2\u09b9</div>'
    ),
    # Fix Source column headers (English to Bengali)
    (
        '<thead><tr><th>Source</th><th>Visits</th><th>Share</th></tr></thead>',
        '<thead><tr><th>\u09b8\u09cb\u09b0\u09cd\u09b8</th><th>\u09ad\u09bf\u099c\u09bf\u099f</th><th>\u09b6\u09c7\u09af\u09bc\u09be\u09b0</th></tr></thead>'
    ),
    # Fix Campaign headers
    (
        '<thead><tr><th>Campaign</th><th>Medium</th><th>Visits</th></tr></thead>',
        '<thead><tr><th>\u0995\u09cd\u09af\u09be\u09ae\u09cd\u09aa\u09c7\u0987\u09a8</th><th>\u09ae\u09bf\u09a1\u09bf\u09af\u09bc\u09be\u09ae</th><th>\u09ad\u09bf\u099c\u09bf\u099f</th></tr></thead>'
    ),
    # Fix Page headers
    (
        '<thead><tr><th>Page Name</th><th>Total Views</th></tr></thead>',
        '<thead><tr><th>\u09aa\u09c7\u099c\u09c7\u09b0 \u09a8\u09be\u09ae</th><th>\u09ae\u09cb\u099f \u09ad\u09bf\u0989</th></tr></thead>'
    ),
    # Fix Page time headers
    (
        '<thead><tr><th>Page</th><th>Avg Time</th><th>Sessions</th></tr></thead>',
        '<thead><tr><th>\u09aa\u09c7\u099c</th><th>\u0997\u09a1\u09bc \u09b8\u09ae\u09af\u09bc</th><th>\u09b8\u09c7\u09b6\u09a8</th></tr></thead>'
    ),
    # Fix WhatsApp headers
    (
        '<thead><tr><th>Source Page</th><th>Clicks</th></tr></thead>',
        '<thead><tr><th>\u0989\u09ce\u09b8 \u09aa\u09c7\u099c</th><th>\u0995\u09cd\u09b2\u09bf\u0995</th></tr></thead>'
    ),
    # Fix Regions header
    (
        '<thead><tr><th>Country &amp; City</th><th>Events</th></tr></thead>',
        '<thead><tr><th>\u09a6\u09c7\u09b6 \u0993 \u09b6\u09b9\u09b0</th><th>\u0987\u09ad\u09c7\u09a8\u09cd\u099f</th></tr></thead>'
    ),
    # Fix "No data" placeholder messages
    ('<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No data yet</td></tr>',
     '<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">\u0995\u09cb\u09a8\u09cb \u09a1\u09be\u099f\u09be \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf</td></tr>'),
    ('<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No UTM data</td></tr>',
     '<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">\u0995\u09cb\u09a8\u09cb UTM \u09a1\u09be\u099f\u09be \u09a8\u09c7\u0987</td></tr>'),
    ('<tr><td colspan="2" style="text-align: center; color: var(--text-muted);">No data found</td></tr>',
     '<tr><td colspan="2" style="text-align: center; color: var(--text-muted);">\u0995\u09cb\u09a8\u09cb \u09a1\u09be\u099f\u09be \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf</td></tr>'),
    ('<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No data found</td></tr>',
     '<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">\u0995\u09cb\u09a8\u09cb \u09a1\u09be\u099f\u09be \u09aa\u09be\u0993\u09af\u09bc\u09be \u09af\u09be\u09af\u09bc\u09a8\u09bf</td></tr>'),
]

count = 0
for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        count += 1
        print(f"  Fixed: {old[:60]}...")
    else:
        print(f"  SKIP (not found): {old[:60]}...")

with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nDone. Applied {count}/{len(fixes)} fixes. File length: {len(content)}")
