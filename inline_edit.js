/* inline_edit.js - Antigravity Inline Editor for Static Page Sections */

(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === '1' || sessionStorage.getItem('gic_admin') === '1';

  if (!isAdmin) return;

  // Store original admin status
  sessionStorage.setItem('gic_admin', '1');

  // Add Admin Indicator Ribbon
  const badge = document.createElement('div');
  badge.id = 'gic-admin-indicator';
  badge.innerHTML = `
    <div style="position:fixed;bottom:20px;right:20px;z-index:99999;background:#0f2744;color:#e5b95c;border:2px solid #c8972a;padding:8px 16px;border-radius:30px;font-family:sans-serif;font-size:13px;font-weight:bold;box-shadow:0 4px 20px rgba(0,0,0,0.3);display:flex;align-items:center;gap:8px;">
      <span style="width:8px;height:8px;background:#1a9e5f;border-radius:50%;display:inline-block;"></span>
      এডমিন মোড চালু | Inline Edit Active
      <button id="gic-save-all-btn" style="background:#c8972a;color:#0f2744;border:none;padding:4px 12px;border-radius:20px;font-weight:bold;cursor:pointer;margin-left:8px;">💾 সব পরিবর্তন সেভ করুন</button>
    </div>
  `;
  document.body.appendChild(badge);

  // Inject styles for editable areas
  const style = document.createElement('style');
  style.innerHTML = `
    [data-editable="true"] {
      outline: 2px dashed rgba(200, 151, 42, 0.4) !important;
      outline-offset: 4px;
      transition: outline 0.2s ease;
      cursor: text;
    }
    [data-editable="true"]:hover {
      outline: 2px dashed #c8972a !important;
      background: rgba(200, 151, 42, 0.05);
    }
    [data-editable="true"]:focus {
      outline: 2px solid #1a9e5f !important;
      background: rgba(26, 158, 95, 0.05);
    }
  `;
  document.head.appendChild(style);

  // Enable contenteditable on target elements
  const editables = document.querySelectorAll('[data-editable="true"]');
  editables.forEach((el, index) => {
    el.contentEditable = "true";
    if (!el.getAttribute('data-editable-id')) {
      el.setAttribute('data-editable-id', 'editable-sec-' + index);
    }
  });

  // Save All handler
  document.getElementById('gic-save-all-btn')?.addEventListener('click', async function() {
    const payload = {};
    document.querySelectorAll('[data-editable="true"]').forEach(el => {
      const id = el.getAttribute('data-editable-id');
      payload[id] = el.innerHTML.trim();
    });

    try {
      if (window.db) {
        const { error } = await window.db.from('site_content').upsert({
          key: 'inline_edits',
          section: 'inline_edits',
          data: payload
        });
        if (error) throw error;
      } else {
        localStorage.setItem('gic_inline_edits', JSON.stringify(payload));
      }
      alert('সফলভাবে সেভ হয়েছে!');
    } catch(e) {
      console.warn('Backend save failed, saved locally:', e);
      localStorage.setItem('gic_inline_edits', JSON.stringify(payload));
      alert('লোকালি সেভ হয়েছে!');
    }
  });

  // Restore saved edits if any
  try {
    const saved = localStorage.getItem('gic_inline_edits');
    if (saved) {
      const edits = JSON.parse(saved);
      Object.keys(edits).forEach(id => {
        const el = document.querySelector(`[data-editable-id="${id}"]`);
        if (el) el.innerHTML = edits[id];
      });
    }
  } catch(e) {}
})();
