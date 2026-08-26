import { NotFoundPage } from '@components/NotFoundPage';
import { LanguageBackground } from '@intlayer/design-system/language-background';
import { defaultLocale } from 'intlayer';
import type { FC } from 'react';

/**
 * Boundary rendered whenever `notFound()` is called under the `[locale]`
 * segment. Next.js serves it with an HTTP 404 status.
 *
 * Next.js does not pass route params to a `not-found` boundary, so the copy
 * resolves against the default locale.
 */
const NotFound: FC = () => (
  <LanguageBackground>
    <NotFoundPage locale={defaultLocale} />
  </LanguageBackground>
);

export default NotFound;
