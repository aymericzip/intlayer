'use client';

import { Link } from '@components/Link/Link';
import { MarkdownRenderer } from '@intlayer/design-system';
import { MarkdownProvider } from 'next-intlayer';
import type { ComponentProps, FC, Fragment, PropsWithChildren } from 'react';

export const IntlayerMarkdownProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <MarkdownProvider
    renderMarkdown={(markdown) => (
      <MarkdownRenderer
        options={{
          overrides: {
            a: (props: ComponentProps<typeof Link>) => (
              <Link color="neutral" underlined={true} {...props} />
            ),
          },
          wrapper: (props: ComponentProps<typeof Fragment>) => (
            <div className="flex flex-col gap-4">{props.children}</div>
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
