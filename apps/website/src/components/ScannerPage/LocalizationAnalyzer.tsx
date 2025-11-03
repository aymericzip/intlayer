'use client';

import { extractErrorMessage } from '@intlayer/config/client';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useState } from 'react';
import { useSearchParamState } from '@/hooks/useSearchParamState';
import { AnalyzerLoading } from './Analyzer/AnalyzerLoading';
import { AnalyzerForm } from './Analyzer/Form/AnalyzerForm';
import { useAnalyzerUrlSchema } from './Analyzer/Form/useAnalyzerUrlSchema';
import { AnalyzerResults } from './Analyzer/Results/AnalyzerResults';

export const LocalizationAnalyzer: FC = () => {
  const { steps } = useIntlayer('localization-analyzer');
  const [data, setData] = usePersistedStore<any>(
    'localization-analyzer-data',
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const urlSchema = useAnalyzerUrlSchema();
  const [currentStep, setCurrentStep] = useState('');
  const { params } = useSearchParamState({
    auto_start: { type: 'boolean', fallbackValue: false },
    url: { type: 'string', fallbackValue: '' },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      let step = 0;
      timer = setInterval(() => {
        setProgress((p) => Math.min(p + Math.random() * 8 + 8, 98));
        if (step < steps.length) {
          setCurrentStep(steps[step]);
          step++;
        }
      }, 1000);
    } else {
      setProgress(100);
    }
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (params.auto_start && params.url) {
      try {
        // Validate the URL (adjust schema call as needed)
        urlSchema.parse({ url: params.url }); // or urlSchema.parse(url)
      } catch (error) {
        setError(`Invalid URL: ${error}`);
        return;
      }

      handleAnalyze(params.url); // or decodeURIComponent(url) if necessary
    }
  }, [params.auto_start]);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      setData(null);

      setError(extractErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-6 text-center">
      <AnalyzerForm onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <AnalyzerLoading progress={progress} currentStep={currentStep} />
      )}

      {data && !loading && <AnalyzerResults data={data} url={''} />}
      {error && !loading && <p className="text-error">{error}</p>}
    </div>
  );
};
