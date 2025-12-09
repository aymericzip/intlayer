'use client';

import { Link } from '@components/Link/Link';
import { TableOfContents } from '@components/TableOfContents';
import { MarkdownRenderer } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useLocale } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { ComponentProps, FC } from 'react';
import { SectionScroller } from './SectionScroller';

type DocumentationRenderProps = {
  children: string;
  /** Array of heading levels to display in TOC (e.g., [2, 3, 4] for h2, h3, h4) */
  tocLevels?: number[];
  /** Maximum depth of nested headings to show in TOC */
  tocMaxDepth?: number;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
  tocLevels = [2, 3],
  tocMaxDepth = 3,
}) => {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';
  return (
    <div className="m-auto flex max-w-3xl flex-col gap-8 p-10 max-md:px-0">
      <MarkdownRenderer
        isDarkMode={isDarkMode}
        locale={locale}
        options={{
          overrides: {
            a: (props: ComponentProps<typeof Link>) => (
              <Link
                color="neutral"
                underlined={true}
                locale={locale}
                {...props}
              />
            ),
            TOC: (props: ComponentProps<typeof TableOfContents>) => (
              <TableOfContents {...props} />
            ),
          },
          wrapper: ({ ...props }) => (
            <>
              <SectionScroller />
              <div className={cn('flex flex-col gap-8 py-10')} {...props} />
            </>
          ),
        }}
      >
        {children}
      </MarkdownRenderer>
    </div>
  );
};
