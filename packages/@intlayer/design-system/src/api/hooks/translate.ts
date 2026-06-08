'use client';

import type { TranslateDictionariesBody } from '@intlayer/backend';
import { useMutation } from '@tanstack/react-query';
import { useDictionaryAPI, useTranslateAPI } from '../useIntlayerAPI';

export const useFillAllTranslations = () => {
  const dictionaryAPI = useDictionaryAPI();
  const translateAPI = useTranslateAPI();

  return useMutation({
    mutationKey: ['fill-all-translations'],
    mutationFn: async (
      args: Pick<TranslateDictionariesBody, 'targetLocales' | 'mode'> & {
        dictionaryIds?: string[];
      }
    ) => {
      let dictionaryIds = args.dictionaryIds;
      if (!dictionaryIds || dictionaryIds.length === 0) {
        const result = await dictionaryAPI.getDictionaries({
          pageSize: 1000,
        });
        dictionaryIds = (result?.data ?? []).map((d) => d.id);
      }
      return translateAPI.translateDictionaries({
        dictionaryIds,
        targetLocales: args.targetLocales,
        mode: args.mode,
      });
    },
  });
};

export const useStopTranslationJob = () => {
  const translateAPI = useTranslateAPI();

  return useMutation({
    mutationKey: ['stop-translation-job'],
    mutationFn: (jobId: string) => translateAPI.stopTranslationJob(jobId),
  });
};

export const usePauseTranslationJob = () => {
  const translateAPI = useTranslateAPI();

  return useMutation({
    mutationKey: ['pause-translation-job'],
    mutationFn: (jobId: string) => translateAPI.pauseTranslationJob(jobId),
  });
};

export const useResumeTranslationJob = () => {
  const translateAPI = useTranslateAPI();

  return useMutation({
    mutationKey: ['resume-translation-job'],
    mutationFn: (jobId: string) => translateAPI.resumeTranslationJob(jobId),
  });
};
