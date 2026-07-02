import { Loader } from '@intlayer/design-system/loader';
import { cn } from '@intlayer/design-system/utils';
import { ChevronRight, Pause } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useDashboardRightPanel } from '#hooks/useDashboardRightPanel';
import {
  getJobPercentage,
  isRichProgress,
  useTranslationJobs,
} from '#hooks/useTranslationJobs';

/**
 * Slim live-translation progress bar pinned at the bottom of the dashboard
 * main content. Fed by the same SSE store as the TranslationStatusAside
 * drawer; clicking it opens the drawer with the full per-dictionary detail.
 *
 * Rendered only while at least one translation job is running.
 */
export const TranslationStatusBar: FC = () => {
  const content = useIntlayer('translation-status-bar');
  const { runningJobs } = useTranslationJobs();
  const { open: openPanel } = useDashboardRightPanel();

  if (runningJobs.length === 0) return null;

  const percentage =
    runningJobs.reduce((sum, job) => sum + getJobPercentage(job.progress), 0) /
    runningJobs.length;

  const isPaused = runningJobs.every(
    (job) => job.isPaused || job.pendingAction === 'pausing'
  );

  /** Dictionaries currently being translated across every running job */
  const activeTasks = runningJobs.flatMap((job) =>
    isRichProgress(job.progress)
      ? (job.progress.tasks ?? []).filter((task) => task.state === 'active')
      : []
  );

  const displayedTasks = activeTasks.slice(0, 2);
  const hiddenTaskCount = activeTasks.length - displayedTasks.length;

  return (
    <button
      type="button"
      onClick={() => openPanel('translation-status')}
      aria-label={content.openTranslationStatus.value}
      className="group relative flex w-full shrink-0 items-center gap-3 border-neutral/20 border-t bg-background px-4 py-1.5 text-left transition-colors hover:bg-neutral/5"
    >
      {/* Progress track */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={content.translationProgress.value}
        className="absolute inset-x-0 top-0 h-0.5 bg-neutral/10"
      >
        <div
          aria-hidden="true"
          className={cn(
            'h-full transition-all duration-500 ease-out',
            isPaused ? 'bg-warning' : 'bg-blue-500'
          )}
          style={{ width: `${Math.max(2, percentage)}%` }}
        />
      </div>

      {/* Status icon */}
      {isPaused ? (
        <Pause className="size-3.5 shrink-0 text-warning" />
      ) : (
        <Loader className="size-3.5 shrink-0" />
      )}

      {/* Label + current dictionaries */}
      <span className="flex min-w-0 flex-1 items-baseline gap-2">
        <span className="shrink-0 font-medium text-text text-xs">
          {isPaused ? content.translationPaused : content.translating}
        </span>
        {displayedTasks.length > 0 && (
          <span className="truncate font-mono text-neutral-500 text-xs">
            {displayedTasks
              .map((task) =>
                task.currentLocale
                  ? `${task.dictionaryKey} (${task.currentLocale})`
                  : task.dictionaryKey
              )
              .join(', ')}
            {hiddenTaskCount > 0 ? ` +${hiddenTaskCount}` : ''}
          </span>
        )}
      </span>

      {/* Percentage + open hint */}
      <span className="flex shrink-0 items-center gap-1 text-neutral-500 text-xs">
        <span className="font-mono">{Math.round(percentage)}%</span>
        <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};
