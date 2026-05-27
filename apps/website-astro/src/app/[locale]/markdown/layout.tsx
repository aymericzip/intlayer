import { PageLayout } from '@layouts/PageLayout';
import { Suspense } from 'react';

export { generateMetadata } from './metadata';

const MarkdownPreviewLayout = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <Suspense>
      <PageLayout locale={locale}>{children}</PageLayout>
    </Suspense>
  );
};

export default MarkdownPreviewLayout;
