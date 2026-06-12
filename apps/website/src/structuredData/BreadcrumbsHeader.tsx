/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */
import { Website_Domain } from '@intlayer/design-system/routes';
import {
  type BreadcrumbItem,
  buildBreadcrumbsJsonLd,
} from '@intlayer/design-system/structured-data';
import type { FC } from 'react';

export type { BreadcrumbItem };

type BreadcrumbsHeaderProps = {
  breadcrumbs: BreadcrumbItem[];
};

export const BreadcrumbsHeader: FC<BreadcrumbsHeaderProps> = ({
  breadcrumbs,
}) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(
        buildBreadcrumbsJsonLd({ breadcrumbs, domain: Website_Domain })
      ),
    }}
  />
);
