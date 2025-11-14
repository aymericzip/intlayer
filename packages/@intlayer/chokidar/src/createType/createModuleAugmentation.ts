import { mkdir } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';
import { kebabCaseToCamelCase, normalizePath } from '@intlayer/config';
import type { IntlayerConfig, Locale } from '@intlayer/types';
import fg from 'fast-glob';
import { getFileHash } from '../utils/getFileHash';
import { writeFileIfChanged } from '../writeFileIfChanged';

export const getTypeName = (key: string): string =>
  `${kebabCaseToCamelCase(key)}Content`;

/** Returns lines like: [Locales.FRENCH]: 1; */
const formatLocales = (locales: Locale[]) =>
  locales.map((locale) => `    "${locale}": 1;`).join('\n');

/** Generate the content of the module augmentation file */
const generateTypeIndexContent = (
  typeFiles: string[],
  configuration: IntlayerConfig
): string => {
  const { content, internationalization } = configuration;
  const { moduleAugmentationDir } = content;
  const { locales, requiredLocales, strictMode } = internationalization;

  let fileContent = 'import "intlayer";\n';

  // Build dictionary refs
  const dictionariesRef = typeFiles.map((dictionaryPath) => ({
    relativePath: `./${relative(moduleAugmentationDir, dictionaryPath)}`,
    id: basename(dictionaryPath, extname(dictionaryPath)),
    hash: `_${getFileHash(dictionaryPath)}`,
  }));

  // Import all dictionaries
  for (const dictionary of dictionariesRef) {
    fileContent += `import ${dictionary.hash} from '${dictionary.relativePath}';\n`;
  }
  fileContent += '\n';

  // Dictionary map entries (id: typeof <hash>)
  const formattedDictionaryMap: string = dictionariesRef
    .map((dictionary) => `    "${dictionary.id}": typeof ${dictionary.hash};`)
    .join('\n');

  // Ensure required ⊆ declared; if empty, default required = declared
  const declared = locales;
  const requiredSanitized = requiredLocales?.length
    ? requiredLocales.filter((requiredLocales) =>
        declared.includes(requiredLocales)
      )
    : declared;

  const formattedDeclaredLocales = formatLocales(declared);
  const formattedRequiredLocales = formatLocales(requiredSanitized);

  // Choose strict mode registry key
  const strictKey =
    strictMode === 'strict'
      ? 'strict'
      : strictMode === 'inclusive'
        ? 'inclusive'
        : 'loose';

  /**
   * Module augmentation that ONLY adds keys to registries.
   * No types/aliases redefined here—avoids merge conflicts.
   */
  fileContent += `declare module 'intlayer' {\n`;
  // Dictionaries registry
  fileContent += `  interface __DictionaryRegistry {\n${formattedDictionaryMap}\n  }\n\n`;
  // Locales registries
  fileContent += `  interface __DeclaredLocalesRegistry {\n${formattedDeclaredLocales}\n  }\n\n`;
  fileContent += `  interface __RequiredLocalesRegistry {\n${formattedRequiredLocales}\n  }\n\n`;
  // Resolved strict mode (narrow the literal at build time)
  fileContent += `  interface __StrictModeRegistry { mode: '${strictKey}' }\n`;
  fileContent += `}\n`;

  return fileContent;
};

/** Generate the index file merging all the types */
export const createModuleAugmentation = async (
  configuration: IntlayerConfig
) => {
  const { moduleAugmentationDir, typesDir } = configuration.content;

  await mkdir(moduleAugmentationDir, { recursive: true });

  const dictionariesTypesDefinitions: string[] = await fg(
    normalizePath(`${typesDir}/*.ts`),
    { ignore: ['**/*.d.ts'] }
  );

  const tsContent = generateTypeIndexContent(
    dictionariesTypesDefinitions,
    configuration
  );

  const tsFilePath = join(moduleAugmentationDir, 'intlayer.d.ts');
  await writeFileIfChanged(tsFilePath, tsContent);
};
