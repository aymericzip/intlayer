/** @jsxImportSource react */

import { SearchView } from '@components/DocPage/Search/SearchView';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

const BlogSearchContent: FC = () => {
  const { title } = useIntlayer('blog-search-page');
  return (
    <>
      <WebsiteHeader />
      <h1 className="mt-10 font-bold text-4xl">{title}</h1>
      <div className="flex flex-1 flex-col items-baseline gap-10 p-10 md:mt-[10vh]">
        <SearchView />
      </div>
    </>
  );
};

export const BlogSearchIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <BlogSearchContent />
  </WebsiteIslandWrapper>
);
