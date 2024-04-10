import type { Content, ContentModule } from '@intlayer/core';

/**
 *
 * This function extracts all nested objects with an 'id' field from the input object and returns them as an array
 *
 * Example:
 *
 * const input = {
 *  id: '1',
 *  name: 'John Doe',
 *  address: {
 *    id: '2',
 *    street: '123 Main St',
 *    city: 'Springfield',
 *    state: 'IL'
 *  },
 * };
 * const result = extractObjectsWithId(input);
 * console.log(result);
 *
 * Output:
 *
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
 *
 */
export const extractObjectsWithId = (input: ContentModule): ContentModule[] => {
  // Function to recursively search and extract nested objects with an 'id'
  const search = (obj: Content, results: ContentModule[]): void => {
    if (obj && typeof obj === 'object') {
      if (Object.prototype.hasOwnProperty.call(obj, 'id')) {
        results.push(obj as ContentModule);
      }
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
          search(obj[key] as Content, results);
        }
      }
    }
  };

  const results: ContentModule[] = [];
  search(input, results);
  return results;
};
