import {
  type DefaultOptions,
  MutationCache,
  QueryClient,
  QueryClientProvider,
  type QueryKey,
  timeoutManager,
  type UseMutationOptions,
} from '@tanstack/react-query';
import {
  type FC,
  type PropsWithChildren,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useToast } from '../components/Toaster';

const isServer = typeof window === 'undefined';

/**
 * localStorage key of the query cache the provider used to persist. It held
 * session and user data, so it is removed from browsers that still have it.
 */
const LEGACY_PERSISTED_CACHE_KEY = 'intlayer-rq-cache';

// During SSR/prerender, react-query schedules `setTimeout`/`setInterval`
// timers for query garbage collection (`gcTime`) and background refetching
// (`refetchInterval`). A query built in the cache during render — even an
// `enabled: false` one — schedules its gcTime timer immediately. In Node,
// those pending timers keep the event loop alive, so the prerender server
// never closes and the build hangs after every page has been rendered.
//
// `gcTime: Infinity` on the server avoids the *default* timer, but per-query
// overrides (e.g. `useSession` sets its own `gcTime`) would reintroduce it. To
// make this robust regardless of per-query options, override react-query's
// timeout provider on the server so every timer is `unref`-ed — Node can then
// exit while they are still pending.
if (isServer) {
  const unref = (timer: unknown): void => {
    if (
      typeof timer === 'object' &&
      timer !== null &&
      'unref' in timer &&
      typeof (timer as { unref: unknown }).unref === 'function'
    ) {
      (timer as { unref: () => void }).unref();
    }
  };

  timeoutManager.setTimeoutProvider({
    setTimeout: (callback, delay) => {
      const timer = setTimeout(callback, delay);
      unref(timer);
      return timer;
    },
    clearTimeout: (timer) => clearTimeout(timer),
    setInterval: (callback, delay) => {
      const timer = setInterval(callback, delay);
      unref(timer);
      return timer;
    },
    clearInterval: (timer) => clearInterval(timer),
  });
}

const defaultQueryOptions: DefaultOptions = {
  queries: {
    retry: 1,
    // Keep data fresh for 30 seconds to avoid unnecessary refetches during navigation
    staleTime: 30 * 1000,
    // Server: no gc timer at all (see above). Client: react-query's default.
    ...(isServer && { gcTime: Infinity }),
    // Only refetch on mount if data is stale (not every single mount)
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  mutations: {
    retry: 0,
  },
};

const SHOW_ERROR_CODE = false;

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      onSuccess?: UseMutationOptions['onSuccess'];
      onError?: UseMutationOptions['onError'];
      invalidateQueries?: QueryKey[];
      resetQueries?: QueryKey[];
    };
  }
}

const formatErrorCode = (errorCode: string) => errorCode.split('_').join(' ');

/**
 * Flattens the per-field validation messages of an `*_INVALID_FIELDS` API
 * error (`{ errors: { name: ['Name must be…'] } }`) into a single line.
 * Returns `undefined` when the error carries no field messages.
 */
const formatFieldErrors = (fieldErrors: unknown): string | undefined => {
  if (!fieldErrors || typeof fieldErrors !== 'object') return undefined;

  const messages = Object.values(fieldErrors as Record<string, unknown>)
    .flat()
    .filter((message): message is string => typeof message === 'string');

  return messages.length > 0 ? messages.join(' ') : undefined;
};

/**
 * Hook to handle error logging and toast notifications
 */
const useToastEvents = () => {
  const { toast } = useToast();

  const onError: MutationCache['config']['onError'] = (error: any) => {
    const parsed = (() => {
      try {
        if (typeof error === 'string') return JSON.parse(error);
        if (error instanceof Error) return JSON.parse(error.message);
      } catch {
        // Not JSON: keep the raw error
      }
      return error;
    })();

    [parsed].flat().forEach((err: any) => {
      // Check for nested error object (standard in your API responses: { statusCode, error: { ... } })
      const apiError = err?.error ?? err;

      if (apiError?.code === 'RATE_LIMIT_EXCEEDED_UNAUTHENTICATED') {
        toast({
          title: apiError.message,
          variant: 'error',
        });
        return;
      }

      toast({
        title: formatErrorCode(
          SHOW_ERROR_CODE
            ? (apiError?.code ?? err?.code)
            : (apiError?.title ?? err?.title ?? 'Error')
        ),
        description:
          formatFieldErrors(apiError?.errors) ??
          apiError?.message ??
          err?.message ??
          String(apiError ?? 'An error occurred'),
        variant: 'error',
      });
    });
  };

  const onSuccess: MutationCache['config']['onSuccess'] = (data: any) => {
    if (data?.error) {
      toast({
        title: formatErrorCode(data.error.title ?? data.error.code ?? 'Error'),
        description:
          formatFieldErrors(data.error.errors) ??
          data.error.message ??
          data.error.code ??
          'An error occurred',
        variant: 'error',
      });
    }

    if (data?.message) {
      toast({
        title: data.message,
        description: data.description,
        variant: 'success',
      });
    }
  };

  return {
    onError,
    onSuccess,
  };
};

/** Creates a query client with the shared defaults (e.g. for router context). */
export const getQueryClient = (): QueryClient =>
  new QueryClient({ defaultOptions: defaultQueryOptions });

type ToastHandlers = ReturnType<typeof useToastEvents>;

/** Clients whose mutation cache already carries the provider handlers. */
const wiredQueryClients = new WeakSet<QueryClient>();

/**
 * Chains the toast handlers and the meta-driven invalidation onto the client's
 * mutation cache, once per client. Chained rather than replaced: the router
 * SSR-query integration wraps `onError` to turn a `redirect()` thrown inside a
 * mutation into a navigation.
 */
const wireMutationCache = (
  queryClient: QueryClient,
  handlersRef: RefObject<ToastHandlers>
): QueryClient => {
  if (wiredQueryClients.has(queryClient)) return queryClient;
  wiredQueryClients.add(queryClient);

  const cache = queryClient.getMutationCache();
  const previousOnSuccess = cache.config.onSuccess;
  const previousOnError = cache.config.onError;

  cache.config.onSuccess = (...callbackArguments) => {
    previousOnSuccess?.(...callbackArguments);
    handlersRef.current.onSuccess?.(...callbackArguments);
  };

  cache.config.onError = (...callbackArguments) => {
    previousOnError?.(...callbackArguments);
    handlersRef.current.onError?.(...callbackArguments);
  };

  cache.config.onSettled = (_data, _error, _variables, _result, mutation) => {
    mutation.meta?.invalidateQueries?.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
    mutation.meta?.resetQueries?.forEach((queryKey) => {
      queryClient.resetQueries({ queryKey });
    });
  };

  return queryClient;
};

type ReactQueryProviderProps = {
  /** Client shared with the router context; one is created when omitted. */
  client?: QueryClient;
};

export const ReactQueryProvider: FC<
  PropsWithChildren<ReactQueryProviderProps>
> = ({ children, client }) => {
  const toastHandlers = useToastEvents();
  // The cache config is wired once, so it reads the latest closures from a ref
  const handlersRef = useRef(toastHandlers);

  useEffect(() => {
    handlersRef.current = toastHandlers;
  });

  // oxlint-disable-next-line react/refs -- the ref is only read later, inside mutation callbacks
  const [queryClient] = useState(() =>
    wireMutationCache(client ?? getQueryClient(), handlersRef)
  );

  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_PERSISTED_CACHE_KEY);
    } catch {
      // Storage blocked (private mode, disabled site data): nothing to clean
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
