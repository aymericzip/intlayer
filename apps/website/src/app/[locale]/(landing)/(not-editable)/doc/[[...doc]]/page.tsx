import {
  getDocDataByPath,
  getPreviousNextDocData,
} from '@components/DocPage/docData';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { Link } from '@components/Link/Link';
import { Container } from '@intlayer/design-system';
import { getDoc } from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { getLocalizedUrl } from 'intlayer';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { redirect } from 'next/navigation';
import { type LocalParams } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';
import type { DocProps } from './layout';
import { PagesRoutes } from '@/Routes';

const Contribution: FC<{ githubUrl: string }> = ({ githubUrl }) => {
  const { contribution } = useIntlayer('doc-page');

  return (
    <Container
      roundedSize="md"
      transparency="full"
      border={true}
      padding="lg"
      borderColor="neutral"
      className="text-neutral dark:text-neutral-dark mx-10 flex flex-row gap-6 text-xs"
    >
      <Edit className="ml-3 mt-1 size-5" size={24} />
      <div className="flex flex-1 flex-col gap-2">
        <p>{contribution.text}</p>
        <Link
          href={githubUrl}
          label={contribution.buttonLabel.value}
          target="_blank"
          rel="noreferrer"
          color="text"
        >
          {contribution.button}
        </Link>
      </div>
    </Container>
  );
};

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
    <div className="flex flex-row flex-wrap justify-between gap-10 p-10 text-sm">
      {prevDoc && (
        <Link
          href={prevDoc?.url}
          label={goToPreviousSection.label.value}
          color="text"
          className="mr-auto flex flex-row items-center gap-2 text-nowrap"
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
          className="ml-auto flex flex-row items-center gap-2 text-nowrap"
        >
          {nextDoc?.title}
          <ChevronRight className="size-5" />
        </Link>
      )}
    </div>
  );
};

const DocumentationPage = async ({
  params: { locale, doc },
}: LocalParams<DocProps>) => {
  const docData = getDocDataByPath(doc, locale);

  if (!docData) {
    return redirect(PagesRoutes.Doc);
  }

  const { prevDocData, nextDocData } = getPreviousNextDocData(docData, locale);

  const file = getDoc(docData?.docName ?? '', locale);

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
        dateModified={docData.updatedAt}
        datePublished={docData.createdAt}
        url={docData.url}
      />
      <DocumentationRender>{docContent}</DocumentationRender>
      <Contribution
        githubUrl={docData.githubUrl.replace('/en/', `/${locale}/`)}
      />
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </IntlayerServerProvider>
  );
};
export default DocumentationPage;
