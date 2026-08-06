import { A, useLocation } from '@solidjs/router';
import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
} from 'intlayer';
import { useIntlayer, useLocale } from 'solid-intlayer';
import { type Component, For } from 'solid-js';

/**
 * Switches the locale using real anchors, so every language of the current page
 * is a crawlable link and can be opened in a new tab.
 *
 * The `<A>` navigation is what changes the rendered locale (the `[[locale]]`
 * route derives it from the URL); `setLocale` only persists the choice in the
 * `INTLAYER_LOCALE` cookie so a later visit to a locale-free URL resolves to the
 * same language.
 */
export const LocaleSwitcher: Component = () => {
  const content = useIntlayer('locale-switcher');
  const location = useLocation();
  const { locale, setLocale, availableLocales } = useLocale();

  /** Canonical (locale-free) path of the page currently displayed. */
  const pathWithoutLocale = () => getPathWithoutLocale(location.pathname);

  return (
    <div>
      <button
        aria-label={content.label.value}
        popoverTarget="localePopover"
        type="button"
      >
        {getLocaleName(locale())}
      </button>
      <div id="localePopover" popover="auto">
        <For each={availableLocales}>
          {(localeItem) => (
            <A
              dir={getHTMLTextDir(localeItem)}
              // Exact match only, so the default-locale link is not flagged
              // active on every page
              end
              href={getLocalizedUrl(pathWithoutLocale(), localeItem)}
              hreflang={localeItem}
              lang={localeItem}
              onClick={() => setLocale(localeItem)}
              // Ensures the "go back" browser button returns to the previous page
              replace
            >
              {/* Language in its own locale — e.g. Français */}
              {getLocaleName(localeItem)}
            </A>
          )}
        </For>
      </div>
    </div>
  );
};
