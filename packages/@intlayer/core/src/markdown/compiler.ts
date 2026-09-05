import {
  ATTR_EXTRACTOR_R,
  ATTRIBUTE_TO_NODE_PROP_MAP,
  BLOCK_END_R,
  BLOCKQUOTE_ALERT_R,
  BLOCKQUOTE_R,
  BLOCKQUOTE_TRIM_LEFT_MULTILINE_R,
  BREAK_LINE_R,
  BREAK_THEMATIC_R,
  CODE_BLOCK_FENCED_R,
  CODE_BLOCK_R,
  CODE_INLINE_R,
  CONSECUTIVE_NEWLINE_R,
  DO_NOT_PROCESS_HTML_ELEMENTS,
  FOOTNOTE_R,
  FOOTNOTE_REFERENCE_R,
  FRONT_MATTER_R,
  GFM_TASK_R,
  HEADING_ATX_COMPLIANT_R,
  HEADING_R,
  HEADING_SETEXT_R,
  HTML_CHAR_CODE_R,
  HTML_COMMENT_R,
  HTML_LEFT_TRIM_AMOUNT_R,
  LINK_AUTOLINK_BARE_URL_R,
  LINK_AUTOLINK_R,
  type ListType,
  NAMED_CODES_TO_UNICODE,
  NP_TABLE_R,
  ORDERED,
  ORDERED_LIST_ITEM_PREFIX_R,
  ORDERED_LIST_ITEM_R,
  ORDERED_LIST_R,
  PARAGRAPH_R,
  Priority,
  REFERENCE_IMAGE_OR_LINK,
  REFERENCE_IMAGE_R,
  REFERENCE_LINK_R,
  RuleType,
  SHORTCODE_R,
  SHOULD_RENDER_AS_BLOCK_R,
  TEXT_BOLD_R,
  TEXT_EMPHASIZED_R,
  TEXT_ESCAPED_R,
  TEXT_MARKED_R,
  TEXT_PLAIN_R,
  TEXT_STRIKETHROUGHED_R,
  TRIM_STARTING_NEWLINES,
  UNORDERED,
  UNORDERED_LIST_ITEM_PREFIX_R,
  UNORDERED_LIST_ITEM_R,
  UNORDERED_LIST_R,
} from './constants';
import {
  matchCustomComponent,
  matchHtmlBlockElement,
  matchSelfClosingElement,
  startsWithCustomComponent,
  startsWithElement,
  startsWithHtmlBlockElement,
  startsWithSelfClosingElement,
} from './elementScanner';
import { parserFor } from './parser';
import { createRenderer, renderFor } from './renderer';
import type {
  CompileOptions,
  ComponentOverrides as ComponentDefinition,
  HeadingNode,
  HTMLTag,
  MarkdownContext,
  MarkdownOptions,
  MarkdownRuntime,
  OrderedListNode,
  ParseState,
  Rule,
  Rules,
  TableNode,
  UnorderedListNode,
} from './types';
import {
  allowInline,
  anyScopeRegex,
  attributeValueToNodePropValue,
  type BlockSyntaxProbe,
  blockRegex,
  captureNothing,
  cx,
  sanitizer as defaultSanitizer,
  slugify as defaultSlugify,
  get,
  inlineRegex,
  normalizeAttributeKey,
  parseBlock,
  parseCaptureInline,
  parseInline,
  parseSimpleInline,
  parseTableAlign,
  parseTableCells,
  parseTableRow,
  renderNothing,
  simpleInlineRegex,
  some,
  startsWith,
  trimEnd,
  trimLeadingWhitespaceOutsideFences,
  unescapeString,
  unquote,
} from './utils';

type CreateElementFunction = (
  tag: any,
  props: Record<string, any> | null,
  ...children: any[]
) => unknown;

type FootnoteDef = { footnote: string; identifier: string };

const IMAGE_R = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;
const LINK_INSIDE =
  '(?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*';
const LINK_HREF_AND_TITLE =
  '\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'"]([\\s\\S]*?)[\'"])?\\s*';
const LINK_R = new RegExp(
  `^\\[(${LINK_INSIDE})\\]\\(${LINK_HREF_AND_TITLE}\\)`
);

/**
 * Case-insensitive `</tag>` probes, cached per tag name.
 *
 * The `htmlBlock` rule is qualified at every candidate position, and it used to
 * lowercase the whole remaining document to look its closing tag up — copying
 * the rest of the file on each probe.
 */
/**
 * Builds a tag -> component resolver for one set of overrides.
 *
 * The case-insensitive fallback used to rescan every override key on each
 * element created; the lowercase index is now built once per document instead.
 */
const createTagResolver = (components: ComponentDefinition<any>) => {
  let lowercaseKeys: Map<string, string> | null = null;

  // With no overrides declared — the common case — every tag resolves to
  // itself, so the whole lookup is skipped.
  if (Object.keys(components).length === 0) return (tag: any): any => tag;

  const resolved = new Map<string, any>();

  return (tag: any): any => {
    if (typeof tag !== 'string') return tag;

    const memoized = resolved.get(tag);
    if (memoized !== undefined) return memoized;

    const override = get(components, tag);

    if (override) {
      resolved.set(tag, override);
      return override;
    }

    if (!lowercaseKeys) {
      lowercaseKeys = new Map();

      // Later keys win, matching `Array.prototype.find` on `Object.keys`
      // only when they are unique — so the first key of a given lowercase
      // form is kept, as before.
      for (const key of Object.keys(components)) {
        const lowercased = key.toLowerCase();

        if (!lowercaseKeys.has(lowercased)) lowercaseKeys.set(lowercased, key);
      }
    }

    const key = lowercaseKeys.get(tag.toLowerCase());
    const result = (key ? get(components, key) : undefined) || tag;

    resolved.set(tag, result);

    return result;
  };
};

/** Resolves the slugifier for a context, falling back to the built-in one. */
const createSlugger =
  (ctx: MarkdownContext<any>) =>
  (input: string): string =>
    ctx.slugify ? ctx.slugify(input, defaultSlugify) : defaultSlugify(input);

const createElementFactory = (
  ctx: MarkdownContext<any>,
  options: MarkdownOptions
): CreateElementFunction => {
  const { runtime, components = {} } = ctx;
  const resolveTag = createTagResolver(components);
  const filteredTags = options.tagfilter
    ? new Set([
        'title',
        'textarea',
        'style',
        'xmp',
        'iframe',
        'noembed',
        'noframes',
        'script',
        'plaintext',
      ])
    : null;

  /**
   * True when `props` can be handed to the runtime untouched: no `class`
   * alias to fold into `className`, and no empty value to drop. Rules build a
   * fresh literal for every element, so reusing it is safe, and it saves an
   * object per element — the single largest allocation in the render phase.
   */
  const needsPropsRewrite = (props: Record<string, any>): boolean => {
    for (const key in props) {
      if (key === 'className' || key === 'class') return true;

      const value = props[key];
      if (value === undefined || value === null) return true;
    }

    return false;
  };

  return (
    tag: any,
    props: Record<string, any> | null,
    ...children: any[]
  ): unknown => {
    const isStringTag = typeof tag === 'string';

    if (filteredTags && isStringTag && filteredTags.has(tag.toLowerCase())) {
      return null;
    }

    let finalProps: Record<string, any>;

    if (!props) {
      finalProps = {};
    } else if (!needsPropsRewrite(props)) {
      finalProps = props;
    } else {
      const className = cx(props.className, props.class);
      const mergedProps: Record<string, any> = {};
      let classNameHandled = false;

      // Preserve attribute order while merging className
      for (const key in props) {
        const value = props[key];

        if (value === undefined || value === null) continue;

        if (key === 'className' || key === 'class') {
          if (!classNameHandled) {
            if (className) mergedProps.className = className;
            classNameHandled = true;
          }
        } else {
          mergedProps[key] = value;
        }
      }

      if (!classNameHandled && className) {
        mergedProps.className = className;
      }

      finalProps = mergedProps;
    }

    if (runtime.normalizeProps && isStringTag)
      finalProps = runtime.normalizeProps(tag as string, finalProps);

    const component = resolveTag(tag);

    // Spreading a one-element array allocated a second array per element.
    if (children.length === 1) {
      return runtime.createElement(component, finalProps, children[0]);
    }

    return runtime.createElement(component, finalProps, ...children);
  };
};

/**
 * Footnote and reference tables belonging to the document currently being
 * parsed or rendered. Rules reach them through a ref so a rule set can outlive
 * a single document and be reused.
 */
type DocumentScope = {
  footnotes: FootnoteDef[];
  references: MarkdownReferences;
};

type DocumentScopeRef = { current: DocumentScope };

const createDocumentScope = (): DocumentScope => ({
  footnotes: [],
  references: {},
});

/**
 * A cached rule set, together with the values it was built from. The signature
 * holds every input that changes the shape of the rules; anything else (the
 * markdown itself, the document scope) is free to vary between uses.
 */
type DocumentParser = ReturnType<typeof parserFor>;
type DocumentEmitter = ReturnType<typeof renderFor>;

type RuleSetCacheEntry = {
  /** The inputs this set was built from, compared field by field on lookup. */
  ctx: MarkdownContext<any>;
  options: MarkdownOptions;
  parseOnly: boolean;
  createElement: CreateElementFunction;
  scope: DocumentScopeRef;
  /**
   * Built with the rules, not per call. `parserFor` resolves precedence and
   * fills the first-character dispatch tables, and `renderFor` walks the rule
   * set — repeating either for every string was most of what compiling a
   * dictionary of short strings cost.
   */
  parse: DocumentParser;
  emit: DocumentEmitter;
};

/**
 * Small enough to scan linearly, large enough that an app mixing a few option
 * sets — say prose and a dictionary rendered with different components — keeps
 * hitting it.
 */
const RULE_SET_CACHE_LIMIT = 8;

const ruleSetCache: RuleSetCacheEntry[] = [];

/**
 * Every input that changes how rules are built. Compared directly rather than
 * through a signature array, which would allocate on every compile.
 */
const builtFromSame = (
  entry: RuleSetCacheEntry,
  ctx: MarkdownContext<any>,
  options: MarkdownOptions,
  parseOnly: boolean
): boolean =>
  entry.parseOnly === parseOnly &&
  entry.ctx.runtime === ctx.runtime &&
  entry.ctx.components === ctx.components &&
  entry.ctx.namedCodesToUnicode === ctx.namedCodesToUnicode &&
  entry.ctx.sanitizer === ctx.sanitizer &&
  entry.ctx.slugify === ctx.slugify &&
  entry.options.disableAutoLink === options.disableAutoLink &&
  entry.options.disableParsingRawHTML === options.disableParsingRawHTML &&
  entry.options.enforceAtxHeadings === options.enforceAtxHeadings &&
  entry.options.tagfilter === options.tagfilter &&
  entry.options.renderRule === options.renderRule;

/**
 * Returns the rule set for these options, building it only when no cached set
 * was made from the same inputs.
 */
const getRuleSet = (
  ctx: MarkdownContext<any>,
  options: MarkdownOptions,
  parseOnly: boolean
): RuleSetCacheEntry => {
  for (let index = 0; index < ruleSetCache.length; index++) {
    const entry = ruleSetCache[index]!;
    if (!builtFromSame(entry, ctx, options, parseOnly)) continue;

    // Most-recently-used first, so the hot option set stays at the front.
    if (index > 0) {
      ruleSetCache.splice(index, 1);
      ruleSetCache.unshift(entry);
    }
    return entry;
  }

  const scope: DocumentScopeRef = { current: createDocumentScope() };
  const createElement = parseOnly
    ? noopCreateElement
    : createElementFactory(ctx, options);
  const rules = createDocumentRules(createElement, ctx, options, scope);
  const entry: RuleSetCacheEntry = {
    ctx,
    options,
    parseOnly,
    createElement,
    scope,
    parse: parserFor(rules),
    emit: renderFor(createRenderer(rules, options.renderRule)),
  };

  ruleSetCache.unshift(entry);
  if (ruleSetCache.length > RULE_SET_CACHE_LIMIT) ruleSetCache.pop();

  return entry;
};

/**
 * Runs `operation` with `scope` installed as the current document, restoring
 * whatever was there before. The save/restore keeps a nested compile — a custom
 * component that renders markdown of its own — from clobbering its caller.
 */
const withDocumentScope = <TResult>(
  ref: DocumentScopeRef,
  scope: DocumentScope,
  operation: () => TResult
): TResult => {
  const previous = ref.current;
  ref.current = scope;
  try {
    return operation();
  } finally {
    ref.current = previous;
  }
};

const createRules = (
  createElement: CreateElementFunction,
  ctx: MarkdownContext<any>,
  options: MarkdownOptions,
  scope: DocumentScopeRef,
  attrStringToMap: (tag: HTMLTag, str: string) => Record<string, any> | null,
  containsBlockSyntax: (input: string) => boolean,
  nonParagraphBlockSyntaxes: BlockSyntaxProbe[]
): Rules => {
  const slug = createSlugger(ctx);
  const sanitize = ctx.sanitizer ?? defaultSanitizer;
  const namedCodesToUnicode = ctx.namedCodesToUnicode
    ? { ...NAMED_CODES_TO_UNICODE, ...ctx.namedCodesToUnicode }
    : NAMED_CODES_TO_UNICODE;

  /**
   * Raw HTML blocks and custom components differ only in how their tag is
   * spelled: both trim the captured content, decide block or inline parsing
   * from it, and render the tag with its attributes. `rawHtml` adds the two
   * things only real HTML needs — the never-parse element list, and tracking
   * whether we are inside an anchor.
   */
  const pairedElementRule = (
    match: (source: string) => RegExpMatchArray | null,
    order: number,
    rawHtml: boolean
  ): Rule<any> => ({
    _qualify: ['<'],
    _match: anyScopeRegex(match),
    _order: order,
    _parse(capture, parse, state) {
      const content = capture[3];
      const whitespace = content.match(HTML_LEFT_TRIM_AMOUNT_R)?.[1] ?? '';
      const trimmed = trimLeadingWhitespaceOutsideFences(content, whitespace);
      const parseFunc = containsBlockSyntax(trimmed) ? parseBlock : parseInline;
      const tagName = capture[1].trim();
      const lowercased = tagName.toLowerCase();
      const noInnerParse =
        rawHtml && DO_NOT_PROCESS_HTML_ELEMENTS.indexOf(lowercased) !== -1;
      const tag = (noInnerParse ? lowercased : tagName) as HTMLTag;
      const ast: any = {
        attrs: attrStringToMap(tag, capture[2] ?? ''),
        noInnerParse,
        tag,
      };

      if (rawHtml) state.inAnchor = state.inAnchor || lowercased === 'a';

      if (noInnerParse) {
        ast.text = content;
      } else {
        const prevInHTML = state.inHTML;
        state.inHTML = true;
        ast.children = parseFunc(parse, trimmed, state);
        state.inHTML = prevInHTML;
      }

      if (rawHtml) state.inAnchor = false;

      return ast;
    },
    _render(node, output, state = {}) {
      return createElement(
        node.tag,
        { key: state.key, ...(node.attrs ?? {}) },
        node.text ?? (node.children ? output(node.children, state) : '')
      );
    },
  });

  const generateListRule = (
    type: ListType
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
        const lineIndent = state.prevCaptureIndent;
        const isStartOfLine = lineIndent !== undefined;
        const isListAllowed = state.list ?? (!state.inline && !state.simple);

        if (isStartOfLine && isListAllowed) {
          const matchSource = lineIndent ? lineIndent + source : source;

          return LIST_R.exec(matchSource);
        }

        return null;
      }),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const bullet = capture[2];
        const startValue = ordered ? +bullet.slice(0, -1) : undefined;
        const items = capture[0]
          .replace(BLOCK_END_R, '\n')
          .match(LIST_ITEM_R) as string[];

        if (!items) return { items: [], ordered, start: startValue } as any;

        let lastItemWasAParagraph = false;

        const result = items.map((item, i) => {
          const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
          const space = prefixCapture ? prefixCapture[0].length : 0;
          const spaceRegex = new RegExp(`^ {1,${space}}`, 'gm');
          const content = item
            .replace(spaceRegex, '')
            .replace(LIST_ITEM_PREFIX_R, '');
          const isLastItem = i === items.length - 1;
          const containsBlocks = content.indexOf('\n\n') !== -1;
          const thisItemIsAParagraph =
            containsBlocks || (isLastItem && lastItemWasAParagraph);
          lastItemWasAParagraph = thisItemIsAParagraph;

          const oldStateInline = state.inline;
          const oldStateList = state.list;
          state.list = true;

          let adjustedContent: string;

          if (thisItemIsAParagraph) {
            state.inline = false;
            adjustedContent = `${trimEnd(content)}\n\n`;
          } else {
            state.inline = true;
            adjustedContent = trimEnd(content);
          }

          const parsed = parse(adjustedContent, state);
          state.inline = oldStateInline;
          state.list = oldStateList;

          return parsed;
        });

        return { items: result, ordered, start: startValue } as any;
      },
      _render(node, output, state = {}) {
        const Tag = node.ordered ? 'ol' : 'ul';
        const props: Record<string, any> = { key: state.key };

        if (node.ordered && node.start != null) props.start = node.start;

        return createElement(
          Tag,
          props,
          ...node.items.map((item, i) =>
            createElement('li', { key: i }, output(item, state))
          )
        );
      },
    };
  };

  const matchParagraph = (
    source: string,
    state: ParseState
  ): RegExpMatchArray | null => {
    if (
      state.inline ||
      state.simple ||
      (state.inHTML &&
        source.indexOf('\n\n') === -1 &&
        !state.prevCaptureHasBlankLine)
    )
      return null;
    let start = 0;
    while (true) {
      const newlineIndex = source.indexOf('\n', start);
      const line = source.slice(
        start,
        newlineIndex === -1 ? undefined : newlineIndex + 1
      );

      if (some(nonParagraphBlockSyntaxes, line)) break;

      if (newlineIndex === -1 || !line.trim()) break;
      start = newlineIndex + 1;
    }
    const match = source.slice(0, start);
    // Align with original simple-markdown behavior: capture the whole match including newlines

    if (match === '') return null;
    const captured = trimEnd(match);

    if (captured === '') return null;

    return [match, undefined, captured] as unknown as RegExpMatchArray;
  };

  const rules: Rules = {
    [RuleType.blockQuote]: {
      _qualify: ['>'],
      _match: blockRegex(BLOCKQUOTE_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const matchAlert = capture[0]
          .replace(BLOCKQUOTE_TRIM_LEFT_MULTILINE_R, '')
          .match(BLOCKQUOTE_ALERT_R);
        const alert = matchAlert?.[1];
        const content = matchAlert?.[2] ?? '';
        const hasNewline = content.indexOf('\n') !== -1;
        const children = hasNewline
          ? parseBlock(parse, content, state)
          : parseInline(parse, content, state);

        return { alert, children };
      },
      _render(node, output, state = {}) {
        const props: Record<string, any> = { key: state.key };

        if (node.alert) {
          props.className = `markdown-alert-${slug(node.alert.toLowerCase())}`;
          node.children.unshift({
            attrs: {},
            children: [{ type: RuleType.text, text: node.alert }],
            noInnerParse: true,
            type: RuleType.htmlBlock,
            tag: 'header',
          } as any);
        }

        return createElement('blockquote', props, output(node.children, state));
      },
    },
    [RuleType.breakLine]: {
      _qualify: ['  '],
      _match: anyScopeRegex(BREAK_LINE_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render(_, __, state = {}) {
        return createElement('br', { key: state.key });
      },
    },
    [RuleType.breakThematic]: {
      _qualify: ['--', '__', '**', '- ', '* ', '_ '],
      _match: blockRegex(BREAK_THEMATIC_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render(_, __, state = {}) {
        return createElement('hr', { key: state.key });
      },
    },
    [RuleType.codeBlock]: {
      _qualify: ['    '],
      _match: blockRegex(CODE_BLOCK_R),
      _order: Priority.MAX,
      _parse(capture) {
        return {
          type: RuleType.codeBlock,
          lang: undefined,
          text: unescapeString(trimEnd(capture[0].replace(/^ {4}/gm, ''))),
        };
      },
      _render(node, _, state = {}) {
        const attrs = { ...((node as any).attrs ?? {}) } as Record<string, any>;
        const langClass = node.lang ? `lang-${node.lang}` : 'lang-plaintext';
        attrs.className = attrs.className
          ? `${attrs.className} ${langClass}`
          : langClass;

        return createElement(
          'pre',
          { key: state.key },
          createElement('code', attrs, node.text)
        );
      },
    },
    [RuleType.codeFenced]: {
      _qualify: ['```', '~~~'],
      _match: blockRegex(CODE_BLOCK_FENCED_R),
      _order: Priority.MAX,
      _parse(capture) {
        return {
          attrs: attrStringToMap('code', capture[3] ?? ''),
          lang: capture[2] || undefined,
          text: capture[4],
          type: RuleType.codeBlock,
        };
      },
    },
    [RuleType.codeInline]: {
      _qualify: ['`'],
      _match: simpleInlineRegex(CODE_INLINE_R),
      _order: Priority.LOW,
      _parse(capture) {
        return { text: unescapeString(capture[2]) };
      },
      _render(node, _, state = {}) {
        return createElement('code', { key: state.key }, node.text);
      },
    },
    [RuleType.footnote]: {
      _qualify: ['[^'],
      _match: blockRegex(FOOTNOTE_R),
      _order: Priority.MAX,
      _parse(capture) {
        scope.current.footnotes.push({
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
      _parse(capture) {
        return { target: `#${slug(capture[1])}`, text: capture[1] };
      },
      _render(node, _, state = {}) {
        return createElement(
          'a',
          {
            key: state.key,
            href: sanitize(node.target, 'a', 'href') ?? undefined,
          },
          createElement('sup', { key: state.key }, node.text)
        );
      },
    },
    [RuleType.gfmTask]: {
      _qualify: ['[ ]', '[x]'],
      _match: inlineRegex(GFM_TASK_R),
      _order: Priority.HIGH,
      _parse(capture) {
        return { completed: capture[1].toLowerCase() === 'x' };
      },
      _render(node, _, state = {}) {
        return createElement('input', {
          checked: node.completed,
          key: state.key,
          readOnly: true,
          type: 'checkbox',
        });
      },
    },
    [RuleType.heading]: {
      _qualify: ['#'],
      _match: blockRegex(
        options.enforceAtxHeadings ? HEADING_ATX_COMPLIANT_R : HEADING_R
      ),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        return {
          children: parseInline(parse, capture[2], state),
          id: slug(capture[2]),
          level: capture[1].length as HeadingNode['level'],
        };
      },
      _render(node, output, state = {}) {
        return createElement(
          `h${node.level}` as HTMLTag,
          { id: node.id, key: state.key },
          output(node.children, state)
        );
      },
    },
    [RuleType.headingSetext]: {
      _qualify: (source) => {
        const nlIndex = source.indexOf('\n');

        return (
          nlIndex > 0 &&
          nlIndex < source.length - 1 &&
          (source[nlIndex + 1] === '=' || source[nlIndex + 1] === '-')
        );
      },
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
    [RuleType.htmlBlock]: pairedElementRule(
      // The rule is dropped outright when raw HTML is disabled, and the scanner
      // rejects anything that is not a complete element, so `<` is the whole
      // qualification — and a prefix lets the parser bucket the rule by first
      // character instead of trying it everywhere.
      matchHtmlBlockElement,
      Priority.HIGH,
      true
    ),
    [RuleType.htmlComment]: {
      _qualify: ['<!'],
      _match: anyScopeRegex(HTML_COMMENT_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render: renderNothing,
    },
    [RuleType.htmlSelfClosing]: {
      _qualify: ['<'],
      _match: anyScopeRegex(matchSelfClosingElement),
      _order: Priority.HIGH,
      _parse(capture) {
        const tag = capture[1].trim() as HTMLTag;

        return { attrs: attrStringToMap(tag, capture[2] || ''), tag };
      },
      _render(node, _, state = {}) {
        return createElement(node.tag, {
          key: state.key,
          ...(node.attrs ?? {}),
        });
      },
    },
    [RuleType.customComponent]: pairedElementRule(
      matchCustomComponent,
      Priority.MAX,
      false
    ),
    [RuleType.paragraph]: {
      _match: matchParagraph,
      _order: Priority.LOW,
      _parse: parseCaptureInline,
      _render(node, output, state = {}) {
        return createElement(
          'p',
          { key: state.key },
          output(node.children, state)
        );
      },
    },
    [RuleType.image]: {
      _qualify: ['!['],
      _match: simpleInlineRegex(IMAGE_R),
      _order: Priority.HIGH,
      _parse(capture) {
        return {
          alt: unescapeString(capture[1]),
          target: unescapeString(capture[2]),
          title: unescapeString(capture[3]),
        };
      },
      _render(node, _, state = {}) {
        return createElement('img', {
          key: state.key,
          alt: node.alt ?? undefined,
          title: node.title ?? undefined,
          src: sanitize(node.target, 'img', 'src') ?? undefined,
        });
      },
    },
    [RuleType.link]: {
      _qualify: ['['],
      _match: inlineRegex(LINK_R),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[1], state),
          target: unescapeString(capture[2]),
          title: unescapeString(capture[3]),
        };
      },
      _render(node, output, state = {}) {
        const sanitizedHref = sanitize(node.target, 'a', 'href');
        return createElement(
          'a',
          {
            key: state.key,
            href: sanitizedHref ?? undefined,
            title: node.title ?? undefined,
          },
          output(node.children, state)
        );
      },
    },
    [RuleType.linkAngleBraceStyleDetector]: {
      _qualify: ['<'],
      _match: inlineRegex(LINK_AUTOLINK_R),
      _order: Priority.MAX,
      _parse(capture) {
        let target = capture[1];
        let isEmail = false;

        if (target.indexOf('@') !== -1 && target.indexOf('//') === -1) {
          isEmail = true;
          target = target.replace('mailto:', '');
        }

        return {
          children: [{ text: target, type: RuleType.text }],
          target: isEmail ? `mailto:${target}` : target,
          type: RuleType.link,
        };
      },
    },
    [RuleType.linkBareUrlDetector]: {
      _qualify: (source, state) =>
        !!(
          state.inline &&
          !state.inAnchor &&
          !options.disableAutoLink &&
          (startsWith(source, 'http://') || startsWith(source, 'https://'))
        ),
      _match: inlineRegex(LINK_AUTOLINK_BARE_URL_R),
      _order: Priority.MAX,
      _parse(capture) {
        return {
          children: [{ text: capture[1], type: RuleType.text }],
          target: capture[1],
          type: RuleType.link,
        };
      },
    },
    [RuleType.newlineCoalescer]: {
      _match: blockRegex(CONSECUTIVE_NEWLINE_R),
      _order: Priority.LOW,
      _parse: captureNothing,
      _render() {
        return '\n';
      },
    },
    [RuleType.orderedList]: generateListRule(ORDERED),
    [RuleType.unorderedList]: generateListRule(UNORDERED),
    [RuleType.ref]: {
      _qualify: ['['],
      _match: anyScopeRegex(REFERENCE_IMAGE_OR_LINK),
      _order: Priority.MAX,
      _parse(capture) {
        const identifier = capture[1];

        if (identifier !== undefined) {
          scope.current.references[identifier] = {
            target: capture[2],
            title: capture[4],
          };
        }

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
          alt: capture[1] ? unescapeString(capture[1]) : undefined,
          ref: capture[2],
        };
      },
      _render(node, _, state = {}) {
        const ref = scope.current.references[node.ref];

        if (!ref) return null;

        return createElement('img', {
          key: state.key,
          alt: node.alt,
          src: sanitize(ref.target, 'img', 'src') ?? undefined,
          title: ref.title,
        });
      },
    },
    [RuleType.refLink]: {
      _qualify: (source) => source[0] === '[' && source.indexOf('](') === -1,
      _match: inlineRegex(REFERENCE_LINK_R),
      _order: Priority.MAX,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[1], state),
          fallbackChildren: capture[0],
          ref: capture[2],
        };
      },
      _render(node, output, state = {}) {
        const ref = scope.current.references[node.ref];

        if (!ref)
          return createElement(
            'span',
            { key: state.key },
            node.fallbackChildren
          );

        return createElement(
          'a',
          {
            key: state.key,
            href: sanitize(ref.target, 'a', 'href') ?? undefined,
            title: ref.title,
          },
          output(node.children, state)
        );
      },
    },
    [RuleType.table]: {
      _qualify: ['|'],
      _match: blockRegex(NP_TABLE_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        state.inline = true;
        const align = capture[2] ? parseTableAlign(capture[2]) : [];
        const cells = capture[3]
          ? parseTableCells(capture[3], parse, state)
          : [];
        const header = parseTableRow(capture[1], parse, state, !!cells.length);
        state.inline = false;

        return cells.length
          ? { align, cells, header, type: RuleType.table }
          : { children: header.flat(), type: RuleType.paragraph };
      },
      _render(node, output, state = {}) {
        const table = node as TableNode;
        const getStyle = (i: number) =>
          table.align[i] && table.align[i] !== 'left'
            ? { textAlign: table.align[i] }
            : {};

        return createElement(
          'table',
          { key: state.key },
          createElement(
            'thead',
            null,
            createElement(
              'tr',
              null,
              ...table.header.map((c, i) =>
                createElement(
                  'th',
                  { key: i, style: getStyle(i) },
                  output(c, state)
                )
              )
            )
          ),
          createElement(
            'tbody',
            null,
            ...table.cells.map((row, i) =>
              createElement(
                'tr',
                { key: i },
                ...row.map((c, j) =>
                  createElement(
                    'td',
                    { key: j, style: getStyle(j) },
                    output(c, state)
                  )
                )
              )
            )
          )
        );
      },
    },
    [RuleType.tableSeparator]: {
      _match: (source, state) =>
        state.inTable && source[0] === '|' ? /^\|/.exec(source) : null,
      _order: Priority.HIGH,
      _parse() {
        return { type: RuleType.tableSeparator };
      },
      _render() {
        return ' | ';
      },
    },
    [RuleType.text]: {
      _match: allowInline((source, _state) => {
        const shortMatch = SHORTCODE_R.exec(source);

        if (shortMatch) return shortMatch;

        return TEXT_PLAIN_R.exec(source) || /^[\s\S]/.exec(source);
      }),
      _order: Priority.MIN,
      _parse(capture) {
        const text = capture[0];

        return {
          text:
            text.indexOf('&') === -1
              ? text
              : text.replace(HTML_CHAR_CODE_R, (f, i) => {
                  if (i.startsWith('#x'))
                    return String.fromCharCode(parseInt(i.slice(2), 16));
                  if (i.startsWith('#'))
                    return String.fromCharCode(parseInt(i.slice(1), 10));
                  return namedCodesToUnicode[i] || f;
                }),
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
        return { children: parse(capture[2], state) };
      },
      _render(node, output, state = {}) {
        return createElement(
          'strong',
          { key: state.key },
          output(node.children, state)
        );
      },
    },
    [RuleType.textEmphasized]: {
      _qualify: ['*', '_'],
      _match: simpleInlineRegex(TEXT_EMPHASIZED_R),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        return { children: parse(capture[2], state) };
      },
      _render(node, output, state = {}) {
        return createElement(
          'em',
          { key: state.key },
          output(node.children, state)
        );
      },
    },
    [RuleType.textEscaped]: {
      _qualify: ['\\'],
      _match: simpleInlineRegex(TEXT_ESCAPED_R),
      _order: Priority.HIGH,
      _parse(capture) {
        return { text: capture[1], type: RuleType.text };
      },
    },
    [RuleType.textMarked]: {
      _qualify: ['=='],
      _match: simpleInlineRegex(TEXT_MARKED_R),
      _order: Priority.LOW,
      _parse: parseCaptureInline,
      _render(node, output, state = {}) {
        return createElement(
          'mark',
          { key: state.key },
          output(node.children, state)
        );
      },
    },
    [RuleType.textStrikethroughed]: {
      _qualify: ['~~'],
      _match: simpleInlineRegex(TEXT_STRIKETHROUGHED_R),
      _order: Priority.LOW,
      _parse: parseCaptureInline,
      _render(node, output, state = {}) {
        return createElement(
          'del',
          { key: state.key },
          output(node.children, state)
        );
      },
    },
  };

  return rules;
};

// Removed compilerCache completely to avoid issues with props changes not invalidating cache
// const compilerCache = new Map<string, unknown>();

/** Link/image reference definitions (`[id]: target "title"`) collected while parsing. */
export type MarkdownReferences = Record<
  string,
  { target: string; title?: string }
>;

export type ParsedMarkdown = {
  ast: any[];
  footnotes: FootnoteDef[];
  /**
   * Reference definitions gathered during parsing. They must be carried over to
   * the render stage, since `refLink` / `refImage` nodes only store the
   * reference id and resolve their target at render time.
   */
  references: MarkdownReferences;
  inline: boolean;
};

/**
 * `createElement` is only ever reached from a rule's `_render`, so a parse-only
 * caller can hand over this stub instead of building an element factory.
 */
const noopCreateElement: CreateElementFunction = () => null;

/**
 * Builds the rule set backing one document.
 *
 * Rules read the document's footnote and reference tables through `scope`
 * rather than closing over them, so one set serves every document sharing the
 * same options. Building this graph dominated the cost of compiling the many
 * short strings a dictionary holds; `getRuleSet` caches it.
 */
const createDocumentRules = (
  createElement: CreateElementFunction,
  ctx: MarkdownContext<any>,
  options: MarkdownOptions,
  scope: DocumentScopeRef
): Rules => {
  const attrStringToMap = (
    tag: HTMLTag,
    str: string
  ): Record<string, any> | null => {
    if (!str?.trim()) return null;

    const attributes = str.match(ATTR_EXTRACTOR_R);

    if (!attributes) return null;

    return attributes.reduce((map: any, raw) => {
      const delimiterIdx = raw.indexOf('=');

      if (delimiterIdx !== -1) {
        const key = normalizeAttributeKey(raw.slice(0, delimiterIdx)).trim();
        const value = unquote(raw.slice(delimiterIdx + 1).trim());
        const mappedKey = ATTRIBUTE_TO_NODE_PROP_MAP[key] ?? key;

        if (mappedKey === 'ref') return map;
        map[mappedKey] = attributeValueToNodePropValue(
          tag,
          key,
          value,
          ctx.sanitizer ?? defaultSanitizer
        );

        if (
          typeof map[mappedKey] === 'string' &&
          startsWithElement(map[mappedKey])
        ) {
          map[mappedKey] = parseMarkdown(
            map[mappedKey].trim(),
            ctx,
            options
          ).ast;
        }
      } else if (raw !== 'style') {
        map[ATTRIBUTE_TO_NODE_PROP_MAP[raw] ?? raw] = true;
      }

      return map;
    }, {});
  };

  const nonParagraphBlockSyntaxes = [
    BLOCKQUOTE_R,
    CODE_BLOCK_FENCED_R,
    CODE_BLOCK_R,
    options.enforceAtxHeadings ? HEADING_ATX_COMPLIANT_R : HEADING_R,
    HEADING_SETEXT_R,
    NP_TABLE_R,
    ORDERED_LIST_R,
    UNORDERED_LIST_R,
    startsWithCustomComponent,
  ];

  // Built once: this list is fixed for the whole parse, and rebuilding it per
  // call put a fresh array on every block-syntax probe.
  const blockSyntaxes = (
    options.disableParsingRawHTML
      ? nonParagraphBlockSyntaxes
      : [
          ...nonParagraphBlockSyntaxes,
          PARAGRAPH_R,
          startsWithHtmlBlockElement,
          HTML_COMMENT_R,
          startsWithSelfClosingElement,
          startsWithCustomComponent,
        ]
  ) as BlockSyntaxProbe[];

  const containsBlockSyntax = (input: string): boolean => {
    const cleaned = input.replace(TRIM_STARTING_NEWLINES, '');
    const slice = cleaned.length > 2048 ? cleaned.slice(0, 2048) : cleaned;

    if (slice.indexOf('\n\n') !== -1) return true;

    return some(blockSyntaxes, slice);
  };

  const baseRules = createRules(
    createElement,
    ctx,
    options,
    scope,
    attrStringToMap,
    containsBlockSyntax,
    nonParagraphBlockSyntaxes
  );

  return options.disableParsingRawHTML
    ? Object.keys(baseRules).reduce((acc, key) => {
        if (key !== RuleType.htmlBlock && key !== RuleType.htmlSelfClosing) {
          acc[key] = baseRules[key];
        }

        return acc;
      }, {} as Rules)
    : baseRules;
};

/** Runs the parse phase against an already-built rule set. */
const parseWithRules = (
  markdown: string,
  options: MarkdownOptions,
  parser: DocumentParser,
  footnotes: FootnoteDef[],
  refs: MarkdownReferences
): ParsedMarkdown => {
  const result = options.preserveFrontmatter
    ? markdown
    : markdown.replace(FRONT_MATTER_R, '');
  // Stripped once and reused: both the block/inline decision and the block
  // input below need the source without its leading newlines.
  const trimmedStart = result.replace(TRIM_STARTING_NEWLINES, '');
  const inline =
    options.forceInline ||
    (!options.forceBlock &&
      SHOULD_RENDER_AS_BLOCK_R.test(trimmedStart) === false);

  const ast = parser(inline ? result : `${trimEnd(trimmedStart)}\n\n`, {
    inline,
  });

  if (footnotes.length > 0) {
    // Parse footnotes content as well
    for (const def of footnotes) {
      (def as any).parsedAst = parser(def.footnote, { inline: true });
    }
  }

  return { ast, footnotes, references: refs, inline };
};

/** Runs the render phase against an already-built rule set. */
const renderWithRules = (
  parsed: ParsedMarkdown,
  ctx: MarkdownContext<any>,
  options: MarkdownOptions,
  emitter: DocumentEmitter,
  createElement: CreateElementFunction
): unknown => {
  const components = ctx.components ?? {};
  const slug = createSlugger(ctx);
  const footnotes = parsed.footnotes || [];

  const inline = parsed.inline;
  const arr = emitter(parsed.ast, { inline }) as unknown as any[];

  while (typeof arr[arr.length - 1] === 'string' && !arr[arr.length - 1].trim())
    arr.pop();

  const getOuterNode = () => {
    if (options.wrapper === null) return arr;
    const wrapper = options.wrapper ?? (inline ? 'span' : 'div');

    if (arr.length > 1 || options.forceWrapper)
      return createElement(wrapper, { key: 'outer' }, arr);

    if (arr.length === 1) {
      const node = arr[0];

      if (typeof node === 'string') {
        const spanProps: Record<string, any> = { key: 'outer' };

        if (!inline && components) {
          const pOverrideProps = (get(components, 'p.props', {}) ??
            {}) as Record<string, any>;
          const mergedClassName = cx(
            spanProps.className,
            pOverrideProps.className
          );
          const finalSpanProps: Record<string, any> = {
            ...spanProps,
            ...pOverrideProps,
          };

          if (mergedClassName) finalSpanProps.className = mergedClassName;

          return createElement('span', finalSpanProps, node);
        }

        return createElement('span', spanProps, node);
      }

      return node;
    }

    return createElement(wrapper, { key: 'outer' }, null);
  };

  const node = getOuterNode();

  const result = footnotes.length
    ? createElement(
        'div',
        null,
        node,
        createElement(
          'footer',
          { key: 'footer' },
          ...footnotes.map((def) =>
            createElement(
              'div',
              { id: slug(def.identifier), key: def.identifier },
              def.identifier,
              emitter((def as any).parsedAst || def.footnote, { inline: true })
            )
          )
        )
      )
    : node;

  return result;
};

export const parseMarkdown = (
  markdown: string = '',
  ctx: MarkdownContext<any>,
  options: MarkdownOptions = {}
): ParsedMarkdown => {
  // Parsing never emits elements, so it gets its own cache entry built around
  // the no-op factory rather than the render one.
  const { parse, scope } = getRuleSet(ctx, options, true);
  const documentScope = createDocumentScope();

  return withDocumentScope(scope, documentScope, () =>
    parseWithRules(
      markdown,
      options,
      parse,
      documentScope.footnotes,
      documentScope.references
    )
  );
};

export const renderMarkdownAst = (
  parsed: ParsedMarkdown,
  ctx: MarkdownContext<any>,
  options: MarkdownOptions = {}
): unknown => {
  const { emit, createElement, scope } = getRuleSet(ctx, options, false);
  const documentScope: DocumentScope = {
    footnotes: parsed.footnotes ?? [],
    references: parsed.references ?? {},
  };

  return withDocumentScope(scope, documentScope, () =>
    renderWithRules(parsed, ctx, options, emit, createElement)
  );
};

export const compile = (
  markdown: string = '',
  ctx: MarkdownContext<any>,
  options: MarkdownOptions = {}
): unknown => {
  if (typeof markdown !== 'string') {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        'intlayer: the first argument must be a string. Received',
        typeof markdown
      );
    }
    throw new Error('intlayer: the first argument must be a string');
  }

  // Both phases share one rule set: building it twice was the dominant cost
  // when compiling the many short strings a typical dictionary holds.
  const { parse, emit, createElement, scope } = getRuleSet(ctx, options, false);
  const documentScope = createDocumentScope();

  return withDocumentScope(scope, documentScope, () => {
    const parsed = parseWithRules(
      markdown,
      options,
      parse,
      documentScope.footnotes,
      documentScope.references
    );

    return renderWithRules(parsed, ctx, options, emit, createElement);
  });
};

export const createCompiler =
  (ctx: MarkdownContext<any>) =>
  (markdown: string, options?: MarkdownOptions): unknown =>
    compile(markdown, ctx, options);

export const compileWithOptions = (
  markdown: string,
  runtime: MarkdownRuntime,
  options: CompileOptions<any> = {}
): unknown => {
  const {
    components,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  return compile(
    markdown,
    { runtime, components, namedCodesToUnicode, sanitizer, slugify },
    compilerOptions
  );
};
