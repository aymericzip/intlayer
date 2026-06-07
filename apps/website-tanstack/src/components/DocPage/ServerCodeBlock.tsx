import type { ComponentProps } from 'react';
import type { BundledLanguage } from 'shiki/bundle/web';

/**
 * Normalises language aliases used in markdown fences to Shiki bundle IDs.
 */
const LANGUAGE_ALIASES: Record<string, BundledLanguage> = {
  ts: 'typescript',
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  sh: 'bash',
  shell: 'bash',
  md: 'markdown',
  mdx: 'markdown',
  yml: 'yaml',
  json5: 'jsonc',
};

type ServerCodeBlockProps = ComponentProps<'code'> & { isDarkMode?: boolean };

/**
 * Async server component that renders a code block with Shiki syntax highlighting.
 *
 * Produces dual-theme HTML (--shiki-light / --shiki-dark CSS variables) so the
 * output works in both light and dark mode without any client-side JS.
 * The `isDarkMode` prop is ignored — theming is handled entirely by CSS via
 * the `[data-theme='dark']` selector defined in shiki.css.
 */
export const ServerCodeBlock = async ({
  className,
  children,
  isDarkMode: _isDarkMode,
  lang: _lang,
  // biome-ignore lint/suspicious/noExplicitAny: dev-mode JSX source props not in standard types
  ...rest
}: ServerCodeBlockProps & { [key: string]: any }) => {
  // Strip dev-mode source-map props injected by React's JSX transform
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fileName: _f, lineNumber: _l, columnNumber: _c, ...domRest } = rest as any;
  const content = String(children ?? '').replace(/\n$/, '');
  const isBlock = !!className;

  if (!isBlock) {
    const decodedContent = content.replace(
      /&(?:amp;)?#(\d+);/g,
      (_, code: string) => String.fromCharCode(parseInt(code, 10))
    );
    return (
      <code className="rounded-md border border-neutral/30 bg-card/60 box-decoration-clone px-1.5 py-0.5 font-mono text-sm">
        {decodedContent}
      </code>
    );
  }

  const rawLanguage = className?.replace(/lang(?:uage)?-/, '') ?? 'plaintext';
  const language =
    (LANGUAGE_ALIASES[rawLanguage] ?? rawLanguage) as BundledLanguage;

  const { codeToHtml } = await import('shiki/bundle/web');

  const html = await codeToHtml(content, {
    lang: language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    defaultColor: false,
  });

  return (
    <div
      className="min-w-0 max-w-full overflow-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_pre::-webkit-scrollbar]:hidden [&_pre]:[-ms-overflow-style:none] [&_pre]:[scrollbar-width:none]"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
      dangerouslySetInnerHTML={{ __html: html }}
      {...domRest}
    />
  );
};
