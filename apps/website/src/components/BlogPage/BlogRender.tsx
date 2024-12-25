'use client';

import { MarkdownRenderer } from '@intlayer/design-system';
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
    <MarkdownRenderer isDarkMode={isDarkMode} locale={locale}>
      {children}
    </MarkdownRenderer>
  );
};
