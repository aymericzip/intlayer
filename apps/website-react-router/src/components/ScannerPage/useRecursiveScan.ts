import { getAuditAPI } from '@intlayer/api';
import { extractErrorMessage } from '@intlayer/config/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useReducer, useRef } from 'react';

type RecursiveState = {
  isDiscovering: boolean;
  discoveredUrls: string[] | null;
  isRecursiveScanLoading: boolean;
  isPaused: boolean;
  recursiveJobId: string | null;
  recursiveStatus: any;
};

type RecursiveAction =
  | { type: 'START_DISCOVERING' }
  | { type: 'SET_DISCOVERED_URLS'; payload: string[] }
  | { type: 'START_RECURSIVE_SCAN' }
  | { type: 'SET_RECURSIVE_JOB_ID'; payload: string | null }
  | { type: 'SET_RECURSIVE_STATUS'; payload: any }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'FINISH_RECURSIVE_SCAN' }
  | { type: 'SET_ERROR' };

const initialRecursiveState: RecursiveState = {
  isDiscovering: false,
  discoveredUrls: null,
  isRecursiveScanLoading: false,
  isPaused: false,
  recursiveJobId: null,
  recursiveStatus: null,
};

function recursiveReducer(
  state: RecursiveState,
  action: RecursiveAction
): RecursiveState {
  switch (action.type) {
    case 'START_DISCOVERING':
      return { ...state, isDiscovering: true, discoveredUrls: null };
    case 'SET_DISCOVERED_URLS':
      return { ...state, isDiscovering: false, discoveredUrls: action.payload };
    case 'START_RECURSIVE_SCAN':
      return { ...state, isRecursiveScanLoading: true, isPaused: false };
    case 'SET_RECURSIVE_JOB_ID':
      return { ...state, recursiveJobId: action.payload };
    case 'SET_RECURSIVE_STATUS':
      return { ...state, recursiveStatus: action.payload };
    case 'PAUSE':
      return { ...state, isPaused: true };
    case 'RESUME':
      return { ...state, isPaused: false };
    case 'FINISH_RECURSIVE_SCAN':
      return {
        ...state,
        isRecursiveScanLoading: false,
        isPaused: false,
        recursiveJobId: null,
      };
    case 'SET_ERROR':
      return { ...state, isRecursiveScanLoading: false, isPaused: false };
    default:
      return state;
  }
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const getAPI = () =>
  getAuditAPI({}, { editor: { backendURL: BACKEND_URL } } as any);

export const useRecursiveScan = (
  _session: any,
  setError: (err: string | null) => void
) => {
  const [state, dispatch] = useReducer(recursiveReducer, initialRecursiveState);
  const jobIdRef = useRef<string | null>(null);

  // Keep jobIdRef in sync so the cleanup effect can read it
  useEffect(() => {
    jobIdRef.current = state.recursiveJobId;
  }, [state.recursiveJobId]);

  // Cancel the job when the component unmounts (user closes / navigates away)
  useEffect(() => {
    return () => {
      if (jobIdRef.current) {
        getAPI()
          .cancelRecursiveAudit({ jobId: jobIdRef.current })
          .catch(() => {});
      }
    };
  }, []);

  const handleDiscoverUrls = async (url: string) => {
    if (!url) return;
    dispatch({ type: 'START_DISCOVERING' });
    try {
      const data = await getAPI().discoverUrls({ url });
      dispatch({
        type: 'SET_DISCOVERED_URLS',
        payload: data?.urls ?? [url],
      });
    } catch (err) {
      setError(extractErrorMessage(err));
      dispatch({ type: 'SET_ERROR' });
    }
  };

  const handleStartRecursiveAudit = async (url: string, urls?: string[]) => {
    if (!url) return;
    dispatch({ type: 'START_RECURSIVE_SCAN' });

    try {
      const data = await getAPI().startRecursiveAudit({ url, urls });
      if (data?.jobId) {
        dispatch({ type: 'SET_RECURSIVE_JOB_ID', payload: data.jobId });
      } else {
        setError('Failed to start recursive audit');
        dispatch({ type: 'SET_ERROR' });
      }
    } catch (err) {
      setError(extractErrorMessage(err));
      dispatch({ type: 'SET_ERROR' });
    }
  };

  const handlePauseRecursiveAudit = async () => {
    if (!state.recursiveJobId) return;
    try {
      await getAPI().pauseRecursiveAudit({ jobId: state.recursiveJobId });
      dispatch({ type: 'PAUSE' });
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  const handleResumeRecursiveAudit = async () => {
    if (!state.recursiveJobId) return;
    try {
      await getAPI().resumeRecursiveAudit({ jobId: state.recursiveJobId });
      dispatch({ type: 'RESUME' });
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  const handleCancelRecursiveAudit = async () => {
    if (!state.recursiveJobId) return;
    try {
      await getAPI().cancelRecursiveAudit({ jobId: state.recursiveJobId });
      dispatch({ type: 'FINISH_RECURSIVE_SCAN' });
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  useQuery({
    queryKey: ['recursive-status', state.recursiveJobId],
    queryFn: async () => {
      if (!state.recursiveJobId) return null;
      const data = await getAPI().getRecursiveAuditStatus({
        jobId: state.recursiveJobId,
      });
      dispatch({ type: 'SET_RECURSIVE_STATUS', payload: data });

      if (
        data?.job?.status === 'completed' ||
        data?.job?.status === 'failed' ||
        data?.job?.status === 'cancelled'
      ) {
        dispatch({ type: 'FINISH_RECURSIVE_SCAN' });
      }
      return data;
    },
    enabled: !!state.recursiveJobId && !state.isPaused,
    refetchInterval: (query) => {
      const data = (query.state as any).data;
      const status = data?.job?.status;
      if (
        status === 'completed' ||
        status === 'failed' ||
        status === 'cancelled'
      ) {
        return false;
      }
      return 5000;
    },
  });

  return {
    ...state,
    handleDiscoverUrls,
    handleStartRecursiveAudit,
    handlePauseRecursiveAudit,
    handleResumeRecursiveAudit,
    handleCancelRecursiveAudit,
  };
};
