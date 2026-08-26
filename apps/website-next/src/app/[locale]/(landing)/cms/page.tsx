import { CMSLandingPage } from '@components/CMSLandingPage';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
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
      <ProductHeader pricings={pricings} />
      <CMSLandingPage />
    </IntlayerServerProvider>
  );
};

export default Page;
