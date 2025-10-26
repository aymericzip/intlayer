import { parseYaml } from '../../utils/parseYaml';

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

    // Find the end of the metadata block
    let metadataEndIndex = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        metadataEndIndex = i;
        break;
      }
    }

    if (metadataEndIndex === -1) {
      // No closing delimiter found
      const result: T = {} as T;
      return result;
    }

    // Extract the metadata content between the delimiters
    const metadataLines = lines.slice(1, metadataEndIndex);
    const metadataContent = metadataLines.join('\n');

    // Use the improved parseYaml function to parse the entire metadata block
    const metadata = parseYaml<T>(metadataContent);

    return metadata ?? ({} as T);
  } catch (_e) {
    const result: T = {} as T;
    return result;
  }
};
