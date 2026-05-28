import { Container } from '@intlayer/design-system/container';
import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import { getFrequentQuestionMetadataRecord } from '@intlayer/docs';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { FAQPageHeader } from '~/structuredData/FAQPageHeader';

import type { Route } from './+types/frequent-questions-index';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer(
    'frequent-questions-page',
    locale!
  );

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    {
      property: 'og:url',
      content: getLocalizedUrl(Website_FrequentQuestions, locale!),
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_FrequentQuestions, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_FrequentQuestions,
    },
    ...Object.entries(getMultilingualUrls(Website_FrequentQuestions)).map(
      ([lang, url]) => ({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: lang,
        href: url,
      })
    ),
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  const frequentQuestions = await getFrequentQuestionMetadataRecord(locale);
  return { locale, frequentQuestions };
}

const FrequentQuestionsPageTitle = () => {
  const { h1 } = useIntlayer('frequent-questions-page');
  return <h1 className="font-bold text-2xl">{h1}</h1>;
};

export default function FrequentQuestionsPage({
  loaderData,
}: Route.ComponentProps) {
  const { frequentQuestions } = loaderData;
  const frequentQuestionsList = Object.values(frequentQuestions);

  const faqs = frequentQuestionsList.map((q) => ({
    question: q.title,
    answer: q.description,
  }));

  return (
    <>
      <FAQPageHeader faqs={faqs} />
      <div className="m-auto flex max-w-2xl flex-col gap-10 p-10 text-center">
        <Suspense>
          <FrequentQuestionsPageTitle />
        </Suspense>
        <div className="flex flex-col gap-4 text-left">
          {frequentQuestionsList.map((frequentQuestion) => (
            <Link
              key={frequentQuestion.docKey}
              to={frequentQuestion.url}
              label={frequentQuestion.title}
              variant="hoverable"
              color="neutral"
            >
              <Container className="flex flex-row items-center justify-between p-3">
                <div className="flex flex-col gap-2">
                  <strong>{frequentQuestion.title}</strong>
                  <p className="text-neutral text-sm">
                    {frequentQuestion.description}
                  </p>
                </div>
                <ArrowRight />
              </Container>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
