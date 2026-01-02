import { isDeepStrictEqual } from 'node:util';

/**
 * Recursively checks if a subset configuration matches a superset configuration.
 * Throws an error if any value in the subset doesn't match the corresponding value in the superset.
 *
 * @param subset - The subset configuration (e.g., project.configuration from CMS)
 * @param superset - The superset configuration (e.g., local configuration)
 * @throws Error if any value in subset doesn't match the corresponding value in superset
 */
export const checkConfigConsistency = (
  subset: Record<string, any>,
  superset: Record<string, any>
): void => {
  Object.keys(subset).forEach((key) => {
    const isSubsetObject =
      typeof subset[key] === 'object' &&
      subset[key] !== null &&
      !Array.isArray(subset[key]);
    const isSupersetObject =
      typeof superset[key] === 'object' &&
      superset[key] !== null &&
      !Array.isArray(superset[key]);

    if (isSubsetObject && isSupersetObject) {
      checkConfigConsistency(subset[key], superset[key]);
    } else {
      if (!isDeepStrictEqual(subset[key], superset[key])) {
        throw new Error(
          `Configuration mismatch at key "${key}": expected ${JSON.stringify(superset[key])}, got ${JSON.stringify(subset[key])}`
        );
      }
    }
  });
};
