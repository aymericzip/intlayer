import { defineMiddleware } from 'astro:middleware';
import {
  App_Admin,
  App_Auth_ChangePassword,
  App_Auth_ResetPassword,
  App_Auth_SignIn,
  App_Auth_SignUp,
  App_Dashboard,
  App_Onboarding,
  App_Pricing,
} from '@intlayer/design-system/routes';
import { getDoc, getDocMetadata, getDocsKeys } from '@intlayer/docs';
import {
  getDashboardHeaders,
  getDefaultHeaders,
  getScannerHeaders,
} from './utils/headers';

const findDocByNormalizedSlugs = async (
  normalizedSlugs: string[],
  locale: string
) => {
  const docsKeys = getDocsKeys();
  const results = await Promise.allSettled(
    docsKeys.map(async (key) => {
      const metadata = await getDocMetadata(key as any, 'en' as any);
      return { key, metadata };
    })
  );

  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    const { key, metadata } = result.value;
    if (
      metadata.slugs &&
      normalizedSlugs.every((s) => metadata.slugs.includes(s)) &&
      metadata.slugs.length === normalizedSlugs.length
    ) {
      try {
        return await getDoc(key as any, locale as any);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;

  // Custom Redirects (Legacy blog and doc paths)
  const blogRedirectMatch = path.match(
    /^(\/[a-z]{2,3}(-[a-z]{2,3})?)?\/blog\/i18n-technologies\/(CMS\/wix|CMS\/wordpress|CMS\/drupal|frameworks\/flutter)$/i
  );
  if (blogRedirectMatch) {
    return context.redirect(`${blogRedirectMatch[1] || ''}/blog`, 301);
  }

  const docRedirectMatch = path.match(
    /^(\/[a-z]{2,3}(-[a-z]{2,3})?)?\/doc\/environment\/vite-and-react\/tanstack-start$/i
  );
  if (docRedirectMatch) {
    return context.redirect(
      `${docRedirectMatch[1] || ''}/doc/environment/tanstack-start`,
      301
    );
  }

  // App routes redirects
  const appRoutes: Record<string, string> = {
    pricing: App_Pricing,
    onboarding: App_Onboarding,
    dashboard: App_Dashboard,
    admin: App_Admin,
    'auth/login': App_Auth_SignIn,
    'auth/register': App_Auth_SignUp,
    'auth/password/reset': App_Auth_ResetPassword,
    'auth/password/change': App_Auth_ChangePassword,
  };

  const appRouteMatch = path.match(
    /^(\/[a-z]{2,3}(-[a-z]{2,3})?)?\/(pricing|onboarding|dashboard|admin|auth\/login|auth\/register|auth\/password\/reset|auth\/password\/change)(\/.*)?$/i
  );
  if (appRouteMatch) {
    const routeKey = appRouteMatch[3].toLowerCase();
    const rest = appRouteMatch[4] || '';
    if (appRoutes[routeKey]) {
      return context.redirect(`${appRoutes[routeKey]}${rest}`, 301);
    }
  }

  // Match /{locale}/doc/{...slugs}.md  or  /doc/{...slugs}.md
  const match =
    path.match(/^\/([^/]+)\/(doc|blog|frequent-questions)\/(.+)\.md$/) ||
    path.match(/^\/()(doc|blog|frequent-questions)\/(.+)\.md$/);

  if (!match) {
    const response = await next();
    const headers = path.includes('/dashboard')
      ? getDashboardHeaders()
      : path.includes('/i18n-seo-scanner')
        ? getScannerHeaders()
        : getDefaultHeaders();

    headers.forEach((value, key) => {
      response.headers.set(key, value);
    });

    return response;
  }

  const [, locale, section, slugPath] = match;
  const slugs = slugPath.split('/');
  const prefix = section === 'frequent-questions' ? 'blog' : section;
  const normalizedSlugs = [prefix, ...slugs];
  const resolvedLocale = locale || 'en';

  const content = await findDocByNormalizedSlugs(
    normalizedSlugs,
    resolvedLocale
  );

  if (content === null) return new Response('Not found', { status: 404 });

  const docResponse = new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control':
        'public, max-age=300, s-maxage=300, stale-while-revalidate=300',
      'X-Robots-Tag': 'all',
    },
  });

  const defaultHeaders = getDefaultHeaders();
  defaultHeaders.forEach((value, key) => {
    if (!docResponse.headers.has(key)) {
      docResponse.headers.set(key, value);
    }
  });

  return docResponse;
});
