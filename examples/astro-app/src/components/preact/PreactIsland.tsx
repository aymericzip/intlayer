/** @jsxImportSource preact */

import { getLocaleName, getLocalizedUrl, type LocalesValues } from 'intlayer';
import { useState } from 'preact/hooks';
import { IntlayerProvider, useIntlayer, useLocale } from 'preact-intlayer';

function LocaleSwitcher() {
  const { switchLocale } = useIntlayer('preact-demo');

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
      <span class="switcher-label">{switchLocale}:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale ? 'active' : ''}`}
          >
            <div class="ls-item-left">
              <span class="ls-own-name">{getLocaleName(localeItem)}</span>
              <span class="ls-current-name">
                {getLocaleName(localeItem, locale)}
              </span>
            </div>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PreactDemo() {
  const [count, setCount] = useState(0);
  const { greeting, description, counter, increment } =
    useIntlayer('preact-demo');

  return (
    <div class="demo-container">
      <h2 class="greeting">{greeting}</h2>
      <p class="description">{description}</p>
      <div class="counter-section">
        <p class="counter-text">{counter({ count })}</p>
        <button class="btn-primary" onClick={() => setCount((c) => c + 1)}>
          {increment}
        </button>
      </div>
      <LocaleSwitcher />
    </div>
  );
}

export function PreactIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <PreactDemo />
    </IntlayerProvider>
  );
}
