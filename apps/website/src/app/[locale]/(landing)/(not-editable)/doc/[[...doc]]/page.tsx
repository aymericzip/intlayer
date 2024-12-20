import {
  getDocDataByPath,
  getPreviousNextDocData,
  urlRenamer,
} from '@components/DocPage/docData';
import { Link } from '@components/Link/Link';
import { Container, Loader } from '@intlayer/design-system';
import { getDoc } from '@intlayer/docs';
import { DocHeader } from '@structuredData/DocHeader';
import { getLocalizedUrl } from 'intlayer';
import { ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { type LocalParams } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';
import type { DocProps } from './layout';
import { PagesRoutes } from '@/Routes';

const DynamicDocumentationRender = dynamic(
  () =>
    import('@components/DocPage/DocumentationRender').then(
      (mod) => mod.DocumentationRender
    ),
  {
    loading: () => <Loader />,
  }
);

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
    <div className="flex flex-row flex-wrap justify-between gap-10 p-10">
      {prevDoc && (
        <Link
          href={prevDoc?.url}
          label={goToPreviousSection.label}
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
          label={goToNextSection.label}
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
    return redirect(PagesRoutes.Doc_GetStarted);
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
      <DocHeader
        docName={docData.title}
        docDescription={docData.description}
        docContent={docContent}
        keywords={docData.keywords.join(', ')}
        dateModified={docData.updatedAt}
        datePublished={docData.createdAt}
        url={docData.url}
      />
      <DynamicDocumentationRender>{docContent}</DynamicDocumentationRender>
      <Contribution
        githubUrl={docData.githubUrl.replace('/en/', `/${locale}/`)}
      />
      <DocPageNavigation nextDoc={nextDoc} prevDoc={prevDoc} />
    </IntlayerServerProvider>
  );
};
export default DocumentationPage;
