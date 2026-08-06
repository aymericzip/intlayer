import type { LocalesValues } from 'intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

const NotFoundPageContent: FC = () => {
  const { title, content } = useIntlayer('not-found');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <span className="m-32 flex justify-center gap-3 text-center font-bold text-4xl text-darkGray md:justify-end">
        <span className="relative flex items-center">
          {content}
          <span className="absolute left-1/2 -translate-x-1/2 text-[9rem] opacity-10">
            404
          </span>
        </span>
      </span>
    </>
  );
};

export type NotFoundPageProps = {
  /** Locale used to resolve the 404 copy. */
  locale: LocalesValues;
};

/**
 * Branded, localized "page not found" screen.
 *
 * Shared by the `/404` route and the `not-found` boundary so both render the
 * same UI regardless of how Next.js reached them.
 */
export const NotFoundPage: FC<NotFoundPageProps> = ({ locale }) => (
  <IntlayerServerProvider locale={locale}>
    <Suspense>
      <NotFoundPageContent />
    </Suspense>
  </IntlayerServerProvider>
);
