import type { Toast, ToastOptions } from "~/types";

export interface ToastItem extends ToastOptions {
  id: string;
  type: Toast;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toasts = ref<ToastItem[]>([]);

export const useToast = () => {
  const showToast = (
    type: Toast,
    options: ToastOptions & { title: string }
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options.duration || (type === "error" ? 0 : 5000); // Errors don't auto-dismiss

    const toast: ToastItem = {
      id,
      type,
      title: options.title,
      description: options.description,
      duration,
      action: options.action,
    };

    toasts.value.push(toast);

    // Auto-dismiss if duration is set
    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }

    return id;
  };

  const dismissToast = (id: string) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAllToasts = () => {
    toasts.value = [];
  };

  return {
    toasts: readonly(toasts),
    showToast,
    dismissToast,
    clearAllToasts,
  };
};
