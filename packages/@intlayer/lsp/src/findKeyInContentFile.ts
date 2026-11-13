import type { OffsetSpan } from './findFieldDeclaration';
import { type OxcNode, parseText, walkAst } from './oxcUtils';

// Group 2: quoted value   — key: "foo" | key: 'foo' | key: `foo`  (TS/JS/JSON)
// Group 3: unquoted value — key: foo-bar                           (YAML / Markdown frontmatter)
const KEY_DECLARATION_REGULAR_EXPRESSION =
  /(?:^|[{,\s])"?key"?\s*:\s*(?:(['"`])([^'"`\r\n]+)\1|([^ \t'"`{},\r\n]+))/g;

/**
 * If `offset` falls within a `key:` declaration in a content file,
 * return the declared key string; otherwise return null.
 * Handles:
 * - Quoted values: key: "foo" | key: 'foo' | key: `foo`  (TS/JS)
 * - JSON values:   "key": "foo"                          (JSON/JSON5/JSONC)
 * - Bare values:   key: foo-bar                          (YAML / Markdown frontmatter)
 */
export const findKeyInContentFile = (
  text: string,
  offset: number
): string | null => {
  for (const match of text.matchAll(KEY_DECLARATION_REGULAR_EXPRESSION)) {
    const start = match.index!;
    const end = start + match[0].length;

    if (offset >= start && offset <= end) {
      return match[2] ?? match[3] ?? null;
    }
  }

  return null;
};

/**
 * If `offset` falls on a content field property key inside an intlayer content
 * file, return the dictionary key, the leaf field name, and the full field path.
 *
 * The `fileExtension` parameter controls which parser is used:
 *
 * - `.json` / `.json5` / `.jsonc` → dedicated JSON parser
 * - `.yaml` / `.yml`              → YAML regex heuristic
 * - `.md` / `.mdx`                → always null (body is the content value)
 * - everything else               → Oxc AST (TS/JS/TSX/JSX)
 *
 * When `fileExtension` is omitted the function falls back to Oxc, then to
 * JSON/YAML heuristics based on text shape.
 */
export const findContentFieldAtOffset = (
  text: string,
  offset: number,
  fileExtension?: string
): FieldResult | null => {
  const ext = fileExtension?.toLowerCase() ?? '';

  // Markdown has no individual navigable content fields
  if (ext === '.md' || ext === '.mdx') return null;

  // JSON / JSON5 / JSONC
  if (ext === '.json' || ext === '.json5' || ext === '.jsonc') {
    return findContentFieldAtOffsetJson(text, offset);
  }

  // YAML / YML
  if (ext === '.yaml' || ext === '.yml') {
    return findContentFieldAtOffsetYaml(text, offset);
  }

  // TS / JS / TSX / JSX — use Oxc AST
  const program = parseText(text);
  if (program) {
    return findContentFieldAtOffsetOxc(text, offset, program);
  }

  // Oxc failed to parse — fall back on content-shape heuristics
  // JSON: starts with optional whitespace then `{`
  if (/^\s*\{/.test(text)) {
    return findContentFieldAtOffsetJson(text, offset);
  }

  // Markdown: YAML frontmatter fence with no `content:` block
  if (/^---\s*\r?\n/.test(text)) {
    if (!/^content\s*:/m.test(text)) return null;
  }

  // YAML (or anything else with a content: block)
  return findContentFieldAtOffsetYaml(text, offset);
};

// ---------------------------------------------------------------------------
// Helpers shared by the Oxc and YAML/JSON fallback paths
// ---------------------------------------------------------------------------

/**
 * All Intlayer helper function names whose arguments are locale-map or
 * control-flow data — NOT navigable content field names.  The walker must
 * treat these calls as opaque leaf values and never descend into them.
 *
 * `t`      – translation    ({ en: "…", fr: "…" })
 * `enu`    – enumeration    ({ "0": "…", ">5": "…" })
 * `cond`   – condition      ({ true: "…", false: "…" })
 * `plural` – plural rules   ({ one: "…", other: "…" })
 * `gender` – gender rules   ({ male: "…", female: "…", other: "…" })
 * `select` – select cases    ({ Draft: "…", Published: "…", fallback: "…" })
 * `insert` – insertion      ("Hello {{name}}!")
 * `nest`   – nested dict    ("navbar")
 * `md`     – markdown       ("# …")
 * `file`   – file reference ("./path/to/file.txt")
 * `html`   – html content   ("<p>…</p>")
 */
const INTLAYER_LEAF_CALL_NAMES: ReadonlySet<string> = new Set([
  't',
  'enu',
  'cond',
  'plural',
  'gender',
  'select',
  'insert',
  'nest',
  'md',
  'file',
  'html',
]);

/** Returns true when `node` is a call to any intlayer leaf helper function. */
const isIntlayerLeafCall = (node: OxcNode): boolean => {
  if (node['type'] !== 'CallExpression') return false;
  const callee = node['callee'] as OxcNode | undefined;
  return (
    callee?.['type'] === 'Identifier' &&
    INTLAYER_LEAF_CALL_NAMES.has(callee['name'] as string)
  );
};

/** Extract a string value from a Literal / StringLiteral / TemplateLiteral node. */
const getStringValue = (node: OxcNode): string | null => {
  if (
    (node['type'] === 'Literal' || node['type'] === 'StringLiteral') &&
    typeof node['value'] === 'string'
  ) {
    return node['value'] as string;
  }
  if (node['type'] === 'TemplateLiteral') {
    const quasis = node['quasis'] as OxcNode[] | undefined;
    const valueNode = quasis?.[0]?.['value'] as OxcNode | undefined;
    return (
      (valueNode?.['cooked'] as string | undefined) ??
      (valueNode?.['raw'] as string | undefined) ??
      null
    );
  }
  return null;
};

// ---------------------------------------------------------------------------
// JSON content-file support
// ---------------------------------------------------------------------------

/**
 * Well-known meta-keys that appear inside Intlayer typed nodes in JSON files.
 * e.g. { "nodeType": "translation", "translation": { "en": "…" } }
 * None of these are navigable content fields.
 */
const JSON_INTLAYER_NODE_KEYS: ReadonlySet<string> = new Set([
  'nodeType',
  'translation',
  'enumeration',
  'condition',
  'plural',
  'insertion',
  'nested',
  'markdown',
  'html',
  'file',
  'composite',
  'dictionaryKey',
  // JSON schema / system properties
  '$schema',
  'id',
  'projectIds',
  'localId',
  'localIds',
  'filePath',
  'versions',
  'filled',
  // Top-level dictionary meta-properties (not inside content)
  'key',
  'title',
  'description',
  'tags',
  'format',
  'locale',
  'schema',
  'location',
  'fill',
  'priority',
  'version',
  'importMode',
]);

/** Separator of the path segments in the keys of {@link scanJsonKeySpans}. */
const JSON_PATH_SEPARATOR = '\u0000';

type JsonContainerFrame = {
  isObject: boolean;
  path: string[];
  /** Object: the next string is a property key. */
  expectsKey: boolean;
  /** Object: key of the property being read. */
  currentKey: string;
  /** Array: index of the element being read. */
  index: number;
};

/** Offset just after the string literal opening at `start`. */
const findJsonStringEnd = (text: string, start: number): number => {
  let index = start + 1;

  while (index < text.length && text[index] !== '"') {
    index += text[index] === '\\' ? 2 : 1;
  }

  return Math.min(index + 1, text.length);
};

/** Value of a raw JSON string literal, quotes included. */
const readJsonString = (literal: string): string => {
  try {
    return JSON.parse(literal) as string;
  } catch {
    return literal.slice(1, -1);
  }
};

/**
 * Span of every property key (quotes included) of a JSON/JSONC text, indexed
 * by its path joined with {@link JSON_PATH_SEPARATOR}. Scans the raw text, so
 * a key is never confused with a string value or a same-named key elsewhere.
 */
const scanJsonKeySpans = (text: string): Map<string, OffsetSpan> => {
  const spans = new Map<string, OffsetSpan>();
  const frames: JsonContainerFrame[] = [];

  const pushFrame = (isObject: boolean): void => {
    const parent = frames.at(-1);
    const path = parent
      ? [
          ...parent.path,
          parent.isObject ? parent.currentKey : String(parent.index),
        ]
      : [];

    frames.push({
      isObject,
      path,
      expectsKey: isObject,
      currentKey: '',
      index: 0,
    });
  };

  let index = 0;

  while (index < text.length) {
    const character = text[index];
    const frame = frames.at(-1);

    if (character === '/' && text[index + 1] === '/') {
      const lineEnd = text.indexOf('\n', index);
      index = lineEnd === -1 ? text.length : lineEnd;
    } else if (character === '/' && text[index + 1] === '*') {
      const commentEnd = text.indexOf('*/', index + 2);
      index = commentEnd === -1 ? text.length : commentEnd + 2;
    } else if (character === '"') {
      const end = findJsonStringEnd(text, index);

      if (frame?.isObject && frame.expectsKey) {
        frame.currentKey = readJsonString(text.slice(index, end));
        frame.expectsKey = false;
        spans.set([...frame.path, frame.currentKey].join(JSON_PATH_SEPARATOR), {
          start: index,
          end,
        });
      }
      index = end;
    } else {
      if (character === '{' || character === '[') pushFrame(character === '{');
      else if (character === '}' || character === ']') frames.pop();
      else if (character === ',' && frame) {
        if (frame.isObject) frame.expectsKey = true;
        else frame.index++;
      }
      index++;
    }
  }

  return spans;
};

/**
 * Strip JSON5/JSONC single-line (//) and multi-line (/* *\/\/) comments,
 * and trailing commas, producing valid JSON that JSON.parse can handle.
 */
const stripJsonComments = (text: string): string =>
  text
    // Remove single-line comments (// …) EXCEPT in URLs (e.g., https://)
    .replace(/(?<!:)\/\/[^\r\n]*/g, '')
    // Remove block comments (/* … */)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove trailing commas before } or ]
    .replace(/,(\s*[}\]])/g, '$1');

type FieldResult = {
  dictionaryKey: string;
  fieldName: string;
  fieldPath: string[];
};

/** A content field of a JSON content file, with the span of its key. */
export type JsonContentField = {
  dottedKey: string;
  fieldPath: string[];
  start: number;
  end: number;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Parse a JSON/JSON5/JSONC content file, `null` when it is not an object. */
const parseJsonContentFile = (text: string): Record<string, unknown> | null => {
  try {
    const parsed: unknown = JSON.parse(stripJsonComments(text));

    return isPlainObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

/**
 * Every content field declared in a JSON/JSON5/JSONC content file, nested
 * ones as dotted keys, each with the span of its quoted key. Typed nodes
 * (`translation`, `insertion`, …) are leaves. Returns `[]` for invalid JSON.
 */
export const collectJsonContentFields = (text: string): JsonContentField[] => {
  const contentObject = parseJsonContentFile(text)?.['content'];

  if (!isPlainObject(contentObject)) return [];

  const keySpans = scanJsonKeySpans(text);
  const fields: JsonContentField[] = [];

  const walk = (
    objectValue: Record<string, unknown>,
    parentPath: string[]
  ): void => {
    for (const [fieldName, fieldValue] of Object.entries(objectValue)) {
      const fieldPath = [...parentPath, fieldName];
      const span = keySpans.get(
        ['content', ...fieldPath].join(JSON_PATH_SEPARATOR)
      );

      if (!span) continue;

      fields.push({ dottedKey: fieldPath.join('.'), fieldPath, ...span });

      if (isPlainObject(fieldValue) && !('nodeType' in fieldValue)) {
        walk(fieldValue, fieldPath);
      }
    }
  };

  walk(contentObject, []);

  return fields;
};

/** Intlayer node keys and locale codes: not navigable content fields. */
const isJsonSystemKey = (fieldName: string): boolean =>
  JSON_INTLAYER_NODE_KEYS.has(fieldName) ||
  /^[a-z]{2}(-[A-Z]{2})?$/.test(fieldName);

/**
 * Parse a JSON/JSON5/JSONC content file and, if `offset` falls on a content
 * field key, return the dictionary key, leaf field name, and full field path.
 *
 * Returns null when:
 * - The text is not valid JSON (even after comment stripping)
 * - The cursor is not on a navigable content field key
 * - The field is a meta/system key (nodeType, translation, locale codes, …)
 */
const findContentFieldAtOffsetJson = (
  text: string,
  offset: number
): FieldResult | null => {
  const dictionaryKey = parseJsonContentFile(text)?.['key'];

  if (typeof dictionaryKey !== 'string' || !dictionaryKey) return null;

  const field = collectJsonContentFields(text).find(
    ({ start, end, fieldPath }) =>
      offset >= start && offset <= end && !fieldPath.some(isJsonSystemKey)
  );

  return field
    ? {
        dictionaryKey,
        fieldName: field.fieldPath.at(-1)!,
        fieldPath: field.fieldPath,
      }
    : null;
};

// ---------------------------------------------------------------------------
// YAML / Markdown frontmatter fallback
// ---------------------------------------------------------------------------

/**
 * Locale-code pattern — keys matching this inside YAML content blocks are
 * translation locale identifiers, not navigable content fields.
 */
const LOCALE_CODE_PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;

/**
 * YAML / Markdown meta-keys that appear at the top level or inside typed nodes.
 * These should not be treated as navigable content fields.
 */
const YAML_META_KEYS: ReadonlySet<string> = new Set([
  'nodeType',
  'translation',
  'enumeration',
  'condition',
  'plural',
  'insertion',
  'nested',
  'markdown',
  'html',
  'file',
  'composite',
  'dictionaryKey',
  // Frontmatter / top-level keys
  'key',
  'title',
  'description',
  'tags',
  'format',
  'locale',
  'schema',
  'location',
  'fill',
  'priority',
  'version',
  'importMode',
  '$schema',
]);

/**
 * Improved regex fallback for YAML and Markdown content files.
 *
 * Strategy:
 * 1. Extract the dictionary key from the frontmatter / top-level `key:` line.
 * 2. Locate the `content:` section (YAML files only; Markdown has no `content:` block).
 * 3. Within the content section, find all `fieldName:` patterns at consistent
 *    indentation levels, skipping known meta-keys and locale codes.
 * 4. Check whether `offset` falls within one of those key spans.
 * 5. Return a single-element `fieldPath` (deep path tracking is impractical
 *    without a full YAML parser, but single-level is enough for most use cases).
 *
 * For Markdown files, `findContentFieldAtOffset` always returns null because
 * the body text is the content value — individual content "fields" are not
 * declared as separate properties.
 */
const findContentFieldAtOffsetYaml = (
  text: string,
  offset: number
): FieldResult | null => {
  // Extract dictionary key
  const keyMatch =
    /^key\s*:\s*(?:(['"`])([^'"`\r\n]+)\1|([^\s'"`{},\r\n]+))/m.exec(text);
  if (!keyMatch) return null;
  const dictionaryKey = keyMatch[2] ?? keyMatch[3];
  if (!dictionaryKey) return null;

  // Find the content: section start
  const contentSectionMatch = /^content\s*:/m.exec(text);
  if (!contentSectionMatch) return null;
  const contentStart =
    contentSectionMatch.index + contentSectionMatch[0].length;

  // Find the end of the content section: next top-level key (no leading whitespace)
  // or end of file.
  const afterContent = text.slice(contentStart);
  const nextTopLevelMatch = /\r?\n[a-zA-Z_$][a-zA-Z0-9_$]*\s*:/m.exec(
    afterContent
  );
  const contentEnd = nextTopLevelMatch
    ? contentStart + nextTopLevelMatch.index
    : text.length;

  // The cursor must be within the content block
  if (offset < contentStart || offset > contentEnd) return null;

  // Find all `  fieldName:` patterns within the content block.
  // We look for lines that have at least 2 spaces of indentation and a
  // word-character key followed by a colon.
  const contentText = text.slice(contentStart, contentEnd);
  const fieldPattern = /^([ \t]+)([a-zA-Z_$][a-zA-Z0-9_$]*)[ \t]*:/gm;

  let bestMatch: FieldResult | null = null;
  let fieldMatch: RegExpExecArray | null;

  while (true) {
    fieldMatch = fieldPattern.exec(contentText);
    if (fieldMatch === null) break;

    const fieldName = fieldMatch[2]!;

    // Skip meta-keys and locale codes
    if (YAML_META_KEYS.has(fieldName)) continue;
    if (LOCALE_CODE_PATTERN.test(fieldName)) continue;

    const fieldKeyStart =
      contentStart + fieldMatch.index + fieldMatch[1]!.length; // skip indentation
    const fieldKeyEnd = fieldKeyStart + fieldName.length;

    if (offset >= fieldKeyStart && offset <= fieldKeyEnd) {
      bestMatch = { dictionaryKey, fieldName, fieldPath: [fieldName] };
      break;
    }
  }

  return bestMatch;
};

// ---------------------------------------------------------------------------
// Oxc (TS / JS) AST path
// ---------------------------------------------------------------------------

const findContentFieldAtOffsetOxc = (
  _text: string,
  offset: number,
  program: OxcNode
): FieldResult | null => {
  let foundResult: FieldResult | null = null;

  walkAst(program, (node) => {
    if (foundResult) return true;
    if (node['type'] !== 'ObjectExpression') return;

    const properties = node['properties'] as OxcNode[] | undefined;
    if (!properties?.length) return;

    // Look for sibling `key:` and `content:` properties in the same object
    let dictionaryKey: string | null = null;
    let contentNode: OxcNode | null = null;

    for (const prop of properties) {
      if (prop['type'] !== 'Property') continue;
      const propKey = prop['key'] as OxcNode | undefined;
      const propValue = prop['value'] as OxcNode | undefined;
      if (!propKey || !propValue) continue;

      const keyName =
        (propKey['name'] as string | undefined) ??
        (propKey['value'] as string | undefined);

      if (keyName === 'key') dictionaryKey = getStringValue(propValue);
      if (keyName === 'content') contentNode = propValue;
    }

    if (!dictionaryKey || !contentNode) return;

    // Walk the `content:` object tree, tracking the path to each property key
    const walkContent = (obj: OxcNode, path: string[]): boolean => {
      if (obj['type'] !== 'ObjectExpression') return false;
      const props = obj['properties'] as OxcNode[] | undefined;
      if (!props) return false;

      for (const prop of props) {
        if (prop['type'] !== 'Property') continue;
        const propKey = prop['key'] as OxcNode | undefined;
        const propValue = prop['value'] as OxcNode | undefined;
        if (!propKey) continue;

        const fieldName =
          (propKey['name'] as string | undefined) ??
          (propKey['value'] as string | undefined);
        if (!fieldName) continue;

        const keyStart = propKey['start'] as number;
        const keyEnd = propKey['end'] as number;

        // Cursor is on this property key
        if (offset >= keyStart && offset <= keyEnd) {
          const fieldPath = [...path, fieldName];
          foundResult = { dictionaryKey: dictionaryKey!, fieldName, fieldPath };
          return true;
        }

        if (!propValue) continue;
        // Skip all intlayer leaf calls — their arguments are not navigable content fields
        if (isIntlayerLeafCall(propValue)) continue;
        // Recurse into nested plain objects
        if (propValue['type'] === 'ObjectExpression') {
          if (walkContent(propValue, [...path, fieldName])) return true;
        }
      }

      return false;
    };

    if (walkContent(contentNode, [])) return true;
  });

  return foundResult;
};
