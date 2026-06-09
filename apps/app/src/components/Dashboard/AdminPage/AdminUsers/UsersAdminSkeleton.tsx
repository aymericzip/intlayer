import { Table } from '@intlayer/design-system/table';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

type UsersAdminSkeletonProps = {
  showToolBar?: boolean;
};

export const UsersAdminSkeleton: FC<UsersAdminSkeletonProps> = ({
  showToolBar = false,
}) => (
  <div className="flex flex-1 flex-col items-center p-4">
    <div className="flex size-full flex-1 flex-col gap-4">
      {showToolBar && (
        <>
          {/* Search & Filter Skeleton */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Skeleton className="h-10 w-full max-w-md rounded-xl" />
              <Skeleton className="h-10 w-50 rounded-xl" />
            </div>
          </div>
        </>
      )}

      {/* Table Skeleton */}
      <div className="flex flex-1 items-start justify-start space-y-4">
        <Table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {/* selection */}
              <th className="px-4 py-3">
                <Skeleton className="h-4 w-4" />
              </th>
              {/* name */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-16" />
              </th>
              {/* id */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-8" />
              </th>
              {/* email */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-16" />
              </th>
              {/* status */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-16" />
              </th>
              {/* createdAt */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
              {/* updatedAt */}
              <th className="px-4 py-3 text-left">
                <Skeleton className="h-4 w-24" />
              </th>
              {/* active */}
              <th className="px-4 py-3 text-center">
                <Skeleton className="mx-auto h-4 w-16" />
              </th>
              {/* actions */}
              <th className="px-4 py-3 text-center">
                <Skeleton className="mx-auto h-4 w-16" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons are static and don't change order
              <tr key={i} className="border-card border-b">
                {/* selection */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-4" />
                </td>
                {/* name (avatar + text) */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </td>
                {/* id */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                {/* email */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-40" />
                </td>
                {/* status */}
                <td className="px-4 py-4">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </td>
                {/* createdAt */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                {/* updatedAt */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                {/* active */}
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <Skeleton className="h-5 w-10 rounded-full" />
                  </div>
                </td>
                {/* actions */}
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <Skeleton className="h-4 w-12" />
                  </div>
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
