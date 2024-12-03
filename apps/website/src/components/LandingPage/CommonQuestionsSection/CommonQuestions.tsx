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
        className="mt-10 flex flex-col gap-2 px-3"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        {content.map(({ question, answer, callToAction }) => (
          <div
            itemProp="mainEntity"
            itemScope
            itemType="https://schema.org/Question"
            key={question.value}
          >
            <Accordion
              identifier={question.value}
              className="mt-2"
              header={
                <h3
                  className="text-wrap p-2 text-base font-bold"
                  itemProp="name"
                >
                  {question}
                </h3>
              }
              label={accordionLabel.value}
            >
              <div
                itemProp="acceptedAnswer"
                itemScope
                itemType="https://schema.org/Answer"
                className="text-neutral dark:text-neutral-dark"
              >
                <div itemProp="text">{answer}</div>
                {callToAction && (
                  <Link
                    href={callToAction.url.value}
                    label={callToAction.alt.value}
                    color="text"
                    className="text-sm"
                  >
                    {callToAction.label}
                  </Link>
                )}
              </div>
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
};
