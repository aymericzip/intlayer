import { beforeEach, describe, expect, it, vi } from 'vitest';

type ResourceSource<T> = T | (() => T);
type ResourceFetcher<TSource, TValue> = (
  source: TSource
) => TValue | Promise<TValue>;

let resourceValue: unknown;
let latestResourceSource: (() => unknown) | undefined;
let latestResourceFetcher: ((source: unknown) => unknown) | undefined;

vi.mock('solid-js', () => ({
  createResource: <TValue, TSource>(
    source: ResourceSource<TSource>,
    fetcher: ResourceFetcher<TSource, TValue>
  ) => {
    latestResourceSource = typeof source === 'function' ? source : () => source;
    latestResourceFetcher = fetcher as (source: unknown) => unknown;

    return [() => resourceValue as TValue | undefined] as const;
  },
  // `useLoadDynamic` reads the resource in a render effect to trigger Suspense;
  // the effect runner is a no-op here.
  createRenderEffect: () => undefined,
}));

const importUseLoadDynamic = async () => {
  vi.resetModules();
  return await import('./useLoadDynamic');
};

describe('useLoadDynamic', () => {
  beforeEach(() => {
    resourceValue = undefined;
    latestResourceSource = undefined;
    latestResourceFetcher = undefined;
  });

  it('keeps synchronous nested access safe while the resource is pending', async () => {
    const { useLoadDynamic } = await importUseLoadDynamic();
    const content = useLoadDynamic<{
      section: { title: { value: string } };
      count: number;
      format: (value: string) => { value: string };
    }>('dictionary.en', () =>
      Promise.resolve({
        section: { title: { value: 'Loaded' } },
        count: 42,
        format: (value: string) => ({ value }),
      })
    );

    expect(content.section.title.value).toBe('');
    expect(content.format('message').value).toBe('');
    expect(Number(content.count)).toBe(0);
    expect(+content.count).toBe(0);
    expect((content.section.title as unknown as () => string)()).toBe('');
    expect(String(content.section.title)).toBe('');
    expect(latestResourceSource?.()).toBe('dictionary.en');
  });

  it('forwards property reads and calls once the resource is loaded', async () => {
    const { useLoadDynamic } = await importUseLoadDynamic();

    resourceValue = {
      section: { title: { value: 'Loaded' } },
      count: 42,
      format: (value: string) => `Formatted ${value}`,
    };

    const content = useLoadDynamic<{
      section: { title: { value: string } };
      count: number;
      format: (value: string) => string;
    }>('dictionary.en', () =>
      Promise.resolve({
        section: { title: { value: 'Ignored' } },
        count: 0,
        format: (value: string) => value,
      })
    );

    expect(content.section.title.value).toBe('Loaded');
    expect(Number(content.count)).toBe(42);
    expect(+content.count).toBe(42);
    expect(content.format('message')).toBe('Formatted message');
  });

  it('caches a pending loader promise by key', async () => {
    const { useLoadDynamic } = await importUseLoadDynamic();
    let loadCount = 0;
    const loadedValue = { key: 'dictionary' };

    useLoadDynamic('dictionary.en', () => {
      loadCount += 1;
      return Promise.resolve(loadedValue);
    });

    const firstLoad = latestResourceFetcher?.('dictionary.en');
    const secondLoad = latestResourceFetcher?.('dictionary.en');

    expect(loadCount).toBe(1);
    expect(secondLoad).toBe(firstLoad);
    await expect(firstLoad).resolves.toBe(loadedValue);
    expect(latestResourceFetcher?.('dictionary.en')).toBe(loadedValue);
  });

  it('passes dynamic key changes through the resource fetcher', async () => {
    const { useLoadDynamic } = await importUseLoadDynamic();
    let currentKey = 'dictionary.en';
    const loadKeys: string[] = [];

    useLoadDynamic(
      () => currentKey,
      (key) => {
        loadKeys.push(key);
        return Promise.resolve({ key });
      }
    );

    expect(latestResourceSource?.()).toBe('dictionary.en');
    await expect(
      latestResourceFetcher?.(latestResourceSource?.() ?? '')
    ).resolves.toEqual({ key: 'dictionary.en' });

    currentKey = 'dictionary.fr';

    expect(latestResourceSource?.()).toBe('dictionary.fr');
    await expect(
      latestResourceFetcher?.(latestResourceSource?.() ?? '')
    ).resolves.toEqual({ key: 'dictionary.fr' });
    expect(loadKeys).toEqual(['dictionary.en', 'dictionary.fr']);
  });

  it('passes structured sources to loaders and caches by cacheKey', async () => {
    const { useLoadDynamic } = await importUseLoadDynamic();
    const source = { cacheKey: 'dictionary.en', locale: 'en' };
    const loadedValue = { key: 'dictionary' };
    const loadSources: (typeof source)[] = [];

    useLoadDynamic<typeof loadedValue, typeof source>(
      source,
      (resolvedSource) => {
        loadSources.push(resolvedSource);
        return Promise.resolve(loadedValue);
      }
    );

    const firstLoad = latestResourceFetcher?.(source);
    const secondLoad = latestResourceFetcher?.({
      cacheKey: 'dictionary.en',
      locale: 'en',
    });

    expect(loadSources).toEqual([source]);
    expect(secondLoad).toBe(firstLoad);
    await expect(firstLoad).resolves.toBe(loadedValue);
  });

  it('does not permanently cache rejected loader promises', async () => {
    const { useLoadDynamic } = await importUseLoadDynamic();
    let loadCount = 0;

    useLoadDynamic('dictionary.en', () => {
      loadCount += 1;
      return Promise.reject(new Error(`load failed ${loadCount}`));
    });

    await expect(latestResourceFetcher?.('dictionary.en')).rejects.toThrow(
      'load failed 1'
    );
    await expect(latestResourceFetcher?.('dictionary.en')).rejects.toThrow(
      'load failed 2'
    );
    expect(loadCount).toBe(2);
  });
});
