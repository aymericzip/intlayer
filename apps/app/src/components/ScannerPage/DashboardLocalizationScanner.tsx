import { useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { Input } from '@intlayer/design-system/input';
import { App_Dashboard_Projects_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { RefreshCw } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { AnalyzerLoading } from './Analyzer/AnalyzerLoading';
import { AnalyzerResultsSection } from './AnalyzerResultsSection';
import { useLocalizationScan } from './useLocalizationScan';
import { useRecursiveScan } from './useRecursiveScan';

export const DashboardLocalizationScanner: FC = () => {
  const { session } = useSession();
  const { project } = session ?? {};
  const projectId = project?.id ? String(project.id) : 'default';
  const applicationURL = project?.configuration?.editor?.applicationURL ?? null;

  const {
    noApplicationUrl,
    goToProjectSettings,
    searchAriaLabel,
    searchPlaceholder,
    loadingUrls,
    noUrls,
    refreshLabel,
    selectUrlPrompt,
  } = useIntlayer('dashboard-localization-scanner');

  const { globalError, localhostError } = useIntlayer('localization-analyzer');

  const [externalError, setExternalError] = useState<string | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [urlSearch, setUrlSearch] = useState('');

  const {
    error: scanError,
    isSingleScanLoading,
    progress,
    stepsMessage,
    score,
    domainData,
    mergedData,
    handleAnalyze,
    handleCancel,
  } = useLocalizationScan(globalError?.value);

  const scannedUrl = useMemo(() => {
    const urlKey = Object.keys(mergedData).find((key) => key.includes('\\'));
    if (!urlKey) return '';
    const sep = urlKey.indexOf('\\');
    return sep >= 0 ? urlKey.slice(sep + 1) : '';
  }, [mergedData]);

  const {
    isDiscovering,
    discoveredUrls,
    isRecursiveScanLoading,
    isPaused,
    recursiveJobId,
    recursiveStatus,
    handleDiscoverUrls,
    handleStartRecursiveAudit,
    handlePauseRecursiveAudit,
    handleResumeRecursiveAudit,
    handleCancelRecursiveAudit,
  } = useRecursiveScan(session, setExternalError);

  // Persist discovered URL list per project
  const [cachedUrls, setCachedUrls] = usePersistedStore<string[] | null>(
    `scanner-urls-${projectId}`,
    null
  );

  // Auto-discover on mount when applicationURL is known and no cache exists
  useEffect(() => {
    if (applicationURL && cachedUrls === null && !isDiscovering) {
      handleDiscoverUrls(applicationURL);
    }
  }, [applicationURL]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist URLs when discovery finishes
  useEffect(() => {
    if (discoveredUrls && discoveredUrls.length > 0) {
      setCachedUrls(discoveredUrls);
    }
  }, [discoveredUrls]); // eslint-disable-line react-hooks/exhaustive-deps

  const urls = cachedUrls ?? discoveredUrls ?? [];

  const origin = useMemo(() => {
    if (!urls.length) return '';
    try {
      return new URL(urls[0]).origin;
    } catch {
      return '';
    }
  }, [urls]);

  const filteredUrls = useMemo(() => {
    if (!urlSearch.trim()) return urls;
    const lower = urlSearch.toLowerCase();
    return urls.filter((url) => url.toLowerCase().includes(lower));
  }, [urls, urlSearch]);

  const handleRefresh = () => {
    if (!applicationURL || isDiscovering) return;
    setCachedUrls(null);
    handleDiscoverUrls(applicationURL);
  };

  const handleSelectUrl = (url: string) => {
    setSelectedUrl(url);
    handleAnalyze(url);
  };

  const error = scanError ?? externalError;

  const isLocalUrl = (url: string | null): boolean => {
    if (!url) return false;
    try {
      const { hostname } = new URL(url);
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0'
      )
        return true;
      const parts = hostname.split('.').map(Number);
      if (parts[0] === 10) return true;
      if (parts[0] === 192 && parts[1] === 168) return true;
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    } catch {
      /* ignore */
    }
    return false;
  };

  if (!applicationURL) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
        <p className="max-w-sm text-neutral text-sm">{noApplicationUrl}</p>
        <Link
          to={App_Dashboard_Projects_Path}
          color="text"
          variant="button"
          label={goToProjectSettings.value}
        >
          {goToProjectSettings}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      {/* Left panel — URL list */}
      <div className="flex w-64 shrink-0 flex-col border-neutral/20 border-r px-2 pt-2">
        <div className="flex items-center gap-1 p-2">
          <Input
            type="search"
            aria-label={searchAriaLabel.value}
            placeholder={searchPlaceholder.value}
            onChange={(e) => setUrlSearch(e.target.value)}
            value={urlSearch}
            size="sm"
            className="flex-1"
          />
          <Button
            Icon={RefreshCw}
            variant="hoverable"
            color="text"
            size="icon-sm"
            label={refreshLabel.value}
            disabled={isDiscovering}
            onClick={handleRefresh}
            className={cn(isDiscovering && 'animate-spin')}
          />
        </div>

        <ul
          className="flex-1 divide-y divide-dotted divide-neutral/30 overflow-y-auto p-1"
          aria-label={searchAriaLabel.value}
        >
          {isDiscovering ? (
            <li className="px-3 py-4 text-center text-neutral text-xs">
              {loadingUrls}
            </li>
          ) : filteredUrls.length === 0 ? (
            <li className="px-3 py-4 text-center text-neutral text-xs">
              {noUrls}
            </li>
          ) : (
            filteredUrls.map((url) => {
              const path = url.replace(origin, '') || '/';
              const isActive = selectedUrl === url;

              return (
                <li key={url} className="py-0.5">
                  <Button
                    variant="hoverable"
                    color="text"
                    size="sm"
                    label={url}
                    onClick={() => handleSelectUrl(url)}
                    className={cn(
                      'w-full justify-start rounded text-left',
                      isActive && 'bg-card font-medium text-text'
                    )}
                  >
                    <span className="block max-w-full truncate text-xs">
                      {path}
                    </span>
                  </Button>
                </li>
              );
            })
          )}
        </ul>
      </div>

      {/* Right panel — scan results */}
      <div className="flex min-w-0 flex-1 flex-col items-center overflow-auto p-4">
        {!selectedUrl && !isSingleScanLoading && !error && (
          <p className="mt-10 text-center text-neutral text-sm">
            {selectUrlPrompt}
          </p>
        )}

        {isSingleScanLoading && !recursiveJobId && (
          <AnalyzerLoading
            progress={progress}
            currentStep={stepsMessage ?? 'Analyzing…'}
          />
        )}

        <AnalyzerResultsSection
          domainData={domainData}
          score={score}
          mergedData={mergedData}
          url={scannedUrl || selectedUrl || ''}
          isSingleScanLoading={isSingleScanLoading}
          isDiscovering={isDiscovering}
          discoveredUrls={discoveredUrls}
          onDiscoverUrls={() => handleDiscoverUrls(applicationURL)}
          onStartWithUrls={(selectedUrls) =>
            handleStartRecursiveAudit(applicationURL, selectedUrls)
          }
          recursiveJobId={recursiveJobId}
          recursiveStatus={recursiveStatus}
          isRecursiveScanLoading={isRecursiveScanLoading}
          isPaused={isPaused}
          onPause={handlePauseRecursiveAudit}
          onResume={handleResumeRecursiveAudit}
          onCancel={handleCancelRecursiveAudit}
          isLoggedIn={true}
        />

        {error && (
          <Container
            className="mt-6 max-w-xl"
            padding="xl"
            roundedSize="2xl"
            border
            borderColor="neutral"
          >
            <p className="text-center text-error text-sm">
              {isLocalUrl(selectedUrl ?? applicationURL)
                ? localhostError({
                    url: (
                      <code className="font-mono">
                        {selectedUrl ?? applicationURL}
                      </code>
                    ),
                  })
                : error}
            </p>
          </Container>
        )}
      </div>
    </div>
  );
};
