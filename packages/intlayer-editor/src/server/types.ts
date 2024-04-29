import type { NodeType } from '@intlayer/core';

export type ObjectExpressionNode = {
  type: 'ObjectExpression';
  key: string;
};

export type TranslationOrEnumerationNode = {
  type: NodeType;
  key: string;
};

export type KeyPath = ObjectExpressionNode | TranslationOrEnumerationNode;
