import { CopyButton, Popover } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer/server';
import { FC } from 'react';

type CopyMarkdownMessageProps = {
  markdownContent: string;
};

export const CopyMarkdownMessage: FC<CopyMarkdownMessageProps> = ({
  markdownContent,
}) => {
  const { title, description } = useIntlayer('copy-markdown-message');
  return (
    <Popover identifier="copy">
      <CopyButton content={markdownContent} size="icon-md" className="p-2" />
      <Popover.Detail
        identifier="copy"
        className="flex flex-col gap-3 p-3 min-w-64 text-sm"
        xAlign="end"
      >
        <strong>{title}</strong>
        <p className="text-neutral">{description}</p>
      </Popover.Detail>
    </Popover>
  );
};
