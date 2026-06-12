/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import { buildSoftwareApplicationJsonLd } from '@intlayer/design-system/structured-data';
import Script from 'next/script';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import packageJson from '../../package_mock.json' with { type: 'json' };

export const ScannerSoftwareApplicationHeader: FC = () => {
  const { description } = useIntlayer('scanner-software-structured-data');
  const { keywords, audienceType } = useIntlayer(
    'software-application-structured-data'
  );

  return (
    <Script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildSoftwareApplicationJsonLd({
            name: 'Intlayer I18n SEO Scanner',
            url: `${Website_Home}/i18n-seo-scanner`,
            description: description.value,
            softwareVersion: packageJson.version,
            keywords: keywords.map((keyword) => keyword.value),
            audienceType: audienceType.value,
            authorUrl: Website_Home,
            logoUrl: `${Website_Home}/assets/logo.png`,
            githubUrl: External_Github,
            operatingSystem: 'Web',
            mainEntityUrl: `${Website_Home}/i18n-seo-scanner`,
          })
        ),
      }}
    />
  );
};
