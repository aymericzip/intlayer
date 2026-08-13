import { describe, expect, it } from 'vitest';
import plugin, {
  configs,
  GENERATED_OUTPUT_GLOBS,
  type IntlayerConfigName,
  type IntlayerRuleName,
  RECOMMENDED_RULES,
  rules,
} from './index';

const ruleNames = Object.keys(rules) as IntlayerRuleName[];

/** The rules a preset enables, regardless of how its entries are ordered. */
const rulesOf = (entries: (typeof configs)[IntlayerConfigName]) =>
  entries.find((entry) => entry.rules)?.rules ?? {};

describe('eslint-plugin-intlayer', () => {
  it('exposes the plugin shape ESLint expects', () => {
    expect(plugin.meta.name).toBe('eslint-plugin-intlayer');
    expect(plugin.rules).toBe(rules);
    expect(ruleNames.length).toBeGreaterThan(0);
  });

  it('is iterable and defaults to expanding the recommended config', () => {
    expect([...plugin]).toEqual(configs.recommended);
    expect(Array.from(plugin)).toEqual(configs.recommended);
  });

  describe.each(ruleNames)('%s', (ruleName) => {
    const rule = rules[ruleName];

    it('declares the metadata the ESLint config inspector reads', () => {
      expect(rule.meta?.type).toBeDefined();
      expect(rule.meta?.docs?.description).toBeTruthy();
      expect(rule.meta?.docs?.url).toContain(`#${ruleName}`);
      expect(rule.meta?.schema).toBeDefined();
    });

    it('declares a message for every id it can report', () => {
      expect(Object.keys(rule.meta?.messages ?? {}).length).toBeGreaterThan(0);
    });
  });

  describe.each(Object.entries(configs))(
    'config %s',
    (_name, configEntries) => {
      it('is an array, so it can be spread into a flat config', () => {
        // ESLint 10 does not flatten nested arrays: a preset must be spread
        // (`...configs.recommended`), which is also the typescript-eslint
        // convention users expect.
        expect(Array.isArray(configEntries)).toBe(true);
        expect(configEntries.length).toBeGreaterThan(0);
      });

      it('only enables rules this plugin ships', () => {
        for (const configuredRule of Object.keys(rulesOf(configEntries))) {
          const [prefix, ruleName] = configuredRule.split('/');

          expect(prefix).toBe('intlayer');
          expect(ruleNames).toContain(ruleName);
        }
      });

      it('registers the plugin on the entry that enables its rules', () => {
        const ruleEntry = configEntries.find((entry) => entry.rules);

        expect(ruleEntry?.plugins?.['intlayer']).toBeDefined();
      });

      it('provides settings.react.version for ESLint 10 compatibility with eslint-plugin-react', () => {
        const ruleEntry = configEntries.find((entry) => entry.rules);

        expect(ruleEntry?.settings?.react?.version).toBeDefined();
        expect(typeof ruleEntry?.settings?.react?.version).toBe('string');
      });

      it('ignores Intlayer generated output', () => {
        // `.intlayer/` holds compiled dictionaries; linting them is wasted work
        // and third-party rules can crash on generated shapes.
        const ignoreEntry = configEntries.find((entry) => entry.ignores);

        expect(ignoreEntry?.ignores).toEqual(GENERATED_OUTPUT_GLOBS);
        // A global ignore must carry nothing else, or it stops being global.
        expect(ignoreEntry?.rules).toBeUndefined();
        expect(ignoreEntry?.plugins).toBeUndefined();
      });
    }
  );

  it('keeps `recommended` free of the rules TypeScript already reports', () => {
    // Unknown keys, unknown field paths and missing required locales are
    // compile errors through the generated `__DictionaryRegistry`; duplicating
    // them here would report the same mistake three times.
    expect(ruleNames).not.toContain('no-unknown-key');
    expect(ruleNames).not.toContain('no-missing-translation');
  });

  it('errors on the compiler-contract rules in `recommended`', () => {
    expect(rulesOf(configs.recommended)['intlayer/static-dictionary-key']).toBe(
      'error'
    );
    expect(
      rulesOf(configs.recommended)['intlayer/no-dynamic-field-access']
    ).toBe('error');
  });

  it('builds `recommended` from the exported preset', () => {
    // `RECOMMENDED_RULES` is public because `intlayer init` mirrors it into
    // `.oxlintrc.json` — oxlint resolves a plugin's rules but not its configs.
    for (const [ruleName, severity] of Object.entries(RECOMMENDED_RULES)) {
      expect(rules).toHaveProperty(ruleName);
      expect(rulesOf(configs.recommended)[`intlayer/${ruleName}`]).toEqual(
        severity
      );
    }
  });

  it('leaves `enforce-adapter-import` opt-in', () => {
    // Importing from the original package is valid once the bundler alias is
    // configured, so `recommended` must not nag about it. Only `strict` does.
    expect(
      rulesOf(configs.recommended)['intlayer/enforce-adapter-import']
    ).toBeUndefined();
    expect(
      rulesOf(configs['contract-only'])['intlayer/enforce-adapter-import']
    ).toBeUndefined();
    expect(rulesOf(configs.strict)['intlayer/enforce-adapter-import']).toBe(
      'error'
    );
  });
});
