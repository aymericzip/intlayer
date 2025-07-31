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

export const getMarkdownMetadata = <T extends Record<string, any>>(
  markdown: string
): T => {
  try {
    const lines = markdown.split(/\r?\n/);

    // Check if the very first non-empty line is the metadata start delimiter.
    const firstNonEmptyLine = lines.find((line) => line.trim() !== '');

    if (!firstNonEmptyLine || firstNonEmptyLine.trim() !== '---') {
      const result: T = {} as T;
      return result;
    }

    const metadata: T = {} as T;
    let inMetadataBlock = false;
    let currentKey: string | null = null;
    let currentArrayItems: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Toggle metadata block on encountering the delimiter.
      if (trimmedLine === '---') {
        if (!inMetadataBlock) {
          // Begin metadata block.
          inMetadataBlock = true;
          continue;
        } else {
          // End of metadata block; finalize any pending array and stop processing.
          if (currentKey && currentArrayItems.length > 0) {
            (metadata as Record<string, any>)[currentKey] = currentArrayItems;
          }
          break;
        }
      }

      // If we're inside the metadata block, parse key: value pairs.
      if (inMetadataBlock) {
        // Check if this line is an array item (starts with - )
        const arrayItemMatch = line.match(/^\s*-\s+(.+)$/);
        if (arrayItemMatch && currentKey) {
          // This is an array item for the current key
          currentArrayItems.push(arrayItemMatch[1].trim());
          continue;
        }

        // If we have a pending array from a previous key, save it
        if (currentKey && currentArrayItems.length > 0) {
          (metadata as Record<string, any>)[currentKey] = currentArrayItems;
          currentKey = null;
          currentArrayItems = [];
        }

        // Check for key: value pairs
        const match = line.match(/^([^:]+)\s*:\s*(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();

          if (value === '') {
            // This might be the start of a multi-line structure (like an array)
            currentKey = key;
            currentArrayItems = [];
          } else {
            try {
              (metadata as Record<string, any>)[key] = parseToObject(value);
            } catch (e) {
              (metadata as Record<string, any>)[key] = value;
            }
          }
        }
      }
    }

    return metadata;
  } catch (e) {
    const result: T = {} as T;
    return result;
  }
};
