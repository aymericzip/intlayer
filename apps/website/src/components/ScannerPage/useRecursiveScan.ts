import { extractErrorMessage } from '@intlayer/config/client';
import { useQuery } from '@tanstack/react-query';
import { useReducer } from 'react';

type RecursiveState = {
  isRecursiveScanLoading: boolean;
  recursiveJobId: string | null;
  recursiveStatus: any;
};

type RecursiveAction =
  | { type: 'START_RECURSIVE_SCAN' }
  | { type: 'SET_RECURSIVE_JOB_ID'; payload: string | null }
  | { type: 'SET_RECURSIVE_STATUS'; payload: any }
  | { type: 'FINISH_RECURSIVE_SCAN' }
  | { type: 'SET_ERROR' };

const initialRecursiveState: RecursiveState = {
  isRecursiveScanLoading: false,
  recursiveJobId: null,
  recursiveStatus: null,
};

function recursiveReducer(
  state: RecursiveState,
  action: RecursiveAction
): RecursiveState {
  switch (action.type) {
    case 'START_RECURSIVE_SCAN':
      return { ...state, isRecursiveScanLoading: true };
    case 'SET_RECURSIVE_JOB_ID':
      return { ...state, recursiveJobId: action.payload };
    case 'SET_RECURSIVE_STATUS':
      return { ...state, recursiveStatus: action.payload };
    case 'FINISH_RECURSIVE_SCAN':
      return { ...state, isRecursiveScanLoading: false, recursiveJobId: null };
    case 'SET_ERROR':
      return { ...state, isRecursiveScanLoading: false };
    default:
      return state;
  }
}

export const useRecursiveScan = (
  session: any,
  setError: (err: string | null) => void
) => {
  const [state, dispatch] = useReducer(recursiveReducer, initialRecursiveState);

  const handleStartRecursiveAudit = async (url: string) => {
    if (!url) return;
    dispatch({ type: 'START_RECURSIVE_SCAN' });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}/recursive/start?url=${encodeURIComponent(url)}`,
        {
          method: 'POST',
          headers: {
            'x-user-id': session?.user?.id ?? '',
          },
        }
      );
      const data = await response.json();
      if (data.jobId) {
        dispatch({ type: 'SET_RECURSIVE_JOB_ID', payload: data.jobId });
      } else {
        setError(data.error || 'Failed to start recursive audit');
        dispatch({ type: 'SET_ERROR' });
      }
    } catch (err) {
      setError(extractErrorMessage(err));
      dispatch({ type: 'SET_ERROR' });
    }
  };

  useQuery({
    queryKey: ['recursive-status', state.recursiveJobId],
    queryFn: async () => {
      if (!state.recursiveJobId) return null;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}/recursive/${state.recursiveJobId}`
      );
      const data = await response.json();
      dispatch({ type: 'SET_RECURSIVE_STATUS', payload: data });

      if (data.job.status === 'completed' || data.job.status === 'failed') {
        dispatch({ type: 'FINISH_RECURSIVE_SCAN' });
      }
      return data;
    },
    enabled: !!state.recursiveJobId,
    refetchInterval: (query) => {
      const data = (query.state as any).data;
      if (data?.job?.status === 'completed' || data?.job?.status === 'failed') {
        return false;
      }
      return 5000;
    },
  });

  return {
    ...state,
    handleStartRecursiveAudit,
  };
};
