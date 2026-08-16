import { notFound } from 'next/navigation';
import { connection } from 'next/server';

export { generateMetadata } from './metadata';

/**
 * Catch-all for unmatched paths under the `[locale]` segment.
 *
 * Delegates to `notFound()` so Next.js answers with a real HTTP 404 and renders
 * the `not-found` boundary. Rendering the 404 screen directly from here would
 * answer HTTP 200 instead, and because `[locale]` matches *any* first segment,
 * that also covered reserved paths such as `/_next/static/chunks/<hash>.js`.
 * A missing chunk then resolved as a cacheable 200 HTML document, which the CDN
 * pinned under a `.js` URL — the browser refuses to execute it
 * ("MIME type ('text/html') is not executable") and the chunk can never recover.
 *
 * `connection()` opts the route into request-time rendering. Cache Components
 * otherwise rejects the build: `generateMetadata` reads `params` (runtime data)
 * while this page is fully prerenderable, and streaming metadata into a static
 * shell is refused unless the deferral is explicit. Request-time rendering is
 * also what a catch-all 404 wants — nothing here is worth a static shell.
 */
const NotFoundCatchAllPage = async (): Promise<never> => {
  await connection();

  notFound();
};

export default NotFoundCatchAllPage;
