import type { ConnectionOptions } from 'node:tls';
import * as eventListener from '@controllers/eventListener.controller';
import { type AIOptions, getAIConfig } from '@intlayer/ai';
import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import {
  getFilterMissingTranslationsDictionary,
  getPerLocaleDictionary,
  insertContentInDictionary,
} from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import { logger } from '@logger';
import * as dictionaryService from '@services/dictionary.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import {
  AbortError,
  translateDictionaryDB,
} from '@utils/AI/translateDictionaryDB';
import { mapDictionaryToAPI } from '@utils/mapper/dictionary';
import { getRedisClient } from '@utils/redis/connectRedis';
import { type Job, Worker } from 'bullmq';
import {
  isTranslationJobCancelled,
  isTranslationJobPaused,
  translationQueueName,
} from './translationQueue.service';

type TranslationJobData = {
  dictionaryIds?: string[];
  dictionaryKeys?: string[];
  targetLocales?: Locale[];
  dictionaryTargets?: { dictionaryId: string; locales: Locale[] }[];
  projectId: string;
  userId: string;
  mode?: 'complete' | 'review';
};

export type TranslationJobProgress = {
  percentage: number;
  completedKeys: string[];
  failedKeys: string[];
  currentKey: string | null;
  /** Fine-grained chunk info emitted by translateDictionaryDB */
  currentLocale: string | null;
  currentChunk: number | null;
  totalChunks: number | null;
};

const emitProgress = async (
  job: Job<TranslationJobData>,
  progress: TranslationJobProgress
) => {
  await job.updateProgress(progress as unknown as number);
};

export const processTranslationJob = async (job: Job<TranslationJobData>) => {
  const {
    dictionaryTargets,
    dictionaryIds,
    targetLocales,
    projectId,
    userId,
    mode = 'complete',
  } = job.data;

  // Migration / compatibility: if dictionaryTargets is missing, rebuild it from flat list
  const targets: { dictionaryId: string; locales: Locale[] }[] =
    dictionaryTargets ||
    (dictionaryIds as string[])?.map((id) => ({
      dictionaryId: id,
      locales: targetLocales as Locale[],
    })) ||
    [];

  logger.info(`Processing translation job ${job.id} for project ${projectId}`);

  const user = await userService.getUserById(userId);
  const project = await projectService.getProjectById(projectId);

  if (!user || !project) {
    throw new Error('User or Project not found');
  }

  const projectAIOptions = project.configuration?.ai as AIOptions | undefined;

  const aiConfig = await getAIConfig(
    {
      userOptions: {},
      projectOptions: projectAIOptions,
      accessType: ['registered_user', 'apiKey'],
    },
    true
  );

  const totalDictionaries = targets.length;
  let processedCount = 0;
  const completedKeys: string[] = [];
  const failedKeys: string[] = [];

  for (const target of targets) {
    const { dictionaryId, locales: taskTargetLocales } = target;

    // Respect pause: spin-wait until resumed or cancelled
    while (await isTranslationJobPaused(job.id!)) {
      if (await isTranslationJobCancelled(job.id!)) break;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Stop gracefully if cancelled
    if (await isTranslationJobCancelled(job.id!)) {
      throw new Error('Cancelled by user');
    }

    /** Checked between every AI chunk – aborts the current dictionary cleanly */
    const shouldStop = async () => {
      if (await isTranslationJobCancelled(job.id!)) return true;
      if (await isTranslationJobPaused(job.id!)) return true;
      return false;
    };
    let dictionaryKey = dictionaryId;
    try {
      const dictionary =
        await dictionaryService.getDictionaryById(dictionaryId);
      dictionaryKey = dictionary.key;

      await emitProgress(job, {
        percentage: (processedCount / totalDictionaries) * 100,
        completedKeys,
        failedKeys,
        currentKey: dictionaryKey,
        currentLocale: null,
        currentChunk: null,
        totalChunks: null,
      });

      const versionList = [...(dictionary.content.keys() ?? [])];
      const lastVersion = versionList[versionList.length - 1] || 'v1';
      const dictionaryContentNode = dictionary.content.get(lastVersion);

      if (!dictionaryContentNode) {
        logger.warn(`No content found for dictionary ${dictionary.key}`);
        failedKeys.push(dictionaryKey);
        processedCount++;
        continue;
      }

      const sourceContent = dictionaryContentNode.content;

      const sourceLocale =
        project.configuration?.internationalization?.defaultLocale ||
        DEFAULT_LOCALE;

      // Translate per locale, sending only the content that is actually missing.
      // This mirrors the CLI's complete-mode logic:
      //   1. getFilterMissingTranslationsDictionary – strips t() nodes that
      //      already have this locale, so the AI never sees translated content.
      //   2. getPerLocaleDictionary – extracts flat source-locale text for the
      //      missing nodes (no multilingual wrappers sent to the AI).
      //   3. insertContentInDictionary – puts the AI result back into the
      //      multilingual structure correctly.
      const translationResult: Partial<Record<Locale, unknown>> = {};

      for (const targetLocale of taskTargetLocales) {
        // In 'complete' mode: send only the missing nodes to the AI.
        // In 'review' mode: send everything so the AI can re-translate / improve.
        let contentToTranslate: Record<string, unknown>;

        if (mode === 'review') {
          const sourceForAll = getPerLocaleDictionary(
            { key: dictionary.key, content: sourceContent as any },
            sourceLocale as Locale
          );
          contentToTranslate = sourceForAll.content as Record<string, unknown>;
        } else {
          const missingForLocale = getFilterMissingTranslationsDictionary(
            { key: dictionary.key, content: sourceContent as any },
            targetLocale
          );
          const sourceForMissing = getPerLocaleDictionary(
            missingForLocale,
            sourceLocale as Locale
          );
          contentToTranslate = sourceForMissing.content as Record<
            string,
            unknown
          >;
        }

        if (
          !contentToTranslate ||
          Object.keys(contentToTranslate).length === 0
        ) {
          logger.info(
            `Dictionary ${dictionary.key}: locale ${targetLocale} already complete, skipping`
          );
          continue;
        }

        const localeResult = await translateDictionaryDB({
          content: contentToTranslate as any,
          sourceLocale: sourceLocale as Locale,
          targetLocales: [targetLocale],
          aiConfig,
          mode,
          dictionaryDescription: dictionary.description,
          shouldStop,
          onChunkStart: async ({ locale, chunkIndex, totalChunks }) => {
            await emitProgress(job, {
              percentage: (processedCount / totalDictionaries) * 100,
              completedKeys,
              failedKeys,
              currentKey: dictionaryKey,
              currentLocale: locale,
              currentChunk: chunkIndex + 1,
              totalChunks,
            });
          },
        });

        if (localeResult[targetLocale]) {
          translationResult[targetLocale] = localeResult[targetLocale];
        }
      }

      if (Object.keys(translationResult).length === 0) {
        logger.info(
          `Dictionary ${dictionary.key}: all target locales already complete`
        );
        completedKeys.push(dictionaryKey);
        processedCount++;
        continue;
      }

      // Fetch fresh DB content before writing to avoid overwriting concurrent edits.
      const currentDictionary =
        await dictionaryService.getDictionaryById(dictionaryId);
      const currentContentNode = currentDictionary.content.get(lastVersion)!;

      // Insert each locale's translated content into the multilingual structure.
      let updatedDict: { key: string; content: any } = {
        key: dictionary.key,
        content: currentContentNode.content,
      };

      for (const [locale, localeContent] of Object.entries(translationResult)) {
        updatedDict = insertContentInDictionary(
          updatedDict as any,
          localeContent as any,
          locale as Locale
        );
      }

      const newVersion = dictionaryService.incrementVersion(currentDictionary);
      const updatedContentMap = new Map(currentDictionary.content);
      updatedContentMap.set(newVersion, {
        content: updatedDict.content as any,
      });

      const updatedDictionary = await dictionaryService.updateDictionaryById(
        dictionaryId,
        { content: updatedContentMap }
      );

      eventListener.sendDictionaryUpdate([
        {
          dictionary: mapDictionaryToAPI(updatedDictionary),
          status: 'UPDATED',
        },
      ]);

      completedKeys.push(dictionaryKey);
    } catch (error) {
      if (error instanceof AbortError) {
        // Paused or cancelled mid-chunk – stop the loop without marking as failed
        logger.info(
          `Translation job ${job.id} aborted mid-chunk (pause/cancel)`
        );
        break;
      }
      logger.error(`Error translating dictionary ${dictionaryId}:`, error);
      failedKeys.push(dictionaryKey);
    }

    processedCount++;
    await emitProgress(job, {
      percentage: (processedCount / totalDictionaries) * 100,
      completedKeys,
      failedKeys,
      currentKey: null,
      currentLocale: null,
      currentChunk: null,
      totalChunks: null,
    });
  }
};

let translationWorker: Worker<TranslationJobData> | null = null;

export const startTranslationWorker = () => {
  if (translationWorker) return translationWorker;

  const connection = getRedisClient();

  translationWorker = new Worker<TranslationJobData>(
    translationQueueName,
    processTranslationJob,
    {
      connection: connection as unknown as ConnectionOptions,
      concurrency: 5,
    }
  );

  translationWorker.on('completed', (job) => {
    logger.info(`Translation job ${job.id} completed`);
  });

  translationWorker.on('failed', (job, err) => {
    logger.error(`Translation job ${job?.id} failed:`, err);
  });

  return translationWorker;
};
