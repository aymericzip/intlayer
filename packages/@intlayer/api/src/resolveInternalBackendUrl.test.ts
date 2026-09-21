import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE,
  resolveInternalBackendUrl,
} from './resolveInternalBackendUrl';

const PUBLIC_BACKEND_URL = 'http://localhost:3100';

let savedValue: string | undefined;

beforeEach(() => {
  savedValue = process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE];
  delete process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE];
});

afterEach(() => {
  if (savedValue === undefined) {
    delete process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE];
  } else {
    process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE] = savedValue;
  }
});

describe('resolveInternalBackendUrl', () => {
  it('returns the URL untouched when no internal origin is configured', () => {
    expect(
      resolveInternalBackendUrl(
        `${PUBLIC_BACKEND_URL}/api/user/setup`,
        PUBLIC_BACKEND_URL
      )
    ).toBe(`${PUBLIC_BACKEND_URL}/api/user/setup`);
  });

  it('swaps the public backend origin for the internal one', () => {
    process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE] =
      'http://backend:3100';

    expect(
      resolveInternalBackendUrl(
        `${PUBLIC_BACKEND_URL}/api/user/setup?x=1`,
        PUBLIC_BACKEND_URL
      )
    ).toBe('http://backend:3100/api/user/setup?x=1');
  });

  it('leaves requests to other hosts alone', () => {
    process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE] =
      'http://backend:3100';

    expect(
      resolveInternalBackendUrl(
        'https://api.github.com/repos/x',
        PUBLIC_BACKEND_URL
      )
    ).toBe('https://api.github.com/repos/x');
  });

  it('ignores a blank override and a relative URL', () => {
    process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE] = '   ';
    expect(resolveInternalBackendUrl('/api/x', PUBLIC_BACKEND_URL)).toBe(
      '/api/x'
    );

    process.env[BACKEND_INTERNAL_URL_ENVIRONMENT_VARIABLE] =
      'http://backend:3100';
    expect(resolveInternalBackendUrl('/api/x', PUBLIC_BACKEND_URL)).toBe(
      '/api/x'
    );
  });
});
