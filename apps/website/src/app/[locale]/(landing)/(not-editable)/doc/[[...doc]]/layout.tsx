import { BackgroundLayout } from '@components/BackgroundLayout';
import { getDocPaths, getDoc } from '@components/DocPage/docData';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalParams, Next14LayoutIntlayer } from 'next-intlayer';

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
    title: `${docData.title} | Intlayer`,
    description: docData.description,
    keywords: docData.keywords,
    alternates: {
      canonical: docData.url,
      languages: getMultilingualUrls(docData.url),
    },
    openGraph: {
      url: getLocalizedUrl(
        `${process.env.NEXT_PUBLIC_URL}${docData.url}`,
        locale
      ),
      title: `${docData.title} | Intlayer`,
      description: docData.description,
    },
  };
};

const DocLayout: Next14LayoutIntlayer<DocProps> = ({
  children,
  params: { doc, locale },
}) => (
  <DocPageLayout activeSections={doc} locale={locale}>
    <BackgroundLayout>{children}</BackgroundLayout>
  </DocPageLayout>
);

export default DocLayout;
