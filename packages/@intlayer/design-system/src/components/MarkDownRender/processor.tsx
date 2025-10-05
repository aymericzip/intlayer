/**
 * it's a fork of
 * [simple-markdown v0.2.2](https://github.com/Khan/simple-markdown)
 * from Khan Academy.
 */
import {
  type CSSProperties,
  cloneElement,
  createElement,
  type FC,
  type HTMLAttributes,
  type JSX,
  type Key,
  type ReactNode,
} from 'react';

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
  /** emits a `link` 'node', does not render directly */
  linkMailtoDetector: '18',
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

if (process.env.NODE_ENV === 'test') {
  Object.keys(RuleType).forEach((key) => ((RuleType as any)[key] = key));
}

type RuleType = (typeof RuleType)[keyof typeof RuleType];

const Priority = {
  /**
   * anything that must scan the tree before everything else
   */
  MAX: 0,
  /**
   * scans for block-level constructs
   */
  HIGH: 1,
  /**
   * inline w/ more priority than other inline
   */
  MED: 2,
  /**
   * inline elements
   */
  LOW: 3,
  /**
   * bare text and stuff that is considered leftovers
   */
  MIN: 4,
};

/** TODO: Drop for React 16? */
const ATTRIBUTE_TO_JSX_PROP_MAP = [
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
  (obj: any, x) => {
    obj[x.toLowerCase()] = x;
    return obj;
  },
  { class: 'className', for: 'htmlFor' }
);

const namedCodesToUnicode = {
  amp: '\u0026',
  apos: '\u0027',
  gt: '\u003e',
  lt: '\u003c',
  nbsp: '\u00a0',
  quot: '\u201c',
} as const;

const DO_NOT_PROCESS_HTML_ELEMENTS = ['style', 'script', 'pre'];
const ATTRIBUTES_TO_SANITIZE = [
  'src',
  'href',
  'data',
  'formAction',
  'srcDoc',
  'action',
];

/**
 * the attribute extractor regex looks for a valid attribute name,
 * followed by an equal sign (whitespace around the equal sign is allowed), followed
 * by one of the following:
 *
 * 1. a single quote-bounded string, e.g. 'foo'
 * 2. a double quote-bounded string, e.g. "bar"
 * 3. an interpolation, e.g. {something}
 *
 * JSX can be be interpolated into itself and is passed through the compiler using
 * the same options and setup as the current run.
 *
 * <Something children={<SomeOtherThing />} />
 *                      ==================
 *                              ↳ children: [<SomeOtherThing />]
 *
 * Otherwise, interpolations are handled as strings or simple booleans
 * unless HTML syntax is detected.
 *
 * <Something color={green} disabled={true} />
 *                   =====            ====
 *                     ↓                ↳ disabled: true
 *                     ↳ color: "green"
 *
 * Numbers are not parsed at this time due to complexities around int, float,
 * and the upcoming bigint functionality that would make handling it unwieldy.
 * Parse the string in your component as desired.
 *
 * <Something someBigNumber={123456789123456789} />
 *                           ==================
 *                                   ↳ someBigNumber: "123456789123456789"
 */
const ATTR_EXTRACTOR_R =
  /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi;

/** TODO: Write explainers for each of these */

const AUTOLINK_MAILTO_CHECK_R = /mailto:/i;
const BLOCK_END_R = /\n{2,}$/;
const BLOCKQUOTE_R = /^(\s*>[\s\S]*?)(?=\n\n|$)/;
const BLOCKQUOTE_TRIM_LEFT_MULTILINE_R = /^ *> ?/gm;
const BLOCKQUOTE_ALERT_R = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/;
const BREAK_LINE_R = /^ {2,}\n/;
const BREAK_THEMATIC_R = /^(?:( *[-*_])){3,} *(?:\n *)+\n/;
const CODE_BLOCK_FENCED_R =
  /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/;
const CODE_BLOCK_R = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/;
const CODE_INLINE_R = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/;
const CONSECUTIVE_NEWLINE_R = /^(?:\n *)*\n/;
const CR_NEWLINE_R = /\r\n?/g;

/**
 * Matches footnotes on the format:
 *
 * [^key]: value
 *
 * Matches multiline footnotes
 *
 * [^key]: row
 * row
 * row
 *
 * And empty lines in indented multiline footnotes
 *
 * [^key]: indented with
 *     row
 *
 *     row
 *
 * Explanation:
 *
 * 1. Look for the starting tag, eg: [^key]
 *    ^\[\^([^\]]+)]
 *
 * 2. The first line starts with a colon, and continues for the rest of the line
 *   :(.*)
 *
 * 3. Parse as many additional lines as possible. Matches new non-empty lines that doesn't begin with a new footnote definition.
 *    (\n(?!\[\^).+)
 *
 * 4. ...or allows for repeated newlines if the next line begins with at least four whitespaces.
 *    (\n+ {4,}.*)
 */
const FOOTNOTE_R = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/;

const FOOTNOTE_REFERENCE_R = /^\[\^([^\]]+)]/;
const FORMFEED_R = /\f/g;
const FRONT_MATTER_R = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/;
const GFM_TASK_R = /^\s*?\[(x|\s)\]/;
const HEADING_R = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
const HEADING_ATX_COMPLIANT_R =
  /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
const HEADING_SETEXT_R = /^([^\n]+)\n *(=|-){3,} *\n/;

/**
 * Explanation:
 *
 * 1. Look for a starting tag, preceded by any amount of spaces
 *    ^ *<
 *
 * 2. Capture the tag name (capture 1)
 *    ([^ >/]+)
 *
 * 3. Ignore a space after the starting tag and capture the attribute portion of the tag (capture 2)
 *     ?([^>]*)>
 *
 * 4. Ensure a matching closing tag is present in the rest of the input string
 *    (?=[\s\S]*<\/\1>)
 *
 * 5. Capture everything until the matching closing tag -- this might include additional pairs
 *    of the same tag type found in step 2 (capture 3)
 *    ((?:[\s\S]*?(?:<\1[^>]*>[\s\S]*?<\/\1>)*[\s\S]*?)*?)<\/\1>
 *
 * 6. Capture excess newlines afterward
 *    \n*
 */
const HTML_BLOCK_ELEMENT_R =
  /^ *(?!<[a-zA-Z][^ >/]* ?\/>)<([a-zA-Z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i;

const HTML_CHAR_CODE_R = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;

const HTML_COMMENT_R = /^<!--[\s\S]*?(?:-->)/;

/**
 * borrowed from React 15(https://github.com/facebook/react/blob/894d20744cba99383ffd847dbd5b6e0800355a5c/src/renderers/dom/shared/HTMLDOMPropertyConfig.js)
 */
const HTML_CUSTOM_ATTR_R = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/;

const HTML_SELF_CLOSING_ELEMENT_R =
  /^ *<([a-zA-Z][a-zA-Z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i;

// Custom component regex - matches components like <Tabs>, <TabItem>, etc.
// This regex needs to handle nested components properly
const CUSTOM_COMPONENT_R =
  /^ *<([A-Z][a-zA-Z0-9]*)(?:\s+((?:<.*?>|[^>])*))?>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/;

const INTERPOLATION_R = /^\{.*\}$/;
const LINK_AUTOLINK_BARE_URL_R = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/;
const LINK_AUTOLINK_MAILTO_R = /^<([^ >]+@[^ >]+)>/;
const LINK_AUTOLINK_R = /^<([^ >]+:\/[^ >]+)>/;
const CAPTURE_LETTER_AFTER_HYPHEN = /-([a-z])?/gi;
const NP_TABLE_R =
  /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/;
const PARAGRAPH_R = /^[^\n]+(?: {2}\n|\n{2,})/;
const REFERENCE_IMAGE_OR_LINK = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/;
const REFERENCE_IMAGE_R = /^!\[([^\]]*)\] ?\[([^\]]*)\]/;
const REFERENCE_LINK_R = /^\[([^\]]*)\] ?\[([^\]]*)\]/;
const SHOULD_RENDER_AS_BLOCK_R = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/;
const TAB_R = /\t/g;
const TABLE_TRIM_PIPES = /(^ *\||\| *$)/g;
const TABLE_CENTER_ALIGN = /^ *:-+: *$/;
const TABLE_LEFT_ALIGN = /^ *:-+ *$/;
const TABLE_RIGHT_ALIGN = /^ *-+: *$/;

/**
 * Ensure there's at least one more instance of the delimiter later
 * in the current sequence.
 */
const LOOKAHEAD = (double: number) => `(?=[\\s\\S]+?\\1${double ? '\\1' : ''})`;

/**
 * For inline formatting, this partial attempts to ignore characters that
 * may appear in nested formatting that could prematurely trigger detection
 * and therefore miss content that should have been included.
 */
const INLINE_SKIP_R =
  '((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\\\1|[\\s\\S])+?)';

/**
 * Detect a sequence like **foo** or __foo__. Note that bold has a higher priority
 * than emphasized to support nesting of both since they share a delimiter.
 */
const TEXT_BOLD_R = new RegExp(
  `^([*_])\\1${LOOKAHEAD(1)}${INLINE_SKIP_R}\\1\\1(?!\\1)`
);

/**
 * Detect a sequence like *foo* or _foo_.
 */
const TEXT_EMPHASIZED_R = new RegExp(
  `^([*_])${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1(?!\\1)`
);

/**
 * Detect a sequence like ==foo==.
 */
const TEXT_MARKED_R = new RegExp(`^(==)${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1`);

/**
 * Detect a sequence like ~~foo~~.
 */
const TEXT_STRIKETHROUGHED_R = new RegExp(
  `^(~~)${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1`
);

/**
 * Special case for shortcodes like :big-smile: or :emoji:
 */
const SHORTCODE_R = /^(:[a-zA-Z0-9-_]+:)/;

const TEXT_ESCAPED_R = /^\\([^0-9A-Za-z\s])/;
const UNESCAPE_R = /\\([^0-9A-Za-z\s])/g;

/**
 * Always take the first character, then eagerly take text until a double space
 * (potential line break) or some markdown-like punctuation is reached.
 */
const TEXT_PLAIN_R = /^[\s\S](?:(?! {2}\n|[0-9]\.|http)[^=*_~\-\n:<`\\[!])*/;

const TRIM_STARTING_NEWLINES = /^\n+/;

const HTML_LEFT_TRIM_AMOUNT_R = /^([ \t]*)/;

type LIST_TYPE = 1 | 2;
const ORDERED: LIST_TYPE = 1;
const UNORDERED: LIST_TYPE = 2;

const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;

// recognize a `*` `-`, `+`, `1.`, `2.`... list bullet
const ORDERED_LIST_BULLET = '(?:\\d+\\.)';
const UNORDERED_LIST_BULLET = '(?:[*+-])';

const generateListItemPrefix = (type: LIST_TYPE): string => {
  return (
    '( *)(' +
    (type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET) +
    ') +'
  );
};

// recognize the start of a list item:
// leading space plus a bullet plus a space (`   * `)
const ORDERED_LIST_ITEM_PREFIX = generateListItemPrefix(ORDERED);
const UNORDERED_LIST_ITEM_PREFIX = generateListItemPrefix(UNORDERED);

const generateListItemPrefixRegex = (type: LIST_TYPE): RegExp => {
  return new RegExp(
    '^' +
      (type === ORDERED ? ORDERED_LIST_ITEM_PREFIX : UNORDERED_LIST_ITEM_PREFIX)
  );
};

const ORDERED_LIST_ITEM_PREFIX_R = generateListItemPrefixRegex(ORDERED);
const UNORDERED_LIST_ITEM_PREFIX_R = generateListItemPrefixRegex(UNORDERED);

const generateListItemRegex = (type: LIST_TYPE): RegExp => {
  // recognize an individual list item:
  //  * hi
  //    this is part of the same item
  //
  //    as is this, which is a new paragraph in the same item
  //
  //  * but this is not part of the same item
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

const ORDERED_LIST_ITEM_R = generateListItemRegex(ORDERED);
const UNORDERED_LIST_ITEM_R = generateListItemRegex(UNORDERED);

// check whether a list item has paragraphs: if it does,
// we leave the newlines at the end
const generateListRegex = (type: LIST_TYPE): RegExp => {
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
      // the \\s*$ here is so that we can parse the inside of nested
      // lists, where our content might end before we receive two `\n`s
      '|\\s*\\n*$)'
  );
};

const ORDERED_LIST_R = generateListRegex(ORDERED);
const UNORDERED_LIST_R = generateListRegex(UNORDERED);

const generateListRule = (
  type: LIST_TYPE,
  factory?: (
    tag: HTMLTags | string,
    props: Record<string, any>,
    ...children: any[]
  ) => any
): Rule<OrderedListNode | UnorderedListNode> => {
  const ordered = type === ORDERED;
  const LIST_R = ordered ? ORDERED_LIST_R : UNORDERED_LIST_R;
  const LIST_ITEM_R = ordered ? ORDERED_LIST_ITEM_R : UNORDERED_LIST_ITEM_R;
  const LIST_ITEM_PREFIX_R = ordered
    ? ORDERED_LIST_ITEM_PREFIX_R
    : UNORDERED_LIST_ITEM_PREFIX_R;

  return {
    _qualify: (source) => LIST_ITEM_PREFIX_R.test(source),
    _match: allowInline((source, state) => {
      // We only want to break into a list if we are at the start of a
      // line. This is to avoid parsing "hi * there" with "* there"
      // becoming a part of a list.
      // You might wonder, "but that's inline, so of course it wouldn't
      // start a list?". You would be correct! Except that some of our
      // lists can be inline, because they might be inside another list,
      // in which case we can parse with inline scope, but need to allow
      // nested lists inside this inline scope.
      const isStartOfLine = LIST_LOOKBEHIND_R.exec(state.prevCapture ?? '');
      const isListAllowed = state.list ?? (!state.inline && !state.simple);

      if (isStartOfLine && isListAllowed) {
        source = isStartOfLine[1] + source;

        return LIST_R.exec(source);
      } else {
        return null;
      }
    }),
    _order: Priority.HIGH,
    _parse(capture, parse, state) {
      const bullet = capture[2];
      const start = ordered ? +bullet : undefined;
      const items = capture[0]
        // recognize the end of a paragraph block inside a list item:
        // two or more newlines at end end of the item
        .replace(BLOCK_END_R, '\n')
        .match(LIST_ITEM_R);

      if (!items) return { items: [], ordered: ordered, start: start };

      let lastItemWasAParagraph = false;

      const itemContent = items.map((item, i) => {
        // We need to see how far indented the item is:
        const spaceMatch = LIST_ITEM_PREFIX_R.exec(item);
        if (!spaceMatch) return [] as unknown as ParserResult[];
        const space = spaceMatch[0].length;

        // And then we construct a regex to "unindent" the subsequent
        // lines of the items by that amount:
        const spaceRegex = new RegExp(`^ {1,${space}}`, 'gm');

        // Before processing the item, we need a couple things
        const content = item
          // remove indents on trailing lines:
          .replace(spaceRegex, '')
          // remove the bullet:
          .replace(LIST_ITEM_PREFIX_R, '');

        // Handling "loose" lists, like:
        //
        //  * this is wrapped in a paragraph
        //
        //  * as is this
        //
        //  * as is this
        const isLastItem = i === items.length - 1;
        const containsBlocks = content.indexOf('\n\n') !== -1;

        // Any element in a list is a block if it contains multiple
        // newlines. The last element in the list can also be a block
        // if the previous item in the list was a block (this is
        // because non-last items in the list can end with \n\n, but
        // the last item can't, so we just "inherit" this property
        // from our previous element).
        const thisItemIsAParagraph =
          containsBlocks || (isLastItem && lastItemWasAParagraph);
        lastItemWasAParagraph = thisItemIsAParagraph;

        // backup our state for delta afterwards. We're going to
        // want to set state.list to true, and state.inline depending
        // on our list's looseness.
        const oldStateInline = state.inline;
        const oldStateList = state.list;
        state.list = true;

        // Parse inline if we're in a tight list, or block if we're in
        // a loose list.
        let adjustedContent;
        if (thisItemIsAParagraph) {
          state.inline = false;
          adjustedContent = `${trimEnd(content)}\n\n`;
        } else {
          state.inline = true;
          adjustedContent = trimEnd(content);
        }

        const result = parse(adjustedContent, state);

        // Restore our state before returning
        state.inline = oldStateInline;
        state.list = oldStateList;

        return result;
      });

      return {
        items: itemContent,
        ordered: ordered,
        start: start,
      };
    },
    _render(node, _output, state = {}) {
      const Tag = node.ordered ? 'ol' : 'ul';
      const props: Record<string, any> = { key: state.key };
      if (node.ordered && node.start != null) props.start = node.start;

      if (factory) {
        return factory(
          Tag as HTMLTags,
          props,
          ...node.items.map((item, i) =>
            factory('li', { key: i }, _output(item, state))
          )
        );
      }

      return (
        <Tag
          key={state.key}
          start={node.type === RuleType.orderedList ? node.start : undefined}
        >
          {node.items.map((item, i) => {
            return <li key={i}>{_output(item, state)}</li>;
          })}
        </Tag>
      );
    },
  };
};

const LINK_INSIDE =
  '(?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*';
const LINK_HREF_AND_TITLE =
  '\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'"]([\\s\\S]*?)[\'"])?\\s*';
const LINK_R = new RegExp(
  `^\\[(${LINK_INSIDE})\\]\\(${LINK_HREF_AND_TITLE}\\)`
);
const IMAGE_R = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;

const trimEnd = (str: string): string => {
  let end = str.length;
  while (end > 0 && str[end - 1] <= ' ') end--;
  return str.slice(0, end);
};

const startsWith = (str: string, prefix: string): boolean => {
  return str.startsWith(prefix);
};

const qualifies = (
  source: string,
  state: State,
  qualify: NonNullable<Rule<any>['_qualify']>
): boolean => {
  if (Array.isArray(qualify)) {
    for (let i = 0; i < qualify.length; i++) {
      if (startsWith(source, qualify[i])) return true;
    }

    return false;
  }

  return (qualify as (source: string, state: State) => boolean)(source, state);
};

/** Remove symmetrical leading and trailing quotes */
const unquote = (str: string): string => {
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

// based on https://stackoverflow.com/a/18123682/1141611
// not complete, but probably good enough
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

const parseTableAlignCapture = (
  alignCapture: string
): 'left' | 'right' | 'center' => {
  if (TABLE_RIGHT_ALIGN.test(alignCapture)) {
    return 'right';
  } else if (TABLE_CENTER_ALIGN.test(alignCapture)) {
    return 'center';
  } else if (TABLE_LEFT_ALIGN.test(alignCapture)) {
    return 'left';
  }

  return 'left'; // default to left alignment
};

const parseTableRow = (
  source: string,
  parse: NestedParser,
  state: State,
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
    // isolate situations where a pipe should be ignored (inline code, escaped, etc)
    .split(/(`[^`]*`|\\\||\|)/)
    .filter(Boolean)
    .forEach((fragment, i, arr) => {
      if (fragment.trim() === '|') {
        flush();

        if (tableOutput) {
          if (i !== 0 && i !== arr.length - 1) {
            // Split the current row
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
  if (duration > 1) {
    console.log(
      `parseTableRow: ${duration.toFixed(3)}ms, source length: ${source.length}, cells count: ${cells.length}`
    );
  }

  return cells;
};

const parseTableAlign = (source: string): ('left' | 'right' | 'center')[] => {
  const alignText = source.replace(TABLE_TRIM_PIPES, '').split('|');

  return alignText.map(parseTableAlignCapture);
};

const parseTableCells = (
  source: string,
  parse: NestedParser,
  state: State
): ParserResult[][][] => {
  const start = performance.now();
  const rowsText = source.trim().split('\n');

  const result = rowsText.map((rowText) => {
    return parseTableRow(rowText, parse, state, true);
  });

  const duration = performance.now() - start;
  if (duration > 1) {
    console.log(
      `parseTableCells: ${duration.toFixed(3)}ms, source length: ${source.length}, rows count: ${rowsText.length}`
    );
  }

  return result;
};

const parseTable = (
  capture: RegExpMatchArray,
  parse: NestedParser,
  state: State
): TableNode | ParagraphNode => {
  /**
   * The table syntax makes some other parsing angry so as a bit of a hack even if alignment and/or cell rows are missing,
   * we'll still run a detected first row through the parser and then just emit a paragraph.
   */
  state.inline = true;
  const align = capture[2] ? parseTableAlign(capture[2]) : [];
  const cells = capture[3] ? parseTableCells(capture[3], parse, state) : [];
  const header = parseTableRow(capture[1], parse, state, !!cells.length);
  state.inline = false;

  return cells.length
    ? {
        align: align,
        cells: cells,
        header: header,
        type: RuleType.table,
      }
    : {
        children: header.flat(),
        type: RuleType.paragraph,
      };
};

const getTableStyle = (node: TableNode, colIndex: number): CSSProperties =>
  node.align[colIndex] == null
    ? {}
    : {
        textAlign: node.align[colIndex] as CSSProperties['textAlign'],
      };

/** TODO: remove for react 16 */
const normalizeAttributeKey = (key: string): string => {
  const hyphenIndex = key.indexOf('-');

  if (hyphenIndex !== -1 && key.match(HTML_CUSTOM_ATTR_R) === null) {
    key = key.replace(CAPTURE_LETTER_AFTER_HYPHEN, (_, letter) => {
      return letter.toUpperCase();
    });
  }

  return key;
};

type StyleTuple = [key: string, value: string];

const parseStyleAttribute = (styleString: string): StyleTuple[] => {
  const start = performance.now();
  const styles: StyleTuple[] = [];
  let buffer = '';
  let inUrl = false;
  let inQuotes = false;
  let quoteChar: '"' | "'" | '' = '';

  if (!styleString) return styles;

  for (let i = 0; i < styleString.length; i++) {
    const char = styleString[i];

    // Handle quotes
    if ((char === '"' || char === "'") && !inUrl) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
        quoteChar = '';
      }
    }

    // Track url() values
    if (char === '(' && buffer.endsWith('url')) {
      inUrl = true;
    } else if (char === ')' && inUrl) {
      inUrl = false;
    }

    // Only split on semicolons when not in quotes or url()
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

  // Handle the last declaration
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
  if (duration > 1) {
    console.log(
      `parseStyleAttribute: ${duration.toFixed(3)}ms, styleString length: ${styleString.length}, styles count: ${styles.length}`
    );
  }

  return styles;
};

// Safely remove a uniform leading indentation from lines, but do NOT touch
// the content inside fenced code blocks (``` or ~~~). This preserves code
// indentation inside custom components or HTML blocks.
const trimLeadingWhitespaceOutsideFences = (
  text: string,
  whitespace: string
): string => {
  const start = performance.now();
  if (!whitespace) return text;

  const lines = text.split('\n');
  let inFence = false;
  let fenceToken: string | null = null; // sequence of backticks/tilde used to open the fence

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
    // Always consider toggling on the current line first
    const fenceMatch = isFenceLine(line);
    if (fenceMatch) {
      // Trim baseline indentation on the fence line itself so that
      // the fence starts at the expected column, but keep code intact later.
      const trimmedFenceLine = line.startsWith(whitespace)
        ? line.slice(whitespace.length)
        : line;
      // Toggle state after processing
      maybeToggleFence(line);
      return trimmedFenceLine;
    }

    if (inFence) {
      // Inside code fences: do not trim to preserve code indentation
      return line;
    }

    // Outside code fences: remove the uniform leading indentation if present
    return line.startsWith(whitespace) ? line.slice(whitespace.length) : line;
  });

  const result = out.join('\n');

  const duration = performance.now() - start;
  if (duration > 1) {
    console.log(
      `trimLeadingWhitespaceOutsideFences: ${duration.toFixed(3)}ms, text length: ${text.length}, lines count: ${lines.length}`
    );
  }

  return result;
};

const attributeValueToJSXPropValue = (
  tag: HTMLTags,
  key: string,
  value: string,
  sanitizeUrlFn: (
    value: string,
    tag: HTMLTags,
    attribute: string
  ) => string | null
): any => {
  if (key === 'style') {
    return parseStyleAttribute(value).reduce(
      (styles, [key, value]) => {
        // snake-case to camelCase
        // also handles PascalCasing vendor prefixes
        const camelCasedKey = key.replace(/(-[a-z])/g, (substr) =>
          substr[1].toUpperCase()
        );

        // key.length + 1 to skip over the colon
        (styles as Record<string, any>)[camelCasedKey] = sanitizeUrlFn(
          value,
          tag,
          key
        );

        return styles;
      },
      {} as Record<string, any>
    );
  } else if (ATTRIBUTES_TO_SANITIZE.indexOf(key) !== -1) {
    return sanitizeUrlFn(unescape(value), tag, key);
  } else if (value.match(INTERPOLATION_R)) {
    // return as a string and let the consumer decide what to do with it
    value = unescape(value.slice(1, value.length - 1));
  }

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  return value;
};

const normalizeWhitespace = (source: string): string => {
  const start = performance.now();
  const result = source
    .replace(CR_NEWLINE_R, '\n')
    .replace(FORMFEED_R, '')
    .replace(TAB_R, '    ');

  const duration = performance.now() - start;
  if (duration > 1) {
    console.log(
      `normalizeWhitespace: ${duration.toFixed(3)}ms, source length: ${source.length}`
    );
  }

  return result;
};

/**
 * Creates a parser for a given set of rules, with the precedence
 * specified as a list of rules.
 *
 * @rules: an object containing
 * rule type -> {match, order, parse} objects
 * (lower order is higher precedence)
 * (Note: `order` is added to defaultRules after creation so that
 *  the `order` of defaultRules in the source matches the `order`
 *  of defaultRules in terms of `order` fields.)
 *
 * @returns The resulting parse function, with the following parameters:
 *   @source: the input source string to be parsed
 *   @state: an optional object to be threaded through parse
 *     calls. Allows clients to add stateful operations to
 *     parsing, such as keeping track of how many levels deep
 *     some nesting is. For an example use-case, see passage-ref
 *     parsing in src/widgets/passage/passage-markdown.jsx
 */
const parserFor = (
  rules: Rules
): ((source: string, state: State) => ReturnType<NestedParser>) => {
  const start = performance.now();
  var ruleList = Object.keys(rules) as Array<keyof typeof rules>;

  if (process.env.NODE_ENV !== 'production') {
    ruleList.forEach((type) => {
      const order = rules[type]._order;
      if (typeof order !== 'number' || !Number.isFinite(order)) {
        console.warn(`intlayer: Invalid order for rule \`${type}\`: ${order}`);
      }
    });
  }

  // Sorts rules in order of increasing order, then
  // ascending rule name in case of ties.
  ruleList.sort((a, b) => {
    return rules[a]._order - rules[b]._order || (a < b ? -1 : 1);
  });

  const nestedParse = (source: string, state: State = {}): ParserResult[] => {
    const parseStart = performance.now();
    var result: ParserResult[] = [];
    state.prevCapture = state.prevCapture || '';

    if (source.trim()) {
      while (source) {
        var i = 0;
        while (i < ruleList.length) {
          var ruleType = ruleList[i];
          var rule = rules[ruleType as keyof typeof rules];

          if (rule._qualify && !qualifies(source, state, rule._qualify)) {
            i++;
            continue;
          }

          const matchStart = performance.now();
          var capture = rule._match(source, state);
          const matchDuration = performance.now() - matchStart;

          if (matchDuration > 1) {
            console.log(
              `${ruleType}._match: ${matchDuration.toFixed(3)}ms, source length: ${source.length}`
            );
          }

          if (capture?.[0]) {
            source = source.substring(capture[0].length);

            const ruleParseStart = performance.now();
            const parsedAny: any = rule._parse(capture, nestedParse, state);
            const ruleParseDuration = performance.now() - ruleParseStart;

            if (ruleParseDuration > 1) {
              console.log(
                `${ruleType}._parse: ${ruleParseDuration.toFixed(3)}ms, capture length: ${capture[0].length}`
              );
            }

            state.prevCapture += capture[0];

            if (!parsedAny.type)
              parsedAny.type = ruleType as unknown as RuleType;
            result.push(parsedAny as ParserResult);
            break;
          }
          i++;
        }
      }
    }

    // reset on exit
    state.prevCapture = '';

    const parseDuration = performance.now() - parseStart;
    if (parseDuration > 1) {
      console.log(
        `nestedParse: ${parseDuration.toFixed(3)}ms, source length: ${source.length}, result count: ${result.length}`
      );
    }

    return result;
  };

  const duration = performance.now() - start;
  if (duration > 1) {
    console.log(
      `parserFor: ${duration.toFixed(3)}ms, rules count: ${ruleList.length}`
    );
  }

  return (source: string, state: State) =>
    nestedParse(normalizeWhitespace(source), state);
};

/**
 * Marks a matcher function as eligible for being run inside an inline context;
 * allows us to do a little less work in the nested parser.
 */
const allowInline = <T extends Function & { inline?: 0 | 1 }>(fn: T): T => {
  fn.inline = 1;

  return fn;
};

// Creates a match function for an inline scoped or simple element from a regex
const inlineRegex = (regex: RegExp) =>
  allowInline((source: string, state: State): RegExpMatchArray | null => {
    if (state.inline) {
      return regex.exec(source);
    } else {
      return null;
    }
  });

// basically any inline element except links
const simpleInlineRegex = (regex: RegExp) =>
  allowInline((source: string, state: State): RegExpMatchArray | null => {
    if (state.inline || state.simple) {
      return regex.exec(source);
    } else {
      return null;
    }
  });

// Creates a match function for a block scoped element from a regex
const blockRegex =
  (regex: RegExp) =>
  (source: string, state: State): RegExpMatchArray | null => {
    if (state.inline || state.simple) {
      return null;
    } else {
      return regex.exec(source);
    }
  };

// Creates a match function from a regex, ignoring block/inline scope
const anyScopeRegex = (regex: RegExp) =>
  allowInline((source: string /*, state*/): RegExpMatchArray | null =>
    regex.exec(source)
  );

const SANITIZE_R = /(javascript|vbscript|data(?!:image)):/i;

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
    // See `decodeURIComponent('a%AFc');`
    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
    return null;
  }

  return input;
};

const unescape = (rawString: string): string =>
  rawString ? rawString.replace(UNESCAPE_R, '$1') : rawString;

/**
 * Everything inline, including links.
 */
const parseInline = (
  parse: NestedParser,
  children: string,
  state: State
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
  if (duration > 1) {
    console.log(
      `parseInline: ${duration.toFixed(3)}ms, children length: ${children.length}, result count: ${result.length}`
    );
  }

  return result;
};

/**
 * Anything inline that isn't a link.
 */
const parseSimpleInline = (
  parse: NestedParser,
  children: string,
  state: State
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
  if (duration > 1) {
    console.log(
      `parseSimpleInline: ${duration.toFixed(3)}ms, children length: ${children.length}, result count: ${result.length}`
    );
  }

  return result;
};

const parseBlock = (
  parse: NestedParser,
  children: string,
  state: State = {}
): ParserResult[] => {
  const start = performance.now();
  const isCurrentlyInline = state.inline || false;
  state.inline = false;
  const result = parse(children, state);
  state.inline = isCurrentlyInline;

  const duration = performance.now() - start;
  if (duration > 1) {
    console.log(
      `parseBlock: ${duration.toFixed(3)}ms, children length: ${children.length}, result count: ${result.length}`
    );
  }

  return result;
};

const parseCaptureInline: Parser<{
  children: ParserResult[];
}> = (capture, parse, state: State) => {
  return {
    children: parseInline(parse, capture[2], state),
  };
};

const captureNothing = (): {} => ({});

const renderNothing = (): null => null;

const reactFor =
  (render: any) =>
  (ast: ParserResult | ParserResult[], state: State = {}): ReactNode[] => {
    const start = performance.now();
    const patchedRender = (
      ast: ParserResult | ParserResult[],
      state: State = {}
    ): ReactNode[] => reactFor(render)(ast, state);

    if (Array.isArray(ast)) {
      const oldKey = state.key;
      const result: ReactNode[] = [];

      // map nestedOutput over the ast, except group any text
      // nodes together into a single string output.
      let lastWasString = false;

      for (let i = 0; i < ast.length; i++) {
        state.key = i;

        const nodeOut = patchedRender(ast[i], state);
        const isString = typeof nodeOut === 'string';

        if (isString && lastWasString) {
          result[result.length - 1] =
            (result[result.length - 1] as string) + nodeOut;
        } else if (nodeOut !== null) {
          result.push(nodeOut);
        }

        lastWasString = isString;
      }

      state.key = oldKey;

      const duration = performance.now() - start;
      if (duration > 1) {
        console.log(
          `reactFor (array): ${duration.toFixed(3)}ms, ast length: ${ast.length}`
        );
      }

      return result as unknown as ReactNode[];
    }

    const result = render(
      ast,
      patchedRender as RuleOutput,
      state
    ) as unknown as ReactNode[];

    const duration = performance.now() - start;
    if (duration > 1) {
      console.log(
        `reactFor (single): ${duration.toFixed(3)}ms, ast type: ${(ast as ParserResult).type}`
      );
    }

    return result;
  };

const createRenderer =
  (rules: Rules, userRender?: MarkdownProcessorOptions['renderRule']) =>
  (ast: ParserResult, render: RuleOutput, state: State): ReactNode => {
    const start = performance.now();
    const renderer = rules[ast.type]._render as Rule['_render'] | undefined;

    const result = userRender
      ? userRender(() => renderer?.(ast, render, state), ast, render, state)
      : renderer?.(ast, render, state);

    const duration = performance.now() - start;
    if (duration > 1) {
      console.log(
        `createRenderer: ${duration.toFixed(3)}ms, ast type: ${ast.type}, hasUserRender: ${!!userRender}`
      );
    }

    return result;
  };

const cx = (...args: any[]): string => args.filter(Boolean).join(' ');

const get = (src: any, path: string, fb?: any): any => {
  let ptr = src;
  const frags = path.split('.');

  while (frags.length) {
    ptr = ptr[frags[0]];

    if (ptr === undefined) break;
    else frags.shift();
  }

  return ptr ?? fb;
};

const getTag = (tag: string, overrides: Overrides): any => {
  const override = get(overrides, tag);

  if (!override) return tag;

  return typeof override === 'function' ||
    (typeof override === 'object' && 'render' in override)
    ? override
    : get(overrides, `${tag}.component`, tag);
};

export const compiler = (
  markdown: string = '',
  options: MarkdownProcessorOptions = {}
): JSX.Element => {
  options.overrides = options.overrides ?? {};
  options.namedCodesToUnicode = options.namedCodesToUnicode
    ? { ...namedCodesToUnicode, ...options.namedCodesToUnicode }
    : namedCodesToUnicode;

  const slug = options.slugify ?? slugify;
  const sanitize = options.sanitizer ?? sanitizer;
  const createElementFn = options.createElement ?? createElement;

  const NON_PARAGRAPH_BLOCK_SYNTAXES = [
    BLOCKQUOTE_R,
    CODE_BLOCK_FENCED_R,
    CODE_BLOCK_R,
    options.enforceAtxHeadings ? HEADING_ATX_COMPLIANT_R : HEADING_R,
    HEADING_SETEXT_R,
    NP_TABLE_R,
    ORDERED_LIST_R,
    UNORDERED_LIST_R,
  ];

  const BLOCK_SYNTAXES = [
    ...NON_PARAGRAPH_BLOCK_SYNTAXES,
    PARAGRAPH_R,
    HTML_BLOCK_ELEMENT_R,
    HTML_COMMENT_R,
    HTML_SELF_CLOSING_ELEMENT_R,
    CUSTOM_COMPONENT_R,
  ];

  const containsBlockSyntax = (input: string): boolean => {
    // Ignore leading blank lines when deciding block vs inline parsing
    // Bound the amount of text tested to avoid catastrophic regex on long bodies
    const cleaned = input.replace(TRIM_STARTING_NEWLINES, '');
    const slice = cleaned.length > 2048 ? cleaned.slice(0, 2048) : cleaned;
    // If raw HTML parsing is disabled, avoid testing HTML regexes entirely
    const syntaxes = options.disableParsingRawHTML
      ? [...NON_PARAGRAPH_BLOCK_SYNTAXES, PARAGRAPH_R, CUSTOM_COMPONENT_R]
      : BLOCK_SYNTAXES;
    return syntaxes.some((r) => r.test(slice));
  };

  const matchParagraph = (
    source: string,
    state: State
  ): RegExpMatchArray | null => {
    if (
      state.inline ||
      state.simple ||
      (state.inHTML &&
        source.indexOf('\n\n') === -1 &&
        state.prevCapture?.indexOf('\n\n') === -1)
    ) {
      return null;
    }

    let match = '';

    source.split('\n').every((line) => {
      line += '\n';

      // bail out on first sign of non-paragraph block
      if (NON_PARAGRAPH_BLOCK_SYNTAXES.some((regex) => regex.test(line))) {
        return false;
      }

      match += line;

      return !!line.trim();
    });

    const captured = trimEnd(match);
    if (captured === '') {
      return null;
    }

    // parseCaptureInline expects the inner content to be at index 2
    // because index 1 is the delimiter for text formatting syntaxes
    return [match, undefined, captured] as RegExpMatchArray;
  };

  // JSX custom pragma

  const h = (
    // locally we always will render a known string tag
    tag: HTMLTags,
    props: Record<string, any>,
    ...children: any[]
  ): any => {
    const overrideProps = get(
      options.overrides ?? {},
      `${tag}.props`,
      {}
    ) as Record<string, any>;

    return createElementFn(
      getTag(tag, options.overrides ?? {}) as any,
      {
        ...props,
        ...overrideProps,
        className: cx(props?.className, overrideProps.className) ?? undefined,
      },
      ...children
    );
  };

  const compile = (input: string): JSX.Element => {
    const start = performance.now();
    const result = input.replace(FRONT_MATTER_R, '');

    let inline = false;

    if (options.forceInline) {
      inline = true;
    } else if (!options.forceBlock) {
      /**
       * should not contain any block-level markdown like newlines, lists, headings,
       * thematic breaks, blockquotes, tables, etc
       */
      inline = SHOULD_RENDER_AS_BLOCK_R.test(result) === false;
    }

    const arr = emitter(
      parser(
        inline
          ? result
          : `${trimEnd(result).replace(TRIM_STARTING_NEWLINES, '')}\n\n`,
        {
          inline,
        }
      )
    ) as unknown as any[];

    while (
      typeof arr[arr.length - 1] === 'string' &&
      !arr[arr.length - 1].trim()
    ) {
      arr.pop();
    }

    if (options.wrapper === null) {
      const duration = performance.now() - start;
      if (duration > 1) {
        console.log(
          `compile: ${duration.toFixed(3)}ms, input length: ${input.length}, inline: ${inline}`
        );
      }
      return arr as unknown as JSX.Element;
    }

    const wrapper = options.wrapper ?? (inline ? 'span' : 'div');
    let jsx;

    if (arr.length > 1 || options.forceWrapper) {
      jsx = arr;
    } else if (arr.length === 1) {
      jsx = arr[0];

      // TODO: remove this for React 16
      if (typeof jsx === 'string') {
        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `compile: ${duration.toFixed(3)}ms, input length: ${input.length}, inline: ${inline}`
          );
        }
        return <span key="outer">{jsx}</span>;
      } else {
        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `compile: ${duration.toFixed(3)}ms, input length: ${input.length}, inline: ${inline}`
          );
        }
        return jsx as unknown as JSX.Element;
      }
    } else {
      // TODO: return null for React 16
      jsx = null;
    }

    const duration = performance.now() - start;
    if (duration > 1) {
      console.log(
        `compile: ${duration.toFixed(3)}ms, input length: ${input.length}, inline: ${inline}`
      );
    }

    return createElementFn(wrapper, { key: 'outer' }, jsx) as JSX.Element;
  };

  const attrStringToMap = (
    tag: HTMLTags,
    str: string
  ): JSX.IntrinsicAttributes | null => {
    const start = performance.now();
    if (!str || !str.trim()) {
      return null;
    }

    const attributes = str.match(ATTR_EXTRACTOR_R);
    if (!attributes) {
      return null;
    }

    const result = attributes.reduce((map: any, raw) => {
      const delimiterIdx = raw.indexOf('=');

      if (delimiterIdx !== -1) {
        const key = normalizeAttributeKey(raw.slice(0, delimiterIdx)).trim();
        const value = unquote(raw.slice(delimiterIdx + 1).trim());

        const mappedKey = ATTRIBUTE_TO_JSX_PROP_MAP[key] ?? key;

        // bail out, not supported
        if (mappedKey === 'ref') return map;

        const normalizedValue = (map[mappedKey] = attributeValueToJSXPropValue(
          tag,
          key,
          value,
          sanitize
        ));

        if (
          typeof normalizedValue === 'string' &&
          (HTML_BLOCK_ELEMENT_R.test(normalizedValue) ||
            HTML_SELF_CLOSING_ELEMENT_R.test(normalizedValue))
        ) {
          map[mappedKey] = compile(normalizedValue.trim());
        }
      } else if (raw !== 'style') {
        map[ATTRIBUTE_TO_JSX_PROP_MAP[raw] ?? raw] = true;
      }

      return map;
    }, {});

    const duration = performance.now() - start;
    if (duration > 1) {
      console.log(
        `attrStringToMap: ${duration.toFixed(3)}ms, str length: ${str.length}, attributes count: ${attributes.length}`
      );
    }

    return result;
  };

  if (process.env.NODE_ENV !== 'production') {
    if (typeof markdown !== 'string') {
      throw new Error(`intlayer: the first argument must be
                             a string`);
    }

    if (
      Object.prototype.toString.call(options.overrides) !== '[object Object]'
    ) {
      throw new Error(`intlayer: options.overrides (second argument property) must be
                             undefined or an object literal with shape:
                             {
                                htmltagname: {
                                    component: string|ReactComponent(optional),
                                    props: object(optional)
                                }
                             }`);
    }
  }

  const footnotes: { footnote: string; identifier: string }[] = [];
  const refs: { [key: string]: { target: string; title: string } } = {};

  /**
   * each rule's react() output function goes through our custom
   * h() JSX pragma; this allows the override functionality to be
   * automatically applied
   */
  // @ts-ignore
  const rules: Rules = {
    [RuleType.blockQuote]: {
      _qualify: ['>'],
      _match: blockRegex(BLOCKQUOTE_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const start = performance.now();
        const matchAlert = capture[0]
          .replace(BLOCKQUOTE_TRIM_LEFT_MULTILINE_R, '')
          .match(BLOCKQUOTE_ALERT_R) as RegExpMatchArray | null;
        const alert = matchAlert?.[1];
        const content = matchAlert?.[2] ?? '';

        const result = {
          alert,
          children: parse(content, state),
        };

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `blockQuote._parse: ${duration.toFixed(3)}ms, capture length: ${capture[0].length}`
          );
        }

        return result;
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const props = {
          key: state?.key,
        } as Record<string, unknown>;

        if (node.alert) {
          props.className = `markdown-alert-${slug(node.alert.toLowerCase(), slugify)}`;

          node.children.unshift({
            attrs: {},
            children: [{ type: RuleType.text, text: node.alert }],
            noInnerParse: true,
            type: RuleType.htmlBlock,
            tag: 'header',
          });
        }

        const result = h(
          'blockquote',
          props,
          _output(node.children, state as State)
        );

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `blockQuote._render: ${duration.toFixed(3)}ms, children count: ${node.children.length}, has alert: ${!!node.alert}`
          );
        }

        return result;
      },
    },

    [RuleType.breakLine]: {
      _match: anyScopeRegex(BREAK_LINE_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render(_, __, state = {}) {
        return <br key={state.key} />;
      },
    },

    [RuleType.breakThematic]: {
      _qualify: (source) => {
        const char = source[0];
        return char === '-' || char === '*' || char === '_';
      },
      _match: blockRegex(BREAK_THEMATIC_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render(_, __, state = {}) {
        return <hr key={state.key} />;
      },
    },

    [RuleType.codeBlock]: {
      _qualify: ['    '],
      _match: blockRegex(CODE_BLOCK_R),
      _order: Priority.MAX,
      _parse(capture /*, parse, state*/) {
        return {
          type: RuleType.codeBlock,
          lang: undefined,
          text: unescape(trimEnd(capture[0].replace(/^ {4}/gm, ''))),
        };
      },

      _render(node, _output, state = {}) {
        const start = performance.now();
        const attrs = { ...((node as any).attrs ?? {}) } as Record<string, any>;
        const langClass = node.lang ? `lang-${node.lang}` : 'lang-plaintext';
        attrs.className = attrs.className
          ? `${attrs.className} ${langClass}`
          : langClass;
        if (node.lang && !attrs.lang) attrs.lang = node.lang;

        const result = h(
          'pre',
          { key: state.key },
          h('code', attrs, (node as any).text)
        );

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `codeBlock._render: ${duration.toFixed(3)}ms, text length: ${(node as any).text.length}, lang: ${node.lang || 'none'}`
          );
        }

        return result;
      },
    },

    [RuleType.codeFenced]: {
      _qualify: ['```', '~~~'],
      _match: blockRegex(CODE_BLOCK_FENCED_R),
      _order: Priority.MAX,
      _parse(capture /*, _parse, state*/) {
        const rawText = capture[4];
        // Always preserve real newlines so code blocks render with correct block formatting
        const text = rawText;
        return {
          // if capture[3] it's additional metadata
          attrs: attrStringToMap('code', capture[3] ?? ''),
          lang: capture[2] || undefined,
          text,
          type: RuleType.codeBlock,
        };
      },
    },

    [RuleType.codeInline]: {
      _qualify: ['`'],
      _match: simpleInlineRegex(CODE_INLINE_R),
      _order: Priority.LOW,
      _parse(capture /*, parse, state*/) {
        return {
          text: unescape(capture[2]),
        };
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = h('code', { key: state.key }, (node as any).text);

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `codeInline._render: ${duration.toFixed(3)}ms, text length: ${(node as any).text.length}`
          );
        }

        return result;
      },
    },

    /**
     * footnotes are emitted at the end of compilation in a special <footer> block
     */
    [RuleType.footnote]: {
      _qualify: ['[^'],
      _match: blockRegex(FOOTNOTE_R),
      _order: Priority.MAX,
      _parse(capture /*, parse, state*/) {
        footnotes.push({
          footnote: capture[2],
          identifier: capture[1],
        });

        return {};
      },
      _render: renderNothing,
    },

    [RuleType.footnoteReference]: {
      _qualify: ['[^'],
      _match: inlineRegex(FOOTNOTE_REFERENCE_R),
      _order: Priority.HIGH,
      _parse(capture /*, parse*/) {
        return {
          target: `#${slug(capture[1], slugify)}`,
          text: capture[1],
        };
      },
      _render(node, _output, state = {}) {
        return (
          <a
            key={state.key}
            href={sanitize(node.target, 'a', 'href') ?? undefined}
          >
            <sup key={state.key}>{node.text}</sup>
          </a>
        );
      },
    } as Rule<{ target: string; text: string }>,

    [RuleType.gfmTask]: {
      _qualify: ['[ ]', '[x]'],
      _match: inlineRegex(GFM_TASK_R),
      _order: Priority.HIGH,
      _parse(capture /*, parse, state*/) {
        return {
          completed: capture[1].toLowerCase() === 'x',
        };
      },
      _render(node, _output, state = {}) {
        return (
          <input
            checked={node.completed}
            key={state.key}
            readOnly
            type="checkbox"
          />
        );
      },
    } as Rule<{ completed: boolean }>,

    [RuleType.heading]: {
      _qualify: ['#'],
      _match: blockRegex(
        options.enforceAtxHeadings ? HEADING_ATX_COMPLIANT_R : HEADING_R
      ),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const start = performance.now();
        const result = {
          children: parseInline(parse, capture[2], state),
          id: slug(capture[2], slugify),
          level: capture[1].length as HeadingNode['level'],
        };

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `heading._parse: ${duration.toFixed(3)}ms, capture length: ${capture[0].length}, level: ${capture[1].length}`
          );
        }

        return result;
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = h(
          `h${node.level}`,
          { id: node.id, key: state.key },
          _output(node.children, state)
        );

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `heading._render: ${duration.toFixed(3)}ms, level: ${node.level}, children count: ${node.children.length}, id: ${node.id}`
          );
        }

        return result;
      },
    },

    [RuleType.headingSetext]: {
      _match: blockRegex(HEADING_SETEXT_R),
      _order: Priority.MAX,
      _parse(capture, parse, state) {
        return {
          children: parseInline(parse, capture[1], state),
          level: capture[2] === '=' ? 1 : 2,
          type: RuleType.heading,
        };
      },
    },

    [RuleType.htmlBlock]: {
      _qualify: (source) => {
        // quick pre-checks to avoid heavy regex
        if (options.disableParsingRawHTML) return false;
        if (source[0] !== '<') return false;
        // must start like an HTML tag name in lowercase
        if (!/^<([a-z][a-z0-9:-]*)\b/.test(source)) return false;
        // ensure there is a closing tag for the same name somewhere ahead to avoid excessive work
        const tag = source.match(/^<([a-z][a-z0-9:-]*)\b/)?.[1];
        return tag ? source.indexOf(`</${tag}>`) !== -1 : false;
      },
      /**
       * find the first matching end tag and process the interior
       */
      _match: anyScopeRegex(HTML_BLOCK_ELEMENT_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const m = capture[3].match(
          HTML_LEFT_TRIM_AMOUNT_R
        ) as RegExpMatchArray | null;
        const whitespace = m?.[1] ?? '';

        const trimmed = trimLeadingWhitespaceOutsideFences(
          capture[3],
          whitespace
        );

        const parseFunc = containsBlockSyntax(trimmed)
          ? parseBlock
          : parseInline;

        const tagName = capture[1].toLowerCase() as HTMLTags;
        const noInnerParse =
          DO_NOT_PROCESS_HTML_ELEMENTS.indexOf(tagName) !== -1;

        const tag = (noInnerParse ? tagName : capture[1]).trim() as HTMLTags;

        const ast = {
          attrs: attrStringToMap(tag, capture[2] ?? ''),
          noInnerParse: noInnerParse,
          tag,
        } as {
          attrs: ReturnType<typeof attrStringToMap>;
          children?: ReturnType<NestedParser> | undefined;
          noInnerParse: boolean;
          tag: HTMLTags;
          text?: string | undefined;
        };

        state.inAnchor = state.inAnchor || tagName === 'a';

        if (noInnerParse) {
          ast.text = capture[3];
        } else {
          const prevInHTML = state.inHTML;
          state.inHTML = true;
          ast.children = parseFunc(parse, trimmed, state);
          state.inHTML = prevInHTML;
        }

        /**
         * if another html block is detected within, parse as block,
         * otherwise parse as inline to pick up any further markdown
         */
        state.inAnchor = false;

        return ast;
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = h(
          node.tag as HTMLTags,
          { key: state.key, ...(node.attrs ?? {}) },
          node.text ?? (node.children ? _output(node.children, state) : '')
        );

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `htmlBlock._render: ${duration.toFixed(3)}ms, tag: ${node.tag}, has text: ${!!node.text}, has children: ${!!node.children}`
          );
        }

        return result;
      },
    },

    [RuleType.htmlSelfClosing]: {
      _qualify: (source) => {
        if (options.disableParsingRawHTML) return false;
        if (source[0] !== '<') return false;
        return /^<([a-zA-Z][a-zA-Z0-9:]*)[\s>/]/.test(source);
      },
      /**
       * find the first matching end tag and process the interior
       */
      _match: anyScopeRegex(HTML_SELF_CLOSING_ELEMENT_R),
      _order: Priority.HIGH,
      _parse(capture /*, parse, state*/) {
        const tag = capture[1].trim() as HTMLTags;
        return {
          attrs: attrStringToMap(tag, capture[2] || ''),
          tag,
        };
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = h(node.tag as HTMLTags, {
          key: state.key,
          ...(node.attrs ?? {}),
        });

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `htmlSelfClosing._render: ${duration.toFixed(3)}ms, tag: ${node.tag}`
          );
        }

        return result;
      },
    },

    [RuleType.htmlComment]: {
      _qualify: ['<!--'],
      _match: anyScopeRegex(HTML_COMMENT_R),
      _order: Priority.HIGH,
      _parse() {
        return {};
      },
      _render: renderNothing,
    },

    [RuleType.customComponent]: {
      _qualify: (source) => {
        // Check if it starts with a capital letter (custom component)
        const match = source.match(/^ *<([A-Z][a-zA-Z0-9]*)/);
        return !!match;
      },
      _match: blockRegex(CUSTOM_COMPONENT_R),
      _order: Priority.MAX,
      _parse(capture, parse, state) {
        const m = capture[3].match(
          HTML_LEFT_TRIM_AMOUNT_R
        ) as RegExpMatchArray | null;
        const whitespace = m?.[1] ?? '';

        const trimmed = trimLeadingWhitespaceOutsideFences(
          capture[3],
          whitespace
        );

        const parseFunc = containsBlockSyntax(trimmed)
          ? parseBlock
          : parseInline;

        const tagName = capture[1];
        const noInnerParse = false; // Custom components should always parse inner content

        const ast = {
          attrs: attrStringToMap(tagName as HTMLTags, capture[2] ?? ''),
          noInnerParse: noInnerParse,
          tag: tagName,
        } as {
          attrs: ReturnType<typeof attrStringToMap>;
          children?: ReturnType<NestedParser> | undefined;
          noInnerParse: boolean;
          tag: string;
          text?: string | undefined;
        };

        if (noInnerParse) {
          ast.text = capture[3];
        } else {
          const prevInHTML = state.inHTML;
          state.inHTML = true;
          // Parse the inner content to extract children
          const parsedChildren = parseFunc(parse, trimmed, state);
          ast.children = parsedChildren;
          state.inHTML = prevInHTML;
        }

        return ast;
      },
      _render(node, _output, state = {}) {
        // Use the custom component from overrides if available
        const customComponent = getTag(node.tag, options.overrides ?? {});

        if (typeof customComponent === 'function') {
          // For custom components, we need to render the children properly

          const renderedChildren = node.children
            ? _output(node.children, state)
            : null;

          return customComponent({
            key: state.key,
            ...node.attrs,
            children: renderedChildren,
          });
        }

        // Fallback to regular HTML element
        return createElementFn(
          node.tag,
          { key: state.key, ...node.attrs },
          node.text ?? (node.children ? _output(node.children, state) : '')
        );
      },
    },

    [RuleType.image]: {
      _qualify: ['!['],
      _match: simpleInlineRegex(IMAGE_R),
      _order: Priority.HIGH,
      _parse(capture /*, parse, state*/) {
        return {
          alt: unescape(capture[1]),
          target: unescape(capture[2]),
          title: unescape(capture[3]),
        };
      },
      _render(node, _output, state = {}) {
        return (
          <img
            key={state.key}
            alt={node.alt ?? undefined}
            title={node.title ?? undefined}
            src={sanitize(node.target, 'img', 'src') ?? undefined}
          />
        );
      },
    } as Rule<{
      alt?: string;
      target: string;
      title?: string;
    }>,

    [RuleType.link]: {
      _qualify: ['['],
      _match: inlineRegex(LINK_R),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[1], state),
          target: unescape(capture[2]),
          title: unescape(capture[3]),
        };
      },
      _render(node, _output, state = {}) {
        const renderedChildren = _output(node.children, state);
        const overrideComponent = getTag('a', options.overrides ?? {});

        const props = {
          key: state.key,
          href: sanitize(node.target, 'a', 'href') ?? undefined,
          title: node.title,
          children: renderedChildren,
        } as Record<string, any>;

        if (typeof overrideComponent === 'function') {
          return overrideComponent(props);
        }

        return h('a', props, renderedChildren);
      },
    },

    // https://daringfireball.net/projects/markdown/syntax#autolink
    [RuleType.linkAngleBraceStyleDetector]: {
      _qualify: ['<'],
      _match: inlineRegex(LINK_AUTOLINK_R),
      _order: Priority.MAX,
      _parse(capture /*, parse, state*/) {
        return {
          children: [
            {
              text: capture[1],
              type: RuleType.text,
            },
          ],
          target: capture[1],
          type: RuleType.link,
        };
      },
    },

    [RuleType.linkBareUrlDetector]: {
      _qualify: (source, state) => {
        if (state.inAnchor || options.disableAutoLink) return false;
        return startsWith(source, 'http://') || startsWith(source, 'https://');
      },
      _match: inlineRegex(LINK_AUTOLINK_BARE_URL_R),
      _order: Priority.MAX,
      _parse(capture /*, parse, state*/) {
        return {
          children: [
            {
              text: capture[1],
              type: RuleType.text,
            },
          ],
          target: capture[1],
          title: undefined,
          type: RuleType.link,
        };
      },
    },

    [RuleType.linkMailtoDetector]: {
      _qualify: ['<'],
      _match: inlineRegex(LINK_AUTOLINK_MAILTO_R),
      _order: Priority.MAX,
      _parse(capture /*, parse, state*/) {
        const address = capture[1];
        let target = capture[1];

        // Check for a `mailto:` already existing in the link:
        if (!AUTOLINK_MAILTO_CHECK_R.test(target)) {
          target = `mailto:${target}`;
        }

        return {
          children: [
            {
              text: address.replace('mailto:', ''),
              type: RuleType.text,
            },
          ],
          target: target,
          type: RuleType.link,
        };
      },
    },

    [RuleType.orderedList]: generateListRule(
      ORDERED,
      (tag: string, props: Record<string, any>, ...children: any[]) =>
        h(tag as HTMLTags, props, ...children)
    ) as Rule<OrderedListNode>,

    [RuleType.unorderedList]: generateListRule(
      UNORDERED,
      (tag: string, props: Record<string, any>, ...children: any[]) =>
        h(tag as HTMLTags, props, ...children)
    ) as Rule<UnorderedListNode>,

    [RuleType.newlineCoalescer]: {
      _match: blockRegex(CONSECUTIVE_NEWLINE_R),
      _order: Priority.LOW,
      _parse: captureNothing,
      _render(/*node, output, state*/) {
        return '\n';
      },
    },

    [RuleType.paragraph]: {
      _match: allowInline(matchParagraph),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        const start = performance.now();
        const result = parseCaptureInline(capture, parse, state);
        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `paragraph._parse: ${duration.toFixed(3)}ms, capture length: ${capture[0].length}`
          );
        }
        return result;
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = <p key={state.key}>{_output(node.children, state)}</p>;

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `paragraph._render: ${duration.toFixed(3)}ms, children count: ${node.children.length}`
          );
        }

        return result;
      },
    } as Rule<ReturnType<typeof parseCaptureInline>>,

    [RuleType.ref]: {
      _qualify: ['['],
      _match: inlineRegex(REFERENCE_IMAGE_OR_LINK),
      _order: Priority.MAX,
      _parse(capture /*, parse*/) {
        refs[capture[1]] = {
          target: capture[2],
          title: capture[4],
        };

        return {};
      },
      _render: renderNothing,
    },

    [RuleType.refImage]: {
      _qualify: ['!['],
      _match: simpleInlineRegex(REFERENCE_IMAGE_R),
      _order: Priority.MAX,
      _parse(capture) {
        return {
          alt: capture[1] ? unescape(capture[1]) : undefined,
          ref: capture[2],
        };
      },
      _render(node, _output, state = {}) {
        return refs[node.ref] ? (
          <img
            key={state.key}
            alt={node.alt}
            src={sanitize(refs[node.ref].target, 'img', 'src') ?? undefined}
            title={refs[node.ref].title}
          />
        ) : null;
      },
    } as Rule<{ alt?: string; ref: string }>,

    [RuleType.refLink]: {
      _qualify: (source) => source[0] === '[' && source.indexOf('](') === -1,
      _match: inlineRegex(REFERENCE_LINK_R),
      _order: Priority.MAX,
      _parse(capture, parse, state) {
        return {
          children: parse(capture[1], state),
          fallbackChildren: capture[0],
          ref: capture[2],
        };
      },
      _render(node, _output, state = {}) {
        return refs[node.ref] ? (
          <a
            key={state.key}
            href={sanitize(refs[node.ref].target, 'a', 'href') ?? undefined}
            title={refs[node.ref].title}
          >
            {_output(node.children, state)}
          </a>
        ) : (
          <span key={state.key}>{node.fallbackChildren}</span>
        );
      },
    },

    [RuleType.table]: {
      _qualify: ['|'],
      _match: blockRegex(NP_TABLE_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const start = performance.now();
        const result = parseTable(capture, parse, state);
        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `table._parse: ${duration.toFixed(3)}ms, capture length: ${capture[0].length}`
          );
        }
        return result;
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const table = node as TableNode;
        const result = h(
          'table',
          { key: state.key },
          h(
            'thead',
            {},
            h(
              'tr',
              {},
              ...table.header.map((content, i) =>
                h(
                  'th',
                  { key: i, style: getTableStyle(table, i) },
                  _output(content, state)
                )
              )
            )
          ),
          h(
            'tbody',
            {},
            ...table.cells.map((row, i) =>
              h(
                'tr',
                { key: i },
                ...row.map((content, c) =>
                  h(
                    'td',
                    { key: c, style: getTableStyle(table, c) },
                    _output(content, state)
                  )
                )
              )
            )
          )
        );

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `table._render: ${duration.toFixed(3)}ms, header count: ${table.header.length}, rows count: ${table.cells.length}`
          );
        }

        return result;
      },
    },

    [RuleType.text]: {
      // Here we look for anything followed by non-symbols,
      // double newlines, or double-space-newlines
      // We break on any symbol characters so that this grammar
      // is easy to extend without needing to modify this regex
      _match: allowInline((source, _state) => {
        let ret;
        if (startsWith(source, ':')) ret = SHORTCODE_R.exec(source);
        if (ret) return ret;

        return TEXT_PLAIN_R.exec(source);
      }),
      _order: Priority.MIN,
      _parse(capture) {
        const text = capture[0];
        return {
          text:
            text.indexOf('&') === -1
              ? text
              : text.replace(
                  HTML_CHAR_CODE_R,
                  (full, inner) => options.namedCodesToUnicode?.[inner] ?? full
                ),
        };
      },
      _render(node) {
        return node.text;
      },
    },

    [RuleType.textBolded]: {
      _qualify: ['**', '__'],
      _match: simpleInlineRegex(TEXT_BOLD_R),
      _order: Priority.MED,
      _parse(capture, parse, state) {
        return {
          // capture[1] -> the syntax control character
          // capture[2] -> inner content
          children: parse(capture[2], state),
        };
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = (
          <strong key={state.key}>{_output(node.children, state)}</strong>
        );

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `textBolded._render: ${duration.toFixed(3)}ms, children count: ${node.children.length}`
          );
        }

        return result;
      },
    },

    [RuleType.textEmphasized]: {
      _qualify: (source) => {
        const char = source[0];
        return (char === '*' || char === '_') && source[1] !== char;
      },
      _match: simpleInlineRegex(TEXT_EMPHASIZED_R),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        return {
          // capture[1] -> opening * or _
          // capture[2] -> inner content
          children: parse(capture[2], state),
        };
      },
      _render(node, _output, state = {}) {
        const start = performance.now();
        const result = <em key={state.key}>{_output(node.children, state)}</em>;

        const duration = performance.now() - start;
        if (duration > 1) {
          console.log(
            `textEmphasized._render: ${duration.toFixed(3)}ms, children count: ${node.children.length}`
          );
        }

        return result;
      },
    },

    [RuleType.textEscaped]: {
      _qualify: ['\\'],
      // We don't allow escaping numbers, letters, or spaces here so that
      // backslashes used in plain text still get rendered. But allowing
      // escaping anything else provides a very flexible escape mechanism,
      // regardless of how this grammar is extended.
      _match: simpleInlineRegex(TEXT_ESCAPED_R),
      _order: Priority.HIGH,
      _parse(capture /*, parse, state*/) {
        return {
          text: capture[1],
          type: RuleType.text,
        };
      },
    },

    [RuleType.textMarked]: {
      _qualify: ['=='],
      _match: simpleInlineRegex(TEXT_MARKED_R),
      _order: Priority.LOW,
      _parse: parseCaptureInline,
      _render(node, _output, state = {}) {
        return <mark key={state.key}>{_output(node.children, state)}</mark>;
      },
    },

    [RuleType.textStrikethroughed]: {
      _qualify: ['~~'],
      _match: simpleInlineRegex(TEXT_STRIKETHROUGHED_R),
      _order: Priority.LOW,
      _parse: parseCaptureInline,
      _render(node, _output, state = {}) {
        return <del key={state.key}>{_output(node.children, state)}</del>;
      },
    },
  };

  // Object.keys(rules).forEach(key => {
  //   let { _match: match, parse: parse } = rules[key]

  //   // rules[key].match = (...args) => {
  //   //   const start = performance.now()
  //   //   const result = match(...args)
  //   //   const delta = performance.now() - start

  //   //   if (delta > 5)
  //   //     console.warn(
  //   //       `Slow match for ${key}: ${delta.toFixed(3)}ms, input: ${args[0]}`
  //   //     )

  //   //   return result
  //   // }

  //   rules[key].parse = (...args) => {
  //     const start = performance.now()
  //     const result = parse(...args)
  //     const delta = performance.now() - start

  //     if (delta > 5) {
  //       console.warn(
  //         `Slow parse for ${key}: ${delta.toFixed(3)}ms, input: ${args[0]}`
  //       )
  //     }

  //     // console[delta > 5 ? 'warn' : 'log'](
  //     //   `${key}:parse`,
  //     //   `${delta.toFixed(3)}ms`,
  //     //   args[0]
  //     // )

  //     return result
  //   }
  // })

  if (options.disableParsingRawHTML === true) {
    delete (rules as any)[RuleType.htmlBlock];
    delete (rules as any)[RuleType.htmlSelfClosing];
  }

  const parser = parserFor(rules);
  const emitter: Function = reactFor(createRenderer(rules, options.renderRule));

  const jsx = compile(markdown);

  if (footnotes.length) {
    return (
      <div>
        {jsx}
        <footer key="footer">
          {footnotes.map((def) => (
            <div id={slug(def.identifier, slugify)} key={def.identifier}>
              {def.identifier}
              {
                emitter(
                  parser(def.footnote, { inline: true })
                ) as unknown as ReactNode
              }
            </div>
          ))}
        </footer>
      </div>
    );
  }

  return jsx;
};

/**
 * A simple HOC for easy React use. Feed the markdown content as a direct child
 * and the rest is taken care of automatically.
 */
export const MarkdownProcessor: FC<
  Omit<HTMLAttributes<Element>, 'children'> & {
    children: string;
    options?: MarkdownProcessorOptions;
  }
> = ({ children = '', options, ...props }) => {
  if (process.env.NODE_ENV !== 'production' && typeof children !== 'string') {
    console.error(
      'intlayer: <Markdown> component only accepts a single string as a child, received:',
      children
    );
  }

  return cloneElement(
    compiler(children, options),
    props as JSX.IntrinsicAttributes
  );
};

/**
 * RequireAtLeastOne<{ ... }> <- only requires at least one key
 */
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type CreateElement = typeof createElement;

type HTMLTags = keyof JSX.IntrinsicElements;

type State = {
  /** true if the current content is inside anchor link grammar */
  inAnchor?: boolean;
  /** true if parsing in an HTML context */
  inHTML?: boolean;
  /** true if parsing in an inline context (subset of rules around formatting and links) */
  inline?: boolean;
  /** true if in a table */
  inTable?: boolean;
  /** use this for the `key` prop */
  key?: Key;
  /** true if in a list */
  list?: boolean;
  /** used for lookbacks */
  prevCapture?: string;
  /** true if parsing in inline context w/o links */
  simple?: boolean;
};

type BlockQuoteNode = {
  alert?: string;
  children: ParserResult[];
  type: typeof RuleType.blockQuote;
};

type BreakLineNode = {
  type: typeof RuleType.breakLine;
};

type BreakThematicNode = {
  type: typeof RuleType.breakThematic;
};

type CodeBlockNode = {
  type: typeof RuleType.codeBlock;
  attrs?: JSX.IntrinsicAttributes;
  lang?: string;
  text: string;
};

type CodeFencedNode = {
  type: typeof RuleType.codeFenced;
};

type CodeInlineNode = {
  type: typeof RuleType.codeInline;
  text: string;
};

type FootnoteNode = {
  type: typeof RuleType.footnote;
};

type FootnoteReferenceNode = {
  type: typeof RuleType.footnoteReference;
  target: string;
  text: string;
};

type GFMTaskNode = {
  type: typeof RuleType.gfmTask;
  completed: boolean;
};

type HeadingNode = {
  type: typeof RuleType.heading;
  children: ParserResult[];
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

type HeadingSetextNode = {
  type: typeof RuleType.headingSetext;
};

type HTMLCommentNode = {
  type: typeof RuleType.htmlComment;
};

type ImageNode = {
  type: typeof RuleType.image;
  alt?: string;
  target: string;
  title?: string;
};

type LinkNode = {
  type: typeof RuleType.link;
  children: ParserResult[];
  target: string;
  title?: string;
};

type LinkAngleBraceNode = {
  type: typeof RuleType.linkAngleBraceStyleDetector;
};

type LinkBareURLNode = {
  type: typeof RuleType.linkBareUrlDetector;
};

type LinkMailtoNode = {
  type: typeof RuleType.linkMailtoDetector;
};

type OrderedListNode = {
  type: typeof RuleType.orderedList;
  items: ParserResult[][];
  ordered: true;
  start?: number;
};

type UnorderedListNode = {
  type: typeof RuleType.unorderedList;
  items: ParserResult[][];
  ordered: false;
};

type NewlineNode = {
  type: typeof RuleType.newlineCoalescer;
};

type ParagraphNode = {
  type: typeof RuleType.paragraph;
  children: ParserResult[];
};

type ReferenceNode = {
  type: typeof RuleType.ref;
};

type ReferenceImageNode = {
  type: typeof RuleType.refImage;
  alt?: string;
  ref: string;
};

type ReferenceLinkNode = {
  type: typeof RuleType.refLink;
  children: ParserResult[];
  fallbackChildren: string;
  ref: string;
};

type TableNode = {
  type: typeof RuleType.table;
  /**
   * alignment for each table column
   */
  align: ('left' | 'right' | 'center')[];
  cells: ParserResult[][][];
  header: ParserResult[][];
};

type TableSeparatorNode = {
  type: typeof RuleType.tableSeparator;
};

type TextNode = {
  type: typeof RuleType.text;
  text: string;
};

type BoldTextNode = {
  type: typeof RuleType.textBolded;
  children: ParserResult[];
};

type ItalicTextNode = {
  type: typeof RuleType.textEmphasized;
  children: ParserResult[];
};

type EscapedTextNode = {
  type: typeof RuleType.textEscaped;
};

type MarkedTextNode = {
  type: typeof RuleType.textMarked;
  children: ParserResult[];
};

type StrikethroughTextNode = {
  type: typeof RuleType.textStrikethroughed;
  children: ParserResult[];
};

type HTMLNode = {
  type: typeof RuleType.htmlBlock;
  attrs: JSX.IntrinsicAttributes | null;
  children?: ReturnType<NestedParser> | undefined;
  noInnerParse: boolean;
  tag: HTMLTags;
  text?: string | undefined;
};

type HTMLSelfClosingNode = {
  type: typeof RuleType.htmlSelfClosing;
  attrs: JSX.IntrinsicAttributes | null;
  tag: string;
};

type CustomComponentNode = {
  type: typeof RuleType.customComponent;
  attrs: JSX.IntrinsicAttributes | null;
  children?: ReturnType<NestedParser> | undefined;
  noInnerParse: boolean;
  tag: string;
  text?: string | undefined;
};

type ParserResult =
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
  | LinkMailtoNode
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

type NestedParser = (input: string, state: State) => ParserResult[];

type Parser<ParserOutput> = (
  capture: RegExpMatchArray,
  nestedParse: NestedParser,
  state: State
) => ParserOutput;

type RuleOutput = (
  ast: ParserResult | ParserResult[],
  state: State
) => ReactNode;

type Rule<ParserOutput = ParserResult> = {
  _match: (
    source: string,
    state: State,
    prevCapturedString?: string
  ) => RegExpMatchArray | null;
  _order: (typeof Priority)[keyof typeof Priority];
  _parse: Parser<Omit<ParserOutput, 'type'>>;
  /**
   * Optional fast check that can quickly determine if this rule
   * should even be attempted. Should check the start of the source string
   * for quick patterns without expensive regex operations.
   *
   * @param source The input source string (already trimmed of leading whitespace)
   * @param state Current parser state
   * @returns true if the rule should be attempted, false to skip
   */
  _qualify?: string[] | ((source: string, state: State) => boolean);
  _render?: (
    node: ParserOutput,
    /**
     * Continue rendering AST nodes if applicable.
     */
    render: RuleOutput,
    state?: State
  ) => ReactNode;
};

type Rules = {
  [K in ParserResult['type']]: K extends typeof RuleType.table
    ? Rule<Extract<ParserResult, { type: K | typeof RuleType.paragraph }>>
    : Rule<Extract<ParserResult, { type: K }>>;
};

type Override =
  | RequireAtLeastOne<{
      component: any;
      props: Object;
    }>
  | any;

type Overrides = {
  [tag in HTMLTags]?: Override;
} & {
  [customComponent: string]: Override;
};

export type MarkdownProcessorOptions = Partial<{
  /**
   * Ultimate control over the output of all rendered JSX.
   */
  createElement: (
    tag: Parameters<CreateElement>[0],
    props: JSX.IntrinsicAttributes,
    ...children: ReactNode[]
  ) => ReactNode;

  /**
   * The library automatically generates an anchor tag for bare URLs included in the markdown
   * document, but this behavior can be disabled if desired.
   */
  disableAutoLink: boolean;

  /**
   * Disable the compiler's best-effort transcription of provided raw HTML
   * into JSX-equivalent. This is the functionality that prevents the need to
   * use `dangerouslySetInnerHTML` in
   */
  disableParsingRawHTML: boolean;

  /**
   * Forces the compiler to have space between hash sign and the header text which
   * is explicitly stated in the most of the markdown specs.
   * https://github.github.com/gfm/#atx-heading
   * `The opening sequence of # characters must be followed by a space or by the end of line.`
   */
  enforceAtxHeadings: boolean;

  /**
   * Forces the compiler to always output content with a block-level wrapper
   * (`<p>` or any block-level syntax your markdown already contains.)
   */
  forceBlock: boolean;

  /**
   * Forces the compiler to always output content with an inline wrapper (`<span>`)
   */
  forceInline: boolean;

  /**
   * Forces the compiler to wrap results, even if there is only a single
   * child or no children.
   */
  forceWrapper: boolean;

  /**
   * Supply additional HTML entity: unicode replacement mappings.
   *
   * Pass only the inner part of the entity as the key,
   * e.g. `&le;` -> `{ "le": "\u2264" }`
   *
   * By default
   * the following entities are replaced with their unicode equivalents:
   *
   * ```
   * &amp;
   * &apos;
   * &gt;
   * &lt;
   * &nbsp;
   * &quot;
   * ```
   */
  namedCodesToUnicode: {
    [key: string]: string;
  };

  /**
   * Selectively control the output of particular HTML tags as they would be
   * emitted by the compiler.
   */
  overrides: Overrides;

  /**
   * Allows for full control over rendering of particular rules.
   * For example, to implement a LaTeX renderer such as `react-katex`:
   *
   * ```
   * renderRule(next, node, renderChildren, state) {
   *   if (node.type === RuleType.codeBlock && node.lang === 'latex') {
   *     return (
   *       <TeX as="div" key={state.key}>
   *         {String.raw`${node.text}`}
   *       </TeX>
   *     )
   *   }
   *
   *   return next();
   * }
   * ```
   *
   * Thar be dragons obviously, but you can do a lot with this
   * (have fun!) To see how things work internally, check the `render`
   * method in source for a particular rule.
   */
  renderRule: (
    /** Resume normal processing, call this function as a fallback if you are not returning custom JSX. */
    next: () => ReactNode,
    /** the current AST node, use `RuleType` against `node.type` for identification */
    node: ParserResult,
    /** use as `renderChildren(node.children)` for block nodes */
    renderChildren: RuleOutput,
    /** contains `key` which should be supplied to the topmost JSX element */
    state: State
  ) => ReactNode;

  /**
   * Override the built-in sanitizer function for URLs, etc if desired. The built-in version is available as a library export called `sanitizer`.
   */
  sanitizer: (value: string, tag: HTMLTags, attribute: string) => string | null;

  /**
   * Override normalization of non-URI-safe characters for use in generating
   * HTML IDs for anchor linking purposes.
   */
  slugify: (input: string, defaultFn: (input: string) => string) => string;

  /**
   * Declare the type of the wrapper to be used when there are multiple
   * children to render. Set to `null` to get an array of children back
   * without any wrapper, or use `Fragment` to get a React element
   * that won't show up in the DOM.
   */
  wrapper: any | null;
}>;
