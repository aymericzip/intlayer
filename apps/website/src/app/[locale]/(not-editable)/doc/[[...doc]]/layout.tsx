import { getDocPaths, getDoc } from '@components/DocPage/docData';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import type { Metadata } from 'next';
import type { LocalParams, NextLayoutIntlayer } from 'next-intlayer';
export type DocProps = {
  doc: string[];
};

export type DocPageProps = LocalParams<DocProps>;

export const generateStaticParams = () =>
  getDocPaths().map((path) => ({
    doc: path,
  }));

export const generateMetadata = ({
  params: { locale, doc },
}: DocPageProps): Metadata => {
  const docData = getDoc(doc, locale);

  if (!docData) {
    throw new Error(`Doc not found ${JSON.stringify(doc)}`);
  }

  return {
    title: `Intlayer | ${docData.title}`,
    description: docData.description,
    keywords: docData.keywords,
  };
};

const DocLayout: NextLayoutIntlayer<DocProps> = ({
  children,
  params: { doc, locale },
}) => (
  <DocPageLayout activeSections={doc} locale={locale}>
    {children}
  </DocPageLayout>
);

export default DocLayout;
