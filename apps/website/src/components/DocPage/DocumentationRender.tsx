'use client';

import { MarkdownRenderer } from '@intlayer/design-system';
import { getDoc, type DocsKeys } from '@intlayer/docs';
import { useLocale } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';

type DocumentationRenderProps = {
  docName: keyof typeof DocsKeys;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  docName,
}) => {
  const theme = useTheme();
  const { locale } = useLocale();
  const doc = getDoc(docName, locale);

  const isDarkMode = theme.theme === 'dark';
  return <MarkdownRenderer isDarkMode={isDarkMode}>{doc}</MarkdownRenderer>;
};
