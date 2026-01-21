/**
 * Framework-agnostic markdown processor.
 *
 * This is the main entry point for the Solution F (Hybrid AST + Callback Pattern)
 * implementation for GitHub Issue #289: Adapt markdown parser in custom packages
 *
 * @example
 * ```ts
 * import { compile, MarkdownRuntime, MarkdownContext } from '@intlayer/core/markdown';
 *
 * const runtime: MarkdownRuntime = {
 *   createElement: elementFactory,
 *   Fragment: fragmentToken,
 * };
 *
 * const ctx: MarkdownContext = { runtime };
 * const result = compile('# Hello World', ctx);
 * ```
 */

// Compiler (main API)
export { compile, compileWithOptions, createCompiler } from './compiler';

// Constants
export {
  ATTRIBUTE_TO_NODE_PROP_MAP,
  ATTRIBUTES_TO_SANITIZE,
  DO_NOT_PROCESS_HTML_ELEMENTS,
  DURATION_DELAY_TRIGGER,
  type ListType,
  NAMED_CODES_TO_UNICODE,
  // List type constants
  ORDERED,
  Priority,
  type PriorityValue,
  RuleType,
  type RuleTypeValue,
  UNORDERED,
} from './constants';

// Parser
export { parserFor } from './parser';

// Renderer
export { createRenderer, renderFor } from './renderer';
// Types
export type {
  // AST Node types
  BlockQuoteNode,
  BoldTextNode,
  BreakLineNode,
  BreakThematicNode,
  CodeBlockNode,
  CodeInlineNode,
  CompileOptions,
  CustomComponentNode,
  // Core types
  ElementType,
  FootnoteNode,
  FootnoteReferenceNode,
  GFMTaskNode,
  HeadingNode,
  HTMLNode,
  HTMLSelfClosingNode,
  HTMLTag,
  ImageNode,
  ItalicTextNode,
  LinkNode,
  MarkdownContext,
  MarkdownOptions,
  MarkdownRuntime,
  MarkedTextNode,
  NestedParser,
  NewlineNode,
  OrderedListNode,
  Overrides,
  ParagraphNode,
  ParserResult,
  // Parser types
  ParseState,
  ReferenceImageNode,
  ReferenceLinkNode,
  ReferenceNode,
  RenderRuleHook,
  Rule,
  RuleOutput,
  // Rule types
  Rules,
  StrikethroughTextNode,
  TableNode,
  TableSeparatorNode,
  TextNode,
  UnorderedListNode,
} from './types';

// Utilities (exported for adapters and advanced usage)
export {
  allowInline,
  anyScopeRegex,
  attributeValueToNodePropValue,
  blockRegex,
  captureNothing,
  cx,
  get,
  inlineRegex,
  normalizeAttributeKey,
  normalizeWhitespace,
  parseBlock,
  parseCaptureInline,
  parseInline,
  parseSimpleInline,
  parseStyleAttribute,
  parseTableAlign,
  parseTableCells,
  parseTableRow,
  qualifies,
  renderNothing,
  sanitizer,
  simpleInlineRegex,
  slugify,
  some,
  trimEnd,
  trimLeadingWhitespaceOutsideFences,
  unescapeString,
  unquote,
} from './utils';
