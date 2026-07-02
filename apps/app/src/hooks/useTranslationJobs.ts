import { useMemo, useSyncExternalStore } from 'react';

// ─── Types (mirror of the backend TranslationJobProgress payload) ─────────────

export type TranslationJobState =
  | 'active'
  | 'waiting'
  | 'delayed'
  | 'completed'
  | 'failed';

export type TranslationTaskState =
  | 'pending'
  | 'active'
  | 'completed'
  | 'failed'
  | 'cancelled';

/**
 * Fill-style translation task: one per dictionary, several may be `active`
 * at once since the worker translates dictionaries concurrently.
 */
export type TranslationTaskProgress = {
  dictionaryId: string;
  dictionaryKey: string;
  targetLocales: string[];
  completedLocales: string[];
  state: TranslationTaskState;
  currentLocale: string | null;
  currentChunk: number | null;
  totalChunks: number | null;
};

export type TranslationJobProgress = {
  percentage: number;
  completedKeys: string[];
  failedKeys: string[];
  currentKey: string | null;
  currentLocale: string | null;
  currentChunk: number | null;
  totalChunks: number | null;
  /** Absent on jobs created before the fill-style worker refactor */
  tasks?: TranslationTaskProgress[];
};

export type TranslationJobPendingAction = 'stopping' | 'pausing' | 'resuming';

/** Job record – SSE fields + client-side UI flags */
export type TranslationJob = {
  jobId: string;
  state: TranslationJobState;
  progress: number | TranslationJobProgress;
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
  pendingAction?: TranslationJobPendingAction;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const isRichProgress = (
  progress: number | TranslationJobProgress
): progress is TranslationJobProgress =>
  typeof progress === 'object' && progress !== null && 'percentage' in progress;

export const getJobPercentage = (
  progress: number | TranslationJobProgress
): number => {
  if (isRichProgress(progress)) return progress.percentage;
  return typeof progress === 'number' ? progress : 0;
};

export const RUNNING_JOB_STATES: TranslationJobState[] = [
  'active',
  'waiting',
  'delayed',
];

export const isJobRunning = (job: TranslationJob): boolean =>
  RUNNING_JOB_STATES.includes(job.state);

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

// ─── Store ────────────────────────────────────────────────────────────────────

type TranslationJobsState = {
  jobs: Record<string, TranslationJob>;
  hasConnectionError: boolean;
};

const EMPTY_STATE: TranslationJobsState = {
  jobs: {},
  hasConnectionError: false,
};

/**
 * Cheap change-detection signature so identical SSE payloads (the backend
 * re-sends every job every 2s) never trigger a re-render.
 */
const getJobSignature = (job: TranslationJob): string => {
  const percentage = Math.round(getJobPercentage(job.progress) * 2); // 0.5% steps
  const richProgress = isRichProgress(job.progress) ? job.progress : null;
  const activeTasksSignature = (richProgress?.tasks ?? [])
    .filter((task) => task.state === 'active')
    .map(
      (task) =>
        `${task.dictionaryKey}:${task.currentLocale}:${task.currentChunk}/${task.totalChunks}:${task.completedLocales.length}`
    )
    .join(',');

  return [
    job.state,
    job.isPaused,
    job.dismissed,
    percentage,
    richProgress?.currentKey,
    richProgress?.currentLocale,
    richProgress?.currentChunk,
    richProgress?.totalChunks,
    richProgress?.completedKeys.length,
    richProgress?.failedKeys.length,
    activeTasksSignature,
  ].join('|');
};

/**
 * Singleton observable holding the live translation-job state, fed by the
 * backend SSE stream (`/api/translate/status`).
 *
 * The EventSource is opened when the first component subscribes and closed
 * when the last one unsubscribes, so any component (aside drawer, status
 * bar, …) can consume the same live data through `useTranslationJobs`.
 */
class TranslationJobsObservable {
  private listeners = new Set<() => void>();
  private state: TranslationJobsState = EMPTY_STATE;
  private eventSource: EventSource | null = null;
  private dismissedIds: Set<string> | null = null;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    this.connect();
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) this.disconnect();
    };
  };

  getSnapshot = (): TranslationJobsState => this.state;

  getServerSnapshot = (): TranslationJobsState => EMPTY_STATE;

  /** Archive a job: persist to localStorage + mark in state */
  dismiss = (jobId: string) => {
    const dismissedIds = this.getDismissedIds();
    dismissedIds.add(jobId);
    saveDismissedIds(dismissedIds);
    this.updateJob(jobId, { dismissed: true });
  };

  /** Restore a job from archive */
  restore = (jobId: string) => {
    const dismissedIds = this.getDismissedIds();
    dismissedIds.delete(jobId);
    saveDismissedIds(dismissedIds);
    this.updateJob(jobId, { dismissed: false });
  };

  /** Show an optimistic loading state while the API call is in flight */
  setPendingAction = (jobId: string, action: TranslationJobPendingAction) => {
    this.updateJob(jobId, { pendingAction: action });
  };

  /** Apply the optimistic result once the API confirms — don't wait for SSE */
  completePendingAction = (
    jobId: string,
    action: TranslationJobPendingAction
  ) => {
    this.updateJob(jobId, {
      pendingAction: undefined,
      ...(action === 'stopping' && { state: 'failed' as TranslationJobState }),
      ...(action === 'pausing' && { isPaused: true }),
      ...(action === 'resuming' && { isPaused: false }),
    });
  };

  /** Roll back the optimistic loading state on API error */
  clearPendingAction = (jobId: string) => {
    this.updateJob(jobId, { pendingAction: undefined });
  };

  private getDismissedIds = (): Set<string> => {
    if (!this.dismissedIds) this.dismissedIds = loadDismissedIds();
    return this.dismissedIds;
  };

  private updateJob = (jobId: string, patch: Partial<TranslationJob>) => {
    const existing = this.state.jobs[jobId];
    if (!existing) return;
    this.setState({
      ...this.state,
      jobs: { ...this.state.jobs, [jobId]: { ...existing, ...patch } },
    });
  };

  private connect = () => {
    if (this.eventSource || typeof window === 'undefined') return;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    this.eventSource = new EventSource(`${backendUrl}/api/translate/status`, {
      withCredentials: true,
    });

    this.eventSource.onopen = () => {
      if (this.state.hasConnectionError) {
        this.setState({ ...this.state, hasConnectionError: false });
      }
    };

    this.eventSource.onmessage = (event) => {
      try {
        const incoming = JSON.parse(event.data) as Partial<TranslationJob>;
        if (!incoming.jobId) return;
        this.applySseJob(incoming as TranslationJob);
      } catch (error) {
        console.error('Error parsing translation status SSE data', error);
      }
    };

    this.eventSource.onerror = () => {
      if (!this.state.hasConnectionError) {
        this.setState({ ...this.state, hasConnectionError: true });
      }
    };
  };

  private disconnect = () => {
    this.eventSource?.close();
    this.eventSource = null;
  };

  private applySseJob = (incoming: TranslationJob) => {
    const existing = this.state.jobs[incoming.jobId];

    // Merge SSE data but always preserve the client-only flags:
    // `dismissed` and `pendingAction` are managed exclusively by UI actions.
    const merged: TranslationJob = {
      ...existing,
      ...incoming,
      updatedAt: Date.now(),
      dismissed:
        existing?.dismissed ?? this.getDismissedIds().has(incoming.jobId),
      pendingAction: existing?.pendingAction,
    };

    // Skip the state update if nothing meaningful changed
    if (existing && getJobSignature(existing) === getJobSignature(merged)) {
      return;
    }

    this.setState({
      ...this.state,
      jobs: { ...this.state.jobs, [incoming.jobId]: merged },
    });
  };

  private setState = (state: TranslationJobsState) => {
    this.state = state;
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

export const translationJobsManager = new TranslationJobsObservable();

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Live translation-job state shared across the dashboard (drawer + status
 * bar). Backed by a single SSE connection to `/api/translate/status`.
 */
export const useTranslationJobs = () => {
  const state = useSyncExternalStore(
    translationJobsManager.subscribe,
    translationJobsManager.getSnapshot,
    translationJobsManager.getServerSnapshot
  );

  const { visibleJobs, archivedJobs, runningJobs } = useMemo(() => {
    const allJobs = Object.values(state.jobs);
    const byMostRecent = (a: TranslationJob, b: TranslationJob) =>
      (b.updatedAt ?? 0) - (a.updatedAt ?? 0);

    const visible = allJobs.filter((job) => !job.dismissed).sort(byMostRecent);

    return {
      visibleJobs: visible,
      archivedJobs: allJobs.filter((job) => job.dismissed).sort(byMostRecent),
      runningJobs: visible.filter(isJobRunning),
    };
  }, [state.jobs]);

  return {
    jobs: state.jobs,
    visibleJobs,
    archivedJobs,
    runningJobs,
    hasConnectionError: state.hasConnectionError,
    dismissJob: translationJobsManager.dismiss,
    restoreJob: translationJobsManager.restore,
    setPendingAction: translationJobsManager.setPendingAction,
    completePendingAction: translationJobsManager.completePendingAction,
    clearPendingAction: translationJobsManager.clearPendingAction,
  };
};
