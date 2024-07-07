import { Loader } from '@intlayer/design-system';
import { PageLayout } from '@layouts/PageLayout';
import dynamic from 'next/dynamic';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';

export { generateMetadata };

const DynamicDocumentationRender = dynamic(
  () =>
    import('@components/DocPage/DocumentationRender').then(
      (mod) => mod.DocumentationRender
    ),
  {
    loading: () => <Loader />,
  }
);

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <PageLayout locale={locale} editorEnabled={false}>
    <div className="m-auto max-w-2xl">
      <DynamicDocumentationRender docName="terms_of_service" />
    </div>
  </PageLayout>
);
export default Page;
