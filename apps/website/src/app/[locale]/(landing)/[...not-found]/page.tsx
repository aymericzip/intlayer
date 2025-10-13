import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';

export { generateMetadata } from './metadata';

const NotFountPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const { title, content } = useIntlayer('not-found', locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <h1 className="hidden">{title}</h1>
      <span className="m-32 flex justify-center gap-3 text-center font-bold text-4xl text-darkGray md:justify-end">
        <span className="relative flex items-center">
          {content}
          <span className="-translate-x-1/2 absolute left-1/2 text-[9rem] opacity-10">
            404
          </span>
        </span>
      </span>{' '}
    </IntlayerServerProvider>
  );
};

export default NotFountPage;
