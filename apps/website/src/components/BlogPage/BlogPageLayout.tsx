import { AsideNavigation } from '@components/AsideNavigation/AsideNavigation';
import { BackgroundLayout } from '@components/BackgroundLayout';
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
          className="relative m-auto mb-24 h-full w-auto max-w-6xl flex-1 grow rounded-xl bg-background px-4 max-md:pl-16 md:px-10"
          id="content"
        >
          <BackgroundLayout className="z-0" />
          <BlogBreadCrumb
            className="mt-12 ml-10"
            activeSections={activeSections}
            blogData={blogData}
            locale={locale}
          />
          {children}
        </article>

        <aside className="flex-none max-lg:hidden">
          {displayAsideNavigation && <AsideNavigation />}
        </aside>
      </div>
    </div>
  );
};
