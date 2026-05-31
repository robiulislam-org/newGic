-- =====================================================================
-- 🛠️ GIC Supabase Database Setup & Schema Fix Script
-- Copy and paste this into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. Alter students table to ensure columns exist and phone is nullable
alter table students alter column phone drop not null;
alter table students add column if not exists email text;
alter table students add column if not exists nid_number text default '';

-- 2. Add unique index on email
create unique index if not exists students_email_idx on students (email) where email is not null;

-- 3. Recreate login_or_create_student_by_email function with nid_number coalesce
create or replace function login_or_create_student_by_email(p_email text)
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
    
    -- Insert new student
    insert into students (email, student_id)
    values (lower(p_email), v_new_student_id)
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

-- 4. Recreate get_students_list function with email, phone, nid_number, and ISO dates
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
      xp,
      jsonb_array_length(completed_chapters) as chapters_completed_count,
      streak,
      -- ISO format for reliable JS date comparison (today's logins detection)
      to_char(created_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS') as join_date,
      to_char(updated_at AT TIME ZONE 'Asia/Dhaka', 'YYYY-MM-DD"T"HH24:MI:SS') as last_active
    from students
    where phone is null or phone != 'global_mini_courses_data' -- Exclude global analytics storage row
    order by updated_at desc
  ) t into result;

  return coalesce(result, '[]'::json);
end;
$$;
