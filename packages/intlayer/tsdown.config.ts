// packages/intlayer/tsdown.config.ts
import { getOptions } from '@utils/tsdown-config';
import { defineConfig, type UserConfig } from 'tsdown';

/**
 * This plugin is a fix to preserve direct exports of ALL_LOCALES and Locales
 *
 * Turbopack does not tree-shake if the import is named as
 *
 * ```typescript
 * import { ALL_LOCALES } from '@intlayer/types/allLocales';
 * import * as Locales from '@intlayer/types/locales';
 *
 * export { ALL_LOCALES, Locales };
 * ```
 *
 * @returns {import('tsdown').Plugin}
 */
const PreserveDirectExportsPlugin = () => ({
  name: 'preserve-direct-exports',
  renderChunk(code: string, chunk: any) {
    // Strictly limit to the ESM output. Do not touch CJS.
    if (chunk.fileName === 'index.mjs') {
      let newCode = code.replace(
        /import\s+\{\s*ALL_LOCALES\s*\}\s+from\s+['"]@intlayer\/types\/allLocales['"];\n?/,
        ''
      );
      newCode = newCode.replace(
        /import\s+\*\s+as\s+Locales\s+from\s+['"]@intlayer\/types\/locales['"];\n?/,
        ''
      );

      // Remove them from the grouped export {} block
      newCode = newCode.replace(/\bALL_LOCALES,\s*/g, '');
      newCode = newCode.replace(/\bLocales,\s*/g, '');

      // Append the correct ESM syntax to the bottom of the file
      newCode += `\nexport { ALL_LOCALES } from "@intlayer/types/allLocales";`;
      newCode += `\nexport * as Locales from "@intlayer/types/locales";\n`;

      return newCode;
    }
    return null;
  },
});

const options: UserConfig[] = getOptions({
  all: {
    unbundle: false,
    treeshake: false,
    minify: false,
    plugins: [PreserveDirectExportsPlugin()],
  },
});

export default defineConfig(options);
