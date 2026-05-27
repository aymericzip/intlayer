import { DocPageLayout } from '@components/DocPage/DocPageLayout';
import { getDocMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
import type { Metadata } from '@/types/next';
export type DocProps = {
  slugs: string[];
};

export type DocPageProps = {
  params: Promise<DocProps & { locale: string }>;
  searchParams?: Promise<Record<string, string>>;
};

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

  return {
    title: `${docData.title} | Intlayer`,
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
      title: `${docData.title} | Intlayer`,
      description: docData.description,
    },
  };
};

const DocLayout = async ({ children, params }) => {
  const { locale, slugs } = await params;

  return (
    <DocPageLayout activeSlugs={slugs} locale={locale}>
      {children}
    </DocPageLayout>
  );
};

export default DocLayout;
