import { resolve } from 'path';
import type { Content, ContentModule } from 'intlayer';

/**
 * Function to load the module file in a sandboxed environment
 */
const loadModule = async (modulePath: string): Promise<ContentModule> => {
  // @TODO: Sandbox the module to prevent malicious code execution

  return (await import(modulePath)).default;
};

/**
 * Function to replace function and async function fields with their results in the object
 */
const processFunctionResults = async (entry: Content) => {
  if (entry && typeof entry === 'object') {
    const promises: Promise<void>[] = [];
    const result: Content = {};

    for (const key of Object.keys(entry)) {
      const field = entry?.[key];

      if (typeof field === 'function') {
        // Wait for the function to resolve if it's an async function
        const promise = (async () => {
          // Execute the function and await the result if it's a Promise
          const value = await field();
          result[key] = value;
        })();
        promises.push(promise);
      } else {
        result[key] = field;
      }
    }

    // Wait for all async operations to complete
    await Promise.all(promises);

    return result;
  }

  return entry;
};

/**
 * Function to load, process the module and return the Intlayer ContentModule from the module file
 */
export const processModule = async (file: string) => {
  try {
    const functionPath = resolve(file);
    const entry = await loadModule(functionPath);

    return (await processFunctionResults(entry)) as ContentModule;
  } catch (error) {
    console.error('Error processing module:', error);
  }
};
