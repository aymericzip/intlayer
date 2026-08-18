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
        a: (props) => (
          <Link to="" underlined={true} {...(props as any)} color="neutral" />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
