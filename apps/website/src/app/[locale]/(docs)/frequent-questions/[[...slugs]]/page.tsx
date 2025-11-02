import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import {
  type FrequentQuestionKey,
  getFrequentQuestion,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { urlRenamer } from '@utils/markdown';
import { redirect } from 'next/navigation';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider } from 'next-intlayer/server';
import { PagesRoutes } from '@/Routes';
import type { FrequentQuestionProps } from './layout';

const FrequentQuestionPage = async ({
  params,
}: LocalPromiseParams<FrequentQuestionProps>) => {
  const { locale, slugs } = await params;
  const frequentQuestionsData = await getFrequentQuestionMetadataBySlug(
    slugs,
    locale
  );
  console.log({ frequentQuestionsData });

  const filteredBlogsData = frequentQuestionsData.filter(
    (blog) => blog.slugs.length === slugs.length + 1
  );

  if (!filteredBlogsData || filteredBlogsData.length === 0) {
    return redirect(PagesRoutes.Doc);
  }

  const frequentQuestionData = filteredBlogsData[0];

  const file = await getFrequentQuestion(
    frequentQuestionData?.docKey as FrequentQuestionKey,
    locale
  );

  const blogContent = urlRenamer(file, locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <div className="mx-auto max-w-2xl">
        <DocumentationRender>{blogContent}</DocumentationRender>
      </div>
    </IntlayerServerProvider>
  );
};

export default FrequentQuestionPage;
