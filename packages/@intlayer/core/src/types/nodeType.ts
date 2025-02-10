/* eslint-disable @typescript-eslint/no-explicit-any */
export enum NodeType {
  Translation = 'translation',
  Enumeration = 'enumeration',
  Condition = 'condition',
  Object = 'object',
  Array = 'array',
  Nested = 'nested',
  ReactNode = 'reactNode',
  Markdown = 'markdown',
  Text = 'text',
  Number = 'number',
  Boolean = 'boolean',
  Unknown = 'unknown',
}

export type TypedNodeModel<T extends NodeType, Content> = {
  nodeType: T | `${T}`;
} & {
  [K in T]: Content;
};

export const formatNodeType = <T extends NodeType, Content = any>(
  nodeType: T | `${T}`,
  content: Content
) =>
  ({
    nodeType,
    [nodeType]: content,
  }) as TypedNodeModel<T, Content>;
