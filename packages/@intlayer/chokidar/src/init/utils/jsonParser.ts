/**
 * Helper to parse JSON that may contain comments (tsconfig allows comments)
 */
export const parseJSONWithComments = (jsonString: string) => {
  // First, try parsing as-is (most tsconfig files don't have comments)
  try {
    return JSON.parse(jsonString);
  } catch {
    // If that fails, try stripping comments
    // Note: This simple approach removes comments line by line to avoid
    // matching glob patterns like /* and */ that appear in paths
  }

  // Process line by line to safely remove comments
  const lines = jsonString.split('\n');
  const cleanedLines = lines.map((line) => {
    // Track if we're inside a string
    let inString = false;
    let result = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      // Handle string boundaries (accounting for escaped quotes)
      if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
        inString = !inString;
        result += char;
        continue;
      }

      // If we're inside a string, keep the character
      if (inString) {
        result += char;
        continue;
      }

      // Check for single-line comment outside of strings
      if (char === '/' && nextChar === '/') {
        // Rest of line is a comment, stop here
        break;
      }

      // Check for multi-line comment start (/* ... */)
      // For simplicity, we only handle single-line /* */ comments here
      if (char === '/' && nextChar === '*') {
        const endIndex = line.indexOf('*/', i + 2);
        if (endIndex !== -1) {
          // Skip the comment
          i = endIndex + 1;
          continue;
        }
      }

      result += char;
    }

    return result;
  });

  return JSON.parse(cleanedLines.join('\n'));
};
