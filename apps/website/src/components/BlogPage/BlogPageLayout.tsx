import { AsideNavigation } from '@components/AsideNavigation/AsideNavigation';
import { BackgroundLayout } from '@components/BackgroundLayout';
import { type Locales } from 'intlayer';
import { type FC, type ReactNode } from 'react';
import { BlogBreadCrumb } from './BlogBreadCrumb';
import { getBlogData } from './blogData';
import { BlogNavList } from './BlogNavList';

type BlogPageLayoutProps = {
  children?: ReactNode;
  activeSections?: string[];
  locale: Locales;
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
    <div className="max-w-screen flex flex-1 border-b-[0.5px] max-md:flex-col">
      <BackgroundLayout>
        <aside className="flex-none">
          <BlogNavList blogData={blogData} activeSections={activeSections} />
        </aside>
        <div className="flex flex-1 flex-row">
          <article
            className="relative m-auto mb-24 h-full w-auto max-w-3xl flex-1 grow max-md:pl-12"
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
            {displayAsideNavigation && <AsideNavigation />}
          </aside>
        </div>
      </BackgroundLayout>
    </div>
  );
};
