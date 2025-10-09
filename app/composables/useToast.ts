import type { Toast, ToastItem, ToastOptions } from "~/types";

const toasts = ref<ToastItem[]>([]);

export const useToast = () => {
  const showToast = (type: Toast, options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options.duration || 2500; // Errors don't auto-dismiss

    const toast: ToastItem = {
      id,
      type,
      toastTitle: options.toastTitle,
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
