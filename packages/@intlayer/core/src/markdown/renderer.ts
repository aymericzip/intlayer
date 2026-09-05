import type {
  ParserResult,
  ParseState,
  RenderRuleHook,
  Rule,
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

export const renderFor = (
  render: (ast: ParserResult, render: RuleOutput, state: ParseState) => unknown
) => {
  const emit = (
    ast: ParserResult | ParserResult[],
    state: ParseState = {}
  ): any => {
    if (!Array.isArray(ast)) {
      return render(ast, emit as RuleOutput, state);
    }

    const oldKey = state.key;
    const result: any[] = [];

    let lastWasString = false;
    let renderedIndex = 0;

    for (let i = 0; i < ast.length; i++) {
      state.key = renderedIndex;
      const node = ast[i]!;
      const nodeOut = Array.isArray(node)
        ? emit(node, state)
        : render(node, emit as RuleOutput, state);
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

    return result;
  };

  return emit;
};

/**
 * Creates a renderer from rules with optional custom render hook.
 */
export const createRenderer = (rules: Rules, userRender?: RenderRuleHook) => {
  const renderers: Record<string, Rule<any>['_render']> = {};
  for (const type in rules) renderers[type] = rules[type]?._render;

  if (!userRender) {
    return (
      ast: ParserResult,
      render: RuleOutput,
      state: ParseState
    ): unknown => {
      const r = renderers[ast.type];
      return r ? r(ast, render, state) : undefined;
    };
  }

  return (
    ast: ParserResult,
    render: RuleOutput,
    state: ParseState
  ): unknown => {
    const renderer = renderers[ast.type];

    return userRender(() => renderer?.(ast, render, state), ast, render, state);
  };
};
