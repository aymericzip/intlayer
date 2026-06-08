import { Container } from '@intlayer/design-system/container';
import {
  External_Github,
  Website_Doc_Search,
  Website_FrequentQuestions,
  Website_Home,
} from '@intlayer/design-system/routes';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { loadFaqIndex } from '~/serverFunctions/faq';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/_docs/frequent-questions/')({
  loader: async ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const frequentQuestions = await loadFaqIndex({ data: { locale } });
    return { locale, frequentQuestions };
  },
  head: ({ params, loaderData }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_FrequentQuestions;
    const { title, description, keywords } = getIntlayer(
      'frequent-questions-page',
      locale
    );

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);

    const faqs = loaderData
      ? Object.values(
          (loaderData as any).frequentQuestions as Record<
            string,
            { title: string; description: string }
          >
        ).map((q) => ({ question: q.title, answer: q.description }))
      : [];

    return {
      title: String(title),
      meta: [
        { name: 'description', content: String(description) },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: Website_Home,
            name: 'Intlayer',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${Website_Doc_Search}?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
            inLanguage: locales,
            keywords: websiteContent.keywords,
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Intlayer',
            url: Website_Home,
            logo: {
              '@type': 'ImageObject',
              url: `${Website_Home}/assets/logo.png`,
            },
            foundingDate: '2024',
            slogan: orgContent.slogan,
            knowsAbout: orgContent.knowsAbout,
            sameAs: [External_Github, 'https://twitter.com/intlayer'],
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'contact@intlayer.org',
              contactType: 'customer support',
              url: Website_Home,
              availableLanguage: locales,
            },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        },
      ],
    };
  },
  component: FrequentQuestionsPage,
});

function FrequentQuestionsPageTitle() {
  const { h1 } = useIntlayer('frequent-questions-page');
  return <h1 className="font-bold text-2xl">{h1}</h1>;
}

function FrequentQuestionsPage() {
  const { frequentQuestions } = Route.useLoaderData();
  const frequentQuestionsList = Object.values(frequentQuestions);

  return (
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
  );
}
