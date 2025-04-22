import {
  getDocDataByPath,
  getDocPathsArray,
} from '@components/DocPage/docData';
import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type DocProps = {
  doc: string[];
};

export type DocPageProps = LocalPromiseParams<DocProps>;

export const generateStaticParams = () =>
  getDocPathsArray().map((path) => ({
    doc: path,
  }));

export const generateMetadata = async ({
  params,
}: DocPageProps): Promise<Metadata> => {
  const { locale, doc } = await params;

  const docData = getDocDataByPath(doc, locale);

  if (!docData) {
    throw new Error(`Doc not found ${JSON.stringify(doc)}`);
  }

  return {
    title: `${docData.title} | Intlayer`,
    description: docData.description,
    keywords: docData.keywords,
    alternates: {
      canonical: getLocalizedUrl(docData.url, locale),
      languages: {
        ...getMultilingualUrls(docData.url),
        'x-default': docData.url,
      },
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

const DocLayout: NextLayoutIntlayer<DocProps> = async ({
  children,
  params,
}) => {
  const { locale, doc } = await params;

  return (
    <DocPageLayout activeSections={doc} locale={locale}>
      {children}
    </DocPageLayout>
  );
};

export default DocLayout;
