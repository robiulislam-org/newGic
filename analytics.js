// Global Islamic Care - Analytics Script v4
// IP + Platform + Device Fingerprint + Persistent Gmail Recall
import { supabaseUrl, supabaseAnonKey } from "./gic-config.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const isSupabaseConfigured =
  supabaseUrl &&
  supabaseUrl !== "PLACEHOLDER_SUPABASE_URL" &&
  supabaseAnonKey &&
  supabaseAnonKey !== "PLACEHOLDER_SUPABASE_ANON_KEY";

let supabase          = null;
let sessionId         = null;
let userIpAddress     = "";
let userLocation      = { country: "Unknown", city: "Unknown" };
let currentPage       = "home";
let liveChannel       = null;
let sessionJoinedAt   = new Date().toISOString();
let pageStartTime     = Date.now();
let lastTrackedPageId = null;
let referrerInfo      = {};
let deviceFingerprint = "";

// ─── DEVICE FINGERPRINT ─────────────────────────────────────────────────────────
// Generates a stable ID from device characteristics.
// This is NOT 100% unique but identifies the same device with high probability.
function buildDeviceFingerprint() {
  const components = [
    navigator.userAgent || "",
    navigator.language  || "",
    screen.width + "x" + screen.height,
    screen.colorDepth   || "",
    Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    navigator.hardwareConcurrency || "",
    navigator.platform  || ""
  ];
  const raw = components.join("|");
  // Simple deterministic hash
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = (Math.imul(31, h) + raw.charCodeAt(i)) | 0;
  }
  return "fp_" + Math.abs(h).toString(36);
}

// ─── PERSISTENT VISITOR ID ──────────────────────────────────────────────────────
// Stores a unique visitor ID in localStorage so the SAME device is recognized
// across sessions — even without login.
function getOrCreateVisitorId() {
  let vid = localStorage.getItem("gic_visitor_id");
  if (!vid) {
    vid = "v_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8);
    localStorage.setItem("gic_visitor_id", vid);
  }
  return vid;
}

// ─── GET STUDENT EMAIL ──────────────────────────────────────────────────────────
// Returns Gmail if visitor has EVER logged in on this device.
// Works even if the session "expired" — the email is kept separately for analytics.
function getStudentEmail() {
  try {
    // 1. Check active session
    const s = JSON.parse(localStorage.getItem("gic_student_session") || "null");
    if (s && s.email) {
      // Cache it separately for resilience
      localStorage.setItem("gic_known_email", s.email);
      return s.email;
    }
    // 2. Fall back to cached email from previous login on this device
    const cached = localStorage.getItem("gic_known_email") || "";
    return cached;
  } catch (e) { return ""; }
}

// ─── DEVICE INFO ───────────────────────────────────────────────────────────────
function getDeviceInfo() {
  const ua = navigator.userAgent;
  let deviceType = "Desktop";
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    deviceType = /iPad/i.test(ua) ? "Tablet" : "Mobile";
  }
  let browser = "Other";
  if      (ua.includes("Chrome") && !ua.includes("Edg"))  browser = "Chrome";
  else if (ua.includes("Firefox"))                          browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg"))                              browser = "Edge";
  let os = "Other";
  if      (ua.includes("Windows"))  os = "Windows";
  else if (ua.includes("Android"))  os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Mac"))      os = "macOS";
  else if (ua.includes("Linux"))    os = "Linux";
  return { deviceType, browser, os };
}

// ─── REFERRER / TRAFFIC SOURCE ─────────────────────────────────────────────────
function detectReferrerSource() {
  const urlParams     = new URLSearchParams(window.location.search);
  const utmSource     = urlParams.get("utm_source")   || "";
  const utmMedium     = urlParams.get("utm_medium")   || "";
  const utmCampaign   = urlParams.get("utm_campaign") || "";

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
    else if (src.includes("instagram")|| src.includes("ig"))       referrerSource = "instagram";
    else if (src.includes("twitter")  || src.includes("x.com"))   referrerSource = "twitter";
    else if (src.includes("google"))                               referrerSource = "google";
    else if (src.includes("tiktok"))                               referrerSource = "tiktok";
    else referrerSource = storedUtmSource.toLowerCase().substring(0, 30);
  } else if (rawReferrer) {
    try {
      const refHost = new URL(rawReferrer).hostname.toLowerCase();
      if      (refHost.includes("facebook.com") || refHost.includes("l.facebook.com")) referrerSource = "facebook";
      else if (refHost.includes("youtube.com")  || refHost.includes("youtu.be"))       referrerSource = "youtube";
      else if (refHost.includes("linkedin.com"))   referrerSource = "linkedin";
      else if (refHost.includes("instagram.com"))  referrerSource = "instagram";
      else if (refHost.includes("twitter.com") || refHost.includes("x.com") || refHost.includes("t.co")) referrerSource = "twitter";
      else if (refHost.includes("google."))        referrerSource = "google";
      else if (refHost.includes("tiktok.com"))     referrerSource = "tiktok";
      else if (refHost.includes("bing.com"))       referrerSource = "bing";
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

// ─── PAGE TIME FLUSH ────────────────────────────────────────────────────────────
async function flushTimeOnPage(pageId) {
  if (!supabase || !pageId) return;
  const elapsed = Math.round((Date.now() - pageStartTime) / 1000);
  if (elapsed < 2) return;
  try {
    await supabase.from("analytics_events").insert({
      event_type:         "page_time",
      page:               pageId,
      country:            userLocation.country,
      city:               userLocation.city,
      ip_address:         userIpAddress,
      student_email:      getStudentEmail(),
      device_fingerprint: deviceFingerprint,
      visitor_id:         getOrCreateVisitorId(),
      time_on_page:       elapsed,
      ...referrerInfo
    });
  } catch (e) {
    console.warn("📊 GIC: page_time flush failed", e);
  }
}

// ─── CORE INIT ──────────────────────────────────────────────────────────────────
async function initAnalytics() {
  if (!isSupabaseConfigured) return;
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Session ID (per-tab)
    sessionId = sessionStorage.getItem("gic_analytics_session");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("gic_analytics_session", sessionId);
    }

    // Build device fingerprint
    deviceFingerprint = buildDeviceFingerprint();

    // Referrer
    referrerInfo = detectReferrerSource();

    // IP + Location
    try {
      const res = await fetch("https://freeipapi.com/api/json");
      if (res.ok) {
        const d = await res.json();
        userIpAddress        = d.ipAddress   || "";
        userLocation.country = d.countryName || "Unknown";
        userLocation.city    = d.cityName    || "Unknown";
      }
    } catch (e) {
      console.warn("📊 GIC: IP fetch failed", e);
    }

    // Active page
    const activeDiv = document.querySelector(".page.active");
    if (activeDiv) currentPage = activeDiv.id.replace("page-", "");
    lastTrackedPageId = currentPage;
    pageStartTime     = Date.now();

    await trackEvent("pageview", currentPage);
    setupPresence();
    setupEventListeners();
    setupTimeTracking();

  } catch (err) {
    console.error("📊 GIC Analytics init failed:", err);
  }
}

// ─── TRACK EVENT ────────────────────────────────────────────────────────────────
async function trackEvent(eventType, pageId, extraData = {}) {
  if (!supabase) return;
  const dev = getDeviceInfo();
  try {
    await supabase.from("analytics_events").insert({
      event_type:         eventType,
      page:               pageId,
      country:            userLocation.country,
      city:               userLocation.city,
      ip_address:         userIpAddress,
      student_email:      getStudentEmail(),
      device_fingerprint: deviceFingerprint,
      visitor_id:         getOrCreateVisitorId(),
      device_type:        dev.deviceType,
      browser:            dev.browser,
      os:                 dev.os,
      ...referrerInfo,
      ...extraData
    });
  } catch (e) {
    console.error("📊 GIC: Failed to log event.", e);
  }
}

// ─── REAL-TIME PRESENCE ─────────────────────────────────────────────────────────
function setupPresence() {
  if (!supabase || !sessionId) return;
  liveChannel = supabase.channel("gic-live-room");
  liveChannel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") updatePresenceState();
  });
}

async function updatePresenceState() {
  if (!liveChannel) return;
  const dev = getDeviceInfo();
  try {
    await liveChannel.track({
      session_id:         sessionId,
      page:               currentPage,
      country:            userLocation.country,
      city:               userLocation.city,
      ip_address:         userIpAddress,
      student_email:      getStudentEmail(),
      device_fingerprint: deviceFingerprint,
      visitor_id:         getOrCreateVisitorId(),
      device_type:        dev.deviceType,
      browser:            dev.browser,
      os:                 dev.os,
      joined_at:          sessionJoinedAt,
      referrer_source:    referrerInfo.referrer_source || "direct"
    });
  } catch (e) {
    console.warn("📊 Presence failed", e);
  }
}

// ─── PAGE TIME TRACKING ─────────────────────────────────────────────────────────
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

// ─── WHATSAPP CLICK ─────────────────────────────────────────────────────────────
export async function trackWhatsAppClick(pageId) {
  await trackEvent("whatsapp_click", pageId);
}

// ─── EVENT LISTENERS ────────────────────────────────────────────────────────────
function setupEventListeners() {
  if (window.showPage) {
    const orig = window.showPage;
    window.showPage = async function(id, ...args) {
      await flushTimeOnPage(lastTrackedPageId);
      orig(id, ...args);
      currentPage       = id;
      lastTrackedPageId = id;
      pageStartTime     = Date.now();
      trackEvent("pageview", id);
      updatePresenceState();
    };
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a && a.href && a.href.includes("wa.me")) {
      trackWhatsAppClick(currentPage);
    }
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────────
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnalytics);
} else {
  initAnalytics();
}
