import { isValidElement, type ReactNode } from 'react';

/**
 * Plain text of a React node, e.g. `['Intlayer ', <b>VS Code</b>]` →
 * `'Intlayer VS Code'`. Used as the accessible label of a link.
 */
export const getNodeText = (node: ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return '';
};
