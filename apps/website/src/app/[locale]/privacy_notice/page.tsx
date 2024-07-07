import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { PageLayout } from '@layouts/PageLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <PageLayout locale={locale} editorEnabled={false}>
    <div className="m-auto max-w-2xl">
      <DocumentationRender docName="privacy_notice" />
    </div>
  </PageLayout>
);
export default Page;
