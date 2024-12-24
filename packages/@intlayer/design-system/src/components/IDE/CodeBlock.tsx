import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers';
import { type FC } from 'react';
import {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  codeToHtml,
} from 'shiki';

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
  const shikiOptions: CodeToHastOptions<BundledLanguage, BundledTheme> = {
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
  };

  const out = await codeToHtml(children, shikiOptions);

  return <div className="flex" dangerouslySetInnerHTML={{ __html: out }} />;
}) as unknown as FC<CodeBlockProps>;
