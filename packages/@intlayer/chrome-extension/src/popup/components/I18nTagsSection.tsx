import type { ComponentChildren, FunctionComponent } from 'preact';
import { useIntlayer } from 'preact-intlayer';
import type { PageDetectionResult } from '../../detector/types';
import { StatusIcon } from './StatusIcon';

const TagRow: FunctionComponent<{
  label: ComponentChildren;
  isValid: boolean;
  value?: ComponentChildren;
}> = ({ label, isValid, value }) => (
  <li className="flex items-baseline gap-2">
    <StatusIcon status={isValid ? 'success' : 'error'} />
    <span className="font-medium">{label}</span>
    {value !== undefined && (
      <span className="ml-auto max-w-[55%] truncate text-neutral text-xs">
        {value}
      </span>
    )}
  </li>
);

/** SEO i18n tags found in the page head (lang, dir, canonical, hreflang…). */
export const I18nTagsSection: FunctionComponent<{
  detection: PageDetectionResult;
}> = ({ detection }) => {
  const { missing, present, tagsCount, localizedInternalLinks } =
    useIntlayer('i18n-tags-section');

  return (
    <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
      <TagRow
        label="html lang"
        isValid={Boolean(detection.htmlLang)}
        value={detection.htmlLang ?? missing}
      />
      <TagRow
        label="html dir"
        isValid={Boolean(detection.htmlDir)}
        value={detection.htmlDir ?? missing}
      />
      <TagRow
        label="canonical"
        isValid={Boolean(detection.canonicalHref)}
        value={detection.canonicalHref ? present : missing}
      />
      <TagRow
        label="hreflang"
        isValid={detection.hreflangs.length > 0}
        value={
          detection.hreflangs.length > 0
            ? tagsCount({ count: detection.hreflangs.length })
            : missing
        }
      />
      <TagRow
        label="x-default"
        isValid={detection.hasXDefault}
        value={detection.hasXDefault ? present : missing}
      />
      <TagRow
        label="og:locale"
        isValid={Boolean(detection.ogLocale)}
        value={detection.ogLocale ?? missing}
      />
      {detection.internalAnchorCount > 0 && (
        <TagRow
          label={localizedInternalLinks}
          isValid={detection.localizedAnchorCount > 0}
          value={`${detection.localizedAnchorCount}/${detection.internalAnchorCount}`}
        />
      )}
    </ul>
  );
};
