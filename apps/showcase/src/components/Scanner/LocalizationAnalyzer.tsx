import { type FC, useEffect, useMemo, useRef, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useSearchParamState } from '#/hooks/useSearchParamState';
import { AnalyzerLoading } from './Analyzer/AnalyzerLoading';
import { AnalyzerForm } from './Analyzer/Form/AnalyzerForm';
import { useAnalyzerUrlSchema } from './Analyzer/Form/useAnalyzerUrlSchema';
import { AnalyzerResultsSection } from './AnalyzerResultsSection';
import { useLocalizationScan } from './useLocalizationScan';

export const LocalizationAnalyzer: FC = () => {
  const { globalError } = useIntlayer('localization-analyzer');

  const [externalError, setExternalError] = useState<string | null>(null);

  const {
    error: scanError,
    isSingleScanLoading,
    progress,
    stepsMessage,
    score,
    domainData,
    mergedData,
    cachedAt,
    handleAnalyze,
    handleCancel,
  } = useLocalizationScan(globalError?.value);

  const isLoading = isSingleScanLoading;
  const error = scanError || externalError;

  const scannedUrl = useMemo(() => {
    const urlKey = Object.keys(mergedData).find((key) => key.includes('\\'));

    if (!urlKey) return '';

    const separator = urlKey.indexOf('\\');
    return separator >= 0 ? urlKey.slice(separator + 1) : '';
  }, [mergedData]);

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
  }, [
    params.auto_start,
    params.url,
    isLoading,
    mergedData,
    urlSchema,
    handleAnalyze,
  ]);

  return (
    <div className="flex w-full flex-col items-center justify-center py-6 text-center">
      <div className="flex w-full flex-col items-center gap-4">
        <AnalyzerForm
          onAnalyze={handleAnalyze}
          loading={isLoading}
          onCancel={handleCancel}
        />
      </div>

      {isSingleScanLoading && (
        <AnalyzerLoading
          progress={progress}
          currentStep={stepsMessage ?? 'Analyzing...'}
        />
      )}

      <AnalyzerResultsSection
        domainData={domainData}
        score={score}
        mergedData={mergedData}
        url={scannedUrl || params.url}
        isSingleScanLoading={isSingleScanLoading}
        cachedAt={cachedAt}
        onRerun={() =>
          handleAnalyze(scannedUrl || params.url, { refresh: true })
        }
      />

      {error && <p className="text-error">{error}</p>}
    </div>
  );
};
