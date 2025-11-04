'use client';

import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { memo } from 'react';
import { AnalyzerLoading } from '../AnalyzerLoading';
import { AnalyzerPageResults } from './AnalyzerPageResults';
import type { BatchResult } from './types';

type BatchResultsProps = {
  results: BatchResult[];
};

export const BatchResults: FC<BatchResultsProps> = memo(({ results }) => {
  const { sections, actions } = useIntlayer('analyzer-results');

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h3 className="mb-2 font-semibold text-lg text-text/80">
        {sections.selectedPages}
      </h3>
      <div className="flex flex-col gap-4">
        {results.map((result) => (
          <div
            key={result.url}
            className="rounded-lg border border-neutral/40 p-3"
          >
            <AnalyzerPageResults
              data={result.data ?? { summary: {} }}
              url={result.url}
              loading={!!result.loading}
            />
            {result.loading && (
              <div className="m-auto mt-4 flex w-full items-center justify-center">
                <AnalyzerLoading
                  progress={result.progress ?? 0}
                  currentStep={result.currentStep ?? actions.analyzing}
                />
              </div>
            )}
            {result.error && (
              <div className="mt-2 text-error text-xs">{result.error}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
