import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

export type ExistingIntlayerInfo = {
  key: string;
  hook: 'useIntlayer' | 'getIntlayer';
  /** The variable name used to store the call result (e.g. `t` in `const t = useIntlayer(...)`) */
  variableName: string;
  /** True when the call result is destructured: `const { a, b } = getIntlayer(...)` */
  isDestructured: boolean;
  /** Keys already present in the destructuring pattern (empty when not destructured) */
  existingDestructuredKeys: string[];
  /** The ObjectPattern AST node, present only when `isDestructured` is true */
  objectPatternNode?: t.ObjectPattern;
};

/**
 * Searches for an existing useIntlayer or getIntlayer call in the function body.
 */
export const getExistingIntlayerInfo = (
  path: NodePath
): ExistingIntlayerInfo | undefined => {
  let result: ExistingIntlayerInfo | undefined;

  // We only check the direct body of the function, not nested functions
  path.traverse({
    CallExpression(childPath) {
      const callee = childPath.node.callee;

      if (
        t.isIdentifier(callee) &&
        (callee.name === 'useIntlayer' || callee.name === 'getIntlayer')
      ) {
        const arg = childPath.node.arguments[0];

        if (t.isStringLiteral(arg)) {
          const parentNode = childPath.parent;
          let isDestructured = false;
          let existingDestructuredKeys: string[] = [];
          let objectPatternNode: t.ObjectPattern | undefined;
          let variableName = 'content';

          if (t.isVariableDeclarator(parentNode)) {
            if (t.isObjectPattern(parentNode.id)) {
              isDestructured = true;
              objectPatternNode = parentNode.id;
              existingDestructuredKeys = parentNode.id.properties
                .filter(
                  (p): p is t.ObjectProperty =>
                    t.isObjectProperty(p) && t.isIdentifier(p.key)
                )
                .map((p) => (p.key as t.Identifier).name);
            } else if (t.isIdentifier(parentNode.id)) {
              variableName = parentNode.id.name;
            }
          }

          result = {
            key: arg.value,
            hook: callee.name as 'useIntlayer' | 'getIntlayer',
            variableName,
            isDestructured,
            existingDestructuredKeys,
            objectPatternNode,
          };
          childPath.stop();
        }
      }
    },
    Function(childPath) {
      childPath.skip(); // Don't look inside nested functions
    },
  });

  return result;
};
