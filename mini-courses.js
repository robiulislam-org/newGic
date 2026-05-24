
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
    const refLink = `${window.location.origin}${window.location.pathname}?ref=${studentSession.student_id}`;
    authBar.innerHTML = `
      <div class="student-auth-info">
        <div class="student-avatar">${studentSession.student_id.slice(-2)}</div>
        <div class="student-details">
          <h4>স্টুডেন্ট আইডি: <span style="color:var(--gold);font-family:monospace;">${studentSession.student_id}</span></h4>
          <p>নম্বর: ${studentSession.phone} | <span style="color:var(--gold);">⚡ ${totalXP} XP</span> | 🔗 <a href="${refLink}" onclick="copyReferral(event,'${refLink}')" style="color:var(--blue);cursor:pointer;text-decoration:underline;">রেফারেল লিংক কপি করুন</a></p>
        </div>
      </div>
      <button class="btn btn-outline" onclick="logoutStudent()">লগআউট</button>
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

function renderMiniCourses() {
  const container = document.getElementById('mini-courses-grid');
  if (!container) return;
  container.innerHTML = '';

  renderCategoryFilter();

  const filteredCourses = activeCategory === 'all'
    ? miniCoursesData
    : miniCoursesData.filter(c => c.category === activeCategory);

  filteredCourses.forEach((course, index) => {
    const delay = (index % 3) * 0.1;
    const completedCount = completedChapters.filter(k => k.startsWith(`${course.id}-`)).length;
    const progress = Math.round((completedCount / course.chapters.length) * 100);
    const isLiked = courseLikes[course.id] || false;
    const commentCount = (courseComments[course.id] || []).length;
    const isCompleted = progress === 100;

    const card = document.createElement('div');
    card.className = 'course-card reveal visible';
    card.style.transitionDelay = delay + 's';

    card.innerHTML = `
      <div class="course-head course-head-blue" style="background:linear-gradient(135deg,#0a1628 0%,${course.color || 'var(--blue-dark)'} 100%);padding-bottom:16px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;right:0;width:120px;height:120px;background:rgba(255,255,255,0.04);border-radius:50%;transform:translate(40px,-40px);"></div>
        <div style="position:absolute;bottom:0;left:0;width:80px;height:80px;background:rgba(255,255,255,0.03);border-radius:50%;transform:translate(-20px,20px);"></div>
        ${isCompleted ? '<div style="position:absolute;top:12px;right:12px;background:rgba(34,197,94,0.2);border:1px solid #22c55e;border-radius:20px;padding:4px 10px;font-size:11px;color:#22c55e;font-weight:700;">✅ সম্পন্ন</div>' : ''}
        <span class="course-emoji" style="font-size:46px;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));">${course.icon}</span>
        <div class="course-title-text" style="font-size:17px;line-height:1.4;">${course.title}</div>
        <div class="course-tagline" style="color:rgba(255,215,100,0.9);font-size:13px;margin-top:4px;">${course.tagline}</div>
        ${progress > 0 ? `
          <div style="margin-top:12px;background:rgba(255,255,255,0.15);border-radius:20px;height:6px;overflow:hidden;">
            <div style="background:linear-gradient(90deg,var(--gold),#f59e0b);height:100%;width:${progress}%;border-radius:20px;transition:width 0.5s ease;"></div>
          </div>
          <div style="color:rgba(255,255,255,0.6);font-size:11px;margin-top:5px;">${completedCount}/${course.chapters.length} পার্ট সম্পন্ন • ${progress}%</div>
        ` : ''}
      </div>
      <div class="course-body" style="padding-top:16px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:16px;font-size:12px;color:var(--text-muted);font-weight:600;">
          <span style="display:flex;align-items:center;gap:5px;background:var(--cream);padding:5px 10px;border-radius:20px;">⏱️ ${course.duration}</span>
          <span style="display:flex;align-items:center;gap:5px;background:var(--cream);padding:5px 10px;border-radius:20px;">📑 ${course.chapters.length} পার্ট</span>
        </div>
        <div style="margin-bottom:16px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">
          <span style="background:rgba(37,211,102,0.1);color:#1DA851;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(37,211,102,0.2);">✓ সম্পূর্ণ ফ্রি</span>
          <span style="background:rgba(212,168,67,0.1);color:var(--gold);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(212,168,67,0.2);">⚡ +${course.chapters.length * 10} XP</span>
        </div>
        <button onclick="openCourseViewer(${course.id})" class="btn btn-primary btn-full" style="margin-bottom:12px;font-size:14px;padding:12px;">
          ${progress > 0 && progress < 100 ? '▶ চলুন এগিয়ে যাই →' : progress === 100 ? '🔄 পুনরায় পড়ুন' : '🚀 কোর্স শুরু করুন →'}
        </button>
        <!-- Social Bar -->
        <div class="course-social-bar" style="display:flex;align-items:center;gap:8px;padding-top:10px;border-top:1px solid var(--border);">
          <button class="social-btn like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${course.id}, this)" title="লাইক করুন">
            ${isLiked ? '❤️' : '🤍'} <span class="like-count">${getLikeCount(course.id)}</span>
          </button>
          <button class="social-btn" onclick="openCommentModal(${course.id})" title="মন্তব্য করুন">
            💬 <span>${commentCount}</span>
          </button>
          <button class="social-btn share-btn" onclick="openShareModal(${course.id})" title="শেয়ার করুন">
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
//  LIKE SYSTEM
// ============================================================
function getLikeCount(courseId) {
  const base = (courseId * 17 + 43) % 89 + 12; // Pseudo-random seed for display
  const extra = courseLikes[courseId] ? 1 : 0;
  return base + extra;
}

function toggleLike(courseId, btn) {
  courseLikes[courseId] = !courseLikes[courseId];
  localStorage.setItem('gic_likes', JSON.stringify(courseLikes));

  const isLiked = courseLikes[courseId];
  btn.innerHTML = `${isLiked ? '❤️' : '🤍'} <span class="like-count">${getLikeCount(courseId)}</span>`;
  btn.classList.toggle('liked', isLiked);

  if (isLiked) {
    addXP(2);
    showToast('❤️ লাইক দেওয়ার জন্য ধন্যবাদ! +2 XP');
  }
}

// ============================================================
//  COMMENT SYSTEM (LocalStorage — persistent)
// ============================================================
function openCommentModal(courseId) {
  const course = miniCoursesData.find(c => c.id === courseId);
  const comments = courseComments[courseId] || [];

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
  const comments = courseComments[courseId] || [];
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

function submitComment(courseId) {
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

  if (!courseComments[courseId]) courseComments[courseId] = [];

  const now = new Date();
  const timeStr = now.toLocaleDateString('bn-BD') + ' ' + now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

  courseComments[courseId].push({
    name: name,
    text: text,
    rating: rating,
    time: timeStr,
    id: Date.now()
  });

  localStorage.setItem('gic_comments', JSON.stringify(courseComments));

  if (textEl) textEl.value = '';
  if (nameEl) nameEl.value = '';

  renderCommentsList(courseId);
  addXP(5);
  showToast('✅ মন্তব্য সফলভাবে পোস্ট হয়েছে! +5 XP');

  // Update comment count on cards
  renderMiniCourses();
}

// ============================================================
//  SHARE SYSTEM
// ============================================================
function openShareModal(courseId) {
  const course = miniCoursesData.find(c => c.id === courseId);
  const modal = document.getElementById('share-modal');
  if (!modal) return;

  const shareUrl = window.location.origin + window.location.pathname + '?course=' + courseId +
    (studentSession ? '&ref=' + studentSession.student_id : '');
  const shareText = `🌟 "${course.title}" — GIC-এর ফ্রি ইসলামিক মিনি-কোর্স পড়লাম! তুমিও পড়ো, সম্পূর্ণ বিনামূল্যে! 📖`;

  modal.querySelector('#share-wa').href = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
  modal.querySelector('#share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
  modal.querySelector('#share-tw').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  modal.querySelector('#share-copy').onclick = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast('🔗 লিংক কপি হয়েছে!');
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

  const heroSection = document.querySelector('#page-mini-courses .policy-hero');
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
  const commentCount = (courseComments[courseId] || []).length;

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
    <div class="gic-chapter-body">${chapter.content}</div>

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
function completeCourse() {
  const course = miniCoursesData.find(c => c.id === currentCourseId);
  addXP(50);
  streakCount++;
  localStorage.setItem('gic_streak', streakCount);
  spawnConfetti();
  spawnConfetti();

  const shareUrl = window.location.origin + window.location.pathname + '?course=' + currentCourseId +
    (studentSession ? '&ref=' + studentSession.student_id : '');
  const shareText = `🏆 আমি GIC-এর "${course.title}" কোর্স সম্পন্ন করেছি! তুমিও শুরু করো — সম্পূর্ণ বিনামূল্যে!`;

  const modal = document.createElement('div');
  modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:20000;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.3s ease;`;
  modal.innerHTML = `
    <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:24px;padding:40px 36px;max-width:480px;width:100%;text-align:center;border:1px solid rgba(212,168,67,0.35);box-shadow:0 24px 80px rgba(0,0,0,0.6);">
      <div style="font-size:72px;margin-bottom:12px;animation:bounce 0.6s ease 0.2s;">🏆</div>
      <h2 style="color:var(--gold-light);font-size:24px;margin-bottom:10px;">অভিনন্দন! মাশাআল্লাহ!</h2>
      <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.7;margin-bottom:6px;">"${course.title}" কোর্সটি সম্পন্ন করেছেন!</p>
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
      <p style="color:rgba(255,255,255,0.6);font-size:13px;margin-bottom:20px;">জ্ঞান অর্জনের এই আগ্রহ আল্লাহর কাছে অত্যন্ত পছন্দনীয়! বন্ধুদের সাথে শেয়ার করুন।</p>

      <!-- Share buttons -->
      <div style="background:rgba(255,255,255,0.05);border-radius:14px;padding:16px;margin-bottom:16px;">
        <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);margin-bottom:12px;">📤 বন্ধুদের সাথে শেয়ার করুন</div>
        <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          <a href="https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}" target="_blank" style="background:#25D366;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px;">💬 WhatsApp</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}" target="_blank" style="background:#1877F2;color:#fff;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:700;font-size:13px;display:flex;align-items:center;gap:6px;">📘 Facebook</a>
          <button onclick="navigator.clipboard.writeText('${shareUrl}').then(()=>showToast('🔗 লিংক কপি হয়েছে!'))" style="background:rgba(255,255,255,0.15);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:10px 16px;border-radius:10px;cursor:pointer;font-size:13px;font-family:var(--font-body);font-weight:700;">🔗 লিংক কপি</button>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <a href="https://wa.me/8801733017521" target="_blank" style="display:block;background:#25D366;color:#fff;padding:14px;border-radius:12px;text-decoration:none;font-weight:700;font-size:15px;">💬 ফ্রি লাইভ ক্লাস বুক করুন</a>
        <button onclick="openCommentModal(${currentCourseId});this.closest('[style*=fixed]').remove();" style="background:rgba(212,168,67,0.15);border:1px solid rgba(212,168,67,0.3);color:var(--gold-light);padding:12px;border-radius:12px;cursor:pointer;font-size:14px;font-family:var(--font-body);font-weight:700;">⭐ রিভিউ দিন</button>
        <button onclick="this.closest('[style*=fixed]').remove();closeCourseViewer();" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:12px;border-radius:12px;cursor:pointer;font-size:14px;font-family:var(--font-body);">← সব কোর্সে ফিরে যান</button>
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
    .share-grid { display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px; }
    .share-item {
      display:flex;flex-direction:column;align-items:center;gap:8px;
      padding:16px;border-radius:14px;border:1.5px solid var(--border);
      cursor:pointer;transition:all 0.2s;text-decoration:none;
      background:var(--cream);color:var(--text);font-weight:700;font-size:14px;
    }
    .share-item:hover { transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.1); }
    .share-icon { font-size:32px; }
  `;
  document.head.appendChild(style);
})();

// ============================================================
//  INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  updateStreakCount();
  renderMiniCourses();
});
