import { SmartTable } from '@intlayer/design-system/table';
import type { FC } from 'react';
import type { ChartItem } from './constants';
import { LibLogo } from './LibLogo';

type BenchmarkTableProps = {
  data: ChartItem[];
  unit: string;
  headers: { library: string; value: string; range: string; version: string };
};

/** Tabular view of the chart rows. */
export const BenchmarkTable: FC<BenchmarkTableProps> = ({
  data,
  unit,
  headers,
}) => (
  <div className="size-full overflow-auto text-sm">
    <SmartTable isInteractive displayModal>
      <thead>
        <tr>
          <th className="px-4 py-2 font-semibold">{headers.library}</th>
          <th className="px-4 py-2 text-right font-semibold">
            {headers.value} ({unit})
          </th>
          <th className="px-4 py-2 text-right font-semibold">
            {headers.range}
          </th>
          <th className="px-4 py-2 font-semibold">{headers.version}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.libId}>
            <td className="flex items-center gap-2 px-4 py-2">
              <LibLogo id={item.libId} className="h-4 w-auto max-w-15" />
              <span className="font-medium text-neutral-800 dark:text-neutral-200">
                {item.label}
              </span>
            </td>
            <td className="px-4 py-2 text-right text-neutral-800 dark:text-neutral-200">
              {item.value.toFixed(1)}
            </td>
            <td className="px-4 py-2 text-right text-neutral-800 dark:text-neutral-200">
              {item.min !== item.max
                ? `${item.min.toFixed(1)} - ${item.max.toFixed(1)}`
                : '-'}
            </td>
            <td className="px-4 py-2 text-muted-foreground text-xs">
              {item.version ? `v${item.version}` : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </SmartTable>
  </div>
);
