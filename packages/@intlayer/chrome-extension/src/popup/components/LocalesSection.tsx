import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type {
  PageDetectionResult,
  RoutingDetection,
} from '../../detector/types';

/** How the page URL carries its locale, e.g. `/fr/`, `?lang=fr`, `fr.`. */
const getUrlLocaleMarker = ({
  strategy,
  urlLocale,
  searchParamName,
}: RoutingDetection): string | null => {
  if (!urlLocale) return null;
  if (strategy === 'prefix-all' || strategy === 'prefix-no-default') {
    return `/${urlLocale}/`;
  }
  if (strategy === 'search-params' && searchParamName) {
    return `?${searchParamName}=${urlLocale}`;
  }
  if (strategy === 'subdomain') return `${urlLocale}.`;
  return null;
};

/** Locales discovered on the page + locale cookies/storage entries. */
export const LocalesSection: FunctionComponent<{
  detection: PageDetectionResult;
}> = ({ detection }) => {
  const { empty, urlLocalePrefix } = useIntlayer('locales-section');
  const hasLocales = detection.detectedLocales.length > 0;
  const hasStorage = detection.localeStorageEntries.length > 0;
  const { routing } = detection;
  const urlLocaleMarker = getUrlLocaleMarker(routing);

  if (!hasLocales && !hasStorage && routing.strategy === 'unknown') {
    return <p className="m-0 text-neutral">{empty}</p>;
  }

  return (
    <div>
      {hasLocales && (
        <div className="mb-1.5 flex flex-wrap gap-1.5">
          {detection.detectedLocales.map((locale) => (
            <span
              key={locale}
              className="rounded-full bg-text/10 px-2 py-0.5 font-semibold text-xs"
            >
              {locale}
            </span>
          ))}
        </div>
      )}
      {routing.strategy !== 'unknown' && (
        <div
          className="wrap-anywhere mt-1 text-neutral text-xs"
          title={routing.evidence}
        >
          {urlLocaleMarker && (
            <>
              {urlLocalePrefix}{' '}
              <code className="font-mono text-[11px]">
                {urlLocaleMarker}
              </code>{' '}
            </>
          )}
          <code className="font-mono text-[11px]">
            routing: {routing.strategy}
          </code>
          {routing.defaultLocale && (
            <code className="font-mono text-[11px]">
              {' '}
              (default: {routing.defaultLocale})
            </code>
          )}
        </div>
      )}
      {detection.localeStorageEntries.map((entry) => (
        <div
          key={`${entry.source}-${entry.name}`}
          className="wrap-anywhere mt-1 text-neutral text-xs"
        >
          {entry.source}:{' '}
          <code className="font-mono text-[11px]">{entry.name}</code> ={' '}
          <code className="font-mono text-[11px]">{entry.value}</code>
        </div>
      ))}
    </div>
  );
};
