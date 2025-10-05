import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';

export { generateMetadata } from './metadata';

const DocLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <DocPageLayout locale={locale} displayAsideNavigation={false}>
      {children}
    </DocPageLayout>
  );
};

export default DocLayout;
