import type { LocalesValues } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const NotFountPageContent: FC<{ locale: LocalesValues }> = ({ locale }) => {
  const { title, content } = useIntlayer('not-found', locale);

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <span className="m-32 flex justify-center gap-3 text-center font-bold text-4xl md:justify-end">
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

const NotFountPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <Suspense>
        <NotFountPageContent locale={locale} />
      </Suspense>
    </IntlayerServerProvider>
  );
};

export default NotFountPage;
