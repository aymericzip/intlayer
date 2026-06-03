import {
  getFirstStringArg,
  isIntlayerCall,
  parseText,
  walkAst,
} from './oxcUtils';

/**
 * Scan `text` for a useIntlayer / getIntlayer call whose AST span contains
 * `offset`.  Returns the dictionary key string, or `null` when the cursor is
 * not inside any recognised call.
 *
 * Handles:
 *   useIntlayer("my-key")
 *   getIntlayer<Type>("my-key", locale)
 *   useIntlayer(
 *     "my-key"          ← multi-line
 *   )
 *   useIntlayer(`my-key`)
 */
export const findKeyAtOffset = (
  text: string,
  offset: number
): string | null => {
  const program = parseText(text);
  if (!program) return null;

  let result: string | null = null;

  walkAst(program, (node) => {
    if (result) return true; // already found — prune remaining
    if (!isIntlayerCall(node)) return;

    const start = node['start'] as number;
    const end = node['end'] as number;
    if (offset < start || offset > end) return true; // outside span — prune

    result = getFirstStringArg(node);
    return true;
  });

  return result;
};
