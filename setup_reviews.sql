-- ================================================================
-- GIC Institution Reviews — Supabase Table Setup
-- ================================================================
-- এই স্ক্রিপ্টটি Supabase Dashboard → SQL Editor-এ পেস্ট করুন এবং Run করুন
-- ================================================================

-- ১. রিভিউ টেবিল তৈরি করুন
CREATE TABLE IF NOT EXISTS institution_reviews (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT 'এক শিক্ষার্থী',
  stars       INTEGER NOT NULL DEFAULT 5 CHECK (stars >= 1 AND stars <= 5),
  message     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ২. Row Level Security চালু করুন
ALTER TABLE institution_reviews ENABLE ROW LEVEL SECURITY;

-- ৩. যে কেউ রিভিউ পড়তে পারবে (public read)
CREATE POLICY "anyone_can_read_reviews"
  ON institution_reviews
  FOR SELECT
  USING (true);

-- ৪. যে কেউ রিভিউ সাবমিট করতে পারবে (public insert)
CREATE POLICY "anyone_can_submit_review"
  ON institution_reviews
  FOR INSERT
  WITH CHECK (true);

-- ৫. Sample রিভিউ ডেটা (প্রথমবার পেজ লোডে ফাঁকা না দেখায়)
INSERT INTO institution_reviews (name, stars, message) VALUES
  ('মুহাম্মাদ রাফিউল ইসলাম', 5, 'আলহামদুলিল্লাহ! এখানে পড়ে আমার তেলাওয়াত অনেক সুন্দর হয়েছে। শিক্ষকরা অত্যন্ত যত্নশীল ও ধৈর্যশীল। পরিবারের সবাইকে পাঠাব।'),
  ('ফাতেমা বেগম', 5, 'আমার ছেলে মাত্র দেড় মাসে সহীহ কোরআন পড়তে শিখেছে। অনলাইনে এত ভালো শিক্ষাদান আশা করিনি। জাজাকাল্লাহ খায়রান।'),
  ('আব্দুল্লাহ আল-মামুন', 4, 'ফ্রি কোর্সগুলো খুবই ভালো। কুইজ সিস্টেম আমার বাচ্চাদের অনেক পছন্দ হয়েছে। আরও কোর্স আসলে ভালো হয়।');

-- ৬. যাচাই: রিভিউ গুলো ঠিকমতো তৈরি হয়েছে কিনা দেখুন
SELECT * FROM institution_reviews ORDER BY created_at DESC;
