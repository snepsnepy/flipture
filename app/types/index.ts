export type Flipbook = {
  id: string;
  title: string;
  created_at: string;
  company_name: string | null;
  description: string | null;
  pdf_file_url: string | null;
  pdf_file_name: string | null;
  pdf_file_size: number | null;
  background_gradient: string | null;
  user_id: string;
  analytics?: FlipbookAnalytics;
};

export type FlipbookAnalytics = {
  views: number;
  uniqueVisitors: number;
};

export type ComprehensiveAnalytics = {
  views: number;
  uniqueVisitors: number;
  countries: Record<string, { views: number; visitors: number }>;
  previousViews: number;
  previousVisitors: number;
  dailyData: Array<{ date: string; views: number; visitors: number }>;
};

export type DateRangeOption = "30" | "60" | "180" | "365";

export interface DateRangeConfig {
  value: DateRangeOption;
  label: string;
}

export enum Toast {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export interface ToastOptions {
  toastTitle: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface FileInputEvents {
  uploadSuccess: [fileName: string];
  uploadError: [error: string, fileName?: string];
  uploadStarted: [file: File];
  fileCleared: [];
}

export interface FlipbookFormData {
  file: File | null;
  title: string;
  company: string;
  description: string;
  coverOption: string | null;
  backgroundGradient: string | null;
}

// TOAST TYPES

export interface ToastItem extends ToastOptions {
  id: string;
  type: Toast;
  toastTitle: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type FormData = {
  file: File | null;
  title: string;
  company: string;
  description: string;
  coverOption: string | null;
  backgroundGradient: string | null;
};

export type SortOption =
  | "title-asc"
  | "title-desc"
  | "date-newest"
  | "date-oldest";

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}
