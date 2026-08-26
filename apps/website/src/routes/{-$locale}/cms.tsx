import {
  App_Dashboard,
  External_Github,
  Website_CMS,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  buildOrganizationJsonLd,
  buildProductJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { CMSLandingPage } from '~/components/CMSLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import { formatStructuredDataOffers, getPricing } from '~/utils/stripe';
import packageJson from '../../../package_mock.json' with { type: 'json' };

export const Route = createFileRoute('/{-$locale}/cms')({
  loader: async () => {
    const pricings = await getPricing();
    return { pricings };
  },
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = Website_CMS;
    const { title, description, keywords } = getIntlayer(
      'cms-metadata',
      locale
    );

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);
    const softwareContent = getIntlayer(
      'software-application-structured-data',
      locale
    );
    const productContent = getIntlayer(
      'product-header-structured-data',
      locale
    );

    const offers = formatStructuredDataOffers(loaderData?.pricings ?? null);

    return {
      title: title,
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
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildWebsiteJsonLd({
              url: Website_Home,
              searchUrl: Website_Doc_Search,
              locales: locales as string[],
              keywords: websiteContent.keywords as string[],
              rssUrl: `${Website_Home}/feed.xml`,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildOrganizationJsonLd({
              url: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              slogan: String(orgContent.slogan),
              knowsAbout: orgContent.knowsAbout as string[],
              sameAs: [External_Github, 'https://twitter.com/intlayer'],
              availableLanguages: locales as string[],
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildSoftwareApplicationJsonLd({
              name: 'Intlayer',
              url: Website_Home,
              description: String(softwareContent.description),
              softwareVersion: packageJson.version,
              keywords: softwareContent.keywords as string[],
              audienceType: String(softwareContent.audienceType),
              authorUrl: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              githubUrl: External_Github,
              operatingSystem: 'Web, iOS, Android',
              mainEntityUrl: Website_Home,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildProductJsonLd({
              url: App_Dashboard,
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
  component: CMSPage,
});

function CMSPage() {
  return (
    <PageLayout>
      <CMSLandingPage />
    </PageLayout>
  );
}
