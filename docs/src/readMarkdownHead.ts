import { open } from 'node:fs/promises';

/**
 * Bytes read per step. Front matter is ~0.6 KiB at the median and ~1.9 KiB at
 * the 99th percentile, so the first step almost always holds all of it.
 */
export const MARKDOWN_HEAD_CHUNK_SIZE = 2 * 1024;

/**
 * A lazily read document from a generated entry file.
 * Awaiting it reads the whole file; `readHead` reads only its front matter.
 */
export type LazyDocument = Promise<string> & {
  readHead: () => Promise<string>;
};

export const isLazyDocument = (
  document: Promise<string> | undefined
): document is LazyDocument =>
  typeof (document as Partial<LazyDocument> | undefined)?.readHead ===
  'function';

/**
 * Whether the bytes read so far hold the whole front matter (or show that
 * there is none). Mirrors `getMarkdownMetadata`: the first non-empty line must
 * be `---`, and the block ends at the next line trimmed to `---`.
 *
 * Decoded as latin1: the delimiters are ASCII, and UTF-8 multi-byte sequences
 * never contain ASCII bytes, so a character split across chunks is harmless.
 */
const isFrontMatterComplete = (head: string): boolean => {
  let lineStart = 0;
  let isInsideFrontMatter = false;

  while (true) {
    const newlineIndex = head.indexOf('\n', lineStart);

    // The last line may still be cut: wait for its end before judging it
    if (newlineIndex === -1) return false;

    const trimmedLine = head.slice(lineStart, newlineIndex).trim();

    if (isInsideFrontMatter) {
      if (trimmedLine === '---') return true;
    } else if (trimmedLine !== '') {
      if (trimmedLine !== '---') return true;
      isInsideFrontMatter = true;
    }

    lineStart = newlineIndex + 1;
  }
};

/**
 * Reads a markdown file up to the end of its front matter.
 *
 * Metadata listings (sitemaps, navigation, dictionaries) need every document of
 * every locale, but only their front matter — reading whole files there costs
 * far more than parsing them.
 */
export const readMarkdownHead = async (filePath: string): Promise<string> => {
  const fileHandle = await open(filePath, 'r');

  try {
    const chunks: Buffer[] = [];
    let totalLength = 0;

    while (true) {
      const buffer = Buffer.allocUnsafe(MARKDOWN_HEAD_CHUNK_SIZE);
      const { bytesRead } = await fileHandle.read(
        buffer,
        0,
        MARKDOWN_HEAD_CHUNK_SIZE,
        null
      );

      if (bytesRead === 0) break;

      chunks.push(buffer.subarray(0, bytesRead));
      totalLength += bytesRead;

      const head = Buffer.concat(chunks, totalLength);

      if (isFrontMatterComplete(head.toString('latin1'))) {
        return head.toString('utf8');
      }
    }

    return Buffer.concat(chunks, totalLength).toString('utf8');
  } finally {
    await fileHandle.close();
  }
};
