/**
 * Development Logger Composable
 *
 * Provides structured logging functions for development purposes.
 * Logs are automatically disabled in production unless explicitly enabled.
 */

type LogLevel = "info" | "success" | "warning" | "error" | "debug";
type LogContext = string;

interface LogOptions {
  data?: any;
  level?: LogLevel;
}

const EMOJI_MAP: Record<LogLevel, string> = {
  info: "ℹ️",
  success: "✅",
  warning: "⚠️",
  error: "❌",
  debug: "🔍",
};

const EMOJI_MAP_EXTENDED: Record<string, string> = {
  // Cache operations
  cache: "💾",
  cached: "✅",
  cacheInvalid: "❌",
  cacheHit: "💾",
  cacheMiss: "🔄",
  cacheExpired: "⏰",

  // Network operations
  api: "🌐",
  fetched: "📥",
  sending: "📤",

  // User actions
  created: "➕",
  updated: "📝",
  deleted: "🗑️",

  // General
  mounted: "🚀",
  loading: "⏳",
  completed: "✨",
  instant: "💨",
  refresh: "🔄",
};

/**
 * Check if logging is enabled
 */
const isLoggingEnabled = (): boolean => {
  if (import.meta.dev) return true;
  // Can be extended to check for a flag or environment variable
  return false;
};

/**
 * Get emoji for a given keyword or log level
 */
const getEmoji = (keyword: string, level?: LogLevel): string => {
  return (
    EMOJI_MAP_EXTENDED[keyword.toLowerCase()] ||
    (level ? EMOJI_MAP[level] : "📌")
  );
};

/**
 * Format log message with context and emoji
 */
const formatMessage = (
  context: LogContext,
  message: string,
  emoji?: string
): string => {
  const prefix = `[${context.toUpperCase()}]`;
  return emoji ? `${emoji} ${prefix} ${message}` : `${prefix} ${message}`;
};

/**
 * Main logger composable
 */
export const useLogger = (context: LogContext = "APP") => {
  /**
   * Base log function
   */
  const log = (message: string, options: LogOptions = {}) => {
    if (!isLoggingEnabled()) return;

    const { data, level = "info" } = options;
    const emoji = EMOJI_MAP[level];
    const formattedMessage = formatMessage(context, message, emoji);

    if (data) {
      console.log(formattedMessage, data);
    } else {
      console.log(formattedMessage);
    }
  };

  /**
   * Success log
   */
  const success = (message: string, data?: any) => {
    log(message, { data, level: "success" });
  };

  /**
   * Error log
   */
  const error = (message: string, data?: any) => {
    log(message, { data, level: "error" });
    console.error(formatMessage(context, message, EMOJI_MAP.error), data || "");
  };

  /**
   * Warning log
   */
  const warn = (message: string, data?: any) => {
    log(message, { data, level: "warning" });
    console.warn(
      formatMessage(context, message, EMOJI_MAP.warning),
      data || ""
    );
  };

  /**
   * Info log
   */
  const info = (message: string, data?: any) => {
    log(message, { data, level: "info" });
  };

  /**
   * Debug log (only in development)
   */
  const debug = (message: string, data?: any) => {
    if (import.meta.dev) {
      log(message, { data, level: "debug" });
    }
  };

  /**
   * Custom emoji log
   */
  const emoji = (emojiIcon: string, message: string, data?: any) => {
    log(message, { data });
    console.log(formatMessage(context, message, emojiIcon), data || "");
  };

  /**
   * Cache-specific logs
   */
  const cache = {
    hit: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.cacheHit || "💾", message, data);
    },
    miss: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.cacheMiss || "🔄", message, data);
    },
    set: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.cached || "✅", message, data);
    },
    invalid: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.cacheInvalid || "❌", message, data);
    },
    expired: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.cacheExpired || "⏰", message, data);
    },
    update: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.updated || "📝", message, data);
    },
    remove: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.deleted || "🗑️", message, data);
    },
    add: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.created || "➕", message, data);
    },
    invalidate: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.refresh || "🔄", message, data);
    },
  };

  /**
   * API-specific logs
   */
  const api = {
    fetching: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.api || "🌐", message, data);
    },
    received: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.fetched || "📥", message, data);
    },
    sending: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.sending || "📤", message, data);
    },
  };

  /**
   * Action-specific logs
   */
  const action = {
    created: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.created || "➕", message, data);
    },
    updated: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.updated || "📝", message, data);
    },
    deleted: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.deleted || "🗑️", message, data);
    },
  };

  /**
   * Lifecycle-specific logs
   */
  const lifecycle = {
    mounted: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.mounted || "🚀", message, data);
    },
    loading: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.loading || "⏳", message, data);
    },
    completed: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.completed || "✨", message, data);
    },
    instant: (message: string, data?: any) => {
      emoji(EMOJI_MAP_EXTENDED.instant || "💨", message, data);
    },
  };

  return {
    // Base logging functions
    log,
    success,
    error,
    warn,
    info,
    debug,
    emoji,

    // Category-specific loggers
    cache,
    api,
    action,
    lifecycle,
  };
};
