'use client';

import type { FC } from 'react';
import { memo, useCallback, useState } from 'react';
import { AnalyzerPageResults } from './AnalyzerPageResults';
import { AnalyzerSiteResults } from './AnalyzerSiteResults';
import { BatchResults } from './BatchResults';
import { PageGroupsList } from './PageGroupsList';
import { RobotsSection } from './RobotsSection';
import { SitemapSection } from './SitemapSection';
import type { AnalyzerResultsProps, BatchResult } from './types';
import { parsePageGroups } from './utils';

export const AnalyzerResults: FC<AnalyzerResultsProps> = memo(
  ({ data, url, loading = false, partialSummary = {} }) => {
    const [batchResults, setBatchResults] = useState<BatchResult[]>([]);

    const pageGroups = parsePageGroups(data, url);

    const handleBatchResultsChange = useCallback(
      (updater: BatchResult[] | ((prev: BatchResult[]) => BatchResult[])) => {
        setBatchResults((prev) => {
          if (typeof updater === 'function') {
            return updater(prev);
          }
          return updater;
        });
      },
      []
    );

    return (
      <div className="mt-10 w-full max-w-2xl rounded-2xl bg-card p-6 shadow-md">
        {data.error && <span className="text-error">{data.error}</span>}

        <AnalyzerSiteResults data={data} url={url} />

        <AnalyzerPageResults
          data={data}
          url={url}
          loading={loading}
          partialSummary={partialSummary}
        />

        <RobotsSection data={data} />

        <SitemapSection data={data} />

        <PageGroupsList
          pageGroups={pageGroups}
          onBatchResultsChange={handleBatchResultsChange}
        />

        <BatchResults results={batchResults} />
      </div>
    );
  }
);
