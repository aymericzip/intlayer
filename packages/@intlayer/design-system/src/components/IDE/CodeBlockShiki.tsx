'use client';

import { type FC, useEffect, useState } from 'react';
import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
} from 'shiki/bundle/web';
import { CodeDefault } from './CodeBlockClient';

// Map of loaded modules to avoid re-importing
const languageCache = new Map<BundledLanguage, any>();
const themeCache = new Map<BundledTheme, any>();

// Lazy load language modules
const loadLanguage = async (lang: BundledLanguage): Promise<any> => {
  if (languageCache.has(lang)) return languageCache.get(lang);

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
      languageModule = await import('shiki/langs/typescript.mjs');
      break;
  }

  const language = languageModule.default;
  languageCache.set(lang, language);
  return language;
};

// Lazy load theme modules
const loadTheme = async (themeName: BundledTheme): Promise<any> => {
  if (themeCache.has(themeName)) return themeCache.get(themeName);

  let themeModule: any;
  switch (themeName) {
    case 'github-dark':
      themeModule = await import('shiki/themes/github-dark.mjs');
      break;
    case 'github-light':
    default:
      themeModule = await import('shiki/themes/github-light.mjs');
      break;
  }

  const theme = themeModule.default;
  themeCache.set(themeName, theme);
  return theme;
};

// Singleton Highlighter Instance
let highlighterPromise: Promise<HighlighterGeneric<any, any>> | null = null;

const getHighlighterInstance = async () => {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki/bundle/web').then(
      ({ createHighlighter }) =>
        createHighlighter({
          langs: [],
          themes: [],
        })
    );
  }
  return highlighterPromise;
};

// Create a promise for highlighting
const highlightCode = async (
  code: string,
  lang: BundledLanguage,
  isDarkMode?: boolean
): Promise<string> => {
  const themeName: BundledTheme = isDarkMode ? 'github-dark' : 'github-light';

  // Load highlighter, language, and theme in parallel
  const [highlighter, languageModule, themeModule] = await Promise.all([
    getHighlighterInstance(),
    loadLanguage(lang),
    loadTheme(themeName),
  ]);

  // Load into the singleton instance if not already loaded
  if (!highlighter.getLoadedLanguages().includes(lang)) {
    await highlighter.loadLanguage(languageModule);
  }
  if (!highlighter.getLoadedThemes().includes(themeName)) {
    await highlighter.loadTheme(themeModule);
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: themeName,
  });
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

    highlightCode(children, lang, isDarkMode)
      .then((result) => {
        if (!isCancelled) setHtml(result);
      })
      .catch((error) => {
        console.error('Failed to highlight code:', error);
        if (!isCancelled && html === null) setHtml('');
      });

    return () => {
      isCancelled = true;
    };
  }, [children, lang, isDarkMode]);

  return (
    <div className="min-w-0 max-w-full overflow-auto bg-transparent [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_pre::-webkit-scrollbar]:hidden [&_pre]:[-ms-overflow-style:none] [&_pre]:[scrollbar-width:none]">
      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CodeDefault>{children}</CodeDefault>
      )}
    </div>
  );
};
