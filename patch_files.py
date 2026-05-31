import os

def main():
    # 1. Edit index.html
    html_path = "index.html"
    if os.path.exists(html_path):
        print("Patching index.html...")
        with open(html_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Replacement 1: Limited Time Offer Badge
        r1_target = '<span style="display:inline-flex;align-items:center;gap:6px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);color:#fca5a5;font-size:12px;font-weight:700;padding:6px 14px;border-radius:30px;">🔥 সীমিত সময়ের অফার</span>'
        content = content.replace(r1_target, "")

        # Replacement 2: Heading tagline
        r2_target = '<p style="color:rgba(255,255,255,0.82);font-size:clamp(15px,2.5vw,18px);max-width:620px;margin:16px auto 0;line-height:1.85;">ছোট ছোট কোর্স, বড় বড় শিক্ষা। নিজেকে ও পরিবারকে আলোকিত করুন — অর্জন করুন <strong style="color:var(--gold-light);">সম্মাননা সার্টিফিকেট!</strong></p>'
        r2_replacement = '<p style="color:rgba(255,255,255,0.82);font-size:clamp(15px,2.5vw,18px);max-width:620px;margin:16px auto 0;line-height:1.85;">ছোট ছোট কোর্স, বড় বড় শিক্ষা। নিজেকে ও পরিবারকে আলোকিত করুন।</p>'
        content = content.replace(r2_target, r2_replacement)

        # Replacement 3: Stat Pills
        r3_target = """      <!-- Stat Pills -->
      <div style="display:flex;justify-content:center;gap:10px;margin-top:26px;flex-wrap:wrap;">
        <div style="background:rgba(212,168,67,0.1);border:1px solid rgba(212,168,67,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background='rgba(212,168,67,0.18)'" onmouseout="this.style.background='rgba(212,168,67,0.1)'">
          <span style="font-size:17px;">📖</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong class="stat-num" data-target="100" data-suffix="+" style="color:var(--gold-light);">১০০+</strong> ফ্রি অধ্যায়</span>
        </div>
        <div style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background='rgba(167,139,250,0.18)'" onmouseout="this.style.background='rgba(167,139,250,0.1)'">
          <span style="font-size:17px;">🏆</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong class="stat-num" data-target="100" data-suffix="%" style="color:#c4b5fd;">১০০%</strong> ফ্রি সার্টিফিকেট</span>
        </div>
        <div style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background='rgba(249,115,22,0.18)'" onmouseout="this.style.background='rgba(249,115,22,0.1)'">
          <span style="font-size:17px;">⚡</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong style="color:#fb923c;">XP & স্ট্রিক</strong> সিস্টেম</span>
        </div>
      </div>"""
        r3_replacement = """      <!-- Stat Pills -->
      <div style="display:flex;justify-content:center;gap:10px;margin-top:26px;flex-wrap:wrap;">
        <div style="background:rgba(212,168,67,0.1);border:1px solid rgba(212,168,67,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background='rgba(212,168,67,0.18)'" onmouseout="this.style.background='rgba(212,168,67,0.1)'">
          <span style="font-size:17px;">📖</span><span style="color:#fff;font-size:13px;font-weight:600;"><strong class="stat-num" data-target="100" data-suffix="+" style="color:var(--gold-light);">১০০+</strong> ফ্রি অধ্যায়</span>
        </div>
        <div style="background:rgba(167,139,250,0.1);border:1px solid rgba(167,139,250,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background='rgba(167,139,250,0.18)'" onmouseout="this.style.background='rgba(167,139,250,0.1)'">
          <span style="font-size:17px;">🗣️</span><span style="color:#fff;font-size:13px;font-weight:600;">সহজ বাংলা আলোচনা</span>
        </div>
        <div style="background:rgba(249,115,22,0.1);border:1px solid rgba(249,115,22,0.25);padding:9px 16px;border-radius:50px;display:flex;align-items:center;gap:7px;cursor:default;" onmouseover="this.style.background='rgba(249,115,22,0.18)'" onmouseout="this.style.background='rgba(249,115,22,0.1)'">
          <span style="font-size:17px;">🎯</span><span style="color:#fff;font-size:13px;font-weight:600;">আকর্ষণীয় কুইজ</span>
        </div>
      </div>"""
        content = content.replace(r3_target, r3_replacement)

        # Replacement 4: Gamification Strip
        r4_target = """      <!-- Gamification Strip -->
      <div class="mc-gamify-strip">
        <div class="mc-gamify-item">🎯 কুইজ করুন <span class="mc-gi-val">+10 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">📚 চ্যাপ্টার শেষ করুন <span class="mc-gi-val">+10 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">🔗 রেফার করুন <span class="mc-gi-val">+50 XP</span></div>
        <div class="mc-divider"></div>
        <div class="mc-gamify-item">🏅 কোর্স সম্পূর্ণ করুন <span class="mc-gi-val">+60 XP</span></div>
      </div>"""
        content = content.replace(r4_target, "")

        # Replacement 5: Testimonials
        r5_target = """          <div class="mc-mini-testimonial">
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
          </div>"""
        r5_replacement = """          <div class="mc-mini-testimonial">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"নামাজের কোর্সটি অসাধারণ! আমার বাচ্চা মাত্র ৩ দিনে সূরা ফাতিহার অর্থ ও তাফসির শিখে ফেলেছে। দ্বীন শেখার প্রতি সে এখন খুব আগ্রহী।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,var(--blue-dark),var(--blue));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">র</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">রাহেলা বেগম</div><div style="font-size:11.5px;color:var(--text-muted);">ঢাকা, বাংলাদেশ</div></div>
            </div>
          </div>
          <div class="mc-mini-testimonial">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"সম্পূর্ণ ফ্রিতে এত সুন্দর কোর্স! অনেক কিছু শিখতে পেরেছি। UK থেকে বাংলায় ইসলাম শেখা এখন অনেক সহজ।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">ফ</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">ফাহিম আহমেদ</div><div style="font-size:11.5px;color:var(--text-muted);">লন্ডন, UK</div></div>
            </div>
          </div>
          <div class="mc-mini-testimonial">
            <div style="color:var(--gold);font-size:15px;letter-spacing:2px;margin-bottom:10px;">★★★★★</div>
            <p style="font-size:14px;color:var(--text);line-height:1.8;margin-bottom:14px;font-style:italic;">"সহজ ও সুন্দর উপস্থাপনার কারণে সন্তান প্রতিদিন নিজে থেকেই পড়ছে! এই ডিজিটাল লার্নিং সিস্টেমটা অসাধারণ ও কার্যকর।"</p>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="width:38px;height:38px;background:linear-gradient(135deg,#0d9488,#14b8a6);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;">স</div>
              <div><div style="font-size:13.5px;font-weight:700;color:var(--dark);">সাবরিনা খানম</div><div style="font-size:11.5px;color:var(--text-muted);">কুয়ালালামপুর, মালয়েশিয়া</div></div>
            </div>
          </div>"""
        content = content.replace(r5_target, r5_replacement)

        # Replacement 6: Parents' Corner
        r6_target = """        <p style="color:rgba(255,255,255,0.85); font-size:14.5px; line-height:1.85; margin-bottom:24px; position:relative; z-index:2;">
          প্রিয় অভিভাবক, আজকের ইন্টারনেটের যুগে সন্তানদের ইসলামিক আদব-কায়দা ও সহীহ দ্বীনি শিক্ষা দেওয়া সবচেয়ে বড় চ্যালেঞ্জ। GIC-এর ফ্রি মিনি-কোর্সগুলো এমনভাবে ডিজাইন করা হয়েছে যা আপনার সন্তানের মধ্যে নৈতিক চরিত্র গঠন, আল্লাহর প্রতি ভালোবাসা এবং ইসলামিক বুনিয়াদী জ্ঞান অত্যন্ত আনন্দের সাথে ও খেলার ছলে (Gamified) তৈরি করবে। প্রতিটি কোর্সে রয়েছে মজার কুইজ ও প্রাইজ পয়েন্ট (XP) যা তাদের পড়ার আগ্রহ দ্বিগুণ করে দেয়!
        </p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:28px; position:relative; z-index:2;">
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:14px; display:flex; gap:12px;">
            <span style="font-size:24px; color:var(--gold-light);">🛡️</span>
            <div>
              <h5 style="color:#fff; font-size:14.5px; margin-bottom:4px; font-weight:700;">নিরাপদ ও দ্বীনি পরিবেশ</h5>
              <p style="color:rgba(255,255,255,0.65); font-size:12.5px; line-height:1.6;">অনলাইনের বিভ্রান্তি থেকে দূরে রেখে আপনার সন্তানকে সুস্থ ও গঠনমূলক ইসলামিক শিক্ষায় ব্যস্ত রাখুন।</p>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:14px; display:flex; gap:12px;">
            <span style="font-size:24px; color:var(--gold-light);">⚡</span>
            <div>
              <h5 style="color:#fff; font-size:14.5px; margin-bottom:4px; font-weight:700;">게মিফাইড লার্নিং (XP & Streak)</h5>
              <p style="color:rgba(255,255,255,0.65); font-size:12.5px; line-height:1.6;">পয়েন্ট অর্জন, স্ট্রিক ও লেভেল আপের মাধ্যমে শিক্ষার্থীরা আনন্দের সাথে সম্পূর্ণ কোর্স শেষ করতে উদ্বুদ্ধ হয়।</p>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:14px; display:flex; gap:12px;">
            <span style="font-size:24px; color:var(--gold-light);">📜</span>
            <div>
              <h5 style="color:#fff; font-size:14.5px; margin-bottom:4px; font-weight:700;">অফিসিয়াল সার্টিফিকেট</h5>
              <p style="color:rgba(255,255,255,0.65); font-size:12.5px; line-height:1.6;">কোর্স সম্পন্ন করার সাথে সাথে শিশুর যোগ্যতা ও চেষ্টার স্বীকৃতিস্বরূপ প্রশংসা সনদপত্র প্রদান করা হয়।</p>
            </div>
          </div>
        </div>"""
        r6_replacement = """        <p style="color:rgba(255,255,255,0.85); font-size:14.5px; line-height:1.85; margin-bottom:24px; position:relative; z-index:2;">
          প্রিয় অভিভাবক, আজকের ইন্টারনেটের যুগে সন্তানদের ইসলামিক আদব-কায়দা ও সহীহ দ্বীনি শিক্ষা দেওয়া সবচেয়ে বড় চ্যালেঞ্জ। GIC-এর ফ্রি মিনি-কোর্সগুলো এমনভাবে ডিজাইন করা হয়েছে যা আপনার সন্তানের মধ্যে নৈতিক চরিত্র গঠন, আল্লাহর প্রতি ভালোবাসা এবং ইসলামিক বুনিয়াদী জ্ঞান অত্যন্ত আনন্দের সাথে ও আকর্ষণীয়ভাবে তৈরি করবে। প্রতিটি কোর্সে রয়েছে মজার কুইজ ও আকর্ষণীয় প্রশ্ন-উত্তর যা তাদের পড়ার আগ্রহ দ্বিগুণ করে দেয়!
        </p>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:16px; margin-bottom:28px; position:relative; z-index:2;">
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:14px; display:flex; gap:12px;">
            <span style="font-size:24px; color:var(--gold-light);">🛡️</span>
            <div>
              <h5 style="color:#fff; font-size:14.5px; margin-bottom:4px; font-weight:700;">নিরাপদ ও দ্বীনি পরিবেশ</h5>
              <p style="color:rgba(255,255,255,0.65); font-size:12.5px; line-height:1.6;">অনলাইনের বিভ্রান্তি থেকে দূরে রেখে আপনার সন্তানকে সুস্থ ও গঠনমূলক ইসলামিক শিক্ষায় ব্যস্ত রাখুন।</p>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:14px; display:flex; gap:12px;">
            <span style="font-size:24px; color:var(--gold-light);">💡</span>
            <div>
              <h5 style="color:#fff; font-size:14.5px; margin-bottom:4px; font-weight:700;">সহজ ও আনন্দদায়ক শিক্ষাপদ্ধতি</h5>
              <p style="color:rgba(255,255,255,0.65); font-size:12.5px; line-height:1.6;">গল্পের ছলে, সুন্দর ভিজ্যুয়াল এবং ইন্টারেক্টিভ কুইজের মাধ্যমে শিশুরা খুব সহজে ও আনন্দের সাথে দ্বীন শিখতে পারে।</p>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:18px; border-radius:14px; display:flex; gap:12px;">
            <span style="font-size:24px; color:var(--gold-light);">📱</span>
            <div>
              <h5 style="color:#fff; font-size:14.5px; margin-bottom:4px; font-weight:700;">যেকোনো সময়, যেকোনো স্থান থেকে</h5>
              <p style="color:rgba(255,255,255,0.65); font-size:12.5px; line-height:1.6;">আপনার সুবিধাজনক সময়ে কম্পিউটার, ট্যাবলেট বা মোবাইল থেকে যেকোনো স্থান থেকে ফ্রি কোর্সগুলো করা যাবে।</p>
            </div>
          </div>
        </div>"""
        content = content.replace(r6_target, r6_replacement)

        with open(html_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("index.html patched successfully.")

    # 2. Edit mini-courses.js
    js_path = "mini-courses.js"
    if os.path.exists(js_path):
        print("Patching mini-courses.js...")
        with open(js_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Replacement 7: Auth Bar XP Representation
        r7_target = 'নম্বর: ${studentSession.phone} | <span style="color:var(--gold);">⚡ ${totalXP} XP</span> | 🔗'
        r7_replacement = 'নম্বর: ${studentSession.phone} | 🔗'
        content = content.replace(r7_target, r7_replacement)

        # Replacement 8: Leaderboard Tab Removal
        r8_target = """  // Dynamically append the 🏆 Global Leaderboard Tab at the end
  const lbBtn = document.createElement('button');
  lbBtn.className = `category-tab-btn ${activeCategory === 'leaderboard' ? 'active' : ''}`;
  lbBtn.setAttribute('data-category', 'leaderboard');
  lbBtn.innerHTML = `🏆 গ্লোবাল লিডারবোর্ড`;
  lbBtn.onclick = () => {
    activeCategory = 'leaderboard';
    const buttons = tabContainer.querySelectorAll('.category-tab-btn');
    buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'leaderboard'));
    renderMiniCourses();
  };
  tabContainer.appendChild(lbBtn);"""
        content = content.replace(r8_target, "")

        # Replacement 9: Course Card XP Pill
        r9_target = """        <div style="margin-bottom:16px; display:flex; justify-content:center; gap:6px; flex-wrap:wrap;">
          <span style="background:rgba(37,211,102,0.08); color:#1DA851; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700; border:1px solid rgba(37,211,102,0.15);">✓ সম্পূর্ণ ফ্রি</span>
          <span style="background:rgba(212,168,67,0.08); color:var(--gold); padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700; border:1px solid rgba(212,168,67,0.15);">⚡ +${course.chapters.length * 10} XP</span>
        </div>"""
        r9_replacement = """        <div style="margin-bottom:16px; display:flex; justify-content:center; gap:6px; flex-wrap:wrap;">
          <span style="background:rgba(37,211,102,0.08); color:#1DA851; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700; border:1px solid rgba(37,211,102,0.15);">✓ সম্পূর্ণ ফ্রি</span>
        </div>"""
        content = content.replace(r9_target, r9_replacement)

        # Replacement 10: Share Text XP & Certificate Removal
        r10_target = """  const shareText = `📖 *${course.title}* — সম্পূর্ণ ফ্রি ইসলামিক মিনি-কোর্স!

🌟 *কোর্সের বৈশিষ্ট্যসমূহ:*
✅ তাজউইদ ও সহীহ উচ্চারণ শিক্ষা
✅ আকর্ষক কুইজ ও XP পয়েন্ট অর্জন
✅ সম্পূর্ণ সমাপ্তির পর প্রশংসাপত্র (Certificate)

✨ নিজেকে ও পরিবারকে আলোকিত করতে আজই ফ্রিতে কোর্সটি শুরু করুন!
👇 সরাসরি নিচে দেওয়া লিংকে ক্লিক করে যুক্ত হোন:`;"""
        r10_replacement = """  const shareText = `📖 *${course.title}* — সম্পূর্ণ ফ্রি ইসলামিক মিনি-কোর্স!

🌟 *কোর্সের বৈশিষ্ট্যসমূহ:*
✅ তাজউইদ ও সহীহ উচ্চারণ শিক্ষা
✅ আকর্ষক ও সহজ প্রশ্ন-উত্তর (কুইজ)
✅ অত্যন্ত আধুনিক ও আনন্দদায়ক শিক্ষাপদ্ধতি

✨ নিজেকে ও পরিবারকে আলোকিত করতে আজই ফ্রিতে কোর্সটি শুরু করুন!
👇 সরাসরি নিচে দেওয়া লিংকে ক্লিক করে যুক্ত হোন:`;"""
        content = content.replace(r10_target, r10_replacement)

        with open(js_path, "w", encoding="utf-8") as f:
            f.write(content)
        print("mini-courses.js patched successfully.")

if __name__ == "__main__":
    main()
