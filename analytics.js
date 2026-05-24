// Global Islamic Care - Analytics Script (Supabase Edition)
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

    // 3. Fetch location (free API, no keys required)
    try {
      const response = await fetch("https://freeipapi.com/api/json");
      if (response.ok) {
        const data = await response.json();
        userLocation.country = data.countryName || "Unknown";
        userLocation.city = data.cityName || "Unknown";
      }
    } catch (e) {
      console.warn("📊 GIC Analytics: Location fetch failed. Using default.", e);
    }

    // 4. Determine currently active page
    const activePageDiv = document.querySelector(".page.active");
    if (activePageDiv) {
      currentPage = activePageDiv.id.replace("page-", "");
    }

    // 5. Track pageview event & Join real-time presence
    await trackEvent("pageview", currentPage);
    setupPresence();
    setupEventListeners();

  } catch (error) {
    console.error("📊 GIC Analytics initialization failed:", error);
  }
}

// Track Event in Supabase table
async function trackEvent(eventType, pageId) {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from("analytics_events")
      .insert({
        event_type: eventType,
        page: pageId,
        country: userLocation.country,
        city: userLocation.city
      });
      
    if (error) throw error;
  } catch (e) {
    console.error("📊 GIC Analytics: Failed to log event.", e);
  }
}

// Join Supabase real-time Presence channel to show live status
function setupPresence() {
  if (!supabase || !sessionId) return;

  liveChannel = supabase.channel("gic-live-room");

  liveChannel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      updatePresenceState();
    }
  });
}

// Update what details are broadcast to other clients (like the admin dashboard)
async function updatePresenceState() {
  if (!liveChannel) return;
  
  try {
    await liveChannel.track({
      session_id: sessionId,
      page: currentPage,
      country: userLocation.country,
      city: userLocation.city,
      joined_at: sessionJoinedAt
    });
  } catch (e) {
    console.warn("📊 Presence tracking failed", e);
  }
}

// Track WhatsApp Click
export async function trackWhatsAppClick(pageId) {
  await trackEvent("whatsapp_click", pageId);
}

// Listen to navigation events and click events
function setupEventListeners() {
  // Wrap existing navigation showPage function
  if (window.showPage) {
    const originalShowPage = window.showPage;
    window.showPage = function(id) {
      originalShowPage(id);
      currentPage = id;
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

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnalytics);
} else {
  initAnalytics();
}
