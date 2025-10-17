import type { Response } from 'express';
import rateLimit, {
  ipKeyGenerator,
  type Options,
  type RateLimitRequestHandler,
} from 'express-rate-limit';
import { ErrorHandler } from './errors';

// -------------------------------------------------------------
// Create the rate-limiter instances once at module load-time so
// that the hit counters are shared across every incoming request.
// -------------------------------------------------------------

const ipLimiterOptions: Partial<Options> = {
  windowMs: 60 * 1000, // 1-minute window
  limit: 500, // 500 requests / IP / window
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  // Use a custom key generator that handles proxy headers securely
  keyGenerator: (req) => {
    // Normalize IPv6 to subnet using helper to avoid bypasses
    return ipKeyGenerator(req.ip ?? req.socket?.remoteAddress ?? 'unknown');
  },
  handler: (req, res) => {
    const { limit, remaining, resetTime } = (req as any).rateLimit;

    ErrorHandler.handleGenericErrorResponse(
      res as unknown as Response,
      'RATE_LIMIT_EXCEEDED',
      {
        limit: `${limit} per minute`,
        retryAfter: Math.ceil((resetTime?.getTime() - Date.now()) / 1000),
        remaining,
      }
    );
  },
};

// Fix type error of express-rate-limit
export const ipLimiter: any = rateLimit(
  ipLimiterOptions
) satisfies RateLimitRequestHandler;

const unauthenticatedChatBotLimiterOptions: Partial<Options> = {
  windowMs: 60 * 60 * 1000, // 1-hour window
  limit: 3, // 3 requests / IP / window
  standardHeaders: 'draft-8',
  skip: (_req, res) => Boolean(res.locals.user), // authenticated? then skip
  legacyHeaders: false,
  // Use a custom key generator that handles proxy headers securely
  keyGenerator: (req) => {
    // Normalize IPv6 to subnet using helper to avoid bypasses
    return ipKeyGenerator(req.ip ?? req.socket?.remoteAddress ?? 'unknown');
  },
  handler: (req, res) => {
    const { limit, remaining, resetTime } = (req as any).rateLimit;

    ErrorHandler.handleGenericErrorResponse(
      res as unknown as Response,
      'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED',
      {
        limit: `${limit} per hour`,
        retryAfter: Math.ceil((resetTime?.getTime() - Date.now()) / 1000),
        remaining,
      }
    );
  },
};

// Fix type error of express-rate-limit
export const unauthenticatedChatBotLimiter: any = rateLimit(
  unauthenticatedChatBotLimiterOptions
) satisfies RateLimitRequestHandler;
