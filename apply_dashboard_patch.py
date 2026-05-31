import sys
sys.stdout.reconfigure(encoding='utf-8')
with open('dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CSS
css_patch = '''    /* ───── BOTTOM ROW TABLES ───── */
    .bottom-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
    }

    /* ───── SOURCE BADGE ───── */
    .source-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 700;
      text-transform: capitalize;
    }
    .source-badge.facebook  { background: rgba(24,119,242,0.15); color: #4e9af7; }
    .source-badge.youtube   { background: rgba(255,0,0,0.12);    color: #ff5252; }
    .source-badge.linkedin  { background: rgba(10,102,194,0.15);  color: #4dabef; }
    .source-badge.instagram { background: rgba(225,48,108,0.15);  color: #f472b6; }
    .source-badge.twitter,
    .source-badge.x         { background: rgba(29,161,242,0.12);  color: #60d0f5; }
    .source-badge.google    { background: rgba(66,133,244,0.15);  color: #7bb5fb; }
    .source-badge.tiktok    { background: rgba(105,201,208,0.15); color: #6dd5d2; }
    .source-badge.direct    { background: rgba(148,163,184,0.15); color: #94a3b8; }
    .source-badge.other     { background: rgba(200,151,42,0.15);  color: var(--gold-light); }
    .source-badge.bing      { background: rgba(0,168,232,0.15);   color: #48b5e8; }

    /* ───── TIME BAR ───── */
    .time-bar-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .time-bar-track {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.06);
      border-radius: 6px;
      overflow: hidden;
    }
    .time-bar-fill {
      height: 100%;
      border-radius: 6px;
      background: linear-gradient(90deg, var(--blue-light), var(--gold));
      transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .time-bar-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--gold-light);
      white-space: nowrap;
      min-width: 54px;
      text-align: right;
    }

    /* ───── SOURCE GRID ───── */
    .source-analytics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 32px;
    }
    @media (max-width: 1024px) {
      .source-analytics-grid { grid-template-columns: 1fr; }
    }

    /* ───── METRIC CARD SECONDARY ───── */
    .metric-card.purple::before { background: linear-gradient(90deg, #8b5cf6, #a78bfa); }
    .metric-card.teal::before   { background: linear-gradient(90deg, #0d9488, #2dd4bf); }
'''
content = content.replace('    /* ───── BOTTOM ROW TABLES ───── */\n    .bottom-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));\n      gap: 24px;\n    }', css_patch)

# 2. Update Metric Cards
metrics_old = '''    <!-- Metrics Row -->
    <div class="metrics-grid">
      <div class="metric-card green">
        <div class="metric-label">লাইভ ভিজিটর (Active Users)</div>
        <div class="metric-value live" id="metric-live">0</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">আজকের পেজ ভিউ (Today Views)</div>
        <div class="metric-value" id="metric-today-views">0</div>
      </div>
      <div class="metric-card gold">
        <div class="metric-label">আজকের হোয়াটসঅ্যাপ ক্লিক</div>
        <div class="metric-value" id="metric-today-wa">0</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">হোয়াটসঅ্যাপ কনভার্সন রেট</div>
        <div class="metric-value" id="metric-conversion">0%</div>
      </div>
    </div>'''
metrics_new = '''    <!-- Metrics Row -->
    <div class="metrics-grid">
      <div class="metric-card green">
        <div class="metric-label">&#128994; লাইভ ভিজিটর (Active Users)</div>
        <div class="metric-value live" id="metric-live">0</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">&#128065; আজকের পেজ ভিউ</div>
        <div class="metric-value" id="metric-today-views">0</div>
      </div>
      <div class="metric-card gold">
        <div class="metric-label">&#128172; আজকের হোয়াটসঅ্যাপ ক্লিক</div>
        <div class="metric-value" id="metric-today-wa">0</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">&#128202; হোয়াটসঅ্যাপ কনভার্সন রেট</div>
        <div class="metric-value" id="metric-conversion">0%</div>
      </div>
      <div class="metric-card purple">
        <div class="metric-label">&#128285; আজকের প্রধান ট্রাফিক সোর্স</div>
        <div class="metric-value" id="metric-top-source" style="font-size:22px; text-transform:capitalize;">&mdash;</div>
      </div>
      <div class="metric-card teal">
        <div class="metric-label">&#9201; সর্বোচ্চ গড় সময় (পেজ)</div>
        <div class="metric-value" id="metric-top-time" style="font-size:22px;">&mdash;</div>
      </div>
    </div>'''
content = content.replace(metrics_old, metrics_new)

# 3. Tables and Charts 
html_old = '''    <!-- Bottom Tables Row -->
    <div class="bottom-grid">
      <!-- Top Visited Pages -->
      <div class="card">
        <div class="card-title">🔑 সর্বাধিক ভিউ হওয়া পেজসমূহ</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>পেজের নাম</th>
                <th>মোট ভিউ</th>
              </tr>
            </thead>
            <tbody id="top-pages-table">
              <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top WhatsApp Click Pages -->
      <div class="card">
        <div class="card-title">💬 হোয়াটসঅ্যাপ ক্লিক উৎস পেজ</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>উৎস পেজ</th>
                <th>ক্লিক সংখ্যা</th>
              </tr>
            </thead>
            <tbody id="top-wa-table">
              <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Visitor Regions -->
      <div class="card">
        <div class="card-title">🌍 প্রধান ভিজিটর অঞ্চলসমূহ</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>দেশ ও শহর</th>
                <th>ক্লিক / ইভেন্ট সংখ্যা</th>
              </tr>
            </thead>
            <tbody id="top-regions-table">
              <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>'''

html_new = '''    <!-- ══════ TRAFFIC SOURCE & PAGE TIME SECTION ══════ -->
    <div class="source-analytics-grid">
      <!-- Traffic Source Doughnut Chart -->
      <div class="card">
        <div class="card-title">
          <span>&#127760; ট্রাফিক সোর্স বিশ্লেষণ</span>
          <span class="sub">কোথা থেকে ভিজিটর আসছে</span>
        </div>
        <div style="position: relative; height: 260px; display:flex; align-items:center; justify-content:center;">
          <canvas id="source-chart"></canvas>
        </div>
        <div id="source-legend" style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; justify-content:center;"></div>
      </div>

      <!-- Page Time Bar Chart -->
      <div class="card">
        <div class="card-title">
          <span>&#9201; পেজ টাইম বিশ্লেষণ</span>
          <span class="sub">গড় সময় (সেকেন্ড)</span>
        </div>
        <div style="position: relative; height: 300px;">
          <canvas id="pagetime-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- ══════ TRAFFIC SOURCE TABLE + UTM CAMPAIGNS ══════ -->
    <div class="source-analytics-grid" style="margin-bottom: 32px;">
      <!-- Traffic Source Table (detailed) -->
      <div class="card">
        <div class="card-title">&#128225; সোর্স ডিটেইলস (সর্বকালীন)</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>সোর্স / প্ল্যাটফর্ম</th>
                <th>ভিজিট সংখ্যা</th>
                <th>শেয়ার</th>
              </tr>
            </thead>
            <tbody id="source-table">
              <tr><td colspan="3" style="text-align:center; color:var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- UTM Campaigns Table -->
      <div class="card">
        <div class="card-title">&#127919; UTM ক্যাম্পেইন ট্র্যাকিং</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ক্যাম্পেইন</th>
                <th>মিডিয়াম</th>
                <th>ভিজিট</th>
              </tr>
            </thead>
            <tbody id="utm-table">
              <tr><td colspan="3" style="text-align:center; color:var(--text-muted);">কোনো UTM ডাটা নেই</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Bottom Tables Row -->
    <div class="bottom-grid">
      <!-- Top Visited Pages with time -->
      <div class="card">
        <div class="card-title">&#128273; সর্বাধিক ভিউ হওয়া পেজসমূহ</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>পেজের নাম</th>
                <th>মোট ভিউ</th>
              </tr>
            </thead>
            <tbody id="top-pages-table">
              <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Page Time Detail Table -->
      <div class="card">
        <div class="card-title">&#8987; পেজ অনুযায়ী গড় সময়</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>পেজ</th>
                <th>গড় সময়</th>
                <th>সেশন</th>
              </tr>
            </thead>
            <tbody id="page-time-table">
              <tr><td colspan="3" style="text-align:center; color:var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top WhatsApp Click Pages -->
      <div class="card">
        <div class="card-title">&#128172; হোয়াটসঅ্যাপ ক্লিক উৎস পেজ</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>উৎস পেজ</th>
                <th>ক্লিক সংখ্যা</th>
              </tr>
            </thead>
            <tbody id="top-wa-table">
              <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top Visitor Regions -->
      <div class="card">
        <div class="card-title">&#127757; প্রধান ভিজিটর অঞ্চলসমূহ</div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>দেশ ও শহর</th>
                <th>ইভেন্ট সংখ্যা</th>
              </tr>
            </thead>
            <tbody id="top-regions-table">
              <tr>
                <td colspan="2" style="text-align: center; color: var(--text-muted);">কোনো ডাটা পাওয়া যায়নি</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>'''

content = content.replace(html_old, html_new)

# JS variables update
js_vars_old = '''    let supabaseClient = null;
    let authPassword = null;
    let trafficChart = null;'''
js_vars_new = '''    let supabaseClient = null;
    let authPassword = null;
    let trafficChart = null;
    let sourceChart = null;
    let pageTimeChart = null;

    // Source icons & colors
    const SOURCE_META = {
      facebook:  { icon: '&#128309;', color: '#4e9af7', label: 'Facebook' },
      youtube:   { icon: '&#128308;', color: '#ff5252', label: 'YouTube' },
      linkedin:  { icon: '&#128312;', color: '#4dabef', label: 'LinkedIn' },
      instagram: { icon: '&#127800;', color: '#f472b6', label: 'Instagram' },
      twitter:   { icon: '&#128038;', color: '#60d0f5', label: 'Twitter/X' },
      x:         { icon: '&#10006;', color: '#60d0f5', label: 'X (Twitter)' },
      google:    { icon: '&#128993;', color: '#7bb5fb', label: 'Google' },
      tiktok:    { icon: '&#127925;', color: '#6dd5d2', label: 'TikTok' },
      direct:    { icon: '&#128279;', color: '#94a3b8', label: 'Direct' },
      bing:      { icon: '&#128269;', color: '#48b5e8', label: 'Bing' },
      other:     { icon: '&#127760;', color: '#e5b95c', label: 'অন্যান্য' },
    };'''
content = content.replace(js_vars_old, js_vars_new)

# Update startLivePresenceTracking table rendering
presence_old = '''            activeUsersList.forEach(user => {
              const tr = document.createElement("tr");
              const pageClass = user.page === "home" ? "page-tag home" : "page-tag";
              tr.innerHTML = `
                <td>📍 ${user.city || "Unknown"}, ${user.country || "Unknown"}</td>
                <td><span class="pulse-dot-mini"></span><span class="${pageClass}">${user.page || "home"}</span></td>
              `;
              tbody.appendChild(tr);
            });'''
presence_new = '''            activeUsersList.forEach(user => {
              const tr = document.createElement("tr");
              const pageClass = user.page === "home" ? "page-tag home" : "page-tag";
              const srcMeta = (typeof SOURCE_META !== 'undefined' && SOURCE_META[user.referrer_source]) 
                ? SOURCE_META[user.referrer_source] 
                : { icon: '&#128279;', label: user.referrer_source || 'direct' };
              tr.innerHTML = `
                <td>&#128205; ${user.city || "Unknown"}, ${user.country || "Unknown"}</td>
                <td><span class="pulse-dot-mini"></span><span class="${pageClass}">${user.page || "home"}</span></td>
                <td><span class="source-badge ${user.referrer_source || 'direct'}">${srcMeta.icon} ${srcMeta.label}</span></td>
              `;
              tbody.appendChild(tr);
            });'''
content = content.replace(presence_old, presence_new)
content = content.replace('<th>সক্রিয় পেজ</th>', '<th>সক্রিয় পেজ</th>\n                <th>সোর্স</th>')
content = content.replace('colspan="2" style="text-align: center; color: var(--text-muted); padding: 20px 0;">বর্তমানে কোনো ভিজিটর সক্রিয় নেই', 'colspan="3" style="text-align: center; color: var(--text-muted); padding: 20px 0;">বর্তমানে কোনো ভিজিটর সক্রিয় নেই')


# Add the new rendering functions to JS
new_js_render_functions = """
    // ── Traffic Source Doughnut Chart ──────────────────────────────────────────
    function renderSourceChart(sources) {
      const canvas = document.getElementById("source-chart");
      const ctx = canvas.getContext("2d");

      const labels = [];
      const values = [];
      const colors = [];

      if (!sources || sources.length === 0) {
        sources = [{ source: 'direct', count: 1 }];
      }

      sources.forEach(s => {
        const meta = SOURCE_META[s.source] || SOURCE_META.other;
        labels.push(meta.label);
        values.push(Number(s.count));
        colors.push(meta.color);
      });

      // Render legend
      const legendEl = document.getElementById("source-legend");
      legendEl.innerHTML = "";
      const total = values.reduce((a, b) => a + b, 0);
      labels.forEach((lbl, i) => {
        const pct = total > 0 ? ((values[i] / total) * 100).toFixed(1) : 0;
        const src = (sources[i] || {}).source || 'other';
        const meta = SOURCE_META[src] || SOURCE_META.other;
        legendEl.innerHTML += `
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;margin-bottom:4px;">
            <div style="width:10px;height:10px;border-radius:50%;background:${colors[i]};flex-shrink:0;"></div>
            <span class="source-badge ${src}">${meta.icon} ${lbl}</span>
            <span style="color:var(--text-muted);">${values[i].toLocaleString('bn-BD')} (${pct}%)</span>
          </div>`;
      });

      if (sourceChart) {
        sourceChart.data.labels = labels;
        sourceChart.data.datasets[0].data = values;
        sourceChart.data.datasets[0].backgroundColor = colors;
        sourceChart.update();
        return;
      }

      sourceChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: colors,
            borderColor: 'rgba(6, 11, 19, 0.8)',
            borderWidth: 3,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '65%',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = ((ctx.raw / total) * 100).toFixed(1);
                  return ` ${ctx.label}: ${ctx.raw.toLocaleString('bn-BD')} (${pct}%)`;
                }
              }
            }
          }
        }
      });
    }

    // ── Source Detail Table ────────────────────────────────────────────────────
    function renderSourceTable(sources) {
      const tbody = document.getElementById("source-table");
      tbody.innerHTML = "";
      if (!sources || sources.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:12px;">কোনো ডাটা পাওয়া যায়নি</td></tr>`;
        return;
      }
      const total = sources.reduce((s, r) => s + Number(r.count), 0);
      sources.forEach(s => {
        const meta = SOURCE_META[s.source] || SOURCE_META.other;
        const pct = total > 0 ? ((Number(s.count) / total) * 100).toFixed(1) : 0;
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><span class="source-badge ${s.source}">${meta.icon} ${meta.label}</span></td>
          <td style="font-weight:700;">${Number(s.count).toLocaleString('bn-BD')}</td>
          <td>
            <div class="time-bar-wrap">
              <div class="time-bar-track"><div class="time-bar-fill" style="width:${pct}%; background:${meta.color};"></div></div>
              <span class="time-bar-label" style="color:${meta.color};">${pct}%</span>
            </div>
          </td>`;
        tbody.appendChild(tr);
      });
    }

    // ── Page Time Bar Chart ────────────────────────────────────────────────────
    function renderPageTimeChart(pageStats) {
      const canvas = document.getElementById("pagetime-chart");
      const ctx = canvas.getContext("2d");

      if (!pageStats || pageStats.length === 0) {
        if (pageTimeChart) {
          pageTimeChart.data.labels = [];
          pageTimeChart.data.datasets[0].data = [];
          pageTimeChart.update();
        }
        return;
      }

      const labels = pageStats.map(p => p.page);
      const avgSeconds = pageStats.map(p => Number(p.avg_seconds) || 0);
      const barColors = labels.map((_, i) => {
        const hue = (i * 47 + 200) % 360;
        return `hsla(${hue}, 70%, 60%, 0.85)`;
      });

      if (pageTimeChart) {
        pageTimeChart.data.labels = labels;
        pageTimeChart.data.datasets[0].data = avgSeconds;
        pageTimeChart.data.datasets[0].backgroundColor = barColors;
        pageTimeChart.update();
        return;
      }

      pageTimeChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'গড় সময় (সেকেন্ড)',
            data: avgSeconds,
            backgroundColor: barColors,
            borderRadius: 8,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  const s = ctx.raw;
                  const m = Math.floor(s / 60);
                  const sec = s % 60;
                  return m > 0 ? ` ${m} মিনিট ${sec} সেকেন্ড` : ` ${sec} সেকেন্ড`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255,255,255,0.04)' },
              ticks: { color: '#94a3b8', callback: v => `${v}s` }
            },
            y: {
              grid: { display: false },
              ticks: { color: '#e2e8f0', font: { family: 'Outfit, Hind Siliguri' } }
            }
          }
        }
      });
    }

    // ── Page Time Detail Table ─────────────────────────────────────────────────
    function renderPageTimeTable(pageStats) {
      const tbody = document.getElementById("page-time-table");
      tbody.innerHTML = "";
      if (!pageStats || pageStats.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:12px;">কোনো ডাটা পাওয়া যায়নি</td></tr>`;
        return;
      }
      const maxSec = Math.max(...pageStats.map(p => Number(p.avg_seconds) || 0), 1);
      pageStats.forEach(p => {
        const s = Number(p.avg_seconds) || 0;
        const m = Math.floor(s / 60);
        const sec = s % 60;
        const label = m > 0 ? `${m}m ${sec}s` : `${s}s`;
        const pct = ((s / maxSec) * 100).toFixed(0);
        const pageClass = p.page === 'home' ? 'page-tag home' : 'page-tag';
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><span class="${pageClass}">${p.page}</span></td>
          <td>
            <div class="time-bar-wrap">
              <div class="time-bar-track"><div class="time-bar-fill" style="width:${pct}%;"></div></div>
              <span class="time-bar-label">${label}</span>
            </div>
          </td>
          <td style="color:var(--text-muted); font-size:12px;">${Number(p.sessions).toLocaleString('bn-BD')} সেশন</td>`;
        tbody.appendChild(tr);
      });
    }

    // ── UTM Campaigns Table ────────────────────────────────────────────────────
    function renderUtmTable(campaigns) {
      const tbody = document.getElementById("utm-table");
      tbody.innerHTML = "";
      if (!campaigns || campaigns.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:12px;">কোনো UTM ক্যাম্পেইন ডাটা নেই</td></tr>`;
        return;
      }
      campaigns.forEach(c => {
        const tr = document.createElement("tr");
        const srcMeta = SOURCE_META[c.utm_source] || SOURCE_META.other;
        tr.innerHTML = `
          <td style="font-weight:600;">${c.utm_campaign || '&mdash;'}</td>
          <td><span class="source-badge ${c.utm_source || 'other'}">${srcMeta.icon} ${c.utm_medium || c.utm_source || '&mdash;'}</span></td>
          <td style="font-weight:700;">${Number(c.visits).toLocaleString('bn-BD')}</td>`;
        tbody.appendChild(tr);
      });
    }
  </script>"""

content = content.replace('  </script>', new_js_render_functions)

# Update renderDashboardData to call new rendering functions and populate top cards
render_data_old = '''    function renderDashboardData(stats) {
      const todayViews = stats.today_views || 0;
      const todayWa = stats.today_wa_clicks || 0;
      const conversion = todayViews > 0 ? ((todayWa / todayViews) * 100).toFixed(1) : "0.0";

      document.getElementById("metric-today-views").textContent = todayViews;
      document.getElementById("metric-today-wa").textContent = todayWa;
      document.getElementById("metric-conversion").textContent = `${conversion}%`;

      // 1. Top Pages Table'''

render_data_new = '''    function renderDashboardData(stats) {
      const todayViews = stats.today_views || 0;
      const todayWa = stats.today_wa_clicks || 0;
      const conversion = todayViews > 0 ? ((todayWa / todayViews) * 100).toFixed(1) : "0.0";

      document.getElementById("metric-today-views").textContent = todayViews;
      document.getElementById("metric-today-wa").textContent = todayWa;
      document.getElementById("metric-conversion").textContent = `${conversion}%`;

      // Top Source Today
      const sourcesToday = stats.traffic_sources_today || [];
      if (sourcesToday.length > 0) {
        const topSrc = sourcesToday[0];
        const meta = SOURCE_META[topSrc.source] || SOURCE_META.other;
        document.getElementById("metric-top-source").innerHTML = `${meta.icon} ${meta.label}`;
      } else {
        document.getElementById("metric-top-source").innerHTML = "&mdash;";
      }

      // Top Page Time Today
      const timeToday = stats.page_time_today || [];
      if (timeToday.length > 0) {
        const topTime = timeToday[0];
        const mins = Math.floor(topTime.avg_seconds / 60);
        const secs = topTime.avg_seconds % 60;
        const tlabel = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        document.getElementById("metric-top-time").innerHTML = `${topTime.page} - ${tlabel}`;
      } else {
        document.getElementById("metric-top-time").innerHTML = "&mdash;";
      }

      // 1. Top Pages Table'''

content = content.replace(render_data_old, render_data_new)

render_data_end_old = '''      // 4. Render 7 Days line chart
      renderChart(stats.daily_traffic || []);
    }'''

render_data_end_new = '''      // 4. Render 7 Days line chart
      renderChart(stats.daily_traffic || []);

      // 5. Traffic Source Doughnut Chart
      renderSourceChart(stats.traffic_sources || []);

      // 6. Source Detail Table
      renderSourceTable(stats.traffic_sources || []);

      // 7. Page Time Bar Chart
      renderPageTimeChart(stats.page_time_stats || []);

      // 8. Page Time Detail Table
      renderPageTimeTable(stats.page_time_stats || []);

      // 9. UTM Campaigns Table
      renderUtmTable(stats.utm_campaigns || []);
    }'''

content = content.replace(render_data_end_old, render_data_end_new)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)
print('Phase 2 completed - Fully Patched')
