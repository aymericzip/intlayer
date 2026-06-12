/**
 * Error code enum matching react-intl's `ReactIntlErrorCode`.
 *
 * @deprecated These error codes are not raised by the intlayer compat adapter.
 * Exported for API compatibility only.
 */
export enum ReactIntlErrorCode {
  FORMAT_ERROR = 'FORMAT_ERROR',
  UNSUPPORTED_FORMATTER = 'UNSUPPORTED_FORMATTER',
  INVALID_CONFIG = 'INVALID_CONFIG',
  MISSING_DATA = 'MISSING_DATA',
  MISSING_TRANSLATION = 'MISSING_TRANSLATION',
}

/**
 * Base error class matching react-intl's `ReactIntlError` shape.
 *
 * @deprecated Not raised by the intlayer compat adapter. Exported for API compatibility only.
 */
export class ReactIntlError extends Error {
  public readonly code: ReactIntlErrorCode;

  constructor(code: ReactIntlErrorCode, message: string) {
    super(message);
    this.name = 'ReactIntlError';
    this.code = code;
  }
}

/**
 * @deprecated Not raised by the intlayer compat adapter. Exported for API compatibility only.
 */
export class InvalidConfigError extends ReactIntlError {
  constructor(message: string) {
    super(ReactIntlErrorCode.INVALID_CONFIG, message);
    this.name = 'InvalidConfigError';
  }
}

/**
 * @deprecated Not raised by the intlayer compat adapter. Exported for API compatibility only.
 */
export class MessageFormatError extends ReactIntlError {
  constructor(message: string) {
    super(ReactIntlErrorCode.FORMAT_ERROR, message);
    this.name = 'MessageFormatError';
  }
}

/**
 * @deprecated Not raised by the intlayer compat adapter. Exported for API compatibility only.
 */
export class MissingDataError extends ReactIntlError {
  constructor(message: string) {
    super(ReactIntlErrorCode.MISSING_DATA, message);
    this.name = 'MissingDataError';
  }
}

/**
 * @deprecated Not raised by the intlayer compat adapter. Exported for API compatibility only.
 */
export class MissingTranslationError extends ReactIntlError {
  constructor(message: string) {
    super(ReactIntlErrorCode.MISSING_TRANSLATION, message);
    this.name = 'MissingTranslationError';
  }
}

/**
 * @deprecated Not raised by the intlayer compat adapter. Exported for API compatibility only.
 */
export class UnsupportedFormatterError extends ReactIntlError {
  constructor(message: string) {
    super(ReactIntlErrorCode.UNSUPPORTED_FORMATTER, message);
    this.name = 'UnsupportedFormatterError';
  }
}
