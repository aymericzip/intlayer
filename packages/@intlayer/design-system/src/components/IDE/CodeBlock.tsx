import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers';
import { type FC } from 'react';
import { BundledLanguage, codeToHtml } from 'shiki';

export type CodeBlockProps = {
  children: string;
  lang: BundledLanguage;
  isDarkMode?: boolean;
};

export const CodeBlock = (async ({
  children,
  lang,
  isDarkMode,
}: CodeBlockProps) => {
  const out = await codeToHtml(children, {
    lang,
    theme: isDarkMode ? 'github-dark' : 'github-light',
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
    ],
  });

  return <div className="flex" dangerouslySetInnerHTML={{ __html: out }} />;
}) as unknown as FC<CodeBlockProps>;
