import {
  Breadcrumb,
  type BreadcrumbLink,
  type BreadcrumbProps,
} from '@intlayer/design-system';
import { getLocalizedUrl, Locales } from 'intlayer';
import { type FC, useMemo } from 'react';
import { getBlogSubSection } from './blogData';
import { Section } from './types';
import { PagesRoutes } from '@/Routes';

type BlogBreadCrumbProps = {
  activeSections: string[];
  blogData: Section;
  locale: Locales;
} & Omit<BreadcrumbProps, 'links'>;

export const BlogBreadCrumb: FC<BlogBreadCrumbProps> = ({
  activeSections,
  blogData,
  locale,
  ...props
}) => {
  const breadcrumbsLinks: BreadcrumbLink[] = useMemo(
    () => [
      {
        text: 'Blog',
        href: getLocalizedUrl(PagesRoutes.Blog, locale),
      },
      ...activeSections
        .filter((el) => el !== 'index')
        .map((_, index) => activeSections.slice(0, index + 1))
        .map((el) => {
          const blogSection = getBlogSubSection(blogData, el);
          const sectionUrl = blogSection?.default?.url;

          return {
            text: blogSection?.title ?? '',
            href: sectionUrl,
          };
        }),
    ],
    [activeSections, blogData, locale]
  );

  return (
    <Breadcrumb
      links={breadcrumbsLinks}
      className="ml-10 mt-12"
      locale={locale}
      {...props}
    />
  );
};
