import { Website_Doc_Path, Website_Home } from '@intlayer/design-system/routes';
import {
  buildAuthorJsonLd,
  buildBreadcrumbsJsonLd,
  buildCreativeWorkJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute, notFound, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadDocPage, loadNavData } from '~/serverFunctions/docs';
import { getCanonicalSlugs } from '~/utils/canonicalSlugs';
import {
  getAbsoluteUrl,
  getHreflangLinks,
  getOgImageUrl,
  toAbsoluteUrl,
} from '~/utils/seo';
import {
  getCreativeWorkStructuredData,
  getSiteStructuredData,
  getSiteStructuredDataScripts,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/doc/$')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const slugsStr = (params as any)['*'] || '';
    const slugs = getCanonicalSlugs('doc', slugsStr, locale);

    const [result, navData, siteStructuredData, creativeWorkContent] =
      await Promise.all([
        loadDocPage({ data: { locale, slugs } }),
        loadNavData({ data: { locale } }),
        getSiteStructuredData({ data: locale }),
        getCreativeWorkStructuredData({ data: locale }),
      ]);

    const { exactMatch, docsData, content } = result;

    if (!exactMatch) {
      // Same page under another casing or segment order: send search engines
      // to the canonical URL. Anything else is a real 404, not a soft one.
      if (docsData.length > 0) {
        throw redirect({
          to: getLocalizedUrl(docsData[0].relativeUrl, locale) as any,
          statusCode: 301,
        });
      }
      throw notFound();
    }

    const {
      defaultDocData,
      docParsed,
      codeStyleSheet,
      prevDocData,
      nextDocData,
    } = content!;

    const nextDoc: DocPageNavigationProps['nextDoc'] = nextDocData?.docs
      ? {
          title: nextDocData.title,
          url: getLocalizedUrl(nextDocData.docs.relativeUrl, locale),
        }
      : undefined;
    const prevDoc: DocPageNavigationProps['prevDoc'] = prevDocData?.docs
      ? {
          title: prevDocData.title,
          url: getLocalizedUrl(prevDocData.docs.relativeUrl, locale),
        }
      : undefined;

    return {
      siteStructuredData,
      creativeWorkContent,
      locale,
      slugs,
      docData: exactMatch,
      defaultDocData,
      docParsed,
      codeStyleSheet,
      nextDoc,
      prevDoc,
      navData,
    };
  },
  staleTime: Infinity,
  head: ({ loaderData }) => {
    if (!loaderData?.docData) return {};

    const {
      docData,
      locale: localeFromLoader,
      siteStructuredData,
      creativeWorkContent,
    } = loaderData;
    const locale = (localeFromLoader as string) ?? defaultLocale;
    const absoluteUrl = docData.url;
    const pageTitle = `${docData.title} | Intlayer`;
    const ogImage = getOgImageUrl({ title: pageTitle, locale });

    return {
      meta: [
        { title: pageTitle },
        { name: 'description', content: docData.description },
        {
          name: 'keywords',
          content: Array.isArray(docData.keywords)
            ? docData.keywords.join(', ')
            : docData.keywords || '',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: getAbsoluteUrl(absoluteUrl, locale) },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: docData.description },
        { property: 'og:logo', content: toAbsoluteUrl('/logo.png') },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:secure_url', content: ogImage },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: pageTitle },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: docData.description },
        { name: 'twitter:image', content: ogImage },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(absoluteUrl, locale) },
        {
          rel: 'alternate',
          type: 'text/markdown',
          href: `${getAbsoluteUrl(absoluteUrl)}.md`,
        },
        ...getHreflangLinks(absoluteUrl),
      ],
      scripts: [
        ...getSiteStructuredDataScripts(siteStructuredData),
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildBreadcrumbsJsonLd({
              breadcrumbs: [
                { name: 'Home', url: Website_Home },
                { name: 'Docs', url: Website_Doc_Path },
                { name: docData.title, url: docData.url },
              ],
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildCreativeWorkJsonLd({
              type: 'TechArticle',
              name: docData.title,
              description: docData.description,
              keywords: Array.isArray(docData.keywords)
                ? docData.keywords.join(', ')
                : docData.keywords || '',
              datePublished: docData.createdAt
                ? new Date(docData.createdAt as string)
                : undefined,
              dateModified: docData.updatedAt
                ? new Date(docData.updatedAt as string)
                : undefined,
              url: docData.url,
              author: buildAuthorJsonLd(docData.author),
              version: (docData.history as any)?.[0]?.version,
              audienceType: String(creativeWorkContent.audienceType),
            })
          ),
        },
      ],
    };
  },
  component: DocumentationPage,
});

function DocumentationPage() {
  const loaderData = Route.useLoaderData();

  if (
    !loaderData ||
    typeof loaderData !== 'object' ||
    !('docData' in loaderData)
  ) {
    return null;
  }

  const {
    locale,
    slugs,
    docData,
    defaultDocData,
    docParsed,
    codeStyleSheet,
    nextDoc,
    prevDoc,
    navData,
  } = loaderData;

  if (!docData || !defaultDocData) return null;

  return (
    <DocPageLayout docData={navData} activeSlugs={slugs} locale={locale}>
      <DocHeader
        {...docData}
        baseUpdatedAt={defaultDocData.updatedAt}
        history={docData.history ?? []}
      />
      <DocumentationRender
        key={Array.isArray(slugs) ? slugs.join('/') : (slugs ?? docData.url)}
        codeStyleSheet={codeStyleSheet}
      >
        {docParsed}
      </DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  );
}
