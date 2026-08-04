import { getFrequentQuestionMetadataBySlug } from '@intlayer/docs';
import { getLocalizedUrl, getMultilingualUrls, Locales } from 'intlayer';
import type { Metadata } from 'next';
import type { LocalPromiseParams, NextLayoutIntlayer } from 'next-intlayer';

export type FrequentQuestionProps = {
  slugs: string[];
};

export type FrequentQuestionPageProps =
  LocalPromiseParams<FrequentQuestionProps>;

/**
 * Builds the static params for the frequent questions catch-all route.
 *
 * The metadata slugs include the `frequent-questions` section prefix (e.g.
 * `['frequent-questions', 'build-dictionaries']`), while the route segment only
 * holds the remaining slugs, so the prefix is stripped. Entries resolving to an
 * empty slug list are dropped since a required catch-all segment cannot match
 * them.
 */
export const generateStaticParams = async (): Promise<
  FrequentQuestionProps[]
> => {
  const frequentQuestionsMetadata = await getFrequentQuestionMetadataBySlug([]);

  return frequentQuestionsMetadata
    .map((meta) => ({ slugs: meta.slugs.slice(1) }))
    .filter(({ slugs }) => slugs.length > 0);
};

export const generateMetadata = async ({
  params,
}: FrequentQuestionPageProps): Promise<Metadata> => {
  const { locale, slugs } = await params;

  const blogsData = await getFrequentQuestionMetadataBySlug(
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

  return {
    title: `${questionData.title} | Intlayer`,
    description: questionData.description,
    keywords: questionData.keywords,
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
      title: `${questionData.title} | Intlayer`,
      description: questionData.description,
    },
  };
};

const FrequentQuestionLayout: NextLayoutIntlayer = ({ children }) => {
  return children;
};

export default FrequentQuestionLayout;
