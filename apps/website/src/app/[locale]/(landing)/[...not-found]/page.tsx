import type { NextPageIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export { generateMetadata } from './metadata';

// Render
const NotFountPageContent: FC = () => {
  // Remove i18n because of error `Cannot read properties of null (reading 'use')`
  // const { title, content } = useIntlayer('not-found');

  return (
    <>
      <h1 className="hidden">404 - Page not found</h1>
      <span className="m-32 flex justify-center gap-3 text-center font-bold text-4xl text-darkGray md:justify-end">
        <span className="relative flex items-center">
          Page not found
          <span className="-translate-x-1/2 absolute left-1/2 text-[9rem] opacity-10">
            404
          </span>
        </span>
      </span>
    </>
  );
};

const NotFountPage: NextPageIntlayer = async () => {
  return <NotFountPageContent />;
};

export default NotFountPage;
