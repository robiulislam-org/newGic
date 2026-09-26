/**
 * Global Islamic Care — Cookie & Privacy Consent Banner
 * Compliant with Google AdSense, GDPR & Local Privacy Guidelines
 */
(function() {
  if (typeof window === 'undefined') return;
  const CONSENT_KEY = 'gic_cookie_consent_status';

  // Do not show if already accepted
  if (localStorage.getItem(CONSENT_KEY) === 'accepted') {
    return;
  }

  function initBanner() {
    if (document.getElementById('gic-cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'gic-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'কুকিজ ও গোপনীয়তা সম্মতি');

    banner.innerHTML = `
      <style>
        #gic-cookie-banner {
          position: fixed;
          bottom: 20px;
          right: 20px;
          max-width: 440px;
          width: calc(100% - 40px);
          background: rgba(10, 22, 40, 0.96);
          color: #F8FAFC;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(200, 151, 42, 0.35);
          border-radius: 16px;
          padding: 18px 22px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
          z-index: 99999;
          font-family: 'Noto Serif Bengali', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 13.5px;
          line-height: 1.6;
          animation: gicSlideUp 0.35s ease-out;
        }
        @keyframes gicSlideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .gic-cb-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 14.5px;
          color: #E4B94A;
          margin-bottom: 6px;
        }
        .gic-cb-text {
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 14px;
        }
        .gic-cb-text a {
          color: #E4B94A;
          text-decoration: underline;
          font-weight: 600;
        }
        .gic-cb-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }
        .gic-cb-btn {
          background: linear-gradient(135deg, #C8972A, #E4B94A);
          color: #0A1628;
          border: none;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .gic-cb-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(200, 151, 42, 0.4);
        }
        @media (max-width: 600px) {
          #gic-cookie-banner {
            bottom: 12px;
            right: 12px;
            left: 12px;
            width: auto;
            max-width: none;
            padding: 16px 18px;
          }
        }
      </style>
      <div class="gic-cb-title">
        <span>🍪 কুকিজ ও ডেটা সুরক্ষা সম্মতি</span>
      </div>
      <div class="gic-cb-text">
        আমরা ওয়েবসাইটের ব্রাউজিং অভিজ্ঞতা ও মানসম্মত সেবা প্রদানের স্বার্থে কুকিজ (Cookies) ব্যবহার করে থাকি। বিস্তারিত তথ্যের জন্য আমাদের <a href="/policy#privacy" target="_blank">গোপনীয়তা নীতি (Privacy Policy)</a> দেখুন।
      </div>
      <div class="gic-cb-actions">
        <button type="button" class="gic-cb-btn" id="gic-accept-cookies">সম্মতি দিচ্ছি (Accept)</button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('gic-accept-cookies').addEventListener('click', function() {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function() {
        if (banner.parentNode) banner.parentNode.removeChild(banner);
      }, 300);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
  } else {
    initBanner();
  }
})();
