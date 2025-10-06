import { PricingPage as PricingPageContent } from '@components/PricingPage';
import { type GetPricingResult, getStripeAPI } from '@intlayer/api';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { notFound } from 'next/navigation';
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

const getPricingData = async () => {
  if (
    // Throw an error if the pricing data is not fetched and the stripe publishable key is set
    typeof process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY !== 'string' ||
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.length === 0
  ) {
    console.log(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set - Skipping pricing data fetch'
    );
    return;
  }

  const pricingDataResponse = await getStripeAPI().getPricing({
    priceIds,
  });

  const pricingData = pricingDataResponse.data;

  if (
    // Throw an error if the pricing data is not fetched and the stripe publishable key is set
    !pricingData
  ) {
    throw new Error('Failed to fetch pricing data');
  }

  return pricingDataResponse.data;
};

const PricingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  // Cache the data at build time

  const pricingData: GetPricingResult['data'] | null = await getPricingData();

  if (!pricingData) {
    return notFound();
  }

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <SoftwareApplicationHeader />
      <ProductHeader />

      <PricingPageContent pricings={pricingData} />
    </IntlayerServerProvider>
  );
};
export default PricingPage;
