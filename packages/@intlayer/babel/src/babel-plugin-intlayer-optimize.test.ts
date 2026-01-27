import { transformSync } from '@babel/core';
import { describe, expect, it, vi } from 'vitest';
import {
  intlayerOptimizeBabelPlugin,
  type OptimizePluginOptions,
} from './babel-plugin-intlayer-optimize';

// Mock dependencies to avoid esbuild issues
vi.mock('@intlayer/config', () => ({
  normalizePath: (path: string) => path.replace(/\\/g, '/'),
}));

vi.mock('@intlayer/chokidar', () => ({
  getFileHash: (key: string) => `dicHash`,
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
    filesList: [filename],
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
});
