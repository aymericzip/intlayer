import {
  Breadcrumb,
  type BreadcrumbLink,
  type BreadcrumbProps,
} from '@intlayer/design-system';
import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { getDocSubSection } from './docData';
import type { CategorizedDocMetadata } from './types';

type DocBreadCrumbProps = {
  activeSections: string[];
  docData: Record<string, CategorizedDocMetadata>;
  locale: LocalesValues;
} & Omit<BreadcrumbProps, 'links'>;

export const DocBreadCrumb: FC<DocBreadCrumbProps> = ({
  activeSections,
  docData,
  locale,
  ...props
}) => {
  const breadcrumbsLinks: BreadcrumbLink[] = [
    {
      text: 'Documentation',
      href: getLocalizedUrl(PagesRoutes.Doc, locale),
    },
    ...activeSections
      .filter((el) => el !== 'index')
      .map((_, index) => activeSections.slice(0, index + 1))
      .map((el) => {
        const docSection = getDocSubSection(docData, el);

        if (docSection?.title) {
          const sectionUrl = docSection.default?.url;
          return {
            text: docSection.title,
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
            `${PagesRoutes.Doc_Root}/${el.join('/')}`,
            locale
          ),
        };
      }),
  ];

  return (
    <Breadcrumb
      links={breadcrumbsLinks}
      className="mt-12 ml-10"
      locale={locale}
      color="text"
      {...props}
    />
  );
};
