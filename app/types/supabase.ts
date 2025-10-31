import type { FlipbookView, FlipbookAnalytics } from "./analytics";

export interface Database {
  public: {
    Tables: {
      flipbooks: {
        Row: {
          id: string;
          title: string;
          company_name: string | null;
          description: string | null;
          pdf_file_url: string | null;
          pdf_file_name: string | null;
          pdf_file_size: number | null;
          cover_options: string | null;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          company_name?: string | null;
          description?: string | null;
          pdf_file_url?: string | null;
          pdf_file_name?: string | null;
          pdf_file_size?: number | null;
          cover_options?: string | null;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          company_name?: string | null;
          description?: string | null;
          pdf_file_url?: string | null;
          pdf_file_name?: string | null;
          pdf_file_size?: number | null;
          cover_options?: string | null;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      flipbook_views: {
        Row: FlipbookView;
        Insert: Omit<FlipbookView, "id" | "created_at">;
        Update: Partial<Omit<FlipbookView, "id" | "created_at">>;
      };
      flipbook_analytics: {
        Row: FlipbookAnalytics;
        Insert: Omit<FlipbookAnalytics, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<FlipbookAnalytics, "id" | "created_at">>;
      };
    };
  };
}
