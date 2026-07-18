import { transformSync } from '@babel/core';
import { describe, expect, it } from 'vitest';
import {
  type CompatCallerConfig,
  createPruneContext,
  makeUsageAnalyzerBabelPlugin,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';
import { BABEL_PARSER_OPTIONS } from './transformers';

const analyze = (
  code: string,
  filePath = '/app/src/Component.tsx',
  compatCallers?: CompatCallerConfig[]
): PruneContext => {
  const pruneContext = createPruneContext();

  transformSync(code, {
    filename: filePath,
    plugins: [makeUsageAnalyzerBabelPlugin(pruneContext, { compatCallers })],
    parserOpts: BABEL_PARSER_OPTIONS,
    babelrc: false,
    configFile: false,
    code: false,
  });

  return pruneContext;
};

/** Caller configs matching what `@intlayer/react-i18next/plugin` injects. */
const REACT_I18NEXT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'useTranslation',
    library: 'react-i18next',
    importSources: [
      'react-i18next',
      '@intlayer/react-i18next',
      'next-i18next',
      '@intlayer/next-i18next',
    ],
    namespaceSources: [{ from: 'argument', index: 0 }],
    keyPrefixSources: [
      { from: 'option', argumentIndex: 1, property: 'keyPrefix' },
    ],
    translationFunction: 'destructured-t',
  },
];

/** Caller configs matching what `@intlayer/next-intl/plugin` would inject. */
const NEXT_INTL_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'useTranslations',
    library: 'next-intl',
    importSources: ['next-intl', '@intlayer/next-intl'],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'return-value',
  },
  {
    callerName: 'getTranslations',
    library: 'next-intl',
    importSources: [
      'next-intl/server',
      '@intlayer/next-intl/server',
      'next-intl',
      '@intlayer/next-intl',
    ],
    namespaceSources: [{ from: 'argument', index: 0 }],
    translationFunction: 'return-value',
  },
];

/** Caller configs matching what `@intlayer/i18next/plugin` injects. */
const I18NEXT_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'getFixedT',
    library: 'i18next',
    importSources: ['i18next', '@intlayer/i18next'],
    matchAsMethod: true,
    namespaceSources: [{ from: 'argument', index: 1 }],
    keyPrefixSources: [{ from: 'argument', index: 2 }],
    translationFunction: 'return-value',
  },
];

/** Caller configs matching what `@intlayer/vue-i18n/plugin` injects. */
const VUE_I18N_CALLERS: CompatCallerConfig[] = [
  {
    callerName: 'useI18n',
    library: 'vue-i18n',
    importSources: ['vue-i18n', '@intlayer/vue-i18n'],
    namespaceSources: [
      { from: 'option', argumentIndex: 0, property: 'namespace' },
    ],
    translationFunction: 'destructured-t',
  },
];

describe('makeUsageAnalyzerBabelPlugin', () => {
  describe('destructuring pattern', () => {
    it('records accessed fields from destructuring', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { title, description } = useIntlayer('homepage');
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('description');
      expect((usage as Set<string>).size).toBe(2);
    });

    it('records "all" when spread is used in destructuring', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { title, ...rest } = useIntlayer('homepage');
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });

    it('handles string literal keys in destructuring', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { 'my-field': myField } = useIntlayer('homepage');
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('my-field');
    });

    it('handles computed string-literal keys in destructuring', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { ['title']: myTitle } = useIntlayer('homepage');
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });

    it('records "all" for dynamic computed keys in destructuring', () => {
      // The accessed field cannot be attributed statically — recording the
      // key expression's variable name instead would mis-prune the dictionary.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const key = 'title';
        const { [key]: myTitle } = useIntlayer('homepage');
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });
  });

  describe('direct member access', () => {
    it('records field from useIntlayer().field', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const title = useIntlayer('homepage').title;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });

    it('records field from useIntlayer()?.field (optional chaining)', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const title = useIntlayer('homepage')?.title;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });

    it('records field from useIntlayer()["field"] (bracket notation)', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const title = useIntlayer('homepage')['title'];
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });

    it('records "all" for dynamic bracket access', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const key = 'title';
        const title = useIntlayer('homepage')[key];
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });
  });

  describe('plain variable binding', () => {
    it('records fields accessed via member expressions on the variable', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        console.log(content.title);
        console.log(content.description);
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('description');
    });

    it('records "all" when variable is passed as function argument', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        doSomething(content);
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });

    it('records "all" when the variable escapes into an array literal', () => {
      // Canonical meta-record / collection access pattern: the bindings are
      // collected into an array and their fields read through iteration, which
      // Babel cannot follow back to the dictionary. Pruning to the (empty) set
      // of statically-visible fields would wipe the content, so we keep all.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const appleWatch = useIntlayer('product', { id: 'apple-watch' });
        const airpods = useIntlayer('product', { id: 'airpods-pro' });
        [appleWatch, airpods].map((entry) => entry?.name);
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('product')).toBe('all');
    });
  });

  describe('getIntlayer support', () => {
    it('records fields from getIntlayer calls', () => {
      const ctx = analyze(`
        import { getIntlayer } from 'intlayer';
        const { title } = getIntlayer('homepage');
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });
  });

  describe('aliased imports', () => {
    it('tracks aliased caller names', () => {
      const ctx = analyze(`
        import { useIntlayer as t } from 'react-intlayer';
        const { title } = t('homepage');
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });
  });

  describe('multiple dictionary keys', () => {
    it('tracks usage for multiple different keys independently', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { title } = useIntlayer('homepage');
        const { label, placeholder } = useIntlayer('form');
      `);

      const homepageUsage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(homepageUsage).toBeInstanceOf(Set);
      expect(homepageUsage as Set<string>).toContain('title');

      const formUsage = ctx.dictionaryKeyToFieldUsageMap.get('form');
      expect(formUsage).toBeInstanceOf(Set);
      expect(formUsage as Set<string>).toContain('label');
      expect(formUsage as Set<string>).toContain('placeholder');
    });

    it('merges field sets across multiple call sites for the same key', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { title } = useIntlayer('homepage');
        const { description } = useIntlayer('homepage');
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('description');
    });

    it('upgrades to "all" if any call site cannot be analysed', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { title } = useIntlayer('homepage');
        const content = useIntlayer('homepage');
        doSomething(content);
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });
  });

  describe('no intlayer usage', () => {
    it('does not record anything for files with no intlayer imports', () => {
      const ctx = analyze(`
        import React from 'react';
        const App = () => <div>Hello</div>;
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.size).toBe(0);
    });
  });

  describe('bare call (discarded result)', () => {
    it('does not record any usage for bare calls with discarded result', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        useIntlayer('homepage');
      `);

      // Bare call contributes no usage info — the key should not appear in
      // the map (or may appear as an empty set depending on other call sites).
      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(
        usage === undefined || (usage instanceof Set && usage.size === 0)
      ).toBe(true);
    });
  });

  describe('SFC deferral', () => {
    it('registers Vue files in pendingFrameworkAnalysis for plain variable bindings', () => {
      const ctx = analyze(
        `
        import { useIntlayer } from 'vue-intlayer';
        const content = useIntlayer('homepage');
        `,
        '/app/src/Component.vue'
      );

      // The binding is deferred — not in the main usage map yet
      expect(ctx.pendingFrameworkAnalysis.has('/app/src/Component.vue')).toBe(
        true
      );
      const pending = ctx.pendingFrameworkAnalysis.get(
        '/app/src/Component.vue'
      )!;
      expect(pending.some((e) => e.dictionaryKey === 'homepage')).toBe(true);
    });

    it('registers Svelte files in pendingFrameworkAnalysis for plain variable bindings', () => {
      const ctx = analyze(
        `
        import { useIntlayer } from 'svelte-intlayer';
        const content = useIntlayer('homepage');
        `,
        '/app/src/Component.svelte'
      );

      expect(
        ctx.pendingFrameworkAnalysis.has('/app/src/Component.svelte')
      ).toBe(true);
    });

    it('registers Astro files in pendingFrameworkAnalysis for plain variable bindings', () => {
      // In Astro, the variable declared in the frontmatter is used in the
      // HTML template — invisible to Babel — so it must be deferred.
      const ctx = analyze(
        `
        import { getIntlayer } from 'intlayer';
        const content = getIntlayer('homepage', locale);
        `,
        '/app/src/pages/index.astro'
      );

      expect(
        ctx.pendingFrameworkAnalysis.has('/app/src/pages/index.astro')
      ).toBe(true);
      const pending = ctx.pendingFrameworkAnalysis.get(
        '/app/src/pages/index.astro'
      )!;
      expect(pending.some((e) => e.dictionaryKey === 'homepage')).toBe(true);
    });
  });

  describe('Solid / Angular signal accessor pattern', () => {
    it('records fields accessed via content().field', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const t = content().title;
        const d = content().description;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('description');
      expect((usage as Set<string>).size).toBe(2);
    });

    it('records fields accessed via content()?.field (optional chaining)', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const t = content()?.title;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });

    it('marks "all" when content() is passed opaquely (no field access)', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        doSomething(content());
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });

    it('marks "all" when content()[dynamicKey] is used', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const key = 'title';
        const t = content()[key];
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });

    it('mixes signal accessor with direct member access on the same key', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const a = content().title;
        const b = content().subtitle;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('subtitle');
    });

    it('records fields from destructuring the signal call', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const { title, description } = content();
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('description');
    });

    it('records fields from optional call expression', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const t = content?.().title;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
    });

    it('records fields accessed via content.field (new proxy-based API)', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const t = content.title;
        const d = content.description;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('description');
      expect((usage as Set<string>).size).toBe(2);
    });

    it('marks "all" when variable is destructured (secondary destructuring cannot be statically traced)', () => {
      // const { title } = content uses the variable in init position of a
      // VariableDeclarator — the analyzer conservatively marks 'all' here because
      // tracking fields through secondary destructuring of a bound variable would
      // require a deeper analysis pass. The prune plugin then keeps all fields.
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const { title, description } = content;
      `);

      expect(ctx.dictionaryKeyToFieldUsageMap.get('homepage')).toBe('all');
    });

    it('mixes new proxy API with legacy signal accessor on the same key', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'solid-intlayer';
        const content = useIntlayer('homepage');
        const a = content.title;
        const b = content().subtitle;
      `);

      const usage = ctx.dictionaryKeyToFieldUsageMap.get('homepage');
      expect(usage).toBeInstanceOf(Set);
      expect(usage as Set<string>).toContain('title');
      expect(usage as Set<string>).toContain('subtitle');
    });
  });

  describe('opaque consumption detection', () => {
    /** Collects the recorded opaque field paths for a dictionary key. */
    const getOpaqueFieldPaths = (
      ctx: PruneContext,
      dictionaryKey: string
    ): string[][] =>
      [
        ...(ctx.dictionaryKeysWithOpaqueFields.get(dictionaryKey)?.values() ??
          []),
      ].map((occurrence) => occurrence.fieldPath);

    it('marks a top-level field passed as a function argument', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        renderCard(content.hero);
      `);

      expect(getOpaqueFieldPaths(ctx, 'homepage')).toContainEqual(['hero']);
    });

    it('marks the terminal of a deep member chain — not the top-level field', () => {
      // <Card data={content.sections.hero} /> equivalent: the escaping value
      // is sections.hero, so only ITS children must keep their names —
      // renames elsewhere under sections stay possible.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        renderCard(content.sections.hero);
      `);

      const opaqueFieldPaths = getOpaqueFieldPaths(ctx, 'homepage');
      expect(opaqueFieldPaths).toContainEqual(['sections', 'hero']);
      expect(opaqueFieldPaths).not.toContainEqual(['sections']);
    });

    it('records the full path when a leaf value escapes (harmless to clear)', () => {
      // Leaf values have no children, so clearing the recorded path is a
      // no-op — but the intermediate fields must NOT be marked opaque.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        console.log(content.sections.hero.title);
      `);

      const opaqueFieldPaths = getOpaqueFieldPaths(ctx, 'homepage');
      expect(opaqueFieldPaths).toContainEqual(['sections', 'hero', 'title']);
      expect(opaqueFieldPaths).not.toContainEqual(['sections', 'hero']);
      expect(opaqueFieldPaths).not.toContainEqual(['sections']);
    });

    it('marks values escaping through secondary destructuring', () => {
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { section } = useIntlayer('homepage');
        const { modal } = section;
        renderModal(modal);
      `);

      expect(getOpaqueFieldPaths(ctx, 'homepage')).toContainEqual([
        'section',
        'modal',
      ]);
    });

    it('marks the current path on dynamic computed access along a chain', () => {
      // content.hero[key] — the renamer cannot rewrite the dynamic key, so
      // hero's children must keep their original names.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        const key = 'title';
        const value = content.hero[key];
      `);

      expect(getOpaqueFieldPaths(ctx, 'homepage')).toContainEqual(['hero']);
    });

    it('marks the parent path when secondary destructuring uses a rest element', () => {
      // const { title, ...rest } = section — rest re-exposes the remaining
      // fields under their original names.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const { section } = useIntlayer('homepage');
        const { title, ...rest } = section;
      `);

      expect(getOpaqueFieldPaths(ctx, 'homepage')).toContainEqual(['section']);
    });

    it('does not mark destructuring at the end of a chain as opaque', () => {
      // const { title } = content.hero — fully rewritable by the renamer, so
      // nothing must be marked opaque.
      const ctx = analyze(`
        import { useIntlayer } from 'react-intlayer';
        const content = useIntlayer('homepage');
        const { title } = content.hero;
      `);

      expect(ctx.dictionaryKeysWithOpaqueFields.has('homepage')).toBe(false);
    });
  });

  describe('compat namespace callers', () => {
    describe('react-i18next / next-i18next — useTranslation', () => {
      it('records the first path segment of each t() call as a top-level field', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          const a = t('counter.label');
          const b = t('title');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('counter');
        expect(usage as Set<string>).toContain('title');
        expect((usage as Set<string>).size).toBe(2);
      });

      it('marks the dictionary as skipping field rename', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          t('counter.label');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        expect(ctx.dictionariesSkippingFieldRename.has('about')).toBe(true);
      });

      it('also matches the @intlayer/react-i18next adapter import', () => {
        const ctx = analyze(
          `
          import { useTranslation } from '@intlayer/react-i18next';
          const { t } = useTranslation('about');
          t('counter.label');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('counter');
      });

      it('matches the next-i18next import source', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'next-i18next';
          const { t } = useTranslation('about');
          t('hero.title');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('hero');
      });

      it('honours a static keyPrefix and uses its first segment as the field', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about', { keyPrefix: 'counter' });
          t('label');
          t('value');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('counter');
        expect((usage as Set<string>).size).toBe(1);
      });

      it('falls back to the "translation" namespace when none is given', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation();
          t('greeting');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('translation');
        expect(usage as Set<string>).toContain('greeting');
      });

      it('marks "all" when t is passed opaquely to another function', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          renderWith(t);
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('about')).toBe('all');
      });

      it('marks "all" when a t() key is computed dynamically', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          t(dynamicKey);
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('about')).toBe('all');
      });

      it('does not match useTranslation imported from an unrelated module', () => {
        const ctx = analyze(
          `
          import { useTranslation } from './my-custom-hook';
          const { t } = useTranslation('about');
          t('counter.label');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.has('about')).toBe(false);
      });

      it('resolves a static template-literal first segment', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          t(\`items.\${index}\`);
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('items');
      });

      it('marks "all" when the template-literal first segment is dynamic', () => {
        const ctx = analyze(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          t(\`\${section}.label\`);
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('about')).toBe('all');
      });
    });

    describe('next-intl — useTranslations / getTranslations', () => {
      it('records fields from a directly-returned t (client)', () => {
        const ctx = analyze(
          `
          import { useTranslations } from 'next-intl';
          const t = useTranslations('about');
          t('counter.label');
          t('title');
        `,
          undefined,
          NEXT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('counter');
        expect(usage as Set<string>).toContain('title');
      });

      it('records fields from an awaited getTranslations (server)', () => {
        const ctx = analyze(
          `
          import { getTranslations } from 'next-intl/server';
          const t = await getTranslations('about');
          t('hero.title');
        `,
          undefined,
          NEXT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('hero');
      });

      it('reads the namespace from the object form of getTranslations', () => {
        const ctx = analyze(
          `
          import { getTranslations } from 'next-intl/server';
          const t = await getTranslations({ locale: 'en', namespace: 'about' });
          t('hero.title');
        `,
          undefined,
          NEXT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('hero');
      });

      it('splits a nested namespace into dictionary key and prefix field', () => {
        const ctx = analyze(
          `
          import { useTranslations } from 'next-intl';
          const t = useTranslations('about.counter');
          t('label');
          t('increment');
        `,
          undefined,
          NEXT_INTL_CALLERS
        );

        // dictionary 'about', consumed top-level field 'counter'
        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('counter');
        expect((usage as Set<string>).size).toBe(1);
        expect(ctx.dictionaryKeyToFieldUsageMap.has('about.counter')).toBe(
          false
        );
        expect(ctx.dictionariesSkippingFieldRename.has('about')).toBe(true);
      });

      it('uses only the first prefix segment of a deeply nested namespace', () => {
        const ctx = analyze(
          `
          import { useTranslations } from 'next-intl';
          const t = useTranslations('about.counter.controls');
          t('label');
        `,
          undefined,
          NEXT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('counter');
        expect((usage as Set<string>).size).toBe(1);
      });
    });

    describe('i18next — getFixedT', () => {
      it('reads the namespace from the second argument (method call)', () => {
        const ctx = analyze(
          `
          import i18next from 'i18next';
          const t = i18next.getFixedT(null, 'about');
          t('counter.label');
        `,
          undefined,
          I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('counter');
      });

      it('honours the keyPrefix third argument', () => {
        const ctx = analyze(
          `
          import i18next from 'i18next';
          const t = i18next.getFixedT(null, 'about', 'counter');
          t('label');
        `,
          undefined,
          I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('counter');
        expect((usage as Set<string>).size).toBe(1);
      });
    });

    describe('vue-i18n — useI18n (SFC safety)', () => {
      it('marks "all" for SFC files because t may be used in the template', () => {
        const ctx = analyze(
          `
          import { useI18n } from 'vue-i18n';
          const { t } = useI18n({ namespace: 'about' });
          const label = t('counter.label');
        `,
          '/app/src/Component.vue',
          VUE_I18N_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('about')).toBe('all');
        expect(ctx.dictionariesSkippingFieldRename.has('about')).toBe(true);
      });

      it('reads the namespace from the options object in a plain TS file', () => {
        const ctx = analyze(
          `
          import { useI18n } from 'vue-i18n';
          const { t } = useI18n({ namespace: 'about' });
          t('counter.label');
        `,
          undefined,
          VUE_I18N_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage as Set<string>).toContain('counter');
      });
    });

    describe('interaction with native intlayer usage', () => {
      it('merges compat and native field usage for the same dictionary', () => {
        const ctx = analyze(
          `
          import { useIntlayer } from 'react-intlayer';
          import { useTranslation } from 'react-i18next';
          const { title } = useIntlayer('about');
          const { t } = useTranslation('about');
          t('counter.label');
        `,
          undefined,
          REACT_I18NEXT_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('title');
        expect(usage as Set<string>).toContain('counter');
      });
    });

    describe('lingui — i18n._ / i18n.t (translationFunction: self)', () => {
      // Mirrors compat/lingui/src/plugin: lingui catalogs are flat, so the whole
      // dotted id is the consumed field (`flatKey: true`).
      const LINGUI_CALLERS: CompatCallerConfig[] = [
        {
          callerName: '_',
          library: 'lingui',
          importSources: ['@lingui/core', '@intlayer/lingui'],
          matchAsMethod: true,
          namespaceSources: [{ from: 'fixed', value: 'messages' }],
          translationFunction: 'self',
          flatKey: true,
        },
        {
          callerName: 't',
          library: 'lingui',
          importSources: ['@lingui/core', '@intlayer/lingui'],
          matchAsMethod: true,
          namespaceSources: [{ from: 'fixed', value: 'messages' }],
          translationFunction: 'self',
          flatKey: true,
        },
      ];

      it('records the full flat dotted key from a string id (i18n._)', () => {
        const ctx = analyze(
          `
          const result = i18n._('results-table.bundleSize', { name: 'Alice' });
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('results-table.bundleSize');
        // The first-segment must NOT be recorded — it is not a real catalog key.
        expect(usage as Set<string>).not.toContain('results-table');
      });

      it('records the top-level key for a flat id without dots (i18n._)', () => {
        const ctx = analyze(
          `
          const result = i18n._('greeting');
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('greeting');
      });

      it('records the full flat dotted key from a descriptor id', () => {
        const ctx = analyze(
          `
          const result = i18n._({ id: 'home.title', message: 'Welcome' });
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('home.title');
        expect(usage as Set<string>).not.toContain('home');
      });

      it('records "all" for a dynamic id (hashed macro output)', () => {
        const ctx = analyze(
          `
          const hashId = computeId();
          i18n._(hashId, { name: 'Bob' });
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('messages')).toBe('all');
      });

      it('records "all" for a descriptor with a dynamic id', () => {
        const ctx = analyze(
          `
          i18n._({ id: computeId(), message: 'Fallback' });
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('messages')).toBe('all');
      });

      it('merges multiple static i18n._ calls into the messages field set', () => {
        const ctx = analyze(
          `
          i18n._('home.title');
          i18n._('about.description');
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('home.title');
        expect(usage as Set<string>).toContain('about.description');
      });

      it('tracks i18n.t as an alias for i18n._', () => {
        const ctx = analyze(
          `
          i18n.t('home.title');
        `,
          '/app/src/Component.tsx',
          LINGUI_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('home.title');
      });
    });

    describe('translationFunction: all', () => {
      it('marks the entire dictionary as used without tracking fields', () => {
        const ctx = analyze(
          `
          import { useAllDictionary } from 'some-lib';
          const t = useAllDictionary('catalog');
        `,
          '/app/src/Component.tsx',
          [
            {
              callerName: 'useAllDictionary',
              library: 'test',
              importSources: ['some-lib'],
              namespaceSources: [{ from: 'argument', index: 0 }],
              translationFunction: 'all',
            },
          ]
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('catalog')).toBe('all');
      });
    });

    describe('namespaceSources: [{ from: fixed }]', () => {
      it('always resolves to the configured fixed namespace value', () => {
        const ctx = analyze(
          `
          myLib.translate('greeting');
        `,
          '/app/src/Component.tsx',
          [
            {
              callerName: 'translate',
              library: 'test',
              importSources: ['my-lib'],
              matchAsMethod: true,
              namespaceSources: [{ from: 'fixed', value: 'global-messages' }],
              translationFunction: 'self',
            },
          ]
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('global-messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('greeting');
      });

      it('records only the first segment of a dotted key when flatKey is unset', () => {
        const ctx = analyze(
          `
          myLib.translate('home.title');
        `,
          '/app/src/Component.tsx',
          [
            {
              callerName: 'translate',
              library: 'test',
              importSources: ['my-lib'],
              matchAsMethod: true,
              namespaceSources: [{ from: 'fixed', value: 'global-messages' }],
              translationFunction: 'self',
            },
          ]
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('global-messages');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('home');
        expect(usage as Set<string>).not.toContain('home.title');
      });
    });

    describe('react-intl — formatMessage (namespace: path-first-segment)', () => {
      const REACT_INTL_CALLERS: CompatCallerConfig[] = [
        {
          callerName: 'formatMessage',
          library: 'react-intl',
          importSources: ['react-intl', '@intlayer/react-intl'],
          matchAsMethod: true,
          namespaceSources: [{ from: 'path-first-segment' }],
          translationFunction: 'self',
        },
      ];

      it('extracts dictionaryKey from the first segment and field from the second', () => {
        const ctx = analyze(
          `
          const result = intl.formatMessage({ id: 'home.title' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('title');
      });

      it('records values argument does not affect field resolution', () => {
        const ctx = analyze(
          `
          intl.formatMessage({ id: 'home.title' }, { name: 'Alice' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('title');
      });

      it('records "all" for a single-segment id (id equals dict key)', () => {
        const ctx = analyze(
          `
          intl.formatMessage({ id: 'greeting' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.get('greeting')).toBe('all');
      });

      it('records "all" for a dynamic descriptor id', () => {
        const ctx = analyze(
          `
          intl.formatMessage({ id: computeId() });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        // dictionaryKey is dynamic → cannot resolve → no entry recorded
        expect(ctx.dictionaryKeyToFieldUsageMap.size).toBe(0);
      });

      it('records "all" for a dynamic first argument', () => {
        const ctx = analyze(
          `
          const descriptor = buildDescriptor();
          intl.formatMessage(descriptor);
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.size).toBe(0);
      });

      it('handles deep paths by recording only the second segment as the field', () => {
        const ctx = analyze(
          `
          intl.formatMessage({ id: 'home.banner.cta' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('banner');
        expect(usage as Set<string>).not.toContain('cta');
      });

      it('merges multiple formatMessage calls into the same dictionary', () => {
        const ctx = analyze(
          `
          intl.formatMessage({ id: 'home.title' });
          intl.formatMessage({ id: 'home.description' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('title');
        expect(usage as Set<string>).toContain('description');
      });

      it('handles calls across multiple dictionaries', () => {
        const ctx = analyze(
          `
          intl.formatMessage({ id: 'home.title' });
          intl.formatMessage({ id: 'about.subtitle' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        const homeUsage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(homeUsage).toBeInstanceOf(Set);
        expect(homeUsage as Set<string>).toContain('title');

        const aboutUsage = ctx.dictionaryKeyToFieldUsageMap.get('about');
        expect(aboutUsage).toBeInstanceOf(Set);
        expect(aboutUsage as Set<string>).toContain('subtitle');
      });

      it('also works when formatMessage is called as a plain function via method-match', () => {
        const ctx = analyze(
          `
          const myIntl = getIntlInstance();
          myIntl.formatMessage({ id: 'nav.links' });
        `,
          '/app/src/Component.tsx',
          REACT_INTL_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('nav');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('links');
      });
    });

    describe('react-intl — <FormattedMessage id> (jsxIdAttribute)', () => {
      const REACT_INTL_JSX_CALLERS: CompatCallerConfig[] = [
        {
          callerName: 'formatMessage',
          library: 'react-intl',
          importSources: ['react-intl', '@intlayer/react-intl'],
          matchAsMethod: true,
          namespaceSources: [{ from: 'path-first-segment' }],
          translationFunction: 'self',
        },
        {
          callerName: 'FormattedMessage',
          library: 'react-intl',
          importSources: ['react-intl', '@intlayer/react-intl'],
          jsxIdAttribute: 'id',
          namespaceSources: [{ from: 'path-first-segment' }],
          translationFunction: 'self',
        },
      ];

      it('records the field from a string-literal id attribute', () => {
        const ctx = analyze(
          `
          import { FormattedMessage } from 'react-intl';
          const App = () => <FormattedMessage id="home.title" />;
        `,
          '/app/src/Component.tsx',
          REACT_INTL_JSX_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('title');
      });

      it('records the field from an expression-container id attribute', () => {
        const ctx = analyze(
          `
          import { FormattedMessage } from 'react-intl';
          const App = () => <FormattedMessage id={'home.subtitle'} values={{ name }} />;
        `,
          '/app/src/Component.tsx',
          REACT_INTL_JSX_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        expect(usage as Set<string>).toContain('subtitle');
      });

      it('does not track JSX callers that are not imported from a configured source', () => {
        const ctx = analyze(
          `
          import { FormattedMessage } from 'some-other-lib';
          const App = () => <FormattedMessage id="home.title" />;
        `,
          '/app/src/Component.tsx',
          REACT_INTL_JSX_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.has('home')).toBe(false);
      });

      it('skips a dynamic id attribute (leaves dictionary untracked)', () => {
        const ctx = analyze(
          `
          import { FormattedMessage } from 'react-intl';
          const App = ({ id }) => <FormattedMessage id={id} />;
        `,
          '/app/src/Component.tsx',
          REACT_INTL_JSX_CALLERS
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.size).toBe(0);
      });

      it('merges fields used via JSX and via formatMessage on the same dictionary', () => {
        const ctx = analyze(
          `
          import { FormattedMessage, useIntl } from 'react-intl';
          const App = () => {
            const intl = useIntl();
            const label = intl.formatMessage({ id: 'home.description' });
            return <FormattedMessage id="home.title" />;
          };
        `,
          '/app/src/Component.tsx',
          REACT_INTL_JSX_CALLERS
        );

        const usage = ctx.dictionaryKeyToFieldUsageMap.get('home');
        expect(usage).toBeInstanceOf(Set);
        // Both the JSX-only field and the formatMessage field must be kept,
        // otherwise the <FormattedMessage> lookup would break at runtime.
        expect(usage as Set<string>).toContain('title');
        expect(usage as Set<string>).toContain('description');
      });

      it('adds the dictionary to dictionariesSkippingFieldRename', () => {
        const ctx = analyze(
          `
          import { FormattedMessage } from 'react-intl';
          const App = () => <FormattedMessage id="home.title" />;
        `,
          '/app/src/Component.tsx',
          REACT_INTL_JSX_CALLERS
        );

        expect(ctx.dictionariesSkippingFieldRename.has('home')).toBe(true);
      });
    });

    describe('disabling compat analysis', () => {
      it('ignores compat callers when compatCallers is an empty array', () => {
        const ctx = createPruneContext();
        transformSync(
          `
          import { useTranslation } from 'react-i18next';
          const { t } = useTranslation('about');
          t('counter.label');
        `,
          {
            filename: '/app/src/Component.tsx',
            plugins: [makeUsageAnalyzerBabelPlugin(ctx, { compatCallers: [] })],
            parserOpts: BABEL_PARSER_OPTIONS,
            babelrc: false,
            configFile: false,
            code: false,
          }
        );

        expect(ctx.dictionaryKeyToFieldUsageMap.has('about')).toBe(false);
      });
    });
  });
});
