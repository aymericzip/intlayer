/**
 * Framework-agnostic markdown parser.
 * Converts markdown string to AST (Abstract Syntax Tree).
 *
 * This is part of the Solution F (Hybrid AST + Callback Pattern) implementation
 * for GitHub Issue #289: Adapt markdown parser in custom packages
 */

import { DURATION_DELAY_TRIGGER } from './constants';
import type { NestedParser, ParserResult, ParseState, Rules } from './types';
import { normalizeWhitespace, qualifies } from './utils';

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
  const start = performance.now();
  const ruleList = Object.keys(rules);

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

  const nestedParse: NestedParser = (
    source: string,
    state: ParseState = {}
  ): ParserResult[] => {
    const parseStart = performance.now();
    const result: ParserResult[] = [];
    state.prevCapture = state.prevCapture || '';

    if (source.trim()) {
      while (source) {
        let i = 0;
        while (i < ruleList.length) {
          const ruleType = ruleList[i];
          const rule = rules[ruleType];

          if (rule._qualify && !qualifies(source, state, rule._qualify)) {
            i++;
            continue;
          }

          const matchStart = performance.now();
          const capture = rule._match(source, state);
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

            if (!parsedAny.type) {
              parsedAny.type = ruleType;
            }
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
  if (duration > DURATION_DELAY_TRIGGER) {
    console.log(
      `parserFor: ${duration.toFixed(3)}ms, rules count: ${ruleList.length}`
    );
  }

  return (source: string, state: ParseState) =>
    nestedParse(normalizeWhitespace(source), state);
};
