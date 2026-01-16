/**
 * Framework-agnostic markdown compiler.
 * Contains all rules and the main compile function.
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 */

import {
  ATTR_EXTRACTOR_R,
  ATTRIBUTE_TO_JSX_PROP_MAP,
  BLOCKQUOTE_ALERT_R,
  BLOCKQUOTE_R,
  BLOCKQUOTE_TRIM_LEFT_MULTILINE_R,
  BREAK_LINE_R,
  BREAK_THEMATIC_R,
  CODE_BLOCK_FENCED_R,
  CODE_BLOCK_R,
  CODE_INLINE_R,
  CONSECUTIVE_NEWLINE_R,
  CUSTOM_COMPONENT_R,
  DO_NOT_PROCESS_HTML_ELEMENTS,
  DURATION_DELAY_TRIGGER,
  FOOTNOTE_R,
  FOOTNOTE_REFERENCE_R,
  FRONT_MATTER_R,
  GFM_TASK_R,
  HEADING_ATX_COMPLIANT_R,
  HEADING_R,
  HEADING_SETEXT_R,
  HTML_BLOCK_ELEMENT_R,
  HTML_CHAR_CODE_R,
  HTML_COMMENT_R,
  HTML_LEFT_TRIM_AMOUNT_R,
  HTML_SELF_CLOSING_ELEMENT_R,
  LINK_AUTOLINK_BARE_URL_R,
  LINK_AUTOLINK_R,
  LIST_LOOKBEHIND_R,
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
import { parserFor } from './parser';
import { createRenderer, renderFor } from './renderer';
import type {
  BlockQuoteNode,
  BoldTextNode,
  BreakLineNode,
  BreakThematicNode,
  CodeBlockNode,
  CodeInlineNode,
  CompileOptions,
  CustomComponentNode,
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
  OrderedListNode,
  Overrides,
  ParagraphNode,
  ParserResult,
  ParseState,
  ReferenceImageNode,
  ReferenceLinkNode,
  Rule,
  RuleOutput,
  Rules,
  StrikethroughTextNode,
  TableNode,
  TextNode,
  UnorderedListNode,
} from './types';
import {
  allowInline,
  anyScopeRegex,
  attributeValueToJSXPropValue,
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
  parseStyleAttribute,
  parseTableAlign,
  parseTableCells,
  parseTableRow,
  renderNothing,
  simpleInlineRegex,
  some,
  trimEnd,
  trimLeadingWhitespaceOutsideFences,
  unescapeString,
  unquote,
} from './utils';

// ============================================================================
// INTERNAL TYPES
// ============================================================================

type CreateElementFunction = (
  tag: HTMLTag,
  props: Record<string, any> | null,
  ...children: any[]
) => unknown;

type FootnoteDef = {
  footnote: string;
  identifier: string;
};

// ============================================================================
// LINK PATTERNS
// ============================================================================

const LINK_INSIDE =
  '(?:\\[[^\\[\\]]*(?:\\[[^\\[\\]]*\\][^\\[\\]]*)*\\]|[^\\[\\]])*';
const LINK_HREF_AND_TITLE =
  '\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+[\'"]([\\s\\S]*?)[\'"])?\\s*';
const LINK_R = new RegExp(
  `^\\[(${LINK_INSIDE})\\]\\(${LINK_HREF_AND_TITLE}\\)`
);
const IMAGE_R = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Resolve the component for a tag, considering overrides.
 */
const getTag = (tag: string, overrides: Overrides): any => {
  const override = get(overrides, tag);

  if (!override) return tag;

  // Direct component (function, object, etc.)
  if (typeof override === 'function') return override;
  if (
    typeof override === 'object' &&
    !('component' in override) &&
    !('props' in override)
  ) {
    return override;
  }

  // Config object with { component?, props? }
  if (typeof override === 'object' && 'component' in override) {
    return override.component ?? tag;
  }

  return tag;
};

/**
 * Create a slugify function that wraps user-provided or default.
 */
const createSlug = (
  userSlugify?: (input: string) => string
): ((str: string, fn: typeof defaultSlugify) => string) => {
  return (str: string, fn: typeof defaultSlugify) => {
    if (userSlugify) {
      return userSlugify(str);
    }
    return fn(str);
  };
};

// ============================================================================
// CREATE H FUNCTION
// ============================================================================

/**
 * Create the element factory that all rules use for element creation.
 * Closes over context and options.
 */
const createElementFactory = (
  ctx: MarkdownContext,
  _options: MarkdownOptions
): CreateElementFunction => {
  const { runtime, overrides = {} } = ctx;

  return (
    tag: HTMLTag,
    props: Record<string, any> | null,
    ...children: any[]
  ): unknown => {
    // Get override props if defined
    const overrideProps = get(overrides, `${tag}.props`, {}) as Record<
      string,
      any
    >;

    // Merge both className and class for runtime neutrality
    // This ensures overrides work correctly regardless of framework
    const mergedClassName = cx(
      props?.className,
      props?.class,
      overrideProps?.className,
      overrideProps?.class
    );

    let mergedProps: Record<string, any> = {
      ...props,
      ...overrideProps,
    };

    // Set the merged class value - use className as canonical form
    // The runtime's normalizeProps will convert to framework-specific form
    if (mergedClassName) {
      mergedProps.className = mergedClassName;
      // Remove 'class' to avoid duplication after normalization
      mergedProps.class = undefined;
    }

    // Apply framework-specific prop normalization
    if (runtime.normalizeProps) {
      mergedProps = runtime.normalizeProps(tag, mergedProps);
    }

    // Resolve component (override or tag string)
    const component = getTag(tag, overrides);

    // Delegate to runtime
    return runtime.createElement(
      component,
      mergedProps,
      ...(children.length === 1 ? [children[0]] : children)
    );
  };
};

// ============================================================================
// CREATE RULES
// ============================================================================

/**
 * Create all markdown rules.
 * Rules close over createElement, slug, sanitize, and other helpers.
 */
const createRules = (
  createElement: CreateElementFunction,
  ctx: MarkdownContext,
  options: MarkdownOptions,
  footnotes: FootnoteDef[],
  attrStringToMap: (tag: HTMLTag, str: string) => Record<string, any> | null,
  containsBlockSyntax: (input: string) => boolean
): Rules => {
  const slug = createSlug(ctx.slugify);
  const slugFn = ctx.slugify ?? defaultSlugify;
  const sanitize = ctx.sanitizer ?? defaultSanitizer;
  const namedCodesToUnicode = ctx.namedCodesToUnicode
    ? { ...NAMED_CODES_TO_UNICODE, ...ctx.namedCodesToUnicode }
    : NAMED_CODES_TO_UNICODE;

  // References storage
  const refs: Record<string, { target: string; title?: string }> = {};

  // ============================================================================
  // LIST RULE GENERATOR
  // ============================================================================

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
        const isStartOfLine = LIST_LOOKBEHIND_R.exec(state.prevCapture ?? '');
        const isListAllowed = state.list ?? (!state.inline && !state.simple);

        if (isStartOfLine && isListAllowed) {
          source = isStartOfLine[1] + source;

          const match = LIST_R.exec(source);
          if (match) {
            match[0] = match[0].substring(isStartOfLine[1].length);
            return match;
          }
        }

        return null;
      }),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const start = performance.now();
        const bullet = capture[2];
        const startValue = ordered ? +bullet.slice(0, -1) : undefined;
        const items = capture[0]
          .replace(CONSECUTIVE_NEWLINE_R, '\n')
          .match(LIST_ITEM_R) as string[];

        const wasInList = state.list;
        state.list = true;

        const result = items.map((item, i) => {
          const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
          const space = prefixCapture ? prefixCapture[0].length : 0;
          const currContent = item
            .slice(space)
            .replace(/^\n+/, '')
            .replace(new RegExp(`^ {1,${space}}`, 'gm'), '');

          const prevInList = state.list;
          state.list = i < items.length - 1;

          const parsed = parseBlock(parse, currContent, state);
          state.list = prevInList;

          return parsed;
        });

        state.list = wasInList;

        const duration = performance.now() - start;
        if (duration > DURATION_DELAY_TRIGGER) {
          console.log(
            `list._parse: ${duration.toFixed(3)}ms, items count: ${items.length}`
          );
        }

        return {
          items: result,
          ordered,
          start: startValue,
        } as any;
      },
      _render(
        node: OrderedListNode | UnorderedListNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        const start = performance.now();
        const Tag = node.ordered ? 'ol' : 'ul';

        // Convert JSX to createElement() calls
        const listItems = node.items.map((item, i) =>
          createElement(
            'li',
            { key: `item-${i}-${Math.random()}` },
            _output(item, state)
          )
        );

        const result = createElement(
          Tag,
          {
            key: state.key,
            start: node.ordered ? (node as OrderedListNode).start : undefined,
          },
          ...listItems
        );

        const duration = performance.now() - start;
        if (duration > DURATION_DELAY_TRIGGER) {
          console.log(
            `list._render: ${duration.toFixed(3)}ms, items count: ${node.items.length}`
          );
        }

        return result;
      },
    };
  };

  // ============================================================================
  // RULES DEFINITION
  // ============================================================================

  const rules: Rules = {
    [RuleType.blockQuote]: {
      _qualify: ['>'],
      _match: blockRegex(BLOCKQUOTE_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const start = performance.now();
        const matchAlert = capture[0]
          .replace(BLOCKQUOTE_TRIM_LEFT_MULTILINE_R, '')
          .match(BLOCKQUOTE_ALERT_R);
        const alert = matchAlert?.[1];
        const content = matchAlert?.[2] ?? '';

        const hasNewline = content.indexOf('\n') !== -1;
        const children = hasNewline
          ? parseBlock(parse, content, state)
          : parseInline(parse, content, state);

        const result = {
          alert,
          children,
        };

        const duration = performance.now() - start;
        if (duration > DURATION_DELAY_TRIGGER) {
          console.log(
            `blockQuote._parse: ${duration.toFixed(3)}ms, capture length: ${capture[0].length}`
          );
        }

        return result;
      },
      _render(
        node: BlockQuoteNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        const start = performance.now();
        const props: Record<string, unknown> = {
          key: state?.key,
        };

        if (node.alert) {
          props.className = `markdown-alert-${slug(node.alert.toLowerCase(), slugFn)}`;

          node.children.unshift({
            attrs: {},
            children: [{ type: RuleType.text, text: node.alert }],
            noInnerParse: true,
            type: RuleType.htmlBlock,
            tag: 'header',
          } as any);
        }

        const result = createElement(
          'blockquote',
          props,
          _output(node.children, state)
        );

        const duration = performance.now() - start;
        if (duration > DURATION_DELAY_TRIGGER) {
          console.log(
            `blockQuote._render: ${duration.toFixed(3)}ms, children count: ${node.children.length}`
          );
        }

        return result;
      },
    },

    [RuleType.breakLine]: {
      _qualify: ['  '],
      _match: anyScopeRegex(BREAK_LINE_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render(_: BreakLineNode, __: RuleOutput, state: ParseState = {}) {
        return createElement('br', { key: state.key });
      },
    },

    [RuleType.breakThematic]: {
      _qualify: ['--', '__', '**', '- ', '* ', '_ '],
      _match: blockRegex(BREAK_THEMATIC_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render(_: BreakThematicNode, __: RuleOutput, state: ParseState = {}) {
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
      _render(
        node: CodeBlockNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        const start = performance.now();
        const attrs = { ...((node as any).attrs ?? {}) } as Record<string, any>;
        const langClass = node.lang ? `lang-${node.lang}` : 'lang-plaintext';
        attrs.className = attrs.className
          ? `${attrs.className} ${langClass}`
          : langClass;
        if (node.lang && !attrs.lang) attrs.lang = node.lang;

        const result = createElement(
          'pre',
          { key: state.key },
          createElement('code', attrs, node.text)
        );

        const duration = performance.now() - start;
        if (duration > DURATION_DELAY_TRIGGER) {
          console.log(
            `codeBlock._render: ${duration.toFixed(3)}ms, text length: ${node.text.length}`
          );
        }

        return result;
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
        return {
          text: unescapeString(capture[2]),
        };
      },
      _render(
        node: CodeInlineNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement('code', { key: state.key }, node.text);
      },
    },

    [RuleType.footnote]: {
      _qualify: ['[^'],
      _match: blockRegex(FOOTNOTE_R),
      _order: Priority.MAX,
      _parse(capture) {
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
      _parse(capture) {
        return {
          target: `#${slug(capture[1], slugFn)}`,
          text: capture[1],
        };
      },
      // JSX converted to createElement() calls
      _render(
        node: FootnoteReferenceNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
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
        return {
          completed: capture[1].toLowerCase() === 'x',
        };
      },
      _render(node: GFMTaskNode, _output: RuleOutput, state: ParseState = {}) {
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
          id: slug(capture[2], slugFn),
          level: capture[1].length as HeadingNode['level'],
        };
      },
      _render(node: HeadingNode, _output: RuleOutput, state: ParseState = {}) {
        return createElement(
          `h${node.level}`,
          { id: node.id, key: state.key },
          _output(node.children, state)
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

    [RuleType.htmlBlock]: {
      _qualify: (source) => {
        if (options.disableParsingRawHTML) return false;
        if (source[0] !== '<') return false;
        if (!/^<([a-z][a-z0-9:-]*)\b/.test(source)) return false;
        const tag = source.match(/^<([a-z][a-z0-9:-]*)\b/)?.[1];
        return tag ? source.indexOf(`</${tag}>`) !== -1 : false;
      },
      _match: anyScopeRegex(HTML_BLOCK_ELEMENT_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const m = capture[3].match(HTML_LEFT_TRIM_AMOUNT_R);
        const whitespace = m?.[1] ?? '';

        const trimmed = trimLeadingWhitespaceOutsideFences(
          capture[3],
          whitespace
        );

        const parseFunc = containsBlockSyntax(trimmed)
          ? parseBlock
          : parseInline;

        const tagName = capture[1].toLowerCase();
        const noInnerParse =
          DO_NOT_PROCESS_HTML_ELEMENTS.indexOf(tagName) !== -1;

        const tag = (noInnerParse ? tagName : capture[1]).trim();

        const ast: any = {
          attrs: attrStringToMap(tag, capture[2] ?? ''),
          noInnerParse,
          tag,
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

        state.inAnchor = false;

        return ast;
      },
      _render(node: HTMLNode, _output: RuleOutput, state: ParseState = {}) {
        return createElement(
          node.tag,
          { key: state.key, ...(node.attrs ?? {}) },
          node.text ?? (node.children ? _output(node.children, state) : '')
        );
      },
    },

    [RuleType.htmlComment]: {
      _qualify: ['<!'],
      _match: anyScopeRegex(HTML_COMMENT_R),
      _order: Priority.HIGH,
      _parse: captureNothing,
      _render: renderNothing,
    },

    [RuleType.htmlSelfClosing]: {
      _qualify: (source) => {
        if (options.disableParsingRawHTML) return false;
        if (source[0] !== '<') return false;
        return /^<([a-zA-Z][a-zA-Z0-9:]*)[\s>/]/.test(source);
      },
      _match: anyScopeRegex(HTML_SELF_CLOSING_ELEMENT_R),
      _order: Priority.HIGH,
      _parse(capture) {
        const tag = capture[1].trim();
        return {
          attrs: attrStringToMap(tag, capture[2] || ''),
          tag,
        };
      },
      _render(
        node: HTMLSelfClosingNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement(node.tag, {
          key: state.key,
          ...(node.attrs ?? {}),
        });
      },
    },

    [RuleType.customComponent]: {
      _qualify: (source) => {
        if (source[0] !== '<') return false;
        return /^<([A-Z][a-zA-Z0-9]*)[\s>]/.test(source);
      },
      _match: anyScopeRegex(CUSTOM_COMPONENT_R),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const m = capture[3].match(HTML_LEFT_TRIM_AMOUNT_R);
        const whitespace = m?.[1] ?? '';

        const trimmed = trimLeadingWhitespaceOutsideFences(
          capture[3],
          whitespace
        );

        const parseFunc = containsBlockSyntax(trimmed)
          ? parseBlock
          : parseInline;

        const tag = capture[1].trim();

        const ast: any = {
          attrs: attrStringToMap(tag, capture[2] ?? ''),
          noInnerParse: false,
          tag,
        };

        const prevInHTML = state.inHTML;
        state.inHTML = true;
        ast.children = parseFunc(parse, trimmed, state);
        state.inHTML = prevInHTML;

        return ast;
      },
      _render(
        node: CustomComponentNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement(
          node.tag,
          { key: state.key, ...(node.attrs ?? {}) },
          node.text ?? (node.children ? _output(node.children, state) : '')
        );
      },
    },

    [RuleType.image]: {
      _qualify: ['!['],
      _match: simpleInlineRegex(IMAGE_R),
      _order: Priority.HIGH,
      _parse(capture) {
        return {
          alt: capture[1],
          target: unescapeString(capture[2]),
          title: capture[3],
        };
      },
      _render(node: ImageNode, _output: RuleOutput, state: ParseState = {}) {
        return createElement('img', {
          key: state.key,
          alt: node.alt || undefined,
          title: node.title || undefined,
          src: sanitize(node.target, 'img', 'src') ?? undefined,
        });
      },
    },

    [RuleType.link]: {
      _qualify: ['['],
      _match: allowInline((source, state) => {
        if (state.inAnchor) return null;
        return LINK_R.exec(source);
      }),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        const prevInAnchor = state.inAnchor;
        state.inAnchor = true;
        const children = parseSimpleInline(parse, capture[1], state);
        state.inAnchor = prevInAnchor;

        return {
          children,
          target: unescapeString(capture[2]),
          title: capture[3],
        };
      },
      _render(node: LinkNode, _output: RuleOutput, state: ParseState = {}) {
        return createElement(
          'a',
          {
            key: state.key,
            href: sanitize(node.target, 'a', 'href') ?? undefined,
            title: node.title,
          },
          _output(node.children, state)
        );
      },
    },

    [RuleType.linkAngleBraceStyleDetector]: {
      _qualify: ['<'],
      _match: inlineRegex(LINK_AUTOLINK_R),
      _order: Priority.MAX,
      _parse(capture) {
        return {
          children: [{ text: capture[1], type: RuleType.text }],
          target: capture[1],
          type: RuleType.link,
        };
      },
    },

    [RuleType.linkBareUrlDetector]: {
      _qualify: (source) => {
        if (options.disableAutoLink) return false;
        return source.startsWith('http://') || source.startsWith('https://');
      },
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

    [RuleType.paragraph]: {
      _match: blockRegex(PARAGRAPH_R),
      _order: Priority.LOW,
      _parse: parseCaptureInline,
      _render(
        node: ParagraphNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement(
          'p',
          { key: state.key },
          _output(node.children, state)
        );
      },
    },

    [RuleType.ref]: {
      _qualify: ['['],
      _match: blockRegex(REFERENCE_IMAGE_OR_LINK),
      _order: Priority.MAX,
      _parse(capture) {
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
          alt: capture[1] || undefined,
          ref: capture[2],
        };
      },
      _render(
        node: ReferenceImageNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        const ref = refs[node.ref];
        return createElement('img', {
          key: state.key,
          alt: node.alt,
          src: sanitize(ref?.target ?? '', 'img', 'src') ?? undefined,
          title: ref?.title,
        });
      },
    },

    [RuleType.refLink]: {
      _qualify: ['['],
      _match: allowInline((source, state) => {
        if (state.inAnchor) return null;
        return REFERENCE_LINK_R.exec(source);
      }),
      _order: Priority.MAX,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[1], state),
          fallbackChildren: capture[1],
          ref: capture[2],
        };
      },
      _render(
        node: ReferenceLinkNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        const ref = refs[node.ref];
        if (!ref) {
          return createElement(
            'span',
            { key: state.key },
            node.fallbackChildren
          );
        }
        return createElement(
          'a',
          {
            key: state.key,
            href: sanitize(ref.target, 'a', 'href') ?? undefined,
            title: ref.title,
          },
          _output(node.children, state)
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
          ? {
              align,
              cells,
              header,
              type: RuleType.table,
            }
          : {
              children: header.flat(),
              type: RuleType.paragraph,
            };
      },
      _render(node: TableNode, _output: RuleOutput, state: ParseState = {}) {
        const getStyle = (colIndex: number) =>
          node.align[colIndex] == null
            ? {}
            : { textAlign: node.align[colIndex] };

        return createElement(
          'table',
          { key: state.key },
          createElement(
            'thead',
            null,
            createElement(
              'tr',
              null,
              ...node.header.map((cell, i) =>
                createElement(
                  'th',
                  { key: i, style: getStyle(i) },
                  _output(cell, state)
                )
              )
            )
          ),
          createElement(
            'tbody',
            null,
            ...node.cells.map((row, i) =>
              createElement(
                'tr',
                { key: i },
                ...row.map((cell, j) =>
                  createElement(
                    'td',
                    { key: j, style: getStyle(j) },
                    _output(cell, state)
                  )
                )
              )
            )
          )
        );
      },
    },

    [RuleType.tableSeparator]: {
      _qualify: [' |', '|'],
      _match: (source, state) => {
        if (!state.inTable) return null;
        return /^\|/.exec(source);
      },
      _order: Priority.HIGH,
      _parse() {
        return { type: RuleType.tableSeparator };
      },
      _render() {
        return ' | ';
      },
    },

    [RuleType.text]: {
      _match: anyScopeRegex(TEXT_PLAIN_R),
      _order: Priority.MIN,
      _parse(capture) {
        return {
          text: capture[0].replace(
            HTML_CHAR_CODE_R,
            (_, entity: string) =>
              namedCodesToUnicode[entity] ||
              (entity.startsWith('#x')
                ? String.fromCharCode(parseInt(entity.slice(2), 16))
                : entity.startsWith('#')
                  ? String.fromCharCode(parseInt(entity.slice(1), 10))
                  : entity)
          ),
        };
      },
      _render(node: TextNode) {
        return node.text;
      },
    },

    [RuleType.textBolded]: {
      _qualify: ['*', '_'],
      _match: simpleInlineRegex(TEXT_BOLD_R),
      _order: Priority.MED,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[2], state),
        };
      },
      _render(node: BoldTextNode, _output: RuleOutput, state: ParseState = {}) {
        return createElement(
          'strong',
          { key: state.key },
          _output(node.children, state)
        );
      },
    },

    [RuleType.textEmphasized]: {
      _qualify: ['*', '_'],
      _match: simpleInlineRegex(TEXT_EMPHASIZED_R),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[2], state),
        };
      },
      _render(
        node: ItalicTextNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement(
          'em',
          { key: state.key },
          _output(node.children, state)
        );
      },
    },

    [RuleType.textEscaped]: {
      _qualify: ['\\'],
      _match: anyScopeRegex(TEXT_ESCAPED_R),
      _order: Priority.HIGH,
      _parse(capture) {
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
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[2], state),
        };
      },
      _render(
        node: MarkedTextNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement(
          'mark',
          { key: state.key },
          _output(node.children, state)
        );
      },
    },

    [RuleType.textStrikethroughed]: {
      _qualify: ['~~'],
      _match: simpleInlineRegex(TEXT_STRIKETHROUGHED_R),
      _order: Priority.LOW,
      _parse(capture, parse, state) {
        return {
          children: parseSimpleInline(parse, capture[2], state),
        };
      },
      _render(
        node: StrikethroughTextNode,
        _output: RuleOutput,
        state: ParseState = {}
      ) {
        return createElement(
          'del',
          { key: state.key },
          _output(node.children, state)
        );
      },
    },
  };

  return rules;
};

// ============================================================================
// COMPILE FUNCTION
// ============================================================================

/**
 * Main compile function.
 * Converts markdown string to framework-specific elements.
 */
export const compile = (
  markdown: string = '',
  ctx: MarkdownContext,
  options: MarkdownOptions = {}
): unknown => {
  const overrides = ctx.overrides ?? {};
  const namedCodesToUnicode = ctx.namedCodesToUnicode
    ? { ...NAMED_CODES_TO_UNICODE, ...ctx.namedCodesToUnicode }
    : NAMED_CODES_TO_UNICODE;

  const slug = ctx.slugify ?? defaultSlugify;
  const sanitize = ctx.sanitizer ?? defaultSanitizer;
  const createElement = createElementFactory(ctx, options);

  // Footnotes storage
  const footnotes: FootnoteDef[] = [];

  // Build syntax patterns for block detection
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
    const cleaned = input.replace(TRIM_STARTING_NEWLINES, '');
    const slice = cleaned.length > 2048 ? cleaned.slice(0, 2048) : cleaned;
    const syntaxes = options.disableParsingRawHTML
      ? [...NON_PARAGRAPH_BLOCK_SYNTAXES, PARAGRAPH_R, CUSTOM_COMPONENT_R]
      : BLOCK_SYNTAXES;

    return some(syntaxes, slice);
  };

  // Attribute string to map function
  const attrStringToMap = (
    tag: HTMLTag,
    str: string
  ): Record<string, any> | null => {
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

        if (mappedKey === 'ref') return map;

        const normalizedValue = attributeValueToJSXPropValue(
          tag,
          key,
          value,
          sanitize
        );
        map[mappedKey] = normalizedValue;

        if (
          typeof normalizedValue === 'string' &&
          (HTML_BLOCK_ELEMENT_R.test(normalizedValue) ||
            HTML_SELF_CLOSING_ELEMENT_R.test(normalizedValue))
        ) {
          map[mappedKey] = compileInner(normalizedValue.trim());
        }
      } else if (raw !== 'style') {
        map[ATTRIBUTE_TO_JSX_PROP_MAP[raw] ?? raw] = true;
      }

      return map;
    }, {});

    const duration = performance.now() - start;
    if (duration > DURATION_DELAY_TRIGGER) {
      console.log(
        `attrStringToMap: ${duration.toFixed(3)}ms, str length: ${str.length}`
      );
    }

    return result;
  };

  // Create rules
  const rules = createRules(
    createElement,
    ctx,
    options,
    footnotes,
    attrStringToMap,
    containsBlockSyntax
  );

  // Delete HTML rules if disabled
  if (options.disableParsingRawHTML === true) {
    delete (rules as any)[RuleType.htmlBlock];
    delete (rules as any)[RuleType.htmlSelfClosing];
  }

  const parser = parserFor(rules);
  const emitter = renderFor(createRenderer(rules, options.renderRule));

  // Inner compile function
  const compileInner = (input: string): unknown => {
    const start = performance.now();
    const result = input.replace(FRONT_MATTER_R, '');

    let inline = false;

    if (options.forceInline) {
      inline = true;
    } else if (!options.forceBlock) {
      const leadingNewlinesTrimmed = result.replace(TRIM_STARTING_NEWLINES, '');
      inline = SHOULD_RENDER_AS_BLOCK_R.test(leadingNewlinesTrimmed) === false;
    }

    const arr = emitter(
      parser(
        inline
          ? result
          : `${trimEnd(result).replace(TRIM_STARTING_NEWLINES, '')}\n\n`,
        { inline }
      ),
      { inline }
    ) as unknown as any[];

    while (
      typeof arr[arr.length - 1] === 'string' &&
      !arr[arr.length - 1].trim()
    ) {
      arr.pop();
    }

    if (options.wrapper === null) {
      const duration = performance.now() - start;
      if (duration > DURATION_DELAY_TRIGGER) {
        console.log(
          `compile: ${duration.toFixed(3)}ms, input length: ${input.length}, inline: ${inline}`
        );
      }
      return arr;
    }

    const wrapper = options.wrapper ?? (inline ? 'span' : 'div');
    let jsx: unknown;

    if (arr.length > 1 || options.forceWrapper) {
      jsx = arr;
    } else if (arr.length === 1) {
      jsx = arr[0];

      if (typeof jsx === 'string') {
        const spanProps: Record<string, any> = { key: 'outer' };
        if (!inline && overrides) {
          const pOverrideProps = get(overrides, 'p.props', {});
          if (pOverrideProps && typeof pOverrideProps === 'object') {
            const mergedClassName = cx(
              spanProps.className,
              pOverrideProps.className
            );
            Object.assign(spanProps, pOverrideProps);
            if (mergedClassName) spanProps.className = mergedClassName;
          }
        }
        return createElement('span', spanProps, jsx);
      } else {
        return jsx;
      }
    } else {
      jsx = null;
    }

    const duration = performance.now() - start;
    if (duration > DURATION_DELAY_TRIGGER) {
      console.log(
        `compile: ${duration.toFixed(3)}ms, input length: ${input.length}, inline: ${inline}`
      );
    }

    return createElement(wrapper, { key: 'outer' }, jsx);
  };

  // Validation
  if (process.env.NODE_ENV !== 'production') {
    if (typeof markdown !== 'string') {
      throw new Error('intlayer: the first argument must be a string');
    }
  }

  const jsx = compileInner(markdown);

  // Handle footnotes - JSX converted to createElement() calls
  if (footnotes.length) {
    return createElement(
      'div',
      null,
      jsx,
      createElement(
        'footer',
        { key: 'footer' },
        ...footnotes.map((def) =>
          createElement(
            'div',
            { id: slug(def.identifier), key: def.identifier },
            def.identifier,
            emitter(parser(def.footnote, { inline: true }), { inline: true })
          )
        )
      )
    );
  }

  return jsx;
};

/**
 * Create a compiler bound to a specific context.
 */
export const createCompiler =
  (ctx: MarkdownContext) =>
  (markdown: string, options?: MarkdownOptions): unknown =>
    compile(markdown, ctx, options);

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

/**
 * Compile markdown with options merged into context.
 */
export const compileWithOptions = (
  markdown: string,
  runtime: MarkdownRuntime,
  options: CompileOptions = {}
): unknown => {
  const {
    overrides,
    namedCodesToUnicode,
    sanitizer,
    slugify,
    ...compilerOptions
  } = options;

  const ctx: MarkdownContext = {
    runtime,
    overrides,
    namedCodesToUnicode,
    sanitizer,
    slugify,
  };

  return compile(markdown, ctx, compilerOptions);
};
