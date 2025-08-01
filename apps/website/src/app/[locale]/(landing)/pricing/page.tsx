import { PricingPage as PricingPageContent } from '@components/PricingPage';
import { getStripeAPI } from '@intlayer/api';
import configuration from '@intlayer/config/built';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';

export { generateMetadata };

const priceIds = [
  process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
  process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
  process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
  process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
];

const PricingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  // Cache the data at build time

  const pricingData = await getStripeAPI().getPricing({
    priceIds,
  });

  if (!pricingData.data) {
    console.error('Failed to fetch pricing data', {
      cause: {
        priceIds,
        backendURL: configuration.editor?.backendURL,
      },
    });
  }

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <SoftwareApplicationHeader />
      <ProductHeader />

      <PricingPageContent pricings={pricingData?.data} />
    </IntlayerServerProvider>
  );
};
export default PricingPage;
