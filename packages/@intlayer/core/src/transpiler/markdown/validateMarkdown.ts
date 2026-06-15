import { type HTMLValidationIssue, validateHTML } from '../html/validateHTML';

export type { HTMLValidationIssue as MarkdownValidationIssue } from '../html/validateHTML';

export type MarkdownValidationResult = {
  valid: boolean;
  issues: HTMLValidationIssue[];
};

/**
 * Strips fenced code blocks and inline code from markdown content so that
 * HTML-like syntax inside code is not mistakenly validated.
 */
const stripCode = (content: string): string => {
  const lines = content.split('\n');
  const result: string[] = [];
  let inCodeBlock = false;
  let openFence: string | null = null;

  for (const line of lines) {
    // Allow leading whitespace and blockquote markers before the fence characters
    const fence = line.match(/^[\s>]*(`{3,}|~{3,})/);
    if (!inCodeBlock) {
      if (fence?.[1]) {
        inCodeBlock = true;
        openFence = fence[1];
        result.push('');
      } else {
        // Also strip inline code spans on this line. Code spans may be
        // delimited by a run of one or more backticks and end with a matching
        // run of the same length (CommonMark), allowing shorter backtick runs
        // inside (e.g. `` t`Hello ${name}` ``).
        result.push(
          line.replace(/(`+)(?:(?!\1).)+?\1/g, (m) => ' '.repeat(m.length))
        );
      }
    } else {
      if (
        fence?.[1]?.[0] &&
        fence[1][0] === openFence![0] &&
        fence[1].length >= openFence!.length
      ) {
        inCodeBlock = false;
        openFence = null;
      }
      result.push('');
    }
  }

  return result.join('\n');
};

const validateCodeBlocks = (content: string): HTMLValidationIssue[] => {
  const issues: HTMLValidationIssue[] = [];
  const lines = content.split('\n');
  let inCodeBlock = false;
  let openFence: string | null = null;
  let openLineNumber = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Allow leading whitespace and blockquote markers before the fence characters
    const fence = line?.match(/^[\s>]*(`{3,}|~{3,})/);

    if (!inCodeBlock) {
      if (fence?.[1]) {
        inCodeBlock = true;
        openFence = fence[1];
        openLineNumber = i + 1;
      }
    } else {
      if (
        fence?.[1] &&
        fence[1][0] === openFence![0] &&
        fence[1].length >= openFence!.length
      ) {
        inCodeBlock = false;
        openFence = null;
      }
    }
  }

  if (inCodeBlock) {
    issues.push({
      type: 'error',
      message: `Unclosed code block (opened at line ${openLineNumber})`,
    });
  }

  return issues;
};

/**
 * Validates markdown content for structural correctness:
 * - All fenced code blocks are properly closed
 * - HTML tags are properly nested and closed
 *
 * HTML inside code blocks is excluded from HTML validation.
 */
export const validateMarkdown = (content: string): MarkdownValidationResult => {
  const codeIssues = validateCodeBlocks(content);
  const htmlIssues = validateHTML(stripCode(content)).issues;
  const issues = [...codeIssues, ...htmlIssues];

  return {
    valid: issues.filter((i) => i.type === 'error').length === 0,
    issues,
  };
};
