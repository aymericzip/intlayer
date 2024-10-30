import { HttpStatusCodes } from '@utils/httpStatusCodes';
import { t, type LanguageContent } from 'express-intlayer';
import { ErrorCodes, errorData } from './errorCodes';

/**
 * Custom error class that extends the native JavaScript Error class.
 * This class supports multilingual error messages and HTTP status codes.
 */
export class AppError extends Error {
  public name: string;
  public errorKey: string;
  public message: string;
  public multilingualMessage: LanguageContent<string>;
  public httpStatusCode: HttpStatusCodes;
  public messageDetails?: object;

  /**
   * Constructor for the custom error class.
   * @param multilingualMessage - The error message which can be a simple string or a multilingual object.
   * @param httpStatusCode - Optional HTTP status code, defaults to 500 Internal Server Error.
   */
  constructor(
    multilingualMessage: LanguageContent<string>,
    errorKey: string,
    httpStatusCode: HttpStatusCodes = HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
    messageDetails?: object
  ) {
    const message = t(multilingualMessage); // Translate message based on current locale.

    super(message); // Use translated message for the superclass constructor.
    this.message = message;
    this.name = 'AppError';
    this.errorKey = errorKey;
    this.multilingualMessage = multilingualMessage; // Store original message format for potential use.
    this.httpStatusCode = httpStatusCode; // Set the HTTP status code.
    this.messageDetails = messageDetails; // Store any additional message details.

    // Capture the stack trace to exclude the constructor call.
    Error.captureStackTrace(this, this.constructor);
  }
}

export class GenericError extends AppError {
  constructor(errorKey: ErrorCodes, messageDetails?: object) {
    const multilingualMessage = errorData[errorKey].message;
    const httpStatusCode = errorData[errorKey].statusCode;

    super(multilingualMessage, errorKey, httpStatusCode, messageDetails);
  }
}
