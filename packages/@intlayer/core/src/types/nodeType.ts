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
  Gender = 'gender',
  Null = 'null',
  Unknown = 'unknown',
}

type AdditionalAttributesType = {
  [key: string]: unknown;
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
  Content = unknown,
  AdditionalAttributes extends AdditionalAttributesType = {},
>(
  nodeType: T | `${T}`,
  content: Content,
  additionalAttributes?: { [key: string]: unknown }
) =>
  ({
    ...additionalAttributes,
    nodeType,
    [nodeType]: content,
  }) as TypedNodeModel<T, Content, AdditionalAttributes>;
