import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { Website_Doc_Path } from '@intlayer/design-system/routes';
import {
  type FrequentQuestionKey,
  getFrequentQuestion,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { CreativeWorkHeader } from '@structuredData/CreativeWorkHeader';
import { urlRenamer } from '@utils/markdown';
import { redirect } from 'next/navigation';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import type { FrequentQuestionProps } from './layout';

const FrequentQuestionPage = async ({
  params,
}: LocalPromiseParams<FrequentQuestionProps>) => {
  const { locale, slugs } = await params;
  const frequentQuestionsData = await getFrequentQuestionMetadataBySlug(
    slugs,
    locale
  );

  const filteredBlogsData = frequentQuestionsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return redirect(Website_Doc_Path);
  }

  const frequentQuestionData = filteredBlogsData[0];

  const file = await getFrequentQuestion(
    frequentQuestionData?.docKey as FrequentQuestionKey,
    locale
  );

  const blogContent = urlRenamer(file, locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <CreativeWorkHeader
        type="TechArticle"
        creativeWorkName={frequentQuestionData.title}
        creativeWorkDescription={frequentQuestionData.description}
        creativeWorkContent={blogContent}
        keywords={frequentQuestionData.keywords.join(', ')}
        datePublished={new Date(frequentQuestionData.createdAt)}
        dateModified={new Date(frequentQuestionData.updatedAt)}
        url={frequentQuestionData.url}
        authorName={frequentQuestionData.author?.name}
        authorUrl={
          frequentQuestionData.author?.github
            ? `https://github.com/${frequentQuestionData.author.github}`
            : undefined
        }
        history={frequentQuestionData.history}
      />
      <div className="mx-auto max-w-2xl">
        <DocumentationRender>{blogContent}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default FrequentQuestionPage;
