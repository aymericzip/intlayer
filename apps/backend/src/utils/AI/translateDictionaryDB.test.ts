import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AbortError, translateDictionaryDB } from './translateDictionaryDB';

vi.mock('./translateJSON', () => ({
  translateJSON: vi.fn(),
}));
vi.mock('@logger', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import { translateJSON } from './translateJSON';

const mockTranslateJSON = translateJSON as ReturnType<typeof vi.fn>;

const AI_CONFIG = {} as any;

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Build a content object guaranteed to exceed CHUNK_SIZE (3000 chars) */
const bigContent = (keys = 80): Record<string, string> => {
  const obj: Record<string, string> = {};
  for (let i = 0; i < keys; i++) obj[`key_${i}`] = 'x'.repeat(50);
  return obj;
};

/** Echo the input back as translated output (identity mock) */
const identityTranslate = ({ entryFileContent }: any) =>
  Promise.resolve({ fileContent: entryFileContent });

// ─── tests ───────────────────────────────────────────────────────────────────

describe('translateDictionaryDB', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockTranslateJSON.mockImplementation(identityTranslate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── basic translation ───────────────────────────────────────────────────

  it('translates each target locale independently', async () => {
    const content = { title: 'Hello', description: 'World' };

    const promise = translateDictionaryDB({
      content,
      sourceLocale: 'en',
      targetLocales: ['fr', 'es', 'de'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toHaveProperty('fr');
    expect(result).toHaveProperty('es');
    expect(result).toHaveProperty('de');
    // One translateJSON call per locale (single chunk)
    expect(mockTranslateJSON).toHaveBeenCalledTimes(3);
  });

  it('each locale call receives the correct sourceLocale and targetLocale', async () => {
    const promise = translateDictionaryDB({
      content: { text: 'Hello' },
      sourceLocale: 'en',
      targetLocales: ['fr', 'ja'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    await promise;

    const calls = mockTranslateJSON.mock.calls;
    const outputLocales = calls.map((c) => c[0].outputLocale);
    expect(outputLocales).toContain('fr');
    expect(outputLocales).toContain('ja');
    calls.forEach((c) => {
      expect(c[0].entryLocale).toBe('en');
    });
  });

  it('passes dictionaryDescription to every translateJSON call', async () => {
    const promise = translateDictionaryDB({
      content: { a: 'b' },
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
      dictionaryDescription: 'Marketing copy',
    });
    await vi.runAllTimersAsync();
    await promise;

    expect(mockTranslateJSON).toHaveBeenCalledWith(
      expect.objectContaining({ dictionaryDescription: 'Marketing copy' })
    );
  });

  // ── multi-chunk ──────────────────────────────────────────────────────────

  it('splits large content into multiple chunks and merges results', async () => {
    const content = bigContent(80); // exceeds CHUNK_SIZE=3000

    const promise = translateDictionaryDB({
      content,
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    // Multiple chunks → multiple calls
    expect(mockTranslateJSON.mock.calls.length).toBeGreaterThan(1);
    // All keys should appear in the merged result
    expect(Object.keys(result['fr']!).length).toBe(Object.keys(content).length);
  });

  it('calls onChunkStart for each chunk with correct locale and index', async () => {
    const content = bigContent(80);
    const onChunkStart = vi.fn();

    const promise = translateDictionaryDB({
      content,
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
      onChunkStart,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    const calls = onChunkStart.mock.calls.map((c) => c[0]);
    expect(calls[0]).toMatchObject({ locale: 'fr', chunkIndex: 0 });
    expect(calls[0].totalChunks).toBeGreaterThan(1);
    // Indices are sequential
    calls.forEach((c, i) => {
      expect(c.chunkIndex).toBe(i);
    });
    // All keys present after merge
    expect(Object.keys(result['fr']!).length).toBe(Object.keys(content).length);
  });

  // ── shouldStop / AbortError ──────────────────────────────────────────────

  it('throws AbortError immediately when shouldStop returns true before first chunk', async () => {
    const promise = translateDictionaryDB({
      content: { a: 'b' },
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
      shouldStop: async () => true,
    });
    promise.catch(() => {});
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow(AbortError);
    expect(mockTranslateJSON).not.toHaveBeenCalled();
  });

  it('throws AbortError mid-translation when shouldStop flips true between chunks', async () => {
    const content = bigContent(80);
    let callCount = 0;
    const shouldStop = vi.fn(async () => {
      callCount++;
      return callCount > 1; // abort after the first shouldStop check
    });

    const promise = translateDictionaryDB({
      content,
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
      shouldStop,
    });
    promise.catch(() => {});
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow(AbortError);
    // Only the first chunk should have been attempted
    expect(mockTranslateJSON.mock.calls.length).toBeLessThan(
      Math.ceil(JSON.stringify(content).length / 3000)
    );
  });

  it('AbortError aborts remaining locales too, not just the current one', async () => {
    let firstLocaleStarted = false;
    const shouldStop = vi.fn(async () => {
      firstLocaleStarted = true;
      return true;
    });

    const promise = translateDictionaryDB({
      content: { a: 'b' },
      sourceLocale: 'en',
      targetLocales: ['fr', 'es', 'de'],
      aiConfig: AI_CONFIG,
      shouldStop,
    });
    promise.catch(() => {});
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow(AbortError);
    expect(firstLocaleStarted).toBe(true);
    // Because the abort throws out of the outer locale loop, only fr was attempted
    const outputLocales = mockTranslateJSON.mock.calls.map(
      (c) => c[0].outputLocale
    );
    expect(outputLocales).not.toContain('es');
    expect(outputLocales).not.toContain('de');
  });

  // ── retry behaviour ──────────────────────────────────────────────────────

  it('retries on transient AI failure and succeeds on retry', async () => {
    mockTranslateJSON
      .mockRejectedValueOnce(new Error('Rate limit'))
      .mockImplementationOnce(identityTranslate);

    const promise = translateDictionaryDB({
      content: { greeting: 'Hello' },
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result['fr']).toMatchObject({ greeting: 'Hello' });
    expect(mockTranslateJSON).toHaveBeenCalledTimes(2);
  });

  it('throws after exhausting MAX_RETRY attempts (3 retries)', async () => {
    mockTranslateJSON.mockRejectedValue(new Error('Persistent failure'));

    const promise = translateDictionaryDB({
      content: { a: 'b' },
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
    });
    // Claim the rejection early so it doesn't leak as unhandled while timers advance
    promise.catch(() => {});
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow('Persistent failure');
    // 1 initial + 3 retries = 4 calls total
    expect(mockTranslateJSON).toHaveBeenCalledTimes(4);
  });

  it('throws when AI returns no fileContent', async () => {
    mockTranslateJSON.mockResolvedValue({ fileContent: null });

    const promise = translateDictionaryDB({
      content: { a: 'b' },
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
    });
    promise.catch(() => {});
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow('No content returned from AI');
  });

  it('throws when AI returns a result with wrong structure', async () => {
    // Returns extra keys not present in source — format check fails
    mockTranslateJSON.mockResolvedValue({
      fileContent: { a: 'translated', unexpected_key: 'extra' },
    });

    const promise = translateDictionaryDB({
      content: { a: 'b' },
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
    });
    promise.catch(() => {});
    await vi.runAllTimersAsync();

    await expect(promise).rejects.toThrow(/Format verification failed/);
  });

  // ── different dictionaries with different missing locales ─────────────────
  // (simulated: caller only passes the content that is actually missing)

  it('processes dict-A missing only fr correctly', async () => {
    const promise = translateDictionaryDB({
      content: { label: 'Submit' }, // Only fr missing — caller already filtered
      sourceLocale: 'en',
      targetLocales: ['fr'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toHaveProperty('fr');
    expect(result).not.toHaveProperty('es');
    expect(mockTranslateJSON).toHaveBeenCalledTimes(1);
    expect(mockTranslateJSON.mock.calls[0][0].outputLocale).toBe('fr');
  });

  it('processes dict-B missing only es correctly', async () => {
    const promise = translateDictionaryDB({
      content: { label: 'Submit' },
      sourceLocale: 'en',
      targetLocales: ['es'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toHaveProperty('es');
    expect(result).not.toHaveProperty('fr');
    expect(mockTranslateJSON.mock.calls[0][0].outputLocale).toBe('es');
  });

  it('handles dict missing multiple locales in one call', async () => {
    const promise = translateDictionaryDB({
      content: { greeting: 'Hello', farewell: 'Goodbye' },
      sourceLocale: 'en',
      targetLocales: ['fr', 'es', 'de', 'ja'],
      aiConfig: AI_CONFIG,
    });
    await vi.runAllTimersAsync();
    const result = await promise;

    (['fr', 'es', 'de', 'ja'] as const).forEach((locale) => {
      expect(result).toHaveProperty(locale);
    });
    expect(mockTranslateJSON).toHaveBeenCalledTimes(4);
  });
});
