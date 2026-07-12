import { useEffect, useState } from 'react';
import { detectPage } from '../detector/detectPage';
import type { PageDetectionResult } from '../detector/types';

export type ActiveTabDetection = {
  /** URL of the inspected tab, once resolved. */
  tabUrl: string | null;
  /** Result of the in-page detector, once the injection completed. */
  detection: PageDetectionResult | null;
  isLoading: boolean;
  /** Set when the tab cannot be inspected (chrome:// pages, injection error). */
  error: string | null;
};

/**
 * Resolves the active tab and injects {@link detectPage} into it (MAIN world,
 * so page globals like `__NEXT_DATA__` are visible) to collect every
 * i18n-related implementation detail of the page.
 */
export const useActiveTabDetection = (): ActiveTabDetection => {
  const [tabUrl, setTabUrl] = useState<string | null>(null);
  const [detection, setDetection] = useState<PageDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const runDetection = async (): Promise<void> => {
      try {
        const [activeTab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (!activeTab?.id || !activeTab.url) {
          setError('No active tab found');
          return;
        }

        if (!/^https?:/.test(activeTab.url)) {
          setError('This page cannot be inspected (not an http/https page)');
          return;
        }

        setTabUrl(activeTab.url);

        const [injectionResult] = await chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          world: 'MAIN',
          func: detectPage,
        });

        if (!injectionResult?.result) {
          setError('Could not analyze the page');
          return;
        }

        setDetection(injectionResult.result as PageDetectionResult);
      } catch (executionError) {
        setError(
          executionError instanceof Error
            ? executionError.message
            : 'Could not analyze the page'
        );
      } finally {
        setIsLoading(false);
      }
    };

    void runDetection();
  }, []);

  return { tabUrl, detection, isLoading, error };
};
