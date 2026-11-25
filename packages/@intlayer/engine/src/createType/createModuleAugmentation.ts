import { mkdir } from 'node:fs/promises';
import { basename, extname, join, relative } from 'node:path';
import { kebabCaseToCamelCase, normalizePath } from '@intlayer/config/utils';
import {
  getDomainOrigin,
  getRewriteRules,
  isLocaleExclusiveOnDomain,
} from '@intlayer/core/localization';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig, RoutingConfig } from '@intlayer/types/config';
import fg from 'fast-glob';
import { getPathHash } from '../utils';
import { writeFileIfChanged } from '../writeFileIfChanged';

export const getTypeName = (key: string): string =>
  `${kebabCaseToCamelCase(key)}Content`;

/** Returns lines like: [Locales.FRENCH]: 1; */
const formatLocales = (locales: Locale[]) =>
  locales.map((locale) => `    "${locale}": 1;`).join('\n');

/**
 * Serializes the `url` rewrite rules as a type literal, so `getLocalizedPath`
 * and `getLocalizedUrl` can resolve a canonical path to its localized literal at
 * the type level. Returns an empty string when the project declares no rewrite —
 * the consuming types then localize every path to itself.
 *
 * Rules are emitted in their normalized form (`:param`, no locale prefix), which
 * is exactly what the runtime matches against.
 */
export const formatRewriteRules = (
  rewrite: RoutingConfig['rewrite']
): string => {
  const rewriteRules = getRewriteRules(rewrite, 'url');

  if (!rewriteRules?.rules?.length) return '';

  const formattedRules = rewriteRules.rules
    .map(({ canonical, localized }) => {
      const formattedLocalized = Object.entries(localized)
        .filter(([, pattern]) => typeof pattern === 'string')
        .map(([locale, pattern]) => `'${locale}': '${pattern}'`)
        .join('; ');

      return `'${canonical}': { ${formattedLocalized} }`;
    })
    .join('; ');

  return `; rewrite: { ${formattedRules} }`;
};

/**
 * Serializes the `routing.domains` map as a type literal, so `getLocalizedUrl`
 * and `getLocalizedPath` can resolve the origin of a locale — and the
 * suppression of its path prefix — at the type level. Returns an empty string
 * when the project maps no locale to a domain.
 *
 * Each entry carries the two facts the consuming types need, both computed with
 * the very helpers the runtime uses:
 * - `origin`: the normalized origin ({@link getDomainOrigin}), prepended to the
 *   localized path when the target locale lives on another domain.
 * - `exclusive`: whether the locale is the only one on that hostname
 *   ({@link isLocaleExclusiveOnDomain}), in which case the domain identifies the
 *   locale and no path prefix is emitted.
 */
export const formatDomains = (domains: RoutingConfig['domains']): string => {
  const domainEntries = Object.entries(domains ?? {}).filter(
    ([, domain]) => typeof domain === 'string' && domain.length > 0
  ) as [string, string][];

  if (!domainEntries.length) return '';

  const formattedDomains = domainEntries
    .map(
      ([locale, domain]) =>
        `'${locale}': { origin: '${getDomainOrigin(domain)}'; exclusive: ${isLocaleExclusiveOnDomain(locale, domains)} }`
    )
    .join('; ');

  return `; domains: { ${formattedDomains} }`;
};

export const zodToTsString = (schema: any): string => {
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
      return `Array<${zodToTsString(def.element ?? def.type)}>`;
    case 'ZodObject':
    case 'object': {
      const shape = typeof def.shape === 'function' ? def.shape() : def.shape;
      if (!shape) return 'Record<string, any>';

      const entries = Object.entries(shape)
        .map(
          ([k, v]: [string, any]) =>
            `      ${JSON.stringify(k)}${['optional', 'ZodOptional', 'default', 'ZodDefault'].includes(v?._def?.type ?? v?._def?.typeName) ? '?' : ''}: ${zodToTsString(v)};`
        )
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
    case 'ZodDefault':
    case 'default':
    case 'ZodCatch':
    case 'catch':
    case 'ZodReadonly':
    case 'readonly':
      return zodToTsString(def.innerType);
    case 'ZodRecord':
    case 'record':
      return `Record<${zodToTsString(def.keyType)}, ${zodToTsString(def.valueType)}>`;
    case 'ZodTuple':
    case 'tuple':
      return `[${(def.items ?? []).map(zodToTsString).join(', ')}${def.rest ? `, ...${zodToTsString(def.rest)}[]` : ''}]`;
    case 'ZodIntersection':
    case 'intersection':
      return `${zodToTsString(def.left)} & ${zodToTsString(def.right)}`;
    case 'ZodEnum':
    case 'enum': {
      const values = def.values ?? Object.values(def.entries ?? {});
      return (
        values.map((value: unknown) => JSON.stringify(value)).join(' | ') ||
        'never'
      );
    }
    case 'ZodLiteral':
    case 'literal': {
      const values = def.values ?? [def.value];
      return values.map((value: unknown) => JSON.stringify(value)).join(' | ');
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
  const { internationalization, system, editor, routing } = configuration;
  const { moduleAugmentationDir } = system;
  const { enabled } = editor;
  const { locales, requiredLocales, strictMode, defaultLocale } =
    internationalization;

  let fileContent = 'import "intlayer";\n';

  // Build dictionary refs
  const dictionariesRef = typeFiles.map((dictionaryPath) => {
    const relativePath = `./${normalizePath(relative(moduleAugmentationDir, dictionaryPath))}`;

    return {
      relativePath,
      id: basename(dictionaryPath, extname(dictionaryPath)),
      hash: `_${getPathHash(relativePath)}`,
    };
  });

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
    .map(
      ([key, schema]) => `    ${JSON.stringify(key)}: ${zodToTsString(schema)};`
    )
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
  fileContent += `  interface __StrictModeRegistry { mode: '${strictKey}' }\n\n`;
  // Editor registry
  fileContent += `  interface __EditorRegistry { enabled : ${enabled} }\n\n`;
  // Routing registry (mode + defaultLocale narrowed to literals, rewrite rules
  // and domain map serialized as type literals)
  const routingMode = routing?.mode ?? 'prefix-no-default';
  const formattedRewriteRules = formatRewriteRules(routing?.rewrite);
  const formattedDomains = formatDomains(routing?.domains);
  fileContent += `  interface __RoutingRegistry { mode: '${routingMode}'; defaultLocale: '${defaultLocale}'${formattedRewriteRules}${formattedDomains} }\n`;
  fileContent += `}\n`;

  return fileContent;
};

/** Generate the index file merging all the types */
export const createModuleAugmentation = async (
  configuration: IntlayerConfig
) => {
  const { moduleAugmentationDir, typesDir } = configuration.system;

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
