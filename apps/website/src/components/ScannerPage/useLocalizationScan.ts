import { getAuditAPI } from '@intlayer/api';
import { extractErrorMessage } from '@intlayer/config/client';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useReducer, useRef } from 'react';
import type {
  AuditEvent,
  DomainData,
  MergedData,
} from './Analyzer/Results/types';

/** Final state of a single-URL scan, as returned by `handleAnalyze`. */
export type ScanSnapshot = {
  score: number;
  domainData: Partial<DomainData> | undefined;
  mergedData: MergedData;
};

type AnalyzerState = {
  error: string | null;
  isSingleScanLoading: boolean;
};

type AnalyzerAction =
  | { type: 'START_SINGLE_SCAN' }
  | { type: 'FINISH_SINGLE_SCAN' }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CANCEL' };

const initialState: AnalyzerState = {
  error: null,
  isSingleScanLoading: false,
};

function analyzerReducer(
  state: AnalyzerState,
  action: AnalyzerAction
): AnalyzerState {
  switch (action.type) {
    case 'START_SINGLE_SCAN':
      return {
        ...state,
        isSingleScanLoading: true,
        error: null,
      };
    case 'FINISH_SINGLE_SCAN':
      return { ...state, isSingleScanLoading: false };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isSingleScanLoading: false,
      };
    case 'CANCEL':
      return {
        ...state,
        isSingleScanLoading: false,
      };
    default:
      return state;
  }
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export const useLocalizationScan = (globalErrorMessage: string) => {
  const [state, dispatch] = useReducer(analyzerReducer, initialState);
  const [progress, setProgress] = usePersistedStore<number>(
    'localization-analyzer-progress',
    0
  );
  const [stepsMessage, setStepsMessage] = usePersistedStore<string>(
    'localization-analyzer-steps-message',
    ''
  );
  const [score, setScore] = usePersistedStore<number>(
    'localization-analyzer-score',
    0
  );
  const [domainData, setDomainData] = usePersistedStore<
    Partial<DomainData> | undefined
  >('localization-analyzer-domain-data', undefined);
  const [mergedData, setMergedData] = usePersistedStore<MergedData>(
    'localization-analyzer-data',
    {}
  );

  const abortControllerRef = useRef<AbortController | null>(null);
  // Mirrors the persisted state so callers awaiting a scan can read its
  // outcome without waiting for React to commit the last event.
  const snapshotRef = useRef<ScanSnapshot>({
    score: 0,
    domainData: undefined,
    mergedData: {},
  });

  const handleMessage = (event: AuditEvent) => {
    if (typeof event.globalError === 'string') {
      dispatch({ type: 'SET_ERROR', payload: globalErrorMessage });
      abortControllerRef.current?.abort();
      dispatch({ type: 'FINISH_SINGLE_SCAN' });
      return;
    }

    if (typeof event.message === 'string') {
      setStepsMessage(event.message);
    }
    if (typeof event.progress === 'number') {
      setProgress(event.progress ?? 0);
    }
    if (typeof event.score === 'number') {
      snapshotRef.current.score = event.score;
      setScore(event.score);
    }
    if (typeof event.type === 'string') {
      snapshotRef.current.mergedData = {
        ...snapshotRef.current.mergedData,
        [event.type]: { status: event.status, data: event.data },
      };
      setMergedData((prev) => ({
        ...prev,
        [event.type!]: {
          status: event.status,
          data: event.data,
        },
      }));
    }
    if (typeof event.domainData === 'object') {
      snapshotRef.current.domainData = {
        ...snapshotRef.current.domainData,
        ...event.domainData,
      };
      setDomainData((prev) => ({ ...prev, ...event.domainData }));
    }
    if (typeof event.progress === 'number' && event.progress === 100) {
      dispatch({ type: 'FINISH_SINGLE_SCAN' });
    }
  };

  const handleAnalyze = async (url: string): Promise<ScanSnapshot> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    dispatch({ type: 'START_SINGLE_SCAN' });
    setProgress(0);
    setStepsMessage('Starting analysis...');
    setMergedData({});
    setDomainData(undefined);
    setScore(0);
    snapshotRef.current = { score: 0, domainData: undefined, mergedData: {} };

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const auditAPI = getAuditAPI({}, {
      editor: { backendURL: BACKEND_URL },
    } as any);

    try {
      await auditAPI.scanUrl(
        {
          url,
          onMessage: handleMessage,
          onDone: () => {
            dispatch({ type: 'FINISH_SINGLE_SCAN' });
          },
        },
        { signal: abortController.signal }
      );
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setMergedData({});
        dispatch({ type: 'SET_ERROR', payload: extractErrorMessage(error) });
      }
    } finally {
      abortControllerRef.current = null;
    }

    return snapshotRef.current;
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    dispatch({ type: 'CANCEL' });
    setStepsMessage('Analysis cancelled');
  };

  return {
    ...state,
    progress,
    stepsMessage,
    score,
    domainData,
    mergedData,
    handleAnalyze,
    handleCancel,
    setMergedData,
    setDomainData,
  };
};
