import type { FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type { PageDetectionResult } from '../../detector/types';

/** Locales discovered on the page + locale cookies/storage entries. */
export const LocalesSection: FunctionComponent<{
  detection: PageDetectionResult;
}> = ({ detection }) => {
  const { empty, urlLocalePrefix } = useIntlayer('locales-section');
  const hasLocales = detection.detectedLocales.length > 0;
  const hasStorage = detection.localeStorageEntries.length > 0;

  if (!hasLocales && !hasStorage && !detection.urlLocalePrefix) {
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
      {detection.urlLocalePrefix && (
        <div className="wrap-anywhere mt-1 text-neutral text-xs">
          {urlLocalePrefix}{' '}
          <code className="font-mono text-[11px]">
            /{detection.urlLocalePrefix}/
          </code>
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
