/** @jsxImportSource react */

import { getLocaleName, getLocalizedUrl, type LocalesValues } from 'intlayer';
import { useState } from 'react';
import { IntlayerProvider, useIntlayer, useLocale } from 'react-intlayer';

function LocaleSwitcher() {
  const { switchLocale } = useIntlayer('react-demo');

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div className="locale-switcher">
      <span className="switcher-label">{switchLocale}:</span>
      <div className="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            className={`locale-btn ${localeItem === locale ? 'active' : ''}`}
          >
            <div className="ls-item-left">
              <span className="ls-own-name">{getLocaleName(localeItem)}</span>
              <span className="ls-current-name">
                {getLocaleName(localeItem, locale)}
              </span>
            </div>
            <span className="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ReactDemo() {
  const [count, setCount] = useState(0);
  const { greeting, description, counter, increment } =
    useIntlayer('react-demo');

  return (
    <div className="demo-container">
      <h2 className="greeting">{greeting}</h2>
      <p className="description">{description}</p>
      <div className="counter-section">
        <p className="counter-text">{counter({ count })}</p>
        <button className="btn-primary" onClick={() => setCount((c) => c + 1)}>
          {increment}
        </button>
      </div>
      <LocaleSwitcher />
    </div>
  );
}

export function ReactIsland({ locale }: { locale: LocalesValues }) {
  return (
    <IntlayerProvider locale={locale}>
      <ReactDemo />
    </IntlayerProvider>
  );
}
