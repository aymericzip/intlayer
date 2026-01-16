/**
 * Framework-agnostic markdown processor types.
 * No framework-specific imports allowed in this file.
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 */

// ============================================================================
// RUNTIME TYPES - Framework adapters provide these
// ============================================================================

/**
 * Permissive element type - core doesn't care what frameworks accept.
 * Can be a string tag ('div', 'span') or any component (function, object, class)
 */
export type ElementType = string | any;

/**
 * Simple HTML tag type - no need to enumerate all tags
 */
export type HTMLTag = string;

/**
 * Runtime interface that framework adapters must implement.
 * This allows the markdown compiler to work with any framework.
 */
export interface MarkdownRuntime {
  /**
   * Create an element. Signature matches common UI runtimes.
   * @param type - Tag name or component
   * @param props - Element properties
   * @param children - Child elements
   */
  createElement: (
    type: ElementType,
    props: Record<string, any> | null,
    ...children: any[]
  ) => unknown;

  /**
   * Fragment component for grouping without wrapper DOM node.
   * Optional - falls back to array if not provided.
   */
  Fragment?: any;

  /**
   * Normalize props for runtime differences.
   * Called before createElement with (tag, props).
   *
   * Examples:
   * - { className } -> { className } (no change needed)
   * - { className } -> { class }
   * - { htmlFor } -> { for }
   */
  normalizeProps?: (
    tag: HTMLTag,
    props: Record<string, any>
  ) => Record<string, any>;

  /**
   * Adapter-specific helpers can be exposed without coupling core.
   */
  [key: string]: unknown;
}

/**
 * Context passed to the compiler containing runtime and configuration.
 */
export interface MarkdownContext {
  /** Framework runtime (createElement, etc.) */
  runtime: MarkdownRuntime;
  /** Component overrides for HTML tags */
  overrides?: Overrides;
  /** Custom URL sanitizer */
  sanitizer?: (url: string, tag: HTMLTag, attr: string) => string | null;
  /** Custom slugify function for heading IDs */
  slugify?: (text: string) => string;
  /** Custom named codes to unicode mappings */
  namedCodesToUnicode?: Record<string, string>;
}

// ============================================================================
// PARSER STATE TYPES
// ============================================================================

/**
 * Parser state passed through parsing and rendering.
 */
export interface ParseState {
  /** true if the current content is inside anchor link grammar */
  inAnchor?: boolean;
  /** true if parsing in an HTML context */
  inHTML?: boolean;
  /** true if parsing in an inline context (subset of rules around formatting and links) */
  inline?: boolean;
  /** true if in a table */
  inTable?: boolean;
  /** use this for the `key` prop */
  key?: string | number;
  /** true if in a list */
  list?: boolean;
  /** used for lookbacks */
  prevCapture?: string;
  /** true if parsing in inline context w/o links */
  simple?: boolean;
}

// ============================================================================
// AST NODE TYPES
// ============================================================================

export type BlockQuoteNode = {
  type: string;
  alert?: string;
  children: ParserResult[];
};

export type BreakLineNode = {
  type: string;
};

export type BreakThematicNode = {
  type: string;
};

export type CodeBlockNode = {
  type: string;
  attrs?: Record<string, any>;
  lang?: string;
  text: string;
};

export type CodeFencedNode = {
  type: string;
};

export type CodeInlineNode = {
  type: string;
  text: string;
};

export type FootnoteNode = {
  type: string;
};

export type FootnoteReferenceNode = {
  type: string;
  target: string;
  text: string;
};

export type GFMTaskNode = {
  type: string;
  completed: boolean;
};

export type HeadingNode = {
  type: string;
  children: ParserResult[];
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

export type HeadingSetextNode = {
  type: string;
};

export type HTMLCommentNode = {
  type: string;
};

export type ImageNode = {
  type: string;
  alt?: string;
  target: string;
  title?: string;
};

export type LinkNode = {
  type: string;
  children: ParserResult[];
  target: string;
  title?: string;
};

export type LinkAngleBraceNode = {
  type: string;
};

export type LinkBareURLNode = {
  type: string;
};

export type OrderedListNode = {
  type: string;
  items: ParserResult[][];
  ordered: true;
  start?: number;
};

export type UnorderedListNode = {
  type: string;
  items: ParserResult[][];
  ordered: false;
};

export type NewlineNode = {
  type: string;
};

export type ParagraphNode = {
  type: string;
  children: ParserResult[];
};

export type ReferenceNode = {
  type: string;
};

export type ReferenceImageNode = {
  type: string;
  alt?: string;
  ref: string;
};

export type ReferenceLinkNode = {
  type: string;
  children: ParserResult[];
  fallbackChildren: string;
  ref: string;
};

export type TableNode = {
  type: string;
  align: ('left' | 'right' | 'center')[];
  cells: ParserResult[][][];
  header: ParserResult[][];
};

export type TableSeparatorNode = {
  type: string;
};

export type TextNode = {
  type: string;
  text: string;
};

export type BoldTextNode = {
  type: string;
  children: ParserResult[];
};

export type ItalicTextNode = {
  type: string;
  children: ParserResult[];
};

export type EscapedTextNode = {
  type: string;
};

export type MarkedTextNode = {
  type: string;
  children: ParserResult[];
};

export type StrikethroughTextNode = {
  type: string;
  children: ParserResult[];
};

export type HTMLNode = {
  type: string;
  attrs: Record<string, any> | null;
  children?: ParserResult[];
  noInnerParse: boolean;
  tag: HTMLTag;
  text?: string;
};

export type HTMLSelfClosingNode = {
  type: string;
  attrs: Record<string, any> | null;
  tag: string;
};

export type CustomComponentNode = {
  type: string;
  attrs: Record<string, any> | null;
  children?: ParserResult[];
  noInnerParse: boolean;
  tag: string;
  text?: string;
};

/**
 * Union of all possible parser result node types.
 */
export type ParserResult =
  | BlockQuoteNode
  | BreakLineNode
  | BreakThematicNode
  | CodeBlockNode
  | CodeFencedNode
  | CodeInlineNode
  | CustomComponentNode
  | FootnoteNode
  | FootnoteReferenceNode
  | GFMTaskNode
  | HeadingNode
  | HeadingSetextNode
  | HTMLCommentNode
  | ImageNode
  | LinkNode
  | LinkAngleBraceNode
  | LinkBareURLNode
  | OrderedListNode
  | UnorderedListNode
  | NewlineNode
  | ParagraphNode
  | ReferenceNode
  | ReferenceImageNode
  | ReferenceLinkNode
  | TableNode
  | TableSeparatorNode
  | TextNode
  | BoldTextNode
  | ItalicTextNode
  | EscapedTextNode
  | MarkedTextNode
  | StrikethroughTextNode
  | HTMLNode
  | HTMLSelfClosingNode;

// ============================================================================
// RULE TYPES
// ============================================================================

/**
 * Nested parser function type.
 */
export type NestedParser = (input: string, state: ParseState) => ParserResult[];

/**
 * Parser function type for a rule.
 */
export type Parser<ParserOutput> = (
  capture: RegExpMatchArray,
  nestedParse: NestedParser,
  state: ParseState
) => ParserOutput;

/**
 * Output function type for rendering.
 */
export type RuleOutput = (
  ast: ParserResult | ParserResult[],
  state: ParseState
) => unknown;

/**
 * Rule definition for parsing and rendering markdown.
 */
export type Rule<ParserOutput = ParserResult> = {
  /** Match function - returns regex match or null */
  _match: (
    source: string,
    state: ParseState,
    prevCapturedString?: string
  ) => RegExpMatchArray | null;

  /** Priority order for rule application */
  _order: number;

  /** Parse function - converts regex capture to AST node */
  _parse: Parser<Omit<ParserOutput, 'type'>>;

  /**
   * Optional fast check that can quickly determine if this rule
   * should even be attempted.
   */
  _qualify?: string[] | ((source: string, state: ParseState) => boolean);

  /**
   * Render function - converts AST node to output.
   * Uses context's runtime.createElement for element creation.
   */
  _render?: (
    node: ParserOutput,
    render: RuleOutput,
    state: ParseState
  ) => unknown;
};

/**
 * Map of all rules keyed by rule type.
 */
export type Rules = {
  [key: string]: Rule<any>;
};

// ============================================================================
// OVERRIDE TYPES
// ============================================================================

/**
 * RequireAtLeastOne utility type.
 */
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Override configuration for a single tag.
 */
export type Override =
  | RequireAtLeastOne<{
      component: any;
      props: Record<string, any>;
    }>
  | any;

/**
 * Map of tag overrides.
 */
export type Overrides = {
  [tag: string]: Override;
};

// ============================================================================
// COMPILER OPTIONS
// ============================================================================

/**
 * Render rule hook for custom rendering logic.
 */
export type RenderRuleHook = (
  /** Resume normal processing, call this function as a fallback */
  next: () => unknown,
  /** The current AST node */
  node: ParserResult,
  /** Use as renderChildren(node.children) for block nodes */
  renderChildren: RuleOutput,
  /** Contains key which should be supplied to the topmost element */
  state: ParseState
) => unknown;

/**
 * Options for the markdown compiler.
 * This is the framework-agnostic version of MarkdownProcessorOptions.
 */
export interface MarkdownOptions {
  /**
   * Disable automatic link detection for bare URLs.
   */
  disableAutoLink?: boolean;

  /**
   * Disable parsing of raw HTML in markdown.
   */
  disableParsingRawHTML?: boolean;

  /**
   * Force ATX-compliant headings (require space after #).
   */
  enforceAtxHeadings?: boolean;

  /**
   * Force block-level output.
   */
  forceBlock?: boolean;

  /**
   * Force inline output.
   */
  forceInline?: boolean;

  /**
   * Force wrapper element even for single children.
   */
  forceWrapper?: boolean;

  /**
   * Custom render rule hook for full control over rendering.
   */
  renderRule?: RenderRuleHook;

  /**
   * Wrapper element type, or null for no wrapper.
   */
  wrapper?: HTMLTag | null;
}

/**
 * Combined options including context and compiler options.
 * Used by framework adapters.
 */
export interface CompileOptions extends MarkdownOptions {
  /** Component overrides */
  overrides?: Overrides;
  /** Custom named codes to unicode mappings */
  namedCodesToUnicode?: Record<string, string>;
  /** Custom sanitizer function */
  sanitizer?: (value: string, tag: HTMLTag, attribute: string) => string | null;
  /** Custom slugify function */
  slugify?: (input: string) => string;
}
