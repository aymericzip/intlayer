import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

/**
 * Resolves the name of the component from various function declaration types.
 */
export const getComponentName = (path: NodePath): string | undefined => {
  if (path.isFunctionDeclaration()) {
    return path.node.id?.name;
  }

  if (path.isArrowFunctionExpression() || path.isFunctionExpression()) {
    if (
      path.parentPath.isVariableDeclarator() &&
      t.isIdentifier(path.parentPath.node.id)
    ) {
      return path.parentPath.node.id.name;
    }
  }

  return undefined;
};
