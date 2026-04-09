// Import required modules and types from their respective locations.

import * as Locales from '@intlayer/types/locales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { logger } from '@logger';
import { formatResponse } from '@utils/responseData';
import type { FastifyReply } from 'fastify';
import { t } from 'fastify-intlayer';
import type { UserAPI } from '@/types/user.types';
import { HttpStatusCodes } from '@/utils/httpStatusCodes';
import type { AppError } from './ErrorsClass';
import { type ErrorCodes, errorData } from './errorCodes';

/**
 * Handles generic error responses by formatting and sending a JSON response.
 * @param res - The response object provided by Express.js.
 * @param errorKey - A key representing the specific error.
 * @param statusCode - (Optional) A specific HTTP status code to use for the response.
 * @param isPaginatedResponse - Flag to determine if the response should be paginated.
 */
export const handleGenericErrorResponse = (
  reply: FastifyReply,
  errorKey: ErrorCodes,
  errorDetails?: object,
  statusCode?: HttpStatusCodes
) => {
  const error = errorData[errorKey];
  const status = statusCode ?? error.statusCode; // Use the provided status code or default to the one in errorData.

  // Delegate to a more customizable error response handler.
  handleCustomErrorResponse(
    reply,
    errorKey,
    error.title,
    error.message,
    errorDetails,
    status
  );
};

/**
 * Handles application-specific error responses by formatting and sending a JSON response.
 * @param res - The response object provided by Express.js.
 * @param error - The error object.
 * @param messageDetails - (Optional) Additional message details to include in the response.
 * @param isPaginatedResponse - (Optional) Flag to determine if the response should be paginated.
 */
export const handleAppErrorResponse = (
  reply: FastifyReply,
  error: AppError,
  messageDetails?: object
) => {
  if (!error.isAppError) {
    handleCustomErrorResponse(
      reply,
      error.errorKey ?? 'UNKNOWN_ERROR',
      'Error',
      error.message ?? JSON.stringify(error),
      undefined,
      error.httpStatusCode ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500
    );
    return;
  }

  const isMultilingual = error.isMultilingual ?? false;
  // Delegate to a more customizable error response handler.
  handleCustomErrorResponse(
    reply,
    error.errorKey,
    isMultilingual ? error.multilingualTitle : error.title,
    isMultilingual ? error.multilingualMessage : error.message,
    error.messageDetails ?? messageDetails,
    error.httpStatusCode
  );
};

/**
 * Handles more customizable error responses with detailed error messages and codes.
 * @param res - The response object.
 * @param errorKey - Error code key used to fetch the corresponding message and default status.
 * @param title - The localized error message object.
 * @param message - The localized error message object.
 * @param messageDetails - (Optional) Additional message details to include in the response.
 * @param statusCode - (Optional) HTTP status code, defaults to 500 if not specified.
 * @param isPaginatedResponse - Determines if the error should be part of a paginated response.
 */
export const handleCustomErrorResponse = (
  reply: FastifyReply,
  errorKey: ErrorCodes | string,
  title: StrictModeLocaleMap<string> | string,
  message: StrictModeLocaleMap<string> | string,
  messageDetails?: object,
  statusCode?: HttpStatusCodes
) => {
  const errorTitle = t(title as StrictModeLocaleMap<string>, Locales.ENGLISH);
  const errorMessage = t(
    message as StrictModeLocaleMap<string>,
    Locales.ENGLISH
  );
  logger.error(errorMessage, messageDetails); // Log the English version of the error message.
  const status = statusCode ?? HttpStatusCodes.INTERNAL_SERVER_ERROR_500; // Default to 500 if no status code is provided.

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

  return reply.code(status).send(responseData);
};

/**
 * Formats a generic error response without sending it (useful for Fastify plugins).
 * @param errorKey - A key representing the specific error.
 * @param errorDetails - Optional error details to include.
 * @param statusCode - Optional HTTP status code.
 * @returns Formatted error response object.
 */
export const formatGenericErrorResponse = (
  errorKey: ErrorCodes,
  errorDetails?: object,
  statusCode?: HttpStatusCodes
) => {
  const error = errorData[errorKey];
  const status = statusCode ?? error.statusCode;
  const errorTitle = t(error.title, Locales.ENGLISH);
  const errorMessage = t(error.message, Locales.ENGLISH);
  logger.error(errorMessage, errorDetails);

  return formatResponse<UserAPI>({
    error: {
      code: errorKey,
      title: errorTitle,
      message: errorMessage,
      ...errorDetails,
    },
    status,
  });
};

// Define an object to encapsulate error handling logic for backward compatibility.
export const ErrorHandler = {
  handleGenericErrorResponse,
  handleAppErrorResponse,
  handleCustomErrorResponse,
  formatGenericErrorResponse,
};
