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

/**
 * Find the byte offset of `fieldName` (as a JSON property key) inside `text`,
 * searching within the range [searchFrom, searchTo).
 *
 * Matches `"fieldName"` surrounded by typical JSON delimiters.
 */
const findJsonKeyOffset = (
  text: string,
  fieldName: string,
  searchFrom: number,
  searchTo: number
): number => {
  const pattern = new RegExp(
    `"${fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
    'g'
  );
  pattern.lastIndex = searchFrom;
  let match: RegExpExecArray | null;
  while (true) {
    match = pattern.exec(text);
    if (match === null) break;
    if (match.index >= searchTo) break;
    return match.index;
  }
  return -1;
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
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(stripJsonComments(text)) as Record<string, unknown>;
  } catch {
    return null;
  }

  const dictionaryKey =
    typeof parsed['key'] === 'string' ? parsed['key'] : null;
  if (!dictionaryKey) return null;

  const contentObj = parsed['content'];
  if (
    !contentObj ||
    typeof contentObj !== 'object' ||
    Array.isArray(contentObj)
  )
    return null;

  // Find the byte range of the "content" block in raw text so we can scope
  // offset comparisons to content fields only.
  const contentKeyIndex = text.indexOf('"content"');
  if (contentKeyIndex === -1) return null;

  /**
   * Recursively walk the parsed content object.
   * For each property key, check whether the raw text position of that key
   * (within the remaining text slice) overlaps with `offset`.
   *
   * `textFrom` is where we start searching for each key in the raw text —
   * we advance it as we consume properties to avoid false matches on
   * identically-named sibling keys.
   */
  const walk = (
    obj: Record<string, unknown>,
    path: string[],
    searchFrom: number,
    searchTo: number
  ): FieldResult | null => {
    for (const [fieldName, fieldValue] of Object.entries(obj)) {
      // Skip Intlayer-internal node keys — they are not navigable content fields
      if (JSON_INTLAYER_NODE_KEYS.has(fieldName)) continue;

      // Skip keys that look like locale codes (e.g. "en", "fr", "en-GB")
      if (/^[a-z]{2}(-[A-Z]{2})?$/.test(fieldName)) continue;

      const keyStart = findJsonKeyOffset(text, fieldName, searchFrom, searchTo);
      if (keyStart === -1) continue;
      const keyEnd = keyStart + fieldName.length + 2; // +2 for surrounding quotes

      if (offset >= keyStart && offset <= keyEnd) {
        return {
          dictionaryKey,
          fieldName,
          fieldPath: [...path, fieldName],
        };
      }

      // Recurse into plain nested objects (skip typed nodes — they have nodeType)
      if (
        fieldValue !== null &&
        typeof fieldValue === 'object' &&
        !Array.isArray(fieldValue)
      ) {
        const nested = fieldValue as Record<string, unknown>;
        // Skip Intlayer typed nodes — their children are not content fields
        if ('nodeType' in nested) continue;

        const result = walk(nested, [...path, fieldName], keyEnd, searchTo);
        if (result) return result;
      }
    }
    return null;
  };

  return walk(
    contentObj as Record<string, unknown>,
    [],
    contentKeyIndex,
    text.length
  );
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
