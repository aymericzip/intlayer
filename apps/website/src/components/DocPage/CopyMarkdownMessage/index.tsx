import { CopyButton } from '@intlayer/design-system/copy-button';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { type FC, useRef } from 'react';
import { useIntlayer } from 'react-intlayer';

type CopyMarkdownMessageProps = {
  /** Address serving the page's markdown source, e.g. `/doc/concept/cms.md`. */
  markdownUrl: string;
};

/**
 * Copies the page's markdown source to the clipboard.
 *
 * The source is fetched on demand rather than embedded in the page: it is a
 * verbatim copy of content the reader already has rendered, so shipping it with
 * every documentation page costs bytes and hydration time for a button most
 * readers never press. It is prefetched as soon as the button is hovered or
 * focused, so the click itself still resolves instantly.
 */
export const CopyMarkdownMessage: FC<CopyMarkdownMessageProps> = ({
  markdownUrl,
}) => {
  const { title, description } = useIntlayer('copy-markdown-message');
  const markdownRequest = useRef<Promise<string> | null>(null);

  const loadMarkdown = () => {
    markdownRequest.current ??= fetch(markdownUrl, {
      headers: { Accept: 'text/markdown' },
    }).then((response) => response.text());

    return markdownRequest.current;
  };

  return (
    <PopoverStatic identifier="copy">
      <CopyButton
        content={loadMarkdown}
        onPointerEnter={loadMarkdown}
        onFocus={loadMarkdown}
        size="icon-md"
        className="p-2"
      />
      <PopoverStatic.Detail
        identifier="copy"
        className="flex min-w-64 flex-col gap-3 p-3 text-sm"
        xAlign="end"
      >
        <strong>{title}</strong>
        <p className="text-muted-foreground">{description}</p>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
