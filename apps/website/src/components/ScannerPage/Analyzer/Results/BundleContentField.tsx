'use client';

import { Link } from '@components/Link/Link';
import { Tag } from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import { Package } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { createCompOverwrite } from './AnalyzerPageResults';
import { FieldItem } from './FieldItem';
import type { AuditEvent } from './types';

type ChunkSummary = {
  filename: string;
  url: string;
  fileSize: string;
  totalLocaleSize: string;
  usedLocaleSize: string;
  unusedLocaleSize: string;
  dictionariesFound: number;
  unusedPercent: string;
};

type BundleSummary = {
  currentLocale: string;
  totalPageSize: string;
  renderedContentSize: string;
  contentSize: string;
  totalLocaleSize: string;
  totalUnusedLocaleSize: string;
  unusedPercentOfLocale: string;
  mainBundleChunks: ChunkSummary[];
  lazyBundleChunks: ChunkSummary[];
};

const parseSummary = (event?: AuditEvent): BundleSummary | null => {
  const details =
    event?.data?.errorsDetails ??
    event?.data?.warningsDetails ??
    event?.data?.successDetails;
  if (!details || typeof details !== 'object' || Array.isArray(details)) {
    return null;
  }
  if (typeof details.unusedPercentOfLocale !== 'string') return null;
  return {
    ...(details as unknown as BundleSummary),
    mainBundleChunks:
      (details.mainBundleChunks as ChunkSummary[] | undefined) ?? [],
    lazyBundleChunks:
      (details.lazyBundleChunks as ChunkSummary[] | undefined) ?? [],
  };
};

type BundleContentFieldProps = {
  id: string;
  event?: AuditEvent;
  isLoading?: boolean;
};

const TH: FC<{ children: ReactNode; right?: boolean }> = ({
  children,
  right,
}) => (
  <th
    className={cn(
      'px-3 pt-3 pb-2 font-medium text-neutral/60 text-xs',
      right ? 'text-right' : 'text-left'
    )}
  >
    {children}
  </th>
);

const TD: FC<{ children: ReactNode; right?: boolean; className?: string }> = ({
  children,
  right,
  className,
}) => (
  <td
    className={cn(
      'whitespace-nowrap px-3 py-2 text-sm',
      right ? 'text-right tabular-nums' : 'text-left',
      className
    )}
  >
    {children}
  </td>
);

type BundleSummaryLabelProps = { summary: BundleSummary | null };

const BundleSummaryLabel: FC<BundleSummaryLabelProps> = ({ summary }) => {
  const { bundleContentLabels } = useIntlayer('analyzer-results');
  const { chunkTable, totalsTable } = bundleContentLabels.summary;

  if (!summary) return null;

  const allChunks: (ChunkSummary & { isMain: boolean })[] = [
    ...summary.mainBundleChunks.map((c) => ({ ...c, isMain: true })),
    ...summary.lazyBundleChunks.map((c) => ({ ...c, isMain: false })),
  ].filter((c) => c.dictionariesFound > 0);

  const unusedOfLocaleNum = Number.parseFloat(summary.unusedPercentOfLocale);

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Per-chunk table */}
      {allChunks.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-neutral/20 bg-background/50">
          <table className="w-full border-collapse p-4">
            <thead>
              <tr className="border-neutral/10 border-b">
                <TH>{chunkTable.file}</TH>
                <TH right>{chunkTable.bundleSize}</TH>
                <TH right>{chunkTable.textContentSize}</TH>
                <TH right>{chunkTable.usedContent}</TH>
                <TH right>{chunkTable.unusedContent}</TH>
                <TH right>{chunkTable.unusedPercent}</TH>
              </tr>
            </thead>
            <tbody>
              {allChunks.map((chunk) => {
                const pct = Number.parseFloat(chunk.unusedPercent);
                const pctClass =
                  pct > 30
                    ? 'text-error font-semibold'
                    : 'text-success font-semibold';
                return (
                  <tr
                    key={chunk.url}
                    className="border-neutral/10 border-b last:border-0"
                  >
                    <TD>
                      <span className="flex items-center gap-1.5">
                        <Tag
                          color={chunk.isMain ? 'primary' : 'neutral'}
                          size="xs"
                        >
                          {chunk.isMain ? chunkTable.main : chunkTable.lazy}
                        </Tag>
                        <Link
                          href={chunk.url}
                          target="_blank"
                          label={chunk.filename}
                          rel="noopener noreferrer"
                          color="custom"
                          className="text-text/70 text-xs"
                          size="sm"
                        >
                          {chunk.filename}
                        </Link>
                      </span>
                    </TD>
                    <TD right className="text-text/60">
                      {chunk.fileSize}
                    </TD>
                    <TD right className="text-text/70">
                      {chunk.totalLocaleSize}
                    </TD>
                    <TD right className="text-text/70">
                      {chunk.usedLocaleSize}
                    </TD>
                    <TD right className="text-text/70">
                      {chunk.unusedLocaleSize}
                    </TD>
                    <TD right className={pctClass}>
                      {chunk.unusedPercent}
                    </TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Global totals */}
      <div className="overflow-x-auto rounded-lg border border-neutral/20 bg-background/50">
        <table className="w-full border-collapse p-4">
          <thead>
            <tr className="border-neutral/10 border-b">
              <TH>{totalsTable.total}</TH>
              <TH right>{totalsTable.pageSize}</TH>
              <TH right>{totalsTable.renderedHtml}</TH>
              <TH right>{totalsTable.unusedLocale}</TH>
              <TH right>{totalsTable.unusedPercent}</TH>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TD className="text-text/60">{totalsTable.allBundles}</TD>
              <TD right className="text-text/70">
                {summary.totalPageSize}
              </TD>
              <TD right className="text-text/70">
                {summary.renderedContentSize}
              </TD>
              <TD right className="text-text/70">
                {summary.totalUnusedLocaleSize}
              </TD>
              <TD
                right
                className={
                  unusedOfLocaleNum > 30
                    ? 'font-semibold text-error'
                    : 'font-semibold text-success'
                }
              >
                {summary.unusedPercentOfLocale}
              </TD>
            </tr>
          </tbody>
        </table>
      </div>

      {bundleContentLabels?.impactDescription && (
        <p className="text-left text-neutral/70 text-sm">
          {bundleContentLabels.impactDescription}
        </p>
      )}
    </div>
  );
};

export const BundleContentField: FC<BundleContentFieldProps> = memo(
  ({ id, event, isLoading }) => {
    const { resolvedTheme } = useTheme();
    const isInDarkMode = resolvedTheme === 'dark';
    const { fields, fieldsDescription, sections } =
      useIntlayer('analyzer-results');

    const summary = parseSummary(event);
    const compOverwrite = createCompOverwrite(isInDarkMode);

    return (
      <>
        <h3 className="mt-6 mb-3 font-semibold text-lg text-text/80">
          {sections?.bundleContent}
        </h3>
        <FieldItem
          id={`bundle-content-${id}`}
          icon={<Package size={16} />}
          label={fields.unusedBundleContent}
          event={event}
          isLoading={isLoading}
          details={fieldsDescription.unusedBundleContent.use(compOverwrite)}
        />
        <BundleSummaryLabel summary={summary} />
      </>
    );
  }
);
