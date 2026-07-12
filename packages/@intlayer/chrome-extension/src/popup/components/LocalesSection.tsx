import type { FC } from 'react';
import type { PageDetectionResult } from '../../detector/types';

/** Locales discovered on the page + locale cookies/storage entries. */
export const LocalesSection: FC<{ detection: PageDetectionResult }> = ({
  detection,
}) => {
  const hasLocales = detection.detectedLocales.length > 0;
  const hasStorage = detection.localeStorageEntries.length > 0;

  if (!hasLocales && !hasStorage && !detection.urlLocalePrefix) {
    return <p className="empty-hint">No locale signal found on this page.</p>;
  }

  return (
    <div>
      {hasLocales && (
        <div className="locale-chips">
          {detection.detectedLocales.map((locale) => (
            <span key={locale} className="locale-chip">
              {locale}
            </span>
          ))}
        </div>
      )}
      {detection.urlLocalePrefix && (
        <div className="locale-detail">
          URL locale prefix: <code>/{detection.urlLocalePrefix}/</code>
        </div>
      )}
      {detection.localeStorageEntries.map((entry) => (
        <div key={`${entry.source}-${entry.name}`} className="locale-detail">
          {entry.source}: <code>{entry.name}</code> = <code>{entry.value}</code>
        </div>
      ))}
    </div>
  );
};
