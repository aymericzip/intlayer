import { describe, expect, it } from 'vitest';
import { getStorageAttributes } from './getStorageAttributes';

describe('getStorageAttributes', () => {
  it('should return empty arrays when storage is disabled (false)', () => {
    const result = getStorageAttributes(false);

    expect(result).toEqual({
      cookies: [],
      headers: [],
      localStorage: [],
      sessionStorage: [],
    });
  });

  it('should return empty arrays when storage is undefined', () => {
    const result = getStorageAttributes(undefined as any);

    expect(result).toEqual({
      cookies: [],
      headers: [],
      localStorage: [],
      sessionStorage: [],
    });
  });

  it('should handle single string "cookie"', () => {
    const result = getStorageAttributes('cookie');

    expect(result.cookies).toHaveLength(1);
    expect(result.cookies[0].name).toBe('INTLAYER_LOCALE');
    expect(result.localStorage).toHaveLength(0);
    expect(result.sessionStorage).toHaveLength(0);
    expect(result.headers).toHaveLength(0);
  });

  it('should handle single string "localStorage"', () => {
    const result = getStorageAttributes('localStorage');

    expect(result.cookies).toHaveLength(0);
    expect(result.localStorage).toHaveLength(1);
    expect(result.localStorage[0].name).toBe('INTLAYER_LOCALE');
    expect(result.sessionStorage).toHaveLength(0);
  });

  it('should handle single string "sessionStorage"', () => {
    const result = getStorageAttributes('sessionStorage');

    expect(result.cookies).toHaveLength(0);
    expect(result.localStorage).toHaveLength(0);
    expect(result.sessionStorage).toHaveLength(1);
    expect(result.sessionStorage[0].name).toBe('INTLAYER_LOCALE');
  });

  it('should handle array with multiple storage types - ["cookie", "localStorage"]', () => {
    const result = getStorageAttributes(['cookie', 'localStorage']);

    expect(result.cookies).toHaveLength(1);
    expect(result.cookies[0].name).toBe('INTLAYER_LOCALE');
    expect(result.localStorage).toHaveLength(1);
    expect(result.localStorage[0].name).toBe('INTLAYER_LOCALE');
    expect(result.sessionStorage).toHaveLength(0);
  });

  it('should handle array with all storage types', () => {
    const result = getStorageAttributes([
      'cookie',
      'localStorage',
      'sessionStorage',
    ]);

    expect(result.cookies).toHaveLength(1);
    expect(result.localStorage).toHaveLength(1);
    expect(result.sessionStorage).toHaveLength(1);
  });

  it('should handle cookie object with custom attributes', () => {
    const result = getStorageAttributes({
      type: 'cookie',
      name: 'MY_CUSTOM_LOCALE',
      path: '/app',
      domain: '.example.com',
      secure: true,
      sameSite: 'strict',
    });

    expect(result.cookies).toHaveLength(1);
    expect(result.cookies[0].name).toBe('MY_CUSTOM_LOCALE');
    expect(result.cookies[0].attributes.path).toBe('/app');
    expect(result.cookies[0].attributes.domain).toBe('.example.com');
    expect(result.cookies[0].attributes.secure).toBe(true);
    expect(result.cookies[0].attributes.sameSite).toBe('strict');
  });

  it('should handle localStorage object with custom name', () => {
    const result = getStorageAttributes({
      type: 'localStorage',
      name: 'MY_CUSTOM_STORAGE',
    });

    expect(result.localStorage).toHaveLength(1);
    expect(result.localStorage[0].name).toBe('MY_CUSTOM_STORAGE');
  });

  it('should handle sessionStorage object with custom name', () => {
    const result = getStorageAttributes({
      type: 'sessionStorage',
      name: 'MY_SESSION_STORAGE',
    });

    expect(result.sessionStorage).toHaveLength(1);
    expect(result.sessionStorage[0].name).toBe('MY_SESSION_STORAGE');
  });

  it('should handle array with mixed strings and objects', () => {
    const result = getStorageAttributes([
      'cookie',
      {
        type: 'localStorage',
        name: 'CUSTOM_LOCAL',
      },
      {
        type: 'cookie',
        name: 'SECOND_COOKIE',
        path: '/custom',
      },
    ]);

    expect(result.cookies).toHaveLength(2);
    expect(result.cookies[0].name).toBe('INTLAYER_LOCALE');
    expect(result.cookies[1].name).toBe('SECOND_COOKIE');
    expect(result.cookies[1].attributes.path).toBe('/custom');
    expect(result.localStorage).toHaveLength(1);
    expect(result.localStorage[0].name).toBe('CUSTOM_LOCAL');
  });

  it('should handle multiple entries of the same type', () => {
    const result = getStorageAttributes([
      { type: 'cookie', name: 'COOKIE_1' },
      { type: 'cookie', name: 'COOKIE_2' },
      { type: 'localStorage', name: 'STORAGE_1' },
      { type: 'localStorage', name: 'STORAGE_2' },
    ]);

    expect(result.cookies).toHaveLength(2);
    expect(result.cookies[0].name).toBe('COOKIE_1');
    expect(result.cookies[1].name).toBe('COOKIE_2');
    expect(result.localStorage).toHaveLength(2);
    expect(result.localStorage[0].name).toBe('STORAGE_1');
    expect(result.localStorage[1].name).toBe('STORAGE_2');
  });
});
