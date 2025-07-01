/**
 * A more "unified" approach where each type (function, array, object, primitive)
 * is handled inside the main recursive body.
 */
export const resolveObjectPromises = async <T = unknown>(
  entry: any
): Promise<T> => {
  // Check if entry is a Promise (Thenable)
  if (entry && typeof entry.then === 'function') {
    const awaited = await entry;
    return resolveObjectPromises(awaited);
  }

  // If entry is a function, invoke it and process the result
  if (typeof entry === 'function') {
    const result = entry();
    return resolveObjectPromises(result);
  }

  if (Array.isArray(entry)) {
    return Promise.all(
      entry.map(async (item) => resolveObjectPromises(item))
    ) as unknown as T;
  }

  // Handle plain objects (but not arrays)
  if (entry && typeof entry === 'object') {
    // Arrays are handled in the `Array.isArray` branch above, so we know `entry` is a plain object here.

    const result: Record<string, any> = {};

    // Iterate over keys **sequentially** to make sure the insertion order of the
    // resulting object matches the original key order. Using `Promise.all` here
    // could lead to out-of-order insertions when asynchronous resolutions
    // finish at different times.
    for (const key of Object.keys(entry)) {
      result[key] = await resolveObjectPromises(entry[key]);
    }

    return result as T;
  }

  return entry as T;
};
