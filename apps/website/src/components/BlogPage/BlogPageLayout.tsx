import { BackgroundLayout } from '@components/BackgroundLayout';
import { type Locales } from 'intlayer';
import { type ReactNode, type FC } from 'react';
import { NavTitles } from '../NavTitles/NavTitles';
import { BlogBreadCrumb } from './BlogBreadCrumb';
import { getBlogData } from './blogData';
import { BlogNavList } from './BlogNavList';

type BlogPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale: Locales;
  displayBlogNavTitles?: boolean;
};

export const BlogPageLayout: FC<BlogPageLayoutProps> = ({
  children,
  locale,
  activeSections = [],
  displayBlogNavTitles = true,
}) => {
  const blogData = getBlogData(locale);

  return (
    <div className="max-w-screen flex flex-1 border-b-[0.5px] max-md:flex-col">
      <BackgroundLayout>
        <aside className="flex-none">
          <BlogNavList
            blogData={blogData}
            activeSections={['blog', ...activeSections]}
          />
        </aside>
        <div className="flex flex-1 flex-row">
          <article
            className="relative m-auto mb-24 h-full w-auto max-w-3xl flex-1 grow"
            id="content"
          >
            <BlogBreadCrumb
              className="ml-10 mt-12"
              activeSections={activeSections}
              blogData={blogData}
              locale={locale}
            />
            {children}
          </article>
          <aside className="flex-none max-lg:hidden">
            {displayBlogNavTitles && <NavTitles />}
          </aside>
        </div>
      </BackgroundLayout>
    </div>
  );
};
