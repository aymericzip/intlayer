import type { AuditEvent, DomainData, MergedAuditData } from './types';

export type AuditScanState = {
  isScanning: boolean;
  /** True once a scan reached 100% progress. */
  isDone: boolean;
  progress: number;
  score: number;
  stepMessage: string;
  error: string | null;
  domainData: Partial<DomainData> | null;
  mergedData: MergedAuditData;
  /** ISO date of the audit when replayed from the one-hour backend cache. */
  cachedAt: string | null;
};

export const initialAuditScanState: AuditScanState = {
  isScanning: false,
  isDone: false,
  progress: 0,
  score: 0,
  stepMessage: '',
  error: null,
  domainData: null,
  mergedData: {},
  cachedAt: null,
};

/** Folds one SSE event of `/api/scan` into the audit state. */
export const applyAuditEvent = (
  previous: AuditScanState,
  event: AuditEvent
): AuditScanState => {
  const next = { ...previous };

  if (typeof event.globalError === 'string') {
    next.error = event.globalError;
    next.isScanning = false;
    return next;
  }
  if (typeof event.cachedAt === 'string') {
    next.cachedAt = event.cachedAt;
  }
  if (typeof event.message === 'string') {
    next.stepMessage = event.message;
  }
  if (typeof event.progress === 'number') {
    next.progress = event.progress;
    if (event.progress >= 100) {
      next.isScanning = false;
      next.isDone = true;
    }
  }
  if (typeof event.score === 'number') {
    next.score = event.score;
  }
  if (typeof event.type === 'string') {
    next.mergedData = {
      ...previous.mergedData,
      [event.type]: { status: event.status, data: event.data },
    };
  }
  if (event.domainData) {
    next.domainData = { ...previous.domainData, ...event.domainData };
  }

  return next;
};
