'use client';

import {
  parseTaggedMessage,
  type TaggedMessageToken,
} from '@intlayer/core/messageFormat';
import type { MessageId } from '@lingui/core';
import type { TransProps, TransRenderProps } from '@lingui/react';
import {
  type ComponentType,
  Fragment,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useLingui } from './useLingui';

type RichRenderer = (...args: unknown[]) => ReactNode;

/** Maps tagged tokens to React nodes using a components record (numbered or named). */
const renderTaggedTokens = (
  tokens: TaggedMessageToken[],
  components: Record<
    string,
    ComponentType<Record<string, unknown>> | ReactElement | unknown
  >
): ReactNode[] =>
  tokens.map((token, tokenIndex) => {
    if (typeof token === 'string') return token;
    const children = renderTaggedTokens(token.children, components);
    const component = components[token.tag];
    if (component === undefined) {
      return <Fragment key={tokenIndex}>{children}</Fragment>;
    }
    if (typeof component === 'function') {
      return (
        <Fragment key={tokenIndex}>
          {(component as RichRenderer)(<>{children}</>)}
        </Fragment>
      );
    }
    if (
      typeof component === 'object' &&
      component !== null &&
      'type' in component
    ) {
      const { type: TagComponent, props: tagProps } = component as ReactElement;
      return (
        <TagComponent
          key={tokenIndex}
          {...(tagProps as Record<string, unknown>)}
        >
          {children}
        </TagComponent>
      );
    }
    return <Fragment key={tokenIndex}>{children}</Fragment>;
  });

/**
 * Drop-in for `@lingui/react`'s `<Trans>`.
 *
 * Looks up the message `id` in the `messages` intlayer dictionary and renders
 * the result. When `components` is provided, named tags in the translated
 * string are mapped to React elements (uses `parseTaggedMessage` from
 * `@intlayer/core`).
 *
 * @example
 * ```tsx
 * // Simple message
 * <Trans id="home.title" message="Welcome" />
 *
 * // Rich text with components
 * <Trans
 *   id="legal.terms"
 *   message="I agree to the <link>terms</link>"
 *   components={{ link: <a href="/terms" /> }}
 * />
 * ```
 */
export const Trans = ({
  id,
  message,
  values,
  components,
  formats: _formats,
  comment: _comment,
  render,
  component: WrapperComponent,
}: TransProps): ReactElement | null => {
  const { i18n, defaultComponent: DefaultComponent } = useLingui();

  const translation = i18n._(id as MessageId, values ?? {}, { message });
  const hasComponents = components && Object.keys(components).length > 0;

  let content: ReactNode;

  if (hasComponents) {
    const tokens = parseTaggedMessage(translation);
    const nodes = renderTaggedTokens(tokens, components);
    content = <>{nodes}</>;
  } else {
    content = translation;
  }

  const renderProps: TransRenderProps = {
    id: id as MessageId,
    translation: content,
    children: content,
    message: message ?? null,
  };

  if (typeof render === 'function') {
    return render(renderProps);
  }

  const Wrapper =
    WrapperComponent ??
    (DefaultComponent as ComponentType<TransRenderProps> | undefined);

  if (Wrapper) {
    return <Wrapper {...renderProps}>{content}</Wrapper>;
  }

  return <>{content}</>;
};
