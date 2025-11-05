---
createdAt: 2025-08-23
updatedAt: 2025-10-09
title: Dokumentacja hooka useLocale | next-intlayer
description: Zobacz, jak używać hooka useLocale w pakiecie next-intlayer
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
  - next-intlayer
  - useLocale
history:
  - version: 6.2.0
    date: 2025-10-09
    changes: Dodano dokumentację hooka `useLocale` z opcją `onLocaleChange`
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Integracja z Next.js: Dokumentacja hooka `useLocale` dla `next-intlayer`

Ta sekcja zawiera szczegółową dokumentację hooka `useLocale` dostosowanego do aplikacji Next.js w bibliotece `next-intlayer`. Jest on zaprojektowany do efektywnego zarządzania zmianami lokalizacji oraz routingiem.

## Importowanie `useLocale` w Next.js

Aby użyć hooka `useLocale` w swojej aplikacji Next.js, zaimportuj go w następujący sposób:

```javascript
import { useLocale } from "next-intlayer"; // Używany do zarządzania lokalizacjami i routingiem w Next.js
```

## Użycie

Oto jak zaimplementować hook `useLocale` w komponencie Next.js:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
"use client";

import { Locales } from "intlayer";
import { useLocale } from "next-intlayer";

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
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales } = require("intlayer");
const { useLocale } = require("next-intlayer");

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
```

## Parametry

Hook `useLocale` akceptuje następujące parametry:

- **`onLocaleChange`**: Ciąg znaków określający, jak adres URL powinien być aktualizowany po zmianie lokalizacji. Może przyjmować wartości `"replace"`, `"push"` lub `"none"`.

  > Weźmy przykład:
  >
  > 1. Jesteś na `/fr/home`
  > 2. Przechodzisz do `/fr/about`
  > 3. Przełączasz się na `/es/about`
  > 4. Klikasz przycisk "wstecz" w przeglądarce
  >
  > Zachowanie będzie różne w zależności od wartości `onLocaleChange`:
  >
  > - `undefined`: (domyślnie) Aktualizuje tylko lokalizację w kontekście klienta i ustawia cookie, bez zmiany adresu URL.
  >   -> Przycisk "wstecz" przeniesie do `/fr/home`
  > - `"replace"`: Zastępuje bieżący adres URL nowym, zlokalizowanym adresem URL, i ustawia cookie.
  >   -> Przycisk "wstecz" przeniesie do `/es/home`
  > - `"push"`: Dodaje nowy, zlokalizowany adres URL do historii przeglądarki i ustawia cookie.
  >   -> Przycisk "wstecz" przeniesie do `/fr/about`
  > - `(locale) => void`: Ustawia cookie i wywołuje niestandardową funkcję, która zostanie wywołana po zmianie lokalizacji.
  >
  >   Opcja `undefined` jest domyślnym zachowaniem, ponieważ zalecamy używanie komponentu `Link` do nawigacji do nowej lokalizacji.
  >   Przykład:
  >
  >   ```tsx
  >   <Link href="/es/about" replace>
  >     About
  >   </Link>
  >   ```

## Wartości zwracane

Po wywołaniu hooka `useLocale` zwraca on obiekt zawierający następujące właściwości:

- **`locale`**: Bieżąca lokalizacja ustawiona w kontekście React.
- **`defaultLocale`**: Główna lokalizacja zdefiniowana w konfiguracji.
- **`availableLocales`**: Lista wszystkich dostępnych lokalizacji zdefiniowanych w konfiguracji.
- **`setLocale`**: Funkcja do zmiany lokalizacji aplikacji i odpowiedniej aktualizacji adresu URL. Obsługuje zasady dotyczące prefiksów, czy dodać lokalizację do ścieżki, czy nie, w zależności od konfiguracji. Wykorzystuje `useRouter` z `next/navigation` do funkcji nawigacyjnych takich jak `push` i `refresh`.
- **`pathWithoutLocale`**: Właściwość obliczana, która zwraca ścieżkę bez lokalizacji. Jest przydatna do porównywania adresów URL. Na przykład, jeśli bieżąca lokalizacja to `fr`, a adres URL to `fr/my_path`, ścieżka bez lokalizacji to `/my_path`. Wykorzystuje `usePathname` z `next/navigation` do pobrania bieżącej ścieżki.

## Podsumowanie

Hook `useLocale` z `next-intlayer` jest kluczowym narzędziem do zarządzania lokalizacjami w aplikacjach Next.js. Oferuje zintegrowane podejście do dostosowywania aplikacji do wielu lokalizacji, obsługując przechowywanie lokalizacji, zarządzanie stanem oraz modyfikacje adresów URL w sposób płynny.
