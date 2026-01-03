'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import type { FC, PropsWithChildren } from 'react';

type DashboardHydrationBoundaryProps = PropsWithChildren<{
  dehydratedState: DehydratedState;
}>;

export const DashboardHydrationBoundary: FC<
  DashboardHydrationBoundaryProps
> = ({ dehydratedState, children }) => {
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};
