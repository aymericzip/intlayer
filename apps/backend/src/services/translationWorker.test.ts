import { beforeEach, describe, expect, it, vi } from 'vitest';

// ─── mocks ────────────────────────────────────────────────────────────────────

vi.mock('@controllers/eventListener.controller', () => ({
  sendDictionaryUpdate: vi.fn(),
}));

vi.mock('@services/dictionary.service', () => ({
  findDictionaries: vi.fn(async () => []),
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

// Shallow merge preferring the first (destination) dictionary — enough to assert
// the worker wires edited content through; real semantics live in mergeDictionaries.test.ts.
vi.mock('@intlayer/core/dictionaryManipulator', () => ({
  mergeDictionaries: vi.fn((dicts: any[]) => ({
    key: dicts[0].key,
    content: { ...(dicts[1]?.content ?? {}), ...dicts[0].content },
  })),
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

import { mergeDictionaries } from '@intlayer/core/dictionaryManipulator';
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
const mockMergeDictionaries = mergeDictionaries as ReturnType<typeof vi.fn>;

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

/**
 * Register dictionaries so getDictionaryById resolves them by id, regardless
 * of the (now concurrent) call order of the fill-style worker.
 */
const registerDictionaries = (
  ...dictionaries: ReturnType<typeof makeFakeDict>[]
) => {
  const dictionariesById = new Map(
    dictionaries.map((dictionary) => [dictionary.id, dictionary])
  );
  mockGetDictionaryById.mockImplementation(
    async (id: string) => dictionariesById.get(id) ?? makeFakeDict(id, id)
  );
};

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

const lastProgress = (job: any) => job.updateProgress.mock.calls.at(-1)[0];

// ─── tests ───────────────────────────────────────────────────────────────────

describe('processTranslationJob', () => {
  beforeEach(() => {
    mockGetUserById.mockResolvedValue(FAKE_USER);
    mockGetProjectById.mockResolvedValue(FAKE_PROJECT);
    mockIsPaused.mockResolvedValue(false);
    mockIsCancelled.mockResolvedValue(false);
    mockIncrementVersion.mockReturnValue('v2');
    mockUpdateDictionaryById.mockResolvedValue(makeFakeDict('x', 'x'));
    mockTranslateDictionaryDB.mockImplementation(
      async ({ targetLocales }: { targetLocales: string[] }) => ({
        [targetLocales[0]]: { label: 'Translated' },
      })
    );
  });

  // ── basic processing ───────────────────────────────────────────────────

  it('completes a single dictionary with all target locales', async () => {
    registerDictionaries(makeFakeDict('d1', 'common'));

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'd1', locales: ['fr', 'es'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = lastProgress(job);
    expect(final.completedKeys).toContain('common');
    expect(final.failedKeys).toHaveLength(0);
    expect(final.percentage).toBe(100);
  });

  it('skips a locale that is already fully translated (getPerLocaleDictionary returns empty)', async () => {
    registerDictionaries(makeFakeDict('d1', 'nav'));

    // Simulate: fr already complete (getPerLocaleDictionary returns empty content)
    mockGetPerLocaleDictionary.mockReturnValueOnce({ key: 'nav', content: {} }); // fr: nothing to translate

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'd1', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    // Dictionary should still be marked completed even with no AI call
    const final = lastProgress(job);
    expect(final.completedKeys).toContain('nav');
    expect(mockUpdateDictionaryById).not.toHaveBeenCalled();
  });

  // ── edited-source re-translation (auto-fill on default-locale edit) ────────

  it('re-translates edited source nodes and merges them over the current content', async () => {
    registerDictionaries(makeFakeDict('d1', 'common'));

    // 1st getPerLocaleDictionary call = missing-fill (nothing missing → empty)
    // 2nd call = the edited partial source (non-empty → gets translated)
    mockGetPerLocaleDictionary
      .mockReturnValueOnce({ key: 'common', content: {} })
      .mockReturnValueOnce({ key: 'common', content: { label: 'New source' } });

    const editedContent = {
      label: { nodeType: 'translation', translation: { en: 'New source' } },
    };

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'd1', locales: ['fr'], editedContent },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    // The edited partial was translated for the target locale...
    expect(mockTranslateDictionaryDB).toHaveBeenCalledWith(
      expect.objectContaining({ targetLocales: ['fr'] })
    );
    // ...merged over the current DB content (edited partial first / destination)...
    expect(mockMergeDictionaries).toHaveBeenCalledTimes(1);
    // ...and persisted, even though no locale was strictly "missing".
    expect(mockUpdateDictionaryById).toHaveBeenCalledTimes(1);

    const final = lastProgress(job);
    expect(final.completedKeys).toContain('common');
  });

  it('does not merge when no editedContent is provided', async () => {
    registerDictionaries(makeFakeDict('d1', 'common'));

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'd1', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    expect(mockMergeDictionaries).not.toHaveBeenCalled();
  });

  // ── multiple dictionaries with DIFFERENT missing locales ──────────────

  it('each dictionary only receives its own target locales', async () => {
    registerDictionaries(
      makeFakeDict('dA', 'pages'),
      makeFakeDict('dB', 'buttons')
    );

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['es'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = lastProgress(job);
    expect(final.completedKeys).toContain('pages');
    expect(final.completedKeys).toContain('buttons');
    expect(final.failedKeys).toHaveLength(0);
    expect(final.percentage).toBe(100);

    // Dictionaries run concurrently — match calls by description, not order
    const localesByDescription = new Map(
      mockTranslateDictionaryDB.mock.calls.map((call) => [
        call[0].dictionaryDescription,
        call[0].targetLocales,
      ])
    );
    expect(localesByDescription.get('pages description')).toEqual(['fr']);
    expect(localesByDescription.get('buttons description')).toEqual(['es']);
  });

  it('3 dicts each missing different locales — each gets the right locale set', async () => {
    registerDictionaries(
      makeFakeDict('dA', 'header'),
      makeFakeDict('dB', 'footer'),
      makeFakeDict('dC', 'sidebar')
    );

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

    const final = lastProgress(job);
    expect(final.completedKeys).toContain('header');
    expect(final.completedKeys).toContain('footer');
    expect(final.completedKeys).toContain('sidebar');
    expect(final.failedKeys).toHaveLength(0);

    // Worker sends one locale per call — dict C (fr+es) = 2 separate calls
    const localesByDescription = mockTranslateDictionaryDB.mock.calls.reduce(
      (accumulator: Map<string, string[]>, call) => {
        const previous =
          accumulator.get(call[0].dictionaryDescription as string) ?? [];
        accumulator.set(call[0].dictionaryDescription as string, [
          ...previous,
          ...call[0].targetLocales,
        ]);
        return accumulator;
      },
      new Map<string, string[]>()
    );
    expect(localesByDescription.get('header description')).toEqual(['fr']);
    expect(localesByDescription.get('footer description')).toEqual(['es']);
    expect(localesByDescription.get('sidebar description')?.sort()).toEqual([
      'es',
      'fr',
    ]);
  });

  // ── failure handling ─────────────────────────────────────────────────────

  it('marks a failed dictionary and continues with remaining ones', async () => {
    registerDictionaries(
      makeFakeDict('dA', 'broken'),
      makeFakeDict('dB', 'working')
    );

    mockTranslateDictionaryDB.mockImplementation(
      async ({
        dictionaryDescription,
        targetLocales,
      }: {
        dictionaryDescription: string;
        targetLocales: string[];
      }) => {
        if (dictionaryDescription === 'broken description') {
          throw new Error('AI service unavailable');
        }
        return { [targetLocales[0]]: { label: 'Salut' } };
      }
    );

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr'] },
        { dictionaryId: 'dB', locales: ['fr'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    const final = lastProgress(job);
    expect(final.failedKeys).toContain('broken');
    expect(final.completedKeys).toContain('working');
    expect(final.percentage).toBe(100);
  });

  it('marks all dictionaries as failed when every AI call throws', async () => {
    registerDictionaries(
      makeFakeDict('dA', 'alpha'),
      makeFakeDict('dB', 'beta')
    );

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

    const final = lastProgress(job);
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

    const final = lastProgress(job);
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

  it('fails the job on AbortError (cancel mid-chunk) without marking the dict as failed', async () => {
    registerDictionaries(makeFakeDict('dA', 'dict-a'));
    mockTranslateDictionaryDB.mockRejectedValueOnce(new AbortError());

    const job = makeJob('job-1', {
      dictionaryTargets: [{ dictionaryId: 'dA', locales: ['fr'] }],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    // Cancellation mid-chunk fails the job so the UI reflects the stop
    await expect(processTranslationJob(job)).rejects.toThrow(
      'Cancelled by user'
    );

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

  it('emits currentKey = dictionary key while translation runs', async () => {
    registerDictionaries(
      makeFakeDict('dA', 'header'),
      makeFakeDict('dB', 'footer')
    );

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

  it('emits fill-style tasks with per-dictionary states and locales', async () => {
    registerDictionaries(
      makeFakeDict('dA', 'header'),
      makeFakeDict('dB', 'footer')
    );

    const job = makeJob('job-1', {
      dictionaryTargets: [
        { dictionaryId: 'dA', locales: ['fr', 'es'] },
        { dictionaryId: 'dB', locales: ['fr'] },
      ],
      projectId: 'proj-1',
      userId: 'user-1',
    });

    await processTranslationJob(job);

    // Every progress event carries the full task list
    const firstProgress = job.updateProgress.mock.calls[0][0];
    expect(firstProgress.tasks).toHaveLength(2);
    expect(firstProgress.tasks.every((t: any) => t.state === 'pending')).toBe(
      true
    );

    const final = lastProgress(job);
    const headerTask = final.tasks.find(
      (t: any) => t.dictionaryKey === 'header'
    );
    const footerTask = final.tasks.find(
      (t: any) => t.dictionaryKey === 'footer'
    );
    expect(headerTask.state).toBe('completed');
    expect(headerTask.targetLocales).toEqual(['fr', 'es']);
    expect(headerTask.completedLocales.sort()).toEqual(['es', 'fr']);
    expect(footerTask.state).toBe('completed');
    expect(footerTask.completedLocales).toEqual(['fr']);
  });

  it('starts at 0% and ends at 100% for a single dictionary', async () => {
    registerDictionaries(makeFakeDict('d1', 'app'));

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

  it('increments percentage per (dictionary × locale) unit for 4 dictionaries', async () => {
    const dicts = ['a', 'b', 'c', 'd'].map((k) => makeFakeDict(k, k));
    registerDictionaries(...dicts);

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
    registerDictionaries(makeFakeDict('d1', 'legacy'));

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
    registerDictionaries(
      makeFakeDict('dA', 'alpha'),
      makeFakeDict('dB', 'beta')
    );

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
