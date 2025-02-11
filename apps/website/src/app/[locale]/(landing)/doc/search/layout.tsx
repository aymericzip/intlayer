import { BackgroundLayout } from '@components/BackgroundLayout';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { type NextLayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

export type DocProps = {
  doc: string[];
};

const DocLayout: NextLayoutIntlayer<DocProps> = async ({
  children,
  params,
}) => {
  const { locale } = await params;
  return (
    <DocPageLayout locale={locale} displayDocNavTitles={false}>
      <BackgroundLayout>{children}</BackgroundLayout>
    </DocPageLayout>
  );
};

export default DocLayout;
