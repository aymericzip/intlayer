import type { NextPageIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
export { generateMetadata } from './metadata';

const NotFount: NextPageIntlayer = ({ params: { locale } }) => {
  const { title, content } = useIntlayer('not-found', locale);

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className=" w-screen">
        <span className="text-darkGray absolute left-1/2 top-1/4 m-auto flex -translate-x-1/2 -translate-y-1/2 flex-col gap-3 text-center text-4xl font-bold sm:flex-row-reverse md:left-2/3">
          <span className="absolute left-1/2 -translate-x-1/2 text-[9rem] opacity-10">
            404
          </span>
          <span>{content}</span>
        </span>
      </div>
    </>
  );
};

export default NotFount;
