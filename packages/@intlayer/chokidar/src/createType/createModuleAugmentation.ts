import { mkdir } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';
import { kebabCaseToCamelCase, normalizePath } from '@intlayer/config';
import type { IntlayerConfig, Locale } from '@intlayer/types';
import fg from 'fast-glob';
import { printNode, zodToTs } from 'zod-to-ts';
import { getFileHash } from '../utils/getFileHash';
import { writeFileIfChanged } from '../writeFileIfChanged';

export const getTypeName = (key: string): string =>
  `${kebabCaseToCamelCase(key)}Content`;

/** Returns lines like: [Locales.FRENCH]: 1; */
const formatLocales = (locales: Locale[]) =>
  locales.map((locale) => `    "${locale}": 1;`).join('\n');

const zodToTsString = (schema: any): string => {
  if (!schema) return 'any';

  // Support both real Zod objects (_def) and serialized versions (def or nested)
  const def = schema._def ?? schema.def ?? schema;

  // Handle serialized type names (sometimes 'type' instead of 'typeName')
  const typeName = def.typeName ?? def.type;

  switch (typeName) {
    case 'ZodString':
    case 'string':
      return 'string';
    case 'ZodNumber':
    case 'number':
      return 'number';
    case 'ZodBoolean':
    case 'boolean':
      return 'boolean';
    case 'ZodNull':
    case 'null':
      return 'null';
    case 'ZodUndefined':
    case 'undefined':
      return 'undefined';
    case 'ZodArray':
    case 'array':
      return `${zodToTsString(def.type ?? def.element)}[]`;
    case 'ZodObject':
    case 'object': {
      const shape = typeof def.shape === 'function' ? def.shape() : def.shape;
      if (!shape) return 'Record<string, any>';

      const entries = Object.entries(shape)
        .map(([k, v]) => `      "${k}": ${zodToTsString(v)};`)
        .join('\n');
      return `{\n${entries}\n    }`;
    }
    case 'ZodOptional':
    case 'optional':
      return `${zodToTsString(def.innerType ?? def.wrapped)} | undefined`;
    case 'ZodNullable':
    case 'nullable':
      return `${zodToTsString(def.innerType ?? def.wrapped)} | null`;
    case 'ZodUnion':
    case 'union': {
      const options = def.options ?? [];
      return options.map(zodToTsString).join(' | ');
    }
    case 'ZodIntersection':
    case 'intersection':
      return `${zodToTsString(def.left)} & ${zodToTsString(def.right)}`;
    case 'ZodEnum':
    case 'enum': {
      const values = def.values ?? [];
      return values.map((v: string) => `"${v}"`).join(' | ');
    }
    case 'ZodLiteral':
    case 'literal': {
      const value = def.value;
      return typeof value === 'string' ? `"${value}"` : String(value);
    }
    default:
      return 'any';
  }
};

/** Generate the content of the module augmentation file */
const generateTypeIndexContent = (
  typeFiles: string[],
  configuration: IntlayerConfig
): string => {
  const { content, internationalization } = configuration;
  const { moduleAugmentationDir } = content;
  const { locales, requiredLocales, strictMode } = internationalization;

  let fileContent = 'import "intlayer";\n';
  fileContent += 'import type { z } from "zod";\n';

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

  // Build schema registry
  const schemas = configuration.schemas ?? {};
  const formattedSchemas = Object.entries(schemas)
    .map(([key, schema]) => {
      let typeStr = 'any';

      if (schema) {
        try {
          const { node } = zodToTs(schema as any, key);
          // 133 is the kind for AnyKeyword in TypeScript
          if ((node as any).kind !== 133) {
            typeStr = printNode(node);
          } else {
            // Fallback to custom string generator if zodToTs returns any
            typeStr = zodToTsString(schema);
          }
        } catch (_e) {
          // Fallback to custom string generator
          typeStr = zodToTsString(schema);
        }
      }
      return `    "${key}": ${typeStr};`;
    })
    .join('\n');

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
  // Schema registry
  fileContent += `  interface __SchemaRegistry {\n${formattedSchemas}\n  }\n\n`;
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
