import { BackgroundLayout } from '@components/BackgroundLayout';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { type Next14LayoutIntlayer } from 'next-intlayer';
export { generateMetadata } from './metadata';

export type DocProps = {
  doc: string[];
};

const DocLayout: Next14LayoutIntlayer<DocProps> = ({
  children,
  params: { locale },
}) => (
  <DocPageLayout locale={locale} displayDocNavTitles={false}>
    <BackgroundLayout>{children}</BackgroundLayout>
  </DocPageLayout>
);

export default DocLayout;
