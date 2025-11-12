import { BackgroundLayout } from '@components/BackgroundLayout';
import { AsideNavigation } from '@components/DocPage/AsideNavigation/AsideNavigation';
import type { LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { BlogBreadCrumb } from './BlogBreadCrumb';
import { BlogNavList } from './BlogNavList';
import { getBlogData } from './blogData';

type BlogPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale: LocalesValues;
  displayAsideNavigation?: boolean;
};

export const BlogPageLayout: FC<BlogPageLayoutProps> = ({
  children,
  locale,
  activeSections = [],
  displayAsideNavigation = true,
}) => {
  const blogData = getBlogData(locale);

  return (
    <div className="flex max-w-screen flex-1 border-b-[0.5px] bg-card max-md:flex-col">
      <aside className="flex-none">
        <BlogNavList blogData={blogData} activeSections={activeSections} />
      </aside>
      <div className="flex flex-1 flex-row">
        <article
          className="relative m-auto mb-3 h-full w-auto max-w-6xl flex-1 grow rounded-xl bg-background px-4 pb-24 max-md:pl-16 md:px-10"
          id="content"
        >
          {/* remove background layout for now */}
          {/* <BackgroundLayout className="max-md:-ml-16 md:-ml-10 z-0" />
          <div className="relative z-1"> */}
          <BlogBreadCrumb
            className="mt-12 ml-10"
            activeSections={activeSections}
            blogData={blogData}
            locale={locale}
          />
          {children}
          {/* </div> */}
        </article>

        <aside className="flex-none max-lg:hidden">
          {displayAsideNavigation && <AsideNavigation />}
        </aside>
      </div>
    </div>
  );
};
