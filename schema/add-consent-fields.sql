-- =====================================================
-- Migration: Add Legal Consent Fields to Profiles
-- =====================================================
-- Records when and what version of Terms/Privacy the
-- user accepted, and their marketing opt-in preference.
-- Required for GDPR compliance / audit trail.
-- =====================================================

-- Add consent columns to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS terms_accepted_at    TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS privacy_accepted_at  TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS terms_version        TEXT,
  ADD COLUMN IF NOT EXISTS marketing_opt_in     BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS marketing_opt_in_at  TIMESTAMP WITH TIME ZONE;

-- Add comments for documentation
COMMENT ON COLUMN profiles.terms_accepted_at   IS 'Timestamp when the user accepted the Terms of Service';
COMMENT ON COLUMN profiles.privacy_accepted_at IS 'Timestamp when the user acknowledged the Privacy Policy';
COMMENT ON COLUMN profiles.terms_version       IS 'Version/effective date of the Terms accepted (e.g. 2026-02-02)';
COMMENT ON COLUMN profiles.marketing_opt_in    IS 'Whether the user opted in to marketing emails';
COMMENT ON COLUMN profiles.marketing_opt_in_at IS 'Timestamp when the user gave or withdrew marketing consent';

-- Update the trigger function to capture consent data at signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_marketing_opt_in     BOOLEAN;
  v_marketing_opt_in_at  TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Parse marketing consent (defaults to false if not provided)
  v_marketing_opt_in := COALESCE(
    (NEW.raw_user_meta_data->>'marketing_opt_in')::BOOLEAN,
    FALSE
  );

  -- Only record opt-in timestamp if user actually opted in
  IF v_marketing_opt_in THEN
    v_marketing_opt_in_at := NOW();
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    terms_accepted_at,
    privacy_accepted_at,
    terms_version,
    marketing_opt_in,
    marketing_opt_in_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NOW(),                          -- terms were required to sign up, so accepted = signup time
    NOW(),                          -- same for privacy policy
    '2026-02-02',                   -- effective date of current Terms/Privacy — update this when you change them
    v_marketing_opt_in,
    v_marketing_opt_in_at
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
