'use client';

import { Link } from '@components/Link/Link';
import { MarkdownRenderer } from '@intlayer/design-system';
import { MarkdownProvider } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <MarkdownProvider
      renderMarkdown={(markdown) => (
        <MarkdownRenderer
          isDarkMode={isDark}
          components={{
            a: (props: ComponentProps<typeof Link>) => (
              <Link color="neutral" underlined={true} {...props} />
            ),
          }}
        >
          {markdown}
        </MarkdownRenderer>
      )}
    >
      {children}
    </MarkdownProvider>
  );
};
