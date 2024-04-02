import type { Content, ContentModule } from 'intlayer';

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
