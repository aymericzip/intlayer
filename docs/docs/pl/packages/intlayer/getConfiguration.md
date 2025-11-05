---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Dokumentacja funkcji getConfiguration | intlayer
description: Zobacz, jak używać funkcji getConfiguration w pakiecie intlayer
keywords:
  - getConfiguration
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
  - getConfiguration
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `getConfiguration` w `intlayer`

## Opis

Funkcja `getConfiguration` pobiera całą konfigurację aplikacji `intlayer` poprzez wyodrębnienie zmiennych środowiskowych. Funkcja ta zapewnia elastyczność użycia tej samej konfiguracji zarówno po stronie klienta, jak i serwera, gwarantując spójność w całej aplikacji.

---

## Parametry

Funkcja nie przyjmuje żadnych parametrów. Zamiast tego wykorzystuje zmienne środowiskowe do konfiguracji.

### Zwraca

- **Typ**: `IntlayerConfig`
- **Opis**: Obiekt zawierający pełną konfigurację dla `intlayer`. Konfiguracja obejmuje następujące sekcje:
  - `internationalization`: Ustawienia związane z lokalizacjami i trybem ścisłym.
  - `middleware`: Ustawienia związane z zarządzaniem URL i ciasteczkami.
  - `content`: Ustawienia dotyczące plików treści, katalogów i wzorców.
  - `editor`: Konfiguracje specyficzne dla edytora.

Zobacz [dokumentację konfiguracji Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md) po więcej szczegółów.

---

## Przykład użycia

### Pobieranie pełnej konfiguracji

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Wyjście:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const config = getConfiguration();
console.log(config);
// Wyjście:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const config = getConfiguration();
console.log(config);
// Wyjście:
// {
//   internationalization: { ... },
//   middleware: { ... },
//   content: { ... },
//   editor: { ... }
// }
```

### Pobieranie `availableLocales` i `defaultLocale`

Sekcja `internationalization` konfiguracji zawiera ustawienia związane z lokalizacją, takie jak `locales` (dostępne lokalizacje) oraz `defaultLocale` (język domyślny).

```typescript codeFormat="typescript"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

javascript;
console.log(availableLocales); // Przykładowe wyjście: ["en", "fr", "es"]
console.log(defaultLocale); // Przykładowe wyjście: "en"
console.log(cookieName); // Wyjście: "INTLAYER_LOCALE"
```

```javascript codeFormat="esm"
import { getConfiguration } from "intlayer";

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Przykładowe wyjście: ["en", "fr", "es"]
console.log(defaultLocale); // Przykładowe wyjście: "en"
console.log(cookieName); // Wyjście: "INTLAYER_LOCALE"
```

```javascript codeFormat="commonjs"
const { getConfiguration } = require("intlayer");

const { internationalization, middleware } = getConfiguration();
const { locales: availableLocales, defaultLocale } = internationalization;
const { cookieName } = middleware;

console.log(availableLocales); // Przykładowe wyjście: ["en", "fr", "es"]
console.log(defaultLocale); // Przykładowe wyjście: "en"
console.log(cookieName); // Wyjście: "INTLAYER_LOCALE"
```

## Uwagi

- Upewnij się, że wszystkie wymagane zmienne środowiskowe są poprawnie ustawione przed wywołaniem tej funkcji. Brakujące zmienne spowodują błędy podczas inicjalizacji.
- Ta funkcja może być używana zarówno po stronie klienta, jak i serwera, co czyni ją wszechstronnym narzędziem do zarządzania konfiguracjami w sposób zunifikowany.

## Zastosowanie w aplikacjach

Funkcja `getConfiguration` jest podstawowym narzędziem do inicjalizacji i zarządzania konfiguracją aplikacji `intlayer`. Zapewniając dostęp do ustawień takich jak lokalizacje, middleware oraz katalogi z zawartością, gwarantuje spójność i skalowalność w aplikacjach wielojęzycznych i opartych na treściach.
