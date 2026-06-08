import { beforeEach, describe, expect, it, vi } from 'vitest';

// ─── mocks ────────────────────────────────────────────────────────────────────

vi.mock('@controllers/eventListener.controller', () => ({
  sendDictionaryUpdate: vi.fn(),
}));

vi.mock('@services/dictionary.service', () => ({
  getDictionaryById: vi.fn(),
  updateDictionaryById: vi.fn(),
  incrementVersion: vi.fn(),
}));

vi.mock('@services/user.service', () => ({
  getUserById: vi.fn(),
}));

vi.mock('@services/project.service', () => ({
  getProjectById: vi.fn(),
}));

vi.mock('@utils/AI/translateDictionaryDB', () => ({
  AbortError: class AbortError extends Error {
    constructor() {
      super('Aborted');
      this.name = 'AbortError';
    }
  },
  translateDictionaryDB: vi.fn(),
}));

vi.mock('./translationQueue.service', () => ({
  isTranslationJobPaused: vi.fn(async () => false),
  isTranslationJobCancelled: vi.fn(async () => false),
  translationQueueName: 'translations',
}));

vi.mock('@intlayer/ai', () => ({
  getAIConfig: vi.fn(async () => ({ provider: 'openai', model: 'gpt-5-mini' })),
}));

// Mock core plugins so tests control what content reaches translateDictionaryDB.
// - getFilterMissingTranslationsDictionary: returns the dict unchanged (content needs translation)
// - getPerLocaleDictionary: returns a flat dict with source content
// - insertContentInDictionary: merges locale content into the dict
vi.mock('@intlayer/core/plugins', () => ({
  getFilterMissingTranslationsDictionary: vi.fn((dict: any) => dict),
  getPerLocaleDictionary: vi.fn((_dict: any, _locale: string) => ({
    key: _dict.key,
    content: { label: 'Source text' },
  })),
  insertContentInDictionary: vi.fn(
    (dict: any, content: any, locale: string) => ({
      ...dict,
      content: { ...dict.content, [locale]: content },
    })
  ),
}));

vi.mock('@logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@utils/redis/connectRedis', () => ({
  getRedisClient: vi.fn(() => ({})),
}));

vi.mock('bullmq', () => ({
  Worker: vi.fn().mockImplementation(() => ({ on: vi.fn() })),
}));

// ─── imports after mocks ──────────────────────────────────────────────────────

import { getPerLocaleDictionary } from '@intlayer/core/plugins';
import * as dictionaryService from '@services/dictionary.service';
import * as projectService from '@services/project.service';
import * as userService from '@services/user.service';
import {
  AbortError,
  translateDictionaryDB,
} from '@utils/AI/translateDictionaryDB';
import {
  isTranslationJobCancelled,
  isTranslationJobPaused,
} from './translationQueue.service';
import { processTranslationJob } from './translationWorker.service';

const mockTranslateDictionaryDB = translateDictionaryDB as ReturnType<
  typeof vi.fn
>;
const mockGetDictionaryById = dictionaryService.getDictionaryById as ReturnType<
  typeof vi.fn
>;
const mockUpdateDictionaryById =
  dictionaryService.updateDictionaryById as ReturnType<typeof vi.fn>;
const mockIncrementVersion = dictionaryService.incrementVersion as ReturnType<
  typeof vi.fn
>;
const mockGetUserById = userService.getUserById as ReturnType<typeof vi.fn>;
const mockGetProjectById = projectService.getProjectById as ReturnType<
  typeof vi.fn
>;
const mockIsPaused = isTranslationJobPaused as ReturnType<typeof vi.fn>;
const mockIsCancelled = isTranslationJobCancelled as ReturnType<typeof vi.fn>;
const mockGetPerLocaleDictionary = getPerLocaleDictionary as ReturnType<
  typeof vi.fn
>;

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Create a fake multilingual dictionary as stored in DB */
const makeFakeDict = (id: string, key: string) => ({
  id,
  key,
  content: new Map([
    [
      'v1',
      {
        content: {
          label: { nodeType: 'translation', translation: { en: 'Source' } },
        },
      },
    ],
  ]),
  description: `${key} description`,
});

const FAKE_USER = { id: 'user-1', name: 'Tester' };
const FAKE_PROJECT = {
  id: 'proj-1',
  configuration: {
    internationalization: { defaultLocale: 'en', locales: ['en', 'fr', 'es'] },
  },
  autoFill: false,
};

/** Minimal BullMQ Job stub */
const makeJob = (id: string, data: Record<string, unknown>): any => ({
  id,
  data,
  updateProgress: vi.fn(async () => {}),
});

// ─── tests ───────────────────────────────────────────────────────────────────

describe('processTranslationJob', () => {
  beforeEach(() => {
    mockGetUserById.mockResolvedValue(FAKE_USER);
    mockGetProjectById.mockResolvedValue(FAKE_PROJECT);
    mockIsPaused.mockResolvedValue(false);
    mockIsCancelled.mockResolvedValue(false);
    mockIncrementVersion.mockReturnValue('v2');
    mockUpdateDictionaryById.mockResolvedValue(makeFakeDict('x', 'x'));
    mockTranslateDictionaryDB.mockResolvedValue({ fr: { label: 'Bonjour' } });
  });

  // ── basic processing ───────────────────────────────────────────────────

  it('completes a single dictionary with all target locales', async () => {
    const dict = makeFakeDict('d1', 'common');
    mockGetDictionaryById.mockResolvedValue(dict);
    mockTranslateDictionaryDB.mockResolvedValue({
      fr: { label: 'Bonjour' },
      es: { label: 'Hola' },
    });

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'd1', locales: ['fr', 'es'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const progressCalls: any[] = job.updateProgress.mock.calls.map(
      (c: any) => c[0]
    );
    const final = progressCalls[progressCalls.length - 1];
    expect(final.completedKeys).toContain('common');
    expect(final.failedKeys).toHaveLength(0);
    expect(final.percentage).toBe(100);
  });

  it('skips a locale that is already fully translated (getPerLocaleDictionary returns empty)', async () => {
    const dict = makeFakeDict('d1', 'nav');
    mockGetDictionaryById.mockResolvedValue(dict);

    // Simulate: fr already complete (getPerLocaleDictionary returns empty content)
    mockGetPerLocaleDictionary.mockReturnValueOnce({ key: 'nav', content: {} }); // fr: nothing to translate

    mockTranslateDictionaryDB.mockResolvedValue({});

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'd1', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    // Dictionary should still be marked completed even with no AI call
    const final = job.updateProgress.mock.calls.at(-1)[0];
    expect(final.completedKeys).toContain('nav');
    expect(mockUpdateDictionaryById).not.toHaveBeenCalled();
  });

  // ── multiple dictionaries with DIFFERENT missing locales ──────────────

  it('each dictionary only receives its own target locales', async () => {
    const dictA = makeFakeDict('dA', 'pages');
    const dictB = makeFakeDict('dB', 'buttons');

    mockGetDictionaryById
      .mockResolvedValueOnce(dictA) // read
      .mockResolvedValueOnce(dictA) // re-fetch before write
      .mockResolvedValueOnce(dictB)
      .mockResolvedValueOnce(dictB);

    mockTranslateDictionaryDB
      .mockResolvedValueOnce({ fr: { label: 'fr-pages' } })
      .mockResolvedValueOnce({ es: { label: 'es-buttons' } });

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['es'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = job.updateProgress.mock.calls.at(-1)[0];
    expect(final.completedKeys).toContain('pages');
    expect(final.completedKeys).toContain('buttons');
    expect(final.failedKeys).toHaveLength(0);
    expect(final.percentage).toBe(100);

    // Dict A → only fr; Dict B → only es
    expect(mockTranslateDictionaryDB.mock.calls[0][0].targetLocales).toEqual([
      'fr',
    ]);
    expect(mockTranslateDictionaryDB.mock.calls[1][0].targetLocales).toEqual([
      'es',
    ]);
  });

  it('3 dicts each missing different locales — each gets the right locale set', async () => {
    const dictA = makeFakeDict('dA', 'header');
    const dictB = makeFakeDict('dB', 'footer');
    const dictC = makeFakeDict('dC', 'sidebar');

    // Each dict: 1 read + 1 re-fetch-before-write = 2 calls per dict
    mockGetDictionaryById
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictB)
      .mockResolvedValueOnce(dictB)
      .mockResolvedValueOnce(dictC)
      .mockResolvedValueOnce(dictC)
      .mockResolvedValueOnce(dictC);

    // Worker sends one locale per call: dA/fr, dB/es, dC/fr, dC/es = 4 calls
    mockTranslateDictionaryDB
      .mockResolvedValueOnce({ fr: {} }) // dA
      .mockResolvedValueOnce({ es: {} }) // dB
      .mockResolvedValueOnce({ fr: {} }) // dC/fr
      .mockResolvedValueOnce({ es: {} }); // dC/es

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['es'] },
        { dictionaryId: 'dC', locales: ['fr', 'es'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = job.updateProgress.mock.calls.at(-1)[0];
    expect(final.completedKeys).toContain('header');
    expect(final.completedKeys).toContain('footer');
    expect(final.completedKeys).toContain('sidebar');
    expect(final.failedKeys).toHaveLength(0);

    // Worker iterates one locale per call — dict C (fr+es) = 2 separate calls
    // Call order: dictA/fr, dictB/es, dictC/fr, dictC/es
    expect(mockTranslateDictionaryDB.mock.calls[0][0].targetLocales).toEqual([
      'fr',
    ]);
    expect(mockTranslateDictionaryDB.mock.calls[1][0].targetLocales).toEqual([
      'es',
    ]);
    expect(mockTranslateDictionaryDB.mock.calls[2][0].targetLocales).toEqual([
      'fr',
    ]);
    expect(mockTranslateDictionaryDB.mock.calls[3][0].targetLocales).toEqual([
      'es',
    ]);
  });

  // ── failure handling ─────────────────────────────────────────────────────

  it('marks a failed dictionary and continues with remaining ones', async () => {
    const dictA = makeFakeDict('dA', 'broken');
    const dictB = makeFakeDict('dB', 'working');

    mockGetDictionaryById
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictB)
      .mockResolvedValueOnce(dictB);

    mockTranslateDictionaryDB
      .mockRejectedValueOnce(new Error('AI service unavailable'))
      .mockResolvedValueOnce({ fr: { label: 'Salut' } });

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['fr'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = job.updateProgress.mock.calls.at(-1)[0];
    expect(final.failedKeys).toContain('broken');
    expect(final.completedKeys).toContain('working');
    expect(final.percentage).toBe(100);
  });

  it('marks all dictionaries as failed when every AI call throws', async () => {
    const dictA = makeFakeDict('dA', 'alpha');
    const dictB = makeFakeDict('dB', 'beta');

    mockGetDictionaryById
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictB);

    mockTranslateDictionaryDB.mockRejectedValue(new Error('Outage'));

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['fr'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = job.updateProgress.mock.calls.at(-1)[0];
    expect(final.failedKeys).toContain('alpha');
    expect(final.failedKeys).toContain('beta');
    expect(final.completedKeys).toHaveLength(0);
  });

  it('marks dictionary as failed when DB has no content node for the version', async () => {
    const emptyDict = {
      id: 'dA',
      key: 'empty',
      // content map exists but the entry has a null content node
      content: new Map([['v1', null]]),
      description: '',
    };
    mockGetDictionaryById.mockResolvedValue(emptyDict);

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'dA', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = job.updateProgress.mock.calls.at(-1)[0];
    expect(final.failedKeys).toContain('empty');
    expect(mockTranslateDictionaryDB).not.toHaveBeenCalled();
  });

  // ── cancel / pause ───────────────────────────────────────────────────────

  it('throws immediately when job is already cancelled before processing starts', async () => {
    mockIsCancelled.mockResolvedValue(true);

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'dA', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await expect(processTranslationJob(job)).rejects.toThrow(
      'Cancelled by user'
    );
    expect(mockTranslateDictionaryDB).not.toHaveBeenCalled();
  });

  it('stops mid-job on AbortError without marking the dict as failed', async () => {
    const dictA = makeFakeDict('dA', 'dict-a');
    mockGetDictionaryById.mockResolvedValue(dictA);
    mockTranslateDictionaryDB.mockRejectedValueOnce(new AbortError());

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['fr'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    // dict-b was never attempted
    expect(mockTranslateDictionaryDB).toHaveBeenCalledTimes(1);
    // dict-a was aborted mid-chunk — not in failedKeys
    const progressCalls: any[] = job.updateProgress.mock.calls.map(
      (c: any) => c[0]
    );
    const anyFailed = progressCalls.some((p: any) =>
      p.failedKeys?.includes('dict-a')
    );
    expect(anyFailed).toBe(false);
  });

  // ── progress tracking ─────────────────────────────────────────────────────

  it('emits currentKey = dictionary key before translation starts', async () => {
    const dictA = makeFakeDict('dA', 'header');
    const dictB = makeFakeDict('dB', 'footer');

    mockGetDictionaryById
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictB)
      .mockResolvedValueOnce(dictB);

    mockTranslateDictionaryDB
      .mockResolvedValueOnce({ fr: {} })
      .mockResolvedValueOnce({ fr: {} });

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['fr'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const keys = (job.updateProgress.mock.calls as any[])
      .map((c) => c[0].currentKey)
      .filter(Boolean);

    expect(keys).toContain('header');
    expect(keys).toContain('footer');
  });

  it('starts at 0% and ends at 100% for a single dictionary', async () => {
    const dict = makeFakeDict('d1', 'app');
    mockGetDictionaryById.mockResolvedValue(dict);
    mockTranslateDictionaryDB.mockResolvedValueOnce({ fr: { label: 'App' } });

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'd1', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const progressCalls: any[] = (job.updateProgress.mock.calls as any[]).map(
      (c) => c[0]
    );
    expect(progressCalls[0].percentage).toBe(0);
    expect(progressCalls[progressCalls.length - 1].percentage).toBe(100);
  });

  it('increments percentage evenly for 4 dictionaries', async () => {
    const dicts = ['a', 'b', 'c', 'd'].map((k) => makeFakeDict(k, k));

    dicts.forEach((d) => {
      mockGetDictionaryById.mockResolvedValueOnce(d).mockResolvedValueOnce(d);
    });

    mockTranslateDictionaryDB.mockResolvedValue({ fr: {} });

    const job = makeJob('job-1', {
      dictionaryTargets: dicts.map((d) => ({
        dictionaryId: d.id,
        locales: ['fr'],
      })),
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const percentages = (job.updateProgress.mock.calls as any[])
      .map((c) => c[0].percentage)
      .filter((p: number) => p > 0);

    expect(percentages).toContain(25);
    expect(percentages).toContain(50);
    expect(percentages).toContain(75);
    expect(percentages).toContain(100);
  });

  // ── legacy dictionaryIds format ───────────────────────────────────────────

  it('falls back to dictionaryIds + targetLocales when dictionaryTargets is absent', async () => {
    const dict = makeFakeDict('d1', 'legacy');
    mockGetDictionaryById.mockResolvedValue(dict);
    mockTranslateDictionaryDB.mockResolvedValueOnce({ fr: {} });

    const job = makeJob('job-1', {
      dictionaryIds: ['d1'],
      targetLocales: ['fr'],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    expect(mockTranslateDictionaryDB).toHaveBeenCalledWith(
      expect.objectContaining({ targetLocales: ['fr'] })
    );
  });

  it('legacy format applies the same locale list to ALL dictionaries', async () => {
    const dictA = makeFakeDict('dA', 'alpha');
    const dictB = makeFakeDict('dB', 'beta');

    mockGetDictionaryById
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictA)
      .mockResolvedValueOnce(dictB)
      .mockResolvedValueOnce(dictB);

    mockTranslateDictionaryDB
      .mockResolvedValueOnce({ fr: {}, es: {} })
      .mockResolvedValueOnce({ fr: {}, es: {} });

    const job = makeJob('job-1', {
      dictionaryIds: ['dA', 'dB'],
      targetLocales: ['fr', 'es'],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    // Worker sends one locale per call (4 total: dA/fr, dA/es, dB/fr, dB/es)
    // Every call's targetLocales is a single-element array from the shared list
    const allLocales = mockTranslateDictionaryDB.mock.calls.flatMap(
      (call) => call[0].targetLocales
    );
    expect(allLocales.filter((l: string) => l === 'fr')).toHaveLength(2);
    expect(allLocales.filter((l: string) => l === 'es')).toHaveLength(2);
  });
});
