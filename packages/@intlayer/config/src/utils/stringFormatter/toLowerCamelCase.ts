/**
 * Convert a string to lowerCamelCase
 * e.g. "MyComponent" => "myComponent"
 * e.g. "auth-middleware" => "authMiddleware"
 */
export const toLowerCamelCase = (str: string): string => {
  if (!str) {
    return '';
  }

  // Handle kebab-case: "auth-middleware" => "authMiddleware"
  if (str.includes('-')) {
    return str
      .split('-')
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  }

  // Handle PascalCase: "MyComponent" => "myComponent"
  return str.charAt(0).toLowerCase() + str.slice(1);
};
