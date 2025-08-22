// Import required modules and types from their respective locations.
import type { UserAPI } from '@/types/user.types';
import { HttpStatusCodes } from '@/utils/httpStatusCodes';
import { Locales } from '@intlayer/config';
import { logger } from '@logger';
import { formatPaginatedResponse, formatResponse } from '@utils/responseData';
import type { Response } from 'express';
// @ts-ignore express-intlayer not build yet
import type { LanguageContent } from 'express-intlayer';
import { t } from 'express-intlayer';
import { type ErrorCodes, errorData } from './errorCodes';
import type { AppError } from './ErrorsClass';

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
      error.title,
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
   * @param messageDetails - (Optional) Additional message details to include in the response.
   * @param isPaginatedResponse - (Optional) Flag to determine if the response should be paginated.
   */
  static handleAppErrorResponse(
    res: Response,
    error: AppError,
    messageDetails?: object,
    isPaginatedResponse: boolean = false
  ) {
    if (!error.isAppError) {
      this.handleCustomErrorResponse(
        res,
        error.errorKey ?? 'UNKNOWN_ERROR',
        'Error',
        error.message ?? JSON.stringify(error),
        undefined,
        error.httpStatusCode ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500,
        isPaginatedResponse
      );
    }

    const isMultilingual = error.isMultilingual ?? false;
    // Delegate to a more customizable error response handler.
    this.handleCustomErrorResponse(
      res,
      error.errorKey,
      isMultilingual ? error.multilingualTitle : error.title,
      isMultilingual ? error.multilingualMessage : error.message,
      error.messageDetails ?? messageDetails,
      error.httpStatusCode,
      isPaginatedResponse
    );
  }

  /**
   * Handles more customizable error responses with detailed error messages and codes.
   * @param res - The response object.
   * @param errorKey - Error code key used to fetch the corresponding message and default status.
   * @param message - The localized error message object.
   * @param messageDetails - (Optional) Additional message details to include in the response.
   * @param statusCode - (Optional) HTTP status code, defaults to 500 if not specified.
   * @param isPaginatedResponse - Determines if the error should be part of a paginated response.
   */
  static handleCustomErrorResponse<T>(
    res: Response,
    errorKey: ErrorCodes | string,
    title: LanguageContent<string> | string,
    message: LanguageContent<string> | string,
    messageDetails?: object,
    statusCode?: HttpStatusCodes,
    isPaginatedResponse: boolean = false
  ) {
    const errorTitle = t(title as LanguageContent<string>, Locales.ENGLISH);
    const errorMessage = t(message as LanguageContent<string>, Locales.ENGLISH);
    logger.error(errorMessage, messageDetails); // Log the English version of the error message.
    const status = statusCode ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500; // Default to 500 if no status code is provided.

    if (isPaginatedResponse) {
      // Format the response as a paginated error response if requested.
      const responseData = formatPaginatedResponse<T>({
        error: {
          code: errorKey,
          title: errorTitle,
          message: errorMessage,
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
        title: errorTitle,
        message: errorMessage,
        ...messageDetails,
      },
      status,
    });

    res.status(status).json(responseData);
  }
}
