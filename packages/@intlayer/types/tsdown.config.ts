import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

const enforcePureEsmExportsPlugin = () => ({
  name: 'enforce-pure-esm-exports',
  renderChunk(code: string) {
    if (!code.includes('locales_exports')) return null;

    let newCode = code;

    if (code.includes('var locales_exports =')) {
      // 1. Delete the grouped object block entirely
      // Matches both standard objects and __exportAll wrappers
      newCode = newCode.replace(
        /var locales_exports = \/\* @__PURE__ \*\/ (?:__exportAll\()?\{[\s\S]*?\}\)?;\n?/g,
        ''
      );

      // 2. Force all top-level constants to become named exports
      // Targets ALL_CAPS identifiers to specifically hit your locale constants
      newCode = newCode.replace(
        /^(\s*)(?:export\s+)?const ([A-Z0-9_]+) =/gm,
        '$1export const $2 ='
      );

      // 3. Clean up the leftover export statement that referenced the deleted object
      newCode = newCode.replace(
        /export\s*\{[^}]*locales_exports[^}]*\}\s*;/g,
        ''
      );

      // 4. Clean up the __exportAll import if it exists
      newCode = newCode.replace(
        /import\s+\{\s*__exportAll\s*\}\s*from\s*['"][^'"]+['"];?\n?/g,
        ''
      );
    } else {
      // Fix imports of locales_exports in other chunks (like allLocales.mjs)
      // Since it's no longer a named export, we import the entire module namespace
      newCode = newCode.replace(
        /import\s+\{\s*locales_exports\s*\}\s*from\s*(['"][^'"]+['"]);?/g,
        'import * as locales_exports from $1;'
      );
    }

    return { code: newCode, map: null };
  },
});

const options: UserConfig[] = getOptions({
  all: {
    platform: 'neutral',
    deps: {
      neverBundle: ['intlayer'],
    },
    unbundle: true, // Set to false for locales object to be tree shaken
    treeshake: false,
  },
  esm: {
    plugins: [enforcePureEsmExportsPlugin()],
  },
  types: {
    dts: {
      oxc: true,
      emitDtsOnly: true,
    },
  },
});

export default defineConfig(options);
