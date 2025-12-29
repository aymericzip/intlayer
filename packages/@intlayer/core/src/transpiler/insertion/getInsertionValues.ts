export const getInsertionValues = (content: string): string[] => {
  // Regular expression to match {{field}} patterns
  const regex = /{{\s*(\w+)\s*}}/g;
  const matches = [...content.matchAll(regex)];

  // If no matches are found, return undefined
  if (matches.length === 0) return [];

  // Extract field names from matches and return as an object with the field names
  return [...new Set(matches.map((match) => match[1]))];
};
