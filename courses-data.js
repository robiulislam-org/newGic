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
  // COURSE 1 — সম্পূর্ণ নামাজ কোর্স (12 পার্ট)
  // ==========================================
  {
    id: 1,
    title: "নামাজের ভেতরের অর্থ ও সৌন্দর্য",
    icon: "🕌",
    duration: "৯০ মিনিট",
    partsCount: 12,
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
        funFact: "দুই সিজদার মাঝে মাত্র কয়েক সেকেন্ড — কিন্তু এই দোয়ায় একসাথে ৭টি আলাদা চাওয়া আছে! এটি পৃথিবীর সবচেয়ে শক্তিশালী সংক্ষিপ্ত দোয়াগুলোর একটি। 🎯",
        teaser: "পরের পার্টে — তাশাহহুদ: মেরাজের রাতের সেই অবিশ্বাস্য মহাকাশীয় কথোপকথন যা আজও আমরা প্রতি নামাজে পড়ি।",
        content: `
          <p>দুই সিজদার মাঝে বসার সময় একটি ছোট্ট দোয়া পড়া হয় — যা অনেকে অজানায় পড়ে থাকেন, কিন্তু এর অর্থ জানলে অবাক হবেন।</p>
          <br>
          <blockquote style="background:rgba(26,95,158,0.05);border-left:4px solid var(--gold);padding:20px;margin:16px 0;border-radius:0 12px 12px 0;">
            <p style="font-family:var(--font-arabic);font-size:18px;color:var(--blue-dark);text-align:right;margin-bottom:12px;line-height:2.2;">
              رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي
            </p>
            <p style="font-size:14px;line-height:2;">
              <strong>"হে আমার রব!</strong><br>
              ১. আমাকে <strong>ক্ষমা করুন</strong> (رَبِّ اغْفِرْ لِي)<br>
              ২. আমার উপর <strong>রহম করুন</strong> (وَارْحَمْنِي)<br>
              ৩. আমাকে <strong>সঠিক পথ দেখান</strong> (وَاهْدِنِي)<br>
              ৪. আমাকে <strong>সুস্বাস্থ্য দিন</strong> (وَعَافِنِي)<br>
              ৫. আমাকে <strong>রিজিক দিন</strong> (وَارْزُقْنِي)"
            </p>
          </blockquote>
          <br>
          <h4 style="color:var(--gold);margin-bottom:12px;">🌟 পাঁচটি চাওয়া — পাঁচটি জীবনের মূলনীতি</h4>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="background:linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.01));padding:14px;border-radius:10px;border-left:3px solid #ef4444;">
              <strong>ক্ষমা:</strong> গুনাহ থেকে মুক্তি — সবচেয়ে জরুরি চাওয়া
            </div>
            <div style="background:linear-gradient(135deg,rgba(26,95,158,0.06),rgba(26,95,158,0.01));padding:14px;border-radius:10px;border-left:3px solid var(--blue);">
              <strong>রহম:</strong> আল্লাহর দয়া — যা ছাড়া জীবন অন্ধকার
            </div>
            <div style="background:linear-gradient(135deg,rgba(167,139,250,0.06),rgba(167,139,250,0.01));padding:14px;border-radius:10px;border-left:3px solid #a78bfa;">
              <strong>হেদায়েত:</strong> সঠিক পথ — জীবনে সঠিক সিদ্ধান্ত নেওয়ার শক্তি
            </div>
            <div style="background:linear-gradient(135deg,rgba(34,197,94,0.06),rgba(34,197,94,0.01));padding:14px;border-radius:10px;border-left:3px solid #22c55e;">
              <strong>আফিয়া:</strong> সুস্বাস্থ্য — শরীর ও মন দুটোর সুস্থতা
            </div>
            <div style="background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(212,168,67,0.02));padding:14px;border-radius:10px;border-left:3px solid var(--gold);">
              <strong>রিজিক:</strong> হালাল উপার্জন — যা দিয়ে পরিবার চলে
            </div>
          </div>
          <br>
          <p style="background:var(--cream);padding:14px;border-radius:10px;text-align:center;font-weight:600;">
            💭 মাত্র ১০ সেকেন্ডের এই দোয়ায় আপনি দুনিয়া ও আখেরাতের সব গুরুত্বপূর্ণ চাওয়া একসাথে চাইছেন!
          </p>
        `,
        quiz: {
          question: "দুই সিজদার মাঝে পড়া দোয়ায় মোট কতটি চাওয়া আছে?",
          options: ["তিনটি", "চারটি", "পাঁচটি", "সাতটি"],
          correct: 2,
          explanation: "দুই সিজদার মাঝে 'রাব্বিগফিরলি, ওয়ারহামনি, ওয়াহদিনি, ওয়াআফিনি, ওয়ারযুকনি' — এই দোয়ায় পাঁচটি চাওয়া আছে: ক্ষমা, রহম, হেদায়েত, সুস্বাস্থ্য ও রিজিক।"
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
      }

    ] // end chapters
  }  // end course 1
]; // end miniCoursesData
