import sys
sys.stdout.reconfigure(encoding='utf-8')

# Patch renderDashboardData to call new render functions
with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_render_end = """      // 4. Render 7 Days line chart
      renderChart(stats.daily_traffic || []);
    }"""

new_render_end = """      // 4. Render 7 Days line chart
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
    }"""

if old_render_end in content:
    content = content.replace(old_render_end, new_render_end, 1)
    print("renderDashboardData patched OK")
else:
    print("WARNING: renderDashboardData target not found")

# Also patch top source and page time metrics
old_metrics = """      document.getElementById("metric-today-views").textContent = todayViews;
      document.getElementById("metric-today-wa").textContent = todayWa;
      document.getElementById("metric-conversion").textContent = `${conversion}%`;

      // 1. Top Pages Table"""

new_metrics = """      document.getElementById("metric-today-views").textContent = todayViews;
      document.getElementById("metric-today-wa").textContent = todayWa;
      document.getElementById("metric-conversion").textContent = `${conversion}%`;

      // Top Source Today
      const sourcesToday = stats.traffic_sources_today || [];
      if (sourcesToday.length > 0) {
        const topSrc = sourcesToday[0];
        const meta = SOURCE_META[topSrc.source] || SOURCE_META.other;
        document.getElementById("metric-top-source").textContent = `${meta.icon} ${meta.label}`;
      } else {
        document.getElementById("metric-top-source").textContent = "No data";
      }

      // Top Page Time Today
      const timeToday = stats.page_time_today || [];
      if (timeToday.length > 0) {
        const topTime = timeToday[0];
        const mins = Math.floor(topTime.avg_seconds / 60);
        const secs = topTime.avg_seconds % 60;
        const tlabel = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        document.getElementById("metric-top-time").textContent = `${topTime.page} - ${tlabel}`;
      } else {
        document.getElementById("metric-top-time").textContent = "No data";
      }

      // 1. Top Pages Table"""

if old_metrics in content:
    content = content.replace(old_metrics, new_metrics, 1)
    print("metrics section patched OK")
else:
    print("WARNING: metrics section not found")

with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. File length:", len(content))
