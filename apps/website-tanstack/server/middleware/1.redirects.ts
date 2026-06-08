/**
 * Nitro production middleware — permanent redirects for moved or removed pages
 * and for cross-domain app routes.
 *
 * Categories:
 *   1. Doc pages whose URLs changed (preserve SEO equity)
 *   2. Removed blog pages → /blog
 *   3. App-domain shortcuts (/pricing, /dashboard, /admin, /auth/*)
 */
import { defineEventHandler, sendRedirect } from 'h3';

const APP_DOMAIN = 'https://app.intlayer.org';

const LOCALE_RE = /^(\/[a-z]{2}(?:-[A-Z]{2})?)(\/.*|$)/;

/**
 * Splits a request path into its optional locale prefix and the rest.
 * Example: '/fr/doc/foo' → { locale: '/fr', rest: '/doc/foo' }
 * Example: '/doc/foo'   → { locale: '',    rest: '/doc/foo' }
 */
const parseLocale = (path: string): { locale: string; rest: string } => {
  const m = path.match(LOCALE_RE);
  return m ? { locale: m[1], rest: m[2] || '/' } : { locale: '', rest: path };
};

const REMOVED_BLOG_SLUGS = new Set([
  '/blog/i18n-technologies/CMS/wix',
  '/blog/i18n-technologies/CMS/wordpress',
  '/blog/i18n-technologies/CMS/drupal',
  '/blog/i18n-technologies/frameworks/flutter',
]);

export default defineEventHandler((event) => {
  const { locale, rest } = parseLocale(event.path);

  // ── 1. Doc pages that moved ────────────────────────────────────────────────
  if (rest === '/doc/environment/vite-and-react/tanstack-start') {
    return sendRedirect(event, `${locale}/doc/environment/tanstack-start`, 301);
  }

  // ── 2. Removed blog pages ──────────────────────────────────────────────────
  if (REMOVED_BLOG_SLUGS.has(rest)) {
    return sendRedirect(event, `${locale}/blog`, 301);
  }

  // ── 3. App-domain shortcuts ────────────────────────────────────────────────
  // These send users to app.intlayer.org regardless of locale.
  if (rest === '/pricing') {
    return sendRedirect(event, `${APP_DOMAIN}/pricing`, 301);
  }
  if (rest === '/onboarding') {
    return sendRedirect(event, `${APP_DOMAIN}/onboarding`, 301);
  }
  if (rest === '/auth/login') {
    return sendRedirect(event, `${APP_DOMAIN}/auth/login`, 301);
  }
  if (rest === '/auth/register') {
    return sendRedirect(event, `${APP_DOMAIN}/auth/register`, 301);
  }
  if (rest === '/auth/password/reset') {
    return sendRedirect(event, `${APP_DOMAIN}/auth/password/reset`, 301);
  }
  if (rest === '/auth/password/change') {
    return sendRedirect(event, `${APP_DOMAIN}/auth/password/change`, 301);
  }

  // /dashboard → https://app.intlayer.org
  // /dashboard/:path* → https://app.intlayer.org/:path*
  if (rest === '/dashboard') {
    return sendRedirect(event, APP_DOMAIN, 301);
  }
  if (rest.startsWith('/dashboard/')) {
    return sendRedirect(
      event,
      `${APP_DOMAIN}${rest.slice('/dashboard'.length)}`,
      301
    );
  }

  // /admin → https://app.intlayer.org/admin
  // /admin/:path* → https://app.intlayer.org/admin/:path*
  if (rest === '/admin' || rest.startsWith('/admin/')) {
    return sendRedirect(event, `${APP_DOMAIN}${rest}`, 301);
  }
});
