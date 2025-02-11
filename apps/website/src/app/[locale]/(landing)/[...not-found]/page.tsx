import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';
export { generateMetadata } from './metadata';

const NotFountPageContent: FC = () => {
  const { title, content } = useIntlayer('not-found');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <span className="text-darkGray m-32 flex justify-center gap-3 text-center text-4xl font-bold md:justify-end">
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
      <NotFountPageContent />
    </IntlayerServerProvider>
  );
};

export default NotFountPage;
