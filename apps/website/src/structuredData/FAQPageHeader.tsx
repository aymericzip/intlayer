/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */
import {
  buildFAQPageJsonLd,
  type FAQItem,
} from '@intlayer/design-system/structured-data';
import type { FC } from 'react';

export type { FAQItem };

export type FAQPageHeaderProps = {
  faqs: FAQItem[];
};

export const FAQPageHeader: FC<FAQPageHeaderProps> = ({ faqs }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(buildFAQPageJsonLd({ faqs })),
    }}
  />
);
