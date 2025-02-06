/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Locales } from '@intlayer/config/client';
import {
  getCondition,
  getEnumeration,
  getNesting,
  getTranslation,
} from '../index';
import { KeyPath, NodeType } from '../../types/index';
import type {
  ConditionContent,
  EnumerationContent,
  MarkdownContent,
  NestedContent,
  TranslationContent,
} from '../../transpiler';
import type { DeepTransformContent, Plugins } from './deepTransform';

/** ---------------------------------------------
 *  TRANSLATION PLUGIN
 *  --------------------------------------------- */

export type TranslationCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Translation]: object;
}
  ? DeepTransformContent<T[NodeType.Translation][keyof T[NodeType.Translation]]>
  : never;

/** Translation plugin. Replaces node with a locale string if nodeType = Translation. */
export const translationPlugin = (locale: Locales | `${Locales}`): Plugins => ({
  canHandle(node) {
    return typeof node === 'object' && node?.nodeType === NodeType.Translation;
  },
  transform(node: TranslationContent, props, deepTransformNode) {
    const result = structuredClone(node.translation);

    for (const key in result) {
      const childProps = {
        ...props,
        content: result[key as unknown as keyof typeof result],
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Translation, key } as KeyPath,
        ],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        result[key as unknown as keyof typeof result],
        childProps
      );
    }
    return getTranslation(result, locale);
  },
});

/** ---------------------------------------------
 *  ENUMERATION PLUGIN
 *  --------------------------------------------- */

export type EnumerationCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Enumeration]: object;
}
  ? (
      quantity: number
    ) => DeepTransformContent<
      T[NodeType.Enumeration][keyof T[NodeType.Enumeration]]
    >
  : never;

/** Enumeration plugin. Replaces node with a function that takes quantity => string. */
export const enumerationPlugin: Plugins = {
  canHandle(node) {
    return typeof node === 'object' && node?.nodeType === NodeType.Enumeration;
  },
  transform(node: EnumerationContent, props, deepTransformNode) {
    const result = structuredClone(node.enumeration);

    for (const key in result) {
      const child = result[key as unknown as keyof typeof result];
      const childProps = {
        ...props,
        content: child,
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Enumeration, key } as KeyPath,
        ],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        child,
        childProps
      );
    }

    return (quantity: number) => getEnumeration(result, quantity);
  },
};

/** ---------------------------------------------
 *  CONDITION PLUGIN
 *  --------------------------------------------- */

export type ConditionCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Condition]: object;
}
  ? (
      value: boolean
    ) => DeepTransformContent<
      T[NodeType.Condition][keyof T[NodeType.Condition]]
    >
  : never;

/** Condition plugin. Replaces node with a function that takes boolean => string. */
export const conditionPlugin: Plugins = {
  canHandle(node) {
    return typeof node === 'object' && node?.nodeType === NodeType.Condition;
  },
  transform(node: ConditionContent, props, deepTransformNode) {
    const result = structuredClone(node.condition);

    for (const key in result) {
      const child = result[key as keyof typeof result];
      const childProps = {
        ...props,
        content: child,
        keyPath: [
          ...props.keyPath,
          { type: NodeType.Condition, key } as KeyPath,
        ],
      };
      result[key as unknown as keyof typeof result] = deepTransformNode(
        child,
        childProps
      );
    }

    return (value: boolean) => getCondition(result, value);
  },
};

/** ---------------------------------------------
 *  NESTED PLUGIN
 *  --------------------------------------------- */

export type NestedCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Nested]: object;
}
  ? DeepTransformContent<object>
  : never;

/** Nested plugin. Replaces node with the result of `getNesting`. */
export const nestedPlugin: Plugins = {
  canHandle(node) {
    return typeof node === 'object' && node?.nodeType === NodeType.Nested;
  },
  transform(node: NestedContent) {
    return getNesting(node.nested.dictionaryKey, node.nested.path);
  },
};

/**
 * MARKDOWN PLUGIN
 */

export type MarkdownCond<T> = T extends {
  nodeType: NodeType | string;
  [NodeType.Markdown]: object;
}
  ? DeepTransformContent<string>
  : never;

/** Markdown plugin. Replaces node with a function that takes quantity => string. */
export const markdownPlugin: Plugins = {
  canHandle(node) {
    return typeof node === 'object' && node?.nodeType === NodeType.Markdown;
  },
  transform(node: MarkdownContent) {
    return node[NodeType.Markdown];
  },
};
