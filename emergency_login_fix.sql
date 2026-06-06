-- ════════════════════════════════════════════════════════════
-- GIC EMERGENCY LOGIN FIX
-- Paste this ENTIRE file in Supabase SQL Editor and click RUN
-- ════════════════════════════════════════════════════════════

-- Step 1: Simple password check function (for fast login)
create or replace function get_admin_auth(pass_code text)
returns boolean
security definer
language plpgsql
as $$
begin
  return (pass_code = 'gicadmin786');
end;
$$;

-- Step 2: Fix the main analytics function (remove broken column references)
create or replace function get_analytics_summary(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
begin
  if pass_code != 'gicadmin786' then
    raise exception 'Unauthorized';
  end if;

  select json_build_object(

    'today_views', (
      select count(*) from analytics_events
      where event_type = 'pageview'
        and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
    ),

    'today_wa_clicks', (
      select count(*) from analytics_events
      where event_type = 'whatsapp_click'
        and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
    ),

    'today_new_logins', (
      select count(distinct student_email) from analytics_events
      where student_email != ''
        and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
    ),

    'traffic_sources_today', (
      select json_agg(t) from (
        select coalesce(nullif(referrer_source,''),'direct') as source, count(*) as count
        from analytics_events
        where event_type = 'pageview'
          and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        group by source order by count desc
      ) t
    ),

    'top_pages_today', (
      select json_agg(t) from (
        select page, count(*) as count
        from analytics_events
        where event_type = 'pageview'
          and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        group by page order by count desc limit 10
      ) t
    ),

    'today_events', (
      select json_agg(t) from (
        select
          to_char(created_at at time zone 'Asia/Dhaka', 'HH12:MI AM') as time,
          event_type, page,
          coalesce(nullif(referrer_source,''),'direct') as source,
          coalesce(city,'?') as city, coalesce(country,'?') as country,
          ip_address, user_agent
        from analytics_events
        where (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        order by created_at desc limit 50
      ) t
    ),

    'daily_traffic', (
      select json_agg(t) from (
        select
          (created_at at time zone 'Asia/Dhaka')::date as date,
          count(*) filter (where event_type='pageview')      as views,
          count(*) filter (where event_type='whatsapp_click') as wa_clicks
        from analytics_events
        where created_at >= now() - interval '30 days'
        group by date order by date
      ) t
    ),

    'traffic_sources', (
      select json_agg(t) from (
        select coalesce(nullif(referrer_source,''),'direct') as source, count(*) as count
        from analytics_events where event_type = 'pageview'
        group by source order by count desc
      ) t
    ),

    'top_pages', (
      select json_agg(t) from (
        select page, count(*) as count,
          round(avg(case when event_type='page_time' then time_on_page else null end)) as avg_seconds
        from analytics_events
        where event_type in ('pageview','page_time')
        group by page order by count desc limit 10
      ) t
    ),

    'page_time_stats', (
      select json_agg(t) from (
        select page, round(avg(time_on_page)) as avg_seconds, count(*) as sessions
        from analytics_events where event_type='page_time' and time_on_page > 0
        group by page order by avg_seconds desc limit 8
      ) t
    ),

    'page_time_today', (
      select json_agg(t) from (
        select page, round(avg(time_on_page)) as avg_seconds, count(*) as sessions
        from analytics_events where event_type='page_time' and time_on_page > 0
          and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        group by page order by avg_seconds desc limit 8
      ) t
    ),

    'top_regions', (
      select json_agg(t) from (
        select coalesce(city,'Unknown') as city, coalesce(country,'Unknown') as country,
          count(*) as count
        from analytics_events where event_type='pageview'
        group by city, country order by count desc limit 10
      ) t
    ),

    'top_wa_pages', (
      select json_agg(t) from (
        select page, count(*) as count
        from analytics_events where event_type='whatsapp_click'
        group by page order by count desc limit 10
      ) t
    ),

    'utm_campaigns', (select json_build_array()),

    'recent_visitors', (
      select json_agg(t) from (
        select
          coalesce(nullif(ip_address,''), '—') as ip_address,
          coalesce(city,'?') as city,
          coalesce(country,'?') as country,
          coalesce(nullif(referrer_source,''),'direct') as source,
          max(nullif(student_email,'')) as student_email,
          max(created_at) as last_seen,
          count(*) as page_count
        from analytics_events
        where event_type = 'pageview' and ip_address != ''
        group by ip_address, city, country, referrer_source
        order by last_seen desc
        limit 100
      ) t
    )

  ) into result;
  return result;
end;
$$;

-- Done! Login should work now.
select 'Login fix applied successfully!' as status;
