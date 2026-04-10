import { getStripeAPI } from '@intlayer/api';
import type { GetPricingResult } from '@intlayer/backend';
import {
  App_Pricing,
  App_Pricing_Path,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
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
    const path = App_Pricing_Path;
    const content = getIntlayer('pricing-page', locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: content.metadata.title },
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
