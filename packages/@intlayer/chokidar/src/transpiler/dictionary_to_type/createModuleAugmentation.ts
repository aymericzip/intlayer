import { Locales, getConfiguration, normalizePath } from '@intlayer/config';
import fg from 'fast-glob';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { basename, extname, join, relative } from 'path';
import { getFileHash } from '../../utils/getFileHash';
import { kebabCaseToCamelCase } from '../../utils/kebabCaseToCamelCase';

export const getTypeName = (key: string): string =>
  `${kebabCaseToCamelCase(key)}Content`;

const formatLocales = (locales: Locales[]): string =>
  locales
    .map((locale) => {
      for (const key in Locales) {
        if (Locales[key as keyof typeof Locales] === locale) {
          return `Locales.${key}`;
        }
      }
    })
    .join(' | ');

/**
 * This function generates the content of the module augmentation file
 */
const generateTypeIndexContent = (
  typeFiles: string[],
  configuration = getConfiguration()
): string => {
  const { content, internationalization } = configuration;
  const { moduleAugmentationDir } = content;
  const { locales, requiredLocales, strictMode } = internationalization;

  let fileContent =
    "/* eslint-disable */\nimport { Locales } from 'intlayer';\n";

  const dictionariesRef = typeFiles.map((dictionaryPath) => ({
    relativePath: `./${relative(moduleAugmentationDir, dictionaryPath)}`,
    id: basename(dictionaryPath, extname(dictionaryPath)), // Get the base name as the dictionary id (without the extension)
    hash: `_${getFileHash(dictionaryPath)}`, // Get the hash of the dictionary to avoid conflicts
  }));

  // Import all dictionaries
  dictionariesRef.forEach((dictionary) => {
    fileContent += `import ${dictionary.hash} from '${dictionary.relativePath}';\n`;
  });

  fileContent += '\n';

  // Format Dictionary Map
  const formattedDictionaryMap: string = dictionariesRef
    .map((dictionary) => `    "${dictionary.id}": typeof ${dictionary.hash};`)
    .join('\n');

  const requiredLocalesValues =
    requiredLocales.length > 0
      ? requiredLocales.filter((locale) =>
          locales.map((locale) => String(locale)).includes(String(locale))
        )
      : locales;

  const formattedLocales = formatLocales(locales);
  const formattedRequiredLocales = formatLocales(requiredLocalesValues);

  const strictModeRecord =
    strictMode === 'strict'
      ? `interface IConfigLocales<Content> extends Record<DeclaredLocales, Content> {}`
      : strictMode === 'inclusive'
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
   *
   *   interface IConfigLocales<Content> extends Record<ExtractedLocales, Content>, Partial<Record<ExcludedLocales, Content>> {}
   *
   *
   * }
   * See https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
   */
  fileContent += `declare module 'intlayer' {\n`;
  fileContent += `  interface IntlayerDictionaryTypesConnector {\n${formattedDictionaryMap}\n  }\n\n`;
  fileContent += `  type DeclaredLocales = ${formattedLocales};\n`;
  fileContent += `  type RequiredLocales = ${formattedRequiredLocales};\n`;
  fileContent += `  type ExtractedLocales = Extract<Locales, RequiredLocales>;\n`;
  fileContent += `  type ExcludedLocales = Exclude<Locales, RequiredLocales>;\n`;
  fileContent += `  ${strictModeRecord}\n`;
  fileContent += `}`;

  return fileContent;
};

/**
 * This function generates a index file merging all the types
 */
export const createModuleAugmentation = (
  configuration = getConfiguration()
) => {
  const { moduleAugmentationDir, typesDir } = configuration.content;

  // Create main directory if it doesn't exist
  if (!existsSync(moduleAugmentationDir)) {
    mkdirSync(moduleAugmentationDir, { recursive: true });
  }

  const dictionariesTypesDefinitions: string[] = fg.sync(
    normalizePath(`${typesDir}/*.ts`),
    {
      ignore: ['**/*.d.ts'],
    }
  );
  // Create the dictionary list file

  const tsContent = generateTypeIndexContent(dictionariesTypesDefinitions);
  writeFileSync(join(moduleAugmentationDir, 'intlayer.d.ts'), tsContent);
};
