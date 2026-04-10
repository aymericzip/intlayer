import { Container } from '@intlayer/design-system/container';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

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
    <div className="mt-3 flex flex-row flex-wrap justify-between gap-3 px-10 text-sm">
      {prevDoc && (
        <Container className="max-w-1/2 flex-1">
          <Link
            to={prevDoc?.url}
            label={goToPreviousSection.label.value}
            color="neutral"
            variant="button-outlined"
            className="ml-auto flex h-auto w-full flex-1 flex-row items-center justify-start gap-2 whitespace-normal text-nowrap break-words rounded-lg px-2 py-5"
          >
            <ChevronLeft className="size-5" />
            <span className="text-text">{prevDoc?.title}</span>
          </Link>
        </Container>
      )}
      {nextDoc && (
        <Container className="ml-auto max-w-1/2 flex-1">
          <Link
            to={nextDoc?.url}
            label={goToNextSection.label.value}
            variant="button-outlined"
            color="neutral"
            className="flex h-auto w-full flex-1 flex-row items-center justify-end gap-2 whitespace-normal text-nowrap break-words rounded-lg px-2 py-5"
          >
            <span className="text-text">{nextDoc?.title}</span>
            <ChevronRight className="size-5" />
          </Link>
        </Container>
      )}
    </div>
  );
};
