// Global Islamic Care - Analytics Script v2 (Supabase Edition)
// Features: Traffic Source Detection, Page Time Tracking, WhatsApp Click Tracking
import { supabaseUrl, supabaseAnonKey } from "./gic-config.js";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseUrl !== "PLACEHOLDER_SUPABASE_URL" && 
  supabaseAnonKey && 
  supabaseAnonKey !== "PLACEHOLDER_SUPABASE_ANON_KEY";

let supabase = null;
let sessionId = null;
let userLocation = { country: "Unknown", city: "Unknown" };
let currentPage = "home";
let liveChannel = null;
let sessionJoinedAt = new Date().toISOString();
let pageStartTime = Date.now();
let lastTrackedPageId = null;
let referrerInfo = {};

// ─── Referrer / Traffic Source Detection ───────────────────────────────────────
function detectReferrerSource() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // 1. Priority: UTM parameters (set manually in links)
  const utmSource   = urlParams.get("utm_source")   || "";
  const utmMedium   = urlParams.get("utm_medium")   || "";
  const utmCampaign = urlParams.get("utm_campaign") || "";

  // Persist UTM data in session (so inner page navigations keep the source)
  if (utmSource) {
    sessionStorage.setItem("gic_utm_source",   utmSource);
    sessionStorage.setItem("gic_utm_medium",   utmMedium);
    sessionStorage.setItem("gic_utm_campaign", utmCampaign);
  }

  const storedUtmSource   = sessionStorage.getItem("gic_utm_source")   || utmSource;
  const storedUtmMedium   = sessionStorage.getItem("gic_utm_medium")   || utmMedium;
  const storedUtmCampaign = sessionStorage.getItem("gic_utm_campaign") || utmCampaign;

  // 2. Fallback: document.referrer
  const rawReferrer = document.referrer || "";
  let referrerSource = "direct";

  if (storedUtmSource) {
    // Map known UTM sources to canonical names
    const src = storedUtmSource.toLowerCase();
    if (src.includes("facebook") || src.includes("fb")) referrerSource = "facebook";
    else if (src.includes("youtube") || src.includes("yt")) referrerSource = "youtube";
    else if (src.includes("linkedin")) referrerSource = "linkedin";
    else if (src.includes("instagram") || src.includes("ig")) referrerSource = "instagram";
    else if (src.includes("twitter") || src.includes("x.com")) referrerSource = "twitter";
    else if (src.includes("google")) referrerSource = "google";
    else if (src.includes("tiktok")) referrerSource = "tiktok";
    else referrerSource = storedUtmSource.toLowerCase().substring(0, 30);
  } else if (rawReferrer) {
    // Parse from referrer URL
    try {
      const refHost = new URL(rawReferrer).hostname.toLowerCase();
      if (refHost.includes("facebook.com") || refHost.includes("fb.com") || refHost.includes("l.facebook.com")) {
        referrerSource = "facebook";
      } else if (refHost.includes("youtube.com") || refHost.includes("youtu.be")) {
        referrerSource = "youtube";
      } else if (refHost.includes("linkedin.com")) {
        referrerSource = "linkedin";
      } else if (refHost.includes("instagram.com")) {
        referrerSource = "instagram";
      } else if (refHost.includes("twitter.com") || refHost.includes("x.com") || refHost.includes("t.co")) {
        referrerSource = "twitter";
      } else if (refHost.includes("google.") || refHost.includes("googleadservices.com")) {
        referrerSource = "google";
      } else if (refHost.includes("tiktok.com") || refHost.includes("vm.tiktok.com")) {
        referrerSource = "tiktok";
      } else if (refHost.includes("bing.com")) {
        referrerSource = "bing";
      } else if (refHost.includes("yahoo.com")) {
        referrerSource = "yahoo";
      } else {
        referrerSource = "other";
      }
    } catch (e) {
      referrerSource = "other";
    }
  } else {
    referrerSource = "direct";
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
  const elapsed = Math.round((Date.now() - pageStartTime) / 1000); // seconds
  if (elapsed < 2) return; // ignore bounces under 2 seconds

  try {
    await supabase.from("analytics_events").insert({
      event_type:       "page_time",
      page:             pageId,
      country:          userLocation.country,
      city:             userLocation.city,
      time_on_page:     elapsed,
      ...referrerInfo
    });
  } catch (e) {
    console.warn("📊 GIC Analytics: page_time flush failed", e);
  }
}

// ─── Core Analytics Initializer ────────────────────────────────────────────────
async function initAnalytics() {
  if (!isSupabaseConfigured) {
    console.log("📊 GIC Analytics: Supabase is not configured yet. Setup gic-config.js to enable tracking.");
    return;
  }

  try {
    // 1. Initialize Supabase
    supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 2. Get/Create Session ID
    sessionId = sessionStorage.getItem("gic_analytics_session");
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      sessionStorage.setItem("gic_analytics_session", sessionId);
    }

    // 3. Detect referrer/traffic source
    referrerInfo = detectReferrerSource();

    // 4. Fetch location (free API, no keys required)
    try {
      const response = await fetch("https://freeipapi.com/api/json");
      if (response.ok) {
        const data = await response.json();
        userLocation.country = data.countryName || "Unknown";
        userLocation.city    = data.cityName    || "Unknown";
      }
    } catch (e) {
      console.warn("📊 GIC Analytics: Location fetch failed. Using default.", e);
    }

    // 5. Determine currently active page
    const activePageDiv = document.querySelector(".page.active");
    if (activePageDiv) {
      currentPage = activePageDiv.id.replace("page-", "");
    }
    lastTrackedPageId = currentPage;
    pageStartTime = Date.now();

    // 6. Track pageview event & Join real-time presence
    await trackEvent("pageview", currentPage);
    setupPresence();
    setupEventListeners();
    setupTimeTracking();

  } catch (error) {
    console.error("📊 GIC Analytics initialization failed:", error);
  }
}

// ─── Track Event in Supabase table ────────────────────────────────────────────
async function trackEvent(eventType, pageId, extraData = {}) {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from("analytics_events")
      .insert({
        event_type:  eventType,
        page:        pageId,
        country:     userLocation.country,
        city:        userLocation.city,
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
    if (status === "SUBSCRIBED") {
      updatePresenceState();
    }
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
      joined_at:       sessionJoinedAt,
      referrer_source: referrerInfo.referrer_source || "direct"
    });
  } catch (e) {
    console.warn("📊 Presence tracking failed", e);
  }
}

// ─── Page Time Setup ───────────────────────────────────────────────────────────
function setupTimeTracking() {
  // Flush on page hide / tab switch / close
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState === "hidden") {
      await flushTimeOnPage(lastTrackedPageId);
      pageStartTime = Date.now(); // reset for when they come back
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

// ─── Event Listeners (Page Navigation + WA Clicks) ────────────────────────────
function setupEventListeners() {
  // Wrap existing navigation showPage function
  if (window.showPage) {
    const originalShowPage = window.showPage;
    window.showPage = async function(id) {
      // Flush time on previous page before navigating
      await flushTimeOnPage(lastTrackedPageId);
      
      originalShowPage(id);
      currentPage = id;
      lastTrackedPageId = id;
      pageStartTime = Date.now();

      trackEvent("pageview", id);
      updatePresenceState(); // update live active page
    };
  }

  // Intercept clicks on WhatsApp links
  document.addEventListener("click", (e) => {
    const anchor = e.target.closest("a");
    if (anchor && anchor.href && anchor.href.includes("wa.me")) {
      trackWhatsAppClick(currentPage);
    }
  });
}

// ─── Initialize on page load ───────────────────────────────────────────────────
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnalytics);
} else {
  initAnalytics();
}
