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
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
}) as unknown as FC<CodeBlockProps>;
