import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the two sets of duplicate functions and remove the first one
# The first set is between "function renderSourceChart" (line ~1055) and the second set at line ~1282
# Strategy: find all occurrences and remove up to the second set

first_start_marker = '\n    // -- Traffic Source Doughnut Chart'
second_start_marker = '\n    // ── Traffic Source Doughnut Chart'

# Find second set start
idx_second = content.find(second_start_marker)
if idx_second == -1:
    second_start_marker = '\n    // Traffic Source Doughnut Chart'
    idx_second = content.find(second_start_marker)

# Find the end of the first renderUtmTable function (just before second set)
# Actually, let's search for the first occurrence of "function renderSourceChart"
idx_first = content.find('\n    function renderSourceChart(sources) {')
idx_second_func = content.find('\n    function renderSourceChart(sources) {', idx_first + 100)

if idx_second_func > 0:
    # Remove content from first to just before second set
    # Find what precedes the first set to know how to cut
    # Look for the end of renderChart function just before
    end_of_render_chart = content.rfind('    }', 0, idx_first)
    
    # Cut from after end_of_render_chart to before second set
    content = content[:end_of_render_chart+5] + '\n' + content[idx_second_func:]
    print(f"Removed duplicate. Removed chars from {end_of_render_chart+5} to {idx_second_func}")
else:
    print("No duplicates found or already clean")

with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. File length:", len(content))
