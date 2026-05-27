/** @jsxImportSource react */

import { Container } from '@intlayer/design-system/container';
import type { LocalesValues } from 'intlayer';
import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '@/components/Link/Link';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

type FrequentQuestion = {
  docKey: string;
  title: string;
  description: string;
  url: string;
};

const FrequentQuestionsContent: FC<{ questions: FrequentQuestion[] }> = ({
  questions,
}) => {
  const { h1 } = useIntlayer('frequent-questions-page');
  return (
    <div className="m-auto flex max-w-2xl flex-col gap-10 p-10 text-center">
      <h1 className="font-bold text-2xl">{h1}</h1>
      <div className="flex flex-col gap-4 text-left">
        {questions.map((fq) => (
          <Link
            key={fq.docKey}
            href={fq.url}
            label={fq.title}
            variant="hoverable"
            color="neutral"
          >
            <Container className="flex flex-row items-center justify-between p-3">
              <div className="flex flex-col gap-2">
                <strong>{fq.title}</strong>
                <p className="text-neutral text-sm">{fq.description}</p>
              </div>
              <ArrowRight />
            </Container>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const FrequentQuestionsListIsland: FC<{
  locale: LocalesValues;
  questions: FrequentQuestion[];
}> = ({ locale, questions }) => (
  <WebsiteIslandWrapper locale={locale}>
    <FrequentQuestionsContent questions={questions} />
  </WebsiteIslandWrapper>
);
