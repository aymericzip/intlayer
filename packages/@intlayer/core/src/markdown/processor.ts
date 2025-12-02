/**
 * Framework-agnostic Markdown processor extracted from design-system.
 * Produces AST and renders using an injected createElement callback.
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
  htmlBlock: '11',
  htmlComment: '12',
  htmlSelfClosing: '13',
  customComponent: '34',
  image: '14',
  link: '15',
  linkAngleBraceStyleDetector: '16',
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

const Priority = { MAX: 0, HIGH: 1, MED: 2, LOW: 3, MIN: 4 } as const;

const ATTRIBUTE_TO_PROP = ['allowFullScreen','allowTransparency','autoComplete','autoFocus','autoPlay','cellPadding','cellSpacing','charSet','classId','colSpan','contentEditable','contextMenu','crossOrigin','encType','formAction','formEncType','formMethod','formNoValidate','formTarget','frameBorder','hrefLang','inputMode','keyParams','keyType','marginHeight','marginWidth','maxLength','mediaGroup','minLength','noValidate','radioGroup','readOnly','rowSpan','spellCheck','srcDoc','srcLang','srcSet','tabIndex','useMap'].reduce((obj: any, x) => { obj[x.toLowerCase()] = x; return obj; }, { class: 'className', for: 'htmlFor' });

const namedCodesToUnicodeDefault = { amp: '\u0026', apos: '\u0027', gt: '\u003e', lt: '\u003c', nbsp: '\u00a0', quot: '\u201c' } as const;

const DO_NOT_PROCESS_HTML_ELEMENTS = ['style','script','pre'];
const ATTRIBUTES_TO_SANITIZE = ['src','href','data','formAction','srcDoc','action'];

const ATTR_EXTRACTOR_R = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi;
const BLOCK_END_R = /\n{2,}$/;
const BLOCKQUOTE_R = /^(\s*>[\s\S]*?)(?=\n\n|$)/;
const BLOCKQUOTE_TRIM_LEFT_MULTILINE_R = /^ *> ?/gm;
const BLOCKQUOTE_ALERT_R = /^(?:\[!([^\]]*)\]\n)?([\s\S]*)/;
const BREAK_LINE_R = /^ {2,}\n/;
const BREAK_THEMATIC_R = /^(?:([-*_])( *\1){2,}) *(?:\n *)+\n/;
const CODE_BLOCK_FENCED_R = /^(?: {1,3})?(`{3,}|~{3,}) *(\S+)? *([^\n]*?)?\n([\s\S]*?)(?:\1\n?|$)/;
const CODE_BLOCK_R = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/;
const CODE_INLINE_R = /^(`+)((?:\\`|(?!\1)`|[^`])+)\1/;
const CONSECUTIVE_NEWLINE_R = /^(?:\n *)*\n/;
const CR_NEWLINE_R = /\r\n?/g;
const FOOTNOTE_R = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/;
const FOOTNOTE_REFERENCE_R = /^\[\^([^\]]+)]/;
const FORMFEED_R = /\f/g;
const FRONT_MATTER_R = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/;
const GFM_TASK_R = /^\s*?\[(x|\s)\]/;
const HEADING_R = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
const HEADING_ATX_COMPLIANT_R = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/;
const HEADING_SETEXT_R = /^([^\n]+)\n *(=|-)\2{2,} *\n/;
const HTML_BLOCK_ELEMENT_R = /^ *(?!<[a-zA-Z][^ \/]* ?\/>)<([a-zA-Z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i;
const HTML_CHAR_CODE_R = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
const HTML_COMMENT_R = /^<!--[\s\S]*?(?:-->)/;
const HTML_CUSTOM_ATTR_R = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/;
const HTML_SELF_CLOSING_ELEMENT_R = /^ *<([a-zA-Z][a-zA-Z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i;
const CUSTOM_COMPONENT_R = /^ *<([A-Z][a-zA-Z0-9]*)(?:\s+((?:<.*?>|[^>])*))?>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/;
const INTERPOLATION_R = /^\{.*\}$/;
const LINK_AUTOLINK_BARE_URL_R = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/;
const LINK_AUTOLINK_R = /^<([^ >]+[:@/][^ >]+)>/;
const CAPTURE_LETTER_AFTER_HYPHEN = /-([a-z])?/gi;
const NP_TABLE_R = /^(\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/;
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

const some = (regexes: RegExp[], input: string) => regexes.some((r) => r.test(input));
const LOOKAHEAD = (double: number) => `(?=[\\s\\S]+?\\1${double ? '\\1' : ''})`;
const INLINE_SKIP_R = '((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|\\\\[^\\s]|[\\s\\S])+?)';
const TEXT_BOLD_R = new RegExp(`^([*_])\\1${LOOKAHEAD(1)}${INLINE_SKIP_R}\\1\\1(?!\\1)`);
const TEXT_EMPHASIZED_R = new RegExp(`^([*_])${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1(?!\\1)`);
const TEXT_MARKED_R = new RegExp(`^(==)${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1`);
const TEXT_STRIKETHROUGHED_R = new RegExp(`^(~~)${LOOKAHEAD(0)}${INLINE_SKIP_R}\\1`);
const SHORTCODE_R = /^(:[a-zA-Z0-9-_]+:)/;
const TEXT_ESCAPED_R = /^\\([^0-9A-Za-z\s])/;
const UNESCAPE_R = /\\([^0-9A-Za-z\s])/g;
const TEXT_PLAIN_R = /^[\s\S](?:(?! {2}\n|[0-9]\.|http)[^=*_~\-\n:<`\\[!])*/;
const TRIM_STARTING_NEWLINES = /^\n+/;
const HTML_LEFT_TRIM_AMOUNT_R = /^([ \t]*)/;

type LIST_TYPE = 1 | 2; const ORDERED: LIST_TYPE = 1; const UNORDERED: LIST_TYPE = 2;
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;
const ORDERED_LIST_BULLET = '(?:\\d+\\.)';
const UNORDERED_LIST_BULLET = '(?:[*+-])';

const generateListItemPrefix = (type: LIST_TYPE): string => '( *)(' + (type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET) + ') +';
const ORDERED_LIST_ITEM_PREFIX = generateListItemPrefix(ORDERED);
const UNORDERED_LIST_ITEM_PREFIX = generateListItemPrefix(UNORDERED);
const generateListItemPrefixRegex = (type: LIST_TYPE): RegExp => new RegExp('^' + (type === ORDERED ? ORDERED_LIST_ITEM_PREFIX : UNORDERED_LIST_ITEM_PREFIX));
const ORDERED_LIST_ITEM_PREFIX_R = generateListItemPrefixRegex(ORDERED);
const UNORDERED_LIST_ITEM_PREFIX_R = generateListItemPrefixRegex(UNORDERED);
const generateListItemRegex = (type: LIST_TYPE): RegExp => new RegExp('^' + (type === ORDERED ? ORDERED_LIST_ITEM_PREFIX : UNORDERED_LIST_ITEM_PREFIX) + '[^\\n]*(?:\\n' + '(?!\\1' + (type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET) + ' )[^\\n]*)*(\\n|$)', 'gm');
const ORDERED_LIST_ITEM_R = generateListItemRegex(ORDERED);
const UNORDERED_LIST_ITEM_R = generateListItemRegex(UNORDERED);
const generateListRegex = (type: LIST_TYPE): RegExp => { const bullet = type === ORDERED ? ORDERED_LIST_BULLET : UNORDERED_LIST_BULLET; return new RegExp('^( *)(' + bullet + ') ' + '[\\s\\S]+?(?:\\n{2,}(?! )' + '(?!\\1' + bullet + ' (?!' + bullet + ' ))\\n*' + '|\\s*\\n*$)'); };
const ORDERED_LIST_R = generateListRegex(ORDERED);
const UNORDERED_LIST_R = generateListRegex(UNORDERED);

const slugify = (str: string): string => str
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

const sanitizeUrlExpr = /(javascript|vbscript|data(?!:image)):/i;
export const sanitizer = (input: string): string | null => {
  try {
    const decoded = decodeURIComponent(input).replace(/[^A-Za-z0-9/:]/g, '');
    if (sanitizeUrlExpr.test(decoded)) return null;
  } catch { return null; }
  return input;
};

const trimEnd = (str: string): string => { let end = str.length; while (end > 0 && str[end - 1] <= ' ') end--; return str.slice(0, end); };
const startsWith = (str: string, prefix: string): boolean => str.startsWith(prefix);
const unquote = (str: string): string => { const first = str[0]; if ((first === '"' || first === "'") && str.length >= 2 && str[str.length - 1] === first) return str.slice(1, -1); return str; };

const normalizeWhitespace = (source: string): string => source.replace(CR_NEWLINE_R, '\n').replace(FORMFEED_R, '').replace(TAB_R, '    ');

type HTMLTags = string;

type State = { inAnchor?: boolean; inHTML?: boolean; inline?: boolean; inTable?: boolean; key?: any; list?: boolean; prevCapture?: string; simple?: boolean; };

type ParserResult = any;

type NestedParser = (input: string, state: State) => ParserResult[];
type Parser<ParserOutput> = (capture: RegExpMatchArray, nestedParse: NestedParser, state: State) => ParserOutput;
type RuleOutput = (ast: ParserResult | ParserResult[], state: State) => any;
type Rule<ParserOutput = ParserResult> = { _match: (source: string, state: State, prevCapturedString?: string) => RegExpMatchArray | null; _order: (typeof Priority)[keyof typeof Priority]; _parse: Parser<Omit<ParserOutput, 'type'>>; _qualify?: string[] | ((source: string, state: State) => boolean); _render?: (node: ParserOutput, render: RuleOutput, state?: State) => any; };

type Rules = { [K in string]: Rule<any> };

const allowInline = <T extends (...args: any[]) => any>(fn: T): T & { inline: 1 } => { (fn as any).inline = 1; return fn as T & { inline: 1 }; };
const inlineRegex = (regex: RegExp) => allowInline((source: string, state: State): RegExpMatchArray | null => (state.inline ? regex.exec(source) : null));
const simpleInlineRegex = (regex: RegExp) => allowInline((source: string, state: State): RegExpMatchArray | null => (state.inline || state.simple ? regex.exec(source) : null));
const blockRegex = (regex: RegExp) => (source: string, state: State): RegExpMatchArray | null => (state.inline || state.simple ? null : regex.exec(source));
const anyScopeRegex = (regex: RegExp) => allowInline((source: string): RegExpMatchArray | null => regex.exec(source));

const normalizeAttributeKey = (key: string): string => { const hyphenIndex = key.indexOf('-'); if (hyphenIndex !== -1 && key.match(HTML_CUSTOM_ATTR_R) === null) { key = key.replace(CAPTURE_LETTER_AFTER_HYPHEN, (_, letter) => (letter as string).toUpperCase()); } return key; };

type StyleTuple = [key: string, value: string];
const parseStyleAttribute = (styleString: string): StyleTuple[] => {
  const styles: StyleTuple[] = []; let buffer = ''; let inUrl = false; let inQuotes = false; let quoteChar: '"' | "'" | '' = '';
  if (!styleString) return styles; for (let i = 0; i < styleString.length; i++) { const char = styleString[i]; if ((char === '"' || char === "'") && !inUrl) { if (!inQuotes) { inQuotes = true; quoteChar = char as any; } else if (char === quoteChar) { inQuotes = false; quoteChar = ''; } }
    if (char === '(' && buffer.endsWith('url')) inUrl = true; else if (char === ')' && inUrl) inUrl = false;
    if (char === ';' && !inQuotes && !inUrl) { const declaration = buffer.trim(); if (declaration) { const colonIndex = declaration.indexOf(':'); if (colonIndex > 0) { const key = declaration.slice(0, colonIndex).trim(); const value = declaration.slice(colonIndex + 1).trim(); styles.push([key, value]); } } buffer = ''; } else { buffer += char; } }
  const declaration = buffer.trim(); if (declaration) { const colonIndex = declaration.indexOf(':'); if (colonIndex > 0) { const key = declaration.slice(0, colonIndex).trim(); const value = declaration.slice(colonIndex + 1).trim(); styles.push([key, value]); } }
  return styles;
};

const trimLeadingWhitespaceOutsideFences = (text: string, whitespace: string): string => {
  if (!whitespace) return text; const lines = text.split('\n'); let inFence = false; let fenceToken: string | null = null;
  const isFenceLine = (line: string): RegExpMatchArray | null => line.match(/^\s*(`{3,}|~{3,})/);
  const maybeToggleFence = (line: string): void => { const m = isFenceLine(line); if (!m) return; const token = m[1]; if (!inFence) { inFence = true; fenceToken = token; } else if (fenceToken && line.includes(fenceToken)) { inFence = false; fenceToken = null; } };
  const out = lines.map((line) => { const fenceMatch = isFenceLine(line); if (fenceMatch) { const trimmedFenceLine = line.startsWith(whitespace) ? line.slice(whitespace.length) : line; maybeToggleFence(line); return trimmedFenceLine; } if (inFence) return line; return line.startsWith(whitespace) ? line.slice(whitespace.length) : line; });
  return out.join('\n');
};

const attributeValueToPropValue = (
  tag: HTMLTags,
  key: string,
  value: string,
  sanitizeUrlFn: (value: string, tag: HTMLTags, attribute: string) => string | null
): any => {
  if (key === 'style') {
    return parseStyleAttribute(value).reduce((styles, [k, v]) => {
      const camelCasedKey = k.replace(/(-[a-z])/g, (substr) => substr[1].toUpperCase());
      (styles as Record<string, any>)[camelCasedKey] = sanitizeUrlFn(v, tag, key);
      return styles;
    }, {} as Record<string, any>);
  } else if (ATTRIBUTES_TO_SANITIZE.indexOf(key) !== -1) {
    return sanitizeUrlFn(unescapeString(value), tag, key);
  } else if (value.match(INTERPOLATION_R)) {
    value = unescapeString(value.slice(1, value.length - 1));
  }
  if (value === 'true') return true; else if (value === 'false') return false; return value;
};

const unescapeString = (rawString: string): string => rawString ? rawString.replace(UNESCAPE_R, '$1') : rawString;

const parseInline = (parse: NestedParser, children: string, state: State): ParserResult[] => {
  const isCurrentlyInline = state.inline ?? false; const isCurrentlySimple = state.simple ?? false; state.inline = true; state.simple = true; const result = parse(children, state); state.inline = isCurrentlyInline; state.simple = isCurrentlySimple; return result;
};

const parseSimpleInline = (parse: NestedParser, children: string, state: State): ParserResult[] => {
  const isCurrentlyInline = state.inline ?? false; const isCurrentlySimple = state.simple ?? false; state.inline = false; state.simple = true; const result = parse(children, state); state.inline = isCurrentlyInline; state.simple = isCurrentlySimple; return result;
};

const parseBlock = (parse: NestedParser, children: string, state: State = {}): ParserResult[] => {
  const isCurrentlyInline = state.inline || false; state.inline = false; const normalizedChildren = trimEnd(children); const needsTerminator = /\n\n$/.test(normalizedChildren) === false; const blockInput = needsTerminator ? (normalizedChildren.endsWith('\n') ? `${normalizedChildren}\n` : `${normalizedChildren}\n\n`) : normalizedChildren; const result = parse(blockInput, state); state.inline = isCurrentlyInline; return result;
};

const parseCaptureInline: Parser<{ children: ParserResult[] }> = (capture, parse, state) => ({ children: parseInline(parse, capture[2], state) });
const captureNothing = (): Record<string, never> => ({});
const renderNothing = (): null => null;

const reactFor = (render: any) => (ast: ParserResult | ParserResult[], state: State = {}): any[] => {
  const patchedRender = (ast: ParserResult | ParserResult[], state: State = {}): any[] => reactFor(render)(ast, state);
  if (Array.isArray(ast)) {
    const oldKey = state.key; const result: any[] = []; let lastWasString = false;
    for (let i = 0; i < ast.length; i++) {
      state.key = i; const nodeOut = patchedRender(ast[i], state); const isString = typeof nodeOut === 'string';
      if (isString && lastWasString) result[result.length - 1] = (result[result.length - 1] as string) + nodeOut; else if (nodeOut !== null) result.push(nodeOut);
      lastWasString = isString;
    }
    state.key = oldKey; return result as unknown as any[];
  }
  return render(ast, patchedRender as RuleOutput, state) as unknown as any[];
};

const createRenderer = (rules: Rules, userRender?: (next: () => any, ast: ParserResult, render: RuleOutput, state: State) => any) => (ast: ParserResult, render: RuleOutput, state: State): any => {
  const renderer = rules[(ast as any).type]._render as Rule['_render'] | undefined;
  const result = userRender ? userRender(() => renderer?.(ast, render, state), ast, render, state) : renderer?.(ast, render, state);
  return result;
};

const cx = (...args: any[]): string => args.filter(Boolean).join(' ');
const get = (src: any, path: string, fb?: any): any => { let ptr = src; const frags = path.split('.'); while (frags.length) { ptr = ptr[frags[0]]; if (ptr === undefined) break; else frags.shift(); } return ptr ?? fb; };

const getTag = (tag: string, overrides: Overrides): any => {
  const override = get(overrides, tag); if (!override) return tag;
  return typeof override === 'function' || (typeof override === 'object' && 'render' in override) ? override : get(overrides, `${tag}.component`, tag);
};

export type MarkdownProcessorOptions = Partial<{
  createElement: (tag: any, props: Record<string, any>, ...children: any[]) => any;
  enforceAtxHeadings: boolean;
  disableParsingRawHTML: boolean;
  disableAutoLink: boolean;
  wrapper: string | null;
  forceWrapper: boolean;
  forceInline: boolean;
  forceBlock: boolean;
  overrides: Overrides;
  namedCodesToUnicode: Record<string, string>;
  slugify: (str: string) => string;
  sanitizer: (input: string, tag?: string, attr?: string) => string | null;
  renderRule: (next: () => any, ast: ParserResult, render: RuleOutput, state: State) => any;
}>;

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];
type Override = RequireAtLeastOne<{ component: any; props: Record<string, any>; }> | any;
type Overrides = { [tag in HTMLTags]?: Override } & { [customComponent: string]: Override };

const LINK_INSIDE = '(?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*';
const LINK_HREF_AND_TITLE = '\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'\"]([\\s\\S]*?)[\'\"])?\\s*';
const LINK_R = new RegExp(`^\\[(${LINK_INSIDE})\\]\\(${LINK_HREF_AND_TITLE}\\)`);
const IMAGE_R = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^")"]*)"?\)/;

export const compilerCore = (markdown: string = '', options: MarkdownProcessorOptions = {}): ((createElement: (type: any, props: any, ...children: any[]) => any) => any) => {
  options.overrides = options.overrides ?? {};
  options.namedCodesToUnicode = options.namedCodesToUnicode ? { ...namedCodesToUnicodeDefault, ...options.namedCodesToUnicode } : namedCodesToUnicodeDefault;
  const slug = options.slugify ?? slugify; const sanitize = options.sanitizer ?? sanitizer;

  const NON_PARAGRAPH_BLOCK_SYNTAXES = [BLOCKQUOTE_R, CODE_BLOCK_FENCED_R, CODE_BLOCK_R, options.enforceAtxHeadings ? HEADING_ATX_COMPLIANT_R : HEADING_R, HEADING_SETEXT_R, NP_TABLE_R, ORDERED_LIST_R, UNORDERED_LIST_R];
  const BLOCK_SYNTAXES = [...NON_PARAGRAPH_BLOCK_SYNTAXES, PARAGRAPH_R, HTML_BLOCK_ELEMENT_R, HTML_COMMENT_R, HTML_SELF_CLOSING_ELEMENT_R, CUSTOM_COMPONENT_R];

  const containsBlockSyntax = (input: string): boolean => {
    const cleaned = input.replace(TRIM_STARTING_NEWLINES, ''); const slice = cleaned.length > 2048 ? cleaned.slice(0, 2048) : cleaned; const syntaxes = options.disableParsingRawHTML ? [...NON_PARAGRAPH_BLOCK_SYNTAXES, PARAGRAPH_R, CUSTOM_COMPONENT_R] : BLOCK_SYNTAXES; return some(syntaxes, slice);
  };

  const matchParagraph = (source: string, state: State): RegExpMatchArray | null => {
    if (state.inline || state.simple || (state.inHTML && source.indexOf('\n\n') === -1 && state.prevCapture?.indexOf('\n\n') === -1)) return null;
    let start = 0; while (true) { const newlineIndex = source.indexOf('\n', start); const line = source.slice(start, newlineIndex === -1 ? undefined : newlineIndex + 1); if (some(NON_PARAGRAPH_BLOCK_SYNTAXES, line)) { break; } if (newlineIndex === -1 || !line.trim()) { break; } start = newlineIndex + 1; }
    const match = source.slice(0, start); const captured = trimEnd(match); if (captured === '') return null; return [match, undefined as any, captured] as RegExpMatchArray;
  };

  const h = (tag: HTMLTags, props: Record<string, any>, ...children: any[]): any => {
    const overrideProps = get(options.overrides ?? {}, `${tag}.props`, {}) as Record<string, any>;
    const className = cx(props?.className, overrideProps.className);
    const mergedProps = { ...props, ...overrideProps, ...(className && { className }) };
    const component = getTag(tag, options.overrides ?? {});
    return elFactory(component as any, mergedProps, ...(children.length === 1 ? [children[0]] : children));
  };

  const attrStringToMap = (tag: HTMLTags, str: string): Record<string, any> | null => {
    if (!str || !str.trim()) return null; const attributes = str.match(ATTR_EXTRACTOR_R); if (!attributes) return null; const result = attributes.reduce((map: any, raw) => { const delimiterIdx = raw.indexOf('='); if (delimiterIdx !== -1) { const key = normalizeAttributeKey(raw.slice(0, delimiterIdx)).trim(); const value = unquote(raw.slice(delimiterIdx + 1).trim()); const mappedKey = (ATTRIBUTE_TO_PROP as any)[key] ?? key; if (mappedKey === 'ref') return map; const normalizedValue = attributeValueToPropValue(tag, key, value, sanitize); map[mappedKey] = normalizedValue; if (typeof normalizedValue === 'string' && (HTML_BLOCK_ELEMENT_R.test(normalizedValue) || HTML_SELF_CLOSING_ELEMENT_R.test(normalizedValue))) { map[mappedKey] = compileInner(normalizedValue.trim()); } } else if (raw !== 'style') { map[(ATTRIBUTE_TO_PROP as any)[raw] ?? raw] = true; } return map; }, {});
    return result;
  };

  const rules: Rules = {} as any; const footnotes: { footnote: string; identifier: string }[] = []; const refs: { [key: string]: { target: string; title: string } } = {};

  const parserFor = (rules: Rules): ((source: string, state: State) => ReturnType<NestedParser>) => {
    var ruleList = Object.keys(rules) as Array<keyof typeof rules>;
    ruleList.sort((a, b) => (rules[a] as any)._order - (rules[b] as any)._order || ((a as string) < (b as string) ? -1 : 1));
    const nestedParse = (source: string, state: State = {}): ParserResult[] => {
      const result: ParserResult[] = []; state.prevCapture = state.prevCapture || '';
      if (source.trim()) {
        while (source) {
          let i = 0; while (i < ruleList.length) {
            const ruleType = ruleList[i] as any; const rule = rules[ruleType as any] as any;
            if (rule._qualify && !qualifies(source, state, rule._qualify)) { i++; continue; }
            const capture = rule._match(source, state); if (capture?.[0]) {
              source = source.substring(capture[0].length); const parsedAny: any = rule._parse(capture, nestedParse, state);
              state.prevCapture += capture[0]; if (!parsedAny.type) parsedAny.type = ruleType as any; result.push(parsedAny as ParserResult); break; }
            i++;
          }
        }
      }
      state.prevCapture = '';
      return result;
    };
    return (source: string, state: State) => nestedParse(normalizeWhitespace(source), state);
  };

  const qualifies = (source: string, state: State, qualify: NonNullable<Rule<any>['_qualify']>): boolean => {
    if (Array.isArray(qualify)) { for (let i = 0; i < qualify.length; i++) { if (startsWith(source, qualify[i])) return true; } return false; }
    return (qualify as (source: string, state: State) => boolean)(source, state);
  };

  const ANY_RULES: Rules = {
    [RuleType.blockQuote]: {
      _qualify: ['>'], _match: blockRegex(BLOCKQUOTE_R), _order: Priority.HIGH,
      _parse(capture: RegExpMatchArray, parse: NestedParser, state: State) {
        const matchAlert = capture[0].replace(BLOCKQUOTE_TRIM_LEFT_MULTILINE_R, '').match(BLOCKQUOTE_ALERT_R) as RegExpMatchArray | null; const alert = matchAlert?.[1]; const content = matchAlert?.[2] ?? '';
        const hasNewline = content.indexOf('\n') !== -1; const children = hasNewline ? parseBlock(parse, content, state) : parseInline(parse, content, state);
        return { alert, children };
      },
      _render(node: any, _output: RuleOutput, state: State = {}) { return _h('blockquote', { key: state?.key }, _output(node.children, state as State)); },
    },
  } as any;

  function _h(tag: HTMLTags, props: Record<string, any>, children: any): any { return (elFactory as any)(tag, props, children); }

  const parser = parserFor(ANY_RULES);

  const compileInner = (input: string): any => {
    const result = input.replace(FRONT_MATTER_R, ''); let inline = false;
    if (options.forceInline) inline = true; else if (!options.forceBlock) { const leadingNewlinesTrimmed = result.replace(TRIM_STARTING_NEWLINES, ''); inline = SHOULD_RENDER_AS_BLOCK_R.test(leadingNewlinesTrimmed) === false; }
    const arr = emitter(parser(inline ? result : `${trimEnd(result).replace(TRIM_STARTING_NEWLINES, '')}\n\n`, { inline }), { inline }) as unknown as any[];
    while (typeof arr[arr.length - 1] === 'string' && !arr[arr.length - 1].trim()) arr.pop();
    if (options.wrapper === null) return arr as unknown as any; const wrapper = options.wrapper ?? (inline ? 'span' : 'div'); let jsx: any | any[] | null;
    if (arr.length > 1 || options.forceWrapper) jsx = arr; else if (arr.length === 1) jsx = arr[0]; else jsx = null;
    return elFactory(wrapper, { key: 'outer' }, jsx) as any;
  };

  let elFactory: (type: any, props: any, ...children: any[]) => any = (type, props, ...children) => [type, props, ...children];
  const emitter: (ast: ParserResult | ParserResult[], state: State) => any[] = reactFor(createRenderer(ANY_RULES, options.renderRule));

  return (createElement: (type: any, props: any, ...children: any[]) => any) => { elFactory = createElement; return compileInner(markdown); };
};

export type { State, Rules };