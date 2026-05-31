import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('d:/GIC website/dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update live users table header to include source column
old_th = """              <tr>
                <th>অঞ্চল / শহর</th>
                <th>সক্রিয় পেজ</th>
              </tr>"""
new_th = """              <tr>
                <th>অঞ্চল / শহর</th>
                <th>সক্রিয় পেজ</th>
                <th>সোর্স</th>
              </tr>"""

if old_th in content:
    content = content.replace(old_th, new_th, 1)
    print("Live table header updated")
else:
    print("WARNING: live table header not found")

# 2. Update live user row rendering to show source
old_row = """              tr.innerHTML = `
                <td>📍 ${user.city || "Unknown"}, ${user.country || "Unknown"}</td>
                <td><span class="pulse-dot-mini"></span><span class="${pageClass}">${user.page || "home"}</span></td>
              `;"""
new_row = """              const srcMeta = (typeof SOURCE_META !== 'undefined' && SOURCE_META[user.referrer_source]) 
                ? SOURCE_META[user.referrer_source] 
                : { icon: '🔗', label: user.referrer_source || 'direct' };
              tr.innerHTML = `
                <td>📍 ${user.city || "Unknown"}, ${user.country || "Unknown"}</td>
                <td><span class="pulse-dot-mini"></span><span class="${pageClass}">${user.page || "home"}</span></td>
                <td><span class="source-badge ${user.referrer_source || 'direct'}">${srcMeta.icon} ${srcMeta.label}</span></td>
              `;"""

if old_row in content:
    content = content.replace(old_row, new_row, 1)
    print("Live user row updated")
else:
    print("WARNING: live user row not found, trying alternate...")
    # Try without exact whitespace
    idx = content.find('tr.innerHTML = `\r\n                <td>📍 ${user.city')
    if idx >= 0:
        print(f"Found at idx {idx}")
    else:
        print("Still not found - will skip this patch")

# 3. Also update the no-visitor colspan 
old_no = 'colspan="2" style="text-align: center; color: var(--text-muted); padding: 20px 0;">বর্তমানে কোনো ভিজিটর সক্রিয় নেই'
new_no = 'colspan="3" style="text-align: center; color: var(--text-muted); padding: 20px 0;">বর্তমানে কোনো ভিজিটর সক্রিয় নেই'
if old_no in content:
    content = content.replace(old_no, new_no, 1)
    print("Colspan updated")

with open('d:/GIC website/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done. File length:", len(content))
