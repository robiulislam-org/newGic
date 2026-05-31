-- =====================================================================
-- 🛠️ GIC Dashboard SQL Fix: Restore Email Column and Date format
-- Copy and paste this into your Supabase SQL Editor and click RUN.
-- =====================================================================

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
