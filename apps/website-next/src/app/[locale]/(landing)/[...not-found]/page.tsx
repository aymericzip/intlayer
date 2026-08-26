import { notFound } from 'next/navigation';
import type { FC } from 'react';

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
 */
const NotFoundCatchAllPage: FC = () => notFound();

export default NotFoundCatchAllPage;
