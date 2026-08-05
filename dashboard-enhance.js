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
  }, 300);
}

// Make globally accessible
window.enhanceDashboard = enhanceDashboard;
