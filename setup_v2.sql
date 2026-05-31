-- =====================================================================
-- 📊 GIC Analytics Setup v2 — Traffic Source & Page Time Tracking
-- ✅ Run this in your Supabase SQL Editor after the original setup.sql
-- =====================================================================

-- 1. Add new columns to analytics_events table
alter table analytics_events
  add column if not exists referrer_source text default 'direct',
  add column if not exists referrer_url    text default '',
  add column if not exists utm_source      text default '',
  add column if not exists utm_medium      text default '',
  add column if not exists utm_campaign    text default '',
  add column if not exists time_on_page    integer default null;

-- 2. Add event_type support for 'page_time'
-- (no change needed — event_type is already a free-text column)

-- 3. Create helpful indexes for performance
create index if not exists idx_analytics_referrer_source 
  on analytics_events (referrer_source);

create index if not exists idx_analytics_created_at_bst
  on analytics_events (created_at);

create index if not exists idx_analytics_event_type
  on analytics_events (event_type);

-- 4. Update the get_analytics_summary function to include new data
create or replace function get_analytics_summary(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
  expected_password text := 'gicadmin786'; -- Replace with your dashboard password
begin
  -- Validate password
  if pass_code != expected_password then
    raise exception 'Unauthorized: Incorrect password provided.';
  end if;

  select json_build_object(

    -- ─── TODAY METRICS ──────────────────────────────────────────────────────
    'today_views', (
      select count(*) 
      from analytics_events 
      where event_type = 'pageview' 
        and created_at >= (timezone('Asia/Dhaka', now()))::date
    ),

    'today_wa_clicks', (
      select count(*) 
      from analytics_events 
      where event_type = 'whatsapp_click' 
        and created_at >= (timezone('Asia/Dhaka', now()))::date
    ),

    -- ─── TOP PAGES (by page views) ──────────────────────────────────────────
    'top_pages', (
      select json_agg(t) from (
        select page, count(*) as count 
        from analytics_events 
        where event_type = 'pageview' 
        group by page 
        order by count desc 
        limit 10
      ) t
    ),

    -- ─── TOP WHATSAPP SOURCE PAGES ───────────────────────────────────────────
    'top_wa_pages', (
      select json_agg(t) from (
        select page, count(*) as count 
        from analytics_events 
        where event_type = 'whatsapp_click' 
        group by page 
        order by count desc 
        limit 8
      ) t
    ),

    -- ─── TOP VISITOR REGIONS ────────────────────────────────────────────────
    'top_regions', (
      select json_agg(t) from (
        select country, city, count(*) as count 
        from analytics_events 
        group by country, city 
        order by count desc 
        limit 8
      ) t
    ),

    -- ─── LAST 7 DAYS DAILY TRAFFIC CHART ────────────────────────────────────
    'daily_traffic', (
      select json_agg(t) from (
        select 
          (timezone('Asia/Dhaka', created_at))::date::text as date,
          count(case when event_type = 'pageview' then 1 end) as views,
          count(case when event_type = 'whatsapp_click' then 1 end) as wa_clicks
        from analytics_events
        where created_at >= (timezone('Asia/Dhaka', now()))::date - interval '7 days'
        group by (timezone('Asia/Dhaka', created_at))::date
        order by (timezone('Asia/Dhaka', created_at))::date asc
      ) t
    ),

    -- ─── TRAFFIC SOURCES (all time) ─────────────────────────────────────────
    'traffic_sources', (
      select json_agg(t) from (
        select 
          coalesce(nullif(referrer_source, ''), 'direct') as source,
          count(*) as count
        from analytics_events
        where event_type = 'pageview'
          and referrer_source is not null
        group by coalesce(nullif(referrer_source, ''), 'direct')
        order by count desc
        limit 15
      ) t
    ),

    -- ─── TRAFFIC SOURCES TODAY ───────────────────────────────────────────────
    'traffic_sources_today', (
      select json_agg(t) from (
        select 
          coalesce(nullif(referrer_source, ''), 'direct') as source,
          count(*) as count
        from analytics_events
        where event_type = 'pageview'
          and created_at >= (timezone('Asia/Dhaka', now()))::date
          and referrer_source is not null
        group by coalesce(nullif(referrer_source, ''), 'direct')
        order by count desc
      ) t
    ),

    -- ─── PAGE TIME STATS (avg seconds per page) ──────────────────────────────
    'page_time_stats', (
      select json_agg(t) from (
        select 
          page,
          round(avg(time_on_page)) as avg_seconds,
          count(*) as sessions,
          round(sum(time_on_page) / 60.0, 1) as total_minutes
        from analytics_events
        where event_type = 'page_time'
          and time_on_page is not null
          and time_on_page > 2
          and time_on_page < 3600
        group by page
        order by avg_seconds desc
        limit 10
      ) t
    ),

    -- ─── PAGE TIME TODAY ────────────────────────────────────────────────────
    'page_time_today', (
      select json_agg(t) from (
        select 
          page,
          round(avg(time_on_page)) as avg_seconds,
          count(*) as sessions
        from analytics_events
        where event_type = 'page_time'
          and created_at >= (timezone('Asia/Dhaka', now()))::date
          and time_on_page is not null
          and time_on_page > 2
          and time_on_page < 3600
        group by page
        order by avg_seconds desc
      ) t
    ),

    -- ─── UTM CAMPAIGNS ──────────────────────────────────────────────────────
    'utm_campaigns', (
      select json_agg(t) from (
        select 
          utm_campaign,
          utm_medium,
          utm_source,
          count(*) as visits
        from analytics_events
        where event_type = 'pageview'
          and utm_campaign != ''
          and utm_campaign is not null
        group by utm_campaign, utm_medium, utm_source
        order by visits desc
        limit 10
      ) t
    )

  ) into result;

  return result;
end;
$$;

-- ─── Helper view: Quick source summary (optional) ────────────────────────────
create or replace view source_summary_view as
select
  coalesce(nullif(referrer_source, ''), 'direct') as source,
  count(*) filter (where event_type = 'pageview') as pageviews,
  count(*) filter (where event_type = 'whatsapp_click') as wa_clicks,
  round(avg(time_on_page) filter (where event_type = 'page_time' and time_on_page > 2)) as avg_time_seconds
from analytics_events
group by 1
order by pageviews desc;

-- =====================================================================
-- ✅ Done! Your analytics system now tracks:
--   • Traffic sources (Facebook, YouTube, LinkedIn, Google, Direct, etc.)
--   • UTM campaign parameters
--   • Time spent on each page
--   • All previous metrics (pageviews, WA clicks, regions, daily chart)
-- =====================================================================
