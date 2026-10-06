import type { KeyPath } from '@intlayer/types/keyPath';
import { ARRAY, OBJECT } from '@intlayer/types/nodeType';

/**
 * Property names to walk in the source file to reach an editor key path.
 * Translation / enumeration / … branches are not object properties in the
 * source, so they are skipped. The walk stops at an array item, which the
 * declaration finder cannot descend: the array property is the closest match.
 */
export const keyPathToFieldPath = (keyPath: KeyPath[]): string[] => {
  const fieldPath: string[] = [];

  for (const keyPathNode of keyPath) {
    if (keyPathNode.type === ARRAY) break;
    if (keyPathNode.type === OBJECT) fieldPath.push(keyPathNode.key);
  }

  return fieldPath;
};
