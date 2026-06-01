import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { getImageWithMetadata } from '@components/getImageWithMetadata';
import { getDocMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
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

  const docsData = await getDocMetadataBySlug(
    ['doc', ...(slugs ?? [])],
    locale,
    true
  );

  const filteredDocsData = docsData.filter(
    (doc) => doc.slugs.length === slugs.length + 1
  );

  if (!filteredDocsData || filteredDocsData.length === 0) {
    return {};
  }

  const docData = filteredDocsData[0];

  const absoluteUrl = docData.url;
  const title = `${docData.title} | Intlayer`;

  const ogImageData = getImageWithMetadata(
    `${process.env.NEXT_PUBLIC_URL}/api/og`,
    {
      title,
      description: docData.description,
      locale,
    }
  );

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title,
    description: docData.description,
    keywords: docData.keywords,
    alternates: {
      canonical: getLocalizedUrl(absoluteUrl, locale),
      languages: {
        ...getMultilingualUrls(absoluteUrl),
        'x-default': getLocalizedUrl(absoluteUrl, Locales.ENGLISH),
      },
      types: {
        'text/markdown': `${getLocalizedUrl(absoluteUrl, locale)}.md`,
      },
    },
    openGraph: {
      url: getLocalizedUrl(absoluteUrl, locale),
      title,
      description: docData.description,
      images: ogImageData,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: docData.description,
      images: ogImageData,
    },
  };
};

const DocLayout: NextLayoutIntlayer<DocProps> = async ({
  children,
  params,
}) => {
  const { locale, slugs } = await params;

  return (
    <DocPageLayout activeSlugs={slugs} locale={locale}>
      {children}
    </DocPageLayout>
  );
};

export default DocLayout;
