import { CMSLandingPage } from '@components/CMSLandingPage';
import {
  getOrganizationHeader,
  getProductHeader,
  getSoftwareApplicationHeader,
  getWebsiteHeader,
} from '@intlayer/design-system/structured-data';
import { getPricing } from '@utils/stripe';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const pricings = await getPricing();

const Page: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSoftwareApplicationHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getProductHeader({ locale, pricings })),
        }}
      />
      <CMSLandingPage />
    </IntlayerServerProvider>
  );
};

export default Page;
