import { createRenderEffect, createResource } from 'solid-js';
import { PROXY_RESERVED_KEYS } from '../proxyKeys';

type DynamicSource = string | { cacheKey: string };
type DynamicKey<T extends DynamicSource> = T | (() => T);
// A bare promise cannot be retried after it rejects (already settled); use a
// function loader when retries matter.
export type DynamicLoader<T, Source extends DynamicSource> =
  | Promise<T>
  | ((source: Source) => Promise<T>);

type CacheEntry<T> =
  | {
      status: 'pending';
      promise: Promise<T>;
    }
  | {
      status: 'success';
      value: T;
    };

type CallableProxyTarget = (...argumentsList: unknown[]) => unknown;

const NO_PENDING_PRIMITIVE_FALLBACK = Symbol('NO_PENDING_PRIMITIVE_FALLBACK');

/**
 * Module-level cache to dedupe dynamic imports by key. Solid resources still own
 * suspense, SSR serialization, hydration, and refetching on source change.
 */
const cache = new Map<string, CacheEntry<unknown>>();

export const getDynamicSourceCacheKey = (source: DynamicSource): string =>
  typeof source === 'string' ? source : source.cacheKey;

const readValueAtPath = (
  value: unknown,
  path: readonly PropertyKey[]
): unknown =>
  path.reduce<unknown>((currentValue, property) => {
    if (currentValue === null || currentValue === undefined) return undefined;

    return Reflect.get(Object(currentValue), property);
  }, value);

const resolveDynamicLoader = <T, Source extends DynamicSource>(
  loader: DynamicLoader<T, Source>,
  source: Source
): Promise<T> => (typeof loader === 'function' ? loader(source) : loader);

export const loadDynamicValue = <T, Source extends DynamicSource>(
  source: Source,
  loader: DynamicLoader<T, Source>
): T | Promise<T> => {
  const key = getDynamicSourceCacheKey(source);
  // Cast is sound only while callers keep one value type per cache key.
  const cachedEntry = cache.get(key) as CacheEntry<T> | undefined;

  if (cachedEntry?.status === 'success') return cachedEntry.value;
  if (cachedEntry?.status === 'pending') return cachedEntry.promise;

  const promise = resolveDynamicLoader(loader, source).then(
    (value) => {
      cache.set(key, { status: 'success', value });
      return value;
    },
    (error: unknown) => {
      cache.delete(key);
      throw error;
    }
  );

  cache.set(key, { status: 'pending', promise });

  return promise;
};

const bindPropertyValue = (value: unknown, propertyValue: unknown): unknown =>
  typeof propertyValue === 'function'
    ? propertyValue.bind(value)
    : propertyValue;

const createPendingPrimitiveFallback = (property: string | symbol): unknown => {
  if (property === Symbol.toPrimitive) return () => '';
  // Keep array-shaped nodes (`array(t())`, collections) safe to read while the
  // chunk loads: an empty iterator and zero length make `<For>` and spreads
  // render nothing instead of building an array from a proxy length.
  if (property === Symbol.iterator)
    return () => ({ next: () => ({ done: true, value: undefined }) });
  if (property === 'length') return 0;
  if (property === PROXY_RESERVED_KEYS.toString) return () => '';
  if (property === PROXY_RESERVED_KEYS.valueOf) return () => undefined;
  if (property === PROXY_RESERVED_KEYS.value) return '';

  return NO_PENDING_PRIMITIVE_FALLBACK;
};

/**
 * Creates a stable callable proxy that re-reads the Solid resource on each
 * property access. This keeps synchronous Intlayer access (`content.x.value`)
 * safe while Solid Suspense owns the actual pending state.
 */
export const createLoadableProxy = <T>(read: () => T | undefined): T => {
  const createProxyAtPath = (path: readonly PropertyKey[]): unknown => {
    const target: CallableProxyTarget = () => undefined;

    return new Proxy(target, {
      get(_target, property) {
        if (property === PROXY_RESERVED_KEYS.promiseThen) return undefined;

        const currentValue = readValueAtPath(read(), path);

        if (currentValue !== null && currentValue !== undefined) {
          if (property === Symbol.toPrimitive) {
            return () => currentValue;
          }

          return bindPropertyValue(
            currentValue,
            Reflect.get(Object(currentValue), property)
          );
        }

        const primitiveFallback = createPendingPrimitiveFallback(property);

        if (primitiveFallback !== NO_PENDING_PRIMITIVE_FALLBACK) {
          return primitiveFallback;
        }

        return createProxyAtPath([...path, property]);
      },

      apply(_target, thisArgument, argumentsList) {
        const currentValue = readValueAtPath(read(), path);

        if (typeof currentValue !== 'function') {
          // A zero-arg call resolves the leaf: its real value once loaded, or
          // the empty string while pending (synchronous-safe). A call with
          // arguments keeps descending so nested pending access stays safe.
          if (argumentsList.length === 0) return currentValue ?? '';
          return createProxyAtPath(path);
        }

        return Reflect.apply(currentValue, thisArgument, argumentsList);
      },
    });
  };

  return createProxyAtPath([]) as T;
};

export const useLoadDynamic = <T, Source extends DynamicSource = string>(
  key: DynamicKey<Source>,
  loader: DynamicLoader<T, Source>
): T => {
  const keyAccessor = () => (typeof key === 'function' ? key() : key);
  const [resource] = createResource(keyAccessor, (resolvedSource) =>
    loadDynamicValue<T, Source>(resolvedSource, loader)
  );

  // Trigger Suspense safely without aborting component body execution
  createRenderEffect(() => {
    resource();
  });

  return createLoadableProxy(() => resource());
};
