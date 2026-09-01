import { Accordion } from '@intlayer/design-system/accordion';
import { Website_FrequentQuestions_Path } from '@intlayer/design-system/routes';
import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { Link } from '~/components/Link/Link';

const FAQItem: FC<{
  question: IntlayerNode;
  answer: IntlayerNode;
  callToAction?: { label: IntlayerNode; url: IntlayerNode };
}> = ({ question, answer, callToAction }) => {
  return (
    <Accordion
      itemProp="name"
      label={question}
      header={question}
      defaultIsOpen={false}
    >
      <div
        itemProp="acceptedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
        className="overflow-hidden px-8 pb-4"
      >
        <p
          itemProp="text"
          className="pt-2 text-left text-[15px] text-muted-foreground leading-5"
        >
          {answer}
          {callToAction && (
            <Link
              to={callToAction.url.value}
              label={callToAction.label.value}
              color="text"
              className="text-sm"
            >
              {callToAction.label}
            </Link>
          )}
        </p>
      </div>
    </Accordion>
  );
};

export const CommonQuestionsSection: FC = () => {
  const { content, title, allFrequentQuestionLink } =
    useIntlayer('common-questions');

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-8 p-16">
      <BackgroundLayout />

      <h2 className="text-3xl">{title}</h2>

      <div
        itemScope
        itemType="https://schema.org/FAQPage"
        className="my-3 flex w-full max-w-2xl flex-col items-start justify-center gap-x-6 overflow-hidden rounded-xl border bg-background p-4"
      >
        {content.map((data) => (
          <FAQItem key={data.question} {...data} />
        ))}
      </div>

      <Link
        to={Website_FrequentQuestions_Path}
        label={allFrequentQuestionLink.label.value}
        color="text"
        variant="button"
        roundedSize="full"
        className="flex w-auto"
      >
        <span className="flex items-center gap-2">
          {allFrequentQuestionLink.text}
          <ArrowRight className="size-4" />
        </span>
      </Link>
    </section>
  );
};
