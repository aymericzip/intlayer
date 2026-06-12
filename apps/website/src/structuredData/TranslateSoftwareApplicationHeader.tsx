/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import { buildSoftwareApplicationJsonLd } from '@intlayer/design-system/structured-data';
import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import packageJson from '../../package.json' with { type: 'json' };

export const TranslateSoftwareApplicationHeader: FC = () => {
  const { description } = useIntlayer('translate-software-structured-data');
  const { keywords, audienceType } = useIntlayer(
    'software-application-structured-data'
  );

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildSoftwareApplicationJsonLd({
            name: 'Intlayer Translate CLI',
            url: `${Website_Home}/translate`,
            description: description.value,
            softwareVersion: packageJson.version,
            keywords: keywords.map((keyword) => keyword.value),
            audienceType: audienceType.value,
            authorUrl: Website_Home,
            logoUrl: `${Website_Home}/assets/logo.png`,
            githubUrl: External_Github,
            operatingSystem: 'Mac, Windows, Linux',
            mainEntityUrl: `${Website_Home}/translate`,
            offersPrice: '0.00',
          })
        ),
      }}
    />
  );
};
