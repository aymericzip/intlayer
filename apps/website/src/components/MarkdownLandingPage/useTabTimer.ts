import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface UseTabTimerOptions<T> {
  tabs: readonly T[];
  initialTab?: T;
  intervalMs?: number;
}

export interface UseTabTimerReturn<T> {
  selectedTab: T;
  setSelectedTab: Dispatch<SetStateAction<T>>;
  hasInteracted: boolean;
  stopTimer: () => void;
}

export const useTabTimer = <T>({
  tabs,
  initialTab = tabs[0],
  intervalMs = 4000,
}: UseTabTimerOptions<T>): UseTabTimerReturn<T> => {
  const [selectedTab, setSelectedTab] = useState<T>(initialTab);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted || tabs.length <= 1) return;

    const interval = setInterval(() => {
      setSelectedTab((prev) => {
        const currentIndex = tabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [hasInteracted, tabs, intervalMs]);

  const handleSelectTab: Dispatch<SetStateAction<T>> = useCallback((action) => {
    setHasInteracted(true);
    setSelectedTab(action);
  }, []);

  const stopTimer = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return {
    selectedTab,
    setSelectedTab: handleSelectTab,
    hasInteracted,
    stopTimer,
  };
};
