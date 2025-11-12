import { getBlogMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type FrequentQuestionProps = {
  slugs: string[];
};

export type FrequentQuestionPageProps =
  LocalPromiseParams<FrequentQuestionProps>;

export const generateStaticParams = async () => {
  const blogMetadata = await getBlogMetadataBySlug([]);

  const slugList: string[][] = blogMetadata.map((meta) => meta.slugs);

  return slugList;
};

export const generateMetadata = async ({
  params,
}: FrequentQuestionPageProps): Promise<Metadata> => {
  const { locale, slugs } = await params;

  const blogsData = await getBlogMetadataBySlug(
    ['frequent-questions', ...(slugs ?? [])],
    locale,
    true
  );

  const filteredBlogsData = blogsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return {};
  }

  const questionData = filteredBlogsData[0];

  const absoluteUrl = questionData.url;
  const relativeUrl = questionData.relativeUrl;

  return {
    title: `${questionData.title} | Intlayer`,
    description: questionData.description,
    keywords: questionData.keywords,
    alternates: {
      canonical: getLocalizedUrl(relativeUrl, Locales.ENGLISH),
      languages: {
        ...getMultilingualUrls(relativeUrl),
        'x-default': getLocalizedUrl(relativeUrl, Locales.ENGLISH),
      },
      types: {
        'text/markdown': `${getLocalizedUrl(relativeUrl, locale)}.md`,
      },
    },
    openGraph: {
      url: getLocalizedUrl(absoluteUrl, locale),
      title: `${questionData.title} | Intlayer`,
      description: questionData.description,
    },
  };
};

const FrequentQuestionLayout: NextLayoutIntlayer = ({ children }) => {
  return children;
};

export default FrequentQuestionLayout;
