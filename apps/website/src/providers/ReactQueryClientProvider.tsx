'use client';

import {
  type QueryClientConfig,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { FC, PropsWithChildren } from 'react';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Disable automatic refetching on window focus
      refetchOnWindowFocus: false,
      // Invalid all request every 5min
      staleTime: 5 * 60 * 60 * 1000,
      // Retry 15 times before failing
      retry: 15,
      // Retry each 10sec and set to double each time during a maximum of 60sec
      retryDelay: (attemptIndex) =>
        Math.min(10 * 1000 * 2 ** attemptIndex, 60 * 1000),
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

export const ReactQueryClientProvider: FC<PropsWithChildren> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
