import type {
  NestedParser,
  ParserResult,
  ParseState,
  Rule,
  Rules,
} from './types';
import { normalizeWhitespace, qualifies } from './utils';

/**
 * Cached rule precedence, grouped by rule count.
 *
 * A rule's `_order` never varies, so the precedence a rule set sorts into is a
 * pure function of which rules it holds. Rules themselves are rebuilt per
 * document, so the cache is keyed by rule names rather than by object identity,
 * and grouped by count to keep the comparison short.
 */
type RuleOrderEntry = { names: string[]; order: string[] };

const ruleOrderCache = new Map<number, RuleOrderEntry[]>();

const sameNames = (a: string[], b: string[]): boolean => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

/**
 * Resolves `Object.keys(rules)` into precedence order, sorting only the first
 * time a given rule set is seen.
 */
const orderRules = (names: string[], rules: Rules): string[] => {
  const candidates = ruleOrderCache.get(names.length);

  if (candidates) {
    for (let i = 0; i < candidates.length; i++) {
      if (sameNames(names, candidates[i]!.names)) return candidates[i]!.order;
    }
  }

  // Sorts rules in order of increasing order, then
  // ascending rule name (numeric) in case of ties.
  // RuleType keys are string numbers — use numeric comparison to preserve
  // intended ordering (e.g. codeFenced '4' must precede headingSetext '10').
  const order = names
    .slice()
    .sort((a, b) => rules[a]!._order - rules[b]!._order || +a - +b);

  const entry: RuleOrderEntry = { names: names.slice(), order };

  if (candidates) candidates.push(entry);
  else ruleOrderCache.set(names.length, [entry]);

  return order;
};

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

  const order = orderRules(ruleList, rules);
  const ruleCount = order.length;

  // Rule objects have heterogeneous shapes (`_qualify` and `_render` are both
  // optional), so their members are hoisted into parallel arrays: the hot loop
  // then reads monomorphic slots instead of polymorphic properties, and the
  // whole set costs three allocations rather than one wrapper per rule.
  const qualifiers: (Rule<any>['_qualify'] | undefined)[] = new Array(
    ruleCount
  );
  const matchers: Rule<any>['_match'][] = new Array(ruleCount);
  const parsers: Rule<any>['_parse'][] = new Array(ruleCount);

  for (let i = 0; i < ruleCount; i++) {
    const rule = rules[order[i]!]!;

    qualifiers[i] = rule._qualify;
    matchers[i] = rule._match;
    parsers[i] = rule._parse;
  }

  // A rule declaring string prefixes can only ever match a source starting
  // with one of their first characters, so the whole rule is skipped for every
  // other character. Bucketing the rules by that character turns the dispatch
  // loop from "try all 33 rules" into "try the handful this character allows",
  // which is where most of a parse used to go. Rules qualifying by predicate
  // say nothing about their first character and stay in every bucket.
  const firstCharsOf = (qualify: Rule<any>['_qualify']): number[] | null => {
    if (!Array.isArray(qualify)) return null;

    const codes: number[] = [];
    for (let i = 0; i < qualify.length; i++) {
      const prefix = qualify[i]!;
      // An empty prefix qualifies everything, so the rule cannot be bucketed.
      if (prefix.length === 0) return null;
      codes.push(prefix.charCodeAt(0));
    }

    return codes;
  };

  const ruleFirstChars: (number[] | null)[] = new Array(ruleCount);
  for (let i = 0; i < ruleCount; i++) {
    const firstChars = firstCharsOf(qualifiers[i]);
    ruleFirstChars[i] = firstChars;

    // When every prefix is a single character, landing in the bucket already
    // proves the rule qualifies, so drop the check from the hot loop.
    if (
      firstChars &&
      (qualifiers[i] as string[]).every((prefix) => prefix.length === 1)
    ) {
      qualifiers[i] = undefined;
    }
  }

  const buildCandidates = (charCode: number): number[] => {
    const candidates: number[] = [];

    // Ascending `i` keeps the precedence the flat loop had.
    for (let i = 0; i < ruleCount; i++) {
      const firstChars = ruleFirstChars[i];

      if (!firstChars) {
        candidates.push(i);
        continue;
      }

      for (let c = 0; c < firstChars.length; c++) {
        if (firstChars[c] === charCode) {
          candidates.push(i);
          break;
        }
      }
    }

    return candidates;
  };

  // ASCII covers every markdown syntax character; anything else is rare enough
  // to sit in a map. Both are filled on first use and reused for the life of
  // the rule set.
  const asciiCandidates: (number[] | undefined)[] = new Array(128);
  const otherCandidates = new Map<number, number[]>();

  const candidatesFor = (charCode: number): number[] => {
    if (charCode < 128) {
      const cached = asciiCandidates[charCode];
      if (cached) return cached;

      const built = buildCandidates(charCode);
      asciiCandidates[charCode] = built;
      return built;
    }

    const cached = otherCandidates.get(charCode);
    if (cached) return cached;

    const built = buildCandidates(charCode);
    otherCandidates.set(charCode, built);
    return built;
  };

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
        const candidates = candidatesFor(source.charCodeAt(0));
        const candidateCount = candidates.length;

        for (let c = 0; c < candidateCount; c++) {
          const i = candidates[c]!;
          const qualify = qualifiers[i];

          if (qualify && !qualifies(source, state, qualify)) continue;

          const capture = matchers[i]!(source, state);

          if (capture?.[0]) {
            source = source.substring(capture[0].length);

            const parsed: any = parsers[i]!(capture, nestedParse, state);

            advanceLookbehind(state, capture[0]);

            if (!parsed.type) {
              parsed.type = order[i];
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
