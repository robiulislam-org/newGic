-- =====================================================================
-- 📊 GIC Upgrade: Global Visitor IP & Device Tracking for Analytics
-- Copy and paste this entire script into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. Add IP address and user agent columns to analytics_events table
alter table analytics_events add column if not exists ip_address text default '';
alter table analytics_events add column if not exists user_agent text default '';

-- 2. Create the before-insert trigger function to auto-detect IP & User Agent on every event insertion
create or replace function trg_analytics_events_ip_ua()
returns trigger as $$
declare
  v_req_headers json;
  v_detected_ip text;
  v_detected_ua text;
begin
  -- Extract details from postgrest request headers
  begin
    v_req_headers := current_setting('request.headers', true)::json;
    if v_req_headers is not null then
      v_detected_ip := split_part(v_req_headers->>'x-forwarded-for', ',', 1);
      v_detected_ua := v_req_headers->>'user-agent';
    end if;
  exception when others then
    -- Fail-safe: leave as empty if request headers are not defined
  end;

  -- Set columns automatically if empty
  new.ip_address := coalesce(nullif(trim(new.ip_address), ''), nullif(trim(v_detected_ip), ''), '');
  new.user_agent := coalesce(nullif(trim(new.user_agent), ''), nullif(trim(v_detected_ua), ''), '');

  return new;
end;
$$ language plpgsql security definer;

-- 3. Bind the trigger to analytics_events table
drop trigger if exists trg_analytics_events_ip_ua_before on analytics_events;
create trigger trg_analytics_events_ip_ua_before
before insert on analytics_events
for each row
execute function trg_analytics_events_ip_ua();

-- 4. Recreate get_analytics_summary to return visitor IP & device in today's events timeline
create or replace function get_analytics_summary(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
  expected_password text := 'gicadmin786'; -- Replace with your desired dashboard password
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

    -- ─── TODAY EVENTS LOG (Timezone adjusted with IP and Device Info) ────────
    'today_events', (
      select json_agg(t) from (
        select 
          to_char(timezone('Asia/Dhaka', created_at), 'HH:MI AM') as time,
          event_type,
          page,
          coalesce(nullif(referrer_source, ''), 'direct') as source,
          coalesce(city, 'Unknown') as city,
          coalesce(country, 'Unknown') as country,
          coalesce(ip_address, '') as ip_address,
          coalesce(user_agent, '') as user_agent
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
