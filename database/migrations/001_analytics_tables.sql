-- ============================================
-- Analytics Tables for Flipture
-- ============================================
-- Run this migration in your Supabase SQL Editor
-- This creates tables to track flipbook views from flipture-view app

-- Table for individual flipbook views
CREATE TABLE IF NOT EXISTS flipbook_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL,
  
  -- Anonymous visitor tracking
  session_id TEXT NOT NULL,
  
  -- View metadata
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  device_type TEXT CHECK (device_type IN ('mobile', 'tablet', 'desktop')),
  referrer TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Table for aggregated analytics (for performance)
CREATE TABLE IF NOT EXISTS flipbook_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  flipbook_id UUID REFERENCES flipbooks(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Metrics
  total_views INTEGER DEFAULT 0 NOT NULL,
  unique_visitors INTEGER DEFAULT 0 NOT NULL,
  
  -- Timestamps
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_flipbook_views_flipbook_id ON flipbook_views(flipbook_id);
CREATE INDEX IF NOT EXISTS idx_flipbook_views_session_id ON flipbook_views(session_id);
CREATE INDEX IF NOT EXISTS idx_flipbook_views_viewed_at ON flipbook_views(viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_flipbook_analytics_flipbook_id ON flipbook_analytics(flipbook_id);

-- Enable Row Level Security
ALTER TABLE flipbook_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE flipbook_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for flipbook_views
-- Users can only view analytics for their own flipbooks
CREATE POLICY "Users can view own flipbook views" 
  ON flipbook_views 
  FOR SELECT 
  USING (
    flipbook_id IN (
      SELECT id FROM flipbooks WHERE user_id = auth.uid()
    )
  );

-- RLS Policies for flipbook_analytics
-- Users can only view analytics for their own flipbooks
CREATE POLICY "Users can view own flipbook analytics" 
  ON flipbook_analytics 
  FOR SELECT 
  USING (
    flipbook_id IN (
      SELECT id FROM flipbooks WHERE user_id = auth.uid()
    )
  );

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on flipbook_analytics
DROP TRIGGER IF EXISTS update_flipbook_analytics_updated_at ON flipbook_analytics;
CREATE TRIGGER update_flipbook_analytics_updated_at 
  BEFORE UPDATE ON flipbook_analytics
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Optional: Function to clean up old views (run manually or via cron)
-- Keeps only views from the last 90 days for GDPR compliance
CREATE OR REPLACE FUNCTION cleanup_old_views()
RETURNS void AS $$
BEGIN
  DELETE FROM flipbook_views 
  WHERE viewed_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Instructions:
-- ============================================
-- 1. Copy this entire SQL and run it in Supabase SQL Editor
-- 2. Verify tables are created in "Table Editor"
-- 3. The tracking will be done by flipture-view app via API endpoint

