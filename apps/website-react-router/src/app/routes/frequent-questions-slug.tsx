import { DocumentationRender } from '@components/DocPage/DocumentationRender';
import { Website_Doc_Path } from '@intlayer/design-system/routes';
import {
  type FrequentQuestionKey,
  getFrequentQuestion,
  getFrequentQuestionMetadataBySlug,
} from '@intlayer/docs';
import { urlRenamer } from '@utils/markdown';
import {
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { redirect } from 'react-router';

import type { Route } from './+types/frequent-questions-slug';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data?.frequentQuestionData) return [];
  const { frequentQuestionData, locale } = data;
  const { title, description, keywords, url } = frequentQuestionData;

  return [
    { title: `${title} | Intlayer` },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    { property: 'og:url', content: getLocalizedUrl(url, locale!) },
    { property: 'og:title', content: `${title} | Intlayer` },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(url, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: url,
    },
    ...Object.entries(getMultilingualUrls(url)).map(([lang, url]) => ({
      tagName: 'link',
      rel: 'alternate',
      hrefLang: lang,
      href: url,
    })),
  ];
};

export async function loader({ request, params }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  const slugsStr = params['*'] || '';
  const slugs = slugsStr ? slugsStr.split('/') : [];

  const frequentQuestionsData = await getFrequentQuestionMetadataBySlug(
    slugs,
    locale
  );

  const exactMatch = frequentQuestionsData.find(
    (faq) => faq.slugs.join('/') === slugs.join('/')
  );

  if (!exactMatch) {
    if (frequentQuestionsData.length > 0) {
      throw redirect(getLocalizedUrl(frequentQuestionsData[0].url, locale));
    }
    throw redirect(getLocalizedUrl(Website_Doc_Path, locale));
  }

  const frequentQuestionData = exactMatch;

  const file = await getFrequentQuestion(
    frequentQuestionData?.docKey as FrequentQuestionKey,
    locale
  );

  const blogContent = urlRenamer(file, locale!);

  return { blogContent, frequentQuestionData, locale };
}

export default function FrequentQuestionPage({
  loaderData,
}: Route.ComponentProps) {
  const { blogContent } = loaderData;

  return (
    <div className="mx-auto max-w-2xl">
      <DocumentationRender>{blogContent}</DocumentationRender>
    </div>
  );
}
