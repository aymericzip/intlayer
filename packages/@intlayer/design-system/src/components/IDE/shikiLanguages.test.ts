import { describe, expect, it } from 'vitest';
import {
  type CodeLanguage,
  resolveCodeLanguage,
  shikiLanguageIds,
} from './shikiLanguages';

/** Languages used by the documentation code fences. */
const DOCUMENTATION_LANGUAGES: CodeLanguage[] = [
  'astro',
  'bash',
  'dart',
  'html',
  'javascript',
  'js',
  'json',
  'json5',
  'jsx',
  'lua',
  'markdown',
  'plaintext',
  'sh',
  'svelte',
  'text',
  'toml',
  'ts',
  'tsx',
  'txt',
  'typescript',
  'vue',
  'xml',
  'yaml',
];

describe('resolveCodeLanguage', () => {
  it('keeps canonical language ids untouched', () => {
    expect(resolveCodeLanguage('toml').id).toBe('toml');
    expect(resolveCodeLanguage('typescript').id).toBe('typescript');
  });

  it('maps aliases to the grammar that owns them', () => {
    expect(resolveCodeLanguage('ts').id).toBe('typescript');
    expect(resolveCodeLanguage('mjs').id).toBe('javascript');
    expect(resolveCodeLanguage('jsx').id).toBe('tsx');
    expect(resolveCodeLanguage('sh').id).toBe('bash');
    expect(resolveCodeLanguage('yml').id).toBe('yaml');
  });

  it('normalizes casing and surrounding whitespace', () => {
    expect(resolveCodeLanguage(' TOML ').id).toBe('toml');
  });

  it('falls back to plain text — never to another grammar — when unknown', () => {
    for (const unknownLanguage of ['brainfuck', '', undefined, null]) {
      const resolved = resolveCodeLanguage(unknownLanguage);

      expect(resolved.id).toBe('plaintext');
      expect(resolved.loadGrammar).toBeNull();
    }
  });

  it('needs no grammar for plain text languages', () => {
    for (const plainTextLanguage of ['plaintext', 'text', 'txt'] as const) {
      expect(resolveCodeLanguage(plainTextLanguage)).toEqual({
        id: 'plaintext',
        loadGrammar: null,
      });
    }
  });

  it.each(DOCUMENTATION_LANGUAGES)(
    'highlights the documentation language `%s`',
    (language) => {
      const { id, loadGrammar } = resolveCodeLanguage(language);

      if (['plaintext', 'text', 'txt'].includes(language)) {
        expect(id).toBe('plaintext');
        return;
      }

      expect(loadGrammar).not.toBeNull();
      expect(id).not.toBe('plaintext');
    }
  );

  it.each(shikiLanguageIds)(
    'loads a grammar registered under the id `%s`',
    async (language) => {
      const { id, loadGrammar } = resolveCodeLanguage(language);

      expect(loadGrammar).not.toBeNull();

      const grammar = (await loadGrammar?.())?.default ?? [];
      const grammarNames = grammar.flatMap((registration) => [
        registration.name,
        ...(registration.aliases ?? []),
      ]);

      // Shiki resolves `codeToHtml({ lang: id })` against the names the loaded
      // grammar registers — a mismatch here is what throws `Language not found`.
      expect(grammarNames).toContain(id);
    }
  );
});
