import { TMSLandingPage } from '@components/TMSLandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { TMSProductHeader } from '@structuredData/TMSProductHeader';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
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
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <TMSProductHeader pricings={pricings} />
      <TMSLandingPage />
    </IntlayerServerProvider>
  );
};

export default Page;
