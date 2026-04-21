import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { Suspense } from 'react';

export { generateMetadata } from './metadata';

const MarkdownPreviewLayout: NextLayoutIntlayer = async ({
  children,
  params,
}) => {
  const { locale } = await params;

  return (
    <Suspense>
      <PageLayout locale={locale}>{children}</PageLayout>
    </Suspense>
  );
};

export default MarkdownPreviewLayout;
