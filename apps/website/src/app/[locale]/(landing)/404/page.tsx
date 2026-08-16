import { notFound } from 'next/navigation';
import type { FC } from 'react';

export { generateMetadata } from '../[...not-found]/metadata';

/**
 * `/404` is a fixed route: `[locale]` supplies its only param via
 * `generateStaticParams`, so it prerenders statically.
 *
 * It therefore renders `notFound()` directly rather than reusing the
 * `[...not-found]` page, whose `connection()` call opts that catch-all into
 * request-time rendering — a requirement of its unknown params, not of this
 * route.
 */
const NotFoundPage: FC = () => notFound();

export default NotFoundPage;
