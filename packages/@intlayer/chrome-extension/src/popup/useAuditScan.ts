import { useCallback, useRef, useState } from 'react';
import { scanUrl } from '../scan/scanClient';
import type { DomainData, MergedAuditData } from '../scan/types';

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
};

const initialState: AuditScanState = {
  isScanning: false,
  isDone: false,
  progress: 0,
  score: 0,
  stepMessage: '',
  error: null,
  domainData: null,
  mergedData: {},
};

export type AuditScan = AuditScanState & {
  /** Starts (or restarts) a streamed audit of the given URL. */
  startScan: (url: string) => void;
  /** Aborts the in-flight audit, keeping the results received so far. */
  cancelScan: () => void;
};

/**
 * Drives the backend SSE audit (`/api/scan`) and accumulates its events into
 * renderable state: global score/progress plus one entry per check type.
 */
export const useAuditScan = (): AuditScan => {
  const [state, setState] = useState<AuditScanState>(initialState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelScan = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setState((previous) => ({ ...previous, isScanning: false }));
  }, []);

  const startScan = useCallback((url: string) => {
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setState({ ...initialState, isScanning: true });

    scanUrl({
      url,
      signal: abortController.signal,
      onMessage: (event) => {
        setState((previous) => {
          const next = { ...previous };

          if (typeof event.globalError === 'string') {
            next.error = event.globalError;
            next.isScanning = false;
            return next;
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
        });
      },
    })
      .then(() => {
        setState((previous) => ({
          ...previous,
          isScanning: false,
          isDone: previous.error === null,
        }));
      })
      .catch((scanError: unknown) => {
        if ((scanError as Error).name === 'AbortError') return;
        setState((previous) => ({
          ...previous,
          isScanning: false,
          error: scanError instanceof Error ? scanError.message : 'Scan failed',
        }));
      });
  }, []);

  return { ...state, startScan, cancelScan };
};
