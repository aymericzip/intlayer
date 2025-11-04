import { CopyButton, PopoverStatic } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

type CopyMarkdownMessageProps = {
  markdownContent: string;
};

export const CopyMarkdownMessage: FC<CopyMarkdownMessageProps> = ({
  markdownContent,
}) => {
  const { title, description } = useIntlayer('copy-markdown-message');

  return (
    <PopoverStatic identifier="copy">
      <CopyButton content={markdownContent} size="icon-md" className="p-2" />
      <PopoverStatic.Detail
        identifier="copy"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
        xAlign="end"
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
