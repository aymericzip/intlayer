import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AuditEvent } from './types';

const redisStore = new Map<string, { value: string; ttlSeconds: number }>();

vi.mock('@utils/redis/connectRedis', () => ({
  getRedisClient: () => ({
    get: async (key: string) => redisStore.get(key)?.value ?? null,
    set: async (
      key: string,
      value: string,
      _mode: 'EX',
      ttlSeconds: number
    ) => {
      redisStore.set(key, { value, ttlSeconds });
      return 'OK';
    },
  }),
}));

const { AUDIT_CACHE_TTL_SECONDS, getCachedAudit, setCachedAudit } =
  await import('./auditCache.service');

const events: AuditEvent[] = [
  { progress: 10, message: 'Checking domain...' },
  { type: 'url_htmlLang\\https://example.com/fr', status: 'success' },
  { progress: 100, message: 'Audit completed' },
];

describe('auditCache', () => {
  beforeEach(() => redisStore.clear());

  it('stores a completed audit for one hour and replays it', async () => {
    await setCachedAudit('https://example.com/fr', events);

    const [storedEntry] = [...redisStore.values()];
    expect(storedEntry?.ttlSeconds).toBe(AUDIT_CACHE_TTL_SECONDS);
    expect(AUDIT_CACHE_TTL_SECONDS).toBe(3600);

    const cachedAudit = await getCachedAudit('https://example.com/fr');
    expect(cachedAudit?.events).toEqual(events);
    expect(Number.isNaN(Date.parse(cachedAudit?.cachedAt ?? ''))).toBe(false);
  });

  it('shares one entry across host case, trailing slash and hash', async () => {
    await setCachedAudit('https://Example.com/fr/', events);

    expect(
      await getCachedAudit('https://example.com/fr#pricing')
    ).not.toBeNull();
    expect(await getCachedAudit('https://example.com/de')).toBeNull();
    expect(await getCachedAudit('https://example.com/fr?lang=de')).toBeNull();
  });

  it('never caches a failed audit', async () => {
    await setCachedAudit('https://example.com/', [
      ...events,
      { globalError: 'HTTP 500 on https://example.com/' },
    ]);

    expect(redisStore.size).toBe(0);
  });
});
