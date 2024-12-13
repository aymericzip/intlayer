import { getDocDataByPath, urlRenamer } from '@components/DocPage/docData';
import { Link } from '@components/Link/Link';
import { Container, Loader } from '@intlayer/design-system';
import { getDoc } from '@intlayer/docs';
import { DocHeader } from '@structuredData/DocHeader';
import { Edit } from 'lucide-react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { LocalParams, useIntlayer } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
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

const DocumentationPage = async ({
  params: { locale, doc },
}: LocalParams<DocProps>) => {
  const docData = getDocDataByPath(doc, locale);
  const docContent = urlRenamer(getDoc(docData?.docName ?? '', locale));

  if (!docData) {
    return redirect(PagesRoutes.Doc_GetStarted);
  }

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
    </IntlayerServerProvider>
  );
};
export default DocumentationPage;
