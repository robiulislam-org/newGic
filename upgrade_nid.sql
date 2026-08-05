-- =====================================================================
-- 🎓 GIC Students & Progress Tracking Update Script (NID / ID Card Addition)
-- Copy and paste this into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. Alter students table to add NID number column (if it doesn't exist)
alter table students 
  add column if not exists nid_number text default '';

-- 2. Recreate get_students_list function to return NID and exclude internal analytics row
create or replace function get_students_list(pass_code text)
returns json
security definer
language plpgsql
as $$
declare
  result json;
  expected_password text := 'gicadmin786'; -- Should match admin password in config
begin
  -- Validate password
  if pass_code != expected_password then
    raise exception 'Unauthorized: Incorrect password provided.';
  end if;

  select json_agg(t) from (
    select 
      student_id,
      phone,
      coalesce(nid_number, '') as nid_number,
      xp,
      jsonb_array_length(completed_chapters) as chapters_completed_count,
      streak,
      to_char(created_at, 'DD Mon YYYY, HH:MI AM') as join_date,
      to_char(updated_at, 'DD Mon YYYY, HH:MI AM') as last_active
    from students
    where phone != 'global_mini_courses_data' -- Exclude global analytics storage row
    order by updated_at desc
  ) t into result;

  return coalesce(result, '[]'::json);
end;
$$;

-- 3. Recreate login_or_create_student function to accept and store NID number
create or replace function login_or_create_student(p_phone text, p_nid text)
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
  -- Check if student already exists
  select * into v_student from students where phone = p_phone limit 1;
  
  if found then
    -- If existing student has no NID, and a new NID is provided, update it!
    if (v_student.nid_number is null or v_student.nid_number = '') and p_nid is not null and p_nid != '' then
      update students 
      set 
        nid_number = p_nid,
        updated_at = timezone('Asia/Dhaka', now())
      where phone = p_phone 
      returning * into v_student;
    end if;

    -- Existing student: return their data
    select json_build_object(
      'status', 'success',
      'is_new', false,
      'student_id', v_student.student_id,
      'phone', v_student.phone,
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
    
    -- Insert new student with phone and NID
    insert into students (phone, student_id, nid_number)
    values (p_phone, v_new_student_id, p_nid)
    returning * into v_student;
    
    select json_build_object(
      'status', 'success',
      'is_new', true,
      'student_id', v_student.student_id,
      'phone', v_student.phone,
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
