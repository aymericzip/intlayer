// Characters/patterns in a string that require quoting in YAML
const NEEDS_QUOTING =
  /[\n\r\t#:{}[\],&*?|<>=!%@`'"\\]|^[-?!]|\s$|^\s|^[>|]|^[.]{2,}/;

// Values that parseYaml treats as preserved literals (not typed conversions)
const PRESERVED_LITERALS = new Set([
  'true',
  'false',
  'null',
  'undefined',
  'yes',
  'no',
  'on',
  'off',
  'NaN',
  'Infinity',
  '-Infinity',
]);

const serializeString = (value: string, indent: string): string => {
  if (value.includes('\n')) {
    const lines = value.split('\n');
    const body = lines.map((l) => `${indent}  ${l}`).join('\n');
    return `|\n${body}`;
  }

  if (
    NEEDS_QUOTING.test(value) ||
    PRESERVED_LITERALS.has(value) ||
    /^-?\d+(?:\.\d+)?(?:e[+-]?\d+)?$/i.test(value)
  ) {
    return JSON.stringify(value);
  }

  return value;
};

const serializeValue = (value: any, indent: string): string => {
  if (value === null || value === undefined) return 'null';

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    return serializeString(value, indent);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return value
      .map((item) => {
        const serialized = serializeValue(item, `${indent}  `);
        if (
          typeof item === 'object' &&
          item !== null &&
          !Array.isArray(item) &&
          !serialized.startsWith("'") &&
          !serialized.startsWith('"')
        ) {
          // Object items: put first key inline with the dash
          const lines = serialized.split('\n');
          return `${indent}- ${lines[0]}\n${lines
            .slice(1)
            .map((l) => `${indent}  ${l}`)
            .join('\n')}`.trimEnd();
        }
        return `${indent}- ${serialized}`;
      })
      .join('\n');
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';

    return entries
      .map(([k, value]) => {
        const key = /[\s:{}[\]]/.test(k) ? JSON.stringify(k) : k;
        const childIndent = `${indent}  `;

        if (value === null || value === undefined) {
          return `${indent}${key}: null`;
        }

        if (typeof value === 'object' && !Array.isArray(value)) {
          const nested = serializeValue(value, childIndent);
          return `${indent}${key}:\n${nested}`;
        }

        if (Array.isArray(value)) {
          if (value.length === 0) return `${indent}${key}: []`;
          const nested = serializeValue(value, childIndent);
          return `${indent}${key}:\n${nested}`;
        }

        return `${indent}${key}: ${serializeValue(value, indent)}`;
      })
      .join('\n');
  }

  return String(value);
};

export const stringifyYaml = (value: any): string =>
  `${serializeValue(value, '')}\n`;
