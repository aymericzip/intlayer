import { transformSync } from '@babel/core';
import { describe, expect, it } from 'vitest';
import {
  createPruneContext,
  makeUsageAnalyzerBabelPlugin,
  type PruneContext,
} from './babel-plugin-intlayer-usage-analyzer';
import { BABEL_PARSER_OPTIONS } from './transformers';

const analyze = (
  code: string,
  filePath = '/app/src/Component.tsx'
): PruneContext => {
  const pruneContext = createPruneContext();

  transformSync(code, {
    filename: filePath,
    plugins: [makeUsageAnalyzerBabelPlugin(pruneContext)],
    parserOpts: BABEL_PARSER_OPTIONS,
    babelrc: false,
    configFile: false,
    code: false,
  });

  return pruneContext;
};

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
  });
});
