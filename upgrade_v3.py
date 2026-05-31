#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GIC Mini Courses Page - Complete Upgrade Script v3
Clean version after git restore.
"""

HTML_FILE = r"d:\GIC website\index.html"
JS_FILE   = r"d:\GIC website\mini-courses.js"

# ── Read ──
with open(HTML_FILE, 'r', encoding='utf-8') as f:
    html = f.read()

with open(JS_FILE, 'r', encoding='utf-8') as f:
    js = f.read()

print(f"HTML loaded: {len(html)} chars, {html.count(chr(10))} lines")

# ════════════════════════════════════════════════════
#  1. INJECT NEW CSS  (before </style>)
# ════════════════════════════════════════════════════
NEW_CSS = """
/* ═══ MINI COURSES v2 ENHANCEMENTS ═══ */
.mc-free-badge {
  display:inline-flex;align-items:center;gap:6px;
  background:linear-gradient(135deg,#22c55e,#16a34a);
  color:#fff;font-size:12px;font-weight:800;
  padding:6px 16px;border-radius:30px;letter-spacing:.5px;
  animation:mc-pulse-glow 2.5s ease-in-out infinite;
  box-shadow:0 4px 18px rgba(34,197,94,.45);
}
@keyframes mc-pulse-glow {
  0%,100%{box-shadow:0 4px 18px rgba(34,197,94,.45);}
  50%{box-shadow:0 4px 28px rgba(34,197,94,.75),0 0 40px rgba(34,197,94,.2);}
}
.mc-gamify-strip {
  display:flex;align-items:center;justify-content:center;
  gap:20px;flex-wrap:wrap;
  background:linear-gradient(135deg,rgba(10,22,40,.88),rgba(13,61,107,.88));
  border:1px solid rgba(212,168,67,.22);border-radius:18px;
  padding:14px 28px;margin:22px 0 0;backdrop-filter:blur(12px);
}
.mc-gamify-item{display:flex;align-items:center;gap:8px;color:rgba(255,255,255,.82);font-size:13px;font-weight:600;}
.mc-gi-val{color:var(--gold-light);font-weight:900;font-size:15px;}
.mc-divider{width:1px;height:26px;background:rgba(255,255,255,.12);flex-shrink:0;}
.category-tabs-container{
  display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;
  margin-bottom:28px;-ms-overflow-style:none;scrollbar-width:none;
}
.category-tabs-container::-webkit-scrollbar{display:none;}
.category-tab-btn{flex-shrink:0;}
.student-auth-bar{
  background:linear-gradient(135deg,#fffef9,#fff8ea)!important;
  border:1.5px solid rgba(212,168,67,.3)!important;
  box-shadow:0 4px 20px rgba(212,168,67,.12)!important;
}
.mc-bottom-cta{
  margin-top:60px;
  background:linear-gradient(135deg,var(--dark) 0%,var(--blue-dark) 100%);
  border-radius:24px;padding:56px 40px;text-align:center;
  position:relative;overflow:hidden;
  box-shadow:0 20px 60px rgba(10,22,40,.3);
}
.mc-bottom-cta::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 50%,rgba(200,151,42,.12) 0%,transparent 60%);
}
.mc-bottom-cta-inner{position:relative;z-index:1;max-width:640px;margin:0 auto;}
@keyframes starTwinkle{0%,100%{opacity:.3;transform:scale(1);}50%{opacity:1;transform:scale(1.8);}}
@keyframes rotateSlow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
#course-search-input:focus{
  border-color:rgba(212,168,67,.7)!important;
  background:rgba(255,255,255,.12)!important;
  box-shadow:0 12px 40px rgba(0,0,0,.35),0 0 0 3px rgba(212,168,67,.25)!important;
}
.mc-mini-test{
  background:#fff;border:1px solid var(--border);border-radius:18px;
  padding:24px;box-shadow:0 4px 16px rgba(10,22,40,.07);transition:all .3s ease;
}
.mc-mini-test:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(10,22,40,.12);}
@media(max-width:600px){
  .mc-bottom-cta{padding:36px 20px;}
  .mc-gamify-strip{gap:12px;padding:12px 16px;}
}
"""

if 'mc-pulse-glow' not in html:
    html = html.replace('</style>\n</head>', NEW_CSS + '</style>\n</head>', 1)
    print("CSS injected")
else:
    print("CSS already present — skipping")


# ════════════════════════════════════════════════════
#  2. REPLACE MINI-COURSES HERO SECTION
# ════════════════════════════════════════════════════

OLD_HERO = '''<!-- ─────────── MINI COURSES PAGE ─────────── -->
<div class="page" id="page-mini-courses">
  <div class="policy-hero" style="background: linear-gradient(135deg, var(--dark) 0%, var(--blue-dark) 100%); position: relative; overflow: hidden; padding: 80px 24px 70px; border-bottom: 2px solid rgba(212, 168, 67, 0.25);">
    <div style="position: absolute; right: -80px; top: -80px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(200,151,42,0.12) 0%, transparent 70%); border-radius: 50%;"></div>
    <div style="position: absolute; left: -60px; bottom: -60px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(26,95,158,0.15) 0%, transparent 70%); border-radius: 50%;"></div>
    <div class="container" style="position: relative; z-index: 2; text-align: center;">
      <div class="section-label" style="margin:0 auto 16px;display:inline-flex;background:rgba(200,151,42,0.15);border-color:rgba(200,151,42,0.4);color:var(--gold-light);box-shadow: 0 4px 12px rgba(200,151,42,0.15);">🎓 ফ্রি মিনি-কোর্স</div>
      <h1 style="color:#fff; font-size: clamp(28px, 5vw, 46px); font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.5);">ইসলামিক জ্ঞানের <span style="color:var(--gold-light); background: linear-gradient(120deg, var(--gold-light), #fff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">ভাণ্ডার</span></h1>
      <p style="margin-top:14px; color: rgba(255,255,255,0.85); font-size: clamp(14px, 2.5vw, 17px); max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.8;">ছোট ছোট কোর্স, বড় বড় শিক্ষা। সম্পূর্ণ বিনামূল্যে নিজেকে ও পরিবারকে আলোকিত করুন এবং অর্জন করুন সম্মাননা সার্টিফিকেট!</p>
      
      <!-- Real-Time Search Bar -->
      <div class="search-container" style="max-width:550px; margin: 26px auto 0; position: relative;">
        <span style="position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 18px; color: rgba(255,255,255,0.6);">🔍</span>
        <input type="text" id="course-search-input" placeholder="যেকোনো কোর্স খুঁজুন (যেমন: নামাজ, দোয়া, সিরাত, চরিত্র...)" style="width:100%; padding: 16px 20px 16px 50px; border-radius: 30px; border: 1.5px solid rgba(212,168,67,0.3); background: rgba(255,255,255,0.07); color: #fff; font-size: 15.5px; font-family: var(--font-body); outline: none; transition: all 0.3s ease; box-shadow: 0 8px 32px rgba(0,0,0,0.3); backdrop-filter: blur(10px);" oninput="filterCoursesBySearch()">
      </div>

      <!-- Stats Counters Grid -->
      <div style="display: flex; justify-content: center; gap: 12px; margin-top: 32px; flex-wrap: wrap;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 10px 18px; border-radius: 15px; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(5px); transition: all 0.2s;" onmouseover="this.style.background=\'rgba(255,255,255,0.08)\';" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';">
          <span style="font-size: 20px;">👥</span>
          <span style="color: #fff; font-size: 13.5px; font-weight: 600;"><span style="color: var(--gold-light); font-weight: 800;">১,৫০০+</span> সফল শিক্ষার্থী</span>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 10px 18px; border-radius: 15px; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(5px); transition: all 0.2s;" onmouseover="this.style.background=\'rgba(255,255,255,0.08)\';" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';">
          <span style="font-size: 20px;">📖</span>
          <span style="color: #fff; font-size: 13.5px; font-weight: 600;"><span style="color: var(--gold-light); font-weight: 800;">১০০+</span> ফ্রি অধ্যায়</span>
        </div>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); padding: 10px 18px; border-radius: 15px; display: flex; align-items: center; gap: 8px; backdrop-filter: blur(5px); transition: all 0.2s;" onmouseover="this.style.background=\'rgba(255,255,255,0.08)\';" onmouseout="this.style.background=\'rgba(255,255,255,0.04)\';">
          <span style="font-size: 20px;">🏆</span>
          <span style="color: #fff; font-size: 13.5px; font-weight: 600;"><span style="color: var(--gold-light); font-weight: 800;">১০০%</span> ফ্রি সার্টিফিকেট</span>
        </div>
      </div>
    </div>
  </div>
  <section class="section courses-section" style="padding-top:60px;">
    <div class="container">
      
      <!-- Student Auth Bar -->
      <div class="student-auth-bar" id="student-auth-bar">
        <div class="student-auth-info" id="student-unauth-view">
          <div class="student-avatar" style="background:#e2e8f0;color:#64748b;">?</div>
          <div class="student-details">
            <h4>আপনার কোনো স্টুডেন্ট আইডি নেই</h4>
            <p>কোর্সের প্রগ্রেস সেভ করতে লগইন করুন</p>
          </div>
        </div>
        <button class="btn btn-blue" id="btn-open-auth" onclick="openStudentAuth()">লগইন / আইডি তৈরি করুন</button>
      </div>

      <!-- Category Filter Tabs -->
      <div class="category-tabs-container" id="category-tabs-container"></div>'''

NEW_HERO = '''<!-- ─────────── MINI COURSES PAGE ─────────── -->
<div class="page" id="page-mini-courses">

  <!-- ══ HERO ══ -->
  <div style="background:linear-gradient(160deg,#050e1f 0%,#0b2444 55%,#0a1e3d 100%);position:relative;overflow:hidden;padding:90px 24px 75px;border-bottom:2px solid rgba(212,168,67,.3);">
    <div style="position:absolute;right:-100px;top:-100px;width:350px;height:350px;background:radial-gradient(circle,rgba(200,151,42,.14) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="position:absolute;left:-80px;bottom:-80px;width:280px;height:280px;background:radial-gradient(circle,rgba(26,95,158,.2) 0%,transparent 70%);border-radius:50%;pointer-events:none;"></div>
    <div style="position:absolute;top:22%;left:8%;width:5px;height:5px;background:var(--gold);border-radius:50%;opacity:.6;animation:starTwinkle 3s ease-in-out infinite;"></div>
    <div style="position:absolute;top:58%;right:12%;width:4px;height:4px;background:#a78bfa;border-radius:50%;opacity:.5;animation:starTwinkle 4s ease-in-out infinite 1s;"></div>

    <div class="container" style="position:relative;z-index:2;text-align:center;">

      <!-- Badge Row -->
      <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:20px;">
        <span class="mc-free-badge">✨ ১০০% সম্পূর্ণ বিনামূল্যে</span>
        <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(167,139,250,.15);border:1px solid rgba(167,139,250,.35);color:#c4b5fd;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">🆕 নতুন কোর্স যোগ হয়েছে</span>
        <span style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.3);color:#fca5a5;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">🔥 সীমিত সময়ের অফার</span>
      </div>

      <h1 style="color:#fff;font-size:clamp(30px,5.5vw,52px);font-weight:900;letter-spacing:-1px;text-shadow:0 4px 20px rgba(0,0,0,.5);margin-bottom:10px;line-height:1.15;">ইসলামিক জ্ঞানের <span style="color:var(--gold-light);position:relative;">ভাণ্ডার<span style="position:absolute;bottom:-4px;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--gold),transparent);border-radius:3px;"></span></span></h1>
      <p style="color:rgba(255,255,255,.82);font-size:clamp(15px,2.5vw,18px);max-width:620px;margin:16px auto 0;line-height:1.85;">ছোট ছোট কোর্স, বড় বড় শিক্ষা। নিজেকে ও পরিবারকে আলোকিত করুন — অর্জন করুন <strong style="color:var(--gold-light);">সম্মাননা সার্টিফিকেট!</strong></p>

      <!-- Search Bar -->
      <div style="max-width:580px;margin:30px auto 0;position:relative;">
        <span style="position:absolute;left:20px;top:50%;transform:translateY(-50%);font-size:19px;color:rgba(255,255,255,.45);pointer-events:none;">🔍</span>
        <input type="text" id="course-search-input"
          placeholder="কোর্স খুঁজুন… (নামাজ, দোয়া, সিরাত, চরিত্র)"
          style="width:100%;padding:17px 22px 17px 54px;border-radius:50px;border:2px solid rgba(212,168,67,.35);background:rgba(255,255,255,.06);color:#fff;font-size:15px;font-family:var(--font-body);outline:none;transition:all .3s ease;box-shadow:0 12px 40px rgba(0,0,0,.35);backdrop-filter:blur(12px);"
          oninput="filterCoursesBySearch()">
      </div>

      <!-- Stat Pills -->
      <div style="display:flex;justify-content:center;gap:10px;margin-top:26px;flex-wrap:wrap;">
        <div style="background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(34,197,94,.18)\'" onmouseout="this.style.background=\'rgba(34,197,94,.1)\'">
          <span>👥</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#4ade80;">১,৫০০+</strong> শিক্ষার্থী</span>
        </div>
        <div style="background:rgba(212,168,67,.1);border:1px solid rgba(212,168,67,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(212,168,67,.18)\'" onmouseout="this.style.background=\'rgba(212,168,67,.1)\'">
          <span>📖</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:var(--gold-light);">১০০+</strong> ফ্রি অধ্যায়</span>
        </div>
        <div style="background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(167,139,250,.18)\'" onmouseout="this.style.background=\'rgba(167,139,250,.1)\'">
          <span>🏆</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#c4b5fd;">১০০%</strong> ফ্রি সার্টিফিকেট</span>
        </div>
        <div style="background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;transition:.2s;" onmouseover="this.style.background=\'rgba(249,115,22,.18)\'" onmouseout="this.style.background=\'rgba(249,115,22,.1)\'">
          <span>⚡</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#fb923c;">XP & স্ট্রিক</strong> সিস্টেম</span>
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

if OLD_HERO in html:
    html = html.replace(OLD_HERO, NEW_HERO, 1)
    print("Hero replaced successfully")
else:
    print("ERROR: Hero marker not found. Trying partial match...")
    chk = '<!-- ─────────── MINI COURSES PAGE ─────────── -->'
    if chk in html:
        print(f"  Start marker found at: {html.index(chk)}")
    auth_chk = 'category-tabs-container"></div>'
    if auth_chk in html:
        print(f"  End marker found at: {html.index(auth_chk)}")


# ════════════════════════════════════════════════════
#  3. ADD TESTIMONIALS + BOTTOM CTA after courses grid
# ════════════════════════════════════════════════════

OLD_AFTER = '      <div class="courses-grid" id="mini-courses-grid">\n        <!-- Courses will be rendered here by JS -->\n      </div>\n\n      <!-- 👨\u200d👩\u200d👧\u200d👦 Parents\' Corner Section -->'

NEW_AFTER = '''      <div class="courses-grid" id="mini-courses-grid">
        <!-- Courses will be rendered here by JS -->
      </div>

      <!-- ══ MINI TESTIMONIALS ══ -->
      <div class="reveal" style="margin-top:52px;">
        <div style="text-align:center;margin-bottom:26px;">
          <div style="font-size:11px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">শিক্ষার্থীদের কথা</div>
          <h2 style="font-size:clamp(20px,3vw,28px);color:var(--dark);font-weight:800;">তারা কী <span style="color:var(--blue);">বলছেন?</span></h2>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;">
          <div class="mc-mini-test">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"নামাজের কোর্সটি অসাধারণ! আমার বাচ্চা মাত্র ৩ দিনে সূরা ফাতিহার অর্থ শিখে ফেলেছে। XP পয়েন্টে সে এখন খুব উৎসাহী।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,var(--blue-dark),var(--blue));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">র</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">রাহেলা বেগম</div><div style="font-size:11.5px;color:var(--text-muted);">ঢাকা, বাংলাদেশ</div></div>
            </div>
          </div>
          <div class="mc-mini-test">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"সম্পূর্ণ ফ্রিতে এত সুন্দর কোর্স! সার্টিফিকেটটাও পেয়েছি। UK থেকে বাংলায় ইসলাম শেখা এখন অনেক সহজ।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">ফ</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">ফাহিম আহমেদ</div><div style="font-size:11.5px;color:var(--text-muted);">লন্ডন, UK</div></div>
            </div>
          </div>
          <div class="mc-mini-test">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"লিডারবোর্ডে উঠতে সন্তান প্রতিদিন নিজে থেকেই পড়ছে! এই গেমিফিকেশন সিস্টেমটা জিনিয়াস।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">স</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">সাবরিনা খানম</div><div style="font-size:11.5px;color:var(--text-muted);">কুয়ালালামপুর, মালয়েশিয়া</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ BOTTOM CTA ══ -->
      <div class="mc-bottom-cta reveal">
        <div class="mc-bottom-cta-inner">
          <div style="font-size:52px;margin-bottom:14px;">🌙</div>
          <div style="font-size:11px;font-weight:700;color:var(--gold-light);text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">পরবর্তী ধাপ</div>
          <h2 style="color:#fff;font-size:clamp(22px,4vw,34px);font-weight:900;margin-bottom:14px;line-height:1.3;">পেইড কোর্সে ভর্তি হতে চান?<br><span style="color:var(--gold-light);">ফ্রিতে পরামর্শ নিন!</span></h2>
          <p style="color:rgba(255,255,255,.78);font-size:15px;line-height:1.9;max-width:560px;margin:0 auto 28px;">মিনি-কোর্স শেষ করার পর যদি সহীহ কোরআন, তাজউইদ বা হেফজ শিখতে চান — হাফেজ-আলেম শিক্ষকের সাথে লাইভ ক্লাস শুরু করুন। প্রথম পরামর্শ সম্পূর্ণ বিনামূল্যে।</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a href="https://wa.me/8801733017521" target="_blank" class="btn btn-wa btn-lg" style="font-weight:800;box-shadow:0 8px 24px rgba(37,211,102,.35);">💬 WhatsApp-এ পরামর্শ নিন</a>
            <a href="#" onclick="showPage(\'courses\');return false;" class="btn btn-outline btn-lg" style="border-color:rgba(255,255,255,.3);">📚 পেইড কোর্স দেখুন →</a>
          </div>
          <p style="color:rgba(255,255,255,.4);font-size:12px;margin-top:16px;">✓ কোনো বাধ্যবাধকতা নেই &nbsp;·&nbsp; ✓ সম্পূর্ণ বিনামূল্যে পরামর্শ</p>
        </div>
      </div>

      <!-- 👨\u200d👩\u200d👧\u200d👦 Parents' Corner Section -->'''

if OLD_AFTER in html:
    html = html.replace(OLD_AFTER, NEW_AFTER, 1)
    print("Testimonials + CTA added after grid")
else:
    # try without the emoji in the comment
    OLD_AFTER2 = "      <div class=\"courses-grid\" id=\"mini-courses-grid\">\n        <!-- Courses will be rendered here by JS -->\n      </div>"
    idx2 = html.find(OLD_AFTER2)
    if idx2 != -1:
        # find next comment after that
        end_idx = idx2 + len(OLD_AFTER2)
        html = html[:end_idx] + '\n' + NEW_AFTER.split('<!-- 👨')[0].strip() + '\n\n      <!-- 👨\u200d👩\u200d👧\u200d👦 Parents\' Corner Section -->' + html[html.find("<!-- 👨", end_idx)+ len("<!-- 👨\u200d👩\u200d👧\u200d👦 Parents' Corner Section -->"):]
        print("Grid + CTA added (alternate method)")
    else:
        print("ERROR: Grid marker not found either")


# ════════════════════════════════════════════════════
#  4. IMPROVE JS — remove 'ডেমো' from audio player
# ════════════════════════════════════════════════════
js = js.replace('(ডেমো প্লেয়ার)', '')
js = js.replace(
    "if (status) status.innerHTML = '🟢 ওস্তাদের তেলাওয়াত চলছে... (ডেমো প্লেয়ার)';",
    "if (status) status.innerHTML = '🟢 অডিও রিডিং চলছে...';"
)

# ════════════════════════════════════════════════════
#  5. SAVE
# ════════════════════════════════════════════════════
with open(HTML_FILE, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"HTML saved: {len(html)} chars")

with open(JS_FILE, 'w', encoding='utf-8') as f:
    f.write(js)
print("JS saved")
print("\n--- DONE ---")
