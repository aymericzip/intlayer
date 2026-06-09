import { Table } from '@intlayer/design-system/table';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

type DiscussionsAdminSkeletonProps = {
  showToolBar?: boolean;
};

export const DiscussionsAdminSkeleton: FC<DiscussionsAdminSkeletonProps> = ({
  showToolBar = false,
}) => (
  <div className="flex flex-1 flex-col items-center p-4">
    <div className="flex size-full flex-1 flex-col gap-4">
      {showToolBar && (
        /* Search Skeleton */
        <div className="mb-4 space-y-4">
          <Skeleton className="h-10 w-full max-w-md rounded-xl" />
        </div>
      )}

      {/* Table Skeleton */}
      <div className="flex flex-1 items-start justify-start space-y-4">
        <Table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {/* id */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-8" />
              </th>
              {/* numberOfMessages */}
              <th className="px-4 py-3 text-center">
                <Skeleton className="mx-auto h-4 w-20" />
              </th>
              {/* userName */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-20" />
              </th>
              {/* createdAt */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
              {/* updatedAt */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons are static and don't change order
              <tr key={i} className="border-card border-b">
                {/* id */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                {/* numberOfMessages */}
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-8" />
                  </div>
                </td>
                {/* userName (avatar + text) */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </td>
                {/* createdAt */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                {/* updatedAt */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {showToolBar && (
        /* Pagination Skeleton */
        <div className="flex w-full flex-row items-end justify-between gap-4 pt-8">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
          <Skeleton className="h-10 w-48 rounded-xl" />
        </div>
      )}
    </div>
  </div>
);
