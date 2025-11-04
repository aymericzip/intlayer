'use client';

import { Tag } from '@intlayer/design-system';
import Image from 'next/image';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import type { AnalyzerResultsProps } from './types';

const AnalyzerSiteResultsSkeleton: FC = () => (
  <div className="flex flex-col pb-6">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-baseline gap-2">
        <div className="h-8 w-20 animate-pulse rounded bg-neutral/20" />
        <div className="h-8 w-16 animate-pulse rounded bg-neutral/20" />
        <div className="h-6 w-12 animate-pulse rounded bg-neutral/20" />
      </div>
      <div className="h-8 w-24 animate-pulse rounded-full bg-neutral/20" />
    </div>

    <div className="flex items-center gap-8">
      <div className="h-[180px] w-[300px] animate-pulse rounded-xl border-4 border-neutral bg-neutral/20" />
      <div className="flex-1 space-y-3">
        <div className="h-7 w-3/4 animate-pulse rounded bg-neutral/20" />
        <div className="h-4 w-full animate-pulse rounded bg-neutral/20" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-neutral/20" />
      </div>
    </div>
  </div>
);

export const AnalyzerSiteResults: FC<AnalyzerResultsProps> = ({ data }) => {
  const { score, status, messages } = useIntlayer('analyzer-results');

  // Show skeleton if score is not available yet
  if (!data.score) {
    return <AnalyzerSiteResultsSkeleton />;
  }

  return (
    <div className="flex flex-col pb-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold text-2xl text-text/70">
          <span className="mr-2 text-neutral">{score.title}:</span>
          <span className="mr-1 text-text">{data.score}</span>
          <span className="text-neutral text-sm">/100</span>
        </span>

        <Tag color={status(data.score).color.value} size="md">
          {status(data.score).label}
        </Tag>
      </div>

      {data.summary.ogImage && (
        <div className="flex items-center gap-8">
          <Image
            src={data.summary.ogImage}
            alt={messages.websitePreview}
            width={300}
            height={180}
            unoptimized
            className="rounded-xl border-4 border-neutral"
          />
          <div className="flex-1 text-left">
            <h3 className="mb-2 font-semibold text-neutral-900 text-xl dark:text-neutral-100">
              {data.summary.title ?? messages.noTitle}
            </h3>
            <p className="text-neutral text-sm">
              {data.summary.metaDescription ?? messages.noDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
