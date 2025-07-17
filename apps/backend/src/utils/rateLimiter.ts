import type { ResponseWithInformation } from '@middlewares/sessionAuth.middleware';
import type { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { ErrorHandler } from './errors';

// -------------------------------------------------------------
// Create the rate-limiter instances once at module load-time so
// that the hit counters are shared across every incoming request.
// -------------------------------------------------------------

export const ipLimiter: (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void> = rateLimit({
  windowMs: 60 * 1000, // 1-minute window
  limit: 100, // 100 requests / IP / window
  standardHeaders: 'draft-8',
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

export const unauthenticatedChatBotLimiter: (
  req: Request,
  res: ResponseWithInformation,
  next: NextFunction
) => any = rateLimit({
  windowMs: 60 * 60 * 1000, // 1-hour window
  limit: 3, // 3 requests / IP / window
  standardHeaders: 'draft-8',
  skip: (_req, res) => Boolean(res.locals.user), // authenticated? then skip
  legacyHeaders: false,
  handler: (req, res) => {
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
