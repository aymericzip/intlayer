'use client';

import { Link } from '@components/Link/Link';
import { MarkdownRenderer } from '@intlayer/design-system';
import { MarkdownProvider } from 'next-intlayer';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider
    renderMarkdown={(markdown) => (
      <MarkdownRenderer
        options={{
          overrides: {
            a: (props: ComponentProps<typeof Link>) => <Link {...props} />,
          },
        }}
      >
        {markdown}
      </MarkdownRenderer>
    )}
  >
    {children}
  </MarkdownProvider>
);
