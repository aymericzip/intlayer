import type {
  NestedParser,
  ParserResult,
  ParseState,
  Rule,
  Rules,
} from './types';
import { normalizeWhitespace, qualifies } from './utils';

/**
 * A rule flattened into a plain object, resolved once at `parserFor` time so
 * the hot loop never re-reads properties off the rules record.
 */
type CompiledRule = {
  type: string;
  qualify: Rule<any>['_qualify'];
  match: Rule<any>['_match'];
  parse: Rule<any>['_parse'];
};

/** Rule precedence, keyed by the set of rule names taking part in the parse. */
const ruleOrderCache = new Map<string, string[]>();

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
  // `undefined` marks a lookbehind nothing has been appended to yet, which is
  // the only way to tell an empty lookbehind from one ending on a line break.
  const hasPrevCapture = state.prevCaptureHasBlankLine !== undefined;

  if (state.prevCaptureHasBlankLine !== true) {
    state.prevCaptureHasBlankLine =
      capture.indexOf('\n\n') !== -1 ||
      // A capture opening on a line break closes a blank line when the
      // lookbehind already ended on one.
      (hasPrevCapture &&
        capture.charCodeAt(0) === 10 /* \n */ &&
        state.prevCaptureIndent === '');
  }

  // Everything after the final newline forms the current line. With no newline
  // in the capture, the current line simply grew by `capture`.
  const tail =
    newlineIndex === -1
      ? state.prevCaptureIndent === undefined
        ? undefined
        : state.prevCaptureIndent + capture
      : capture.slice(newlineIndex + 1);

  if (tail === undefined || tail === '') {
    state.prevCaptureIndent = tail;
    return;
  }

  for (let i = 0; i < tail.length; i++) {
    if (tail.charCodeAt(i) !== 32 /* space */) {
      state.prevCaptureIndent = undefined;
      return;
    }
  }

  state.prevCaptureIndent = tail;
};

/**
 * Creates a parser for a given set of rules, with the precedence
 * specified as a list of rules.
 *
 * @param rules - An object containing rule type -> {match, order, parse} objects
 *                (lower order is higher precedence)
 *
 * @returns The resulting parse function
 */
export const parserFor = (
  rules: Rules
): ((source: string, state: ParseState) => ParserResult[]) => {
  const ruleList = Object.keys(rules);

  if (process.env.NODE_ENV !== 'production') {
    ruleList.forEach((type) => {
      const order = rules[type]?._order;
      if (typeof order !== 'number' || !Number.isFinite(order)) {
        console.warn(`intlayer: Invalid order for rule \`${type}\`: ${order}`);
      }
    });
  }

  // Rules are rebuilt for every parse (they close over per-document footnote
  // and reference tables), but the precedence they sort into only depends on
  // which rules are present — so the resulting order is cached and reused.
  const cacheKey = ruleList.join(',');
  const cachedOrder = ruleOrderCache.get(cacheKey);

  if (cachedOrder) {
    ruleList.length = 0;
    ruleList.push(...cachedOrder);
  } else {
    // Sorts rules in order of increasing order, then
    // ascending rule name (numeric) in case of ties.
    // RuleType keys are string numbers — use numeric comparison to preserve
    // intended ordering (e.g. codeFenced '4' must precede headingSetext '10').
    ruleList.sort((a, b) => {
      return rules[a]!._order - rules[b]!._order || +a - +b;
    });

    ruleOrderCache.set(cacheKey, ruleList.slice());
  }

  const compiledRules: CompiledRule[] = ruleList.map((type) => {
    const rule = rules[type]!;

    return {
      type,
      qualify: rule._qualify,
      match: rule._match,
      parse: rule._parse,
    };
  });
  const ruleCount = compiledRules.length;

  const nestedParse: NestedParser = (
    source: string,
    state: ParseState = {}
  ): ParserResult[] => {
    const result: ParserResult[] = [];

    if (state.prevCaptureHasBlankLine === undefined) {
      // Nothing consumed yet: an empty lookbehind sits at the start of a line.
      state.prevCaptureIndent = '';
    }

    if (source.trim()) {
      while (source) {
        for (let i = 0; i < ruleCount; i++) {
          const rule = compiledRules[i];

          if (rule?.qualify && !qualifies(source, state, rule.qualify)) {
            continue;
          }

          const capture = rule?.match(source, state);

          if (capture?.[0]) {
            source = source.substring(capture[0].length);

            const parsed: any = rule?.parse(capture, nestedParse, state);

            advanceLookbehind(state, capture[0]);

            if (!parsed.type) {
              parsed.type = rule?.type;
            }

            result.push(parsed as ParserResult);
            break;
          }
        }
      }
    }

    return result;
  };

  return (source: string, state: ParseState) =>
    nestedParse(normalizeWhitespace(source), state);
};
