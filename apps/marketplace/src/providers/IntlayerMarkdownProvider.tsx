import { getIntlayerMarkdownOptions } from '@intlayer/design-system/mark-down-render';
import type { FC, PropsWithChildren } from 'react';
import { MarkdownProvider } from 'react-intlayer/markdown';
import { Link } from '#components/Link/Link';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const markdownOptions = getIntlayerMarkdownOptions();

  return (
    <MarkdownProvider
      {...markdownOptions}
      components={{
        ...markdownOptions.components,
        a: ({ href, ...props }) => (
          <Link
            to={href}
            label=""
            underlined={true}
            {...props}
            color="neutral"
          />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
