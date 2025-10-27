type Primitive = string | number | boolean | null | undefined;

type Recursive = Primitive | { [key: string]: Recursive } | Array<Recursive>;

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
