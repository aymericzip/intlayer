// ============================================================================
// RULE TYPES
// ============================================================================

/**
 * Analogous to `node.type`. Please note that the values here may change at any time,
 * so do not hard code against the value directly.
 */
export const RuleType = {
  blockQuote: '0',
  breakLine: '1',
  breakThematic: '2',
  codeBlock: '3',
  codeFenced: '4',
  codeInline: '5',
  footnote: '6',
  footnoteReference: '7',
  gfmTask: '8',
  heading: '9',
  headingSetext: '10',
  /** only available if not `disableHTMLParsing` */
  htmlBlock: '11',
  htmlComment: '12',
  /** only available if not `disableHTMLParsing` */
  htmlSelfClosing: '13',
  /** Custom components like <Tabs>, <TabItem> */
  customComponent: '34',
  image: '14',
  link: '15',
  /** emits a `link` 'node', does not render directly */
  linkAngleBraceStyleDetector: '16',
  /** emits a `link` 'node', does not render directly */
  linkBareUrlDetector: '17',
  newlineCoalescer: '19',
  orderedList: '20',
  paragraph: '21',
  ref: '22',
  refImage: '23',
  refLink: '24',
  table: '25',
  tableSeparator: '26',
  text: '27',
  textBolded: '28',
  textEmphasized: '29',
  textEscaped: '30',
  textMarked: '31',
  textStrikethroughed: '32',
  unorderedList: '33',
} as const;

// In test environment, use human-readable keys for easier debugging
if (process.env.NODE_ENV === 'test') {
  Object.keys(RuleType).forEach((key) => {
    (RuleType as any)[key] = key;
  });
}

export type RuleTypeValue = (typeof RuleType)[keyof typeof RuleType];

// ============================================================================
// PRIORITY LEVELS
// ============================================================================

/**
 * Priority levels for rule ordering.
 */
export const Priority = {
  /** anything that must scan the tree before everything else */
  MAX: 0,
  /** scans for block-level constructs */
  HIGH: 1,
  /** inline w/ more priority than other inline */
  MED: 2,
  /** inline elements */
  LOW: 3,
  /** bare text and stuff that is considered leftovers */
  MIN: 4,
} as const;

export type PriorityValue = (typeof Priority)[keyof typeof Priority];

// ============================================================================
// RULE SCOPE CONSTANTS
// ============================================================================

/**
 * Parsing scope for markdown rules.
 * Bitmask representation for fast bitwise checking and bundle minification.
 * - BLOCK (1): evaluated only when !state.inline && !state.simple
 * - INLINE (2): evaluated only when state.inline || state.simple
 * - BOTH (3): evaluated in both scopes (default)
 */
export const RuleScope = {
  BLOCK: 1,
  INLINE: 2,
  BOTH: 3,
} as const;

export const SCOPE_BLOCK = RuleScope.BLOCK;
export const SCOPE_INLINE = RuleScope.INLINE;
export const SCOPE_BOTH = RuleScope.BOTH;

export type RuleScopeValue =
  | (typeof RuleScope)[keyof typeof RuleScope]
  | 'block'
  | 'inline'
  | 'both';

// ============================================================================
// ATTRIBUTE MAPPING
// ============================================================================

/**
 * Map of HTML attributes to their JSX prop equivalents.
 * Some renderers use camelCase for certain attributes.
 */
export const ATTRIBUTE_TO_NODE_PROP_MAP: Record<string, string> = [
  'allowFullScreen',
  'allowTransparency',
  'autoComplete',
  'autoFocus',
  'autoPlay',
  'cellPadding',
  'cellSpacing',
  'charSet',
  'classId',
  'colSpan',
  'contentEditable',
  'contextMenu',
  'crossOrigin',
  'encType',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'frameBorder',
  'hrefLang',
  'inputMode',
  'keyParams',
  'keyType',
  'marginHeight',
  'marginWidth',
  'maxLength',
  'mediaGroup',
  'minLength',
  'noValidate',
  'radioGroup',
  'readOnly',
  'rowSpan',
  'spellCheck',
  'srcDoc',
  'srcLang',
  'srcSet',
  'tabIndex',
  'useMap',
].reduce(
  (obj: Record<string, string>, x) => {
    obj[x.toLowerCase()] = x;
    return obj;
  },
  { class: 'className', for: 'htmlFor' }
);

// ============================================================================
// NAMED CODES TO UNICODE
// ============================================================================

/**
 * Default HTML entity to unicode mappings.
 */
export const NAMED_CODES_TO_UNICODE: Record<string, string> = {
  amp: '\u0026',
  apos: '\u0027',
  gt: '\u003e',
  lt: '\u003c',
  nbsp: '\u00a0',
  quot: '\u201c',
};

// ============================================================================
// SPECIAL ELEMENTS
// ============================================================================

/** HTML elements that should not have their content processed */
export const DO_NOT_PROCESS_HTML_ELEMENTS = ['style', 'script', 'pre'];

/** Attributes that require URL sanitization */
export const ATTRIBUTES_TO_SANITIZE = [
  'src',
  'href',
  'data',
  'formAction',
  'srcDoc',
  'action',
];

// ============================================================================
// REGEX PATTERNS
// ============================================================================

/** Attribute extractor regex */
export const ATTR_EXTRACTOR_R =
  /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi;

/** Block end detection */
export const BLOCK_END_R = /\n{2,}$/;

/** Blockquote patterns */
export const BLOCKQUOTE_R = /^(\s*>[\s\S]*?)(?=\n\n|$)/;
export const BLOCKQUOTE_TRIM_LEFT_MULTILINE_R = /^ *> ?/gm;
export const BLOCKQUOTE_ALERT_R = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/;

/** Line break patterns */
export const BREAK_LINE_R = /^(?=( {2,}))\1\n/;
export const BREAK_THEMATIC_R = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/;

/** Code block patterns */
export const CODE_BLOCK_FENCED_R =
  /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/;
export const CODE_BLOCK_R = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/;
/** A single line opening or closing a fenced code block, with its indentation. */
export const FENCE_DELIMITER_R = /^([ \t]*)(`{3,}|~{3,})/;
export const CODE_INLINE_R = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/;

/** Newline patterns */
export const CONSECUTIVE_NEWLINE_R = /^(?:\n *)*\n/;
export const CR_NEWLINE_R = /\r\n?/g;

/** Footnote patterns */
export const FOOTNOTE_R = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/;
export const FOOTNOTE_REFERENCE_R = /^\[\^([^\]]+)]/;

/** Form feed */
export const FORMFEED_R = /\f/g;

/** Front matter */
export const FRONT_MATTER_R = /^---[ \t]*\n(.|\n)*?\n---[ \t]*\n/;

/** GFM task */
export const GFM_TASK_R = /^\s*?\[(x|\s)\]/;

/** Heading patterns */
export const HEADING_R = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
export const HEADING_ATX_COMPLIANT_R =
  /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
export const HEADING_SETEXT_R = /^([^\n]+)\n *(=|-)\2{2,} *\n/;

/** HTML patterns */

export const HTML_CHAR_CODE_R =
  /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
export const HTML_COMMENT_R = /^<!--[\s\S]*?(?:-->)/;
export const HTML_CUSTOM_ATTR_R = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/;

/** Interpolation */
export const INTERPOLATION_R = /^\{.*\}$/;

/** Link patterns */
export const LINK_AUTOLINK_BARE_URL_R = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/;
export const LINK_AUTOLINK_R = /^<([^ >]+[:@/][^ >]+)>/;
export const CAPTURE_LETTER_AFTER_HYPHEN = /-([a-z])?/gi;

/**
 * Table patterns.
 *
 * The row scans spell "any character but a newline" as `[^\n]` rather than `.`:
 * `.` is a four-range exclusion, and matching it over rows this wide costs a
 * third more than the single-range class. It is also the more faithful reading
 * — only `\n` ends a line here, and `\r` is normalized away before parsing.
 */
export const NP_TABLE_R =
  /^(\|[^\n]*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:[^\n]*\|[^\n]*\n)*))?\n?/;
export const TABLE_TRIM_PIPES = /(^ *\||\| *$)/g;
export const TABLE_CENTER_ALIGN = /^ *:-+: *$/;
export const TABLE_LEFT_ALIGN = /^ *:-+ *$/;
export const TABLE_RIGHT_ALIGN = /^ *-+: *$/;

/** Paragraph */
export const PARAGRAPH_R = /^[^\n]+(?: {2}\n|\n{2,})/;

/** Reference patterns */
export const REFERENCE_IMAGE_OR_LINK =
  /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/;
export const REFERENCE_IMAGE_R = /^!\[([^\]]*)\] ?\[([^\]]*)\]/;
export const REFERENCE_LINK_R = /^\[([^\]]*)\] ?\[([^\]]*)\]/;

/** Block detection */
export const SHOULD_RENDER_AS_BLOCK_R = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/;

/** Every character `normalizeWhitespace` rewrites, so it needs a single pass. */
export const NORMALIZE_WHITESPACE_R = /\r\n?|\f|\t/g;
export const TRIM_STARTING_NEWLINES = /^\n+/;
export const HTML_LEFT_TRIM_AMOUNT_R = /^\n*([ \t]*)/;

/** List patterns */
export const ORDERED_LIST_BULLET = '(?:\\d+\\.)';
export const UNORDERED_LIST_BULLET = '(?:[*+-])';

/** Text formatting patterns */
export const TEXT_ESCAPED_R = /^\\([^0-9A-Za-z\s])/;
export const UNESCAPE_R = /\\([^0-9A-Za-z\s])/g;

/** Shortcode pattern */
export const SHORTCODE_R = /^(:[a-zA-Z0-9-_]+:)/;

// ============================================================================
// LIST TYPE CONSTANTS
// ============================================================================

export type ListType = 1 | 2;
export const ORDERED: ListType = 1;
export const UNORDERED: ListType = 2;

// ============================================================================
// INLINE PATTERN HELPERS
// ============================================================================

/**
 * Ensure there's at least one more instance of the delimiter later
 * in the current sequence.
 */
export const LOOKAHEAD = (double: number): string =>
  `(?=[\\s\\S]+?\\1${double ? '\\1' : ''})`;

/**
 * For inline formatting, this partial attempts to ignore characters that
 * may appear in nested formatting.
 */
export const INLINE_SKIP_R =
  '((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\[^\\s]|[\\s\\S])+?)';

/** Bold text pattern */
export const TEXT_BOLD_R = new RegExp(
  `^([*_])\\1${LOOKAHEAD(1)}${INLINE_SKIP_R}\\1\\1(?!\\1)`
);

/** Emphasized text pattern */
export const TEXT_EMPHASIZED_R = new RegExp(
  `^([*_])${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1(?!\\1)`
);

/** Marked text pattern */
export const TEXT_MARKED_R = new RegExp(
  `^(==)${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1`
);

/** Strikethrough text pattern */
export const TEXT_STRIKETHROUGHED_R = new RegExp(
  `^(~~)${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1`
);

// ============================================================================
// LIST REGEX GENERATORS
// ============================================================================

export const generateListItemPrefix = (type: ListType): string => {
  return (
    '( *)(' +
    (type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET) +
    ') +'
  );
};

export const ORDERED_LIST_ITEM_PREFIX = generateListItemPrefix(ORDERED);
export const UNORDERED_LIST_ITEM_PREFIX = generateListItemPrefix(UNORDERED);

export const generateListItemPrefixRegex = (type: ListType): RegExp => {
  return new RegExp(
    '^' +
      (type === ORDERED ? ORDERED_LIST_ITEM_PREFIX : UNORDERED_LIST_ITEM_PREFIX)
  );
};

export const ORDERED_LIST_ITEM_PREFIX_R = generateListItemPrefixRegex(ORDERED);
export const UNORDERED_LIST_ITEM_PREFIX_R =
  generateListItemPrefixRegex(UNORDERED);

export const generateListItemRegex = (type: ListType): RegExp => {
  return new RegExp(
    '^' +
      (type === ORDERED
        ? ORDERED_LIST_ITEM_PREFIX
        : UNORDERED_LIST_ITEM_PREFIX) +
      '[^\\n]*(?:\\n' +
      '(?!\\1' +
      (type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET) +
      ' )[^\\n]*)*(\\n|$)',
    'gm'
  );
};

export const ORDERED_LIST_ITEM_R = generateListItemRegex(ORDERED);
export const UNORDERED_LIST_ITEM_R = generateListItemRegex(UNORDERED);

export const generateListRegex = (type: ListType): RegExp => {
  const bullet = type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET;

  return new RegExp(
    '^( *)(' +
      bullet +
      ') ' +
      '[\\s\\S]+?(?:\\n{2,}(?! )' +
      '(?!\\1' +
      bullet +
      ' (?!' +
      bullet +
      ' ))\\n*' +
      // `\s` already covers `\n`, so the trailing `\n*` the pattern used to
      // carry could only ever match empty — and paying for it at every step of
      // the lazy scan cost a third of the whole match.
      '|\\s*$)'
  );
};

export const ORDERED_LIST_R = generateListRegex(ORDERED);
export const UNORDERED_LIST_R = generateListRegex(UNORDERED);
