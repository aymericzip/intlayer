import { App_Dashboard, Website_TMS } from '@intlayer/design-system/routes';
import { buildProductJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { TMSLandingPage } from '~/components/TMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { formatStructuredDataOffers, getPricing } from '~/utils/stripe';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/tms')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [
      pricings,
      metadata,
      siteStructuredData,
      softwareStructuredData,
      tmsContent,
    ] = await Promise.all([
      getPricing(),
      getIntlayerAsync('tms-metadata', locale),
      getSiteStructuredData(locale),
      getSoftwareStructuredData(locale),
      getIntlayerAsync('tms-product-header-structured-data', locale),
    ]);

    return {
      pricings,
      metadata,
      siteStructuredData,
      softwareStructuredData,
      tmsContent,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_TMS;

    const { metadata, siteStructuredData, softwareStructuredData, tmsContent } =
      loaderData;
    const { title, description, keywords } = metadata;

    const offers = formatStructuredDataOffers(loaderData.pricings ?? null);

    return {
      title,
      meta: [
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
          children: softwareStructuredData.application,
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildProductJsonLd({
              url: App_Dashboard,
              name: 'Intlayer TMS',
              description: String(tmsContent.description),
              imageUrl:
                'https://raw.githubusercontent.com/aymericzip/intlayer/main/docs/assets/CMS.png',
              offers,
            })
          ),
        },
      ],
    };
  },
  component: TMSPage,
});

function TMSPage() {
  return (
    <PageLayout>
      <TMSLandingPage />
    </PageLayout>
  );
}
