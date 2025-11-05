---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getLocalizedUrl | intlayer
description: Zobacz, jak używać funkcji getLocalizedUrl w pakiecie intlayer
keywords:
  - getLocalizedUrl
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
  - getLocalizedUrl
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getLocalizedUrl` w `intlayer`

## Opis

Funkcja `getLocalizedUrl` generuje zlokalizowany URL, poprzedzając podany URL określonym prefiksem lokalizacji. Obsługuje zarówno adresy absolutne, jak i względne, zapewniając, że właściwy prefiks lokalizacji jest stosowany zgodnie z konfiguracją.

**Kluczowe cechy:**

- Wymagane są tylko 2 parametry: `url` oraz `currentLocale`
- 3 parametry opcjonalne: `locales`, `defaultLocale` oraz `prefixDefault`
- Używa konfiguracji internacjonalizacji Twojego projektu jako wartości domyślnych
- Może być używana z minimalną liczbą parametrów dla prostych przypadków lub w pełni dostosowana do złożonych scenariuszy

---

## Sygnatura funkcji

```typescript
getLocalizedUrl(
  url: string,                   // Wymagany
  currentLocale: Locales,        // Wymagany
  locales?: Locales[],           // Opcjonalny
  defaultLocale?: Locales,       // Opcjonalny
  prefixDefault?: boolean        // Opcjonalny
): string
```

---

## Parametry

### Parametry wymagane

- `url: string`
  - **Opis**: Oryginalny ciąg URL, który ma zostać poprzedzony prefiksem lokalizacji.
  - **Typ**: `string`
  - **Wymagany**: Tak

- `currentLocale: Locales`
  - **Opis**: Bieżący język, dla którego URL jest lokalizowany.
  - **Typ**: `Locales`
  - **Wymagany**: Tak

### Parametry opcjonalne

- `locales?: Locales[]`
  - **Opis**: Tablica obsługiwanych języków. Jeśli nie zostanie podana, używane są języki skonfigurowane w Twoim projekcie.
  - **Typ**: `Locales[]`
  - **Wymagany**: Nie (Opcjonalny)
  - **Domyślnie**: [`Konfiguracja projektu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)

- `defaultLocale?: Locales`
  - **Opis**: Domyślny język aplikacji. Jeśli nie zostanie podany, używany jest domyślny język skonfigurowany w Twoim projekcie.
  - **Typ**: `Locales`
  - **Wymagany**: Nie (Opcjonalny)
  - **Domyślnie**: [`Konfiguracja projektu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)

- `prefixDefault?: boolean`
  - **Opis**: Czy poprzedzać URL prefiksem dla domyślnego języka. Jeśli nie zostanie podane, używana jest wartość skonfigurowana w Twoim projekcie.
  - **Typ**: `boolean`
  - **Wymagany**: Nie (Opcjonalny)
  - **Domyślnie**: [`Konfiguracja projektu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)

### Zwraca

- **Typ**: `string`
- **Opis**: Lokalizowany URL dla określonego języka.

---

## Przykład użycia

### Podstawowe użycie (Tylko wymagane parametry)

Gdy skonfigurujesz swój projekt z ustawieniami internacjonalizacji, możesz użyć funkcji tylko z wymaganymi parametrami:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Używa konfiguracji Twojego projektu dla locales, defaultLocale i prefixDefault
getLocalizedUrl("/about", Locales.FRENCH);
// Wynik: "/fr/about" (zakładając, że francuski jest obsługiwany w Twojej konfiguracji)

getLocalizedUrl("/about", Locales.ENGLISH);
// Wynik: "/about" lub "/en/about" (w zależności od ustawienia prefixDefault)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Używa konfiguracji Twojego projektu
getLocalizedUrl("/about", Locales.FRENCH);
// Wynik: "/fr/about"
```

```javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Używa konfiguracji Twojego projektu
getLocalizedUrl("/about", Locales.FRENCH);
typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Jawne podanie wszystkich opcjonalnych parametrów
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Wynik: "/fr/about" dla lokalizacji francuskiej
// Wynik: "/about" dla domyślnej lokalizacji (angielskiej)
```

```javascript codeFormat="esm"
import { getLocalizedUrl, Locales } from "intlayer";

// Jawne podanie wszystkich opcjonalnych parametrów
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
javascript codeFormat="commonjs"
const { getLocalizedUrl, Locales } = require("intlayer");

// Jawne podanie wszystkich opcjonalnych parametrów
getLocalizedUrl(
  "/about",
  Locales.FRENCH,
  [Locales.ENGLISH, Locales.FRENCH], // locales
  Locales.ENGLISH, // defaultLocale
  false // prefixDefault
);

// Wynik: "/fr/about" dla lokalizacji francuskiej
// Wynik: "/about" dla domyślnej lokalizacji (angielskiej)
```

### Częściowe nadpisanie konfiguracji

Możesz również podać tylko niektóre z opcjonalnych parametrów. Funkcja użyje konfiguracji Twojego projektu dla wszystkich parametrów, których nie określisz:

```typescript codeFormat="typescript"
import { getLocalizedUrl, Locales } from "intlayer";

// Nadpisz tylko locales, użyj konfiguracji projektu dla defaultLocale i prefixDefault
getLocalizedUrl(
  "/about",
  Locales.SPANISH,
  [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH] // Określ tylko locales
);

// Nadpisz tylko prefixDefault, użyj konfiguracji projektu dla locales i defaultLocale
getLocalizedUrl(
  "/about",
  Locales.ENGLISH,
  undefined, // Użyj konfiguracji projektu dla locales
  undefined, // Użyj konfiguracji projektu dla defaultLocale
  true // Wymuś prefix dla domyślnej lokalizacji
);
```

### Adresy URL bezwzględne

```typescript
getLocalizedUrl(
  "https://example.com/about",
  Locales.FRENCH, // Aktualna lokalizacja
  [Locales.ENGLISH, Locales.FRENCH], // Obsługiwane lokalizacje
  Locales.ENGLISH, // Domyślna lokalizacja
  false // Prefix dla domyślnej lokalizacji
); // Wynik: "https://example.com/fr/about" dla francuskiego

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktualna lokalizacja
  [Locales.ENGLISH, Locales.FRENCH], // Obsługiwane lokalizacje
  Locales.ENGLISH, // Domyślna lokalizacja
  false // Prefix dla domyślnej lokalizacji
); // Wynik: "https://example.com/about" dla angielskiego

getLocalizedUrl(
  "https://example.com/about",
  Locales.ENGLISH, // Aktualna lokalizacja
  [Locales.ENGLISH, Locales.FRENCH], // Obsługiwane lokalizacje
  Locales.ENGLISH, // Domyślna lokalizacja
  true // Prefix dla domyślnej lokalizacji
); // Output: "https://example.com/en/about" dla angielskiego
```

### Nieobsługiwana lokalizacja

```typescript
getLocalizedUrl(
  "/about",
  Locales.ITALIAN, // Aktualna lokalizacja
  [Locales.ENGLISH, Locales.FRENCH], // Obsługiwane lokalizacje
  Locales.ENGLISH // Domyślna lokalizacja
); // Output: "/about" (brak prefiksu dla nieobsługiwanej lokalizacji)
```

---

## Przypadki brzegowe

- **Brak segmentu lokalizacji:**
  - Jeśli URL nie zawiera segmentu lokalizacji, funkcja bezpiecznie dodaje odpowiedni prefiks lokalizacji.

- **Domyślna lokalizacja:**
  - Gdy `prefixDefault` jest `false`, funkcja nie dodaje prefiksu do URL dla domyślnej lokalizacji.

- **Nieobsługiwane lokalizacje:**
  - Dla lokalizacji nie wymienionych w `locales`, funkcja nie stosuje żadnego prefiksu.

---

## Użycie w aplikacjach

W aplikacji wielojęzycznej, skonfigurowanie ustawień internacjonalizacji za pomocą `locales` i `defaultLocale` jest kluczowe dla zapewnienia wyświetlania właściwego języka. Poniżej znajduje się przykład, jak `getLocalizedUrl` może być użyte w konfiguracji aplikacji:

```tsx codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

// Konfiguracja obsługiwanych lokalizacji oraz lokalizacji domyślnej
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
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

Powyższa konfiguracja zapewnia, że aplikacja rozpoznaje `ENGLISH`, `FRENCH` oraz `SPANISH` jako obsługiwane języki i używa `ENGLISH` jako języka domyślnego.

Dzięki tej konfiguracji funkcja `getLocalizedUrl` może dynamicznie generować zlokalizowane adresy URL w oparciu o preferencje językowe użytkownika:

```typescript
getLocalizedUrl("/about", Locales.FRENCH); // Output: "/fr/about"
getLocalizedUrl("/about", Locales.SPANISH); // Output: "/es/about"
getLocalizedUrl("/about", Locales.ENGLISH); // Output: "/about"
```

Integrując `getLocalizedUrl`, deweloperzy mogą utrzymać spójną strukturę adresów URL w wielu językach, co poprawia zarówno doświadczenie użytkownika, jak i SEO.
