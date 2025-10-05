import {
  Breadcrumb,
  type BreadcrumbLink,
  type BreadcrumbProps,
} from '@intlayer/design-system';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import { type FC, useMemo } from 'react';
import { PagesRoutes } from '@/Routes';
import { getBlogSubSection } from './blogData';
import type { Section } from './types';

type BlogBreadCrumbProps = {
  activeSections: string[];
  blogData: Section;
  locale: LocalesValues;
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
      className="mt-12 ml-10"
      locale={locale}
      {...props}
    />
  );
};
