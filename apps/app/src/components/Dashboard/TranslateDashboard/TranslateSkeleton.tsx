import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const TranslateSkeleton: FC = () => (
  <div className="relative flex size-full flex-1 flex-col gap-2 overflow-hidden">
    {/* SaveAllButton replacement */}
    <div className="flex w-full items-center justify-between gap-4 px-10 pt-6">
      <Skeleton className="h-10 w-full max-w-md rounded-lg" />
      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>

    {/* Header Skeleton */}
    <div className="flex w-full items-center gap-6 border-card border-b px-10 py-2">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-6 w-48" />
    </div>

    {/* Column Headers Skeleton */}
    <div className="flex w-full shrink-0 items-center overflow-x-hidden bg-background px-10 py-2">
      <div className="flex w-full flex-1 gap-2">
        <Skeleton className="h-5 w-[calc(50%-0.5rem)]" />
        <Skeleton className="h-5 w-[calc(50%-0.5rem)]" />
      </div>
    </div>

    {/* Content Rows Skeleton */}
    <div className="flex flex-1 flex-col overflow-hidden px-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 border-card/50 border-b py-6"
        >
          <Skeleton className="h-4 w-64" />
          <div className="flex w-full gap-2">
            <Skeleton className="h-32 flex-1 rounded-lg" />
            <Skeleton className="h-32 flex-1 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
