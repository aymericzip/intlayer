import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { packageList } from '@intlayer/chokidar/cli';

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

/**
 * Detects which intlayer package is used in the project by reading package.json.
 */
export const detectPackageName = (searchDir: string): string | undefined => {
  let currentDir = searchDir;
  while (currentDir !== dirname(currentDir)) {
    const pkgPath = join(currentDir, 'package.json');
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        const allDeps = {
          ...pkg.dependencies,
          ...pkg.devDependencies,
          ...pkg.peerDependencies,
        };
        for (const pkgName of packageList) {
          if (allDeps[pkgName]) return pkgName;
        }
      } catch {
        // Ignore JSON errors
      }
    }
    currentDir = dirname(currentDir);
  }
  return undefined;
};
