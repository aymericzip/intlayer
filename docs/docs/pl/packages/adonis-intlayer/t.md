---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Dokumentacja funkcji t | adonis-intlayer
description: Zobacz, jak używać funkcji t w pakiecie adonis-intlayer
keywords:
  - t
  - tłumaczenie
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
  - AdonisJS
  - JavaScript
slugs:
  - doc
  - packages
  - adonis-intlayer
  - t
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Dokumentacja początkowa
---

# Dokumentacja: Funkcja `t` w `adonis-intlayer`

Funkcja `t` w pakiecie `adonis-intlayer` jest głównym narzędziem do dostarczania zlokalizowanych odpowiedzi w aplikacji AdonisJS. Upraszcza internacjonalizację (i18n) poprzez dynamiczne wybieranie treści na podstawie preferowanego języka użytkownika.

---

## Przegląd

Funkcja `t` służy do definiowania i pobierania tłumaczeń dla danego zestawu języków. Automatycznie określa odpowiedni język do zwrócenia na podstawie ustawień żądania klienta, takich jak nagłówek `Accept-Language`. Jeśli preferowany język jest niedostępny, płynnie powraca do domyślnego ustawienia regionalnego określonego w konfiguracji.

---

## Kluczowe cechy

- **Dynamiczna lokalizacja**: Automatycznie wybiera najbardziej odpowiednie tłumaczenie dla klienta.
- **Powrót do domyślnego ustawienia regionalnego (Fallback)**: Powraca do domyślnego ustawienia regionalnego, jeśli preferowany język klienta jest niedostępny, zapewniając ciągłość doświadczenia użytkownika.
- **Kontekst asynchroniczny**: Działa bezproblemowo w cyklu życia żądania AdonisJS przy użyciu Async Local Storage.
- **Wsparcie TypeScript**: Wymusza bezpieczeństwo typów dla Twoich tłumaczeń.

---

## Sygnatura funkcji

```typescript
t(translations: Record<string, any>): any;
```

### Parametry

- `translations`: Obiekt, w którym kluczami są kody ustawień regionalnych (np. `en`, `fr`, `es`), a wartościami są odpowiednie przetłumaczone treści.

### Zwraca

- Treść reprezentującą preferowany język klienta.

---

## Ładowanie oprogramowania pośredniczącego (Middleware)

Aby upewnić się, że funkcja `t` działa poprawnie, **musisz** zarejestrować middleware `intlayer` w swojej aplikacji AdonisJS.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

---

## Przykłady użycia

### Podstawowy przykład

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Welcome!",
    fr: "Bienvenue!",
    es: "¡Bienvenido!",
  });
});
```

### Użycie w kontrolerach

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour od kontrolera",
      })
    );
  }
}
```

---

## Tematy zaawansowane

### Mechanizm Fallback

Jeśli preferowane ustawienie regionalne jest niedostępny, funkcja `t` powróci do domyślnego ustawienia regionalnego zdefiniowanego w `intlayer.config.ts`.

```typescript
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Integracja z TypeScript

Funkcja `t` jest bezpieczna pod względem typów, gdy jest używana ze zdefiniowanymi słownikami. Więcej szczegółów znajdziesz w [dokumentacji TypeScript](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).
