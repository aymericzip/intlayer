export const checkConfigConsistency = (subset: any, superset: any) => {
  for (const key in subset) {
    const val1 = subset[key];
    const val2 = superset[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      // Check if arrays are identical in content
      if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        throw new Error(`Configuration mismatch at key "${key}"`);
      }
    } else if (typeof val1 === 'object' && val1 !== null) {
      checkConfigConsistency(val1, val2);
    } else if (val1 !== val2) {
      throw new Error(`Configuration mismatch at key "${key}"`);
    }
  }
};
