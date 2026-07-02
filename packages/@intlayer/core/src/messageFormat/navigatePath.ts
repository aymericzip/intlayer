/**
 * Reads a dotted `path` (e.g. `counter.label`) out of a nested content value.
 *
 * The full path is first tried as a *flat* property, supporting catalogs that
 * use dotted keys as literal field names (i18next flat JSON files, lingui
 * catalogs: `{ "section.title": "value" }`). When that misses, the path is
 * split on `keySeparator` and walked segment by segment.
 *
 * Shared by every compat adapter's translation lookup — do not re-implement
 * it locally.
 *
 * @param contentValue - The object (dictionary content) to read from.
 * @param path - Separator-delimited path. An empty path returns `contentValue`.
 * @param keySeparator - Segment separator; `false` disables nested traversal
 *   (flat lookup only), mirroring i18next's `keySeparator: false`.
 * @returns The value found at `path`, or `undefined` when any segment is absent.
 */
export const navigatePath = (
  contentValue: unknown,
  path: string,
  keySeparator: string | false = '.'
): unknown => {
  if (!path) return contentValue;

  if (
    contentValue !== null &&
    contentValue !== undefined &&
    typeof contentValue === 'object'
  ) {
    const flatValue = (contentValue as Record<string, unknown>)[path];
    if (flatValue !== undefined) return flatValue;
  }

  if (keySeparator === false || !path.includes(keySeparator)) {
    return undefined;
  }

  let current: unknown = contentValue;
  for (const part of path.split(keySeparator)) {
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
