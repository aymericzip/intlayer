'use client';

import { Fragment, type ReactElement, type ReactNode } from 'react';
import type { FormattedMessage as _FormattedMessage } from 'react-intl';
import { useIntl } from './useIntl';

/**
 * Drop-in for react-intl's `<FormattedMessage>`.
 *
 * Translates the message identified by `id` using the active intl context.
 * Full ICU MessageFormat syntax is supported.
 *
 * When `values` contains render functions, rich text tags
 * (`<b>chunks</b>`) are mapped through them. When a `tagName` is provided,
 * the output is wrapped in that element; otherwise a fragment is used.
 * A `children` render-prop receives the resolved nodes.
 *
 * @example
 * ```tsx
 * <FormattedMessage id="home.title" />
 * <FormattedMessage id="home.greeting" values={{ name: 'Alice' }} />
 * <FormattedMessage
 *   id="terms.agreement"
 *   values={{ b: (chunks) => <strong>{chunks}</strong> }}
 * />
 * ```
 */
export const FormattedMessage: typeof _FormattedMessage = ({
  id = '',
  description: _description,
  defaultMessage,
  values,
  tagName: TagName,
  children,
  ignoreTag: _ignoreTag,
}) => {
  const intl = useIntl();
  const stringDefaultMessage =
    typeof defaultMessage === 'string' ? defaultMessage : undefined;
  const result = (
    intl.formatMessage as (
      descriptor: { id: string; defaultMessage?: string },
      values?: Record<string, unknown>
    ) => string | ReactNode[]
  )(
    { id, defaultMessage: stringDefaultMessage },
    values as Record<string, unknown>
  );
  const nodes: ReactNode[] = Array.isArray(result) ? result : [result];

  if (typeof children === 'function') {
    return (children(nodes) ?? null) as ReactElement | null;
  }

  if (TagName && TagName !== Fragment) {
    return <TagName>{nodes}</TagName>;
  }

  return <>{nodes}</>;
};
