import {
  App_Dashboard,
  Website_Home,
  Website_Translate,
} from '@intlayer/design-system/routes';
import {
  buildProductJsonLd,
  buildSoftwareFeaturePageJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { AiTranslationLandingCore } from '~/components/TranslationLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { formatStructuredDataOffers, getPricing } from '~/utils/stripe';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/translate')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [
      pricings,
      metadata,
      siteStructuredData,
      softwareStructuredData,
      translateContent,
      translateProductContent,
    ] = await Promise.all([
      getPricing(),
      getIntlayerAsync('translate-metadata', locale),
      getSiteStructuredData({ data: locale }),
      getSoftwareStructuredData({ data: locale }),
      getIntlayerAsync('translate-software-structured-data', locale),
      getIntlayerAsync('translate-product-header-structured-data', locale),
    ]);

    return {
      pricings,
      metadata,
      siteStructuredData,
      softwareStructuredData,
      translateContent,
      translateProductContent,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Translate;

    const {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      translateContent,
      translateProductContent,
    } = loaderData;
    const { title, description, keywords } = metadata;

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
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildSoftwareFeaturePageJsonLd({
              name: 'Intlayer Translate CLI',
              url: `${Website_Home}/translate`,
              description: String(translateContent.description),
              keywords: softwareStructuredData.content.keywords,
              audienceType: softwareStructuredData.content.audienceType,
              applicationUrl: Website_Home,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildProductJsonLd({
              url: App_Dashboard,
              name: 'Intlayer Translate',
              description: String(translateProductContent.description),
              imageUrl:
                'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.webp',
              offers,
            })
          ),
        },
      ],
    };
  },
  component: TranslatePage,
});

function TranslatePage() {
  return (
    <PageLayout>
      <AiTranslationLandingCore />
    </PageLayout>
  );
}
