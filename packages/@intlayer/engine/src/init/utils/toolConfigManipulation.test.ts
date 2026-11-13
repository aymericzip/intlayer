import { describe, expect, it } from 'vitest';
import {
  addIntlayerPluginToPrettierScriptConfig,
  addIntlayerPluginToPrettierYamlConfig,
  addIntlayerPresetToEslintFlatConfig,
  setTanStackRouteFileIgnorePattern,
  type ToolConfigPatchResult,
} from './toolConfigManipulation';

/** Returns the patched content, failing when the patch did not apply. */
const getUpdatedContent = (result: ToolConfigPatchResult): string => {
  expect(result.status).toBe('updated');
  return result.status === 'updated' ? result.content : '';
};

describe('addIntlayerPresetToEslintFlatConfig', () => {
  it('spreads the preset into an exported array', () => {
    const content = getUpdatedContent(
      addIntlayerPresetToEslintFlatConfig(
        "import js from '@eslint/js';\n\nexport default [js.configs.recommended];\n",
        'mjs'
      )
    );

    expect(content).toContain("import intlayer from 'eslint-plugin-intlayer';");
    expect(content).toContain('...intlayer.configs.recommended');
    expect(content.indexOf("from '@eslint/js'")).toBeLessThan(
      content.indexOf("from 'eslint-plugin-intlayer'")
    );
  });

  it('handles defineConfig with an array argument', () => {
    const content = getUpdatedContent(
      addIntlayerPresetToEslintFlatConfig(
        "import { defineConfig } from 'eslint/config';\n\nexport default defineConfig([{ rules: {} }]);\n",
        'js'
      )
    );

    expect(content).toMatch(
      /defineConfig\(\[\{[\s\S]*\}, \.\.\.intlayer\.configs\.recommended\]\)/
    );
  });

  it('appends a variadic argument to tseslint.config', () => {
    const content = getUpdatedContent(
      addIntlayerPresetToEslintFlatConfig(
        "import tseslint from 'typescript-eslint';\n\nexport default tseslint.config(a, b);\n",
        'ts'
      )
    );

    expect(content).toContain(
      'tseslint.config(a, b, ...intlayer.configs.recommended)'
    );
  });

  it('follows an identifier export and uses require in CommonJS', () => {
    const content = getUpdatedContent(
      addIntlayerPresetToEslintFlatConfig(
        "const js = require('@eslint/js');\n\nconst config = [js.configs.recommended];\n\nmodule.exports = config;\n",
        'cjs'
      )
    );

    expect(content).toContain(
      "const intlayer = require('eslint-plugin-intlayer');"
    );
    expect(content).toContain('...intlayer.configs.recommended');
  });

  it('reports already-wired and unsupported configs', () => {
    expect(
      addIntlayerPresetToEslintFlatConfig(
        "import intlayer from 'eslint-plugin-intlayer';\nexport default [...intlayer];\n",
        'js'
      ).status
    ).toBe('already');
    expect(
      addIntlayerPresetToEslintFlatConfig('export default buildConfig;\n', 'js')
        .status
    ).toBe('unsupported');
  });
});

describe('addIntlayerPluginToPrettierScriptConfig', () => {
  it('adds a plugins array to an exported object', () => {
    const content = getUpdatedContent(
      addIntlayerPluginToPrettierScriptConfig(
        'export default { semi: false };\n'
      )
    );

    expect(content).toMatch(/plugins: \['prettier-plugin-intlayer'\]/);
  });

  it('extends an existing plugins array behind satisfies', () => {
    const content = getUpdatedContent(
      addIntlayerPluginToPrettierScriptConfig(
        "import type { Config } from 'prettier';\n\nconst config = { plugins: ['prettier-plugin-tailwindcss'] } satisfies Config;\n\nexport default config;\n"
      )
    );

    expect(content).toMatch(
      /\['prettier-plugin-tailwindcss', 'prettier-plugin-intlayer'\]/
    );
  });
});

describe('addIntlayerPluginToPrettierYamlConfig', () => {
  it('appends a plugins block', () => {
    expect(
      getUpdatedContent(addIntlayerPluginToPrettierYamlConfig('semi: false\n'))
    ).toBe('semi: false\nplugins:\n  - prettier-plugin-intlayer\n');
  });

  it('extends a block list and a flow list', () => {
    expect(
      getUpdatedContent(
        addIntlayerPluginToPrettierYamlConfig(
          'plugins:\n  - prettier-plugin-svelte\nsemi: false\n'
        )
      )
    ).toBe(
      'plugins:\n  - prettier-plugin-svelte\n  - prettier-plugin-intlayer\nsemi: false\n'
    );

    expect(
      getUpdatedContent(addIntlayerPluginToPrettierYamlConfig('plugins: [a]\n'))
    ).toBe('plugins: [a, prettier-plugin-intlayer]\n');
  });
});

describe('setTanStackRouteFileIgnorePattern', () => {
  it('sets the pattern under router for tanstackStart', () => {
    const content = getUpdatedContent(
      setTanStackRouteFileIgnorePattern(
        "import { tanstackStart } from '@tanstack/react-start/plugin/vite';\n\nexport default defineConfig({ plugins: [tanstackStart()] });\n"
      )
    );

    expect(content).toMatch(/router: \{\s*routeFileIgnorePattern: /);
    expect(content).toContain('content');
  });

  it('sets the pattern at the root for tanstackRouter and keeps an existing one', () => {
    const content = getUpdatedContent(
      setTanStackRouteFileIgnorePattern(
        "export default defineConfig({ plugins: [tanstackRouter({ routeFileIgnorePattern: 'test' })] });\n"
      )
    );

    expect(content).toContain('(?:test)|(?:');
  });

  it('is idempotent', () => {
    const content = getUpdatedContent(
      setTanStackRouteFileIgnorePattern(
        'export default defineConfig({ plugins: [tanstackStart()] });\n'
      )
    );

    expect(setTanStackRouteFileIgnorePattern(content).status).toBe('already');
  });
});
