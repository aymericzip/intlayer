---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getHTMLTextDir | intlayer
description: Zobacz, jak używać funkcji getHTMLTextDir w pakiecie intlayer
keywords:
  - getHTMLTextDir
  - tłumaczenie
  - Intlayer
  - intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
  - getHTMLTextDir
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getHTMLTextDir` w `intlayer`

## Opis

Funkcja `getHTMLTextDir` określa kierunek tekstu (`ltr`, `rtl` lub `auto`) na podstawie podanego locale. Została zaprojektowana, aby pomóc deweloperom ustawić atrybut `dir` w HTML dla prawidłowego renderowania tekstu.

## Parametry

- `locale?: Locales`
  - **Opis**: Ciąg znaków locale (np. `Locales.ENGLISH`, `Locales.ARABIC`) używany do określenia kierunku tekstu.
  - **Typ**: `Locales` (opcjonalny)

## Zwracana wartość

- **Typ**: `Dir` (`'ltr' | 'rtl' | 'auto'`)
- **Opis**: Kierunek tekstu odpowiadający locale:
  - `'ltr'` dla języków pisanych od lewej do prawej.
  - `'rtl'` dla języków pisanych od prawej do lewej.
  - `'auto'` jeśli locale nie jest rozpoznane.

## Przykład użycia

### Określanie kierunku tekstu

```typescript codeFormat="typescript"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Wynik: "ltr"
getHTMLTextDir(Locales.FRENCH); // Wynik: "ltr"
getHTMLTextDir(Locales.ARABIC); // Wynik: "rtl"
```

```javascript codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

getHTMLTextDir(Locales.ENGLISH); // Wynik: "ltr"
getHTMLTextDir(Locales.FRENCH); // Wynik: "ltr"
getHTMLTextDir(Locales.ARABIC); // Wynik: "rtl"
```

```javascript codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

getHTMLTextDir(Locales.ENGLISH); // Wynik: "ltr"
getHTMLTextDir(Locales.FRENCH); // Wynik: "ltr"
getHTMLTextDir(Locales.ARABIC); // Wynik: "rtl"
```

## Przypadki brzegowe

- **Brak podanego locale:**
  - Funkcja zwraca `'auto'`, gdy `locale` jest `undefined`.

- **Nieznane locale:**
  - Dla nieznanych locale funkcja domyślnie zwraca `'auto'`.

## Użycie w komponentach:

Funkcja `getHTMLTextDir` może być użyta do dynamicznego ustawienia atrybutu `dir` w dokumencie HTML, aby poprawnie renderować tekst w zależności od locale.

```tsx codeFormat="typescript"
import type { FC } from "react";
import { getHTMLTextDir, type Locales } from "intlayer";

export const HTMLLayout: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="esm"
import { getHTMLTextDir } from "intlayer";

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

```jsx codeFormat="commonjs"
const { getHTMLTextDir } = require("intlayer");

const HTMLLayout = ({ children, locale }) => (
  <html dir={getHTMLTextDir(locale)} locale={locale}>
    <body>{children}</body>
  </html>
);
```

W powyższym przykładzie atrybut `dir` jest dynamicznie ustawiany na podstawie lokalizacji (locale).
