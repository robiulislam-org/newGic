// Global Islamic Care - Analytics Script
import { firebaseConfig } from "./gic-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, remove, onDisconnect, increment, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Check if firebase is configured
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "PLACEHOLDER_API_KEY" && 
  firebaseConfig.databaseURL && 
  firebaseConfig.databaseURL !== "PLACEHOLDER_DATABASE_URL";

let db = null;
let sessionId = null;
let userLocation = { country: "Unknown", city: "Unknown" };
let currentPage = "home";

// Helper to get formatted date in BDT/local (YYYY-MM-DD)
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function initAnalytics() {
  if (!isFirebaseConfigured) {
    console.log("📊 GIC Analytics: Firebase is not configured yet. Setup gic-config.js to enable tracking.");
    return;
  }

  try {
    // 1. Initialize Firebase
    const app = initializeApp(firebaseConfig);
    db = getDatabase(app);

    // 2. Get/Create Session ID
    sessionId = sessionStorage.getItem("gic_analytics_session");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("gic_analytics_session", sessionId);
    }

    // 3. Fetch location (IP API)
    try {
      const response = await fetch("https://freeipapi.com/api/json");
      if (response.ok) {
        const data = await response.json();
        userLocation.country = data.countryName || "Unknown";
        userLocation.city = data.cityName || "Unknown";
      }
    } catch (e) {
      console.warn("📊 GIC Analytics: Location fetch failed. Using fallback.", e);
    }

    // 4. Start tracking
    const path = window.location.pathname;
    // Determine active page on startup
    const activePageDiv = document.querySelector(".page.active");
    if (activePageDiv) {
      currentPage = activePageDiv.id.replace("page-", "");
    }

    trackPageView(currentPage);
    startHeartbeat();
    setupEventListeners();

  } catch (error) {
    console.error("📊 GIC Analytics initialization failed:", error);
  }
}

// Track Page View
function trackPageView(pageId) {
  if (!db || !sessionId) return;
  currentPage = pageId;

  const today = getTodayString();
  const updates = {};

  // Increment total daily pageviews
  updates[`analytics/daily/${today}/views`] = increment(1);
  // Increment specific page daily views
  updates[`analytics/daily/${today}/pages/${pageId}`] = increment(1);
  // Increment overall total page views
  updates[`analytics/pages/${pageId}`] = increment(1);

  // Update live visitor location and active page
  const liveRefPath = `live_visitors/${sessionId}`;
  updates[liveRefPath] = {
    page: pageId,
    country: userLocation.country,
    city: userLocation.city,
    lastPing: Date.now(),
    joinedAt: Date.now()
  };

  update(ref(db), updates)
    .then(() => {
      // Set up onDisconnect to remove live visitor node when user leaves/closes tab
      onDisconnect(ref(db, liveRefPath)).remove();
    })
    .catch(err => console.error("📊 GIC Analytics update failed:", err));
}

// Heartbeat ping (every 15 seconds) to stay marked as "live"
function startHeartbeat() {
  setInterval(() => {
    if (!db || !sessionId) return;
    const liveRef = ref(db, `live_visitors/${sessionId}/lastPing`);
    set(liveRef, Date.now()).catch(err => console.warn("📊 Heartbeat ping failed", err));
  }, 15000);
}

// Track custom event: WhatsApp Click
export function trackWhatsAppClick(pageId) {
  if (!db) return;
  const today = getTodayString();
  const updates = {};

  // Increment total daily whatsapp clicks
  updates[`analytics/daily/${today}/wa_clicks`] = increment(1);
  // Increment whatsapp clicks by page daily
  updates[`analytics/daily/${today}/wa_clicks_by_page/${pageId}`] = increment(1);
  // Increment overall total whatsapp clicks
  updates[`analytics/wa_clicks`] = increment(1);
  // Increment overall by page
  updates[`analytics/wa_clicks_by_page/${pageId}`] = increment(1);
  // Increment by region
  const locKey = `${userLocation.country}_${userLocation.city}`.replace(/[\.\#\$\[\]]/g, "-");
  updates[`analytics/regions/${locKey}`] = increment(1);

  update(ref(db), updates).catch(err => console.error("📊 WhatsApp click track failed:", err));
}

// Listen to navigation events and click events
function setupEventListeners() {
  // Wrap navigation showPage function
  if (window.showPage) {
    const originalShowPage = window.showPage;
    window.showPage = function(id) {
      originalShowPage(id);
      trackPageView(id);
    };
  }

  // Intercept WhatsApp links
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor && anchor.href && anchor.href.includes("wa.me")) {
      trackWhatsAppClick(currentPage);
    }
  });
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnalytics);
} else {
  initAnalytics();
}
