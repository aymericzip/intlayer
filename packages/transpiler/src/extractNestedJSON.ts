import type { ContentModule, ContentValue } from 'intlayer';

type NestedContent = Record<string, ContentValue>;

export const extractObjectsWithId = (input: NestedContent): ContentModule[] => {
  // Function to recursively search and extract nested objects with an 'id'
  const search = (obj: NestedContent, results: ContentModule[]): void => {
    if (obj && typeof obj === 'object') {
      if (Object.prototype.hasOwnProperty.call(obj, 'id')) {
        results.push(obj as ContentModule);
      }
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
          search(obj[key] as NestedContent, results);
        }
      }
    }
  };

  const results: ContentModule[] = [];
  search(input, results);
  return results;
};
