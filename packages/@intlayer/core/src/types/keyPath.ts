import type { NodeType } from './nodeType';

export type ObjectExpressionNode = {
  type: 'ObjectExpression';
  key: string;
};

export type ArrayExpressionNode = {
  type: 'ArrayExpression';
  key: number;
};

export type TranslationOrEnumerationNode = {
  type: NodeType;
  key: string;
};

export type KeyPath =
  | ObjectExpressionNode
  | ArrayExpressionNode
  | TranslationOrEnumerationNode;
