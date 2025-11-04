'use client';

import { extractErrorMessage } from '@intlayer/config/client';
import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useEffect, useRef, useState } from 'react';
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
  const eventSourceRef = useRef<EventSource | null>(null);
  const [partialSummary, setPartialSummary] = useState<Record<string, any>>({});
  const { params } = useSearchParamState({
    auto_start: { type: 'boolean', fallbackValue: false },
    url: { type: 'string', fallbackValue: '' },
  });

  // Cleanup EventSource on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!data && params.auto_start && params.url) {
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
    // Close any existing EventSource connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setLoading(true);
    setData(null);
    setError(null);
    setProgress(0);
    setCurrentStep('');
    setPartialSummary({});

    try {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_SCANNER_API_URL}?url=${encodeURIComponent(url)}`
      );
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          if (message.type === 'progress') {
            setProgress(message.progress);
            // Use the step index to get the localized step message
            if (message.step !== undefined && steps[message.step]) {
              setCurrentStep(steps[message.step]);
            } else if (message.message) {
              // Fallback to message from server if step index not available
              setCurrentStep(message.message);
            }
          } else if (message.type === 'data') {
            // Update partial summary as fields come in
            setPartialSummary((prev) => ({
              ...prev,
              [message.field]: message.value,
            }));
          } else if (message.type === 'complete') {
            setData(message.data);
            setPartialSummary(message.data.summary || {});
            setProgress(100);
            eventSource.close();
            eventSourceRef.current = null;
            setLoading(false);
          } else if (message.type === 'error') {
            setError(message.error || 'Failed to analyze site.');
            eventSource.close();
            eventSourceRef.current = null;
            setLoading(false);
          }
        } catch (err) {
          console.error('Failed to parse SSE message:', err);
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        setError('Connection error while analyzing site.');
        eventSource.close();
        eventSourceRef.current = null;
        setLoading(false);
      };
    } catch (error) {
      setData(null);
      setError(extractErrorMessage(error));
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-6 text-center">
      <AnalyzerForm onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <AnalyzerLoading progress={progress} currentStep={currentStep} />
      )}

      {(data ?? Object.keys(partialSummary).length > 0) && (
        <AnalyzerResults
          data={data ?? { summary: partialSummary }}
          url={params.url}
          loading={loading}
          partialSummary={partialSummary}
        />
      )}
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};
