/**
 * Framework-agnostic markdown compiler.
 * Contains all rules and the main compile function.
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 */

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
  CUSTOM_COMPONENT_R,
  DO_NOT_PROCESS_HTML_ELEMENTS,
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
  CompileOptions,
  Overrides as ComponentDefinition,
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

const getTag = (tag: any, components: ComponentDefinition): any => {
  if (typeof tag !== 'string') return tag;
  const override = get(components, tag);

  if (!override) return tag;

  if (typeof override === 'function') return override;

  if (
    typeof override === 'object' &&
    !('component' in override) &&
    !('props' in override)
  )
    return override;

  if (typeof override === 'object' && 'component' in override)
    return override.component ?? tag;

  return tag;
};

const createElementFactory = (
  ctx: MarkdownContext,
  options: MarkdownOptions
): CreateElementFunction => {
  const { runtime, components = {} } = ctx;
  const filteredTags = options.tagfilter
    ? [
        'title',
        'textarea',
        'style',
        'xmp',
        'iframe',
        'noembed',
        'noframes',
        'script',
        'plaintext',
      ]
    : [];

  return (
    tag: any,
    props: Record<string, any> | null,
    ...children: any[]
  ): unknown => {
    if (typeof tag === 'string' && filteredTags.includes(tag.toLowerCase())) {
      return null;
    }

    const isStringTag = typeof tag === 'string';
    let overrideProps: Record<string, any> = {};

    if (isStringTag) {
      // Use template literal safely
      const path = `${tag as string}.props`;
      overrideProps = (get(components, path, {}) ?? {}) as Record<string, any>;
    }

    const className = cx(
      props?.className,
      props?.class,
      overrideProps?.className,
      overrideProps?.class
    );

    const initialMergedProps: Record<string, any> = {
      ...props,
      ...overrideProps,
    };
    const mergedProps: Record<string, any> = {};
    let classNameHandled = false;

    // Preserve attribute order while merging className
    for (const key in initialMergedProps) {
      const value = initialMergedProps[key];

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

    let finalProps = mergedProps;

    if (runtime.normalizeProps && isStringTag)
      finalProps = runtime.normalizeProps(tag as string, mergedProps);
    const component = getTag(tag, components);

    return runtime.createElement(
      component,
      finalProps,
      ...(children.length === 1 ? [children[0]] : children)
    );
  };
};

const createRules = (
  createElement: CreateElementFunction,
  ctx: MarkdownContext,
  options: MarkdownOptions,
  footnotes: FootnoteDef[],
  refs: Record<string, { target: string; title?: string }>,
  attrStringToMap: (tag: HTMLTag, str: string) => Record<string, any> | null,
  containsBlockSyntax: (input: string) => boolean,
  nonParagraphBlockSyntaxes: RegExp[]
): Rules => {
  const slug = (input: string) =>
    ctx.slugify ? ctx.slugify(input, defaultSlugify) : defaultSlugify(input);
  const sanitize = ctx.sanitizer ?? defaultSanitizer;
  const namedCodesToUnicode = ctx.namedCodesToUnicode
    ? { ...NAMED_CODES_TO_UNICODE, ...ctx.namedCodesToUnicode }
    : NAMED_CODES_TO_UNICODE;

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
          const matchSource = (isStartOfLine[1] || '') + source;

          return LIST_R.exec(matchSource);
        }

        return null;
      }),
      _order: Priority.HIGH,
      _parse(capture, parse, state) {
        const start = performance.now();
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
        state.prevCapture?.indexOf('\n\n') === -1)
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

        if (node.lang && !attrs.lang) attrs.lang = node.lang;

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
        footnotes.push({ footnote: capture[2], identifier: capture[1] });

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
    [RuleType.htmlBlock]: {
      _qualify: (source) => {
        if (options.disableParsingRawHTML) return false;

        if (source[0] !== '<') return false;
        // must start like an HTML tag name in lowercase

        if (!/^<([a-z][a-z0-9:-]*)\b/.test(source)) return false;
        const tagMatch = source.match(/^<([a-z][a-z0-9:-]*)\b/);

        if (!tagMatch) return false;
        const tag = tagMatch[1];

        return source.toLowerCase().indexOf(`</${tag.toLowerCase()}>`) !== -1;
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
        const tagName = capture[1].toLowerCase() as HTMLTag;
        const noInnerParse =
          DO_NOT_PROCESS_HTML_ELEMENTS.indexOf(tagName) !== -1;
        const tag = (noInnerParse ? tagName : capture[1]).trim() as HTMLTag;
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
      _render(node, output, state = {}) {
        return createElement(
          node.tag,
          { key: state.key, ...(node.attrs ?? {}) },
          node.text ?? (node.children ? output(node.children, state) : '')
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
    [RuleType.customComponent]: {
      _qualify: (source) =>
        source[0] === '<' && /^ *<([A-Z][a-zA-Z0-9]*)/.test(source),
      _match: blockRegex(CUSTOM_COMPONENT_R),
      _order: Priority.MAX,
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
          attrs: attrStringToMap(tag as HTMLTag, capture[2] ?? ''),
          noInnerParse: false,
          tag,
        };
        const prevInHTML = state.inHTML;
        state.inHTML = true;
        ast.children = parseFunc(parse, trimmed, state);
        state.inHTML = prevInHTML;

        return ast;
      },
      _render(node, output, state = {}) {
        return createElement(
          node.tag as HTMLTag,
          { key: state.key, ...(node.attrs ?? {}) },
          node.text ?? (node.children ? output(node.children, state) : '')
        );
      },
    },
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
        return createElement(
          'a',
          {
            key: state.key,
            href: sanitize(node.target, 'a', 'href') ?? undefined,
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
        refs[capture[1]] = { target: capture[2], title: capture[4] };

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
        const ref = refs[node.ref];

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
        const ref = refs[node.ref];

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
          table.align[i] ? { textAlign: table.align[i] } : {};

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
              : text.replace(
                  HTML_CHAR_CODE_R,
                  (f, i) => namedCodesToUnicode[i] || f
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

const compilerCache = new Map<string, unknown>();

export const compile = (
  markdown: string = '',
  ctx: MarkdownContext,
  options: MarkdownOptions = {}
): unknown => {
  const cacheKey = JSON.stringify({
    markdown,
    options,
    components: ctx.components ? Object.keys(ctx.components) : [],
  });

  if (compilerCache.has(cacheKey)) {
    return compilerCache.get(cacheKey);
  }

  const components = ctx.components ?? {};
  const slug = (input: string) =>
    ctx.slugify ? ctx.slugify(input, defaultSlugify) : defaultSlugify(input);
  const createElement = createElementFactory(ctx, options);
  const footnotes: FootnoteDef[] = [];
  const refs: Record<string, { target: string; title?: string }> = {};

  const attrStringToMap = (
    tag: HTMLTag,
    str: string
  ): Record<string, any> | null => {
    if (!str || !str.trim()) return null;
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
          (HTML_BLOCK_ELEMENT_R.test(map[mappedKey]) ||
            HTML_SELF_CLOSING_ELEMENT_R.test(map[mappedKey]))
        ) {
          map[mappedKey] = compileInner(map[mappedKey].trim());
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
  ];

  const containsBlockSyntax = (input: string): boolean => {
    const cleaned = input.replace(TRIM_STARTING_NEWLINES, '');
    const slice = cleaned.length > 2048 ? cleaned.slice(0, 2048) : cleaned;
    const syntaxes = options.disableParsingRawHTML
      ? nonParagraphBlockSyntaxes
      : [
          ...nonParagraphBlockSyntaxes,
          PARAGRAPH_R,
          HTML_BLOCK_ELEMENT_R,
          HTML_COMMENT_R,
          HTML_SELF_CLOSING_ELEMENT_R,
          CUSTOM_COMPONENT_R,
        ];

    return some(syntaxes as RegExp[], slice);
  };

  const baseRules = createRules(
    createElement,
    ctx,
    options,
    footnotes,
    refs,
    attrStringToMap,
    containsBlockSyntax,
    nonParagraphBlockSyntaxes
  );

  const rules = options.disableParsingRawHTML
    ? Object.keys(baseRules).reduce((acc, key) => {
        if (key !== RuleType.htmlBlock && key !== RuleType.htmlSelfClosing) {
          acc[key] = baseRules[key];
        }

        return acc;
      }, {} as Rules)
    : baseRules;

  const parser = parserFor(rules);
  const emitter = renderFor(createRenderer(rules, options.renderRule));

  const compileInner = (input: string): unknown => {
    const result = options.preserveFrontmatter
      ? input
      : input.replace(FRONT_MATTER_R, '');
    const inline =
      options.forceInline ||
      (!options.forceBlock &&
        SHOULD_RENDER_AS_BLOCK_R.test(
          result.replace(TRIM_STARTING_NEWLINES, '')
        ) === false);
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
    )
      arr.pop();

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

  if (process.env.NODE_ENV !== 'production' && typeof markdown !== 'string')
    throw new Error('intlayer: the first argument must be a string');

  const node = compileInner(markdown);

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
              emitter(parser(def.footnote, { inline: true }), { inline: true })
            )
          )
        )
      )
    : node;

  compilerCache.set(cacheKey, result);

  return result;
};

export const createCompiler =
  (ctx: MarkdownContext) =>
  (markdown: string, options?: MarkdownOptions): unknown =>
    compile(markdown, ctx, options);

export const compileWithOptions = (
  markdown: string,
  runtime: MarkdownRuntime,
  options: CompileOptions = {}
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
