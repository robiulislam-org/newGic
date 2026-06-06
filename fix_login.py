
import re

with open('dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''async function attemptLogin(pwd) {
  try {
    const { data, error } = await db.rpc("get_analytics_summary", { pass_code: pwd });
    if (error) throw error;
    if (data) {
      authPwd = pwd;
      sessionStorage.setItem("gic_admin_pwd", pwd);
      showDashboard(data);
      return true;
    }
  } catch(e) {
    console.error("Login failed:", e);
    sessionStorage.removeItem("gic_admin_pwd");
  }
  return false;
}'''

new = '''async function attemptLogin(pwd) {
  var btn = document.querySelector('#login-form button[type=submit]');
  var errEl = document.getElementById('login-err');
  function resetBtn() { if (btn) { btn.textContent = '\ud83d\udd10 \u09aa\u09cd\u09b0\u09ac\u09c7\u09b6 \u0995\u09b0\u09c1\u09a8'; btn.disabled = false; } }
  function showErr(msg) { if (errEl) { errEl.textContent = msg; errEl.style.display='block'; setTimeout(function(){ errEl.style.display='none'; }, 5000); } }
  if (btn) { btn.textContent = '\u23f3 \u09af\u09be\u099a\u09be\u0987 \u0995\u09b0\u099b\u09bf...'; btn.disabled = true; }
  try {
    // Step 1: Fast password-only check
    var authRes = await db.rpc('get_admin_auth', { pass_code: pwd });
    if (authRes.error) {
      // Fallback: get_admin_auth not yet in Supabase, use analytics RPC directly
      console.warn('get_admin_auth not found, using fallback login');
      var fb = await db.rpc('get_analytics_summary', { pass_code: pwd });
      if (fb.error) { showErr('\u274c \u09ad\u09c1\u09b2 \u09aa\u09be\u09b8\u09cb\u09df\u09be\u09b0\u09cd\u09a1! \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u0964'); resetBtn(); sessionStorage.removeItem('gic_admin_pwd'); return false; }
      authPwd = pwd; sessionStorage.setItem('gic_admin_pwd', pwd);
      showDashboard(fb.data || {}); if (fb.data) processData(fb.data); initLivePresence();
      resetBtn(); return true;
    }
    if (!authRes.data) { showErr('\u274c \u09ad\u09c1\u09b2 \u09aa\u09be\u09b8\u09cb\u09df\u09be\u09b0\u09cd\u09a1! \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u0964'); resetBtn(); sessionStorage.removeItem('gic_admin_pwd'); return false; }
    // Step 2: Password correct - show dashboard immediately
    authPwd = pwd; sessionStorage.setItem('gic_admin_pwd', pwd);
    showDashboard({});
    // Load analytics data in background
    var aRes = await db.rpc('get_analytics_summary', { pass_code: pwd });
    if (!aRes.error && aRes.data) { processData(aRes.data); initLivePresence(); }
    else { console.warn('Analytics load issue (non-fatal):', aRes.error); }
    resetBtn(); return true;
  } catch(e) {
    console.error('Login error:', e);
    var msg = (e.message && e.message.includes('Unauthorized')) ? '\u274c \u09ad\u09c1\u09b2 \u09aa\u09be\u09b8\u09cb\u09df\u09be\u09b0\u09cd\u09a1!' : '\u26a0\ufe0f \u09b8\u0982\u09af\u09cb\u0997 \u09b8\u09ae\u09b8\u09cd\u09af\u09be\u0964 \u0987\u09a8\u09cd\u099f\u09be\u09b0\u09a8\u09c7\u099f \u099a\u09c7\u0995 \u0995\u09b0\u09c1\u09a8\u0964';
    showErr(msg); resetBtn(); sessionStorage.removeItem('gic_admin_pwd');
  }
  return false;
}'''

if old in content:
    content = content.replace(old, new)
    with open('dashboard.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'SUCCESS: attemptLogin replaced. Size: {len(content)}')
else:
    print('ERROR: old text not found')
    # Try to find it with normalized whitespace
    idx = content.find('async function attemptLogin(pwd)')
    print(f'Function found at index: {idx}')
    if idx >= 0:
        print(repr(content[idx:idx+200]))
