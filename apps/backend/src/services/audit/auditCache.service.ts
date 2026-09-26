import { logger } from '@logger';
import { getRedisClient } from '@utils/redis/connectRedis';
import type { AuditEvent } from './types';

/** How long a single-page audit result is served from cache. */
export const AUDIT_CACHE_TTL_SECONDS = 60 * 60;

/** Audit events of a page, as stored in cache. */
export type CachedAudit = {
  /** ISO date at which the audit ran. */
  cachedAt: string;
  /** Raw events produced by `runSingleAudit` (no running score/progress). */
  events: AuditEvent[];
};

/**
 * Cache key of an audited URL: host lower-cased, hash dropped, trailing slash
 * removed, so `https://Example.com/fr/` and `https://example.com/fr#top` share
 * one entry.
 */
const getAuditCacheKey = (url: string): string => {
  const parsedUrl = new URL(url);
  const pathname =
    parsedUrl.pathname.length > 1
      ? parsedUrl.pathname.replace(/\/+$/, '')
      : parsedUrl.pathname;

  return `audit:scan:${parsedUrl.protocol}//${parsedUrl.host.toLowerCase()}${pathname}${parsedUrl.search}`;
};

/**
 * Read the cached audit of a URL. Returns `null` when absent, expired, or
 * when Redis is unavailable (the audit then simply runs again).
 */
export const getCachedAudit = async (
  url: string
): Promise<CachedAudit | null> => {
  try {
    const cachedValue = await getRedisClient().get(getAuditCacheKey(url));
    return cachedValue ? (JSON.parse(cachedValue) as CachedAudit) : null;
  } catch (error) {
    logger.warn(`[auditCache] read failed for ${url}: ${error}`);
    return null;
  }
};

/**
 * Store the events of a completed audit for {@link AUDIT_CACHE_TTL_SECONDS}.
 * Failed audits (with a `globalError`) are never cached.
 */
export const setCachedAudit = async (
  url: string,
  events: AuditEvent[]
): Promise<void> => {
  if (events.some(({ globalError }) => globalError !== undefined)) return;

  const cachedAudit: CachedAudit = {
    cachedAt: new Date().toISOString(),
    events,
  };

  try {
    await getRedisClient().set(
      getAuditCacheKey(url),
      JSON.stringify(cachedAudit),
      'EX',
      AUDIT_CACHE_TTL_SECONDS
    );
  } catch (error) {
    logger.warn(`[auditCache] write failed for ${url}: ${error}`);
  }
};
