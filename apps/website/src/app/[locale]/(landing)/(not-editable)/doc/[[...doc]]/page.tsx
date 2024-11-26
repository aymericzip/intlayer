import { getDoc } from '@components/DocPage/docData';
import { Container, Link, Loader } from '@intlayer/design-system';
import { Edit } from 'lucide-react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
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

const DocumentationPage: NextPageIntlayer<DocProps> = ({
  params: { locale, doc },
}) => {
  const docData = getDoc(doc, locale);
  const { contribution } = useIntlayer('doc-page', locale);

  if (!docData) {
    return redirect(PagesRoutes.Doc_GetStarted);
  }

  return (
    <IntlayerServerProvider locale={locale}>
      <DynamicDocumentationRender docName={docData.docName} />
      <Container
        roundedSize="md"
        transparency="full"
        border={true}
        padding="lg"
        borderColor="neutral"
        className="text-neutral dark:text-neutral mx-10 flex flex-row gap-6 text-xs"
      >
        <Edit className="ml-3 mt-1 size-5" size={24} />
        <div className="flex flex-1 flex-col gap-2">
          <p>{contribution.text}</p>
          <Link
            href={docData.githubUrl}
            label={contribution.buttonLabel.value}
            target="_blank"
            rel="noreferrer"
            color="text"
          >
            {contribution.button}
          </Link>
        </div>
      </Container>
    </IntlayerServerProvider>
  );
};
export default DocumentationPage;
