import { describe, expect, it } from 'vitest';
import { toAbsoluteScanUrl } from './url';

describe('toAbsoluteScanUrl', () => {
  it('prepends https:// to a bare domain', () => {
    expect(toAbsoluteScanUrl('intlayer.org')).toBe('https://intlayer.org/');
  });

  it('keeps the path of a bare domain', () => {
    expect(toAbsoluteScanUrl(' intlayer.org/fr/doc ')).toBe(
      'https://intlayer.org/fr/doc'
    );
  });

  it('resolves protocol-relative URLs to https', () => {
    expect(toAbsoluteScanUrl('//intlayer.org')).toBe('https://intlayer.org/');
  });

  it('keeps an explicit http scheme', () => {
    expect(toAbsoluteScanUrl('http://localhost:3000/en')).toBe(
      'http://localhost:3000/en'
    );
  });

  it('rejects non-HTTP schemes and garbage', () => {
    expect(() => toAbsoluteScanUrl('ftp://intlayer.org')).toThrow(
      'Invalid URL'
    );
    expect(() => toAbsoluteScanUrl('')).toThrow('Invalid URL');
  });
});
