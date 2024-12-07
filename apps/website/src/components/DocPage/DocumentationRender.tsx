'use client';

import { MarkdownRenderer } from '@intlayer/design-system';
import { getDoc, type DocsKeys } from '@intlayer/docs';
import { useLocale } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { urlRenamer } from './docData';

type DocumentationRenderProps = {
  docName: DocsKeys;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  docName,
}) => {
  const { resolvedTheme } = useTheme();
  const { locale } = useLocale();
  const doc = getDoc(docName as unknown as DocsKeys, locale);

  const docWithUrlRenamed = urlRenamer(doc);

  const isDarkMode = resolvedTheme === 'dark';
  return (
    <MarkdownRenderer isDarkMode={isDarkMode}>
      {docWithUrlRenamed}
    </MarkdownRenderer>
  );
};
