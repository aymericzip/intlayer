/**
 * Drop-in for use-intl's `IntlErrorCode` enum.
 *
 * Re-implemented locally (rather than re-exported) because `use-intl` is
 * aliased to this package at build time, so importing its runtime value would
 * be circular.
 */
export enum IntlErrorCode {
  MISSING_MESSAGE = 'MISSING_MESSAGE',
  MISSING_FORMAT = 'MISSING_FORMAT',
  ENVIRONMENT_FALLBACK = 'ENVIRONMENT_FALLBACK',
  INSUFFICIENT_PATH = 'INSUFFICIENT_PATH',
  INVALID_MESSAGE = 'INVALID_MESSAGE',
  INVALID_KEY = 'INVALID_KEY',
  FORMATTING_ERROR = 'FORMATTING_ERROR',
}

/**
 * Drop-in for use-intl's `IntlError`.
 *
 * Carries the {@link IntlErrorCode} and the original message, matching
 * use-intl's error shape so consumer `onError` handlers keep working.
 */
export class IntlError extends Error {
  public readonly code: IntlErrorCode;
  public readonly originalMessage: string | undefined;

  constructor(code: IntlErrorCode, originalMessage?: string) {
    let message: string = code;
    if (originalMessage) {
      message += `: ${originalMessage}`;
    }
    super(message);

    this.code = code;
    if (originalMessage) {
      this.originalMessage = originalMessage;
    }
  }
}
