import { extname } from 'node:path';
import {
  getContentFileRootObject,
  getJsonRootObject,
  JSON_EXTENSIONS,
  type OffsetSpan,
  SCRIPT_EXTENSIONS,
} from './findFieldDeclaration';
import {
  getObjectPropertyNode,
  getPropertyKeyName,
  getStaticStringValue,
  nodeEnd,
  nodeStart,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';
import { collectNamespaceReferences } from './usageAnalyzer';

/** A dictionary key written in a file: its value and the span of its text. */
export type DictionaryKeyOccurrence = OffsetSpan & { dictionaryKey: string };

/** `key: value` at the top level of a YAML document (no indentation). */
const YAML_ROOT_KEY_PATTERN =
  /^key[ \t]*:[ \t]*(['"]?)([^'"\s#]+)\1[ \t]*(?:#.*)?$/m;

/** `dictionaryKey: value` of a nested node written in YAML. */
const YAML_NESTED_KEY_PATTERN =
  /^[ \t]*dictionaryKey[ \t]*:[ \t]*(['"]?)([^'"\s#]+)\1[ \t]*(?:#.*)?$/gm;

/** Leading `---` fenced frontmatter of a Markdown document. */
const MARKDOWN_FRONTMATTER_PATTERN = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---/;

/**
 * The span of a string literal's value, quotes excluded, or `null` when the
 * node is not a static string written in place.
 */
const toLiteralOccurrence = (
  node: OxcNode | undefined,
  offsetShift: number
): DictionaryKeyOccurrence | null => {
  const dictionaryKey = getStaticStringValue(node);

  if (!node || dictionaryKey === null) return null;

  return {
    dictionaryKey,
    start: nodeStart(node) + 1 - offsetShift,
    end: nodeEnd(node) - 1 - offsetShift,
  };
};

/**
 * The value captured by a YAML pattern — group 1 the optional quote, group 2
 * the key — shifted by `base`.
 */
const toYamlOccurrence = (
  match: RegExpMatchArray,
  base: number
): DictionaryKeyOccurrence => {
  const [line, quote = '', dictionaryKey = ''] = match;
  const colonIndex = line.indexOf(':');
  const start =
    base +
    match.index! +
    line.indexOf(quote + dictionaryKey, colonIndex) +
    quote.length;

  return { dictionaryKey, start, end: start + dictionaryKey.length };
};

/** The YAML text of a document: itself, or a Markdown file's frontmatter. */
const getYamlSection = (
  text: string,
  extension: string
): { yamlText: string; base: number } | null => {
  if (extension !== '.md' && extension !== '.mdx') {
    return { yamlText: text, base: 0 };
  }

  const frontmatter = MARKDOWN_FRONTMATTER_PATTERN.exec(text);

  // The frontmatter body starts after the opening fence line
  return frontmatter
    ? { yamlText: frontmatter[1]!, base: frontmatter[0].indexOf('\n') + 1 }
    : null;
};

/**
 * Where a content declaration file declares its dictionary key: the value of
 * its root `key` property, quotes excluded.
 *
 * Reads `.content.{ts,js,…}` exports (default, `module.exports`, or a
 * variable exported by name), JSON / JSONC / JSON5 documents, YAML documents
 * and Markdown frontmatter.
 *
 * @returns `null` when the key is not a string literal written in the file
 * (computed, imported, or derived from the file name).
 */
export const findDictionaryKeyDeclaration = (
  text: string,
  filePath: string
): DictionaryKeyOccurrence | null => {
  const extension = extname(filePath).toLowerCase();

  if (SCRIPT_EXTENSIONS.has(extension)) {
    const rootObject = getContentFileRootObject(parseText(text));
    const keyProperty = getObjectPropertyNode(rootObject ?? undefined, 'key');

    return toLiteralOccurrence(
      keyProperty?.['value'] as OxcNode | undefined,
      0
    );
  }

  if (JSON_EXTENSIONS.has(extension)) {
    const json = getJsonRootObject(text);
    const keyProperty = getObjectPropertyNode(json?.rootObject, 'key');

    return toLiteralOccurrence(
      keyProperty?.['value'] as OxcNode | undefined,
      json?.offsetShift ?? 0
    );
  }

  const section = getYamlSection(text, extension);
  const match = section && YAML_ROOT_KEY_PATTERN.exec(section.yamlText);

  return section && match ? toYamlOccurrence(match, section.base) : null;
};

/**
 * Dictionary keys a content file nests from other dictionaries:
 * `nest('key')` calls, and `nested: { dictionaryKey: 'key' }` nodes as JSON
 * and YAML declarations write them.
 */
export const collectNestedDictionaryKeys = (
  text: string,
  filePath: string
): DictionaryKeyOccurrence[] => {
  const extension = extname(filePath).toLowerCase();
  const isJson = JSON_EXTENSIONS.has(extension);

  if (!isJson && !SCRIPT_EXTENSIONS.has(extension)) {
    const section = getYamlSection(text, extension);

    if (!section) return [];

    return [...section.yamlText.matchAll(YAML_NESTED_KEY_PATTERN)].map(
      (match) => toYamlOccurrence(match, section.base)
    );
  }

  const json = isJson ? getJsonRootObject(text) : null;
  const root = isJson ? json?.rootObject : parseText(text);
  const offsetShift = json?.offsetShift ?? 0;
  const occurrences: DictionaryKeyOccurrence[] = [];

  walkAst(root, (node) => {
    let keyNode: OxcNode | undefined;

    const callee = node['callee'] as OxcNode | undefined;

    if (node['type'] === 'CallExpression' && callee?.['name'] === 'nest') {
      keyNode = (node['arguments'] as OxcNode[] | undefined)?.[0];
    }

    const isNestedProperty =
      (node['type'] === 'Property' || node['type'] === 'ObjectProperty') &&
      getPropertyKeyName(node['key'] as OxcNode | undefined) === 'nested';

    if (isNestedProperty) {
      keyNode = getObjectPropertyNode(
        node['value'] as OxcNode | undefined,
        'dictionaryKey'
      )?.['value'] as OxcNode | undefined;
    }

    const occurrence = toLiteralOccurrence(keyNode, offsetShift);

    if (occurrence) occurrences.push(occurrence);
  });

  return occurrences;
};

/**
 * Dictionary keys a source file reads through a registered caller —
 * `useIntlayer('key')`, `getIntlayer('key')`, `useTranslations('key.sub')`,
 * `useI18n({ namespace: 'key' })`, … — each spanning the key alone, so a
 * nested namespace keeps its sub-path.
 */
export const collectSourceDictionaryKeys = (
  text: string
): DictionaryKeyOccurrence[] =>
  collectNamespaceReferences(text).flatMap(
    ({ dictionaryKey, namespaceStart }) => {
      // Skip the opening quote: the key leads the namespace value
      const start = namespaceStart + 1;
      const end = start + dictionaryKey.length;

      // Escaped or computed text: not the key written verbatim
      return text.slice(start, end) === dictionaryKey
        ? [{ dictionaryKey, start, end }]
        : [];
    }
  );

/** The occurrence whose span holds `offset` (bounds included). */
export const findDictionaryKeyOccurrenceAtOffset = (
  occurrences: DictionaryKeyOccurrence[],
  offset: number
): DictionaryKeyOccurrence | null =>
  occurrences.find(
    (occurrence) => offset >= occurrence.start && offset <= occurrence.end
  ) ?? null;
