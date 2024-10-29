/**
 * Creates a new datastore for a given server context.
 * Attempts to closely mimic the `createContext` API.
 *
 * @example
 * const IntlayerServer = createServerContext<string | null>(null);
 *
 * <IntlayerServer.Provider value={locale}>
 *      {children}
 * </IntlayerServer.Provider>
 */
import react from 'react';

type CacheType<T> = () => { value: T | undefined };

const cacheFallback = () => () => ({ value: undefined });

export const createServerContext = <T>(defaultValue?: T): ServerContext<T> => {
  throwInClient();

  /** @ts-ignore remove error Property 'cache' does not exist on type 'typeof React'. */
  const cache = react.cache<CacheType<T>> ?? cacheFallback;

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
  if (!store) return _defaultValue;
  return store.value;
};

type ServerContext<T> = {
  Provider: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: T;
  }) => React.ReactNode;
  Consumer: ({
    children,
  }: {
    children: (context: T | undefined) => React.ReactNode;
  }) => React.ReactNode;
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
