import type { HttpStatusCodes } from '@utils/httpStatusCodes';
// @ts-ignore fastify-intlayer not build yet
import type { StrictModeLocaleMap } from 'fastify-intlayer';

/**
 * Shape of a single error-code entry: a localized title and message plus the
 * HTTP status code returned to the client.
 */
export type ErrorCode = {
  title: StrictModeLocaleMap<string>;
  message: StrictModeLocaleMap<string>;
  statusCode: HttpStatusCodes;
};
