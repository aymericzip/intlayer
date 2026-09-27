import type { GetScannedHostResult } from '@intlayer/backend';
import { useGetScannedHost } from '@intlayer/design-system/api';
import { Loader } from '@intlayer/design-system/loader';
import { Table } from '@intlayer/design-system/table';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { TechnologyTags } from './TechnologyTags';

/** Scan history of a host: one row per stored scan, newest first. */
export const ScannedHostDetail: FC<{ host: string }> = ({ host }) => {
  const { scanHeaders, sources, noData, loadingError } =
    useIntlayer('scans-admin-page');
  const { data, error, isFetching } = useGetScannedHost({ host });

  const scannedHost = (data as GetScannedHostResult | undefined)?.data;

  if (error) {
    return <p className="p-4 text-error">{loadingError}</p>;
  }

  if (!scannedHost) {
    return isFetching ? (
      <Loader className="m-auto my-8 size-6" />
    ) : (
      <p className="p-4 text-neutral">{noData}</p>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <Table className="w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="text-left text-neutral">
            <th className="px-3 py-2 font-medium">{scanHeaders.page}</th>
            <th className="px-3 py-2 font-medium">{scanHeaders.source}</th>
            <th className="px-3 py-2 text-right font-medium">
              {scanHeaders.score}
            </th>
            <th className="px-3 py-2 font-medium">{scanHeaders.stack}</th>
            <th className="px-3 py-2 font-medium">{scanHeaders.scannedAt}</th>
          </tr>
        </thead>
        <tbody>
          {scannedHost.scans.map((scan) => (
            <tr
              key={`${scan.url}-${scan.scannedAt}`}
              className="border-neutral/20 border-t align-top"
            >
              <td className="max-w-72 px-3 py-2">
                <a
                  href={scan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate hover:underline"
                  title={scan.url}
                >
                  {new URL(scan.url).pathname}
                </a>
              </td>
              <td className="whitespace-nowrap px-3 py-2">
                {sources[scan.source]}
              </td>
              <td className="px-3 py-2 text-right font-semibold">
                {scan.score}
              </td>
              <td className="px-3 py-2">
                <TechnologyTags technologies={scan.technologies} />
              </td>
              <td className="whitespace-nowrap px-3 py-2 text-neutral text-xs">
                {new Date(scan.scannedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
