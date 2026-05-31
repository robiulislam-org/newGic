
// ============================================================
//  GIC MINI COURSES — GAMIFIED INTERACTIVE LEARNING ENGINE v3
// ============================================================

let activeCategory = 'all';

// ============================================================
//  GLOBAL STATE
// ============================================================
let currentCourseId = null;
let currentChapterIndex = 0;
let quizAnswered = false;
let totalXP = parseInt(localStorage.getItem('gic_xp') || '0');
let completedChapters = JSON.parse(localStorage.getItem('gic_completed') || '[]');
let streakCount = parseInt(localStorage.getItem('gic_streak') || '0');
let courseLikes = JSON.parse(localStorage.getItem('gic_likes') || '{}');
let courseComments = JSON.parse(localStorage.getItem('gic_comments') || '{}');
let referralCount = parseInt(localStorage.getItem('gic_referrals') || '0');

// Premium Reader Settings
let viewerFontSize = 100; // in percentage (e.g. 100%)
let viewerDarkMode = false;
let chapterTimerInterval = null;
let secondsRead = 0;
let audioPlaying = false;

// Student Auth & Sync Variables
const gicSupabaseUrl = "https://abpweawndpnaftkcsdcp.supabase.co";
const gicSupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicHdlYXduZHBuYWZ0a2NzZGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1Njc1ODMsImV4cCI6MjA5NTE0MzU4M30.B3rV8pp0HL9xYBhGDcJGJD3b1unjtNk1ChB_4_OgW9Y";
let studentSession = JSON.parse(localStorage.getItem('gic_student_session') || 'null');

// ============================================================
//  STUDENT AUTHENTICATION (SUPABASE)
// ============================================================
function updateAuthUI() {
  const authBar = document.getElementById('student-auth-bar');
  if (!authBar) return;

  if (studentSession && studentSession.student_id) {
    authBar.innerHTML = `
      <div class="student-auth-info">
        <div class="student-avatar">${studentSession.student_id.slice(-2)}</div>
        <div class="student-details">
          <h4>স্টুডেন্ট আইডি: <span style="color:var(--gold);font-family:monospace;">${studentSession.student_id}</span></h4>
          <p>নম্বর: ${studentSession.phone}</p>
        </div>
      </div>
      <button class="btn" style="background: transparent; border: 2px solid #ef4444; color: #ef4444; font-size: 13px; padding: 10px 20px; font-weight: 700; border-radius: 10px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#ef4444'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#ef4444';" onclick="logoutStudent()">লগআউট</button>
    `;
  } else {
    authBar.innerHTML = `
      <div class="student-auth-info">
        <div class="student-avatar" style="background:#e2e8f0;color:#64748b;">?</div>
        <div class="student-details">
          <h4>প্রগ্রেস সেভ করতে লগইন করুন</h4>
          <p style="color:#f97316;">⚠️ লগইন না করলে রিফ্রেশে আপনার অগ্রগতি মুছে যাবে! আপনার স্টুডেন্ট আইডি মনে রাখুন।</p>
        </div>
      </div>
      <button class="btn btn-blue" onclick="openStudentAuth()">লগইন / আইডি তৈরি করুন</button>
    `;
  }
}

function openStudentAuth() {
  document.getElementById('student-auth-modal').classList.add('active');
  document.getElementById('auth-status').innerText = '';
  document.getElementById('auth-phone').value = '';
}

function closeStudentAuth() {
  document.getElementById('student-auth-modal').classList.remove('active');
}

async function submitStudentAuth() {
  const phone = document.getElementById('auth-phone').value.trim();
  const statusEl = document.getElementById('auth-status');
  const loader = document.getElementById('auth-loading');
  const submitBtn = document.getElementById('btn-submit-auth');

  if (!phone || phone.length < 11 || !phone.startsWith('01')) {
    statusEl.className = 'auth-status error';
    statusEl.innerText = 'দয়া করে সঠিক মোবাইল নাম্বার দিন (যেমন: 017...)';
    return;
  }

  statusEl.innerText = '';
  loader.style.display = 'block';
  submitBtn.style.display = 'none';

  // Check referral from URL
  const urlParams = new URLSearchParams(window.location.search);
  const refId = urlParams.get('ref');

  try {
    const response = await fetch(`${gicSupabaseUrl}/rest/v1/rpc/login_or_create_student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      },
      body: JSON.stringify({ p_phone: phone })
    });

    if (!response.ok) throw new Error('Network error');

    const data = await response.json();

    if (data.status === 'success') {
      studentSession = {
        student_id: data.student_id,
        phone: data.phone
      };
      localStorage.setItem('gic_student_session', JSON.stringify(studentSession));

      if (!data.is_new) {
        totalXP = data.xp || 0;
        completedChapters = data.completed_chapters || [];
        streakCount = data.streak || 0;
        localStorage.setItem('gic_xp', totalXP);
        localStorage.setItem('gic_completed', JSON.stringify(completedChapters));
        localStorage.setItem('gic_streak', streakCount);
      }

      // Handle referral bonus
      if (data.is_new && refId && refId !== data.student_id) {
        addXP(50);
        showToast('🎉 রেফারেল বোনাস! আপনি +50 XP পেয়েছেন!');
        // Try to award the referrer too
        awardReferrer(refId);
      }

      statusEl.className = 'auth-status success';
      statusEl.innerText = data.is_new
        ? `✅ নতুন আইডি তৈরি হয়েছে! আপনার আইডি: ${data.student_id} — এটি মনে রাখুন!`
        : '✅ লগইন সফল হয়েছে! আপনার অগ্রগতি লোড হচ্ছে...';

      updateAuthUI();
      renderMiniCourses();

      setTimeout(() => {
        closeStudentAuth();
        loader.style.display = 'none';
        submitBtn.style.display = 'block';
        if (data.is_new) {
          showIdReminderModal(data.student_id);
        }
      }, 2000);
    } else {
      throw new Error(data.message || 'Error');
    }
  } catch (error) {
    statusEl.className = 'auth-status error';
    statusEl.innerText = 'সার্ভার সমস্যা, একটু পর আবার চেষ্টা করুন।';
    loader.style.display = 'none';
    submitBtn.style.display = 'block';
  }
}

function showIdReminderModal(studentId) {
  const m = document.createElement('div');
  m.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:30000;display:flex;align-items:center;justify-content:center;padding:24px;`;
  m.innerHTML = `
    <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:20px;padding:40px;max-width:420px;width:100%;text-align:center;border:2px solid rgba(212,168,67,0.4);">
      <div style="font-size:52px;margin-bottom:16px;">🎉</div>
      <h2 style="color:var(--gold-light);font-size:22px;margin-bottom:12px;">আপনার স্টুডেন্ট আইডি!</h2>
      <div style="background:rgba(212,168,67,0.15);border:2px solid var(--gold);border-radius:12px;padding:20px;margin:16px 0;">
        <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:6px;">আপনার আইডি নম্বর</div>
        <div style="font-size:32px;font-weight:900;color:var(--gold);font-family:monospace;letter-spacing:4px;">${studentId}</div>
      </div>
      <p style="color:rgba(255,255,255,0.8);font-size:14px;line-height:1.7;margin-bottom:20px;">⚠️ এই আইডি নম্বরটি <strong style="color:#f97316;">অবশ্যই মনে রাখুন বা লিখে রাখুন।</strong> পরের বার লগইন করতে আপনার ফোন নম্বর ব্যবহার করুন।</p>
      <button onclick="this.closest('[style*=fixed]').remove();" style="background:linear-gradient(135deg,var(--gold),#f59e0b);color:#000;padding:14px 32px;border-radius:10px;border:none;font-size:16px;font-weight:700;cursor:pointer;width:100%;">✅ বুঝেছি, শুরু করি!</button>
    </div>
  `;
  document.body.appendChild(m);
}

async function awardReferrer(referrerId) {
  try {
    await fetch(`${gicSupabaseUrl}/rest/v1/rpc/award_referral_xp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      },
      body: JSON.stringify({ p_referrer_id: referrerId, p_xp_bonus: 50 })
    });
  } catch (e) { /* silent */ }
}

function logoutStudent() {
  studentSession = null;
  localStorage.removeItem('gic_student_session');
  
  // Reset local student progress state
  totalXP = 0;
  completedChapters = [];
  streakCount = 0;
  courseLikes = {};
  
  localStorage.removeItem('gic_xp');
  localStorage.removeItem('gic_completed');
  localStorage.removeItem('gic_streak');
  localStorage.removeItem('gic_likes');
  localStorage.removeItem('gic_comments');
  localStorage.removeItem('gic_last_visit');

  updateAuthUI();
  renderMiniCourses();
}

async function syncProgressToSupabase() {
  if (!studentSession || !studentSession.student_id) return;
  try {
    await fetch(`${gicSupabaseUrl}/rest/v1/rpc/sync_student_progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      },
      body: JSON.stringify({
        p_student_id: studentSession.student_id,
        p_xp: totalXP,
        p_completed: completedChapters,
        p_streak: streakCount,
        p_last_visit: localStorage.getItem('gic_last_visit') || ''
      })
    });
  } catch (e) {
    console.error('Failed to sync progress:', e);
  }
}

// Check referral on page load
(function checkReferral() {
  const urlParams = new URLSearchParams(window.location.search);
  const refId = urlParams.get('ref');
  if (refId) {
    localStorage.setItem('gic_pending_referral', refId);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});

// ============================================================
//  RENDER COURSE GRID
// ============================================================
// ============================================================
//  RENDER COURSE GRID
// ============================================================
function renderCategoryFilter() {
  const tabContainer = document.getElementById('category-tabs-container');
  if (!tabContainer) return;

  if (tabContainer.children.length > 0) {
    const buttons = tabContainer.querySelectorAll('.category-tab-btn');
    buttons.forEach(btn => {
      const cat = btn.getAttribute('data-category');
      btn.classList.toggle('active', cat === activeCategory);
    });
    return;
  }

  tabContainer.innerHTML = '';
  Object.entries(categoriesData).forEach(([key, value]) => {
    const btn = document.createElement('button');
    btn.className = `category-tab-btn ${key === activeCategory ? 'active' : ''}`;
    btn.setAttribute('data-category', key);
    btn.textContent = value;
    btn.onclick = () => {
      activeCategory = key;
      const buttons = tabContainer.querySelectorAll('.category-tab-btn');
      buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === key));
      renderMiniCourses();
    };
    tabContainer.appendChild(btn);
  });

}

function filterCoursesBySearch() {
  renderMiniCourses();
}

async function loadLeaderboard() {
  const listEl = document.getElementById('leaderboard-list');
  const loadingEl = document.getElementById('leaderboard-loading');
  const rankContainer = document.getElementById('my-rank-container');
  
  if (!listEl || !loadingEl) return;
  
  loadingEl.style.display = 'block';
  listEl.style.display = 'none';
  if (rankContainer) rankContainer.style.display = 'none';
  
  try {
    const response = await fetch(`${gicSupabaseUrl}/rest/v1/students?select=student_id,xp,streak&order=xp.desc&limit=10`, {
      headers: {
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    
    const data = await response.json();
    loadingEl.style.display = 'none';
    listEl.style.display = 'flex';
    listEl.innerHTML = '';
    
    data.forEach((student, idx) => {
      const isMe = studentSession && studentSession.student_id === student.student_id;
      const rank = idx + 1;
      let medal = '';
      if (rank === 1) medal = '🥇';
      else if (rank === 2) medal = '🥈';
      else if (rank === 3) medal = '🥉';
      else medal = `<span style="font-weight:700; color:#5a7a9a;">#${rank}</span>`;
      
      const item = document.createElement('div');
      item.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: ${isMe ? 'rgba(212,168,67,0.12)' : 'var(--cream)'};
        border: ${isMe ? '1.5px solid var(--gold)' : '1px solid var(--border)'};
        padding: 14px 18px;
        border-radius: 14px;
        font-family: var(--font-body);
        transition: all 0.2s;
        box-shadow: ${isMe ? '0 4px 15px rgba(212,168,67,0.15)' : 'none'};
      `;
      
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:36px; text-align:center; font-size:18px;">${medal}</div>
          <div style="width:36px; height:36px; background:${isMe ? 'linear-gradient(135deg,var(--gold),#f59e0b)' : 'linear-gradient(135deg,var(--blue-dark),var(--blue))'}; border-radius:50%; display:flex; align-items:center; justify-content:center; color:${isMe ? '#000' : '#fff'}; font-weight:700; font-size:13px;">
            ${student.student_id.slice(-2)}
          </div>
          <div>
            <div style="font-weight:700; font-size:14.5px; color:var(--text);">${student.student_id} ${isMe ? '<span style="background:var(--gold); color:#000; font-size:10px; padding:2px 6px; border-radius:10px; margin-left:5px; font-weight:bold;">আপনি</span>' : ''}</div>
            <div style="font-size:11px; color:var(--text-muted);">🔥 ${student.streak || 0} দিন স্ট্রিক</div>
          </div>
        </div>
        <div style="font-weight:900; color:var(--blue-dark); font-size:16px;">⚡ ${student.xp} <span style="font-size:11px; font-weight:600; color:var(--text-muted);">XP</span></div>
      `;
      listEl.appendChild(item);
    });
    
    // Show my rank if logged in
    if (studentSession && studentSession.student_id && rankContainer) {
      const myRankResponse = await fetch(`${gicSupabaseUrl}/rest/v1/students?student_id=eq.${studentSession.student_id}&select=xp,streak`, {
        headers: {
          'apikey': gicSupabaseKey,
          'Authorization': `Bearer ${gicSupabaseKey}`
        }
      });
      if (myRankResponse.ok) {
        const myData = await myRankResponse.json();
        if (myData && myData.length > 0) {
          // Calculate rank by counting rows with XP greater than mine
          const countResponse = await fetch(`${gicSupabaseUrl}/rest/v1/students?xp=gt.${myData[0].xp}&select=id`, {
            method: 'HEAD',
            headers: {
              'Prefer': 'count=exact',
              'apikey': gicSupabaseKey,
              'Authorization': `Bearer ${gicSupabaseKey}`
            }
          });
          const totalAbove = countResponse.headers.get('content-range')?.split('/')[1] || '0';
          const myRank = parseInt(totalAbove) + 1;
          
          rankContainer.style.display = 'block';
          rankContainer.innerHTML = `
            <div style="background:rgba(26,95,158,0.06); padding:16px; border-radius:14px; border:1px dashed var(--blue); color:var(--blue-dark); font-weight:700; font-size:14px;">
              🏅 আপনার বর্তমান গ্লোবাল পজিশন: <span style="color:var(--gold); font-size:18px; font-weight:900;">#${myRank}</span>
              <div style="font-size:12px; color:var(--text-muted); font-weight:600; margin-top:4px;">আপনার মোট XP: ${myData[0].xp} | স্ট্রিক: ${myData[0].streak} দিন</div>
            </div>
          `;
        }
      }
    }
  } catch (err) {
    loadingEl.style.display = 'none';
    listEl.style.display = 'flex';
    listEl.innerHTML = `
      <div style="text-align:center; padding:32px; color:var(--text-muted);">
        <div style="font-size:40px;">⚠️</div>
        <p style="margin-top:10px;">লিডারবোর্ড লোড করা যায়নি। অনুগ্রহ করে ইন্টারনেট সংযোগ চেক করুন।</p>
      </div>
    `;
  }
}

function renderMiniCourses() {
  const container = document.getElementById('mini-courses-grid');
  const lbSection = document.getElementById('leaderboard-section');
  if (!container || !lbSection) return;

  renderCategoryFilter();

  // Handle Leaderboard tab visibility
  if (activeCategory === 'leaderboard') {
    container.style.display = 'none';
    lbSection.style.display = 'block';
    loadLeaderboard();
    return;
  } else {
    container.style.display = 'grid';
    lbSection.style.display = 'none';
  }

  container.innerHTML = '';

  const searchVal = (document.getElementById('course-search-input')?.value || '').trim().toLowerCase();

  let filteredCourses = activeCategory === 'all'
    ? miniCoursesData
    : miniCoursesData.filter(c => c.category === activeCategory);

  // Client-side search filtering
  if (searchVal) {
    filteredCourses = filteredCourses.filter(c => 
      c.title.toLowerCase().includes(searchVal) || 
      c.tagline.toLowerCase().includes(searchVal) ||
      (c.category && categoriesData[c.category]?.toLowerCase().includes(searchVal))
    );
  }

  if (filteredCourses.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:64px 20px; color:var(--text-muted);">
        <span style="font-size:48px;">🔍</span>
        <h3 style="margin-top:12px; font-weight:700;">কোনো কোর্স পাওয়া যায়নি!</h3>
        <p>অন্য কোনো কিওয়ার্ড দিয়ে সার্চ করে দেখুন।</p>
      </div>
    `;
    return;
  }

  filteredCourses.forEach((course, index) => {
    const delay = (index % 3) * 0.1;
    const completedCount = completedChapters.filter(k => k.startsWith(`${course.id}-`)).length;
    const progress = Math.round((completedCount / course.chapters.length) * 100);
    const isLiked = courseLikes[course.id] || false;
    const commentCount = (globalComments[course.id] || []).length;
    const isCompleted = progress === 100;

    // Upgraded Badges and Metadata
    let badgeText = '';
    let badgeColor = '';
    if (course.id === 1 || course.id === 2 || course.id === 3) {
      badgeText = '🔥 সর্বাধিক পঠিত';
      badgeColor = '#ef4444';
    } else if (course.id === 4 || course.id === 5) {
      badgeText = '🆕 নতুন কোর্স';
      badgeColor = '#10b981';
    } else if (course.chapters.length >= 6) {
      badgeText = '💎 গভীর জ্ঞান';
      badgeColor = '#a78bfa';
    } else {
      badgeText = '👶 সহজ পাঠ';
      badgeColor = '#f59e0b';
    }

    const difficulty = course.chapters.length <= 4 ? '🟢 সহজ' : course.chapters.length <= 6 ? '🟡 মাঝারি' : '🔴 অগ্রসর';
    const realCommentCount = (globalComments[course.id] || []).length;

    const card = document.createElement('div');
    card.className = 'course-card reveal visible';
    card.style.transitionDelay = delay + 's';
    card.style.cssText = `
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    `;
    card.onmouseover = () => {
      card.style.transform = 'translateY(-6px)';
      card.style.boxShadow = '0 12px 30px rgba(212, 168, 67, 0.15)';
      card.style.borderColor = 'rgba(212, 168, 67, 0.4)';
    };
    card.onmouseout = () => {
      card.style.transform = 'none';
      card.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
      card.style.borderColor = 'var(--border)';
    };

    card.innerHTML = `
      <div class="course-head" style="background:linear-gradient(135deg,#0a1628 0%,${course.color || 'var(--blue-dark)'} 100%); padding: 24px 20px; position:relative; overflow:hidden; min-height: 180px; display:flex; flex-direction:column; justify-content:flex-end;">
        <div style="position:absolute; top:0; right:0; width:120px; height:120px; background:rgba(255,255,255,0.04); border-radius:50%; transform:translate(40px,-40px);"></div>
        <div style="position:absolute; bottom:0; left:0; width:80px; height:80px; background:rgba(255,255,255,0.03); border-radius:50%; transform:translate(-20px,20px);"></div>
        
        <!-- Badge -->
        <span style="position:absolute; top:16px; left:16px; background:${badgeColor}; color:#fff; font-size:10px; font-weight:800; padding:4px 10px; border-radius:30px; letter-spacing:0.5px; box-shadow:0 4px 10px rgba(0,0,0,0.2);">${badgeText}</span>
        
        ${isCompleted ? '<div style="position:absolute; top:16px; right:16px; background:rgba(34,197,94,0.2); border:1px solid #22c55e; border-radius:20px; padding:4px 10px; font-size:10.5px; color:#22c55e; font-weight:800; box-shadow:0 4px 10px rgba(0,0,0,0.15);">✅ সম্পন্ন</div>' : ''}
        
        <span class="course-emoji" style="font-size:48px; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35)); margin-bottom:10px;">${course.icon}</span>
        <div class="course-title-text" style="font-size:17.5px; line-height:1.45; font-weight:700; color:#fff;">${course.title}</div>
        <div class="course-tagline" style="color:rgba(255,215,100,0.95); font-size:12.5px; margin-top:5px; font-weight:600;">${course.tagline}</div>
        
        <div style="margin-top:14px; background:rgba(255,255,255,0.18); border-radius:20px; height:6px; overflow:hidden;">
          <div style="background:linear-gradient(90deg,var(--gold),#f59e0b); height:100%; width:${progress}%; border-radius:20px; transition:width 0.5s ease;"></div>
        </div>
        <div style="color:rgba(255,255,255,0.7); font-size:11px; margin-top:6px; font-weight:600;">${completedCount}/${course.chapters.length} পার্ট সম্পন্ন • ${progress}%</div>
      </div>
      <div class="course-body" style="padding: 20px; background:#fff;">
        <div style="display:flex; justify-content:space-between; margin-bottom:14px; font-size:11.5px; color:var(--text-muted); font-weight:700; flex-wrap:wrap; gap:8px;">
          <span style="display:flex; align-items:center; gap:4px; background:var(--cream); padding:5px 10px; border-radius:20px;">⏱️ ${course.duration}</span>
          <span style="display:flex; align-items:center; gap:4px; background:var(--cream); padding:5px 10px; border-radius:20px;">📑 ${course.chapters.length} পার্ট</span>
          <span style="display:flex; align-items:center; gap:4px; background:var(--cream); padding:5px 10px; border-radius:20px;">📊 ${difficulty}</span>
        </div>
        
        <!-- Real Comment Count -->
        ${realCommentCount > 0 ? `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; font-size:12.5px; font-weight:600; color:var(--text-muted); border-bottom:1px dashed var(--border); padding-bottom:12px;">
          <span style="display:flex; align-items:center; gap:6px;">
            💬 <span style="color:var(--blue-dark); font-weight:700;">${realCommentCount}টি মন্তব্য</span>
          </span>
        </div>
        ` : ''}

        <div style="margin-bottom:16px; display:flex; justify-content:center; gap:6px; flex-wrap:wrap;">
          <span style="background:rgba(37,211,102,0.08); color:#1DA851; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700; border:1px solid rgba(37,211,102,0.15);">✓ সম্পূর্ণ ফ্রি</span>

        </div>
        <button onclick="openCourseViewer(${course.id})" class="btn btn-primary btn-full" style="margin-bottom:12px; font-size:15px; padding:14px; font-weight:800; letter-spacing:0.3px; border-radius:12px;">
          ${progress > 0 && progress < 100 ? '▶ চলুন এগিয়ে যাই →' : progress === 100 ? '🔄 পুনরায় পড়ুন' : '🚀 কোর্স শুরু করুন →'}
        </button>
        <!-- Social Bar -->
        <div class="course-social-bar" style="display:flex; align-items:center; gap:8px; padding-top:10px; border-top:1px solid var(--border);">
          <button class="social-btn" onclick="openCommentModal(${course.id})" title="মন্তব্য করুন" style="font-size:11.5px; padding:6px 12px;">
            💬 <span>${commentCount}</span>
          </button>
          <button class="social-btn share-btn" onclick="openShareModal(${course.id})" title="শেয়ার করুন" style="font-size:11.5px; padding:6px 12px; margin-left:auto;">
            📤 শেয়ার
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  renderXPBar();
}

// ============================================================
//  GLOBAL DATA PERSISTENCE (SUPABASE HACK FOR LIKES & COMMENTS)
// ============================================================
const globalDbSessionId = "global_mini_courses_data";
let globalLikes = {};
let globalComments = {};

async function fetchGlobalLikesAndComments() {
  try {
    const response = await fetch(`${gicSupabaseUrl}/rest/v1/students?phone=eq.${globalDbSessionId}`, {
      headers: {
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      }
    });
    
    if (!response.ok) throw new Error('Fetch failed');
    const data = await response.json();
    
    if (data.length === 0) {
      await initializeGlobalDataInSupabase();
    } else {
      const payload = data[0].completed_chapters || {};
      globalLikes = payload.likes || {};
      globalComments = payload.comments || {};
    }
  } catch (err) {
    console.error("Failed to load global likes/comments:", err);
  }
}

async function initializeGlobalDataInSupabase() {
  const initialLikes = {};
  const initialComments = {};
  
  // No fake seed data - start with empty data for authenticity
  miniCoursesData.forEach(c => {
    initialLikes[c.id] = 0;
    initialComments[c.id] = [];
  });
  
  try {
    await fetch(`${gicSupabaseUrl}/rest/v1/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      },
      body: JSON.stringify({
        phone: globalDbSessionId,
        student_id: 'GIC-GLOBAL',
        completed_chapters: { likes: initialLikes, comments: initialComments }
      })
    });
    globalLikes = initialLikes;
    globalComments = initialComments;
  } catch (e) {
    console.error("Failed to initialize global database:", e);
  }
}

async function updateGlobalDataInSupabase() {
  try {
    await fetch(`${gicSupabaseUrl}/rest/v1/students?phone=eq.${globalDbSessionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': gicSupabaseKey,
        'Authorization': `Bearer ${gicSupabaseKey}`
      },
      body: JSON.stringify({
        completed_chapters: { likes: globalLikes, comments: globalComments }
      })
    });
  } catch (err) {
    console.error("Failed to sync global likes/comments:", err);
  }
}

// ============================================================
//  LIKE SYSTEM (Globally Persistent)
// ============================================================
function getLikeCount(courseId) {
  return globalLikes[courseId] !== undefined ? globalLikes[courseId] : 0;
}

async function toggleLike(courseId, btn) {
  const previouslyLiked = courseLikes[courseId] || false;
  courseLikes[courseId] = !previouslyLiked;
  localStorage.setItem('gic_likes', JSON.stringify(courseLikes));

  if (globalLikes[courseId] === undefined) {
    globalLikes[courseId] = 0;
  }

  if (courseLikes[courseId]) {
    globalLikes[courseId]++;
    addXP(2);
    showToast('❤️ লাইক দেওয়ার জন্য ধন্যবাদ! +2 XP');
  } else {
    globalLikes[courseId] = Math.max(0, globalLikes[courseId] - 1);
    showToast('🤍 লাইক প্রত্যাহার করা হয়েছে।');
  }

  // Update button display instantly
  const isLiked = courseLikes[courseId];
  btn.innerHTML = `${isLiked ? '❤️' : '🤍'} <span class="like-count">${getLikeCount(courseId)}</span>`;
  btn.classList.toggle('liked', isLiked);

  // Sync back to Supabase securely
  await updateGlobalDataInSupabase();
}

// ============================================================
//  COMMENT SYSTEM (Globally Persistent & Shared)
// ============================================================
function openCommentModal(courseId) {
  const course = miniCoursesData.find(c => c.id === courseId);
  const modal = document.getElementById('comment-modal');
  if (!modal) return;

  modal.dataset.courseId = courseId;
  document.getElementById('comment-modal-title').textContent = `💬 ${course.title} — মন্তব্য`;
  renderCommentsList(courseId);
  modal.classList.add('active');
}

function closeCommentModal() {
  const modal = document.getElementById('comment-modal');
  if (modal) modal.classList.remove('active');
}

function renderCommentsList(courseId) {
  const comments = globalComments[courseId] || [];
  const list = document.getElementById('comments-list');
  if (!list) return;

  if (comments.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-muted);">
      <div style="font-size:40px;margin-bottom:12px;">💭</div>
      <p>এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
    </div>`;
    return;
  }

  list.innerHTML = comments.map((c, i) => `
    <div class="comment-item" style="background:var(--cream);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid var(--border);">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,var(--blue-dark),var(--blue));border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0;">${c.name.charAt(0).toUpperCase()}</div>
        <div>
          <div style="font-weight:700;font-size:14px;color:var(--text);">${escapeHtml(c.name)}</div>
          <div style="font-size:11px;color:var(--text-muted);">${c.time}</div>
        </div>
        <div style="margin-left:auto;display:flex;gap:4px;">
          ${'⭐'.repeat(c.rating || 5)}
        </div>
      </div>
      <p style="font-size:14px;color:var(--text);line-height:1.7;margin:0;">${escapeHtml(c.text)}</p>
    </div>
  `).reverse().join('');
}

async function submitComment(courseId) {
  const nameEl = document.getElementById('comment-name');
  const textEl = document.getElementById('comment-text');
  const ratingEl = document.getElementById('comment-rating');

  const name = (nameEl && nameEl.value.trim()) || 'পাঠক';
  const text = textEl && textEl.value.trim();
  const rating = (ratingEl && parseInt(ratingEl.value)) || 5;

  if (!text) {
    showToast('⚠️ মন্তব্য লিখুন!', 'warning');
    return;
  }

  if (!globalComments[courseId]) globalComments[courseId] = [];

  const now = new Date();
  const timeStr = now.toLocaleDateString('bn-BD') + ' ' + now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

  globalComments[courseId].push({
    name: name,
    text: text,
    rating: rating,
    time: timeStr,
    id: Date.now()
  });

  if (textEl) textEl.value = '';
  if (nameEl) nameEl.value = '';

  renderCommentsList(courseId);
  addXP(5);
  showToast('✅ মন্তব্য সফলভাবে পোস্ট হয়েছে! +5 XP');

  // Sync to database
  await updateGlobalDataInSupabase();

  // Update comments count on course cards
  renderMiniCourses();
}

// ============================================================
//  SHARE SYSTEM (Stunning Emojis & Formatted Ad Layout)
// ============================================================
function openShareModal(courseId) {
  const cId = courseId || currentCourseId;
  const course = miniCoursesData.find(c => c.id === cId);
  const modal = document.getElementById('share-modal');
  if (!modal) return;

  const shareUrl = window.location.origin + window.location.pathname + '?course=' + cId +
    (studentSession ? '&ref=' + studentSession.student_id : '');
    
  const shareText = `📖 *${course.title}* — সম্পূর্ণ ফ্রি কোর্স (Global Islamic Care)!

🌟 *কোর্সের বৈশিষ্ট্যসমূহ:*
✅ তাজউইদ ও সহীহ উচ্চারণ শিক্ষা
✅ আকর্ষক ও সহজ প্রশ্ন-উত্তর (কুইজ)
✅ অত্যন্ত আধুনিক ও আনন্দদায়ক শিক্ষাপদ্ধতি

✨ নিজেকে ও পরিবারকে আলোকিত করতে আজই ফ্রিতে কোর্সটি শুরু করুন!
👇 সরাসরি নিচে দেওয়া লিংকে ক্লিক করে যুক্ত হোন:`;

  modal.querySelector('#share-wa').href = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
  modal.querySelector('#share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  modal.querySelector('#share-tw').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  modal.querySelector('#share-copy').onclick = () => {
    navigator.clipboard.writeText(shareText + '\n' + shareUrl).then(() => {
      showToast('🔗 লিংক ও বিজ্ঞাপন কপি হয়েছে!');
      addXP(3);
    });
  };

  modal.classList.add('active');
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  if (modal) modal.classList.remove('active');
}

function copyReferral(e, link) {
  e.preventDefault();
  navigator.clipboard.writeText(link).then(() => {
    showToast('🔗 রেফারেল লিংক কপি হয়েছে! বন্ধুদের পাঠান এবং +50 XP জিতুন!');
  });
}

// ============================================================
//  XP BAR
// ============================================================
function renderXPBar() {
  const existing = document.getElementById('gic-xp-header');
  if (existing) existing.remove();

  const bar = document.createElement('div');
  bar.id = 'gic-xp-header';

  const level = Math.floor(totalXP / 100) + 1;
  const levelXP = totalXP % 100;
  const levelNames = ['নতুন শিক্ষার্থী','উৎসাহী পাঠক','জ্ঞান অন্বেষী','বিদ্বান','আলেম','মাস্টার স্কলার'];
  const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)];

  bar.innerHTML = `
    <div style="background:linear-gradient(135deg,#0a1628,#1a5f9e);padding:14px 24px;display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap;border-bottom:1px solid rgba(212,168,67,0.2);">
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:13px;font-weight:700;">
        <span style="font-size:20px;">⚡</span>
        <div>
          <div><span style="color:var(--gold);">${totalXP} XP</span> <span style="color:rgba(255,255,255,0.5);">মোট অর্জন</span></div>
          <div style="background:rgba(255,255,255,0.15);border-radius:10px;height:4px;width:80px;margin-top:3px;overflow:hidden;"><div style="background:var(--gold);height:100%;width:${levelXP}%;transition:width 0.5s;border-radius:10px;"></div></div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:13px;font-weight:700;">
        <span style="font-size:20px;">🏅</span>
        <div><span style="color:#a78bfa;">স্তর ${level}</span> <span style="color:rgba(255,255,255,0.5);">— ${levelName}</span></div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:13px;font-weight:700;">
        <span style="font-size:20px;">🔥</span>
        <span style="color:#f97316;">${streakCount} দিনের স্ট্রিক</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:13px;font-weight:700;">
        <span style="font-size:20px;">✅</span>
        <span style="color:#4ade80;">${completedChapters.length} পার্ট সম্পন্ন</span>
      </div>
    </div>
  `;

  const heroSection = document.querySelector('#page-mini-courses .policy-hero')
    || document.querySelector('#mc-hero')
    || document.querySelector('#page-mini-courses > div:first-child');
  if (heroSection) heroSection.insertAdjacentElement('afterend', bar);
}

// ============================================================
//  OPEN COURSE VIEWER
// ============================================================
function openCourseViewer(courseId) {
  currentCourseId = courseId;
  const course = miniCoursesData.find(c => c.id === courseId);
  if (!course) return;

  const lastChapter = completedChapters.filter(k => k.startsWith(`${courseId}-`)).length;
  currentChapterIndex = Math.min(lastChapter, course.chapters.length - 1);
  quizAnswered = false;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-course-viewer').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.getElementById('cv-course-title').innerText = course.title;

  renderChapterList();
  showChapter(currentChapterIndex);
  updateStreakCount();
  renderCourseEngagementBar(courseId);
}

function closeCourseViewer() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-mini-courses').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderMiniCourses();
}

// ============================================================
//  ENGAGEMENT BAR (like/comment/share inside viewer)
// ============================================================
function renderCourseEngagementBar(courseId) {
  const existing = document.getElementById('cv-engagement-bar');
  if (existing) existing.remove();

  const course = miniCoursesData.find(c => c.id === courseId);
  const isLiked = courseLikes[courseId] || false;
  const commentCount = (globalComments[courseId] || []).length;

  const bar = document.createElement('div');
  bar.id = 'cv-engagement-bar';
  bar.style.cssText = `background:#fff;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:12px 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;position:sticky;top:70px;z-index:100;`;
  bar.innerHTML = `
    <span style="font-size:13px;font-weight:700;color:var(--text-muted);flex:1;">${course.title}</span>
    <button class="social-btn cv-like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLikeInViewer(${courseId}, this)" style="font-size:13px;">
      ${isLiked ? '❤️' : '🤍'} লাইক (${getLikeCount(courseId)})
    </button>
    <button class="social-btn" onclick="openCommentModal(${courseId})" style="font-size:13px;">
      💬 মন্তব্য (${commentCount})
    </button>
    <button class="social-btn share-btn" onclick="openShareModal(${courseId})" style="font-size:13px;">
      📤 শেয়ার করুন
    </button>
  `;

  const viewerEl = document.getElementById('page-course-viewer');
  viewerEl.insertBefore(bar, viewerEl.firstChild);
}

function toggleLikeInViewer(courseId, btn) {
  courseLikes[courseId] = !courseLikes[courseId];
  localStorage.setItem('gic_likes', JSON.stringify(courseLikes));
  const isLiked = courseLikes[courseId];
  btn.innerHTML = `${isLiked ? '❤️' : '🤍'} লাইক (${getLikeCount(courseId)})`;
  btn.classList.toggle('liked', isLiked);
  if (isLiked) { addXP(2); showToast('❤️ লাইক দেওয়ার জন্য ধন্যবাদ! +2 XP'); }
}

// ============================================================
//  CHAPTER LIST
// ============================================================
function renderChapterList() {
  const course = miniCoursesData.find(c => c.id === currentCourseId);
  const listContainer = document.getElementById('cv-chapter-list');
  listContainer.innerHTML = '';

  course.chapters.forEach((chapter, index) => {
    const isCompleted = completedChapters.includes(`${currentCourseId}-${index}`);
    const btn = document.createElement('button');
    btn.className = `cv-chapter-btn ${index === currentChapterIndex ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="cv-ch-num" style="${isCompleted ? 'background:#22c55e;color:#fff;' : ''}">
        ${isCompleted ? '✓' : index + 1}
      </span>
      <span class="cv-ch-title">${chapter.title}</span>
    `;
    btn.onclick = () => showChapter(index);
    listContainer.appendChild(btn);
  });
}

// ============================================================
//  SHOW CHAPTER
// ============================================================
function changeFontSize(amount) {
  viewerFontSize = Math.max(70, Math.min(180, viewerFontSize + amount));
  const el = document.querySelector('.gic-chapter-body');
  if (el) el.style.fontSize = `${viewerFontSize}%`;
  showToast(`📖 ফন্ট সাইজ ${viewerFontSize}% করা হয়েছে!`);
}

function toggleViewerDarkMode() {
  viewerDarkMode = !viewerDarkMode;
  const viewer = document.getElementById('page-course-viewer');
  const btn = document.getElementById('btn-viewer-dark');
  if (viewer) {
    if (viewerDarkMode) {
      viewer.style.background = '#091526';
      viewer.style.color = '#e2e8f0';
      btn.innerHTML = '☀️ লাইট মোড';
      btn.classList.add('liked');
      
      const overridesExist = document.getElementById('dark-mode-viewer-overrides');
      if (!overridesExist) {
        const styles = document.createElement('style');
        styles.id = 'dark-mode-viewer-overrides';
        styles.textContent = `
          #page-course-viewer .cv-sidebar { background:#0c1c30 !important; border-right-color:#1e3552 !important; color:#fff !important; }
          #page-course-viewer .cv-main-content { background:#0d1e33 !important; border-color:#1e3552 !important; box-shadow:none !important; }
          #page-course-viewer .cv-chapter-title { color:#fff !important; }
          #page-course-viewer .cv-course-title { color:#fff !important; }
          #page-course-viewer .gic-chapter-body { color:#e2e8f0 !important; }
          #page-course-viewer .social-btn { background:#162a45 !important; border-color:#2a456c !important; color:#fff !important; }
          #page-course-viewer .cv-chapter-btn { color:#cbd5e1 !important; border-bottom-color:#1e3552 !important; }
          #page-course-viewer .cv-chapter-btn:hover { background:#162a45 !important; }
          #page-course-viewer .cv-chapter-btn.active { background:#1e3552 !important; color:#fff !important; }
          #page-course-viewer blockquote { background:rgba(255,255,255,0.05) !important; border-left-color:var(--gold) !important; color:#e2e8f0 !important; }
          #page-course-viewer blockquote p { color:#e2e8f0 !important; }
        `;
        document.head.appendChild(styles);
      }
    } else {
      viewer.style.background = 'var(--cream)';
      viewer.style.color = 'var(--text)';
      btn.innerHTML = '🌙 ডার্ক মোড';
      btn.classList.remove('liked');
      const el = document.getElementById('dark-mode-viewer-overrides');
      if (el) el.remove();
    }
  }
}

function toggleAudioMockup() {
  audioPlaying = !audioPlaying;
  const btn = document.getElementById('cv-audio-play-btn');
  const status = document.getElementById('cv-audio-status');
  const wave = document.getElementById('cv-audio-wave');
  if (audioPlaying) {
    btn.innerHTML = '⏸️';
    btn.style.background = 'var(--gold)';
    btn.style.color = '#000';
    if (status) status.innerHTML = '🟢 ওস্তাদের তেলাওয়াত চলছে... (ডেমো প্লেয়ার)';
    if (wave) wave.style.display = 'flex';
    showToast('🔊 তেলাওয়াত শুরু হয়েছে! (ডেমো প্লেয়ার)');
  } else {
    btn.innerHTML = '▶️';
    btn.style.background = '#fff';
    btn.style.color = '#000';
    if (status) status.innerHTML = 'অডিও বন্ধ রয়েছে';
    if (wave) wave.style.display = 'none';
    showToast('🔇 তেলাওয়াত বন্ধ করা হয়েছে।');
  }
}

function copyArabicText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 দোয়া সফলভাবে ক্লিপবোর্ডে কপি হয়েছে!');
    addXP(1);
  });
}

function showChapter(index) {
  const course = miniCoursesData.find(c => c.id === currentCourseId);
  if (!course || index < 0 || index >= course.chapters.length) return;

  currentChapterIndex = index;
  quizAnswered = false;
  const chapter = course.chapters[index];

  document.querySelectorAll('.cv-chapter-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  const progressPercent = ((index + 1) / course.chapters.length) * 100;
  document.getElementById('cv-progress-fill').style.width = progressPercent + '%';
  document.getElementById('cv-progress-text').innerText = `পার্ট ${index + 1} / ${course.chapters.length}`;

  const contentEl = document.getElementById('cv-chapter-content');
  const titleEl = document.getElementById('cv-chapter-title');
  titleEl.innerText = chapter.title;

  const wordCount = chapter.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 150));

  contentEl.innerHTML = `
    <!-- Premium Reader Settings Toolbar -->
    <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(26,95,158,0.04); padding:10px 18px; border-radius:12px; margin-bottom:20px; flex-wrap:wrap; gap:10px; border:1px solid var(--border);">
      <div style="display:flex; align-items:center; gap:8px;">
        <button onclick="changeFontSize(10)" class="social-btn" style="padding:6px 12px; font-weight:700; font-size:12px; cursor:pointer;" title="ফন্ট বড় করুন">🔍 A+</button>
        <button onclick="changeFontSize(-10)" class="social-btn" style="padding:6px 12px; font-weight:700; font-size:12px; cursor:pointer;" title="ফন্ট ছোট করুন">🔍 A-</button>
        <button onclick="toggleViewerDarkMode()" id="btn-viewer-dark" class="social-btn ${viewerDarkMode ? 'liked' : ''}" style="padding:6px 12px; font-size:12px; cursor:pointer;" title="ডার্ক মোড টগল">
          ${viewerDarkMode ? '☀️ লাইট মোড' : '🌙 ডার্ক মোড'}
        </button>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span id="cv-reading-timer" style="font-size:12.5px; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:4px;">⏱️ পড়ার সময়: ০ সেকেন্ড</span>
      </div>
    </div>

    <!-- Audio Player Mockup -->
    <div style="background:linear-gradient(135deg,#0a1628,#1e72b8); border-radius:14px; padding:16px; margin-bottom:24px; display:flex; align-items:center; justify-content:space-between; color:#fff; border:1px solid rgba(255,255,255,0.15); box-shadow:0 4px 15px rgba(26,95,158,0.2);">
      <div style="display:flex; align-items:center; gap:12px;">
        <button id="cv-audio-play-btn" onclick="toggleAudioMockup()" style="width:40px; height:40px; background:${audioPlaying ? 'var(--gold)' : '#fff'}; color:#000; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.1)';" onmouseout="this.style.transform='none';">
          ${audioPlaying ? '⏸️' : '▶️'}
        </button>
        <div>
          <div style="font-size:13.5px; font-weight:700; color:#fff;">🔊 অডিও রিডিং সহ পড়ুন (ওস্তাদ তেলাওয়াত)</div>
          <div style="font-size:11px; color:rgba(255,255,255,0.7);" id="cv-audio-status">${audioPlaying ? '🟢 ওস্তাদের তেলাওয়াত চলছে... (ডেমো প্লেয়ার)' : 'অডিও বন্ধ রয়েছে'}</div>
        </div>
      </div>
      <div id="cv-audio-wave" style="display:${audioPlaying ? 'flex' : 'none'}; align-items:center; gap:3px; height:20px;">
        <div style="width:3px; height:80%; background:#fff; border-radius:3px; animation:waveBounce 0.5s ease-in-out infinite alternate;"></div>
        <div style="width:3px; height:50%; background:#fff; border-radius:3px; animation:waveBounce 0.5s ease-in-out infinite 0.1s alternate;"></div>
        <div style="width:3px; height:100%; background:#fff; border-radius:3px; animation:waveBounce 0.5s ease-in-out infinite 0.2s alternate;"></div>
        <div style="width:3px; height:60%; background:#fff; border-radius:3px; animation:waveBounce 0.5s ease-in-out infinite 0.15s alternate;"></div>
      </div>
    </div>

    <!-- Reading meta -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);flex-wrap:wrap;">
      <span style="background:rgba(26,95,158,0.08);color:var(--blue);padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;">⏱️ প্রায় ${readTime} মিনিট</span>
      <span style="background:rgba(212,168,67,0.1);color:var(--gold);padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;">⚡ +10 XP</span>
      <span id="cv-read-badge" style="background:rgba(34,197,94,0.1);color:#22c55e;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;display:none;">✅ সম্পন্ন</span>
      <span style="margin-left:auto;background:rgba(26,95,158,0.06);color:var(--text-muted);padding:5px 12px;border-radius:20px;font-size:12px;">পার্ট ${index + 1} / ${course.chapters.length}</span>
    </div>

    <!-- Fun fact box -->
    <div style="background:linear-gradient(135deg,rgba(212,168,67,0.12),rgba(212,168,67,0.05));border:1px solid rgba(212,168,67,0.3);border-radius:14px;padding:18px;margin-bottom:28px;display:flex;gap:14px;align-items:flex-start;">
      <span style="font-size:28px;flex-shrink:0;">💡</span>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">জানেন কি?</div>
        <div style="font-size:14px;color:var(--text);line-height:1.8;">${chapter.funFact || ''}</div>
      </div>
    </div>

    <!-- Main content -->
    <div class="gic-chapter-body" style="font-size: ${viewerFontSize}%;">${chapter.content}</div>

    <!-- Quiz section -->
    <div id="cv-quiz-section" style="margin-top:36px;background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:18px;padding:28px;color:#fff;box-shadow:0 8px 32px rgba(10,22,40,0.3);">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
        <span style="font-size:32px;">🧠</span>
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,0.5);text-transform:uppercase;font-weight:700;letter-spacing:1px;">দ্রুত কুইজ — জ্ঞান যাচাই করুন</div>
          <div style="font-size:16px;font-weight:700;color:#fff;margin-top:4px;line-height:1.5;">${chapter.quiz.question}</div>
        </div>
      </div>
      <div id="cv-quiz-options" style="display:grid;gap:10px;">
        ${chapter.quiz.options.map((opt, i) => `
          <button onclick="checkAnswer(${i})" id="quiz-opt-${i}" style="background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);border-radius:12px;padding:14px 18px;color:#fff;font-size:14px;font-family:var(--font-body);cursor:pointer;text-align:right;transition:all 0.2s;line-height:1.5;display:flex;align-items:center;justify-content:flex-end;gap:10px;" onmouseover="if(!quizAnswered) this.style.background='rgba(255,255,255,0.15)'" onmouseout="if(!quizAnswered) this.style.background='rgba(255,255,255,0.08)'">
            ${opt}
            <span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:3px 8px;font-size:12px;font-weight:700;flex-shrink:0;">${['ক', 'খ', 'গ', 'ঘ'][i]}</span>
          </button>
        `).join('')}
      </div>
      <div id="cv-quiz-feedback" style="display:none;margin-top:16px;border-radius:12px;padding:16px;"></div>
    </div>

    <!-- Teaser for next part -->
    ${index < course.chapters.length - 1 ? `
    <div id="cv-teaser" style="display:none;margin-top:20px;background:linear-gradient(135deg,rgba(212,168,67,0.1),rgba(26,95,158,0.1));border:1px dashed rgba(212,168,67,0.5);border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:24px;margin-bottom:8px;">🔥</div>
      <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:6px;">পরবর্তী পার্টে আসছে...</div>
      <div style="font-size:14px;color:var(--text);line-height:1.7;">${chapter.teaser || ''}</div>
    </div>
    ` : ''}

    <!-- Nav buttons -->
    <div class="cv-nav-btns" style="margin-top:28px;">
      <button class="btn btn-outline" style="color:var(--text);border-color:var(--border);" id="cv-btn-prev"
        onclick="showChapter(currentChapterIndex - 1)" ${index === 0 ? 'style="display:none"' : ''}>
        ← পূর্ববর্তী
      </button>
      <button class="btn btn-primary" id="cv-btn-next" onclick="showChapter(currentChapterIndex + 1)" disabled style="opacity:0.5;cursor:not-allowed;">
        ${index === course.chapters.length - 1 ? 'কোর্স সমাপ্ত 🏆' : 'পরবর্তী পার্ট →'}
      </button>
    </div>
  `;

  if (index === 0) {
    document.getElementById('cv-btn-prev').style.display = 'none';
  }

  if (completedChapters.includes(`${currentCourseId}-${index}`)) {
    document.getElementById('cv-read-badge').style.display = 'inline-flex';
    enableNextButton();
  }

  // Set real-time reading timer interval
  if (chapterTimerInterval) clearInterval(chapterTimerInterval);
  secondsRead = 0;
  
  chapterTimerInterval = setInterval(() => {
    secondsRead++;
    const tEl = document.getElementById('cv-reading-timer');
    if (tEl) {
      if (secondsRead < 60) {
        tEl.innerText = `⏱️ পড়ার সময়: ${secondsRead} সেকেন্ড`;
      } else {
        const m = Math.floor(secondsRead / 60);
        const s = secondsRead % 60;
        tEl.innerText = `⏱️ পড়ার সময়: ${m} মিনিট ${s} সেকেন্ড`;
      }
    }
  }, 1000);

  // Automatically parse Arabic quotes and inject "📋 দোয়া কপি করুন" buttons
  setTimeout(() => {
    const bqs = document.querySelectorAll('.gic-chapter-body blockquote');
    bqs.forEach(bq => {
      const pAr = bq.querySelector('p[style*="font-family"]');
      if (pAr && !bq.querySelector('.arabic-copy-btn')) {
        const textToCopy = pAr.textContent.trim();
        const copyBtn = document.createElement('button');
        copyBtn.className = 'social-btn arabic-copy-btn';
        copyBtn.style.cssText = 'font-size:11px; margin-top:10px; display:inline-flex; align-items:center; gap:4px; padding:5px 10px; border-radius:15px; cursor:pointer;';
        copyBtn.innerHTML = '📋 দোয়া কপি করুন';
        copyBtn.onclick = () => copyArabicText(textToCopy);
        bq.appendChild(copyBtn);
      }
    });
  }, 120);

  if (window.innerWidth < 900) {
    document.getElementById('cv-main-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ============================================================
//  QUIZ LOGIC
// ============================================================
function checkAnswer(selectedIndex) {
  if (quizAnswered) return;
  quizAnswered = true;

  const course = miniCoursesData.find(c => c.id === currentCourseId);
  const chapter = course.chapters[currentChapterIndex];
  const correct = chapter.quiz.correct;

  const options = document.querySelectorAll('[id^="quiz-opt-"]');
  options.forEach((btn, i) => {
    btn.style.cursor = 'not-allowed';
    if (i === correct) {
      btn.style.background = 'rgba(34,197,94,0.25)';
      btn.style.borderColor = '#22c55e';
      btn.style.transform = 'scale(1.01)';
    } else if (i === selectedIndex && i !== correct) {
      btn.style.background = 'rgba(239,68,68,0.25)';
      btn.style.borderColor = '#ef4444';
    }
  });

  const feedback = document.getElementById('cv-quiz-feedback');
  feedback.style.display = 'block';

  if (selectedIndex === correct) {
    feedback.style.background = 'rgba(34,197,94,0.15)';
    feedback.style.border = '1px solid rgba(34,197,94,0.4)';
    feedback.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:28px;">🎉</span>
        <div>
          <div style="font-weight:700;color:#4ade80;margin-bottom:6px;font-size:16px;">অসাধারণ! একদম সঠিক! +10 XP অর্জন করেছেন!</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.8);line-height:1.8;">${chapter.quiz.explanation}</div>
        </div>
      </div>
    `;
    addXP(10);
    spawnConfetti();
    showPraiseMessage();
  } else {
    feedback.style.background = 'rgba(239,68,68,0.15)';
    feedback.style.border = '1px solid rgba(239,68,68,0.4)';
    feedback.innerHTML = `
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <span style="font-size:28px;">💪</span>
        <div>
          <div style="font-weight:700;color:#fca5a5;margin-bottom:6px;font-size:16px;">চেষ্টা ভালো! আবার পড়ুন — শেখাটাই আসল! +5 XP</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.8);line-height:1.8;">${chapter.quiz.explanation}</div>
        </div>
      </div>
    `;
    addXP(5);
  }

  const key = `${currentCourseId}-${currentChapterIndex}`;
  if (!completedChapters.includes(key)) {
    completedChapters.push(key);
    localStorage.setItem('gic_completed', JSON.stringify(completedChapters));
    if (typeof syncProgressToSupabase === 'function') syncProgressToSupabase();
  }

  document.getElementById('cv-read-badge').style.display = 'inline-flex';
  renderChapterList();

  const teaser = document.getElementById('cv-teaser');
  if (teaser) {
    teaser.style.display = 'block';
    teaser.style.animation = 'slideUp 0.4s ease';
  }

  enableNextButton();
}

function enableNextButton() {
  const nextBtn = document.getElementById('cv-btn-next');
  if (!nextBtn) return;
  nextBtn.disabled = false;
  nextBtn.style.opacity = '1';
  nextBtn.style.cursor = 'pointer';

  const course = miniCoursesData.find(c => c.id === currentCourseId);
  if (currentChapterIndex === course.chapters.length - 1) {
    nextBtn.innerHTML = 'কোর্স সমাপ্ত 🏆';
    nextBtn.onclick = () => completeCourse();
  } else {
    nextBtn.innerHTML = 'পরবর্তী পার্ট →';
    nextBtn.onclick = () => showChapter(currentChapterIndex + 1);
  }
}

// ============================================================
//  XP & ANIMATIONS
// ============================================================
function addXP(amount) {
  totalXP += amount;
  localStorage.setItem('gic_xp', totalXP);
  if (typeof syncProgressToSupabase === 'function') syncProgressToSupabase();

  const floater = document.createElement('div');
  floater.textContent = '+' + amount + ' XP';
  floater.style.cssText = `
    position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
    background:linear-gradient(135deg,#d4a843,#f59e0b);
    color:#000;font-weight:900;font-size:28px;
    padding:12px 28px;border-radius:50px;z-index:10000;
    animation:xpFloat 1.5s ease forwards;pointer-events:none;
    font-family:var(--font-body);box-shadow:0 8px 32px rgba(212,168,67,0.5);
  `;
  document.body.appendChild(floater);
  setTimeout(() => floater.remove(), 1500);
}

function showToast(msg, type = 'success') {
  const el = document.createElement('div');
  const bg = type === 'warning' ? 'rgba(249,115,22,0.95)' : 'linear-gradient(135deg,#0a1628,#1a5f9e)';
  el.textContent = msg;
  el.style.cssText = `
    position:fixed;bottom:24px;right:24px;
    background:${bg};
    color:#fff;font-weight:700;font-size:14px;
    padding:14px 22px;border-radius:14px;z-index:10000;
    animation:slideInRight 0.4s ease, fadeOut 0.4s ease 2.8s forwards;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    border:1px solid rgba(255,255,255,0.15);
    font-family:var(--font-body);max-width:320px;line-height:1.5;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3400);
}

function showPraiseMessage() {
  const praises = [
    "🌟 মাশাআল্লাহ! আপনি দুর্দান্ত!",
    "🎯 বাহ! কী তীক্ষ্ণ মস্তিষ্ক!",
    "⚡ অসাধারণ! জ্ঞান অর্জনেই সফলতা!",
    "💎 সুবহানাল্লাহ! অনেক ভালো করছেন!",
    "🏆 আলহামদুলিল্লাহ! চমৎকার!",
    "🌈 বাহ! আপনি সত্যিই চমৎকার!",
    "🔥 একদম পারফেক্ট! চালিয়ে যান!",
  ];
  showToast(praises[Math.floor(Math.random() * praises.length)]);
}

function spawnConfetti() {
  const colors = ['#d4a843', '#1a5f9e', '#22c55e', '#f97316', '#a78bfa', '#f43f5e'];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 4;
    c.style.cssText = `
      position:fixed;
      left:${Math.random() * 100}vw;
      top:-10px;
      width:${size}px;height:${size * 1.5}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      z-index:9999;
      pointer-events:none;
      transform:rotate(${Math.random() * 360}deg);
      animation:confettiFall ${Math.random() * 2 + 1}s ease ${Math.random() * 0.5}s forwards;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

// ============================================================
//  COURSE COMPLETION
// ============================================================
function generateDynamicCertificate() {
  const name = document.getElementById('cert-input-name').value.trim();
  if (!name) {
    showToast('⚠️ অনুগ্রহ করে সার্টিফিকেটের জন্য আপনার নাম লিখুন!', 'warning');
    return;
  }
  
  const course = miniCoursesData.find(c => c.id === currentCourseId);
  const now = new Date();
  const dateStr = now.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = 'GIC-CERT-' + course.id + '-' + Math.floor(Math.random() * 900000 + 100000);
  
  document.getElementById('cert-student-name').innerText = name;
  document.getElementById('cert-course-name').innerText = `"${course.title}"`;
  document.getElementById('cert-date').innerText = dateStr;
  document.getElementById('cert-id').innerText = certId;
  
  document.getElementById('complete-success-box').style.display = 'none';
  document.getElementById('gic-certificate-view-container').style.display = 'flex';
  
  // Award bonus XP for generating certificate
  addXP(10);
  showToast('🎉 আপনার প্রশংসা সনদপত্র সফলভাবে তৈরি করা হয়েছে! +10 XP');
}

function completeCourse() {
  const course = miniCoursesData.find(c => c.id === currentCourseId);
  addXP(50);
  streakCount++;
  localStorage.setItem('gic_streak', streakCount);
  spawnConfetti();
  spawnConfetti();

  const shareUrl = window.location.origin + window.location.pathname + '?course=' + currentCourseId +
    (studentSession ? '&ref=' + studentSession.student_id : '');
  const shareText = `🏆 আমি Global Islamic Care-এর ফ্রি "${course.title}" কোর্স সম্পন্ন করেছি! তুমিও শুরু করো — সম্পূর্ণ বিনামূল্যে! 🕌`;

  const modal = document.createElement('div');
  modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:20000;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.3s ease;overflow-y:auto;`;
  modal.innerHTML = `
    <div class="modal-box" style="max-width:820px; width:100%; border-radius:24px; background:linear-gradient(135deg,#0a1628,#1a3a6e); border:1px solid rgba(212,168,67,0.35); box-shadow:0 24px 80px rgba(0,0,0,0.6); overflow:hidden;">
      
      <!-- Congratulations Box -->
      <div id="complete-success-box" style="padding:40px 36px; text-align:center; max-width:480px; margin:0 auto;">
        <div style="font-size:72px;margin-bottom:12px;animation:bounce 0.6s ease 0.2s;">🏆</div>
        <h2 style="color:var(--gold-light);font-size:24px;margin-bottom:10px;">অভিনন্দন! মাশাআল্লাহ!</h2>
        <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.7;margin-bottom:6px;">"${course.title}" কোর্সটি সফলভাবে সম্পন্ন করেছেন!</p>
        
        <div style="display:flex;justify-content:center;gap:12px;margin:20px 0;flex-wrap:wrap;">
          <div style="background:rgba(212,168,67,0.15);border:1px solid rgba(212,168,67,0.35);border-radius:14px;padding:14px 20px;">
            <div style="font-size:26px;font-weight:900;color:var(--gold);">+60 XP</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);">অর্জিত</div>
          </div>
          <div style="background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.35);border-radius:14px;padding:14px 20px;">
            <div style="font-size:26px;font-weight:900;color:#f97316;">🔥 ${streakCount}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.6);">দিনের স্ট্রিক</div>
          </div>
        </div>

        <!-- Name Input for Certificate -->
        <div id="cert-name-input-container" style="background:rgba(255,255,255,0.05); padding:20px; border-radius:16px; margin-bottom:20px; border:1px solid rgba(255,255,255,0.1); text-align:left;">
          <label style="color:#fff; font-size:13.5px; font-weight:700; display:block; margin-bottom:8px; text-align:center;">📜 সার্টিফিকেটের জন্য আপনার নাম লিখুন:</label>
          <input type="text" id="cert-input-name" placeholder="যেমন: মুহাম্মাদ আলী" style="width:100%; padding:12px 14px; border-radius:10px; border:1px solid rgba(212,168,67,0.3); background:#050d18; color:#fff; font-family:var(--font-body); font-size:14.5px; outline:none; text-align:center; transition:border-color 0.2s;" onfocus="this.style.borderColor='var(--gold)';">
          <button onclick="generateDynamicCertificate()" style="margin-top:12px; background:linear-gradient(135deg,var(--gold),#f59e0b); color:#000; font-family:var(--font-body); font-weight:900; font-size:14.5px; padding:12px; border-radius:10px; border:none; cursor:pointer; width:100%; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.02)';" onmouseout="this.style.transform='none';">সনদপত্র তৈরি করুন 🎓</button>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="https://wa.me/8801733017521" target="_blank" style="display:block;background:#25D366;color:#fff;padding:14px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;">💬 ওস্তাদ কাউন্সেলিং ও লাইভ ক্লাস বুকিং</a>
          <button onclick="openCommentModal(${course.id});this.closest('[style*=fixed]').remove();" style="background:rgba(212,168,67,0.15);border:1px solid rgba(212,168,67,0.3);color:var(--gold-light);padding:12px;border-radius:12px;cursor:pointer;font-size:14px;font-family:var(--font-body);font-weight:700;">⭐ রিভিউ দিন</button>
          <button onclick="this.closest('[style*=fixed]').remove();closeCourseViewer();" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:12px;border-radius:12px;cursor:pointer;font-size:14px;font-family:var(--font-body);">← সব কোর্সে ফিরে যান</button>
        </div>
      </div>

      <!-- Certificate View Container (hidden by default) -->
      <div id="gic-certificate-view-container" style="display:none; flex-direction:column; align-items:center; padding:30px; animation:fadeIn 0.4s ease;">
        <div id="gic-certificate-view" style="background:#fff; border:10px double var(--gold); border-radius:12px; padding:40px; position:relative; color:#0a1628; box-shadow:0 10px 40px rgba(0,0,0,0.15); max-width:700px; width:100%; aspect-ratio: 1.414; display:flex; flex-direction:column; justify-content:center; text-align:center;">
          <!-- Seal background decoration -->
          <div style="position:absolute; inset:0; background:radial-gradient(circle, rgba(200,151,42,0.03) 0%, transparent 80%); pointer-events:none;"></div>
          
          <div style="font-size:32px; font-weight:700; color:var(--gold); font-family:var(--font-arabic); margin-bottom:6px;">ق</div>
          <div style="font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#5a7a9a; font-weight:700; margin-bottom:10px;">Global Islamic Care</div>
          
          <h2 style="font-family:var(--font-body); color:var(--blue-dark); font-size:24px; margin-bottom:6px; font-weight:700;">কোর্স সম্পূর্ণ করার সনদ</h2>
          <div style="width:60px; height:2px; background:var(--gold); margin:0 auto 14px;"></div>
          
          <p style="font-size:13px; color:var(--text-muted); margin-bottom:6px;">এই গৌরবময় প্রশংসাপত্রটি প্রদান করা হচ্ছে</p>
          <h3 id="cert-student-name" style="font-family:var(--font-body); font-size:28px; color:var(--gold); font-weight:800; margin-bottom:14px;">[শিক্ষার্থীর নাম]</h3>
          
          <p style="font-size:13.5px; line-height:1.75; color:var(--text); max-width:550px; margin:0 auto 18px;">
            সফলভাবে ও নিষ্ঠার সাথে <strong style="color:var(--blue);">Global Islamic Care</strong>-এর <strong id="cert-course-name" style="color:var(--blue-dark); font-size:14.5px;">"[কোর্সের নাম]"</strong> ফ্রি কোর্সটি সম্পন্ন করায় তার ইসলামিক জ্ঞান ও আগ্রহের স্বীকৃতিস্বরূপ এই সনদপত্র অর্পণ করা হলো।
          </p>
          
          <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:20px; font-size:12px;">
            <div style="text-align:left;">
              <span style="color:var(--text-muted); display:block; font-size:10.5px;">তারিখ:</span>
              <strong id="cert-date" style="color:var(--text); font-weight:700;">[তারিখ]</strong>
            </div>
            <div style="text-align:center;">
              <div style="width:64px; height:64px; background:radial-gradient(circle, #ffd700, #c8972a); border-radius:50%; border:2px dashed #fff; display:flex; align-items:center; justify-content:center; color:#000; font-weight:900; font-size:9.5px; box-shadow:0 4px 10px rgba(0,0,0,0.15);">APPROVED</div>
            </div>
            <div style="text-align:right;">
              <span style="color:var(--text-muted); display:block; font-size:10.5px;">সনদপত্র আইডি:</span>
              <strong id="cert-id" style="font-family:monospace; color:var(--text); font-weight:700;">[আইডি]</strong>
            </div>
          </div>
        </div>
        
        <!-- Certificate Action Buttons -->
        <div style="display:flex; gap:12px; margin-top:20px; width:100%; max-width:700px; justify-content:center;">
          <button onclick="window.print()" style="background:linear-gradient(135deg,var(--gold),#f59e0b); color:#000; font-family:var(--font-body); font-weight:900; font-size:14px; padding:12px 24px; border-radius:10px; border:none; cursor:pointer; display:flex; align-items:center; gap:6px; box-shadow:0 4px 15px rgba(212,168,67,0.3); transition:all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            🖨️ প্রিন্ট / ডাউনলোড (PDF)
          </button>
          <button onclick="this.closest('[style*=fixed]').remove(); closeCourseViewer();" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#fff; font-family:var(--font-body); font-weight:700; font-size:14px; padding:12px 24px; border-radius:10px; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.18)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
            ← সব কোর্সে ফিরে যান
          </button>
        </div>
      </div>

    </div>
  `;
  document.body.appendChild(modal);
}

// ============================================================
//  STREAK
// ============================================================
function updateStreakCount() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('gic_last_visit');
  if (lastVisit !== today) {
    localStorage.setItem('gic_last_visit', today);
    if (lastVisit) {
      const diff = (new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24);
      if (diff > 1.5) { streakCount = 1; }
      else { streakCount++; }
    } else { streakCount = 1; }
    localStorage.setItem('gic_streak', streakCount);
    if (typeof syncProgressToSupabase === 'function') syncProgressToSupabase();
  }
}

// ============================================================
//  HELPER
// ============================================================
function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============================================================
//  CSS ANIMATIONS + SOCIAL STYLES (injected)
// ============================================================
(function injectStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes xpFloat {
      0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
      50%  { opacity:1; transform:translate(-50%,-80%) scale(1.2); }
      100% { opacity:0; transform:translate(-50%,-120%) scale(0.8); }
    }
    @keyframes confettiFall {
      0%   { transform:translateY(0) rotate(0deg); opacity:1; }
      100% { transform:translateY(100vh) rotate(720deg); opacity:0; }
    }
    @keyframes slideInRight {
      from { opacity:0; transform:translateX(60px); }
      to   { opacity:1; transform:translateX(0); }
    }
    @keyframes fadeOut {
      to { opacity:0; transform:translateX(60px); }
    }
    @keyframes slideUp {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes bounce {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-14px); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes pulse-ring {
      0% { transform:scale(1); opacity:0.7; }
      100% { transform:scale(1.5); opacity:0; }
    }
    .gic-chapter-body p { margin-bottom:16px; line-height:1.95; font-size:15px; }
    .gic-chapter-body ul, .gic-chapter-body ol { padding-left:20px; margin-bottom:16px; }
    .gic-chapter-body li { margin-bottom:10px; line-height:1.85; font-size:14px; }
    .gic-chapter-body blockquote { margin:20px 0; }
    .gic-chapter-body h4 { font-size:16px; margin:20px 0 10px; }
    #cv-btn-next:not([disabled]):hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,168,67,0.3);
    }
    #cv-btn-next { transition: all 0.2s ease; }
    .cv-chapter-btn { transition: all 0.15s ease; }
    .cv-chapter-btn:hover { transform: translateX(4px); }
    .cv-chapter-btn.active { border-left-color: var(--gold) !important; }

    /* Social Buttons */
    .course-social-bar { flex-wrap:wrap; }
    .social-btn {
      display:flex;align-items:center;gap:5px;
      background:var(--cream);border:1px solid var(--border);
      color:var(--text);border-radius:20px;padding:7px 14px;
      cursor:pointer;font-size:12px;font-weight:600;
      font-family:var(--font-body);transition:all 0.2s ease;
      white-space:nowrap;
    }
    .social-btn:hover { transform:translateY(-1px);box-shadow:0 3px 10px rgba(0,0,0,0.08); }
    .social-btn.liked { background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.3);color:#ef4444; }
    .social-btn.share-btn { background:rgba(26,95,158,0.06);border-color:rgba(26,95,158,0.2);color:var(--blue); }
    .social-btn.share-btn:hover { background:var(--blue);color:#fff; }

    /* Comment Modal */
    #comment-modal, #share-modal {
      display:none;position:fixed;inset:0;
      background:rgba(0,0,0,0.7);z-index:20000;
      align-items:center;justify-content:center;padding:20px;
    }
    #comment-modal.active, #share-modal.active { display:flex; }
    .modal-box {
      background:#fff;border-radius:20px;
      max-width:560px;width:100%;max-height:88vh;
      overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,0.3);
      animation:slideUp 0.3s ease;
    }
    .modal-header {
      background:linear-gradient(135deg,#0a1628,#1a5f9e);
      padding:20px 24px;border-radius:20px 20px 0 0;
      display:flex;align-items:center;justify-content:space-between;
    }
    .modal-body { padding:20px 24px; }
    .comment-input-row { display:flex;flex-direction:column;gap:10px;margin-top:16px; }
    .comment-input {
      width:100%;padding:12px;border:1.5px solid var(--border);
      border-radius:10px;font-family:var(--font-body);font-size:14px;
      color:var(--text);background:var(--cream);resize:vertical;
      transition:border-color 0.2s;
    }
    .comment-input:focus { outline:none;border-color:var(--blue); }
    .rating-select {
      padding:10px;border:1.5px solid var(--border);border-radius:10px;
      font-family:var(--font-body);font-size:14px;background:var(--cream);color:var(--text);
    }

    /* Star Rating for comment */
    .star-rating-row { display:flex;align-items:center;gap:8px;flex-wrap:wrap; }

    /* Share modal styles */
    .share-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:16px; }
    .share-item {
      display:flex; flex-direction:column; align-items:center; gap:8px;
      padding:16px; border-radius:14px; border:1.5px solid var(--border);
      cursor:pointer; transition:all 0.2s; text-decoration:none;
      background:var(--cream); color:var(--text); font-weight:700; font-size:14px;
    }
    .share-item:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,0,0,0.1); }
    .share-icon { font-size:32px; }

    /* Audio wave bounce animation */
    @keyframes waveBounce {
      from { height: 4px; }
      to { height: 20px; }
    }

    /* Print styling specifically for the Golden Certificate */
    @media print {
      body * { display: none !important; }
      #gic-certificate-view, #gic-certificate-view * { display: flex !important; }
      #gic-certificate-view {
        position: absolute !important;
        left: 0 !important; top: 0 !important;
        border: 10px double #c8972a !important;
        width: 100% !important;
        max-width: 100% !important;
        box-shadow: none !important;
        page-break-inside: avoid !important;
      }
    }
  `;
  document.head.appendChild(style);
})();

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  updateStreakCount();
  await fetchGlobalLikesAndComments();
  renderMiniCourses();
});
