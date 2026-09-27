/* @vitest-environment node */

import { describe, expect, it } from 'vitest';
import redirects from './middleware/1.redirects';

/** Returns the `Location` header of the redirect issued for `path`, if any. */
const getRedirectLocation = (path: string): string | null | undefined =>
  redirects({ path })?.headers.get('Location');

describe('redirects middleware', () => {
  it('redirects the merged i18n-meaning post, keeping the locale prefix', () => {
    expect(getRedirectLocation('/blog/i18n-meaning')).toBe(
      '/blog/what-is-internationalization'
    );
    expect(getRedirectLocation('/zh/blog/i18n-meaning')).toBe(
      '/zh/blog/what-is-internationalization'
    );
  });

  it('redirects removed framework posts to their replacement', () => {
    expect(
      getRedirectLocation('/pt/blog/i18n-technologies/frameworks/react-native')
    ).toBe('/pt/doc/environment/react-native-and-expo');
    expect(
      getRedirectLocation('/blog/i18n-technologies/frameworks/react')
    ).toBe('/blog/how-to-pick-react-i18n-library');
  });

  it('redirects the legacy uppercase Page Router doc slug', () => {
    expect(
      getRedirectLocation('/doc/environment/nextjs/next-with-Page-Router')
    ).toBe('/doc/environment/nextjs/next-with-page-router');
  });

  it('matches paths carrying a query string or trailing slash', () => {
    expect(getRedirectLocation('/blog/i18n-meaning?utm_source=x')).toBe(
      '/blog/what-is-internationalization?utm_source=x'
    );
    expect(getRedirectLocation('/fr/blog/i18n-meaning/')).toBe(
      '/fr/blog/what-is-internationalization'
    );
  });

  it('keeps the query string on app-domain redirects', () => {
    expect(getRedirectLocation('/fr/pricing?plan=team')).toBe(
      'https://app.intlayer.org/pricing?plan=team'
    );
    expect(getRedirectLocation('/dashboard/projects?tab=1')).toBe(
      'https://app.intlayer.org/projects?tab=1'
    );
  });

  it('issues permanent redirects', () => {
    expect(redirects({ path: '/blog/i18n-meaning' })?.status).toBe(301);
  });

  it('leaves live pages untouched', () => {
    expect(
      redirects({ path: '/blog/what-is-internationalization' })
    ).toBeUndefined();
  });
});
