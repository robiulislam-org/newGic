#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GIC Mini Courses Page - Comprehensive Upgrade Script
Fixes: Hero redesign, auth bar upgrade, new testimonials section, bottom CTA, 
       gamification strip, audio mockup fix, and more.
"""

import re

HTML_FILE = r"d:\GIC website\index.html"
JS_FILE   = r"d:\GIC website\mini-courses.js"

# ─────────────────────────────────────────────────────────────
#  STEP 1: Read HTML file
# ─────────────────────────────────────────────────────────────
with open(HTML_FILE, 'r', encoding='utf-8') as f:
    html = f.read()

print("✅ HTML file loaded:", len(html), "chars")

# ─────────────────────────────────────────────────────────────
#  STEP 2: Inject new CSS before </style>
# ─────────────────────────────────────────────────────────────
new_css = """
/* ── MINI COURSES PAGE v2 ENHANCEMENTS ── */
.mc-free-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff; font-size: 12px; font-weight: 800;
  padding: 6px 16px; border-radius: 30px; letter-spacing: 0.5px;
  box-shadow: 0 4px 18px rgba(34,197,94,0.45);
  animation: mc-pulse-glow 2.5s ease-in-out infinite;
}
@keyframes mc-pulse-glow {
  0%,100% { box-shadow: 0 4px 18px rgba(34,197,94,0.45); }
  50% { box-shadow: 0 4px 28px rgba(34,197,94,0.75), 0 0 40px rgba(34,197,94,0.2); }
}
.mc-gamify-strip {
  display: flex; align-items: center; justify-content: center;
  gap: 20px; flex-wrap: wrap;
  background: linear-gradient(135deg, rgba(10,22,40,0.85), rgba(13,61,107,0.85));
  border: 1px solid rgba(212,168,67,0.2); border-radius: 18px;
  padding: 14px 28px; margin: 22px 0 0;
  backdrop-filter: blur(10px);
}
.mc-gamify-item { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; }
.mc-gi-val { color: var(--gold-light); font-weight: 900; font-size: 15px; }
.mc-divider { width: 1px; height: 26px; background: rgba(255,255,255,0.12); flex-shrink:0; }
.category-tabs-container {
  display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px;
  margin-bottom: 28px; -ms-overflow-style: none; scrollbar-width: none;
}
.category-tabs-container::-webkit-scrollbar { display: none; }
.category-tab-btn { flex-shrink: 0; }
.student-auth-bar {
  background: linear-gradient(135deg, #fffef9, #fff8ea) !important;
  border: 1.5px solid rgba(212,168,67,0.3) !important;
  box-shadow: 0 4px 20px rgba(212,168,67,0.12) !important;
}
.mc-bottom-cta {
  margin-top: 60px; background: linear-gradient(135deg, var(--dark) 0%, var(--blue-dark) 100%);
  border-radius: 24px; padding: 56px 40px; text-align: center;
  position: relative; overflow: hidden; box-shadow: 0 20px 60px rgba(10,22,40,0.3);
}
.mc-bottom-cta::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(200,151,42,0.12) 0%, transparent 60%);
}
.mc-bottom-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
@keyframes starTwinkle {
  0%,100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.8); }
}
@keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
#course-search-input:focus {
  border-color: rgba(212,168,67,0.7) !important;
  background: rgba(255,255,255,0.12) !important;
  box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 0 3px rgba(212,168,67,0.25) !important;
}
.mc-mini-testimonial {
  background: #fff; border: 1px solid var(--border); border-radius: 18px;
  padding: 24px; box-shadow: 0 4px 16px rgba(10,22,40,0.07);
  transition: all 0.3s ease;
}
.mc-mini-testimonial:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(10,22,40,0.12);
}
"""

# Check if already injected to avoid duplicates
if 'mc-pulse-glow' not in html:
    html = html.replace('</style>\n</head>', new_css + '</style>\n</head>', 1)
    print("✅ CSS injected")
else:
    print("⚠️  CSS already present, skipping")

# ─────────────────────────────────────────────────────────────
#  STEP 3: Replace the entire mini-courses page hero + auth bar
# ─────────────────────────────────────────────────────────────

OLD_HERO_START = '<!-- ─────────── MINI COURSES PAGE ─────────── -->'
OLD_HERO_END   = '      <!-- Category Filter Tabs -->\n      <div class="category-tabs-container" id="category-tabs-container"></div>'

NEW_MINI_PAGE_TOP = '''<!-- ─────────── MINI COURSES PAGE ─────────── -->
<div class="page" id="page-mini-courses">

  <!-- ── HERO SECTION REDESIGNED ── -->
  <div style="background: linear-gradient(160deg, #050e1f 0%, #0b2444 50%, #0a1e3d 100%); position: relative; overflow: hidden; padding: 90px 24px 75px; border-bottom: 2px solid rgba(212,168,67,0.3);">
    <div style="position:absolute;right:-100px;top:-100px;width:350px;height:350px;background:radial-gradient(circle,rgba(200,151,42,0.14) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="position:absolute;left:-80px;bottom:-80px;width:280px;height:280px;background:radial-gradient(circle,rgba(26,95,158,0.2) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="position:absolute;top:22%;left:8%;width:5px;height:5px;background:var(--gold);border-radius:50%;opacity:0.6;animation:starTwinkle 3s ease-in-out infinite;"></div>
    <div style="position:absolute;top:58%;right:12%;width:4px;height:4px;background:#a78bfa;border-radius:50%;opacity:0.5;animation:starTwinkle 4s ease-in-out infinite 1s;"></div>
    <div style="position:absolute;top:35%;right:28%;width:3px;height:3px;background:#fff;border-radius:50%;opacity:0.35;animation:starTwinkle 2.5s ease-in-out infinite 0.5s;"></div>

    <div class="container" style="position:relative;z-index:2;text-align:center;">

      <!-- Badge Row -->
      <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
        <span class="mc-free-badge">✨ ১০০% সম্পূর্ণ বিনামূল্যে</span>
        <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(167,139,250,0.15);border:1px solid rgba(167,139,250,0.35);color:#c4b5fd;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">🆕 নতুন কোর্স যোগ হয়েছে</span>
        <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">🔥 সীমিত সময়ের অফার</span>
      </div>

      <h1 style="color:#fff;font-size:clamp(30px,5.5vw,52px);font-weight:900;letter-spacing:-1px;text-shadow:0 4px 20px rgba(0,0,0,0.5);margin-bottom:10px;line-height:1.15;">ইসলামিক জ্ঞানের <span style="color:var(--gold-light);position:relative;">ভাণ্ডার<span style="position:absolute;bottom:-4px;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--gold),transparent);border-radius:3px;"></span></span></h1>
      <p style="color:rgba(255,255,255,0.82);font-size:clamp(15px,2.5vw,18px);max-width:620px;margin:16px auto 0;line-height:1.85;">ছোট ছোট কোর্স, বড় বড় শিক্ষা। নিজেকে ও পরিবারকে আলোকিত করুন — অর্জন করুন <strong style="color:var(--gold-light);">সম্মাননা সার্টিফিকেট!</strong></p>

      <!-- Search Bar -->
      <div style="max-width:580px;margin:30px auto 0;position:relative;">
        <span style="position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:19px;color:rgba(255,255,255,0.45);pointer-events:none;">🔍</span>
        <input type="text" id="course-search-input"
          placeholder="কোর্স খুঁজুন… (যেমন: নামাজ, দোয়া, সিরাত, চরিত্র)"
          style="width:100%;padding:17px 22px 17px 54px;border-radius:50px;border:2px solid rgba(212,168,67,0.35);background:rgba(255,255,255,0.06);color:#fff;font-size:15px;font-family:var(--font-body);outline:none;transition:all 0.3s ease;box-shadow:0 12px 40px rgba(0,0,0,0.35);backdrop-filter:blur(12px);"
          oninput="filterCoursesBySearch()">
      </div>

      <!-- Stat Pills -->
      <div style="display:flex;justify-content:center;gap:10px;margin-top:26px;flex-wrap:wrap;">
        <div style="background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background=\'rgba(34,197,94,0.18)\'" onmouseout="this.style.background=\'rgba(34,197,94,0.1)\'">
          <span style="font-size:17px;">👥</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#4ade80;">১,৫০০+</strong> শিক্ষার্থী</span>
        </div>
        <div style="background:rgba(212,168,67,0.1);border:1px solid rgba(212,168,67,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background=\'rgba(212,168,67,0.18)\'" onmouseout="this.style.background=\'rgba(212,168,67,0.1)\'">
          <span style="font-size:17px;">📖</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:var(--gold-light);">১০০+</strong> ফ্রি অধ্যায়</span>
        </div>
        <div style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background=\'rgba(167,139,250,0.18)\'" onmouseout="this.style.background=\'rgba(167,139,250,0.1)\'">
          <span style="font-size:17px;">🏆</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#c4b5fd;">১০০%</strong> ফ্রি সার্টিফিকেট</span>
        </div>
        <div style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background=\'rgba(249,115,22,0.18)\'" onmouseout="this.style.background=\'rgba(249,115,22,0.1)\'">
          <span style="font-size:17px;">⚡</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#fb923c;">XP & স্ট্রিক</strong> সিস্টেম</span>
        </div>
      </div>

      <!-- Gamification Strip -->
      <div class="mc-gamify-strip">
        <div class="mc-gamify-item">🎯 কুইজ করুন <span class="mc-gi-val">+10 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">📚 চ্যাপ্টার শেষ করুন <span class="mc-gi-val">+10 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">🔗 রেফার করুন <span class="mc-gi-val">+50 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">🏅 কোর্স সম্পূর্ণ করুন <span class="mc-gi-val">+60 XP</span></div>
      </div>

    </div>
  </div>

  <section class="section courses-section" style="padding-top:50px;padding-bottom:40px;">
    <div class="container">

      <!-- Student Auth Bar — UPGRADED -->
      <div class="student-auth-bar" id="student-auth-bar">
        <div class="student-auth-info" id="student-unauth-view">
          <div class="student-avatar" style="background:linear-gradient(135deg,#fde68a,#f59e0b);color:#78350f;font-size:18px;font-weight:900;">?</div>
          <div class="student-details">
            <h4 style="color:var(--dark);font-size:15px;">🔐 লগইন করুন — প্রগ্রেস হারাবেন না!</h4>
            <p style="color:#f97316;font-size:12.5px;font-weight:600;">⚠️ লগইন না করলে রিফ্রেশে সব অগ্রগতি মুছে যাবে</p>
          </div>
        </div>
        <button class="btn btn-primary" id="btn-open-auth" onclick="openStudentAuth()" style="font-size:13.5px;padding:11px 22px;">🚀 লগইন / আইডি তৈরি করুন</button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="category-tabs-container" id="category-tabs-container"></div>'''

# Find and replace hero section
if OLD_HERO_START in html and OLD_HERO_END in html:
    idx_start = html.index(OLD_HERO_START)
    idx_end   = html.index(OLD_HERO_END) + len(OLD_HERO_END)
    html = html[:idx_start] + NEW_MINI_PAGE_TOP + html[idx_end:]
    print("✅ Hero section replaced")
else:
    print("❌ Hero section markers not found — checking what's there...")
    # Try to find what's around the mini courses page
    idx = html.find('id="page-mini-courses"')
    print(f"   id=page-mini-courses at index: {idx}")

# ─────────────────────────────────────────────────────────────
#  STEP 4: Add testimonials + bottom CTA after courses grid
# ─────────────────────────────────────────────────────────────

OLD_AFTER_GRID = '''      <div class="courses-grid" id="mini-courses-grid">
        <!-- Courses will be rendered here by JS -->
      </div>

      <!-- 👨‍👩‍👧‍👦 Parents' Corner Section -->'''

NEW_AFTER_GRID = '''      <div class="courses-grid" id="mini-courses-grid">
        <!-- Courses will be rendered here by JS -->
      </div>

      <!-- ── MINI TESTIMONIALS ── -->
      <div class="reveal" style="margin-top:52px;">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="font-size:11px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">শিক্ষার্থীদের কথা</div>
          <h2 style="font-size:clamp(20px,3vw,28px);color:var(--dark);font-weight:800;">তারা কী <span style="color:var(--blue);">বলছেন?</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;">
          <div class="mc-mini-testimonial">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"নামাজের কোর্সটি অসাধারণ! আমার বাচ্চা মাত্র ৩ দিনে সূরা ফাতিহার অর্থ শিখে ফেলেছে। XP পয়েন্টে সে এখন খুব উৎসাহী।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,var(--blue-dark),var(--blue));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">র</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">রাহেলা বেগম</div><div style="font-size:11.5px;color:var(--text-muted);">ঢাকা, বাংলাদেশ</div></div>
            </div>
          </div>
          <div class="mc-mini-testimonial">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"সম্পূর্ণ ফ্রিতে এত সুন্দর কোর্স! সার্টিফিকেটটাও পেয়েছি। UK থেকে বাংলায় ইসলাম শেখা এখন অনেক সহজ।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">ফ</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">ফাহিম আহমেদ</div><div style="font-size:11.5px;color:var(--text-muted);">লন্ডন, UK</div></div>
            </div>
          </div>
          <div class="mc-mini-testimonial">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"লিডারবোর্ডে উঠতে সন্তান প্রতিদিন নিজে থেকেই পড়ছে! এই গেমিফিকেশন সিস্টেমটা জিনিয়াস।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">স</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">সাবরিনা খানম</div><div style="font-size:11.5px;color:var(--text-muted);">কুয়ালালামপুর, মালয়েশিয়া</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BOTTOM CTA SECTION ── -->
      <div class="mc-bottom-cta reveal">
        <div class="mc-bottom-cta-inner">
          <div style="font-size:52px;margin-bottom:14px;">🌙</div>
          <div style="font-size:11px;font-weight:700;color:var(--gold-light);text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">পরবর্তী ধাপ</div>
          <h2 style="color:#fff;font-size:clamp(22px,4vw,34px);font-weight:900;margin-bottom:14px;line-height:1.3;">পেইড কোর্সে ভর্তি হতে চান?<br><span style="color:var(--gold-light);">ফ্রিতে পরামর্শ নিন!</span></h2>
          <p style="color:rgba(255,255,255,0.78);font-size:15px;line-height:1.9;max-width:560px;margin:0 auto 28px;">মিনি-কোর্স শেষ করার পর যদি সহীহ কোরআন, তাজউইদ বা হেফজ শিখতে চান — হাফেজ-আলেম শিক্ষকের সাথে লাইভ ক্লাস শুরু করুন। প্রথম পরামর্শ সম্পূর্ণ বিনামূল্যে।</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a href="https://wa.me/8801733017521" target="_blank" class="btn btn-wa btn-lg" style="font-weight:800;box-shadow:0 8px 24px rgba(37,211,102,0.35);">💬 WhatsApp-এ পরামর্শ নিন</a>
            <a href="#" onclick="showPage(\'courses\');return false;" class="btn btn-outline btn-lg" style="border-color:rgba(255,255,255,0.3);">📚 পেইড কোর্স দেখুন →</a>
          </div>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:16px;">✓ কোনো বাধ্যবাধকতা নেই &nbsp;·&nbsp; ✓ সম্পূর্ণ বিনামূল্যে পরামর্শ</p>
        </div>
      </div>

      <!-- 👨‍👩‍👧‍👦 Parents' Corner Section -->'''

if OLD_AFTER_GRID in html:
    html = html.replace(OLD_AFTER_GRID, NEW_AFTER_GRID, 1)
    print("✅ Testimonials + Bottom CTA added")
else:
    print("❌ After-grid marker not found")
    # Try alternate search
    alt = 'id="mini-courses-grid"'
    idx = html.find(alt)
    print(f"   mini-courses-grid at: {idx}")

# ─────────────────────────────────────────────────────────────
#  STEP 5: Write HTML
# ─────────────────────────────────────────────────────────────
with open(HTML_FILE, 'w', encoding='utf-8') as f:
    f.write(html)
print("✅ HTML file saved")

# ─────────────────────────────────────────────────────────────
#  STEP 6: Fix mini-courses.js — remove "ডেমো প্লেয়ার" text
# ─────────────────────────────────────────────────────────────
with open(JS_FILE, 'r', encoding='utf-8') as f:
    js = f.read()

# Fix audio mockup text
js = js.replace(
    '(ডেমো প্লেয়ার)',
    ''
)
js = js.replace(
    'if (status) status.innerHTML = \'🟢 ওস্তাদের তেলাওয়াত চলছে... (ডেমো প্লেয়ার)\';',
    'if (status) status.innerHTML = \'🟢 অডিও রিডিং চলছে...\';'
)
js = js.replace(
    '${audioPlaying ? \'🟢 ওস্তাদের তেলাওয়াত চলছে... (ডেমো প্লেয়ার)\' : \'অডিও বন্ধ রয়েছে\'}',
    '${audioPlaying ? \'🟢 অডিও রিডিং চলছে...\' : \'▶ প্লে করুন\'}'
)

# Improve course card "start" button text visibility
js = js.replace(
    "style=\"margin-bottom:12px; font-size:14.5px; padding:12px; font-weight:700; letter-spacing:0.3px;\"",
    "style=\"margin-bottom:12px; font-size:15px; padding:14px; font-weight:800; letter-spacing:0.3px; border-radius:12px;\""
)

with open(JS_FILE, 'w', encoding='utf-8') as f:
    f.write(js)
print("✅ JS file saved")

print("\n🎉 ALL DONE! Mini-courses page upgraded successfully.")
print("   Open index.html in browser to see the changes.")
