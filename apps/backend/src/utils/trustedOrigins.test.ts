import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  getConfiguredOrigins,
  isTrustedOrigin,
  toOrigin,
} from './trustedOrigins';

const ENVIRONMENT_KEYS = [
  'WEBSITE_URL',
  'APP_URL',
  'SHOWCASE_URL',
  'BACKEND_URL',
  'TRUSTED_ORIGINS',
] as const;

let savedEnvironment: Partial<
  Record<(typeof ENVIRONMENT_KEYS)[number], string>
>;

beforeEach(() => {
  savedEnvironment = Object.fromEntries(
    ENVIRONMENT_KEYS.map((key) => [key, process.env[key]])
  );
  for (const key of ENVIRONMENT_KEYS) delete process.env[key];
});

afterEach(() => {
  for (const key of ENVIRONMENT_KEYS) {
    const value = savedEnvironment[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('toOrigin', () => {
  it('reduces a URL to its origin, dropping path and query', () => {
    expect(toOrigin('https://app.intlayer.org/dashboard?a=1')).toBe(
      'https://app.intlayer.org'
    );
    expect(toOrigin('http://localhost:3000/')).toBe('http://localhost:3000');
  });

  it('returns null for values that are not absolute URLs', () => {
    expect(toOrigin('null')).toBeNull();
    expect(toOrigin('')).toBeNull();
    expect(toOrigin('intlayer.org')).toBeNull();
  });
});

describe('getConfiguredOrigins', () => {
  it('normalizes and de-duplicates the declared origins', () => {
    process.env.APP_URL = 'https://app.example.com/';
    process.env.WEBSITE_URL = 'https://app.example.com';
    process.env.TRUSTED_ORIGINS =
      'https://cms.example.com, https://x.example.com';

    expect(getConfiguredOrigins()).toEqual([
      'https://app.example.com',
      'https://cms.example.com',
      'https://x.example.com',
    ]);
  });

  it('ignores unset and unparsable entries', () => {
    process.env.APP_URL = 'https://app.example.com';
    process.env.TRUSTED_ORIGINS = ',not-a-url, ';

    expect(getConfiguredOrigins()).toEqual(['https://app.example.com']);
  });
});

describe('isTrustedOrigin', () => {
  it('trusts intlayer apex domains and their subdomains over HTTPS', () => {
    expect(isTrustedOrigin('https://intlayer.org')).toBe(true);
    expect(isTrustedOrigin('https://app.intlayer.org')).toBe(true);
    expect(isTrustedOrigin('https://preview.cms.intlayer.org')).toBe(true);
    expect(isTrustedOrigin('https://intlayer.cn')).toBe(true);
  });

  it('rejects look-alike hosts that merely end with the apex string', () => {
    expect(isTrustedOrigin('https://notintlayer.org')).toBe(false);
    expect(isTrustedOrigin('https://intlayer.org.evil.com')).toBe(false);
    expect(isTrustedOrigin('https://evil.com')).toBe(false);
  });

  it('rejects a path crafted to look like a subdomain', () => {
    // Referer values carry a path; a raw-string suffix test would match here.
    expect(isTrustedOrigin('https://evil.com/x.intlayer.org')).toBe(false);
  });

  it('rejects plain HTTP on the intlayer apex domains', () => {
    // The production session cookie is `secure`, so an http page can never
    // hold one and has nothing legitimate to authenticate with.
    expect(isTrustedOrigin('http://app.intlayer.org')).toBe(false);
  });

  it('trusts self-hosted origins declared through the environment', () => {
    process.env.APP_URL = 'http://localhost:3000';
    process.env.BACKEND_URL = 'http://localhost:3100';
    process.env.TRUSTED_ORIGINS = 'https://cms.acme.com';

    expect(isTrustedOrigin('http://localhost:3000')).toBe(true);
    expect(isTrustedOrigin('http://localhost:3100')).toBe(true);
    expect(isTrustedOrigin('https://cms.acme.com')).toBe(true);
    expect(isTrustedOrigin('http://localhost:4000')).toBe(false);
  });

  it('rejects missing, empty and opaque origins', () => {
    expect(isTrustedOrigin(undefined)).toBe(false);
    expect(isTrustedOrigin(null)).toBe(false);
    expect(isTrustedOrigin('')).toBe(false);
    // Sandboxed iframes and cross-origin redirects send the literal "null".
    expect(isTrustedOrigin('null')).toBe(false);
  });
});
