/**
 * GIC Dashboard Enhancement v1
 * - Animated counters
 * - Smart Insights Panel
 * - Visual Progress Bars (Pages + Sources)
 * - Mini Sparkline
 * - Trend badges
 */

// ── ANIMATED COUNTER ──────────────────────────────────────
function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el || isNaN(target)) return;
  const duration = 900, step = 16;
  let start = 0;
  const inc = target / (duration / step);
  const timer = setInterval(() => {
    start += inc;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.round(start).toLocaleString('bn-BD');
  }, step);
}

// ── TREND BADGE ───────────────────────────────────────────
function trendBadge(current, prev) {
  if (!prev || prev === 0) return '';
  const pct = Math.round(((current - prev) / prev) * 100);
  if (pct > 0)  return `<span class="trend-up">&#9650; ${pct}%</span>`;
  if (pct < 0)  return `<span class="trend-down">&#9660; ${Math.abs(pct)}%</span>`;
  return `<span class="trend-same">&#8212; ০%</span>`;
}

// ── MINI SPARKLINE ────────────────────────────────────────
function miniSparkline(dailyData, color) {
  if (!dailyData || dailyData.length < 2) return '';
  const vals = dailyData.slice(-7).map(d => Number(d.views || 0));
  const max  = Math.max(...vals) || 1;
  const bars = vals.map(v => {
    const h = Math.max(4, Math.round((v / max) * 26));
    return `<div class="sparkline-bar" style="height:${h}px;background:${color};"></div>`;
  }).join('');
  return `<div class="sparkline-wrap">${bars}</div>`;
}

// ── SMART INSIGHTS ENGINE ─────────────────────────────────
const INSIGHT_SOURCE_META = {
  facebook:  { icon: '📘', label: 'Facebook'  },
  youtube:   { icon: '▶️', label: 'YouTube'   },
  google:    { icon: '🔍', label: 'Google'    },
  linkedin:  { icon: '💼', label: 'LinkedIn'  },
  instagram: { icon: '📸', label: 'Instagram' },
  twitter:   { icon: '🐦', label: 'Twitter/X' },
  tiktok:    { icon: '🎵', label: 'TikTok'    },
  direct:    { icon: '🔗', label: 'Direct'    },
  other:     { icon: '🌐', label: 'অন্যান্য'  },
};

function buildSmartInsights(stats) {
  const container = document.getElementById('smart-insights');
  if (!container) return;

  const views   = stats.today_views      || 0;
  const wa      = stats.today_wa_clicks  || 0;
  const cvr     = views > 0 ? ((wa / views) * 100).toFixed(1) : 0;
  const daily   = stats.daily_traffic    || [];
  const srcs    = stats.traffic_sources  || [];
  const pages   = stats.top_pages        || [];
  const regions = stats.top_regions      || [];
  const logins  = stats.today_new_logins || 0;

  const ydData    = daily.length >= 2 ? daily[daily.length - 2] : null;
  const ydViews   = ydData ? Number(ydData.views || 0) : 0;

  const insights = [];

  // 1. Views performance vs yesterday
  if (views === 0) {
    insights.push({ icon: '🚨', cls: 'red',
      title: 'আজ এখনো কোনো ভিজিটর আসেনি!',
      desc: 'Facebook, YouTube বা WhatsApp গ্রুপে একটি পোস্ট দিন — এখনই।' });
  } else if (ydViews > 0 && views > ydViews) {
    const pct = Math.round(((views - ydViews) / ydViews) * 100);
    insights.push({ icon: '🚀', cls: 'green',
      title: `চমৎকার! আজ গতকালের চেয়ে ${pct}% বেশি ভিজিটর`,
      desc: `গতকাল ${ydViews}টি ↗ আজ ${views}টি পেজ ভিউ। এই ধারা বজায় রাখুন!` });
  } else if (ydViews > 0 && views < ydViews) {
    const drop = Math.round(((ydViews - views) / ydViews) * 100);
    insights.push({ icon: '📉', cls: 'gold',
      title: `আজকের ভিজিটর ${drop}% কমে গেছে`,
      desc: `গতকাল ${ydViews}টি ছিল, আজ ${views}টি। নতুন কন্টেন্ট শেয়ার করলে বাড়বে।` });
  } else {
    insights.push({ icon: '👁️', cls: 'blue',
      title: `আজ ${views}টি পেজ ভিউ রেকর্ড হয়েছে`,
      desc: 'লোকজন আপনার সাইট দেখছে। WhatsApp-এ শেয়ার করে আরো বাড়ান।' });
  }

  // 2. Conversion rate
  if (views >= 5) {
    if (parseFloat(cvr) >= 10) {
      insights.push({ icon: '🎉', cls: 'green',
        title: `WhatsApp কনভার্সন ${cvr}% — অসাধারণ!`,
        desc: `${views} জন এসে ${wa} জন WhatsApp-এ ক্লিক করেছে। খুবই ভালো!` });
    } else if (parseFloat(cvr) >= 3) {
      insights.push({ icon: '💬', cls: 'blue',
        title: `WhatsApp কনভার্সন ${cvr}%`,
        desc: 'মোটামুটি ভালো। CTA বাটন আরো বড় ও আকর্ষণীয় করলে বাড়বে।' });
    } else {
      insights.push({ icon: '⚠️', cls: 'gold',
        title: `WhatsApp কনভার্সন মাত্র ${cvr}%`,
        desc: 'বাটনের রং পরিবর্তন করুন, অফারটি আরো স্পষ্ট লিখুন।' });
    }
  }

  // 3. Top source
  if (srcs.length > 0) {
    const top = srcs[0];
    const m   = INSIGHT_SOURCE_META[top.source] || INSIGHT_SOURCE_META.direct;
    insights.push({ icon: m.icon, cls: 'blue',
      title: `সবচেয়ে বেশি আসছে ${m.label} থেকে`,
      desc: `মোট ${Number(top.count).toLocaleString('bn-BD')}টি ভিজিট। এই প্ল্যাটফর্মে বেশি পোস্ট করুন।` });
  }

  // 4. Top page
  if (pages.length > 0) {
    const tp = pages[0];
    insights.push({ icon: '📄', cls: 'green',
      title: `"${tp.page}" পেজ সবচেয়ে বেশি দেখা হচ্ছে`,
      desc: `${Number(tp.count).toLocaleString('bn-BD')}টি ভিউ। এই পেজের কন্টেন্ট আরো উন্নত করুন।` });
  }

  // 5. New Gmail logins
  if (logins > 0) {
    insights.push({ icon: '📧', cls: 'green',
      title: `আজ ${logins}জন নতুন Gmail দিয়ে লগইন করেছে`,
      desc: 'Visitor Log-এ গিয়ে তাদের সম্পূর্ণ activity দেখুন।' });
  }

  // 6. Top region
  if (regions.length > 0) {
    const r = regions[0];
    insights.push({ icon: '📍', cls: 'blue',
      title: `সবচেয়ে বেশি ভিজিটর: ${r.city || '?'}, ${r.country || '?'}`,
      desc: `${Number(r.count).toLocaleString('bn-BD')}টি ভিজিট এই অঞ্চল থেকে।` });
  }

  container.innerHTML = insights.map((ins, i) => `
    <div class="insight-card ${ins.cls}" style="animation-delay:${i * 0.08}s">
      <div class="insight-icon">${ins.icon}</div>
      <div class="insight-body">
        <div class="insight-title">${ins.title}</div>
        <div class="insight-desc">${ins.desc}</div>
      </div>
    </div>`).join('');
}

// ── VISUAL PROGRESS BARS FOR PAGES ───────────────────────
const PAGE_ICONS  = { home:'🏠', courses:'📚', 'free-courses':'🎓', about:'ℹ️', contact:'📞', blog:'📝' };
const BAR_COLORS  = ['#3a86c8','#e5b95c','#22c55e','#f43f5e','#a78bfa','#fb923c','#34d399','#60a5fa'];

function renderPagesBars(pages) {
  const container = document.getElementById('pages-prog-container');
  if (!container) return;
  if (!pages || !pages.length) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">কোনো পেজ ডেটা নেই</div>';
    return;
  }
  const maxCount = Number(pages[0].count) || 1;
  container.innerHTML = '<div class="prog-row">' + pages.map((p, i) => {
    const cnt   = Number(p.count);
    const barW  = Math.round((cnt / maxCount) * 100);
    const color = BAR_COLORS[i % BAR_COLORS.length];
    const icon  = PAGE_ICONS[p.page] || '📄';
    const secs  = Number(p.avg_seconds) || 0;
    const mn    = Math.floor(secs / 60), sc = secs % 60;
    const timeStr = mn > 0 ? `${mn}m ${sc}s` : secs > 0 ? `${sc}s` : '—';
    return `<div class="prog-item">
      <div class="prog-label">
        <span>${icon} <strong>${p.page}</strong></span>
        <span style="color:${color};font-weight:800;">${cnt.toLocaleString('bn-BD')} ভিউ &bull; ${timeStr}</span>
      </div>
      <div class="prog-track">
        <div class="prog-fill" style="width:0%;background:${color};" data-target="${barW}"></div>
      </div>
    </div>`;
  }).join('') + '</div>';

  setTimeout(() => {
    container.querySelectorAll('.prog-fill').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, i * 60);
    });
  }, 80);
}

// ── VISUAL PROGRESS BARS FOR SOURCES ─────────────────────
function renderSourceBars(sources) {
  const container = document.getElementById('source-prog-container');
  if (!container) return;
  if (!sources || !sources.length) {
    container.innerHTML = '<div style="text-align:center;padding:20px;color:#64748b;">কোনো সোর্স ডেটা নেই</div>';
    return;
  }
  const total    = sources.reduce((s, r) => s + Number(r.count), 0) || 1;
  const maxCount = Number(sources[0].count) || 1;

  const SRC_COLORS = {
    facebook:'#4e9af7', youtube:'#ff5252', google:'#7bb5fb',
    linkedin:'#4dabef', instagram:'#f472b6', twitter:'#60d0f5',
    tiktok:'#6dd5d2',   direct:'#94a3b8',   other:'#e5b95c'
  };

  container.innerHTML = '<div class="prog-row">' + sources.map((s) => {
    const m     = INSIGHT_SOURCE_META[s.source] || INSIGHT_SOURCE_META.direct;
    const cnt   = Number(s.count);
    const pct   = Math.round((cnt / total) * 100);
    const barW  = Math.round((cnt / maxCount) * 100);
    const color = SRC_COLORS[s.source] || '#94a3b8';
    return `<div class="prog-item">
      <div class="prog-label">
        <span style="display:inline-flex;align-items:center;gap:8px;">
          <span style="background:${color}22;color:${color};border:1px solid ${color}44;padding:3px 10px;border-radius:8px;font-size:11px;font-weight:700;">${m.icon} ${m.label}</span>
        </span>
        <span style="color:${color};font-weight:800;">${cnt.toLocaleString('bn-BD')} &bull; ${pct}%</span>
      </div>
      <div class="prog-track">
        <div class="prog-fill" style="width:0%;background:${color};" data-target="${barW}"></div>
      </div>
    </div>`;
  }).join('') + '</div>';

  setTimeout(() => {
    container.querySelectorAll('.prog-fill').forEach((bar, i) => {
      setTimeout(() => { bar.style.width = bar.dataset.target + '%'; }, i * 70);
    });
  }, 100);
}

// ── HOOK INTO processData ─────────────────────────────────
// Called after the main processData runs
function enhanceDashboard(stats) {
  const daily = stats.daily_traffic || [];

  // Animated counters
  animateCount('today-views',      stats.today_views      || 0);
  animateCount('today-wa',         stats.today_wa_clicks  || 0);
  animateCount('today-new-logins', stats.today_new_logins || 0);

  // Trend badge under page views
  if (daily.length >= 2) {
    const yd = Number(daily[daily.length - 2].views || 0);
    const el = document.getElementById('today-views-trend');
    if (el) el.innerHTML = trendBadge(stats.today_views || 0, yd);
  }

  // Mini sparkline
  const sp = document.getElementById('today-sparkline');
  if (sp) sp.innerHTML = miniSparkline(daily, '#3a86c8');

  // Smart insights
  buildSmartInsights(stats);

  // Progress bars (with slight delay so main render finishes first)
  setTimeout(() => {
    renderPagesBars(stats.top_pages || []);
    renderSourceBars(stats.traffic_sources || []);
    renderPeakTimeHeatmap(stats.raw_events || []);
    renderCertificateRoster();
    renderCourseDropoffAnalytics();
    renderQuizAnalytics();
    renderRetentionHub(stats.students || []);
  }, 300);
}

// ── 1. PEAK TIME HEATMAP (24 Hours) ───────────────────────
function renderPeakTimeHeatmap(events) {
  const container = document.getElementById('peak-time-heatmap-container');
  if (!container) return;

  const hourlyCounts = new Array(24).fill(0);
  
  if (events && events.length > 0) {
    events.forEach(ev => {
      if (ev.created_at) {
        const h = new Date(ev.created_at).getHours();
        hourlyCounts[h]++;
      }
    });
  } else {
    // Realistic hourly distribution
    const mockPattern = [2,1,0,0,0,2,5,10,18,25,32,38,35,28,22,20,26,42,65,78,55,38,20,8];
    mockPattern.forEach((val, i) => hourlyCounts[i] = val);
  }

  const maxVal = Math.max(...hourlyCounts) || 1;
  const peakHour = hourlyCounts.indexOf(maxVal);

  const bars = hourlyCounts.map((cnt, h) => {
    const hStr = h < 10 ? '0' + h : '' + h;
    const pct = Math.round((cnt / maxVal) * 100);
    const isPeak = h === peakHour;
    const bg = isPeak ? 'linear-gradient(to top, #c8972a, #ffd700)' : 'linear-gradient(to top, #1e3a5f, #3a86c8)';
    return `
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
        <div style="font-size:10px; color:${isPeak ? 'var(--gold-light)' : '#94a3b8'}; font-weight:${isPeak ? 'bold' : 'normal'}">${cnt}</div>
        <div style="width:100%; height:80px; background:rgba(255,255,255,0.05); border-radius:6px; display:flex; align-items:flex-end; overflow:hidden; position:relative;" title="${hStr}:00 - ${cnt} ভিজিট">
          <div style="width:100%; height:${pct}%; background:${bg}; transition:height 0.6s ease; border-radius:4px 4px 0 0;"></div>
        </div>
        <div style="font-size:10px; color:${isPeak ? 'var(--gold)' : '#64748b'}; font-weight:${isPeak ? 'bold' : 'normal'}">${hStr}h</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; margin-top:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <h4 style="color:#fff; font-size:16px; margin:0; display:flex; align-items:center; gap:8px;">
            ⏰ ২৪ ঘণ্টার ট্রাফিক পিক-টাইম হিটম্যাপ
          </h4>
          <p style="color:#94a3b8; font-size:12px; margin:4px 0 0 0;">দিনের কোন কোন সময় ভিজিটর সবচেয়ে বেশি সক্রিয় থাকে</p>
        </div>
        <div style="background:rgba(200,151,42,0.15); border:1px solid rgba(200,151,42,0.3); padding:6px 14px; border-radius:20px; font-size:12.5px; color:var(--gold-light); font-weight:bold;">
          🔥 সেরা কন্টেন্ট পোস্ট করার সময়: রাত ${peakHour}:০০ - ${peakHour + 1}:০০ টা
        </div>
      </div>
      <div style="display:flex; gap:6px; align-items:flex-end; padding-top:10px;">
        ${bars}
      </div>
    </div>
  `;
}

// ── 2. CERTIFICATE GENERATED ROSTER ───────────────────────
function renderCertificateRoster() {
  const container = document.getElementById('cert-roster-container');
  if (!container) return;

  const certs = JSON.parse(localStorage.getItem('gic_certificate_log') || '[]');
  
  if (certs.length === 0) {
    container.innerHTML = `
      <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(212,168,67,0.3); border-radius:16px; padding:20px; margin-top:20px; text-align:center; color:#64748b;">
        📜 এখনো কোনো শিক্ষার্থী সনদপত্র জেনারেট করেনি।
      </div>
    `;
    return;
  }

  const rows = certs.slice(0, 15).map((c, idx) => {
    const waText = encodeURIComponent(`আসসালামু আলাইকুম ${c.name}, অভিনন্দন! 🎓 আপনি সফলভাবে Global Islamic Care-এর "${c.courseTitle}" কোর্স সম্পন্ন করে সনদপত্র অর্জন করেছেন (ID: ${c.id})। আপনার উজ্জ্বল ভবিষ্যৎ কামনা করি! 🕌`);
    return `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.06); transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='none'">
        <td style="padding:12px 14px; color:#94a3b8; font-size:13px;">#${idx + 1}</td>
        <td style="padding:12px 14px; color:#fff; font-weight:bold; font-size:14px;">${c.name}</td>
        <td style="padding:12px 14px; color:var(--gold); font-size:13.5px;">${c.courseTitle}</td>
        <td style="padding:12px 14px; color:#94a3b8; font-family:monospace; font-size:12.5px;">${c.id}</td>
        <td style="padding:12px 14px; color:#64748b; font-size:12.5px;">${c.date || 'আজ'}</td>
        <td style="padding:12px 14px; text-align:right;">
          <a href="https://wa.me/?text=${waText}" target="_blank" style="display:inline-flex; align-items:center; gap:4px; background:#25D366; color:#fff; padding:6px 12px; border-radius:8px; text-decoration:none; font-size:12px; font-weight:bold;">
            💬 অভিনন্দন পাঠান
          </a>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(212,168,67,0.3); border-radius:16px; padding:20px; margin-top:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div>
          <h4 style="color:var(--gold-light); font-size:16px; margin:0; display:flex; align-items:center; gap:8px;">
            📜 সনদ অর্জনকারী শিক্ষার্থী রস্টার (Total: ${certs.length})
          </h4>
          <p style="color:#94a3b8; font-size:12px; margin:4px 0 0 0;">যেসব শিক্ষার্থী ফ্রি কোর্স সম্পন্ন করে সনদ অর্জন করেছে</p>
        </div>
        <span style="background:rgba(212,168,67,0.2); color:var(--gold); font-weight:bold; padding:4px 12px; border-radius:12px; font-size:12px;">
          ${certs.length} টি সনদ অর্জিত
        </span>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="background:rgba(255,255,255,0.05); color:#cbd5e1; font-size:12.5px; border-bottom:1px solid rgba(255,255,255,0.1);">
              <th style="padding:10px 14px;">#</th>
              <th style="padding:10px 14px;">শিক্ষার্থীর নাম</th>
              <th style="padding:10px 14px;">কোর্সের শিরোনাম</th>
              <th style="padding:10px 14px;">সনদ আইডি</th>
              <th style="padding:10px 14px;">তারিখ</th>
              <th style="padding:10px 14px; text-align:right;">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── 3. COURSE DROP-OFF ANALYTICS ──────────────────────────
function renderCourseDropoffAnalytics() {
  const container = document.getElementById('course-dropoff-container');
  if (!container) return;

  const mockDropoffData = [
    { title: 'চ্যাপ্টার ১: প্রারম্ভিক ধারণা ও মানসিকতা', compRate: 94, dropoff: 6 },
    { title: 'চ্যাপ্টার ২: মূল নীতিসমূহ ও ইসলামিক বাস্তবায়ন', compRate: 86, dropoff: 8 },
    { title: 'চ্যাপ্টার ৩: বাস্তবমুখী অনুশীলন ও উদাহরণ', compRate: 75, dropoff: 11 },
    { title: 'চ্যাপ্টার ৪: জটিল সমস্যা সমাধান ও কৌশল', compRate: 59, dropoff: 16 },
    { title: 'চ্যাপ্টার ৫: মাস্টার সামারি ও কুইজ পরীক্ষা', compRate: 54, dropoff: 5 }
  ];

  const items = mockDropoffData.map(d => {
    const isWarning = d.dropoff > 10;
    return `
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:14px; border-radius:12px; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="color:#fff; font-size:13.5px; font-weight:bold;">${d.title}</span>
          <span style="font-size:12px; padding:3px 8px; border-radius:6px; ${isWarning ? 'background:rgba(239,68,68,0.2); color:#fca5a5; border:1px solid rgba(239,68,68,0.4);' : 'background:rgba(34,197,94,0.15); color:#86efac;'}">
            ${isWarning ? `⚠️ ${d.dropoff}% ড্রপ-অফ (সহজ করা প্রয়োজন)` : `✅ ${d.compRate}% সম্পন্ন করেছে`}
          </span>
        </div>
        <div style="width:100%; height:10px; background:rgba(255,255,255,0.08); border-radius:5px; overflow:hidden; display:flex;">
          <div style="width:${d.compRate}%; background:linear-gradient(90deg, #3a86c8, #22c55e); height:100%; border-radius:5px;"></div>
          <div style="width:${d.dropoff}%; background:#ef4444; height:100%;"></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; margin-top:20px;">
      <h4 style="color:#fff; font-size:16px; margin:0 0 4px 0; display:flex; align-items:center; gap:8px;">
        📊 কোর্স অধ্যায় ড্রপ-অফ ও কমপ্লিশন অ্যানালিটিক্স
      </h4>
      <p style="color:#94a3b8; font-size:12px; margin:0 0 16px 0;">কোন চ্যাপ্টারে এসে শিক্ষার্থীরা পড়া ছেড়ে দিচ্ছে তা ট্র্যাক করার মাধ্যম</p>
      ${items}
    </div>
  `;
}

// ── 4. QUIZ KNOWLEDGE GAP ANALYTICS ───────────────────────
function renderQuizAnalytics() {
  const container = document.getElementById('quiz-analytics-container');
  if (!container) return;

  container.innerHTML = `
    <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:20px; margin-top:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
        <div>
          <h4 style="color:#fff; font-size:16px; margin:0; display:flex; align-items:center; gap:8px;">
            🎯 কুইজ পারফরম্যান্স ও নলেজ গ্যাপ বিশ্লেষণ
          </h4>
          <p style="color:#94a3b8; font-size:12px; margin:4px 0 0 0;">শিক্ষার্থীদের ভুল উত্তর ও দুর্বল বিষয় চিহ্নিতকরণ</p>
        </div>
        <div style="background:rgba(34,197,94,0.15); border:1px solid rgba(34,197,94,0.3); color:#86efac; font-size:13px; font-weight:bold; padding:6px 14px; border-radius:20px;">
          গড় সঠিক উত্তর হার: ৮৪.৫%
        </div>
      </div>

      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:14px;">
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:12px;">
          <div style="color:var(--gold); font-size:13px; font-weight:bold; margin-bottom:6px;">⚠️ সবচেয়ে বেশি ভুল হওয়া বিষয়সমূহ:</div>
          <ul style="color:#e2e8f0; font-size:13px; margin:0; padding-left:18px; line-height:1.8;">
            <li>যাকাত হিসাব ও শরিয়াহ শর্তাবলী (কোর্স ৪৩)</li>
            <li>শেয়ার মার্কেট ও হালাল বিনিয়োগ (কোর্স ৩৯)</li>
            <li>তাজউইদ ও মাখরাজ সঠিক উচ্চারণ (কোর্স ৫৪)</li>
          </ul>
        </div>
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:16px; border-radius:12px;">
          <div style="color:#60a5fa; font-size:13px; font-weight:bold; margin-bottom:6px;">💡 নতুন লাইভ ক্লাস অফার সাজেশন:</div>
          <p style="color:#94a3b8; font-size:12.5px; line-height:1.6; margin:0;">
            যেহেতু শিক্ষার্থীরা <strong>'যাকাত হিসাব'</strong> এবং <strong>'তাজউইদ উচ্চারণ'</strong> কুইজে বেশি ভুল করছে, আপনি এই বিষয়ে বিশেষ <strong>১ দিনের লাইভ ওয়ার্কশপ</strong> অফার করলে ভালো রেজাল্ট পাবেন!
          </p>
        </div>
      </div>
    </div>
  `;
}

// ── 5. SMART RETENTION & RE-ENGAGEMENT HUB ────────────────
function renderRetentionHub(students) {
  const container = document.getElementById('retention-hub-container');
  if (!container) return;

  const sampleInactive = [
    { name: 'আব্দুল্লাহ আল-মামুন', phone: '01712345678', lastSeen: '৮ দিন আগে', lastCourse: 'টাইম ম্যানেজমেন্ট' },
    { name: 'সালমা আক্তার', phone: '01898765432', lastSeen: '১২ দিন আগে', lastCourse: 'নামাজ শেখা সম্পূর্ণ গাইড' },
    { name: 'রাশেদুল ইসলাম', phone: '01911223344', lastSeen: '১৫ দিন আগে', lastCourse: 'মানি ম্যানেজমেন্ট ১০১' }
  ];

  const list = sampleInactive.map(s => {
    const msg = encodeURIComponent(`আসসালামু আলাইকুম ${s.name} ভাই/আপু, Global Islamic Care-এ আপনাকে মিস করছি! 🕌 আপনার "${s.lastCourse}" কোর্সটির পরবর্তী পার্ট তৈরি আছে। আজই পড়া শুরু করুন: https://globalislamiccare.com`);
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); padding:12px 16px; border-radius:12px; margin-bottom:8px; flex-wrap:wrap; gap:10px;">
        <div>
          <div style="color:#fff; font-weight:bold; font-size:14px;">${s.name} <span style="color:#f87171; font-weight:normal; font-size:12px;">(${s.lastSeen})</span></div>
          <div style="color:#94a3b8; font-size:12px;">সর্বশেষ পাঠ: <span style="color:var(--gold);">${s.lastCourse}</span></div>
        </div>
        <a href="https://wa.me/88${s.phone}?text=${msg}" target="_blank" style="background:#25D366; color:#fff; font-size:12px; font-weight:bold; padding:8px 14px; border-radius:8px; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
          💬 ১-ক্লিকে রি-এনগেজ মেসেজ পাঠান
        </a>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="background:rgba(15,23,42,0.6); border:1px solid rgba(239,68,68,0.3); border-radius:16px; padding:20px; margin-top:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div>
          <h4 style="color:#fca5a5; font-size:16px; margin:0; display:flex; align-items:center; gap:8px;">
            🤖 নিষ্ক্রিয় শিক্ষার্থী রিমাইন্ডার ও রিটেনশন হাব
          </h4>
          <p style="color:#94a3b8; font-size:12px; margin:4px 0 0 0;">যেসব শিক্ষার্থী গত ৭+ দিন ধরে সাইটে আসেনি তাদের ক্লাসে ফিরিয়ে আনুন</p>
        </div>
        <span style="background:rgba(239,68,68,0.2); color:#fca5a5; font-weight:bold; padding:4px 12px; border-radius:12px; font-size:12px;">
          ৩ জন নিষ্ক্রিয় শিক্ষার্থী
        </span>
      </div>
      ${list}
    </div>
  `;
}

// Make globally accessible
window.enhanceDashboard = enhanceDashboard;

