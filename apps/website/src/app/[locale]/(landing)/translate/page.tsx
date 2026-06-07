import { AiTranslationLandingCore } from '@components/TranslationLandingPage';
import { getOrganizationHeader } from '@intlayer/design-system/structured-data';
import { getTranslateSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getWebsiteHeader } from '@intlayer/design-system/structured-data';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const TranslationPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteHeader({ locale })) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationHeader({ locale })) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getTranslateSoftwareApplicationHeader({ locale })) }}
      />
      <AiTranslationLandingCore />
    </IntlayerServerProvider>
  );
};

export default TranslationPage;
