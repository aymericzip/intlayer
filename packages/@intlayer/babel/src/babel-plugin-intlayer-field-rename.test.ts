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

  it('includes ALL fields — not just a filtered subset', () => {
    // Previously a usedFieldFilter parameter allowed filtering to a subset.
    // Now ALL fields are always included so the JSON rename and source-code
    // rename stay consistent regardless of which fields are consumed or pruned.
    const content = { title: 'Hello', description: 'World', unused: 'X' };
    const map = buildNestedRenameMapFromContent(content);

    // All three keys appear (sorted): description → 'a', title → 'b', unused → 'c'
    expect(map.has('title')).toBe(true);
    expect(map.has('description')).toBe(true);
    expect(map.has('unused')).toBe(true);
    expect(map.get('description')?.shortName).toBe('a');
    expect(map.get('title')?.shortName).toBe('b');
    expect(map.get('unused')?.shortName).toBe('c');
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
    // Arrays are treated as leaves.  Element fields are not traversed because
    // they may be accessed via .map()/.filter() callbacks which the
    // source-code rename walk cannot enter — renaming them in the JSON without
    // also renaming the callback parameter would cause runtime mismatches.
    expect(buildNestedRenameMapFromContent([1, 2, 3])).toEqual(new Map());
    expect(buildNestedRenameMapFromContent([{ sub: 'x' }])).toEqual(new Map());
  });

  it('array fields at object level get a rename entry with empty children', () => {
    // An array that is a VALUE of a plain-object key gets a short name for the
    // key itself, but the children map (element structure) stays empty.
    const content = {
      items: [{ label: 'A', value: 'B' }],
      title: 'Hello',
    };
    const map = buildNestedRenameMapFromContent(content);

    // Sorted top-level keys: items → 'a', title → 'b'
    expect(map.get('items')?.shortName).toBe('a');
    expect(map.get('title')?.shortName).toBe('b');

    // items children are empty — element fields are NOT traversed
    const itemsChildren = map.get('items')!.children;
    expect(itemsChildren.size).toBe(0);
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

  describe('deep / nested rename', () => {
    it('renames two levels deep via plain variable binding', () => {
      // content.header.subField — header has nested children
      const fieldRenameMap = buildNestedRenameMapFromContent({
        // sorted: footer → 'a', header → 'b'
        footer: 'leaf',
        header: { subField: 'value' },
      });
      // header.children: subField → 'a'
      const ctx = makeContext('page', new Map([['page', fieldRenameMap]]));
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('page');
        console.log(content.header.subField);
      `;
      const output = rename(code, ctx);
      // header → 'b', subField inside header → 'a'
      expect(output).toContain('content.b.a');
      expect(output).not.toMatch(/content\.header\b/);
      expect(output).not.toMatch(/\.subField\b/);
    });

    it('passes through array index; field names after the index are unchanged (empty children)', () => {
      // content.items[0].label — items is an array; its element fields are NOT
      // in the children map (arrays are treated as leaves), so the array key
      // itself gets renamed but sub-fields stay as-is.  This is intentional: if
      // element fields were renamed in the JSON they must also be renamed in
      // every callback that receives an element, which the rename walk cannot do.
      const fieldRenameMap = buildNestedRenameMapFromContent({
        // sorted: items → 'a', title → 'b'
        items: [{ label: 'A', value: 'B' }],
        title: 'Hello',
      });
      const ctx = makeContext('list', new Map([['list', fieldRenameMap]]));
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('list');
        const x = content.items[0].label;
        const y = content.items[1].value;
      `;
      const output = rename(code, ctx);
      // items → 'a' (the key is renamed)
      expect(output).not.toMatch(/\.items\b/);
      // [0]/[1] pass-through; element fields stay unchanged (children map is empty)
      expect(output).toContain('content.a[0].label');
      expect(output).toContain('content.a[1].value');
    });

    it('renames fields inside a nested object up to (but not inside) an array', () => {
      // header.items[0].subField — header and items are renamed; subField is
      // inside an array element and therefore left unchanged.
      const fieldRenameMap = buildNestedRenameMapFromContent({
        // sorted: header → 'a'
        header: {
          // sorted inside header: items → 'a', title → 'b'
          items: [{ subField: 'x' }],
          title: 'T',
        },
      });
      const ctx = makeContext('deep', new Map([['deep', fieldRenameMap]]));
      const code = `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('deep');
        const x = content.header.items[0].subField;
      `;
      const output = rename(code, ctx);
      // header → 'a', items → 'a'; [0] transparent; subField unchanged
      expect(output).toContain('content.a.a[0].subField');
      expect(output).not.toMatch(/\.header\b/);
      expect(output).not.toMatch(/\.items\b/);
    });

    it('two components consuming the same dictionary both rename consistently', () => {
      // Simulate two separate transform calls (component files) with the same
      // shared pruneContext.  Both must see consistent renames.
      const fieldRenameMap = buildNestedRenameMapFromContent({
        // sorted: footer → 'a', header → 'b'
        footer: 'F',
        header: 'H',
      });
      const ctx = makeContext('shared', new Map([['shared', fieldRenameMap]]));

      const codeA = `
        import { useIntlayer } from 'react-intlayer';
        const { header } = useIntlayer('shared');
      `;
      const codeB = `
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('shared');
        console.log(content.footer);
      `;

      const outputA = rename(codeA, ctx);
      const outputB = rename(codeB, ctx);

      // Component A: header → 'b'
      expect(outputA).toContain('b: header');
      // Component B: footer → 'a'
      expect(outputB).toContain('content.a');
      expect(outputB).not.toMatch(/content\.footer\b/);
    });
  });
});
