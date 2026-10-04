import type { RouteEndpoints } from '@intlayer/backend-contract/defineRoute';
import { buildRouteURL } from '@intlayer/backend-contract/defineRoute';
import type {
  TranslateDictionariesBody,
  TranslateDictionariesResult,
  TranslationRoutes,
  translationContract,
} from '@intlayer/backend-contract/translation';
import { editor } from '@intlayer/config/built';
import { BACKEND_URL } from '@intlayer/config/defaultValues';
import type { IntlayerConfig } from '@intlayer/types/config';
import { createEndpoint } from '../cms/createIntlayerCMS';
import { type FetcherOptions, fetcher } from '../fetcher';

export type { TranslateDictionariesBody, TranslateDictionariesResult };

/** Prefix of the routes, checked against the backend contract. */
const translationGroup = {
  prefix: '/api/translate',
} as const satisfies Pick<typeof translationContract, 'prefix'>;

/**
 * Method and path of every route, checked against the backend contract at
 * compile time (the contract's zod schemas are never loaded).
 */
const translationEndpoints = {
  translateDictionaries: { method: 'POST', path: '/dictionaries' },
  getTranslationStatus: { method: 'GET', path: '/status' },
  pauseTranslationJob: { method: 'POST', path: '/:jobId/pause' },
  resumeTranslationJob: { method: 'POST', path: '/:jobId/resume' },
  stopTranslationJob: { method: 'POST', path: '/:jobId/stop' },
  retryTranslationJob: { method: 'POST', path: '/:jobId/retry' },
  restartTranslationJob: { method: 'POST', path: '/:jobId/restart' },
} as const satisfies RouteEndpoints<TranslationRoutes>;

export const getTranslateAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? editor.backendURL ?? BACKEND_URL;

  const translateDictionaries = async (
    body: TranslateDictionariesBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<TranslateDictionariesResult>(
      buildRouteURL(
        backendURL,
        translationGroup,
        translationEndpoints.translateDictionaries
      ),
      authAPIOptions,
      otherOptions,
      { method: translationEndpoints.translateDictionaries.method, body }
    );

  const pauseTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      buildRouteURL(
        backendURL,
        translationGroup,
        translationEndpoints.pauseTranslationJob,
        { jobId }
      ),
      authAPIOptions,
      otherOptions,
      { method: translationEndpoints.pauseTranslationJob.method }
    );

  const resumeTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      buildRouteURL(
        backendURL,
        translationGroup,
        translationEndpoints.resumeTranslationJob,
        { jobId }
      ),
      authAPIOptions,
      otherOptions,
      { method: translationEndpoints.resumeTranslationJob.method }
    );

  const stopTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      buildRouteURL(
        backendURL,
        translationGroup,
        translationEndpoints.stopTranslationJob,
        { jobId }
      ),
      authAPIOptions,
      otherOptions,
      { method: translationEndpoints.stopTranslationJob.method }
    );

  const retryTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      buildRouteURL(
        backendURL,
        translationGroup,
        translationEndpoints.retryTranslationJob,
        { jobId }
      ),
      authAPIOptions,
      otherOptions,
      { method: translationEndpoints.retryTranslationJob.method }
    );

  const restartTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      buildRouteURL(
        backendURL,
        translationGroup,
        translationEndpoints.restartTranslationJob,
        { jobId }
      ),
      authAPIOptions,
      otherOptions,
      { method: translationEndpoints.restartTranslationJob.method }
    );

  return {
    translateDictionaries,
    pauseTranslationJob,
    resumeTranslationJob,
    stopTranslationJob,
    retryTranslationJob,
    restartTranslationJob,
  };
};

/**
 * Authenticated `translate` endpoint bound to an Intlayer CMS authenticator.
 *
 * Pass an authenticator created with `createIntlayerCMS`, or omit it to use
 * the build-time configuration (`@intlayer/config/built`).
 */
export const translateEndpoint = createEndpoint(getTranslateAPI);
