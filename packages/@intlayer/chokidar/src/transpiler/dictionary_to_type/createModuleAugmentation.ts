import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { basename, join, relative } from 'path';
import { Locales, getConfiguration } from '@intlayer/config';
import { sync } from 'glob';
import { getFileHash, transformToCamelCase } from '../../utils';

const { content, internationalization } = getConfiguration();
const { typesDir, moduleAugmentationDir } = content;
const { locales, strictMode } = internationalization;

export const getTypeName = (id: string): string =>
  transformToCamelCase(`${id}Content`);

/**
 * This function generates the content of the module augmentation file
 */
const generateTypeIndexContent = (typeFiles: string[]): string => {
  let content = "/* eslint-disable */\nimport { Locales } from 'intlayer'\n";

  const dictionariesRef = typeFiles.map((dictionaryPath) => ({
    relativePath: relative(moduleAugmentationDir, dictionaryPath),
    id: basename(dictionaryPath, '.d.ts'), // Get the base name as the dictionary id
    hash: `_${getFileHash(dictionaryPath)}`, // Get the hash of the dictionary to avoid conflicts
  }));

  // Import all dictionaries
  dictionariesRef.forEach((dictionary) => {
    const typeName = getTypeName(dictionary.id);
    content += `import type { ${typeName} as ${dictionary.hash} } from '${dictionary.relativePath}';\n`;
  });

  content += '\n';

  // Format Dictionary Map
  const formattedDictionaryMap: string = dictionariesRef
    .map((dictionary) => `    "${dictionary.id}": ${dictionary.hash};`)
    .join('\n');

  const formatLocales = locales
    .map((locale) => {
      for (const key in Locales) {
        if (Locales[key as keyof typeof Locales] === locale) {
          return `Locales.${key}`;
        }
      }
    })
    .join(' | ');

  const strictModeRecord =
    strictMode === 'strict'
      ? `interface IConfigLocales<Content> extends Record<ExtractedLocales, Content> {}`
      : strictMode === 'required_only'
        ? `interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}`
        : `interface IConfigLocales<Content> extends Partial<Record<Locales, Content>> {}`;

  /**
   * Write the module augmentation to extend the intlayer module with the dictionaries types
   * Will suggest the type resulting of the dictionaries
   *
   * declare module 'intlayer' {
   *   interface IntlayerDictionaryTypesConnector = {
   *     dictionaries: {
   *       id: DictionaryType;
   *     }
   *   }
   *
   *   type ConfigLocales = Locales.ENGLISH | Locales.FRENCH | Locales.SPANISH;
   *   type ExtractedLocales = Extract<Locales, ConfigLocales>;
   *   type ExcludedLocales = Exclude<Locales, ConfigLocales>;
   *
   *   interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
   *
   *
   * }
   * See https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
   */
  content += `declare module 'intlayer' {\n`;
  content += `  interface IntlayerDictionaryTypesConnector {\n${formattedDictionaryMap}\n  }\n\n`;
  content += `  type ConfigLocales = ${formatLocales};\n`;
  content += `  type ExtractedLocales = Extract<Locales, ConfigLocales>;\n`;
  content += `  type ExcludedLocales = Exclude<Locales, ConfigLocales>;\n\n`;
  content += `  ${strictModeRecord}\n`;
  content += `}`;

  return content;
};

/**
 * This function generates a index file merging all the types
 */
export const createModuleAugmentation = () => {
  // Create main directory if it doesn't exist
  if (!existsSync(moduleAugmentationDir)) {
    mkdirSync(moduleAugmentationDir, { recursive: true });
  }

  const dictionaries: string[] = sync(`${typesDir}/**/*.d.ts`);
  // Create the dictionary list file

  const tsContent = generateTypeIndexContent(dictionaries);
  writeFileSync(join(moduleAugmentationDir, 'intlayer.d.ts'), tsContent);
};
