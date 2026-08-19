'use client';

import { Link } from '@components/Link/Link';
import { getIntlayerMarkdownOptions } from '@intlayer/design-system/mark-down-render';
import { MarkdownProvider } from 'next-intlayer/markdown';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const markdownOptions = getIntlayerMarkdownOptions();

  return (
    <MarkdownProvider
      {...markdownOptions}
      components={{
        ...markdownOptions.components,
        a: (props: ComponentProps<typeof Link>) => (
          <Link color="neutral" underlined={true} {...props} />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
