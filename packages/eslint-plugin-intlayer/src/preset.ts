import type { Linter } from 'eslint';
import type { IntlayerRuleName } from './index';

/** npm package name of this plugin. */
export const PLUGIN_PACKAGE_NAME = 'eslint-plugin-intlayer';

/** Prefix the rules are registered under, e.g. `intlayer/no-raw-text`. */
export const PLUGIN_NAMESPACE = 'intlayer';

/**
 * Intlayer's generated output, which every preset ignores.
 *
 * `.intlayer/` holds compiled dictionaries and generated types — machine-written
 * files that are never source. Linting them is at best wasted work and at worst
 * a hard failure, since third-party rules can crash on generated shapes they
 * were never meant to see. The rest of the toolchain already excludes this
 * directory (`content.watchExclude`, the build globs), so the lint preset
 * matches.
 */
export const GENERATED_OUTPUT_GLOBS = ['**/.intlayer/**'];

/**
 * Rules enabled by the `recommended` preset, keyed by unprefixed rule name.
 *
 * Exported because oxlint resolves a plugin's *rules* but not its shipped
 * *configs*: `intlayer init` reads this to spell the preset out explicitly in
 * `.oxlintrc.json`. Keeping the definition next to the rules it names means
 * enabling one by default is a single-line change.
 *
 * `no-raw-text` stays a warning on purpose — pointed at an existing codebase it
 * surfaces every untranslated string at once, which should not break a build on
 * day one. `enforce-adapter-import` is deliberately absent: importing from the
 * original package is valid once the bundler alias is configured, so it is
 * opt-in through the `strict` preset. `no-unused-content` is absent from every
 * preset — it scans the project from disk, which no preset should impose.
 */
export const RECOMMENDED_RULES: Partial<
  Record<IntlayerRuleName, Linter.RuleEntry>
> = {
  'no-raw-text': 'warn',
  'static-dictionary-key': 'error',
  'no-dynamic-field-access': 'error',
};

/**
 * The `recommended` preset with every rule name prefixed by the plugin
 * namespace — the shape both ESLint flat config and `.oxlintrc.json` expect.
 *
 * `intlayer init` uses this to write the preset into `.oxlintrc.json`, since
 * oxlint resolves a plugin's rules but not its configs.
 */
export const getRecommendedRules = (): Record<string, Linter.RuleEntry> =>
  Object.fromEntries(
    Object.entries(RECOMMENDED_RULES).map(([ruleName, entry]) => [
      `${PLUGIN_NAMESPACE}/${ruleName}`,
      entry,
    ])
  );
