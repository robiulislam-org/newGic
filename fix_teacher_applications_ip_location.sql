-- ══════════════════════════════════════════════════════════════
-- ADD IP, LOCATION & DEVICE TRACKING TO TEACHER APPLICATIONS
-- ══════════════════════════════════════════════════════════════

ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS ip_address text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS location text DEFAULT '';
ALTER TABLE public.teacher_applications ADD COLUMN IF NOT EXISTS device text DEFAULT '';

-- Update get_teacher_applications RPC if needed
CREATE OR REPLACE FUNCTION get_teacher_applications(pass_code text, p_status text DEFAULT 'all')
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  IF NOT verify_admin(pass_code) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  IF p_status = 'all' THEN
    SELECT json_agg(a ORDER BY a.created_at DESC) INTO result FROM public.teacher_applications a;
  ELSE
    SELECT json_agg(a ORDER BY a.created_at DESC) INTO result
    FROM public.teacher_applications a WHERE a.status = p_status;
  END IF;

  RETURN COALESCE(result, '[]'::json);
END;
$$;
