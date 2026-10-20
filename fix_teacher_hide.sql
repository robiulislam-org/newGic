-- ══════════════════════════════════════════════════════════════
-- FIX: Teacher Hide/Unhide — Missing RPC + Extra Columns
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- STEP 1: Add missing columns to teachers table
-- (safe — won't fail if columns already exist)
-- ─────────────────────────────────────────────
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS gender           text DEFAULT 'male';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS monthly_fee      text DEFAULT 'আলোচনা সাপেক্ষে';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS hourly_rate      text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS demo_video_url   text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS rating           numeric(3,1) DEFAULT 5.0;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_verified      boolean DEFAULT true;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_demo          boolean DEFAULT false;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS photo_position   text DEFAULT '50% 20%';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS photo_zoom       numeric(4,2) DEFAULT 1.0;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS teacher_type     text DEFAULT 'senior';

-- ─────────────────────────────────────────────
-- STEP 2: toggle_teacher_active RPC
-- This is the missing function causing the hide bug!
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION toggle_teacher_active(
  pass_code   text,
  p_id        bigint,
  p_is_active boolean
)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  auth_ok boolean;
BEGIN
  SELECT (get_admin_auth(pass_code)) INTO auth_ok;
  IF NOT auth_ok THEN
    RETURN json_build_object('success', false, 'message', 'Unauthorized');
  END IF;

  UPDATE public.teachers
    SET is_active = p_is_active
    WHERE id = p_id;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Teacher not found');
  END IF;

  RETURN json_build_object(
    'success', true,
    'message', CASE WHEN p_is_active THEN 'শিক্ষক সক্রিয় করা হয়েছে' ELSE 'শিক্ষক হাইড করা হয়েছে' END
  );
END;
$$;

GRANT EXECUTE ON FUNCTION toggle_teacher_active(text, bigint, boolean) TO anon;

-- ─────────────────────────────────────────────
-- STEP 3: Upgrade update_teacher to include new columns
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_teacher(
  pass_code          text,
  p_id               bigint,
  p_name             text,
  p_slug             text,
  p_photo_url        text    DEFAULT '',
  p_designation      text    DEFAULT '',
  p_qualifications   text[]  DEFAULT '{}',
  p_bio              text    DEFAULT '',
  p_experience       integer DEFAULT 0,
  p_students         integer DEFAULT 0,
  p_specializations  text[]  DEFAULT '{}',
  p_schedule         jsonb   DEFAULT '{"sat":[],"sun":[],"mon":[],"tue":[],"wed":[]}',
  p_whatsapp         text    DEFAULT '8801733017521',
  p_sort_order       integer DEFAULT 0,
  p_is_active        boolean DEFAULT true,
  p_gender           text    DEFAULT 'male',
  p_monthly_fee      text    DEFAULT 'আলোচনা সাপেক্ষে',
  p_hourly_rate      text    DEFAULT '',
  p_demo_video_url   text    DEFAULT '',
  p_rating           numeric DEFAULT 5.0,
  p_is_verified      boolean DEFAULT true,
  p_teacher_type     text    DEFAULT 'senior',
  p_track            text    DEFAULT 'quran',
  p_teaching_mode    text    DEFAULT 'online',
  p_offline_areas    text    DEFAULT '',
  p_photo_position   text    DEFAULT '50% 20%',
  p_photo_zoom       numeric DEFAULT 1.0,
  p_languages        text[]  DEFAULT '{"বাংলা"}',
  p_country          text    DEFAULT 'বাংলাদেশ',
  p_native_language  text    DEFAULT 'বাংলা'
)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE auth_ok boolean;
BEGIN
  SELECT (get_admin_auth(pass_code)) INTO auth_ok;
  IF NOT auth_ok THEN
    RETURN json_build_object('success', false, 'message', 'Unauthorized');
  END IF;

  UPDATE public.teachers SET
    name             = p_name,
    slug             = p_slug,
    photo_url        = p_photo_url,
    designation      = p_designation,
    qualifications   = p_qualifications,
    bio              = p_bio,
    experience_years = p_experience,
    students_taught  = p_students,
    specializations  = p_specializations,
    weekly_schedule  = p_schedule,
    whatsapp         = p_whatsapp,
    sort_order       = p_sort_order,
    is_active        = p_is_active,
    gender           = p_gender,
    monthly_fee      = p_monthly_fee,
    hourly_rate      = p_hourly_rate,
    demo_video_url   = p_demo_video_url,
    rating           = p_rating,
    is_verified      = p_is_verified,
    teacher_type     = p_teacher_type,
    track            = p_track,
    teaching_track   = p_track,
    teaching_mode    = p_teaching_mode,
    offline_areas    = p_offline_areas,
    photo_position   = p_photo_position,
    photo_zoom       = p_photo_zoom,
    languages        = p_languages,
    country          = p_country,
    native_language  = p_native_language
  WHERE id = p_id;

  RETURN json_build_object('success', true, 'message', 'শিক্ষকের তথ্য আপডেট হয়েছে');
END;
$$;

GRANT EXECUTE ON FUNCTION update_teacher(text,bigint,text,text,text,text,text[],text,integer,integer,text[],jsonb,text,integer,boolean,text,text,text,text,numeric,boolean,text,text,text,text,text,numeric,text[],text,text) TO anon;

-- ─────────────────────────────────────────────
-- STEP 4: Upgrade add_teacher with new columns
-- ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION add_teacher(
  pass_code          text,
  p_name             text,
  p_slug             text,
  p_photo_url        text    DEFAULT '',
  p_designation      text    DEFAULT '',
  p_qualifications   text[]  DEFAULT '{}',
  p_bio              text    DEFAULT '',
  p_experience       integer DEFAULT 0,
  p_students         integer DEFAULT 0,
  p_specializations  text[]  DEFAULT '{}',
  p_schedule         jsonb   DEFAULT '{"sat":[],"sun":[],"mon":[],"tue":[],"wed":[]}',
  p_whatsapp         text    DEFAULT '8801733017521',
  p_sort_order       integer DEFAULT 0,
  p_is_active        boolean DEFAULT true,
  p_gender           text    DEFAULT 'male',
  p_monthly_fee      text    DEFAULT 'আলোচনা সাপেক্ষে',
  p_hourly_rate      text    DEFAULT '',
  p_demo_video_url   text    DEFAULT '',
  p_rating           numeric DEFAULT 5.0,
  p_is_verified      boolean DEFAULT true,
  p_teacher_type     text    DEFAULT 'senior',
  p_track            text    DEFAULT 'quran',
  p_teaching_mode    text    DEFAULT 'online',
  p_offline_areas    text    DEFAULT '',
  p_photo_position   text    DEFAULT '50% 20%',
  p_photo_zoom       numeric DEFAULT 1.0,
  p_languages        text[]  DEFAULT '{"বাংলা"}',
  p_country          text    DEFAULT 'বাংলাদেশ',
  p_native_language  text    DEFAULT 'বাংলা'
)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE auth_ok boolean; new_id bigint;
BEGIN
  SELECT (get_admin_auth(pass_code)) INTO auth_ok;
  IF NOT auth_ok THEN
    RETURN json_build_object('success', false, 'message', 'Unauthorized');
  END IF;

  INSERT INTO public.teachers (
    name, slug, photo_url, designation, qualifications, bio,
    experience_years, students_taught, specializations, weekly_schedule,
    whatsapp, sort_order, is_active,
    gender, monthly_fee, hourly_rate, demo_video_url, rating, is_verified,
    teacher_type, track, teaching_track, teaching_mode, offline_areas,
    photo_position, photo_zoom, languages, country, native_language
  )
  VALUES (
    p_name, p_slug, p_photo_url, p_designation, p_qualifications, p_bio,
    p_experience, p_students, p_specializations, p_schedule,
    p_whatsapp, p_sort_order, p_is_active,
    p_gender, p_monthly_fee, p_hourly_rate, p_demo_video_url, p_rating, p_is_verified,
    p_teacher_type, p_track, p_track, p_teaching_mode, p_offline_areas,
    p_photo_position, p_photo_zoom, p_languages, p_country, p_native_language
  )
  RETURNING id INTO new_id;

  RETURN json_build_object('success', true, 'id', new_id, 'message', 'শিক্ষক যোগ করা হয়েছে');
END;
$$;

GRANT EXECUTE ON FUNCTION add_teacher(text,text,text,text,text,text[],text,integer,integer,text[],jsonb,text,integer,boolean,text,text,text,text,numeric,boolean,text,text,text,text,text,numeric,text[],text,text) TO anon;

-- ══════════════════════════════════════════════════════════════
-- DONE! Now test: toggle a teacher's hide status from dashboard
-- and verify the teachers.html page no longer shows them.
-- ══════════════════════════════════════════════════════════════
