'use client';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import {
  type DefaultOptions,
  MutationCache,
  QueryClient,
  QueryClientProvider,
  type QueryKey,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { type FC, type PropsWithChildren, useRef } from 'react';
import { useToast } from '../components/Toaster';

const PERSIST_MAX_AGE = 1000 * 60 * 60 * 24; // 24h
// Bump to invalidate every persisted cache after a breaking change in query shapes
const PERSIST_BUSTER = 'v1';

const defaultQueryOptions: DefaultOptions = {
  queries: {
    retry: 1,
    // Keep data fresh for 30 seconds to avoid unnecessary refetches during navigation
    staleTime: 30 * 1000,
    // gcTime must be >= persist maxAge, otherwise restored entries are dropped on rehydrate
    gcTime: PERSIST_MAX_AGE,
    // Only refetch on mount if data is stale (not every single mount)
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
  mutations: {
    retry: 0,
  },
};

const browserLocalStorage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(window.localStorage.removeItem(key)),
};

const noopStorage = {
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
};

const persister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? browserLocalStorage : noopStorage,
  key: 'intlayer-rq-cache',
});

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
 * Hook to handle error logging and toast notifications
 */
const useToastEvents = () => {
  const { toast } = useToast();

  const onError: MutationCache['config']['onError'] = (error: any) => {
    const parsed = (() => {
      try {
        if (typeof error === 'string') return JSON.parse(error);
        if (error instanceof Error) return JSON.parse(error.message);
      } catch (_) {}
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
          data.error.message ?? data.error.code ?? 'An error occurred',
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

export const getQueryClient = () =>
  new QueryClient({ defaultOptions: defaultQueryOptions });

interface ReactQueryProviderProps {
  client?: QueryClient;
}

export const ReactQueryProvider: FC<
  PropsWithChildren<ReactQueryProviderProps>
> = ({ children, client }) => {
  const { onError, onSuccess } = useToastEvents();
  const clientRef = useRef<QueryClient>(client ?? null);

  if (!clientRef.current) {
    const mutationCache = new MutationCache({
      onSuccess,
      onError,
      onSettled: (_data, _error, _variables, _context, mutation) => {
        if (mutation.meta?.invalidateQueries) {
          mutation.meta.invalidateQueries.forEach((queryKey) => {
            clientRef.current?.invalidateQueries({
              queryKey,
            });
          });
        }

        if (mutation.meta?.resetQueries) {
          mutation.meta.resetQueries.forEach((queryKey) => {
            clientRef.current?.resetQueries({
              queryKey,
            });
          });
        }
      },
    });

    const queryClient = new QueryClient({
      defaultOptions: defaultQueryOptions,
      mutationCache,
    });
    clientRef.current = queryClient;
  }

  if (client) {
    return (
      <QueryClientProvider client={clientRef.current}>
        {children}
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={clientRef.current}
      persistOptions={{
        persister,
        maxAge: PERSIST_MAX_AGE,
        buster: PERSIST_BUSTER,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => query.state.status === 'success',
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
