/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { internationalization } from '@intlayer/config/built';
import {
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { buildWebsiteJsonLd } from '@intlayer/design-system/structured-data';
import { useIntlayer } from 'next-intlayer/server';

export const WebsiteHeader = () => {
  const { keywords } = useIntlayer('website-structured-data');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildWebsiteJsonLd({
            url: Website_Home,
            searchUrl: Website_Doc_Search,
            locales: internationalization.locales as string[],
            keywords: keywords.map((keyword) => keyword.value),
            rssUrl: `${Website_Home}/feed.xml`,
          })
        ),
      }}
    />
  );
};
