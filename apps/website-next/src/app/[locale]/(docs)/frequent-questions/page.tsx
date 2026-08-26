import { Container } from '@intlayer/design-system/container';
import { getFrequentQuestionMetadataRecord } from '@intlayer/docs';
import { FAQPageHeader } from '@structuredData/FAQPageHeader';
import { ArrowRight } from 'lucide-react';
import type { LocalPromiseParams } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { Suspense } from 'react';
import { Link } from '@/components/Link/Link';

export { generateMetadata } from './metadata';

const FrequentQuestionsPageTitle = () => {
  const { h1 } = useIntlayer('frequent-questions-page');

  return <h1 className="font-bold text-2xl">{h1}</h1>;
};

const FrequentQuestionsPage = async ({ params }: LocalPromiseParams) => {
  const { locale } = await params;
  const frequentQuestions = await getFrequentQuestionMetadataRecord(locale);

  const frequentQuestionsList = Object.values(frequentQuestions);

  const faqs = frequentQuestionsList.map((q) => ({
    question: q.title,
    answer: q.description,
  }));

  return (
    <IntlayerServerProvider locale={locale}>
      <FAQPageHeader faqs={faqs} />
      <div className="m-auto flex max-w-2xl flex-col gap-10 p-10 text-center">
        <Suspense>
          <FrequentQuestionsPageTitle />
        </Suspense>
        <div className="flex flex-col gap-4 text-left">
          {frequentQuestionsList.map((frequentQuestion) => (
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
    </IntlayerServerProvider>
  );
};

export default FrequentQuestionsPage;
