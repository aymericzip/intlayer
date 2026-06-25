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
    changes: "Inicjalizacja historii"
author: aymericzip
---

# Dokumentacja: funkcja `getMultilingualUrls` w `intlayer`

## Opis

Funkcja `getMultilingualUrls` generuje mapowanie wielojęzycznych adresów URL poprzez dodanie prefiksu dla każdej obsługiwanej lokalizacji. Może obsługiwać zarówno bezwzględne jak i względne adresy URL, stosując odpowiedni prefiks lokalizacji na podstawie podanej konfiguracji lub wartości domyślnych.

**Kluczowe cechy:**

- Wymagany jest tylko 1 parametr: `url`
- Opcjonalny obiekt `options` z `locales`, `defaultLocale` i `mode`
- Wykorzystuje konfigurację internacjonalizacji Twojego projektu jako wartości domyślne
- Obsługuje wiele trybów routingu: `prefix-no-default`, `prefix-all`, `no-prefix` i `search-params`
- Zwraca obiekt mapowania ze wszystkimi lokalizacjami jako kluczami i odpowiadającymi im adresami URL jako wartościami

---

## Opis

Funkcja `getMultilingualUrls` generuje mapowanie wielojęzycznych URL-i, poprzedzając podany URL każdym obsługiwanym językiem (locale). Może obsługiwać zarówno URL-e bezwzględne, jak i względne, stosując odpowiedni prefiks językowy na podstawie dostarczonej konfiguracji lub wartości domyślnych.

---

## Parametry

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

### Parametry opcjonalne

- `options?: object`
  - **Description**: Obiekt konfiguracyjny dla zachowania lokalizacji URL.
  - **Type**: `object`
  - **Required**: No (opcjonalnie)

  - `options.locales?: Locales[]`
    - **Description**: Tablica obsługiwanych locale'i. Jeśli nie zostanie podana, używa skonfigurowanych locale'i z konfiguracji projektu.
    - **Type**: `Locales[]`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)

  - `options.defaultLocale?: Locales`
    - **Description**: Domyślny locale dla aplikacji. Jeśli nie zostanie podany, używa skonfigurowanego domyślnego locale'a z konfiguracji projektu.
    - **Type**: `Locales`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Description**: Tryb routingu URL dla obsługi locale'i. Jeśli nie zostanie podany, używa skonfigurowanego trybu z konfiguracji projektu.
    - **Type**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Default**: [`Project Configuration`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)
    - **Modes**:
      - `prefix-no-default`: Brak prefiksu dla domyślnego locale'a, prefiks dla wszystkich innych
      - `prefix-all`: Prefiks dla wszystkich locale'i włącznie z domyślnym
      - `no-prefix`: Brak prefiksu locale'a w URL
      - `search-params`: Użyj parametrów zapytania dla locale'a (np. `?locale=fr`)

### Zwracana wartość

- **Typ**: `IConfigLocales<string>`
- **Opis**: Obiekt mapujący każdy język na odpowiadający mu wielojęzyczny URL.

---

## Przykład użycia

### Podstawowe użycie (Uses Project Configuration)

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls, Locales } from "intlayer";

// Używa konfiguracji projektu dla locales, defaultLocale i mode
getMultilingualUrls("/dashboard");
// Output (assuming project config has en, fr with mode 'prefix-no-default'):
// {
//   en: "/dashboard",
//   fr: "/fr/dashboard"
// }
```

### URL-e względne

```typescript codeFormat={["typescript", "esm", "commonjs"]}
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

### Różne tryby routingu

```typescript
// prefix-no-default: Brak prefiksu dla locale'a domyślnego
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Wynik: {
//   en: "/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// prefix-all: Prefiks dla wszystkich locale'ów
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Wynik: {
//   en: "/en/dashboard",
//   fr: "/fr/dashboard",
//   es: "/es/dashboard"
// }

// no-prefix: Brak prefiksu locale'a w URL-ach
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "no-prefix",
});
// Wynik: {
//   en: "/dashboard",
//   fr: "/dashboard",
//   es: "/dashboard"
// }

// search-params: Locale jako parametr zapytania
getMultilingualUrls("/dashboard", {
  locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  defaultLocale: Locales.ENGLISH,
  mode: "search-params",
});
// Wynik: {
//   en: "/dashboard?locale=en",
//   fr: "/dashboard?locale=fr",
//   es: "/dashboard?locale=es"
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

```tsx codeFormat={["typescript", "esm", "commonjs"]}
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
