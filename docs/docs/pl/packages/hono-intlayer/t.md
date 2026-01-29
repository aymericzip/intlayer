---
createdAt: 2024-12-02
updatedAt: 2025-06-29
title: Dokumentacja Funkcji t | hono-intlayer
description: Zobacz jak używać funkcji t dla pakietu hono-intlayer
keywords:
  - t
  - tłumaczenie
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - Hono
  - JavaScript
slugs:
  - doc
  - packages
  - hono-intlayer
  - t
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inicjalizacja historii
---

# Dokumentacja: Funkcja `t` w `hono-intlayer`

Funkcja `t` w pakiecie `hono-intlayer` jest podstawowym narzędziem do dostarczania zlokalizowanych odpowiedzi w Twojej aplikacji Hono. Upraszcza internacjonalizację (i18n) poprzez dynamiczne wybieranie treści na podstawie preferowanego języka użytkownika.

---

## Przegląd

Funkcja `t` służy do definiowania i pobierania tłumaczeń dla danego zestawu języków. Automatycznie określa odpowiedni język do zwrócenia na podstawie ustawień żądania klienta, takich jak nagłówek `Accept-Language`. Jeśli preferowany język jest niedostępny, funkcja płynnie powraca do domyślnego ustawienia regionalnego określonego w konfiguracji.

---

## Kluczowe Cechy

- **Dynamiczna Lokalizacja**: Automatycznie wybiera najbardziej odpowiednie tłumaczenie dla klienta.
- **Powrót do Domyślnego Ustawienia Regionalnego**: Wraca do domyślnego języka, jeśli preferowany język klienta nie jest dostępny, zapewniając ciągłość doświadczenia użytkownika.
- **Lekka i Szybka**: Zaprojektowana dla aplikacji o wysokiej wydajności, zapewniając minimalny narzut.
- **Obsługa Trybu Ścisłego**: Wymusza ścisłe przestrzeganie zadeklarowanych ustawień regionalnych dla niezawodnego zachowania.

---

## Sygnatura Funkcji

```typescript
t(translations: Record<string, string>): string;
```

### Parametry

- `translations`: Obiekt, w którym kluczami są kody ustawień regionalnych (np. `en`, `fr`, `pl`), a wartościami są odpowiadające im przetłumaczone ciągi znaków.

### Zwraca

- Ciąg znaków reprezentujący treść w preferowanym języku klienta.

---

## Ładowanie Obsługi Żądań Internacjonalizacji

Aby zapewnić poprawne działanie funkcji internacjonalizacji dostarczanych przez `hono-intlayer`, **musisz** załadować oprogramowanie pośredniczące (middleware) internacjonalizacji na początku swojej aplikacji Hono. Umożliwia to działanie funkcji `t` i zapewnia prawidłową obsługę wykrywania języka i tłumaczenia.

Umieść oprogramowanie pośredniczące `app.use("*", intlayer())` **przed jakimikolwiek trasami** w swojej aplikacji, aby upewnić się, że wszystkie trasy korzystają z internacjonalizacji:

```typescript {6} fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Załaduj obsługę żądań internacjonalizacji
app.use("*", intlayer());

// Zdefiniuj trasy po załadowaniu oprogramowania pośredniczącego
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pl: "Witaj świecie!",
    })
  );
});
```

```javascript {6} fileName="src/index.mjs" codeFormat="esm"
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

// Załaduj obsługę żądań internacjonalizacji
app.use("*", intlayer());

// Zdefiniuj trasy po załadowaniu oprogramowania pośredniczącego
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pl: "Witaj świecie!",
    })
  );
});
```

```javascript {6} fileName="src/index.cjs" codeFormat="commonjs"
const { Hono } = require("hono");
const { intlayer, t } = require("hono-intlayer");

const app = new Hono();

// Załaduj obsługę żądań internacjonalizacji
app.use("*", intlayer());

// Zdefiniuj trasy po załadowaniu oprogramowania pośredniczącego
app.get("/", (c) => {
  return c.text(
    t({
      en: "Hello, World!",
      fr: "Bonjour le monde!",
      es: "¡Hola, Mundo!",
      pl: "Witaj świecie!",
    })
  );
});
```

### Dlaczego Jest To Wymagane

- **Wykrywanie Języka**: Middleware `intlayer` przetwarza przychodzące żądania w celu wykrycia preferowanego języka użytkownika na podstawie nagłówków, plików cookie lub innych skonfigurowanych metod.
- **Kontekst Tłumaczenia**: Ustawia niezbędny kontekst, aby funkcja `t` działała poprawnie, zapewniając zwracanie tłumaczeń w odpowiednim języku.
- **Zapobieganie Błędom**: Bez tego oprogramowania pośredniczącego użycie funkcji `t` spowoduje błędy wykonania, ponieważ niezbędne informacje o języku nie będą dostępne.

---

## Przykłady Użycia

### Podstawowy Przykład

Serwuj zlokalizowaną treść w różnych językach:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/", (c) => {
  return c.text(
    t({
      en: "Welcome!",
      fr: "Bienvenue!",
      pl: "Witaj!",
    })
  );
});
```

**Żądania Klienta:**

- Klient z `Accept-Language: fr` otrzyma `Bienvenue!`.
- Klient z `Accept-Language: pl` otrzyma `Witaj!`.
- Klient z `Accept-Language: de` otrzyma `Welcome!` (domyślny język).

### Obsługa Błędów

Dostarczaj komunikaty o błędach w wielu językach:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/error", (c) => {
  return c.text(
    t({
      en: "An unexpected error occurred.",
      fr: "Une erreur inattendue s'est produite.",
      pl: "Wystąpił nieoczekiwany błąd.",
    }),
    500
  );
});
```

---

### Używanie Wariantów Językowych

Określ tłumaczenia dla specyficznych wariantów językowych:

```typescript fileName="src/index.ts" codeFormat="typescript"
app.get("/greet", (c) => {
  return c.text(
    t({
      en: "Hello!",
      "en-GB": "Hello, mate!",
      fr: "Bonjour!",
      pl: "Cześć!",
    })
  );
});
```

---

## Zaawansowane Tematy

### Mechanizm Powrotny (Fallback)

Jeśli preferowany język jest niedostępny, funkcja `t` powróci do domyślnego języka zdefiniowanego w konfiguracji:

```typescript {5-6} fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.POLISH],
    defaultLocale: Locales.ENGLISH,
  },
} satisfies IntlayerConfig;

export default config;
```

---

### Wymuszanie Trybu Ścisłego

Skonfiguruj funkcję `t`, aby wymusić ścisłe przestrzeganie zadeklarowanych języków:

| Tryb        | Zachowanie                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `strict`    | Wszystkie zadeklarowane języki muszą mieć tłumaczenia. Brakujące języki spowodują błędy.                |
| `inclusive` | Zadeklarowane języki muszą mieć tłumaczenia. Brakujące języki wywołują ostrzeżenia, ale są akceptowane. |
| `loose`     | Dowolny istniejący język jest akceptowany, nawet jeśli nie został zadeklarowany.                        |

---

### Integracja z TypeScript

Funkcja `t` jest bezpieczna pod względem typów (type-safe) w przypadku użycia z TypeScript. Zdefiniuj bezpieczny obiekt tłumaczeń:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { type LanguageContent } from "hono-intlayer";

const translations: LanguageContent<string> = {
  en: "Good morning!",
  fr: "Bonjour!",
  pl: "Dzień dobry!",
};

app.get("/morning", (c) => {
  return c.text(t(translations));
});
```

---

### Typowe Błędy i Rozwiązywanie Problemów

| Problem                    | Przyczyna                                   | Rozwiązanie                                                      |
| -------------------------- | ------------------------------------------- | ---------------------------------------------------------------- |
| Funkcja `t` nie działa     | Middleware nie został załadowany            | Upewnij się, że `app.use("*", intlayer())` dodano przed trasami. |
| Błąd brakujących tłumaczeń | Tryb ścisły włączony bez wszystkich języków | Dostarcz wszystkie wymagane tłumaczenia.                         |

---

## Podsumowanie

Funkcja `t` jest potężnym narzędziem do internacjonalizacji backendu. Używając jej efektywnie, możesz stworzyć bardziej inkluzywną i przyjazną dla użytkownika aplikację dla globalnej publiczności. Więcej informacji na temat zaawansowanego użytkowania i szczegółowych opcji konfiguracji można znaleźć w [dokumentacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md).
