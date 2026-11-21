import { getTechnologyGlobalNames } from '@intlayer/engine/scan/detection';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { buildPageDetection } from '../detector/buildPageDetection';
import { collectPageSignals } from '../detector/collectPageSignals';
import type { PageDetectionResult, RawPageSignals } from '../detector/types';

/** Why the active tab could not be inspected — translated by the panel. */
export type ActiveTabErrorCode =
  | 'noActiveTab'
  | 'notInspectable'
  | 'accessRequired'
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
  /**
   * Asks the user for the optional all-sites host permission, so the panel can
   * inspect every tab it follows. Must run inside a user gesture (click).
   */
  requestAllSitesAccess: () => Promise<void>;
};

/** Optional host permission declared in the manifest. */
const ALL_SITES_PERMISSION: chrome.permissions.Permissions = {
  origins: ['<all_urls>'],
};

/**
 * Follows the active tab of the panel's window and injects
 * {@link collectPageSignals} into it (MAIN world, so page globals like
 * `__NEXT_DATA__` are visible), then interprets the collected signals with
 * {@link buildPageDetection}. Detection runs again when the user switches tab,
 * when the tab finishes loading a new page, and when site access is granted.
 *
 * Without the optional all-sites permission, only the tab the toolbar icon was
 * clicked on is readable (`activeTab`); other tabs report `accessRequired`.
 */
export const useActiveTabDetection = (): ActiveTabDetection => {
  const [tabId, setTabId] = useState<number | null>(null);
  const [tabUrl, setTabUrl] = useState<string | null>(null);
  const [detection, setDetection] = useState<PageDetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ActiveTabError | null>(null);

  useEffect(() => {
    let inspectedTabId: number | undefined;
    let panelWindowId: number | undefined;
    // Only the latest run may write state: switching tabs quickly would
    // otherwise let a slow injection overwrite the newer tab's result.
    let latestRunId = 0;

    const runDetection = async (tab: chrome.tabs.Tab): Promise<void> => {
      const runId = ++latestRunId;
      const isStale = (): boolean => runId !== latestRunId;

      inspectedTabId = tab.id;
      setIsLoading(true);
      setError(null);
      setDetection(null);

      try {
        if (!tab.id) {
          setTabId(null);
          setTabUrl(null);
          setError({ code: 'noActiveTab' });
          return;
        }

        setTabId(tab.id);

        // The URL is hidden when the extension has no access to the tab:
        // either site access is missing, or the page is a browser page that
        // no host permission covers.
        if (!tab.url) {
          const hasAllSitesAccess =
            await chrome.permissions.contains(ALL_SITES_PERMISSION);

          if (isStale()) return;

          setTabUrl(null);
          setError({
            code: hasAllSitesAccess ? 'notInspectable' : 'accessRequired',
          });
          return;
        }

        if (!/^https?:/.test(tab.url)) {
          setTabUrl(null);
          setError({ code: 'notInspectable' });
          return;
        }

        setTabUrl(tab.url);

        const { globals, versionGlobals } = getTechnologyGlobalNames();
        const [injectionResult] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          world: 'MAIN',
          func: collectPageSignals,
          args: [globals, versionGlobals],
        });

        if (isStale()) return;

        if (!injectionResult?.result) {
          setError({ code: 'analysisFailed' });
          return;
        }

        setDetection(
          buildPageDetection(injectionResult.result as RawPageSignals)
        );
      } catch (executionError) {
        if (isStale()) return;

        setError({
          code: 'analysisFailed',
          detail:
            executionError instanceof Error
              ? executionError.message
              : undefined,
        });
      } finally {
        if (!isStale()) setIsLoading(false);
      }
    };

    const rerunOnInspectedTab = async (): Promise<void> => {
      if (inspectedTabId === undefined) return;

      const inspectedTab = await chrome.tabs.get(inspectedTabId);

      await runDetection(inspectedTab);
    };

    const handleTabUpdated = (
      updatedTabId: number,
      changeInfo: chrome.tabs.OnUpdatedInfo,
      updatedTab: chrome.tabs.Tab
    ): void => {
      if (updatedTabId !== inspectedTabId || changeInfo.status !== 'complete') {
        return;
      }

      void runDetection(updatedTab);
    };

    // The side panel stays open across tabs: follow the one the user is on.
    const handleTabActivated = (
      activeInfo: chrome.tabs.OnActivatedInfo
    ): void => {
      if (activeInfo.windowId !== panelWindowId) return;

      void chrome.tabs.get(activeInfo.tabId).then(runDetection);
    };

    const handlePermissionsAdded = (): void => {
      void rerunOnInspectedTab();
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdated);
    chrome.tabs.onActivated.addListener(handleTabActivated);
    chrome.permissions.onAdded.addListener(handlePermissionsAdded);

    void chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(([activeTab]) => {
        if (!activeTab) {
          setError({ code: 'noActiveTab' });
          setIsLoading(false);
          return;
        }

        panelWindowId = activeTab.windowId;

        return runDetection(activeTab);
      });

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdated);
      chrome.tabs.onActivated.removeListener(handleTabActivated);
      chrome.permissions.onAdded.removeListener(handlePermissionsAdded);
    };
  }, []);

  // `permissions.onAdded` reruns the detection once access is granted.
  const requestAllSitesAccess = useCallback(async (): Promise<void> => {
    await chrome.permissions.request(ALL_SITES_PERMISSION);
  }, []);

  return {
    tabId,
    tabUrl,
    detection,
    isLoading,
    error,
    requestAllSitesAccess,
  };
};
