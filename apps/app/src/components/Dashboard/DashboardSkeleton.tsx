import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const DashboardSkeleton: FC = () => (
  <div className="dashboard-theme flex h-screen max-h-screen flex-col bg-card">
    {/* Navbar Skeleton */}
    <Container
      className="sticky top-0 z-50 flex w-full flex-col gap-3 p-4"
      roundedSize="none"
    >
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-2 md:gap-4">
          <Skeleton className="size-6 rounded-md" />
          <div className="flex w-auto items-center gap-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-6 w-32 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>
    </Container>

    <div className="flex min-h-0 w-full flex-1">
      {/* Sidebar Skeleton */}
      <div className="mt-16 hidden w-56 flex-col gap-3 p-4 md:flex">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Skeleton key={i} className="h-8 w-full rounded-lg" />
        ))}
      </div>
      {/* Content Skeleton */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl bg-background p-10">
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 w-1/3 rounded-lg" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-video w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
