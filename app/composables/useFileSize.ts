/**
 * File Size Utilities Composable
 *
 * Provides utilities for formatting and calculating file sizes
 */

/**
 * Format bytes to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Calculate total storage size from an array of items with file_size property
 */
export const calculateTotalStorageSize = <
  T extends { pdf_file_size?: number | null }
>(
  items: T[]
): number => {
  if (!items || items.length === 0) {
    return 0;
  }

  return items.reduce((sum, item) => {
    return sum + (item.pdf_file_size || 0);
  }, 0);
};

/**
 * Main file size composable
 */
export const useFileSize = () => {
  return {
    formatFileSize,
    calculateTotalStorageSize,
  };
};
