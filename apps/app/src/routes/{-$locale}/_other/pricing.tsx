import type { GetPricingResult } from '@intlayer/backend';
import {
  App_Dashboard,
  App_Pricing,
  Website_Domain,
  Website_Home,
} from '@intlayer/design-system/routes';
import { useQuery } from '@tanstack/react-query';
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
import staticPricingData from '#data/pricing.json';
import { formatStructuredDataOffers, getPricingData } from '#utils/stripe';

type PricingSearch = {
  ref?: string;
  promoCode?: string;
};

export const Route = createFileRoute('/{-$locale}/_other/pricing')({
  loader: () => ({
    pricingData: staticPricingData as GetPricingResult['data'] | null,
  }),
  validateSearch: (search: Record<string, unknown>): PricingSearch => ({
    ref:
      typeof search.ref === 'string'
        ? search.ref.trim().toUpperCase()
        : undefined,
    promoCode:
      typeof search.promoCode === 'string' ? search.promoCode : undefined,
  }),
  component: PricingPage,
  head: ({ params }) => {
    const { locale } = params;
    const path = App_Pricing;
    const content = getIntlayer('pricing-page', locale);

    const breadcrumbs = [
      {
        name: 'Intlayer',
        url: getLocalizedUrl(Website_Home, locale),
      },
      {
        name: 'Pricing',
        url: getLocalizedUrl(App_Pricing, locale),
      },
    ];

    const breadcrumbsJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http')
          ? item.url
          : `https://${Website_Domain}${item.url}`,
      })),
    };

    const productData = getIntlayer('product-header-structured-data', locale);
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      url: App_Dashboard,
      name: 'Intlayer CMS',
      description: productData.description,
      image:
        'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
      brand: {
        '@type': 'Brand',
        name: 'Intlayer',
      },
      offers: formatStructuredDataOffers(
        staticPricingData as GetPricingResult['data']
      ),
    };

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
          children: JSON.stringify(breadcrumbsJsonLd),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(product),
        },
      ],
    };
  },
});

function PricingPage() {
  const { pricingData: initialData } = Route.useLoaderData();

  const { data: pricingData = initialData } = useQuery({
    queryKey: ['pricing'],
    queryFn: getPricingData,
    initialData: initialData ?? undefined,
    staleTime: 0,
  });

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
