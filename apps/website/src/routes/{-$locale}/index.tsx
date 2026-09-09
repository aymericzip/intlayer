import { Website_Home } from '@intlayer/design-system/routes';
import { buildProductJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { LandingPage as LandingPageContent } from '~/components/LandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import {
  getAbsoluteUrl,
  getHreflangLinks,
  getOgImageUrl,
  toAbsoluteUrl,
} from '~/utils/seo';
import { formatStructuredDataOffers, getPricing } from '~/utils/stripe';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [
      pricings,
      metadata,
      siteStructuredData,
      softwareStructuredData,
      productContent,
    ] = await Promise.all([
      getPricing(),
      getIntlayerAsync('landing-metadata', locale),
      getSiteStructuredData({ data: locale }),
      getSoftwareStructuredData({ data: locale }),
      getIntlayerAsync('product-header-structured-data', locale),
    ]);

    return {
      metadata,
      pricings,
      siteStructuredData,
      softwareStructuredData,
      productContent,
      locale,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = '/';

    const {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      productContent,
    } = loaderData;
    const { title, description, keywords } = metadata;
    const ogImage = getOgImageUrl(title);

    const offers = formatStructuredDataOffers(loaderData.pricings ?? null);

    return {
      meta: [
        { title },
        { name: 'description', content: description },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : keywords || '',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:logo', content: toAbsoluteUrl('/logo.png') },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:secure_url', content: ogImage },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: softwareStructuredData.application,
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildProductJsonLd({
              url: Website_Home,
              name: 'Intlayer CMS',
              description: productContent.description,
              imageUrl:
                'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
              offers,
            })
          ),
        },
      ],
    };
  },
  component: LandingPage,
});

function LandingPage() {
  return (
    <PageLayout mainClassName="max-w-[1300px] mx-auto border-neutral xl:border-x relative">
      <LandingPageContent />
    </PageLayout>
  );
}
