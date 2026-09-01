import { MaxHeightSmoother } from '@intlayer/design-system/max-height-smoother';
import { Website_FrequentQuestions_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { type FC, useMemo, useState, useSyncExternalStore } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { Link } from '~/components/Link/Link';

const FAQItem: FC<{
  question: IntlayerNode;
  answer: IntlayerNode;
  callToAction?: { label: IntlayerNode; url: IntlayerNode };
}> = ({ question, answer, callToAction }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((x) => !x)}
      data-open={open}
      className="group flex w-full cursor-pointer flex-col px-3 py-1 hover:bg-accent data-[open=true]:py-3"
    >
      <div className="flex w-full items-center justify-between gap-3">
        <p itemProp="name">{question}</p>

        <ChevronDown
          data-open={open}
          className="size-5 origin-center text-muted-foreground transition-transform duration-200 data-[open=true]:rotate-180"
        />
      </div>

      <div
        data-open={open}
        className={`grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out data-[open=true]:grid-rows-[1fr] data-[open=true]:opacity-100`}
      >
        <div
          itemProp="acceptedAnswer"
          itemScope
          itemType="https://schema.org/Answer"
          className="overflow-hidden"
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
      </div>
    </button>
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
        className="my-3 flex w-full max-w-2xl flex-col items-start justify-center gap-x-6 overflow-hidden rounded-xl border bg-background [&>button:not(:first-child)]:border-t"
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
