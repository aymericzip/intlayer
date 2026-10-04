import type { Locale } from '@intlayer/types/allLocales';
import { z } from 'zod/mini';
import { typedStringSchema } from './common';
import {
  defineRoute,
  defineRouteGroup,
  type RouteBodyInput,
} from './defineRoute';
import { type ResponseData, responseDataSchema } from './responseData';

const jobIdParamsSchema = z.object({ jobId: z.string().check(z.minLength(1)) });
const jobResponseSchema = responseDataSchema(z.unknown());

/** Job control routes share the same shape. */
const jobRoute = (path: `/:jobId/${string}`, summary: string) =>
  defineRoute({
    method: 'POST',
    path,
    summary,
    schemas: {
      params: jobIdParamsSchema,
      response: { 200: jobResponseSchema },
    },
  });

/** REST contract of the live translation routes (Redis-backed queue). */
export const translationContract = defineRouteGroup({
  prefix: '/api/translate',
  tag: 'Translation',
  routes: {
    translateDictionaries: defineRoute({
      method: 'POST',
      path: '/dictionaries',
      summary: 'Queue the translation of dictionaries into locales',
      schemas: {
        body: z.object({
          dictionaryIds: z.array(z.string()),
          targetLocales: z.array(typedStringSchema<Locale>()),
          mode: z.optional(z.enum(['complete', 'review'])),
        }),
        response: {
          200: responseDataSchema(z.object({ jobId: z.string() })),
        },
      },
    }),
    getTranslationStatus: defineRoute({
      method: 'GET',
      path: '/status',
      summary: 'Translation job progress (server-sent events stream)',
      schemas: {},
    }),
    pauseTranslationJob: jobRoute('/:jobId/pause', 'Pause a translation job'),
    resumeTranslationJob: jobRoute(
      '/:jobId/resume',
      'Resume a paused translation job'
    ),
    stopTranslationJob: jobRoute('/:jobId/stop', 'Stop a translation job'),
    retryTranslationJob: jobRoute(
      '/:jobId/retry',
      'Retry the failed items of a job'
    ),
    restartTranslationJob: jobRoute(
      '/:jobId/restart',
      'Restart a translation job'
    ),
  },
});

/** Route definitions of the translation group, by name. */
export type TranslationRoutes = (typeof translationContract)['routes'];

export type TranslateDictionariesBody = RouteBodyInput<
  TranslationRoutes['translateDictionaries']
>;
export type TranslateDictionariesResult = ResponseData<{ jobId: string }>;
