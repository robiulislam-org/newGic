-- =====================================================================
-- 🛠️ GIC Database Upgrade: IP Tracking, Device Logging & Timezone Fix
-- Copy and paste this into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. Ensure last_ip and last_ua columns exist in students table
alter table students add column if not exists last_ip text default '';
alter table students add column if not exists last_ua text default '';

-- 2. Update login_or_create_student_by_email to accept and record IP & User Agent
create or replace function login_or_create_student_by_email(p_email text, p_ip text default '', p_ua text default '')
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
  -- Check if student already exists by email (case-insensitive)
  select * into v_student from students where lower(email) = lower(p_email) limit 1;
  
  if found then
    -- Update IP and User Agent on every sync/login
    update students 
    set 
      last_ip = coalesce(nullif(p_ip, ''), last_ip),
      last_ua = coalesce(nullif(p_ua, ''), last_ua),
      updated_at = timezone('Asia/Dhaka', now())
    where id = v_student.id
    returning * into v_student;

    -- Existing student: return their data
    select json_build_object(
      'status', 'success',
      'is_new', false,
      'student_id', v_student.student_id,
      'email', v_student.email,
      'phone', coalesce(v_student.phone, ''),
      'nid_number', coalesce(v_student.nid_number, ''),
      'xp', v_student.xp,
      'completed_chapters', v_student.completed_chapters,
      'streak', v_student.streak,
      'last_visit', v_student.last_visit
    ) into result;
  else
    -- New student: generate a unique ID
    loop
      v_new_student_id := 'GIC-' || lpad(floor(random() * 90000 + 10000)::text, 5, '0');
      select count(*) into v_count from students where student_id = v_new_student_id;
      exit when v_count = 0; -- ID is unique
    end loop;
    
    -- Insert new student with email, IP, and User Agent
    insert into students (email, student_id, last_ip, last_ua)
    values (lower(p_email), v_new_student_id, p_ip, p_ua)
    returning * into v_student;
    
    select json_build_object(
      'status', 'success',
      'is_new', true,
      'student_id', v_student.student_id,
      'email', v_student.email,
      'phone', coalesce(v_student.phone, ''),
      'nid_number', coalesce(v_student.nid_number, ''),
      'xp', v_student.xp,
      'completed_chapters', v_student.completed_chapters,
      'streak', v_student.streak,
      'last_visit', v_student.last_visit
    ) into result;
  end if;
  
  return result;
end;
$$;

-- 3. Recreate get_students_list to return IP, User Agent, and timezone-adjusted join/active dates
create or replace function get_students_list(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
  expected_password text := 'gicadmin786'; -- Replace with your dashboard password if different
begin
  -- Validate password
  if pass_code != expected_password then
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
      jsonb_array_length(completed_chapters) as chapters_completed_count,
      streak,
      -- Append timezone offset (+06:00) so JS parses it as Dhaka timezone correctly
      to_char(created_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS+06:00') as join_date,
      to_char(updated_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS+06:00') as last_active
    from students
    where phone is null or phone != 'global_mini_courses_data' -- Exclude global analytics storage row
    order by updated_at desc
  ) t into result;

  return coalesce(result, '[]'::json);
end;
$$;
