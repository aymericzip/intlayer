/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locales } from '@intlayer/config';
import type { NodeType } from '@intlayer/core';
import { isValidElement, type ReactNode } from 'react';
import {
  type IntlayerNode,
  renderIntlayerEditor,
} from './editor/renderContentEditor';

type TransformNodeType<T, L extends Locales, R extends boolean> = T extends {
  [NodeType.Enumeration]: { '1': any };
}
  ? (
      quantity: number
    ) => DeepTransformContent<T[NodeType.Enumeration]['1'], L, R>
  : T extends {
        [NodeType.Translation]: object;
      }
    ? L extends keyof T[NodeType.Translation]
      ? DeepTransformContent<T[NodeType.Translation][L], L, R>
      : never
    : T;

export type DeepTransformContent<
  T,
  L extends Locales,
  R extends boolean,
> = T extends object // Check if the property is an object
  ? T extends (infer U)[] // If it's an array, infer the type of array elements
    ? DeepTransformContent<U, L, R>[] // Apply DeepTransformContent recursively to each element of the array
    : T extends {
          nodeType: NodeType | string;
        }
      ? TransformNodeType<T, L, R>
      : T extends { _owner: any; key: any; props: any; ref: any }
        ? ReactNode
        : {
            [K in keyof T]: DeepTransformContent<T[K], L, R>;
          }
  : T extends undefined
    ? never
    : R extends true
      ? IntlayerNode<T>
      : T;

/**
 * Go through the object. If a object has a keyPath, render the intlayer editor if editor enabled.
 */
export const recursiveTransformContent = (
  value: any,
  isRenderEditor = false
): object => {
  if (typeof value === 'function') {
    return (props: any) =>
      recursiveTransformContent(value(props), isRenderEditor);
  } else if (typeof value === 'object') {
    if (typeof value.dictionaryKey !== 'undefined') {
      if (isRenderEditor) {
        return renderIntlayerEditor(value);
      }
      return value.content;
    } else if (Array.isArray(value)) {
      return value.map((el) => recursiveTransformContent(el, isRenderEditor));
    } else if (isValidElement(value)) {
      return value;
    }

    return Object.entries(value).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: recursiveTransformContent(value, isRenderEditor),
      }),
      {} as object
    );
  }

  return value;
};
