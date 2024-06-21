import { DocPage } from '@components/DocPage';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { PageLayout } from '@layouts/PageLayout';
import type { NextPageIntlayer } from 'next-intlayer';
import { generateMetadata } from './metadata';

export { generateMetadata };

const Page: NextPageIntlayer = ({ params: { locale } }) => (
  <PageLayout locale={locale} editorEnabled={false}>
    <DocPageLayout>
      <DocPage />
    </DocPageLayout>
  </PageLayout>
);
export default Page;
