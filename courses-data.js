/**
 * GIC HUB — COMPLETE COURSE DATABASE
 * -------------------------------------------------------------
 * Categories:
 * - 'pillars' (ইসলামের মূল ভিত্তি)
 * - 'health' (শরীরচর্চা ও স্বাস্থ্য)
 * - 'communication' (কমিউনিকেশন ও সম্পর্ক)
 * - 'money' (মানি ম্যানেজমেন্ট)
 * - 'mindset' (মাইন্ডসেট ও আত্মউন্নয়ন)
 * - 'sales' (সেলস ও ব্যবসা)
 * - 'history' (ইতিহাস ও অন্যান্য)
 */

const categoriesData = {
  all: "সব কোর্স",
  pillars: "🕌 ইসলামের মূল ভিত্তি",
  health: "💪 শরীরচর্চা ও স্বাস্থ্য",
  communication: "🤝 কমিউনিকেশন ও সম্পর্ক",
  money: "💰 মানি ম্যানেজমেন্ট",
  mindset: "🧠 মাইন্ডসেট ও আত্মউন্নয়ন",
  sales: "💼 সেলস ও ব্যবসা",
  history: "📜 ইতিহাস ও অন্যান্য"
};

const miniCoursesData = [
// ==========================================
  // COURSE 1 — পবিত্রতার পূর্ণ গাইড (10 পার্ট)
  // ==========================================
  {
    id: 1,
    title: "পবিত্রতার পূর্ণ গাইড",
    icon: "💧",
    duration: "৭৫ মিনিট",
    partsCount: 10,
    tagline: "কখন অপবিত্র হই, কীভাবে পবিত্র হই — ইসলামের সম্পূর্ণ তাহারাত গাইড!",
    color: "#0891b2",
    category: "pillars",
    chapters: [

      // ── পার্ট ১ ──
      {
        title: "পার্ট ১ — পবিত্রতা কী এবং কেন? ইসলামের তাহারাত",
        funFact: "রাসুলুল্লাহ (সা.) বলেছেন: 'পবিত্রতা ঈমানের অর্ধেক!' — মাত্র পরিষ্কার থাকা দিয়ে আপনি অর্ধেক ঈমান অর্জন করতে পারেন! 🌟",
        teaser: "পরের পার্টে — অপবিত্রতার প্রকারভেদ: কোনটা বড় অপবিত্রতা, কোনটা ছোট — এবং কীভাবে বুঝবেন আপনি কোন ধরনে আছেন।",
        content: `
          <p>ইসলামে <strong>তাহারাত</strong> (পবিত্রতা) একটি মৌলিক বিষয়। আল্লাহ বলেছেন: <em>"নিশ্চয়ই আল্লাহ তাওবাকারীদের ভালোবাসেন এবং ভালোবাসেন পবিত্রতা অর্জনকারীদের।"</em> (সূরা বাকারা: ২২২)</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💧 পবিত্রতা দুই ধরনের</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:16px;border-radius:12px;border-left:4px solid #0891b2;">
              <strong style="color:#0891b2;">১. বাহ্যিক পবিত্রতা (হিসি):</strong>
              <p style="font-size:14px;margin-top:6px;">শরীর, কাপড় ও নামাজের স্থান নাজাসাত (অপবিত্র বস্তু) থেকে পাক রাখা।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;border-left:4px solid var(--gold);">
              <strong style="color:var(--gold);">২. আত্মিক পবিত্রতা (মানোয়ি):</strong>
              <p style="font-size:14px;margin-top:6px;">শির্ক, কুফর, মুনাফেকি থেকে অন্তরকে পরিষ্কার রাখা — এটি আরও গভীর পবিত্রতা।</p>
            </div>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🔑 তাহারাতের তিনটি মাধ্যম</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;">🚿</span>
              <div><strong>অজু:</strong> ছোট অপবিত্রতা থেকে পবিত্রতা অর্জন</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;">🛁</span>
              <div><strong>গোসল:</strong> বড় অপবিত্রতা (জানাবাত) থেকে পবিত্রতা অর্জন</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;">🌍</span>
              <div><strong>তায়াম্মুম:</strong> পানি না পেলে মাটি দিয়ে পবিত্রতা অর্জন</div>
            </li>
          </ul>
          <br>
          <blockquote style="background:rgba(8,145,178,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:8px;line-height:2;">الطَّهُورُ شَطْرُ الْإِيمَانِ</p>
            <p>"পবিত্রতা ঈমানের অর্ধেক।" — (সহিহ মুসলিম: ২২৩)</p>
          </blockquote>
        `,
        quiz: {
          question: "সহিহ মুসলিমের হাদিস অনুযায়ী পবিত্রতা ঈমানের কতটুকু?",
          options: ["এক তৃতীয়াংশ", "এক চতুর্থাংশ", "অর্ধেক", "তিন চতুর্থাংশ"],
          correct: 2,
          explanation: "সহিহ মুসলিমের (২২৩) হাদিসে রাসুলুল্লাহ (সা.) বলেছেন — 'আত্তাহুরু শাত্রুল ঈমান' — পবিত্রতা ঈমানের অর্ধেক। তাই পবিত্রতাকে ঈমানের সাথে সমান গুরুত্ব দেওয়া হয়েছে।"
        }
      },

      // ── পার্ট ২ ──
      {
        title: "পার্ট ২ — নাজাসাত: অপবিত্রতার প্রকারভেদ",
        funFact: "ইসলামে অপবিত্রতা দুই ধরনের — হুকমি ও হাকিকি। আপনার শরীর দেখতে পরিষ্কার হলেও হুকমি অপবিত্রতায় থাকতে পারেন, যা শুধু অজু/গোসলেই দূর হয়! 🔍",
        teaser: "পরের পার্টে — ইস্তিঞ্জা: টয়লেট ব্যবহারের ইসলামিক আদব, যা জানলে প্রতিটি ওয়াশরুম ব্যবহার ইবাদতে পরিণত হবে!",
        content: `
          <p>নাজাসাত বা অপবিত্রতা দুই ধরনের। একটি দেখা যায়, একটি দেখা যায় না — কিন্তু দুটোই নামাজের জন্য সমস্যা।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📋 নাজাসাতের প্রকারভেদ</h4>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:18px;border-radius:14px;border-left:4px solid #ef4444;">
              <strong style="color:#dc2626;">হুকমি নাজাসাত (অদৃশ্য অপবিত্রতা):</strong>
              <p style="font-size:14px;margin-top:8px;">শরীরে কোনো নোংরা পদার্থ নেই, কিন্তু শরিয়তের দৃষ্টিতে অপবিত্র। যেমন:</p>
              <ul style="font-size:14px;margin-top:8px;padding-left:16px;display:flex;flex-direction:column;gap:4px;">
                <li>✦ <strong>হাদাসে আসগার (ছোট):</strong> অজু নষ্ট হলে — গ্যাস, টয়লেট, ঘুম ইত্যাদি</li>
                <li>✦ <strong>হাদাসে আকবার (বড়):</strong> গোসল ফরজ হলে — স্বামী-স্ত্রীর মিলন, স্বপ্নদোষ ইত্যাদি</li>
              </ul>
            </div>
            <div style="background:linear-gradient(135deg,rgba(249,115,22,0.08),rgba(249,115,22,0.02));padding:18px;border-radius:14px;border-left:4px solid #f97316;">
              <strong style="color:#ea580c;">হাকিকি নাজাসাত (দৃশ্যমান অপবিত্রতা):</strong>
              <p style="font-size:14px;margin-top:8px;">শরীর বা কাপড়ে নোংরা পদার্থ লেগে থাকা। যেমন:</p>
              <ul style="font-size:14px;margin-top:8px;padding-left:16px;display:flex;flex-direction:column;gap:4px;">
                <li>✦ প্রস্রাব, পায়খানা, রক্ত, মদ</li>
                <li>✦ শূকর, কুকুরের লালা</li>
                <li>✦ মৃত পশুর শরীর</li>
              </ul>
            </div>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🧹 নাজাসাত দূর করার উপায়</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>হুকমি নাজাসাত:</strong> অজু বা গোসলের মাধ্যমে দূর হয়
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>হাকিকি নাজাসাত:</strong> পানি দিয়ে ধুয়ে পরিষ্কার করতে হবে
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:16px;border-radius:12px;text-align:center;font-weight:600;">
            💡 কাপড়ে নাজাসাত লাগলে তিনবার ধুয়ে প্রতিবার ভালো করে চিপলে পাক হয়!
          </div>
        `,
        quiz: {
          question: "হাদাসে আসগার (ছোট অপবিত্রতা) কী দিয়ে দূর হয়?",
          options: ["শুধু পানি দিয়ে", "অজু দিয়ে", "গোসল দিয়ে", "তায়াম্মুম দিয়ে"],
          correct: 1,
          explanation: "হাদাসে আসগার বা ছোট অপবিত্রতা (যেমন অজু ভেঙে যাওয়া) অজুর মাধ্যমে দূর হয়। আর হাদাসে আকবার বা বড় অপবিত্রতা গোসলের মাধ্যমে দূর হয়।"
        }
      },

      // ── পার্ট ৩ ──
      {
        title: "পার্ট ৩ — ইস্তিঞ্জা: টয়লেট ব্যবহারের ইসলামিক আদব",
        funFact: "নবীজি (সা.) টয়লেটে প্রবেশের আগে বাঁ পা দিয়ে ঢুকতেন এবং বের হতেন ডান পা দিয়ে! এই ছোট্ট অভ্যাস সুন্নত — প্রতিবার মেনে চললে সওয়াব পাবেন! 👣",
        teaser: "পরের পার্টে — অজুর পূর্ণ পদ্ধতি: ফরজ কোনগুলো, সুন্নত কোনগুলো এবং কোন ভুলগুলো অজু নষ্ট করে দেয়।",
        content: `
          <p>টয়লেট ব্যবহার মানুষের স্বাভাবিক প্রয়োজন — কিন্তু ইসলাম এটাকেও একটি আদব ও সুন্নতের বিষয় বানিয়ে দিয়েছে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🚪 টয়লেটে প্রবেশের আদব</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">1️⃣</span>
              <div><strong>বাঁ পা দিয়ে প্রবেশ করুন</strong> এবং দোয়া পড়ুন:<br>
              <span style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);">اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ</span><br>
              <em style="font-size:13px;">"হে আল্লাহ! আমি পুরুষ শয়তান ও মহিলা শয়তান থেকে আপনার আশ্রয় চাই।"</em></div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">2️⃣</span>
              <div><strong>কিবলামুখী না হওয়া:</strong> টয়লেটে বসার সময় কিবলার দিকে বা পেছন ফিরে বসবেন না (খোলা জায়গায়)।</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">3️⃣</span>
              <div><strong>কথা না বলা:</strong> টয়লেটে অপ্রয়োজনীয় কথা বলা বা ফোনে কথা বলা মাকরুহ।</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">4️⃣</span>
              <div><strong>ডান হাত ব্যবহার না করা:</strong> ইস্তিঞ্জা (পরিষ্কার করা) সর্বদা বাঁ হাতে করুন।</div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🚪 বের হওয়ার আদব</h4>
          <div style="background:var(--cream);padding:14px;border-radius:10px;">
            <strong>ডান পা দিয়ে বের হন</strong> এবং পড়ুন:<br>
            <span style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);">غُفْرَانَكَ</span><br>
            <em style="font-size:13px;">"হে আল্লাহ! আমি আপনার ক্ষমা চাই।"</em>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">💧 ইস্তিঞ্জার পদ্ধতি</h4>
          <div style="background:linear-gradient(135deg,rgba(8,145,178,0.06),rgba(8,145,178,0.01));padding:16px;border-radius:12px;">
            <p style="font-size:14px;">পানি দিয়ে ভালোভাবে পরিষ্কার করুন। ঢিলা-কুলুখ (টিস্যু) ব্যবহার করা যায়, তবে পানি উত্তম। পবিত্রতা নিশ্চিত না হওয়া পর্যন্ত পরিষ্কার করুন।</p>
          </div>
        `,
        quiz: {
          question: "টয়লেটে প্রবেশের সময় কোন পা আগে দিতে হয়?",
          options: ["ডান পা", "বাঁ পা", "যেকোনো পা", "একসাথে দুই পা"],
          correct: 1,
          explanation: "টয়লেটে প্রবেশের সময় বাঁ পা আগে দেওয়া সুন্নত এবং বের হওয়ার সময় ডান পা আগে দেওয়া সুন্নত। এটি নবীজি (সা.)-এর অভ্যাস ছিল।"
        }
      },

      // ── পার্ট ৪ ──
      {
        title: "পার্ট ৪ — অজু: পদ্ধতি, ফরজ ও সুন্নত",
        funFact: "অজুর সময় যে অঙ্গগুলো ধোয়া হয়, কিয়ামতে সেগুলো নূরে ঝলমল করবে। রাসুলুল্লাহ (সা.) বলেছেন — এই আলোর কারণেই তিনি তাঁর উম্মতকে চিনবেন! ✨",
        teaser: "পরের পার্টে — অজু কখন ভাঙে? অনেকেই জানেন না এমন কিছু কারণ যা অজু নষ্ট করে দেয়।",
        content: `
          <p>অজু হলো ছোট অপবিত্রতা দূর করার মাধ্যম। নামাজের আগে এটি ফরজ। আসুন জেনে নিই সঠিক পদ্ধতি।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📌 অজুর ফরজ (৪টি)</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">১</span>
              <div><strong>মুখমণ্ডল ধোয়া:</strong> চুলের গোড়া থেকে থুতনি পর্যন্ত, এক কান থেকে অন্য কান পর্যন্ত</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">২</span>
              <div><strong>উভয় হাত কনুই পর্যন্ত ধোয়া</strong></div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">৩</span>
              <div><strong>মাথার চার ভাগের এক ভাগ মাসেহ করা</strong></div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">৪</span>
              <div><strong>উভয় পা টাখনু পর্যন্ত ধোয়া</strong></div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⭐ অজুর সুন্নত (গুরুত্বপূর্ণ কিছু)</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:8px;">
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ বিসমিল্লাহ দিয়ে শুরু করা</li>
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ ডান দিক থেকে শুরু করা</li>
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ প্রতিটি অঙ্গ তিনবার ধোয়া</li>
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ মিসওয়াক করা</li>
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ কুলি করা ও নাকে পানি দেওয়া</li>
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ পুরো মাথা মাসেহ করা</li>
            <li style="background:var(--cream);padding:12px;border-radius:8px;">✦ উভয় কান মাসেহ করা</li>
          </ul>
          <br>
          <blockquote style="background:rgba(8,145,178,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;text-align:center;">
            <p style="font-weight:700;color:var(--blue-dark);">অজুর শেষে পড়ুন: <span style="font-family:var(--font-arabic);font-size:16px;">أَشْهَدُ أَن لَّا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ</span></p>
            <p style="font-size:13px;margin-top:6px;color:var(--text-muted);">এই দোয়া পড়লে জান্নাতের ৮টি দরজা খুলে দেওয়া হয় — (মুসলিম: ২৩৪)</p>
          </blockquote>
        `,
        quiz: {
          question: "অজুর ফরজ কতটি?",
          options: ["তিনটি", "চারটি", "পাঁচটি", "ছয়টি"],
          correct: 1,
          explanation: "অজুর ফরজ চারটি: ১. মুখমণ্ডল ধোয়া, ২. উভয় হাত কনুই পর্যন্ত ধোয়া, ৩. মাথার এক চতুর্থাংশ মাসেহ করা, ৪. উভয় পা টাখনু পর্যন্ত ধোয়া।"
        }
      },

      // ── পার্ট ৫ ──
      {
        title: "পার্ট ৫ — অজু কখন ভাঙে? ভঙ্গের কারণসমূহ",
        funFact: "অনেকে জানেন না — জোরে হাসলে নামাজ নষ্ট হয়, কিন্তু অজু নষ্ট হয় না। আবার পরিষ্কার ঘুমের পর অজু ভেঙে যায়! জ্ঞান না থাকলে ভুল হয়! 😅",
        teaser: "পরের পার্টে — গোসল: কখন ফরজ হয়, কীভাবে করতে হয় এবং গোসলের ফরজ কতটি।",
        content: `
          <p>অজু করার পর কিছু কারণে তা নষ্ট হয়ে যায়। এগুলো জানা অত্যন্ত জরুরি — না জানলে অজু না থাকলেও মনে করতে পারেন আছে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">❌ অজু ভঙ্গের কারণ</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>১. পায়খানা বা প্রস্রাব করা</strong> — সামান্য হলেও অজু ভাঙে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>২. বায়ু নির্গত হওয়া (গ্যাস)</strong> — যেকোনো রাস্তায়
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৩. ঘুমানো</strong> — হেলান দিয়ে বা শুয়ে ঘুমালে অজু ভাঙে (নামাজে ঘুম আসলে ভাঙে না)
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৪. বেহুঁশ হওয়া বা পাগল হওয়া</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৫. রক্ত বা পুঁজ বের হওয়া</strong> — শরীরের কোনো স্থান থেকে প্রবাহিত হলে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৬. বমি করা</strong> — মুখ ভরে বমি হলে অজু ভাঙে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৭. নামাজে উচ্চস্বরে হাসা</strong> — নামাজ ও অজু উভয়ই ভাঙে
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">✅ যা অজু ভাঙে না</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">
              ✓ নামাজে ঘুমের ঝিমুনি আসলে (যদি কোমর থেকে পা না উঠে)
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">
              ✓ স্বামী-স্ত্রীর হাত ধরলে (হানাফি মতে)
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">
              ✓ নামাজে জোরে হাসলে নামাজ ভাঙে কিন্তু অজু ভাঙে না (নামাজের বাইরে)
            </div>
          </div>
        `,
        quiz: {
          question: "কোন অবস্থায় ঘুমালে অজু ভাঙে?",
          options: ["নামাজে দাঁড়িয়ে ঘুমালে", "হেলান দিয়ে বা শুয়ে ঘুমালে", "বসে সামান্য ঝিমুনি আসলে", "চোখ বন্ধ থাকলে"],
          correct: 1,
          explanation: "হেলান দিয়ে বা শুয়ে ঘুমালে অজু ভেঙে যায়। কারণ এই অবস্থায় শরীর সম্পূর্ণ শিথিল হয়ে যায় এবং অজু নষ্টকারী কিছু বের হতে পারে। তবে নামাজে দাঁড়িয়ে বা বসে হালকা ঘুম আসলে অজু ভাঙে না।"
        }
      },

      // ── পার্ট ৬ ──
      {
        title: "পার্ট ৬ — গোসল: কখন ফরজ এবং সঠিক পদ্ধতি",
        funFact: "গোসলের ফরজ মাত্র ৩টি, কিন্তু এই ৩টি সঠিকভাবে করলেই গোসল পূর্ণ হয়। বাকিগুলো সুন্নত — করলে সওয়াব, না করলেও গোসল শুদ্ধ! 🚿",
        teaser: "পরের পার্টে — হায়েয ও নিফাস: নারীদের বিশেষ পবিত্রতার বিধান যা প্রতিটি মুসলিম নারীর জানা জরুরি।",
        content: `
          <p>গোসল হলো বড় অপবিত্রতা (হাদাসে আকবার) থেকে পবিত্র হওয়ার উপায়। এটি ফরজ হলে গোসল না করে নামাজ পড়া হবে না।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⚠️ গোসল ফরজ হওয়ার কারণ</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>১. স্ত্রী সহবাস</strong> — বীর্য নির্গত হোক বা না হোক
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>২. স্বপ্নদোষ</strong> — বীর্য নির্গত হলে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৩. হায়েয (মাসিক) শেষ হলে</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৪. নিফাস (প্রসব রক্ত) শেষ হলে</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>৫. ইসলাম গ্রহণ করলে</strong> (অমুসলিম থেকে মুসলিম হলে)
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📌 গোসলের ফরজ (৩টি)</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">১</span>
              <div><strong>কুলি করা:</strong> মুখের ভেতর ভালোভাবে পানি পৌঁছানো</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">২</span>
              <div><strong>নাকে পানি দেওয়া:</strong> নাকের ভেতর পর্যন্ত পানি পৌঁছানো</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;border-left:3px solid #0891b2;display:flex;gap:12px;align-items:center;">
              <span style="font-size:24px;font-weight:900;color:#0891b2;">৩</span>
              <div><strong>সারা শরীরে পানি পৌঁছানো:</strong> মাথার চুল থেকে পায়ের নখ পর্যন্ত</div>
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;font-size:14px;">
            <strong>⚠️ সতর্কতা:</strong> নাভি, বগল, চুলের গোড়া, কানের পেছনে — এসব জায়গায় পানি পৌঁছানো নিশ্চিত করুন। একটি জায়গাও শুকনো থাকলে গোসল হবে না!
          </div>
        `,
        quiz: {
          question: "গোসলের ফরজ কতটি?",
          options: ["দুইটি", "তিনটি", "চারটি", "পাঁচটি"],
          correct: 1,
          explanation: "গোসলের ফরজ তিনটি: ১. কুলি করা (মুখে পানি পৌঁছানো), ২. নাকে পানি দেওয়া, ৩. সারা শরীরে পানি পৌঁছানো। এই তিনটি সঠিকভাবে করলেই গোসল শুদ্ধ হয়।"
        }
      },

      // ── পার্ট ৭ ──
      {
        title: "পার্ট ৭ — হায়েয ও নিফাস: নারীদের বিশেষ পবিত্রতার বিধান",
        funFact: "হায়েযের সময় নারীরা নামাজ পড়েন না — এটি শাস্তি নয়, এটি আল্লাহর বিশেষ সুবিধা। রাসুলুল্লাহ (সা.) বলেছেন এই সময়ের নামাজের কাযা নেই — কোনো সওয়াব মিস হয় না! 🌹",
        teaser: "পরের পার্টে — তায়াম্মুম: পানি না পেলে বা ব্যবহার করতে না পারলে কীভাবে পবিত্র হবেন।",
        content: `
          <p>হায়েয (মাসিক) ও নিফাস (প্রসব রক্ত) নারীজীবনের স্বাভাবিক প্রক্রিয়া। ইসলামে এ সময়ের জন্য বিশেষ বিধান রয়েছে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌸 হায়েযের সময় যা করা যাবে না</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;">❌ নামাজ পড়া (কাযাও নেই)</div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;">❌ রোযা রাখা (পরে কাযা করতে হবে)</div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;">❌ কাবা তাওয়াফ করা</div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;">❌ মসজিদে অবস্থান করা</div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;">❌ সহবাস করা</div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">✅ হায়েযের সময় যা করা যাবে</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">✓ কোরআন তিলাওয়াত (না ছুঁয়ে মুখে মুখে)</div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">✓ জিকির ও দোয়া করা</div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">✓ দ্বীনি ইলম শেখা</div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;">✓ দান-সদকা করা</div>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🛁 পবিত্র হওয়ার পর</h4>
          <p style="font-size:14px;">হায়েয বা নিফাস শেষ হলে ফরজ গোসল করতে হবে। তারপর স্বাভাবিকভাবে নামাজ, রোযা সব করতে পারবেন।</p>
          <br>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;text-align:center;font-size:14px;font-weight:600;">
            💚 হায়েযের সময় নামাজ না পড়লেও আল্লাহ পূর্ণ সওয়াব লিখে দেন — কারণ এটি আল্লাহর নির্দেশেই হচ্ছে!
          </div>
        `,
        quiz: {
          question: "হায়েযের সময় ছেড়ে দেওয়া রোযার কী করতে হয়?",
          options: ["কাযা করতে হয়", "কাযা করতে হয় না", "কাফফারা দিতে হয়", "সদকা করতে হয়"],
          correct: 0,
          explanation: "হায়েযের সময় রোযা রাখা যায় না, কিন্তু এই রোযাগুলো পরে কাযা করতে হয়। অন্যদিকে নামাজের কাযা নেই — নামাজ মাফ হয়ে যায়। (সহিহ বুখারি: ৩০৪)"
        }
      },

      // ── পার্ট ৮ ──
      {
        title: "পার্ট ৮ — তায়াম্মুম: পানি না থাকলে যা করবেন",
        funFact: "তায়াম্মুম শুধু মুসলিমদের জন্য বিশেষ সুবিধা! পূর্ববর্তী নবীদের উম্মতের এই সুবিধা ছিল না। রাসুলুল্লাহ (সা.) বলেছেন — 'পুরো পৃথিবী আমার উম্মতের জন্য মসজিদ ও পবিত্রকারী!' 🌍",
        teaser: "পরের পার্টে — মোজার উপর মাসেহ: ঠান্ডায় বা ভ্রমণে অজু করার সহজ পদ্ধতি।",
        content: `
          <p>তায়াম্মুম হলো পানি না পেলে বা ব্যবহার করতে না পারলে মাটি বা পবিত্র জমিন দিয়ে পবিত্রতা অর্জনের বিকল্প পদ্ধতি।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📌 তায়াম্মুম কখন করা যাবে</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🌊</span>
              <div><strong>পানি না পাওয়া গেলে:</strong> মরুভূমি, ভ্রমণ বা বিপদে যখন পানি নেই</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🤒</span>
              <div><strong>অসুস্থতায়:</strong> পানি ব্যবহারে ক্ষতি হওয়ার সম্ভাবনা থাকলে</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">❄️</span>
              <div><strong>প্রচণ্ড ঠান্ডায়:</strong> পানি ব্যবহারে শরীরে ক্ষতির আশঙ্কা থাকলে</div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📋 তায়াম্মুমের পদ্ধতি</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#0891b2;">১</span>
              <div>নিয়্যত করুন এবং <strong>বিসমিল্লাহ</strong> বলুন</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#0891b2;">২</span>
              <div>পবিত্র মাটি বা দেওয়ালে <strong>উভয় হাত মেরে</strong> হাত ঝাড়ুন</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#0891b2;">৩</span>
              <div>সেই হাত দিয়ে <strong>পুরো মুখমণ্ডল</strong> মাসেহ করুন</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.08),rgba(8,145,178,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#0891b2;">৪</span>
              <div>আবার হাত মেরে <strong>উভয় হাত কনুই পর্যন্ত</strong> মাসেহ করুন</div>
            </div>
          </div>
          <br>
          <blockquote style="background:rgba(8,145,178,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:8px;line-height:2;">وَإِن كُنتُم مَّرْضَىٰ أَوْ عَلَىٰ سَفَرٍ ... فَتَيَمَّمُوا صَعِيدًا طَيِّبًا</p>
            <p>"...যদি তোমরা অসুস্থ হও বা সফরে থাকো... তাহলে পবিত্র মাটি দিয়ে তায়াম্মুম করো।" — (সূরা মায়িদা: ৬)</p>
          </blockquote>
        `,
        quiz: {
          question: "তায়াম্মুমে কতবার মাটিতে হাত মারতে হয়?",
          options: ["একবার", "দুইবার", "তিনবার", "চারবার"],
          correct: 1,
          explanation: "তায়াম্মুমে দুইবার মাটিতে হাত মারতে হয় — একবার মুখমণ্ডল মাসেহের জন্য, আরেকবার উভয় হাত কনুই পর্যন্ত মাসেহের জন্য। (সহিহ বুখারি: ৩৩৮)"
        }
      },

      // ── পার্ট ৯ ──
      {
        title: "পার্ট ৯ — মোজার উপর মাসেহ (মাসেহ আলাল খুফফাইন)",
        funFact: "মোজার উপর মাসেহ করলে মোজা খুলতে হয় না — এটি রাসুলুল্লাহ (সা.)-এর বিশেষ সুন্নত! মুকিমদের জন্য ১ দিন, মুসাফিরদের জন্য ৩ দিন পর্যন্ত এই সুবিধা! 🧦",
        teaser: "শেষ পার্টে — পবিত্রতা ও আধুনিক জীবন: আজকের দৈনন্দিন জীবনে পবিত্রতা রক্ষার ব্যবহারিক উপায়।",
        content: `
          <p>চামড়ার মোজা বা পুরু মোজা পরা অবস্থায় অজুতে পা ধোয়ার বদলে মোজার উপর ভেজা হাত বুলানো জায়েয — এটিকে বলে <strong>মাসেহ আলাল খুফফাইন</strong>।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">✅ শর্তাবলী</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:var(--cream);padding:12px;border-radius:10px;">✦ অজু থাকা অবস্থায় মোজা পরতে হবে</div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;">✦ মোজা পুরু হতে হবে (পানি ঢুকবে না এমন)</div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;">✦ মোজায় বড় ছিদ্র থাকলে হবে না</div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⏱️ সময়সীমা</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.1),rgba(8,145,178,0.03));padding:16px;border-radius:12px;text-align:center;">
              <div style="font-size:28px;font-weight:900;color:#0891b2;">১ দিন</div>
              <div style="font-size:13px;margin-top:4px;color:var(--text-muted);">মুকিম (যিনি বাড়িতে আছেন)</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;text-align:center;">
              <div style="font-size:28px;font-weight:900;color:var(--gold);">৩ দিন</div>
              <div style="font-size:13px;margin-top:4px;color:var(--text-muted);">মুসাফির (যিনি সফরে আছেন)</div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 পদ্ধতি</h4>
          <p style="font-size:14px;">ভেজা হাতের আঙুলগুলো পায়ের আঙুলের দিক থেকে হাঁটু পর্যন্ত মোজার উপর বুলিয়ে দিন। শুধু উপরের অংশে — নিচে নয়।</p>
          <br>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;font-size:14px;">
            <strong>⚠️ মাসেহ বাতিল হয় যখন:</strong> সময়সীমা শেষ হলে, মোজা খুললে, গোসল ফরজ হলে।
          </div>
        `,
        quiz: {
          question: "মুসাফিরের জন্য মোজার উপর মাসেহের সময়সীমা কত?",
          options: ["১ দিন ১ রাত", "২ দিন ২ রাত", "৩ দিন ৩ রাত", "৭ দিন"],
          correct: 2,
          explanation: "মুসাফিরের জন্য মোজার উপর মাসেহের সময়সীমা ৩ দিন ৩ রাত (৭২ ঘণ্টা)। আর মুকিম (বাড়িতে থাকা ব্যক্তি)-এর জন্য ১ দিন ১ রাত (২৪ ঘণ্টা)। (সহিহ মুসলিম: ২৭৬)"
        }
      },

      // ── পার্ট ১০ ──
      {
        title: "পার্ট ১০ — পবিত্রতা ও আধুনিক জীবন: সারসংক্ষেপ",
        funFact: "আধুনিক বিজ্ঞান প্রমাণ করেছে — দিনে পাঁচবার অজু করা ব্যক্তির ত্বকের ব্যাকটেরিয়া অন্যদের তুলনায় ৭০% কম! ইসলামের পবিত্রতার বিধান আসলে প্রতিষেধক চিকিৎসা! 🔬",
        teaser: "🎉 অভিনন্দন! পবিত্রতার পূর্ণ গাইড সম্পন্ন! আপনি এখন জানেন — কখন অপবিত্র হন, কীভাবে পবিত্র হবেন!",
        content: `
          <p>এই কোর্সে আমরা পবিত্রতার সম্পূর্ণ বিষয়গুলো শিখেছি। এখন দৈনন্দিন জীবনে এগুলো কীভাবে সহজে মেনে চলবেন তা দেখি।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📅 প্রতিদিনের পবিত্রতার রুটিন</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.06),rgba(8,145,178,0.01));padding:14px;border-radius:12px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;">🌅</span>
              <div><strong>সকালে উঠে:</strong> ফজরের আগে অজু করুন, ঘুমের কারণে অজু নষ্ট হয়</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.06),rgba(8,145,178,0.01));padding:14px;border-radius:12px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;">🚿</span>
              <div><strong>টয়লেটের পর:</strong> ইস্তিঞ্জা করে পুনরায় অজু করুন</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(8,145,178,0.06),rgba(8,145,178,0.01));padding:14px;border-radius:12px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;">🌙</span>
              <div><strong>রাতে ঘুমানোর আগে:</strong> অজু থাকা অবস্থায় ঘুমানো সুন্নত</div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🏆 এই কোর্স থেকে যা শিখলেন</h4>
          <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:16px;padding:24px;color:#fff;">
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;">
              <li style="display:flex;gap:10px;"><span>✅</span><span>পবিত্রতার <strong>দুই প্রকার</strong> ও গুরুত্ব বুঝলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span><strong>ইস্তিঞ্জার</strong> সঠিক আদব শিখলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>অজুর <strong>ফরজ, সুন্নত ও ভঙ্গের কারণ</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span><strong>গোসলের ফরজ</strong> ও কারণ শিখলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span><strong>তায়াম্মুম</strong> ও মোজার উপর মাসেহ জানলেন</span></li>
            </ul>
            <div style="margin-top:20px;padding:16px;background:rgba(8,145,178,0.2);border-radius:10px;text-align:center;border:1px solid rgba(8,145,178,0.4);">
              <p style="color:#7dd3fc;font-weight:700;font-size:15px;">💧 পবিত্রতা শুধু শরীরের নয় — এটি আত্মার প্রস্তুতি!</p>
            </div>
          </div>
        `,
        quiz: {
          question: "অজু থাকা অবস্থায় ঘুমানো কোন ধরনের আমল?",
          options: ["ফরজ", "ওয়াজিব", "সুন্নত", "মুস্তাহাব"],
          correct: 2,
          explanation: "অজু থাকা অবস্থায় ঘুমানো সুন্নত। রাসুলুল্লাহ (সা.) বলেছেন — যে ব্যক্তি অজু অবস্থায় ঘুমায়, তার পাশে একজন ফেরেশতা থাকেন এবং ভোরে উঠলে ওই ফেরেশতা বলেন: 'হে আল্লাহ! আপনার বান্দাকে ক্ষমা করুন।' (ইবনে হিব্বান)"
        }
      }

    ] // end chapters
  }, // end course 1

// ==========================================
  // COURSE 2 — নামাজের মাসলা-মাসায়েল (10 পার্ট)
  // ==========================================
  {
    id: 2,
    title: "নামাজের মাসলা-মাসায়েল",
    icon: "📖",
    duration: "৮০ মিনিট",
    partsCount: 10,
    tagline: "নামাজের ফরজ, ওয়াজিব, সুন্নত — সকল মাসলা এক জায়গায়!",
    color: "#7c3aed",
    category: "pillars",
    chapters: [

      // ── পার্ট ১ ──
      {
        title: "পার্ট ১ — নামাজের শর্তাবলী (শুরুত): নামাজ শুরুর আগে",
        funFact: "নামাজের শর্তাবলী পূরণ না হলে নামাজ শুরুই হয় না! অনেকে না জেনেই নামাজ পড়েন, কিন্তু একটি শর্ত না থাকলে পুরো নামাজ আবার পড়তে হবে! 😮",
        teaser: "পরের পার্টে — নামাজের ফরজ: ৭টি ফরজ যার একটি বাদ পড়লে নামাজই হবে না!",
        content: `
          <p>নামাজের <strong>শুরুত</strong> হলো সেই শর্তাবলী যা নামাজ শুরু করার আগেই পূরণ করতে হয়। এগুলো না থাকলে নামাজ শুদ্ধ হবে না।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📋 নামাজের শর্তাবলী</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">১</span>
              <div><strong>মুসলিম হওয়া:</strong> নামাজ শুধু মুসলিমের জন্য ফরজ</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">২</span>
              <div><strong>জ্ঞান থাকা:</strong> পাগল ও অচেতন অবস্থায় নামাজ নেই</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৩</span>
              <div><strong>বয়স:</strong> বালেগ হলে ফরজ, ১০ বছর হলে শিক্ষা দিতে হবে</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৪</span>
              <div><strong>পবিত্রতা:</strong> শরীর, কাপড় ও নামাজের স্থান পাক হওয়া</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৫</span>
              <div><strong>সতর ঢাকা:</strong> পুরুষের নাভি থেকে হাঁটু, নারীর মুখ ও হাত ছাড়া পুরো শরীর</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৬</span>
              <div><strong>কিবলামুখী হওয়া:</strong> কাবার দিকে মুখ করে দাঁড়ানো</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;border-left:3px solid #7c3aed;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৭</span>
              <div><strong>ওয়াক্ত হওয়া:</strong> নামাজের নির্ধারিত সময় আসলে</div>
            </div>
          </div>
        `,
        quiz: {
          question: "পুরুষের সতর কতটুকু?",
          options: ["বুক থেকে হাঁটু পর্যন্ত", "নাভি থেকে হাঁটু পর্যন্ত", "শুধু গোপনাঙ্গ", "কোমর থেকে হাঁটু পর্যন্ত"],
          correct: 1,
          explanation: "পুরুষের সতর নাভি থেকে হাঁটু পর্যন্ত। নামাজে এটি অবশ্যই ঢেকে রাখতে হবে। নাভির নিচ এবং হাঁটু পর্যন্ত এই অংশ খোলা থাকলে নামাজ হবে না।"
        }
      },

      // ── পার্ট ২ ──
      {
        title: "পার্ট ২ — নামাজের ফরজ: যা বাদ পড়লে নামাজ বাতিল",
        funFact: "নামাজের ফরজ মাত্র ৭টি — কিন্তু এর মধ্যে একটিও বাদ পড়লে পুরো নামাজ আবার পড়তে হবে! কোনো ক্ষমা নেই, কোনো সিজদা সাহু নেই! 🚫",
        teaser: "পরের পার্টে — নামাজের ওয়াজিব: যা বাদ পড়লে সিজদা সাহু দিয়ে নামাজ রক্ষা করা যায়।",
        content: `
          <p>নামাজের <strong>ফরজ</strong> হলো সেই অপরিহার্য অংশগুলো যা বাদ পড়লে নামাজ হবে না — ইচ্ছায় হোক বা ভুলে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:16px;">🔴 নামাজের ৭টি ফরজ</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ১</span>
                <strong>তাকবিরে তাহরিমা</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">"আল্লাহু আকবার" বলে নামাজ শুরু করা — এটি নামাজের দরজা</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ২</span>
                <strong>কিয়াম (দাঁড়ানো)</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">ফরজ নামাজে দাঁড়িয়ে পড়া — অক্ষম হলে বসে বা শুয়ে পড়া যাবে</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ৩</span>
                <strong>কিরাত (কোরআন পড়া)</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">কমপক্ষে একটি আয়াত বা তিন ছোট আয়াত পরিমাণ পড়া</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ৪</span>
                <strong>রুকু</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">কোমর সমান্তরাল করে ঝুঁকে রুকু করা</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ৫</span>
                <strong>সিজদা (দুটি)</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">প্রতি রাকাতে দুটি সিজদা, ৭টি অঙ্গ মাটিতে লাগানো</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ৬</span>
                <strong>শেষ বৈঠক (তাশাহহুদের পরিমাণ)</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">শেষ রাকাতে তাশাহহুদ পড়া পর্যন্ত বসা</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.01));padding:16px;border-radius:12px;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
                <span style="background:#7c3aed;color:#fff;padding:4px 10px;border-radius:20px;font-size:13px;font-weight:700;">ফরজ ৭</span>
                <strong>সালামে নামাজ শেষ করা</strong>
              </div>
              <p style="font-size:14px;color:var(--text-muted);">"আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ" বলে নামাজ শেষ করা</p>
            </div>
          </div>
        `,
        quiz: {
          question: "নামাজের ফরজ কতটি?",
          options: ["৫টি", "৬টি", "৭টি", "৮টি"],
          correct: 2,
          explanation: "নামাজের ফরজ ৭টি: তাকবিরে তাহরিমা, কিয়াম, কিরাত, রুকু, সিজদা, শেষ বৈঠক এবং সালামে নামাজ শেষ করা। এর যেকোনো একটি বাদ পড়লে নামাজ বাতিল হয়ে যায়।"
        }
      },

      // ── পার্ট ৩ ──
      {
        title: "পার্ট ৩ — নামাজের ওয়াজিব: সিজদা সাহু দিয়ে যা রক্ষা হয়",
        funFact: "নামাজের ওয়াজিব ভুলে বাদ পড়লে সিজদা সাহু দিয়ে নামাজ রক্ষা পায়! কিন্তু ইচ্ছাকৃতভাবে বাদ দিলে নামাজ নষ্ট হয়ে যায়। ভুল আর ইচ্ছা — দুটো আলাদা! ⚠️",
        teaser: "পরের পার্টে — নামাজের সুন্নাত: যা না করলে নামাজ হয়, কিন্তু করলে নামাজ অনেক সুন্দর হয়।",
        content: `
          <p>নামাজের <strong>ওয়াজিব</strong> হলো সেই বিষয়গুলো যা ফরজের মতো গুরুত্বপূর্ণ, কিন্তু ভুলে বাদ পড়লে সিজদা সাহু দিলে নামাজ হয়ে যায়।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🟡 নামাজের গুরুত্বপূর্ণ ওয়াজিবসমূহ</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>১. সূরা ফাতিহা পড়া</strong> — প্রতি রাকাতে (ফরজ নামাজের হানাফি মতে ওয়াজিব)
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>২. প্রথম দুই রাকাতে সূরার সাথে অতিরিক্ত কিরাত</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>৩. রুকু ও সিজদায় তিনবার তাসবিহ পড়া</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>৪. রুকু থেকে সোজা হয়ে দাঁড়ানো (কওমা)</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>৫. দুই সিজদার মাঝে সোজা হয়ে বসা (জলসা)</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>৬. প্রথম বৈঠক (দুই রাকাতের পর বসা)</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>৭. উভয় বৈঠকে তাশাহহুদ পড়া</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:10px;border-left:3px solid #eab308;">
              <strong>৮. ফজর ও মাগরিব-এশায় ইমামের জোরে পড়া</strong>
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:16px;border-radius:12px;">
            <strong style="color:#7c3aed;">⚖️ মনে রাখুন:</strong>
            <p style="font-size:14px;margin-top:8px;">ওয়াজিব ভুলে ছুটলে → সিজদা সাহু দিলে নামাজ হয়<br>ওয়াজিব ইচ্ছাকৃত ছাড়লে → নামাজ আবার পড়তে হবে</p>
          </div>
        `,
        quiz: {
          question: "ওয়াজিব ভুলে বাদ পড়লে নামাজ রক্ষার উপায় কী?",
          options: ["নামাজ আবার পড়তে হবে", "সিজদা সাহু দিলে হবে", "দোয়া পড়লে হবে", "কিছু করতে হবে না"],
          correct: 1,
          explanation: "ওয়াজিব ভুলে বাদ পড়লে নামাজের শেষে সিজদা সাহু দিলে নামাজ হয়ে যায়। কিন্তু ইচ্ছাকৃতভাবে ওয়াজিব ছেড়ে দিলে নামাজ নষ্ট হয় এবং আবার পড়তে হবে।"
        }
      },

      // ── পার্ট ৪ ──
      {
        title: "পার্ট ৪ — নামাজের সুন্নাত: সৌন্দর্য ও পূর্ণতার পথ",
        funFact: "নামাজের সুন্নাতগুলো পালন করলে নামাজ আরও সুন্দর হয়। রাসুলুল্লাহ (সা.) বলেছেন: 'তোমরা আমাকে যেভাবে নামাজ পড়তে দেখেছ, সেভাবেই পড়ো।' সুন্নাত মানেই নবীজির পদ্ধতি! 💎",
        teaser: "পরের পার্টে — নামাজের মুস্তাহাব: এই ছোট্ট কাজগুলো করলে নামাজে আরও বেশি সওয়াব পাবেন।",
        content: `
          <p>নামাজের <strong>সুন্নাত</strong> হলো নবীজি (সা.) নিয়মিত যা করতেন। না করলে নামাজ হয়, কিন্তু সওয়াব কম হয় এবং নামাজ অসম্পূর্ণ থাকে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⭐ নামাজের গুরুত্বপূর্ণ সুন্নাতসমূহ</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ ছানা পড়া</strong><br>তাকবিরের পর সুবহানাকা পড়া
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ আউজুবিল্লাহ পড়া</strong><br>সূরা ফাতিহার আগে
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ বিসমিল্লাহ পড়া</strong><br>প্রতিটি সূরার আগে
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ আমিন বলা</strong><br>সূরা ফাতিহার পরে
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ রুকুতে হাত রাখা</strong><br>হাঁটুতে হাত দিয়ে রুকু
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ তাকবির বলা</strong><br>প্রতিটি অবস্থান পরিবর্তনে
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ সামিআল্লাহ বলা</strong><br>রুকু থেকে উঠে
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ দরুদ পড়া</strong><br>শেষ বৈঠকে তাশাহহুদের পরে
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ দোয়া মাসুরা পড়া</strong><br>দরুদের পর
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:13px;">
              <strong>✦ উভয় দিকে সালাম</strong><br>শুধু ডানে নয়, বামেও
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:16px;border-radius:12px;text-align:center;font-size:14px;font-weight:600;">
            💡 সুন্নাত ছেড়ে দিলে নামাজ হয়, কিন্তু নামাজ পূর্ণাঙ্গ হয় না। নবীজির মতো নামাজ পড়াই লক্ষ্য!
          </div>
        `,
        quiz: {
          question: "সূরা ফাতিহার পরে কী বলা সুন্নত?",
          options: ["সুবহানাল্লাহ", "আলহামদুলিল্লাহ", "আমিন", "আল্লাহু আকবার"],
          correct: 2,
          explanation: "সূরা ফাতিহা পড়ার পরে 'আমিন' বলা সুন্নত। রাসুলুল্লাহ (সা.) সূরা ফাতিহা পড়ার পর 'আমিন' বলতেন। জামায়াতে নামাজে ইমামের আমিনের সাথে মুক্তাদিরাও আমিন বলবে। (বুখারি: ৭৮০)"
        }
      },

      // ── পার্ট ৫ ──
      {
        title: "পার্ট ৫ — নামাজের মুস্তাহাব ও মাকরুহ",
        funFact: "নামাজে হাই তোলা মাকরুহ! রাসুলুল্লাহ (সা.) বলেছেন — হাই আসলে শয়তানের দিক থেকে, তাই সাধ্যমতো হাই চাপুন! নামাজে হাই আসলে মুখ ঢেকে নিন। 😮",
        teaser: "পরের পার্টে — নামাজ ভঙ্গের কারণ: কোন কাজগুলো নামাজ সম্পূর্ণ নষ্ট করে দেয়।",
        content: `
          <p><strong>মুস্তাহাব</strong> হলো করলে সওয়াব, না করলে গুনাহ নেই। <strong>মাকরুহ</strong> হলো করলে গুনাহ, না করলে সওয়াব।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">✨ নামাজের মুস্তাহাব</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ সুতরা রাখা (সামনে কিছু রাখা)
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ সিজদায় বেশি সময় থাকা ও বেশি দোয়া করা
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ রাতের নামাজে দীর্ঘ কিরাত পড়া
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ নামাজের আগে মিসওয়াক করা
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⚠️ নামাজে মাকরুহ কাজ</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ কাপড় বা শরীর নিয়ে খেলা করা
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ নামাজে এদিক-ওদিক তাকানো
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ আঙুল ফোটানো বা জোড়া লাগানো
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ হাই তোলা বা মুখ খোলা
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ নামাজে উঁচু স্থান বা মাটির উপর পড়া
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ প্রস্রাবের বেগ নিয়ে নামাজ পড়া
            </div>
          </div>
        `,
        quiz: {
          question: "নামাজে এদিক-ওদিক তাকানো কোন ধরনের কাজ?",
          options: ["ফরজ ছাড়া", "ওয়াজিব ছাড়া", "মাকরুহ", "নামাজ ভঙ্গকারী"],
          correct: 2,
          explanation: "নামাজে এদিক-ওদিক তাকানো মাকরুহ। রাসুলুল্লাহ (সা.) বলেছেন — এটি শয়তানের কাজ, শয়তান বান্দার নামাজ থেকে মনোযোগ সরিয়ে নেয়। (বুখারি: ৭৫১)"
        }
      },

      // ── পার্ট ৬ ──
      {
        title: "পার্ট ৬ — নামাজ ভঙ্গের কারণ",
        funFact: "নামাজের মধ্যে কথা বললে নামাজ নষ্ট হয়ে যায়! প্রাথমিক যুগে নামাজে কথা বলা জায়েয ছিল, পরে তা নিষিদ্ধ হয়। এটা ধীরে ধীরে নিষিদ্ধ হওয়া অন্যতম বিধান! 📜",
        teaser: "পরের পার্টে — সিজদা সাহু: ভুল হলে কীভাবে নামাজ রক্ষা করবেন এই সহজ পদ্ধতিতে।",
        content: `
          <p>কিছু কাজ করলে নামাজ সম্পূর্ণ নষ্ট হয়ে যায় এবং আবার শুরু থেকে পড়তে হয়।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🚫 নামাজ ভঙ্গের কারণসমূহ</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>১. কথা বলা</strong> — ইচ্ছায় বা অনিচ্ছায়, একটি শব্দও বললে নামাজ যায়
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>২. অজু নষ্ট হওয়া</strong> — নামাজের মধ্যে অজু ভেঙে গেলে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>৩. কিবলা থেকে বুক সরিয়ে নেওয়া</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>৪. খাওয়া বা পান করা</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>৫. অট্টহাসি দেওয়া</strong> — জোরে হাসলে নামাজ ও অজু উভয়ই ভাঙে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>৬. সতর খুলে যাওয়া</strong> — কাপড় সরে গিয়ে সতর প্রকাশ পেলে
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>৭. নামাজের মধ্যে অনেক বেশি নড়াচড়া করা</strong>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.02));padding:14px;border-radius:10px;border-left:4px solid #ef4444;">
              <strong>৮. ভুল পড়া যা অর্থ পরিবর্তন করে</strong>
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:12px;font-size:14px;">
            <strong style="color:#7c3aed;">💡 মনে রাখুন:</strong> নামাজের মধ্যে হাঁচি দিলে মনে মনে 'আলহামদুলিল্লাহ' বলুন — মুখে বললে নামাজ ভেঙে যাবে!
          </div>
        `,
        quiz: {
          question: "নামাজের মধ্যে জোরে হাসলে কী হয়?",
          options: ["শুধু নামাজ ভাঙে", "শুধু অজু ভাঙে", "নামাজ ও অজু উভয়ই ভাঙে", "কিছুই হয় না"],
          correct: 2,
          explanation: "নামাজের মধ্যে অট্টহাসি (জোরে হাসা) দিলে নামাজ এবং অজু উভয়ই নষ্ট হয়ে যায়। নামাজ পুনরায় পড়তে হবে এবং নতুন অজু করতে হবে।"
        }
      },

      // ── পার্ট ৭ ──
      {
        title: "পার্ট ৭ — সিজদা সাহু: ভুল হলে নামাজ রক্ষার পদ্ধতি",
        funFact: "সিজদা সাহু দেওয়ার পর নামাজ পূর্ণ হয়ে যায়! আল্লাহ কতটা দয়ালু দেখুন — ভুলের কারণে নামাজ নষ্ট হয় না, বরং সিজদা দিলেই ক্ষমা! ❤️",
        teaser: "পরের পার্টে — কাযা নামাজ ও মুসাফিরের নামাজ: নামাজ ছুটে গেলে কী করবেন।",
        content: `
          <p><strong>সিজদা সাহু</strong> হলো নামাজের মধ্যে কোনো ওয়াজিব ভুলে গেলে বা অতিরিক্ত কিছু হলে নামাজের শেষে দেওয়া দুটি বিশেষ সিজদা।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📌 কখন সিজদা সাহু দেবেন</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:14px;">✦ কোনো ওয়াজিব ভুলে বাদ পড়লে</div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:14px;">✦ ভুলে একটি রাকাত বেশি পড়লে</div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:14px;">✦ প্রথম বৈঠক ভুলে না করলে</div>
            <div style="background:var(--cream);padding:12px;border-radius:10px;font-size:14px;">✦ তাশাহহুদ ভুলে বাদ পড়লে</div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📋 সিজদা সাহুর পদ্ধতি</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">১</span>
              <div>নামাজের শেষ বৈঠকে তাশাহহুদ পড়ুন</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">২</span>
              <div>শুধু <strong>ডানে একটি সালাম</strong> ফেরান</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৩</span>
              <div><strong>দুটি সিজদা</strong> করুন (প্রতিটিতে তিনবার সুবহানা রাব্বিয়াল আ'লা)</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:14px;border-radius:10px;display:flex;gap:12px;align-items:center;">
              <span style="font-size:22px;font-weight:900;color:#7c3aed;">৪</span>
              <div>আবার বৈঠকে বসে তাশাহহুদ, দরুদ ও দোয়া পড়ে <strong>উভয় দিকে সালাম</strong> ফেরান</div>
            </div>
          </div>
        `,
        quiz: {
          question: "সিজদা সাহুর সময় কতটি সালাম দিয়ে সিজদায় যেতে হয়?",
          options: ["কোনো সালাম নেই", "শুধু ডানে একটি সালাম", "উভয় দিকে সালাম", "তিনটি সালাম"],
          correct: 1,
          explanation: "সিজদা সাহুর সময় তাশাহহুদ পড়ে শুধু ডানে একটি সালাম দিয়ে সিজদায় যেতে হয়। দুটি সিজদা করার পর আবার বসে তাশাহহুদ, দরুদ ও দোয়া পড়ে উভয় দিকে সালাম দিয়ে নামাজ শেষ করতে হয়।"
        }
      },

      // ── পার্ট ৮ ──
      {
        title: "পার্ট ৮ — কাযা নামাজ ও মুসাফিরের নামাজ",
        funFact: "ঘুমের কারণে বা ভুলে নামাজ ছুটে গেলে গুনাহ নেই! রাসুলুল্লাহ (সা.) নিজেও একবার সফরে ঘুমিয়ে ফজর মিস করেছিলেন এবং পরে কাযা পড়েছিলেন! ঘুমে নামাজ ছুটলে উঠে পড়ে নিন! 💤",
        teaser: "পরের পার্টে — নামাজের প্রকারভেদ: ফরজ, ওয়াজিব, সুন্নত ও নফল নামাজের পূর্ণ তালিকা।",
        content: `
          <p>কখনো কখনো নামাজ ছুটে যায় — ঘুমে, ভুলে বা জরুরি কারণে। তখন <strong>কাযা</strong> পড়তে হয়।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📌 কাযা নামাজের বিধান</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">😴</span>
              <div><strong>ঘুম বা ভুলে ছুটলে:</strong> স্মরণ হলেই বা জাগলেই পড়তে হবে। দেরি না করাই ভালো।</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">⚠️</span>
              <div><strong>ইচ্ছাকৃতভাবে ছাড়লে:</strong> গুনাহ হবে — তবে তওবা করে কাযা পড়তে হবে।</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">📋</span>
              <div><strong>কাযা পড়ার পদ্ধতি:</strong> মূল নামাজের মতোই পড়বেন, শুধু নিয়্যতে 'কাযা' বলবেন।</div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">✈️ মুসাফিরের নামাজ (কসর)</h4>
          <div style="background:linear-gradient(135deg,rgba(124,58,237,0.08),rgba(124,58,237,0.02));padding:18px;border-radius:14px;">
            <p style="font-size:14px;margin-bottom:10px;">৭৮ কিলোমিটারের বেশি দূরে সফরে গেলে <strong>কসর</strong> পড়া যায়:</p>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
              <div style="background:#fff;padding:12px;border-radius:10px;text-align:center;">
                <div style="font-weight:700;color:#7c3aed;">জোহর ৪ → ২</div>
                <div style="font-size:12px;color:var(--text-muted);">রাকাত অর্ধেক</div>
              </div>
              <div style="background:#fff;padding:12px;border-radius:10px;text-align:center;">
                <div style="font-weight:700;color:#7c3aed;">আসর ৪ → ২</div>
                <div style="font-size:12px;color:var(--text-muted);">রাকাত অর্ধেক</div>
              </div>
              <div style="background:#fff;padding:12px;border-radius:10px;text-align:center;">
                <div style="font-weight:700;color:#7c3aed;">এশা ৪ → ২</div>
                <div style="font-size:12px;color:var(--text-muted);">রাকাত অর্ধেক</div>
              </div>
              <div style="background:#fff;padding:12px;border-radius:10px;text-align:center;">
                <div style="font-weight:700;color:#22c55e;">ফজর ও মাগরিব</div>
                <div style="font-size:12px;color:var(--text-muted);">অপরিবর্তিত</div>
              </div>
            </div>
          </div>
        `,
        quiz: {
          question: "সফরে কতটুকু দূরত্বে কসর নামাজ পড়া যায়?",
          options: ["৪৮ কিলোমিটার", "৭৮ কিলোমিটার", "১০০ কিলোমিটার", "৫০ কিলোমিটার"],
          correct: 1,
          explanation: "৭৮ কিলোমিটার (হানাফি মতে ৩ দিনের পথ বা ৪৮ মাইল) বা তার বেশি দূরে সফরে গেলে কসর নামাজ পড়া যায়। এটি আল্লাহর বিশেষ অনুগ্রহ মুসাফিরদের জন্য।"
        }
      },

      // ── পার্ট ৯ ──
      {
        title: "পার্ট ৯ — নামাজে ইমাম-মুক্তাদি: জামায়াতের নিয়মকানুন",
        funFact: "জামায়াতে নামাজ পড়ার সময় ইমামের একটু আগে সিজদা দেওয়া হারাম! রাসুলুল্লাহ (সা.) বলেছেন — যে ব্যক্তি ইমামের আগে মাথা উঠায়, তার মাথা গাধার মাথা হওয়ার আশঙ্কা! 🐴",
        teaser: "শেষ পার্টে — নামাজের প্রকারভেদ: কোন নামাজ কত রাকাত, কোনটা ফরজ কোনটা সুন্নত।",
        content: `
          <p>জামায়াতে নামাজে ইমাম ও মুক্তাদির মধ্যে কিছু গুরুত্বপূর্ণ নিয়ম রয়েছে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">👥 মুক্তাদির করণীয়</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ ইমামের সাথে বা পরে তাকবির দেওয়া (কখনো আগে নয়)
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ সূরা ফাতিহা ও অতিরিক্ত কিরাত মুক্তাদিকে পড়তে হয় না (হানাফি মতে)
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:12px;border-radius:10px;border-left:3px solid #22c55e;font-size:14px;">
              ✓ ইমাম ভুল করলে পুরুষ 'সুবহানাল্লাহ', মহিলা তালি দেবেন
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⛔ মুক্তাদির যা করা যাবে না</h4>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ ইমামের আগে রুকু বা সিজদায় যাওয়া
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ ইমামের আগে সালাম ফেরানো
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:12px;border-radius:10px;border-left:3px solid #ef4444;font-size:14px;">
              ✗ ইমাম থেকে দুই রাকাত পিছিয়ে পড়া
            </div>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🏃 মাসবুকের (পিছিয়ে পড়া) নিয়ম</h4>
          <p style="font-size:14px;">যদি জামায়াতের মাঝে এসে শরিক হন — ইমামের সাথে বাকি নামাজ পড়ুন, সালামের পর নিজে বাকি রাকাতগুলো পূর্ণ করুন।</p>
        `,
        quiz: {
          question: "জামায়াতে ইমাম ভুল করলে পুরুষ মুক্তাদি কী করবেন?",
          options: ["চুপ থাকবেন", "'সুবহানাল্লাহ' বলবেন", "তালি দেবেন", "সালাম দিয়ে বের হবেন"],
          correct: 1,
          explanation: "জামায়াতে ইমাম ভুল করলে পুরুষ মুক্তাদি 'সুবহানাল্লাহ' বলে সতর্ক করবেন এবং মহিলা মুক্তাদি তালি দেবেন। (বুখারি: ১২০৩)"
        }
      },

      // ── পার্ট ১০ ──
      {
        title: "পার্ট ১০ — নামাজের প্রকারভেদ: কোনটা কত রাকাত",
        funFact: "একটু হিসাব করুন — দিনে ৫ ওয়াক্তের মোট ফরজ রাকাত ১৭টি। সুন্নত মিলিয়ে মোট ৪৮-৫২ রাকাত! প্রতিটি রাকাত মানেই আল্লাহর সামনে একবার পূর্ণ উপস্থিতি! 🕌",
        teaser: "🎉 অভিনন্দন! নামাজের মাসলা-মাসায়েলের পূর্ণ কোর্স শেষ! এখন আপনি নামাজের একজন সচেতন মুসল্লি!",
        content: `
          <p>নামাজের প্রকারভেদ জানলে কোন নামাজ কতটুকু গুরুত্বপূর্ণ তা বুঝতে পারবেন।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📊 ৫ ওয়াক্তের রাকাত সংখ্যা</h4>
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <thead>
                <tr style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(124,58,237,0.05));">
                  <th style="padding:10px;text-align:left;border-radius:8px 0 0 0;">নামাজ</th>
                  <th style="padding:10px;text-align:center;color:#7c3aed;">ফরজ</th>
                  <th style="padding:10px;text-align:center;color:var(--gold);">সুন্নত</th>
                  <th style="padding:10px;text-align:center;color:#22c55e;">নফল</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
                  <td style="padding:10px;font-weight:600;">ফজর</td>
                  <td style="padding:10px;text-align:center;">২</td>
                  <td style="padding:10px;text-align:center;">২ (আগে)</td>
                  <td style="padding:10px;text-align:center;">—</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(0,0,0,0.02);">
                  <td style="padding:10px;font-weight:600;">জোহর</td>
                  <td style="padding:10px;text-align:center;">৪</td>
                  <td style="padding:10px;text-align:center;">৪+২</td>
                  <td style="padding:10px;text-align:center;">২</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(0,0,0,0.06);">
                  <td style="padding:10px;font-weight:600;">আসর</td>
                  <td style="padding:10px;text-align:center;">৪</td>
                  <td style="padding:10px;text-align:center;">৪ (আগে)</td>
                  <td style="padding:10px;text-align:center;">—</td>
                </tr>
                <tr style="border-bottom:1px solid rgba(0,0,0,0.06);background:rgba(0,0,0,0.02);">
                  <td style="padding:10px;font-weight:600;">মাগরিব</td>
                  <td style="padding:10px;text-align:center;">৩</td>
                  <td style="padding:10px;text-align:center;">২ (পরে)</td>
                  <td style="padding:10px;text-align:center;">২</td>
                </tr>
                <tr>
                  <td style="padding:10px;font-weight:600;">এশা</td>
                  <td style="padding:10px;text-align:center;">৪</td>
                  <td style="padding:10px;text-align:center;">৪+২+৩(বিতর)</td>
                  <td style="padding:10px;text-align:center;">২</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🏆 এই কোর্স থেকে যা শিখলেন</h4>
          <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:16px;padding:24px;color:#fff;">
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;">
              <li style="display:flex;gap:10px;"><span>✅</span><span>নামাজের <strong>সব শর্তাবলী</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span><strong>ফরজ, ওয়াজিব, সুন্নত</strong> পার্থক্য বুঝলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span><strong>সিজদা সাহু</strong> দিতে শিখলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>কাযা ও <strong>মুসাফিরের নামাজ</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>পাঁচ ওয়াক্তের <strong>সম্পূর্ণ রাকাত</strong> জানলেন</span></li>
            </ul>
          </div>
        `,
        quiz: {
          question: "পাঁচ ওয়াক্তের ফরজ নামাজের মোট রাকাত কতটি?",
          options: ["১৫ রাকাত", "১৭ রাকাত", "১৯ রাকাত", "২০ রাকাত"],
          correct: 1,
          explanation: "পাঁচ ওয়াক্তের ফরজ নামাজের মোট রাকাত ১৭টি: ফজর ২ + জোহর ৪ + আসর ৪ + মাগরিব ৩ + এশা ৪ = ১৭ রাকাত।"
        }
      }

    ] // end chapters
  }, // end course 2

// ==========================================
  // COURSE 3 — সম্পূর্ণ নামাজ কোর্স (16 পার্ট)
  // ==========================================
  {
    id: 3,
    title: "নামাজের ভেতরের অর্থ ও সৌন্দর্য",
    icon: "🕌",
    duration: "১৩০ মিনিট",
    partsCount: 16,
    tagline: "নামাজে আপনি আল্লাহর সাথে কী কথা বলেন? সম্পূর্ণ রহস্য উন্মোচন!",
    color: "#1a5f9e",
    category: "pillars",
    chapters: [

      // ── পার্ট ১ ──
      {
        title: "পার্ট ১ — নামাজ কি শুধু একটা নিয়ম? নাকি এর পেছনে আরও কিছু আছে?",
        funFact: "গবেষণায় দেখা গেছে, দিনে ৫ বার নামাজ পড়া মানুষদের মানসিক চাপ (stress) ৪০% কম থাকে! বিজ্ঞান ও ইসলাম একমত! 🧠",
        teaser: "পরের পার্টে জানবেন — নামাজ শুরু হওয়ার আগেই কেন আপনাকে মানসিকভাবে প্রস্তুত হতে হয়, এবং 'নিয়্যত' আসলে কী!",
        content: `
          <p>অনেকেই নামাজ পড়েন — কিন্তু নামাজ <em>বোঝেন</em> খুব কম মানুষ। আপনি কি কখনো ভেবেছেন — প্রতিদিন ৫ বার কী বলছেন আল্লাহকে? কোন শব্দগুলো পড়ছেন, সেগুলোর মানে কী?</p>
          <br>
          <p>এই কোর্সটি সেই প্রশ্নের উত্তর দেওয়ার জন্য। নামাজের প্রতিটি অঙ্গভঙ্গি, প্রতিটি শব্দ, প্রতিটি নড়াচড়ার পেছনে একটি গভীর অর্থ আছে। আপনি যদি সেই অর্থগুলো বুঝতে পারেন, তাহলে নামাজ আর শুধু "কাজ" থাকবে না — এটি হবে আপনার দিনের সবচেয়ে প্রিয় মুহূর্ত।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:8px;">🌟 নামাজের ৩টি মূল লক্ষ্য</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:12px;">
            <li style="background:linear-gradient(135deg,rgba(26,95,158,0.06),rgba(26,95,158,0.02));padding:16px;border-radius:12px;border-left:4px solid var(--blue);">
              <strong>১. আল্লাহর সাথে সংযোগ (Connection)</strong><br>
              <span style="color:var(--text-muted);font-size:14px;">প্রতিটি নামাজ হলো আল্লাহর সাথে একটি ব্যক্তিগত সাক্ষাৎ। আপনি কথা বলছেন, আল্লাহ শুনছেন।</span>
            </li>
            <li style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;border-left:4px solid var(--gold);">
              <strong>২. মানসিক পুনর্জন্ম (Reset)</strong><br>
              <span style="color:var(--text-muted);font-size:14px;">নামাজ হলো দিনের মধ্যে ৫টি বিরতি — যেখানে আপনি সব ভুলে, সব চাপ ভুলে শুধু আল্লাহর কাছে আসেন।</span>
            </li>
            <li style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.02));padding:16px;border-radius:12px;border-left:4px solid #22c55e;">
              <strong>৩. জীবনের দিকনির্দেশনা (Guidance)</strong><br>
              <span style="color:var(--text-muted);font-size:14px;">সূরা ফাতিহায় প্রতিদিন ১৭ বার আমরা বলি — "আমাকে সরল পথ দেখাও।" এটি শুধু দোয়া নয়, এটি জীবনের নেভিগেশন।</span>
            </li>
          </ul>
          <br>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2;">إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ</p>
            <p><strong>অর্থ:</strong> "নিশ্চয়ই নামাজ অশ্লীলতা ও মন্দ কাজ থেকে বিরত রাখে।" — (সূরা আনকাবুত: ৪৫)</p>
          </blockquote>
          <br>
          <p>এই কোর্সে আমরা নামাজের শুরু থেকে শেষ পর্যন্ত প্রতিটি ধাপ একসাথে অনুভব করব। প্রস্তুত? তাহলে শুরু করি! 🚀</p>
        `,
        quiz: {
          question: "সূরা আনকাবুতের ৪৫ নং আয়াত অনুযায়ী নামাজ কী করে?",
          options: ["শুধু সওয়াব দেয়", "অশ্লীলতা ও মন্দ থেকে বিরত রাখে", "জান্নাত নিশ্চিত করে", "শুধু শান্তি দেয়"],
          correct: 1,
          explanation: "আল্লাহ বলেছেন, নামাজ মানুষকে অশ্লীলতা ও মন্দ কাজ থেকে বিরত রাখে। নামাজ শুধু ইবাদত নয়, এটি চরিত্র গঠনের সবচেয়ে শক্তিশালী মাধ্যম।"
        }
      },

      // ── পার্ট ২ ──
      {
        title: "পার্ট ২ — পবিত্রতা ও নিয়্যত: নামাজের আগের প্রস্তুতি",
        funFact: "অজুর সময় শরীরের যে অঙ্গগুলো ধোয়া হয়, হাদিস বলছে কিয়ামতের দিন সেগুলো নূরে ঝলমল করবে! আপনি আক্ষরিক অর্থেই 'আলোকিত' হচ্ছেন! ✨",
        teaser: "পরের পার্টে জানবেন — তাকবিরে তাহরিমা বলার মুহূর্তে আসলে কী হয়? কেন সেই মুহূর্তটি এত বিশেষ?",
        content: `
          <p>নামাজ শুরু হয় নামাজের অনেক আগে থেকেই। শরীর পরিষ্কার করা, মন প্রস্তুত করা — এই পুরো প্রক্রিয়াটাই নামাজের অংশ।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💧 অজু — শুধু পরিষ্কার নয়, পুনর্জন্ম!</h4>
          <p>রাসুলুল্লাহ (সা.) বলেছেন:</p>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--blue);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;font-style:italic;">
            "যে ব্যক্তি ভালোভাবে অজু করে, তার শরীর থেকে গুনাহ বের হয়ে যায় — এমনকি নখের নিচ থেকেও!" (সহিহ মুসলিম: ২৪৪)
          </blockquote>
          <p>অজু করার সময় কী হয় সেটা ভেবে দেখুন:</p>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;margin-top:12px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🙌</span>
              <div><strong>হাত ধোয়া:</strong> সারাদিন যা ধরেছেন, যা করেছেন — সব পরিষ্কার হচ্ছে</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">👄</span>
              <div><strong>কুলি করা:</strong> যা মুখ দিয়ে বলেছেন — ভালো বা মন্দ — সব ধুয়ে সাফ</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">👁️</span>
              <div><strong>মুখ ধোয়া:</strong> চোখ যা দেখেছে, সেসব স্মৃতি থেকে মুক্ত হওয়া</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🦶</span>
              <div><strong>পা ধোয়া:</strong> সারাদিন যেখানে গেছেন, সেই পথের ধুলো মুছে ফেলা</div>
            </li>
          </ul>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🎯 নিয়্যত — মনের দরজা খোলা</h4>
          <p>নিয়্যত মানে শুধু মুখে বলা নয়। নিয়্যত হলো মনের অবস্থা। নামাজ শুরু করার আগে এক মুহূর্ত থামুন এবং মনে মনে বলুন:</p>
          <blockquote style="background:rgba(212,168,67,0.08);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;text-align:center;">
            <p style="font-size:16px;font-weight:700;color:var(--blue-dark);">"আমি এখন এই নামাজে পুরোপুরি আল্লাহর জন্য, পুরোটা সময় শুধু তাঁকে দিচ্ছি।"</p>
          </blockquote>
          <p>এই একটি মুহূর্তের সিদ্ধান্ত আপনার পুরো নামাজটাকে বদলে দিতে পারে।</p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">💡 বিশেষ পরিস্থিতি</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🌊</span>
              <div><strong>পানি না থাকলে — তায়াম্মুম:</strong> পবিত্র মাটি বা ধুলায় হাত মেরে মুখ ও হাত মাসেহ করা। আল্লাহ সহজ করে দিয়েছেন — <em>"আল্লাহ তোমাদের কষ্ট দিতে চান না।"</em> (সূরা মায়িদা: ৬)</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🚿</span>
              <div><strong>গোসলের ফরজ:</strong> কিছু অবস্থায় শুধু অজু নয়, পুরো শরীর ধোয়া ফরজ হয়। এটি শরীর ও আত্মার গভীর পরিশুদ্ধি।</div>
            </li>
          </ul>
        `,
        quiz: {
          question: "অজু সম্পর্কে সহিহ মুসলিমের হাদিস কী বলে?",
          options: ["অজু শুধু পরিষ্কার করে", "অজুতে গুনাহ শরীর থেকে বের হয়ে যায়", "অজু ছাড়াও নামাজ হয়", "অজু শুধু ফরজ নামাজে লাগে"],
          correct: 1,
          explanation: "সহিহ মুসলিমের হাদিস বলছে — ভালোভাবে অজু করলে শরীর থেকে গুনাহ বের হয়ে যায়, এমনকি নখের নিচ থেকেও। অজু তাই শুধু বাহ্যিক নয়, আত্মিক পরিশুদ্ধিও।"
        }
      },

      // ── পার্ট ৩ ──
      {
        title: "পার্ট ৩ — তাকবিরে তাহরিমা: দুনিয়া বন্ধ, আল্লাহর দরবার খোলা!",
        funFact: "'আল্লাহু আকবার' — এই দুটো শব্দ বলার মুহূর্তে আপনি দুনিয়ার সব কিছু থেকে আইনত 'লগ আউট' হয়ে যান এবং সরাসরি আল্লাহর সাথে 'লগ ইন' হন! 📱",
        teaser: "পরের পার্টে — ছানার সেই শব্দগুলো যা নবীজি নিজে শিখিয়ে গেছেন, এবং সেগুলোর এমন অর্থ যা আপনাকে কাঁদিয়ে ফেলবে।",
        content: `
          <p>নামাজ শুরু হওয়ার মুহূর্তটি অবিশ্বাস্যরকম শক্তিশালী। দুই হাত কাঁধ পর্যন্ত উঠিয়ে বলা হয়:</p>
          <br>
          <blockquote style="background:linear-gradient(135deg,rgba(26,95,158,0.08),rgba(26,95,158,0.02));border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 14px 14px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:32px;color:var(--blue-dark);margin-bottom:10px;line-height:1.8;">اللَّهُ أَكْبَرُ</p>
            <p style="font-size:18px;font-weight:700;color:var(--gold);">আল্লাহু আকবার</p>
            <p style="color:var(--text);margin-top:8px;">"আল্লাহ সবচেয়ে বড়।"</p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🔐 তাহরিমার অর্থ কী?</h4>
          <p>'তাহরিমা' শব্দটি এসেছে 'হারাম' থেকে। এর মানে হলো — এই তাকবিরের পর সব দুনিয়াদারি কাজ <strong>হারাম</strong> বা নিষিদ্ধ। আপনি পুরোপুরি আল্লাহর জন্য বরাদ্দ হয়ে গেলেন।</p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🤔 কেন হাত উঠানো হয়?</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>আলেমরা বলেন:</strong> হাত উঠানো মানে — দুনিয়া ছেড়ে দিলাম। যেন পেছনে ফেলে দিচ্ছি — কাজ, চিন্তা, মোবাইল, সব কিছু।
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>মনোবিজ্ঞানগতভাবে:</strong> এই শারীরিক অঙ্গভঙ্গি মস্তিষ্ককে সংকেত দেয় — "এখন নতুন অবস্থা শুরু হচ্ছে।" এটি Transition Ritual — একটি অবস্থা থেকে অন্য অবস্থায় যাওয়ার সংকেত।
            </li>
          </ul>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🤲 হাত বাঁধার সুন্নত</h4>
          <p>তাকবিরের পর হাত বুকের উপর বাঁধা হয়। ডান হাত বাম হাতের উপর রেখে বুকে রাখুন।</p>
          <div style="background:var(--cream);padding:14px;border-radius:10px;margin-top:8px;font-size:14px;">
            <strong>কেন হাত বাঁধা হয়?</strong> — এটি বিনয় ও আদবের প্রকাশ। যেমন কোনো রাজার দরবারে গেলে হাত সামনে বা পেছনে বাঁধা হয় সম্মান দেখাতে। এখানে হাত বাঁধা মানে — "আমি আল্লাহর দরবারে বিনম্রভাবে দাঁড়িয়ে আছি।"
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💡 একটি কাজ করুন এখনই</h4>
          <p>পরবর্তী নামাজে যখন 'আল্লাহু আকবার' বলবেন, একটু থামুন। অনুভব করুন — আপনি এইমাত্র পৃথিবীর সব থেকে বড়, সব থেকে গুরুত্বপূর্ণ মিটিংয়ে প্রবেশ করেছেন।</p>
        `,
        quiz: {
          question: "'তাকবিরে তাহরিমা' কথাটির মানে কী?",
          options: ["নামাজের নিয়্যত", "নামাজ শেষ করার তাকবির", "নামাজ শুরুর তাকবির যা দুনিয়াদারি নিষিদ্ধ করে", "নামাজের মাঝের তাকবির"],
          correct: 2,
          explanation: "তাকবিরে তাহরিমা মানে — যে তাকবিরের মাধ্যমে নামাজ শুরু হয় এবং সব দুনিয়াদারি কাজ সেই মুহূর্তে হারাম (নিষিদ্ধ) হয়ে যায়।"
        }
      },

      // ── পার্ট ৪ ──
      {
        title: "পার্ট ৪ — ছানা: আল্লাহর সামনে প্রথম কথা",
        funFact: "আপনি জানেন কি — ছানা পড়ার সময় আপনি এমন শব্দ ব্যবহার করছেন যা স্বয়ং আল্লাহ নিজের জন্য সত্য বলে নিশ্চিত করেছেন! 😲",
        teaser: "পরের পার্টে — সূরা ফাতিহার সেই অলৌকিক রহস্য যা জানলে আপনি আর কখনো যান্ত্রিকভাবে নামাজ পড়তে পারবেন না।",
        content: `
          <p>তাকবিরের পর, নামাজের দরজায় প্রবেশ করে প্রথম কথা বলা হয় আল্লাহকে। এটাকে বলে <strong>ছানা</strong> বা স্তুতিবাক্য।</p>
          <br>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);text-align:right;margin-bottom:12px;line-height:2.2;">
              سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ
            </p>
            <p style="font-size:14px;line-height:1.9;color:var(--text);">
              <strong>"হে আল্লাহ!</strong> আমি আপনার সপ্রশংস পবিত্রতা বর্ণনা করছি। আপনার নাম বরকতময়। আপনার মর্যাদা সর্বোচ্চ। আর আপনি ছাড়া কোনো সত্যিকারের মাবুদ নেই।"
            </p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📖 প্রতিটি বাক্যের গভীরতা</h4>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.06),rgba(26,95,158,0.01));padding:16px;border-radius:12px;">
              <strong style="color:var(--blue);">সুবহানাকা আল্লাহুম্মা:</strong>
              <p style="margin-top:6px;font-size:14px;color:var(--text);">আপনি সব দোষ-ত্রুটির উপরে। আপনি নিখুঁত। আমি কৃতজ্ঞ যে এমন নিখুঁত সত্তার সাথে কথা বলার সুযোগ পাচ্ছি।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.01));padding:16px;border-radius:12px;">
              <strong style="color:var(--gold);">তাবারাকাস্মুকা:</strong>
              <p style="margin-top:6px;font-size:14px;color:var(--text);">আপনার নামে বরকত। শুধু নাম শুনলেই মন ভালো হয়, বুকে শান্তি আসে — এটাই বরকত।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:16px;border-radius:12px;">
              <strong style="color:#22c55e;">তাআলা জাদ্দুকা:</strong>
              <p style="margin-top:6px;font-size:14px;color:var(--text);">আপনার মহত্ত্ব অসীম। কোনো কিছুই আপনার সমকক্ষ নয় — না সম্পদ, না ক্ষমতা, না বুদ্ধিমত্তা।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:16px;border-radius:12px;">
              <strong style="color:#ef4444;">লা ইলাহা গাইরুকা:</strong>
              <p style="margin-top:6px;font-size:14px;color:var(--text);">আপনি ছাড়া আর কেউ আমার হৃদয়ে ভয় বা ভালোবাসার যোগ্য নয়। এই একটি বাক্য জীবনের সব সিদ্ধান্তকে সহজ করে দেয়।</p>
            </div>
          </div>
        `,
        quiz: {
          question: "ছানায় 'তাবারাকাস্মুকা' কথাটির অর্থ কী?",
          options: ["আপনি মহান", "আপনার নাম বরকতময়", "আপনি ছাড়া মাবুদ নেই", "আপনার মর্যাদা সর্বোচ্চ"],
          correct: 1,
          explanation: "'তাবারাকাস্মুকা' মানে — 'আপনার নাম বরকতময়।' আল্লাহর নাম নেওয়ায় যে প্রশান্তি ও কল্যাণ আসে, সেটাই বরকত।"
        }
      },

      // ── পার্ট ৫ ──
      {
        title: "পার্ট ৫ — সূরা ফাতিহা: আল্লাহর সাথে সরাসরি কথোপকথন",
        funFact: "সহিহ মুসলিমের হাদিস: সূরা ফাতিহার প্রতিটি আয়াতের পর আল্লাহ নিজে সরাসরি উত্তর দেন! ১৭ বার করে প্রতিদিন আল্লাহ আপনার সাথে কথা বলছেন! 🌟",
        teaser: "পরের পার্টে জানবেন — নামাজে সূরা ও কেরাত পড়ার সময় আসলে কী হচ্ছে এবং কেন ভিন্ন ভিন্ন সূরা পড়া উচিত।",
        content: `
          <p>সূরা ফাতিহা পুরো কোরআনের সার সংক্ষেপ। একে বলা হয় <strong>'উম্মুল কোরআন'</strong> — কোরআনের মা। প্রতিটি নামাজে এটি পড়া ফরজ।</p>
          <br>
          <p>কিন্তু আপনি কি জানেন — এটি শুধু পাঠ নয়, এটি একটি দুই-পক্ষীয় কথোপকথন?</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:16px;">🤝 আল্লাহ কী বলছেন? (সহিহ মুসলিম: ৩৯৫)</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.08),rgba(26,95,158,0.02));padding:16px;border-radius:12px;border:1px solid rgba(26,95,158,0.15);">
              <p style="font-family:var(--font-arabic);font-size:16px;text-align:right;color:var(--blue-dark);margin-bottom:8px;">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</p>
              <strong>আপনি বলেন:</strong> "সমস্ত প্রশংসা আল্লাহর..."<br>
              <strong style="color:var(--blue);">আল্লাহ বলেন:</strong> "আমার বান্দা আমার প্রশংসা করল ✨"
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;border:1px solid rgba(212,168,67,0.2);">
              <p style="font-family:var(--font-arabic);font-size:16px;text-align:right;color:var(--blue-dark);margin-bottom:8px;">الرَّحْمَٰنِ الرَّحِيمِ</p>
              <strong>আপনি বলেন:</strong> "পরম করুণাময়, অতি দয়ালু..."<br>
              <strong style="color:var(--gold);">আল্লাহ বলেন:</strong> "আমার বান্দা আমার গুণগান করল 💙"
            </div>
            <div style="background:linear-gradient(135deg,rgba(167,139,250,0.08),rgba(167,139,250,0.02));padding:16px;border-radius:12px;border:1px solid rgba(167,139,250,0.2);">
              <p style="font-family:var(--font-arabic);font-size:16px;text-align:right;color:var(--blue-dark);margin-bottom:8px;">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</p>
              <strong>আপনি বলেন:</strong> "আমরা শুধু আপনারই ইবাদত করি..."<br>
              <strong style="color:#a78bfa;">আল্লাহ বলেন:</strong> "এটি আমার ও বান্দার মধ্যে। বান্দা যা চাইবে পাবে! 🤲"
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));padding:16px;border-radius:12px;border:1px solid rgba(34,197,94,0.2);">
              <p style="font-family:var(--font-arabic);font-size:16px;text-align:right;color:var(--blue-dark);margin-bottom:8px;">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</p>
              <strong>আপনি বলেন:</strong> "আমাদের সরল পথ দেখাও..."<br>
              <strong style="color:#22c55e;">আল্লাহ বলেন:</strong> "এটি আমার বান্দার জন্য — সে যা চেয়েছে তাই পাবে! 🏆"
            </div>
          </div>
          <br>
          <p style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;font-weight:600;text-align:center;">
            প্রতিদিন ১৭ রাকাতে সূরা ফাতিহা পড়েন = প্রতিদিন ১৭ বার আল্লাহ আপনার সাথে কথা বলেন! 😱
          </p>
        `,
        quiz: {
          question: "সহিহ মুসলিমের হাদিস অনুযায়ী, সূরা ফাতিহার কোন আয়াতটি পড়লে আল্লাহ বলেন 'বান্দা যা চাইবে পাবে'?",
          options: ["আলহামদুলিল্লাহ", "মালিকি ইয়াওমিদ্দিন", "ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাস্তাইন", "সিরাতাল্লাজিনা আনআমতা আলাইহিম"],
          correct: 2,
          explanation: "সহিহ মুসলিমের হাদিস (৩৯৫) অনুযায়ী, 'ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাস্তাইন' পড়লে আল্লাহ বলেন — 'এটি আমার ও বান্দার মধ্যে, বান্দা যা চাইবে তাই পাবে।'"
        }
      },

      // ── পার্ট ৬ ──
      {
        title: "পার্ট ৬ — কেরাত: কোরআনের কণ্ঠস্বর হওয়ার সৌভাগ্য",
        funFact: "কোরআন তেলাওয়াতের সময় মস্তিষ্কের যে অংশ সক্রিয় হয়, সেটি মানসিক শান্তির জন্য দায়ী — নিউরোসায়েন্স বলছে তেলাওয়াত ব্রেনকে 'হিল' করে! 🧠💚",
        teaser: "পরের পার্টে — রুকুর সেই মুহূর্তে আপনি আসলে মহাবিশ্বের কোটি কোটি সৃষ্টির সাথে একত্রে সিজদা করছেন!",
        content: `
          <p>সূরা ফাতিহার পর অন্য সূরা বা আয়াত পড়া হয়। এই অংশকে বলা হয় <strong>কেরাত</strong>। এটি যেন নামাজের ভেতর একটি ছোট্ট কোরআনের দরস।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📚 কেরাত কেন পড়া হয়?</h4>
          <p>আল্লাহ বলেছেন:</p>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2;">وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا</p>
            <p>"এবং কোরআন তেলাওয়াত করো সুন্দরভাবে, ধীরে ধীরে।" — (সূরা মুজ্জাম্মিল: ৪)</p>
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🌟 প্রতিটি হরফে ১০ সওয়াব</h4>
          <p>রাসুলুল্লাহ (সা.) বলেছেন: <em>"যে ব্যক্তি কোরআনের একটি হরফ পড়বে, সে একটি নেকি পাবে। আর সেই নেকি দশগুণ হয়ে বাড়বে। আমি বলছি না 'আলিফ লাম মিম' একটি হরফ — বরং আলিফ একটি হরফ, লাম একটি হরফ, মিম একটি হরফ।"</em> (তিরমিযি)</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💡 কীভাবে কেরাতকে অর্থবহ করবেন?</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;">
              <span style="font-size:20px;">1️⃣</span>
              <div><strong>ছোট সূরাগুলোর অর্থ শিখুন:</strong> সূরা ইখলাস, ফালাক, নাস — এগুলোর বাংলা অর্থ একবার পড়ুন।</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;">
              <span style="font-size:20px;">2️⃣</span>
              <div><strong>ধীরে পড়ুন:</strong> তাড়াহুড়া করবেন না। প্রতিটি শব্দ স্পষ্টভাবে উচ্চারণ করুন।</div>
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;">
              <span style="font-size:20px;">3️⃣</span>
              <div><strong>কল্পনা করুন:</strong> আল্লাহ আপনার পাশে বসে শুনছেন — এই অনুভূতি নিয়ে পড়ুন।</div>
            </li>
          </ul>
        `,
        quiz: {
          question: "সূরা মুজ্জাম্মিলে আল্লাহ কোরআন পড়ার বিষয়ে কী নির্দেশ দিয়েছেন?",
          options: ["দ্রুত পড়তে বলেছেন", "মুখস্থ করতে বলেছেন", "সুন্দরভাবে ধীরে পড়তে বলেছেন", "উচ্চস্বরে পড়তে বলেছেন"],
          correct: 2,
          explanation: "সূরা মুজ্জাম্মিলের ৪ নং আয়াতে আল্লাহ বলেছেন — 'ওয়া রাত্তিলিল কোরআনা তারতিলা' — অর্থাৎ কোরআন তেলাওয়াত করো সুন্দরভাবে, ধীরে ধীরে।"
        }
      },

      // ── পার্ট ৭ ──
      {
        title: "পার্ট ৭ — রুকু: মহাবিশ্বের সাথে একসাথে নত হওয়া",
        funFact: "রুকুর সময় আপনার মেরুদণ্ড সোজা থাকে — বিজ্ঞানীরা বলছেন এই অবস্থান মেরুদণ্ডের ডিস্কের উপর চাপ কমায় এবং পিঠব্যথা প্রতিরোধ করে! 🦴",
        teaser: "পরের পার্টে — সিজদার সেই অবিশ্বাস্য বৈজ্ঞানিক ও আধ্যাত্মিক রহস্য যা জানলে আপনি প্রতিটি সিজদায় বেশি সময় দিতে চাইবেন।",
        content: `
          <p>সূরা-কেরাতের পর আসে রুকু। দুই হাত হাঁটুতে রেখে কোমর সমান্তরাল করে নত হওয়া। এই মুহূর্তে বলা হয়:</p>
          <br>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:28px;color:var(--blue-dark);margin-bottom:10px;line-height:1.8;">سُبْحَانَ رَبِّيَ الْعَظِيمِ</p>
            <p style="font-size:16px;font-weight:700;color:var(--gold);">সুবহানা রাব্বিয়াল আযীম</p>
            <p>"আমার মহান রবের পবিত্রতা বর্ণনা করছি।"</p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌌 রুকুর গভীরতা</h4>
          <p>আপনি কি জানেন — শুধু আপনিই নন, পুরো মহাবিশ্ব আল্লাহর সামনে নত?</p>
          <blockquote style="background:rgba(212,168,67,0.06);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;text-align:right;color:var(--blue-dark);margin-bottom:8px;">وَلِلَّهِ يَسْجُدُ مَن فِي السَّمَاوَاتِ وَالْأَرْضِ</p>
            <p>"আকাশ ও পৃথিবীতে যা কিছু আছে, সবই আল্লাহকে সিজদা করে।" — (সূরা রাদ: ১৫)</p>
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🔬 রুকুর বৈজ্ঞানিক উপকারিতা</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;text-align:center;">
              <span style="font-size:24px;">🦴</span>
              <p style="font-size:13px;margin-top:8px;">মেরুদণ্ডের চাপ কমায়</p>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;text-align:center;">
              <span style="font-size:24px;">🩸</span>
              <p style="font-size:13px;margin-top:8px;">মাথায় রক্ত সঞ্চালন বাড়ায়</p>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;text-align:center;">
              <span style="font-size:24px;">💪</span>
              <p style="font-size:13px;margin-top:8px;">পিঠের পেশি শক্তিশালী করে</p>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;text-align:center;">
              <span style="font-size:24px;">🧘</span>
              <p style="font-size:13px;margin-top:8px;">মানসিক বিনম্রতা তৈরি করে</p>
            </div>
          </div>
          <br>
          <p>রুকু থেকে উঠে বলা হয়: <strong>"সামিআল্লাহু লিমান হামিদাহ"</strong> — "আল্লাহ তার প্রশংসা শুনেছেন যে তাঁর প্রশংসা করে।" এবং এরপর বলা হয়: <strong>"রব্বানা ওয়া লাকাল হামদ"</strong> — "হে আমার রব, সমস্ত প্রশংসা আপনারই।"</p>
        `,
        quiz: {
          question: "রুকুতে উঠে কী বলা হয়?",
          options: ["আল্লাহু আকবার", "সামিআল্লাহু লিমান হামিদাহ", "সুবহানা রাব্বিয়াল আযীম", "রব্বিগফিরলি"],
          correct: 1,
          explanation: "রুকু থেকে উঠে বলা হয় 'সামিআল্লাহু লিমান হামিদাহ' — অর্থ: 'আল্লাহ তার প্রশংসা শুনেছেন যে তাঁর প্রশংসা করে।' এরপর 'রব্বানা ওয়া লাকাল হামদ' বলা হয়।"
        }
      },

      // ── পার্ট ৮ ──
      {
        title: "পার্ট ৮ — সিজদা: আল্লাহর সবচেয়ে কাছের মুহূর্ত",
        funFact: "সিজদায় থাকাকালীন আপনার মাথা হৃদপিণ্ডের নিচে থাকে — এই অবস্থায় মস্তিষ্কে স্বাভাবিকের চেয়ে বেশি রক্ত প্রবাহিত হয়, যা ক্লান্তি কমায় এবং ফোকাস বাড়ায়! 🧠✨",
        teaser: "পরের পার্টে — দুই সিজদার মাঝে যে দোয়া পড়া হয়, সেটি মাত্র কয়েক সেকেন্ডের — কিন্তু এর মধ্যে জীবনের সবচেয়ে বড় চাওয়াগুলো আছে!",
        content: `
          <p>রাসুলুল্লাহ (সা.) বলেছেন:</p>
          <blockquote style="background:linear-gradient(135deg,rgba(26,95,158,0.08),rgba(26,95,158,0.02));border-left:4px solid var(--blue);padding:20px;margin:16px 0;border-radius:0 14px 14px 0;font-style:italic;font-size:15px;">
            "বান্দা যখন সিজদায় থাকে, তখন সে তার রবের সবচেয়ে কাছাকাছি থাকে। সুতরাং তোমরা সিজদায় বেশি বেশি দোয়া করো।"
            <br><strong style="color:var(--text-muted);font-size:13px;">— সহিহ মুসলিম: ৪৮২</strong>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 সিজদায় কী বলা হয়?</h4>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:28px;color:var(--blue-dark);margin-bottom:10px;line-height:1.8;">سُبْحَانَ رَبِّيَ الْأَعْلَىٰ</p>
            <p style="font-size:16px;font-weight:700;color:var(--gold);">সুবহানা রাব্বিয়াল আ'লা</p>
            <p>"আমার সর্বোচ্চ রবের পবিত্রতা বর্ণনা করছি।"</p>
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🤔 সিজদার অর্থ কী?</h4>
          <p>সিজদা মানে — শরীরের সবচেয়ে সম্মানিত অংশ (মাথা) মাটিতে রাখা। এটি হলো চূড়ান্ত বিনম্রতার প্রকাশ। বলছেন: <em>"হে আল্লাহ, আমি আপনার সামনে একেবারে নত। আমার অহংকার নেই, আমার কিছুই নেই — শুধু আপনি আছেন।"</em></p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💡 সিজদায় দোয়ার টিপস</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              ✅ <strong>একটু বেশি সময় থাকুন</strong> — সুবহানা রাব্বিয়াল আ'লা পড়ার পর নিজের ভাষায় দোয়া করুন
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              ✅ <strong>মন থেকে চান</strong> — পরিবারের জন্য, নিজের জন্য, উম্মতের জন্য
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              ✅ <strong>অনুভব করুন</strong> — এই মুহূর্তে আল্লাহ সবচেয়ে কাছে। এটাই সেরা সুযোগ।
            </li>
          </ul>
          <br>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;text-align:center;font-weight:700;font-size:15px;">
            দিনে ৩৪টি ফরজ সিজদা = দিনে ৩৪ বার আল্লাহর সবচেয়ে কাছে যাওয়ার সুযোগ! 🤲
          </div>
        `,
        quiz: {
          question: "সিজদায় কোন দোয়া পড়া হয়?",
          options: ["সুবহানা রাব্বিয়াল আযীম", "সুবহানা রাব্বিয়াল আ'লা", "আল্লাহু আকবার", "সুবহানাকা আল্লাহুম্মা"],
          correct: 1,
          explanation: "সিজদায় 'সুবহানা রাব্বিয়াল আ'লা' পড়া হয় — অর্থ: 'আমার সর্বোচ্চ রবের পবিত্রতা বর্ণনা করছি।' রুকুতে পড়া হয় 'সুবহানা রাব্বিয়াল আযীম' (মহান রব)।"
        }
      },

      // ── পার্ট ৯ ──
      {
        title: "পার্ট ৯ — দুই সিজদার মাঝে: ক্ষমা চাওয়ার সোনালি মুহূর্ত",
        funFact: "দুই সিজদার মাঝে মাত্র কয়েক সেকেন্ড — কিন্তু এই দোয়ায় একসাথে ৭টি আলাদা চাওয়া আছে! ক্ষমা, রহম, হেদায়েত, ক্ষতিপূরণ, সুস্বাস্থ্য, রিজিক ও মর্যাদা — জীবনের সবকিছু! 🎯",
        teaser: "পরের পার্টে — তাশাহহুদ: মেরাজের রাতের সেই অবিশ্বাস্য মহাকাশীয় কথোপকথন যা আজও আমরা প্রতি নামাজে পড়ি।",
        content: `
          <p>দুই সিজদার মাঝে বসার সময় একটি ছোট্ট দোয়া পড়া হয় — যা অনেকে অজানায় পড়ে থাকেন, কিন্তু এর অর্থ জানলে অবাক হবেন।</p>
          <br>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;color:var(--blue-dark);text-align:right;margin-bottom:12px;line-height:2.2;">
              رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَاجْبُرْنِي وَعَافِنِي وَارْزُقْنِي وَارْفَعْنِي
            </p>
            <p style="font-size:14px;line-height:2;">
              <strong>"হে আমার রব!</strong><br>
              ১. আমাকে <strong>ক্ষমা করুন</strong> (اغْفِرْ لِي)<br>
              ২. আমার উপর <strong>রহম করুন</strong> (وَارْحَمْنِي)<br>
              ৩. আমাকে <strong>সঠিক পথ দেখান</strong> (وَاهْدِنِي)<br>
              ৪. আমার <strong>ক্ষতি পূরণ করুন</strong> (وَاجْبُرْنِي)<br>
              ৫. আমাকে <strong>সুস্বাস্থ্য দিন</strong> (وَعَافِنِي)<br>
              ৬. আমাকে <strong>রিজিক দিন</strong> (وَارْزُقْنِي)<br>
              ৭. আমার <strong>মর্যাদা উঁচু করুন</strong> (وَارْفَعْنِي)"
            </p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 সাতটি চাওয়া — জীবনের সম্পূর্ণ মানচিত্র</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>ক্ষমা (মাগফিরাত):</strong> গুনাহ থেকে মুক্তি — সবচেয়ে জরুরি চাওয়া
            </div>
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.06),rgba(26,95,158,0.01));padding:14px;border-radius:10px;border-left:3px solid var(--blue);">
              <strong>রহম:</strong> আল্লাহর দয়া — যা ছাড়া জীবন অন্ধকার
            </div>
            <div style="background:linear-gradient(135deg,rgba(167,139,250,0.06),rgba(167,139,250,0.01));padding:14px;border-radius:10px;border-left:3px solid #a78bfa;">
              <strong>হেদায়েত:</strong> সঠিক পথ — জীবনে সঠিক সিদ্ধান্ত নেওয়ার শক্তি
            </div>
            <div style="background:linear-gradient(135deg,rgba(251,146,60,0.06),rgba(251,146,60,0.01));padding:14px;border-radius:10px;border-left:3px solid #f97316;">
              <strong>জুবুর (ক্ষতিপূরণ):</strong> জীবনের যা ক্ষতি হয়েছে — সব পূরণ করুন
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:14px;border-radius:10px;border-left:3px solid #22c55e;">
              <strong>আফিয়া (সুস্বাস্থ্য):</strong> শরীর ও মন দুটোর সুস্থতা
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:14px;border-radius:10px;border-left:3px solid var(--gold);">
              <strong>রিজিক:</strong> হালাল উপার্জন — যা দিয়ে পরিবার চলে
            </div>
            <div style="background:linear-gradient(135deg,rgba(99,102,241,0.06),rgba(99,102,241,0.01));padding:14px;border-radius:10px;border-left:3px solid #6366f1;">
              <strong>রাফ (মর্যাদা):</strong> দুনিয়া ও আখেরাতে সম্মান ও উচ্চ মর্যাদা
            </div>
          </div>
          <br>
          <p style="background:var(--cream);padding:14px;border-radius:10px;text-align:center;font-weight:600;">
            💭 মাত্র ১০ সেকেন্ডের এই দোয়ায় আপনি দুনিয়া ও আখেরাতের সব গুরুত্বপূর্ণ ৭টি চাওয়া একসাথে চাইছেন!
          </p>
        `,
        quiz: {
          question: "দুই সিজদার মাঝে পড়া পূর্ণ দোয়ায় মোট কতটি চাওয়া আছে?",
          options: ["তিনটি", "পাঁচটি", "ছয়টি", "সাতটি"],
          correct: 3,
          explanation: "দুই সিজদার মাঝে পূর্ণ দোয়ায় ৭টি চাওয়া আছে: ক্ষমা, রহম, হেদায়েত, ক্ষতিপূরণ (জুবুর), সুস্বাস্থ্য (আফিয়া), রিজিক এবং মর্যাদা (রাফ)। এটি জীবনের সম্পূর্ণ মানচিত্র!"
        }
      },

      // ── পার্ট ১০ ──
      {
        title: "পার্ট ১০ — তাশাহহুদ: মেরাজের মহাকাশীয় কথোপকথন",
        funFact: "তাশাহহুদ হলো সেই কথোপকথনের হুবহু পুনরাবৃত্তি যা মেরাজের রাতে আল্লাহ, নবীজি ও ফেরেশতাদের মধ্যে হয়েছিল! প্রতি নামাজে আপনি মেরাজের কথোপকথনে অংশ নিচ্ছেন! 🌠",
        teaser: "পরের পার্টে — দরুদ শরিফ: কেন নবীজির উপর দরুদ পাঠালে আল্লাহ নিজে ১০ বার রহমত পাঠান?",
        content: `
          <p>নামাজের শেষাংশে বসে পড়া হয় <strong>তাশাহহুদ</strong> বা <strong>আত্তাহিয়্যাতু</strong>। এটি মেরাজের রাতের একটি ঐতিহাসিক কথোপকথনের স্মৃতি।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🚀 মেরাজের রাতের ঘটনা</h4>
          <p>মেরাজে নবীজি (সা.) আল্লাহর সামনে উপস্থিত হয়ে বললেন:</p>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2.2;">
              التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ
            </p>
            <p><strong>নবীজি (সা.):</strong> "সমস্ত মৌখিক, শারীরিক ও আর্থিক ইবাদত একমাত্র আল্লাহর জন্য।"</p>
          </blockquote>
          <blockquote style="background:rgba(212,168,67,0.06);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2.2;">
              السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
            </p>
            <p><strong>আল্লাহ (স্নেহভরে):</strong> "হে নবী, আপনার উপর শান্তি ও আল্লাহর রহমত ও বরকত বর্ষিত হোক।"</p>
          </blockquote>
          <blockquote style="background:rgba(34,197,94,0.06);border-left:4px solid #22c55e;padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2.2;">
              السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ
            </p>
            <p><strong>নবীজি (সা.):</strong> "শান্তি আমাদের উপর এবং আল্লাহর নেক বান্দাদের উপর।"<br>
            <em style="color:var(--text-muted);font-size:13px;">(নবীজি শুধু নিজের কথা ভাবেননি — পুরো উম্মতের জন্য দোয়া করলেন! ❤️)</em>
            </p>
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🌟 কালিমা শাহাদাত</h4>
          <p>তাশাহহুদের শেষে বলা হয়:</p>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:20px;color:var(--blue-dark);margin-bottom:8px;line-height:2;">
              أَشْهَدُ أَن لَّا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ
            </p>
            <p>"আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো মাবুদ নেই এবং মুহাম্মদ (সা.) তাঁর বান্দা ও রাসুল।"</p>
          </blockquote>
        `,
        quiz: {
          question: "তাশাহহুদ (আত্তাহিয়্যাতু) কোন বিশেষ ঘটনার স্মৃতি বহন করে?",
          options: ["হিজরতের রাত", "বদরের যুদ্ধ", "মেরাজের রাত", "লাইলাতুল কদর"],
          correct: 2,
          explanation: "তাশাহহুদ হলো মেরাজের রাতে আল্লাহ ও নবীজি (সা.)-এর মধ্যকার সেই মহাকাশীয় কথোপকথনের হুবহু পুনরাবৃত্তি। প্রতি নামাজে আমরা সেই ঐতিহাসিক মুহূর্তকে স্মরণ করি।"
        }
      },

      // ── পার্ট ১১ ──
      {
        title: "পার্ট ১১ — দরুদ ও দোয়া মাসুরা: নামাজের সোনালি সমাপ্তি",
        funFact: "একবার দরুদ পাঠালে আল্লাহ নবীজির উপর ১০ বার রহমত পাঠান, ১০টি গুনাহ মাফ হয় এবং ১০টি মর্যাদা বাড়ে! (তিরমিযি) — এর চেয়ে লাভজনক বিনিয়োগ কি আর আছে? 💎",
        teaser: "শেষ পার্টে — সালাম ফেরানো এবং নামাজ পরবর্তী জিকির: নামাজের পর করণীয় এবং কীভাবে নামাজের প্রভাব সারাদিন ধরে রাখবেন।",
        content: `
          <p>তাশাহহুদের পর দরুদ পড়া হয় — নবীজি (সা.) ও তাঁর পরিবারের উপর শান্তির দোয়া।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌹 দরুদ ইব্রাহিম</h4>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);text-align:right;margin-bottom:12px;line-height:2.5;">
              اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ
            </p>
            <p style="font-size:13.5px;line-height:1.9;color:var(--text);">
              "হে আল্লাহ, মুহাম্মদ ও তাঁর পরিবারের উপর সেইরূপ রহমত নাজিল করুন যেরূপ ইব্রাহিম ও তাঁর পরিবারের উপর নাজিল করেছিলেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।"
            </p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📊 দরুদের হিসাব</h4>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:20px;border-radius:14px;text-align:center;">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:12px;">
              <div style="background:#fff;padding:12px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <div style="font-size:24px;font-weight:900;color:var(--gold);">১০x</div>
                <div style="font-size:12px;color:var(--text-muted);">রহমত বর্ষণ</div>
              </div>
              <div style="background:#fff;padding:12px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <div style="font-size:24px;font-weight:900;color:#22c55e;">১০টি</div>
                <div style="font-size:12px;color:var(--text-muted);">গুনাহ মাফ</div>
              </div>
              <div style="background:#fff;padding:12px;border-radius:10px;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                <div style="font-size:24px;font-weight:900;color:var(--blue);">১০টি</div>
                <div style="font-size:12px;color:var(--text-muted);">মর্যাদা বৃদ্ধি</div>
              </div>
            </div>
            <p style="font-size:13px;color:var(--text-muted);">প্রতি একটি দরুদে এই তিনটি সওয়াব (তিরমিযি)</p>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🤲 দোয়া মাসুরা</h4>
          <p>দরুদের পর সালাম ফেরানোর আগে দোয়া মাসুরা পড়া হয়:</p>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2.2;">
              اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ
            </p>
            <p style="font-size:13.5px;line-height:1.9;">"হে আল্লাহ, আমি নিজের উপর অনেক জুলুম করেছি। আপনি ছাড়া কেউ গুনাহ মাফ করতে পারে না। আপনার কাছ থেকে ক্ষমা করুন এবং আমার উপর রহম করুন। আপনিই ক্ষমাশীল, দয়ালু।"</p>
          </blockquote>
          <p>এই দোয়াটি নবীজি (সা.) নিজে শিখিয়ে দিয়েছেন (বুখারি: ৮৩৪)। এখানে আমরা নিজের দোষ স্বীকার করে ক্ষমা চাইছি — এটাই ইসলামের সৌন্দর্য।</p>
        `,
        quiz: {
          question: "একবার দরুদ পাঠ করলে কতটি গুনাহ মাফ হয় বলে হাদিসে এসেছে?",
          options: ["৫টি", "৭টি", "১০টি", "১০০টি"],
          correct: 2,
          explanation: "তিরমিযির হাদিসে এসেছে — একবার দরুদ পাঠ করলে আল্লাহ নবীজির উপর ১০ বার রহমত পাঠান, ১০টি গুনাহ মাফ হয় এবং ১০টি মর্যাদা বাড়ে।"
        }
      },

      // ── পার্ট ১২ (চূড়ান্ত) ──
      {
        title: "পার্ট ১২ — সালাম ও নামাজ পরবর্তী জিকির: পূর্ণ নামাজের সমাপ্তি",
        funFact: "নামাজের পর 'সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার' — মাত্র ৩৩+৩৩+৩৪ = ১০০ বার বলুন। হাদিস বলছে এতে সমুদ্রের ফেনার সমান গুনাহ মাফ হয়! 🌊",
        teaser: "🎉 অভিনন্দন! আপনি এই সম্পূর্ণ কোর্সটি শেষ করেছেন! এখন নামাজ আর যান্ত্রিক মনে হবে না — প্রতিটি শব্দে অনুভব করবেন আল্লাহর সাথে সংযোগ!",
        content: `
          <p>নামাজের সমাপ্তি হয় <strong>সালামের</strong> মাধ্যমে। ডানে ও বামে মাথা ঘুরিয়ে বলা হয়:</p>
          <br>
          <blockquote style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));border-left:4px solid #22c55e;padding:20px;margin:16px 0;border-radius:0 14px 14px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:26px;color:var(--blue-dark);margin-bottom:10px;line-height:1.8;">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ</p>
            <p style="font-size:16px;font-weight:700;color:#22c55e;">আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ</p>
            <p style="color:var(--text);">"আপনাদের উপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক।"</p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🤔 সালামের তাৎপর্য কী?</h4>
          <p>সালামের মাধ্যমে আপনি পাশে থাকা ফেরেশতাদের এবং মুমিনদের শান্তি জানাচ্ছেন। নামাজের পর আপনি আল্লাহর কাছ থেকে ফিরে দুনিয়ায় আসছেন — কিন্তু সালামের মাধ্যমে আল্লাহর শান্তি নিয়ে আসছেন।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📿 নামাজ পরবর্তী জিকির</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.06),rgba(26,95,158,0.01));padding:16px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <strong>সুবহানাল্লাহ</strong>
                <p style="font-size:13px;color:var(--text-muted);margin-top:4px;">"আল্লাহ পবিত্র"</p>
              </div>
              <span style="font-size:24px;font-weight:900;color:var(--blue);">৩৩x</span>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <strong>আলহামদুলিল্লাহ</strong>
                <p style="font-size:13px;color:var(--text-muted);margin-top:4px;">"সব প্রশংসা আল্লাহর"</p>
              </div>
              <span style="font-size:24px;font-weight:900;color:var(--gold);">৩৩x</span>
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:16px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <strong>আল্লাহু আকবার</strong>
                <p style="font-size:13px;color:var(--text-muted);margin-top:4px;">"আল্লাহ সবচেয়ে বড়"</p>
              </div>
              <span style="font-size:24px;font-weight:900;color:#22c55e;">৩৪x</span>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🏆 এই কোর্স থেকে যা শিখলেন</h4>
          <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:16px;padding:24px;color:#fff;">
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;">
              <li style="display:flex;gap:10px;"><span>✅</span><span>নামাজের <strong>কেন</strong> বুঝলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>অজু ও নিয়্যতের <strong>গভীরতা</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>ছানা, ফাতিহা, কেরাতের <strong>অর্থ</strong> বুঝলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>রুকু-সিজদার <strong>বিজ্ঞান ও আধ্যাত্মিকতা</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>তাশাহহুদ-দরুদের <strong>ইতিহাস</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>সালাম ও জিকিরের <strong>মহত্ত্ব</strong> জানলেন</span></li>
            </ul>
            <div style="margin-top:20px;padding:16px;background:rgba(212,168,67,0.15);border-radius:10px;text-align:center;border:1px solid rgba(212,168,67,0.3);">
              <p style="color:var(--gold-light);font-weight:700;font-size:15px;">🌟 এখন থেকে প্রতিটি নামাজে অনুভব করুন —</p>
              <p style="color:rgba(255,255,255,0.85);margin-top:6px;font-size:14px;">আপনি শুধু নামাজ পড়ছেন না, আপনি আল্লাহর সাথে কথা বলছেন।</p>
            </div>
          </div>
        `,
        quiz: {
          question: "নামাজের পর 'সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার' মোট কতবার পড়তে হয়?",
          options: ["৯৯ বার", "১০০ বার", "৩৩ বার", "৭০ বার"],
          correct: 1,
          explanation: "নামাজের পর সুবহানাল্লাহ ৩৩ বার + আলহামদুলিল্লাহ ৩৩ বার + আল্লাহু আকবার ৩৪ বার = মোট ১০০ বার। হাদিসে আছে এতে সমুদ্রের ফেনার মতো গুনাহ মাফ হয়।"
        }
      },

      // ── পার্ট ১৩ ──
      {
        title: "পার্ট ১৩ — আযান ও ইকামত: নামাজের পবিত্র আহ্বান",
        funFact: "আযানের শব্দ 'হাইয়্যা আলাস সালাহ' — এই শব্দগুলো প্রতিদিন পৃথিবীতে কোনো না কোনো জায়গায় প্রতি মুহূর্তে বাজছে! পৃথিবী কখনো আযান-শূন্য নয়! 🌍",
        teaser: "পরের পার্টে — নামাজের ৫ ওয়াক্ত: কেন ঠিক এই সময়গুলো? এর পেছনে লুকিয়ে আছে অবিশ্বাস্য বৈজ্ঞানিক রহস্য!",
        content: `
          <p>নামাজ শুরু হওয়ার আগে একটি পবিত্র আহ্বান আসে — <strong>আযান</strong>। এটি শুধু সময় জানানোর ঘণ্টা নয়, এটি আল্লাহর দরবারে ডাক।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📢 আযানের ইতিহাস</h4>
          <p>আযান শুরু হয়েছিল মদিনায় হিজরতের পর। সাহাবি হজরত বিলাল (রা.) ছিলেন ইসলামের প্রথম মুআজ্জিন। তাঁর কণ্ঠস্বর এতই সুরেলা ছিল যে নবীজি (সা.) তাঁকে বেছে নিয়েছিলেন।</p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🔊 আযানের প্রতিটি বাক্যের অর্থ</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.08),rgba(26,95,158,0.02));padding:16px;border-radius:12px;">
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">اللَّهُ أَكْبَرُ</p>
              <strong>আল্লাহু আকবার (৪ বার):</strong> "আল্লাহ সবচেয়ে বড়" — দিনের শুরুতে মনে করিয়ে দেওয়া: সব কিছুর উপরে আল্লাহ।
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;">
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">أَشْهَدُ أَن لَّا إِلَهَ إِلَّا اللَّهُ</p>
              <strong>আশহাদু আল লা ইলাহা ইল্লাল্লাহ (২ বার):</strong> "আমি সাক্ষ্য দিচ্ছি আল্লাহ ছাড়া কোনো মাবুদ নেই।"
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:16px;border-radius:12px;">
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">حَيَّ عَلَى الصَّلَاةِ</p>
              <strong>হাইয়্যা আলাস সালাহ (২ বার):</strong> "নামাজের দিকে এসো!" — এটি একটি সরাসরি আমন্ত্রণ।
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:16px;border-radius:12px;">
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">حَيَّ عَلَى الْفَلَاحِ</p>
              <strong>হাইয়্যা আলাল ফালাহ (২ বার):</strong> "সফলতার দিকে এসো!" — নামাজ = সফলতার পথ।
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🤲 আযানের দোয়া</h4>
          <p>আযান শেষে এই দোয়া পড়ুন:</p>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;text-align:right;color:var(--blue-dark);margin-bottom:8px;line-height:2;">اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ</p>
            <p style="font-size:14px;">"হে আল্লাহ! এই পূর্ণ আহ্বান ও প্রতিষ্ঠিত নামাজের রব, মুহাম্মদ (সা.)-কে উসিলা ও ফযিলত দান করুন।"<br><em style="font-size:13px;color:var(--text-muted);">(এই দোয়া পড়লে কিয়ামতে নবীজির শাফায়াত পাওয়া যাবে — বুখারি: ৬১৪)</em></p>
          </blockquote>
          <br>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;text-align:center;font-weight:600;">
            📿 আযান শুনলে সব কথা থামিয়ে আযানের জবাব দিন — এটি সুন্নত এবং বরকতের কারণ!
          </div>
        `,
        quiz: {
          question: "ইসলামের প্রথম মুআজ্জিন কে ছিলেন?",
          options: ["হজরত আবু বকর (রা.)", "হজরত বিলাল (রা.)", "হজরত উমর (রা.)", "হজরত আলী (রা.)"],
          correct: 1,
          explanation: "ইসলামের প্রথম মুআজ্জিন ছিলেন হজরত বিলাল (রা.)। তিনি ছিলেন একজন হাবশি দাস যিনি ইসলাম গ্রহণ করে অনেক নির্যাতন সহ্য করেছিলেন। তাঁর সুরেলা কণ্ঠের কারণে নবীজি (সা.) তাঁকে প্রথম মুআজ্জিন মনোনীত করেন।"
        }
      },

      // ── পার্ট ১৪ ──
      {
        title: "পার্ট ১৪ — নামাজের ৫ ওয়াক্ত: সময়ের পেছনের অলৌকিক রহস্য",
        funFact: "ফজর নামাজের সময় সূর্যোদয়ের ঠিক আগে — বিজ্ঞান বলছে এই সময়ে বায়ুমণ্ডলে অক্সিজেনের পরিমাণ সবচেয়ে বেশি থাকে! আল্লাহ এই সময়ে ঘুম থেকে উঠতে বললেন কারণ তিনি আমাদের সবচেয়ে ভালো চান! 🌅",
        teaser: "পরের পার্টে — খুশু: নামাজে মনোযোগ কীভাবে ধরে রাখবেন? এই একটি জিনিস জানলে আপনার সব নামাজ বদলে যাবে!",
        content: `
          <p>আল্লাহ ৫ ওয়াক্ত নামাজ ঠিক এই সময়গুলোতেই কেন দিলেন? কোনো কারণ ছাড়া কি? — না! প্রতিটি সময়ের পেছনে গভীর জ্ঞান আছে।</p>
          <br>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(251,191,36,0.03));padding:18px;border-radius:14px;border-left:4px solid #fbbf24;">
              <h5 style="color:#d97706;margin-bottom:8px;">🌅 ফজর (ভোরবেলা)</h5>
              <p style="font-size:14px;">দিন শুরুর আগেই আল্লাহকে স্মরণ। বিজ্ঞান বলছে এই সময়ে শরীরে কর্টিসল হরমোন নিঃসৃত হয় — যা দিনের কর্মশক্তি তৈরি করে। ফজরে উঠলে পুরো দিনের এনার্জি ঠিক থাকে!</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:18px;border-radius:14px;border-left:4px solid #ef4444;">
              <h5 style="color:#dc2626;margin-bottom:8px;">☀️ জোহর (দুপুর)</h5>
              <p style="font-size:14px;">দিনের সবচেয়ে ব্যস্ত সময়ে একটি বিরতি। মানসিক চাপ সবচেয়ে বেশি এই সময়। জোহরের নামাজ সেই চাপ থেকে মুক্তির সুযোগ — একটি 'মিড-ডে রিসেট।'</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.06),rgba(234,179,8,0.01));padding:18px;border-radius:14px;border-left:4px solid #eab308;">
              <h5 style="color:#ca8a04;margin-bottom:8px;">🌤️ আসর (বিকেল)</h5>
              <p style="font-size:14px;">কোরআনে 'সালাতুল ওসতা' বা মধ্যবর্তী নামাজ — আল্লাহ বিশেষভাবে এটি রক্ষার নির্দেশ দিয়েছেন (সূরা বাকারা: ২৩৮)। দিনের শেষ ভাগে মনোযোগ নিয়ে আসে।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(249,115,22,0.06),rgba(249,115,22,0.01));padding:18px;border-radius:14px;border-left:4px solid #f97316;">
              <h5 style="color:#ea580c;margin-bottom:8px;">🌇 মাগরিব (সন্ধ্যা)</h5>
              <p style="font-size:14px;">সূর্যাস্তের পরপরই — দিন শেষের কৃতজ্ঞতা। সারাদিন যা পেলেন তার জন্য শোকর আদায়ের সময়। পরিবারের সাথে মিলে নামাজ পড়ার সেরা সময়।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(99,102,241,0.08),rgba(99,102,241,0.02));padding:18px;border-radius:14px;border-left:4px solid #6366f1;">
              <h5 style="color:#4f46e5;margin-bottom:8px;">🌙 এশা (রাতে)</h5>
              <p style="font-size:14px;">ঘুমানোর আগে দিনের সব হিসাব আল্লাহর সামনে পেশ করা। বিজ্ঞান বলছে রাতের শান্ত পরিবেশে ধ্যান-মনন মস্তিষ্কের গভীরে প্রভাব ফেলে।</p>
            </div>
          </div>
          <br>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:8px;line-height:2;">إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا</p>
            <p>"নিশ্চয়ই নামাজ মুমিনদের উপর নির্দিষ্ট সময়ে ফরজ।" — (সূরা নিসা: ১০৩)</p>
          </blockquote>
        `,
        quiz: {
          question: "কোরআনে 'সালাতুল ওসতা' বা মধ্যবর্তী নামাজ বলে কোনটিকে বোঝানো হয়েছে?",
          options: ["ফজর", "জোহর", "আসর", "মাগরিব"],
          correct: 2,
          explanation: "সূরা বাকারার ২৩৮ নং আয়াতে 'সালাতুল ওসতা' বা মধ্যবর্তী নামাজ বিশেষভাবে হেফাজত করার নির্দেশ দেওয়া হয়েছে। অধিকাংশ আলেমের মতে এটি আসর নামাজ।"
        }
      },

      // ── পার্ট ১৫ ──
      {
        title: "পার্ট ১৫ — খুশু: নামাজে মনোযোগের রহস্য",
        funFact: "কোরআনে আল্লাহ সফল মুমিনদের প্রথম পরিচয় দিয়েছেন: 'যারা নামাজে বিনয়ী (খাশিউন)' — সূরা মুমিনুনের একদম শুরুতেই! খুশু হলো নামাজের 'আত্মা'। 🕊️",
        teaser: "পরের পার্টে — জামায়াতে নামাজ: একা পড়লে ১ সওয়াব, জামায়াতে পড়লে ২৭ গুণ বেশি — কারণটা জানলে অবাক হবেন!",
        content: `
          <p>নামাজ পড়ছেন কিন্তু মন অন্যদিকে — এটা কি চেনা সমস্যা? এটাকে বলে খুশু (একাগ্রতা) না থাকা। আসুন জেনে নিই কীভাবে নামাজে মনোযোগ ধরে রাখবেন।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📖 খুশু কি আল্লাহর নির্দেশ?</h4>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2;">قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۞ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ</p>
            <p>"অবশ্যই সফল হয়েছে মুমিনরা — যারা নিজেদের নামাজে বিনয়ী।" — (সূরা মুমিনুন: ১-২)</p>
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">🧠 মন বিক্ষিপ্ত হয় কেন?</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>১. অর্থ না জানা:</strong> যে শব্দ বুঝি না, সেটাতে মন থাকে না। তাই কোর্সের আগের পার্টগুলো এত গুরুত্বপূর্ণ!
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>২. তাড়াহুড়া:</strong> দ্রুত পড়লে মস্তিষ্ক কন্টেন্ট প্রসেস করতে পারে না।
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>৩. ফোন ও বিক্ষেপ:</strong> নামাজের আগে ফোন রেখে দিন। ডিজিটাল বিক্ষেপ মস্তিষ্ককে অস্থির করে।
            </li>
          </ul>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">✅ খুশু বাড়ানোর ৫টি ব্যবহারিক উপায়</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.06),rgba(26,95,158,0.01));padding:16px;border-radius:12px;">
              <strong style="color:var(--blue);">১. নামাজের আগে ৩০ সেকেন্ড প্রস্তুতি নিন:</strong>
              <p style="font-size:14px;margin-top:6px;">চোখ বন্ধ করুন, গভীর শ্বাস নিন এবং মনে মনে বলুন — "আমি এখন আল্লাহর সামনে দাঁড়াচ্ছি।"</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;">
              <strong style="color:var(--gold);">২. সিজদায় তাকানোর দিকে দৃষ্টি রাখুন:</strong>
              <p style="font-size:14px;margin-top:6px;">সামনে না তাকিয়ে সিজদার জায়গায় দৃষ্টি রাখুন — এটি সুন্নত এবং মনোযোগ বাড়ায়।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:16px;border-radius:12px;">
              <strong style="color:#22c55e;">৩. ধীরে পড়ুন:</strong>
              <p style="font-size:14px;margin-top:6px;">প্রতিটি আয়াত পড়ার পর একটু থামুন। অর্থ অনুভব করুন। তাড়া নেই।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(167,139,250,0.06),rgba(167,139,250,0.01));padding:16px;border-radius:12px;">
              <strong style="color:#a78bfa;">৪. ভিন্ন ভিন্ন সূরা পড়ুন:</strong>
              <p style="font-size:14px;margin-top:6px;">একই সূরা বারবার পড়লে মন অভ্যস্ত হয়ে যায়। নতুন সূরা শিখুন এবং পড়ুন।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:16px;border-radius:12px;">
              <strong style="color:#ef4444;">৫. ভাবুন — এটাই শেষ নামাজ হতে পারে:</strong>
              <p style="font-size:14px;margin-top:6px;">রাসুলুল্লাহ (সা.) বলেছেন: "এমনভাবে নামাজ পড়ো যেন এটাই বিদায়ী নামাজ।" (ইবনে মাজা)</p>
            </div>
          </div>
        `,
        quiz: {
          question: "সূরা মুমিনুনে সফল মুমিনের প্রথম পরিচয় কোনটি?",
          options: ["যারা বেশি রোজা রাখে", "যারা নামাজে বিনয়ী (খাশিউন)", "যারা বেশি সদকা করে", "যারা হজ করে"],
          correct: 1,
          explanation: "সূরা মুমিনুনের শুরুতেই আল্লাহ বলেছেন — 'যারা নিজেদের নামাজে বিনয়ী (খাশিউন)' তারাই সফল। খুশু (একাগ্রতা) হলো নামাজের আত্মা — এটি ছাড়া নামাজ অসম্পূর্ণ।"
        }
      },

      // ── পার্ট ১৬ (নতুন চূড়ান্ত) ──
      {
        title: "পার্ট ১৬ — জামায়াতে নামাজ: ২৭ গুণ বেশি সওয়াব কেন?",
        funFact: "একা নামাজ পড়লে ১ সওয়াব, জামায়াতে পড়লে ২৭ গুণ বেশি! (বুখারি: ৬৪৫) — যদি ৩০ দিন জামায়াতে পড়েন তাহলে একা পড়ার তুলনায় ৮১০ সওয়াব বেশি পাবেন! 🕌",
        teaser: "🎉 অভিনন্দন! ১৬ পার্টের এই সম্পূর্ণ কোর্স শেষ করেছেন! আপনি এখন নামাজের প্রতিটি দিক গভীরভাবে জানেন!",
        content: `
          <p>রাসুলুল্লাহ (সা.) বলেছেন:</p>
          <blockquote style="background:linear-gradient(135deg,rgba(26,95,158,0.08),rgba(26,95,158,0.02));border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 14px 14px 0;font-style:italic;font-size:15px;">
            "জামায়াতের নামাজ একা পড়ার নামাজের চেয়ে ২৭ গুণ উত্তম।"
            <br><strong style="color:var(--text-muted);font-size:13px;">— সহিহ বুখারি: ৬৪৫, সহিহ মুসলিম: ৬৫০</strong>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🤔 কেন ২৭ গুণ বেশি?</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:var(--cream);padding:16px;border-radius:12px;">
              <strong>১. একতা ও ভ্রাতৃত্ব:</strong>
              <p style="font-size:14px;margin-top:6px;">সব মুসলিম কাঁধে কাঁধ মিলিয়ে দাঁড়ায় — ধনী-গরিব, শিক্ষিত-অশিক্ষিত সব একসমান। এই সাম্যের দৃশ্য আল্লাহর কাছে অত্যন্ত প্রিয়।</p>
            </div>
            <div style="background:var(--cream);padding:16px;border-radius:12px;">
              <strong>২. সুরক্ষা ও রক্ষা:</strong>
              <p style="font-size:14px;margin-top:6px;">নবীজি (সা.) বলেছেন — শয়তান একা মানুষকে সহজে বিপথে নিতে পারে, কিন্তু দলকে পারে না।</p>
            </div>
            <div style="background:var(--cream);padding:16px;border-radius:12px;">
              <strong>৩. ফেরেশতাদের উপস্থিতি:</strong>
              <p style="font-size:14px;margin-top:6px;">জামায়াতের নামাজে ফেরেশতারা উপস্থিত হয়ে আমিন বলেন এবং মুসল্লিদের জন্য দোয়া করেন।</p>
            </div>
          </div>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📏 কাতার সোজার গুরুত্ব</h4>
          <p>নবীজি (সা.) বলেছেন: <em>"তোমরা কাতার সোজা করো, কারণ কাতার সোজা করা নামাজের পরিপূর্ণতার অংশ।"</em> (বুখারি: ৭২৩)</p>
          <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;margin-top:12px;">
            <p style="font-size:14px;">🔹 কাঁধে কাঁধ মিলিয়ে দাঁড়ান<br>🔹 পায়ে পা লাগিয়ে দাঁড়ান<br>🔹 ফাঁকা জায়গা রাখবেন না — সেখানে শয়তান দাঁড়ায়!</p>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🏆 এই সম্পূর্ণ ১৬ পার্টের কোর্স থেকে যা শিখলেন</h4>
          <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:16px;padding:24px;color:#fff;">
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;">
              <li style="display:flex;gap:10px;"><span>✅</span><span>নামাজের <strong>কেন ও দর্শন</strong> বুঝলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>আযান থেকে সালাম পর্যন্ত প্রতিটি <strong>ধাপের অর্থ</strong> জানলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>প্রতিটি দোয়ার <strong>আরবি ও বাংলা অর্থ</strong> শিখলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>বিজ্ঞান ও আধ্যাত্মিকতার <strong>অদ্ভুত মিল</strong> দেখলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span><strong>খুশু ও মনোযোগ</strong> বাড়ানোর উপায় শিখলেন</span></li>
              <li style="display:flex;gap:10px;"><span>✅</span><span>জামায়াতের <strong>ফযিলত ও সামাজিক মূল্য</strong> বুঝলেন</span></li>
            </ul>
            <div style="margin-top:20px;padding:16px;background:rgba(212,168,67,0.15);border-radius:10px;text-align:center;border:1px solid rgba(212,168,67,0.3);">
              <p style="color:var(--gold-light);font-weight:700;font-size:15px;">🌟 এখন থেকে প্রতিটি নামাজে অনুভব করুন —</p>
              <p style="color:rgba(255,255,255,0.85);margin-top:6px;font-size:14px;">আপনি শুধু নামাজ পড়ছেন না, আপনি আল্লাহর সাথে কথা বলছেন — সম্পূর্ণ বুঝে, সম্পূর্ণ অনুভব করে।</p>
            </div>
          </div>
        `,
        quiz: {
          question: "সহিহ বুখারির হাদিস অনুযায়ী জামায়াতের নামাজ একা পড়ার চেয়ে কতগুণ উত্তম?",
          options: ["৭ গুণ", "১৭ গুণ", "২৭ গুণ", "৭০ গুণ"],
          correct: 2,
          explanation: "সহিহ বুখারি (৬৪৫) ও সহিহ মুসলিম (৬৫০)-এর হাদিসে এসেছে — জামায়াতের নামাজ একা পড়ার চেয়ে ২৭ গুণ উত্তম। তাই মসজিদে জামায়াতে নামাজ পড়া অত্যন্ত গুরুত্বপূর্ণ।"
        }
      }

    ] // end chapters
  }  , // end course 3

// ==========================================
  // COURSE 4 — নামাজ পরবর্তী আমল (8 পার্ট)
  // ==========================================
  {
    id: 4,
    title: "নামাজ পরবর্তী আমল",
    icon: "📿",
    duration: "৬০ মিনিট",
    partsCount: 8,
    tagline: "সালামের পর কী করবেন? নামাজের ফযিলত পুরো দিন ধরে রাখার রহস্য!",
    color: "#059669",
    category: "pillars",
    chapters: [

      // ── পার্ট ১ ──
      {
        title: "পার্ট ১ — সালামের পর প্রথম তিনটি কাজ",
        funFact: "সালামের পর 'আস্তাগফিরুল্লাহ' তিনবার বলা সুন্নত! ভাবুন — নামাজ পড়ার পরেই ক্ষমা চাইছেন, কারণ নামাজেও হয়তো ত্রুটি হয়েছে। এই বিনম্রতাই ইসলামের সৌন্দর্য! 💚",
        teaser: "পরের পার্টে — আয়াতুল কুরসি: নামাজের পরের সবচেয়ে ফযিলতপূর্ণ আমল যা পড়লে মৃত্যু পর্যন্ত জান্নাত নিশ্চিত!",
        content: `
          <p>নামাজ শেষ হওয়া মানে ইবাদত শেষ নয়! সালামের পরেও কিছু গুরুত্বপূর্ণ আমল আছে যা নামাজের সওয়াব বহুগুণ বাড়িয়ে দেয়।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 সালামের পর প্রথম তিনটি কাজ</h4>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:18px;border-radius:14px;border-left:4px solid #059669;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <span style="background:#059669;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700;">প্রথম</span>
                <strong>আস্তাগফিরুল্লাহ — ৩ বার</strong>
              </div>
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">أَسْتَغْفِرُ اللَّهَ</p>
              <p style="font-size:13px;color:var(--text-muted);">"আমি আল্লাহর কাছে ক্ষমা চাই।" — নামাজের ত্রুটির জন্য ক্ষমা চাওয়া</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:18px;border-radius:14px;border-left:4px solid #059669;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <span style="background:#059669;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700;">দ্বিতীয়</span>
                <strong>আল্লাহুম্মা আন্তাস সালাম</strong>
              </div>
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ</p>
              <p style="font-size:13px;color:var(--text-muted);">"হে আল্লাহ! আপনিই শান্তি, আপনার কাছ থেকেই শান্তি আসে। আপনি বরকতময়, হে মহিমান্বিত ও সম্মানিত সত্তা!" (মুসলিম: ৫৯১)</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:18px;border-radius:14px;border-left:4px solid #059669;">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <span style="background:#059669;color:#fff;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:700;">তৃতীয়</span>
                <strong>লা ইলাহা ইল্লাল্লাহ</strong>
              </div>
              <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:6px;">لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ</p>
              <p style="font-size:13px;color:var(--text-muted);">"আল্লাহ ছাড়া কোনো মাবুদ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁর, প্রশংসা তাঁর, তিনি সব কিছুর উপর সর্বশক্তিমান।" (মুসলিম: ৫৯৪)</p>
            </div>
          </div>
        `,
        quiz: {
          question: "সালামের পরে প্রথমে কী বলা সুন্নত?",
          options: ["সুবহানাল্লাহ", "আস্তাগফিরুল্লাহ", "আলহামদুলিল্লাহ", "আল্লাহু আকবার"],
          correct: 1,
          explanation: "সালামের পরে প্রথমে তিনবার 'আস্তাগফিরুল্লাহ' বলা সুন্নত। এরপর 'আল্লাহুম্মা আন্তাস সালাম...' পড়া। এই আমল নামাজের যেকোনো ত্রুটির জন্য ক্ষমা চাওয়ার সুযোগ। (সহিহ মুসলিম: ৫৯১)"
        }
      },

      // ── পার্ট ২ ──
      {
        title: "পার্ট ২ — আয়াতুল কুরসি: জান্নাতের চাবিকাঠি",
        funFact: "রাসুলুল্লাহ (সা.) বলেছেন — প্রতি ফরজ নামাজের পর আয়াতুল কুরসি পড়লে মৃত্যু ছাড়া আর কিছুই জান্নাতে প্রবেশে বাধা থাকবে না! প্রতিদিন ৫ বার জান্নাতের দরজা খুলে যাচ্ছে! 🌟",
        teaser: "পরের পার্টে — তাসবিহ ফাতেমি: হযরত ফাতেমা (রা.)-কে নবীজি নিজে শিখিয়ে দিয়েছিলেন এই অমূল্য আমল।",
        content: `
          <p>আয়াতুল কুরসি কোরআনের সবচেয়ে মহান আয়াত। প্রতি ফরজ নামাজের পর এটি পড়া অত্যন্ত ফযিলতপূর্ণ।</p>
          <br>
          <blockquote style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 14px 14px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;color:var(--blue-dark);text-align:right;margin-bottom:12px;line-height:2.5;">
              اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ
            </p>
            <p style="font-size:13px;line-height:1.9;">"আল্লাহ — তিনি ছাড়া কোনো মাবুদ নেই। তিনি চিরজীবী, সবকিছুর ধারক। তাঁকে তন্দ্রা ও নিদ্রা স্পর্শ করে না। আকাশ ও পৃথিবীর সব কিছু তাঁর..." (সূরা বাকারা: ২৫৫)</p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🏆 আয়াতুল কুরসির ফযিলত</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🌟</span>
              <div><strong>প্রতি ফরজ নামাজের পর পড়লে:</strong> মৃত্যুর পরেই জান্নাতে প্রবেশ নিশ্চিত (নাসায়ি: ৯৯২৮)</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🛡️</span>
              <div><strong>রাতে ঘুমানোর আগে পড়লে:</strong> সারারাত একজন ফেরেশতা পাহারা দেবেন</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">👑</span>
              <div><strong>কোরআনের সবচেয়ে মহান আয়াত:</strong> রাসুলুল্লাহ (সা.) নিজে এটি নিশ্চিত করেছেন</div>
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(5,150,105,0.1),rgba(5,150,105,0.03));padding:16px;border-radius:12px;text-align:center;font-weight:600;">
            📿 প্রতিদিন ৫ ওয়াক্ত নামাজের পর আয়াতুল কুরসি = ৫ বার জান্নাতের দরজা খোলা!
          </div>
        `,
        quiz: {
          question: "প্রতি ফরজ নামাজের পর আয়াতুল কুরসি পড়লে কী হয়?",
          options: ["১০০ সওয়াব পাওয়া যায়", "গুনাহ মাফ হয়", "মৃত্যু ছাড়া জান্নাতে বাধা থাকে না", "ফেরেশতারা সালাম দেয়"],
          correct: 2,
          explanation: "রাসুলুল্লাহ (সা.) বলেছেন — যে ব্যক্তি প্রতি ফরজ নামাজের পর আয়াতুল কুরসি পড়বে, তার জান্নাতে প্রবেশে আর কোনো বাধা থাকবে না, শুধু মৃত্যু ছাড়া। (নাসায়ি: ৯৯২৮, ইবনে হিব্বান)"
        }
      },

      // ── পার্ট ৩ ──
      {
        title: "পার্ট ৩ — তাসবিহ ফাতেমি: নবীজির মেয়ের আমল",
        funFact: "হযরত ফাতেমা (রা.) কাজের ভারে কষ্ট পাচ্ছিলেন। নবীজি (সা.) খাদেম চাইতে বললে বললেন — খাদেম না, এই তাসবিহ শিখিয়ে দিলেন যা তার চেয়ে বেশি উপকারী! 💎",
        teaser: "পরের পার্টে — সুবহানাল্লাহ ৩৩ বার: প্রতিটি শব্দের গভীর অর্থ যা অনুভব করলে জীবন বদলে যাবে।",
        content: `
          <p><strong>তাসবিহ ফাতেমি</strong> হলো নামাজের পর হযরত ফাতেমা (রা.)-কে নবীজি (সা.) যে বিশেষ তাসবিহ শিখিয়ে দিয়েছিলেন।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📖 ঘটনাটি কী?</h4>
          <div style="background:linear-gradient(135deg,rgba(5,150,105,0.06),rgba(5,150,105,0.01));padding:16px;border-radius:12px;margin-bottom:16px;">
            <p style="font-size:14px;line-height:1.8;">হযরত ফাতেমা (রা.) ঘরের কাজে অনেক কষ্ট পাচ্ছিলেন। তিনি নবীজি (সা.)-এর কাছে একজন খাদেম চাইতে গেলেন। নবীজি (সা.) বললেন — <em>"আমি কি তোমাকে এর চেয়ে উত্তম কিছু শিখিয়ে দেব?"</em> তারপর এই তাসবিহ শিখিয়ে দিলেন।</p>
          </div>
          <h4 style="color:var(--gold);margin-bottom:12px;">📿 তাসবিহ ফাতেমির আমল</h4>
          <div style="display:flex;flex-direction:column;gap:14px;">
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.08),rgba(26,95,158,0.02));padding:18px;border-radius:14px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);">سُبْحَانَ اللَّهِ</p>
                <strong>সুবহানাল্লাহ</strong>
                <p style="font-size:13px;color:var(--text-muted);">"আল্লাহ পবিত্র"</p>
              </div>
              <span style="font-size:32px;font-weight:900;color:var(--blue);">৩৩x</span>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:18px;border-radius:14px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);">الْحَمْدُ لِلَّهِ</p>
                <strong>আলহামদুলিল্লাহ</strong>
                <p style="font-size:13px;color:var(--text-muted);">"সব প্রশংসা আল্লাহর"</p>
              </div>
              <span style="font-size:32px;font-weight:900;color:var(--gold);">৩৩x</span>
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.02));padding:18px;border-radius:14px;display:flex;justify-content:space-between;align-items:center;">
              <div>
                <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);">اللَّهُ أَكْبَرُ</p>
                <strong>আল্লাহু আকবার</strong>
                <p style="font-size:13px;color:var(--text-muted);">"আল্লাহ সবচেয়ে বড়"</p>
              </div>
              <span style="font-size:32px;font-weight:900;color:#22c55e;">৩৪x</span>
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(5,150,105,0.1),rgba(5,150,105,0.03));padding:14px;border-radius:12px;text-align:center;">
            <strong>মোট: ৩৩+৩৩+৩৪ = ১০০ বার</strong><br>
            <p style="font-size:13px;margin-top:4px;color:var(--text-muted);">হাদিস বলছে: সমুদ্রের ফেনার সমান গুনাহ মাফ হয়! (মুসলিম: ৫৯৭)</p>
          </div>
        `,
        quiz: {
          question: "তাসবিহ ফাতেমিতে আল্লাহু আকবার কতবার বলতে হয়?",
          options: ["৩৩ বার", "৩৪ বার", "৩৫ বার", "৪০ বার"],
          correct: 1,
          explanation: "তাসবিহ ফাতেমিতে সুবহানাল্লাহ ৩৩ বার + আলহামদুলিল্লাহ ৩৩ বার + আল্লাহু আকবার ৩৪ বার = মোট ১০০ বার। আল্লাহু আকবার একটু বেশি (৩৪ বার) যাতে মোট ১০০ হয়।"
        }
      },

      // ── পার্ট ৪ ──
      {
        title: "পার্ট ৪ — সুবহানাল্লাহ: পবিত্রতার ঘোষণা",
        funFact: "সুবহানাল্লাহ বললে কী হয়? রাসুলুল্লাহ (সা.) বলেছেন — একবার 'সুবহানাল্লাহ' বললে জান্নাতে একটি খেজুর গাছ লাগানো হয়! ৩৩ বার বললে জান্নাতে ৩৩টি গাছ! 🌴",
        teaser: "পরের পার্টে — আলহামদুলিল্লাহ: কৃতজ্ঞতার এই শব্দটি কীভাবে মিজানের পাল্লা ভারী করে।",
        content: `
          <p><strong>সুবহানাল্লাহ</strong> মানে — আল্লাহ সব দোষ-ত্রুটির ঊর্ধ্বে, তিনি নিখুঁত ও পবিত্র।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💎 সুবহানাল্লাহর ফযিলত</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">🌴</span>
              <div><strong>একবার বললে:</strong> জান্নাতে একটি খেজুর গাছ লাগানো হয় (তিরমিযি: ৩৪৬৫)</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">⚖️</span>
              <div><strong>মিজানে ভারী:</strong> "সুবহানাল্লাহি ওয়া বিহামদিহি" — মিজানের পাল্লা ভারী করে (বুখারি: ৬৪০৬)</div>
            </div>
            <div style="background:var(--cream);padding:14px;border-radius:10px;display:flex;gap:12px;align-items:flex-start;">
              <span style="font-size:20px;">💫</span>
              <div><strong>আল্লাহর পছন্দ:</strong> "সুবহানাল্লাহি ওয়া বিহামদিহি, সুবহানাল্লাহিল আযীম" — আল্লাহর কাছে সবচেয়ে পছন্দের কালিমা (বুখারি: ৬৪০৬)</div>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">💡 কীভাবে পড়বেন — অনুভব করে</h4>
          <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:16px;border-radius:12px;">
            <p style="font-size:14px;line-height:1.9;">সুবহানাল্লাহ বলার সময় মনে করুন —<br>
            <em>"হে আল্লাহ! আপনি যত বিপদ দিয়েছেন, সব হিকমতে। আপনার কোনো সিদ্ধান্ত ভুল নয়। আপনি সব দোষ-ত্রুটির ঊর্ধ্বে।"</em></p>
          </div>
          <br>
          <blockquote style="background:rgba(5,150,105,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:20px;color:var(--blue-dark);">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ</p>
            <p style="font-size:13px;margin-top:6px;">এই দুটি কালিমা জিহ্বায় হালকা কিন্তু মিজানে ভারী এবং আল্লাহর কাছে পছন্দের।</p>
          </blockquote>
        `,
        quiz: {
          question: "রাসুলুল্লাহ (সা.) অনুযায়ী একবার 'সুবহানাল্লাহ' বললে জান্নাতে কী হয়?",
          options: ["একটি প্রাসাদ তৈরি হয়", "একটি খেজুর গাছ লাগানো হয়", "একটি নদী প্রবাহিত হয়", "একটি পাথর রাখা হয়"],
          correct: 1,
          explanation: "রাসুলুল্লাহ (সা.) বলেছেন — একবার 'সুবহানাল্লাহ' বললে জান্নাতে একটি খেজুর গাছ লাগানো হয়। (তিরমিযি: ৩৪৬৫, হাসান সনদ)"
        }
      },

      // ── পার্ট ৫ ──
      {
        title: "পার্ট ৫ — আলহামদুলিল্লাহ: কৃতজ্ঞতার শক্তি",
        funFact: "'আলহামদুলিল্লাহ' মিজানের পাল্লা পূর্ণ করে দেয়! রাসুলুল্লাহ (সা.) বলেছেন — সুবহানাল্লাহ আকাশ ও পৃথিবীর মাঝ পূর্ণ করে, আর আলহামদুলিল্লাহ মিজান পূর্ণ করে! ⚖️",
        teaser: "পরের পার্টে — আল্লাহু আকবার ও লা ইলাহা: দিনের সবচেয়ে শক্তিশালী কালিমার রহস্য।",
        content: `
          <p><strong>আলহামদুলিল্লাহ</strong> মানে — সব প্রশংসা আল্লাহর। এটি কৃতজ্ঞতার সর্বোচ্চ প্রকাশ।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 আলহামদুলিল্লাহর অসাধারণ ফযিলত</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;border-left:4px solid var(--gold);">
              <strong>মিজান পূর্ণকারী:</strong>
              <p style="font-size:14px;margin-top:6px;">রাসুলুল্লাহ (সা.) বলেছেন: "আলহামদুলিল্লাহ মিজানকে পূর্ণ করে দেয়।" (মুসলিম: ২২৩)</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;border-left:4px solid var(--gold);">
              <strong>দোয়ার সেরা শুরু:</strong>
              <p style="font-size:14px;margin-top:6px;">আল্লাহ বলেছেন — যে আমার প্রশংসা করে, আমি তাকে আরও বেশি দেব। (সূরা ইব্রাহিম: ৭)</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:16px;border-radius:12px;border-left:4px solid var(--gold);">
              <strong>সব ইবাদতের সার:</strong>
              <p style="font-size:14px;margin-top:6px;">কোরআনের প্রথম আয়াতই আলহামদুলিল্লাহ — এটি পুরো দ্বীনের সারাংশ।</p>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🧠 আলহামদুলিল্লাহ — একটি মানসিক ওষুধ</h4>
          <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:16px;border-radius:12px;">
            <p style="font-size:14px;line-height:1.9;">মনোবিজ্ঞান বলছে — কৃতজ্ঞতা মানসিক সুস্থতার সবচেয়ে বড় চাবিকাঠি। আল্লাহর প্রতি কৃতজ্ঞতা প্রকাশ (আলহামদুলিল্লাহ) মানসিক অবসাদ ও দুশ্চিন্তা কমায়।</p>
          </div>
          <br>
          <blockquote style="background:rgba(5,150,105,0.05);border-left:4px solid var(--gold);padding:16px;margin:16px 0;border-radius:0 10px 10px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;text-align:right;color:var(--blue-dark);margin-bottom:8px;line-height:2;">لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ</p>
            <p>"যদি তোমরা কৃতজ্ঞতা প্রকাশ করো, আমি অবশ্যই তোমাদের আরও বেশি দেব।" — (সূরা ইব্রাহিম: ৭)</p>
          </blockquote>
        `,
        quiz: {
          question: "সহিহ মুসলিমের হাদিস অনুযায়ী আলহামদুলিল্লাহ কী পূর্ণ করে?",
          options: ["আকাশ ও পৃথিবীর মাঝ", "মিজানের পাল্লা", "জান্নাতের ঘর", "বুকের প্রশস্ততা"],
          correct: 1,
          explanation: "সহিহ মুসলিম (২২৩)-এর হাদিসে রাসুলুল্লাহ (সা.) বলেছেন — 'সুবহানাল্লাহ' ও 'আলহামদুলিল্লাহ' আকাশ ও পৃথিবীর মাঝ পূর্ণ করে। আর 'আলহামদুলিল্লাহ' মিজানের পাল্লা পূর্ণ করে।"
        }
      },

      // ── পার্ট ৬ ──
      {
        title: "পার্ট ৬ — আল্লাহু আকবার ও শেষের কালিমা",
        funFact: "তাসবিহর শেষে লা ইলাহা ইল্লাল্লাহ ওয়াহদাহু লা শারিকালাহু বললে ১০টি গুনাহ মাফ ও ১০টি সওয়াব লেখা হয়! শুধু ৩০ সেকেন্ডে এই বিশাল পুরস্কার! 💰",
        teaser: "পরের পার্টে — ফজর ও আসরের বিশেষ আমল: এই দুই নামাজের পরের আমল অন্য সময়ের চেয়ে আলাদা ও বিশেষ।",
        content: `
          <p><strong>আল্লাহু আকবার</strong> মানে — আল্লাহ সবচেয়ে বড়। তাসবিহর শেষে এই কালিমা পড়ে একটি বিশেষ দোয়া পড়া সুন্নত।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📿 তাসবিহ ফাতেমির পরে</h4>
          <blockquote style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 14px 14px 0;">
            <p style="font-family:var(--font-arabic);font-size:16px;color:var(--blue-dark);text-align:right;margin-bottom:10px;line-height:2.2;">
              لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ
            </p>
            <p style="font-size:14px;line-height:1.9;">"আল্লাহ ছাড়া কোনো মাবুদ নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁর, প্রশংসা তাঁর, তিনি সব কিছুর উপর সর্বশক্তিমান।"</p>
          </blockquote>
          <h4 style="color:var(--gold);margin-bottom:12px;">💰 এই কালিমার পুরস্কার</h4>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.1),rgba(5,150,105,0.03));padding:14px;border-radius:12px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:#059669;">১০টি</div>
              <div style="font-size:12px;color:var(--text-muted);">সওয়াব লেখা হয়</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:12px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:#ef4444;">১০টি</div>
              <div style="font-size:12px;color:var(--text-muted);">গুনাহ মিটে যায়</div>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(212,168,67,0.03));padding:14px;border-radius:12px;text-align:center;">
              <div style="font-size:22px;font-weight:900;color:var(--gold);">সুরক্ষা</div>
              <div style="font-size:12px;color:var(--text-muted);">শয়তান থেকে</div>
            </div>
          </div>
          <br>
          <div style="background:linear-gradient(135deg,rgba(5,150,105,0.1),rgba(5,150,105,0.03));padding:14px;border-radius:12px;text-align:center;font-size:13px;">
            <em>(বুখারি: ৬৪০৪, মুসলিম: ৫৯৭)</em><br>
            <strong>প্রতিদিন ৫ ওয়াক্তের পর মোট: ৫০টি সওয়াব + ৫০টি গুনাহ মাফ!</strong>
          </div>
        `,
        quiz: {
          question: "তাসবিহ ফাতেমির পর লা ইলাহা ইল্লাল্লাহ... পড়লে কতটি গুনাহ মাফ হয়?",
          options: ["৫টি", "৭টি", "১০টি", "১০০টি"],
          correct: 2,
          explanation: "সহিহ বুখারি ও মুসলিমের হাদিসে আছে — তাসবিহর পর 'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু...' পড়লে ১০টি সওয়াব লেখা হয়, ১০টি গুনাহ মিটে যায় এবং সন্ধ্যা পর্যন্ত শয়তান থেকে সুরক্ষিত থাকে।"
        }
      },

      // ── পার্ট ৭ ──
      {
        title: "পার্ট ৭ — ফজর ও আসরের পর বিশেষ আমল",
        funFact: "ফজরের নামাজের পর সূর্যোদয় পর্যন্ত বসে থেকে কিছু আমল করলে একটি পূর্ণ হজ ও ওমরার সমান সওয়াব পাওয়া যায়! প্রতিদিন এই সুযোগ আসছে! 🕋",
        teaser: "শেষ পার্টে — নামাজের পর দোয়া: কীভাবে চাইলে আল্লাহ সবচেয়ে বেশি কবুল করেন।",
        content: `
          <p>ফজর ও আসর নামাজের পর কিছু বিশেষ আমল আছে যার ফযিলত অন্য সময়ের চেয়ে আলাদা।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌅 ফজরের পর বিশেষ আমল</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(251,191,36,0.03));padding:16px;border-radius:14px;border-left:4px solid #fbbf24;">
              <strong style="color:#d97706;">১. সূর্যোদয় পর্যন্ত বসে থাকা</strong>
              <p style="font-size:14px;margin-top:6px;">ফজরের পর জিকির করে সূর্যোদয় পর্যন্ত বসলে তারপর দুই রাকাত পড়লে — একটি পূর্ণ হজ ও ওমরার সওয়াব! (তিরমিযি: ৫৮৬)</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(251,191,36,0.03));padding:16px;border-radius:14px;border-left:4px solid #fbbf24;">
              <strong style="color:#d97706;">২. সূরা ইখলাস, ফালাক ও নাস — ৩ বার করে</strong>
              <p style="font-size:14px;margin-top:6px;">ফজর ও মাগরিবের পর তিনটি কুল পড়লে দিনরাত সুরক্ষিত থাকেন। (আবু দাউদ: ৫০৮২)</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(251,191,36,0.1),rgba(251,191,36,0.03));padding:16px;border-radius:14px;border-left:4px solid #fbbf24;">
              <strong style="color:#d97706;">৩. সকালের দোয়া (সাইয়িদুল ইস্তিগফার)</strong>
              <p style="font-size:14px;margin-top:6px;">এই দোয়া পড়ে ঈমানের সাথে মারা গেলে সরাসরি জান্নাত। (বুখারি: ৬৩০৬)</p>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌆 আসরের পর বিশেষ আমল</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:12px;border-left:4px solid #eab308;">
              <strong>১. সন্ধ্যার জিকির ও দোয়া পড়া</strong>
              <p style="font-size:14px;margin-top:4px;">দিনের শেষে আল্লাহর স্মরণে থাকা সওয়াবে ভরপুর।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(234,179,8,0.02));padding:14px;border-radius:12px;border-left:4px solid #eab308;">
              <strong>২. সূরা ইখলাস, ফালাক ও নাস — ৩ বার</strong>
            </div>
          </div>
        `,
        quiz: {
          question: "ফজরের পর কী করলে একটি পূর্ণ হজ ও ওমরার সওয়াব পাওয়া যায়?",
          options: ["১০০ বার দরুদ পড়া", "সূর্যোদয় পর্যন্ত জিকিরে বসে থেকে দুই রাকাত পড়া", "সূরা ইয়াসিন পড়া", "৩৩ বার আস্তাগফিরুল্লাহ বলা"],
          correct: 1,
          explanation: "তিরমিযির হাদিস (৫৮৬) অনুযায়ী — ফজরের পর জামায়াতে নামাজ পড়ে আল্লাহর জিকিরে বসে থেকে সূর্যোদয়ের পর দুই রাকাত পড়লে একটি পূর্ণ হজ ও ওমরার সমান সওয়াব।"
        }
      },

      // ── পার্ট ৮ (চূড়ান্ত) ──
      {
        title: "পার্ট ৮ — নামাজের পর দোয়া: কীভাবে চাইলে কবুল হয়",
        funFact: "নামাজের পর দোয়া কবুলের সেরা সময়গুলোর একটি! রাসুলুল্লাহ (সা.) বলেছেন — ফরজ নামাজের পর দোয়া করো। সাহাবিরা জিজ্ঞেস করলেন কোন দোয়া সবচেয়ে ভালো? তিনি বললেন — মনের কথা বলো! 🤲",
        teaser: "🎉 অভিনন্দন! নামাজ পরবর্তী আমলের পূর্ণ কোর্স শেষ! এখন প্রতিটি নামাজের পর সঠিক আমল করুন!",
        content: `
          <p>নামাজের পর দোয়া করা বিশেষ গুরুত্বপূর্ণ। এই সময়ে দোয়া কবুলের সম্ভাবনা সবচেয়ে বেশি।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🤲 কীভাবে দোয়া করবেন</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:16px;border-radius:12px;">
              <strong style="color:#059669;">১. হাত তুলুন:</strong>
              <p style="font-size:14px;margin-top:6px;">দুই হাত বুক বরাবর তুলুন। হাতের তালু আকাশমুখী রাখুন।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:16px;border-radius:12px;">
              <strong style="color:#059669;">২. আল্লাহর প্রশংসা দিয়ে শুরু করুন:</strong>
              <p style="font-size:14px;margin-top:6px;">আলহামদুলিল্লাহ বলুন, দরুদ পাঠ করুন।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:16px;border-radius:12px;">
              <strong style="color:#059669;">৩. মনের কথা বলুন — নিজের ভাষায়:</strong>
              <p style="font-size:14px;margin-top:6px;">বাংলায় বলুন, আরবিতে বলুন — আল্লাহ সব ভাষা বোঝেন।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(5,150,105,0.08),rgba(5,150,105,0.02));padding:16px;border-radius:12px;">
              <strong style="color:#059669;">৪. পরিবার ও উম্মতের জন্য দোয়া করুন:</strong>
              <p style="font-size:14px;margin-top:6px;">শুধু নিজের জন্য নয়, অন্যের জন্য দোয়া করলে ফেরেশতারাও আমিন বলেন।</p>
            </div>
          </div>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🏆 সম্পূর্ণ নামাজ পরবর্তী আমলের রুটিন</h4>
          <div style="background:linear-gradient(135deg,#0a1628,#0a2e1a);border-radius:16px;padding:24px;color:#fff;">
            <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:8px;font-size:14px;">
              <li style="display:flex;gap:10px;"><span>1️⃣</span><span>আস্তাগফিরুল্লাহ — ৩ বার</span></li>
              <li style="display:flex;gap:10px;"><span>2️⃣</span><span>আল্লাহুম্মা আন্তাস সালাম...</span></li>
              <li style="display:flex;gap:10px;"><span>3️⃣</span><span>আয়াতুল কুরসি</span></li>
              <li style="display:flex;gap:10px;"><span>4️⃣</span><span>সুবহানাল্লাহ — ৩৩ বার</span></li>
              <li style="display:flex;gap:10px;"><span>5️⃣</span><span>আলহামদুলিল্লাহ — ৩৩ বার</span></li>
              <li style="display:flex;gap:10px;"><span>6️⃣</span><span>আল্লাহু আকবার — ৩৪ বার</span></li>
              <li style="display:flex;gap:10px;"><span>7️⃣</span><span>লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু...</span></li>
              <li style="display:flex;gap:10px;"><span>8️⃣</span><span>ব্যক্তিগত দোয়া</span></li>
            </ul>
            <div style="margin-top:16px;padding:14px;background:rgba(5,150,105,0.2);border-radius:10px;text-align:center;border:1px solid rgba(5,150,105,0.4);">
              <p style="color:#6ee7b7;font-weight:700;">⏱️ মোট সময়: মাত্র ৫-৭ মিনিট — প্রতি নামাজের পর!</p>
            </div>
          </div>
        `,
        quiz: {
          question: "নামাজের পর দোয়ায় কোনটি দিয়ে শুরু করা উত্তম?",
          options: ["সরাসরি নিজের চাওয়া বলা", "আল্লাহর প্রশংসা ও দরুদ দিয়ে শুরু করা", "চুপ থাকা", "শুধু আরবিতে বলা"],
          correct: 1,
          explanation: "দোয়া শুরু করতে হয় আল্লাহর প্রশংসা (আলহামদুলিল্লাহ) এবং নবীজির উপর দরুদ পাঠ দিয়ে। রাসুলুল্লাহ (সা.) বলেছেন — যখন কেউ দোয়া করতে চায়, সে যেন প্রথমে আল্লাহর প্রশংসা করে, তারপর নবীর উপর দরুদ পাঠ করে, তারপর চাওয়া শুরু করে। (তিরমিযি: ৩৪৭৭)"
        }
      }

    ] // end chapters
  }  , // end course 4

// ==========================================
  // COURSE 5 — নফল নামাজের সম্পূর্ণ গাইড (10 পার্ট)
  // ==========================================
  {
    id: 5,
    title: "নফল নামাজের সম্পূর্ণ গাইড",
    icon: "🌙",
    duration: "১০০ মিনিট",
    partsCount: 10,
    tagline: "ফরজের পরেও আল্লাহর ভালোবাসা পাওয়ার রাস্তা — নফল নামাজের সম্পূর্ণ গাইড!",
    color: "#1e3a5f",
    category: "pillars",
    chapters: [

      // ── পার্ট ১ ──
      {
        title: "পার্ট ১ — নফল নামাজ কী? কেন পড়বেন?",
        funFact: "হাদিসে আছে — কিয়ামতের দিন প্রথম হিসাব হবে নামাজের। ফরজে কমতি থাকলে নফল দিয়ে পূরণ করা হবে! নফল নামাজ আক্ষরিক অর্থেই আপনার 'ব্যাকআপ' সিস্টেম! 🛡️",
        teaser: "পরের পার্টে — রাতের শেষ প্রহরের সেই অলৌকিক নামাজ যা আল্লাহ নিজে কুরআনে বারবার উল্লেখ করেছেন — তাহাজ্জুদ!",
        content: `
          <p>নফল নামাজ হলো আল্লাহ তাআলার নৈকট্য ও ভালোবাসা অর্জনের অত্যন্ত সহজ ও নিশ্চিত মাধ্যম। ফরজ নামাজের ঘাটতি পূরণ এবং আখেরাতে উচ্চ মর্যাদা লাভের জন্য নফলের গুরুত্ব অপরিসীম।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 নফলের মর্যাদা ও গুরুত্ব</h4>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="background:linear-gradient(135deg,rgba(30,58,95,0.08),rgba(30,58,95,0.02));padding:16px;border-radius:12px;border-left:4px solid #1e3a5f;">
              <strong>১. আল্লাহর ভালোবাসা লাভ:</strong>
              <p style="font-size:14px;margin-top:6px;">হাদিসে কুদসিতে এসেছে, বান্দা নফল ইবাদতের মাধ্যমে আল্লাহর এতটাই কাছাকাছি চলে আসে যে আল্লাহ তাকে ভালোবাসতে শুরু করেন।</p>
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:16px;border-radius:12px;border-left:4px solid var(--gold);">
              <strong>২. ফরজের ঘাটতি পূরণ:</strong>
              <p style="font-size:14px;margin-top:6px;">কিয়ামতের দিন যদি কারো ফরজ নামাজে কোনো ঘাটতি থাকে, তবে আল্লাহ বলবেন: "দেখো তো, আমার বান্দার কোনো নফল নামাজ আছে কি না?" তখন নফল দিয়ে তা পূরণ করা হবে।</p>
            </div>
          </div>
        `,
        quiz: {
          question: "কিয়ামতের দিন ফরজ নামাজের ঘাটতি কী দিয়ে পূরণ করা হবে?",
          options: ["দান-সদকা দিয়ে", "নফল নামাজ দিয়ে", "রোজা দিয়ে", "হজ দিয়ে"],
          correct: 1,
          explanation: "হাদিস অনুযায়ী, কিয়ামতের দিন কারো ফরজ নামাজে কমতি বা ত্রুটি দেখা দিলে নফল নামাজ দিয়ে তা পূরণ করা হবে। (তিরমিযি: ৪১৩)"
        }
      },

      // ── পার্ট ২ ──
      {
        title: "পার্ট ২ — তাহাজ্জুদ: রাতের অন্ধকারে আল্লাহর ডাক",
        funFact: "তাহাজ্জুদ নামাজের সময় চাওয়া দুআ সরাসরি কবুল হয়। আলেমগণ বলেন — 'তাহাজ্জুদের দুআ হলো এমন তীরের মতো যা লক্ষ্যভ্রষ্ট হয় না!' 🏹",
        teaser: "পরের পার্টে — সূর্যোদয়ের পর প্রথম সোনালি নামাজ যা পড়লে একটি পূর্ণ হজ ও উমরার সওয়াব মেলে — ইশরাক!",
        content: `
          <p><strong>তাহাজ্জুদ</strong> নামাজ হলো নফল নামাজগুলোর মধ্যে সবচেয়ে মর্যাদাপূর্ণ। এশার নামাজের পর রাতে ঘুমিয়ে উঠে শেষ রাতে এই নামাজ পড়তে হয়।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 শেষ রাতের অলৌকিক মুহূর্ত</h4>
          <p>রাসুলুল্লাহ (সা.) বলেছেন: <em>"আমাদের প্রতিপালক প্রতি রাতের শেষ তৃতীয়াংশে দুনিয়ার আকাশে নেমে আসেন এবং বলেন — কে আমাকে ডাকবে যে আমি সাড়া দেব? কে আমার কাছে চাইবে যে আমি তাকে দেব? কে ক্ষমা চাইবে যে আমি তাকে ক্ষমা করব?"</em> (সহিহ বুখারি: ১১৪৫)</p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 তাহাজ্জুদ নামাজের নিয়ম</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>রাকাত সংখ্যা:</strong> সাধারণত ২ থেকে ১২ রাকাত পর্যন্ত পড়া যায়। ২ রাকাত করে করে নামাজ শেষ করতে হয়।
            </li>
            <li style="background:var(--cream);padding:14px;border-radius:10px;">
              <strong>সময়:</strong> রাতের শেষ তৃতীয়াংশ (সাহরির আগের সময়) সবচেয়ে উত্তম।
            </li>
          </ul>
        `,
        quiz: {
          question: "তাহাজ্জুদ নামাজ পড়ার সবচেয়ে উত্তম সময় কোনটি?",
          options: ["এশার নামাজের ঠিক পরপরই", "মধ্যরাতে ঘুমানোর আগে", "রাতের শেষ তৃতীয়াংশে", "ফজরের নামাজের পর"],
          correct: 2,
          explanation: "তাহাজ্জুদ নামাজ এশার পর ঘুমিয়ে উঠে রাতের শেষ তৃতীয়াংশে পড়া সবচেয়ে উত্তম ও ফজিলতপূর্ণ। (বুখারি: ১১৪৫)"
        }
      },

      // ── পার্ট ৩ ──
      {
        title: "পার্ট ৩ — সালাতুল ইশরাক: সূর্যোদয়ের সোনালি নামাজ",
        funFact: "মাত্র দুই রাকাত ইশরাক নামাজ পড়লে একটি সম্পূর্ণ কবুল হজ এবং উমরার সমান সওয়াব পাওয়া যায়! ঘরে বসেই এই বিশাল সওয়াবের সুযোগ! 🕋",
        teaser: "পরের পার্টে — শরীরের ৩৬০টি জয়েন্টের জন্য সদকা করার সমতুল্য অলৌকিক নামাজ — চাশত বা সালাতুদ দুহা!",
        content: `
          <p><strong>ইশরাক</strong> হলো সূর্যোদয়ের পর পড়া প্রথম নফল নামাজ। এটি অত্যন্ত ফজিলতপূর্ণ ও বরকতময় একটি আমল।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 হজ ও উমরার সমপরিমাণ সওয়াব</h4>
          <blockquote style="background:rgba(16,185,129,0.05);border-left:4px solid #10b981;padding:16px;border-radius:0 10px 10px 0;">
            "যে ব্যক্তি জামায়াতের সাথে ফজরের নামাজ আদায় করে সূর্যোদয় পর্যন্ত বসে আল্লাহর জিকির করে, এরপর ২ রাকাত নামাজ পড়ে — সে একটি পূর্ণ হজ ও উমরার সওয়াব পাবে।" — (সুনান তিরমিযি: ৫৮৬)
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 পড়ার নিয়ম ও সময়</h4>
          <p>ফজরের নামাজের পর আর না ঘুমিয়ে সূর্য উদিত হওয়ার পর যখন তা একটু ওপরে ওঠে (সূর্যোদয়ের প্রায় ১৫-২০ মিনিট পর) তখন ২ বা ৪ রাকাত নামাজ পড়তে হয়।</p>
        `,
        quiz: {
          question: "সূর্যোদয়ের ঠিক কতক্ষণ পর ইশরাকের নামাজ পড়তে হয়?",
          options: ["সূর্য ওঠার সাথে সাথে", "সূর্যোদয়ের ১৫-২০ মিনিট পর", "দুপুর ১২টায়", "আসর নামাজের আগে"],
          correct: 1,
          explanation: "সূর্য ওঠার সাথে সাথে নামাজ পড়া হারাম। সূর্যোদয়ের প্রায় ১৫-২০ মিনিট পর যখন সূর্য কিছুটা উপরে ওঠে, তখন ইশরাক পড়ার ওয়াক্ত হয়।"
        }
      },

      // ── পার্ট ৪ ──
      {
        title: "পার্ট ৪ — সালাতুদ দুহা/চাশত: রিজিকের দরজা খোলার চাবিকাঠি",
        funFact: "আমাদের শরীরে ৩৬০টি জোড় (joints) আছে এবং প্রতিদিন প্রতিটির জন্য সদকা করা আবশ্যক। মাত্র ২ রাকাত চাশত নামাজ এই ৩৬০টি সদকার দায়িত্ব একাই পূর্ণ করে দেয়! ⚡",
        teaser: "পরের পার্টে — মাগরিবের পর পড়া অত্যন্ত বরকতময় ও রহস্যময় নামাজ — সালাতুল আওয়াবিন!",
        content: `
          <p><strong>সালাতুদ দুহা</strong> বা চাশতের নামাজ হলো দিনের মধ্যভাগে পড়া নফল নামাজ। এটি রিজিকের প্রশস্ততা ও শারীরিক সুস্থতার জন্য অনন্য আমল।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🦴 ৩৬০টি জয়েন্টের সদকা</h4>
          <p>রাসুলুল্লাহ (সা.) বলেছেন: <em>"তোমাদের প্রত্যেকটি জোড়ের জন্য প্রতিদিন সকালে সদকা করা আবশ্যক। অতঃপর ২ রাকাত চাশত নামাজ এই সবকিছুর পক্ষ থেকে যথেষ্ট হয়।"</em> (সহিহ মুসলিম: ৭২০)</p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 চাশতের নিয়ম ও সময়</h4>
          <p>বেলা যখন একটু গরম হতে শুরু করে (সূর্যোদয়ের প্রায় ২-৩ ঘণ্টা পর থেকে জোহরের আধ ঘণ্টা আগে পর্যন্ত) তখন ২, ৪, ৮ বা ১২ রাকাত চাশতের নামাজ আদায় করা যায়।</p>
        `,
        quiz: {
          question: "মানুষের শরীরে মোট কতটি জোড় বা জয়েন্ট আছে যা হাদিসে উল্লেখ আছে?",
          options: ["২০০টি", "৩০০টি", "৩৬০টি", "৪০০টি"],
          correct: 2,
          explanation: "সহিহ মুসলিমের হাদিস অনুযায়ী মানুষের শরীরে ৩৬০টি জোড় রয়েছে, এবং সালাতুদ দুহা পড়লে এই ৩৬০টি জোড়ের পক্ষ থেকে সদকা আদায় হয়ে যায়।"
        }
      },

      // ── পার্ট ৫ ──
      {
        title: "পার্ট ৫ — সালাতুল আওয়াবিন: মাগরিবের পরের লুকানো ধন",
        funFact: "মাগরিবের পর মাত্র ১০ মিনিটে ৬ রাকাত আওয়াবিন নামাজ পড়লে ১২ বছরের একটানা নফল ইবাদতের সওয়াব আমলনামায় যোগ হয়ে যায়! 💎",
        teaser: "পরের পার্টে — জীবনের যেকোনো বিশেষ প্রয়োজনে সরাসরি আল্লাহর দরবারে চাওয়ার নামাজ — সালাতুল হাজত!",
        content: `
          <p><strong>সালাতুল আওয়াবিন</strong> হলো মাগরিবের নামাজের পর জিকির ও ইবাদতের অংশ হিসেবে পড়া নফল নামাজ। 'আওয়াবিন' শব্দের অর্থ হলো — যারা আল্লাহর দিকে বারবার ফিরে আসে।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">⏳ ১২ বছরের ইবাদতের সওয়াব</h4>
          <blockquote style="background:rgba(245,158,11,0.05);border-left:4px solid #f59e0b;padding:16px;border-radius:0 10px 10px 0;">
            "যে ব্যক্তি মাগরিবের পর কোনো মন্দ কথা না বলে ৬ রাকাত নামাজ আদায় করবে, তা তার জন্য ১২ বছরের ইবাদতের সমতুল্য হবে।" — (সুনান তিরমিযি: ৪৩৫)
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 পড়ার পদ্ধতি</h4>
          <p>মাগরিবের ৩ রাকাত ফরজ ও ২ রাকাত সুন্নতের পর আরও ৬ রাকাত নামাজ ২ রাকাত করে করে আওয়াবিন নিয়তে পড়তে হয়।</p>
        `,
        quiz: {
          question: "সালাতুল আওয়াবিন কোন নামাজের পর পড়তে হয়?",
          options: ["জোহর", "আসর", "মাগরিব", "এশা"],
          correct: 2,
          explanation: "সালাতুল আওয়াবিন মাগরিবের নামাজের ফরজ ও সুন্নতের পর পড়তে হয়। (তিরমিযি: ৪৩৫)"
        }
      },

      // ── পার্ট ৬ ──
      {
        title: "পার্ট ৬ — সালাতুল হাজত: যেকোনো সমস্যায় আল্লাহর দরবারে আবেদন",
        funFact: "সাহাবায়ে কেরামের অভ্যাস ছিল — যেকোনো ছোট বা বড় পার্থিব ও আত্মিক সমস্যায় পড়লেই তারা সাথে সাথে ওজু করে নামাজে দাঁড়িয়ে যেতেন! 🔑",
        teaser: "পরের পার্টে — দ্বিধাদ্বন্দ্ব বা কঠিন সিদ্ধান্তে আল্লাহর পরামর্শ ও কল্যাণ চাওয়ার নামাজ — ইস্তেখারা!",
        content: `
          <p><strong>সালাতুল হাজত</strong> হলো মানুষের যেকোনো জাগতিক বা আধ্যাত্মিক প্রয়োজন পূরণের জন্য আল্লাহর দরবারে বিশেষ নামাজ। হাজত মানে প্রয়োজন বা অভাব।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 সরাসরি আল্লাহর দরবারে আবেদন</h4>
          <p>রাসুলুল্লাহ (সা.) বলেছেন: <em>"যার কোনো প্রয়োজন থাকবে, সে যেন সুন্দর করে ওজু করে ২ রাকাত নামাজ পড়ে এবং আল্লাহর প্রশংসা ও রাসুলের ওপর দরুদ পাঠের পর দোয়ার মাধ্যমে আল্লাহর কাছে আবেদন করে।"</em> (তিরমিযি: ৪৭৯)</p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 সালাতুল হাজতের নিয়ম</h4>
          <p>যেকোনো সাধারণ নফল নামাজের মতো ২ রাকাত নামাজ পড়ে আল্লাহর মহিমা ঘোষণা করে নিজের প্রয়োজন পূরণের জন্য মন খুলে দুআ করতে হয়।</p>
        `,
        quiz: {
          question: "সালাতুল হাজত সাধারণত কত রাকাত পড়তে হয়?",
          options: ["১ রাকাত", "২ রাকাত", "৪ রাকাত", "৬ রাকাত"],
          correct: 1,
          explanation: "সালাতুল হাজত সাধারণত ২ রাকাত নামাজ পড়ে মন খুলে দুআ করার মাধ্যমে আদায় করতে হয়। (তিরমিযি: ৪৭৯)"
        }
      },

      // ── পার্ট ৭ ──
      {
        title: "পার্ট ৭ — সালাতুল ইস্তেখারা: সিদ্ধান্ত নিন আল্লাহর পরামর্শে",
        funFact: "অনেকে মনে করেন ইস্তেখারা করলে স্বপ্নে লাল-সবুজ আলো বা দিকনির্দেশনা দেখা যায়। এটি ভুল ধারণা! ইস্তেখারার মূল উদ্দেশ্য হলো মনকে সঠিক সিদ্ধান্তের দিকে ঝুঁকিয়ে দেওয়া। 🧭",
        teaser: "পরের পার্টে — কোনো গুনাহ বা অন্যায় হয়ে যাওয়ার পর গুনাহ মাফ করিয়ে নেওয়ার নামাজ — সালাতুত তওবাহ!",
        content: `
          <p><strong>ইস্তেখারা</strong> শব্দের অর্থ হলো কোনো কাজের কল্যাণ ও মঙ্গল প্রার্থনা করা। বিয়ে, চাকরি, সফর বা যেকোনো গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার ক্ষেত্রে আল্লাহর নির্দেশনা ও সাহায্য চাওয়ার নামাজ এটি।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 ইস্তেখারার বিখ্যাত দোয়া</h4>
          <p>২ রাকাত নামাজ শেষ করে সালাম ফেরানোর পর বিশেষ ইস্তেখারার দুআটি পড়তে হয়। এতে আল্লাহর কাছে প্রার্থনা করা হয় — <em>"হে আল্লাহ! যদি এই কাজটি আমার জন্য কল্যাণকর হয় তবে আমার জন্য এটি সহজ করে দিন, আর যদি অকল্যাণকর হয় তবে আমাকে এটি থেকে এবং এটিকে আমার থেকে দূরে সরিয়ে দিন।"</em></p>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 ইস্তেখারার প্রভাব</h4>
          <p>ইস্তেখারা করার পর allah তাআলা বান্দার মনকে সেই কাজের দিকে ঘুরিয়ে দেন যা তার জন্য সবচেয়ে বেশি কল্যাণকর ও মঙ্গলজনক।</p>
        `,
        quiz: {
          question: "ইস্তেখারা নামাজের মূল উদ্দেশ্য কী?",
          options: ["ভবিষ্যতের বাণী জানা", "স্বপ্নে ভবিষ্যৎ দেখা", "গুরুত্বপূর্ণ সিদ্ধান্তে আল্লাহর কাছে কল্যাণ চাওয়া", "গুনাহ মাফ চাওয়া"],
          correct: 2,
          explanation: "ইস্তেখারার অর্থ হলো কল্যাণ চাওয়া। কোনো গুরুত্বপূর্ণ সিদ্ধান্তে কোনটা ভালো হবে তা আল্লাহর ওপর সোপর্দ করে কল্যাণ চাওয়াই এর মূল উদ্দেশ্য।"
        }
      },

      // ── পার্ট ৮ ──
      {
        title: "পার্ট ৮ — সালাতুত তওবাহ: গুনাহের পর ফিরে আসার নামাজ",
        funFact: "মানুষ মাত্রই ভুল করে। তবে পাপ করার সাথে সাথে লজ্জিত হয়ে ওজু করে ২ রাকাত নামাজ পড়লে আল্লাহ সেই পাপকে পুরোপুরি ক্ষমা করে দেন! 🧼",
        teaser: "পরের পার্টে — প্রতি রাকাতে ৭৫ বার বিশেষ তাসবিহ পাঠের মাধ্যমে সারা জীবনের গুনাহ মাফের নামাজ — সালাতুত তাসবিহ!",
        content: `
          <p><strong>সালাতুত তওবাহ</strong> হলো কোনো অন্যায় বা গুনাহ সংঘটিত হয়ে যাওয়ার পর অত্যন্ত অনুতপ্ত হয়ে ক্ষমা পাওয়ার আশায় পড়া নামাজ।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 ক্ষমার নিশ্চিত প্রতিশ্রুতি</h4>
          <blockquote style="background:rgba(239,68,68,0.05);border-left:4px solid #ef4444;padding:16px;border-radius:0 10px 10px 0;">
            "কোনো বান্দা গুনাহ করার পর যদি সুন্দর করে ওজু করে দাঁড়িয়ে ২ রাকাত নামাজ পড়ে এবং আল্লাহর কাছে ক্ষমা প্রার্থনা করে, তবে আল্লাহ তাকে অবশ্যই ক্ষমা করে দেন।" — (সুনান আবু দাউদ: ১৫২১)
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 সালাতুত তওবাহর শর্তসমূহ</h4>
          <ul style="list-style-type:none;padding-left:0;display:flex;flex-direction:column;gap:10px;">
            <li>১. গুনাহের জন্য অন্তরে গভীর অনুশোচনা থাকতে হবে।</li>
            <li>২. অনতিবিলম্বে সেই গুনাহ থেকে সম্পূর্ণ দূরে সরে আসতে হবে।</li>
            <li>৩. ভবিষ্যতে আর কখনো সেই গুনাহ না করার দৃঢ় প্রতিজ্ঞা করতে হবে।</li>
          </ul>
        `,
        quiz: {
          question: "গুনাহের পর ক্ষমা চাওয়ার নামাজটির নাম কী?",
          options: ["সালাতুল হাজত", "সালাতুত তওবাহ", "সালাতুল ইশরাক", "সালাতুদ দুহা"],
          correct: 1,
          explanation: "গুনাহের পর আল্লাহর কাছে ফিরে এসে ক্ষমা চাওয়ার জন্য লজ্জিত অন্তরে যে নামাজ পড়া হয় তার নাম সালাতুত তওবাহ বা তাওবার নামাজ।"
        }
      },

      // ── পার্ট ৯ ──
      {
        title: "পার্ট ৯ — সালাতুত তাসবিহ: ৩০০ তাসবিহতে সারাজীবনের গুনাহ মাফ",
        funFact: "রাসুলুল্লাহ (সা.) তাঁর চাচা আব্বাস (রা.)-কে এই নামাজ শিক্ষা দিয়েছিলেন এবং বলেছিলেন — সম্ভব হলে প্রতিদিন, না পারলে সপ্তাহে, মাসে, বছরে বা জীবনে অন্তত একবার হলেও এই নামাজ পড়তে! 🌟",
        teaser: "পরের পার্টে — নবীজি (সা.) যে নফল নামাজগুলো নিয়মিত পড়তেন এবং কখনো ছাড়তেন না — ১২ রাকাত সুন্নাতে মুয়াক্কাদা!",
        content: `
          <p><strong>সালাতুত তাসবিহ</strong> হলো একটি অত্যন্ত বিশেষ নফল নামাজ। এই নামাজে ৪ রাকাতে মোট ৩০০ বার একটি নির্দিষ্ট তাসবিহ পাঠ করা হয়।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 তাসবিহর বাক্য</h4>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;text-align:center;">
            <p style="font-family:var(--font-arabic);font-size:22px;color:var(--blue-dark);margin-bottom:10px;line-height:2;">سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ</p>
            <p style="font-weight:700;">সুবহানাল্লাহ — আলহামদুলিল্লাহ — লা ইলাহা ইল্লাল্লাহ — আল্লাহু আকবার</p>
          </blockquote>
          <br>
          <h4 style="color:var(--blue-dark);margin-bottom:12px;">📋 পড়ার পদ্ধতি (প্রতি রাকাতে ৭৫ বার)</h4>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>১. দাঁড়িয়ে প্রথম সূরার পর</span><strong>১৫ বার</strong>
            </div>
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>২. রুকুতে তাসবিহর পর</span><strong>১০ বার</strong>
            </div>
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>৩. রুকু থেকে দাঁড়িয়ে (রুকুত্তর কিয়াম)</span><strong>১০ বার</strong>
            </div>
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>৪. প্রথম সিজদায় সিজদার তাসবিহর পর</span><strong>১০ বার</strong>
            </div>
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>৫. প্রথম সিজদা থেকে বসে (জলসা)</span><strong>১০ বার</strong>
            </div>
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>৬. দ্বিতীয় সিজদায় সিজদার তাসবিহর পর</span><strong>১০ বার</strong>
            </div>
            <div style="background:var(--cream);padding:10px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>৭. দ্বিতীয় সিজদা থেকে মাথা তুলে বসে</span><strong>১০ বার</strong>
            </div>
          </div>
          <br>
          <p>এভাবে প্রতি রাকাতে ৭৫ বার করে ৪ রাকাতে মোট ৩০০ বার তাসবিহ পড়তে হয়। (আবু দাউদ: ১২৯৭)</p>
        `,
        quiz: {
          question: "সালাতুত তাসবিহ নামাজে ৪ রাকাতে মোট কতবার তাসবিহ পড়তে হয়?",
          options: ["১০০ বার", "২০০ বার", "৩০০ বার", "৪০০ বার"],
          correct: 2,
          explanation: "সালাতুত তাসবিহ নামাজে প্রতি রাকাতে ৭৫ বার করে ৪ রাকাতে মোট ৩০০ বার তাসবিহ পাঠ করতে হয়। (আবু দাউদ: ১২৯৭)"
        }
      },

      // ── পার্ট ১০ ──
      {
        title: "পার্ট ১০ — সুন্নাতে মুয়াক্কাদা: নবীজির সবচেয়ে প্রিয় নফল",
        funFact: "হাদিসে আছে — যে ব্যক্তি দিন ও রাতে নিয়মিত ১২ রাকাত সুন্নত আদায় করবে, তার জন্য জান্নাতে একটি বিশেষ রাজপ্রাসাদ তৈরি করা হবে! 🏡",
        teaser: "🎉 অভিনন্দন! নফল নামাজের সম্পূর্ণ গাইড আপনি সফলভাবে শেষ করেছেন। আল্লাহ আপনার জ্ঞান বৃদ্ধি করুন ও আমল কবুল করুন!",
        content: `
          <p><strong>সুন্নাতে মুয়াক্কাদা</strong> হলো সেই সমস্ত নামাজ যা রাসুলুল্লাহ (সা.) ফরজ নামাজের পাশাপাশি নিয়মিত আদায় করতেন এবং বিনা ওজরে কখনো ছাড়তেন না। এগুলো নফল পর্যায়ের হলেও ওয়াজিবের কাছাকাছি গুরুত্বপূর্ণ।</p>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">📋 দৈনিক ১২ রাকাত সুন্নাত</h4>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
            <div style="background:var(--cream);padding:12px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>ফজরের ফরজের আগে</span><strong>২ রাকাত</strong>
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>জোহরের ফরজের আগে ৪ রাকাত এবং পরে ২ রাকাত</span><strong>৬ রাকাত</strong>
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>মাগরিবের ফরজের পরে</span><strong>২ রাকাত</strong>
            </div>
            <div style="background:var(--cream);padding:12px;border-radius:8px;display:flex;justify-content:space-between;">
              <span>এশার ফরজের পরে</span><strong>২ রাকাত</strong>
            </div>
          </div>
          <br>
          <p>রাসুলুল্লাহ (সা.) বলেছেন: <em>"যে ব্যক্তি দিন ও রাতে ১২ রাকাত সুন্নত সালাত আদায় করবে, তার জন্য জান্নাতে একটি ঘর নির্মাণ করা হবে।"</em> (সহিহ মুসলিম: ৭২৮)</p>
        `,
        quiz: {
          question: "দৈনিক সুন্নাতে মুয়াক্কাদা নামাজের মোট রাকাত সংখ্যা কত?",
          options: ["৮ রাকাত", "১০ রাকাত", "১২ রাকাত", "১৪ রাকাত"],
          correct: 2,
          explanation: "সহিহ মুসলিমের হাদিস (৭২৮) অনুযায়ী সুন্নাতে মুয়াক্কাদা দৈনিক ১২ রাকাত: ফজর ২, জোহর ৪+২=৬, মাগরিব ২ এবং এশা ২ রাকাত।"
        }
      }

    ] // end chapters
  },

]; // end miniCoursesData
