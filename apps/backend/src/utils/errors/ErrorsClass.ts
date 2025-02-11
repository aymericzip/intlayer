import { HttpStatusCodes } from '@utils/httpStatusCodes';
// @ts-ignore express-intlayer not build yet
import { t, type LanguageContent } from 'express-intlayer';
import { type ErrorCodes, errorData } from './errorCodes';

/**
 * Custom error class that extends the native JavaScript Error class.
 * This class supports multilingual error messages and HTTP status codes.
 */
export class AppError extends Error {
  public isAppError: boolean = true; // Flag to identify AppError instances.
  public name: string;
  public isMultilingual: boolean = true;
  public errorKey: string;
  public title: string;
  public multilingualTitle: LanguageContent<string>;
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
    multilingualTitle: LanguageContent<string>,
    multilingualMessage: LanguageContent<string>,
    errorKey: string,
    httpStatusCode: HttpStatusCodes = HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
    messageDetails?: object
  ) {
    const title = t(multilingualTitle); // Translate title based on current locale
    const message = t(multilingualMessage); // Translate message based on current locale.

    super(message); // Use translated message for the superclass constructor.
    this.title = title;
    this.multilingualTitle = multilingualTitle;
    this.message = message;
    this.multilingualMessage = multilingualMessage; // Store original message format for potential use.
    this.name = 'AppError';
    this.errorKey = errorKey;
    this.httpStatusCode = httpStatusCode; // Set the HTTP status code.
    this.messageDetails = messageDetails; // Store any additional message details.

    // Capture the stack trace to exclude the constructor call.
    Error.captureStackTrace(this, this.constructor);
  }
}

export class GenericError extends AppError {
  constructor(errorKey: ErrorCodes, messageDetails?: object) {
    const multilingualTitle = errorData[errorKey].title;
    const multilingualMessage = errorData[errorKey].message;
    const httpStatusCode = errorData[errorKey].statusCode;

    super(
      multilingualTitle,
      multilingualMessage,
      errorKey,
      httpStatusCode,
      messageDetails
    );
  }
}
