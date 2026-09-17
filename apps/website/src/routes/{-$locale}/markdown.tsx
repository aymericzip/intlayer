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
import { MarkdownPreview } from '~/components/MarkdownPreview';
import { PageLayout } from '~/layouts/PageLayout';
import { loadRemoteMarkdown } from '~/serverFunctions/remoteMarkdown';
import { normalizeUrlQueryValue } from '~/utils/remoteMarkdownUrl';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';
import packageJson from '../../../package_mock.json' with { type: 'json' };

type MarkdownSearch = {
  /** Public https URL of a markdown document to render instead of the landing page. */
  url?: string;
};

/**
 * `/markdown` is the product landing page, and `/markdown?url=…` renders the
 * remote markdown document at that URL. Both share this route: the search
 * param decides which one loads.
 */
export const Route = createFileRoute('/{-$locale}/markdown')({
  validateSearch: (search: Record<string, unknown>): MarkdownSearch => {
    const rawUrl = Array.isArray(search.url) ? search.url[0] : search.url;
    const url =
      typeof rawUrl === 'string' ? normalizeUrlQueryValue(rawUrl) : '';

    return url ? { url } : {};
  },
  loaderDeps: ({ search: { url } }) => ({ url }),
  loader: async ({ params, deps: { url } }) => {
    const { locale = defaultLocale } = params;

    if (url) {
      const [{ title }, result] = await Promise.all([
        getIntlayerAsync('markdown-preview', locale),
        loadRemoteMarkdown({ data: { locale, url } }),
      ]);

      return { mode: 'preview' as const, title: String(title), result };
    }

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
      mode: 'landing' as const,
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

    if (loaderData.mode === 'preview') {
      // Arbitrary third-party documents must not be indexed under this origin.
      return {
        meta: [
          { title: loaderData.title },
          { name: 'robots', content: 'noindex, nofollow' },
        ],
      };
    }

    const {
      metadata,
      siteStructuredData,
      softwareStructuredData,
      markdownContent,
    } = loaderData;
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
  const loaderData = Route.useLoaderData();

  return (
    <PageLayout>
      {loaderData.mode === 'preview' ? (
        <MarkdownPreview result={loaderData.result} />
      ) : (
        <MarkdownLandingPage />
      )}
    </PageLayout>
  );
}
