import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

/**
 * Searches for an existing useIntlayer or getIntlayer call in the function body.
 */
export const getExistingIntlayerInfo = (
  path: NodePath
): { key: string; hook: 'useIntlayer' | 'getIntlayer' } | undefined => {
  let result: { key: string; hook: 'useIntlayer' | 'getIntlayer' } | undefined;

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
          result = {
            key: arg.value,
            hook: callee.name as 'useIntlayer' | 'getIntlayer',
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
