import {
  useFillAllTranslations,
  useGetDictionaries,
  usePauseTranslationJob,
  useResumeTranslationJob,
  useSession,
  useStopTranslationJob,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { Checkbox, SearchInput } from '@intlayer/design-system/input';
import { Loader } from '@intlayer/design-system/loader';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { SwitchSelector } from '@intlayer/design-system/switch-selector';
import { useToast } from '@intlayer/design-system/toaster';
import { cn } from '@intlayer/design-system/utils';
import {
  AlertCircle,
  Archive,
  CheckCircle2,
  ChevronDown,
  Globe,
  Languages,
  Pause,
  Play,
  RefreshCw,
  X,
  XCircle,
  Zap,
} from 'lucide-react';
import { type FC, memo, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIntlayer } from 'react-intlayer';
import { useDashboardRightPanel } from '#hooks/useDashboardRightPanel';
import {
  getJobPercentage,
  isJobRunning,
  isRichProgress,
  type TranslationJob,
  type TranslationJobPendingAction,
  type TranslationTaskProgress,
  useTranslationJobs,
} from '#hooks/useTranslationJobs';

// ─── TaskRow ──────────────────────────────────────────────────────────────────

type JobCardContent = {
  cancelJob: { value: string };
  pauseJob: { value: string };
  resumeJob: { value: string };
  dismissJob: { value: string };
  retryJob: { value: string };
  restoreJob: { value: string };
  jobCancelled: { value: string };
  translationJobProgress: (args: {
    jobId: string;
    percentage: number;
  }) => string;
};

/**
 * One fill-style translation task (a dictionary and its target locales).
 * Several rows may be active at once since the worker runs concurrently.
 */
const TaskRow: FC<{
  task: TranslationTaskProgress;
  isCancelled: boolean;
  content: { jobCancelled: string };
}> = memo(({ task, isCancelled, content }) => {
  const isCompleted = task.state === 'completed';
  const isFailed = task.state === 'failed';
  const isCurrent = task.state === 'active';
  const showCancelled = isCancelled || task.state === 'cancelled';
  const hasLocaleDetail = task.targetLocales.length > 0;

  return (
    <div className="flex items-center justify-between gap-2 py-1.5">
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-mono text-text text-xs">
          {task.dictionaryKey}
        </span>
        {isCurrent && task.currentLocale && (
          <span className="text-neutral-500 text-xs">
            {task.currentLocale}
            {task.currentChunk && task.totalChunks && task.totalChunks > 1
              ? ` • chunk ${task.currentChunk}/${task.totalChunks}`
              : ''}
          </span>
        )}
        {showCancelled && (
          <span className="text-error text-xs">{content.jobCancelled}</span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {hasLocaleDetail && !showCancelled && (
          <span className="font-mono text-neutral-500 text-xs">
            {task.completedLocales.length}/{task.targetLocales.length}
          </span>
        )}
        {isCompleted && <CheckCircle2 className="size-4 text-success" />}
        {isFailed && <XCircle className="size-4 text-error" />}
        {showCancelled && !isCompleted && !isFailed && (
          <XCircle className="size-4 text-error opacity-50" />
        )}
        {isCurrent && !showCancelled && <Loader className="size-4" />}
        {!isCompleted && !isFailed && !isCurrent && !showCancelled && (
          <span className="block size-4 rounded-full border border-neutral/40" />
        )}
      </div>
    </div>
  );
});

// ─── JobCard ──────────────────────────────────────────────────────────────────

type JobCardProps = {
  job: TranslationJob;
  /** Compact/read-only mode for the archive section */
  archived?: boolean;
  onStop: (jobId: string) => void;
  onPause: (jobId: string) => void;
  onResume: (jobId: string) => void;
  onDismiss: (jobId: string) => void;
  onRetry: (jobId: string) => void;
  onRestore: (jobId: string) => void;
  content: JobCardContent;
};

/**
 * Derive the fill-style task list of a job. Jobs created by the current
 * worker carry `progress.tasks`; older jobs fall back to the flat
 * `dictionaryKeys` + `currentKey` progress shape.
 */
const getJobTasks = (job: TranslationJob): TranslationTaskProgress[] => {
  const progress = isRichProgress(job.progress) ? job.progress : null;

  if (progress?.tasks) return progress.tasks;

  const dictionaryKeys = job.data?.dictionaryKeys ?? [];

  return dictionaryKeys.map((key) => {
    const isCurrent = progress?.currentKey === key;
    return {
      dictionaryId: key,
      dictionaryKey: key,
      targetLocales: [],
      completedLocales: [],
      state: progress?.completedKeys.includes(key)
        ? 'completed'
        : progress?.failedKeys.includes(key)
          ? 'failed'
          : isCurrent
            ? 'active'
            : 'pending',
      currentLocale: isCurrent ? (progress?.currentLocale ?? null) : null,
      currentChunk: isCurrent ? (progress?.currentChunk ?? null) : null,
      totalChunks: isCurrent ? (progress?.totalChunks ?? null) : null,
    };
  });
};

const JobCard: FC<JobCardProps> = memo(
  ({
    job,
    archived = false,
    onStop,
    onPause,
    onResume,
    onDismiss,
    onRetry,
    onRestore,
    content,
  }) => {
    const percentage = getJobPercentage(job.progress);
    const tasks = getJobTasks(job);

    const effectivelyPaused = job.isPaused || job.pendingAction === 'pausing';
    const effectiveState =
      job.pendingAction === 'stopping' ? 'failed' : job.state;

    const isActive = ['active', 'waiting', 'delayed'].includes(effectiveState);
    const isDone = ['completed', 'failed'].includes(effectiveState);

    const isStopping = job.pendingAction === 'stopping';
    const isPausing = job.pendingAction === 'pausing';
    const isResuming = job.pendingAction === 'resuming';
    const busy = isStopping || isPausing || isResuming;

    return (
      <Container
        className={cn(
          'flex flex-col gap-2 bg-background p-4 shadow-sm',
          archived && 'opacity-60'
        )}
        roundedSize="3xl"
        color="text"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-2">
          {/* Left: status icon + job id */}
          <div className="flex min-w-0 items-center gap-2">
            {effectiveState === 'completed' && (
              <CheckCircle2 className="size-4 shrink-0 text-success" />
            )}
            {effectiveState === 'failed' && (
              <XCircle className="size-4 shrink-0 text-error" />
            )}
            {isActive && !effectivelyPaused && (
              <Loader className="size-4 shrink-0" />
            )}
            {isActive && effectivelyPaused && (
              <Pause className="size-4 shrink-0 text-warning" />
            )}
            <span className="truncate font-mono text-neutral-500 text-xs">
              #{job.jobId}
            </span>
          </div>

          {/* Right: badge + buttons */}
          <div className="flex shrink-0 items-center gap-1">
            {/* State badge */}
            <span
              className={cn(
                'whitespace-nowrap rounded-full px-2 py-0.5 font-medium text-xs capitalize',
                effectiveState === 'completed' && 'bg-success/10 text-success',
                effectiveState === 'failed' && 'bg-error/10 text-error',
                isActive &&
                  !effectivelyPaused &&
                  'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
                isActive && effectivelyPaused && 'bg-warning/10 text-warning'
              )}
            >
              {isStopping
                ? 'cancelling…'
                : isPausing
                  ? 'pausing…'
                  : isResuming
                    ? 'resuming…'
                    : effectivelyPaused && isActive
                      ? 'paused'
                      : effectiveState}
            </span>

            {!archived && (
              <>
                {/* Pause */}
                {isActive && !effectivelyPaused && (
                  <button
                    type="button"
                    title={content.pauseJob.value}
                    aria-label={content.pauseJob.value}
                    disabled={busy}
                    onClick={() => onPause(job.jobId)}
                    className="rounded p-1 text-neutral transition-opacity hover:bg-neutral/10 disabled:pointer-events-none disabled:opacity-40"
                  >
                    {isPausing ? (
                      <Loader className="size-3.5" />
                    ) : (
                      <Pause className="size-3.5" />
                    )}
                  </button>
                )}

                {/* Resume */}
                {isActive && effectivelyPaused && (
                  <button
                    type="button"
                    title={content.resumeJob.value}
                    aria-label={content.resumeJob.value}
                    disabled={busy}
                    onClick={() => onResume(job.jobId)}
                    className="rounded p-1 text-neutral transition-opacity hover:bg-neutral/10 disabled:pointer-events-none disabled:opacity-40"
                  >
                    {isResuming ? (
                      <Loader className="size-3.5" />
                    ) : (
                      <Play className="size-3.5" />
                    )}
                  </button>
                )}

                {/* Retry on failure */}
                {effectiveState === 'failed' && (
                  <button
                    type="button"
                    title={content.retryJob.value}
                    aria-label={content.retryJob.value}
                    disabled={busy}
                    onClick={() => onRetry(job.jobId)}
                    className="rounded p-1 text-neutral transition-opacity hover:bg-neutral/10 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <RefreshCw className="size-3.5" />
                  </button>
                )}

                {/* Cancel active */}
                {isActive && (
                  <button
                    type="button"
                    title={content.cancelJob.value}
                    aria-label={content.cancelJob.value}
                    disabled={busy}
                    onClick={() => onStop(job.jobId)}
                    className="rounded p-1 text-error transition-opacity hover:bg-error/10 disabled:pointer-events-none disabled:opacity-40"
                  >
                    {isStopping ? (
                      <Loader className="size-3.5" />
                    ) : (
                      <X className="size-3.5" />
                    )}
                  </button>
                )}

                {/* Dismiss done → archive */}
                {isDone && (
                  <button
                    type="button"
                    title={content.dismissJob.value}
                    aria-label={content.dismissJob.value}
                    onClick={() => onDismiss(job.jobId)}
                    className="rounded p-1 text-neutral transition-colors hover:bg-neutral/10"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </>
            )}

            {/* Restore from archive */}
            {archived && (
              <button
                type="button"
                title={content.restoreJob.value}
                aria-label={content.restoreJob.value}
                onClick={() => onRestore(job.jobId)}
                className="rounded p-1 text-neutral transition-colors hover:bg-neutral/10"
              >
                <RefreshCw className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Overall progress bar ── */}
        <div className="space-y-1.5">
          <div
            className="flex justify-between text-neutral-500 text-xs"
            aria-hidden="true"
          >
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={Math.round(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={
              content.translationJobProgress({
                jobId: job.jobId,
                percentage: Math.round(percentage),
              }) as any
            }
            className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10"
          >
            <div
              aria-hidden="true"
              className={cn(
                'h-full transition-all duration-500 ease-out',
                effectiveState === 'completed' && 'bg-success',
                effectiveState === 'failed' && 'bg-error',
                isActive && !effectivelyPaused && 'bg-blue-500',
                isActive && effectivelyPaused && 'bg-warning'
              )}
              style={{ width: `${Math.max(5, percentage)}%` }}
            />
          </div>
        </div>

        {/* ── Fill-style task list (one row per dictionary) ── */}
        {tasks.length > 0 && (
          <div className="flex max-h-36 flex-col divide-y divide-neutral/10 overflow-y-auto">
            {tasks.map((task) => (
              <TaskRow
                key={task.dictionaryId}
                task={task}
                isCancelled={
                  isDone &&
                  effectiveState === 'failed' &&
                  ['pending', 'active'].includes(task.state)
                }
                content={{ jobCancelled: content.jobCancelled.value }}
              />
            ))}
          </div>
        )}
      </Container>
    );
  }
);

// ─── Main component ───────────────────────────────────────────────────────────

export const TranslationStatusAside: FC = () => {
  const content = useIntlayer('translation-status-aside');
  const { session } = useSession();
  const { mutateAsync: fillAll, isPending: isFilling } =
    useFillAllTranslations();
  const { mutateAsync: stopJob } = useStopTranslationJob();
  const { mutateAsync: pauseJob } = usePauseTranslationJob();
  const { mutateAsync: resumeJob } = useResumeTranslationJob();
  const { toast } = useToast();

  // Fill options
  const [fillMode, setFillMode] = useState<'complete' | 'review'>('complete');
  const [selectSpecific, setSelectSpecific] = useState(false);
  const [dictionarySearch, setDictionarySearch] = useState('');
  const [selectedDictionaryIds, setSelectedDictionaryIds] = useState<
    Set<string>
  >(new Set());

  const { data: dictionariesData, isLoading: isLoadingDictionaries } =
    useGetDictionaries({ pageSize: 1000 });
  const allDictionaries = dictionariesData?.data ?? [];

  /**
   * Live job state, fed by the shared SSE store — the same data powers the
   * TranslationStatusBar in the dashboard layout.
   */
  const {
    visibleJobs,
    archivedJobs,
    hasConnectionError,
    dismissJob,
    restoreJob,
    setPendingAction,
    completePendingAction,
    clearPendingAction,
  } = useTranslationJobs();

  const { open: openPanel, isOpen: checkIsOpen } = useDashboardRightPanel();
  const isOpen = checkIsOpen('translation-status');
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [showArchive, setShowArchive] = useState(false);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(0);

  useEffect(() => {
    setPortalTarget(document.getElementById('dashboard-right-panel'));
  }, []);

  useEffect(() => {
    if (isOpen) setLastSeenTimestamp(Date.now());
  }, [isOpen]);

  const projectLocales =
    session?.project?.configuration?.internationalization?.locales ?? [];
  const defaultLocale =
    session?.project?.configuration?.internationalization?.defaultLocale;
  const targetLocales = projectLocales.filter((l) => l !== defaultLocale);

  // ── Optimistic action helper ──────────────────────────────────────────────

  const withOptimistic = useCallback(
    async (
      jobId: string,
      action: TranslationJobPendingAction,
      call: () => Promise<unknown>
    ) => {
      setPendingAction(jobId, action);
      try {
        await call();
        completePendingAction(jobId, action);
      } catch {
        clearPendingAction(jobId);
      }
    },
    [setPendingAction, completePendingAction, clearPendingAction]
  );

  // ── Per-job handlers ──────────────────────────────────────────────────────

  const handleStop = useCallback(
    (jobId: string) => withOptimistic(jobId, 'stopping', () => stopJob(jobId)),
    [stopJob, withOptimistic]
  );

  const handlePause = useCallback(
    (jobId: string) => withOptimistic(jobId, 'pausing', () => pauseJob(jobId)),
    [pauseJob, withOptimistic]
  );

  const handleResume = useCallback(
    (jobId: string) =>
      withOptimistic(jobId, 'resuming', () => resumeJob(jobId)),
    [resumeJob, withOptimistic]
  );

  const handleRetry = useCallback(
    async (jobId: string) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      try {
        await fetch(`${backendUrl}/api/translate/${jobId}/restart`, {
          method: 'POST',
          credentials: 'include',
        });
        // Un-archive so the new job is visible in the main list
        restoreJob(jobId);
      } catch {
        /* ignore */
      }
    },
    [restoreJob]
  );

  const handleFillAll = useCallback(async () => {
    if (targetLocales.length === 0) return;
    const dictionaryIds =
      selectSpecific && selectedDictionaryIds.size > 0
        ? [...selectedDictionaryIds]
        : undefined;
    const result = await fillAll({
      targetLocales,
      mode: fillMode,
      dictionaryIds,
    });

    if (result?.message === 'All dictionaries are already translated') {
      toast({
        title: content.allDictionariesAlreadyTranslated.value,
        variant: 'success',
      });
    }
  }, [
    fillAll,
    targetLocales,
    fillMode,
    selectSpecific,
    selectedDictionaryIds,
    toast,
    content.allDictionariesAlreadyTranslated.value,
  ]);

  // ── Derived data ──────────────────────────────────────────────────────────

  const hasUnseenChanges = visibleJobs.some(
    (job) =>
      ['completed', 'failed'].includes(job.state) &&
      (job.updatedAt ?? 0) > lastSeenTimestamp
  );

  // Stable content object so JobCard memo never breaks on every render
  const cardContent: JobCardContent = {
    cancelJob: content.cancelJob,
    pauseJob: content.pauseJob,
    resumeJob: content.resumeJob,
    dismissJob: content.dismissJob,
    retryJob: content.retryJob,
    restoreJob: content.restoreJob,
    jobCancelled: content.jobCancelled,
    translationJobProgress: content.translationJobProgress,
  };

  // ── Render ────────────────────────────────────────────────────────────────

  const isProcessingGlobal = visibleJobs.some(isJobRunning);

  return (
    <>
      <PopoverStatic identifier="translation-status">
        <Button
          onClick={() => openPanel('translation-status')}
          type="button"
          variant="hoverable"
          label={content.translationStatus.value}
          Icon={Zap}
          isLoading={isProcessingGlobal}
          disabled={false}
          size="icon-lg"
          isActive={isOpen}
        >
          <div className="relative">
            {hasUnseenChanges && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-error ring-2" />
            )}
          </div>
        </Button>

        <PopoverStatic.Detail identifier="translation-status" xAlign="end">
          <span className="flex gap-4 text-nowrap py-2 pr-2 pl-4 text-neutral text-sm">
            {content.translationStatusButtonDescription}
          </span>
        </PopoverStatic.Detail>
      </PopoverStatic>

      {isOpen &&
        portalTarget &&
        createPortal(
          <div className="flex h-full flex-col gap-4 overflow-auto p-4">
            {/* Connection error banner */}
            {hasConnectionError && (
              <div className="flex items-center gap-2 rounded-md bg-card p-3 text-sm text-warning">
                <AlertCircle className="size-5" />
                {content.connectionLostReconnecting}
              </div>
            )}

            {/* ── Active / visible jobs ── */}
            <div className="flex flex-col gap-3">
              {visibleJobs.length === 0 && !hasConnectionError ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="mb-3 rounded-full bg-neutral/20 p-4">
                    <Globe className="h-8 w-8 text-neutral" />
                  </div>
                  <p className="font-medium text-base text-text">
                    {content.noActiveTranslations}
                  </p>
                  <p className="text-neutral text-sm">
                    {content.startATranslationToSee}
                  </p>
                </div>
              ) : (
                visibleJobs.map((job) => (
                  <JobCard
                    key={job.jobId}
                    job={job}
                    onStop={handleStop}
                    onPause={handlePause}
                    onResume={handleResume}
                    onDismiss={dismissJob}
                    onRetry={handleRetry}
                    onRestore={restoreJob}
                    content={cardContent}
                  />
                ))
              )}
            </div>

            {/* ── Archive section ── */}
            {archivedJobs.length > 0 && (
              <div className="border-neutral/15 border-t pt-2">
                <button
                  type="button"
                  onClick={() => setShowArchive((v) => !v)}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-neutral text-sm transition-colors hover:bg-neutral/10"
                >
                  <span className="flex items-center gap-2">
                    <Archive className="size-5" />
                    {content.archivedJobs}
                    <span className="rounded-full bg-neutral/20 px-1.5 py-0.5 text-xs">
                      {archivedJobs.length}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      'size-4 transition-transform duration-200',
                      showArchive && 'rotate-180'
                    )}
                  />
                </button>

                {showArchive && (
                  <div className="mt-2 flex flex-col gap-2">
                    {archivedJobs.map((job) => (
                      <JobCard
                        key={job.jobId}
                        job={job}
                        archived
                        onStop={handleStop}
                        onPause={handlePause}
                        onResume={handleResume}
                        onDismiss={dismissJob}
                        onRetry={handleRetry}
                        onRestore={restoreJob}
                        content={cardContent}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Fill translations panel ── */}
            <div className="flex flex-col gap-4 border-neutral-200 border-t pt-4 dark:border-neutral-800">
              {/* Mode selector */}
              <div className="flex flex-col gap-2">
                <span className="font-medium text-text text-xs">
                  {content.modeLabel}
                </span>
                <SwitchSelector
                  choices={[
                    { content: content.modeFillMissing, value: 'complete' },
                    { content: content.modeAuditAll, value: 'review' },
                  ]}
                  value={fillMode}
                  onChange={(value) =>
                    setFillMode(value as 'complete' | 'review')
                  }
                  color="text"
                  size="sm"
                  className="w-full"
                />
              </div>

              {/* Dictionary selector */}
              <div className="flex flex-col gap-2">
                <span className="font-medium text-text text-xs">
                  {content.dictionariesLabel}
                </span>
                <SwitchSelector
                  choices={[
                    { content: content.allDictionaries, value: false },
                    { content: content.selectSpecific, value: true },
                  ]}
                  value={selectSpecific}
                  onChange={setSelectSpecific}
                  color="text"
                  size="sm"
                  className="w-full"
                />

                {selectSpecific && (
                  <div className="flex flex-col gap-2">
                    <SearchInput
                      placeholder={content.searchDictionaries.value}
                      value={dictionarySearch}
                      onChange={(e) => setDictionarySearch(e.target.value)}
                    />
                    <Container
                      background="none"
                      border
                      borderColor="card"
                      roundedSize="xl"
                      padding="md"
                      className="flex max-h-40 flex-col gap-2 overflow-y-auto"
                    >
                      {isLoadingDictionaries ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader className="size-4" />
                        </div>
                      ) : (
                        <>
                          {allDictionaries
                            .filter((dictionaries: any) =>
                              dictionaries.key
                                .toLowerCase()
                                .includes(dictionarySearch.toLowerCase())
                            )
                            .map((dictionaries: any) => (
                              <Checkbox
                                key={dictionaries.id}
                                id={`dict-${dictionaries.id}`}
                                name={`dict-${dictionaries.id}`}
                                size="sm"
                                color="text"
                                checked={selectedDictionaryIds.has(
                                  dictionaries.id
                                )}
                                onChange={() => {
                                  setSelectedDictionaryIds((prev) => {
                                    const next = new Set(prev);
                                    if (next.has(dictionaries.id)) {
                                      next.delete(dictionaries.id);
                                    } else {
                                      next.add(dictionaries.id);
                                    }
                                    return next;
                                  });
                                }}
                                label={dictionaries.key}
                                labelClassName="font-mono font-normal px-2 py-0.5 text-xs"
                              />
                            ))}
                          {allDictionaries.filter((dictionaries: any) =>
                            dictionaries.key
                              .toLowerCase()
                              .includes(dictionarySearch.toLowerCase())
                          ).length === 0 && (
                            <span className="py-2 text-center text-neutral-500 text-xs">
                              {content.noDictionariesFound}
                            </span>
                          )}
                        </>
                      )}
                    </Container>
                  </div>
                )}
              </div>

              {/* Start button */}
              <Button
                onClick={handleFillAll}
                isLoading={isFilling}
                disabled={
                  isFilling ||
                  targetLocales.length === 0 ||
                  (selectSpecific && selectedDictionaryIds.size === 0)
                }
                Icon={Languages}
                label={content.fillAllTranslations.value}
                variant="default"
                size="sm"
                color="text"
                className="mt-6 w-full"
              >
                {content.fillAllTranslations}
              </Button>
              <p className="-mt-2 text-center text-neutral text-xs">
                {content.fillAllTranslationsDescription}
              </p>
            </div>
          </div>,
          portalTarget
        )}
    </>
  );
};
