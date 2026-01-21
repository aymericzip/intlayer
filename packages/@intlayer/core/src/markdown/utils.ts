/**
 * Utility functions for the framework-agnostic markdown processor.
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 */

import {
  ATTRIBUTES_TO_SANITIZE,
  CAPTURE_LETTER_AFTER_HYPHEN,
  CR_NEWLINE_R,
  DURATION_DELAY_TRIGGER,
  FORMFEED_R,
  HTML_CUSTOM_ATTR_R,
  INTERPOLATION_R,
  TAB_R,
  TABLE_CENTER_ALIGN,
  TABLE_LEFT_ALIGN,
  TABLE_RIGHT_ALIGN,
  TABLE_TRIM_PIPES,
  UNESCAPE_R,
} from './constants';
import type { NestedParser, ParserResult, ParseState, Rule } from './types';

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Trim trailing whitespace from a string.
 */
export const trimEnd = (str: string): string => {
  let end = str.length;
 
  while (end > 0 && str[end - 1] <= ' ') end--;
  
  return str.slice(0, end);
};

/**
 * Check if string starts with prefix.
 */
export const startsWith = (str: string, prefix: string): boolean => {
  return str.startsWith(prefix);
};

/**
 * Remove symmetrical leading and trailing quotes.
 */
export const unquote = (str: string): string => {
  const first = str[0];

  if (
    (first === '"' || first === "'") &&
    str.length >= 2 &&
    str[str.length - 1] === first
  ) {
    return str.slice(1, -1);
  }

  return str;
};

/**
 * Unescape backslash-escaped characters.
 */
export const unescapeString = (rawString: string): string =>
  rawString ? rawString.replace(UNESCAPE_R, '$1') : rawString;

/**
 * Join class names, filtering out falsy values.
 */
export const cx = (...args: any[]): string => args.filter(Boolean).join(' ');

/**
 * Get a nested property from an object using dot notation.
 */
export const get = (src: any, path: string, fb?: any): any => {
  let ptr = src;
  const frags = path.split('.');

  while (frags.length) {
    ptr = ptr[frags[0]];

    if (ptr === undefined) break;
    else frags.shift();
  }

  return ptr ?? fb;
};

// ============================================================================
// SLUGIFY
// ============================================================================

/**
 * Convert a string to a URL-safe slug.
 * Based on https://stackoverflow.com/a/18123682/1141611
 */
export const slugify = (str: string): string =>
  str
    .replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, 'a')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ðÐ]/g, 'd')
    .replace(/[ÈÉÊËéèêë]/g, 'e')
    .replace(/[ÏïÎîÍíÌì]/g, 'i')
    .replace(/[Ññ]/g, 'n')
    .replace(/[øØœŒÕõÔôÓóÒò]/g, 'o')
    .replace(/[ÜüÛûÚúÙù]/g, 'u')
    .replace(/[ŸÿÝý]/g, 'y')
    .replace(/[^a-z0-9- ]/gi, '')
    .replace(/ /gi, '-')
    .toLowerCase();

// ============================================================================
// SANITIZER
// ============================================================================

const SANITIZE_R = /(javascript|vbscript|data(?!:image)):/i;

/**
 * Sanitize URLs to prevent XSS attacks.
 * Returns null if the URL is unsafe.
 */
export const sanitizer = (input: string): string | null => {
  try {
    const decoded = decodeURIComponent(input).replace(/[^A-Za-z0-9/:]/g, '');

    if (SANITIZE_R.test(decoded)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'Input contains an unsafe JavaScript/VBScript/data expression, it will not be rendered.',
          decoded
        );
      }

      return null;
    }
  } catch (_e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'Input could not be decoded due to malformed syntax or characters, it will not be rendered.',
        input
      );
    }

    // decodeURIComponent sometimes throws a URIError
    return null;
  }

  return input;
};

// ============================================================================
// WHITESPACE NORMALIZATION
// ============================================================================

/**
 * Normalize whitespace in source string.
 */
export const normalizeWhitespace = (source: string): string => {
  const start = performance.now();
  const result = source
    .replace(CR_NEWLINE_R, '\n')
    .replace(FORMFEED_R, '')
    .replace(TAB_R, '    ');

  const duration = performance.now() - start;

  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `normalizeWhitespace: ${duration.toFixed(3)}ms, source length: ${source.length}`
    );
  }

  return result;
};

/**
 * Safely remove a uniform leading indentation from lines, but do NOT touch
 * the content inside fenced code blocks (``` or ~~~).
 */
export const trimLeadingWhitespaceOutsideFences = (
  text: string,
  whitespace: string
): string => {
  const start = performance.now();
  if (!whitespace) return text;

  const lines = text.split('\n');
  let inFence = false;
  let fenceToken: string | null = null;

  const isFenceLine = (line: string): RegExpMatchArray | null =>
    line.match(/^\s*(`{3,}|~{3,})/);

  const maybeToggleFence = (line: string): void => {
    const m = isFenceLine(line);

    if (!m) return;

    const token = m[1];

    if (!inFence) {
      inFence = true;
      fenceToken = token;
    } else if (fenceToken && line.includes(fenceToken)) {
      inFence = false;
      fenceToken = null;
    }
  };

  const out = lines.map((line) => {
    const fenceMatch = isFenceLine(line);
    if (fenceMatch) {
      const trimmedFenceLine = line.startsWith(whitespace)
        ? line.slice(whitespace.length)
        : line;
      maybeToggleFence(line);
      return trimmedFenceLine;
    }

    if (inFence) {
      return line;
    }

    return line.startsWith(whitespace) ? line.slice(whitespace.length) : line;
  });

  const result = out.join('\n');

  const duration = performance.now() - start;
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `trimLeadingWhitespaceOutsideFences: ${duration.toFixed(3)}ms, text length: ${text.length}, lines count: ${lines.length}`
    );
  }

  return result;
};

/**
 * Normalize HTML attribute key to JSX prop name.
 */
export const normalizeAttributeKey = (key: string): string => {
  const hyphenIndex = key.indexOf('-');

  if (hyphenIndex !== -1 && key.match(HTML_CUSTOM_ATTR_R) === null) {
    key = key.replace(CAPTURE_LETTER_AFTER_HYPHEN, (_, letter) => {
      return letter.toUpperCase();
    });
  }

  return key;
};

type StyleTuple = [key: string, value: string];

/**
 * Parse a CSS style string into an array of [key, value] tuples.
 */
export const parseStyleAttribute = (styleString: string): StyleTuple[] => {
  const start = performance.now();
  const styles: StyleTuple[] = [];
  let buffer = '';
  let inUrl = false;
  let inQuotes = false;
  let quoteChar: '"' | "'" | '' = '';

  if (!styleString) return styles;

  for (let i = 0; i < styleString.length; i++) {
    const char = styleString[i];

    if ((char === '"' || char === "'") && !inUrl) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
        quoteChar = '';
      }
    }

    if (char === '(' && buffer.endsWith('url')) {
      inUrl = true;
    } else if (char === ')' && inUrl) {
      inUrl = false;
    }

    if (char === ';' && !inQuotes && !inUrl) {
      const declaration = buffer.trim();

      if (declaration) {
        const colonIndex = declaration.indexOf(':');

        if (colonIndex > 0) {
          const key = declaration.slice(0, colonIndex).trim();
          const value = declaration.slice(colonIndex + 1).trim();
          styles.push([key, value]);
        }
      }
      buffer = '';
    } else {
      buffer += char;
    }
  }

  const declaration = buffer.trim();

  if (declaration) {
    const colonIndex = declaration.indexOf(':');
    if (colonIndex > 0) {
      const key = declaration.slice(0, colonIndex).trim();
      const value = declaration.slice(colonIndex + 1).trim();
      styles.push([key, value]);
    }
  }

  const duration = performance.now() - start;

  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parseStyleAttribute: ${duration.toFixed(3)}ms, styleString length: ${styleString.length}, styles count: ${styles.length}`
    );
  }

  return styles;
};

/**
 * Convert an attribute value to a Node prop value.
 */
export const attributeValueToNodePropValue = (
  tag: string,
  key: string,
  value: string,
  sanitizeUrlFn: (
    value: string,
    tag: string,
    attribute: string
  ) => string | null
): any => {
  if (key === 'style') {
    return parseStyleAttribute(value).reduce(
      (styles, [styleKey, styleValue]) => {
        const camelCasedKey = styleKey.replace(/(-[a-z])/g, (substr) =>
          substr[1].toUpperCase()
        );

        (styles as Record<string, any>)[camelCasedKey] = sanitizeUrlFn(
          styleValue,
          tag,
          styleKey
        );

        return styles;
      },
      {} as Record<string, any>
    );
  } else if (ATTRIBUTES_TO_SANITIZE.indexOf(key) !== -1) {
    return sanitizeUrlFn(unescapeString(value), tag, key);
  } else if (value.match(INTERPOLATION_R)) {
    value = unescapeString(value.slice(1, value.length - 1));
  }

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  return value;
};

// ============================================================================
// TABLE PARSING
// ============================================================================

/**
 * Parse table alignment from a separator row.
 */
export const parseTableAlignCapture = (
  alignCapture: string
): 'left' | 'right' | 'center' => {
  if (TABLE_RIGHT_ALIGN.test(alignCapture)) {
    return 'right';
  } else if (TABLE_CENTER_ALIGN.test(alignCapture)) {
    return 'center';
  } else if (TABLE_LEFT_ALIGN.test(alignCapture)) {
    return 'left';
  }

  return 'left';
};

/**
 * Parse table alignment row.
 */
export const parseTableAlign = (
  source: string
): ('left' | 'right' | 'center')[] => {
  const alignText = source.replace(TABLE_TRIM_PIPES, '').split('|');
  return alignText.map(parseTableAlignCapture);
};

/**
 * Parse a single table row.
 */
export const parseTableRow = (
  source: string,
  parse: NestedParser,
  state: ParseState,
  tableOutput: boolean
): ParserResult[][] => {
  const start = performance.now();
  const prevInTable = state.inTable;

  state.inTable = true;

  const cells: ParserResult[][] = [[]];
  let acc = '';

  const flush = (): void => {
    if (!acc) return;

    const cell = cells[cells.length - 1];
    cell.push.apply(cell, parse(acc, state));
    acc = '';
  };

  source
    .trim()
    .split(/(`[^`]*`|\\\||\|)/)
    .filter(Boolean)
    .forEach((fragment, i, arr) => {
      if (fragment.trim() === '|') {
        flush();

        if (tableOutput) {
          if (i !== 0 && i !== arr.length - 1) {
            cells.push([]);
          }

          return;
        }
      }

      acc += fragment;
    });

  flush();

  state.inTable = prevInTable;

  const duration = performance.now() - start;
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parseTableRow: ${duration.toFixed(3)}ms, source length: ${source.length}, cells count: ${cells.length}`
    );
  }

  return cells;
};

/**
 * Parse table cells (multiple rows).
 */
export const parseTableCells = (
  source: string,
  parse: NestedParser,
  state: ParseState
): ParserResult[][][] => {
  const start = performance.now();
  const rowsText = source.trim().split('\n');

  const result = rowsText.map((rowText) =>
    parseTableRow(rowText, parse, state, true)
  );

  const duration = performance.now() - start;
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parseTableCells: ${duration.toFixed(3)}ms, source length: ${source.length}, rows count: ${rowsText.length}`
    );
  }

  return result;
};

// ============================================================================
// PARSING HELPERS
// ============================================================================

/**
 * Check if a rule qualifies for the current source and state.
 */
export const qualifies = (
  source: string,
  state: ParseState,
  qualify: NonNullable<Rule<any>['_qualify']>
): boolean => {
  if (Array.isArray(qualify)) {
    for (let i = 0; i < qualify.length; i++) {
      if (startsWith(source, qualify[i])) return true;
    }

    return false;
  }

  return (qualify as (source: string, state: ParseState) => boolean)(
    source,
    state
  );
};

/**
 * Marks a matcher function as eligible for being run inside an inline context.
 */
export const allowInline = <T extends (...args: any[]) => any>(
  fn: T
): T & { inline: 1 } => {
  (fn as any).inline = 1;
  return fn as T & { inline: 1 };
};

/**
 * Creates a match function for an inline scoped element from a regex.
 */
export const inlineRegex = (regex: RegExp) =>
  allowInline((source: string, state: ParseState): RegExpMatchArray | null => {
    if (state.inline) {
      return regex.exec(source);
    } else {
      return null;
    }
  });

/**
 * Creates a match function for inline elements except links.
 */
export const simpleInlineRegex = (regex: RegExp) =>
  allowInline((source: string, state: ParseState): RegExpMatchArray | null => {
    if (state.inline || state.simple) {
      return regex.exec(source);
    } else {
      return null;
    }
  });

/**
 * Creates a match function for a block scoped element from a regex.
 */
export const blockRegex =
  (regex: RegExp) =>
  (source: string, state: ParseState): RegExpMatchArray | null => {
    if (state.inline || state.simple) {
      return null;
    } else {
      return regex.exec(source);
    }
  };

/**
 * Creates a match function from a regex, ignoring block/inline scope.
 */
export const anyScopeRegex = (
  fn: RegExp | ((source: string, state: ParseState) => RegExpMatchArray | null)
) =>
  allowInline((source: string, state: ParseState): RegExpMatchArray | null => {
    if (typeof fn === 'function') {
      return fn(source, state);
    }
    return fn.exec(source);
  });

/**
 * Parse inline content (including links).
 */
export const parseInline = (
  parse: NestedParser,
  children: string,
  state: ParseState
): ParserResult[] => {
  const start = performance.now();
  const isCurrentlyInline = state.inline ?? false;
  const isCurrentlySimple = state.simple ?? false;
  state.inline = true;
  state.simple = true;
  const result = parse(children, state);
  state.inline = isCurrentlyInline;
  state.simple = isCurrentlySimple;

  const duration = performance.now() - start;
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parseInline: ${duration.toFixed(3)}ms, children length: ${children.length}, result count: ${result.length}`
    );
  }

  return result;
};

/**
 * Parse simple inline content (no links).
 */
export const parseSimpleInline = (
  parse: NestedParser,
  children: string,
  state: ParseState
): ParserResult[] => {
  const start = performance.now();
  const isCurrentlyInline = state.inline ?? false;
  const isCurrentlySimple = state.simple ?? false;

  state.inline = false;
  state.simple = true;
  const result = parse(children, state);
  state.inline = isCurrentlyInline;
  state.simple = isCurrentlySimple;

  const duration = performance.now() - start;
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parseSimpleInline: ${duration.toFixed(3)}ms, children length: ${children.length}, result count: ${result.length}`
    );
  }

  return result;
};

/**
 * Parse block content.
 */
export const parseBlock = (
  parse: NestedParser,
  children: string,
  state: ParseState = {}
): ParserResult[] => {
  const start = performance.now();
  const isCurrentlyInline = state.inline || false;
  state.inline = false;
  const normalizedChildren = trimEnd(children);
  const needsTerminator = /\n\n$/.test(normalizedChildren) === false;
  const blockInput = needsTerminator
    ? normalizedChildren.endsWith('\n')
      ? `${normalizedChildren}\n`
      : `${normalizedChildren}\n\n`
    : normalizedChildren;

  const result = parse(blockInput, state);
  state.inline = isCurrentlyInline;

  const duration = performance.now() - start;
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parseBlock: ${duration.toFixed(3)}ms, children length: ${children.length}, result count: ${result.length}`
    );
  }

  return result;
};

/**
 * Helper to parse capture group 2 as inline content.
 */
export const parseCaptureInline = (
  capture: RegExpMatchArray,
  parse: NestedParser,
  state: ParseState
): { children: ParserResult[] } => {
  return {
    children: parseInline(parse, capture[2], state),
  };
};

/**
 * Helper that captures nothing (empty object).
 */
export const captureNothing = (): Record<string, never> => ({});

/**
 * Helper that renders nothing (null).
 */
export const renderNothing = (): null => null;

/**
 * Check if any regex in a list matches the input.
 */
export const some = (regexes: RegExp[], input: string): boolean => {
  for (let i = 0; i < regexes.length; i++) {
    if (regexes[i].test(input)) {
      return true;
    }
  }
  return false;
};
