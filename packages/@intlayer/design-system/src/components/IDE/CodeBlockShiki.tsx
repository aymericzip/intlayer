'use client';

import { type FC, type ReactNode, useEffect, useState } from 'react';
import { CodeDefault, shikiWrapperClassName } from './CodeBlockClient';
import {
  type CodeLanguage,
  type LanguageGrammar,
  type ResolvedCodeLanguage,
  resolveCodeLanguage,
} from './shikiLanguages';
import { SHIKI_THEMES } from './shikiThemes';

/** Theme registration, as default-exported by the `shiki/themes/*` modules. */
type ThemeRegistration =
  typeof import('shiki/themes/github-dark.mjs')['default'];

/** Minimal Shiki highlighter surface used here, with unrestricted language ids. */
type CodeHighlighter = {
  getLoadedLanguages(): string[];
  getLoadedThemes(): string[];
  loadLanguage(grammar: LanguageGrammar): Promise<void>;
  loadTheme(theme: ThemeRegistration): Promise<void>;
  codeToHtml(
    code: string,
    options: {
      lang: string;
      themes: { light: string; dark: string };
      defaultColor: false;
    }
  ): string;
};

// Map of in-flight/loaded modules to avoid re-importing
const languageCache = new Map<string, Promise<LanguageGrammar>>();
const themeCache = new Map<string, Promise<ThemeRegistration>>();

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
const loadTheme = async (themeName: string): Promise<ThemeRegistration> => {
  const cachedTheme = themeCache.get(themeName);
  if (cachedTheme) return cachedTheme;

  const themePromise = (
    themeName === SHIKI_THEMES.dark
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
 * Highlight a snippet, lazily loading only the grammar and themes it needs.
 *
 * The language is resolved to a canonical Shiki id first, so that the id passed
 * to `codeToHtml` always matches the grammar that was loaded.
 */
const highlightCode = async (
  code: ReactNode,
  lang: CodeLanguage
): Promise<string> => {
  const resolvedLanguage = resolveCodeLanguage(lang);

  // Load highlighter, language, and themes in parallel
  const [highlighter, languageModule, lightTheme, darkTheme] =
    await Promise.all([
      getHighlighterInstance(),
      loadLanguage(resolvedLanguage),
      loadTheme(SHIKI_THEMES.light),
      loadTheme(SHIKI_THEMES.dark),
    ]);

  // Load into the singleton instance if not already loaded
  if (
    languageModule &&
    !highlighter.getLoadedLanguages().includes(resolvedLanguage.id)
  ) {
    await highlighter.loadLanguage(languageModule);
  }

  const loadedThemes = highlighter.getLoadedThemes();
  if (!loadedThemes.includes(SHIKI_THEMES.light)) {
    await highlighter.loadTheme(lightTheme);
  }
  if (!loadedThemes.includes(SHIKI_THEMES.dark)) {
    await highlighter.loadTheme(darkTheme);
  }

  return highlighter.codeToHtml(String(code), {
    lang: resolvedLanguage.id,
    themes: SHIKI_THEMES,
    defaultColor: false,
  });
};

export type CodeBlockShikiProps = {
  children: ReactNode;
  lang: CodeLanguage;
};

export const CodeBlockShiki: FC<CodeBlockShikiProps> = ({ children, lang }) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    highlightCode(children, lang)
      .then((result) => {
        if (!isCancelled) setHtml(result);
      })
      .catch((error) => {
        console.error('Failed to highlight code:', error);
        if (!isCancelled) setHtml('');
      });

    return () => {
      isCancelled = true;
    };
  }, [children, lang]);

  return (
    <div className={shikiWrapperClassName}>
      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki generates safe HTML for code highlighting
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <CodeDefault>{children}</CodeDefault>
      )}
    </div>
  );
};
