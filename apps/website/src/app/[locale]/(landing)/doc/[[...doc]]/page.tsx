import { PagesRoutes } from '@/Routes';
import { ContributionMessage } from '@components/DocPage/ContributionMessage';
import {
  getDocDataByPath,
  getPreviousNextDocData,
} from '@components/DocPage/docData';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { TranslatedContentMessage } from '@components/DocPage/TranslatedContentMessage';
import { Link } from '@components/Link/Link';
import { getDoc } from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { redirect } from 'next/navigation';
import type { FC } from 'react';
import type { DocProps } from './layout';

type DocPageNavigationProps = {
  nextDoc?: {
    title: string;
    url: string;
  };
  prevDoc?: {
    title: string;
    url: string;
  };
};

const DocPageNavigation: FC<DocPageNavigationProps> = ({
  nextDoc,
  prevDoc,
}) => {
  const { goToNextSection, goToPreviousSection } = useIntlayer('doc-page');

  return (
    <div className="flex flex-row flex-wrap justify-between gap-3 text-sm px-10 mt-3">
      {prevDoc && (
        <Link
          href={prevDoc?.url}
          label={goToPreviousSection.label.value}
          color="text"
          className="mr-auto flex flex-row justify-start items-center break-words whitespace-normal gap-2 px-2 py-5 text-nowrap max-w-1/2 rounded-lg border-text border-1 h-auto flex-1"
        >
          <ChevronLeft className="size-5" />
          {prevDoc?.title}
        </Link>
      )}
      {nextDoc && (
        <Link
          href={nextDoc?.url}
          label={goToNextSection.label.value}
          color="text"
          className="ml-auto flex flex-row justify-end items-center break-words whitespace-normal gap-2 px-2 py-5 text-nowrap max-w-1/2 rounded-lg border-text border-1 h-auto flex-1"
        >
          {nextDoc?.title}
          <ChevronRight className="size-5" />
        </Link>
      )}
    </div>
  );
};

const DocumentationPage = async ({ params }: LocalPromiseParams<DocProps>) => {
  const { locale, doc } = await params;
  const docData = getDocDataByPath(doc, locale);

  if (!docData) {
    return redirect(PagesRoutes.Doc);
  }

  const { prevDocData, nextDocData } = getPreviousNextDocData(docData, locale);

  const file = await getDoc(docData?.docName ?? '', locale);

  const docContent = urlRenamer(file);

  const nextDoc: DocPageNavigationProps['nextDoc'] = nextDocData?.docs
    ? {
        title: nextDocData.title,
        url: getLocalizedUrl(nextDocData.docs.url, locale),
      }
    : undefined;
  const prevDoc: DocPageNavigationProps['prevDoc'] = prevDocData?.docs
    ? {
        title: prevDocData.title,
        url: getLocalizedUrl(prevDocData.docs.url, locale),
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
      <TranslatedContentMessage pageUrl={docData.url} />
      <DocumentationRender>{docContent}</DocumentationRender>
      <ContributionMessage
        githubUrl={docData.githubUrl.replace('/en/', `/${locale}/`)}
      />
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </IntlayerServerProvider>
  );
};
export default DocumentationPage;
