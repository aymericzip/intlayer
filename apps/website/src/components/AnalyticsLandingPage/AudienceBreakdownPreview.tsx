import { BreakdownList } from '@intlayer/design-system/breakdown-list';
import {
  SwitchSelector,
  type SwitchSelectorChoices,
} from '@intlayer/design-system/switch-selector';
import {
  countryToFlag,
  getCountryName,
} from '@intlayer/design-system/world-map';
import { getLocaleName } from 'intlayer';
import { FileText, Globe, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { sampleCountries, sampleLocales, samplePages } from './sampleAudience';

type BreakdownTab = 'pages' | 'locales' | 'location';

/** Dashboard breakdowns backed by the landing page's fictional sessions. */
export const AudienceBreakdownPreview = () => {
  const content = useIntlayer('analytics-audience-breakdown');
  const { locale } = useLocale();
  const [tab, setTab] = useState<BreakdownTab>('pages');
  const choices: SwitchSelectorChoices<BreakdownTab> = [
    {
      value: 'pages',
      content: (
        <span className="flex items-center gap-1.5">
          <FileText className="size-3.5" aria-hidden />
          {content.tabPages}
        </span>
      ),
    },
    {
      value: 'locales',
      content: (
        <span className="flex items-center gap-1.5">
          <Globe className="size-3.5" aria-hidden />
          {content.tabLocales}
        </span>
      ),
    },
    {
      value: 'location',
      content: (
        <span className="flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden />
          {content.tabLocation}
        </span>
      ),
    },
  ];
  const rows =
    tab === 'location'
      ? sampleCountries.map((row) => ({
          ...row,
          label: (
            <>
              <span aria-hidden>{countryToFlag(row.key)}</span>
              <span className="truncate">
                {getCountryName(row.key, locale)}
              </span>
            </>
          ),
        }))
      : tab === 'locales'
        ? sampleLocales.map((row) => ({
            ...row,
            label: (
              <span className="truncate">{getLocaleName(row.key, locale)}</span>
            ),
          }))
        : samplePages.map((row) => ({
            ...row,
            label: (
              <span className="truncate font-mono" dir="ltr">
                {row.key}
              </span>
            ),
          }));

  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-2xl border border-neutral p-5">
      <SwitchSelector
        choices={choices}
        value={tab}
        onChange={setTab}
        color="text"
        size="sm"
        className="w-full"
      />
      <BreakdownList
        key={tab}
        rows={rows}
        usersLabel={content.usersLabel.value}
        viewsLabel={content.viewsLabel.value}
        emptyLabel={content.breakdownEmpty}
        metric={tab === 'location' ? 'users' : 'views'}
        locale={locale}
      />
    </div>
  );
};
