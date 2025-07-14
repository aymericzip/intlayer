import rateLimit from 'express-rate-limit';
import { ErrorHandler } from './errors';

export const ipLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min window
  limit: 100, // 100 requests / IP / window
  standardHeaders: 'draft-8', // `RateLimit:` response header
  // keyGenerator: (req) => req.ip, // ← default
  legacyHeaders: false,
  handler: (req, res, _next) => {
    const { limit, remaining, resetTime } = (req as any).rateLimit;

    ErrorHandler.handleGenericErrorResponse(res, 'RATE_LIMIT_EXCEEDED', {
      limit: `${limit} per minute`,
      retryAfter: Math.ceil((resetTime!.getTime() - Date.now()) / 1000),
      remaining,
    });
  },
});

export const unauthenticatedChatBotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  limit: 3, // 3 requests / IP / window
  standardHeaders: 'draft-8', // `RateLimit:` response header
  // keyGenerator: (req) => req.ip, // ← default
  skip: (_req, res) => Boolean(res.locals.user), // ← authenticated? do **not** count/limit
  legacyHeaders: false,
  handler: (req, res, _next) => {
    const { limit, remaining, resetTime } = (req as any).rateLimit;

    ErrorHandler.handleGenericErrorResponse(
      res,
      'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED',
      {
        limit: `${limit} per hour`,
        retryAfter: Math.ceil((resetTime!.getTime() - Date.now()) / 1000),
        remaining,
      }
    );
  },
});
