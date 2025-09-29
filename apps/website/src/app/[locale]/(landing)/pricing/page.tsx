import { PricingPage as PricingPageContent } from '@components/PricingPage';
import { GetPricingResult, getStripeAPI } from '@intlayer/api';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { type NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { notFound } from 'next/navigation';
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

  let pricingData: GetPricingResult['data'] | null = null;
  try {
    const pricingDataResponse = await getStripeAPI().getPricing({
      priceIds,
    });
    if (pricingDataResponse.success) {
      pricingData = pricingDataResponse.data;
    }
  } catch (error) {
    if (
      // Throw an error if the pricing data is not fetched and the stripe publishable key is set
      typeof process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === 'string' &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.length > 0 &&
      !pricingData
    ) {
      throw new Error('Failed to fetch pricing data');
    }
  }

  if (!pricingData) {
    return notFound();
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
