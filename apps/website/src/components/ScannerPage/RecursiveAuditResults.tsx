import {
  Button,
  ButtonColor,
  ButtonVariant,
  Tag,
} from '@intlayer/design-system';
import { cn } from '@intlayer/design-system/utils';
import { ChevronDown, ChevronRight, Pause, Play, Square } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, memo, useState } from 'react';
import { EventTag } from './Analyzer/Results/FieldItem';
import type { AuditEvent } from './Analyzer/Results/types';

type Page = {
  url: string;
  status: string;
  score?: number;
  error?: string;
  results?: AuditEvent[];
};

type Job = {
  status: string;
  progress: number;
  totalPageCount: number;
  completedPageCount: number;
};

type RecursiveAuditResultsProps = {
  status: {
    job: Job;
    pages: Page[];
  };
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  isPaused?: boolean;
};

const formatCheckName = (type: string): string => {
  const base = type.split('\\')[0];
  return base
    .replace(/^(url|robots|sitemap)_/, '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
};

const tagColor = (
  status: string
): 'success' | 'error' | 'warning' | 'neutral' => {
  if (status === 'completed' || status === 'success') return 'success';
  if (status === 'failed' || status === 'error') return 'error';
  if (status === 'warning') return 'warning';
  return 'neutral';
};

const PageRow: FC<{ page: Page }> = ({ page }) => {
  const [expanded, setExpanded] = useState(false);

  // Only show check events (those with a type field)
  const checkResults = page.results?.filter((r) => !!r.type) ?? [];
  const hasResults = checkResults.length > 0;

  return (
    <>
      <tr
        className={cn(
          `border-neutral/10 border-t transition-colors`,
          hasResults && 'cursor-pointer hover:bg-card/80'
        )}
        onClick={() => hasResults && setExpanded((value) => !value)}
      >
        <td className="p-3">
          <div className="flex items-center gap-1.5">
            {hasResults ? (
              expanded ? (
                <ChevronDown className="size-3.5 shrink-0 text-text/40" />
              ) : (
                <ChevronRight className="size-3.5 shrink-0 text-text/40" />
              )
            ) : (
              <span className="size-3.5 shrink-0" />
            )}
            <span className="max-w-xs truncate font-mono text-xs">
              {page.url}
            </span>
          </div>
        </td>
        <td className="p-3">
          <Tag color={tagColor(page.status)} size="sm">
            {page.status}
          </Tag>
        </td>
        <td className="p-3 font-semibold">
          {page.score !== undefined ? (
            <Tag
              size="xs"
              color={
                page.score >= 70
                  ? 'success'
                  : page.score >= 40
                    ? 'warning'
                    : 'error'
              }
            >
              {page.score}/100
            </Tag>
          ) : (
            <span className="text-text/40">-</span>
          )}
        </td>
      </tr>

      {expanded && hasResults && (
        <tr className="border-neutral/10 border-t bg-card/30">
          <td colSpan={3} className="p-0">
            <div className="divide-y divide-neutral/10">
              {checkResults.map((check, i) => (
                <div
                  key={check.type ?? i}
                  className="flex items-center gap-3 px-6 py-2"
                >
                  <EventTag
                    id={`recursive-${page.url}-${check.type ?? i}`}
                    event={check}
                  />
                  <span className="min-w-0 flex-1 font-medium text-xs">
                    {check.type ? formatCheckName(check.type) : '—'}
                  </span>
                  <Tag
                    color={tagColor(check.status ?? '')}
                    size="sm"
                    className="shrink-0"
                  >
                    {check.status ?? '-'}
                  </Tag>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export const RecursiveAuditResults: FC<RecursiveAuditResultsProps> = memo(
  ({ status, onPause, onResume, onCancel, isPaused = false }) => {
    const {
      title,
      progressLabel,
      pagesAudited,
      resumeButton,
      pauseButton,
      stopButton,
      columnUrl,
      columnStatus,
      columnScore,
    } = useIntlayer('recursive-audit-results');

    const { job, pages } = status;
    const isActive =
      job.status === 'running' ||
      job.status === 'pending' ||
      job.status === 'paused';

    return (
      <div className="mt-6 flex flex-col gap-4 border-neutral border-t border-dashed pt-6 text-left">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="flex items-center gap-2">
            <Tag color={tagColor(job.status)}>{job.status}</Tag>
            {isActive && (
              <>
                {isPaused ? (
                  <Button
                    onClick={onResume}
                    variant={ButtonVariant.OUTLINE}
                    color={ButtonColor.TEXT}
                    size="icon-sm"
                    label={resumeButton.value}
                    Icon={Play}
                  />
                ) : (
                  <Button
                    onClick={onPause}
                    variant={ButtonVariant.OUTLINE}
                    color={ButtonColor.TEXT}
                    size="icon-sm"
                    label={pauseButton.value}
                    Icon={Pause}
                  />
                )}
                <Button
                  onClick={onCancel}
                  variant={ButtonVariant.OUTLINE}
                  color={ButtonColor.ERROR}
                  size="icon-sm"
                  label={stopButton.value}
                  Icon={Square}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-sm text-text/70">
            <span>{progressLabel}</span>
            <span>{job.progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral/20">
            <div
              className="h-2 animate-pulse rounded-full bg-linear-to-r from-[#C8EB3E] to-[#A3C62D] transition-all duration-500"
              style={{ width: `${job.progress}%` }}
            />
          </div>
          <div className="text-text/50 text-xs">
            {job.completedPageCount} / {job.totalPageCount} {pagesAudited}
          </div>
        </div>

        <div className="max-h-[32rem] overflow-auto rounded-xl border border-neutral/20 bg-card/50">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-card shadow-sm">
              <tr>
                <th className="p-3">{columnUrl}</th>
                <th className="p-3">{columnStatus}</th>
                <th className="p-3">{columnScore}</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <PageRow key={page.url} page={page} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);
