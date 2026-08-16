-- =====================================================================
-- 📊 GIC Upgrade v4: Detailed Geolocation & Time Spent & Gmail RPC
-- Copy and paste this script into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. Add detailed location and duration columns to analytics_events
alter table analytics_events add column if not exists division text default '';
alter table analytics_events add column if not exists postal_code text default '';
alter table analytics_events add column if not exists area_village text default '';
alter table analytics_events add column if not exists session_duration_seconds integer default 0;

-- 2. Add location, duration, and IP columns to students table
alter table students add column if not exists division text default '';
alter table students add column if not exists district text default '';
alter table students add column if not exists postal_code text default '';
alter table students add column if not exists area_village text default '';
alter table students add column if not exists total_time_seconds integer default 0;
alter table students add column if not exists last_ip text default '';
alter table students add column if not exists last_ua text default '';

-- 3. Recreate login_or_create_student_by_email to store IP and UA and Location metadata
create or replace function login_or_create_student_by_email(
  p_email text,
  p_ip text default '',
  p_ua text default '',
  p_division text default '',
  p_district text default '',
  p_postal text default '',
  p_area text default ''
)
returns json
security definer
language plpgsql
as $$
declare
  v_student record;
  v_new_student_id text;
  v_count int;
  result json;
begin
  select * into v_student from students where lower(email) = lower(p_email) limit 1;
  
  if found then
    update students
    set 
      last_ip = coalesce(nullif(p_ip, ''), last_ip),
      last_ua = coalesce(nullif(p_ua, ''), last_ua),
      division = coalesce(nullif(p_division, ''), division),
      district = coalesce(nullif(p_district, ''), district),
      postal_code = coalesce(nullif(p_postal, ''), postal_code),
      area_village = coalesce(nullif(p_area, ''), area_village),
      updated_at = timezone('Asia/Dhaka', now())
    where id = v_student.id
    returning * into v_student;

    select json_build_object(
      'status', 'success',
      'is_new', false,
      'student_id', v_student.student_id,
      'email', v_student.email,
      'phone', coalesce(v_student.phone, ''),
      'xp', v_student.xp,
      'completed_chapters', v_student.completed_chapters,
      'streak', v_student.streak,
      'last_visit', v_student.last_visit
    ) into result;
  else
    loop
      v_new_student_id := 'GIC-' || lpad(floor(random() * 90000 + 10000)::text, 5, '0');
      select count(*) into v_count from students where student_id = v_new_student_id;
      exit when v_count = 0;
    end loop;
    
    insert into students (email, student_id, last_ip, last_ua, division, district, postal_code, area_village)
    values (lower(p_email), v_new_student_id, p_ip, p_ua, p_division, p_district, p_postal, p_area)
    returning * into v_student;
    
    select json_build_object(
      'status', 'success',
      'is_new', true,
      'student_id', v_student.student_id,
      'email', v_student.email,
      'phone', coalesce(v_student.phone, ''),
      'xp', v_student.xp,
      'completed_chapters', v_student.completed_chapters,
      'streak', v_student.streak,
      'last_visit', v_student.last_visit
    ) into result;
  end if;
  
  return result;
end;
$$;

-- 4. Recreate get_students_list with complete fields including Gmail & Detailed Location
create or replace function get_students_list(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
  expected_password text := 'gicadmin786';
begin
  if pass_code != expected_password then
    raise exception 'Unauthorized: Incorrect password provided.';
  end if;

  select json_agg(t) from (
    select 
      student_id,
      coalesce(phone, '') as phone,
      coalesce(email, '') as email,
      xp,
      jsonb_array_length(coalesce(completed_chapters, '[]'::jsonb)) as chapters_completed_count,
      streak,
      coalesce(last_ip, '') as last_ip,
      coalesce(last_ua, '') as last_ua,
      coalesce(division, '') as division,
      coalesce(district, '') as district,
      coalesce(postal_code, '') as postal_code,
      coalesce(area_village, '') as area_village,
      coalesce(total_time_seconds, 0) as total_time_seconds,
      to_char(created_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS') as join_date,
      to_char(updated_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS') as last_active
    from students
    where phone is null or phone != 'global_mini_courses_data'
    order by updated_at desc
  ) t into result;

  return coalesce(result, '[]'::json);
end;
$$;

-- 5. Recreate get_analytics_summary to include detailed location and time spent in events timeline
create or replace function get_analytics_summary(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
  expected_password text := 'gicadmin786';
begin
  if pass_code != expected_password then
    raise exception 'Unauthorized: Incorrect password provided.';
  end if;

  select json_build_object(

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

    'today_new_logins', (
      select count(distinct student_email) 
      from analytics_events 
      where student_email != '' 
        and created_at >= (timezone('Asia/Dhaka', now()))::date
    ),

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

    'today_events', (
      select json_agg(t) from (
        select 
          to_char(timezone('Asia/Dhaka', created_at), 'HH:MI AM') as time,
          event_type,
          page,
          coalesce(nullif(referrer_source, ''), 'direct') as source,
          coalesce(city, 'Unknown') as city,
          coalesce(country, 'Unknown') as country,
          coalesce(division, '') as division,
          coalesce(postal_code, '') as postal_code,
          coalesce(area_village, '') as area_village,
          coalesce(time_on_page, 0) as time_on_page,
          coalesce(student_email, '') as student_email,
          coalesce(ip_address, '') as ip_address,
          coalesce(user_agent, '') as user_agent
        from analytics_events
        where created_at >= (timezone('Asia/Dhaka', now()))::date
        order by created_at desc
        limit 50
      ) t
    ),

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

    'top_regions', (
      select json_agg(t) from (
        select country, city, count(*) as count 
        from analytics_events 
        group by country, city 
        order by count desc 
        limit 10
      ) t
    ),

    'daily_traffic', (
      select json_agg(t) from (
        select 
          (timezone('Asia/Dhaka', created_at))::date::text as date,
          count(case when event_type = 'pageview' then 1 end) as views,
          count(case when event_type = 'whatsapp_click' then 1 end) as wa_clicks
        from analytics_events
        where created_at >= (timezone('Asia/Dhaka', now()))::date - interval '30 days'
        group by (timezone('Asia/Dhaka', created_at))::date
        order by (timezone('Asia/Dhaka', created_at))::date asc
      ) t
    ),

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
          and time_on_page < 86400
        group by page
        order by avg_seconds desc
        limit 10
      ) t
    ),

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
          and time_on_page < 86400
        group by page
        order by avg_seconds desc
      ) t
    ),

    'utm_campaigns', (select json_build_array())

  ) into result;

  return result;
end;
$$;
