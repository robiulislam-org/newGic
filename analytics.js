// Global Islamic Care - Analytics Script v3 (IP + Gmail Tracking)
import { supabaseUrl, supabaseAnonKey } from "./gic-config.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const isSupabaseConfigured =
  supabaseUrl &&
  supabaseUrl !== "PLACEHOLDER_SUPABASE_URL" &&
  supabaseAnonKey &&
  supabaseAnonKey !== "PLACEHOLDER_SUPABASE_ANON_KEY";

let supabase      = null;
let sessionId     = null;
let userIpAddress = "";
let userLocation  = { country: "Unknown", city: "Unknown" };
let currentPage   = "home";
let liveChannel   = null;
let sessionJoinedAt  = new Date().toISOString();
let pageStartTime    = Date.now();
let lastTrackedPageId = null;
let referrerInfo  = {};

// ─── Get student email from localStorage (if logged in) ────────────────────────
function getStudentEmail() {
  try {
    const s = JSON.parse(localStorage.getItem("gic_student_session") || "null");
    return (s && s.email) ? s.email : "";
  } catch (e) { return ""; }
}

// ─── Referrer / Traffic Source Detection ───────────────────────────────────────
function detectReferrerSource() {
  const urlParams = new URLSearchParams(window.location.search);

  const utmSource   = urlParams.get("utm_source")   || "";
  const utmMedium   = urlParams.get("utm_medium")   || "";
  const utmCampaign = urlParams.get("utm_campaign") || "";

  if (utmSource) {
    sessionStorage.setItem("gic_utm_source",   utmSource);
    sessionStorage.setItem("gic_utm_medium",   utmMedium);
    sessionStorage.setItem("gic_utm_campaign", utmCampaign);
  }

  const storedUtmSource   = sessionStorage.getItem("gic_utm_source")   || utmSource;
  const storedUtmMedium   = sessionStorage.getItem("gic_utm_medium")   || utmMedium;
  const storedUtmCampaign = sessionStorage.getItem("gic_utm_campaign") || utmCampaign;

  const rawReferrer = document.referrer || "";
  let referrerSource = "direct";

  if (storedUtmSource) {
    const src = storedUtmSource.toLowerCase();
    if      (src.includes("facebook") || src.includes("fb"))       referrerSource = "facebook";
    else if (src.includes("youtube")  || src.includes("yt"))       referrerSource = "youtube";
    else if (src.includes("linkedin"))                              referrerSource = "linkedin";
    else if (src.includes("instagram") || src.includes("ig"))      referrerSource = "instagram";
    else if (src.includes("twitter")  || src.includes("x.com"))   referrerSource = "twitter";
    else if (src.includes("google"))                               referrerSource = "google";
    else if (src.includes("tiktok"))                               referrerSource = "tiktok";
    else referrerSource = storedUtmSource.toLowerCase().substring(0, 30);
  } else if (rawReferrer) {
    try {
      const refHost = new URL(rawReferrer).hostname.toLowerCase();
      if      (refHost.includes("facebook.com") || refHost.includes("fb.com") || refHost.includes("l.facebook.com")) referrerSource = "facebook";
      else if (refHost.includes("youtube.com")  || refHost.includes("youtu.be"))  referrerSource = "youtube";
      else if (refHost.includes("linkedin.com"))   referrerSource = "linkedin";
      else if (refHost.includes("instagram.com"))  referrerSource = "instagram";
      else if (refHost.includes("twitter.com") || refHost.includes("x.com") || refHost.includes("t.co")) referrerSource = "twitter";
      else if (refHost.includes("google.")     || refHost.includes("googleadservices.com")) referrerSource = "google";
      else if (refHost.includes("tiktok.com")  || refHost.includes("vm.tiktok.com")) referrerSource = "tiktok";
      else if (refHost.includes("bing.com"))   referrerSource = "bing";
      else referrerSource = "other";
    } catch (e) { referrerSource = "other"; }
  }

  return {
    referrer_source:  referrerSource,
    referrer_url:     rawReferrer.substring(0, 500),
    utm_source:       storedUtmSource.substring(0, 100),
    utm_medium:       storedUtmMedium.substring(0, 100),
    utm_campaign:     storedUtmCampaign.substring(0, 200)
  };
}

// ─── Time on Page Tracking ─────────────────────────────────────────────────────
async function flushTimeOnPage(pageId) {
  if (!supabase || !pageId) return;
  const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
  if (elapsed < 2) return;

  try {
    await supabase.from("analytics_events").insert({
      event_type:    "page_time",
      page:          pageId,
      country:       userLocation.country,
      city:          userLocation.city,
      ip_address:    userIpAddress,
      student_email: getStudentEmail(),
      time_on_page:  elapsed,
      ...referrerInfo
    });
  } catch (e) {
    console.warn("📊 GIC Analytics: page_time flush failed", e);
  }
}

// ─── Core Analytics Initializer ────────────────────────────────────────────────
async function initAnalytics() {
  if (!isSupabaseConfigured) {
    console.log("📊 GIC Analytics: Supabase not configured.");
    return;
  }

  try {
    supabase  = createClient(supabaseUrl, supabaseAnonKey);

    // Session ID
    sessionId = sessionStorage.getItem("gic_analytics_session");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("gic_analytics_session", sessionId);
    }

    // Referrer detection
    referrerInfo = detectReferrerSource();

    // ── Fetch IP + Location ──────────────────────────────────────
    try {
      const response = await fetch("https://freeipapi.com/api/json");
      if (response.ok) {
        const data    = await response.json();
        userIpAddress          = data.ipAddress   || "";
        userLocation.country   = data.countryName || "Unknown";
        userLocation.city      = data.cityName    || "Unknown";
      }
    } catch (e) {
      console.warn("📊 GIC Analytics: IP/Location fetch failed.", e);
    }

    // Active page
    const activePageDiv = document.querySelector(".page.active");
    if (activePageDiv) {
      currentPage = activePageDiv.id.replace("page-", "");
    }
    lastTrackedPageId = currentPage;
    pageStartTime     = Date.now();

    // Track first pageview
    await trackEvent("pageview", currentPage);
    setupPresence();
    setupEventListeners();
    setupTimeTracking();

  } catch (error) {
    console.error("📊 GIC Analytics init failed:", error);
  }
}

// ─── Track Event ────────────────────────────────────────────────────────────────
async function trackEvent(eventType, pageId, extraData = {}) {
  if (!supabase) return;
  try {
    const { error } = await supabase
      .from("analytics_events")
      .insert({
        event_type:    eventType,
        page:          pageId,
        country:       userLocation.country,
        city:          userLocation.city,
        ip_address:    userIpAddress,
        student_email: getStudentEmail(),
        ...referrerInfo,
        ...extraData
      });
    if (error) throw error;
  } catch (e) {
    console.error("📊 GIC Analytics: Failed to log event.", e);
  }
}

// ─── Supabase Real-time Presence (Live Visitors) ───────────────────────────────
function setupPresence() {
  if (!supabase || !sessionId) return;
  liveChannel = supabase.channel("gic-live-room");
  liveChannel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") updatePresenceState();
  });
}

async function updatePresenceState() {
  if (!liveChannel) return;
  try {
    await liveChannel.track({
      session_id:      sessionId,
      page:            currentPage,
      country:         userLocation.country,
      city:            userLocation.city,
      ip_address:      userIpAddress,
      student_email:   getStudentEmail(),
      joined_at:       sessionJoinedAt,
      referrer_source: referrerInfo.referrer_source || "direct"
    });
  } catch (e) {
    console.warn("📊 Presence tracking failed", e);
  }
}

// ─── Page Time Setup ───────────────────────────────────────────────────────────
function setupTimeTracking() {
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "hidden") {
      await flushTimeOnPage(lastTrackedPageId);
      pageStartTime = Date.now();
    }
  });
  window.addEventListener("beforeunload", () => {
    flushTimeOnPage(lastTrackedPageId);
  });
}

// ─── Track WhatsApp Click ──────────────────────────────────────────────────────
export async function trackWhatsAppClick(pageId) {
  await trackEvent("whatsapp_click", pageId);
}

// ─── Event Listeners ────────────────────────────────────────────────────────────
function setupEventListeners() {
  // Wrap showPage to track navigation + page time
  if (window.showPage) {
    const originalShowPage = window.showPage;
    window.showPage = async function(id, ...args) {
      await flushTimeOnPage(lastTrackedPageId);
      originalShowPage(id, ...args);
      currentPage       = id;
      lastTrackedPageId = id;
      pageStartTime     = Date.now();
      trackEvent("pageview", id);
      updatePresenceState();
    };
  }

  // WhatsApp click tracking
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor && anchor.href && anchor.href.includes("wa.me")) {
      trackWhatsAppClick(currentPage);
    }
  });
}

// ─── Initialize ────────────────────────────────────────────────────────────────
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnalytics);
} else {
  initAnalytics();
}
