'use client';
import { useEffect, useState } from 'react';
import AnalyzerForm from './Analyzer/AnalyzerForm';
import AnalyzerLoading from './Analyzer/AnalyzerLoading';
import AnalyzerResults from './Analyzer/AnalyzerResults';

export default function LocalizationAnalyzer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const analysisSteps = [
    'Fetching and parsing HTML...',
    'Analyzing linguistic structure...',
    'Checking hreflang and metadata...',
    'Detecting language selector...',
    'Analyzing SEO multilanguage...',
    'Calculating localization score...',
  ];

  // Simule la progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      let step = 0;
      timer = setInterval(() => {
        setProgress((p) => Math.min(p + Math.random() * 8 + 8, 98));
        if (step < analysisSteps.length) {
          setCurrentStep(analysisSteps[step]);
          step++;
        }
      }, 1000);
    } else {
      setProgress(100);
    }
    return () => clearInterval(timer);
  }, [loading]);

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setData({ error: 'Unable to analyze site.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-6 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
      <h1 className="mb-8 text-center font-extrabold text-4xl text-neutral-900 dark:text-neutral-100">
        Localization Score Analyzer
      </h1>

      <AnalyzerForm onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <AnalyzerLoading progress={progress} currentStep={currentStep} />
      )}

      {data && !loading && <AnalyzerResults data={data} url={''} />}
    </main>
  );
}
