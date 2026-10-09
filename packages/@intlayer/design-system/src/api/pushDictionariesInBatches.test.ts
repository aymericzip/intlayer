import type {
  PushDictionariesBody,
  PushDictionariesResult,
} from '@intlayer/backend-contract/dictionary';
import { describe, expect, it, vi } from 'vitest';
import {
  PUSH_BATCH_SIZE,
  PUSH_CONCURRENCY,
  type PushDictionariesProgressState,
  pushDictionariesInBatches,
} from './pushDictionariesInBatches';

type PushedDictionaries = PushDictionariesBody['dictionaries'];

const createDictionaries = (count: number): PushedDictionaries =>
  Array.from({ length: count }, (_, index) => ({
    key: `dictionary-${index}`,
    content: {},
  })) as unknown as PushedDictionaries;

const answerBatch = async (
  batch: PushedDictionaries
): Promise<PushDictionariesResult> =>
  ({
    success: true,
    status: 200,
    data: {
      newDictionaries: batch.map(({ key }) => ({ key })),
      updatedDictionaries: [],
      upToDateDictionaries: [],
      error: [],
    },
  }) as unknown as PushDictionariesResult;

describe('pushDictionariesInBatches', () => {
  it('pushes every dictionary in batches and merges the results', async () => {
    const pushBatch = vi.fn(answerBatch);

    const result = await pushDictionariesInBatches(
      createDictionaries(PUSH_BATCH_SIZE * 2 + 1),
      pushBatch
    );

    expect(pushBatch).toHaveBeenCalledTimes(3);
    expect(pushBatch.mock.calls[0]?.[0]).toHaveLength(PUSH_BATCH_SIZE);
    expect(result.success).toBe(true);
    expect(result.data?.newDictionaries).toHaveLength(PUSH_BATCH_SIZE * 2 + 1);
  });

  it('keeps at most PUSH_CONCURRENCY requests in flight', async () => {
    let inFlightCount = 0;
    let maxInFlightCount = 0;

    await pushDictionariesInBatches(
      createDictionaries(PUSH_BATCH_SIZE * (PUSH_CONCURRENCY + 2)),
      async (batch) => {
        inFlightCount += 1;
        maxInFlightCount = Math.max(maxInFlightCount, inFlightCount);
        await new Promise((resolve) => setTimeout(resolve, 5));
        inFlightCount -= 1;

        return answerBatch(batch);
      }
    );

    expect(maxInFlightCount).toBe(PUSH_CONCURRENCY);
  });

  it('reports the progress of the push', async () => {
    const progressReports: PushDictionariesProgressState[] = [];

    await pushDictionariesInBatches(createDictionaries(3), answerBatch, {
      batchSize: 2,
      concurrency: 1,
      onProgress: (progress) => progressReports.push(progress),
    });

    expect(progressReports[0]).toEqual({
      totalCount: 3,
      settledCount: 0,
      pushingKeys: [],
      failedKeys: [],
    });
    expect(progressReports[1]?.pushingKeys).toEqual([
      'dictionary-0',
      'dictionary-1',
    ]);
    expect(progressReports[progressReports.length - 1]).toEqual({
      totalCount: 3,
      settledCount: 3,
      pushingKeys: [],
      failedKeys: [],
    });
  });

  it('keeps pushing when a batch throws, and reports its dictionaries', async () => {
    const progressReports: PushDictionariesProgressState[] = [];

    const result = await pushDictionariesInBatches(
      createDictionaries(3),
      async (batch) => {
        if (batch[0]?.key === 'dictionary-0') throw new Error('Too large');

        return answerBatch(batch);
      },
      {
        batchSize: 2,
        onProgress: (progress) => progressReports.push(progress),
      }
    );

    expect(result.success).toBe(false);
    expect(result.data?.newDictionaries).toHaveLength(1);
    expect(result.data?.error.map(({ key }) => key)).toEqual([
      'dictionary-0',
      'dictionary-1',
    ]);
    expect(result.data?.error[0]?.message).toBe('Too large');
    expect(progressReports[progressReports.length - 1]?.failedKeys).toEqual([
      'dictionary-0',
      'dictionary-1',
    ]);
  });

  it('throws when every batch fails', async () => {
    await expect(
      pushDictionariesInBatches(createDictionaries(3), async () => {
        throw new Error('Offline');
      })
    ).rejects.toThrow('Offline');
  });

  it('reports a failed batch response', async () => {
    let callCount = 0;
    const result = await pushDictionariesInBatches(
      createDictionaries(PUSH_BATCH_SIZE + 1),
      async (batch) => {
        callCount += 1;
        const batchResult = await answerBatch(batch);

        return callCount === 2
          ? { ...batchResult, success: false, status: 500 }
          : batchResult;
      }
    );

    expect(result.success).toBe(false);
    expect(result.status).toBe(500);
  });
});
