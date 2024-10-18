import type { Content, DeclarationContent } from '@intlayer/core';

/**
 *
 * This function extracts all nested objects with an 'key' field from the input object and returns them as an array
 *
 * Example:
 *
 * ```ts
 * const input = {
 *  key: '1',
 *  content:{
 *   name: 'John Doe',
 *    address: {
 *    key: '2',
 *    street: '123 Main St',
 *    city: 'Springfield',
 *    state: 'IL'
 *  },
 *  }
 * };
 * ```
 * const result = extractObjectsWithId(input);
 * console.log(result);
 *
 * Output:
 *
 * ```ts
 * [{
 *  id: '1',
 *  name: 'John Doe',
 *  address: {
 *    id: '2',
 *    street: '123 Main St',
 *    city: 'Springfield',
 *    state: 'IL'
 *  }
 * },
 * {
 *  id: '2',
 *  street: '123 Main St',
 *  city: 'Springfield',
 *  state: 'IL'
 * }]
 * ```
 *
 */
export const extractObjectsWithKey = (
  input: DeclarationContent
): DeclarationContent[] => {
  // Function to recursively search and extract nested objects with an 'id'
  const search = (obj: Content, results: DeclarationContent[]): void => {
    if (obj && typeof obj === 'object') {
      if (Object.hasOwn(obj, 'id')) {
        results.push(obj as DeclarationContent);
      }
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
          search(obj[key] as Content, results);
        }
      }
    }
  };

  const results: DeclarationContent[] = [];
  search(input as Content, results);
  return results;
};
