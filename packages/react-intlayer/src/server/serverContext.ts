import React, { type ReactNode } from 'react';

type CacheType<T> = () => { value: T | undefined };

const cacheFallback = () => () => ({ value: undefined });

/**
 * Creates a new datastore for a given server context.
 * Attempts to closely mimic the `createContext` API.
 *
 * @example
 *
 * ```tsx
 * const IntlayerServer = createServerContext<string | null>(null);
 *
 * <IntlayerServer.Provider value={locale}>
 *      {children}
 * </IntlayerServer.Provider>
 * ```
 */
export const createServerContext = <T>(defaultValue?: T): ServerContext<T> => {
  throwInClient();

  const cache = React.cache<CacheType<T>> ?? cacheFallback;

  const getCache = cache(() => ({
    value: undefined,
  }));

  return {
    Provider: ({ children, value }) => {
      getCache().value = value;
      return children;
    },
    Consumer: ({ children }) => {
      const store = getCache();
      return children(store ? store.value : defaultValue);
    },
    _storage: getCache,
    _defaultValue: defaultValue,
  };
};

/**
 * Fetches a value present in a given server context.
 * Attempts to closely mimic the `useContext` API.
 *
 * @example
 * getServerContext(IntlayerServer);
 */
export const getServerContext = <T>({
  _storage,
  _defaultValue,
}: ServerContext<T>) => {
  // throwInClient();
  const store = _storage();
  console.log('store', store);
  if (!store) return _defaultValue;
  return store.value;
};

type ServerContext<T> = {
  Provider: ({
    children,
    value,
  }: {
    children: ReactNode;
    value: T;
  }) => ReactNode;
  Consumer: ({
    children,
  }: {
    children: (context: T | undefined) => ReactNode;
  }) => ReactNode;
  _storage: () => { value: T | undefined };
  _defaultValue: T | undefined;
};

/**
 * Throws if called within a client component environment.
 * Useful to help prevent mistakes.
 */
const throwInClient = (): void | never => {
  // If window.document is defined we're in a client component
  if (typeof window !== 'undefined') {
    throw new Error(`createServerContext only works in Server Components`);
  }
};
