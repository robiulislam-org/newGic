/**
 * Global Islamic Care - Central Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // ═══ NAVIGATION SCROLL ═══
    const nav = document.getElementById('mainNav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ═══ MOBILE NAV TOGGLE ═══
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active'); // For animated hamburger
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ═══ REVEAL ON SCROLL (Optimized) ═══
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ═══ HERO STARS ANIMATION (Enhanced) ═══
    const initStars = () => {
        const c = document.getElementById('stars');
        if (!c) return;
        const ctx = c.getContext('2d');
        let stars = [];
        let animationFrame;
        
        function resize() {
            const hero = document.querySelector('.hero');
            if (!hero) return;
            c.width = window.innerWidth;
            c.height = hero.offsetHeight;
            stars = Array.from({length: 120}, () => ({
                x: Math.random() * c.width, 
                y: Math.random() * c.height,
                r: Math.random() * 1.5, 
                v: Math.random() * 0.2 + 0.05, // velocity
                a: Math.random(), // alpha
                va: Math.random() * 0.02 + 0.01 // alpha velocity (twinkle)
            }));
        }
        
        function animate() {
            ctx.clearRect(0, 0, c.width, c.height);
            stars.forEach(s => {
                s.y -= s.v;
                s.a += s.va;
                if (s.a > 0.8 || s.a < 0.2) s.va *= -1;
                if (s.y < 0) s.y = c.height;
                
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${Math.abs(s.a) * 0.4})`; // Gold stars
                ctx.fill();
            });
            animationFrame = requestAnimationFrame(animate);
        }
        
        resize();
        animate();
        window.addEventListener('resize', () => {
            cancelAnimationFrame(animationFrame);
            resize();
            animate();
        });
    };

    initStars();
});

// ═══ TOAST NOTIFICATION ═══
function showToast(message, duration = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// ═══ BOOK TRIAL (WHATSAPP) ═══
function bookTrial() {
    const nameEl = document.getElementById('hName');
    const phoneEl = document.getElementById('hPhone');
    const courseEl = document.getElementById('hCourse');

    if (!nameEl || !phoneEl) return;

    const name = nameEl.value.trim();
    const phone = phoneEl.value.trim();
    const course = courseEl ? courseEl.value : '';

    if (!name || !phone) {
        alert('দয়া করে আপনার নাম এবং মোবাইল নম্বর দিন।');
        return;
    }

    let text = 'আসসালামু আলাইকুম, আমি Free পরামর্শ নিতে চাই।\n\n';
    text += 'নাম: ' + name + '\n';
    text += 'ফোন: ' + phone + '\n';
    if (course) text += 'আগ্রহী কোর্স: ' + course;

    showToast('✅ WhatsApp-এ সংযুক্ত হচ্ছেন...');
    
    setTimeout(() => {
        window.open('https://wa.me/8801733017521?text=' + encodeURIComponent(text), '_blank');
    }, 1000);
}

// ═══ TEACHER APPLICATION LOGIC ═══
const TeacherState = { gender: '', device: '', hafez: '', langs: [] };

function sel(k, v, px) {
    TeacherState[k] = v;
    document.querySelectorAll(`[id^="${px}"]`).forEach(b => b.classList.remove('selected'));
    const target = document.getElementById(px + v);
    if (target) target.classList.add('selected');
}

function selHafez(v) {
    TeacherState.hafez = v;
    ['yes', 'no'].forEach(x => {
        const b = document.getElementById('h-' + x);
        if (b) b.classList.remove('selected');
    });
    const target = document.getElementById('h-' + v);
    if (target) target.classList.add('selected');
}

function togLang(l) {
    const btn = document.getElementById('l-' + l);
    if (!btn) return;
    if (TeacherState.langs.includes(l)) {
        TeacherState.langs = TeacherState.langs.filter(x => x !== l);
        btn.classList.remove('selected');
    } else {
        TeacherState.langs.push(l);
        btn.classList.add('selected');
    }
}

function submitTeacherApp() {
    const name = document.getElementById('t-name')?.value.trim();
    const phone = document.getElementById('t-phone')?.value.trim();
    const exp = document.getElementById('t-exp')?.value;
    const msg = document.getElementById('t-msg')?.value.trim();

    if (!name) { alert('অনুগ্রহ করে নাম লিখুন।'); return; }
    if (!phone) { alert('অনুগ্রহ করে ফোন নম্বর লিখুন।'); return; }
    if (!TeacherState.gender) { alert('অনুগ্রহ করে পরিচয় বেছে নিন।'); return; }
    if (!TeacherState.hafez) { alert('অনুগ্রহ করে হাফেজ অপশন বেছে নিন।'); return; }
    if (!TeacherState.langs.length) { alert('অনুগ্রহ করে অন্তত একটি ভাষা বেছে নিন।'); return; }
    if (!TeacherState.device) { alert('অনুগ্রহ করে ল্যাপটপ ও ইন্টারনেট অপশন বেছে নিন।'); return; }
    if (TeacherState.device === 'no') { alert('দুঃখিত, ক্লাস নেওয়ার জন্য ল্যাপটপ ও ইন্টারনেট থাকা আবশ্যক।'); return; }
    
    if (!document.getElementById('c1')?.checked || !document.getElementById('c2')?.checked || !document.getElementById('c3')?.checked) {
        alert('অনুগ্রহ করে সকল শর্তে টিক দিন।'); return;
    }

    const gT = { male: 'পুরুষ', female: 'মহিলা' };
    const hT = { yes: 'হ্যাঁ, হাফেজ ও আলেম', no: 'না, তবে ভালো পারি' };
    const lT = { bn: 'বাংলা', en: 'ইংরেজি', ar: 'আরবি' };

    let t = `আসসালামু আলাইকুম,\nআমি Global Islamic Care-এ শিক্ষক হিসেবে যোগ দিতে আগ্রহী।\n\n`;
    t += `👤 নাম: ${name}\n📞 ফোন: ${phone}\n`;
    t += `🧑 পরিচয়: ${gT[TeacherState.gender] || 'উল্লিখিত নেই'}\n`;
    t += `📖 হাফেজ: ${hT[TeacherState.hafez] || 'উল্লিখিত নেই'}\n`;
    t += `🌐 ভাষা: ${TeacherState.langs.map(l => lT[l]).join(', ')}\n`;
    t += `💻 ল্যাপটপ ও ইন্টারনেট: আছে\n`;
    if (exp) t += `📚 অভিজ্ঞতা: ${exp}\n`;
    if (msg) t += `\n💬 অতিরিক্ত: ${msg}`;
    t += `\n\n✅ আমি সকল নিয়মকানুন মেনে চলতে সম্মত।`;

    showToast('✅ WhatsApp খুলছে...');
    setTimeout(() => {
        window.open('https://wa.me/8801733017521?text=' + encodeURIComponent(t), '_blank');
    }, 1000);
}
