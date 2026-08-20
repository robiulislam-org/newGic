/* inline_edit.js - Antigravity Inline Editor for Static Page Sections */

(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminParam = urlParams.get('admin') === '1';
  let adminPwd = sessionStorage.getItem('gic_admin_pwd') || localStorage.getItem('gic_admin_pwd_persist');

  // Check admin access
  const isAdmin = (adminParam && adminPwd) || sessionStorage.getItem('gic_admin') === '1';

  if (!isAdmin && !adminParam) return;

  // If ?admin=1 is requested without existing session, require verification
  if (adminParam && !adminPwd) {
    const entered = prompt('🔐 GIC এডমিন পাসওয়ার্ড দিন:');
    if (!entered) return;
    adminPwd = entered;
    sessionStorage.setItem('gic_admin_pwd', entered);
  }

  // Store admin session flag
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
    const saveBtn = this;
    saveBtn.disabled = true;
    saveBtn.textContent = '⏳ সেভ হচ্ছে...';

    const payload = {};
    document.querySelectorAll('[data-editable="true"]').forEach(el => {
      const id = el.getAttribute('data-editable-id');
      payload[id] = el.innerHTML.trim();
    });

    // Save locally first
    localStorage.setItem('gic_inline_edits', JSON.stringify(payload));

    const pwd = sessionStorage.getItem('gic_admin_pwd') || localStorage.getItem('gic_admin_pwd_persist') || adminPwd || '';

    try {
      const supaUrl = window.GIC_SUPA_URL || "https://abpweawndpnaftkcsdcp.supabase.co";
      const supaKey = window.GIC_SUPA_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicHdlYXduZHBuYWZ0a2NzZGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1Njc1ODMsImV4cCI6MjA5NTE0MzU4M30.B3rV8pp0HL9xYBhGDcJGJD3b1unjtNk1ChB_4_OgW9Y";

      let client = window.db;
      if (!client && window.supabase && typeof window.supabase.createClient === 'function') {
        client = window.supabase.createClient(supaUrl, supaKey);
      }

      if (client && typeof client.rpc === 'function') {
        const { data, error } = await client.rpc('save_site_content', {
          pass_code: pwd,
          p_key: 'inline_edits',
          p_section: 'inline_edits',
          p_data: payload
        });
        if (error || (data && !data.success)) {
          console.warn('RPC save notice:', error || data);
          alert('✅ লোকালি সেভ হয়েছে! (ক্লাউড সেভের জন্য সঠিক পাসওয়ার্ড প্রয়োজন)');
        } else {
          alert('✅ সফলভাবে ক্লাউড ডাটাবেজে সেভ হয়েছে!');
        }
      } else {
        alert('✅ সফলভাবে লোকালি সেভ হয়েছে!');
      }
    } catch(e) {
      console.warn('Save error:', e);
      alert('✅ লোকালি সেভ হয়েছে!');
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = '💾 সব পরিবর্তন সেভ করুন';
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
