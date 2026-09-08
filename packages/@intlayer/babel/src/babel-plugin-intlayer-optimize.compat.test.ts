import { resolve } from 'node:path';
import { transformSync } from '@babel/core';
import {
  LINGUI_CALLERS,
  NEXT_INTL_CALLERS,
  REACT_I18NEXT_CALLERS,
  REACT_INTL_CALLERS,
  VUE_I18N_CALLERS,
} from '@intlayer/config/callers';
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
  getPathHash: (key: string) => `dicHash_${key.replace(/[^a-zA-Z0-9]/g, '')}`,
}));

const transform = (
  code: string,
  options: Partial<OptimizePluginOptions> = {},
  filename = '/app/src/page.tsx'
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

describe('babel-plugin-intlayer-optimize — compat callers', () => {
  describe('react-i18next (positional namespace)', () => {
    it('rewrites useTranslation to useDictionary in static mode', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about");
      `;
      const output = transform(code, {
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import _dicHash_about from "../.intlayer/dictionaries/about.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useTranslation } from "react-i18next";'
      );
      expect(output).toContain('useTranslation(_dicHash_about);');
    });

    it('keeps trailing arguments after the dictionary', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about", { keyPrefix: "counter" });
      `;
      const output = transform(code, {
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'useTranslation(_dicHash_about, {\n  keyPrefix: "counter"\n});'
      );
    });

    it('splits a nested namespace into dictionary + key prefix', () => {
      const code = `
        import { useTranslations } from "next-intl";
        const t = useTranslations("about.counter");
      `;
      const output = transform(code, {
        compatCallers: NEXT_INTL_CALLERS,
      });

      expect(output).toContain(
        'import { useDictionary as useTranslations } from "next-intl";'
      );
      expect(output).toContain('useTranslations(_dicHash_about, "counter");');
    });

    it('rewrites to the dynamic helper in dynamic mode', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about", { keyPrefix: "counter" });
      `;
      const output = transform(code, {
        importMode: 'dynamic',
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import _dicHash_about_dyn from "../.intlayer/dynamic_dictionaries/about.mjs";'
      );
      expect(output).toContain(
        'import { useDictionaryDynamic as useTranslation } from "react-i18next";'
      );
      expect(output).toContain(
        'useTranslation(_dicHash_about_dyn, "about", {\n  keyPrefix: "counter"\n});'
      );
    });

    it('honours a per-dictionary dynamic override in a static file', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about");
      `;
      const output = transform(code, {
        importMode: 'static',
        dictionaryModeMap: { about: 'dynamic' },
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import { useDictionaryDynamic as useTranslation } from "react-i18next";'
      );
      expect(output).toContain('useTranslation(_dicHash_about_dyn, "about");');
    });

    it('leaves calls with a dynamic namespace untouched', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation(namespace);
      `;
      const output = transform(code, {
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import { useTranslation } from "react-i18next";'
      );
      expect(output).toContain('useTranslation(namespace);');
    });

    it('keeps the original import when any call site is unresolvable', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about");
        const { t: tDynamic } = useTranslation(namespace);
      `;
      const output = transform(code, {
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import { useTranslation } from "react-i18next";'
      );
      expect(output).toContain('useTranslation("about");');
      expect(output).toContain('useTranslation(namespace);');
    });
  });

  describe('vue-i18n (option namespace)', () => {
    it('rewrites useI18n({ namespace }) to useDictionary and drops the option', () => {
      const code = `
        import { useI18n } from "vue-i18n";
        const { t } = useI18n({ namespace: "about" });
      `;
      const output = transform(code, {
        compatCallers: VUE_I18N_CALLERS,
      });

      expect(output).toContain(
        'import { useDictionary as useI18n } from "vue-i18n";'
      );
      expect(output).toContain('useI18n(_dicHash_about, {});');
    });

    it('keeps the key-prefix remainder of a nested option namespace', () => {
      const code = `
        import { useI18n } from "vue-i18n";
        const { t } = useI18n({ namespace: "about.counter", useScope: "global" });
      `;
      const output = transform(code, {
        compatCallers: VUE_I18N_CALLERS,
      });

      expect(output).toContain(
        'useI18n(_dicHash_about, {\n  namespace: "counter",\n  useScope: "global"\n});'
      );
    });

    it('rewrites to the dynamic helper with the dictionary key prepended', () => {
      const code = `
        import { useI18n } from "vue-i18n";
        const { t } = useI18n({ namespace: "about" });
      `;
      const output = transform(code, {
        importMode: 'dynamic',
        compatCallers: VUE_I18N_CALLERS,
      });

      expect(output).toContain(
        'import { useDictionaryDynamic as useI18n } from "vue-i18n";'
      );
      expect(output).toContain('useI18n(_dicHash_about_dyn, "about", {});');
    });
  });

  describe('callers with no readable namespace', () => {
    // These callers used to bind a dictionary from the first dot-segment of
    // each message id. That inference is gone: the optimize pass reads a
    // namespace from an argument, an option property or a fixed value only, so
    // anything else keeps resolving through the runtime registry.

    it('leaves useLingui() untouched — lingui declares no namespace source', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Footer = () => {
          const { i18n } = useLingui();
          return i18n._("footer.github");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { footer: 'static' },
      });

      expect(output).toContain('import { useLingui } from "@lingui/react";');
      expect(output).toContain('useLingui();');
      expect(output).toContain('i18n._("footer.github")');
      expect(output).not.toContain('useDictionary');
    });

    it('leaves useIntl() untouched — react-intl declares no namespace source', () => {
      const code = `
        import { useIntl } from "react-intl";
        const Title = () => {
          const { formatMessage } = useIntl();
          return formatMessage({ id: "home.title" });
        };
      `;
      const output = transform(code, {
        compatCallers: REACT_INTL_CALLERS,
        dictionaryModeMap: { home: 'static' },
      });

      expect(output).toContain('import { useIntl } from "react-intl";');
      expect(output).toContain('useIntl();');
      expect(output).toContain('id: "home.title"');
      expect(output).not.toContain('useDictionary');
    });

    it('leaves a namespace-less useTranslations() untouched', () => {
      const code = `
        import { useTranslations } from "next-intl";
        const Footer = () => {
          const t = useTranslations();
          return t("footer.github");
        };
      `;
      const output = transform(code, {
        compatCallers: NEXT_INTL_CALLERS,
        dictionaryModeMap: { footer: 'static' },
      });

      expect(output).toContain('import { useTranslations } from "next-intl";');
      expect(output).toContain('useTranslations();');
      expect(output).toContain('t("footer.github")');
    });

    it('holds back a scoped sibling sharing the same import', () => {
      // One import specifier serves every call in the file, so a single
      // unresolvable call site has to keep the scoped ones unrewritten too —
      // otherwise the re-pointed helper would receive the raw "about" string.
      const code = `
        import { useTranslations } from "next-intl";
        const bare = useTranslations();
        const scoped = useTranslations("about");
      `;
      const output = transform(code, {
        compatCallers: NEXT_INTL_CALLERS,
        dictionaryModeMap: { about: 'static' },
      });

      expect(output).toContain('import { useTranslations } from "next-intl";');
      expect(output).toContain('useTranslations();');
      expect(output).toContain('useTranslations("about");');
      expect(output).not.toContain('useDictionary');
    });
  });

  describe('safety', () => {
    it('does not rewrite callers imported from unrelated modules', () => {
      const code = `
        import { useTranslation } from "./local-helper";
        const { t } = useTranslation("about");
      `;
      const output = transform(code, {
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import { useTranslation } from "./local-helper";'
      );
      expect(output).toContain('useTranslation("about");');
    });

    it('does not touch compat calls when no compat callers are configured', () => {
      const code = `
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about");
      `;
      const output = transform(code);

      expect(output).toContain(
        'import { useTranslation } from "react-i18next";'
      );
      expect(output).toContain('useTranslation("about");');
    });

    it('rewrites native and compat callers side by side', () => {
      const code = `
        import { useIntlayer } from "react-intlayer";
        import { useTranslation } from "react-i18next";
        const content = useIntlayer("home");
        const { t } = useTranslation("about");
      `;
      const output = transform(code, {
        compatCallers: REACT_I18NEXT_CALLERS,
      });

      expect(output).toContain(
        'import { useDictionary as useIntlayer } from "react-intlayer";'
      );
      expect(output).toContain(
        'import { useDictionary as useTranslation } from "react-i18next";'
      );
      expect(output).toContain('useIntlayer(_dicHash_home);');
      expect(output).toContain('useTranslation(_dicHash_about);');
    });
  });
});
