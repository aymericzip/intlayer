/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import { buildOrganizationJsonLd } from '@intlayer/design-system/structured-data';
import { locales } from 'intlayer';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const OrganizationHeader: FC = () => {
  const { slogan, knowsAbout } = useIntlayer('organization-structured-data');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildOrganizationJsonLd({
            url: Website_Home,
            logoUrl: `${Website_Home}/assets/logo.png`,
            slogan: slogan.value,
            knowsAbout: knowsAbout.map((keyword) => keyword.value),
            sameAs: [External_Github, 'https://twitter.com/intlayer'],
            availableLanguages: locales as string[],
          })
        ),
      }}
    />
  );
};
