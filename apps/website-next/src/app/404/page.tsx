import { NotFoundPage } from '@components/NotFoundPage';
import { defaultLocale } from 'intlayer';
import type { FC } from 'react';

export { generateMetadata } from '../[locale]/(landing)/[...not-found]/metadata';

/**
 * Static `/404` route. Unlike the `not-found` boundary it is a real page, so it
 * renders the screen directly rather than calling `notFound()`.
 */
const NotFoundRoutePage: FC = () => <NotFoundPage locale={defaultLocale} />;

export default NotFoundRoutePage;
