import {
  Website_Home,
  Website_I18nextFormatter_Path,
} from '@intlayer/design-system/routes';
import { buildSoftwareFeaturePageJsonLd } from '@intlayer/design-system/structured-data';
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

export const Route = createFileRoute('/{-$locale}/i18next-message-formatter')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [metadata, siteStructuredData, softwareStructuredData] =
      await Promise.all([
        getIntlayerAsync('i18next-message-formatter-metadata', locale),
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
    const path = Website_I18nextFormatter_Path;
    const { metadata, siteStructuredData, softwareStructuredData } = loaderData;
    const { title, description, keywords } = metadata;

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
              name: 'Intlayer i18next Message Formatter & Editor',
              url: `${Website_Home}/i18next-message-formatter`,
              description: String(description),
              keywords: softwareStructuredData.content.keywords,
              audienceType: softwareStructuredData.content.audienceType,
              applicationUrl: Website_Home,
            })
          ),
        },
      ],
    };
  },
  component: I18nextFormatterRoute,
});

function I18nextFormatterRoute() {
  return (
    <PageLayout>
      <MessageFormatterPage dialect="i18next" />
    </PageLayout>
  );
}
