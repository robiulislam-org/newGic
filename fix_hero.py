#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Find exact hero section boundaries and replace."""

HTML_FILE = r"d:\GIC website\index.html"

with open(HTML_FILE, 'r', encoding='utf-8') as f:
    html = f.read()

# Find start and end precisely
START_MARKER = '<!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 MINI COURSES PAGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->'
END_MARKER   = 'id="category-tabs-container"></div>'

idx_s = html.find(START_MARKER)
idx_e = html.find(END_MARKER)

if idx_s == -1:
    print("START not found"); exit(1)
if idx_e == -1:
    print("END not found"); exit(1)

end_pos = idx_e + len(END_MARKER)

print(f"Start: {idx_s}, End: {end_pos}")
print("--- OLD BLOCK (first 300 chars) ---")
print(repr(html[idx_s:idx_s+300]))
print("--- OLD BLOCK (last 300 chars) ---")
print(repr(html[end_pos-300:end_pos]))

NEW_BLOCK = '''<!-- \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 MINI COURSES PAGE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 -->
<div class="page" id="page-mini-courses">

  <!-- \u2550\u2550 HERO \u2550\u2550 -->
  <div style="background:linear-gradient(160deg,#050e1f 0%,#0b2444 55%,#0a1e3d 100%);position:relative;overflow:hidden;padding:90px 24px 75px;border-bottom:2px solid rgba(212,168,67,.3);">
    <div style="position:absolute;right:-100px;top:-100px;width:350px;height:350px;background:radial-gradient(circle,rgba(200,151,42,.14) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="position:absolute;left:-80px;bottom:-80px;width:280px;height:280px;background:radial-gradient(circle,rgba(26,95,158,.2) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="position:absolute;top:22%;left:8%;width:5px;height:5px;background:var(--gold);border-radius:50%;opacity:.6;animation:starTwinkle 3s ease-in-out infinite;"></div>
    <div style="position:absolute;top:58%;right:12%;width:4px;height:4px;background:#a78bfa;border-radius:50%;opacity:.5;animation:starTwinkle 4s ease-in-out infinite 1s;"></div>

    <div class="container" style="position:relative;z-index:2;text-align:center;">

      <!-- Badge Row -->
      <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
        <span class="mc-free-badge">\u2728 \u09e7\u09e6\u09e6% \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09ac\u09bf\u09a8\u09be\u09ae\u09c2\u09b2\u09cd\u09af\u09c7</span>
        <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(167,139,250,.15);border:1px solid rgba(167,139,250,.35);color:#c4b5fd;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">\ud83c\udd95 \u09a8\u09a4\u09c1\u09a8 \u0995\u09cb\u09b0\u09cd\u09b8 \u09af\u09cb\u0997 \u09b9\u09af\u09bc\u09c7\u099b\u09c7</span>
        <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#fca5a5;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">\ud83d\udd25 \u09b8\u09c0\u09ae\u09bf\u09a4 \u09b8\u09ae\u09af\u09bc\u09c7\u09b0 \u0985\u09ab\u09be\u09b0</span>
      </div>

      <h1 style="color:#fff;font-size:clamp(30px,5.5vw,52px);font-weight:900;letter-spacing:-1px;text-shadow:0 4px 20px rgba(0,0,0,.5);margin-bottom:10px;line-height:1.15;">\u0987\u09b8\u09b2\u09be\u09ae\u09bf\u0995 \u099c\u09cd\u099e\u09be\u09a8\u09c7\u09b0 <span style="color:var(--gold-light);position:relative;">\u09ad\u09be\u09a3\u09cd\u09a1\u09be\u09b0<span style="position:absolute;bottom:-4px;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--gold),transparent);border-radius:3px;"></span></span></h1>
      <p style="color:rgba(255,255,255,.82);font-size:clamp(15px,2.5vw,18px);max-width:620px;margin:16px auto 0;line-height:1.85;">\u099b\u09cb\u099f \u099b\u09cb\u099f \u0995\u09cb\u09b0\u09cd\u09b8, \u09ac\u09a1\u09bc \u09ac\u09a1\u09bc \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u0964 \u09a8\u09bf\u099c\u09c7\u0995\u09c7 \u0993 \u09aa\u09b0\u09bf\u09ac\u09be\u09b0\u0995\u09c7 \u0986\u09b2\u09cb\u0995\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8 \u2014 \u0985\u09b0\u09cd\u099c\u09a8 \u0995\u09b0\u09c1\u09a8 <strong style="color:var(--gold-light);">\u09b8\u09ae\u09cd\u09ae\u09be\u09a8\u09a8\u09be \u09b8\u09be\u09b0\u09cd\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u099f!</strong></p>

      <!-- Search Bar -->
      <div style="max-width:580px;margin:30px auto 0;position:relative;">
        <span style="position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:19px;color:rgba(255,255,255,.45);pointer-events:none;">\ud83d\udd0d</span>
        <input type="text" id="course-search-input"
          placeholder="\u0995\u09cb\u09b0\u09cd\u09b8 \u0996\u09c1\u0981\u099c\u09c1\u09a8\u2026 (\u09a8\u09be\u09ae\u09be\u099c, \u09a6\u09cb\u09af\u09bc\u09be, \u09b8\u09bf\u09b0\u09be\u09a4, \u099a\u09b0\u09bf\u09a4\u09cd\u09b0)"
          style="width:100%;padding:17px 22px 17px 54px;border-radius:50px;border:2px solid rgba(212,168,67,.35);background:rgba(255,255,255,.06);color:#fff;font-size:15px;font-family:var(--font-body);outline:none;transition:all .3s ease;box-shadow:0 12px 40px rgba(0,0,0,.35);backdrop-filter:blur(12px);"
          oninput="filterCoursesBySearch()">
      </div>

      <!-- Stat Pills -->
      <div style="display:flex;justify-content:center;gap:10px;margin-top:26px;flex-wrap:wrap;">
        <div style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(34,197,94,.18)\'" onmouseout="this.style.background=\'rgba(34,197,94,.1)\'">
          <span>\ud83d\udc65</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#4ade80;">\u09e7,\u09eb\u09e6\u09e6+</strong> \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0</span>
        </div>
        <div style="background:rgba(212,168,67,.1);border:1px solid rgba(212,168,67,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(212,168,67,.18)\'" onmouseout="this.style.background=\'rgba(212,168,67,.1)\'">
          <span>\ud83d\udcd6</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:var(--gold-light);">\u09e7\u09e6\u09e6+</strong> \u09ab\u09cd\u09b0\u09bf \u0985\u09a7\u09cd\u09af\u09be\u09af\u09bc</span>
        </div>
        <div style="background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(167,139,250,.18)\'" onmouseout="this.style.background=\'rgba(167,139,250,.1)\'">
          <span>\ud83c\udfc6</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#c4b5fd;">\u09e7\u09e6\u09e6%</strong> \u09ab\u09cd\u09b0\u09bf \u09b8\u09be\u09b0\u09cd\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u099f</span>
        </div>
        <div style="background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(249,115,22,.18)\'" onmouseout="this.style.background=\'rgba(249,115,22,.1)\'">
          <span>\u26a1</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#fb923c;">XP & \u09b8\u09cd\u099f\u09cd\u09b0\u09bf\u0995</strong> \u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae</span>
        </div>
      </div>

      <!-- Gamification Strip -->
      <div class="mc-gamify-strip">
        <div class="mc-gamify-item">\ud83c\udfaf \u0995\u09c1\u0987\u099c \u0995\u09b0\u09c1\u09a8 <span class="mc-gi-val">+10 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">\ud83d\udcda \u099a\u09cd\u09af\u09be\u09aa\u09cd\u099f\u09be\u09b0 \u09b6\u09c7\u09b7 \u0995\u09b0\u09c1\u09a8 <span class="mc-gi-val">+10 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">\ud83d\udd17 \u09b0\u09c7\u09ab\u09be\u09b0 \u0995\u09b0\u09c1\u09a8 <span class="mc-gi-val">+50 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">\ud83c\udfc5 \u0995\u09cb\u09b0\u09cd\u09b8 \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u0995\u09b0\u09c1\u09a8 <span class="mc-gi-val">+60 XP</span></div>
      </div>

    </div>
  </div>

  <section class="section courses-section" style="padding-top:50px;padding-bottom:40px;">
    <div class="container">

      <!-- Student Auth Bar \u2014 UPGRADED -->
      <div class="student-auth-bar" id="student-auth-bar">
        <div class="student-auth-info" id="student-unauth-view">
          <div class="student-avatar" style="background:linear-gradient(135deg,#fde68a,#f59e0b);color:#78350f;font-size:18px;font-weight:900;">?</div>
          <div class="student-details">
            <h4 style="color:var(--dark);font-size:15px;">\ud83d\udd10 \u09b2\u0997\u0987\u09a8 \u0995\u09b0\u09c1\u09a8 \u2014 \u09aa\u09cd\u09b0\u0997\u09cd\u09b0\u09c7\u09b8 \u09b9\u09be\u09b0\u09be\u09ac\u09c7\u09a8 \u09a8\u09be!</h4>
            <p style="color:#f97316;font-size:12.5px;font-weight:600;">\u26a0\ufe0f \u09b2\u0997\u0987\u09a8 \u09a8\u09be \u0995\u09b0\u09b2\u09c7 \u09b0\u09bf\u09ab\u09cd\u09b0\u09c7\u09b6\u09c7 \u09b8\u09ac \u0985\u0997\u09cd\u09b0\u0997\u09a4\u09bf \u09ae\u09c1\u099b\u09c7 \u09af\u09be\u09ac\u09c7</p>
          </div>
        </div>
        <button class="btn btn-primary" id="btn-open-auth" onclick="openStudentAuth()" style="font-size:13.5px;padding:11px 22px;">\ud83d\ude80 \u09b2\u0997\u0987\u09a8 / \u0986\u0987\u09a1\u09bf \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c1\u09a8</button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="category-tabs-container" id="category-tabs-container"></div>'''

html = html[:idx_s] + NEW_BLOCK + html[end_pos:]
print(f"Hero replaced! New length: {len(html)}")

with open(HTML_FILE, 'w', encoding='utf-8') as f:
    f.write(html)
print("Saved.")
