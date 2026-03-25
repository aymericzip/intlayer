import { useLocation } from '@tanstack/solid-router';
import { getLocaleName, getPathWithoutLocale, getPrefix } from 'intlayer';
import { useIntlayer, useLocale } from 'solid-intlayer';
import { For } from 'solid-js';
import { Link, type To } from './LocalizedLink';

export const LocaleSwitcher = () => {
  const content = useIntlayer('locale-switcher');
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <h2 class="m-0 flex-shrink-0 font-semibold text-base tracking-tight">
            <Link
              aria-current={localeEl === locale() ? 'page' : undefined}
              aria-label={
                content().localeSwitcherLabel({
                  language: getLocaleName(localeEl),
                }).value
              }
              onClick={() => setLocale(localeEl)}
              params={{ locale: getPrefix(localeEl).localePrefix }}
              to={pathWithoutLocale() as To}
              class="brand-pill"
              activeProps={{
                class: 'brand-pill opacity-50 pointer-events-none',
              }}
            >
              {getLocaleName(localeEl)}
            </Link>
          </h2>
        )}
      </For>
    </div>
  );
};
