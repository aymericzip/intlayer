import { LandingPage as LandingPageContent } from '@components/LandingPage';
import { getOrganizationHeader } from '@intlayer/design-system/structured-data';
import { getProductHeader } from '@intlayer/design-system/structured-data';
import { getSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getWebsiteHeader } from '@intlayer/design-system/structured-data';
import { getPricing } from '@utils/stripe';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';

const pricings = await getPricing();

const LandingPage: NextPageIntlayer = async ({ params }) => {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSoftwareApplicationHeader({ locale })) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProductHeader({ locale, pricings })) }}
      />
      <LandingPageContent />
    </IntlayerServerProvider>
  );
};

export default LandingPage;
