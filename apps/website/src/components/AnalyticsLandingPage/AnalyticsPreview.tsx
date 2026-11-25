import { lazy, Suspense } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { AudienceBreakdownPreview } from './AudienceBreakdownPreview';
import { sampleCountries } from './sampleAudience';

const WorldMap = lazy(() =>
  import('@intlayer/design-system/world-map').then((module) => ({
    default: module.WorldMap,
  }))
);

/** Dashboard world map illustrated with sample visitor counts. */
export const AnalyticsPreview = () => {
  const { audienceTitle, audienceText, sampleData, users } =
    useIntlayer('analytics-landing');
  const { locale } = useLocale();

  return (
    <figure className="mx-6 my-12 overflow-hidden rounded-3xl border border-neutral p-6 md:mx-12">
      <figcaption className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">{audienceTitle}</h2>
        <span className="text-sm text-text/60">{sampleData}</span>
      </figcaption>
      <p className="mb-8 max-w-3xl leading-relaxed text-text/70">
        {audienceText}
      </p>
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="min-w-0 xl:sticky xl:top-24">
          <Suspense
            fallback={
              <div className="aspect-960/470 animate-pulse rounded-xl bg-text/5" />
            }
          >
            <WorldMap
              rows={sampleCountries}
              locale={locale}
              usersLabel={users.value}
              chartLabel={audienceTitle.value}
            />
          </Suspense>
        </div>
        <AudienceBreakdownPreview />
      </div>
    </figure>
  );
};
