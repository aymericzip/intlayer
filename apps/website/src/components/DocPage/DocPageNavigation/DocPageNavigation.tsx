import { Container, Link } from '@intlayer/design-system';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

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
    <div className="flex flex-row flex-wrap justify-between gap-3 text-sm px-10 mt-3">
      {prevDoc && (
        <Container className="flex-1 max-w-1/2">
          <Link
            href={prevDoc?.url}
            label={goToPreviousSection.label.value}
            color="text"
            className="ml-auto w-full flex flex-row justify-start items-center break-words whitespace-normal gap-2 px-2 py-5 text-nowrap rounded-lg h-auto flex-1"
          >
            <ChevronLeft className="size-5" />
            {prevDoc?.title}
          </Link>
        </Container>
      )}
      {nextDoc && (
        <Container className="flex-1 max-w-1/2 ml-auto">
          <Link
            href={nextDoc?.url}
            label={goToNextSection.label.value}
            color="text"
            className="w-full flex flex-row justify-end items-center break-words whitespace-normal gap-2 px-2 py-5 text-nowrap rounded-lg h-auto flex-1"
          >
            {nextDoc?.title}
            <ChevronRight className="size-5" />
          </Link>
        </Container>
      )}
    </div>
  );
};
