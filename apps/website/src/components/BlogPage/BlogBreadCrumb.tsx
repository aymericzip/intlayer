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

          if (blogSection?.title) {
            return {
              text: blogSection.title,
              href: sectionUrl,
            };
          }

          const lastItem = el[el.length - 1];
          const titleCapitalized =
            lastItem.charAt(0).toUpperCase() + lastItem.slice(1);
          const title = titleCapitalized?.replace(/-/g, ' ');

          return {
            text: title ?? '-',
            href: getLocalizedUrl(
              `${PagesRoutes.Blog_Root}/${el.join('/')}`,
              locale
            ),
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
