/** Splits a dot path (`grants.dictionary:read`) into its segments. */
const splitPath = (path: string): string[] =>
  path === '' ? [] : path.split('.');

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

/**
 * Reads the value stored at a dot path, `undefined` when any segment is missing.
 */
export const getValueAtPath = (source: unknown, path: string): unknown =>
  splitPath(path).reduce<unknown>(
    (current, segment) => (isRecord(current) ? current[segment] : undefined),
    source
  );

/**
 * Returns a copy of `source` with `value` written at a dot path.
 * Only the objects along the path are cloned; siblings keep their identity.
 */
export const setValueAtPath = <TSource>(
  source: TSource,
  path: string,
  value: unknown
): TSource => {
  const [segment, ...remainingSegments] = splitPath(path);

  if (segment === undefined) return value as TSource;

  const container: Record<string, unknown> = isRecord(source)
    ? Array.isArray(source)
      ? ([...source] as unknown as Record<string, unknown>)
      : { ...source }
    : {};

  container[segment] =
    remainingSegments.length === 0
      ? value
      : setValueAtPath(container[segment], remainingSegments.join('.'), value);

  return container as TSource;
};

/** Whether `path` is `parentPath` itself or one of its descendants. */
export const isPathWithin = (path: string, parentPath: string): boolean =>
  path === parentPath || path.startsWith(`${parentPath}.`);
