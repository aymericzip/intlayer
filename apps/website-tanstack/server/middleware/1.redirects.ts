/**
 * Nitro production middleware — permanent redirects for moved or removed pages
 * and for cross-domain app routes.
 *
 * Categories:
 *   1. Doc pages whose URLs changed (preserve SEO equity)
 *   2. Removed blog pages → /blog
 *   3. App-domain shortcuts (/pricing, /dashboard, /admin, /auth/*)
 */
/**
 * Intentionally avoids importing from 'h3' — Nitro bundles h3 internally and
 * provides a populated event at runtime. Using a structural type keeps this file
 * runtime-agnostic and resolves without h3 in devDependencies.
 */
type H3EventLike = {
  readonly path: string;
};

const APP_DOMAIN = 'https://app.intlayer.org';

const LOCALE_RE = /^(\/[a-z]{2}(?:-[A-Z]{2})?)(\/.*|$)/;

/**
 * Splits a request path into its optional locale prefix and the rest.
 * Example: '/fr/doc/foo' → { locale: '/fr', rest: '/doc/foo' }
 * Example: '/doc/foo'   → { locale: '',    rest: '/doc/foo' }
 */
const parseLocale = (path: string): { locale: string; rest: string } => {
  const match = path.match(LOCALE_RE);
  return match
    ? { locale: match[1], rest: match[2] || '/' }
    : { locale: '', rest: path };
};

const REMOVED_BLOG_SLUGS = new Set([
  '/blog/i18n-technologies/CMS/wix',
  '/blog/i18n-technologies/CMS/wordpress',
  '/blog/i18n-technologies/CMS/drupal',
  '/blog/i18n-technologies/frameworks/flutter',
]);

const redirect = (location: string): Response =>
  new Response(null, { status: 301, headers: { Location: location } });

export default (event: H3EventLike): Response | void => {
  const { locale, rest } = parseLocale(event.path);

  // ── 1. Doc pages that moved ────────────────────────────────────────────────
  if (rest === '/doc/environment/vite-and-react/tanstack-start') {
    return redirect(`${locale}/doc/environment/tanstack-start`);
  }

  // ── 2. Removed blog pages ──────────────────────────────────────────────────
  if (REMOVED_BLOG_SLUGS.has(rest)) {
    return redirect(`${locale}/blog`);
  }

  // ── 3. App-domain shortcuts ────────────────────────────────────────────────
  if (rest === '/pricing') return redirect(`${APP_DOMAIN}/pricing`);
  if (rest === '/onboarding') return redirect(`${APP_DOMAIN}/onboarding`);
  if (rest === '/auth/login') return redirect(`${APP_DOMAIN}/auth/login`);
  if (rest === '/auth/register') return redirect(`${APP_DOMAIN}/auth/register`);
  if (rest === '/auth/password/reset')
    return redirect(`${APP_DOMAIN}/auth/password/reset`);
  if (rest === '/auth/password/change')
    return redirect(`${APP_DOMAIN}/auth/password/change`);

  // /dashboard → https://app.intlayer.org
  // /dashboard/:path* → https://app.intlayer.org/:path*
  if (rest === '/dashboard') return redirect(APP_DOMAIN);
  if (rest.startsWith('/dashboard/'))
    return redirect(`${APP_DOMAIN}${rest.slice('/dashboard'.length)}`);

  // /admin → https://app.intlayer.org/admin
  // /admin/:path* → https://app.intlayer.org/admin/:path*
  if (rest === '/admin' || rest.startsWith('/admin/'))
    return redirect(`${APP_DOMAIN}${rest}`);
};
