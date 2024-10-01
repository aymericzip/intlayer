import type { NodeType } from './nodeType';

export type ObjectNode = {
  type: NodeType.Object;
  key: string;
};

export type ArrayNode = {
  type: NodeType.Array;
  key: number;
};

export type EnumerationNode = {
  type: NodeType.Enumeration;
  key: string;
};

export type TranslationNode = {
  type: NodeType.Translation;
  key: string;
};

export type KeyPath =
  | ObjectNode
  | ArrayNode
  | TranslationNode
  | EnumerationNode;
