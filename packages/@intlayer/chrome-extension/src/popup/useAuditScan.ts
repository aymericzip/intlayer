import { useCallback, useRef, useState } from 'preact/hooks';
import {
  type AuditScanState,
  applyAuditEvent,
  initialAuditScanState,
} from '../scan/auditScanState';
import { scanUrl } from '../scan/scanClient';

export type { AuditScanState };

export type AuditScan = AuditScanState & {
  /**
   * Starts (or restarts) a streamed audit of the given URL. `refresh`
   * bypasses the one-hour backend cache. Resolves with the final state, or
   * the state reached when the audit was aborted.
   */
  startScan: (
    url: string,
    options?: { refresh?: boolean }
  ) => Promise<AuditScanState>;
  /** Aborts the in-flight audit, keeping the results received so far. */
  cancelScan: () => void;
  /** Aborts the in-flight audit and clears every result. */
  resetScan: () => void;
};

/**
 * Drives the backend SSE audit (`/api/scan`) and accumulates its events into
 * renderable state: global score/progress plus one entry per check type.
 */
export const useAuditScan = (): AuditScan => {
  const [state, setState] = useState<AuditScanState>(initialAuditScanState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelScan = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setState((previous) => ({ ...previous, isScanning: false }));
  }, []);

  const resetScan = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setState(initialAuditScanState);
  }, []);

  const startScan = useCallback(
    async (
      url: string,
      { refresh = false }: { refresh?: boolean } = {}
    ): Promise<AuditScanState> => {
      abortControllerRef.current?.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      // Tracked outside React so the caller gets the final state back.
      let scanState: AuditScanState = {
        ...initialAuditScanState,
        isScanning: true,
      };
      const commit = (nextState: AuditScanState): void => {
        scanState = nextState;
        setState(nextState);
      };

      setState(scanState);

      try {
        await scanUrl({
          url,
          refresh,
          signal: abortController.signal,
          onMessage: (event) => commit(applyAuditEvent(scanState, event)),
        });

        commit({
          ...scanState,
          isScanning: false,
          isDone: scanState.error === null,
        });
      } catch (scanError) {
        if ((scanError as Error).name === 'AbortError') {
          return { ...scanState, isScanning: false };
        }

        commit({
          ...scanState,
          isScanning: false,
          error: scanError instanceof Error ? scanError.message : 'Scan failed',
        });
      }

      return scanState;
    },
    []
  );

  return { ...state, startScan, cancelScan, resetScan };
};
