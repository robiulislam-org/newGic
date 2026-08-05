-- ════════════════════════════════════════════════════════════════════════════
-- 🔐 GIC DYNAMIC AUTH UPGRADE v2.0
-- Run this ENTIRE file in Supabase SQL Editor → Execute
-- This replaces hardcoded passwords with a secure database-stored password.
-- Safe to run multiple times.
-- ════════════════════════════════════════════════════════════════════════════

-- ── 1. Create admin_config table (secure password storage) ───────────────
create table if not exists admin_config (
  key   text primary key,
  value text not null
);

-- Enable Row Level Security
alter table admin_config enable row level security;

-- Drop all existing policies
drop policy if exists "No public read"   on admin_config;
drop policy if exists "No public insert" on admin_config;
drop policy if exists "No public update" on admin_config;
drop policy if exists "No public delete" on admin_config;

-- Block ALL public access (only security definer functions can read)
create policy "No public read"   on admin_config for select  using (false);
create policy "No public insert" on admin_config for insert  with check (false);
create policy "No public update" on admin_config for update  using (false);
create policy "No public delete" on admin_config for delete  using (false);

-- ── 2. Insert default password (only if not already set) ─────────────────
insert into admin_config (key, value)
values ('admin_password', 'gicadmin786')
on conflict (key) do nothing;

-- ── 3. Helper function (private, internal use) ──────────────────────────
create or replace function _get_admin_password()
returns text
security definer
language plpgsql
as $$
declare
  v_pass text;
begin
  select value into v_pass from admin_config where key = 'admin_password';
  return coalesce(v_pass, 'gicadmin786');
end;
$$;

-- ── 4. get_admin_auth — fast login check ─────────────────────────────────
create or replace function get_admin_auth(pass_code text)
returns boolean
security definer
language plpgsql
as $$
begin
  return (pass_code = _get_admin_password());
end;
$$;

-- ── 5. change_admin_password — secure password update ────────────────────
create or replace function change_admin_password(old_pass_code text, new_pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  current_pass text;
begin
  -- Fetch current password
  select value into current_pass from admin_config where key = 'admin_password';

  -- Validate old password
  if current_pass is null or old_pass_code != current_pass then
    return json_build_object('success', false, 'message', 'বর্তমান পাসওয়ার্ড ভুল!');
  end if;

  -- Validate new password length
  if length(trim(new_pass_code)) < 6 then
    return json_build_object('success', false, 'message', 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।');
  end if;

  -- Update password
  update admin_config set value = new_pass_code where key = 'admin_password';

  return json_build_object('success', true, 'message', '✅ পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!');
end;
$$;

-- ── 6. get_analytics_summary — updated to use dynamic password ────────────
create or replace function get_analytics_summary(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
begin
  if pass_code != _get_admin_password() then
    raise exception 'Unauthorized';
  end if;

  select json_build_object(

    -- ── TODAY (Bangladesh UTC+6) ──────────────────────────────────
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
      where event_type = 'pageview'
        and student_email != ''
        and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
    ),

    -- ── TODAY EVENTS TIMELINE ────────────────────────────────────
    'today_events', (
      select json_agg(t) from (
        select
          event_type,
          page,
          coalesce(nullif(referrer_source,''), 'direct') as source,
          country, city,
          coalesce(nullif(ip_address,''), '—') as ip_address,
          coalesce(nullif(user_agent,''), '') as user_agent,
          coalesce(nullif(student_email,''), '') as student_email,
          to_char(created_at at time zone 'Asia/Dhaka', 'HH12:MI AM') as time,
          created_at
        from analytics_events
        where (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        order by created_at desc
        limit 100
      ) t
    ),

    -- ── TOP PAGES ────────────────────────────────────────────────
    'top_pages', (
      select json_agg(t) from (
        select page, count(*) as count,
          round(avg(case when event_type='page_time' and time_on_page>0 then time_on_page end)) as avg_seconds
        from analytics_events
        where event_type in ('pageview','page_time')
        group by page order by count desc limit 8
      ) t
    ),
    'top_pages_today', (
      select json_agg(t) from (
        select page, count(*) as count,
          round(avg(case when event_type='page_time' and time_on_page>0 then time_on_page end)) as avg_seconds
        from analytics_events
        where event_type in ('pageview','page_time')
          and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        group by page order by count desc limit 8
      ) t
    ),

    -- ── TOP WA PAGES ─────────────────────────────────────────────
    'top_wa_pages', (
      select json_agg(t) from (
        select page, count(*) as count from analytics_events
        where event_type='whatsapp_click'
        group by page order by count desc limit 8
      ) t
    ),

    -- ── TOP REGIONS ──────────────────────────────────────────────
    'top_regions', (
      select json_agg(t) from (
        select country, city, count(*) as count from analytics_events
        where event_type='pageview'
        group by country, city order by count desc limit 10
      ) t
    ),

    -- ── DAILY TRAFFIC ────────────────────────────────────────────
    'daily_traffic', (
      select json_agg(t) from (
        select
          (created_at at time zone 'Asia/Dhaka')::date::text as date,
          count(case when event_type='pageview' then 1 end) as views,
          count(case when event_type='whatsapp_click' then 1 end) as wa_clicks
        from analytics_events
        where created_at >= now() - interval '30 days'
        group by (created_at at time zone 'Asia/Dhaka')::date
        order by 1 asc
      ) t
    ),

    -- ── TRAFFIC SOURCES ──────────────────────────────────────────
    'traffic_sources', (
      select json_agg(t) from (
        select coalesce(nullif(referrer_source,''),'direct') as source, count(*) as count
        from analytics_events where event_type='pageview'
        group by source order by count desc limit 10
      ) t
    ),
    'traffic_sources_today', (
      select json_agg(t) from (
        select coalesce(nullif(referrer_source,''),'direct') as source, count(*) as count
        from analytics_events where event_type='pageview'
          and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        group by source order by count desc limit 10
      ) t
    ),

    -- ── PAGE TIME ────────────────────────────────────────────────
    'page_time_stats', (
      select json_agg(t) from (
        select page, round(avg(time_on_page)) as avg_seconds, count(*) as sessions
        from analytics_events where event_type='page_time' and time_on_page>0
        group by page order by avg_seconds desc limit 8
      ) t
    ),
    'page_time_today', (
      select json_agg(t) from (
        select page, round(avg(time_on_page)) as avg_seconds, count(*) as sessions
        from analytics_events where event_type='page_time' and time_on_page>0
          and (created_at at time zone 'Asia/Dhaka')::date = (now() at time zone 'Asia/Dhaka')::date
        group by page order by avg_seconds desc limit 8
      ) t
    ),

    -- ── UTM CAMPAIGNS ────────────────────────────────────────────
    'utm_campaigns', (
      select coalesce(json_agg(t), '[]'::json) from (
        select
          coalesce(nullif(utm_campaign,''),'(no campaign)') as campaign,
          coalesce(nullif(utm_source,''),'direct') as source,
          coalesce(nullif(utm_medium,''),'none') as medium,
          count(*) as visits
        from analytics_events
        where event_type = 'pageview' and utm_source != ''
        group by campaign, source, medium
        order by visits desc limit 20
      ) t
    ),

    -- ── RECENT UNIQUE VISITORS ────────────────────────────────────
    'recent_visitors', (
      select json_agg(t) from (
        select
          coalesce(nullif(ip_address,''), '—') as ip_address,
          country, city,
          coalesce(nullif(referrer_source,''),'direct') as source,
          max(nullif(student_email,'')) as student_email,
          max(created_at) as last_seen,
          count(*) as page_count
        from analytics_events
        where event_type = 'pageview' and ip_address != ''
        group by ip_address, country, city, referrer_source
        order by last_seen desc
        limit 100
      ) t
    )

  ) into result;
  return result;
end;
$$;

-- ── 7. get_students_list — updated to use dynamic password ────────────────
create or replace function get_students_list(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
begin
  if pass_code != _get_admin_password() then
    raise exception 'Unauthorized: Incorrect password provided.';
  end if;

  select json_agg(t) from (
    select
      student_id,
      coalesce(phone, '') as phone,
      coalesce(email, '') as email,
      coalesce(nid_number, '') as nid_number,
      coalesce(last_ip, '') as last_ip,
      coalesce(last_ua, '') as last_ua,
      xp,
      case
        when jsonb_typeof(completed_chapters) = 'array' then jsonb_array_length(completed_chapters)
        else 0
      end as chapters_completed_count,
      streak,
      to_char(created_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS+06:00') as join_date,
      to_char(updated_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS+06:00') as last_active
    from students
    where phone is null or phone != 'global_mini_courses_data'
    order by updated_at desc
  ) t into result;

  return coalesce(result, '[]'::json);
end;
$$;

-- ── 8. get_student_activity — updated to use dynamic password ─────────────
create or replace function get_student_activity(p_email text, pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
begin
  if pass_code != _get_admin_password() then
    raise exception 'Unauthorized';
  end if;

  select json_build_object(
    'events', (
      select json_agg(t) from (
        select event_type, page,
          coalesce(nullif(ip_address,''), '—') as ip_address,
          country, city,
          coalesce(nullif(referrer_source,''),'direct') as source,
          time_on_page, created_at
        from analytics_events
        where lower(student_email) = lower(p_email)
        order by created_at desc limit 200
      ) t
    ),
    'summary', (
      select json_build_object(
        'total_pageviews', count(case when event_type='pageview' then 1 end),
        'total_wa_clicks', count(case when event_type='whatsapp_click' then 1 end),
        'avg_time_per_page', round(avg(case when event_type='page_time' and time_on_page>0 then time_on_page end)),
        'first_visit', min(created_at),
        'last_visit', max(created_at),
        'unique_ips', count(distinct ip_address)
      )
      from analytics_events
      where lower(student_email) = lower(p_email)
    ),
    'pages_visited', (
      select json_agg(t) from (
        select page, count(*) as visits,
          round(avg(case when event_type='page_time' and time_on_page>0 then time_on_page end)) as avg_seconds
        from analytics_events
        where lower(student_email) = lower(p_email)
          and event_type in ('pageview','page_time')
        group by page order by visits desc limit 10
      ) t
    )
  ) into result;
  return result;
end;
$$;

-- ── 9. delete_course_comment — updated to use dynamic password ────────────
create or replace function delete_course_comment(p_id bigint, pass_code text)
returns boolean
security definer
language plpgsql
as $$
begin
  if pass_code != _get_admin_password() then
    raise exception 'Unauthorized';
  end if;
  delete from course_comments where id = p_id;
  return true;
end;
$$;

-- ── 10. delete_institution_review — updated to use dynamic password ────────
create or replace function delete_institution_review(p_id bigint, pass_code text)
returns boolean
security definer
language plpgsql
as $$
begin
  if pass_code != _get_admin_password() then
    raise exception 'Unauthorized';
  end if;
  delete from institution_reviews where id = p_id;
  return true;
end;
$$;

-- Done!
select json_build_object(
  'status', 'SUCCESS',
  'message', 'Dynamic auth upgrade applied! Current password stored in admin_config table.'
) as result;
