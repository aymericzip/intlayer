import { Table } from '@intlayer/design-system/table';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

type OrganizationsAdminSkeletonProps = {
  showToolBar?: boolean;
};

export const OrganizationsAdminSkeleton: FC<
  OrganizationsAdminSkeletonProps
> = ({ showToolBar = true }) => (
  <div className="flex flex-1 flex-col items-center p-4">
    <div className="flex w-full max-w-5xl flex-col gap-4">
      {/* Title Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
      </div>

      {showToolBar && (
        /* Search Skeleton */
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-md rounded-xl" />
        </div>
      )}

      {/* Table Skeleton */}
      <div className="space-y-4">
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
                {/* selection */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-4" />
                </td>
                {/* name */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                {/* id */}
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
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
