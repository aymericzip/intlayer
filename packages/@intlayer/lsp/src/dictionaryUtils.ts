import type { Dictionary } from '@intlayer/types/dictionary';

type ContentObj = Record<string, unknown>;

const LOCALE_PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;
const META_KEYS: ReadonlySet<string> = new Set([
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
]);

const isTypedNode = (val: unknown): val is ContentObj =>
  typeof val === 'object' &&
  val !== null &&
  typeof (val as ContentObj)['nodeType'] === 'string';

const getTypedNodeSummary = (node: ContentObj): string => {
  const nodeType = node['nodeType'] as string;
  const inner = node[nodeType];

  if (inner && typeof inner === 'object') {
    const map = inner as Record<string, unknown>;
    const localeEntries = Object.entries(map).filter(([key]) =>
      LOCALE_PATTERN.test(key)
    );

    const entries =
      localeEntries.length > 0 ? localeEntries : Object.entries(map);

    if (entries.length > 0) {
      return entries
        .slice(0, 5)
        .map(
          ([k, v]) =>
            `**${k}**: ${typeof v === 'string' ? v : JSON.stringify(v)}`
        )
        .join('\n\n');
    }
  }

  return `*(${nodeType})*`;
};

export const formatFieldValue = (value: unknown): string => {
  if (value === null || value === undefined) return `\`${String(value)}\``;

  if (typeof value === 'string') return `"${value}"`;

  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);

  if (typeof value === 'object') {
    const obj = value as ContentObj;

    if (isTypedNode(obj)) return getTypedNodeSummary(obj);
    const fields = Object.keys(obj).filter(
      (key) => !META_KEYS.has(key) && !LOCALE_PATTERN.test(key)
    );
    return fields.length > 0 ? `{ ${fields.slice(0, 8).join(', ')} }` : '{}';
  }
  return JSON.stringify(value);
};

export const getFieldByPath = (content: unknown, path: string[]): unknown => {
  let current = content;
  for (const key of path) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as ContentObj)[key];
  }
  return current;
};

const isNavigableField = (key: string): boolean =>
  !META_KEYS.has(key) && !LOCALE_PATTERN.test(key);

export const getTopLevelFields = (content: unknown): string[] => {
  if (!content || typeof content !== 'object') return [];
  return Object.keys(content as ContentObj).filter(isNavigableField);
};

export const getFieldsAtPath = (content: unknown, path: string[]): string[] => {
  const value = path.length === 0 ? content : getFieldByPath(content, path);

  if (!value || typeof value !== 'object') return [];

  if (isTypedNode(value as ContentObj)) return [];
  return Object.keys(value as ContentObj).filter(isNavigableField);
};

export const formatDictionaryHover = (
  dictionaries: Dictionary[],
  key: string
): string => {
  const primary = dictionaries[0]!;
  const lines: string[] = [`**Intlayer dictionary** \`${key}\``];

  if (primary.title) lines.push(`*${primary.title}*`);

  if (primary.description) lines.push(primary.description);

  const fields = getTopLevelFields(primary.content);

  if (fields.length > 0) {
    lines.push('');
    lines.push(
      `**Fields:** ${fields.map((field) => `\`${field}\``).join(', ')}`
    );
  }

  if (dictionaries.length > 1) {
    lines.push(`*(${dictionaries.length} source files)*`);
  }

  return lines.join('\n\n');
};

export const formatFieldHover = (
  dictionaries: Dictionary[],
  dictionaryKey: string,
  fieldPath: string[]
): string | null => {
  for (const dict of dictionaries) {
    const value = getFieldByPath(dict.content, fieldPath);

    if (value === undefined) continue;
    return [
      `**\`${dictionaryKey}.${fieldPath.join('.')}\`**`,
      formatFieldValue(value),
    ].join('\n\n');
  }
  return null;
};
