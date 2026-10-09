import type {
  PushDictionariesBody,
  PushDictionariesResult,
  PushDictionariesResultData,
} from '@intlayer/backend-contract/dictionary';
import { chunkArray } from '@intlayer/engine/utils/chunkArray';
import { parallelize } from '@intlayer/engine/utils/parallelize';

type PushedDictionaries = PushDictionariesBody['dictionaries'];

/** Dictionaries sent per request: keeps each body far below the size limit. */
export const PUSH_BATCH_SIZE = 8;

/** Requests in flight at once. */
export const PUSH_CONCURRENCY = 3;

/** Advancement of a batched push, reported after every batch change. */
export type PushDictionariesProgressState = {
  /** Dictionaries to push in total. */
  totalCount: number;
  /** Dictionaries whose request settled, successfully or not. */
  settledCount: number;
  /** Keys of the dictionaries whose request is in flight. */
  pushingKeys: string[];
  /** Keys of the dictionaries the CMS failed to save. */
  failedKeys: string[];
};

export type PushDictionariesInBatchesOptions = {
  batchSize?: number;
  concurrency?: number;
  onProgress?: (progress: PushDictionariesProgressState) => void;
};

const EMPTY_PUSH_RESULT_DATA: PushDictionariesResultData = {
  newDictionaries: [],
  updatedDictionaries: [],
  upToDateDictionaries: [],
  error: [],
};

const mergePushResultData = (
  mergedData: PushDictionariesResultData,
  data: PushDictionariesResultData
): PushDictionariesResultData => ({
  newDictionaries: [...mergedData.newDictionaries, ...data.newDictionaries],
  updatedDictionaries: [
    ...mergedData.updatedDictionaries,
    ...data.updatedDictionaries,
  ],
  upToDateDictionaries: [
    ...mergedData.upToDateDictionaries,
    ...data.upToDateDictionaries,
  ],
  error: [...mergedData.error, ...data.error],
});

const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

/**
 * Pushes dictionaries in parallel batches (as `intlayer push` does), and merges
 * the batch results into one, as a single push would answer.
 *
 * A failing batch does not stop the others: its dictionaries are reported in
 * `data.error`. The call only throws when every batch failed.
 */
export const pushDictionariesInBatches = async (
  dictionaries: PushedDictionaries,
  pushBatch: (batch: PushedDictionaries) => Promise<PushDictionariesResult>,
  {
    batchSize = PUSH_BATCH_SIZE,
    concurrency = PUSH_CONCURRENCY,
    onProgress,
  }: PushDictionariesInBatchesOptions = {}
): Promise<PushDictionariesResult> => {
  const progress: PushDictionariesProgressState = {
    totalCount: dictionaries.length,
    settledCount: 0,
    pushingKeys: [],
    failedKeys: [],
  };
  const reportProgress = () => onProgress?.({ ...progress });

  reportProgress();

  const pushBatchWithProgress = async (
    batch: PushedDictionaries
  ): Promise<PushDictionariesResult | Error> => {
    const batchKeys = batch.map((dictionary) => dictionary.key);

    progress.pushingKeys = [...progress.pushingKeys, ...batchKeys];
    reportProgress();

    let batchResult: PushDictionariesResult | Error;

    try {
      batchResult = await pushBatch(batch);
    } catch (error) {
      batchResult = error instanceof Error ? error : new Error(String(error));
    }

    const failedKeys =
      batchResult instanceof Error
        ? batchKeys
        : (batchResult.data?.error ?? []).map(({ key }) => key);

    progress.pushingKeys = progress.pushingKeys.filter(
      (key) => !batchKeys.includes(key)
    );
    progress.settledCount += batch.length;
    progress.failedKeys = [...progress.failedKeys, ...failedKeys];
    reportProgress();

    return batchResult;
  };

  const batches = chunkArray(dictionaries, batchSize);
  const batchResults = await parallelize(
    batches,
    pushBatchWithProgress,
    concurrency
  );

  const [firstFailure] = batchResults.filter(
    (batchResult): batchResult is Error => batchResult instanceof Error
  );

  // Nothing reached the CMS: surface the error as a failed mutation
  if (firstFailure && batchResults.every((result) => result instanceof Error)) {
    throw firstFailure;
  }

  const data = batchResults.reduce<PushDictionariesResultData>(
    (mergedData, batchResult, batchIndex) =>
      mergePushResultData(
        mergedData,
        batchResult instanceof Error
          ? {
              ...EMPTY_PUSH_RESULT_DATA,
              error: (batches[batchIndex] ?? []).map((dictionary) => ({
                key: dictionary.key,
                localId: dictionary.localId,
                message: getErrorMessage(batchResult),
              })),
            }
          : { ...EMPTY_PUSH_RESULT_DATA, ...batchResult.data }
      ),
    EMPTY_PUSH_RESULT_DATA
  );

  const failedResult = batchResults.find(
    (batchResult): batchResult is PushDictionariesResult =>
      !(batchResult instanceof Error) && !batchResult.success
  );

  return {
    success: !firstFailure && !failedResult,
    status: failedResult?.status ?? 200,
    data,
    ...(failedResult?.error && { error: failedResult.error }),
  };
};
