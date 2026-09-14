-- ══════════════════════════════════════════════════════════════
-- GIC TEACHER SCHEMA FIX v2 — Missing Columns Migration
-- এই SQL টি Supabase SQL Editor-এ run করুন
-- ══════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────
-- PART 1: teacher_applications টেবিলে missing columns
-- ────────────────────────────────────────────────────
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS gender text DEFAULT 'male';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS monthly_fee text DEFAULT 'আলোচনা সাপেক্ষে';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS demo_video_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS hourly_rate text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS rating numeric(3,1) DEFAULT 5.0;
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS teacher_type text DEFAULT 'senior';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS teaching_track text DEFAULT 'quran';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS track text DEFAULT 'quran';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS teaching_mode text DEFAULT 'online';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS offline_areas text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS country text DEFAULT 'বাংলাদেশ';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS native_language text DEFAULT 'বাংলা';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS present_address text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS permanent_address text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS nid_front_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS nid_back_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS passport_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS terms_agreed boolean DEFAULT true;
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{}';

-- ────────────────────────────────────────────────────
-- PART 2: teachers টেবিলে missing columns
-- ────────────────────────────────────────────────────
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS gender text DEFAULT 'male';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS monthly_fee text DEFAULT 'আলোচনা সাপেক্ষে';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS demo_video_url text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS hourly_rate text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT false;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS rating numeric(3,1) DEFAULT 5.0;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS teacher_type text DEFAULT 'senior';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_demo boolean DEFAULT false;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS track text DEFAULT 'quran';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS teaching_track text DEFAULT 'quran';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS teaching_mode text DEFAULT 'online';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS offline_areas text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{"বাংলা"}';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS country text DEFAULT 'বাংলাদেশ';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS native_language text DEFAULT 'বাংলা';

-- ────────────────────────────────────────────────────
-- PART 3: submit_teacher_application ফাংশন আপডেট
-- (পুরনোটা drop করে নতুন সব columns সহ তৈরি)
-- ────────────────────────────────────────────────────
DROP FUNCTION IF EXISTS submit_teacher_application(text,text,text,text,text[],text[],integer,integer,text,jsonb,text,text,text,text,text,text,text[],text,text,text,text,text,text,text,boolean);

CREATE OR REPLACE FUNCTION submit_teacher_application(
  p_category          text DEFAULT 'hafez',
  p_name              text DEFAULT '',
  p_designation       text DEFAULT '',
  p_photo_url         text DEFAULT '',
  p_qualifications    text[] DEFAULT '{}',
  p_specializations   text[] DEFAULT '{}',
  p_experience_years  integer DEFAULT 0,
  p_students_taught   integer DEFAULT 0,
  p_bio               text DEFAULT '',
  p_weekly_schedule   jsonb DEFAULT '{"sat":[],"sun":[],"mon":[],"tue":[],"wed":[]}',
  p_phone             text DEFAULT '',
  p_whatsapp_number   text DEFAULT '',
  p_email             text DEFAULT '',
  p_address           text DEFAULT '',
  p_nid_number        text DEFAULT '',
  p_private_notes     text DEFAULT '',
  p_languages         text[] DEFAULT '{}',
  p_country           text DEFAULT 'বাংলাদেশ',
  p_native_language   text DEFAULT 'বাংলা',
  p_present_address   text DEFAULT '',
  p_permanent_address text DEFAULT '',
  p_nid_front_url     text DEFAULT '',
  p_nid_back_url      text DEFAULT '',
  p_passport_url      text DEFAULT '',
  p_terms_agreed      boolean DEFAULT true,
  p_gender            text DEFAULT 'male',
  p_monthly_fee       text DEFAULT 'আলোচনা সাপেক্ষে',
  p_demo_video_url    text DEFAULT '',
  p_teaching_track    text DEFAULT 'quran',
  p_track             text DEFAULT 'quran',
  p_teaching_mode     text DEFAULT 'online',
  p_offline_areas     text DEFAULT '',
  p_teacher_type      text DEFAULT 'senior'
)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE new_id bigint;
BEGIN
  IF trim(p_name) = '' THEN
    RETURN json_build_object('success', false, 'message', 'নাম পূরণ করা আবশ্যক');
  END IF;
  IF trim(p_phone) = '' THEN
    RETURN json_build_object('success', false, 'message', 'ব্যক্তিগত ফোন নম্বর আবশ্যক');
  END IF;
  IF trim(p_whatsapp_number) = '' THEN
    RETURN json_build_object('success', false, 'message', 'WhatsApp নম্বর আবশ্যক');
  END IF;

  INSERT INTO public.teacher_applications (
    category, name, designation, photo_url, qualifications, specializations,
    languages, experience_years, students_taught, bio, weekly_schedule,
    phone, whatsapp_number, email, address, nid_number, private_notes,
    country, native_language, present_address, permanent_address,
    nid_front_url, nid_back_url, passport_url, terms_agreed,
    gender, monthly_fee, demo_video_url,
    teaching_track, track, teaching_mode, offline_areas, teacher_type
  ) VALUES (
    COALESCE(p_category, 'hafez'), trim(p_name), trim(p_designation), trim(p_photo_url),
    p_qualifications, p_specializations, COALESCE(p_languages, '{}'),
    COALESCE(p_experience_years, 0), COALESCE(p_students_taught, 0),
    trim(p_bio), COALESCE(p_weekly_schedule, '{"sat":[],"sun":[],"mon":[],"tue":[],"wed":[]}'),
    trim(p_phone), trim(p_whatsapp_number),
    trim(p_email), trim(p_address), trim(p_nid_number), trim(p_private_notes),
    COALESCE(trim(p_country), 'বাংলাদেশ'), COALESCE(trim(p_native_language), 'বাংলা'),
    trim(p_present_address), trim(p_permanent_address),
    trim(p_nid_front_url), trim(p_nid_back_url), trim(p_passport_url),
    COALESCE(p_terms_agreed, true),
    COALESCE(p_gender, 'male'),
    COALESCE(trim(p_monthly_fee), 'আলোচনা সাপেক্ষে'),
    trim(p_demo_video_url),
    COALESCE(p_teaching_track, 'quran'),
    COALESCE(p_track, 'quran'),
    COALESCE(p_teaching_mode, 'online'),
    trim(p_offline_areas),
    COALESCE(p_teacher_type, 'senior')
  ) RETURNING id INTO new_id;

  RETURN json_build_object('success', true, 'id', new_id, 'message', 'আবেদন সফলভাবে জমা হয়েছে');
END; $$;

GRANT EXECUTE ON FUNCTION submit_teacher_application TO anon;

-- ────────────────────────────────────────────────────
-- PART 4: Schema cache reload
-- ────────────────────────────────────────────────────
NOTIFY pgrst, 'reload schema';

-- ════════════════════════════════════════════════════
-- যাচাই করতে এই query টি run করুন:
-- SELECT column_name FROM information_schema.columns
-- WHERE table_name = 'teacher_applications' ORDER BY ordinal_position;
-- ════════════════════════════════════════════════════
