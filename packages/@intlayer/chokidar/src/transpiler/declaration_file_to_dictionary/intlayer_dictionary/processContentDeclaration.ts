import { logger } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';

/**
 * A more "unified" approach where each type (function, array, object, primitive)
 * is handled inside the main recursive body.
 */
export const resolveContentPromises = async <T = unknown>(
  entry: any
): Promise<T> => {
  // Check if entry is a Promise (Thenable)
  if (entry && typeof entry.then === 'function') {
    const awaited = await entry;
    return resolveContentPromises(awaited);
  }

  // If entry is a function, invoke it and process the result
  if (typeof entry === 'function') {
    const result = entry();
    return resolveContentPromises(result);
  }

  if (Array.isArray(entry)) {
    return Promise.all(
      entry.map(async (item) => resolveContentPromises(item))
    ) as unknown as T;
  }

  if (entry && typeof entry === 'object') {
    const result: Record<string, any> = {};
    const keys = Object.keys(entry);
    await Promise.all(
      keys.map(async (key) => {
        result[key] = await resolveContentPromises(entry[key]);
      })
    );
    return result as T;
  }

  return entry as T;
};

/**
 * Function to load, process the module and return the Intlayer Dictionary from the module file
 */
export const processContentDeclaration = async (
  contentDeclaration: Dictionary
): Promise<Dictionary | undefined> => {
  try {
    const content = (await resolveContentPromises(
      contentDeclaration.content
    )) as Dictionary['content'];

    return {
      ...contentDeclaration,
      content,
    } as Dictionary;
  } catch (error) {
    logger(error, {
      level: 'error',
    });
  }
};
