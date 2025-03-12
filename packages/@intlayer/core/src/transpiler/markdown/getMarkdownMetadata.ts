const parseToObject = <T = any>(input: string): T | null => {
  // Normalize different bracket types and keys/values
  let normalizedInput = input
    .trim()
    .replace(/^\[/, '[') // Keep array brackets
    .replace(/^\{/, '{') // Keep object brackets
    .replace(/\]$/, ']') // Keep array brackets
    .replace(/\}$/, '}') // Keep object brackets
    .replace(/([\w\d_]+)\s*:/g, '"$1":') // Ensure JSON-valid keys (e.g., key: -> "key":)
    .replace(/:\s*([a-zA-Z_][\w\d_]*)/g, ': "$1"'); // Handle unquoted string values

  // Fix arrays with unquoted items (e.g., [content, anotherContent])
  normalizedInput = normalizedInput.replace(
    /\[([^\[\]]+?)\]/g,
    (_match, arrayContent) => {
      const newContent = (arrayContent as string)
        .split(',')
        .map((item) => {
          const trimmed = item.trim();
          // If already quoted or is a valid number, return as is.
          if (
            (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
            !isNaN(Number(trimmed))
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

export const getMarkdownMetadata = (markdown: string): Record<string, any> => {
  const lines = markdown.split(/\r?\n/);
  const metadata: Record<string, any> = {};
  let inMetadataBlock = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check for the start/end of metadata block
    if (trimmedLine === '---') {
      // Toggle metadata block on first '---', then break on second
      if (!inMetadataBlock) {
        inMetadataBlock = true;
        continue;
      } else {
        // End of metadata block
        break;
      }
    }

    // If we're in the metadata block, parse key: value
    if (inMetadataBlock) {
      const match = line.match(/^([^:]+)\s*:\s*(.*)$/);
      if (match) {
        const key: string = match[1].trim();
        const value: string = match[2].trim();

        try {
          metadata[key] = parseToObject(value);
        } catch (e) {
          metadata[key] = value;
        }
      }
    }
  }

  return metadata;
};
