---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Dokumentacja funkcji t | express-intlayer
description: Zobacz, jak używać funkcji t w pakiecie express-intlayer
keywords:
  - t
  - tłumaczenie
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Express
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - express-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: funkcja `t` w `express-intlayer`

Funkcja `t` w pakiecie `express-intlayer` jest podstawowym narzędziem do dostarczania zlokalizowanych odpowiedzi w Twojej aplikacji Express. Upraszcza internacjonalizację (i18n) poprzez dynamiczny wybór treści na podstawie preferowanego języka użytkownika.

---

## Przegląd

Funkcja `t` służy do definiowania i pobierania tłumaczeń dla określonego zestawu języków. Automatycznie ustala odpowiedni język do zwrócenia na podstawie ustawień żądania klienta, takich jak nagłówek `Accept-Language`. Jeśli preferowany język nie jest dostępny, funkcja płynnie przełącza się na domyślną lokalizację określoną w Twojej konfiguracji.

---

## Kluczowe cechy

- **Dynamiczna lokalizacja**: Automatycznie wybiera najbardziej odpowiednie tłumaczenie dla klienta.
- **Powrót do domyślnej lokalizacji**: W przypadku braku preferowanego języka klienta, następuje powrót do domyślnej lokalizacji, zapewniając ciągłość doświadczenia użytkownika.
- **Lekka i szybka**: Zaprojektowana z myślą o aplikacjach o wysokiej wydajności, zapewniając minimalne obciążenie.
- **Obsługa trybu ścisłego**: Wymuszanie ścisłego przestrzegania zadeklarowanych lokalizacji dla niezawodnego działania.

---

## Sygnatura funkcji

```typescript
t(translations: Record<string, string>): string;
```

### Parametry

- `translations`: Obiekt, w którym kluczami są kody lokalizacji (np. `en`, `fr`, `es-MX`), a wartościami odpowiadające im przetłumaczone ciągi znaków.

### Zwraca

- Ciąg znaków reprezentujący zawartość w preferowanym języku klienta.

---

## Ładowanie obsługi żądań internacjonalizacji

Aby zapewnić poprawne działanie funkcjonalności internacjonalizacji dostarczanej przez `express-intlayer`, **musisz** załadować middleware internacjonalizacji na początku swojej aplikacji Express. To umożliwia funkcji `t` oraz zapewnia prawidłowe wykrywanie lokalizacji i tłumaczenie.

Umieść middleware `app.use(intlayer())` **przed jakimikolwiek trasami** w swojej aplikacji, aby zapewnić, że wszystkie trasy korzystają z internacjonalizacji:

```typescript {7} fileName="src/index.ts" codeFormat="typescript"
import express, { type Express } from "express";
import { intlayer } from "express-intlayer";

const app: Express = express();

// Załaduj obsługę żądań internacjonalizacji
app.use(intlayer());

// Zdefiniuj swoje trasy po załadowaniu middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.mjs" codeFormat="esm"
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

// Załaduj obsługę żądań internacjonalizacji
app.use(intlayer());

// Zdefiniuj swoje trasy po załadowaniu middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

```javascript {7} fileName="src/index.cjs" codeFormat="commonjs"
const express = require("express");
const { intlayer } = require("express-intlayer");

const app = express();

// Załaduj obsługę żądań internacjonalizacji
app.use(intlayer());

// Zdefiniuj swoje trasy po załadowaniu middleware
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
    })
  );
});
```

### Dlaczego to jest wymagane

- **Wykrywanie lokalizacji**: Middleware `intlayer` przetwarza przychodzące żądania, aby wykryć preferowaną lokalizację użytkownika na podstawie nagłówków, ciasteczek lub innych skonfigurowanych metod.
- **Kontekst tłumaczenia**: Ustawia niezbędny kontekst dla funkcji `t`, aby działała poprawnie, zapewniając zwracanie tłumaczeń w odpowiednim języku.
- **Zapobieganie błędom**: Bez tego middleware użycie funkcji `t` spowoduje błędy w czasie wykonywania, ponieważ nie będzie dostępna niezbędna informacja o lokalizacji.

---

## Przykłady użycia

### Podstawowy przykład

Serwowanie zlokalizowanej zawartości w różnych językach:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/", (_req, res) => {
  res.send(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      es: "¡Bienvenido!",
    })
  );
});
```

**Żądania klientów:**

- Klient z nagłówkiem `Accept-Language: fr` otrzyma `Bienvenue!`.
- Klient z nagłówkiem `Accept-Language: es` otrzyma `¡Bienvenido!`.
- Klient z nagłówkiem `Accept-Language: de` otrzyma `Welcome!` (domyślna lokalizacja).

### Obsługa błędów

Dostarczanie komunikatów o błędach w wielu językach:

```typescript fileName="src/index.ts" codeFormat="typescript"
javascript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/error", (_req, res) => {
  res.status(500).send(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      es: "Ocurrió un error inesperado.",
    })
  );
});
```

---

### Używanie wariantów lokalizacyjnych

Określ tłumaczenia dla wariantów specyficznych dla lokalizacji:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
app.get("/greet", (_req, res) => {
  res.send(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      "es-MX": "¡Hola, amigo!",
      "es-ES": "¡Hola!",
    })
  );
});
```

---

## Zaawansowane tematy

### Mechanizm zapasowy (Fallback)

Jeśli preferowana lokalizacja nie jest dostępna, funkcja `t` automatycznie użyje lokalizacji domyślnej zdefiniowanej w konfiguracji:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {5-6} fileName="intlayer.config.mjs" codeFormat="esm"
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

```javascript {5-6} fileName="intlayer.config.cjs" codeFormat="commonjs"
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

Na przykład:

- Jeśli `defaultLocale` to `Locales.CHINESE`, a klient zażąda `Locales.DUTCH`, zwrócone tłumaczenie będzie domyślnie wartością `Locales.CHINESE`.
- Jeśli `defaultLocale` nie jest zdefiniowane, funkcja `t` automatycznie użyje wartości `Locales.ENGLISH`.

---

### Wymuszanie trybu ścisłego

Skonfiguruj funkcję `t`, aby wymusić ścisłe przestrzeganie zadeklarowanych lokalizacji:

| Tryb        | Zachowanie                                                                                                        |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| `strict`    | Wszystkie zadeklarowane lokalizacje muszą mieć dostępne tłumaczenia. Brakujące lokalizacje spowodują błędy.       |
| `inclusive` | Zadeklarowane lokalizacje muszą mieć tłumaczenia. Brakujące lokalizacje wywołują ostrzeżenia, ale są akceptowane. |
| `loose`     | Akceptowana jest dowolna istniejąca lokalizacja, nawet jeśli nie została zadeklarowana.                           |

Przykład konfiguracji:

```typescript {7} fileName="intlayer.config.ts" codeFormat="typescript"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Twoja istniejąca konfiguracja
  internationalization: {
    // ... Twoja istniejąca konfiguracja internacjonalizacji
    strictMode: "strict", // Wymuś tryb ścisły
  },
} satisfies IntlayerConfig;

export default config;
```

```javascript {7} fileName="intlayer.config.mjs" codeFormat="esm"
import { type IntlayerConfig } from "intlayer";

const config = {
  // ... Twoja istniejąca konfiguracja
  internationalization: {
    // ... Twoja istniejąca konfiguracja internacjonalizacji
    strictMode: "strict", // Wymuś tryb ścisły
  },
};

export default config;
```

```javascript {7} fileName="intlayer.config.cjs" codeFormat="commonjs"
/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Twoja istniejąca konfiguracja
  internationalization: {
    // ... Twoja istniejąca konfiguracja internacjonalizacji
    strictMode: "strict", // Wymuś tryb ścisły
  },
};

module.exports = config;
```

---

### Integracja z TypeScript

Funkcja `t` jest bezpieczna typowo, gdy używana jest z TypeScript. Zdefiniuj typowo bezpieczny obiekt tłumaczeń:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "express-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import { type LanguageContent } from "express-intlayer";

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const { type LanguageContent } = require("express-intlayer");

/** @type {import('express-intlayer').LanguageContent<string>} */
const translations = {
  en: "Good morning!",
  fr: "Bonjour!",
  es: "¡Buenos días!",
};

app.get("/morning", (_req, res) => {
  res.send(t(translations));
});
```

---

### Typowe błędy i rozwiązywanie problemów

| Problem                    | Przyczyna                                       | Rozwiązanie                                                      |
| -------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| Funkcja `t` nie działa     | Middleware nie został załadowany                | Upewnij się, że `app.use(intlayer())` jest dodane przed trasami. |
| Błąd brakujących tłumaczeń | Włączony tryb ścisły bez wszystkich lokalizacji | Dostarcz wszystkie wymagane tłumaczenia.                         |

---

## Wskazówki dotyczące efektywnego użycia

1. **Centralizuj tłumaczenia**: Używaj scentralizowanego modułu lub plików JSON do zarządzania tłumaczeniami, aby poprawić łatwość utrzymania.
2. **Weryfikuj tłumaczenia**: Upewnij się, że każda wersja językowa ma odpowiadające tłumaczenie, aby uniknąć niepotrzebnego cofania się do domyślnego języka.
3. **Łącz z i18n frontendowym**: Synchronizuj z międzynarodowymi ustawieniami frontendu, aby zapewnić spójne doświadczenie użytkownika w całej aplikacji.
4. **Testuj wydajność**: Sprawdzaj czasy odpowiedzi aplikacji po dodaniu tłumaczeń, aby zapewnić minimalny wpływ na wydajność.

---

## Podsumowanie

Funkcja `t` jest potężnym narzędziem do internacjonalizacji backendu. Dzięki jej efektywnemu wykorzystaniu możesz stworzyć bardziej inkluzywną i przyjazną dla użytkownika aplikację dla globalnej publiczności. Dla zaawansowanego użycia i szczegółowych opcji konfiguracji, zapoznaj się z [dokumentacją](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).
