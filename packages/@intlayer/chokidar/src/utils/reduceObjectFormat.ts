export type Primitive = string | number | boolean | null | undefined;

export type Recursive =
  | Primitive
  | { [key: string]: Recursive }
  | Array<Recursive>;

/**
 * Reduce an object to only the shape provided by a format object.
 * Values are always taken from the source object; the format is used only for structure.
 *
 * Examples:
 * reduceObjectFormat({ a: 1, b: 2 }, { a: 0 }) => { a: 1 }
 * reduceObjectFormat({ a: { x: 1, y: 2 } }, { a: { x: 0 } }) => { a: { x: 1 } }
 */
export const reduceObjectFormat = (
  source: Recursive,
  format: Recursive
): Recursive => {
  // If the format is an array, reduce each element by its counterpart in source
  if (Array.isArray(format)) {
    const sourceArray = Array.isArray(source) ? source : [];
    return format.map((formatItem, index) =>
      reduceObjectFormat(sourceArray[index], formatItem)
    );
  }

  // If the format is an object (and not null), pick matching keys and recurse
  if (typeof format === 'object' && format !== null) {
    const result: Record<string, Recursive> = {};
    const sourceObject =
      typeof source === 'object' && source !== null && !Array.isArray(source)
        ? (source as Record<string, Recursive>)
        : ({} as Record<string, Recursive>);

    for (const key of Object.keys(format)) {
      const nextSource = sourceObject[key];
      const nextFormat = (format as Record<string, Recursive>)[key];
      result[key] = reduceObjectFormat(nextSource, nextFormat);
    }
    return result;
  }

  // For primitives in the format, simply return the source value (can be undefined)
  return source as Primitive;
};

/**
 * Returns the subset of source whose keys are NOT present in the format object.
 * Inverse of reduceObjectFormat.
 *
 * Null values in source are always included as explicit fallback markers
 * (they signal "use default locale" at render time).
 *
 * Examples:
 * excludeObjectFormat({ a: 1, b: 2 }, { b: 0 }) => { a: 1 }
 * excludeObjectFormat({ a: { x: 1, y: 2 } }, { a: { x: 0 } }) => { a: { y: 2 } }
 * excludeObjectFormat({ a: null, b: 2 }, { b: 0 }) => { a: null }
 */
export const excludeObjectFormat = (
  source: Recursive,
  format: Recursive
): Recursive | undefined => {
  // null in source = explicit fallback marker → always include
  if (source === null) return null;

  // No format means nothing is translated yet → include all source
  if (format === undefined || format === null) return source;

  // Both plain objects → recurse key-by-key
  if (
    typeof source === 'object' &&
    !Array.isArray(source) &&
    typeof format === 'object' &&
    !Array.isArray(format)
  ) {
    const result: Record<string, Recursive> = {};
    let hasContent = false;

    for (const key of Object.keys(source as Record<string, Recursive>)) {
      const excluded = excludeObjectFormat(
        (source as Record<string, Recursive>)[key],
        (format as Record<string, Recursive>)[key]
      );
      if (excluded !== undefined) {
        result[key] = excluded;
        hasContent = true;
      }
    }

    return hasContent ? result : undefined;
  }

  // Arrays → recurse by index
  if (Array.isArray(source)) {
    const formatArr = Array.isArray(format) ? format : [];
    const result: Recursive[] = [];

    for (let i = 0; i < source.length; i++) {
      const excluded = excludeObjectFormat(source[i], formatArr[i]);
      if (excluded !== undefined) {
        result.push(excluded);
      }
    }

    return result.length > 0 ? result : undefined;
  }

  // Primitive in source and format has a value → already translated → exclude
  return undefined;
};
