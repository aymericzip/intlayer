import { RuleType, SCOPE_BLOCK, SCOPE_INLINE } from './constants';
import type {
  NestedParser,
  ParserResult,
  ParseState,
  Rule,
  Rules,
} from './types';
import { normalizeWhitespace, qualifies } from './utils';

/**
 * Advance the incremental lookbehind carried on the parse state.
 *
 * Rules only ever ask two questions about the source already consumed: how far
 * the current line is indented (`prevCaptureIndent`) and whether a blank line
 * has been seen (`prevCaptureHasBlankLine`). Both are maintained in time
 * proportional to the capture rather than by concatenating — and later
 * rescanning — the whole document, which made parsing quadratic.
 */
const advanceLookbehind = (state: ParseState, capture: string): void => {
  const newlineIndex = capture.lastIndexOf('\n');

  if (state.prevCaptureHasBlankLine !== true) {
    state.prevCaptureHasBlankLine =
      (newlineIndex !== -1 && capture.indexOf('\n\n') !== -1) ||
      (state.prevCaptureHasBlankLine !== undefined &&
        capture.charCodeAt(0) === 10 &&
        state.prevCaptureIndent === '');
  }

  const tail =
    newlineIndex === -1
      ? state.prevCaptureIndent === undefined
        ? undefined
        : state.prevCaptureIndent === ''
          ? capture
          : state.prevCaptureIndent + capture
      : capture.slice(newlineIndex + 1);

  if (tail === undefined || tail === '') {
    state.prevCaptureIndent = tail;
    return;
  }

  for (let i = 0; i < tail.length; i++) {
    if (tail.charCodeAt(i) !== 32) {
      state.prevCaptureIndent = undefined;
      return;
    }
  }

  state.prevCaptureIndent = tail;
};

/**
 * Creates a parser for a given set of rules, with the precedence
 * specified as a list of rules.
 */
export const parserFor = (
  rules: Rules
): ((source: string, state: ParseState) => ParserResult[]) => {
  const order = Object.keys(rules).sort(
    (a, b) => rules[a]!._order - rules[b]!._order || +a - +b
  );
  const ruleCount = order.length;

  const qualifiers: (Rule<any>['_qualify'] | undefined)[] = new Array(
    ruleCount
  );
  const matchers: Rule<any>['_match'][] = new Array(ruleCount);
  const parsers: Rule<any>['_parse'][] = new Array(ruleCount);
  const ruleFirstChars: (number[] | null)[] = new Array(ruleCount);
  const ruleIsBlock: boolean[] = new Array(ruleCount);
  const ruleIsInline: boolean[] = new Array(ruleCount);
  const blockDefaultCandidates: number[] = [];
  const inlineDefaultCandidates: number[] = [];

  for (let i = 0; i < ruleCount; i++) {
    const rule = rules[order[i]!]!;
    let q = rule._qualify;
    matchers[i] = rule._match;
    parsers[i] = rule._parse;

    const rawScope = rule._scope;
    const isBlock = rawScope !== SCOPE_INLINE;
    const isInline = rawScope !== SCOPE_BLOCK;

    ruleIsBlock[i] = isBlock;
    ruleIsInline[i] = isInline;

    if (rule._firstChars && rule._firstChars.length > 0) {
      ruleFirstChars[i] = rule._firstChars;
    } else if (
      Array.isArray(q) &&
      q.length > 0 &&
      q.every((p) => p.length > 0)
    ) {
      ruleFirstChars[i] = q.map((p) => p.charCodeAt(0));
      if (q.every((p) => p.length === 1)) q = undefined;
    } else {
      ruleFirstChars[i] = null;
      if (isBlock) blockDefaultCandidates.push(i);
      if (isInline) inlineDefaultCandidates.push(i);
    }
    qualifiers[i] = q;
  }

  const blockAsciiCandidates: number[][] = new Array(128);
  const inlineAsciiCandidates: number[][] = new Array(128);
  for (let code = 0; code < 128; code++) {
    const bList: number[] = [];
    const iList: number[] = [];
    for (let i = 0; i < ruleCount; i++) {
      const isBlock = ruleIsBlock[i]!;
      const isInline = ruleIsInline[i]!;
      const chars = ruleFirstChars[i];

      if (isBlock && (!chars || chars.includes(code))) {
        bList.push(i);
      }
      if (isInline && (!chars || chars.includes(code))) {
        iList.push(i);
      }
    }
    blockAsciiCandidates[code] = bList;
    inlineAsciiCandidates[code] = iList;
  }

  const nestedParse: NestedParser = (
    source: string,
    state: ParseState = {}
  ): ParserResult[] => {
    const result: ParserResult[] = [];
    const isInline = Boolean(state.inline || state.simple);

    if (state.prevCaptureHasBlankLine === undefined) {
      state.prevCaptureIndent = '';
    }

    // Quick non-allocating whitespace check
    let hasContent = false;
    for (let j = 0; j < source.length; j++) {
      const c = source.charCodeAt(j);
      if (c !== 32 && c !== 9 && c !== 10 && c !== 13) {
        hasContent = true;
        break;
      }
    }

    if (hasContent) {
      const asciiCandidates = isInline
        ? inlineAsciiCandidates
        : blockAsciiCandidates;
      const defaultCandidates = isInline
        ? inlineDefaultCandidates
        : blockDefaultCandidates;

      while (source) {
        const code = source.charCodeAt(0);
        const candidates =
          code < 128 ? asciiCandidates[code]! : defaultCandidates;
        const candidateCount = candidates.length;
        let matched = false;

        for (let c = 0; c < candidateCount; c++) {
          const i = candidates[c]!;
          const qualify = qualifiers[i];

          if (qualify && !qualifies(source, state, qualify)) continue;

          const capture = matchers[i]!(source, state);

          if (capture?.[0]) {
            source = source.slice(capture[0].length);

            const parsed: any = parsers[i]!(capture, nestedParse, state);

            advanceLookbehind(state, capture[0]);

            const nodeType = parsed.type || order[i];
            parsed.type = nodeType;

            const len = result.length;
            if (nodeType === RuleType.text) {
              if (!parsed.text) {
                matched = true;
                break;
              }
              if (len > 0 && result[len - 1]!.type === RuleType.text) {
                (result[len - 1] as any).text += parsed.text;
                matched = true;
                break;
              }
            }

            result.push(parsed as ParserResult);
            matched = true;
            break;
          }
        }

        if (!matched) break;
      }
    }

    return result;
  };

  return (source: string, state: ParseState) =>
    nestedParse(normalizeWhitespace(source), state);
};
