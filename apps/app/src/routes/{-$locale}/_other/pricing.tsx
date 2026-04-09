import { getStripeAPI } from '@intlayer/api';
import type { GetPricingResult } from '@intlayer/backend';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getIntlayer } from 'intlayer';
import { Suspense } from 'react';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { PricingPage as PricingPageContent } from '#components/PricingPage';

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

  if (!pricingData) return null;

  return (
    <BackgroundLayout>
      <Suspense>
        <PricingPageContent
          pricings={pricingData as GetPricingResult['data']}
        />
      </Suspense>
    </BackgroundLayout>
  );
}
