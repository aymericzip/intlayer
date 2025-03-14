export enum NodeType {
  Translation = 'translation',
  Enumeration = 'enumeration',
  Condition = 'condition',
  Insertion = 'insertion',
  File = 'file',
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

type AdditionalAttributesType = {
  [key: string]: any;
};

export type TypedNodeModel<
  T extends NodeType,
  Content,
  AdditionalAttributes extends AdditionalAttributesType = {},
> = {
  nodeType: T | `${T}`;
} & {
  [K in T]: Content;
} & AdditionalAttributes;

export const formatNodeType = <
  T extends NodeType,
  Content = any,
  AdditionalAttributes extends AdditionalAttributesType = {},
>(
  nodeType: T | `${T}`,
  content: Content,
  additionalAttributes?: { [key: string]: any }
) =>
  ({
    ...additionalAttributes,
    nodeType,
    [nodeType]: content,
  }) as TypedNodeModel<T, Content, AdditionalAttributes>;
