-- ================================================================
-- GIC Reviews — DELETE Permission Fix
-- Supabase Dashboard → SQL Editor → এই পুরো কোড পেস্ট করুন → Run
-- ================================================================

-- পুরানো policy থাকলে আগে মুছুন (error হলেও চলবে)
DROP POLICY IF EXISTS "admin_can_delete_reviews" ON institution_reviews;
DROP POLICY IF EXISTS "anyone_can_delete_reviews" ON institution_reviews;

-- নতুন DELETE policy: anon key দিয়ে DELETE করা যাবে
-- (dashboard password verify করে তারপর call করে)
CREATE POLICY "admin_can_delete_reviews"
  ON institution_reviews
  FOR DELETE
  USING (true);

-- যাচাই: সব policy দেখুন
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'institution_reviews';
