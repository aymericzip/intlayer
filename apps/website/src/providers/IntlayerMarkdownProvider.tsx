'use client';

import { Link } from '@components/Link/Link';
import { MarkdownRenderer } from '@intlayer/design-system';
import { MarkdownProvider } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { ComponentProps, FC, Fragment, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <MarkdownProvider
      renderMarkdown={(markdown) => (
        <MarkdownRenderer
          isDarkMode={isDark}
          options={{
            overrides: {
              a: (props: ComponentProps<typeof Link>) => (
                <Link color="neutral" underlined={true} {...props} />
              ),
            },
            wrapper: (props: ComponentProps<typeof Fragment>) => props.children,
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
