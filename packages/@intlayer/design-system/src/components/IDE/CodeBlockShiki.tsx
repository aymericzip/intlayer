'use client';

import { type FC, type ReactNode, useEffect, useState } from 'react';
import type { BundledTheme } from 'shiki/bundle/web';
import { CodeDefault } from './CodeBlockClient';
import {
  type CodeLanguage,
  type LanguageGrammar,
  type ResolvedCodeLanguage,
  resolveCodeLanguage,
} from './shikiLanguages';

/** Theme registration, as default-exported by the `shiki/themes/*` modules. */
type ThemeRegistration =
  typeof import('shiki/themes/github-dark.mjs')['default'];

/** Minimal Shiki highlighter surface used here, with unrestricted language ids. */
type CodeHighlighter = {
  getLoadedLanguages(): string[];
  getLoadedThemes(): string[];
  loadLanguage(grammar: LanguageGrammar): Promise<void>;
  loadTheme(theme: ThemeRegistration): Promise<void>;
  codeToHtml(code: string, options: { lang: string; theme: string }): string;
};

// Map of in-flight/loaded modules to avoid re-importing
const languageCache = new Map<string, Promise<LanguageGrammar>>();
const themeCache = new Map<BundledTheme, Promise<ThemeRegistration>>();

/**
 * Lazy load the grammar of an already resolved language.
 *
 * @returns The grammar registrations, or `null` for languages Shiki renders
 * without a grammar (plain text).
 */
const loadLanguage = async ({
  id,
  loadGrammar,
}: ResolvedCodeLanguage): Promise<LanguageGrammar | null> => {
  if (!loadGrammar) return null;

  const cachedLanguage = languageCache.get(id);
  if (cachedLanguage) return cachedLanguage;

  const languagePromise = loadGrammar().then((module) => module.default);
  languageCache.set(id, languagePromise);

  return languagePromise;
};

/**
 * Lazy load a theme module.
 */
const loadTheme = async (
  themeName: BundledTheme
): Promise<ThemeRegistration> => {
  const cachedTheme = themeCache.get(themeName);
  if (cachedTheme) return cachedTheme;

  const themePromise = (
    themeName === 'github-dark'
      ? import('shiki/themes/github-dark.mjs')
      : import('shiki/themes/github-light.mjs')
  ).then((module) => module.default);

  themeCache.set(themeName, themePromise);

  return themePromise;
};

// Singleton Highlighter Instance
let highlighterPromise: Promise<CodeHighlighter> | null = null;

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

/**
 * Highlight a snippet, lazily loading only the grammar and theme it needs.
 *
 * The language is resolved to a canonical Shiki id first, so that the id passed
 * to `codeToHtml` always matches the grammar that was loaded.
 */
const highlightCode = async (
  code: ReactNode,
  lang: CodeLanguage,
  isDarkMode?: boolean
): Promise<string> => {
  const themeName: BundledTheme = isDarkMode ? 'github-dark' : 'github-light';
  const resolvedLanguage = resolveCodeLanguage(lang);

  // Load highlighter, language, and theme in parallel
  const [highlighter, languageModule, themeModule] = await Promise.all([
    getHighlighterInstance(),
    loadLanguage(resolvedLanguage),
    loadTheme(themeName),
  ]);

  // Load into the singleton instance if not already loaded
  if (
    languageModule &&
    !highlighter.getLoadedLanguages().includes(resolvedLanguage.id)
  ) {
    await highlighter.loadLanguage(languageModule);
  }
  if (!highlighter.getLoadedThemes().includes(themeName)) {
    await highlighter.loadTheme(themeModule);
  }

  return highlighter.codeToHtml(String(code), {
    lang: resolvedLanguage.id,
    theme: themeName,
  });
};

export type CodeBlockShikiProps = {
  children: ReactNode;
  lang: CodeLanguage;
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
    <div className="[&_pre.shiki]:!bg-transparent min-w-0 max-w-full overflow-auto bg-transparent [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&_pre.shiki]:max-w-full [&_pre.shiki]:overflow-x-auto [&_pre::-webkit-scrollbar]:hidden [&_pre]:[-ms-overflow-style:none] [&_pre]:[scrollbar-width:none]">
      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CodeDefault>{children}</CodeDefault>
      )}
    </div>
  );
};
