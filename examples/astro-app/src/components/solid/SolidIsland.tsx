/** @jsxImportSource solid-js */

import { getLocaleName, getLocalizedUrl, type LocalesValues } from 'intlayer';
import { IntlayerProvider, useIntlayer, useLocale } from 'solid-intlayer';
import { createSignal } from 'solid-js';

function LocaleSwitcher() {
  const content = useIntlayer('solid-demo');
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">{content().switchLocale}:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale() ? 'active' : ''}`}
          >
            <div class="ls-item-left">
              <span class="ls-own-name">{getLocaleName(localeItem)}</span>
              <span class="ls-current-name">
                {getLocaleName(localeItem, locale())}
              </span>
            </div>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SolidDemo() {
  const [count, setCount] = createSignal(0);
  const content = useIntlayer('solid-demo');

  return (
    <div class="demo-container">
      <h2 class="greeting">{content().greeting}</h2>
      <p class="description">{content().description}</p>
      <div class="counter-section">
        <p class="counter-text">{content().counter({ count: count() })}</p>
        <button class="btn-primary" onClick={() => setCount((c) => c + 1)}>
          {content().increment}
        </button>
      </div>
      <LocaleSwitcher />
    </div>
  );
}

export function SolidIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <SolidDemo />
    </IntlayerProvider>
  );
}
