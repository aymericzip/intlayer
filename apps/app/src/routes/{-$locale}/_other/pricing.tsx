import { getStripeAPI } from '@intlayer/api';
import type { GetPricingResult } from '@intlayer/backend';
import { App_Pricing, Website_Home } from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getIntlayer, getLocalizedUrl } from 'intlayer';
import { Suspense } from 'react';
import { BreadcrumbsHeader } from '#/structuredData/BreadcrumbsHeader';
import { ProductHeader } from '#/structuredData/ProductHeader';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { PricingPage as PricingPageContent } from '#components/PricingPage';
import { PricingSkeleton } from '#components/PricingPage/PricingSkeleton';

const priceIds = [
  process.env.VITE_STRIPE_PREMIUM_YEARLY_PRICE_ID,
  process.env.VITE_STRIPE_PREMIUM_MONTHLY_PRICE_ID,
  process.env.VITE_STRIPE_ENTERPRISE_YEARLY_PRICE_ID,
  process.env.VITE_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID,
].filter(Boolean) as string[];

const getPricingData = createServerFn().handler(async () => {
  if (
    !process.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    process.env.VITE_STRIPE_PUBLISHABLE_KEY.length === 0
  ) {
    return null;
  }

  const pricingDataResponse = await getStripeAPI().getPricing({ priceIds });
  return pricingDataResponse.data ?? null;
});

export const Route = createFileRoute('/{-$locale}/_other/pricing')({
  loader: async () => {
    const pricingData = await getPricingData();
    return { pricingData };
  },
  component: PricingPage,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('pricing-page', locale);

    return {
      title: content.metadata.title,
      meta: [
        {
          name: 'description',
          content: content.metadata.description,
        },
      ],
    };
  },
});

function PricingPage() {
  const { pricingData } = Route.useLoaderData();
  const { locale } = Route.useParams();

  if (!pricingData) return null;

  return (
    <BackgroundLayout>
      <BreadcrumbsHeader
        breadcrumbs={[
          {
            name: 'Intlayer',
            url: getLocalizedUrl(Website_Home, locale),
          },
          {
            name: 'Pricing',
            url: getLocalizedUrl(App_Pricing, locale),
          },
        ]}
      />
      <ProductHeader />
      <Suspense fallback={<PricingSkeleton />}>
        <PricingPageContent
          pricings={pricingData as GetPricingResult['data']}
        />
      </Suspense>
    </BackgroundLayout>
  );
}
