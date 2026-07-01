import type { GetPricingResult } from '@intlayer/backend';
import {
  App_Pricing,
  Website_Domain,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  buildBreadcrumbsJsonLd,
  buildProductJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { Suspense } from 'react';
import { BackgroundLayout } from '#components/BackgroundLayout';
import { PricingPage as PricingPageContent } from '#components/PricingPage';
import { PricingSkeleton } from '#components/PricingPage/PricingSkeleton';
import { redirectIfSelfHosted } from '#utils/selfHosted';
import { formatStructuredDataOffers, getPricingData } from '#utils/stripe';

type PricingSearch = {
  ref?: string;
  promoCode?: string;
};

export const Route = createFileRoute('/{-$locale}/_other/pricing')({
  beforeLoad: ({ params }) => redirectIfSelfHosted(params.locale),
  loader: async () => {
    const pricingData = await getPricingData();
    return { pricingData };
  },
  validateSearch: (search: Record<string, unknown>): PricingSearch => ({
    ref:
      typeof search.ref === 'string'
        ? search.ref.trim().toUpperCase()
        : undefined,
    promoCode:
      typeof search.promoCode === 'string' ? search.promoCode : undefined,
  }),
  component: PricingPage,
  head: ({ params, loaderData }) => {
    const { locale } = params;
    const path = App_Pricing;
    const content = getIntlayer('pricing-page', locale);
    const productContent = getIntlayer(
      'product-header-structured-data',
      locale
    );

    const offers = formatStructuredDataOffers(
      (loaderData?.pricingData as GetPricingResult['data']) ?? null
    );

    return {
      links: [
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),
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
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                {
                  name: 'Intlayer',
                  url: getLocalizedUrl(Website_Home, locale),
                },
                {
                  name: 'Pricing',
                  url: getLocalizedUrl(App_Pricing, locale),
                },
              ],
              domain: Website_Domain,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildProductJsonLd({
              url: App_Pricing,
              name: 'Intlayer CMS',
              description: String(productContent.description),
              imageUrl:
                'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
              offers,
            })
          ),
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
      <Suspense fallback={<PricingSkeleton />}>
        <PricingPageContent
          pricings={pricingData as GetPricingResult['data']}
        />
      </Suspense>
    </BackgroundLayout>
  );
}
