import type {
  TranslateDictionariesBody,
  TranslateDictionariesResult,
} from '@intlayer/backend';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type FetcherOptions, fetcher } from '../fetcher';

export type { TranslateDictionariesBody, TranslateDictionariesResult };

export const getTranslateAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig: IntlayerConfig
) => {
  const backendURL = intlayerConfig.editor.backendURL;

  const TRANSLATE_API_ROUTE = `${backendURL}/api/translate`;

  const translateDictionaries = async (
    body: TranslateDictionariesBody,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<TranslateDictionariesResult>(
      `${TRANSLATE_API_ROUTE}/dictionaries`,
      authAPIOptions,
      otherOptions,
      { method: 'POST', body }
    );

  const pauseTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      `${TRANSLATE_API_ROUTE}/${jobId}/pause`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  const resumeTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      `${TRANSLATE_API_ROUTE}/${jobId}/resume`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  const stopTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      `${TRANSLATE_API_ROUTE}/${jobId}/stop`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  const retryTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      `${TRANSLATE_API_ROUTE}/${jobId}/retry`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
    );

  const restartTranslationJob = async (
    jobId: string,
    otherOptions: FetcherOptions = {}
  ) =>
    fetcher<{ data: { jobId: string } }>(
      `${TRANSLATE_API_ROUTE}/${jobId}/restart`,
      authAPIOptions,
      otherOptions,
      { method: 'POST' }
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
