import { DocHeader } from '@components/DocPage/DocHeader/DocHeader';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '@components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getPreviousNextDocMetadata } from '@components/DocPage/docData';
import { Website_Doc_Path } from '@intlayer/design-system/routes';
import {
  type DocKey,
  getDoc,
  getDocMetadata,
  getDocMetadataBySlug,
} from '@intlayer/docs';
import { BreadcrumbsHeader } from '@structuredData/BreadcrumbsHeader';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { SoftwareApplicationHeader } from '@structuredData/SoftwareApplication';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import { urlRenamer } from '@utils/markdown';
import {
  defaultLocale,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
  Locales,
} from 'intlayer';
import { redirect } from 'react-router';
import type { Route } from './+types/doc-page';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.docData) return [];

  const { docData, locale } = data;
  const absoluteUrl = docData.url;

  return [
    { title: `${docData.title} | Intlayer` },
    { name: 'description', content: docData.description },
    { name: 'keywords', content: Array.isArray(docData.keywords) ? docData.keywords.join(', ') : (docData.keywords || '') },
    { property: 'og:url', content: getLocalizedUrl(absoluteUrl, locale!) },

    { property: 'og:title', content: `${docData.title} | Intlayer` },
    { property: 'og:description', content: docData.description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(absoluteUrl, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: absoluteUrl,
    },
    ...Object.entries(getMultilingualUrls(absoluteUrl)).map(([lang, url]) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: lang,
      href: url,
    })),
  ];
};

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  const slugsStr = params['*'] || '';
  let slugs = slugsStr ? slugsStr.split('/') : [];

  const isMd = slugsStr.endsWith('.md');
  if (isMd) {
    // Returning a raw Response from a page-route loader breaks SPA client-side
    // navigation (React Router tries to parse it as JSON loader data and fails,
    // rendering the component with undefined loaderData).
    // Delegate to the dedicated resource route /doc/raw/* instead.
    const cleanSlug = slugsStr.slice(0, -3); // strip trailing ".md"
    throw redirect(getLocalizedUrl(`/doc/raw/${cleanSlug}`, locale), 301);
  }

  const docsData = await getDocMetadataBySlug(['doc', ...slugs], locale, true);

  const exactMatch = docsData.find(
    (doc) => doc.slugs.join('/') === ['doc', ...slugs].join('/')
  );

  if (!exactMatch) {
    if (docsData.length > 0) {
      throw redirect(getLocalizedUrl(docsData[0].url, locale));
    }
    throw redirect(getLocalizedUrl(Website_Doc_Path, locale));
  }

  const docData = exactMatch;

  const { prevDocData, nextDocData } = getPreviousNextDocMetadata(
    docData.docKey as DocKey,
    locale!
  );
  const defaultDocData = await getDocMetadata(docData.docKey as DocKey);

  const file = await getDoc(docData?.docKey as DocKey, locale);
  const docContent = urlRenamer(file, locale!);

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
    docData,
    defaultDocData,
    docContent,
    nextDoc,
    prevDoc,
  };
}

export default function DocumentationPage({
  loaderData,
}: Route.ComponentProps) {
  if (!loaderData || typeof loaderData !== 'object' || !('docData' in loaderData)) {
    if (typeof loaderData === 'string') {
      return (
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', lineHeight: 1.5, padding: '20px' }}>
          {loaderData}
        </pre>
      );
    }
    return null;
  }

  const {
    locale,
    slugs,
    docData,
    defaultDocData,
    docContent,
    nextDoc,
    prevDoc,
  } = loaderData;

  if (!docData || !defaultDocData) return null;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Docs', url: Website_Doc_Path },
    { name: docData.title, url: docData.url },
  ];

  return (
    <DocPageLayout activeSlugs={slugs} locale={locale}>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <SoftwareApplicationHeader />
      <BreadcrumbsHeader breadcrumbs={breadcrumbs} />
      <CreativeWorkHeader
        type="TechArticle"
        creativeWorkName={docData.title}
        creativeWorkDescription={docData.description}
        creativeWorkContent={docContent}
        keywords={Array.isArray(docData.keywords) ? docData.keywords.join(', ') : (docData.keywords || '')}
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

      <DocumentationRender>{docContent}</DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </DocPageLayout>
  );
}
