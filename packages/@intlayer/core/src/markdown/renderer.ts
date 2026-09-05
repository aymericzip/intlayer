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
/**
 * Copies a parse state, overriding the key.
 *
 * Written out field by field rather than spread: the renderer clones once per
 * AST node, and a fixed-shape literal keeps every clone monomorphic instead of
 * sending V8 down its generic copy path. `ParseState` is closed, so this stays
 * exhaustive.
 */
const cloneStateWithKey = (state: ParseState, key: number): ParseState => ({
  inAnchor: state.inAnchor,
  inHTML: state.inHTML,
  inline: state.inline,
  inTable: state.inTable,
  key,
  list: state.list,
  prevCaptureIndent: state.prevCaptureIndent,
  prevCaptureHasBlankLine: state.prevCaptureHasBlankLine,
  simple: state.simple,
});

export const renderFor = (
  render: (ast: ParserResult, render: RuleOutput, state: ParseState) => unknown
) => {
  // Bound once instead of per node: rebuilding the recursive renderer on every
  // visit allocated a closure pair for each AST node.
  const emit = (
    ast: ParserResult | ParserResult[],
    state: ParseState = {}
  ): any => {
    if (!Array.isArray(ast)) {
      return render(ast, emit as RuleOutput, state);
    }

    const oldKey = state.key;
    const result: any[] = [];

    // map nestedOutput over the ast, except group any text
    // nodes together into a single string output.
    let lastWasString = false;
    let renderedIndex = 0;

    for (let i = 0; i < ast.length; i++) {
      // We clone the state to avoid side effects on other nodes in the same level
      // while ensuring each non-null rendered node gets a unique, sequential key.
      const nodeOut = emit(ast[i], cloneStateWithKey(state, renderedIndex));
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
 *
 * @param rules - The rules object containing _render functions
 * @param userRender - Optional custom render hook for full control
 * @returns A render function for AST nodes
 */
export const createRenderer = (rules: Rules, userRender?: RenderRuleHook) => {
  // Resolved once: the dictionary lookup and optional chain ran for every node
  // of every render, and the rule set never changes under a renderer.
  const renderers = new Map<string, Rule<any>['_render']>();
  for (const type in rules) renderers.set(type, rules[type]?._render);

  if (!userRender) {
    return (
      ast: ParserResult,
      render: RuleOutput,
      state: ParseState
    ): unknown => renderers.get(ast.type)?.(ast, render, state);
  }

  return (
    ast: ParserResult,
    render: RuleOutput,
    state: ParseState
  ): unknown => {
    const renderer = renderers.get(ast.type);

    return userRender(() => renderer?.(ast, render, state), ast, render, state);
  };
};
