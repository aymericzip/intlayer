'use client';

import { MarkdownRenderer } from '@intlayer/design-system';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

type DocumentationRenderProps = {
  children: string;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';
  return (
    <MarkdownRenderer isDarkMode={isDarkMode}>{children}</MarkdownRenderer>
  );
};
