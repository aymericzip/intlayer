import { Accordion } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const CommonQuestionsSection: FC = () => {
  const { content, accordionLabel } = useIntlayer('common-questions');

  return (
    <div
      className="flex flex-col gap-4"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {content.map(({ question, answer }) => (
        <Accordion
          key={question}
          className="flex flex-col gap-2"
          identifier={question}
          header={<>{question}</>}
          label={accordionLabel.value}
          itemProp="mainEntity"
        >
          <div
            className="text-lg font-bold"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h3 className="text-lg font-bold" itemProp="name">
              {question}
            </h3>
          </div>

          <div
            itemProp="acceptedAnswer"
            itemScope
            itemType="https://schema.org/Answer"
          >
            <p itemProp="text">{answer}</p>
          </div>
        </Accordion>
      ))}
    </div>
  );
};
