import type { ConnectionOptions } from 'node:tls';
import * as eventListener from '@controllers/eventListener.controller';
import { type AIOptions, getAIConfig } from '@intlayer/ai';
import { pLimit } from '@intlayer/chokidar/utils';
import { DEFAULT_LOCALE } from '@intlayer/config/defaultValues';
import { mergeDictionaries } from '@intlayer/core/dictionaryManipulator';
import {
  getFilterMissingTranslationsDictionary,
  getPerLocaleDictionary,
  insertContentInDictionary,
} from '@intlayer/core/plugins';
import type { Locale } from '@intlayer/types/allLocales';
import type { ContentNode } from '@intlayer/types/dictionary';
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
import { Types } from 'mongoose';
import {
  isTranslationJobCancelled,
  isTranslationJobPaused,
  translationQueueName,
} from './translationQueue.service';

/**
 * Mirrors the CLI fill command (`packages/@intlayer/cli/src/fill/fill.ts`):
 * number of dictionaries translated concurrently within a single job.
 */
const NB_CONCURRENT_DICTIONARIES = 5;
const PAUSE_POLL_INTERVAL_MS = 2000;

type TranslationJobData = {
  dictionaryIds?: string[];
  dictionaryKeys?: string[];
  targetLocales?: Locale[];
  dictionaryTargets?: {
    dictionaryId: string;
    locales: Locale[];
    editedContent?: ContentNode;
  }[];
  projectId: string;
  userId: string;
  mode?: 'complete' | 'review';
};

type DictionaryTarget = {
  dictionaryId: string;
  locales: Locale[];
  editedContent?: ContentNode;
};

export type TranslationTaskState =
  | 'pending'
  | 'active'
  | 'completed'
  | 'failed'
  | 'cancelled';

/**
 * Fill-style translation task: one per dictionary, updated live while the
 * job runs so the UI can render a per-dictionary progression list.
 */
export type TranslationTaskProgress = {
  dictionaryId: string;
  dictionaryKey: string;
  targetLocales: Locale[];
  completedLocales: Locale[];
  state: TranslationTaskState;
  /** Fine-grained chunk info emitted by translateDictionaryDB */
  currentLocale: Locale | null;
  currentChunk: number | null;
  totalChunks: number | null;
};

export type TranslationJobProgress = {
  /** Computed per (dictionary × locale) unit for smooth progression */
  percentage: number;
  completedKeys: string[];
  failedKeys: string[];
  /** First active task — kept for backward compatibility with older clients */
  currentKey: string | null;
  currentLocale: string | null;
  currentChunk: number | null;
  totalChunks: number | null;
  /** One entry per dictionary, several may be `active` at once */
  tasks: TranslationTaskProgress[];
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
  const targets: DictionaryTarget[] =
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

  const sourceLocale = (project.configuration?.internationalization
    ?.defaultLocale || DEFAULT_LOCALE) as Locale;

  // Resolve dictionary keys up-front so every task is visible (as `pending`)
  // in the UI from the very first progress event — like the CLI fill command
  // that lists all translation tasks before running them.
  const validTargets = targets.filter((target) =>
    Types.ObjectId.isValid(target.dictionaryId)
  );
  const dictionaryDocuments =
    validTargets.length > 0
      ? await dictionaryService.findDictionaries(
          {
            _id: {
              $in: validTargets.map(
                (target) => new Types.ObjectId(target.dictionaryId)
              ),
            },
          },
          0,
          validTargets.length,
          undefined,
          false
        )
      : [];
  const dictionaryKeyById = new Map(
    dictionaryDocuments.map((dictionary) => [
      String(dictionary._id),
      dictionary.key,
    ])
  );

  const tasks: TranslationTaskProgress[] = targets.map((target) => ({
    dictionaryId: target.dictionaryId,
    dictionaryKey: dictionaryKeyById.get(target.dictionaryId) ?? '…',
    targetLocales: target.locales,
    completedLocales: [],
    state: 'pending',
    currentLocale: null,
    currentChunk: null,
    totalChunks: null,
  }));

  const completedKeys: string[] = [];
  const failedKeys: string[] = [];

  const totalLocaleUnits =
    tasks.reduce((sum, task) => sum + task.targetLocales.length, 0) || 1;

  const buildProgress = (): TranslationJobProgress => {
    const settledLocaleUnits = tasks.reduce(
      (sum, task) =>
        ['completed', 'failed', 'cancelled'].includes(task.state)
          ? sum + task.targetLocales.length
          : sum + task.completedLocales.length,
      0
    );
    const activeTask =
      tasks.find((task) => task.state === 'active' && task.currentLocale) ??
      tasks.find((task) => task.state === 'active');

    return {
      percentage: (settledLocaleUnits / totalLocaleUnits) * 100,
      completedKeys,
      failedKeys,
      currentKey: activeTask?.dictionaryKey ?? null,
      currentLocale: activeTask?.currentLocale ?? null,
      currentChunk: activeTask?.currentChunk ?? null,
      totalChunks: activeTask?.totalChunks ?? null,
      // Snapshot: tasks keep mutating while previous progress events are
      // serialized / asserted, so never leak the live references
      tasks: tasks.map((task) => ({
        ...task,
        targetLocales: [...task.targetLocales],
        completedLocales: [...task.completedLocales],
      })),
    };
  };

  const emitProgress = async () => {
    await job.updateProgress(buildProgress() as unknown as number);
  };

  /**
   * Pause = wait between AI chunks until resumed (or cancelled).
   * Cancellation is handled separately via `shouldStop` so pausing never
   * aborts the job any more.
   */
  const waitWhilePaused = async () => {
    while (await isTranslationJobPaused(job.id!)) {
      if (await isTranslationJobCancelled(job.id!)) return;
      await new Promise((resolve) =>
        setTimeout(resolve, PAUSE_POLL_INTERVAL_MS)
      );
    }
  };

  /** Checked between every AI chunk — only cancellation aborts */
  const shouldStop = async () => isTranslationJobCancelled(job.id!);

  let isCancelled = false;

  /**
   * Translate every target locale of a single dictionary and persist the
   * result. Runs concurrently for several dictionaries via the task limiter.
   */
  const processDictionaryTarget = async (
    task: TranslationTaskProgress,
    target: DictionaryTarget
  ): Promise<void> => {
    const { dictionaryId, locales: taskTargetLocales, editedContent } = target;

    const dictionary = await dictionaryService.getDictionaryById(dictionaryId);
    task.dictionaryKey = dictionary.key;

    const versionList = [...(dictionary.content.keys() ?? [])];
    const lastVersion = versionList[versionList.length - 1] || 'v1';
    const dictionaryContentNode = dictionary.content.get(lastVersion);

    if (!dictionaryContentNode) {
      throw new Error(`No content found for dictionary ${dictionary.key}`);
    }

    const sourceContent = dictionaryContentNode.content;

    const onChunkStart = async ({
      locale,
      chunkIndex,
      totalChunks,
    }: {
      locale: Locale;
      chunkIndex: number;
      totalChunks: number;
    }) => {
      task.currentLocale = locale;
      task.currentChunk = chunkIndex + 1;
      task.totalChunks = totalChunks;
      await emitProgress();
      await waitWhilePaused();
    };

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
          {
            key: dictionary.key,
            content: sourceContent as any,
            schema: undefined,
          },
          sourceLocale
        );
        contentToTranslate = sourceForAll.content as Record<string, unknown>;
      } else {
        const missingForLocale = getFilterMissingTranslationsDictionary(
          {
            key: dictionary.key,
            content: sourceContent as any,
            schema: undefined,
          },
          targetLocale
        );
        const sourceForMissing = getPerLocaleDictionary(
          missingForLocale,
          sourceLocale
        );
        contentToTranslate = sourceForMissing.content as Record<
          string,
          unknown
        >;
      }

      if (!contentToTranslate || Object.keys(contentToTranslate).length === 0) {
        logger.info(
          `Dictionary ${dictionary.key}: locale ${targetLocale} already complete, skipping`
        );
        task.completedLocales.push(targetLocale);
        continue;
      }

      const localeResult = await translateDictionaryDB({
        content: contentToTranslate as any,
        sourceLocale,
        targetLocales: [targetLocale],
        aiConfig,
        mode,
        dictionaryDescription: dictionary.description,
        shouldStop,
        onChunkStart,
      });

      if (localeResult[targetLocale]) {
        translationResult[targetLocale] = localeResult[targetLocale];
      }

      task.completedLocales.push(targetLocale);
      task.currentLocale = null;
      task.currentChunk = null;
      task.totalChunks = null;
      await emitProgress();
    }

    // Re-translate freshly edited source nodes (if any) so their now-stale
    // translations are regenerated across every target locale. The partial
    // holds only the edited nodes reduced to the source locale, so the AI
    // produces every target locale for them.
    let editedTranslatedDict: { key: string; content: ContentNode } | undefined;

    if (editedContent && Object.keys(editedContent).length > 0) {
      const editedSource = getPerLocaleDictionary(
        {
          key: dictionary.key,
          content: editedContent as any,
          schema: undefined,
        },
        sourceLocale
      );

      let editedDict: { key: string; content: any } = {
        key: dictionary.key,
        content: editedContent,
      };

      for (const targetLocale of taskTargetLocales) {
        const localeResult = await translateDictionaryDB({
          content: editedSource.content as any,
          sourceLocale,
          targetLocales: [targetLocale],
          aiConfig,
          mode: 'complete',
          dictionaryDescription: dictionary.description,
          shouldStop,
          onChunkStart,
        });

        if (localeResult[targetLocale]) {
          editedDict = insertContentInDictionary(
            editedDict as any,
            localeResult[targetLocale] as any,
            targetLocale
          );
        }
      }

      editedTranslatedDict = editedDict as {
        key: string;
        content: ContentNode;
      };
    }

    if (Object.keys(translationResult).length === 0 && !editedTranslatedDict) {
      logger.info(
        `Dictionary ${dictionary.key}: all target locales already complete`
      );
      return;
    }

    // Fetch fresh DB content before writing to avoid overwriting concurrent edits.
    const currentDictionary =
      await dictionaryService.getDictionaryById(dictionaryId);
    const currentContentNode = currentDictionary.content.get(lastVersion)!;

    let updatedDict: { key: string; content: any } = {
      key: dictionary.key,
      content: currentContentNode.content,
    };

    // Overwrite the freshly-edited nodes with their regenerated translations.
    // `mergeDictionaries` prefers the first (destination) argument, so the
    // edited partial wins over the now-stale values it overlaps; every other
    // node falls back to the current DB content.
    if (editedTranslatedDict) {
      updatedDict = mergeDictionaries([
        editedTranslatedDict as any,
        updatedDict as any,
      ]) as { key: string; content: any };
    }

    // Fill missing locales without touching existing translations.
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
  };

  const taskLimiter = pLimit(NB_CONCURRENT_DICTIONARIES);

  await emitProgress();

  const runners = tasks.map((task, index) =>
    taskLimiter(async () => {
      if (isCancelled || (await isTranslationJobCancelled(job.id!))) {
        isCancelled = true;
        task.state = 'cancelled';
        return;
      }

      // Respect pause before starting a new dictionary
      await waitWhilePaused();

      if (await isTranslationJobCancelled(job.id!)) {
        isCancelled = true;
        task.state = 'cancelled';
        return;
      }

      task.state = 'active';
      await emitProgress();

      try {
        await processDictionaryTarget(task, targets[index]);
        task.state = 'completed';
        completedKeys.push(task.dictionaryKey);
      } catch (error) {
        if (error instanceof AbortError) {
          // Cancelled mid-chunk – stop this task without marking it as failed
          isCancelled = true;
          task.state = 'cancelled';
          logger.info(
            `Translation job ${job.id}: task ${task.dictionaryKey} aborted (cancel)`
          );
        } else {
          logger.error(
            `Error translating dictionary ${task.dictionaryId}:`,
            error
          );
          task.state = 'failed';
          failedKeys.push(task.dictionaryKey);
        }
      }

      task.currentLocale = null;
      task.currentChunk = null;
      task.totalChunks = null;
      await emitProgress();
    })
  );

  await Promise.all(runners);
  await emitProgress();

  if (isCancelled) {
    throw new Error('Cancelled by user');
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
