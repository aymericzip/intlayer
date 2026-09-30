import { extname } from 'node:path';
import { escapeRegularExpression } from './findFieldInFile';
import {
  getPropertyKeyName,
  nodeEnd,
  nodeStart,
  type OxcNode,
  parseText,
} from './oxcUtils';

/** Offsets of a declaration inside a file's text. */
export type OffsetSpan = { start: number; end: number };

const JSON_EXTENSIONS = new Set(['.json', '.jsonc', '.json5']);
const SCRIPT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.mts',
  '.cts',
]);

/** A property matched while walking an object literal. */
type PropertyMatch = {
  keyNode: OxcNode;
  /** Number of path segments consumed up to this property. */
  matchedSegmentCount: number;
};

/** Strip `x as T`, `x satisfies T` and `(x)` wrappers. */
const unwrapExpression = (node: OxcNode | undefined): OxcNode | undefined => {
  let current = node;

  while (
    current?.['type'] === 'TSAsExpression' ||
    current?.['type'] === 'TSSatisfiesExpression' ||
    current?.['type'] === 'ParenthesizedExpression'
  ) {
    current = current['expression'] as OxcNode | undefined;
  }

  return current;
};

/**
 * The object literal properties are read from: the node itself, or the first
 * object argument of a wrapping call (`t({ … })`, `enu({ … })`).
 */
const getObjectLiteral = (node: OxcNode | undefined): OxcNode | undefined => {
  const expression = unwrapExpression(node);

  if (expression?.['type'] === 'ObjectExpression') return expression;

  if (expression?.['type'] === 'CallExpression') {
    const firstArgument = unwrapExpression(
      (expression['arguments'] as OxcNode[] | undefined)?.[0]
    );

    if (firstArgument?.['type'] === 'ObjectExpression') return firstArgument;
  }

  return undefined;
};

const findPropertyByName = (
  objectNode: OxcNode,
  propertyName: string
): OxcNode | undefined =>
  ((objectNode['properties'] as OxcNode[] | undefined) ?? []).find(
    (property) =>
      (property['type'] === 'Property' ||
        property['type'] === 'ObjectProperty') &&
      getPropertyKeyName(property['key'] as OxcNode | undefined) ===
        propertyName
  );

/**
 * Deepest property reached by walking `segments` through nested object
 * literals, where one property may consume several segments when its name is
 * their dotted join (flat `'profile.title'` keys).
 */
const findDeepestProperty = (
  objectNode: OxcNode,
  segments: string[],
  consumedSegmentCount = 0
): PropertyMatch | null => {
  let best: PropertyMatch | null = null;
  const remaining = segments.length - consumedSegmentCount;

  for (let length = 1; length <= remaining; length++) {
    const propertyName = segments
      .slice(consumedSegmentCount, consumedSegmentCount + length)
      .join('.');
    const property = findPropertyByName(objectNode, propertyName);

    if (!property) continue;

    const matchedSegmentCount = consumedSegmentCount + length;
    let match: PropertyMatch = {
      keyNode: property['key'] as OxcNode,
      matchedSegmentCount,
    };

    const childObject = getObjectLiteral(property['value'] as OxcNode);

    if (matchedSegmentCount < segments.length && childObject) {
      match =
        findDeepestProperty(childObject, segments, matchedSegmentCount) ??
        match;
    }

    if (match.matchedSegmentCount === segments.length) return match;

    if (!best || match.matchedSegmentCount > best.matchedSegmentCount) {
      best = match;
    }
  }

  return best;
};

/** The root object literal of a JSON document. */
const getJsonRootObject = (
  text: string
): { rootObject: OxcNode; offsetShift: number } | null => {
  // Parsed as a parenthesised expression so a bare `{…}` is not read as a
  // block statement; every offset is then shifted by the added `(`.
  const program = parseText(`(${text}\n)`);
  const statement = (program?.['body'] as OxcNode[] | undefined)?.[0];
  const rootObject = getObjectLiteral(
    statement?.['expression'] as OxcNode | undefined
  );

  return rootObject ? { rootObject, offsetShift: 1 } : null;
};

/** The object literal a content declaration file exports. */
const getContentFileRootObject = (text: string): OxcNode | null => {
  const program = parseText(text);
  const body = (program?.['body'] as OxcNode[] | undefined) ?? [];

  const exportDefault = body.find(
    (statement) => statement['type'] === 'ExportDefaultDeclaration'
  );
  let declaration = unwrapExpression(
    exportDefault?.['declaration'] as OxcNode | undefined
  );

  // `const content = { … } satisfies Dictionary; export default content;`
  if (declaration?.['type'] === 'Identifier') {
    const variableName = declaration['name'] as string;

    for (const statement of body) {
      const variableDeclaration =
        statement['type'] === 'ExportNamedDeclaration'
          ? (statement['declaration'] as OxcNode | undefined)
          : statement;

      if (variableDeclaration?.['type'] !== 'VariableDeclaration') continue;

      const declarator = (
        (variableDeclaration['declarations'] as OxcNode[]) ?? []
      ).find(
        (candidate) =>
          (candidate['id'] as OxcNode | undefined)?.['name'] === variableName
      );

      if (declarator) {
        declaration = unwrapExpression(
          declarator['init'] as OxcNode | undefined
        );
        break;
      }
    }
  }

  return getObjectLiteral(declaration) ?? null;
};

/**
 * Regex fallback for formats with no AST (YAML, Markdown frontmatter): the
 * leaf field name written as a property key.
 */
const findLeafPropertyByText = (
  text: string,
  fieldPath: string[]
): OffsetSpan | null => {
  const leafName = fieldPath[fieldPath.length - 1];

  if (!leafName) return null;

  const match = new RegExp(
    `(?<![.\\w])(['"\`]?)${escapeRegularExpression(leafName)}\\1\\s*:`,
    'm'
  ).exec(text);

  if (!match) return null;

  const start = match.index + match[1]!.length;

  return { start, end: start + leafName.length };
};

const toSpan = (match: PropertyMatch, offsetShift: number): OffsetSpan => ({
  start: nodeStart(match.keyNode) - offsetShift,
  end: nodeEnd(match.keyNode) - offsetShift,
});

/**
 * Locate where a dictionary field is declared in its source file.
 *
 * - JSON catalogs may hold the dictionary at their root or under a property
 *   named after it (one file splitting into several dictionaries); both are
 *   tried, with nested and flat dotted keys.
 * - Content declaration files (`.content.ts`) are walked from the exported
 *   object's `content` property.
 * - Other formats fall back to a text search on the leaf name.
 *
 * With an empty `fieldPath`, the dictionary itself is located: its namespace
 * property in a JSON catalog, or the `key` property of a content file.
 *
 * @returns The span of the property key, or `null` when not found.
 */
export const findFieldDeclaration = (
  text: string,
  filePath: string,
  dictionaryKey: string,
  fieldPath: string[]
): OffsetSpan | null => {
  const extension = extname(filePath).toLowerCase();
  const segments = fieldPath.flatMap((propertyName) => propertyName.split('.'));

  if (JSON_EXTENSIONS.has(extension)) {
    const json = getJsonRootObject(text);

    if (!json) return findLeafPropertyByText(text, fieldPath);

    const underNamespace = findDeepestProperty(json.rootObject, [
      dictionaryKey,
      ...segments,
    ]);
    const atRoot =
      segments.length > 0
        ? findDeepestProperty(json.rootObject, segments)
        : null;

    const isComplete = (
      match: PropertyMatch | null,
      segmentCount: number
    ): match is PropertyMatch => match?.matchedSegmentCount === segmentCount;

    if (isComplete(underNamespace, segments.length + 1)) {
      return toSpan(underNamespace, json.offsetShift);
    }

    if (isComplete(atRoot, segments.length)) {
      return toSpan(atRoot, json.offsetShift);
    }

    const partial = underNamespace ?? atRoot;

    return partial ? toSpan(partial, json.offsetShift) : null;
  }

  if (SCRIPT_EXTENSIONS.has(extension)) {
    const rootObject = getContentFileRootObject(text);

    if (rootObject) {
      const match = findDeepestProperty(
        rootObject,
        segments.length > 0 ? ['content', ...segments] : ['key']
      );

      if (match) return toSpan(match, 0);
    }
  }

  return findLeafPropertyByText(text, fieldPath);
};
