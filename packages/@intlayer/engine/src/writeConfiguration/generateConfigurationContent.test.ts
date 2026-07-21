import { BUILT_CONFIG_KEYS } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { describe, expect, it } from 'vitest';
import { generateConfigurationContent } from './generateConfigurationContent';

/**
 * Minimal configuration stub. Only a subset of sections carry values; the
 * generator must still emit a named export for every {@link BUILT_CONFIG_KEYS}
 * entry (undefined ones included) so the aliased `@intlayer/config/built`
 * import never hits a `MISSING_EXPORT` error.
 */
const configuration = {
  internationalization: { locales: ['en'], defaultLocale: 'en' },
  editor: { enabled: false },
  analytics: { enabled: true },
} as unknown as IntlayerConfig;

describe('generateConfigurationContent', () => {
  it('emits a named ESM export for every canonical built config key', () => {
    const content = generateConfigurationContent(configuration, 'esm');

    for (const key of BUILT_CONFIG_KEYS) {
      expect(content).toContain(`const ${key} = `);
    }
    expect(content).toContain(`export { ${BUILT_CONFIG_KEYS.join(', ')} };`);
  });

  it('emits a CommonJS export assignment for every canonical built config key', () => {
    const content = generateConfigurationContent(configuration, 'cjs');

    for (const key of BUILT_CONFIG_KEYS) {
      expect(content).toContain(`module.exports.${key} = ${key};`);
    }
    expect(content).not.toContain('export {');
  });

  it('serializes provided section values as JSON', () => {
    const content = generateConfigurationContent(configuration, 'esm');

    expect(content).toContain(
      `const analytics = ${JSON.stringify(configuration.analytics, null, 2)};`
    );
  });

  it('emits `undefined` for absent optional sections without throwing', () => {
    const content = generateConfigurationContent(configuration, 'esm');

    // `schemas` and `plugins` are absent from the stub; they must still be
    // declared and exported so consumers importing them do not break.
    expect(content).toContain('const schemas = undefined;');
    expect(content).toContain('const plugins = undefined;');
  });
});
