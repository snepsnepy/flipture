export type Flipbook = {
  id: string;
  title: string;
  created_at: string;
  company_name: string | null;
  description: string | null;
  pdf_file_url: string | null;
  pdf_file_name: string | null;
  pdf_file_size: number | null;
  user_id: string;
};

export type Toast = "success" | "error";

export interface ToastOptions {
  title?: string;
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
