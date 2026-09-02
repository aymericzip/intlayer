import { describe, expect, it } from 'vitest';
import {
  bundledLanguages,
  bundledThemes,
  createHighlighter,
} from './shikiBundle';
import {
  type CodeLanguage,
  grammarAliases,
  resolveCodeLanguage,
  type ShikiLanguageId,
  shikiLanguageIds,
} from './shikiLanguages';
import { SHIKI_THEMES } from './shikiThemes';

/** Every fence name the code block components accept. */
const everyLanguageName: CodeLanguage[] = [
  ...shikiLanguageIds,
  ...(Object.keys(grammarAliases) as CodeLanguage[]),
  'plaintext',
  'text',
  'txt',
];

describe('shikiBundle', () => {
  it('exposes a loader for every canonical language id', () => {
    for (const languageId of shikiLanguageIds) {
      expect(bundledLanguages[languageId]).toBeTypeOf('function');
    }
  });

  it('points every alias at the loader of the grammar that owns it', () => {
    for (const [alias, canonicalId] of Object.entries(grammarAliases)) {
      expect(bundledLanguages[alias as keyof typeof bundledLanguages]).toBe(
        bundledLanguages[canonicalId as ShikiLanguageId]
      );
    }
  });

  it('bundles exactly the two themes code blocks are rendered with', () => {
    expect(Object.keys(bundledThemes).sort()).toEqual(
      [SHIKI_THEMES.light, SHIKI_THEMES.dark].sort()
    );
  });

  it('bundles no theme beyond those two', () => {
    expect(Object.keys(bundledThemes)).toHaveLength(2);
  });

  // A fine-grained bundle throws `Language … is not included in this bundle`
  // instead of falling back, so every name a code block can be given has to
  // survive the round trip the components actually make: resolve the fence
  // name, then hand the resolved id to Shiki.
  it('highlights every accepted language name in both themes', async () => {
    const highlighter = await createHighlighter({ langs: [], themes: [] });
    await highlighter.loadTheme(SHIKI_THEMES.light, SHIKI_THEMES.dark);

    for (const languageName of everyLanguageName) {
      const { id, loadGrammar } = resolveCodeLanguage(languageName);

      if (loadGrammar) await highlighter.loadLanguage(id);

      const html = highlighter.codeToHtml('const answer = 42', {
        lang: id,
        themes: SHIKI_THEMES,
        defaultColor: false,
      });

      expect(html, `failed to highlight \`${languageName}\``).toContain(
        '--shiki-light'
      );
      expect(html, `failed to highlight \`${languageName}\``).toContain(
        '--shiki-dark'
      );
    }
  }, 60_000);
});
