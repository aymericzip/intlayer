/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@intlayer/config/client';
import type { Dictionary } from '@intlayer/core';

/**
 * Helper that awaits either a synchronous or asynchronous value.
 */
const awaitFunction = async (fn: any) => {
  // Check if result is a Promise (Thenable)

  if (fn && typeof fn.then === 'function') {
    // It's a Promise, so wait for it to resolve
    await fn;
  }
  // If not a Promise, it will just execute without awaiting
};

/**
 * A more "unified" approach where each type (function, array, object, primitive)
 * is handled inside the main recursive body.
 */
const processFunctionResults = async <T = unknown>(entry: any): Promise<T> => {
  // If entry is a function, invoke it and process the result
  if (typeof entry === 'function') {
    const result = await awaitFunction(entry());
    // Recursively process the result in case it contains nested arrays/objects/functions
    return await processFunctionResults(result);
  }

  // If entry is an array, recursively process each item
  if (Array.isArray(entry)) {
    return Promise.all(
      entry.map(async (item) => await processFunctionResults(item))
    ) as unknown as T;
  }

  // If entry is an object, recursively process each property
  if (entry && typeof entry === 'object') {
    const result: Record<string, any> = {};
    // Use Promise.all to handle any async resolution for the properties
    const keys = Object.keys(entry);
    await Promise.all(
      keys.map(async (key) => {
        result[key] = await processFunctionResults(entry[key]);
      })
    );
    return result as T;
  }

  // Otherwise, it's a primitive value—just return as is
  return entry as T;
};

/**
 * Function to load, process the module and return the Intlayer Dictionary from the module file
 */
export const processContentDeclaration = async (
  contentDeclaration: Dictionary
): Promise<Dictionary | undefined> => {
  try {
    const content = (await processFunctionResults(
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
