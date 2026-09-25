/**
 * The Intlayer lint setup, as `intlayer init` writes it into `.oxlintrc.json`.
 *
 * Declared locally on purpose: `@intlayer/engine` is installed by every Intlayer
 * user, so it must not depend on a lint plugin to write a handful of strings
 * into a JSON file. oxlint resolves a plugin's *rules* but not its shipped
 * *configs*, so the preset cannot be referenced by name there either.
 *
 * Mirrors the `recommended` preset of `eslint-plugin-intlayer`; keep in sync
 * when a rule is enabled by default there.
 */
export const LINT_PLUGIN_PACKAGE_NAME = 'eslint-plugin-intlayer';

/** Intlayer's generated output — never source, never worth linting. */
const GENERATED_OUTPUT_GLOBS = ['**/.intlayer/**'];

/** Rules of the `recommended` preset, prefixed by the plugin namespace. */
const getRecommendedRules = (): Record<string, string> => ({
  'intlayer/no-raw-text': 'warn',
  'intlayer/static-dictionary-key': 'error',
  'intlayer/no-dynamic-field-access': 'error',
});

/** The `.oxlintrc.json` fields init reads and writes. */
export type OxlintConfig = {
  jsPlugins?: string[];
  rules?: Record<string, unknown>;
  ignorePatterns?: string[];
};

/**
 * Adds the Intlayer plugin, the `recommended` rules and the generated-output
 * ignore to an oxlint config, in place. Rules the user already set are kept.
 *
 * @returns Whether anything was added.
 */
export const addIntlayerRulesToOxlintConfig = (
  oxlintConfig: OxlintConfig
): boolean => {
  oxlintConfig.jsPlugins ??= [];
  oxlintConfig.rules ??= {};
  oxlintConfig.ignorePatterns ??= [];

  let isUpdated = false;

  // Generated dictionaries are not source; linting them is wasted work.
  for (const glob of GENERATED_OUTPUT_GLOBS) {
    if (!oxlintConfig.ignorePatterns.includes(glob)) {
      oxlintConfig.ignorePatterns.push(glob);
      isUpdated = true;
    }
  }

  if (!oxlintConfig.jsPlugins.includes(LINT_PLUGIN_PACKAGE_NAME)) {
    oxlintConfig.jsPlugins.push(LINT_PLUGIN_PACKAGE_NAME);
    isUpdated = true;
  }

  for (const [ruleName, severity] of Object.entries(getRecommendedRules())) {
    if (!oxlintConfig.rules[ruleName]) {
      oxlintConfig.rules[ruleName] = severity;
      isUpdated = true;
    }
  }

  return isUpdated;
};
