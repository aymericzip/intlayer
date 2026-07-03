import { resolve } from 'node:path';
import { transformSync } from '@babel/core';
import { describe, expect, it, vi } from 'vitest';
import {
  intlayerOptimizeBabelPlugin,
  type OptimizePluginOptions,
} from './babel-plugin-intlayer-optimize';

// Mock dependencies to avoid esbuild issues
vi.mock('@intlayer/config/utils', () => ({
  normalizePath: (path: string) => path.replace(/\\/g, '/'),
}));

vi.mock('@intlayer/engine/utils', () => ({
  getPathHash: (key: string) => `dicHash${key === 'app' ? '2' : ''}`,
}));

const transform = (
  code: string,
  options: Partial<OptimizePluginOptions> = {},
  filename = 'test.tsx'
) => {
  const defaultOptions: OptimizePluginOptions = {
    dictionariesDir: '/app/.intlayer/dictionaries',
    dictionariesEntryPath: '/app/.intlayer/dictionaries.mjs',
    dynamicDictionariesDir: '/app/.intlayer/dynamic_dictionaries',
    fetchDictionariesDir: '/app/.intlayer/fetch_dictionaries',
    dynamicDictionariesEntryPath: '/app/.intlayer/dynamic_dictionaries.mjs',
    fetchDictionariesEntryPath: '/app/.intlayer/fetch_dictionaries.mjs',
    unmergedDictionariesDir: '/app/.intlayer/unmerged_dictionaries',
    unmergedDictionariesEntryPath: '/app/.intlayer/unmerged_dictionaries.mjs',
    replaceDictionaryEntry: false,
    importMode: 'static',
    // Resolve like @babel/core resolves `filename`, so the filesList
    // inclusion check also matches on Windows.
    filesList: [resolve(filename)],
    dictionaryModeMap: {},
    ...options,
  };

  const result = transformSync(code, {
    filename,
    plugins: [[intlayerOptimizeBabelPlugin, defaultOptions]],
    babelrc: false,
    configFile: false,
  });

  return result?.code;
};

describe('babel-plugin-intlayer-optimize', () => {
  describe('React', () => {
    it('should transform static imports', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform dynamic imports', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.tsx'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
    });

    it('should transform dictionary-level dynamic overrides in static mode', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        {
          importMode: 'static',
          dictionaryModeMap: { 'locale-switcher': 'dynamic' },
        },
        '/app/src/page.tsx'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
    });

    it('should transform dictionary-level fetch overrides in static mode', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        {
          importMode: 'static',
          dictionaryModeMap: { 'locale-switcher': 'fetch' },
        },
        '/app/src/page.tsx'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_fetch from "../.intlayer/fetch_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_fetch, "locale-switcher");'
      );
    });

    it('should use a static dictionary during React SSR dynamic imports', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic', isServer: true },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "react-intlayer";'
      );
      expect(output).not.toContain('_dicHash_dyn');
      expect(output).not.toContain('useDictionaryDynamic');
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should use a static dictionary during React SSR dictionary-level dynamic overrides', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        {
          importMode: 'static',
          isServer: true,
          dictionaryModeMap: { 'locale-switcher': 'dynamic' },
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "react-intlayer";'
      );
      expect(output).not.toContain('_dicHash_dyn');
      expect(output).not.toContain('useDictionaryDynamic');
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform fetch imports', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'fetch' },
        '/app/src/page.tsx'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_fetch from "../.intlayer/fetch_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_fetch, "locale-switcher");'
      );
    });

    it('should keep dynamic overrides on the dynamic helper during SSR fetch mode', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        {
          importMode: 'fetch',
          isServer: true,
          dictionaryModeMap: { 'locale-switcher': 'dynamic' },
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
      expect(output).not.toContain('useDictionary as useIntlayer');
    });
  });

  describe('Svelte', () => {
    it('should transform static imports', () => {
      const code = `
        import { useIntlayer } from "svelte-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.svelte'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "svelte-intlayer";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform dynamic imports', () => {
      const code = `
        import { useIntlayer } from "svelte-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.svelte'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "svelte-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
    });
  });

  describe('Vue', () => {
    it('should transform static imports', () => {
      const code = `
        import { useIntlayer } from "vue-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.vue'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "vue-intlayer";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform dynamic imports', () => {
      const code = `
        import { useIntlayer } from "vue-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.vue'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "vue-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
    });
  });

  describe('Path Handling', () => {
    // Since we are running in a specific OS, we can't easily mock path.relative without partial mocking
    // But we can check if the generated paths are using forward slashes
    it('should use forward slashes in imports', () => {
      const code = `
          import { useIntlayer } from "react-intlayer";
          const t = useIntlayer("locale-switcher");
        `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/nested/page.tsx'
      );
      // Expected relative path from /app/src/nested/page.tsx to /app/.intlayer/dictionaries/locale-switcher.json
      // ../../.intlayer/dictionaries/locale-switcher.json
      expect(output).toContain(
        'import _dicHash from "../../.intlayer/dictionaries/locale-switcher.json"'
      );
    });
  });

  describe('getIntlayer', () => {
    it('should transform getIntlayer statically in static mode', () => {
      const code = `
        import { getIntlayer } from "intlayer";
        const t = getIntlayer("app");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash2 from "../.intlayer/dictionaries/app.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { getDictionary as getIntlayer } from "intlayer";'
      );
      expect(output).toContain('const t = getIntlayer(_dicHash2);');
    });

    it('should use the dynamic .mjs import for getIntlayer in dynamic mode to avoid JSON attribute conflict', () => {
      const code = `
        import { getIntlayer } from "intlayer";
        const t = getIntlayer("app");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.tsx'
      );
      // Must NOT create a raw JSON import (would conflict with app.mjs internal import)
      expect(output).toContain(
        'import _dicHash2 from "../.intlayer/dictionaries/app.json" with { type: "json" };'
      );
      // Must use the dynamic .mjs import instead
      expect(output).not.toContain(
        'import _dicHash2_dyn from "../.intlayer/dynamic_dictionaries/app.mjs";'
      );
      expect(output).toContain(
        'import { getDictionary as getIntlayer } from "intlayer";'
      );
      // getDictionary replaces the key with the dict identifier (no prepend)
      expect(output).toContain('const t = getIntlayer(_dicHash2);');
    });

    it('should use the fetch .mjs import for getIntlayer in fetch mode', () => {
      const code = `
        import { getIntlayer } from "intlayer";
        const t = getIntlayer("app");
      `;
      const output = transform(
        code,
        { importMode: 'fetch' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash2 from "../.intlayer/dictionaries/app.json" with { type: "json" };'
      );
      expect(output).not.toContain(
        'import _dicHash2_fetch from "../.intlayer/fetch_dictionaries/app.mjs";'
      );
      expect(output).toContain('const t = getIntlayer(_dicHash2);');
    });
  });

  describe('Aliased Imports', () => {
    it('should transform aliased static imports', () => {
      const code = `
        import { useIntlayer as s, getIntlayer as g } from "react-intlayer";
        const t = s("locale-switcher");
        const u = g("app");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash2 from "../.intlayer/dictionaries/app.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as s, getDictionary as g } from "react-intlayer";'
      );
      expect(output).toContain('const t = s(_dicHash);');
      expect(output).toContain('const u = g(_dicHash2);');
    });

    it('should transform aliased dynamic imports', () => {
      const code = `
        import { useIntlayer as s } from "react-intlayer";
        const t = s("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.tsx'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as s } from "react-intlayer";'
      );
      expect(output).toContain('const t = s(_dicHash_dyn, "locale-switcher");');
    });
  });

  describe('Solid', () => {
    it('should transform static imports', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "solid-intlayer";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform dynamic imports', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "solid-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
    });

    it('should preserve explicit locale in dynamic client imports', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher", locale);
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher", locale);'
      );
    });

    it('should route mixed fetch and dynamic overrides through the dynamic helper on the client', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
        const u = useIntlayer("app");
      `;
      const output = transform(
        code,
        {
          importMode: 'static',
          dictionaryModeMap: {
            app: 'fetch',
            'locale-switcher': 'dynamic',
          },
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "solid-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
      expect(output).toContain(
        'const u = useIntlayer(_dicHash2_fetch, "app");'
      );
    });

    it('should keep the dynamic helper on SSR when a fetch override taints the package', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
        const u = useIntlayer("app");
      `;
      const output = transform(
        code,
        {
          importMode: 'dynamic',
          isServer: true,
          dictionaryModeMap: { app: 'fetch' },
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "solid-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
      expect(output).toContain(
        'const u = useIntlayer(_dicHash2_fetch, "app");'
      );
      expect(output).not.toContain('solid-intlayer/server');
      expect(output).not.toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
    });

    it('should use a static dictionary during Solid SSR for dynamic imports', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        {
          importMode: 'dynamic',
          isServer: true,
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "solid-intlayer/server";'
      );
      expect(output).not.toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).not.toContain('useDictionaryDynamic');
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should use a static dictionary during SSR for dictionary-level dynamic overrides', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        {
          importMode: 'static',
          isServer: true,
          dictionaryModeMap: { 'locale-switcher': 'dynamic' },
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "solid-intlayer/server";'
      );
      expect(output).not.toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).not.toContain('useDictionaryDynamic');
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should keep other specifiers on the root import when moving useIntlayer to /server', () => {
      const code = `
        import { useIntlayer, useLocale } from "solid-intlayer";
        const t = useIntlayer("locale-switcher");
        const { locale } = useLocale();
      `;
      const output = transform(
        code,
        {
          importMode: 'dynamic',
          isServer: true,
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain('import { useLocale } from "solid-intlayer";');
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "solid-intlayer/server";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should preserve explicit locale when passing a static SSR dictionary', () => {
      const code = `
        import { useIntlayer } from "solid-intlayer";
        const t = useIntlayer("locale-switcher", locale);
      `;
      const output = transform(
        code,
        {
          importMode: 'dynamic',
          isServer: true,
        },
        '/app/src/page.tsx'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash, locale);');
    });
  });

  describe('Lit', () => {
    it('should transform static imports', () => {
      const code = `
        import { useIntlayer } from "lit-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.ts'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "lit-intlayer";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform dynamic imports', () => {
      const code = `
        import { useIntlayer } from "lit-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.ts'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "lit-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
    });
  });

  describe('Astro', () => {
    // In Astro's Vite pipeline our plugin runs with enforce:'post', so it
    // receives Astro-compiled JS (no --- fences) with a .astro moduleId.
    // The tests below mirror that: compiled JS passed with a .astro filename.
    it('should transform getIntlayer in compiled Astro JS (static mode)', () => {
      const code = `
        import { getIntlayer, getLocaleFromPath } from "intlayer";
        const locale = getLocaleFromPath(Astro.url.pathname);
        const { title, subtitle } = getIntlayer("home", locale);
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/pages/index.astro'
      );
      // "home" → _dicHash (mock returns "dicHash2" only for key "app")
      expect(output).toContain(
        'import _dicHash from "../../.intlayer/dictionaries/home.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { getDictionary as getIntlayer, getLocaleFromPath } from "intlayer";'
      );
      // locale second arg is preserved by getDictionary
      expect(output).toContain('getIntlayer(_dicHash, locale)');
    });

    it('should transform getIntlayer in compiled Astro JS (dynamic mode)', () => {
      const code = `
        import { getIntlayer } from "intlayer";
        const { title } = getIntlayer("home", locale);
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/pages/index.astro'
      );
      expect(output).toContain(
        'import _dicHash from "../../.intlayer/dictionaries/home.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { getDictionary as getIntlayer } from "intlayer";'
      );
      expect(output).toContain('getIntlayer(_dicHash, locale)');
    });

    it('should not transform when .astro file is not in filesList', () => {
      const code = `
        import { getIntlayer } from "intlayer";
        const { title } = getIntlayer("home", locale);
      `;
      // filesList defaults to the filename in transform(), so pass an empty list
      const output = transform(
        code,
        { importMode: 'static', filesList: [] },
        '/app/src/pages/index.astro'
      );
      expect(output).not.toContain('getDictionary');
      expect(output).toContain('getIntlayer("home", locale)');
    });
  });

  describe('Vanilla', () => {
    it('should transform static imports', () => {
      const code = `
        import { useIntlayer } from "vanilla-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'static' },
        '/app/src/page.ts'
      );
      expect(output).toContain(
        'import _dicHash from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "vanilla-intlayer";'
      );
      expect(output).toContain('const t = useIntlayer(_dicHash);');
    });

    it('should transform dynamic imports', () => {
      const code = `
        import { useIntlayer } from "vanilla-intlayer";
        const t = useIntlayer("locale-switcher");
      `;
      const output = transform(
        code,
        { importMode: 'dynamic' },
        '/app/src/page.ts'
      );
      expect(output).toContain(
        'import _dicHash_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useIntlayer } from "vanilla-intlayer";'
      );
      expect(output).toContain(
        'const t = useIntlayer(_dicHash_dyn, "locale-switcher");'
      );
    });
  });
});
