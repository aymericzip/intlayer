import {
  Website_Doc_Path,
  Website_Home,
  Website_Home_Path,
} from '@intlayer/design-system/routes';
import {
  buildAuthorJsonLd,
  buildBreadcrumbsJsonLd,
  buildCreativeWorkJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getIntlayerAsync, getLocalizedUrl } from 'intlayer';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadDocPage, loadNavData } from '~/serverFunctions/docs';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';
import {
  getSiteStructuredData,
  getSiteStructuredDataScripts,
  getSoftwareStructuredData,
} from '~/utils/structuredData';

export const Route = createFileRoute('/{-$locale}/_docs/doc/$')({
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const slugsStr = params['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const [result, navData] = await Promise.all([
      loadDocPage({ data: { locale, slugs } }),
      loadNavData({ data: { locale } }),
    ]);

    const { exactMatch, docsData, content } = result;

    if (!exactMatch) {
      if (docsData.length > 0) {
        throw redirect({
          to: getLocalizedUrl(docsData[0].relativeUrl, locale) as any,
        });
      }
      throw redirect({ to: getLocalizedUrl(Website_Home_Path, locale) as any });
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
  head: async ({ loaderData }) => {
    if (!loaderData?.docData) return {};

    const { docData, locale: localeFromLoader } = loaderData;
    const locale = (localeFromLoader as string) ?? defaultLocale;
    const absoluteUrl = docData.url;

    const [siteStructuredData, softwareStructuredData, creativeWorkContent] =
      await Promise.all([
        getSiteStructuredData(locale),
        getSoftwareStructuredData(locale),
        getIntlayerAsync('creative-work-structured-data', locale),
      ]);

    return {
      meta: [
        { title: `${docData.title} | Intlayer` },
        { name: 'description', content: docData.description },
        {
          name: 'keywords',
          content: Array.isArray(docData.keywords)
            ? docData.keywords.join(', ')
            : docData.keywords || '',
        },
        { property: 'og:url', content: getAbsoluteUrl(absoluteUrl) },
        { property: 'og:title', content: `${docData.title} | Intlayer` },
        { property: 'og:description', content: docData.description },
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
          children: softwareStructuredData.application,
        },
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
      <DocumentationRender codeStyleSheet={codeStyleSheet}>
        {docParsed}
      </DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  );
}
