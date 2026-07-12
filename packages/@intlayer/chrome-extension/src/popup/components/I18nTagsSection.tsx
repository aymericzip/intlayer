import type { FC, ReactNode } from 'react';
import type { PageDetectionResult } from '../../detector/types';

const TagRow: FC<{ label: string; ok: boolean; value?: ReactNode }> = ({
  label,
  ok,
  value,
}) => (
  <li className="tag-row">
    <span className={`status ${ok ? 'success' : 'error'}`}>
      {ok ? '✓' : '✗'}
    </span>
    <span className="tag-label">{label}</span>
    {value !== undefined && <span className="tag-value">{value}</span>}
  </li>
);

/** SEO i18n tags found in the page head (lang, dir, canonical, hreflang…). */
export const I18nTagsSection: FC<{ detection: PageDetectionResult }> = ({
  detection,
}) => (
  <ul className="tag-list">
    <TagRow
      label="html lang"
      ok={Boolean(detection.htmlLang)}
      value={detection.htmlLang ?? 'missing'}
    />
    <TagRow
      label="html dir"
      ok={Boolean(detection.htmlDir)}
      value={detection.htmlDir ?? 'missing'}
    />
    <TagRow
      label="canonical"
      ok={Boolean(detection.canonicalHref)}
      value={detection.canonicalHref ? 'present' : 'missing'}
    />
    <TagRow
      label="hreflang tags"
      ok={detection.hreflangs.length > 0}
      value={
        detection.hreflangs.length > 0
          ? `${detection.hreflangs.length} tags`
          : 'missing'
      }
    />
    <TagRow
      label="x-default"
      ok={detection.hasXDefault}
      value={detection.hasXDefault ? 'present' : 'missing'}
    />
    <TagRow
      label="og:locale"
      ok={Boolean(detection.ogLocale)}
      value={detection.ogLocale ?? 'missing'}
    />
    {detection.internalAnchorCount > 0 && (
      <TagRow
        label="localized internal links"
        ok={detection.localizedAnchorCount > 0}
        value={`${detection.localizedAnchorCount}/${detection.internalAnchorCount}`}
      />
    )}
  </ul>
);
