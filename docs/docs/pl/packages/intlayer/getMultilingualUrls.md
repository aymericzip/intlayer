---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getMultilingualUrls | intlayer
description: Zobacz, jak używać funkcji getMultilingualUrls w pakiecie intlayer
keywords:
  - getMultilingualUrls
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
  - getMultilingualUrls
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getMultilingualUrls` w `intlayer`

## Opis

Funkcja `getMultilingualUrls` generuje mapowanie wielojęzycznych URL-i, poprzedzając podany URL każdym obsługiwanym językiem (locale). Może obsługiwać zarówno URL-e bezwzględne, jak i względne, stosując odpowiedni prefiks językowy na podstawie dostarczonej konfiguracji lub wartości domyślnych.

---

## Parametry

- `url: string`
  - **Opis**: Oryginalny ciąg URL, który ma zostać poprzedzony prefiksami językowymi.
  - **Typ**: `string`

- `locales: Locales[]`
  - **Opis**: Opcjonalna tablica obsługiwanych języków. Domyślnie używa skonfigurowanych języków w projekcie.
  - **Typ**: `Locales[]`
  - **Domyślnie**: `localesDefault`

- `defaultLocale: Locales`
  - **Opis**: Domyślny język aplikacji. Domyślnie używa skonfigurowanego domyślnego języka w projekcie.
  - **Typ**: `Locales`
  - **Domyślnie**: `defaultLocaleDefault`

- `prefixDefault: boolean`
  - **Opis**: Czy poprzedzać domyślny język prefiksem. Domyślnie używa skonfigurowanej wartości w projekcie.
  - **Typ**: `boolean`
  - **Domyślnie**: `prefixDefaultDefault`

### Zwracana wartość

- **Typ**: `IConfigLocales<string>`
- **Opis**: Obiekt mapujący każdy język na odpowiadający mu wielojęzyczny URL.

---

## Przykład użycia

### URL-e względne

```typescript codeFormat="typescript"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Wynik: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="esm"
import { getMultilingualUrls, Locales } from "intlayer";

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Wynik: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

```javascript codeFormat="commonjs"
const { getMultilingualUrls, Locales } = require("intlayer");

getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  false
);
// Wynik: {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL-e bezwzględne

```typescript
getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH],
  Locales.ENGLISH,
  true
);
// Wynik: {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard"
// }
```

---

## Przypadki brzegowe

- **Brak segmentu językowego:**
  - Funkcja usuwa wszelkie istniejące segmenty lokalizacji z URL przed wygenerowaniem mapowań wielojęzycznych.

- **Domyślna lokalizacja:**
  - Gdy `prefixDefault` jest `false`, funkcja nie dodaje prefiksu do URL dla domyślnej lokalizacji.

- **Nieobsługiwane lokalizacje:**
  - Tylko lokalizacje podane w tablicy `locales` są brane pod uwagę przy generowaniu URL-i.

---

## Użycie w aplikacjach

W aplikacji wielojęzycznej konfiguracja ustawień internacjonalizacji z `locales` i `defaultLocale` jest kluczowa dla zapewnienia wyświetlania właściwego języka. Poniżej znajduje się przykład, jak `getMultilingualUrls` może być użyte w konfiguracji aplikacji:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguracja obsługiwanych lokalizacji i domyślnej lokalizacji
export default {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguracja dla obsługiwanych lokalizacji i domyślnej lokalizacji
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfiguracja dla obsługiwanych lokalizacji i domyślnej lokalizacji
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Powyższa konfiguracja zapewnia, że aplikacja rozpoznaje `ENGLISH`, `FRENCH` oraz `SPANISH` jako obsługiwane języki i używa `ENGLISH` jako języka zapasowego.

Dzięki tej konfiguracji funkcja `getMultilingualUrls` może dynamicznie generować mapowania wielojęzycznych URL-i na podstawie obsługiwanych lokalizacji aplikacji:

```typescript
getMultilingualUrls(
  "/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH
);
// Wynik:
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

getMultilingualUrls(
  "https://example.com/dashboard",
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  Locales.ENGLISH,
  true
);
// Wynik:
// {
//   en: "https://example.com/en/dashboard",
//   fr: "https://example.com/fr/dashboard",
//   es: "https://example.com/es/dashboard"
// }
```

Integrując `getMultilingualUrls`, deweloperzy mogą utrzymać spójną strukturę URL-i w wielu językach, co poprawia zarówno doświadczenie użytkownika, jak i SEO.
