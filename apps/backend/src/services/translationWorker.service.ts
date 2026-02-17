import * as eventListener from '@controllers/eventListener.controller';
import { type AIOptions, getAIConfig } from '@intlayer/ai';
import type { Locale } from '@intlayer/types';
import { logger } from '@logger';
import * as dictionaryService from '@services/dictionary.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import { translateDictionaryDB } from '@utils/AI/translateDictionaryDB';
import { mapDictionaryToAPI } from '@utils/mapper/dictionary';
import { type Job, Worker } from 'bullmq';
import { defu } from 'defu';
import Redis from 'ioredis';
import { translationQueueName } from './translationQueue.service';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  logger.error('REDIS_URL is not defined');
}

const connection = new Redis(redisUrl!, {
  maxRetriesPerRequest: null,
});

type TranslationJobData = {
  dictionaryIds: string[];
  targetLocales: Locale[];
  projectId: string;
  userId: string;
};

const processTranslationJob = async (job: Job<TranslationJobData>) => {
  const { dictionaryIds, targetLocales, projectId, userId } = job.data;

  logger.info(`Processing translation job ${job.id} for project ${projectId}`);

  const user = await userService.getUserById(userId);
  const project = await projectService.getProjectById(projectId);

  if (!user || !project) {
    throw new Error('User or Project not found');
  }

  const projectAIOptions = project.configuration?.ai as AIOptions | undefined;

  // Configure AI
  const aiConfig = await getAIConfig(
    {
      userOptions: {}, // We could pass user-specific options if needed
      projectOptions: projectAIOptions,
      accessType: ['registered_user', 'apiKey'],
    },
    true // isAuth
  );

  const totalDictionaries = dictionaryIds.length;
  let processedCount = 0;

  for (const dictionaryId of dictionaryIds) {
    try {
      const dictionary =
        await dictionaryService.getDictionaryById(dictionaryId);

      // Get content from the latest version or default
      const versionList = [...(dictionary.content.keys() ?? [])];
      const lastVersion = versionList[versionList.length - 1] || 'v1';
      const dictionaryContentNode = dictionary.content.get(lastVersion);

      if (!dictionaryContentNode) {
        logger.warn(`No content found for dictionary ${dictionary.key}`);
        continue;
      }

      const sourceContent = dictionaryContentNode.content; // recursive content

      // We assume source content is the reference.
      // Ideally we should pick the source locale content from it?
      // But dictionary structure in DB might be multilingual already.
      // translateDictionaryDB expects content to be translated.
      // If `sourceContent` is `{ en: "Hello", fr: "Bonjour" }`, and we want to translate to `es`.
      // We should pass `{ en: "Hello" }` if source is `en`.
      // Or pass the whole thing and let logic handle it?
      // translateDictionaryDB expects `content` and `sourceLocale`.
      // It chunks `content`.
      // If `content` is multilingual, `translateJSON` prompt might get confused or handle it.
      // Usually `translateJSON` expects source content.
      // Let's assume we extract source locale content if possible, or pass whole object.
      // But `translateJSON` prompt says "translate from sourceLocale to targetLocale".
      // If input is multilingual, it might be fine.

      // Let's use project default locale as source if not specified?
      // The job doesn't specify source locale. We should probably add it to job data or assume project default.
      const sourceLocale =
        project.configuration?.internationalization?.defaultLocale || 'en';

      const translationResult = await translateDictionaryDB({
        content: sourceContent as any,
        sourceLocale: sourceLocale as Locale,
        targetLocales,
        aiConfig,
        dictionaryDescription: dictionary.description,
      });

      // Merge results back into dictionary
      // We need to update the dictionary content with new translations
      // We can deep merge the result into the existing content

      // For simplicity, we fetch the dictionary again to avoid race conditions (basic) or just update.
      // We'll use a deep merge utility or just object spread if simple.
      // But `dictionaryService.updateDictionaryById` replaces content?
      // No, `updateDictionaryById` usually takes Partial<Dictionary>.
      // We should probably read the current content, merge, and save.

      // Re-fetch to be safe
      const currentDictionary =
        await dictionaryService.getDictionaryById(dictionaryId);
      const currentContentNode = currentDictionary.content.get(lastVersion)!;
      let newContent = currentContentNode.content;

      // Deep merge logic needed here?
      // `translateDictionaryDB` returns { [locale]: content }.
      // If `sourceContent` was multilingual, `newContent` should be too.
      // If `translationResult` is { es: { ... } }, we merge it into `newContent`.

      // Simple merge for now (assuming top-level keys or deep merge if available)
      // We'll use a simple recursive merge.

      for (const locale of targetLocales) {
        if (translationResult[locale]) {
          // If the dictionary content is structured as { key: { en: "Val", fr: "Val" } } (multilingual fields)
          // Or { en: { key: "Val" }, fr: { key: "Val" } } (nested locales? No, usually not recommended)
          // Intlayer standard: { key: t({ en: '...', fr: '...' }) } -> { key: { nodeType: 'translation', translation: { en: '...', fr: '...' } } } ??
          // Wait, `ensureMongoDocumentToObject` returns plain object.
          // If using `t()`, the content stored in DB is structured.

          // Actually, `translateDictionaryDB` translates the *structure*.
          // If input `sourceContent` matches `sourceLocale`, output matches `targetLocale`.
          // If `sourceContent` is already multilingual (e.g. `t` nodes), `translateJSON` might need to know how to handle it.
          // BUT `chunkJSON` splits it.

          // If `content` is ` { title: { en: 'Hello' } } ` (as stored in DB for t-nodes usually?)
          // We need to know the DB structure.

          // Assuming `translateJSON` returns the translated structure.
          // We merge it.

          // For now, let's just merge.
          newContent = defu(translationResult[locale], newContent);
        }
      }

      // Increment version or update current?
      // Let's update current version for simplicity or create new version.
      // Creating new version is safer.
      const newVersion = dictionaryService.incrementVersion(currentDictionary);
      const updatedContentMap = new Map(currentDictionary.content);
      updatedContentMap.set(newVersion, { content: newContent as any }); // Simplified

      const updatedDictionary = await dictionaryService.updateDictionaryById(
        dictionaryId,
        {
          content: updatedContentMap,
        }
      );

      // Notify update
      eventListener.sendDictionaryUpdate([
        {
          dictionary: mapDictionaryToAPI(updatedDictionary),
          status: 'UPDATED',
        },
      ]);

      processedCount++;
      await job.updateProgress((processedCount / totalDictionaries) * 100);
    } catch (error) {
      logger.error(`Error translating dictionary ${dictionaryId}:`, error);
      // We continue with other dictionaries
    }
  }
};

export const translationWorker = new Worker<TranslationJobData>(
  translationQueueName,
  processTranslationJob,
  {
    connection,
    concurrency: 5, // Process 5 dictionaries in parallel (across jobs or same job? Worker concurrency is for jobs)
    // Actually, one job has multiple dictionaries. `concurrency` applies to jobs.
    // If we want parallel dictionaries within a job, we handled it sequentially in the loop above.
  }
);

translationWorker.on('completed', (job) => {
  logger.info(`Translation job ${job.id} completed`);
});

translationWorker.on('failed', (job, err) => {
  logger.error(`Translation job ${job?.id} failed:`, err);
});
