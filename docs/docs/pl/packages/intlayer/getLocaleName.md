---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getLocaleName | intlayer
description: Zobacz, jak używać funkcji getLocaleName w pakiecie intlayer
keywords:
  - getLocaleName
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
  - getLocaleName
history:
  - version: 7.5.0
    date: 2025-12-18
    changes: Dodaj polyfills dla React Native i starszych środowisk
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getLocaleName` w `intlayer`

## Opis

Funkcja `getLocaleName` zwraca zlokalizowaną nazwę podanego locale (`targetLocale`) w locale wyświetlającym (`displayLocale`). Jeśli `targetLocale` nie jest podany, zwraca nazwę `displayLocale` w jego własnym języku.

## Parametry

- `displayLocale: Locales`
  - **Opis**: Locale, w którym zostanie wyświetlona nazwa docelowego locale.
  - **Typ**: Enum lub string reprezentujący poprawne locale.

- `targetLocale?: Locales`
  - **Opis**: Locale, którego nazwa ma zostać zlokalizowana.
  - **Typ**: Opcjonalny. Enum lub string reprezentujący poprawne locale.

## Zwraca

- **Typ**: `string`
- **Opis**: Zlokalizowana nazwa `targetLocale` w `displayLocale`, lub własna nazwa `displayLocale`, jeśli `targetLocale` nie jest podany. Jeśli nie znaleziono tłumaczenia, zwraca `"Unknown locale"`.

## Przykład użycia

```typescript codeFormat="typescript"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Output: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Output: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Output: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Output: "English"

getLocaleName(Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Output: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Output: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Output: "French"

getLocaleName(Locales.CHINESE); // Output: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Output: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Output: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Output: "Chinese"

getLocaleName("unknown-locale"); // Output: "Unknown locale"
```

```javascript codeFormat="esm"
import { Locales, getLocaleName } from "intlayer";

getLocaleName(Locales.ENGLISH); // Wynik: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Wynik: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Wynik: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Wynik: "English"

getLocaleName(Locales.FRENCH); // Wynik: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Wynik: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Wynik: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Wynik: "French"

getLocaleName(Locales.CHINESE); // Wynik: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Wynik: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Wynik: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Wynik: "Chinese"

getLocaleName("unknown-locale"); // Wynik: "Unknown locale"
```

```javascript codeFormat="commonjs"
const { Locales, getLocaleName } = require("intlayer");

getLocaleName(Locales.ENGLISH); // Wynik: "English"
getLocaleName(Locales.ENGLISH, Locales.FRENCH); // Wynik: "Anglais"
getLocaleName(Locales.ENGLISH, Locales.ESPANOL); // Wynik: "Inglés"
getLocaleName(Locales.ENGLISH, Locales.ENGLISH); // Wynik: "English"

getLocaleName(Locales.FRENCH); // Wynik: "Français"
getLocaleName(Locales.FRENCH, Locales.FRENCH); // Wynik: "Français"
getLocaleName(Locales.FRENCH, Locales.ESPANOL); // Wynik: "Francés"
getLocaleName(Locales.FRENCH, Locales.ENGLISH); // Wynik: "French"

getLocaleName(Locales.CHINESE); // Wynik: "中文"
getLocaleName(Locales.CHINESE, Locales.FRENCH); // Wynik: "Chinois"
getLocaleName(Locales.CHINESE, Locales.ESPANOL); // Wynik: "Chino"
getLocaleName(Locales.CHINESE, Locales.ENGLISH); // Wynik: "Chinese"

getLocaleName("unknown-locale"); // Wynik: "Unknown locale"
```

## Przypadki brzegowe

- **Brak podanego `targetLocale`:**
  - Funkcja domyślnie zwraca własną nazwę `displayLocale`.
- **Brakujące tłumaczenia:**
  - Jeśli `localeNameTranslations` nie zawiera wpisu dla `targetLocale` lub konkretnego `displayLocale`, funkcja korzysta z `ownLocalesName` lub zwraca `"Unknown locale"`.

## Polyfills dla React Native i starszych środowisk

Funkcja `getLocaleName` zależy od API `Intl.DisplayNames`, które nie jest dostępne w React Native lub starszych środowiskach JavaScript. Jeśli używasz `getLocaleName` w tych środowiskach, musisz dodać polyfills.

Zaimportuj polyfills wcześnie w swojej aplikacji, najlepiej w pliku punktu wejścia (np. `index.js`, `App.tsx` lub `main.tsx`):

```typescript
import "intl";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-displaynames/polyfill";
```

Aby uzyskać więcej szczegółów, zobacz [dokumentację polyfills FormatJS](https://formatjs.io/docs/polyfills/intl-displaynames/).
