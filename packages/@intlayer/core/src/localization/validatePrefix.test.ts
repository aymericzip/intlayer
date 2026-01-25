import { Locales } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { validatePrefix } from './validatePrefix';

describe('validatePrefix', () => {
  const options = {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
    mode: 'prefix-all' as const,
  };

  it('should return isValid true for supported locale', () => {
    const result = validatePrefix(Locales.ENGLISH, options);
    expect(result.isValid).toBe(true);
    expect(result.localePrefix).toBe(Locales.ENGLISH);
  });

  it('should return isValid false for unsupported locale', () => {
    const result = validatePrefix(Locales.SPANISH, options);
    expect(result.isValid).toBe(false);
  });

  it('should return isValid false for undefined locale in prefix-all mode', () => {
    const result = validatePrefix(undefined, options);
    expect(result.isValid).toBe(false);
  });

  it('should handle prefix-no-default mode', () => {
    const noDefaultOptions = {
      ...options,
      mode: 'prefix-no-default' as const,
    };
    const result = validatePrefix(Locales.ENGLISH, noDefaultOptions);
    expect(result.isValid).toBe(true);
    expect(result.localePrefix).toBeUndefined();
  });
});
