import { useEffect, useState } from 'preact/hooks';
import { detectPage } from '../detector/detectPage';
import type { PageDetectionResult } from '../detector/types';

/** Why the active tab could not be inspected — translated by the popup. */
export type ActiveTabErrorCode =
  | 'noActiveTab'
  | 'notInspectable'
  | 'accessLost'
  | 'analysisFailed';

export type ActiveTabError = {
  code: ActiveTabErrorCode;
  /** Raw browser message, when the injection itself threw. */
  detail?: string;
};

export type ActiveTabDetection = {
  /** Id of the inspected tab, once resolved. */
  tabId: number | null;
  /** URL of the inspected tab, once resolved. */
  tabUrl: string | null;
  /** Result of the in-page detector, once the injection completed. */
  detection: PageDetectionResult | null;
  isLoading: boolean;
  /** Set when the tab cannot be inspected (chrome:// pages, injection error). */
  error: ActiveTabError | null;
};

/**
 * Resolves the active tab and injects {@link detectPage} into it (MAIN world,
 * so page globals like `__NEXT_DATA__` are visible) to collect every
 * i18n-related implementation detail of the page. Detection runs again each
 * time the tab finishes loading a new page, e.g. after a popup navigation.
 */
export const useActiveTabDetection = (): ActiveTabDetection => {
  const [tabId, setTabId] = useState<number | null>(null);
  const [tabUrl, setTabUrl] = useState<string | null>(null);
  const [detection, setDetection] = useState<PageDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ActiveTabError | null>(null);

  useEffect(() => {
    const runDetection = async (tab: chrome.tabs.Tab): Promise<void> => {
      setIsLoading(true);
      setError(null);
      setDetection(null);

      try {
        if (!tab.id) {
          setError({ code: 'noActiveTab' });
          return;
        }

        setTabId(tab.id);

        // `activeTab` access is revoked once the tab leaves the origin the
        // popup was opened on: the URL is then hidden from the extension.
        if (!tab.url) {
          setError({ code: 'accessLost' });
          return;
        }

        if (!/^https?:/.test(tab.url)) {
          setError({ code: 'notInspectable' });
          return;
        }

        setTabUrl(tab.url);

        const [injectionResult] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          world: 'MAIN',
          func: detectPage,
        });

        if (!injectionResult?.result) {
          setError({ code: 'analysisFailed' });
          return;
        }

        setDetection(injectionResult.result as PageDetectionResult);
      } catch (executionError) {
        setError({
          code: 'analysisFailed',
          detail:
            executionError instanceof Error
              ? executionError.message
              : undefined,
        });
      } finally {
        setIsLoading(false);
      }
    };

    let activeTabId: number | undefined;

    const handleTabUpdated = (
      updatedTabId: number,
      changeInfo: chrome.tabs.OnUpdatedInfo,
      updatedTab: chrome.tabs.Tab
    ): void => {
      if (updatedTabId !== activeTabId || changeInfo.status !== 'complete') {
        return;
      }

      void runDetection(updatedTab);
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdated);

    void chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(([activeTab]) => {
        activeTabId = activeTab?.id;

        if (!activeTab) {
          setError({ code: 'noActiveTab' });
          setIsLoading(false);
          return;
        }

        return runDetection(activeTab);
      });

    return () => chrome.tabs.onUpdated.removeListener(handleTabUpdated);
  }, []);

  return { tabId, tabUrl, detection, isLoading, error };
};
