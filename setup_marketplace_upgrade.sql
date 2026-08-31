
-- ══════════════════════════════════════════════════════════════
-- GIC TEACHER MARKETPLACE & PARENT LEAD CAPTURE UPGRADE
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- 1. Ensure new marketplace & personal columns exist on teacher_applications
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS gender text DEFAULT 'male';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS monthly_fee text DEFAULT 'আলোচনা সাপেক্ষে';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS hourly_rate text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS demo_video_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS available_days text[] DEFAULT '{}';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT true;
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{"বাংলা"}';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS country text DEFAULT 'বাংলাদেশ';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS native_language text DEFAULT 'বাংলা';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS present_address text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS permanent_address text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS nid_front_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS nid_back_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS passport_url text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS terms_agreed boolean DEFAULT true;
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS teacher_type text DEFAULT 'fresher';

-- 2. Ensure new marketplace columns exist on teachers table
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS gender text DEFAULT 'male';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS monthly_fee text DEFAULT 'আলোচনা সাপেক্ষে';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS hourly_rate text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS demo_video_url text DEFAULT '';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS available_days text[] DEFAULT '{}';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_verified boolean DEFAULT true;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS total_reviews integer DEFAULT 0;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS avg_rating numeric(3,2) DEFAULT 5.0;
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{"বাংলা"}';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS country text DEFAULT 'বাংলাদেশ';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS native_language text DEFAULT 'বাংলা';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS teacher_type text DEFAULT 'senior';
ALTER TABLE public.teachers ADD COLUMN IF NOT EXISTS is_demo boolean DEFAULT false;

-- 3. Update public RLS policies for teachers
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "teachers_public_read" ON public.teachers;
CREATE POLICY "teachers_public_read" ON public.teachers FOR SELECT USING (true);
DROP POLICY IF EXISTS "teachers_public_insert" ON public.teachers;
CREATE POLICY "teachers_public_insert" ON public.teachers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "teachers_public_update" ON public.teachers;
CREATE POLICY "teachers_public_update" ON public.teachers FOR UPDATE USING (true);
DROP POLICY IF EXISTS "teachers_public_delete" ON public.teachers;
CREATE POLICY "teachers_public_delete" ON public.teachers FOR DELETE USING (true);

-- Seed 3 initial demo teachers if not exists
INSERT INTO public.teachers (
  name, slug, designation, gender, monthly_fee, hourly_rate, photo_url,
  qualifications, bio, experience_years, students_taught, specializations,
  weekly_schedule, whatsapp, country, native_language, languages,
  sort_order, is_active, is_verified, rating, teacher_type, is_demo
)
VALUES
(
  'হাফেজ মাওলানা তানভীর আহমেদ', 'hafez-tanvir-ahmed', 'হাফেজুল কুরআন ও সিনিয়র তাজবীদ শিক্ষক', 'male', '৳১,৫০০/মাস', '$5/hr', '',
  ARRAY['দাওরায়ে হাদিস', 'হিফজুল কুরআন', 'সনদে তাজবীদ'],
  'দীর্ঘ ৭ বছর ধরে দেশি এবং প্রবাসী শিশুদের অত্যন্ত ধৈর্য ও স্নেহের সাথে সহীহ কোরআন শিক্ষা দিচ্ছেন।',
  7, 180, ARRAY['সহীহ তেলাওয়াত', 'তাজউইদ ও মাখরাজ', 'শিশু শিক্ষা'],
  '{"sat":[10,11,14],"sun":[10,14],"mon":[10,11],"tue":[10,14],"wed":[10,11,14]}'::jsonb,
  '8801733017521', 'বাংলাদেশ', 'বাংলা', ARRAY['বাংলা', 'English', 'العربية'],
  1, true, true, 5.0, 'senior', true
),
(
  'মুফতি সালমান ফারিস', 'mufti-salman-faris', 'মুফতি ও হেফজুল কোরআন মেন্টর', 'male', '৳২,০০০/মাস', '$7/hr', '',
  ARRAY['মুফতি (ইফতা)', 'দাওরায়ে হাদিস', 'হিফজুল কুরআন ৩০ পারা'],
  'আন্তর্জাতিক হিফজ কারিকুলাম ও আধুনিক রিভিশন টেকনিকে দক্ষ। নতুন শিক্ষার্থীদের সঠিক মাখরাজ ও দ্রুত হেফজ সম্পন্ন করায় অভিজ্ঞ।',
  9, 240, ARRAY['হিফজুল কোরআন', 'তাজউইদ ও সুর', 'বয়স্কদের শিক্ষা'],
  '{"sat":[11,13,15],"sun":[11,15],"mon":[11,13],"tue":[11,15],"wed":[11,13,15]}'::jsonb,
  '8801733017521', 'বাংলাদেশ', 'বাংলা', ARRAY['বাংলা', 'English', 'Urdu'],
  2, true, true, 5.0, 'senior', true
),
(
  'হাফেজা উম্মে কুলসুম', 'hafeza-umme-kulsum', 'সিনিয়র মহিলা কোরআন শিক্ষক', 'female', '৳১,২০০/মাস', '$4/hr', '',
  ARRAY['হাফেজা', 'আলেমা', 'তাজবীদ সার্টিফাইড'],
  'ছোট সোনামণি এবং মা-বোনদের জন্য অত্যন্ত যত্নের সাথে অনলাইনে নূরানী কায়দা ও সহীহ তেলাওয়াত শেখান।',
  5, 150, ARRAY['মা-বোনদের ক্লাস', 'নূরানী কায়দা', 'শিশু শিক্ষা', 'দৈনিক দোয়া ও মাসায়েল'],
  '{"sat":[9,10,12],"sun":[9,12],"mon":[9,10],"tue":[9,12],"wed":[9,10,12]}'::jsonb,
  '8801733017521', 'বাংলাদেশ', 'বাংলা', ARRAY['বাংলা', 'English'],
  3, true, true, 5.0, 'senior', true
)
ON CONFLICT (slug) DO NOTHING;

-- 4. Upgrade teacher_bookings table for comprehensive Lead & Contact tracking
CREATE TABLE IF NOT EXISTS public.teacher_bookings (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  teacher_id bigint REFERENCES public.teachers(id) ON DELETE SET NULL,
  teacher_name text DEFAULT '',
  student_name text NOT NULL,
  student_phone text NOT NULL,
  student_msg text DEFAULT '',
  slot_day text DEFAULT '',
  slot_time text DEFAULT '',
  contact_type text DEFAULT 'whatsapp_chat',
  status text DEFAULT 'pending',
  admin_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Ensure all columns in teacher_bookings exist
ALTER TABLE public.teacher_bookings ADD COLUMN IF NOT EXISTS teacher_name text DEFAULT '';
ALTER TABLE public.teacher_bookings ADD COLUMN IF NOT EXISTS contact_type text DEFAULT 'whatsapp_chat';
ALTER TABLE public.teacher_bookings ADD COLUMN IF NOT EXISTS admin_notes text DEFAULT '';
ALTER TABLE public.teacher_bookings ADD COLUMN IF NOT EXISTS slot_day text DEFAULT '';
ALTER TABLE public.teacher_bookings ADD COLUMN IF NOT EXISTS slot_time text DEFAULT '';
ALTER TABLE public.teacher_bookings ADD COLUMN IF NOT EXISTS student_msg text DEFAULT '';

-- Enable RLS and public insert/read
ALTER TABLE public.teacher_bookings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bookings_public_insert" ON public.teacher_bookings;
CREATE POLICY "bookings_public_insert" ON public.teacher_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "bookings_public_select" ON public.teacher_bookings;
CREATE POLICY "bookings_public_select" ON public.teacher_bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "bookings_public_update" ON public.teacher_bookings;
CREATE POLICY "bookings_public_update" ON public.teacher_bookings FOR UPDATE USING (true);

-- 5. Update approval function to migrate all marketplace & personal details
CREATE OR REPLACE FUNCTION approve_teacher_application(
  pass_code text, p_app_id bigint, p_slug text,
  p_whatsapp text DEFAULT '8801733017521', p_sort_order integer DEFAULT 0,
  p_teacher_type text DEFAULT 'fresher'
)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  auth_ok boolean;
  app_row public.teacher_applications%ROWTYPE;
  new_teacher_id bigint;
BEGIN
  SELECT (get_admin_auth(pass_code)) INTO auth_ok;
  IF NOT auth_ok THEN RETURN json_build_object('success', false, 'message', 'Unauthorized'); END IF;
  
  SELECT * INTO app_row FROM public.teacher_applications WHERE id = p_app_id;
  IF NOT FOUND THEN RETURN json_build_object('success', false, 'message', 'আবেদন পাওয়া যায়নি'); END IF;
  
  IF EXISTS (SELECT 1 FROM public.teachers WHERE slug = p_slug) THEN
    RETURN json_build_object('success', false, 'message', 'এই slug ইতোমধ্যে ব্যবহৃত। ভিন্ন slug দিন।');
  END IF;

  INSERT INTO public.teachers (
    name, slug, photo_url, designation, qualifications, bio,
    experience_years, students_taught, specializations, languages,
    weekly_schedule, whatsapp, is_active, sort_order, country, native_language,
    gender, monthly_fee, hourly_rate, demo_video_url, available_days, is_verified, teacher_type
  ) VALUES (
    app_row.name, p_slug, app_row.photo_url, app_row.designation,
    app_row.qualifications, app_row.bio, app_row.experience_years,
    app_row.students_taught, app_row.specializations, COALESCE(app_row.languages, '{"বাংলা"}'),
    COALESCE(app_row.weekly_schedule, '{"sat":[],"sun":[],"mon":[],"tue":[],"wed":[]}'),
    CASE WHEN trim(app_row.whatsapp_number) <> '' THEN app_row.whatsapp_number ELSE p_whatsapp END,
    true, p_sort_order,
    COALESCE(app_row.country, 'বাংলাদেশ'), COALESCE(app_row.native_language, 'বাংলা'),
    COALESCE(app_row.gender, 'male'), COALESCE(app_row.monthly_fee, 'আলোচনা সাপেক্ষে'),
    COALESCE(app_row.hourly_rate, ''), COALESCE(app_row.demo_video_url, ''),
    COALESCE(app_row.available_days, '{}'), COALESCE(app_row.is_verified, true),
    COALESCE(p_teacher_type, app_row.teacher_type, 'fresher')
  ) RETURNING id INTO new_teacher_id;

  UPDATE public.teacher_applications
  SET status = 'approved', reviewed_at = now(), approved_teacher_id = new_teacher_id
  WHERE id = p_app_id;

  RETURN json_build_object('success', true, 'teacher_id', new_teacher_id, 'message', 'আবেদন সফলভাবে অনুমোদিত এবং শিক্ষক প্রোফাইল লাইভ হয়েছে');
END; $$;

GRANT EXECUTE ON FUNCTION approve_teacher_application(text,bigint,text,text,integer,text) TO anon;
