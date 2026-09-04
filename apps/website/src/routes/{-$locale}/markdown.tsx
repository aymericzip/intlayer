import {
  External_Github,
  Website_Home,
  Website_Markdown,
  Website_Markdown_Path,
} from '@intlayer/design-system/routes';
import { buildSoftwareApplicationJsonLd } from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync } from 'intlayer';
import { MarkdownLandingPage } from '~/components/MarkdownLandingPage';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';
import packageJson from '../../../package_mock.json' with { type: 'json' };

export const Route = createFileRoute('/{-$locale}/markdown')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    const [
      metadata,
      siteStructuredData,
      softwareStructuredData,
      markdownContent,
    ] = await Promise.all([
      getIntlayerAsync('markdown-metadata', locale),
      getSiteStructuredData({ data: locale }),
      getSoftwareStructuredData({ data: locale }),
      getIntlayerAsync('markdown-software-structured-data', locale),
    ]);

    return {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      markdownContent,
    };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return {};

    const { locale = defaultLocale } = params;
    const path = Website_Markdown_Path;

    const {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      markdownContent,
    } = loaderData;
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
              name: 'Intlayer Markdown',
              url: Website_Markdown,
              description: String(markdownContent.description),
              softwareVersion: packageJson.version,
              keywords: softwareStructuredData.content.keywords,
              audienceType: softwareStructuredData.content.audienceType,
              authorUrl: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              githubUrl: External_Github,
              operatingSystem: 'Mac, Windows, Linux',
              mainEntityUrl: Website_Markdown,
              offersPrice: '0.00',
            })
          ),
        },
      ],
    };
  },
  component: MarkdownPage,
});

function MarkdownPage() {
  return (
    <PageLayout>
      <MarkdownLandingPage />
    </PageLayout>
  );
}
