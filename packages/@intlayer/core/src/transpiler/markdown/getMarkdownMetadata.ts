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

export const getMarkdownMetadata = (
  markdown: string
): Record<string, any> | undefined => {
  try {
    const lines = markdown.split(/\r?\n/);

    // Check if the very first non-empty line is the metadata start delimiter.
    const firstNonEmptyLine = lines.find((line) => line.trim() !== '');

    if (!firstNonEmptyLine || firstNonEmptyLine.trim() !== '---') {
      return {};
    }

    const metadata: Record<string, any> = {};
    let inMetadataBlock = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Toggle metadata block on encountering the delimiter.
      if (trimmedLine === '---') {
        if (!inMetadataBlock) {
          // Begin metadata block.
          inMetadataBlock = true;
          continue;
        } else {
          // End of metadata block; stop processing.
          break;
        }
      }

      // If we're inside the metadata block, parse key: value pairs.
      if (inMetadataBlock) {
        const match = line.match(/^([^:]+)\s*:\s*(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          try {
            metadata[key] = parseToObject(value);
          } catch (e) {
            metadata[key] = value;
          }
        }
      }
    }

    return metadata;
  } catch (e) {
    return undefined;
  }
};
