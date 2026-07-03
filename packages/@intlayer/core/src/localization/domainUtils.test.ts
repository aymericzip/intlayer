import * as Locales from '@intlayer/types/locales';
import { describe, expect, it } from 'vitest';
import {
  getDomainHostname,
  getDomainOrigin,
  getLocaleFromDomain,
  isLocaleExclusiveOnDomain,
  type LocaleDomainMap,
} from './domainUtils';

describe('getDomainHostname', () => {
  it('should return a bare hostname unchanged', () => {
    expect(getDomainHostname('intlayer.cn')).toBe('intlayer.cn');
  });

  it('should strip an https protocol', () => {
    expect(getDomainHostname('https://intlayer.cn')).toBe('intlayer.cn');
  });

  it('should strip an http protocol', () => {
    expect(getDomainHostname('http://intlayer.cn')).toBe('intlayer.cn');
  });

  it('should strip path and port from a URL value', () => {
    expect(getDomainHostname('https://intlayer.cn:8080/path')).toBe(
      'intlayer.cn'
    );
  });

  it('should return the input when URL parsing fails', () => {
    expect(getDomainHostname('https://')).toBe('https://');
  });
});

describe('getDomainOrigin', () => {
  it('should prepend https:// to a bare hostname', () => {
    expect(getDomainOrigin('intlayer.cn')).toBe('https://intlayer.cn');
  });

  it('should keep an explicit https protocol', () => {
    expect(getDomainOrigin('https://intlayer.cn')).toBe('https://intlayer.cn');
  });

  it('should keep an explicit http protocol', () => {
    expect(getDomainOrigin('http://intlayer.cn')).toBe('http://intlayer.cn');
  });
});

describe('getLocaleFromDomain', () => {
  const domains: LocaleDomainMap = {
    [Locales.CHINESE]: 'intlayer.cn',
    [Locales.ENGLISH]: 'intlayer.org',
    [Locales.FRENCH]: 'intlayer.org',
  };

  it('should return the locale exclusively mapped to a hostname', () => {
    expect(getLocaleFromDomain('intlayer.cn', domains)).toBe(Locales.CHINESE);
  });

  it('should return undefined when multiple locales share the hostname', () => {
    expect(getLocaleFromDomain('intlayer.org', domains)).toBeUndefined();
  });

  it('should return undefined for an unmapped hostname', () => {
    expect(getLocaleFromDomain('example.com', domains)).toBeUndefined();
  });

  it('should return undefined when domains is undefined', () => {
    expect(getLocaleFromDomain('intlayer.cn', undefined)).toBeUndefined();
  });

  it('should match a domain declared with a protocol', () => {
    expect(
      getLocaleFromDomain('intlayer.cn', {
        [Locales.CHINESE]: 'https://intlayer.cn',
      })
    ).toBe(Locales.CHINESE);
  });
});

describe('isLocaleExclusiveOnDomain', () => {
  const domains: LocaleDomainMap = {
    [Locales.CHINESE]: 'intlayer.cn',
    [Locales.ENGLISH]: 'intlayer.org',
    [Locales.FRENCH]: 'intlayer.org',
  };

  it('should return true for a locale alone on its domain', () => {
    expect(isLocaleExclusiveOnDomain(Locales.CHINESE, domains)).toBe(true);
  });

  it('should return false for locales sharing a domain', () => {
    expect(isLocaleExclusiveOnDomain(Locales.ENGLISH, domains)).toBe(false);
    expect(isLocaleExclusiveOnDomain(Locales.FRENCH, domains)).toBe(false);
  });

  it('should return false for a locale without a domain entry', () => {
    expect(isLocaleExclusiveOnDomain(Locales.SPANISH, domains)).toBe(false);
  });

  it('should return false when domains is undefined', () => {
    expect(isLocaleExclusiveOnDomain(Locales.CHINESE, undefined)).toBe(false);
  });

  it('should compare hostnames after protocol stripping', () => {
    // en and fr point at the same host, declared with mixed protocols
    expect(
      isLocaleExclusiveOnDomain(Locales.ENGLISH, {
        [Locales.ENGLISH]: 'https://intlayer.org',
        [Locales.FRENCH]: 'intlayer.org',
      })
    ).toBe(false);
  });
});
