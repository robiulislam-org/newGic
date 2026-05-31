-- =====================================================================
-- 📊 GIC Analytics Update Script (Today's Detail Analytics Additions)
-- Copy and paste this into your Supabase SQL Editor and click RUN.
-- =====================================================================

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

    -- ─── TOP PAGES TODAY ────────────────────────────────────────────────────
    'top_pages_today', (
      select json_agg(t) from (
        select page, count(*) as count 
        from analytics_events 
        where event_type = 'pageview' 
          and created_at >= (timezone('Asia/Dhaka', now()))::date
        group by page 
        order by count desc 
        limit 10
      ) t
    ),

    -- ─── TODAY EVENTS LOG ───────────────────────────────────────────────────
    'today_events', (
      select json_agg(t) from (
        select 
          to_char(timezone('Asia/Dhaka', created_at), 'HH:MI AM') as time,
          event_type,
          page,
          coalesce(nullif(referrer_source, ''), 'direct') as source,
          coalesce(city, 'Unknown') as city,
          coalesce(country, 'Unknown') as country
        from analytics_events
        where created_at >= (timezone('Asia/Dhaka', now()))::date
        order by created_at desc
        limit 50
      ) t
    ),

    -- ─── TOP PAGES (all time) ──────────────────────────────────────────
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
