import { DocHeader } from '@components/DocPage/DocHeader/DocHeader';
import {
  DocPageNavigation,
  type DocPageNavigationProps,
} from '@components/DocPage/DocPageNavigation/DocPageNavigation';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { getPreviousNextDocMetadata } from '@components/DocPage/docData';
import {
  type DocKey,
  getDoc,
  getDocMetadata,
  getDocMetadataBySlug,
} from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { redirect } from 'next/navigation';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';
import type { DocProps } from './layout';

const DocumentationPage = async ({ params }: LocalPromiseParams<DocProps>) => {
  const { locale, slugs } = await params;

  const docsData = await getDocMetadataBySlug(slugs, locale);

  const filteredDocsData = docsData.filter(
    (doc) => doc.slugs.length === slugs.length + 1
  );

  if (!filteredDocsData || filteredDocsData.length === 0) {
    return redirect(PagesRoutes.Doc);
  }

  const docData = filteredDocsData[0];

  const { prevDocData, nextDocData } = getPreviousNextDocMetadata(
    docData.docKey as DocKey,
    locale
  );
  const defaultDocData = await getDocMetadata(docData.docKey as DocKey);

  const file = await getDoc(docData?.docKey as DocKey, locale);

  const docContent = urlRenamer(file, locale);

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

  return (
    <IntlayerServerProvider locale={locale}>
      <CreativeWorkHeader
        creativeWorkName={docData.title}
        creativeWorkDescription={docData.description}
        creativeWorkContent={docContent}
        keywords={docData.keywords.join(', ')}
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
    </IntlayerServerProvider>
  );
};

export default DocumentationPage;
