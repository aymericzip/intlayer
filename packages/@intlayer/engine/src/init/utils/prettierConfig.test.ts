import { describe, expect, it } from 'vitest';
import {
  addIntlayerPluginToPrettierConfig,
  hasPrettier,
  PRETTIER_PLUGIN_PACKAGE_NAME,
  type PrettierConfig,
} from './prettierConfig';

describe('addIntlayerPluginToPrettierConfig', () => {
  it('adds the plugin to an empty config', () => {
    const prettierConfig: PrettierConfig = {};

    expect(addIntlayerPluginToPrettierConfig(prettierConfig)).toBe(true);
    expect(prettierConfig).toEqual({ plugins: [PRETTIER_PLUGIN_PACKAGE_NAME] });
  });

  it('keeps existing plugins and options', () => {
    const prettierConfig: PrettierConfig = {
      singleQuote: true,
      plugins: ['prettier-plugin-tailwindcss'],
    };

    addIntlayerPluginToPrettierConfig(prettierConfig);

    expect(prettierConfig).toEqual({
      singleQuote: true,
      plugins: ['prettier-plugin-tailwindcss', PRETTIER_PLUGIN_PACKAGE_NAME],
    });
  });

  it('is idempotent', () => {
    const prettierConfig: PrettierConfig = {};
    addIntlayerPluginToPrettierConfig(prettierConfig);

    expect(addIntlayerPluginToPrettierConfig(prettierConfig)).toBe(false);
    expect(prettierConfig.plugins).toHaveLength(1);
  });
});

describe('hasPrettier', () => {
  it('detects prettier in dependencies', () => {
    expect(hasPrettier({ prettier: '^3.0.0' })).toBe(true);
    expect(hasPrettier({ eslint: '^9.0.0' })).toBe(false);
  });
});
