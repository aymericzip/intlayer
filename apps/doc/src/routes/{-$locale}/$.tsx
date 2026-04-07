import type { DocKey } from '@intlayer/docs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import {
  defaultLocale,
  getLocalizedUrl,
  getMultilingualUrls,
  getPrefix,
  Locales,
} from 'intlayer';
import { DocHeader } from '#/components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '#/components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '#/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '#/components/DocPage/DocumentationRender';
import { getPreviousNextDocMetadata } from '#/components/DocPage/docData';
import { urlRenamer } from '#/utils/markdown';

export const Route = createFileRoute('/{-$locale}/$')({
  loader: async ({ params }) => {
    const { getDoc, getDocMetadata, getDocMetadataBySlug } = await import(
      '@intlayer/docs'
    );
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const splat = (params as { _splat: string })._splat ?? '';
    const slugs = ['doc', ...(splat ? splat.split('/').filter(Boolean) : [])];

    console.log({ slugs });

    const docsData = await getDocMetadataBySlug(slugs, locale as any);
    const filteredDocsData = docsData.filter(
      (doc) => doc.slugs.length === slugs.length + 1
    );

    if (!filteredDocsData || filteredDocsData.length === 0) {
      throw redirect({
        to: '/{-$locale}/get-started' as any,
        params: { locale: getPrefix(locale).prefix } as any,
      });
    }

    const docData = filteredDocsData[0];
    const { prevDocData, nextDocData } = getPreviousNextDocMetadata(
      docData.docKey as DocKey,
      locale
    );
    const defaultDocData = await getDocMetadata(docData.docKey as DocKey);
    const file = await getDoc(docData.docKey as DocKey, locale);
    const docContent = urlRenamer(file, locale);

    const prevDoc: DocPageNavigationProps['prevDoc'] = prevDocData?.docs
      ? {
          title: prevDocData.title,
          url: getLocalizedUrl(prevDocData.docs.relativeUrl, locale as any),
        }
      : undefined;
    const nextDoc: DocPageNavigationProps['nextDoc'] = nextDocData?.docs
      ? {
          title: nextDocData.title,
          url: getLocalizedUrl(nextDocData.docs.relativeUrl, locale as any),
        }
      : undefined;

    return {
      docData,
      defaultDocData,
      docContent,
      slugs,
      locale,
      prevDoc,
      nextDoc,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { docData, locale } = loaderData;
    const relativeUrl = docData.relativeUrl;

    return {
      meta: [
        { title: `${docData.title} | Intlayer` },
        { name: 'description', content: docData.description },
        { name: 'keywords', content: docData.keywords.join(', ') },
        { property: 'og:title', content: `${docData.title} | Intlayer` },
        {
          property: 'og:description',
          content: docData.description,
        },
        { property: 'og:url', content: docData.url },
        { name: 'twitter:title', content: docData.title },
        { name: 'twitter:description', content: docData.description },
      ],
      links: [
        {
          rel: 'canonical',
          href: getLocalizedUrl(relativeUrl, locale as any),
        },
        ...Object.entries(getMultilingualUrls(relativeUrl)).map(
          ([lang, url]) => ({
            rel: 'alternate',
            hrefLang: lang,
            href: url as string,
          })
        ),
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(relativeUrl, Locales.ENGLISH),
        },
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: docData.title,
            description: docData.description,
            dateModified: new Date(docData.updatedAt).toISOString(),
            datePublished: new Date(docData.createdAt).toISOString(),
            url: docData.url,
            keywords: docData.keywords.join(', '),
          }),
        },
      ],
    };
  },
  component: DocPage,
});

function DocPage() {
  const { docData, defaultDocData, docContent, slugs, prevDoc, nextDoc } =
    Route.useLoaderData();

  return (
    <DocPageLayout activeSlugs={slugs}>
      <DocHeader
        {...docData}
        markdownContent={docContent}
        baseUpdatedAt={defaultDocData.updatedAt}
        history={docData.history ?? []}
      />
      <DocumentationRender>{docContent}</DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  );
}
