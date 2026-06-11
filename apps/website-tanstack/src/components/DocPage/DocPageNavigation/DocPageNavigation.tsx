import { Container } from '@intlayer/design-system/container';
import { Link } from '@intlayer/design-system/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export type DocPageNavigationProps = {
  nextDoc?: {
    title: string;
    url: string;
  };
  prevDoc?: {
    title: string;
    url: string;
  };
};

export const DocPageNavigation: FC<DocPageNavigationProps> = ({
  nextDoc,
  prevDoc,
}) => {
  const { goToNextSection, goToPreviousSection } = useIntlayer('doc-page');

  return (
    <div className="my-3 flex flex-row flex-wrap justify-between gap-3 px-10 text-sm">
      {prevDoc && (
        <Link
          to={prevDoc?.url}
          label={goToPreviousSection.label.value}
          color="neutral"
          variant="button-outlined"
          className="wrap-break-words ml-auto flex h-auto w-full max-w-1/2 flex-1 flex-row items-center justify-start gap-2 whitespace-normal text-nowrap rounded-lg px-2 py-5"
        >
          <ChevronLeft className="size-5" />
          <span className="text-text">{prevDoc?.title}</span>
        </Link>
      )}
      {nextDoc && (
        <Link
          to={nextDoc?.url}
          label={goToNextSection.label.value}
          variant="button-outlined"
          color="neutral"
          className="wrap-break-words ml-auto flex h-auto w-full max-w-1/2 flex-1 flex-1 flex-row items-center justify-end gap-2 whitespace-normal text-nowrap rounded-lg px-2 py-5"
        >
          <span className="text-text">{nextDoc?.title}</span>
          <ChevronRight className="size-5" />
        </Link>
      )}
    </div>
  );
};
