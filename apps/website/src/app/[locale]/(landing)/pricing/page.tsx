import { PricingPage as PricingPageContent } from '@components/PricingPage';
import { ProductHeader } from '@structuredData/ProductHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { generateMetadata } from './metadata';
import { getIntlayerAPI } from '@intlayer/api';

export { generateMetadata };

const PricingPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;
  const response = await getIntlayerAPI().stripe.getPricing({
    priceIds: [
      process.env.NEXT_PUBLIC_STRIPE_PREMIUM_YEARLY_PRICE_ID!,
      process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
      process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID!,
      process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID!,
    ],
  });

  return (
    <IntlayerServerProvider locale={locale}>
      <WebsiteHeader />
      <SoftwareApplicationHeader />
      <ProductHeader />

      <PricingPageContent pricings={response.data} />
    </IntlayerServerProvider>
  );
};
export default PricingPage;
