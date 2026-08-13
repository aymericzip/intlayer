import type { ESLint, Linter } from 'eslint';
import {
  GENERATED_OUTPUT_GLOBS,
  PLUGIN_NAMESPACE,
  RECOMMENDED_RULES,
} from './preset';
import { enforceAdapterImport } from './rules/enforceAdapterImport';
import { noDynamicFieldAccess } from './rules/noDynamicFieldAccess';
import { noRawText } from './rules/noRawText';
import { noUnusedContent } from './rules/noUnusedContent';
import { staticDictionaryKey } from './rules/staticDictionaryKey';
import { getReactVersion } from './utils/reactVersion';

/**
 * Every rule this plugin ships, keyed by the name used in configuration.
 *
 * The rules split into three families:
 * - **Coverage** (`no-raw-text`) — user-facing copy that never reached a
 *   dictionary. Nothing else in the toolchain reports it.
 * - **Compiler contract** (`static-dictionary-key`, `no-dynamic-field-access`)
 *   — call shapes that type-check and run, but that the Babel/SWC passes cannot
 *   analyse, so they silently lose the optimize pass or read a purged field.
 * - **Dead content** (`no-unused-content`) — dictionaries and fields nothing
 *   reads. Off in every preset: it is the only rule that scans the whole
 *   project from disk, so enabling it is a cost the user should opt into.
 *
 * Deliberately absent: unknown dictionary keys, unknown field paths and missing
 * required locales. The generated `__DictionaryRegistry` module augmentation
 * already makes all three compile errors, and `@intlayer/lsp` reports the first
 * as an editor diagnostic — a third report would only add noise.
 */
export const rules = {
  'no-raw-text': noRawText,
  'static-dictionary-key': staticDictionaryKey,
  'no-dynamic-field-access': noDynamicFieldAccess,
  'enforce-adapter-import': enforceAdapterImport,
  'no-unused-content': noUnusedContent,
} satisfies ESLint.Plugin['rules'];

/** Rule names this plugin exposes. */
export type IntlayerRuleName = keyof typeof rules;

const meta: { name: string; version: string } = {
  name: 'eslint-plugin-intlayer',
  version: '9.3.1',
};

const plugin: ESLint.Plugin = { meta, rules };

/** The flat configs this plugin ships. */
export type IntlayerConfigName = 'recommended' | 'strict' | 'contract-only';

/**
 * Build a flat config enabling the given rules under the `intlayer/` prefix.
 *
 * @param name - Config name, surfaced by `--print-config` and the config inspector.
 * @param ruleSeverities - Severity per rule name.
 */
const createConfig = (
  name: string,
  ruleEntries: Partial<Record<IntlayerRuleName, Linter.RuleEntry>>
): Linter.Config[] => [
  // A config carrying only `ignores` is a *global* ignore in flat config, so
  // this keeps ESLint away from generated output wherever the preset is spread.
  {
    name: `intlayer/${name}/ignores`,
    ignores: GENERATED_OUTPUT_GLOBS,
  },
  {
    name: `intlayer/${name}`,
    plugins: { [PLUGIN_NAMESPACE]: plugin },
    settings: {
      react: {
        version: getReactVersion(),
      },
    },
    rules: Object.fromEntries(
      Object.entries(ruleEntries).map(([ruleName, entry]) => [
        `${PLUGIN_NAMESPACE}/${ruleName}`,
        entry,
      ])
    ),
  },
];

/**
 * Flat configs, for `eslint.config.js`:
 *
 * ```js
 * import intlayer from 'eslint-plugin-intlayer';
 *
 * export default [...intlayer]; // or [...intlayer.configs.recommended]
 * ```
 *
 * - `recommended` — the compiler-contract rules as errors, plus `no-raw-text`
 *   as a warning so an existing codebase is not blocked on day one.
 * - `strict` — everything as an error, including string literals outside JSX.
 * - `contract-only` — just the rules that protect the build output; use this
 *   when translation coverage is tracked by `intlayer test` instead.
 *
 * `enforce-adapter-import` is opt-in: importing from the original package is
 * perfectly valid once the bundler alias is set up, so a project that has done
 * that should not be nagged. Only `strict` turns it on.
 *
 * `no-unused-content` is in no preset at all, `strict` included. It reads the
 * Intlayer configuration and walks the project's source files from disk, which
 * is a different order of cost from the AST-only rules and depends on build
 * output for its duplicate report — spreading a preset should never quietly
 * turn that on.
 */
export const configs: Record<IntlayerConfigName, Linter.Config[]> = {
  recommended: createConfig('recommended', RECOMMENDED_RULES),
  strict: createConfig('strict', {
    'no-raw-text': ['error', { includeStringLiterals: true }],
    'static-dictionary-key': 'error',
    'no-dynamic-field-access': 'error',
    'enforce-adapter-import': 'error',
  }),
  'contract-only': createConfig('contract-only', {
    'static-dictionary-key': 'error',
    'no-dynamic-field-access': 'error',
  }),
};

export {
  GENERATED_OUTPUT_GLOBS,
  getRecommendedRules,
  PLUGIN_NAMESPACE,
  PLUGIN_PACKAGE_NAME,
  RECOMMENDED_RULES,
} from './preset';
export type { NoRawTextOptions } from './rules/noRawText';
export type { NoUnusedContentOptions } from './rules/noUnusedContent';
export { getReactVersion } from './utils/reactVersion';
export { meta };

/** The plugin object, as consumed by `eslint.config.js`. */
export type IntlayerPlugin = ESLint.Plugin &
  Iterable<Linter.Config> & {
    meta: { name: string; version: string };
    rules: typeof rules;
    configs: Record<IntlayerConfigName, Linter.Config[]>;
  };

const intlayerPlugin: IntlayerPlugin = {
  meta,
  rules,
  configs,
  *[Symbol.iterator]() {
    yield* configs.recommended;
  },
};

export default intlayerPlugin;
