import { Container } from '@intlayer/design-system/container';
import { Website_FrequentQuestions } from '@intlayer/design-system/routes';
import { getFrequentQuestionMetadataRecord } from '@intlayer/docs';
import { createFileRoute } from '@tanstack/react-router';
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from 'intlayer';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';

export const Route = createFileRoute('/{-$locale}/frequent-questions/')({
  loader: async ({ params }) => {
    const locale = ((params as { locale?: string }).locale ??
      defaultLocale) as string;
    const frequentQuestions = await getFrequentQuestionMetadataRecord(locale);
    return { frequentQuestions: Object.values(frequentQuestions), locale };
  },
  head: ({ params }) => {
    const { locale } = params;
    const path = Website_FrequentQuestions;
    const content = getIntlayer('frequent-questions-page', locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: 'canonical', href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: 'alternate',
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: `${content.title} | Intlayer` },
        { name: 'description', content: content.description },
        {
          name: 'keywords',
          content: content.keywords.join(', '),
        },
        { property: 'og:title', content: `${content.title} | Intlayer` },
        { property: 'og:description', content: content.description },
      ],
    };
  },
  component: FrequentQuestionsPage,
});

function FrequentQuestionsPage() {
  const { frequentQuestions } = Route.useLoaderData();
  const { h1 } = useIntlayer('frequent-questions-page');

  return (
    <div className="m-auto flex max-w-2xl flex-col gap-10 p-10 text-center">
      <h1 className="font-bold text-2xl">{h1}</h1>
      <div className="flex flex-col gap-4 text-left">
        {frequentQuestions.map((frequentQuestion) => (
          <Link
            key={frequentQuestion.docKey}
            href={frequentQuestion.url}
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
  );
}
