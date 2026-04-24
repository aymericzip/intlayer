import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  useFillAllTranslations,
  usePauseTranslationJob,
  useResumeTranslationJob,
  useSession,
  useStopTranslationJob,
} from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { RightDrawer } from '@intlayer/design-system/right-drawer';
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
import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

// ─── localStorage persistence ─────────────────────────────────────────────────

const DISMISSED_KEY = 'intlayer:dismissed-translation-jobs';

const loadDismissedIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(DISMISSED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
};

const saveDismissedIds = (ids: Set<string>): void => {
  try {
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...ids]));
  } catch {
    /* quota exceeded – ignore */
  }
};

// ─── Types ────────────────────────────────────────────────────────────────────

type JobState = 'active' | 'waiting' | 'delayed' | 'completed' | 'failed';

type TranslationProgress = {
  percentage: number;
  completedKeys: string[];
  failedKeys: string[];
  currentKey: string | null;
  currentLocale: string | null;
  currentChunk: number | null;
  totalChunks: number | null;
};

/** Internal job record – SSE fields + client-side UI flags */
type JobData = {
  jobId: string;
  state: JobState;
  progress: number | TranslationProgress;
  isPaused?: boolean;
  data?: {
    dictionaryKeys?: string[];
    dictionaryIds?: string[];
    targetLocales?: string[];
  };
  updatedAt?: number;
  /** Client-side: job moved to archive – persisted in localStorage */
  dismissed?: boolean;
  /** Client-side: optimistic loading action in progress */
  pendingAction?: 'stopping' | 'pausing' | 'resuming';
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isRichProgress = (
  p: number | TranslationProgress
): p is TranslationProgress =>
  typeof p === 'object' && p !== null && 'percentage' in p;

const getPercentage = (progress: number | TranslationProgress): number => {
  if (isRichProgress(progress)) return progress.percentage;
  return typeof progress === 'number' ? progress : 0;
};

// ─── DictionaryRow ────────────────────────────────────────────────────────────

type JobCardContent = {
  cancelJob: { value: string };
  pauseJob: { value: string };
  resumeJob: { value: string };
  dismissJob: { value: string };
  retryJob: { value: string };
  restoreJob: { value: string };
  jobCancelled: { value: string };
};

const DictionaryRow: FC<{
  keyName: string;
  isCompleted: boolean;
  isFailed: boolean;
  isCurrent: boolean;
  isCancelled: boolean;
  currentLocale?: string | null;
  currentChunk?: number | null;
  totalChunks?: number | null;
  content: { jobCancelled: string };
}> = memo(
  ({
    keyName,
    isCompleted,
    isFailed,
    isCurrent,
    isCancelled,
    currentLocale,
    currentChunk,
    totalChunks,
    content,
  }) => (
    <div className="flex items-center justify-between gap-2 py-1.5">
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-mono text-text text-xs">{keyName}</span>
        {isCurrent && currentLocale && (
          <span className="text-[10px] text-neutral-500">
            {currentLocale}
            {currentChunk && totalChunks
              ? ` • chunk ${currentChunk}/${totalChunks}`
              : ''}
          </span>
        )}
        {isCancelled && (
          <span className="text-[10px] text-error">{content.jobCancelled}</span>
        )}
      </div>
      <span className="shrink-0">
        {isCompleted && <CheckCircle2 className="size-4 text-success" />}
        {isFailed && <XCircle className="size-4 text-error" />}
        {isCancelled && <XCircle className="size-4 text-error opacity-50" />}
        {isCurrent && <Loader className="size-4" />}
        {!isCompleted && !isFailed && !isCurrent && !isCancelled && (
          <span className="block size-4 rounded-full border border-neutral/40" />
        )}
      </span>
    </div>
  )
);
DictionaryRow.displayName = 'DictionaryRow';

// ─── JobCard ──────────────────────────────────────────────────────────────────

type JobCardProps = {
  job: JobData;
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
    const progress = isRichProgress(job.progress) ? job.progress : null;
    const dictionaryKeys = job.data?.dictionaryKeys ?? [];
    const percentage = getPercentage(job.progress);

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

        {/* ── Progress / dictionary list ── */}
        {dictionaryKeys.length > 0 ? (
          <div className="flex max-h-36 flex-col divide-y divide-neutral/10 overflow-y-auto">
            {[...dictionaryKeys].reverse().map((key) => {
              const isCompleted =
                progress?.completedKeys.includes(key) ??
                effectiveState === 'completed';
              const isFailed = progress?.failedKeys.includes(key) ?? false;
              const isCurrent = !isDone && progress?.currentKey === key;
              const isCancelled =
                isDone &&
                effectiveState === 'failed' &&
                !isCompleted &&
                !isFailed &&
                (progress?.currentKey === key || !progress?.currentKey);

              return (
                <DictionaryRow
                  key={key}
                  keyName={key}
                  isCompleted={isCompleted}
                  isFailed={isFailed}
                  isCurrent={isCurrent}
                  isCancelled={isCancelled}
                  currentLocale={isCurrent ? progress?.currentLocale : null}
                  currentChunk={isCurrent ? progress?.currentChunk : null}
                  totalChunks={isCurrent ? progress?.totalChunks : null}
                  content={{ jobCancelled: content.jobCancelled.value }}
                />
              );
            })}
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex justify-between text-neutral-500 text-xs">
              <span>Progress</span>
              <span>{Math.round(percentage)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral/10">
              <div
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
        )}
      </Container>
    );
  }
);
JobCard.displayName = 'JobCard';

// ─── Main component ───────────────────────────────────────────────────────────

export const TranslationStatusAside: FC = () => {
  const content = useIntlayer('translation-status-aside');
  const { session } = useSession();
  const { mutateAsync: fillAll, isPending: isFilling } =
    useFillAllTranslations();
  const { mutateAsync: stopJob } = useStopTranslationJob();
  const { mutateAsync: pauseJob } = usePauseTranslationJob();
  const { mutateAsync: resumeJob } = useResumeTranslationJob();

  /**
   * All jobs keyed by jobId.
   * Client-only flags (`dismissed`, `pendingAction`) live inside each record
   * so SSE merges can never accidentally clear them.
   */
  const [jobs, setJobs] = useState<Record<string, JobData>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const [lastSeenTimestamp, setLastSeenTimestamp] = useState(0);

  /**
   * Dismissed IDs persisted in localStorage.
   * We keep them in a ref (not state) so SSE handler always has the latest
   * set without being recreated.
   */
  const dismissedIdsRef = useRef<Set<string>>(loadDismissedIds());

  const projectLocales =
    session?.project?.configuration?.internationalization?.locales ?? [];
  const defaultLocale =
    session?.project?.configuration?.internationalization?.defaultLocale;
  const targetLocales = projectLocales.filter((l) => l !== defaultLocale);

  // ── SSE stream ────────────────────────────────────────────────────────────

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const es = new EventSource(`${backendUrl}/api/translate/status`, {
      withCredentials: true,
    });

    es.onopen = () => setHasConnectionError(false);

    es.onmessage = (event) => {
      try {
        const incoming = JSON.parse(event.data) as Partial<JobData>;
        if (!incoming.jobId) return;

        setJobs((prev) => {
          const existing = prev[incoming.jobId!];

          // Merge SSE data but always preserve the client-only `dismissed` flag
          const merged: JobData = {
            ...existing,
            ...(incoming as JobData),
            updatedAt: Date.now(),
            dismissed:
              existing?.dismissed ??
              dismissedIdsRef.current.has(incoming.jobId!),
            // pendingAction is managed exclusively by API call handlers,
            // NOT by SSE — so we always preserve whatever is currently set.
            pendingAction: existing?.pendingAction,
          };

          // Skip setState if nothing meaningful changed
          if (existing) {
            const prevPct = getPercentage(existing.progress);
            const newPct = getPercentage(merged.progress);
            const prevRich = isRichProgress(existing.progress)
              ? existing.progress
              : null;
            const newRich = isRichProgress(merged.progress)
              ? merged.progress
              : null;

            if (
              existing.state === merged.state &&
              existing.isPaused === merged.isPaused &&
              existing.dismissed === merged.dismissed &&
              Math.abs(prevPct - newPct) < 0.5 &&
              prevRich?.currentKey === newRich?.currentKey &&
              prevRich?.currentLocale === newRich?.currentLocale &&
              prevRich?.currentChunk === newRich?.currentChunk &&
              prevRich?.totalChunks === newRich?.totalChunks &&
              prevRich?.completedKeys.length ===
                newRich?.completedKeys.length &&
              prevRich?.failedKeys.length === newRich?.failedKeys.length
            ) {
              return prev;
            }
          }

          return { ...prev, [incoming.jobId!]: merged };
        });
      } catch (e) {
        console.error(content.errorParsingSseData.value, e);
      }
    };

    es.onerror = () => setHasConnectionError(true);
    return () => es.close();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) setLastSeenTimestamp(Date.now());
  }, [isOpen]);

  // ── Optimistic action helper ──────────────────────────────────────────────

  const withOptimistic = useCallback(
    async (
      jobId: string,
      action: NonNullable<JobData['pendingAction']>,
      call: () => Promise<unknown>
    ) => {
      // Show loading state immediately
      setJobs((prev) => ({
        ...prev,
        [jobId]: { ...prev[jobId], pendingAction: action },
      }));
      try {
        await call();
        // Clear loading state immediately when API confirms — don't wait for SSE
        setJobs((prev) => ({
          ...prev,
          [jobId]: {
            ...prev[jobId],
            pendingAction: undefined,
            ...(action === 'stopping' && { state: 'failed' as JobState }),
            ...(action === 'pausing' && { isPaused: true }),
            ...(action === 'resuming' && { isPaused: false }),
          },
        }));
      } catch {
        // Roll back loading state on error
        setJobs((prev) => ({
          ...prev,
          [jobId]: { ...prev[jobId], pendingAction: undefined },
        }));
      }
    },
    []
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

  /** Archive a job: persist to localStorage + mark in state */
  const handleDismiss = useCallback((jobId: string) => {
    dismissedIdsRef.current.add(jobId);
    saveDismissedIds(dismissedIdsRef.current);

    setJobs((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], dismissed: true },
    }));
  }, []);

  /** Restore a job from archive */
  const handleRestore = useCallback((jobId: string) => {
    dismissedIdsRef.current.delete(jobId);
    saveDismissedIds(dismissedIdsRef.current);

    setJobs((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], dismissed: false },
    }));
  }, []);

  const handleRetry = useCallback(
    async (jobId: string) => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      try {
        await fetch(`${backendUrl}/api/translate/${jobId}/restart`, {
          method: 'POST',
          credentials: 'include',
        });
        // Un-archive so the new job is visible in the main list
        handleRestore(jobId);
      } catch {
        /* ignore */
      }
    },
    [handleRestore]
  );

  const handleFillAll = useCallback(async () => {
    if (targetLocales.length === 0) return;
    await fillAll({ targetLocales });
  }, [fillAll, targetLocales]);

  // ── Derived data ──────────────────────────────────────────────────────────

  const allJobs = Object.values(jobs);
  const visibleJobs = allJobs
    .filter((j) => !j.dismissed)
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  const archivedJobs = allJobs
    .filter((j) => j.dismissed)
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));

  const isProcessing = visibleJobs.some((j) =>
    ['active', 'waiting', 'delayed'].includes(j.state)
  );

  const hasUnseenChanges = visibleJobs.some(
    (j) =>
      ['completed', 'failed'].includes(j.state) &&
      (j.updatedAt ?? 0) > lastSeenTimestamp
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
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <PopoverStatic identifier="translation-status">
        <Button
          onClick={() => setIsOpen(true)}
          type="button"
          variant="hoverable"
          label={content.translationStatus.value}
          Icon={Zap}
          isLoading={isProcessing}
          disabled={false}
          size="icon-lg"
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

      <RightDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        identifier="translation-status"
        title={
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>{content.translationStatus1}</span>
          </div>
        }
      >
        <div className="flex flex-col gap-4 p-1">
          {/* Connection error banner */}
          {hasConnectionError && (
            <div className="flex items-center gap-2 rounded-md bg-card p-3 text-sm text-warning">
              <AlertCircle className="size-4" />
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
                  onDismiss={handleDismiss}
                  onRetry={handleRetry}
                  onRestore={handleRestore}
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
                  <Archive className="size-4" />
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
                      onDismiss={handleDismiss}
                      onRetry={handleRetry}
                      onRestore={handleRestore}
                      content={cardContent}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Fill all button ── */}
          <div className="border-neutral-200 border-t px-6 pt-4 dark:border-neutral-800">
            <Button
              onClick={handleFillAll}
              isLoading={isFilling}
              disabled={isFilling || targetLocales.length === 0}
              Icon={Languages}
              label={content.fillAllTranslations.value}
              variant="default"
              size="sm"
              color="text"
              className="w-full"
            >
              {content.fillAllTranslations}
            </Button>
            <p className="mt-2 text-center text-neutral text-xs">
              {content.fillAllTranslationsDescription}
            </p>
          </div>
        </div>
      </RightDrawer>
    </>
  );
};
