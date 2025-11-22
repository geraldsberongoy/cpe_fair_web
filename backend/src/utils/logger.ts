import winston from "winston";

/**
 * Application logger using Winston (Console-only).
 * 
 * Provides structured logging to CLI/console with different formats for 
 * development and production environments. No file logging to keep the 
 * codebase clean.
 * 
 * Log Levels (in order of priority):
 * - error: Error messages, exceptions, critical issues
 * - warn: Warning messages, deprecated usage, fallbacks
 * - info: General application information, startup messages
 * - http: HTTP request/response logging
 * - debug: Detailed debugging information
 * 
 * Output Formats:
 * - Development: Colorized, human-readable with timestamps
 * - Production: JSON structured format for log aggregation tools
 * 
 * @example
 * ```typescript
 * import { logger } from "../utils/logger";
 * 
 * // Different log levels
 * logger.error("Database connection failed", { error: err.message });
 * logger.warn("Using fallback configuration", { config: fallbackConfig });
 * logger.info("Server started", { port: 3001 });
 * logger.debug("Processing request", { userId: req.user.id });
 * ```
 */

// Determine log level based on environment
const logLevel = process.env.NODE_ENV === "production" ? "info" : "debug";

// Custom format for development (colorized, human-readable)
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    
    // Add metadata if present
    if (Object.keys(meta).length > 0) {
      msg += `\n${JSON.stringify(meta, null, 2)}`;
    }
    
    return msg;
  })
);

// Custom format for production (JSON, structured)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Configure transports - Console only (no file logging)
const transports: winston.transport[] = [
  // Console transport for all environments
  new winston.transports.Console({
    format: process.env.NODE_ENV === "production" ? prodFormat : devFormat,
  }),
];

// Create the logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ),
  transports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Handle uncaught exceptions and unhandled rejections - Console only
if (process.env.NODE_ENV === "production") {
  // Log uncaught exceptions to console
  logger.exceptions.handle(
    new winston.transports.Console({
      format: prodFormat,
    })
  );

  // Log unhandled promise rejections to console
  logger.rejections.handle(
    new winston.transports.Console({
      format: prodFormat,
    })
  );
}

/**
 * Create a child logger with additional context.
 * 
 * Useful for adding consistent metadata to all logs within a module or request.
 * 
 * @param defaultMeta - Default metadata to include in all log messages
 * @returns Child logger instance with default metadata
 * 
 * @example
 * ```typescript
 * // In a controller
 * const requestLogger = createChildLogger({ 
 *   requestId: req.id, 
 *   userId: req.user?.id 
 * });
 * 
 * requestLogger.info("Processing signup request");
 * requestLogger.error("Signup failed", { reason: "email exists" });
 * ```
 */
export const createChildLogger = (defaultMeta: Record<string, any>) => {
  return logger.child(defaultMeta);
};

/**
 * Log levels for convenience and type safety.
 */
export const LogLevel = {
  ERROR: "error",
  WARN: "warn", 
  INFO: "info",
  HTTP: "http",
  DEBUG: "debug",
} as const;

export type LogLevel = typeof LogLevel[keyof typeof LogLevel];
