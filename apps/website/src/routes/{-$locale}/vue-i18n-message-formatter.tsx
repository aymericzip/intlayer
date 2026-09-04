import {
  External_Github,
  Website_Home,
  Website_VueI18nFormatter_Path,
} from '@intlayer/design-system/routes';
import { buildSoftwareApplicationJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { MessageFormatterPage } from '~/components/MessageFormatterPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';
import packageJson from '../../../package_mock.json' with { type: 'json' };

export const Route = createFileRoute('/{-$locale}/vue-i18n-message-formatter')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [metadata, siteStructuredData, softwareStructuredData] =
      await Promise.all([
        getIntlayerAsync('vue-i18n-message-formatter-metadata', locale),
        getSiteStructuredData({ data: locale }),
        getSoftwareStructuredData({ data: locale }),
      ]);

    return {
      metadata,
      siteStructuredData,
      softwareStructuredData,
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_VueI18nFormatter_Path;
    const { metadata, siteStructuredData, softwareStructuredData } = loaderData;
    const { title, description, keywords } = metadata;

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
          children: JSON.stringify(
            buildSoftwareApplicationJsonLd({
              name: 'Intlayer Vue I18n Message Formatter & Editor',
              url: `${Website_Home}/vue-i18n-message-formatter`,
              description: String(description),
              softwareVersion: packageJson.version,
              keywords: softwareStructuredData.content.keywords,
              audienceType: softwareStructuredData.content.audienceType,
              authorUrl: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              githubUrl: External_Github,
              operatingSystem: 'Web',
              mainEntityUrl: `${Website_Home}/vue-i18n-message-formatter`,
              offersPrice: '0.00',
            })
          ),
        },
      ],
    };
  },
  component: VueI18nFormatterRoute,
});

function VueI18nFormatterRoute() {
  return (
    <PageLayout>
      <MessageFormatterPage dialect="vue-i18n" />
    </PageLayout>
  );
}
