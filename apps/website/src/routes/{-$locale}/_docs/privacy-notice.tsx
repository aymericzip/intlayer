import { Website_PrivacyPolicy } from '@intlayer/design-system/routes';
import { buildCreativeWorkJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadLegalContent } from '~/serverFunctions/legal';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/privacy-notice')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const [legalContent, siteStructuredData, creativeWorkContent] =
      await Promise.all([
        loadLegalContent({
          data: { locale, docKey: './legal/en/privacy_notice.md' },
        }),
        getSiteStructuredData(locale),
        getIntlayerAsync('creative-work-structured-data', locale),
      ]);

    return { ...legalContent, siteStructuredData, creativeWorkContent };
  },
  staleTime: Infinity,
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const {
      title,
      description,
      keywords,
      createdAt,
      updatedAt,
      siteStructuredData,
      creativeWorkContent,
    } = loaderData;
    const { locale = defaultLocale } = params;
    const path = Website_PrivacyPolicy;

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
            buildCreativeWorkJsonLd({
              type: 'WebPage',
              name: title,
              description: description,
              content: '',
              keywords: Array.isArray(keywords)
                ? keywords.join(', ')
                : keywords || '',
              datePublished: createdAt ? new Date(createdAt) : undefined,
              dateModified: updatedAt ? new Date(updatedAt) : undefined,
              url: path,
              audienceType: creativeWorkContent.audienceType,
            })
          ),
        },
      ],
    };
  },
  component: PrivacyNoticePage,
});

function PrivacyNoticePage() {
  const { fileParsed } = Route.useLoaderData();

  return (
    <div className="m-auto max-w-2xl">
      <DocumentationRender>{fileParsed}</DocumentationRender>
    </div>
  );
}
