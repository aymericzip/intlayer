import type {
  ConditionContent,
  EnumerationContent,
  GenderContent,
  InsertionContent,
  MarkdownContent,
  NestedContent,
  TranslationContent,
} from '@intlayer/core';
import { getNodeType } from '@intlayer/core';
import type { FileContent } from '@intlayer/core/file';
import {
  type ContentNode,
  type Dictionary,
  type Locale,
  type Locales,
  NodeType,
  type StrictModeLocaleMap,
} from '@intlayer/types';
import {
  Node,
  type ObjectLiteralExpression,
  Project,
  type SourceFile,
  SyntaxKind,
  ts,
} from 'ts-morph';

const buildTranslationInitializer = (
  translationMap: TranslationContent[NodeType.Translation]
): string => {
  const entries = Object.entries(translationMap)
    // Keep stable order: identifiers first (a-z), then others, alphabetically
    .sort(([a], [b]) => a.localeCompare(b));

  const parts: string[] = [];
  for (const [lang, val] of entries) {
    const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(lang);
    const keyText = isValidIdentifier ? lang : JSON.stringify(lang);

    if (typeof val === 'string') {
      parts.push(`${keyText}: ${JSON.stringify(val)}`);
    } else if (Array.isArray(val)) {
      const inner = (val as string[])
        .map((content) => JSON.stringify(content))
        .join(', ');

      parts.push(`${keyText}: [ ${inner} ]`);
    } else {
      // Fallback to JSON for non-string values to avoid breaking
      parts.push(`${keyText}: ${JSON.stringify(val)}`);
    }
  }

  return `t({ ${parts.join(', ')} })`;
};

// Adjust numeric suffixes in non-fallback locales to mirror the fallback value's trailing number.
// This is useful for lists of translations like "Hello 1" / "Bonjour 1" when updating to "Hello 3".
const syncNumericSuffixAcrossLocales = (
  existingMap: Record<string, string>,
  fallbackLocale: string,
  newFallbackValue: string
): Record<string, string> => {
  const updatedMap: Record<string, string> = {
    ...existingMap,
    [fallbackLocale]: newFallbackValue,
  };

  const newNumMatch = newFallbackValue.match(/\d+(?!.*\d)/);
  if (!newNumMatch) return updatedMap;
  const newNum = newNumMatch[0];

  for (const [locale, value] of Object.entries(existingMap)) {
    if (locale === fallbackLocale) continue;
    const currentNumMatch = value.match(/\d+(?!.*\d)/);
    if (!currentNumMatch) continue;
    updatedMap[locale] = value.replace(/(\d+)(?!.*\d)/, newNum);
  }

  return updatedMap;
};

const stringifyKey = (key: string): string => {
  const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
  if (!isValidIdentifier) return JSON.stringify(key);
  if (key === 'true' || key === 'false') return JSON.stringify(key);

  return key;
};

const buildEnumerationInitializer = (
  map: EnumerationContent[NodeType.Enumeration]
): string => {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(map)) {
    if (typeof value !== 'string') return '';
    // unsupported
    parts.push(`${stringifyKey(key)}: ${JSON.stringify(value)}`);
  }

  return `enu({ ${parts.join(', ')} })`;
};

const buildConditionInitializer = (
  map: ConditionContent[NodeType.Condition]
): string => {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(map)) {
    if (typeof value !== 'string') return '';

    parts.push(`${stringifyKey(key)}: ${JSON.stringify(value)}`);
  }

  return `cond({ ${parts.join(', ')} })`;
};

const buildGenderInitializer = (
  map: GenderContent[NodeType.Gender]
): string => {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(map)) {
    if (typeof value !== 'string') return '';

    parts.push(`${stringifyKey(key)}: ${JSON.stringify(value)}`);
  }

  return `gender({ ${parts.join(', ')} })`;
};

const buildInsertionInitializer = (
  content: InsertionContent[NodeType.Insertion]
): string | undefined => {
  if (typeof content === 'string') return `insert(${JSON.stringify(content)})`;
  if (getNodeType(content as ContentNode) === NodeType.Translation) {
    const translationContent = content as TranslationContent;
    const translations = translationContent[NodeType.Translation] ?? {};

    const allStrings = Object.values(translations).every(
      (v) => typeof v === 'string'
    );
    if (!allStrings) return undefined;

    return `insert(${buildTranslationInitializer(translations)})`;
  }

  return undefined;
};

const buildFileInitializer = (path: unknown): string | undefined => {
  if (typeof path === 'string') return `file(${JSON.stringify(path)})`;

  return undefined;
};

const buildMarkdownInitializer = (
  content: MarkdownContent[NodeType.Markdown]
): string | undefined => {
  if (typeof content === 'string') return `md(${JSON.stringify(content)})`;

  // Support markdown translations: md(t({ en: '...', fr: '...' }))
  if (getNodeType(content as ContentNode) === NodeType.Translation) {
    const translationContent = content as TranslationContent;
    const translations = translationContent[NodeType.Translation] ?? {};
    const allStrings = Object.values(translations).every(
      (v) => typeof v === 'string'
    );
    if (!allStrings) return undefined;

    return `md(${buildTranslationInitializer(translations)})`;
  }

  if (getNodeType(content as ContentNode) === NodeType.File) {
    const filePath = (content as FileContent)[NodeType.File];

    const fileInitializer = buildFileInitializer(filePath);
    if (!fileInitializer) return undefined;

    return `md(${fileInitializer})`;
  }

  return undefined;
};

const buildNestedInitializer = (
  nestedContent: NestedContent[NodeType.Nested]
): string | undefined => {
  // nestedContent is already the unwrapped { dictionaryKey, path } object
  if (!nestedContent || typeof nestedContent.dictionaryKey !== 'string')
    return undefined;

  if (nestedContent.path && typeof nestedContent.path === 'string') {
    return `nest(${JSON.stringify(nestedContent.dictionaryKey)}, ${JSON.stringify(nestedContent.path)})`;
  }

  return `nest(${JSON.stringify(nestedContent.dictionaryKey)})`;
};

const readExistingTranslationMap = (
  contentObject: ObjectLiteralExpression,
  propName: string
): Record<string, string | string[]> | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  if (!initializer) return undefined;

  if (!Node.isCallExpression(initializer)) return undefined;

  const expression = initializer.getExpression();
  if (!Node.isIdentifier(expression) || expression.getText() !== 't')
    return undefined;

  const argument = initializer.getArguments()[0];
  if (!argument || !Node.isObjectLiteralExpression(argument)) return undefined;

  const map: Record<string, string | string[]> = {};
  for (const propertyAssignment of argument.getProperties()) {
    if (!Node.isPropertyAssignment(propertyAssignment)) continue;

    const nameNode = propertyAssignment.getNameNode();
    const rawName = nameNode.getText();
    const name = rawName.replace(/^['"]|['"]$/g, '');
    const valueInitializer = propertyAssignment.getInitializer();
    if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
      map[name] = valueInitializer.getLiteralValue();
    } else if (
      valueInitializer &&
      Node.isArrayLiteralExpression(valueInitializer)
    ) {
      const strings: string[] = [];
      for (const el of valueInitializer.getElements()) {
        if (!Node.isStringLiteral(el)) return undefined;
        strings.push(el.getLiteralValue());
      }
      map[name] = strings;
    } else {
      return undefined;
    }
  }

  return map;
};

const readExistingMapFromCall = (
  contentObject: ObjectLiteralExpression,
  propName: string,
  callee: 'enu' | 'cond' | 'gender'
): Record<string, string> | undefined => {
  const property = contentObject.getProperty(propName);

  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  if (!initializer || !Node.isCallExpression(initializer)) return undefined;

  const expression = initializer.getExpression();
  if (!Node.isIdentifier(expression) || expression.getText() !== callee)
    return undefined;

  const argument = initializer.getArguments()[0];
  if (!argument || !Node.isObjectLiteralExpression(argument)) return undefined;

  const map: Record<string, string> = {};
  for (const propertyAssignment of argument.getProperties()) {
    if (!Node.isPropertyAssignment(propertyAssignment)) continue;

    const nameNode = propertyAssignment.getNameNode();
    const rawName = nameNode.getText();
    const name = rawName.replace(/^['"]|['"]$/g, '');
    const valueInitializer = propertyAssignment.getInitializer();
    if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
      map[name] = valueInitializer.getLiteralValue();
    }
  }

  return map;
};

const areStringMapsEqual = (
  a: Record<string, unknown>,
  b: Record<string, string> | undefined
): boolean => {
  if (!b) return false;
  const aEntries = Object.entries(a).filter(
    ([, v]) => typeof v === 'string'
  ) as [string, string][];

  if (aEntries.length !== Object.keys(a).length) return false;
  if (aEntries.length !== Object.keys(b).length) return false;

  for (const [key, value] of aEntries) {
    if (!(key in b)) return false;
    if (b[key] !== value) return false;
  }

  return true;
};

type ExistingInsert =
  | { kind: 'string'; value: string }
  | { kind: 'translation'; map: Record<string, string> };

const readExistingInsertion = (
  contentObject: ObjectLiteralExpression,
  propName: string
): ExistingInsert | undefined => {
  const prop = contentObject.getProperty(propName);
  if (!prop || !Node.isPropertyAssignment(prop)) return undefined;

  const init = prop.getInitializer();
  if (!init || !Node.isCallExpression(init)) return undefined;

  const exp = init.getExpression();
  if (!Node.isIdentifier(exp) || exp.getText() !== 'insert') return undefined;

  const argument = init.getArguments()[0];
  if (!argument) return undefined;

  if (Node.isStringLiteral(argument)) {
    return { kind: 'string', value: argument.getLiteralValue() };
  }

  if (Node.isCallExpression(argument)) {
    const argumentExpression = argument.getExpression();
    if (
      Node.isIdentifier(argumentExpression) &&
      argumentExpression.getText() === 't'
    ) {
      const translationArgument = argument.getArguments()[0];

      if (
        translationArgument &&
        Node.isObjectLiteralExpression(translationArgument)
      ) {
        const map: Record<string, string> = {};

        for (const propertyAssignment of translationArgument.getProperties()) {
          if (!Node.isPropertyAssignment(propertyAssignment)) continue;

          const nameNode = propertyAssignment.getNameNode();
          const rawName = nameNode.getText();
          const name = rawName.replace(/^['"]|['"]$/g, '');
          const valueInitializer = propertyAssignment.getInitializer();
          if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
            map[name] = valueInitializer.getLiteralValue();
          }
        }

        return { kind: 'translation', map };
      }
    }
  }

  return undefined;
};

type ExistingMarkdown =
  | { kind: 'string'; value: string }
  | { kind: 'file'; path: string };

const readExistingMarkdown = (
  contentObject: ObjectLiteralExpression,
  propName: string
): ExistingMarkdown | undefined => {
  const property = contentObject.getProperty(propName);
  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  if (!initializer) return undefined;

  // Pattern 1: md("...") or md(file("...")) or md(t({...}))
  if (Node.isCallExpression(initializer)) {
    const expression = initializer.getExpression();
    if (!Node.isIdentifier(expression)) return undefined;

    if (expression.getText() === 'md') {
      const argument = initializer.getArguments()[0];
      if (!argument) return undefined;

      if (Node.isStringLiteral(argument)) {
        return { kind: 'string', value: argument.getLiteralValue() };
      }
      if (Node.isCallExpression(argument)) {
        const argumentExpression = argument.getExpression();
        if (
          Node.isIdentifier(argumentExpression) &&
          argumentExpression.getText() === 'file'
        ) {
          const fileArgument = argument.getArguments()[0];
          if (fileArgument && Node.isStringLiteral(fileArgument)) {
            return { kind: 'file', path: fileArgument.getLiteralValue() };
          }
        }
      }
    }
  }

  return undefined;
};

const readExistingFilePath = (
  contentObject: ObjectLiteralExpression,
  propName: string
): string | undefined => {
  const property = contentObject.getProperty(propName);
  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  if (!initializer || !Node.isCallExpression(initializer)) return undefined;

  const expression = initializer.getExpression();
  if (!Node.isIdentifier(expression) || expression.getText() !== 'file')
    return undefined;

  const argument = initializer.getArguments()[0];
  if (argument && Node.isStringLiteral(argument))
    return argument.getLiteralValue();

  return undefined;
};

// Read an existing translation map stored either as md(t({...})) or t({ en: md("..."), fr: md("...") })
const readExistingMarkdownTranslationMap = (
  contentObject: ObjectLiteralExpression,
  propName: string
): Record<string, string> | undefined => {
  const property = contentObject.getProperty(propName);
  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  if (!initializer) return undefined;

  // Case A: md(t({...}))
  if (Node.isCallExpression(initializer)) {
    const exp = initializer.getExpression();
    if (Node.isIdentifier(exp) && exp.getText() === 'md') {
      const arg = initializer.getArguments()[0];
      if (arg && Node.isCallExpression(arg)) {
        const tExp = arg.getExpression();
        if (Node.isIdentifier(tExp) && tExp.getText() === 't') {
          const tArg = arg.getArguments()[0];
          if (tArg && Node.isObjectLiteralExpression(tArg)) {
            const map: Record<string, string> = {};
            for (const prop of tArg.getProperties()) {
              if (!Node.isPropertyAssignment(prop)) continue;
              const nameNode = prop.getNameNode();
              const rawName = nameNode.getText();
              const name = rawName.replace(/^['"]|['"]$/g, '');
              const valInit = prop.getInitializer();
              if (valInit && Node.isStringLiteral(valInit)) {
                map[name] = valInit.getLiteralValue();
              } else {
                return undefined;
              }
            }
            return map;
          }
        }
      }
    }
  }

  // Case B: t({ en: md("..."), fr: md("...") })
  if (Node.isCallExpression(initializer)) {
    const exp = initializer.getExpression();
    if (Node.isIdentifier(exp) && exp.getText() === 't') {
      const tArg = initializer.getArguments()[0];
      if (tArg && Node.isObjectLiteralExpression(tArg)) {
        const map: Record<string, string> = {};
        for (const prop of tArg.getProperties()) {
          if (!Node.isPropertyAssignment(prop)) continue;
          const nameNode = prop.getNameNode();
          const rawName = nameNode.getText();
          const name = rawName.replace(/^['"]|['"]$/g, '');
          const valInit = prop.getInitializer();
          if (
            valInit &&
            Node.isCallExpression(valInit) &&
            Node.isIdentifier(valInit.getExpression()) &&
            valInit.getExpression().getText() === 'md'
          ) {
            const mdArg = valInit.getArguments()[0];
            if (mdArg && Node.isStringLiteral(mdArg)) {
              map[name] = mdArg.getLiteralValue();
            } else {
              return undefined;
            }
          } else {
            return undefined;
          }
        }
        return map;
      }
    }
  }

  return undefined;
};

const readExistingNest = (
  contentObject: ObjectLiteralExpression,
  propName: string
): { dictionaryKey: string; path?: string } | undefined => {
  const property = contentObject.getProperty(propName);
  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  let initializer = property.getInitializer();
  if (!initializer) return undefined;

  // Unwrap type assertions and parentheses
  // Keep drilling until we reach a CallExpression or cannot unwrap further
  let safetyCounter = 0;
  while (safetyCounter++ < 5) {
    if (Node.isCallExpression(initializer)) break;
    // AsExpression, TypeAssertion, ParenthesizedExpression expose getExpression
    const anyInitializer = initializer as unknown as {
      getExpression?: () => unknown;
    };
    const nextExpression = anyInitializer.getExpression?.();
    if (
      nextExpression &&
      typeof nextExpression === 'object' &&
      nextExpression !== initializer
    ) {
      initializer = nextExpression as any;
      continue;
    }
    break;
  }
  if (!Node.isCallExpression(initializer)) return undefined;

  const expression = initializer.getExpression();
  if (!Node.isIdentifier(expression) || expression.getText() !== 'nest')
    return undefined;

  const [firstArgument, secondArgument] = initializer.getArguments();
  if (!firstArgument || !Node.isStringLiteral(firstArgument)) return undefined;

  const dictionaryKey = firstArgument.getLiteralValue();
  let path: string | undefined;
  if (secondArgument && Node.isStringLiteral(secondArgument))
    path = secondArgument.getLiteralValue();

  return { dictionaryKey, path };
};

// Safely unwrap common wrapper nodes (satisfies/as/parenthesized) to reach the underlying ObjectLiteralExpression
const unwrapToObjectLiteral = (
  node: unknown
): ObjectLiteralExpression | undefined => {
  if (!node || typeof node !== 'object') return undefined;

  let current = node as any;
  let safetyCounter = 0;
  while (safetyCounter++ < 8) {
    if (Node.isObjectLiteralExpression(current)) return current;

    const next = current?.getExpression?.();
    if (next && typeof next === 'object' && next !== current) {
      current = next;
      continue;
    }
    break;
  }

  return undefined;
};

const readExistingArraySerialized = (
  contentObject: ObjectLiteralExpression,
  propName: string
): string[] | undefined => {
  const property = contentObject.getProperty(propName);
  if (!property || !Node.isPropertyAssignment(property)) return undefined;

  const initializer = property.getInitializer();
  if (!initializer || !Node.isArrayLiteralExpression(initializer))
    return undefined;

  const serialized: string[] = [];
  for (const element of initializer.getElements()) {
    if (Node.isStringLiteral(element)) {
      serialized.push(JSON.stringify(element.getLiteralValue()));
      continue;
    }
    if (Node.isNumericLiteral(element)) {
      serialized.push(element.getText());
      continue;
    }
    if (
      element.getKind() === SyntaxKind.TrueKeyword ||
      element.getKind() === SyntaxKind.FalseKeyword
    ) {
      serialized.push(element.getText());
      continue;
    }
    if (Node.isNullLiteral(element)) {
      serialized.push('null');
      continue;
    }
    if (Node.isCallExpression(element)) {
      const expression = element.getExpression();

      if (Node.isIdentifier(expression) && expression.getText() === 't') {
        const argument = element.getArguments()[0];

        if (argument && Node.isObjectLiteralExpression(argument)) {
          const map: any = {};
          for (const propertyAssignment of argument.getProperties()) {
            if (!Node.isPropertyAssignment(propertyAssignment))
              return undefined;

            const nameNode = propertyAssignment.getNameNode();
            const rawName = nameNode.getText();
            const name = rawName.replace(/^['"]|['"]$/g, '');
            const valueInitializer = propertyAssignment.getInitializer();
            if (valueInitializer && Node.isStringLiteral(valueInitializer)) {
              map[name] = valueInitializer.getLiteralValue();
            } else {
              return undefined;
            }
          }
          serialized.push(buildTranslationInitializer(map));
          continue;
        }
      }
    }

    return undefined;
  }

  return serialized;
};

const serializeValue = (value: ContentNode): string | undefined => {
  const nodeType = getNodeType(value);

  if (nodeType === NodeType.Text) return JSON.stringify(value);

  if (nodeType === NodeType.Number || nodeType === NodeType.Boolean)
    return String(value);

  if (nodeType === NodeType.Null) return 'null';

  if (nodeType === NodeType.Translation) {
    const translations: TranslationContent[NodeType.Translation] =
      (value as TranslationContent)[NodeType.Translation] ?? {};
    const allStrings = Object.values(translations).every(
      (v) => typeof v === 'string'
    );
    if (!allStrings) return undefined;

    return buildTranslationInitializer(translations);
  }

  if (nodeType === NodeType.Enumeration) {
    const map: EnumerationContent[NodeType.Enumeration] = (
      value as EnumerationContent
    )[NodeType.Enumeration];

    const initializer = buildEnumerationInitializer(map);

    return initializer;
  }

  if (nodeType === NodeType.Condition) {
    const map: ConditionContent[NodeType.Condition] = (
      value as ConditionContent
    )[NodeType.Condition];

    const initializer = buildConditionInitializer(map);

    return initializer;
  }

  if (nodeType === NodeType.Gender) {
    const map: GenderContent[NodeType.Gender] = (value as GenderContent)[
      NodeType.Gender
    ];

    const initializer = buildGenderInitializer(map);

    return initializer;
  }

  if (nodeType === NodeType.Insertion) {
    const content: InsertionContent[NodeType.Insertion] = (
      value as InsertionContent
    )[NodeType.Insertion];

    return buildInsertionInitializer(content);
  }

  if (nodeType === NodeType.Markdown) {
    const content: MarkdownContent[NodeType.Markdown] = (
      value as MarkdownContent
    )[NodeType.Markdown];

    return buildMarkdownInitializer(content);
  }

  if (nodeType === NodeType.File) {
    const path: FileContent[NodeType.File] = (value as FileContent)[
      NodeType.File
    ];

    return buildFileInitializer(path);
  }

  if (nodeType === NodeType.Nested) {
    const content: NestedContent[NodeType.Nested] = (value as NestedContent)[
      NodeType.Nested
    ];

    return buildNestedInitializer(content);
  }

  return undefined;
};

/**
 * Gets the existing imports from @intlayer/core in the source file
 */
const getExistingIntlayerImports = (sourceFile: SourceFile): Set<string> => {
  const imported = new Set<string>();

  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (moduleSpecifier === 'intlayer') {
      const namedImports = importDecl.getNamedImports();
      for (const namedImport of namedImports) {
        imported.add(namedImport.getName());
      }
    }

    if (moduleSpecifier === 'intlayer/file') {
      const namedImports = importDecl.getNamedImports();
      for (const namedImport of namedImports) {
        const alias = namedImport.getAliasNode();
        imported.add(alias ? alias.getText() : namedImport.getName());
      }
    }
  }

  return imported;
};

/**
 * Adds missing imports to the source file
 */
const addMissingImports = (
  sourceFile: SourceFile,
  requiredImports: Set<string>
): boolean => {
  if (requiredImports.size === 0) return false;

  const existingImports = getExistingIntlayerImports(sourceFile);
  const missingImports = [...requiredImports].filter(
    (imp) => !existingImports.has(imp)
  );

  if (missingImports.length === 0) return false;

  // Separate 'file' from other imports
  const hasMissingFile = missingImports.includes('file');
  const otherMissingImports = missingImports.filter((imp) => imp !== 'file');

  // Find or create @intlayer/core import
  if (otherMissingImports.length > 0) {
    const coreImport = sourceFile
      .getImportDeclarations()
      .find((imp) => imp.getModuleSpecifierValue() === 'intlayer');

    if (coreImport) {
      // Add to existing import
      const existingNamedImports = coreImport
        .getNamedImports()
        .map((ni) => ni.getName());
      const allImports = [
        ...new Set([...existingNamedImports, ...otherMissingImports]),
      ].sort();

      coreImport.removeNamedImports();
      coreImport.addNamedImports(allImports.map((name) => ({ name })));
    } else {
      // Create new import at the top
      sourceFile.insertImportDeclaration(0, {
        moduleSpecifier: 'intlayer',
        namedImports: otherMissingImports.sort().map((name) => ({ name })),
      });
    }
  }

  // Handle file import separately with alias
  if (hasMissingFile) {
    const fileImport = sourceFile
      .getImportDeclarations()
      .find((imp) => imp.getModuleSpecifierValue() === 'intlayer/file');

    if (!fileImport) {
      // Find the position to insert (after @intlayer/core import if it exists)
      const coreImportIndex = sourceFile
        .getImportDeclarations()
        .findIndex((imp) => imp.getModuleSpecifierValue() === 'intlayer');

      const insertIndex = coreImportIndex >= 0 ? coreImportIndex + 1 : 0;

      sourceFile.insertImportDeclaration(insertIndex, {
        moduleSpecifier: 'intlayer/file',
        namedImports: [{ name: 'file' }],
      });
    }
  }

  return true;
};

/**
 * Updates a JavaScript/TypeScript file based on the provided JSON instructions.
 * It targets a specific dictionary object within the file (identified by its 'key' property)
 * and updates its 'content' entries. Currently, it focuses on modifying arguments
 * of 't' (translation) function calls.
 */
export const transformJSFile = async (
  fileContent: string,
  dictionary: Dictionary,
  fallbackLocale?: Locale
): Promise<string> => {
  try {
    // If no content provided, nothing to transform
    if (!dictionary || typeof dictionary !== 'object' || !dictionary.content)
      return fileContent;

    const project = new Project({
      useInMemoryFileSystem: true,
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: true,
      compilerOptions: {
        allowJs: true,
        jsx: ts.JsxEmit.Preserve,
      },
    });

    const sourceFile = project.createSourceFile('file.tsx', fileContent, {
      overwrite: true,
    });

    // Locate the root dictionary object that is exported as default
    let rootObject: ObjectLiteralExpression | undefined;

    const exportAssignment = sourceFile.getExportAssignment((_) => true);
    if (exportAssignment) {
      const expression = exportAssignment.getExpression();
      if (Node.isIdentifier(expression)) {
        // Prefer symbol resolution, but fall back to direct lookup by name
        const declarationFromSymbol = expression
          .getSymbol()
          ?.getDeclarations()?.[0];
        const declarationByName =
          declarationFromSymbol ??
          sourceFile.getVariableDeclaration(expression.getText());
        if (
          declarationByName &&
          Node.isVariableDeclaration(declarationByName)
        ) {
          const initializerAny = declarationByName.getInitializer();
          const objectLiteral = unwrapToObjectLiteral(initializerAny);
          if (objectLiteral) rootObject = objectLiteral;
        }
      } else if (Node.isObjectLiteralExpression(expression)) {
        rootObject = expression;
      }
    }

    // Fallback: find a variable of type Dictionary (or named content) initialized with an object
    if (!rootObject) {
      const variableDeclaration = sourceFile.getVariableDeclaration(
        (variable) => {
          try {
            const typeText = variable.getType().getText();

            return (
              typeText.includes('Dictionary') ||
              variable.getName() === 'content' ||
              variable.getName().toLowerCase().includes('dictionary')
            );
          } catch {
            return variable.getName() === 'content';
          }
        }
      );
      if (variableDeclaration) {
        const objectLiteral = unwrapToObjectLiteral(
          variableDeclaration.getInitializer()
        );
        if (objectLiteral) rootObject = objectLiteral;
      }
    }

    // Fallback: handle CommonJS patterns like `module.exports = { ... }` or `exports.default = { ... }`
    if (!rootObject) {
      for (const statement of sourceFile.getStatements()) {
        if (!Node.isExpressionStatement(statement)) continue;

        const expression = statement.getExpression();
        if (!Node.isBinaryExpression(expression)) continue;

        const operator = expression.getOperatorToken();
        if (operator.getText() !== '=') continue;

        const leftSide = expression.getLeft();
        if (!Node.isPropertyAccessExpression(leftSide)) continue;

        const leftExpression = leftSide.getExpression();
        const leftName = leftSide.getName();
        // module.exports = {...} or exports.default = {...}
        const isModuleExports =
          Node.isIdentifier(leftExpression) &&
          leftExpression.getText() === 'module' &&
          leftName === 'exports';
        const isExportsDefault =
          Node.isIdentifier(leftExpression) &&
          leftExpression.getText() === 'exports' &&
          leftName === 'default';
        if (!isModuleExports && !isExportsDefault) continue;

        const rightSide = expression.getRight();
        if (Node.isObjectLiteralExpression(rightSide)) {
          rootObject = rightSide;
          break;
        }
        if (Node.isIdentifier(rightSide)) {
          const declaration = rightSide.getSymbol()?.getDeclarations()?.[0];
          if (declaration && Node.isVariableDeclaration(declaration)) {
            const objectLiteral = unwrapToObjectLiteral(
              declaration.getInitializer()
            );
            if (objectLiteral) {
              rootObject = objectLiteral;
              break;
            }
          }
        }
      }
    }

    if (!rootObject) return fileContent;

    // Find the `content` property inside the root dictionary object
    const contentProperty = rootObject.getProperty('content');
    let contentObject: ObjectLiteralExpression | undefined;
    if (contentProperty && Node.isPropertyAssignment(contentProperty)) {
      contentObject = contentProperty.getInitializerIfKind(
        SyntaxKind.ObjectLiteralExpression
      );
    }

    if (!contentObject || !dictionary.content) return fileContent;

    // Build a set of existing property names in the content object
    const existingKeys = new Set<string>();
    for (const property of contentObject.getProperties()) {
      if (Node.isPropertyAssignment(property)) {
        const name = property.getName();
        if (name) existingKeys.add(name.replace(/^['"]|['"]$/g, ''));
      }
    }

    // Track which intlayer functions are used in the transformation
    const requiredImports = new Set<string>();

    let changed = false;
    const dictContent: Record<string, unknown> =
      (dictionary.content as unknown as Record<string, unknown>) || {};

    const areTranslationsEqual = (
      desired: Record<string, unknown>,
      existing: Record<string, string | string[]> | undefined
    ): boolean => {
      if (!existing) return false;
      for (const [lang, val] of Object.entries(desired)) {
        if (!(lang in existing)) return false;
        const ex = existing[lang];
        if (typeof val === 'string') {
          if (typeof ex !== 'string') return false;
          if (ex !== val) return false;
        } else if (Array.isArray(val)) {
          if (!Array.isArray(ex)) return false;
          if (ex.length !== val.length) return false;
          for (let i = 0; i < val.length; i++)
            if (ex[i] !== val[i]) return false;
        } else {
          return false;
        }
      }

      return true;
    };

    // Determine the effective fallback locale when converting plain strings to translations
    const effectiveFallbackLocale: string =
      (fallbackLocale as unknown as string) ?? 'en';

    for (const [key, value] of Object.entries(dictContent)) {
      // Handle array values (support primitives and translation nodes)
      if (Array.isArray(value)) {
        const serializedElements: string[] = [];
        let unsupported = false;
        // Try to read existing array to enable per-index fallback updates
        let existingArrayElements: import('ts-morph').Node[] | undefined;
        let existingArrayHasTranslation = false;
        const existingProp = contentObject.getProperty(key);
        if (existingProp && Node.isPropertyAssignment(existingProp)) {
          const init = existingProp.getInitializer();
          // Special case: existing is t({ en: ["..."], fr: ["..."] }) and desired is array of strings
          const desiredAllStrings = (value as unknown[]).every(
            (v) => typeof v === 'string'
          );
          if (
            init &&
            Node.isCallExpression(init) &&
            Node.isIdentifier(init.getExpression()) &&
            init.getExpression().getText() === 't' &&
            desiredAllStrings
          ) {
            const existingMap = readExistingTranslationMap(contentObject, key);
            if (existingMap) {
              const updatedMap = {
                ...existingMap,
                [effectiveFallbackLocale]: value as string[],
              } as Record<string, string | string[]>;
              const initializerText = buildTranslationInitializer(
                updatedMap as any
              );
              requiredImports.add('t');
              const property = contentObject.getProperty(key);
              if (property && Node.isPropertyAssignment(property)) {
                const current = property.getInitializer()?.getText();
                if (current !== initializerText) {
                  property.setInitializer(initializerText);
                  changed = true;
                }
              }
              continue;
            }
          }

          if (init && Node.isArrayLiteralExpression(init)) {
            existingArrayElements = init.getElements();
            existingArrayHasTranslation = init.getElements().some((el) => {
              if (!Node.isCallExpression(el)) return false;
              const ex = el.getExpression();
              return Node.isIdentifier(ex) && ex.getText() === 't';
            });
          }
        }

        for (
          let elementIndex = 0;
          elementIndex < (value as unknown[]).length;
          elementIndex++
        ) {
          const element = (value as unknown[])[elementIndex];
          // Type guard to ensure element is a valid ContentNode
          if (
            element === null ||
            element === undefined ||
            typeof element === 'object' ||
            typeof element === 'string' ||
            typeof element === 'number' ||
            typeof element === 'boolean'
          ) {
            let serializedValue = serializeValue(element as ContentNode);
            // If the desired element is a plain string, and the existing array element
            // at the same index was a translation, then preserve existing translations
            // and update only the effective fallback locale.
            if (
              typeof element === 'string' &&
              existingArrayElements &&
              elementIndex < existingArrayElements.length
            ) {
              const existingEl = existingArrayElements[elementIndex];
              if (Node.isCallExpression(existingEl)) {
                const callee = existingEl.getExpression();
                if (Node.isIdentifier(callee) && callee.getText() === 't') {
                  const arg = existingEl.getArguments()[0];
                  if (arg && Node.isObjectLiteralExpression(arg)) {
                    const map: Record<string, string> = {};
                    for (const prop of arg.getProperties()) {
                      if (!Node.isPropertyAssignment(prop)) continue;
                      const nameNode = prop.getNameNode();
                      const rawName = nameNode.getText();
                      const name = rawName.replace(/^['"]|['"]$/g, '');
                      const val = prop.getInitializer();
                      if (val && Node.isStringLiteral(val)) {
                        map[name] = val.getLiteralValue();
                      }
                    }
                    const updatedMap = syncNumericSuffixAcrossLocales(
                      map,
                      effectiveFallbackLocale,
                      element
                    ) as StrictModeLocaleMap;
                    serializedValue = buildTranslationInitializer(updatedMap);
                    requiredImports.add('t');
                  }
                }
              }
            }
            // If array previously contained translations and this element is a new plain string
            // (serializedValue starts with a string literal), wrap it into t({ en: ... })
            if (
              typeof element === 'string' &&
              existingArrayHasTranslation &&
              serializedValue &&
              serializedValue.startsWith('"')
            ) {
              serializedValue = buildTranslationInitializer({
                [effectiveFallbackLocale]: element,
              } as StrictModeLocaleMap);
              requiredImports.add('t');
            }

            if (serializedValue === undefined) {
              unsupported = true;
              break;
            }
            serializedElements.push(serializedValue);

            // Track imports for array elements
            const elementNodeType = getNodeType(element as ContentNode);
            if (elementNodeType === NodeType.Translation)
              requiredImports.add('t');
            else if (elementNodeType === NodeType.Enumeration)
              requiredImports.add('enu');
            else if (elementNodeType === NodeType.Condition)
              requiredImports.add('cond');
            else if (elementNodeType === NodeType.Gender)
              requiredImports.add('gender');
            else if (elementNodeType === NodeType.Insertion) {
              requiredImports.add('insert');
              const insertContent = (element as InsertionContent)[
                NodeType.Insertion
              ];
              if (
                typeof insertContent === 'object' &&
                insertContent !== null &&
                getNodeType(insertContent as ContentNode) ===
                  NodeType.Translation
              ) {
                requiredImports.add('t');
              }
            } else if (elementNodeType === NodeType.Markdown) {
              requiredImports.add('md');
              const mdContent = (element as MarkdownContent)[NodeType.Markdown];
              if (
                typeof mdContent === 'object' &&
                mdContent !== null &&
                getNodeType(mdContent as ContentNode) === NodeType.File
              ) {
                requiredImports.add('file');
              }
            } else if (elementNodeType === NodeType.File)
              requiredImports.add('file');
            else if (elementNodeType === NodeType.Nested)
              requiredImports.add('nest');
          } else {
            unsupported = true;
            break;
          }
        }
        if (unsupported) {
          continue;
        }

        const initializerText = `[ ${serializedElements.join(', ')} ]`;

        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const property = contentObject.getProperty(key);
        if (property && Node.isPropertyAssignment(property)) {
          const existingSerialized = readExistingArraySerialized(
            contentObject,
            key
          );
          const arraysEqual =
            existingSerialized !== undefined &&
            existingSerialized.length === serializedElements.length &&
            existingSerialized.every(
              (value, index) => value === serializedElements[index]
            );
          if (!arraysEqual) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }

        continue;
      }

      // Handle primitive values: string, number, boolean, null
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
      ) {
        // Check if this property was previously a translation and we have a fallback locale
        if (typeof value === 'string' && existingKeys.has(key)) {
          const existingMap = readExistingTranslationMap(contentObject, key);
          if (existingMap) {
            // This was a translation, so preserve existing translations and update only the fallback locale
            const translationMap = {
              ...existingMap,
              [effectiveFallbackLocale]: value,
            } as StrictModeLocaleMap;
            const initializerText = buildTranslationInitializer(translationMap);

            requiredImports.add('t');
            const property = contentObject.getProperty(key);
            if (property && Node.isPropertyAssignment(property)) {
              property.setInitializer(initializerText);
              changed = true;
            }
            continue;
          }
        }

        if (!existingKeys.has(key)) {
          contentObject.addPropertyAssignment({
            name: key,
            initializer:
              typeof value === 'string' ? JSON.stringify(value) : String(value),
          });
          changed = true;

          continue;
        }

        const property = contentObject.getProperty(key);
        if (property && Node.isPropertyAssignment(property)) {
          const initializer = property.getInitializer();
          const currentText = initializer?.getText();
          const desiredText =
            typeof value === 'string' ? JSON.stringify(value) : String(value);
          if (currentText !== desiredText) {
            property.setInitializer(desiredText);
            changed = true;
          }
        }

        continue;
      }

      const nodeType = getNodeType(value as ContentNode);

      // Handle translation nodes: { nodeType: 'translation', translation: { ... } }
      if (nodeType === NodeType.Translation) {
        const translations: Record<string, unknown> =
          (value as TranslationContent)[NodeType.Translation] ?? {};

        // Allow values to be string or string[]
        const allStringsOrArrays = Object.values(translations).every(
          (v) => typeof v === 'string' || Array.isArray(v)
        );
        if (!allStringsOrArrays) continue;

        // Serialize string[] as [ "...", "..." ] within t({...})
        const parts: string[] = [];
        for (const [lang, val] of Object.entries(translations)) {
          const isValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(lang);
          const keyText = isValidIdentifier ? lang : JSON.stringify(lang);
          if (typeof val === 'string') {
            parts.push(`${keyText}: ${JSON.stringify(val)}`);
          } else if (Array.isArray(val)) {
            const inner = val.map((s) => JSON.stringify(s)).join(', ');
            parts.push(`${keyText}: [ ${inner} ]`);
          }
        }
        const initializerText = `t({ ${parts.join(', ')} })`;

        if (!existingKeys.has(key)) {
          requiredImports.add('t');
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existingMap = readExistingTranslationMap(contentObject, key);
        if (!areTranslationsEqual(translations, existingMap)) {
          requiredImports.add('t');
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle enumeration nodes
      else if (nodeType === NodeType.Enumeration) {
        const map: EnumerationContent[NodeType.Enumeration] = (
          value as EnumerationContent
        )[NodeType.Enumeration];

        if (!Object.values(map).every((v) => typeof v === 'string')) continue;

        const initializerText = buildEnumerationInitializer(map);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('enu');
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existingMap = readExistingMapFromCall(contentObject, key, 'enu');
        if (!areStringMapsEqual(map, existingMap)) {
          requiredImports.add('enu');
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle condition nodes
      else if (nodeType === NodeType.Condition) {
        const map: ConditionContent[NodeType.Condition] = (
          value as ConditionContent
        )[NodeType.Condition];

        if (!Object.values(map).every((v) => typeof v === 'string')) continue;

        const initializerText = buildConditionInitializer(map);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('cond');
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existingMap = readExistingMapFromCall(contentObject, key, 'cond');
        if (!areStringMapsEqual(map, existingMap)) {
          requiredImports.add('cond');
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle gender nodes
      else if (nodeType === NodeType.Gender) {
        const map: GenderContent[NodeType.Gender] = (value as GenderContent)[
          NodeType.Gender
        ];

        if (!Object.values(map).every((v) => typeof v === 'string')) continue;

        const initializerText = buildGenderInitializer(map);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('gender');
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existingMap = readExistingMapFromCall(
          contentObject,
          key,
          'gender'
        );
        if (!areStringMapsEqual(map, existingMap)) {
          requiredImports.add('gender');
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle insertion nodes
      else if (nodeType === NodeType.Insertion) {
        const desired: InsertionContent[NodeType.Insertion] = (
          value as InsertionContent
        )[NodeType.Insertion];

        const initializerText = buildInsertionInitializer(desired);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('insert');
          if (
            typeof desired === 'object' &&
            desired !== null &&
            getNodeType(desired as ContentNode) === NodeType.Translation
          ) {
            requiredImports.add('t');
          }
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existing = readExistingInsertion(contentObject, key);
        const isSame =
          (typeof desired === 'string' &&
            existing?.kind === 'string' &&
            existing.value === desired) ||
          (typeof desired === 'object' &&
            desired !== null &&
            getNodeType(desired as ContentNode) === NodeType.Translation &&
            existing?.kind === 'translation' &&
            areStringMapsEqual(
              (desired as TranslationContent)[NodeType.Translation] ?? {},
              existing.map
            ));
        if (!isSame) {
          requiredImports.add('insert');
          if (
            typeof desired === 'object' &&
            desired !== null &&
            getNodeType(desired as ContentNode) === NodeType.Translation
          ) {
            requiredImports.add('t');
          }
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle markdown nodes
      else if (nodeType === NodeType.Markdown) {
        const desired: MarkdownContent[NodeType.Markdown] = (
          value as MarkdownContent
        )[NodeType.Markdown];

        const initializerText = buildMarkdownInitializer(desired);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('md');
          const desiredNodeType = getNodeType(desired as ContentNode);
          if (desiredNodeType === NodeType.File) {
            requiredImports.add('file');
          } else if (desiredNodeType === NodeType.Translation) {
            requiredImports.add('t');
          }
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        // Existing key present
        const desiredNodeType = getNodeType(desired as ContentNode);
        const existingSimple = readExistingMarkdown(contentObject, key);
        const existingMap = readExistingMarkdownTranslationMap(
          contentObject,
          key
        );

        // If desired is a string but existing is a translation map, preserve translations and update fallback locale
        if (
          typeof desired === 'string' &&
          existingMap &&
          effectiveFallbackLocale
        ) {
          const updated = {
            ...existingMap,
            [effectiveFallbackLocale]: desired,
          } as StrictModeLocaleMap;

          requiredImports.add('md');
          requiredImports.add('t');

          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(
              `md(${buildTranslationInitializer(updated)})`
            );
            changed = true;
          }
          continue;
        }

        // If desired is a translation, compare with existing map
        if (desiredNodeType === NodeType.Translation) {
          const desiredMap = (desired as TranslationContent)[
            NodeType.Translation
          ] as StrictModeLocaleMap;

          const allStrings = Object.values(desiredMap).every(
            (v) => typeof v === 'string'
          );

          if (!allStrings) continue;
          const existingEquals = areStringMapsEqual(desiredMap, existingMap);

          if (!existingEquals) {
            requiredImports.add('md');
            requiredImports.add('t');
            const property = contentObject.getProperty(key);
            if (property && Node.isPropertyAssignment(property)) {
              property.setInitializer(
                `md(${buildTranslationInitializer(desiredMap)})`
              );
              changed = true;
            }
          }
          continue;
        }

        // For simple string/file markdown, compare and update
        const isSameSimple =
          (typeof desired === 'string' &&
            existingSimple?.kind === 'string' &&
            existingSimple.value === desired) ||
          (desiredNodeType === NodeType.File &&
            existingSimple?.kind === 'file' &&
            existingSimple.path === (desired as FileContent)[NodeType.File]);

        if (!isSameSimple) {
          requiredImports.add('md');
          if (desiredNodeType === NodeType.File) {
            requiredImports.add('file');
          }
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle file nodes
      else if (nodeType === NodeType.File) {
        const desired: FileContent[NodeType.File] = (value as FileContent)[
          NodeType.File
        ];

        const initializerText = buildFileInitializer(desired);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('file');
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existing = readExistingFilePath(contentObject, key);
        if (existing !== desired) {
          requiredImports.add('file');
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }

      // Handle nested nodes
      else if (nodeType === NodeType.Nested) {
        const desired: NestedContent[NodeType.Nested] = (
          value as NestedContent
        )[NodeType.Nested];

        const initializerText = buildNestedInitializer(desired);
        if (!initializerText) continue;

        if (!existingKeys.has(key)) {
          requiredImports.add('nest');
          contentObject.addPropertyAssignment({
            name: key,
            initializer: initializerText,
          });
          changed = true;

          continue;
        }

        const existing = readExistingNest(contentObject, key);

        const isSame =
          !!desired &&
          existing?.dictionaryKey === desired.dictionaryKey &&
          existing?.path === desired.path;
        if (!isSame) {
          requiredImports.add('nest');
          const property = contentObject.getProperty(key);
          if (property && Node.isPropertyAssignment(property)) {
            property.setInitializer(initializerText);
            changed = true;
          }
        }
      }
    }

    if (!changed) return fileContent;

    // Add any missing imports before returning the transformed content
    const importsAdded = addMissingImports(sourceFile, requiredImports);
    if (importsAdded || changed) {
      return sourceFile.getFullText();
    }

    return fileContent;
  } catch {
    // Fail-safe: return original content on any unexpected parsing issue

    return fileContent;
  }
};
