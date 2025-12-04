/**
 * Deep merge two plain objects (for per-locale content).
 * The second object's values take precedence over the first.
 *
 * @param target - The base object
 * @param source - The object to merge in (takes precedence)
 * @returns The merged object
 */
export const deepMergeContent = <T = any>(target: T, source: T): T => {
  // Handle null/undefined
  if (!target) return source;
  if (!source) return target;

  // Handle non-objects (primitives, arrays)
  if (
    typeof target !== 'object' ||
    typeof source !== 'object' ||
    Array.isArray(target) ||
    Array.isArray(source)
  ) {
    return source;
  }

  // Merge objects
  const result: any = { ...target };

  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      const sourceValue = (source as any)[key];
      const targetValue = result[key];

      if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge nested objects
        result[key] = deepMergeContent(targetValue, sourceValue);
      } else {
        // Overwrite with source value
        result[key] = sourceValue;
      }
    }
  }

  return result;
};
