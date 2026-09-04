import {
  i18nextToIntlayerFormatter,
  icuToIntlayerFormatter,
  intlayerToI18nextFormatter,
  intlayerToICUFormatter,
  intlayerToPortableObjectFormatter,
  intlayerToVueI18nFormatter,
  type MessageFormatDialect,
  portableObjectToIntlayerFormatter,
  resolveMessage,
  vueI18nToIntlayerFormatter,
} from '@intlayer/core/messageFormat';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ConversionResult, MessageDialect } from './types';

/**
 * Attempts to parse an input as JSON if formatted as such, otherwise returns raw string.
 */
export const parseInputContent = (rawInput: string): unknown => {
  const trimmed = rawInput.trim();
  if (
    (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // Not valid JSON (e.g. ICU message string starting with '{'), treat as string
      return rawInput;
    }
  }
  return rawInput;
};

/**
 * Transforms an input from its source dialect into Intlayer's internal AST representation.
 */
export const convertSourceToIntlayer = (
  parsedInput: unknown,
  sourceDialect: MessageDialect
): unknown => {
  switch (sourceDialect) {
    case 'intlayer':
      return parsedInput;
    case 'icu':
      return icuToIntlayerFormatter(parsedInput as any);
    case 'i18next':
      return i18nextToIntlayerFormatter(parsedInput as any);
    case 'vue-i18n':
      return vueI18nToIntlayerFormatter(parsedInput as any);
    case 'po':
      return portableObjectToIntlayerFormatter(parsedInput as any);
    default:
      return parsedInput;
  }
};

/**
 * Transforms an Intlayer AST representation into the target dialect.
 */
export const convertIntlayerToTarget = (
  intermediateAst: unknown,
  targetDialect: MessageDialect
): unknown => {
  switch (targetDialect) {
    case 'intlayer':
      return intermediateAst;
    case 'icu':
      return intlayerToICUFormatter(intermediateAst as any);
    case 'i18next':
      return intlayerToI18nextFormatter(intermediateAst as any);
    case 'vue-i18n':
      return intlayerToVueI18nFormatter(intermediateAst as any);
    case 'po':
      return intlayerToPortableObjectFormatter(intermediateAst as any);
    default:
      return intermediateAst;
  }
};

const formatKey = (key: string): string => {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) || /^\d+$/.test(key)) {
    return key;
  }
  return JSON.stringify(key);
};

const formatStringLiteral = (str: string): string => {
  if (str.includes('\n')) {
    const escaped = str.replace(/`/g, '\\`').replace(/\${/g, '\\${');
    return `\`${escaped}\``;
  }
  const escaped = str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${escaped}'`;
};

/**
 * Transforms Intlayer AST nodes into idiomatic TypeScript code using Intlayer helpers:
 * `t()`, `enu()`, `plural()`, `cond()`, `gender()`, `select()`, `html()`, `md()`.
 *
 * Mirrors the canonical transformation logic from `@intlayer/engine`'s `transformJSFile`.
 */
export const serializeIntlayerNodeToTs = (
  node: unknown,
  indent: string = '  ',
  usedHelpers: Set<string> = new Set()
): string => {
  if (node === null) return 'null';
  if (node === undefined) return 'undefined';

  if (typeof node === 'string') {
    return formatStringLiteral(node);
  }

  if (typeof node === 'number' || typeof node === 'boolean') {
    return String(node);
  }

  if (Array.isArray(node)) {
    if (node.length === 0) return '[]';
    const nextIndent = `${indent}  `;
    const items = node
      .map(
        (item) =>
          `${nextIndent}${serializeIntlayerNodeToTs(item, nextIndent, usedHelpers)},`
      )
      .join('\n');
    return `[\n${items}\n${indent}]`;
  }

  if (typeof node === 'object') {
    const rawObj = node as Record<string, unknown>;

    // Handle Typed Intlayer Nodes
    if (typeof rawObj.nodeType === 'string') {
      const type = rawObj.nodeType;

      if (type === 'translation' && 'translation' in rawObj) {
        usedHelpers.add('t');
        return `t(${serializeIntlayerNodeToTs(rawObj.translation, indent, usedHelpers)})`;
      }

      if (type === 'enumeration' && 'enumeration' in rawObj) {
        usedHelpers.add('enu');
        return `enu(${serializeIntlayerNodeToTs(rawObj.enumeration, indent, usedHelpers)})`;
      }

      if (type === 'plural' && 'plural' in rawObj) {
        usedHelpers.add('plural');
        return `plural(${serializeIntlayerNodeToTs(rawObj.plural, indent, usedHelpers)})`;
      }

      if (type === 'condition' && 'condition' in rawObj) {
        usedHelpers.add('cond');
        return `cond(${serializeIntlayerNodeToTs(rawObj.condition, indent, usedHelpers)})`;
      }

      if (type === 'gender' && 'gender' in rawObj) {
        usedHelpers.add('gender');
        return `gender(${serializeIntlayerNodeToTs(rawObj.gender, indent, usedHelpers)})`;
      }

      if (type === 'select' && 'select' in rawObj) {
        usedHelpers.add('select');
        const selectBody = serializeIntlayerNodeToTs(
          rawObj.select,
          indent,
          usedHelpers
        );
        const variable =
          typeof rawObj.variable === 'string' && rawObj.variable.length > 0
            ? `, '${rawObj.variable}'`
            : '';
        return `select(${selectBody}${variable})`;
      }

      if (type === 'html' && 'html' in rawObj) {
        usedHelpers.add('html');
        return `html(${serializeIntlayerNodeToTs(rawObj.html, indent, usedHelpers)})`;
      }

      if (type === 'markdown' && 'markdown' in rawObj) {
        usedHelpers.add('md');
        return `md(${serializeIntlayerNodeToTs(rawObj.markdown, indent, usedHelpers)})`;
      }

      if (type === 'insertion' && 'insertion' in rawObj) {
        return serializeIntlayerNodeToTs(rawObj.insertion, indent, usedHelpers);
      }
    }

    // Plain Object (e.g. key-value dictionary, variant mapping, etc.)
    const entries = Object.entries(rawObj).filter(
      ([key]) => !key.startsWith('__intlayer_') && key !== 'tags'
    );
    if (entries.length === 0) return '{}';

    const nextIndent = `${indent}  `;
    const lines = entries.map(([key, value]) => {
      const formattedKey = formatKey(key);
      const formattedValue = serializeIntlayerNodeToTs(
        value,
        nextIndent,
        usedHelpers
      );
      return `${nextIndent}${formattedKey}: ${formattedValue},`;
    });

    return `{\n${lines.join('\n')}\n${indent}}`;
  }

  return String(node);
};

/**
 * Formats an Intlayer AST into an idiomatic Intlayer .content.ts code declaration
 * with appropriate helper function imports (`t`, `enu`, `plural`, `cond`, `gender`, `select`, `html`, `md`).
 */
export const generateContentDeclarationCode = (
  content: unknown,
  dictionaryKey: string = 'converted-message'
): string => {
  const usedHelpers = new Set<string>();
  const serializedContent = serializeIntlayerNodeToTs(
    content,
    '  ',
    usedHelpers
  );

  const helpersList = Array.from(usedHelpers).sort();
  const imports = ['type Dictionary', ...helpersList].join(', ');

  const validVarName = dictionaryKey
    .replace(/[^a-zA-Z0-9_]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  const variableName = validVarName
    ? `${validVarName}Content`
    : 'convertedMessageContent';

  return `import { ${imports} } from 'intlayer';

const ${variableName} = {
  key: '${dictionaryKey}',
  content: ${serializedContent},
} satisfies Dictionary;

export default ${variableName};
`;
};

/**
 * Generates idiomatic .content.json declaration code.
 */
export const generateContentJsonCode = (
  contentAst: unknown,
  dictionaryKey: string = 'converted-message'
): string => {
  const jsonDeclaration = {
    $schema: 'https://intlayer.org/schema.json',
    key: dictionaryKey,
    content: contentAst,
  };

  return JSON.stringify(jsonDeclaration, null, 2);
};

/**
 * Recursively cleans Intlayer nodes for display and code export.
 * For typed nodes (having `nodeType: "xxx"`), keeps only `nodeType` and `"xxx"`,
 * stripping autogenerated metadata like `tags` (on HTML nodes), `__intlayer_*` flags, etc.
 */
export const sanitizeIntlayerNode = (node: unknown): unknown => {
  if (node === null || node === undefined || typeof node !== 'object') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(sanitizeIntlayerNode);
  }

  const rawObj = node as Record<string, unknown>;

  // If this object is a typed Intlayer node with `nodeType`
  if (typeof rawObj.nodeType === 'string') {
    const nodeTypeName = rawObj.nodeType;
    const cleaned: Record<string, unknown> = {
      nodeType: nodeTypeName,
    };

    // Keep only the property matching the nodeType (e.g. "html", "enumeration", "plural", "select", etc.)
    if (nodeTypeName in rawObj) {
      cleaned[nodeTypeName] = sanitizeIntlayerNode(rawObj[nodeTypeName]);
    }

    return cleaned;
  }

  // Plain objects (e.g. dictionaries, mapping tables, variable records)
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rawObj)) {
    if (key.startsWith('__intlayer_') || key === 'tags') {
      continue;
    }
    cleaned[key] = sanitizeIntlayerNode(value);
  }

  return cleaned;
};

/**
 * Performs full bidirectional conversion between any two dialects.
 */
export const convertMessage = (
  rawInput: string,
  sourceDialect: MessageDialect,
  targetDialect: MessageDialect
): ConversionResult => {
  if (!rawInput || rawInput.trim().length === 0) {
    return {
      success: true,
      output: '',
      cleanString: '',
    };
  }

  try {
    const parsedInput = parseInputContent(rawInput);
    const rawIntermediateAst = convertSourceToIntlayer(
      parsedInput,
      sourceDialect
    );
    const convertedTarget = convertIntlayerToTarget(
      rawIntermediateAst,
      targetDialect
    );

    const intermediateAst = sanitizeIntlayerNode(rawIntermediateAst);
    const finalTarget =
      targetDialect === 'intlayer'
        ? sanitizeIntlayerNode(convertedTarget)
        : convertedTarget;

    let output = '';
    let cleanString = '';

    if (typeof finalTarget === 'string') {
      output = finalTarget;
      cleanString = finalTarget;
    } else {
      output = JSON.stringify(finalTarget, null, 2);
      cleanString = output;
    }

    const contentDeclaration = generateContentDeclarationCode(intermediateAst);
    const contentJsonDeclaration = generateContentJsonCode(intermediateAst);

    return {
      success: true,
      output,
      cleanString,
      contentDeclaration,
      contentJsonDeclaration,
      intermediateAst,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      output: '',
      error: errorMessage,
    };
  }
};

/**
 * Extracts variable names from a message string to pre-fill test variables.
 */
export const extractVariableNames = (text: string): string[] => {
  const variables = new Set<string>();

  // 1. Double braces: {{var}}
  const doubleBracesRegex = /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g;
  let match: RegExpExecArray | null = doubleBracesRegex.exec(text);
  while (match !== null) {
    variables.add(match[1]);
    match = doubleBracesRegex.exec(text);
  }

  // 2. Single braces ICU / Vue: {var} or {var, plural, ...}
  const singleBracesRegex = /\{\s*([a-zA-Z0-9_.]+)(?:\s*,\s*|\s*\})/g;
  match = singleBracesRegex.exec(text);
  while (match !== null) {
    variables.add(match[1]);
    match = singleBracesRegex.exec(text);
  }

  // 3. Gettext PO: %(var)s or %(var)d
  const poRegex = /%\(([a-zA-Z0-9_.]+)\)[sdf]/g;
  match = poRegex.exec(text);
  while (match !== null) {
    variables.add(match[1]);
    match = poRegex.exec(text);
  }

  return Array.from(variables);
};

/**
 * Resolves a message using provided interpolation variables and locale.
 */
export const evaluateMessagePreview = (
  message: unknown,
  values: Record<string, unknown>,
  locale: LocalesValues = 'en' as LocalesValues,
  sourceDialect: MessageDialect = 'icu'
): string => {
  try {
    if (sourceDialect === 'po') {
      // Gettext PO evaluation via Intlayer AST
      const intlayerAst = portableObjectToIntlayerFormatter(message as any);
      return resolveMessage(intlayerAst, values, locale, 'icu');
    }

    const dialectMap: Record<string, MessageFormatDialect> = {
      icu: 'icu',
      i18next: 'i18next',
      'vue-i18n': 'vue-i18n',
    };

    const dialect = dialectMap[sourceDialect] ?? 'icu';
    return resolveMessage(message, values, locale, dialect);
  } catch (error: unknown) {
    return error instanceof Error ? error.message : String(error);
  }
};
