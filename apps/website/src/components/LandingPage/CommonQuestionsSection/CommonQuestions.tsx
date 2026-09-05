import { Accordion } from '@intlayer/design-system/accordion';
import { Website_FrequentQuestions_Path } from '@intlayer/design-system/routes';
import { buildFAQPageJsonLd } from '@intlayer/design-system/structured-data';
import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { JsonLd } from '~/components/JsonLd';
import { Link } from '~/components/Link/Link';

/** One question/answer pair of the `common-questions` dictionary. */
type CommonQuestion = {
  question: IntlayerNode<string>;
  answer: IntlayerNode<string>;
  callToAction?: {
    label: IntlayerNode<string>;
    url: IntlayerNode<string>;
  };
};

const FAQItem: FC<CommonQuestion> = ({ question, answer, callToAction }) => (
  <Accordion label={question} header={question} defaultIsOpen={false}>
    <div className="overflow-hidden px-8 pb-4">
      <p className="pt-2 text-left text-[15px] text-muted-foreground leading-5">
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

/**
 * Frequently asked questions section of the landing page.
 *
 * Describes its entries in a schema.org `FAQPage` JSON-LD node — the format
 * Google recommends over microdata, and the one the documentation `FAQ` block
 * and the frequent-questions page already emit. The microdata this section
 * used to carry declared `name` and `acceptedAnswer` directly on the
 * `FAQPage`, with no `mainEntity` `Question` between them, which Search
 * Console reported as a missing `mainEntity` and an unrecognised
 * `acceptedAnswer`.
 */
export const CommonQuestionsSection: FC = () => {
  const { content, title, allFrequentQuestionLink } =
    useIntlayer('common-questions');

  // An entry without an answer would be invalid structured data, so only the
  // answered questions are described. `Array.from` types the entries whatever
  // shape the generated dictionary registry gives `content`.
  const faqs = Array.from<CommonQuestion>(content)
    .map(({ question, answer }) => ({
      question: question.value,
      answer: answer.value,
    }))
    .filter(({ question, answer }) => Boolean(question) && Boolean(answer));

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-8 p-16">
      <BackgroundLayout />

      <h2 className="text-3xl">{title}</h2>

      <div className="my-3 flex w-full max-w-2xl flex-col items-start justify-center gap-x-6 overflow-hidden rounded-xl border bg-background p-4">
        {faqs.length > 0 && <JsonLd jsonLd={buildFAQPageJsonLd({ faqs })} />}

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
