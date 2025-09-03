'use client';

import { SectionScroller } from '@components/DocPage/SectionScroller';
import { MarkdownRenderer } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useLocale } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

type BlogRenderProps = {
  children: string;
};

export const BlogRender: FC<BlogRenderProps> = ({ children }) => {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';
  return (
    <MarkdownRenderer
      isDarkMode={isDarkMode}
      locale={locale}
      options={{
        wrapper: ({ className, ...props }) => (
          <>
            <SectionScroller />
            <div
              className={cn('flex flex-col gap-8 py-10', className)}
              {...props}
            />
          </>
        ),
      }}
    >
      {children}
    </MarkdownRenderer>
  );
};
