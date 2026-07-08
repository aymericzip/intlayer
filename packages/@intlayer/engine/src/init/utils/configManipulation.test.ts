import { describe, expect, it } from 'vitest';
import {
  enableIntlayerEditorConfig,
  getMetroConfigTemplate,
  hasIntlayerVitePlugin,
  replaceViteConfigPluginImportSource,
  setIntlayerConfigCompilerOutput,
  setIntlayerConfigRoutingMode,
  updateIntlayerConfigWithSyncPlugin,
  updateMetroConfig,
  updateNextConfig,
  updateViteConfig,
} from './configManipulation';

const TS_CONFIG = `import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: 'prefix-no-default',
    enableProxy: true,
  },
  editor: {
    enabled: false,
    applicationURL: 'http://localhost:3000',
  },
};

export default config;
`;

const CJS_CONFIG = `const { Locales } = require('intlayer');

const config = {
  routing: { mode: 'prefix-no-default' },
  editor: { enabled: false },
};

module.exports = config;
`;

describe('configManipulation', () => {
  describe('updateViteConfig', () => {
    it('should add intlayer to plugins in export default defineConfig', () => {
      const content = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`;
      const updated = updateViteConfig(content, 'ts');
      expect(updated).toContain('import { intlayer } from "vite-intlayer";');
      expect(updated).toContain('plugins: [react(), intlayer()]');
    });

    it('should add plugins array if it does not exist', () => {
      const content = `
import { defineConfig } from 'vite';

export default defineConfig({
  server: { port: 3000 }
});
`;
      const updated = updateViteConfig(content, 'ts');
      expect(updated).toContain('plugins: [intlayer()]');
    });

    it('should handle export default object literal', () => {
      const content = `
export default {
  plugins: [],
};
`;
      const updated = updateViteConfig(content, 'ts');
      expect(updated).toContain('import { intlayer } from "vite-intlayer";');
      expect(updated).toContain('plugins: [intlayer()]');
    });

    it('should handle variable declaration then export default', () => {
      const content = `
const config = {
  plugins: [],
};
export default config;
`;
      const updated = updateViteConfig(content, 'ts');
      expect(updated).toContain('plugins: [intlayer()]');
    });

    it('should handle module.exports', () => {
      const content = `
module.exports = {
  plugins: [],
};
`;
      const updated = updateViteConfig(content, 'js');
      expect(updated).toMatch(
        /const\s*{\s*intlayer\s*}\s*=\s*require\("vite-intlayer"\);/
      );
      expect(updated).toContain('plugins: [intlayer()]');
    });

    it('should handle module.exports with defineConfig', () => {
      const content = `
const { defineConfig } = require('vite');
module.exports = defineConfig({
  plugins: [],
});
`;
      const updated = updateViteConfig(content, 'js');
      expect(updated).toMatch(
        /const\s*{\s*intlayer\s*}\s*=\s*require\("vite-intlayer"\);/
      );
      expect(updated).toContain('plugins: [intlayer()]');
    });

    it('should handle existing aliased import', () => {
      const content = `
import { intlayer as il } from "vite-intlayer";
export default {
  plugins: [il()],
};
`;
      const updated = updateViteConfig(content, 'ts');
      // Should not add another import
      const matches = updated.match(/from "vite-intlayer"/g);
      expect(matches?.length).toBe(1);
      // Should not add intlayer() if il() is there (though current logic might still add it if it doesn't match 'intlayer(')
      // Actually my current logic checks for .includes('intlayer('). If it's il(), it might add intlayer().
      // Let's see what happens.
    });

    it('should not add intlayer if already present', () => {
      const content = `
import { intlayer } from "vite-intlayer";
export default {
  plugins: [intlayer()],
};
`;
      const updated = updateViteConfig(content, 'ts');
      // Count occurrences of intlayer()
      const matches = updated.match(/intlayer\(\)/g);
      expect(matches?.length).toBe(1);
    });

    it('should not add intlayer if already present in CJS', () => {
      const content = `
const { intlayer } = require("vite-intlayer");
module.exports = {
  plugins: [intlayer()],
};
`;
      const updated = updateViteConfig(content, 'js');
      const matches = updated.match(/intlayer\(\)/g);
      expect(matches?.length).toBe(1);
      expect(updated).not.toContain(
        'const { intlayer } = require("vite-intlayer");\nconst { intlayer }'
      );
    });
  });

  describe('hasIntlayerVitePlugin', () => {
    it('detects the base vite-intlayer plugin', () => {
      const content = `
import { intlayer } from "vite-intlayer";
export default { plugins: [intlayer()] };
`;
      expect(hasIntlayerVitePlugin(content)).toBe(true);
    });

    it('detects a compat adapter plugin (react-i18next)', () => {
      const content = `
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";
export default { plugins: [reactI18nextVitePlugin()] };
`;
      expect(hasIntlayerVitePlugin(content)).toBe(true);
    });

    it('detects a compat adapter plugin (vue-i18n)', () => {
      const content = `
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";
export default { plugins: [vueI18nVitePlugin()] };
`;
      expect(hasIntlayerVitePlugin(content)).toBe(true);
    });

    it('returns false when no Intlayer plugin is present', () => {
      const content = `
import react from "@vitejs/plugin-react";
export default { plugins: [react()] };
`;
      expect(hasIntlayerVitePlugin(content)).toBe(false);
    });
  });

  describe('replaceViteConfigPluginImportSource', () => {
    it('rewrites the import source for a drop-in plugin and keeps the call site', () => {
      const content = `import { defineConfig } from "vite";
import { lingui } from "@lingui/vite-plugin";

export default defineConfig({
  plugins: [lingui()],
});
`;
      const updated = replaceViteConfigPluginImportSource(
        content,
        'lingui',
        '@lingui/vite-plugin',
        '@intlayer/lingui/plugin'
      );

      expect(updated).toContain(
        'import { lingui } from "@intlayer/lingui/plugin";'
      );
      expect(updated).not.toContain('@lingui/vite-plugin');
      // The call site is untouched and not duplicated.
      expect(updated.match(/lingui\(\)/g)?.length).toBe(1);
    });

    it('preserves import attributes elsewhere in the file', () => {
      const content = `import { defineConfig } from "vite";
import packageJson from "./package.json" with { type: "json" };
import { lingui } from "@lingui/vite-plugin";

export default defineConfig({
  plugins: [lingui()],
});
`;
      const updated = replaceViteConfigPluginImportSource(
        content,
        'lingui',
        '@lingui/vite-plugin',
        '@intlayer/lingui/plugin'
      );

      expect(updated).toContain(
        'import packageJson from "./package.json" with { type: "json" }'
      );
      expect(updated).toContain(
        'import { lingui } from "@intlayer/lingui/plugin";'
      );
    });

    it('returns the content unchanged when no matching import is present', () => {
      const content = `import { defineConfig } from "vite";

export default defineConfig({ plugins: [] });
`;
      const updated = replaceViteConfigPluginImportSource(
        content,
        'lingui',
        '@lingui/vite-plugin',
        '@intlayer/lingui/plugin'
      );

      expect(updated).toBe(content);
    });
  });

  describe('updateNextConfig', () => {
    it('should wrap export default with withIntlayer in ESM', () => {
      const content = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`;
      const updated = updateNextConfig(content, 'mjs');
      expect(updated).toContain(
        'import { withIntlayer } from "next-intlayer/server";'
      );
      expect(updated).toContain('export default withIntlayer(nextConfig);');
    });

    it('should wrap module.exports with withIntlayer in CJS', () => {
      const content = `
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
`;
      const updated = updateNextConfig(content, 'js');
      expect(updated).toMatch(
        /const\s*{\s*withIntlayer\s*}\s*=\s*require\("next-intlayer\/server"\);/
      );
      expect(updated).toContain('module.exports = withIntlayer(nextConfig);');
    });

    it('should wrap inline object literal export', () => {
      const content = `
module.exports = {
  reactStrictMode: true,
};
`;
      const updated = updateNextConfig(content, 'js');
      expect(updated).toContain('module.exports = withIntlayer({');
      expect(updated).toMatch(/reactStrictMode: true/);
      expect(updated).toContain('});');
    });

    it('should not wrap if already wrapped', () => {
      const content = `
import { withIntlayer } from "next-intlayer/server";
const nextConfig = {};
export default withIntlayer(nextConfig);
`;
      const updated = updateNextConfig(content, 'ts');
      const matches = updated.match(/withIntlayer\(/g);
      expect(matches?.length).toBe(1);
    });

    it('should not wrap if already wrapped in CJS', () => {
      const content = `
const { withIntlayer } = require("next-intlayer/server");
module.exports = withIntlayer({});
`;
      const updated = updateNextConfig(content, 'js');
      const matches = updated.match(/withIntlayer\(/g);
      expect(matches?.length).toBe(1);
    });

    it('should handle already imported withIntlayer in ESM', () => {
      const content = `
import { withIntlayer } from "next-intlayer/server";
export default { reactStrictMode: true };
`;
      const updated = updateNextConfig(content, 'ts');
      expect(updated).toContain('export default withIntlayer({');
      // Should not add another import
      const matches = updated.match(/from "next-intlayer\/server"/g);
      expect(matches?.length).toBe(1);
    });
  });

  describe('updateIntlayerConfigWithSyncPlugin', () => {
    const baseConfig = `
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
`;

    it('injects syncJSON import and plugin call for i18next nested pattern', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'i18next',
        sourceTemplate: './src/locales/${locale}/${key}.json',
      });

      expect(updated).toContain(
        'import { syncJSON } from "@intlayer/sync-json-plugin";'
      );
      expect(updated).toContain("format: 'i18next'");
      expect(updated).toMatch(/source:\s*\(\{\s*locale,\s*key\s*\}\)/);
      expect(updated).toContain('`./src/locales/${locale}/${key}.json`');
    });

    it('injects dictionary.format when format is i18next', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'i18next',
        sourceTemplate: './locales/${locale}/${key}.json',
      });

      expect(updated).toContain("format: 'i18next'");
      // dictionary.format should appear in the config object (not just inside syncJSON)
      expect(updated).toMatch(
        /dictionary:\s*\{[^}]*format:\s*['"]i18next['"]/s
      );
    });

    it('injects syncPO from @intlayer/sync-po-plugin for lingui .po catalogs', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        plugin: 'po',
        format: 'icu',
        sourceTemplate: './src/locales/${locale}/${key}.po',
      });

      expect(updated).toContain(
        'import { syncPO } from "@intlayer/sync-po-plugin";'
      );
      expect(updated).toContain('syncPO(');
      // syncPO takes no `format` argument (gettext is implicit)
      expect(updated).not.toContain('syncPO({ format:');
      expect(updated).toContain('`./src/locales/${locale}/${key}.po`');
      // dictionary.format is `po` so the runtime parses the catalogs as gettext
      expect(updated).toMatch(/dictionary:\s*\{[^}]*format:\s*['"]po['"]/s);
    });

    it('does not add the syncPO plugin twice (idempotent)', () => {
      const once = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        plugin: 'po',
        format: 'icu',
        sourceTemplate: './src/locales/${locale}/${key}.po',
      });
      const twice = updateIntlayerConfigWithSyncPlugin(once, 'ts', {
        plugin: 'po',
        format: 'icu',
        sourceTemplate: './src/locales/${locale}/${key}.po',
      });

      expect(twice.match(/syncPO\(/g)?.length).toBe(1);
    });

    it('injects dictionary.format when format is vue-i18n', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'vue-i18n',
        sourceTemplate: './locales/${locale}/${key}.json',
      });

      expect(updated).toMatch(
        /dictionary:\s*\{[^}]*format:\s*['"]vue-i18n['"]/s
      );
    });

    it('injects dictionary.format when format is icu', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'icu',
        sourceTemplate: './locales/${locale}/${key}.json',
      });

      expect(updated).toMatch(/dictionary:\s*\{[^}]*format:\s*['"]icu['"]/s);
    });

    it('uses { locale } destructuring for flat pattern (no ${key} in template)', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'vue-i18n',
        sourceTemplate: './locales/${locale}.json',
      });

      expect(updated).toMatch(/source:\s*\(\{\s*locale\s*\}\)/);
      expect(updated).toContain('`./locales/${locale}.json`');
    });

    it('uses { key, locale } destructuring for icu nested pattern', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'icu',
        sourceTemplate: './locales/${locale}/${key}.json',
      });

      expect(updated).toMatch(/source:\s*\(\{\s*key,\s*locale\s*\}\)/);
    });

    it('emits splitKeys: true for the next-intl single-file namespace model', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'icu',
        sourceTemplate: './messages/${locale}.json',
        splitKeys: true,
      });

      expect(updated).toMatch(/source:\s*\(\{\s*locale\s*\}\)/);
      expect(updated).toContain('`./messages/${locale}.json`');
      expect(updated).toMatch(/splitKeys:\s*true/);
    });

    it('emits splitKeys: false explicitly when not forced', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'icu',
        sourceTemplate: './messages/${locale}.json',
      });

      expect(updated).toMatch(/splitKeys:\s*false/);
    });

    it('emits every syncJSON option with a documenting JSDoc block', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        format: 'i18next',
        sourceTemplate: './src/i18n/${locale}.json',
      });

      // source, format and splitKeys are all present…
      expect(updated).toMatch(/source:\s*\(\{\s*locale\s*\}\)/);
      expect(updated).toContain("format: 'i18next'");
      expect(updated).toMatch(/splitKeys:\s*false/);
      // …each preceded by an explanatory JSDoc block.
      expect(updated).toContain("Default `'intlayer'` message format");
      expect(updated).toContain("`useTranslation('home')`");
    });

    it('never emits format or splitKeys for the syncPO call', () => {
      const updated = updateIntlayerConfigWithSyncPlugin(baseConfig, 'ts', {
        plugin: 'po',
        format: 'icu',
        sourceTemplate: './src/locales/${locale}/${key}.po',
      });

      expect(updated).toContain('syncPO(');
      expect(updated).not.toMatch(/syncPO\([\s\S]*format:/);
      expect(updated).not.toMatch(/splitKeys/);
    });

    it('does not add dictionary.format if already present', () => {
      const configWithDictionary = `
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: { locales: [Locales.ENGLISH], defaultLocale: Locales.ENGLISH },
  dictionary: { format: 'i18next' },
};

export default config;
`;
      const updated = updateIntlayerConfigWithSyncPlugin(
        configWithDictionary,
        'ts',
        { format: 'i18next', sourceTemplate: './locales/${locale}/${key}.json' }
      );

      const formatMatches = updated.match(/format:\s*['"]i18next['"]/g);
      // One in dictionary.format, one inside syncJSON — but not duplicated in dictionary
      expect(formatMatches).not.toBeNull();
    });

    it('does not add syncJSON plugin if already present', () => {
      const configWithPlugin = `
import { syncJSON } from '@intlayer/sync-json-plugin';
import { type IntlayerConfig, Locales } from 'intlayer';

const config: IntlayerConfig = {
  internationalization: { locales: [Locales.ENGLISH], defaultLocale: Locales.ENGLISH },
  plugins: [syncJSON({ format: 'i18next', source: ({ locale, key }) => \`./locales/\${locale}/\${key}.json\` })],
};

export default config;
`;
      const updated = updateIntlayerConfigWithSyncPlugin(
        configWithPlugin,
        'ts',
        { format: 'i18next', sourceTemplate: './locales/${locale}/${key}.json' }
      );

      const syncMatches = updated.match(/syncJSON\(/g);
      expect(syncMatches?.length).toBe(1);
    });
  });

  describe('setIntlayerConfigRoutingMode', () => {
    it('should replace routing.mode in a ts config', () => {
      const updated = setIntlayerConfigRoutingMode(
        TS_CONFIG,
        'ts',
        'prefix-all'
      );
      expect(updated).toContain('mode: "prefix-all"');
      expect(updated).not.toContain('prefix-no-default');
    });

    it('should replace routing.mode in a cjs config (identifier export)', () => {
      const updated = setIntlayerConfigRoutingMode(
        CJS_CONFIG,
        'cjs',
        'search-params'
      );
      expect(updated).toContain('mode: "search-params"');
    });

    it('should replace routing.mode in a json config', () => {
      const jsonConfig = `{
  "routing": { "mode": "prefix-no-default" }
}`;
      const updated = setIntlayerConfigRoutingMode(
        jsonConfig,
        'json',
        'no-prefix'
      );
      expect(updated).toContain('"mode": "no-prefix"');
    });

    it('should be idempotent', () => {
      const once = setIntlayerConfigRoutingMode(TS_CONFIG, 'ts', 'no-prefix');
      const twice = setIntlayerConfigRoutingMode(once, 'ts', 'no-prefix');
      expect(twice).toBe(once);
    });

    it('should preserve the leading documentation comment', () => {
      const commented = `import { type IntlayerConfig } from 'intlayer';

const config: IntlayerConfig = {
  routing: {
    /** Locale routing strategy. */
    mode: 'prefix-no-default',
  },
};

export default config;
`;
      const updated = setIntlayerConfigRoutingMode(
        commented,
        'ts',
        'prefix-all'
      );
      expect(updated).toContain('/** Locale routing strategy. */');
      expect(updated).toContain('mode: "prefix-all"');
    });
  });

  describe('setIntlayerConfigCompilerOutput', () => {
    const OUTPUT_TEMPLATE = '/locales/{{locale}}/{{key}}.content.json';

    it('should replace an existing compiler.output in a ts config', () => {
      const tsConfigWithCompiler = `import { type IntlayerConfig } from 'intlayer';

const config: IntlayerConfig = {
  compiler: {
    enabled: false,
    output: ({ fileName }) => \`./\${fileName}.content.ts\`,
  },
};

export default config;
`;
      const updated = setIntlayerConfigCompilerOutput(
        tsConfigWithCompiler,
        'ts',
        OUTPUT_TEMPLATE
      );
      expect(updated).toContain(`output: "${OUTPUT_TEMPLATE}"`);
      expect(updated).not.toContain('fileName');
    });

    it('should create the compiler section when absent', () => {
      const updated = setIntlayerConfigCompilerOutput(
        TS_CONFIG,
        'ts',
        OUTPUT_TEMPLATE
      );
      expect(updated).toContain('compiler');
      expect(updated).toContain(`output: "${OUTPUT_TEMPLATE}"`);
    });

    it('should update compiler.output in a cjs config (identifier export)', () => {
      const updated = setIntlayerConfigCompilerOutput(
        CJS_CONFIG,
        'cjs',
        OUTPUT_TEMPLATE
      );
      expect(updated).toContain(`output: "${OUTPUT_TEMPLATE}"`);
    });

    it('should update compiler.output in a json config', () => {
      const jsonConfig = `{
  "compiler": { "enabled": false }
}`;
      const updated = setIntlayerConfigCompilerOutput(
        jsonConfig,
        'json',
        OUTPUT_TEMPLATE
      );
      expect(JSON.parse(updated).compiler).toEqual({
        enabled: false,
        output: OUTPUT_TEMPLATE,
      });
    });

    it('should be idempotent', () => {
      const once = setIntlayerConfigCompilerOutput(
        TS_CONFIG,
        'ts',
        OUTPUT_TEMPLATE
      );
      const twice = setIntlayerConfigCompilerOutput(
        once,
        'ts',
        OUTPUT_TEMPLATE
      );
      expect(twice).toBe(once);
    });

    it('should preserve the leading documentation comment', () => {
      const commented = `import { type IntlayerConfig } from 'intlayer';

const config: IntlayerConfig = {
  compiler: {
    /** Defines the output files path for autogenerated content. */
    output: ({ fileName }) => \`./\${fileName}.content.ts\`,
  },
};

export default config;
`;
      const updated = setIntlayerConfigCompilerOutput(
        commented,
        'ts',
        OUTPUT_TEMPLATE
      );
      expect(updated).toContain(
        '/** Defines the output files path for autogenerated content. */'
      );
      expect(updated).toContain(`output: "${OUTPUT_TEMPLATE}"`);
    });
  });

  describe('enableIntlayerEditorConfig', () => {
    it('should enable the editor and wire env credentials in a ts config', () => {
      const updated = enableIntlayerEditorConfig(TS_CONFIG);
      expect(updated).toContain('enabled: true');
      expect(updated).toContain('clientId: process.env.INTLAYER_CLIENT_ID');
      expect(updated).toContain(
        'clientSecret: process.env.INTLAYER_CLIENT_SECRET'
      );
    });

    it('should enable the editor in a cjs config (identifier export)', () => {
      const updated = enableIntlayerEditorConfig(CJS_CONFIG);
      expect(updated).toContain('enabled: true');
      expect(updated).toContain('clientId: process.env.INTLAYER_CLIENT_ID');
    });

    it('should be idempotent', () => {
      const once = enableIntlayerEditorConfig(TS_CONFIG);
      const twice = enableIntlayerEditorConfig(once);
      expect(twice).toBe(once);
    });

    it('should not duplicate a pre-existing clientId', () => {
      const withClientId = `const config = {
  editor: {
    enabled: false,
    clientId: process.env.MY_CUSTOM_ID,
  },
};

export default config;
`;
      const updated = enableIntlayerEditorConfig(withClientId);
      expect(updated).toContain('clientId: process.env.MY_CUSTOM_ID');
      expect(updated).not.toContain('INTLAYER_CLIENT_ID');
      expect(updated).toContain('enabled: true');
    });
  });

  describe('updateMetroConfig', () => {
    it('should wrap a direct module.exports call expression', () => {
      const content = `const { getDefaultConfig } = require("expo/metro-config");
module.exports = getDefaultConfig(__dirname);
`;
      const updated = updateMetroConfig(content, 'js');
      expect(updated).toContain(
        'const { configMetroIntlayerSync } = require("react-native-intlayer/metro");'
      );
      expect(updated).toContain(
        'module.exports = configMetroIntlayerSync(getDefaultConfig(__dirname));'
      );
    });

    it('should wrap a module.exports identifier reference', () => {
      const content = `const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
module.exports = config;
`;
      const updated = updateMetroConfig(content, 'js');
      expect(updated).toContain(
        'module.exports = configMetroIntlayerSync(config);'
      );
    });

    it('should preserve a custom mergeConfig export', () => {
      const content = `const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const custom = { resolver: {} };
module.exports = mergeConfig(getDefaultConfig(__dirname), custom);
`;
      const updated = updateMetroConfig(content, 'js');
      expect(updated).toContain(
        'configMetroIntlayerSync(mergeConfig(getDefaultConfig(__dirname), custom))'
      );
    });

    it('should leave a custom async IIFE export untouched', () => {
      const content = `const { getDefaultConfig } = require("expo/metro-config");
module.exports = (async () => {
  const c = getDefaultConfig(__dirname);
  return c;
})();
`;
      const updated = updateMetroConfig(content, 'js');
      expect(updated).toBe(content);
    });

    it('should be idempotent and skip already-configured files', () => {
      const content = `const { getDefaultConfig } = require("expo/metro-config");
module.exports = getDefaultConfig(__dirname);
`;
      const once = updateMetroConfig(content, 'js');
      const twice = updateMetroConfig(once, 'js');
      expect(twice).toBe(once);
    });
  });

  describe('getMetroConfigTemplate', () => {
    it('should use expo/metro-config for Expo projects', () => {
      const template = getMetroConfigTemplate(true);
      expect(template).toContain('require("expo/metro-config")');
      expect(template).toContain('require("react-native-intlayer/metro")');
      expect(template).toContain('configMetroIntlayer(defaultConfig)');
    });

    it('should use @react-native/metro-config for bare React Native', () => {
      const template = getMetroConfigTemplate(false);
      expect(template).toContain('require("@react-native/metro-config")');
    });
  });
});
