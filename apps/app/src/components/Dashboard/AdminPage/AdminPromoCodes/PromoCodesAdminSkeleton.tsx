import { Table } from '@intlayer/design-system/table';
import type { FC } from 'react';
import { Skeleton } from '#components/Skeleton';

type PromoCodesAdminSkeletonProps = {
  showToolBar?: boolean;
};

export const PromoCodesAdminSkeleton: FC<PromoCodesAdminSkeletonProps> = ({
  showToolBar = false,
}) => (
  <div className="flex flex-1 flex-col items-center p-4">
    <div className="flex size-full flex-1 flex-col gap-4 overflow-scroll">
      {showToolBar && (
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 w-full max-w-md rounded-xl" />
          </div>
        </div>
      )}

      <div className="flex flex-1 items-start justify-start space-y-4">
        <Table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {[
                'ID',
                'Code',
                'Discount',
                'Affiliate',
                'Status',
                'Created',
                'Actions',
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Skeletons are static and don't change order
              <tr key={i} className="border-card border-b">
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-20 font-mono" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-4">
                  <Skeleton className="h-4 w-10" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {showToolBar && (
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
export default PromoCodesAdminSkeleton;
