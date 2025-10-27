'use client';

import { type FC, useEffect, useState } from 'react';
import type {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
} from 'shiki/bundle/web';
import { CodeDefault } from './CodeBlockClient';

// Map of loaded modules to avoid re-importing
const languageCache = new Map<BundledLanguage, any>();
const themeCache = new Map<BundledTheme, any>();

// Lazy load language modules
const loadLanguage = async (lang: BundledLanguage): Promise<any> => {
  if (languageCache.has(lang)) {
    return languageCache.get(lang);
  }

  let languageModule: any;

  switch (lang) {
    case 'typescript':
    case 'ts':
      languageModule = await import('shiki/langs/typescript.mjs');
      break;
    case 'javascript':
    case 'js':
      languageModule = await import('shiki/langs/javascript.mjs');
      break;
    case 'bash':
    case 'sh':
    case 'shell':
      languageModule = await import('shiki/langs/bash.mjs');
      break;
    case 'json':
      languageModule = await import('shiki/langs/json.mjs');
      break;
    case 'tsx':
      languageModule = await import('shiki/langs/tsx.mjs');
      break;
    case 'vue':
      languageModule = await import('shiki/langs/vue.mjs');
      break;
    case 'html':
      languageModule = await import('shiki/langs/html.mjs');
      break;
    default:
      // Fallback to typescript for unknown languages
      languageModule = await import('shiki/langs/typescript.mjs');
      break;
  }

  const language = languageModule.default;
  languageCache.set(lang, language);
  return language;
};

// Lazy load theme modules
const loadTheme = async (themeName: BundledTheme): Promise<any> => {
  if (themeCache.has(themeName)) {
    return themeCache.get(themeName);
  }

  let themeModule: any;

  switch (themeName) {
    case 'github-dark':
      themeModule = await import('shiki/themes/github-dark.mjs');
      break;
    case 'github-light':
      themeModule = await import('shiki/themes/github-light.mjs');
      break;
    default:
      themeModule = await import('shiki/themes/github-light.mjs');
      break;
  }

  const theme = themeModule.default;
  themeCache.set(themeName, theme);
  return theme;
};

// Create a promise for highlighting
const highlightCode = async (
  code: string,
  lang: BundledLanguage,
  isDarkMode?: boolean
): Promise<string> => {
  const themeName: BundledTheme = isDarkMode ? 'github-dark' : 'github-light';

  // Lazy load shiki, language, and theme in parallel
  const [{ codeToHtml }, languageModule, themeModule] = await Promise.all([
    import('shiki/bundle/web'),
    loadLanguage(lang),
    loadTheme(themeName),
  ]);

  const shikiOptions: CodeToHastOptions<BundledLanguage, BundledTheme> = {
    lang,
    theme: themeModule,
  };

  return codeToHtml(code, {
    ...shikiOptions,
    langs: [languageModule],
  } as any);
};

export type CodeBlockShikiProps = {
  children: string;
  lang: BundledLanguage;
  isDarkMode?: boolean;
};

export const CodeBlockShiki: FC<CodeBlockShikiProps> = ({
  children,
  lang,
  isDarkMode,
}) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setHtml(null);

    highlightCode(children, lang, isDarkMode)
      .then((result) => {
        if (!isCancelled) setHtml(result);
      })
      .catch(() => {
        if (!isCancelled) setHtml('');
      });

    return () => {
      isCancelled = true;
    };
  }, [children, lang, isDarkMode]);

  return (
    <div
      style={{
        backgroundColor: 'transparent',
        minWidth: 0,
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CodeDefault>{children}</CodeDefault>
      )}
    </div>
  );
};
