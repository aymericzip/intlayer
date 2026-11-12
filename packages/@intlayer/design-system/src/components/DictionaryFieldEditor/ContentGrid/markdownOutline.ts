/** One heading of a markdown document. */
export type MarkdownHeading = {
  /** 1 for `#`, 6 for `######`. */
  level: number;
  /** Heading text, inline markers stripped. */
  text: string;
  /** Zero-based line index of the heading in the source. */
  lineIndex: number;
};

const HEADING_PATTERN = /^ {0,3}(#{1,6})[ \t]+(.+?)[ \t#]*$/;
const FENCE_PATTERN = /^ {0,3}(```|~~~)/;
const INLINE_MARKERS_PATTERN = /[*_`~]|\[([^\]]*)\]\([^)]*\)/g;

/**
 * Lists the ATX headings (`#` … `######`) of a markdown document, ignoring
 * fenced code blocks and front matter.
 */
export const getMarkdownOutline = (markdown: string): MarkdownHeading[] => {
  const lines = markdown.split(/\r?\n/);
  const headings: MarkdownHeading[] = [];
  let openFence: string | undefined;
  let startIndex = 0;

  // Skip a leading front matter block
  if (lines[0]?.trim() === '---') {
    const closingIndex = lines.findIndex(
      (line, index) => index > 0 && line.trim() === '---'
    );
    if (closingIndex > 0) startIndex = closingIndex + 1;
  }

  for (let lineIndex = startIndex; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex] ?? '';
    const fence = FENCE_PATTERN.exec(line)?.[1];

    if (fence) {
      if (!openFence) openFence = fence;
      else if (openFence === fence) openFence = undefined;
      continue;
    }
    if (openFence) continue;

    const match = HEADING_PATTERN.exec(line);
    if (!match) continue;

    const text = (match[2] ?? '')
      .replace(
        INLINE_MARKERS_PATTERN,
        (_marker, linkText?: string) => linkText ?? ''
      )
      .trim();

    if (text) {
      headings.push({ level: match[1]?.length ?? 1, text, lineIndex });
    }
  }

  return headings;
};

/** Counts words of a markdown document, markup excluded. */
export const countMarkdownWords = (markdown: string): number =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`~|[\]()-]/g, ' ')
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

/** A markdown document split into its front matter block and its body. */
export type SplitFrontMatter = {
  /** Raw front matter block, delimiters and trailing newline included. */
  frontMatter: string;
  body: string;
};

const FRONT_MATTER_PATTERN = /^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/;

/**
 * Separates a leading `---` front matter block from the document body so the
 * body can be edited alone and the block re-attached on write.
 */
export const splitFrontMatter = (markdown: string): SplitFrontMatter => {
  const frontMatter = FRONT_MATTER_PATTERN.exec(markdown)?.[0] ?? '';

  return { frontMatter, body: markdown.slice(frontMatter.length) };
};
