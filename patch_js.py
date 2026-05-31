import sys
sys.stdout.reconfigure(encoding='utf-8')

# New JS functions to add before closing </script> tag
new_js = """
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
            <span style="color:var(--text-muted);">${values[i].toLocaleString()} (${pct}%)</span>
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
                  return ` ${ctx.label}: ${ctx.raw.toLocaleString()} (${pct}%)`;
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
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:12px;">No data yet</td></tr>`;
        return;
      }
      const total = sources.reduce((s, r) => s + Number(r.count), 0);
      sources.forEach(s => {
        const meta = SOURCE_META[s.source] || SOURCE_META.other;
        const pct = total > 0 ? ((Number(s.count) / total) * 100).toFixed(1) : 0;
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td><span class="source-badge ${s.source}">${meta.icon} ${meta.label}</span></td>
          <td style="font-weight:700;">${Number(s.count).toLocaleString()}</td>
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
            label: 'Avg Time (seconds)',
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
                  return m > 0 ? ` ${m}m ${sec}s` : ` ${sec}s`;
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
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:12px;">No data yet</td></tr>`;
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
          <td style="color:var(--text-muted); font-size:12px;">${Number(p.sessions).toLocaleString()} sessions</td>`;
        tbody.appendChild(tr);
      });
    }

    // ── UTM Campaigns Table ────────────────────────────────────────────────────
    function renderUtmTable(campaigns) {
      const tbody = document.getElementById("utm-table");
      tbody.innerHTML = "";
      if (!campaigns || campaigns.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:12px;">No UTM campaign data</td></tr>`;
        return;
      }
      campaigns.forEach(c => {
        const tr = document.createElement("tr");
        const srcMeta = SOURCE_META[c.utm_source] || SOURCE_META.other;
        tr.innerHTML = `
          <td style="font-weight:600;">${c.utm_campaign || '&mdash;'}</td>
          <td><span class="source-badge ${c.utm_source || 'other'}">${srcMeta.icon} ${c.utm_medium || c.utm_source || '&mdash;'}</span></td>
          <td style="font-weight:700;">${Number(c.visits).toLocaleString()}</td>`;
        tbody.appendChild(tr);
      });
    }
"""

with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the closing </script> tag near the end
close_tag = '  </script>'
idx = content.rfind(close_tag)  # last occurrence

if idx == -1:
    print("ERROR: Could not find </script> tag")
else:
    new_content = content[:idx] + new_js + content[idx:]
    with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('SUCCESS. New file length:', len(new_content))
