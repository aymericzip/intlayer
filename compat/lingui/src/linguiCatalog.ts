/**
 * Helpers for reading lingui message catalogs.
 *
 * lingui catalogs are flat maps whose keys are dotted strings
 * (`'results-table.bundleSize'`) rather than nested objects, and whose
 * compiled (`.mjs`) values are token arrays rather than plain strings. These
 * helpers bridge that format onto intlayer's ICU-based `resolveMessage`.
 */

/**
 * Reads a value from a catalog by id.
 *
 * lingui ids are flat keys that themselves contain dots
 * (`'results-table.bundleSize'`), so the flat key is tried first. When that
 * misses, the id is treated as a nested path (`'home.title'` →
 * `catalog.home.title`) to also support genuinely nested intlayer
 * dictionaries.
 *
 * @example
 * navigateCatalog({ 'a.b': 'X' }, 'a.b'); // 'X' (flat key)
 * navigateCatalog({ a: { b: 'X' } }, 'a.b'); // 'X' (nested path)
 */
export const navigateCatalog = (catalog: unknown, id: string): unknown => {
  if (!id) return catalog;
  if (catalog === null || typeof catalog !== 'object') return undefined;

  const flatValue = (catalog as Record<string, unknown>)[id];
  if (flatValue !== undefined) return flatValue;

  if (!id.includes('.')) return undefined;

  let current: unknown = catalog;
  for (const part of id.split('.')) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== 'object'
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
};

/**
 * Returns the flat id→message map of a catalog, transparently unwrapping the
 * lingui `{ messages: {…} }` wrapper when present.
 *
 * Compiled lingui catalogs (`.po`/`.mjs`/`.json`) nest the id→message map under
 * a top-level `messages` key, and syncJSON-backed intlayer dictionaries
 * preserve that wrapper (`{ messages: { 'hero.title': […] } }`). Centralized
 * intlayer dictionaries instead store the map at the top level
 * (`{ 'hero.title': '…' }`). Both shapes are supported.
 */
export const unwrapLinguiCatalog = (
  catalog: unknown
): Record<string, unknown> => {
  if (!catalog || typeof catalog !== 'object') return {};
  const wrapped = (catalog as Record<string, unknown>).messages;
  if (wrapped && typeof wrapped === 'object') {
    return wrapped as Record<string, unknown>;
  }
  return catalog as Record<string, unknown>;
};

/**
 * Reads a value from a catalog by id, accepting both the flat/nested shapes
 * handled by {@link navigateCatalog} and the lingui `{ messages: {…} }` wrapper.
 *
 * The direct lookup is tried first so a centralized dictionary that genuinely
 * stores content at the top level keeps working; only on a miss does it look
 * inside the `messages` wrapper used by namespaced lingui catalogs.
 */
export const navigateLinguiCatalog = (
  catalog: unknown,
  id: string
): unknown => {
  const direct = navigateCatalog(catalog, id);
  if (direct !== undefined) return direct;

  if (catalog && typeof catalog === 'object') {
    const wrapped = (catalog as Record<string, unknown>).messages;
    if (wrapped && typeof wrapped === 'object') {
      return navigateCatalog(wrapped, id);
    }
  }

  return undefined;
};

/**
 * Converts a single compiled lingui token to its ICU MessageFormat equivalent.
 *
 * Token shapes (from `@lingui/message-utils`):
 * - `string` → literal text
 * - `[name]` → `{name}`
 * - `[name, 'number' | 'date' | 'time', format?]` → `{name, number, format}`
 * - `[name, 'plural' | 'select' | 'selectordinal', options]` → ICU block,
 *   where each option value is itself a compiled sub-message.
 */
const tokenToIcu = (token: unknown): string => {
  if (typeof token === 'string') return token;
  if (!Array.isArray(token)) return '';

  const [name, type, format] = token as [string, string?, unknown?];

  if (type === undefined) return `{${String(name)}}`;

  if (type === 'plural' || type === 'select' || type === 'selectordinal') {
    const options = (format ?? {}) as Record<string, unknown>;
    const segments: string[] = [];
    let offsetSegment = '';

    for (const [category, value] of Object.entries(options)) {
      if (category === 'offset') {
        offsetSegment = `offset:${String(value)} `;
        continue;
      }
      segments.push(`${category} {${linguiMessageToIcu(value)}}`);
    }

    return `{${String(name)}, ${type}, ${offsetSegment}${segments.join(' ')}}`;
  }

  return format !== undefined
    ? `{${String(name)}, ${type}, ${String(format)}}`
    : `{${String(name)}, ${type}}`;
};

/**
 * Converts a compiled lingui message into an ICU MessageFormat string that
 * `@intlayer/core`'s `resolveMessage(…, 'icu')` can interpolate.
 *
 * Plain strings (uncompiled `.json` catalogs) pass through unchanged; token
 * arrays (compiled `.mjs` catalogs) are flattened, including nested
 * plural/select blocks and `{name}` placeholders.
 *
 * @example
 * linguiMessageToIcu(['Bundle Size']); // 'Bundle Size'
 * linguiMessageToIcu(['Hello ', ['name']]); // 'Hello {name}'
 * linguiMessageToIcu('Already ICU {count}'); // 'Already ICU {count}'
 */
export const linguiMessageToIcu = (compiled: unknown): string => {
  if (typeof compiled === 'string') return compiled;
  if (!Array.isArray(compiled)) return String(compiled ?? '');
  return compiled.map(tokenToIcu).join('');
};
