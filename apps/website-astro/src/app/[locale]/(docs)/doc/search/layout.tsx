import { DocPageLayout } from '@components/DocPage/DocPageLayout';

export { generateMetadata } from './metadata';

const DocLayout = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <DocPageLayout locale={locale} displayAsideNavigation={false}>
      {children}
    </DocPageLayout>
  );
};

export default DocLayout;
