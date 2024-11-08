// Import required modules and types from their respective locations.
import { logger } from '@logger';
import { formatPaginatedResponse, formatResponse } from '@utils/responseData';
import type { Response } from 'express';
import { t, LanguageContent } from 'express-intlayer';
import { ErrorCodes, errorData } from './errorCodes';
import { AppError } from './ErrorsClass';
import { HttpStatusCodes, UserAPI } from '@/export';

// Define a class named 'ErrorHandler' to encapsulate error handling logic.
export class ErrorHandler {
  /**
   * Handles generic error responses by formatting and sending a JSON response.
   * @param res - The response object provided by Express.js.
   * @param errorKey - A key representing the specific error.
   * @param statusCode - (Optional) A specific HTTP status code to use for the response.
   * @param isPaginatedResponse - Flag to determine if the response should be paginated.
   */
  static handleGenericErrorResponse(
    res: Response,
    errorKey: ErrorCodes,
    errorDetails?: object,
    statusCode?: HttpStatusCodes,
    isPaginatedResponse: boolean = false
  ) {
    const error = errorData[errorKey];
    const status = statusCode ?? error.statusCode; // Use the provided status code or default to the one in errorData.

    // Delegate to a more customizable error response handler.
    this.handleCustomErrorResponse(
      res,
      errorKey,
      error.message,
      errorDetails,
      status,
      isPaginatedResponse
    );
  }

  /**
   * Handles application-specific error responses by formatting and sending a JSON response.
   * @param res - The response object provided by Express.js.
   * @param error - The error object.
   * @param isPaginatedResponse - Flag to determine if the response should be paginated.
   */
  static handleAppErrorResponse(
    res: Response,
    error: AppError,
    errorDetails?: object,
    isPaginatedResponse: boolean = false
  ) {
    const isMultilingual = error.isMultilingual ?? false;
    // Delegate to a more customizable error response handler.
    this.handleCustomErrorResponse(
      res,
      error.errorKey,
      isMultilingual
        ? error.multilingualMessage
        : JSON.stringify(error.message),
      errorDetails,
      error.httpStatusCode,
      isPaginatedResponse
    );
  }

  /**
   * Handles more customizable error responses with detailed error messages and codes.
   * @param res - The response object.
   * @param errorKey - Error code key used to fetch the corresponding message and default status.
   * @param message - The localized error message object.
   * @param statusCode - (Optional) HTTP status code, defaults to 500 if not specified.
   * @param isPaginatedResponse - Determines if the error should be part of a paginated response.
   */
  static handleCustomErrorResponse<T>(
    res: Response,
    errorKey: ErrorCodes | string,
    message: LanguageContent<string> | string,
    errorDetails?: object,
    statusCode?: HttpStatusCodes,
    isPaginatedResponse: boolean = false
  ) {
    logger.error((message as { en: string })?.en ?? message); // Log the English version of the error message.
    const status = statusCode ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500; // Default to 500 if no status code is provided.

    if (isPaginatedResponse) {
      // Format the response as a paginated error response if requested.
      const responseData = formatPaginatedResponse<T>({
        error: {
          code: errorKey,
          message: typeof message === 'string' ? message : t(message),
        },
        status,
      });
      res.status(status).json(responseData);
      return;
    }

    // Format the response as a standard non-paginated error response.
    const responseData = formatResponse<UserAPI>({
      error: {
        code: errorKey,
        message: t(message),
        ...errorDetails,
      },
      status,
    });

    res.status(status).json(responseData);
  }
}
