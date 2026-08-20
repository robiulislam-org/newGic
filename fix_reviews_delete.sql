-- ================================================================
-- GIC Reviews — SECURE DELETE Function & Permission Fix
-- Supabase Dashboard → SQL Editor → এই কোডটি পেস্ট করে Run করুন
-- ================================================================

-- 1. পুরানো বিপজ্জনক উন্মুক্ত DELETE policy থাকলে মুছুন
DROP POLICY IF EXISTS "admin_can_delete_reviews" ON institution_reviews;
DROP POLICY IF EXISTS "anyone_can_delete_reviews" ON institution_reviews;

-- 2. নিরাপদ RPC ফাংশন: অ্যাডমিন পাসওয়ার্ড যাচাই করে ডিলিট করে
CREATE OR REPLACE FUNCTION delete_institution_review(p_id bigint, pass_code text)
RETURNS boolean
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
DECLARE
  v_correct_pass text;
BEGIN
  -- অ্যাডমিন পাসওয়ার্ড যাচাই
  SELECT value INTO v_correct_pass FROM admin_config WHERE key = 'admin_password';
  IF v_correct_pass IS NULL THEN
    v_correct_pass := 'gicadmin786';
  END IF;

  IF pass_code IS NULL OR pass_code != v_correct_pass THEN
    RAISE EXCEPTION 'Unauthorized: Invalid password';
  END IF;

  DELETE FROM institution_reviews WHERE id = p_id;
  RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_institution_review(bigint, text) TO anon, authenticated;

