import { transformSync } from '@babel/core';
import { describe, expect, it } from 'vitest';
import {
  buildNestedRenameMapFromContent,
  generateShortFieldName,
  makeFieldRenameBabelPlugin,
} from './babel-plugin-intlayer-field-rename';
import {
  createPruneContext,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';
import { BABEL_PARSER_OPTIONS } from './transformers';

// ── Helpers ────────────────────────────────────────────────────────────────────

const makeContext = (
  dictionaryKey: string,
  fieldRenameMap: PruneContext['dictionaryKeyToFieldRenameMap']
): PruneContext => {
  const ctx = createPruneContext();
  ctx.dictionaryKeyToFieldRenameMap = fieldRenameMap;
  return ctx;
};

const rename = (
  code: string,
  pruneContext: PruneContext,
  filePath = '/app/src/Component.tsx'
): string | null => {
  const result = transformSync(code, {
    filename: filePath,
    plugins: [makeFieldRenameBabelPlugin(pruneContext)],
    parserOpts: BABEL_PARSER_OPTIONS,
    babelrc: false,
    configFile: false,
  });
  return result?.code ?? null;
};

// ── generateShortFieldName ────────────────────────────────────────────────────

describe('generateShortFieldName', () => {
  it('generates single-letter names for 0-25', () => {
    expect(generateShortFieldName(0)).toBe('a');
    expect(generateShortFieldName(1)).toBe('b');
    expect(generateShortFieldName(25)).toBe('z');
  });

  it('generates two-letter names for 26+', () => {
    expect(generateShortFieldName(26)).toBe('aa');
    expect(generateShortFieldName(27)).toBe('ab');
    expect(generateShortFieldName(51)).toBe('az');
    expect(generateShortFieldName(52)).toBe('ba');
  });
});

// ── buildNestedRenameMapFromContent ───────────────────────────────────────────

describe('buildNestedRenameMapFromContent', () => {
  it('builds a flat rename map for a plain object', () => {
    const content = { title: 'Hello', description: 'World' };
    const map = buildNestedRenameMapFromContent(content);

    // Keys are sorted alphabetically: description → 'a', title → 'b'
    expect(map.get('description')?.shortName).toBe('a');
    expect(map.get('title')?.shortName).toBe('b');
  });

  it('filters by usedFieldFilter', () => {
    const content = { title: 'Hello', description: 'World', unused: 'X' };
    const map = buildNestedRenameMapFromContent(
      content,
      new Set(['title', 'description'])
    );

    expect(map.has('title')).toBe(true);
    expect(map.has('description')).toBe(true);
    expect(map.has('unused')).toBe(false);
  });

  it('descends into translation nodes', () => {
    const content = {
      nodeType: 'translation',
      translation: {
        en: { title: 'Hello', body: 'Text' },
        fr: { title: 'Bonjour', body: 'Texte' },
      },
    };
    const map = buildNestedRenameMapFromContent(content);

    // body → 'a', title → 'b' (sorted)
    expect(map.get('body')?.shortName).toBe('a');
    expect(map.get('title')?.shortName).toBe('b');
  });

  it('returns an empty map for primitives', () => {
    expect(buildNestedRenameMapFromContent('string')).toEqual(new Map());
    expect(buildNestedRenameMapFromContent(42)).toEqual(new Map());
    expect(buildNestedRenameMapFromContent(null)).toEqual(new Map());
  });

  it('returns an empty map for arrays', () => {
    expect(buildNestedRenameMapFromContent([1, 2, 3])).toEqual(new Map());
  });

  it('returns an empty map for non-translation runtime nodes', () => {
    const content = { nodeType: 'enumeration', data: {} };
    expect(buildNestedRenameMapFromContent(content)).toEqual(new Map());
  });

  it('treats any object with nodeType as a runtime node and returns empty map', () => {
    // Any object with a `nodeType` string field is considered an intlayer
    // runtime node. Unknown runtime nodes (neither translation nor other
    // handled types) return an empty map — nothing is renamed.
    const content = { nodeType: 'custom', title: 'Hello' };
    const map = buildNestedRenameMapFromContent(content);
    expect(map.has('nodeType')).toBe(false);
    expect(map.has('title')).toBe(false);
    expect(map.size).toBe(0);
  });
});

// ── makeFieldRenameBabelPlugin ────────────────────────────────────────────────

describe('makeFieldRenameBabelPlugin', () => {
  const buildSimpleRenameMap =
    (): PruneContext['dictionaryKeyToFieldRenameMap'] => {
      const fieldRenameMap = buildNestedRenameMapFromContent({
        description: 'x',
        title: 'y',
      });
      // description → 'a', title → 'b'
      return new Map([['homepage', fieldRenameMap]]);
    };

  describe('destructuring pattern', () => {
    it('renames shorthand destructuring { title } → { b: title }', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const { title, description } = useIntlayer('homepage');
      `;
      const output = rename(code, ctx);
      expect(output).toContain('b: title');
      expect(output).toContain('a: description');
      // Original names (as values) must still be present
      expect(output).toContain('title');
      expect(output).toContain('description');
    });

    it('renames keyed destructuring { title: t } → { b: t }', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const { title: t } = useIntlayer('homepage');
      `;
      const output = rename(code, ctx);
      expect(output).toContain('b: t');
    });
  });

  describe('direct member access', () => {
    it('renames useIntlayer().title → useIntlayer().b', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const t = useIntlayer('homepage').title;
      `;
      const output = rename(code, ctx);
      expect(output).toContain('.b');
      expect(output).not.toMatch(/\.title\b/);
    });

    it('renames optional chaining useIntlayer()?.title → useIntlayer()?.b', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const t = useIntlayer('homepage')?.title;
      `;
      const output = rename(code, ctx);
      expect(output).toContain('?.b');
    });
  });

  describe('plain variable binding', () => {
    it('renames member accesses on the bound variable', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        console.log(content.title);
      `;
      const output = rename(code, ctx);
      expect(output).toContain('content.b');
      expect(output).not.toMatch(/content\.title\b/);
    });
  });

  describe('no-op cases', () => {
    it('leaves code unchanged when no rename map entry exists for the key', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const { title } = useIntlayer('other-key');
      `;
      const output = rename(code, ctx);
      // 'other-key' has no rename entry — title must remain
      expect(output).toContain('title');
    });

    it('leaves code unchanged when no rename map is populated at all', () => {
      const ctx = createPruneContext(); // empty rename map
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const { title } = useIntlayer('homepage');
      `;
      const output = rename(code, ctx);
      expect(output).toContain('title');
    });
  });

  describe('aliased imports', () => {
    it('renames fields accessed via aliased caller', () => {
      const ctx = makeContext('homepage', buildSimpleRenameMap());
      const code = `
        import { useIntlayer as t } from 'react-intlayer';
        const { title } = t('homepage');
      `;
      const output = rename(code, ctx);
      expect(output).toContain('b: title');
    });
  });
});
