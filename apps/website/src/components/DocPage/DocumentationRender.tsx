'use client';

import { MarkdownRenderer } from '@intlayer/design-system';
import { useLocale } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

type DocumentationRenderProps = {
  children: string;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
}) => {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';
  return (
    <div className="flex flex-col gap-8 p-10">
      <MarkdownRenderer isDarkMode={isDarkMode} locale={locale}>
        {children}
      </MarkdownRenderer>
    </div>
  );
};
