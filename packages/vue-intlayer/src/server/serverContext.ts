/**
 * Creates a new datastore for a given server context.
 * Attempts to provide functionality similar to React's context API for Vue SSR.
 *
 * @example
 * const IntlayerServer = createServerContext<string | null>(null);
 *
 * // In a server component
 * IntlayerServer.provide(locale);
 *
 * // Retrieve the value
 * const localeValue = getServerContext(IntlayerServer);
 */

// Server-side global store to hold context values
// We're using a simple Map instead of React's cache
const contextStorage = new Map<symbol, any>();

export const createServerContext = <T>(defaultValue?: T): ServerContext<T> => {
  throwInClient();

  // Create a unique symbol as the key for this context
  const contextId = Symbol('serverContext');

  // Initialize with the default value
  contextStorage.set(contextId, { value: undefined });

  // Getter function to retrieve the storage
  const getStorage = () => {
    const storage = contextStorage.get(contextId);
    return storage || { value: undefined };
  };

  // Create the server context object
  const ServerContext: ServerContext<T> = {
    // Method to provide a value to the context
    provide: (value: T) => {
      const storage = getStorage();
      storage.value = value;
      // Update the storage in case it was created on-demand
      contextStorage.set(contextId, storage);
    },

    // Method to consume the context value with a callback
    consume: (callback: (value: T | undefined) => any) => {
      const storage = getStorage();
      return callback(storage ? storage.value : defaultValue);
    },

    // Internal storage access
    _storage: getStorage,
    _defaultValue: defaultValue,
  };

  return ServerContext;
};

/**
 * Fetches a value present in a given server context.
 * Similar to Vue's inject, but for server components.
 *
 * @example
 * getServerContext(IntlayerServer);
 */
export const getServerContext = <T>({
  _storage,
  _defaultValue,
}: ServerContext<T>): T | undefined => {
  // throwInClient(); - Commented to allow access from client/server
  const store = _storage();
  if (!store) return _defaultValue;
  return store.value;
};

/**
 * Type definition for the ServerContext
 */
type ServerContext<T> = {
  provide: (value: T) => void;
  consume: (callback: (value: T | undefined) => any) => any;
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
