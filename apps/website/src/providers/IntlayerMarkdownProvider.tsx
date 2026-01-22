'use client';

import { Link } from '@components/Link/Link';
import { getIntlayerMarkdownOptions } from '@intlayer/design-system';
import { MarkdownProvider } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const markdownOptions = getIntlayerMarkdownOptions(isDark);

  return (
    <MarkdownProvider
      components={{
        ...markdownOptions.components,
        a: (props: ComponentProps<typeof Link>) => (
          <Link color="neutral" underlined={true} {...props} />
        ),
      }}
      options={markdownOptions.options}
    >
      {children}
    </MarkdownProvider>
  );
};
