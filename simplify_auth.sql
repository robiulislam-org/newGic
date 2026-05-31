-- =====================================================================
-- 🎓 GIC Student Login Simplification SQL Script (NID Removal)
-- Copy and paste this into your Supabase SQL Editor and click RUN.
-- =====================================================================

-- 1. Drop the old function that required both phone and NID
DROP FUNCTION IF EXISTS login_or_create_student(text, text);

-- 2. Recreate login_or_create_student function to only accept phone number
CREATE OR REPLACE FUNCTION login_or_create_student(p_phone text)
RETURNS json
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
  v_student record;
  v_new_student_id text;
  v_count int;
  result json;
BEGIN
  -- Check if student already exists by phone number
  SELECT * INTO v_student FROM students WHERE phone = p_phone LIMIT 1;
  
  IF FOUND THEN
    -- Existing student: return their data (include nid_number if it exists in DB, else empty)
    SELECT json_build_object(
      'status', 'success',
      'is_new', FALSE,
      'student_id', v_student.student_id,
      'phone', v_student.phone,
      'xp', v_student.xp,
      'completed_chapters', v_student.completed_chapters,
      'streak', v_student.streak,
      'last_visit', v_student.last_visit
    ) INTO result;
  ELSE
    -- New student: generate a unique ID
    LOOP
      v_new_student_id := 'GIC-' || lpad(floor(random() * 90000 + 10000)::text, 5, '0');
      SELECT count(*) INTO v_count FROM students WHERE student_id = v_new_student_id;
      EXIT WHEN v_count = 0; -- ID is unique
    END LOOP;
    
    -- Insert new student (only phone is required, nid_number defaults to empty or NULL)
    INSERT INTO students (phone, student_id)
    VALUES (p_phone, v_new_student_id)
    RETURNING * INTO v_student;
    
    SELECT json_build_object(
      'status', 'success',
      'is_new', TRUE,
      'student_id', v_student.student_id,
      'phone', v_student.phone,
      'xp', v_student.xp,
      'completed_chapters', v_student.completed_chapters,
      'streak', v_student.streak,
      'last_visit', v_student.last_visit
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$;
