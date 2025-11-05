---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja hooka useLocale | react-intlayer
description: Zobacz, jak używać hooka useLocale w pakiecie react-intlayer
keywords:
  - useLocale
  - słownik
  - klucz
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - react-intlayer
  - useLocale
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Integracja z React: Dokumentacja hooka `useLocale`

Ta sekcja zawiera szczegółowe informacje o hooku `useLocale` z biblioteki `react-intlayer`, zaprojektowanym do zarządzania lokalizacją w aplikacjach React.

## Importowanie `useLocale` w React

Aby zintegrować hook `useLocale` z aplikacją React, zaimportuj go z odpowiedniego pakietu:

```typescript codeFormat="typescript"
import { useLocale } from "react-intlayer"; // Używane w komponentach React do zarządzania lokalizacją
```

```javascript codeFormat="esm"
import { useLocale } from "react-intlayer"; // Używane w komponentach React do zarządzania lokalizacją
```

```javascript codeFormat="commonjs"
const { useLocale } = require("react-intlayer"); // Używane w komponentach React do zarządzania lokalizacją
```

## Przegląd

Hook `useLocale` oferuje prosty sposób na dostęp i manipulację ustawieniami lokalizacji w komponentach React. Zapewnia dostęp do bieżącej lokalizacji, domyślnej lokalizacji, wszystkich dostępnych lokalizacji oraz funkcji do aktualizacji ustawień lokalizacji.

## Użycie

Oto jak można użyć hooka `useLocale` w komponencie React:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktualna lokalizacja: {locale}</h1>
      <p>Domyślna lokalizacja: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktualna lokalizacja: {locale}</h1>
      <p>Domyślna lokalizacja: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { locale, defaultLocale, availableLocales, setLocale } = useLocale();

  return (
    <div>
      <h1>Aktualna lokalizacja: {locale}</h1>
      <p>Domyślna lokalizacja: {defaultLocale}</p>
      <select value={locale} onChange={(e) => setLocale(e.target.value)}>
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
```

## Parametry i wartości zwracane

Gdy wywołujesz hook `useLocale`, zwraca on obiekt zawierający następujące właściwości:

- **`locale`**: Aktualna lokalizacja ustawiona w kontekście React.
- **`defaultLocale`**: Główna lokalizacja zdefiniowana w konfiguracji.
- **`availableLocales`**: Lista wszystkich dostępnych lokalizacji zdefiniowanych w konfiguracji.
- **`setLocale`**: Funkcja do aktualizacji bieżącej lokalizacji w kontekście aplikacji.

## Przykład

Ten przykład pokazuje komponent, który używa hooka `useLocale` do renderowania przełącznika lokalizacji, pozwalającego użytkownikom dynamicznie zmieniać lokalizację aplikacji:

```tsx fileName="src/components/LocaleSelector.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useLocale } from "react-intlayer";

const LocaleSelector: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.mjx" codeFormat="esm"
import { useLocale } from "react-intlayer";

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

```jsx fileName="src/components/LocaleSelector.csx" codeFormat="commonjs"
const { useLocale } = require("react-intlayer");

const LocaleSelector = () => {
  const { locale, setLocale, availableLocales } = useLocale();

  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <select value={locale} onChange={(e) => handleLocaleChange(e.target.value)}>
      {availableLocales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
};
```

## Podsumowanie

Hook `useLocale` z pakietu `react-intlayer` jest niezbędnym narzędziem do zarządzania lokalizacjami w Twoich aplikacjach React, zapewniając funkcjonalność potrzebną do skutecznego dostosowania aplikacji do różnych międzynarodowych odbiorców.
