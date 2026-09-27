/**
 * Nitro production middleware — permanent redirects for moved or removed pages
 * and for cross-domain app routes.
 *
 * Categories:
 *   1. Doc and blog pages whose URLs changed or were merged (preserve SEO equity)
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

/**
 * Doc and blog pages whose slug moved or was merged into another page.
 * Key: former locale-agnostic path — Value: current locale-agnostic path.
 */
const MOVED_PATHS = new Map<string, string>([
  [
    '/doc/environment/vite-and-react/tanstack-start',
    '/doc/environment/tanstack-start',
  ],
  ['/doc/environment/nextjs/compiler', '/doc/environment/nextjs'],
  ['/doc/environment/nextjs/no-locale-path', '/doc/environment/nextjs'],
  [
    '/doc/environment/vite-and-react/react-router-v7-fs-routes',
    '/doc/environment/vite-and-react/react-router-v7',
  ],
  [
    '/doc/environment/vite-and-react/compiler',
    '/doc/environment/vite-and-react',
  ],
  [
    '/doc/environment/nextjs/next-with-Page-Router',
    '/doc/environment/nextjs/next-with-page-router',
  ],
  ['/blog/i18n-meaning', '/blog/what-is-internationalization'],
  // Same intent as the blog guides: Intlayer layered on top of the library.
  ['/doc/next-intl', '/blog/intlayer-with-next-intl'],
  ['/doc/next-i18next', '/blog/intlayer-with-next-i18next'],
  // Merged into the older comparison URL, like next-intl and i18next.
  ['/blog/vue-i18n-vs-intlayer-benchmark', '/blog/vue-i18n-vs-intlayer'],
  [
    '/blog/i18n-technologies/frameworks/react',
    '/blog/how-to-pick-react-i18n-library',
  ],
  [
    '/blog/i18n-technologies/frameworks/vue',
    '/blog/how-to-pick-vue-i18n-library',
  ],
  [
    '/blog/i18n-technologies/frameworks/nuxt',
    '/blog/how-to-pick-vue-i18n-library',
  ],
  [
    '/blog/i18n-technologies/frameworks/svelte',
    '/blog/how-to-pick-svelte-i18n-library',
  ],
  [
    '/blog/i18n-technologies/frameworks/sveltekit',
    '/blog/how-to-pick-svelte-i18n-library',
  ],
  [
    '/blog/i18n-technologies/frameworks/solid',
    '/blog/how-to-pick-solid-i18n-library',
  ],
  [
    '/blog/i18n-technologies/frameworks/nextjs',
    '/blog/next-i18next-vs-next-intl-vs-intlayer',
  ],
  ['/blog/i18n-technologies/frameworks/angular', '/doc/environment/angular'],
  ['/blog/i18n-technologies/frameworks/astro', '/doc/environment/astro'],
  [
    '/blog/i18n-technologies/frameworks/react-native',
    '/doc/environment/react-native-and-expo',
  ],
  [
    '/blog/i18n-technologies/frameworks/react-router',
    '/doc/environment/vite-and-react/react-router-v7',
  ],
  [
    '/blog/i18n-technologies/frameworks/tanstack-start',
    '/doc/environment/tanstack-start',
  ],
  [
    '/blog/i18n-technologies/build-tools/vite',
    '/doc/environment/vite-and-react',
  ],
]);

/** Website paths that live on the app domain under the same path. */
const APP_SHORTCUT_PATHS = new Set([
  '/pricing',
  '/onboarding',
  '/auth/login',
  '/auth/register',
  '/auth/password/reset',
  '/auth/password/change',
]);

const redirect = (location: string): Response =>
  new Response(null, { status: 301, headers: { Location: location } });

/**
 * Splits `event.path` — which h3 builds as `pathname + search` — so lookups
 * match `/blog/foo?utm_source=x` and `/blog/foo/` like `/blog/foo`.
 */
const splitPath = (path: string): { pathname: string; search: string } => {
  const searchIndex = path.indexOf('?');
  const pathname = searchIndex === -1 ? path : path.slice(0, searchIndex);
  const search = searchIndex === -1 ? '' : path.slice(searchIndex);

  return {
    pathname:
      pathname.length > 1 && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname,
    search,
  };
};

export default (event: H3EventLike): Response | void => {
  const { pathname, search } = splitPath(event.path);
  const { locale, rest } = parseLocale(pathname);

  // ── 1. Doc and blog pages that moved ───────────────────────────────────────
  const movedPath = MOVED_PATHS.get(rest);
  if (movedPath) return redirect(`${locale}${movedPath}${search}`);

  // ── 2. Removed blog pages ──────────────────────────────────────────────────
  if (REMOVED_BLOG_SLUGS.has(rest)) {
    return redirect(`${locale}/blog${search}`);
  }

  // ── 3. App-domain shortcuts ────────────────────────────────────────────────
  if (APP_SHORTCUT_PATHS.has(rest))
    return redirect(`${APP_DOMAIN}${rest}${search}`);

  // /dashboard → https://app.intlayer.org
  // /dashboard/:path* → https://app.intlayer.org/:path*
  if (rest === '/dashboard') return redirect(`${APP_DOMAIN}${search}`);
  if (rest.startsWith('/dashboard/'))
    return redirect(`${APP_DOMAIN}${rest.slice('/dashboard'.length)}${search}`);

  // /admin → https://app.intlayer.org/admin
  // /admin/:path* → https://app.intlayer.org/admin/:path*
  if (rest === '/admin' || rest.startsWith('/admin/'))
    return redirect(`${APP_DOMAIN}${rest}${search}`);
};
