import {
  Website_Doc_Path,
  Website_Home,
  Website_Home_Path,
} from '@intlayer/design-system/routes';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale, getLocalizedUrl } from 'intlayer';
import { DocHeader } from '~/components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '~/components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '~/components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '~/components/DocPage/DocumentationRender';
import { loadDocPage, loadNavData } from '~/serverFunctions/docs';
import { BreadcrumbsHeader } from '~/structuredData/BreadcrumbsHeader';
import { CreativeWorkHeader } from '~/structuredData/CreativeWorkHeader';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '~/structuredData/SoftwareApplication';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/doc/$')({
  loader: async ({ params }) => {
    const locale = (params.locale as string) ?? defaultLocale;
    const slugsStr = (params as any)['*'] || '';
    const slugs = slugsStr ? slugsStr.split('/') : [];

    const [result, navData] = await Promise.all([
      loadDocPage({ data: { locale, slugs } }),
      loadNavData({ data: { locale } }),
    ]);

    const { exactMatch, docsData, content } = result;

    if (!exactMatch) {
      if (docsData.length > 0) {
        throw redirect({ to: docsData[0].relativeUrl as any });
      }
      throw redirect({ to: Website_Home_Path as any });
    }

    const { defaultDocData, docContent, docParsed, prevDocData, nextDocData } =
      content!;

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
      docContent,
      docParsed,
      nextDoc,
      prevDoc,
      navData,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.docData) return {};
    const { docData, locale } = loaderData;
    const absoluteUrl = docData.url;

    return {
      title: `${docData.title} | Intlayer`,
      meta: [
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
        { rel: 'canonical', href: getAbsoluteUrl(absoluteUrl) },
        {
          rel: 'alternate',
          type: 'text/markdown',
          href: `${getAbsoluteUrl(absoluteUrl)}.md`,
        },
        ...getHreflangLinks(absoluteUrl),
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
    docContent,
    docParsed,
    nextDoc,
    prevDoc,
    navData,
  } = loaderData;

  if (!docData || !defaultDocData) return null;

  const breadcrumbs = [
    { name: 'Home', url: Website_Home },
    { name: 'Docs', url: Website_Doc_Path },
    { name: docData.title, url: docData.url },
  ];

  return (
    <DocPageLayout docData={navData} activeSlugs={slugs} locale={locale}>
      <WebsiteHeader />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <BreadcrumbsHeader breadcrumbs={breadcrumbs} />
      <CreativeWorkHeader
        type="TechArticle"
        creativeWorkName={docData.title}
        creativeWorkDescription={docData.description}
        creativeWorkContent={docContent}
        keywords={
          Array.isArray(docData.keywords)
            ? docData.keywords.join(', ')
            : docData.keywords || ''
        }
        dateModified={new Date(docData.updatedAt)}
        datePublished={new Date(docData.createdAt)}
        url={docData.url}
      />
      <DocHeader
        {...docData}
        markdownContent={docContent}
        baseUpdatedAt={defaultDocData.updatedAt}
        history={docData.history ?? []}
      />
      <DocumentationRender>{docParsed}</DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  );
}
