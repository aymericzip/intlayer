import { PagesRoutes } from '@/Routes';
import {
  Breadcrumb,
  type BreadcrumbLink,
  type BreadcrumbProps,
} from '@intlayer/design-system';
import { type LocalesValues, getLocalizedUrl } from 'intlayer';
import { type FC, useMemo } from 'react';
import { getDocSubSection } from './docData';
import { type CategorizedDocMetadata } from './types';

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
  const breadcrumbsLinks: BreadcrumbLink[] = useMemo(
    () => [
      {
        text: 'Documentation',
        href: getLocalizedUrl(PagesRoutes.Doc, locale),
      },
      ...activeSections
        .filter((el) => el !== 'index')
        .map((_, index) => activeSections.slice(0, index + 1))
        .map((el) => {
          const docSection = getDocSubSection(docData, el);
          const sectionUrl = docSection?.default?.url;

          return {
            text: docSection?.title ?? '',
            href: sectionUrl,
          };
        }),
    ],
    [activeSections, docData, locale]
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
