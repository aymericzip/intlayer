'use client';

import { Link } from '@components/Link/Link';
import { Container, MaxHeightSmoother } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { type IntlayerNode, useIntlayer } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';

const QuestionItem: FC<{
  question: IntlayerNode;
  answer: IntlayerNode;
  callToAction: { label: IntlayerNode; url: IntlayerNode };
  numberOfColumns: number;
}> = ({ question, answer, callToAction, numberOfColumns }) => {
  const [minHeight, setMinHeight] = useState<number>(100);

  useEffect(() => {
    if (numberOfColumns > 2) {
      // Generate random minHeight only on the client after mount.
      setMinHeight(Math.random() * 150 + 75);
    } else if (numberOfColumns === 2) {
      // Generate random minHeight only on the client after mount.
      setMinHeight(Math.random() * 50 + 100);
    } else {
      // Generate random minHeight only on the client after mount.
      setMinHeight(90);
    }
  }, [numberOfColumns]);

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
        <div className="px-2 pt-3 sm:px-6">
          <h3 className="text-wrap pb-4 text-base font-bold" itemProp="name">
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
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setColumns(1);
      } else if (width < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  return columns;
};

export const CommonQuestionsSection: FC = () => {
  const { content, title } = useIntlayer('common-questions');

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
        className={cn(
          'mt-2 grid w-full grid-flow-row-dense auto-rows-auto grid-cols-3 gap-x-6 px-6',
          numberOfColumns === 1 && 'grid-cols-1',
          numberOfColumns === 2 && 'grid-cols-2'
        )}
      >
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="m-auto flex size-full flex-col gap-6">
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
    </section>
  );
};
