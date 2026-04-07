'use client';

import { getIntlayerMarkdownOptions } from '@intlayer/design-system/mark-down-render';
import type { FC, PropsWithChildren } from 'react';
import { MarkdownProvider } from 'react-intlayer/markdown';
import { useTheme } from '#/providers/ThemeProvider';
import { Link } from '#components/Link/Link';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const markdownOptions = getIntlayerMarkdownOptions(isDark);

  return (
    <MarkdownProvider
      {...markdownOptions}
      components={{
        ...markdownOptions.components,
        a: (props) => (
          <Link href="" label="" underlined={true} {...props} color="neutral" />
        ),
      }}
    >
      {children}
    </MarkdownProvider>
  );
};
