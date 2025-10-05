'use client';

import {
  type DefaultOptions,
  MutationCache,
  QueryClient,
  QueryClientProvider,
  type QueryKey,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { FC, PropsWithChildren } from 'react';
import { useToast } from '../components/Toaster';

const defaultQueryOptions: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 1000 * 60 * 10, // 10 minutes
  },
  mutations: {
    retry: 0,
  },
};

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      onSuccess?: UseMutationOptions['onSuccess'];
      onError?: UseMutationOptions['onError'];
      invalidateQueries?: QueryKey[];
    };
  }
}

const formatErrorCode = (errorCode: string) => errorCode.split('_').join(' ');

/**
 *  Hook to handle error logging and toast notifications
 */
const useToastEvents = () => {
  const { toast } = useToast();

  const onError: MutationCache['config']['onError'] = (error: any) => {
    const parsed = (() => {
      try {
        if (typeof error === 'string') return JSON.parse(error);
      } catch (_) {}
      return error;
    })();

    [parsed].flat().forEach((err: any) =>
      toast({
        title: formatErrorCode(
          (process.env.NODE_ENV === 'production' ? err?.title : err?.code) ??
            'Error'
        ),
        description: err?.message ?? String(err ?? 'An error occurred'),
        variant: 'error',
      })
    );
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

export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const { onError, onSuccess } = useToastEvents();

  const mutationCache = new MutationCache({
    onSuccess,
    onError,
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        mutation.meta.invalidateQueries.forEach((queryKey) => {
          queryClient.invalidateQueries({
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

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
