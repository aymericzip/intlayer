import { Accordion } from '@intlayer/design-system/accordion';
import { Container } from '@intlayer/design-system/container';
import { Website_FrequentQuestions_Path } from '@intlayer/design-system/routes';
import { buildFAQPageJsonLd } from '@intlayer/design-system/structured-data';
import { ArrowRight } from 'lucide-react';
import type { FC, ReactNode } from 'react';
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

type CommonQuestionsSectionProps = {
  title?: IntlayerNode<string>;
  description?: IntlayerNode<string>;
  questions?: readonly CommonQuestion[];
  link?: {
    to: string;
    label: IntlayerNode<string>;
    text: IntlayerNode<string>;
  };
  footer?: ReactNode;
};

const FAQItem: FC<CommonQuestion> = ({ question, answer, callToAction }) => (
  <Accordion label={question.value} header={question} defaultIsOpen={false}>
    <div className="overflow-hidden px-8 pb-4">
      <p className="pt-2 text-start text-[15px] leading-5 text-muted-foreground">
        {answer}
        {callToAction && (
          <>
            {' '}
            <Link
              to={callToAction.url.value}
              label={callToAction.label.value}
              color="text"
              className="text-sm"
            >
              {callToAction.label}
            </Link>
          </>
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
export const CommonQuestionsSection: FC<CommonQuestionsSectionProps> = ({
  title,
  description,
  questions,
  link,
  footer,
}) => {
  const defaults = useIntlayer('common-questions');
  const entries = questions ?? Array.from<CommonQuestion>(defaults.content);
  const sectionLink = link ?? {
    to: Website_FrequentQuestions_Path,
    ...defaults.allFrequentQuestionLink,
  };

  // An entry without an answer would be invalid structured data, so only the
  // answered questions are described. `Array.from` types the entries whatever
  // shape the generated dictionary registry gives `content`.
  const faqs = entries
    .map(({ question, answer }) => ({
      question: question.value,
      answer: answer.value,
    }))
    .filter(({ question, answer }) => Boolean(question) && Boolean(answer));

  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-8 p-6 md:p-16">
      <BackgroundLayout />

      <h2 className="text-center text-3xl">{title ?? defaults.title}</h2>
      {description && (
        <p className="max-w-2xl text-center text-lg leading-relaxed text-text/70">
          {description}
        </p>
      )}

      <Container
        background="none"
        border
        roundedSize="4xl"
        className="my-3 w-full max-w-2xl flex-col gap-y-2 overflow-hidden bg-background px-4 py-3"
      >
        {faqs.length > 0 && <JsonLd jsonLd={buildFAQPageJsonLd({ faqs })} />}

        {entries.map((data) => (
          <FAQItem key={data.question.value} {...data} />
        ))}
      </Container>

      <Link
        to={sectionLink.to}
        label={sectionLink.label.value}
        color="text"
        variant="button"
        roundedSize="full"
        className="flex w-auto"
      >
        <span className="flex items-center gap-2">
          {sectionLink.text}
          <ArrowRight className="size-4" />
        </span>
      </Link>
      {footer}
    </section>
  );
};
