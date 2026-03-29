export const TRANSLATION = 'translation' as const;
export const ENUMERATION = 'enumeration' as const;
export const CONDITION = 'condition' as const;
export const INSERTION = 'insertion' as const;
export const FILE = 'file' as const;
export const OBJECT = 'object' as const;
export const ARRAY = 'array' as const;
export const NESTED = 'nested' as const;
export const REACT_NODE = 'reactNode' as const;
export const MARKDOWN = 'markdown' as const;
export const HTML = 'html' as const;
export const TEXT = 'text' as const;
export const NUMBER = 'number' as const;
export const BOOLEAN = 'boolean' as const;
export const GENDER = 'gender' as const;
export const NULL = 'null' as const;
export const UNKNOWN = 'unknown' as const;

/**
 * NodeType strings that correspond to plugins that can be conditionally
 * removed from the bundle when unused.
 */
export const PLUGIN_NODE_TYPES: readonly [
  typeof TRANSLATION,
  typeof ENUMERATION,
  typeof CONDITION,
  typeof INSERTION,
  typeof GENDER,
  typeof NESTED,
  typeof FILE,
  typeof MARKDOWN,
  typeof HTML,
] = [
  TRANSLATION,
  ENUMERATION,
  CONDITION,
  INSERTION,
  GENDER,
  NESTED,
  FILE,
  MARKDOWN,
  HTML,
] as const;

export type NodeType =
  | typeof TRANSLATION
  | typeof ENUMERATION
  | typeof CONDITION
  | typeof INSERTION
  | typeof FILE
  | typeof OBJECT
  | typeof ARRAY
  | typeof NESTED
  | typeof REACT_NODE
  | typeof MARKDOWN
  | typeof HTML
  | typeof TEXT
  | typeof NUMBER
  | typeof BOOLEAN
  | typeof GENDER
  | typeof NULL
  | typeof UNKNOWN;

type AdditionalAttributesType = {
  [key: string]: unknown;
};

export type TypedNodeModel<
  T extends NodeType,
  Content,
  AdditionalAttributes extends AdditionalAttributesType = {},
> = {
  nodeType: T;
} & {
  [K in T]: Content;
} & AdditionalAttributes;

export const formatNodeType = <
  T extends NodeType,
  Content = unknown,
  AdditionalAttributes extends AdditionalAttributesType = {},
>(
  nodeType: T,
  content: Content,
  additionalAttributes?: { [key: string]: unknown }
) =>
  ({
    ...additionalAttributes,
    nodeType,
    [nodeType]: content,
  }) as TypedNodeModel<T, Content, AdditionalAttributes>;
