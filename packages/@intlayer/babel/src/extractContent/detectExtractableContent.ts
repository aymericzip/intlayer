import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';
import { getExtractionIgnoreDirectives } from '@intlayer/config/extract';
import type { IntlayerConfig } from '@intlayer/types/config';
import {
  type BabelReplacement,
  extractBabelContentForComponents,
  getReplacementSpan,
} from './babelProcessor';
import { extractDictionaryKey } from './utils/extractDictionaryKey';

// CJS/ESM interop: @babel/traverse exports its function as `.default` in CJS bundles
const traverse = (
  typeof _traverse === 'function'
    ? _traverse
    : (_traverse as unknown as { default: typeof _traverse }).default
) as typeof _traverse;

/**
 * Comment syntax valid on a line: `{/* … *\/}` among JSX children, `// …`
 * anywhere else (statements, expressions, between JSX attributes).
 */
export type CommentStyle = 'jsx' | 'js';

/** A hardcoded string the extractor would move to a dictionary. */
export type ExtractableContent = {
  /** Span rewritten on extraction (offsets, end exclusive). */
  start: number;
  end: number;
  /** Text written to the dictionary (whitespace collapsed, `{{var}}`). */
  text: string;
  /**
   * Offset the `intlayer-ignore-*` directives are checked against: an
   * `intlayer-ignore-next-line` on the line above it skips this string.
   */
  ignoreOffset: number;
  /** Comment syntax valid for a directive inserted above `ignoreOffset`. */
  ignoreCommentStyle: CommentStyle;
};

/** Offset of the first non-whitespace character of the line holding `offset`. */
const getLineContentStart = (fileCode: string, offset: number): number => {
  let lineStart = fileCode.lastIndexOf('\n', offset - 1) + 1;

  while (lineStart < offset && /[ \t]/.test(fileCode[lineStart] ?? '')) {
    lineStart++;
  }

  return lineStart;
};

/** Offset the extractor checks ignore directives against for a replacement. */
const getIgnoreOffset = (replacement: BabelReplacement): number => {
  const { node } = replacement.path;
  const start = node.start ?? 0;

  if (!t.isJSXText(node)) return start;

  return start + (node.value.length - node.value.trimStart().length);
};

/**
 * Comment style valid at the start of each requested line, resolved in one
 * traversal: JSX when the line starts on a JSX child or inside JSX text.
 */
const resolveCommentStyles = (
  ast: t.File,
  lineStarts: Set<number>
): Map<number, CommentStyle> => {
  const styles = new Map<number, CommentStyle>();

  traverse(ast, {
    enter(path) {
      const { start, end } = path.node;

      if (typeof start !== 'number' || typeof end !== 'number') return;

      // Pre-order: the first node starting on the line is its outermost one
      if (lineStarts.has(start) && !styles.has(start)) {
        const isJsxChild =
          path.listKey === 'children' &&
          (path.parentPath?.isJSXElement() || path.parentPath?.isJSXFragment());

        styles.set(start, isJsxChild ? 'jsx' : 'js');
      }

      if (path.isJSXText()) {
        for (const lineStart of lineStarts) {
          if (lineStart > start && lineStart < end && !styles.has(lineStart)) {
            styles.set(lineStart, 'jsx');
          }
        }
      }
    },
  });

  return styles;
};

/**
 * Every hardcoded string of a JS/TS/JSX/TSX file that the extractor would
 * move to a dictionary, honoring the `intlayer-ignore-*` directives. Returns
 * `[]` for a file that does not parse.
 */
export const detectExtractableContent = (
  fileCode: string,
  filePath: string,
  configuration: IntlayerConfig,
  unmergedDictionaries: Record<string, unknown> = {}
): ExtractableContent[] => {
  if (getExtractionIgnoreDirectives(fileCode).isFileIgnored) return [];

  let ast: t.File;

  try {
    ast = parse(fileCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
      errorRecovery: true,
    });
  } catch {
    return [];
  }

  const { extractedContent, replacements } = extractBabelContentForComponents(
    ast,
    fileCode,
    new Set<string>(),
    extractDictionaryKey(
      filePath,
      fileCode,
      configuration.compiler?.dictionaryKeyPrefix
    ),
    configuration,
    filePath,
    unmergedDictionaries
  );

  const anchoredReplacements = replacements.map((replacement) => {
    const ignoreOffset = getIgnoreOffset(replacement);

    return {
      replacement,
      ignoreOffset,
      lineStart: getLineContentStart(fileCode, ignoreOffset),
    };
  });

  const commentStyles = resolveCommentStyles(
    ast,
    new Set(anchoredReplacements.map(({ lineStart }) => lineStart))
  );

  return anchoredReplacements
    .map(({ replacement, ignoreOffset, lineStart }) => ({
      ...getReplacementSpan(replacement),
      text: extractedContent[replacement.componentKey]?.[replacement.key] ?? '',
      ignoreOffset,
      ignoreCommentStyle: commentStyles.get(lineStart) ?? 'js',
    }))
    .sort((first, second) => first.start - second.start);
};
