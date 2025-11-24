---
createdAt: 2025-11-16
updatedAt: 2025-11-16
title: Dokumentacja funkcji getPrefix | intlayer
description: Zobacz, jak używać funkcji getPrefix w pakiecie intlayer
keywords:
  - getPrefix
  - prefix
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
  - getPrefix
history:
  - version: 7.1.0
    date: 2025-11-16
    changes: Pierwotna dokumentacja
---

# Dokumentacja: funkcja `getPrefix` w `intlayer`

## Opis

Funkcja `getPrefix` określa prefiks URL dla podanego locale na podstawie konfiguracji trybu routingu. Porównuje locale z domyślnym locale i zwraca obiekt zawierający trzy różne formaty prefiksów dla elastycznego budowania URL.

**Kluczowe cechy:**

- Przyjmuje locale jako pierwszy parametr (wymagany)
- Opcjonalny obiekt `options` z `defaultLocale` i `mode`
- Zwraca obiekt z właściwościami `prefix` i `localePrefix`
- Obsługuje wszystkie tryby routingu: `prefix-no-default`, `prefix-all`, `no-prefix` oraz `search-params`
- Lekka funkcja pomocnicza do określania, kiedy dodać prefiksy locale

---

## Sygnatura funkcji

```typescript
getPrefix(
  locale: Locales,               // Wymagany
  options?: {                    // Opcjonalny
    defaultLocale?: Locales;
    mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params';
  }
): GetPrefixResult

type GetPrefixResult = {
  prefix: string;   // np. 'fr/' lub ''
  localePrefix?: Locale; // np. 'fr' lub undefined
}
```

---

## Parametry

- `locale: Locales`
  - **Opis**: Locale, dla którego generowany jest prefiks. Jeśli wartość jest fałszywa (undefined, null, pusty ciąg znaków), funkcja zwraca pusty ciąg znaków.
  - **Typ**: `Locales`
  - **Wymagany**: Tak

- `options?: object`
  - **Opis**: Obiekt konfiguracyjny do określania prefiksu.
  - **Typ**: `object`
  - **Wymagany**: Nie (Opcjonalny)

  - `options.defaultLocale?: Locales`
    - **Opis**: Domyślne locale aplikacji. Jeśli nie zostanie podane, używane jest domyślne locale skonfigurowane w Twoim projekcie.
    - **Typ**: `Locales`
    - **Domyślnie**: [`Konfiguracja projektu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)

  - `options.mode?: 'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Opis**: Tryb routingu URL dla obsługi locale. Jeśli nie zostanie podany, używany jest tryb skonfigurowany w Twoim projekcie.
    - **Typ**: `'prefix-no-default' | 'prefix-all' | 'no-prefix' | 'search-params'`
    - **Domyślnie**: [`Konfiguracja projektu`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md#middleware)
    - **Tryby**:
      - `prefix-no-default`: Zwraca pusty ciąg, gdy locale odpowiada domyślnemu locale
      - `prefix-all`: Zwraca prefiks dla wszystkich locale, w tym domyślnego
      - `no-prefix`: Zwraca pusty ciąg (brak prefiksu w URL)
      - `search-params`: Zwraca pusty ciąg (locale w parametrach zapytania)

### Zwraca

- **Typ**: `GetPrefixResult`
- **Opis**: Obiekt zawierający trzy różne formaty prefiksu:
  - `prefix`: Prefiks ścieżki z ukośnikiem na końcu (np. `'fr/'`, `''`)
  - `localePrefix`: Identyfikator locale bez ukośników (np. `'fr'`, `undefined`)

---

## Przykład użycia

### Podstawowe użycie

```typescript codeFormat="typescript"
import { getPrefix, Locales } from "intlayer";

// Sprawdź prefiks dla locale angielskiego
getPrefix(Locales.ENGLISH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-all",
});
// Zwraca: { prefix: 'en/', localePrefix: 'en' }

// Sprawdź prefiks dla locale francuskiego
getPrefix(Locales.FRENCH, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});
// Zwraca: { prefix: 'fr/', localePrefix: 'fr' }
```

```javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
javascript codeFormat="esm"
import { getPrefix, Locales } from "intlayer";

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Zwraca: { prefix: '', localePrefix: undefined }
```

```javascript codeFormat="commonjs"
const { getPrefix, Locales } = require("intlayer");

getPrefix(Locales.ENGLISH, { mode: "prefix-all" });
// Zwraca: { prefix: '', localePrefix: undefined }
```

### Różne tryby routingu

```typescript
import { getPrefix, Locales } from "intlayer";

// prefix-all: Zawsze zwraca prefiks
getPrefix(Locales.ENGLISH, {
  mode: "prefix-all",
  defaultLocale: Locales.ENGLISH,
});
// Zwraca: { prefix: '/en', localePrefix: 'en' }

// prefix-no-default: Brak prefiksu, gdy locale jest zgodne z domyślnym
getPrefix(Locales.ENGLISH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Zwraca: { prefix: '', localePrefix: undefined }

// prefix-no-default: Zwraca prefiks, gdy locale różni się od domyślnego
getPrefix(Locales.FRENCH, {
  mode: "prefix-no-default",
  defaultLocale: Locales.ENGLISH,
});
// Zwraca: { prefix: 'fr/', localePrefix: 'fr' }

// no-prefix & search-params: Nigdy nie zwraca prefiksu
getPrefix(Locales.ENGLISH, { mode: "no-prefix" });
// Zwraca: { prefix: '', localePrefix: undefined }

getPrefix(Locales.ENGLISH, { mode: "search-params" });
// Zwraca: { prefix: '', localePrefix: undefined }
```

### Praktyczny przykład

```typescript
import { getPrefix, Locales } from "intlayer";

// Budowanie URL z odpowiednim prefiksem dla konkretnego locale
const locale = Locales.FRENCH;
const { prefix, localePrefix } = getPrefix(locale, {
  defaultLocale: Locales.ENGLISH,
  mode: "prefix-no-default",
});

// Używanie prefiksu do konstrukcji ścieżki
const url1 = `/${prefix}about`.replace(/\/+/g, "/");
// Wynik: "/fr/about"

// Używanie localePrefix do identyfikacji locale
console.log(`Aktualne locale: ${localePrefix}`);
// Wyjście: "Aktualne locale: fr"
```

---

## Powiązane funkcje

- [`getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getLocalizedUrl.md): Generuje zlokalizowany URL dla konkretnego locale
- [`getMultilingualUrls`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getMultilingualUrls.md): Generuje URL-e dla wszystkich skonfigurowanych locale

---

## TypeScript

```typescript
type GetPrefixResult = {
  prefix: string; // Prefiks ścieżki z końcowym ukośnikiem (np. 'fr/' lub '')
  localePrefix?: Locale; // Identyfikator locale bez ukośników (np. 'fr' lub undefined)
};

function getPrefix(
  locale: Locales,
  options?: {
    defaultLocale?: Locales;
    mode?: "prefix-no-default" | "prefix-all" | "no-prefix" | "search-params";
  }
): GetPrefixResult;
```
