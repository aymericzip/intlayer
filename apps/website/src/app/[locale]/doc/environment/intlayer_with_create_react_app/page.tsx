import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { PageLayout } from '@layouts/PageLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <PageLayout locale={locale} editorEnabled={false}>
    <DocPageLayout activeSections={['environment', 'react_cra']}>
      <DocumentationRender docName="intlayer_with_create_react_app" />
    </DocPageLayout>
  </PageLayout>
);
export default Page;
