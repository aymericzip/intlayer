import { DURATION_DELAY_TRIGGER } from './constants';
import type {
  ParserResult,
  ParseState,
  RenderRuleHook,
  RuleOutput,
  Rules,
} from './types';

/**
 * Creates a renderer for AST nodes.
 * Renamed from `reactFor` to be framework-agnostic.
 *
 * @param render - The render function to call for each node
 * @returns A function that renders AST to output
 */
export const renderFor =
  (
    render: (
      ast: ParserResult,
      render: RuleOutput,
      state: ParseState
    ) => unknown
  ) =>
  (ast: ParserResult | ParserResult[], state: ParseState = {}): any => {
    const start = performance.now();

    const patchedRender = (
      ast: ParserResult | ParserResult[],
      state: ParseState = {}
    ): any => renderFor(render)(ast, state);

    if (Array.isArray(ast)) {
      const oldKey = state.key;
      const result: any[] = [];

      // map nestedOutput over the ast, except group any text
      // nodes together into a single string output.
      let lastWasString = false;
      let renderedIndex = 0;

      for (let i = 0; i < ast.length; i++) {
        // We clone the state to avoid side effects on other nodes in the same level
        // while ensuring each non-null rendered node gets a unique, sequential key.
        const nodeOut = patchedRender(ast[i], { ...state, key: renderedIndex });
        const isString = typeof nodeOut === 'string';

        if (isString && lastWasString) {
          result[result.length - 1] =
            (result[result.length - 1] as string) + nodeOut;
        } else if (nodeOut !== null) {
          result.push(nodeOut);
          renderedIndex++;
        }

        lastWasString = isString;
      }

      state.key = oldKey;

      const duration = performance.now() - start;
      if (duration > DURATION_DELAY_TRIGGER) {
        console.log(
          `renderFor (array): ${duration.toFixed(3)}ms, ast length: ${ast.length}`
        );
      }

      return result;
    }

    const result = render(ast, patchedRender as RuleOutput, state);

    const duration = performance.now() - start;
    if (duration > DURATION_DELAY_TRIGGER) {
      console.log(
        `renderFor (single): ${duration.toFixed(3)}ms, ast type: ${(ast as ParserResult).type}`
      );
    }

    return result;
  };

/**
 * Creates a renderer from rules with optional custom render hook.
 *
 * @param rules - The rules object containing _render functions
 * @param userRender - Optional custom render hook for full control
 * @returns A render function for AST nodes
 */
export const createRenderer =
  (rules: Rules, userRender?: RenderRuleHook) =>
  (ast: ParserResult, render: RuleOutput, state: ParseState): unknown => {
    const start = performance.now();
    const renderer = rules[ast.type]?._render;

    const result = userRender
      ? userRender(() => renderer?.(ast, render, state), ast, render, state)
      : renderer?.(ast, render, state);

    const duration = performance.now() - start;
    if (duration > DURATION_DELAY_TRIGGER) {
      console.log(
        `createRenderer: ${duration.toFixed(3)}ms, ast type: ${ast.type}, hasUserRender: ${!!userRender}`
      );
    }

    return result;
  };
