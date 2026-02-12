'use client';

import { Link } from '@components/Link/Link';
import { getIntlayerMarkdownOptions } from '@intlayer/design-system';
import { MarkdownProvider } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC, PropsWithChildren } from 'react';

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
