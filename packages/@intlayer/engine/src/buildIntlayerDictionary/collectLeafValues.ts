/**
 * Maps each leaf of a normalized content to its value. Fields under the root
 * translation node are named `field (locale)`.
 */
export const collectLeafValues = (
  node: unknown,
  path: string[] = [],
  leafValues: Map<string, unknown> = new Map()
): Map<string, unknown> => {
  if (node !== null && typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      collectLeafValues(value, [...path, key], leafValues);
    }
  } else if (node !== undefined) {
    const fieldName =
      path[0] === 'translation' && path.length > 2
        ? `${path.slice(2).join('.')} (${path[1]})`
        : path.join('.');

    leafValues.set(fieldName, node);
  }

  return leafValues;
};
