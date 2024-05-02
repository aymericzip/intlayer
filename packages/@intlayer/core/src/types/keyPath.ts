import type { NodeType } from './nodeType';

export type ObjectExpressionNode = {
  type: 'ObjectExpression';
  key: string;
};

export type TranslationOrEnumerationNode = {
  type: NodeType;
  key: string;
};

export type KeyPath = ObjectExpressionNode | TranslationOrEnumerationNode;
