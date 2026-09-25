import { describe, expect, it } from 'vitest';
import {
  addIntlayerRulesToOxlintConfig,
  LINT_PLUGIN_PACKAGE_NAME,
  type OxlintConfig,
} from './lintConfig';

describe('addIntlayerRulesToOxlintConfig', () => {
  it('fills an empty config with the plugin, rules and ignore', () => {
    const oxlintConfig: OxlintConfig = {};

    expect(addIntlayerRulesToOxlintConfig(oxlintConfig)).toBe(true);
    expect(oxlintConfig).toEqual({
      jsPlugins: [LINT_PLUGIN_PACKAGE_NAME],
      rules: {
        'intlayer/no-raw-text': 'warn',
        'intlayer/static-dictionary-key': 'error',
        'intlayer/no-dynamic-field-access': 'error',
      },
      ignorePatterns: ['**/.intlayer/**'],
    });
  });

  it('keeps severities the user already set', () => {
    const oxlintConfig: OxlintConfig = {
      rules: { 'intlayer/no-raw-text': 'off', 'no-console': 'warn' },
    };

    addIntlayerRulesToOxlintConfig(oxlintConfig);

    expect(oxlintConfig.rules?.['intlayer/no-raw-text']).toBe('off');
    expect(oxlintConfig.rules?.['no-console']).toBe('warn');
  });

  it('reports no change on a second pass', () => {
    const oxlintConfig: OxlintConfig = {};
    addIntlayerRulesToOxlintConfig(oxlintConfig);

    expect(addIntlayerRulesToOxlintConfig(oxlintConfig)).toBe(false);
  });
});
