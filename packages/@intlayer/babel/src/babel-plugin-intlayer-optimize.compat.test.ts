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
import { BABEL_PARSER_OPTIONS } from './transformers';

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
    parserOpts: BABEL_PARSER_OPTIONS,
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

  describe('lingui (root scope bound from message ids)', () => {
    // `useLingui()` names no dictionary itself: the pass reads the first
    // segment of every static id passed to `_` / `t` / `<Trans>` in the file
    // and hands all of those dictionaries to the call, ids kept intact.

    it('binds the dictionary named by the message id prefix', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Footer = () => {
          const { i18n } = useLingui();
          return i18n._("footer.github") + i18n._("footer.contact");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { footer: 'static' },
      });

      expect(output).toContain(
        'import _dicHash_footer from "../.intlayer/dictionaries/footer.json" with { type: "json" };'
      );
      expect(output).toContain(
        'import { useDictionary as useLingui } from "@lingui/react";'
      );
      expect(output).toContain('useLingui(_dicHash_footer);');
      // Ids stay intact — the runtime picks the dictionary by first segment.
      expect(output).toContain('i18n._("footer.github")');
    });

    it('binds every dictionary named in the file to one call', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Hero = () => {
          const { _, t } = useLingui();
          return _("hero.title") + t({ id: "header.methodology" });
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static', header: 'static' },
      });

      expect(output).toContain('useLingui(_dicHash_hero, _dicHash_header);');
      expect(output).toContain('_("hero.title")');
      expect(output).toContain('t({\n    id: "header.methodology"\n  })');
    });

    it('reads ids from <Trans> and a static-prefix template literal', () => {
      const code = `
        import { useLingui, Trans } from "@lingui/react";
        const Footer = ({ id }) => {
          const { i18n } = useLingui();
          return <>{i18n._(\`footer.\${id}\`)}<Trans id="hero.title" /></>;
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { footer: 'static', hero: 'static' },
      });

      expect(output).toContain('useLingui(_dicHash_footer, _dicHash_hero);');
      expect(output).toContain('i18n._(`footer.${' + 'id}`)');
    });

    it('binds a dot-less id to the dictionary of the same name', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Banner = () => {
          const { i18n } = useLingui();
          return i18n._("mockBanner");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { mockBanner: 'static' },
      });

      expect(output).toContain('useLingui(_dicHash_mockBanner);');
      expect(output).toContain('i18n._("mockBanner")');
    });

    it('falls back to the `messages` catalog when it was not split', () => {
      // A lingui app whose catalog is still one whole-file `messages`
      // dictionary: no `footer` dictionary exists to bind, so the rewrite
      // re-points at `messages` and keeps the id intact rather than decline —
      // declining would leave the call resolving through a registry that
      // `replaceDictionaryEntry` has emptied.
      const code = `
        import { useLingui } from "@lingui/react";
        const Footer = () => {
          const { i18n } = useLingui();
          return i18n._("footer.github") + i18n._("header.blog");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { messages: 'static' },
      });

      expect(output).toContain(
        'import _dicHash_messages from "../.intlayer/dictionaries/messages.json" with { type: "json" };'
      );
      expect(output).toContain('useLingui(_dicHash_messages);');
      expect(output).toContain('i18n._("footer.github")');
    });

    it('rewrites to the dynamic helper with [loader, key] pairs', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Hero = () => {
          const { i18n } = useLingui();
          return i18n._("hero.title") + i18n._("header.blog");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        importMode: 'dynamic',
        dictionaryModeMap: { hero: 'dynamic', header: 'dynamic' },
      });

      expect(output).toContain(
        'import { useDictionaryDynamic as useLingui } from "@lingui/react";'
      );
      expect(output).toContain(
        'useLingui([_dicHash_hero_dyn, "hero"], [_dicHash_header_dyn, "header"]);'
      );
    });

    it('leaves the call alone when any id in the file is dynamic', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Row = ({ key }) => {
          const { i18n } = useLingui();
          return i18n._("footer.github") + i18n._(key);
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { footer: 'static' },
      });

      expect(output).toContain('import { useLingui } from "@lingui/react";');
      expect(output).toContain('useLingui();');
      expect(output).not.toContain('useDictionary');
    });

    it('leaves the call alone when a macro template was not compiled', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Row = () => {
          const { t } = useLingui();
          return t\`Hello\`;
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { messages: 'static' },
      });

      expect(output).toContain('useLingui();');
      expect(output).not.toContain('useDictionary');
    });

    it('leaves the call alone when the file reads no id at all', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Provider = ({ children }) => {
          const { i18n } = useLingui();
          return <Child i18n={i18n}>{children}</Child>;
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { messages: 'static' },
      });

      expect(output).toContain('useLingui();');
      expect(output).not.toContain('useDictionary');
    });

    it('leaves the call alone when the id names no dictionary and there is no catalog', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        const Footer = () => {
          const { i18n } = useLingui();
          return i18n._("footer.github");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain('useLingui();');
      expect(output).not.toContain('useDictionary');
    });

    it('binds <Trans> to the dictionary its id names', () => {
      const code = `
        import { Trans } from "@lingui/react";
        const Hero = () => <Trans id="hero.title" message="Welcome" />;
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain(
        'import { TransDictionary as Trans } from "@lingui/react";'
      );
      expect(output).toContain(
        '<Trans id="hero.title" message="Welcome" dictionary={_dicHash_hero} />'
      );
    });

    it('binds <Trans> to the dynamic loader pair in dynamic mode', () => {
      const code = `
        import { Trans } from "@lingui/react";
        const Hero = () => <Trans id="hero.title" />;
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        importMode: 'dynamic',
        dictionaryModeMap: { hero: 'dynamic' },
      });

      expect(output).toContain(
        'import { TransDictionaryDynamic as Trans } from "@lingui/react";'
      );
      expect(output).toContain(
        '<Trans id="hero.title" dictionary={[_dicHash_hero_dyn, "hero"]} />'
      );
    });

    it('binds <Trans> and useLingui() from one import side by side', () => {
      const code = `
        import { Trans, useLingui } from "@lingui/react";
        const Hero = () => {
          const { i18n } = useLingui();
          return <p title={i18n._("hero.viewResults")}><Trans id="hero.title" /></p>;
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain(
        'import { TransDictionary as Trans, useDictionary as useLingui } from "@lingui/react";'
      );
      expect(output).toContain('useLingui(_dicHash_hero);');
      expect(output).toContain('dictionary={_dicHash_hero}');
    });

    it('binds the compiled jsx(Trans, props) form the React plugin emits', () => {
      // On Vite the optimize transform runs after `@vitejs/plugin-react`, so
      // the element usually arrives as the automatic-runtime call.
      const code = `
        import { jsx as _jsx } from "react/jsx-runtime";
        import { Trans } from "@lingui/react";
        const Hero = () => _jsx(Trans, { id: "hero.title", message: "Welcome" });
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain(
        'import { TransDictionary as Trans } from "@lingui/react";'
      );
      expect(output).toContain('dictionary: _dicHash_hero');
    });

    it('keeps the Trans import when the component is also passed as a value', () => {
      const code = `
        import { Trans } from "@lingui/react";
        const Row = () => <Field label={<Trans id="hero.title" />} component={Trans} />;
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain('import { Trans } from "@lingui/react";');
      expect(output).not.toContain('dictionary=');
    });

    it('keeps the Trans import when no element of it is seen', () => {
      const code = `
        import { Trans } from "@lingui/react";
        export const renderer = Trans;
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain('import { Trans } from "@lingui/react";');
    });

    it('holds back every <Trans> of the file when one id is dynamic', () => {
      const code = `
        import { Trans } from "@lingui/react";
        const Row = ({ id }) => <><Trans id="hero.title" /><Trans id={id} /></>;
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static' },
      });

      expect(output).toContain('import { Trans } from "@lingui/react";');
      expect(output).not.toContain('dictionary=');
    });

    it('ignores a local helper named `t` that is not the lingui one', () => {
      // `const t = (id) => i18n._(\`hero.${id}\`)` is an app wrapper: its
      // calls carry field names, not ids, so reading them as lingui ids would
      // decline the binding. Only a `t` imported from lingui or destructured
      // from `useLingui()` is a message-id site.
      const code = `
        import { useLingui } from "@lingui/react";
        const Hero = () => {
          const { i18n } = useLingui();
          const t = (id) => i18n._(\`hero.\${id}\`);
          return t("viewResults") + i18n._("header.methodology");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { hero: 'static', header: 'static' },
      });

      expect(output).toContain('useLingui(_dicHash_hero, _dicHash_header);');
    });

    it('reads a bare `t` imported from a lingui module', () => {
      const code = `
        import { useLingui } from "@lingui/react";
        import { t } from "@lingui/core/macro";
        const Row = () => {
          const { i18n } = useLingui();
          return t({ id: "footer.github" });
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { footer: 'static' },
      });

      expect(output).toContain('useLingui(_dicHash_footer);');
    });

    it('ignores unrelated methods that read no static string', () => {
      // `spacing.get("footer")` is not a lingui method name, so it neither
      // binds nor poisons; a dynamic argument on an unrelated `.t()` would
      // be treated as unknowable — the safe direction.
      const code = `
        import { useLingui } from "@lingui/react";
        const Row = () => {
          const { i18n } = useLingui();
          return i18n._("footer.github") + spacing.get("footer");
        };
      `;
      const output = transform(code, {
        compatCallers: LINGUI_CALLERS,
        dictionaryModeMap: { footer: 'static' },
      });

      expect(output).toContain('useLingui(_dicHash_footer);');
    });
  });

  describe('callers with no readable namespace', () => {
    // The optimize pass reads a namespace from an argument, an option property
    // or a fixed value; a root-scope call is bound only for libraries whose
    // ids sit on `'self'` callers (see the lingui block above). Anything else
    // keeps resolving through the runtime registry.

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
