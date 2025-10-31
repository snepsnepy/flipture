export interface FlipbookView {
  id: string;
  flipbook_id: string;
  session_id: string;
  viewed_at: string;
  device_type?: "mobile" | "tablet" | "desktop" | null;
  referrer?: string | null;
  created_at: string;
}

export interface FlipbookAnalytics {
  id: string;
  flipbook_id: string;
  total_views: number;
  unique_visitors: number;
  last_viewed_at: string | null;
  updated_at: string;
  created_at: string;
}
