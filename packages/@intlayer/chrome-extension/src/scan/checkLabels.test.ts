import { describe, expect, it } from 'vitest';
import { baseCheckType, checkSection, fallbackCheckLabel } from './checkLabels';

describe('checkLabels', () => {
  it('strips the url suffix of url-scoped checks', () => {
    expect(baseCheckType('url_htmlLang\\https://example.com/fr')).toBe(
      'url_htmlLang'
    );
    expect(baseCheckType('robots_robotsPresent')).toBe('robots_robotsPresent');
  });

  it('groups check types by namespace', () => {
    expect(checkSection('robots_robotsPresent')).toBe('robots');
    expect(checkSection('sitemap_hasXDefault')).toBe('sitemap');
    expect(checkSection('domain_localesCount')).toBe('domain');
    expect(checkSection('url_htmlLang')).toBe('page');
  });

  it('derives a fallback label from unknown check types', () => {
    expect(fallbackCheckLabel('url_newCheck\\https://example.com')).toBe(
      'newCheck'
    );
  });
});
