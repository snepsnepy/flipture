-- =====================================================
-- Stripe Subscription Schema for Flipture
-- =====================================================
-- NOTE: This file is DEPRECATED. Use create-profiles-table.sql instead.
-- This is kept for reference only.
-- =====================================================
-- For Supabase Auth users, you should use the profiles table
-- instead of modifying the auth.users table directly.
-- Run create-profiles-table.sql to create the profiles table.
-- =====================================================

-- Optional: Create a view for active subscribers
CREATE OR REPLACE VIEW active_subscribers AS
SELECT 
  id,
  email,
  subscription_plan,
  subscription_status,
  subscription_current_period_end
FROM profiles
WHERE subscription_status = 'active'
  AND subscription_plan IS NOT NULL;

-- Optional: Create a function to check if user has active subscription
CREATE OR REPLACE FUNCTION has_active_subscription(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = user_id 
      AND subscription_status = 'active'
      AND subscription_plan IS NOT NULL
  );
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a function to check subscription level
CREATE OR REPLACE FUNCTION get_subscription_level(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  sub_plan TEXT;
  sub_status TEXT;
BEGIN
  SELECT subscription_plan, subscription_status 
  INTO sub_plan, sub_status
  FROM profiles 
  WHERE id = user_id;
  
  IF sub_status = 'active' AND sub_plan = 'premium' THEN
    RETURN 'premium';
  ELSIF sub_status = 'active' AND sub_plan = 'standard' THEN
    RETURN 'standard';
  ELSE
    RETURN 'free';
  END IF;
END;
$$ LANGUAGE plpgsql;

