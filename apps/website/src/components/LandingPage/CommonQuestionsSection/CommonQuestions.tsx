import { Link } from '@components/Link/Link';
import { Accordion } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const CommonQuestionsSection: FC = () => {
  const { content, accordionLabel, title } = useIntlayer('common-questions');

  return (
    <section className="m-auto flex w-full max-w-2xl flex-col items-center justify-center">
      <h2 className="text-neutral dark:text-neutral-dark">{title}</h2>

      <div
        className="mt-10 flex flex-col gap-4"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {content.map(({ question, answer, callToAction }) => (
          <Accordion
            key={question.value}
            // className="gap-2"
            identifier={question.value}
            header={
              <div
                className="text-lg font-bold"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3 className="text-lg font-bold" itemProp="name">
                  {question}
                </h3>
              </div>
            }
            label={accordionLabel.value}
            itemProp="mainEntity"
          >
            <div
              itemProp="acceptedAnswer"
              itemScope
              itemType="https://schema.org/Answer"
              className="text-neutral dark-text-neutral-dark"
            >
              <span itemProp="text">{answer}</span>
              <Link
                itemProp="text"
                href={callToAction.url.value}
                label={callToAction.alt.value}
                color="text"
                className="text-sm"
              >
                {callToAction.label}
              </Link>
            </div>
          </Accordion>
        ))}
      </div>
    </section>
  );
};
