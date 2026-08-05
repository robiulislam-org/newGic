import sys
sys.stdout.reconfigure(encoding='utf-8')

new_section = """    <!-- TRAFFIC SOURCE AND PAGE TIME SECTION -->
    <div class="source-analytics-grid">
      <div class="card">
        <div class="card-title">
          <span>&#127760; Traffic Source Analysis</span>
          <span class="sub">Where visitors are coming from</span>
        </div>
        <div style="position: relative; height: 260px; display:flex; align-items:center; justify-content:center;">
          <canvas id="source-chart"></canvas>
        </div>
        <div id="source-legend" style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; justify-content:center;"></div>
      </div>
      <div class="card">
        <div class="card-title">
          <span>&#9201; Page Time Analysis</span>
          <span class="sub">Average time on page (seconds)</span>
        </div>
        <div style="position: relative; height: 300px;">
          <canvas id="pagetime-chart"></canvas>
        </div>
      </div>
    </div>
    <div class="source-analytics-grid" style="margin-bottom: 32px;">
      <div class="card">
        <div class="card-title">&#128225; Source Details (All Time)</div>
        <div class="table-container">
          <table>
            <thead><tr><th>Source / Platform</th><th>Visits</th><th>Share</th></tr></thead>
            <tbody id="source-table">
              <tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No data yet</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">&#127919; UTM Campaign Tracking</div>
        <div class="table-container">
          <table>
            <thead><tr><th>Campaign</th><th>Medium</th><th>Visits</th></tr></thead>
            <tbody id="utm-table">
              <tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No UTM data</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Bottom Tables Row -->
    <div class="bottom-grid">
      <div class="card">
        <div class="card-title">&#128273; Top Pages by Views</div>
        <div class="table-container">
          <table>
            <thead><tr><th>Page Name</th><th>Total Views</th></tr></thead>
            <tbody id="top-pages-table">
              <tr><td colspan="2" style="text-align: center; color: var(--text-muted);">No data found</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">&#8987; Average Time per Page</div>
        <div class="table-container">
          <table>
            <thead><tr><th>Page</th><th>Avg Time</th><th>Sessions</th></tr></thead>
            <tbody id="page-time-table">
              <tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No data found</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">&#128172; WhatsApp Click Source Pages</div>
        <div class="table-container">
          <table>
            <thead><tr><th>Source Page</th><th>Clicks</th></tr></thead>
            <tbody id="top-wa-table">
              <tr><td colspan="2" style="text-align: center; color: var(--text-muted);">No data found</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">&#127757; Top Visitor Regions</div>
        <div class="table-container">
          <table>
            <thead><tr><th>Country &amp; City</th><th>Events</th></tr></thead>
            <tbody id="top-regions-table">
              <tr><td colspan="2" style="text-align: center; color: var(--text-muted);">No data found</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>"""

with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the old bottom-grid section
old_marker = '    <!-- Bottom Tables Row -->'
end_marker = '  </div>'

idx_start = content.find(old_marker)
idx_end = content.find(end_marker, idx_start) + len(end_marker)

if idx_start == -1:
    print("ERROR: Could not find marker")
else:
    new_content = content[:idx_start] + new_section + content[idx_end:]
    with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print('SUCCESS. New file length:', len(new_content))
