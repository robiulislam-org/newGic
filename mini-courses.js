
// ============================================================
//  GIC MINI COURSES — GAMIFIED INTERACTIVE LEARNING ENGINE
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
          <h4>স্টুডেন্ট আইডি: ${studentSession.student_id}</h4>
          <p>নম্বর: ${studentSession.phone} | <span style="color:var(--gold);">⚡ ${totalXP} XP</span></p>
        </div>
      </div>
      <button class="btn btn-outline" onclick="logoutStudent()">লগআউট</button>
    `;
  } else {
    authBar.innerHTML = `
      <div class="student-auth-info">
        <div class="student-avatar" style="background:#e2e8f0;color:#64748b;">?</div>
        <div class="student-details">
          <h4>আপনার কোনো স্টুডেন্ট আইডি নেই</h4>
          <p>কোর্সের প্রগ্রেস সেভ করতে লগইন করুন</p>
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
      // Save session
      studentSession = {
        student_id: data.student_id,
        phone: data.phone
      };
      localStorage.setItem('gic_student_session', JSON.stringify(studentSession));
      
      // Load progress if existing user
      if (!data.is_new) {
        totalXP = data.xp || 0;
        completedChapters = data.completed_chapters || [];
        streakCount = data.streak || 0;
        localStorage.setItem('gic_xp', totalXP);
        localStorage.setItem('gic_completed', JSON.stringify(completedChapters));
        localStorage.setItem('gic_streak', streakCount);
      }
      
      statusEl.className = 'auth-status success';
      statusEl.innerText = data.is_new ? 'নতুন আইডি সফলভাবে তৈরি হয়েছে!' : 'লগইন সফল হয়েছে!';
      
      updateAuthUI();
      renderMiniCourses();
      
      setTimeout(() => {
        closeStudentAuth();
        // Reset modal
        loader.style.display = 'none';
        submitBtn.style.display = 'block';
      }, 1500);
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

function logoutStudent() {
  studentSession = null;
  localStorage.removeItem('gic_student_session');
  // Optional: clear progress on logout if you want them to start fresh
  // totalXP = 0; completedChapters = []; streakCount = 0;
  // localStorage.removeItem('gic_xp'); localStorage.removeItem('gic_completed'); localStorage.removeItem('gic_streak');
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

// Initialize Auth UI on load
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

  // Render category filters
  renderCategoryFilter();

  const filteredCourses = activeCategory === 'all'
    ? miniCoursesData
    : miniCoursesData.filter(c => c.category === activeCategory);

  filteredCourses.forEach((course, index) => {
    const delay = (index % 3) * 0.1;
    const completedCount = completedChapters.filter(k => k.startsWith(`${course.id}-`)).length;
    const progress = Math.round((completedCount / course.chapters.length) * 100);

    const card = document.createElement('div');
    card.className = 'course-card reveal visible';
    card.style.transitionDelay = delay + 's';

    card.innerHTML = `
      <div class="course-head course-head-blue" style="background:linear-gradient(135deg,#0a1628 0%,${course.color || 'var(--blue-dark)'} 100%);padding-bottom:16px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;right:0;width:100px;height:100px;background:rgba(255,255,255,0.03);border-radius:50%;transform:translate(30px,-30px);"></div>
        <span class="course-emoji" style="font-size:42px;">${course.icon}</span>
        <div class="course-title-text" style="font-size:18px;">${course.title}</div>
        <div class="course-tagline" style="color:rgba(255,215,100,0.9);">${course.tagline}</div>
        ${progress > 0 ? `<div style="margin-top:10px;background:rgba(255,255,255,0.15);border-radius:20px;height:4px;overflow:hidden;"><div style="background:var(--gold);height:100%;width:${progress}%;border-radius:20px;"></div></div><div style="color:rgba(255,255,255,0.6);font-size:11px;margin-top:4px;">${completedCount}/${course.chapters.length} পার্ট সম্পন্ন</div>` : ''}
      </div>
      <div class="course-body" style="padding-top:16px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:20px;font-size:13px;color:var(--text-muted);font-weight:bold;">
          <span style="display:flex;align-items:center;gap:6px;"><span style="color:var(--gold);">⏱️</span> ${course.duration}</span>
          <span style="display:flex;align-items:center;gap:6px;"><span style="color:var(--blue);">📑</span> ${course.partsCount} পার্ট</span>
        </div>
        <div style="margin-bottom:20px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;">
          <span style="background:rgba(37,211,102,0.1);color:#1DA851;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid rgba(37,211,102,0.2);">সম্পূর্ণ ফ্রি</span>
          <span style="background:rgba(212,168,67,0.1);color:var(--gold);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;border:1px solid rgba(212,168,67,0.2);">⚡ +${course.chapters.length * 10} XP</span>
        </div>
        <button onclick="openCourseViewer(${course.id})" class="btn btn-primary btn-full" style="margin-top:auto;">
          ${progress > 0 && progress < 100 ? '▶ চলুন এগিয়ে যাই →' : progress === 100 ? '✅ পুনরায় পড়ুন' : 'কোর্স শুরু করুন →'}
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // Render XP header
  renderXPBar();
}

// ============================================================
//  XP BAR
// ============================================================
function renderXPBar() {
  const existing = document.getElementById('gic-xp-header');
  if (existing) existing.remove();

  const bar = document.createElement('div');
  bar.id = 'gic-xp-header';
  bar.innerHTML = `
    <div style="background:linear-gradient(135deg,#0a1628,#1a5f9e);padding:12px 24px;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;border-bottom:1px solid rgba(212,168,67,0.2);">
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;font-weight:700;">
        <span style="font-size:20px;">⚡</span>
        <span style="color:var(--gold);">${totalXP} XP</span>
        <span style="color:rgba(255,255,255,0.5);">মোট অর্জন</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;font-weight:700;">
        <span style="font-size:20px;">🔥</span>
        <span style="color:#f97316;">${streakCount} দিনের স্ট্রিক</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;color:#fff;font-size:14px;font-weight:700;">
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

  // Restore progress or start from beginning
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
}

function closeCourseViewer() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-mini-courses').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderMiniCourses();
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

  // Update chapter list active state
  document.querySelectorAll('.cv-chapter-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  // Progress
  const progressPercent = ((index + 1) / course.chapters.length) * 100;
  document.getElementById('cv-progress-fill').style.width = progressPercent + '%';
  document.getElementById('cv-progress-text').innerText = `পার্ট ${index + 1} / ${course.chapters.length}`;

  // Build content
  const contentEl = document.getElementById('cv-chapter-content');
  const titleEl = document.getElementById('cv-chapter-title');
  titleEl.innerText = chapter.title;

  // Reading time estimate
  const wordCount = chapter.content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 150));

  contentEl.innerHTML = `
    <!-- Reading meta -->
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
      <span style="background:rgba(26,95,158,0.08);color:var(--blue);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">⏱️ মাত্র ${readTime} মিনিট</span>
      <span style="background:rgba(212,168,67,0.1);color:var(--gold);padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;">⚡ +10 XP</span>
      <span id="cv-read-badge" style="background:rgba(34,197,94,0.1);color:#22c55e;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;display:none;">✅ সম্পন্ন</span>
    </div>

    <!-- Fun fact box -->
    <div style="background:linear-gradient(135deg,rgba(212,168,67,0.12),rgba(212,168,67,0.05));border:1px solid rgba(212,168,67,0.3);border-radius:12px;padding:16px;margin-bottom:24px;display:flex;gap:12px;align-items:flex-start;">
      <span style="font-size:24px;flex-shrink:0;">💡</span>
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">জানেন কি?</div>
        <div style="font-size:14px;color:var(--text);line-height:1.7;">${chapter.funFact || ''}</div>
      </div>
    </div>

    <!-- Main content -->
    <div class="gic-chapter-body">${chapter.content}</div>

    <!-- Quiz section -->
    <div id="cv-quiz-section" style="margin-top:32px;background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:16px;padding:28px;color:#fff;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
        <span style="font-size:28px;">🧠</span>
        <div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);text-transform:uppercase;font-weight:700;letter-spacing:1px;">দ্রুত কুইজ</div>
          <div style="font-size:16px;font-weight:700;color:#fff;">${chapter.quiz.question}</div>
        </div>
      </div>
      <div id="cv-quiz-options" style="display:grid;gap:10px;">
        ${chapter.quiz.options.map((opt, i) => `
          <button onclick="checkAnswer(${i})" id="quiz-opt-${i}" style="background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);border-radius:10px;padding:14px 18px;color:#fff;font-size:14px;font-family:var(--font-body);cursor:pointer;text-align:right;transition:all 0.2s;line-height:1.5;" onmouseover="if(!quizAnswered) this.style.background='rgba(255,255,255,0.15)'" onmouseout="if(!quizAnswered) this.style.background='rgba(255,255,255,0.08)'">
            <span style="background:rgba(255,255,255,0.1);border-radius:6px;padding:2px 8px;font-size:12px;margin-left:8px;font-weight:700;">${['ক', 'খ', 'গ', 'ঘ'][i]}</span> ${opt}
          </button>
        `).join('')}
      </div>
      <div id="cv-quiz-feedback" style="display:none;margin-top:16px;border-radius:10px;padding:16px;"></div>
    </div>

    <!-- Teaser for next part -->
    ${index < course.chapters.length - 1 ? `
    <div id="cv-teaser" style="display:none;margin-top:20px;background:linear-gradient(135deg,rgba(212,168,67,0.08),rgba(26,95,158,0.08));border:1px dashed rgba(212,168,67,0.4);border-radius:12px;padding:20px;text-align:center;">
      <div style="font-size:20px;margin-bottom:6px;">🔥</div>
      <div style="font-size:13px;font-weight:700;color:var(--gold);margin-bottom:4px;">পরবর্তী পার্টে আসছে...</div>
      <div style="font-size:14px;color:var(--text);line-height:1.7;">${chapter.teaser || ''}</div>
    </div>
    ` : ''}

    <!-- Nav buttons -->
    <div class="cv-nav-btns" style="margin-top:24px;">
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
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <span style="font-size:24px;">🎉</span>
        <div>
          <div style="font-weight:700;color:#4ade80;margin-bottom:4px;">অসাধারণ! একদম সঠিক! +10 XP অর্জন করেছেন!</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.8);line-height:1.7;">${chapter.quiz.explanation}</div>
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
      <div style="display:flex;align-items:flex-start;gap:10px;">
        <span style="font-size:24px;">💪</span>
        <div>
          <div style="font-weight:700;color:#fca5a5;margin-bottom:4px;">চেষ্টা ভালো! আবার পড়ুন — শেখাটাই আসল!</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.8);line-height:1.7;">${chapter.quiz.explanation}</div>
        </div>
      </div>
    `;
    addXP(5);
  }

  // Mark as completed
  const key = `${currentCourseId}-${currentChapterIndex}`;
  if (!completedChapters.includes(key)) {
    completedChapters.push(key);
    localStorage.setItem('gic_completed', JSON.stringify(completedChapters));
    if (typeof syncProgressToSupabase === 'function') syncProgressToSupabase();
  }

  document.getElementById('cv-read-badge').style.display = 'inline-flex';
  renderChapterList();

  // Show teaser
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

  const msg = praises[Math.floor(Math.random() * praises.length)];
  const el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = `
    position:fixed;top:80px;right:24px;
    background:linear-gradient(135deg,#0a1628,#1a5f9e);
    color:#fff;font-weight:700;font-size:16px;
    padding:14px 22px;border-radius:14px;z-index:10000;
    animation:slideInRight 0.4s ease, fadeOut 0.4s ease 2s forwards;
    box-shadow:0 8px 32px rgba(26,95,158,0.4);
    border:1px solid rgba(212,168,67,0.3);
    font-family:var(--font-body);
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function spawnConfetti() {
  const colors = ['#d4a843', '#1a5f9e', '#22c55e', '#f97316', '#a78bfa', '#f43f5e'];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    c.style.cssText = `
      position:fixed;
      left:${Math.random() * 100}vw;
      top:-10px;
      width:${size}px;height:${size * 1.5}px;
      background:${color};
      border-radius:2px;
      z-index:9999;
      pointer-events:none;
      transform:rotate(${Math.random() * 360}deg);
      animation:confettiFall ${Math.random() * 1.5 + 1}s ease ${Math.random() * 0.5}s forwards;
    `;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3000);
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

  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:20000;
    display:flex;align-items:center;justify-content:center;padding:24px;
    animation:fadeIn 0.3s ease;
  `;
  modal.innerHTML = `
    <div style="background:linear-gradient(135deg,#0a1628,#1a3a6e);border-radius:24px;padding:48px 40px;max-width:460px;width:100%;text-align:center;border:1px solid rgba(212,168,67,0.3);box-shadow:0 24px 80px rgba(0,0,0,0.5);">
      <div style="font-size:72px;margin-bottom:16px;animation:bounce 0.5s ease 0.2s;">🏆</div>
      <h2 style="color:var(--gold-light);font-size:26px;margin-bottom:10px;">অভিনন্দন! মাশাআল্লাহ!</h2>
      <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.7;margin-bottom:8px;">"${course.title}" কোর্সটি সম্পন্ন করেছেন!</p>
      <div style="display:flex;justify-content:center;gap:16px;margin:20px 0;flex-wrap:wrap;">
        <div style="background:rgba(212,168,67,0.15);border:1px solid rgba(212,168,67,0.3);border-radius:12px;padding:12px 20px;">
          <div style="font-size:24px;font-weight:900;color:var(--gold);">+60 XP</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.6);">অর্জিত</div>
        </div>
        <div style="background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.3);border-radius:12px;padding:12px 20px;">
          <div style="font-size:24px;font-weight:900;color:#f97316;">🔥 ${streakCount}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.6);">দিনের স্ট্রিক</div>
        </div>
      </div>
      <p style="color:rgba(255,255,255,0.6);font-size:13px;margin-bottom:24px;">জ্ঞান অর্জনের এই আগ্রহ আল্লাহর কাছে অত্যন্ত পছন্দনীয়! পরবর্তী কোর্সটি শুরু করুন।</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <a href="https://wa.me/8801733017521" target="_blank" style="display:block;background:#25D366;color:#fff;padding:14px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">💬 ফ্রি লাইভ ক্লাস বুক করুন</a>
        <button onclick="this.closest('[style*=fixed]').remove();closeCourseViewer();" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:12px;border-radius:10px;cursor:pointer;font-size:14px;font-family:var(--font-body);">← সব কোর্সে ফিরে যান</button>
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
    if (typeof syncProgressToSupabase === 'function') {
      syncProgressToSupabase();
    }
  }
}

// ============================================================
//  CSS ANIMATIONS (injected)
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
      50%      { transform:translateY(-12px); }
    }
    @keyframes fadeIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    .gic-chapter-body p { margin-bottom:14px; line-height:1.9; }
    .gic-chapter-body ul, .gic-chapter-body ol { padding-left:20px; }
    .gic-chapter-body li { margin-bottom:8px; line-height:1.8; }
    .gic-chapter-body blockquote { margin:16px 0; }
    #cv-btn-next:not([disabled]):hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,168,67,0.3);
    }
    #cv-btn-next { transition: all 0.2s ease; }
    .cv-chapter-btn { transition: all 0.15s ease; }
    .cv-chapter-btn:hover { transform: translateX(4px); }
    .cv-chapter-btn.active { border-left-color: var(--gold) !important; }
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
