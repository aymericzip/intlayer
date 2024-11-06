/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Locales } from '@intlayer/config';
import type {
  DeclarationContent,
  DictionaryValue,
  NodeType,
} from '@intlayer/core';
import { renderIntlayerEditor } from 'intlayer-editor';
import { isValidElement, type ReactNode } from 'react';
import { processDictionary } from './processDictionary/index';

export type IntlayerNode<T = string> = ReactNode & {
  value: T;
};

type TransformNodeType<T, L extends Locales> = T extends {
  [NodeType.Enumeration]: { '1': any };
}
  ? (quantity: number) => DeepTransformContent<T[NodeType.Enumeration]['1'], L>
  : T extends {
        [NodeType.Translation]: object;
      }
    ? L extends keyof T[NodeType.Translation]
      ? DeepTransformContent<T[NodeType.Translation][L], L>
      : never
    : T;

export type DeepTransformContent<T, L extends Locales> = T extends object // Check if the property is an object
  ? T extends (infer U)[] // If it's an array, infer the type of array elements
    ? DeepTransformContent<U, L>[] // Apply DeepTransformContent recursively to each element of the array
    : T extends {
          nodeType: NodeType | string;
        }
      ? TransformNodeType<T, L>
      : T extends { _owner: any; key: any; props: any; ref: any }
        ? ReactNode
        : {
            [K in keyof T]: DeepTransformContent<T[K], L>;
          }
  : T extends undefined
    ? never
    : IntlayerNode<T>;

/**
 * Go through the object. If a object has a keyPath, render the intlayer editor if editor enabled.
 */
export const recursiveTransformContent = (
  value: any,
  isContentSelectable = false
): object => {
  if (typeof value === 'function') {
    return (props: any) =>
      recursiveTransformContent(value(props), isContentSelectable);
  } else if (typeof value === 'object') {
    if (typeof value.dictionaryId !== 'undefined') {
      return renderIntlayerEditor(value, isContentSelectable);
    } else if (Array.isArray(value)) {
      return value.map((el) =>
        recursiveTransformContent(el, isContentSelectable)
      );
    } else if (isValidElement(value)) {
      return value;
    }

    return Object.entries(value).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: recursiveTransformContent(value, isContentSelectable),
      }),
      {} as object
    );
  }

  return value;
};

type DataFromDictionary<
  T extends DeclarationContent,
  K extends Locales,
> = DeepTransformContent<T['content'], K>;

export type UseDictionary = <T extends DeclarationContent, L extends Locales>(
  dictionary: T,
  locale?: L
) => DataFromDictionary<T, L>;

// Add description is JSDoc
/**
 * Hook that picks one dictionary by its id and return the content
 *
 * If the locale is not provided, it will use the locale from the client context
 */
export const useDictionaryBase: UseDictionary = <
  T extends DeclarationContent,
  L extends Locales,
>(
  dictionary: T,
  locale?: L,
  isContentSelectable = false
) => {
  const result = processDictionary(
    dictionary.content as DictionaryValue,
    dictionary.key,
    dictionary.filePath,
    [],
    locale
  );

  return recursiveTransformContent(
    result,
    isContentSelectable
  ) as DataFromDictionary<T, L>;
};
