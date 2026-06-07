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
  getDocMetadataBySlug,
} from '@intlayer/docs';
import { getBreadcrumbsHeader } from '@intlayer/design-system/structured-data';
import { getCreativeWorkHeader } from '@intlayer/design-system/structured-data';
import { getOrganizationHeader } from '@intlayer/design-system/structured-data';
import { getSoftwareApplicationHeader } from '@intlayer/design-system/structured-data';
import { getWebsiteHeader } from '@intlayer/design-system/structured-data';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { redirect } from 'next/navigation';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { DocProps } from './layout';

const DocumentationPage = async ({ params }: LocalPromiseParams<DocProps>) => {
  const { locale, slugs } = await params;

  const docsData = await getDocMetadataBySlug(slugs, locale);

  const filteredDocsData = docsData.filter(
    (doc) => doc.slugs.length === slugs.length + 1
  );

  if (!filteredDocsData || filteredDocsData.length === 0) {
    return redirect(Website_Doc_Path);
  }

  const docData = filteredDocsData[0];

  if (!docData) {
    throw redirect(Website_Doc_Path);
  }

  const { prevDocData, nextDocData } = getPreviousNextDocMetadata(
    docData.docKey as DocKey,
    locale!
  );

  const file = await getDoc(docData?.docKey as DocKey, locale);

  const docContent = urlRenamer(file, locale!);

  const nextDoc: DocPageNavigationProps['nextDoc'] = nextDocData?.docs
    ? {
        title: nextDocData.title!,
        url: getLocalizedUrl(nextDocData.docs.relativeUrl, locale),
      }
    : undefined;
  const prevDoc: DocPageNavigationProps['prevDoc'] = prevDocData?.docs
    ? {
        title: prevDocData.title!,
        url: getLocalizedUrl(prevDocData.docs.relativeUrl, locale),
      }
    : undefined;

  return (
    <IntlayerServerProvider locale={locale}>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSoftwareApplicationHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbsHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getCreativeWorkHeader({ locale })),
        }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe because the data is generated securely and stringified
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getDocHeader({ locale })),
        }}
      />

      <DocumentationRender>{docContent}</DocumentationRender>
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </IntlayerServerProvider>
  );
};

export default DocumentationPage;
