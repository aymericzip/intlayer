export const camelCaseToSentence = (value: string): string => {
  if (!value) return '';
  if (typeof value !== 'string') return '';

  // Insert space before all caps that follow lowercase letters
  const withSpaces = value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Insert space between sequences like "XMLParser" → "XML Parser"
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  // Lowercase everything except the first character
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
};
