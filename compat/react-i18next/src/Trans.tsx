'use client';

import {
  parseTaggedMessage,
  type TaggedMessageToken,
} from '@intlayer/core/messageFormat';
import type { DictionaryKeys } from '@intlayer/types/module_augmentation';
import type { Namespace, TOptions } from 'i18next';
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import type { Trans as _Trans, TransProps } from 'react-i18next';
import { useTranslation } from './useTranslation';

/**
 * Renders parsed message tokens to React nodes, mapping tags to the
 * `components` prop (object or array form) or to the JSX children
 * (numbered tags `<1>…</1>` index into the children, react-i18next style).
 */
const renderTokens = (
  tokens: TaggedMessageToken[],
  components: Record<string, ReactElement> | readonly ReactElement[],
  childrenArray: ReactNode[]
): ReactNode[] =>
  tokens.map((token, tokenIndex) => {
    if (typeof token === 'string') return token;

    const renderedChildren = renderTokens(
      token.children,
      components,
      childrenArray
    );

    const mappedComponent = Array.isArray(components)
      ? components[Number(token.tag)]
      : (components as Record<string, ReactElement>)[token.tag];

    const fallbackChild = /^\d+$/.test(token.tag)
      ? childrenArray[Number(token.tag)]
      : undefined;

    const elementToClone = mappedComponent ?? fallbackChild;

    if (isValidElement(elementToClone)) {
      return cloneElement(
        elementToClone as ReactElement<{ children?: ReactNode }>,
        { key: tokenIndex },
        ...(renderedChildren.length
          ? renderedChildren
          : [
              (elementToClone as ReactElement<{ children?: ReactNode }>).props
                .children,
            ])
      );
    }

    // Native HTML tag in the message without a mapping — render it as-is
    if (/^[a-z][\w-]*$/.test(token.tag)) {
      const NativeTag = token.tag as keyof React.JSX.IntrinsicElements;
      return <NativeTag key={tokenIndex}>{renderedChildren}</NativeTag>;
    }

    // Unknown numbered tag — render its children unwrapped
    return <Fragment key={tokenIndex}>{renderedChildren}</Fragment>;
  });

/**
 * Drop-in for react-i18next's `<Trans>`.
 *
 * Supports `values` interpolation, `count` plural resolution, `context`,
 * `defaults` fallback, and component interpolation through the `components`
 * prop (object or array form) or numbered tags mapped onto JSX children.
 *
 * @example
 * ```tsx
 * <Trans i18nKey="richText" components={{ bold: <strong /> }} />
 * <Trans i18nKey="hello" count={2} values={{ name: 'John' }}>
 *   Hello <b>{'{{name}}'}</b>
 * </Trans>
 * ```
 */
export const Trans: typeof _Trans = function Trans<
  Key extends string = string,
  Ns extends Namespace = Namespace,
>({
  i18nKey,
  ns,
  values,
  count,
  context,
  defaults,
  components,
  tOptions,
  children,
}: TransProps<Key, Ns>): React.ReactElement {
  const { t } = useTranslation(
    (Array.isArray(ns) ? ns[0] : ns) as DictionaryKeys
  );

  const translateOptions: TOptions = {
    ...((tOptions ?? {}) as TOptions),
    ...((values ?? {}) as Record<string, unknown>),
  };
  if (count !== undefined) translateOptions.count = count;
  if (context !== undefined) translateOptions.context = context;
  if (typeof defaults === 'string') translateOptions.defaultValue = defaults;

  const translateFunction = t as unknown as (
    key: string,
    options?: TOptions
  ) => string;

  const message = i18nKey
    ? translateFunction(i18nKey as string, translateOptions)
    : (defaults ?? '');

  const resolvedMessage =
    typeof message === 'string' && message !== i18nKey
      ? message
      : (defaults ?? message);

  if (typeof resolvedMessage !== 'string') {
    return <>{children ?? resolvedMessage}</>;
  }

  const childrenArray = Children.toArray(children);

  const tokens = parseTaggedMessage(resolvedMessage);
  const hasTags = tokens.some((token) => typeof token !== 'string');

  if (!hasTags && !components) {
    return <>{resolvedMessage}</>;
  }

  return (
    <>
      {renderTokens(
        tokens,
        (components ?? {}) as Record<string, ReactElement>,
        childrenArray
      )}
    </>
  );
} as typeof _Trans;
