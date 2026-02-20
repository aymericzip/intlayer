'use client';

import { Link } from '@components/Link/Link';
import { Container, MaxHeightSmoother } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ArrowRight } from 'lucide-react';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import { type FC, useMemo, useSyncExternalStore } from 'react';
import { PagesRoutes } from '@/Routes';

const QuestionItem: FC<{
  question: IntlayerNode;
  answer: IntlayerNode;
  callToAction: { label: IntlayerNode; url: IntlayerNode };
  numberOfColumns: number;
}> = ({ question, answer, callToAction, numberOfColumns }) => {
  // Deterministic minHeight based on question length and column count
  // This avoids random values and hydration mismatches
  const minHeight = useMemo(() => {
    const seed = question.value.length;
    if (numberOfColumns > 2) {
      return (seed % 150) + 75;
    }
    if (numberOfColumns === 2) {
      return (seed % 50) + 100;
    }
    return 90;
  }, [numberOfColumns, question.value]);

  return (
    <Container
      itemProp="mainEntity"
      itemScope
      itemType="https://schema.org/Question"
      background="none"
      border
      roundedSize="lg"
    >
      <MaxHeightSmoother
        isOverable
        isFocusable
        minHeight={minHeight}
        id={question.value}
      >
        <div
          className={cn(
            'px-2 pt-3 sm:px-6',
            numberOfColumns === 1 && 'w-[80vw]',
            numberOfColumns === 2 && 'w-[40vw]',
            numberOfColumns === 3 && 'w-[25vw]'
          )}
        >
          <h3 className="text-wrap pb-4 font-bold text-base" itemProp="name">
            {question}
          </h3>

          <div
            itemProp="acceptedAnswer"
            itemScope
            itemType="https://schema.org/Answer"
            className="text-neutral leading-8"
          >
            <span itemProp="text">{answer}</span>
            {callToAction && (
              <Link
                href={callToAction.url.value}
                label={callToAction.label.value}
                color="text"
                className="text-sm"
              >
                {callToAction.label}
              </Link>
            )}
          </div>
        </div>
      </MaxHeightSmoother>
    </Container>
  );
};

// Helper function to distribute items into a given number of columns.
// It uses an object (via Object.fromEntries) to create keys 0 .. numColumns-1,
// then assigns each item based on its index modulo numColumns.
const distributeItemsIntoColumns = <T,>(
  items: T[],
  numColumns: number
): T[][] => {
  const columnsObj: { [key: number]: T[] } = Object.fromEntries(
    Array.from({ length: numColumns }, (_, i) => [i, []])
  );
  items.forEach((item, index) => {
    // This round-robin distribution effectively separates even (pair) and odd (impair)
    // indexes across all columns.
    const columnIndex = index % numColumns;
    columnsObj[columnIndex].push(item);
  });
  return Object.values(columnsObj);
};

// Custom hook to determine the number of columns based on window width.
// You can tweak the breakpoints as needed.
const useResponsiveColumns = (): number => {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    },
    () => {
      const width = window.innerWidth;
      if (width < 600) return 1;
      if (width < 1024) return 2;
      return 3;
    },
    () => 2
  );
};

export const CommonQuestionsSection: FC = () => {
  const { content, title, allFrequentQuestionLink } =
    useIntlayer('common-questions');

  // Determine the number of columns based on the current breakpoint.
  const numberOfColumns = useResponsiveColumns();

  // Distribute the content items into columns.
  const columns = distributeItemsIntoColumns(content, numberOfColumns);

  return (
    <section className="m-auto flex w-full max-w-6xl flex-col items-center justify-center">
      <h2 className="text-neutral">{title}</h2>

      <div
        itemScope
        itemType="https://schema.org/FAQPage"
        className="my-3 flex w-full flex-row items-start justify-center gap-x-6"
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-6">
            {column.map((props) => (
              <QuestionItem
                key={props.question.value}
                numberOfColumns={numberOfColumns}
                {...props}
              />
            ))}
          </div>
        ))}
      </div>

      <Link
        href={PagesRoutes.FrequentQuestions}
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
