/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: No choice */

import { External_Github, Website_Home } from '@intlayer/design-system/routes';
import { buildSoftwareApplicationJsonLd } from '@intlayer/design-system/structured-data';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';
import packageJson from '../../package_mock.json' with { type: 'json' };

export const SoftwareApplicationHeader: FC = () => {
  const { description, keywords, audienceType } = useIntlayer(
    'software-application-structured-data'
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          buildSoftwareApplicationJsonLd({
            name: 'Intlayer',
            url: Website_Home,
            description: description.value,
            softwareVersion: packageJson.version,
            keywords: keywords.map((keyword) => keyword.value),
            audienceType: audienceType.value,
            authorUrl: Website_Home,
            logoUrl: `${Website_Home}/assets/logo.png`,
            githubUrl: External_Github,
            operatingSystem: 'Web, iOS, Android',
            mainEntityUrl: Website_Home,
          })
        ),
      }}
    />
  );
};
