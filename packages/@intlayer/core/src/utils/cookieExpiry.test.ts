import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildCookieString, resolveExpiresToTimestamp } from './cookieExpiry';

const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
const NOW = Date.UTC(2026, 5, 8, 12, 0, 0); // fixed reference time

describe('cookieExpiry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('resolveExpiresToTimestamp', () => {
    it('treats a number as seconds from now (relative)', () => {
      expect(resolveExpiresToTimestamp(SECONDS_PER_YEAR)).toBe(
        NOW + SECONDS_PER_YEAR * 1000
      );
    });

    it('treats an ISO string as an absolute moment', () => {
      const iso = '2027-06-08T00:00:00.000Z';
      expect(resolveExpiresToTimestamp(iso)).toBe(Date.parse(iso));
    });

    it('returns undefined for an invalid date string', () => {
      expect(resolveExpiresToTimestamp('not-a-date')).toBeUndefined();
    });

    it('returns undefined when expires is omitted', () => {
      expect(resolveExpiresToTimestamp(undefined)).toBeUndefined();
    });
  });

  describe('buildCookieString', () => {
    it('sets Expires from a relative number of seconds', () => {
      const result = buildCookieString('INTLAYER_LOCALE', 'pt', {
        expires: SECONDS_PER_YEAR,
      });
      const expectedExpires = new Date(
        NOW + SECONDS_PER_YEAR * 1000
      ).toUTCString();
      expect(result).toBe(`INTLAYER_LOCALE=pt; Expires=${expectedExpires}`);
    });

    it('sets Expires from an absolute ISO date string', () => {
      const iso = '2027-06-08T00:00:00.000Z';
      const result = buildCookieString('INTLAYER_LOCALE', 'pt', {
        expires: iso,
      });
      expect(result).toBe(
        `INTLAYER_LOCALE=pt; Expires=${new Date(Date.parse(iso)).toUTCString()}`
      );
    });

    it('produces a session cookie when no expiry is provided', () => {
      const result = buildCookieString('INTLAYER_LOCALE', 'pt', {});
      expect(result).toBe('INTLAYER_LOCALE=pt');
    });

    it('serializes path, domain, secure and sameSite', () => {
      const result = buildCookieString('INTLAYER_LOCALE', 'pt', {
        path: '/app',
        domain: '.example.com',
        secure: true,
        sameSite: 'strict',
      });
      expect(result).toBe(
        'INTLAYER_LOCALE=pt; Path=/app; Domain=.example.com; Secure; SameSite=strict'
      );
    });

    it('URL-encodes the value', () => {
      const result = buildCookieString('INTLAYER_LOCALE', 'pt BR', {});
      expect(result).toBe('INTLAYER_LOCALE=pt%20BR');
    });
  });
});
