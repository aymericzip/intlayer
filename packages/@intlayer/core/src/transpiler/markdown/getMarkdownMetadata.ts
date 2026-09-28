import { parseYaml } from '../../utils/parseYaml';

/**
 * Extracts the raw content between the leading `---` delimiters.
 *
 * Walks the markdown line by line and stops at the closing delimiter, so the
 * document body (often far larger than its front matter) is never split.
 *
 * @returns The metadata block, or `undefined` when there is none.
 */
const extractMetadataBlock = (markdown: string): string | undefined => {
  let lineStart = 0;
  let isInsideMetadata = false;
  let metadataStart = 0;

  while (lineStart <= markdown.length) {
    const newlineIndex = markdown.indexOf('\n', lineStart);
    const lineEnd = newlineIndex === -1 ? markdown.length : newlineIndex;
    const trimmedLine = markdown.slice(lineStart, lineEnd).trim();

    if (isInsideMetadata) {
      if (trimmedLine === '---') {
        return markdown
          .slice(metadataStart, lineStart)
          .replace(/\r?\n$/, '')
          .replace(/\r\n/g, '\n');
      }
    } else if (trimmedLine !== '') {
      // The very first non-empty line must open the metadata block
      if (trimmedLine !== '---') return undefined;

      isInsideMetadata = true;
      metadataStart = lineEnd + 1;
    }

    if (newlineIndex === -1) return undefined;

    lineStart = newlineIndex + 1;
  }

  return undefined;
};

export const getMarkdownMetadata = <T extends Record<string, any>>(
  markdown: string
): T => {
  try {
    const metadataContent = extractMetadataBlock(markdown);

    if (metadataContent === undefined) return {} as T;

    return parseYaml<T>(metadataContent) ?? ({} as T);
  } catch {
    return {} as T;
  }
};
