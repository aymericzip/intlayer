export const parseYaml = <T = any>(input: string): T | null => {
  const trimmedInput = input.trim();

  // Handle empty input
  if (!trimmedInput) {
    return null;
  }

  // If it's a simple unquoted string (not an array or object), return it as-is
  if (!trimmedInput.startsWith('[') && !trimmedInput.startsWith('{')) {
    // Check if it's a number
    if (!Number.isNaN(Number(trimmedInput))) {
      return JSON.parse(trimmedInput) as T;
    }
    // Check if it's already a quoted string
    if (
      (trimmedInput.startsWith('"') && trimmedInput.endsWith('"')) ||
      (trimmedInput.startsWith("'") && trimmedInput.endsWith("'"))
    ) {
      return JSON.parse(trimmedInput) as T;
    }
    // Return as unquoted string
    return trimmedInput as T;
  }

  // Normalize different bracket types and keys/values
  let normalizedInput = trimmedInput
    .replace(/^\[/, '[') // Keep array brackets
    .replace(/^\{/, '{') // Keep object brackets
    .replace(/\]$/, ']') // Keep array brackets
    .replace(/\}$/, '}') // Keep object brackets
    .replace(/([\w\d_]+)\s*:/g, '"$1":') // Ensure JSON-valid keys (e.g., key: -> "key":)
    .replace(/:\s*([a-zA-Z_][\w\d_]*)/g, ': "$1"'); // Handle unquoted string values

  // Fix arrays with unquoted items (e.g., [content, anotherContent])
  normalizedInput = normalizedInput.replace(
    /\[([^[\]]+?)\]/g,
    (_match, arrayContent) => {
      const newContent = (arrayContent as string)
        .split(',')
        .map((item) => {
          const trimmed = item.trim();
          // If already quoted or is a valid number, return as is.
          if (
            (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
            !Number.isNaN(Number(trimmed))
          ) {
            return trimmed;
          }
          return `"${trimmed}"`;
        })
        .join(', ');
      return `[${newContent}]`;
    }
  );

  // Parse the string into an object
  return JSON.parse(normalizedInput) as T;
};
