-- Add to your schema if needed
CREATE OR REPLACE FUNCTION reset_user_subscription(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET 
    subscription_status = NULL,
    subscription_plan = NULL,
    stripe_customer_id = NULL,
    stripe_subscription_id = NULL,
    subscription_current_period_end = NULL
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Usage:
-- SELECT reset_user_subscription('user-uuid-here');