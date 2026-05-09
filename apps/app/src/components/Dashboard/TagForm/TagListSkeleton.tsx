import { Table } from '@intlayer/design-system/table';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

export const TagListSkeleton: FC = () => (
  <div className="flex w-full flex-1 flex-col gap-6 py-6 text-sm text-text/80">
    <div className="flex w-full items-center justify-between gap-4 px-10 pb-2">
      <Skeleton className="h-10 w-full max-w-md rounded-xl" />
      <Skeleton className="h-10 w-32 rounded-xl" />
    </div>
    <div className="flex w-full flex-1 flex-col overflow-x-auto overflow-y-hidden">
      <Table className="w-full border-separate border-spacing-0 px-10">
        <thead>
          <tr className="border-neutral-200 border-b dark:border-neutral-700">
            <th className="px-4 py-3">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="px-4 py-3">
              <Skeleton className="h-4 w-20" />
            </th>
            <th className="px-4 py-3">
              <Skeleton className="h-4 w-32" />
            </th>
            <th className="px-4 py-3">
              <Skeleton className="h-4 w-24" />
            </th>
            <th className="px-4 py-3 text-center">
              <Skeleton className="mx-auto h-4 w-16" />
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="border-card border-b">
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-24 font-mono" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-28" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-full min-w-40" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-center">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    <div className="flex w-full flex-row items-end justify-between px-10 pt-4">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-24 rounded-xl" />
      </div>
      <Skeleton className="h-10 w-48 rounded-xl" />
    </div>
  </div>
);
