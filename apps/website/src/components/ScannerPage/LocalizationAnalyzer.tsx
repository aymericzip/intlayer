'use client';

import { useSession } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useRef, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { AnalyzerLoading } from './Analyzer/AnalyzerLoading';
import { AnalyzerForm } from './Analyzer/Form/AnalyzerForm';
import { useAnalyzerUrlSchema } from './Analyzer/Form/useAnalyzerUrlSchema';
import { AnalyzerResultsSection } from './AnalyzerResultsSection';
import { useLocalizationScan } from './useLocalizationScan';
import { useRecursiveScan } from './useRecursiveScan';

export const LocalizationAnalyzer: FC = () => {
  const { session } = useSession();
  const isLoggedIn = !!session;

  const { globalError: globalErrorMessage } = useIntlayer(
    'localization-analyzer'
  );

  const [externalError, setExternalError] = useState<string | null>(null);

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
  } = useLocalizationScan(globalErrorMessage.value);

  const {
    isRecursiveScanLoading,
    recursiveJobId,
    recursiveStatus,
    handleStartRecursiveAudit,
  } = useRecursiveScan(session, setExternalError);

  const isLoading = isSingleScanLoading || isRecursiveScanLoading;
  const error = scanError || externalError;

  const urlSchema = useAnalyzerUrlSchema();
  const analyzedUrlRef = useRef<string | null>(null);

  const { params } = useSearchParamState({
    auto_start: { type: 'boolean', fallbackValue: false },
    url: { type: 'string', fallbackValue: '' },
  });

  useEffect(() => {
    if (
      params.auto_start &&
      params.url &&
      analyzedUrlRef.current !== params.url &&
      !isLoading &&
      Object.keys(mergedData).length === 0
    ) {
      try {
        urlSchema.parse({ url: params.url });
      } catch (err) {
        setExternalError(`Invalid URL: ${err}`);
        return;
      }

      analyzedUrlRef.current = params.url;
      handleAnalyze(params.url);
    }
  }, [params.auto_start, params.url, isLoading, mergedData]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-6 text-center">
      <div className="flex w-full flex-col items-center gap-4">
        <AnalyzerForm
          onAnalyze={handleAnalyze}
          loading={isLoading}
          onCancel={handleCancel}
        />
      </div>

      {isSingleScanLoading && !recursiveJobId && (
        <AnalyzerLoading
          progress={progress}
          currentStep={stepsMessage ?? 'Analyzing...'}
        />
      )}

      <AnalyzerResultsSection
        domainData={domainData}
        score={score}
        mergedData={mergedData}
        url={params.url}
        isSingleScanLoading={isSingleScanLoading}
        recursiveJobId={recursiveJobId}
        recursiveStatus={recursiveStatus}
        isLoggedIn={isLoggedIn}
        handleStartRecursiveAudit={() => handleStartRecursiveAudit(params.url)}
      />

      {error && <p className="text-error">{error}</p>}
    </div>
  );
};
