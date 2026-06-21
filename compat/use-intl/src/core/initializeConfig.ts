import type { initializeConfig as _initializeConfig } from 'use-intl';

/**
 * Drop-in for use-intl's `initializeConfig`.
 *
 * Enhances an incoming config with defaults. With intlayer, `messages` and
 * `formats` are not consumed at runtime (content comes from compiled
 * dictionaries) but the shape is preserved so callers keep type-checking.
 */
export const initializeConfig: typeof _initializeConfig = ({
  formats,
  getMessageFallback,
  messages,
  onError,
  ...rest
}) => {
  const finalOnError = onError ?? ((error) => error);
  const finalGetMessageFallback =
    getMessageFallback ??
    (({ key, namespace }) => [namespace, key].filter(Boolean).join('.'));

  return {
    ...rest,
    formats: formats || undefined,
    messages: messages || undefined,
    onError: finalOnError,
    getMessageFallback: finalGetMessageFallback,
  };
};
