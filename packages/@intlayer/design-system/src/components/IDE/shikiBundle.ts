/**
 * Fine-grained Shiki bundle — a drop-in replacement for `shiki` and
 * `shiki/bundle/web`.
 *
 * Both of those entry points statically pull `@shikijs/themes` (~70 themes) in
 * full, and reference every grammar of their bundle (~220 and ~100
 * respectively). Bundlers that group a package into a single chunk — Nitro does
 * exactly that for `node_modules` — therefore emit ~10 MB of grammars and
 * themes even though only two themes and the languages of
 * {@link grammarLoaders} are ever asked for.
 *
 * This module rebuilds the same public surface on top of `@shikijs/core`, so
 * the module graph only ever contains what is actually reachable. Everything is
 * loaded on demand, exactly like the upstream bundles.
 *
 * @see https://shiki.style/guide/bundles#fine-grained-bundle
 */

import {
  createBundledHighlighter,
  createSingletonShorthands,
  guessEmbeddedLanguages,
} from '@shikijs/core';
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';
import {
  type GrammarLoader,
  grammarAliases,
  grammarLoaders,
  type ShikiLanguageAlias,
  type ShikiLanguageId,
} from './shikiLanguages';
import type { ShikiThemeId } from './shikiThemes';

/** Theme registrations, as default-exported by the `shiki/themes/*` modules. */
export type ThemeRegistration =
  typeof import('shiki/themes/github-dark.mjs')['default'];

/** Loads a single Shiki theme. */
export type ThemeLoader = () => Promise<{ default: ThemeRegistration }>;

/**
 * Alias ids pointed at the loader of the grammar that owns them, so that an
 * alias is enough to pull its grammar in — the way it is with the upstream
 * bundles, whose maps carry the same alias entries.
 */
const aliasLoaders = Object.fromEntries(
  Object.entries(grammarAliases).map(([alias, canonicalId]) => [
    alias,
    grammarLoaders[canonicalId as ShikiLanguageId],
  ])
) as Record<ShikiLanguageAlias, GrammarLoader>;

/** Every language id this bundle can highlight, aliases included. */
export const bundledLanguages = {
  ...grammarLoaders,
  ...aliasLoaders,
};

/** The two themes every code block is highlighted with. */
export const bundledThemes = {
  'github-light': () => import('shiki/themes/github-light.mjs'),
  'github-dark': () => import('shiki/themes/github-dark.mjs'),
} satisfies Record<ShikiThemeId, ThemeLoader>;

/** Language ids accepted by this bundle's highlighter. */
export type BundledLanguage = keyof typeof bundledLanguages;

/** Theme ids accepted by this bundle's highlighter. */
export type BundledTheme = keyof typeof bundledThemes;

/**
 * Creates a highlighter that resolves language and theme ids against this
 * bundle, loading each one the first time it is asked for.
 *
 * Ids still have to be the ones a grammar answers to — pass every fence name
 * through {@link resolveCodeLanguage} first, exactly as with `shiki`'s own
 * bundles.
 */
export const createHighlighter = createBundledHighlighter<
  BundledLanguage,
  BundledTheme
>({
  langs: bundledLanguages,
  themes: bundledThemes,
  engine: () => createOnigurumaEngine(import('shiki/wasm')),
});

/** Highlighter instance produced by {@link createHighlighter}. */
export type Highlighter = Awaited<ReturnType<typeof createHighlighter>>;

/**
 * Shorthands backed by a lazily created singleton highlighter — the same
 * `codeToHtml` / `codeToHast` / … functions `shiki` exports, restricted to this
 * bundle.
 */
export const {
  codeToHast,
  codeToHtml,
  codeToTokens,
  codeToTokensBase,
  codeToTokensWithThemes,
  getLastGrammarState,
  getSingletonHighlighter,
} = createSingletonShorthands<BundledLanguage, BundledTheme>(
  createHighlighter,
  {
    guessEmbeddedLanguages,
  }
);
