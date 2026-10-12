-- ══════════════════════════════════════════════════════════════
-- GIC: Fix Teacher Hide/Unhide from Dashboard
-- Run this in Supabase SQL Editor to fix the hide button issue
-- ══════════════════════════════════════════════════════════════

-- New RPC: Toggle teacher active/hidden status (admin only, SECURITY DEFINER bypasses RLS)
CREATE OR REPLACE FUNCTION toggle_teacher_active(pass_code text, p_id bigint, p_is_active boolean)
RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE auth_ok boolean;
BEGIN
  SELECT (get_admin_auth(pass_code)) INTO auth_ok;
  IF NOT auth_ok THEN
    RETURN json_build_object('success', false, 'message', 'Unauthorized');
  END IF;
  UPDATE public.teachers SET is_active = p_is_active WHERE id = p_id;
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Teacher not found');
  END IF;
  RETURN json_build_object('success', true, 'is_active', p_is_active);
END; $$;

GRANT EXECUTE ON FUNCTION toggle_teacher_active(text, bigint, boolean) TO anon;
