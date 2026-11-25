import { lazy, Suspense, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { getSamplePageFlow, samplePageOptions } from './samplePageFlow';

const PageFlow = lazy(() =>
  import('@intlayer/design-system/page-flow').then((module) => ({
    default: module.PageFlow,
  }))
);

/** Interactive sample of the dashboard's URL navigation report. */
export const PageFlowPreview = () => {
  const { sampleData, flowTitle, flowText } = useIntlayer('analytics-landing');
  const { locale } = useLocale();
  const [startUrl, setStartUrl] = useState('/');

  return (
    <section className="mx-6 my-12 overflow-hidden rounded-3xl border border-neutral p-6 md:mx-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">{flowTitle}</h2>
        <p className="text-sm text-text/60">{sampleData}</p>
      </div>
      <p className="mb-8 max-w-3xl leading-relaxed text-text/70">{flowText}</p>
      <Suspense
        fallback={<div className="h-96 animate-pulse rounded-xl bg-text/5" />}
      >
        <PageFlow
          flow={getSamplePageFlow(startUrl)}
          startUrl={startUrl}
          onStartUrlChange={setStartUrl}
          pageOptions={samplePageOptions}
          locale={locale}
        />
      </Suspense>
    </section>
  );
};
