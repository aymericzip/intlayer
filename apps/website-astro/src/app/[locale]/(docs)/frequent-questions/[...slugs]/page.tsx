import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { Website_Doc_Path } from '@intlayer/design-system/routes';
import {
  type FrequentQuestionKey,
  getFrequentQuestion,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { urlRenamer } from '@utils/markdown';
import { redirect } from '@utils/navigation';
import type { FrequentQuestionProps } from './layout';

const FrequentQuestionPage = async ({
  params,
}: {
  params: Promise<FrequentQuestionProps & { locale: string }>;
}) => {
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
    <div className="mx-auto max-w-2xl">
      <DocumentationRender>{blogContent}</DocumentationRender>
    </div>
  );
};

export default FrequentQuestionPage;
