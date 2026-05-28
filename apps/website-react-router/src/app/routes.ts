import type { RouteConfig } from '@react-router/dev/routes';
import { layout, route } from '@react-router/dev/routes';

/** Single source of truth for static page paths (no locale prefix). */
export const staticRoutes = [
  '/',
  '/translate',
  '/tms',
  '/cms',
  '/demo',
  '/contributors',
  '/i18n-seo-scanner',
  '/playground',
  '/doc/chat',
  '/doc/search',
  '/blog/search',
  '/frequent-questions',
  '/privacy-notice',
  '/terms-of-service',
] as const;

/** Resource / API paths that are NOT localised. */
export const resourceRoutes = [
  '/sitemap.xml',
  '/feed.xml',
  '/posts.json',
] as const;

const routes: RouteConfig = [
  route('/', 'routes/landing.tsx', { id: 'landing-root' }),
  route(':locale', 'routes/landing.tsx', { id: 'landing-locale' }),

  route(':locale?/translate', 'routes/translate.tsx', { id: 'translate' }),
  route(':locale?/tms', 'routes/tms.tsx', { id: 'tms' }),
  route(':locale?/cms', 'routes/cms.tsx', { id: 'cms' }),
  route(':locale?/demo', 'routes/demo.tsx', { id: 'demo' }),
  route(':locale?/contributors', 'routes/contributors.tsx', {
    id: 'contributors',
  }),
  route(':locale?/i18n-seo-scanner', 'routes/i18n-seo-scanner.tsx', {
    id: 'scanner',
  }),
  route(':locale?/doc/raw/*', 'routes/doc-raw.tsx', { id: 'doc-raw' }),

  layout('routes/playground-layout.tsx', [
    route(':locale?/playground', 'routes/playground-page.tsx', {
      id: 'playground',
    }),
  ]),

  layout('routes/docs-layout.tsx', [
    route(':locale?/doc/chat', 'routes/doc-chat-page.tsx', { id: 'doc-chat' }),
    route(':locale?/doc/search', 'routes/doc-search-page.tsx', {
      id: 'doc-search',
    }),
    route(':locale?/doc/*', 'routes/doc-page.tsx', { id: 'doc-page' }),
    route(':locale?/blog/search', 'routes/blog-search-page.tsx', {
      id: 'blog-search',
    }),
    route(':locale?/blog/*', 'routes/blog-page.tsx', { id: 'blog-page' }),
    route(
      ':locale?/frequent-questions',
      'routes/frequent-questions-index.tsx',
      {
        id: 'faq-index',
      }
    ),
    route(
      ':locale?/frequent-questions/*',
      'routes/frequent-questions-slug.tsx',
      { id: 'faq-slug' }
    ),
    route(':locale?/privacy-notice', 'routes/privacy-notice-page.tsx', {
      id: 'privacy-notice',
    }),
    route(':locale?/terms-of-service', 'routes/terms-of-service-page.tsx', {
      id: 'terms-of-service',
    }),
  ]),

  // Resource / API Routes
  route('sitemap.xml', 'sitemap.ts', { id: 'sitemap-xml' }),
  route('feed.xml', 'feed.xml/route.ts', { id: 'feed-xml' }),
  route('posts.json', 'posts.json/route.ts', { id: 'posts-json' }),
  route('api/health', 'api/health/route.ts', { id: 'api-health' }),
  route('api/baidu-push', 'api/baidu-push/route.ts', { id: 'api-baidu-push' }),
];

export default routes;
