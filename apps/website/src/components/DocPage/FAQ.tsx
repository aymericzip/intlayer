import { slugify } from '@intlayer/core/markdown';
import { Accordion } from '@intlayer/design-system/accordion';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { buildFAQPageJsonLd } from '@intlayer/design-system/structured-data';
import { cn } from '@intlayer/design-system/utils';
import { ChevronDown } from 'lucide-react';
import {
  Children,
  cloneElement,
  type FC,
  isValidElement,
  type PropsWithChildren,
  type ReactElement,
  useId,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { extractPlainText, JsonLd } from './jsonLd';

/** Number of questions shown before the "show more" toggle is needed. */
export const INITIAL_VISIBLE_QUESTIONS_COUNT = 6;

type QuestionProps = PropsWithChildren<{
  /** The question, rendered as a deep-linkable, collapsible heading. */
  title: string;
  /**
   * Hides the entry with `display: none`. It stays in the DOM so crawlers keep
   * indexing it — set by {@link FAQ} for entries past the initial count.
   */
  isHidden?: boolean;
}>;

/**
 * A single question/answer pair of a {@link FAQ} block.
 *
 * Built on the shared {@link Accordion} so the answer collapses by default.
 * The answer stays mounted in the DOM (only its height is collapsed), so
 * search engines and AI crawlers can still quote it as a standalone passage;
 * {@link FAQ} additionally describes it in its `FAQPage` JSON-LD node.
 */
export const Question: FC<QuestionProps> = ({
  title,
  isHidden = false,
  children,
}) => (
  <div className={cn('py-2 first:pt-0 last:pb-0', isHidden && 'hidden')}>
    <Accordion
      label={title}
      header={
        <h3 id={slugify(title)} className="text-left text-sm">
          {title}
        </h3>
      }
    >
      <div className="flex flex-col gap-3 px-4 py-6 text-sm text-text/80 [&_p]:mt-0">
        {children}
      </div>
    </Accordion>
  </div>
);

/**
 * Frequently asked questions block for a documentation page.
 *
 * Describes its {@link Question} children in a schema.org `FAQPage` JSON-LD
 * script — the format Google recommends over microdata. Only the first
 * {@link INITIAL_VISIBLE_QUESTIONS_COUNT} questions are shown by default; the
 * rest are revealed with a "show more" toggle. Every question stays mounted in
 * the DOM at all times — the extra ones are only hidden with `display: none`
 * — so the rendered content matches the structured data whatever the toggle
 * state.
 */
export const FAQ: FC<PropsWithChildren> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleButton } = useIntlayer('faq');
  const questionListId = useId();

  // Markdown authoring inserts whitespace text nodes between the `<Question>`
  // blocks; they must not consume a slot in the visible count.
  const questions = Children.toArray(children).filter(
    (child): child is ReactElement<QuestionProps> => isValidElement(child)
  );
  const hasAdditionalQuestions =
    questions.length > INITIAL_VISIBLE_QUESTIONS_COUNT;

  // An entry without an answer would be invalid structured data, so only the
  // answered questions are described.
  const faqs = questions
    .map((question) => ({
      question: question.props.title,
      answer: extractPlainText(question.props.children),
    }))
    .filter(({ question, answer }) => Boolean(question) && Boolean(answer));

  return (
    <Container
      padding="lg"
      roundedSize="2xl"
      background="none"
      border
      borderColor="neutral"
      className="px-1"
    >
      {faqs.length > 0 && <JsonLd jsonLd={buildFAQPageJsonLd({ faqs })} />}

      <div
        id={questionListId}
        className="flex flex-col divide-y divide-neutral/30"
      >
        {questions.map((question, index) =>
          cloneElement(question, {
            isHidden: !isExpanded && index >= INITIAL_VISIBLE_QUESTIONS_COUNT,
          })
        )}
      </div>

      {hasAdditionalQuestions && (
        <div className="flex justify-end">
          <Button
            variant="hoverable"
            color="text"
            size="md"
            className="mt-4 ml-auto"
            label={toggleButton.label(isExpanded).value}
            IconRight={ChevronDown}
            iconClassName={cn(
              'transition-transform duration-300',
              isExpanded && 'rotate-180'
            )}
            aria-expanded={isExpanded}
            aria-controls={questionListId}
            onClick={() => setIsExpanded((previous) => !previous)}
          >
            {toggleButton.text(isExpanded)}
          </Button>
        </div>
      )}
    </Container>
  );
};
