import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { getDocMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type DocProps = {
  slugs: string[];
};

export type DocPageProps = LocalPromiseParams<DocProps>;

export const generateStaticParams = async () => {
  const docMetadata = await getDocMetadataBySlug([]);

  const slugList: string[][] = docMetadata.map((meta) => meta.slugs);

  return slugList;
};

export const generateMetadata = async ({
  params,
}: DocPageProps): Promise<Metadata> => {
  const { locale, slugs } = await params;

  const docsData = await getDocMetadataBySlug(['doc', ...slugs], locale, true);

  const filteredDocsData = docsData.filter(
    (doc) => doc.slugs.length === slugs.length + 1
  );

  if (!filteredDocsData || filteredDocsData.length === 0) {
    return {};
  }

  const docData = filteredDocsData[0];

  const absoluteUrl = docData.url;
  const relativeUrl = docData.relativeUrl;

  return {
    title: `${docData.title} | Intlayer`,
    description: docData.description,
    keywords: docData.keywords,
    alternates: {
      canonical: getLocalizedUrl(relativeUrl, locale),
      languages: {
        ...getMultilingualUrls(relativeUrl),
        'x-default': relativeUrl,
      },
    },
    openGraph: {
      url: getLocalizedUrl(absoluteUrl, locale),
      title: `${docData.title} | Intlayer`,
      description: docData.description,
    },
  };
};

const DocLayout: NextLayoutIntlayer<DocProps> = async ({
  children,
  params,
}) => {
  const { locale, slugs } = await params;

  return (
    <DocPageLayout activeSections={slugs} locale={locale}>
      {children}
    </DocPageLayout>
  );
};

export default DocLayout;
