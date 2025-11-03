'use client';
import { useIntlayer } from 'next-intlayer';
import { useEffect, useState } from 'react';
import AnalyzerLoading from './Analyzer/AnalyzerLoading';
import AnalyzerForm from './Analyzer/Form/AnalyzerForm';
import AnalyzerResults from './Analyzer/Results/AnalyzerResults';

export default function LocalizationAnalyzer() {
  const { title, steps, description, error } = useIntlayer(
    'localization-analyzer'
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  // Simule la progression
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

  const handleAnalyze = async (url: string) => {
    setLoading(true);
    setData(null);
    try {
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setData({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 p-6 text-center text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
      <h2 className="mb-6 max-w-5xl font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
        {title.value}
      </h2>
      <p className="mb-10 max-w-4xl text-lg text-neutral leading-relaxed sm:text-xl md:text-xl">
        {description.value}
      </p>

      <AnalyzerForm onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <AnalyzerLoading progress={progress} currentStep={currentStep} />
      )}

      {data && !loading && <AnalyzerResults data={data} url={''} />}
    </main>
  );
}
