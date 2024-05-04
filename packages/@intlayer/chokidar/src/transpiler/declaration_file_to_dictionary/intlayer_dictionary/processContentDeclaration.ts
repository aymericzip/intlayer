import { resolve } from 'path';
import type {
  Content,
  ContentModule,
  FlatContent,
  FlatContentValue,
} from '@intlayer/core';
import { loadContentDeclaration } from './loadContentDeclaration';

/**
 * Function to replace function and async function fields with their results in the object
 */
const processFunctionResults = async (entry: Content): Promise<FlatContent> => {
  if (entry && typeof entry === 'object') {
    const promises: Promise<void>[] = [];
    const result: FlatContent = {};

    for (const key of Object.keys(entry)) {
      const field = entry?.[key];
      const isArray = Array.isArray(field);

      if (typeof field === 'object' && isArray) {
        result[key] = (await Promise.all(
          field.map(async (el) => {
            return await processFunctionResults(el as Content);
          })
        )) as unknown as FlatContentValue;
      } else if (typeof field === 'object') {
        result[key] = (await processFunctionResults(
          field as Content
        )) as FlatContentValue;
      } else if (typeof field === 'function') {
        // Wait for the function to resolve if it's an async function
        const promise = (async () => {
          // Execute the function and await the result if it's a Promise
          const value = await field();

          result[key] = value as FlatContentValue;
        })();
        promises.push(promise);
      } else {
        result[key] = field as FlatContentValue;
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
export const processContentDeclaration = async (file: string) => {
  try {
    const functionPath = resolve(file);
    const entry = loadContentDeclaration(functionPath);

    if (!entry) {
      console.error('No entry found in module:', functionPath);
      return;
    }

    return (await processFunctionResults(entry)) as ContentModule;
  } catch (error) {
    console.error('Error processing module:', error);
  }
};
