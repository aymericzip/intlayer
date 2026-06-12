import {
  GETTER_NAMESPACE_ARG_INDEX,
  getStringArgAt,
  isIntlayerCall,
  type OxcNode,
  parseText,
  walkAst,
} from './oxcUtils';

/**
 * Scan `text` for a getter call whose namespace/key argument span contains
 * `offset`.  Returns the namespace string, or `null` when the cursor is not
 * inside any recognised getter's key argument.
 *
 * Handles:
 *   useIntlayer("my-key")           ← cursor on "my-key"
 *   useTranslations("namespace")    ← cursor on "namespace"
 *   getFixedT("en", "namespace")    ← cursor on "namespace" (2nd arg), not "en"
 *   useI18n(...)                    ← always null (no positional namespace)
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
    if (offset < start || offset > end) return true; // outside call span — prune

    const callee = node['callee'] as OxcNode;
    const funcName = callee['name'] as string;
    const argIndex = GETTER_NAMESPACE_ARG_INDEX.get(funcName) ?? 0;
    if (argIndex < 0) return true; // useI18n — no positional namespace

    const args = node['arguments'] as OxcNode[] | undefined;
    const namespaceArg = args?.[argIndex];
    if (!namespaceArg) return true;

    // Only trigger when the cursor is within the namespace arg, not on
    // a different arg (e.g. the locale in getFixedT("en", "ns")).
    const argStart = namespaceArg['start'] as number;
    const argEnd = namespaceArg['end'] as number;
    if (offset < argStart || offset > argEnd) return true;

    result = getStringArgAt(node, argIndex);
    return true;
  });

  return result;
};
