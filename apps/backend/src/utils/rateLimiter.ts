import type { RateLimitOptions } from '@fastify/rate-limit';
import type { FastifyRequest } from 'fastify';
import { ErrorHandler } from './errors';

// Helper function to normalize IP addresses (similar to express-rate-limit's ipKeyGenerator)
const normalizeIP = (ip: string | undefined): string => {
  if (!ip) return 'unknown';
  // Normalize IPv6 mapped IPv4 addresses
  if (ip.startsWith('::ffff:')) {
    return ip.substring(7);
  }
  return ip;
};

// -------------------------------------------------------------
// Create the rate-limiter instances once at module load-time so
// that the hit counters are shared across every incoming request.
// -------------------------------------------------------------

export const ipLimiter: RateLimitOptions = {
  max: 500, // 500 requests
  timeWindow: 60 * 1000, // 1-minute window
  enableDraftSpec: true,
  // Use a custom key generator that handles proxy headers securely
  keyGenerator: (request: FastifyRequest) => {
    const ip =
      request.ip ??
      request.socket?.remoteAddress ??
      request.headers['x-forwarded-for'] ??
      'unknown';
    return normalizeIP(typeof ip === 'string' ? ip : ip[0]);
  },
  errorResponseBuilder: (_request: FastifyRequest, context) => {
    // context.ttl is already the remaining time in milliseconds
    const retryAfter = Math.ceil(context.ttl / 1000);
    const errorResponse = ErrorHandler.formatGenericErrorResponse(
      'RATE_LIMIT_EXCEEDED',
      {
        limit: `${context.max} per minute`,
        retryAfter,
      }
    );
    return {
      statusCode: errorResponse.status,
      ...errorResponse,
    };
  },
};

export const unauthenticatedChatBotLimiter: RateLimitOptions = {
  max: 3, // 3 requests
  timeWindow: 60 * 60 * 1000, // 1-hour window
  enableDraftSpec: true,
  // Skip rate limiting if user is authenticated (allowList returns true to skip)
  allowList: (request: FastifyRequest) => {
    return Boolean((request as any).locals?.user);
  },
  // Use a custom key generator that handles proxy headers securely
  keyGenerator: (request: FastifyRequest) => {
    const ip =
      request.ip ??
      request.socket?.remoteAddress ??
      request.headers['x-forwarded-for'] ??
      'unknown';
    return normalizeIP(typeof ip === 'string' ? ip : ip[0]);
  },
  errorResponseBuilder: (_request: FastifyRequest, context) => {
    // context.ttl is already the remaining time in milliseconds
    const retryAfter = Math.ceil(context.ttl / 1000);
    const errorResponse = ErrorHandler.formatGenericErrorResponse(
      'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED',
      {
        limit: `${context.max} per hour`,
        retryAfter,
      }
    );
    return {
      statusCode: errorResponse.status,
      ...errorResponse,
    };
  },
};
