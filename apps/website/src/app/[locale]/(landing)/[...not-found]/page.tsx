import { Locales } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';

export { generateMetadata } from './metadata';

/**
 * Fallback params for /404 page
 */
const defaultParams: Promise<{ locale: Locales }> = new Promise((resolve) =>
  resolve({
    locale: Locales.ENGLISH,
  })
);

const NotFountPage: NextPageIntlayer = async ({ params = defaultParams }) => {
  const { locale } = await params;

  const content = useIntlayer('not-found', locale);

  return (
    <>
      <h1 className="hidden">{content?.title}</h1>
      <span className="m-32 flex justify-center gap-3 text-center font-bold text-4xl text-darkGray md:justify-end">
        <span className="relative flex items-center">
          {content?.content}
          <span className="-translate-x-1/2 absolute left-1/2 text-[9rem] opacity-10">
            404
          </span>
        </span>
      </span>
    </>
  );
};

export default NotFountPage;
