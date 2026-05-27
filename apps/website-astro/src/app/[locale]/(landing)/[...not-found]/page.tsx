import { type FC, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';

export { generateMetadata } from './metadata';

// Render
const NotFountPageContent: FC = () => {
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

const NotFountPage = async () => {
  return (
    <Suspense>
      <NotFountPageContent />
    </Suspense>
  );
};

export default NotFountPage;
