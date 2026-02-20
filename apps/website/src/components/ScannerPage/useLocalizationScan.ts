import { extractErrorMessage } from '@intlayer/config/client';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useReducer, useRef } from 'react';
import type {
  AuditEvent,
  DomainData,
  MergedData,
} from './Analyzer/Results/types';

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

  const eventSourceRef = useRef<EventSource | null>(null);

  const handleMessage = (event: MessageEvent) => {
    let message: AuditEvent;
    try {
      message = JSON.parse(event.data);
    } catch (err) {
      console.error('Failed to parse SSE message:', err);
      return;
    }

    if (typeof message.globalError === 'string') {
      console.error(message.globalError);
      dispatch({ type: 'SET_ERROR', payload: globalErrorMessage });
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      dispatch({ type: 'FINISH_SINGLE_SCAN' });
      return;
    }

    if (typeof message.message === 'string') {
      setStepsMessage(message.message);
    }
    if (typeof message.progress === 'number') {
      setProgress(message.progress ?? 0);
    }
    if (typeof message.score === 'number') {
      setScore(message.score);
    }
    if (typeof message.type === 'string') {
      setMergedData((prev) => ({
        ...prev,
        [message.type!]: {
          status: message.status,
          data: message.data,
        },
      }));
    }

    if (typeof message.domainData === 'object') {
      setDomainData((prev) => ({ ...prev, ...message.domainData }));
    }

    if (typeof message.progress === 'number' && message.progress === 100) {
      dispatch({ type: 'FINISH_SINGLE_SCAN' });
      setTimeout(() => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      }, 1000);
    }
  };

  const handleError = (error: Event) => {
    console.error('SSE error:', error);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    dispatch({ type: 'FINISH_SINGLE_SCAN' });
  };

  const handleAnalyze = async (url: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    dispatch({ type: 'START_SINGLE_SCAN' });
    setProgress(0);
    setStepsMessage('Starting analysis...');
    setMergedData({});
    setDomainData(undefined);
    setScore(0);

    try {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}?url=${encodeURIComponent(url)}`
      );
      eventSourceRef.current = eventSource;

      eventSource.onmessage = handleMessage;
      eventSource.onerror = handleError;
    } catch (error) {
      setMergedData({});
      dispatch({ type: 'SET_ERROR', payload: extractErrorMessage(error) });
    }
  };

  const handleCancel = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
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
