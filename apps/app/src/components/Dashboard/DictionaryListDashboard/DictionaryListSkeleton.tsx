import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const DictionaryListSkeleton: FC = () => (
  <div className="flex w-full flex-1 flex-col gap-6 py-6 text-sm text-text/80">
    {/* Toolbar Skeleton */}
    <div className="flex w-full items-center justify-between gap-4 border-neutral border-b px-10 pb-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-9 w-64 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-32 rounded-lg" />
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
    </div>

    {/* Table Skeleton */}
    <div className="flex w-full flex-1 flex-col px-10">
      <div className="grid w-full grid-cols-[3rem,1fr,1.2fr,1.5fr,1fr,1fr] items-center gap-4 border-neutral border-b py-3 font-medium text-neutral">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-28" />
      </div>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="grid w-full grid-cols-[3rem,1fr,1.2fr,1.5fr,1fr,1fr] items-center gap-4 border-neutral border-b py-4"
        >
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      ))}
    </div>

    {/* Pagination Skeleton */}
    <div className="flex w-full flex-row items-end justify-between px-10 pt-4">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>
      <Skeleton className="h-9 w-48 rounded-lg" />
    </div>
  </div>
);
