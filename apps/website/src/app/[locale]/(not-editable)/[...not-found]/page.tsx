import { LanguageSection } from '@components/LandingPage/LanguageSection';
import type { NextPageIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
export { generateMetadata } from './metadata';

export const NotFountPage: NextPageIntlayer = ({ params: { locale } }) => {
  const { title, content } = useIntlayer('not-found', locale);

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

export default NotFountPage;
