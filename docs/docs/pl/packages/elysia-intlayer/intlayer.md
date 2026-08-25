---
createdAt: 2026-08-24
updatedAt: 2026-08-24
title: Dokumentacja wtyczki intlayer dla Elysia | elysia-intlayer
description: Zobacz, jak używać wtyczki intlayer z pakietu elysia-intlayer
keywords:
  - intlayer
  - elysia
  - plugin
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - elysia-intlayer
  - intlayer
history:
  - version: 9.4.0
    date: 2026-08-24
    changes: "Inicjalizacja dokumentacji"
author: aymericzip
---

# Dokumentacja wtyczki intlayer dla Elysia

Wtyczka `intlayer` dla Elysia wykrywa locale użytkownika i wstrzykuje obiekt `intlayer` do kontekstu route. Umożliwia również użycie globalnych funkcji tłumaczeniowych w kontekście żądania.

## Użycie

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", ({ intlayer }) =>
  intlayer!.t({
    pl: "Cześć",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

> Plugin rejestruje swój kontekst poprzez **globalny** `derive`, który Elysia typuje jako `Partial<{ intlayer: IntlayerContext }>`. W czasie działania wartość jest zawsze obecna dla tras zarejestrowanych po `.use(intlayer())`, dlatego użyj non-null assertion (`intlayer!.t`) — lub optional chaining — aby zadowolić TypeScript w trybie `strict`.

Te same helpery są dostępne jako samodzielne eksporty, więc możesz je wywołać bez destrukturyzacji kontekstu route:

```ts fileName="src/index.ts"
import { Elysia } from "elysia";
import { intlayer, t } from "elysia-intlayer";

const app = new Elysia().use(intlayer()).get("/", () =>
  t({
    pl: "Cześć",
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
  })
);
```

## Opis

Wtyczka wykonuje następujące zadania:

1. **Wykrywanie locale**: Odczytuje locale ustawione jawnie przez klienta ze storage (cookie, header), a następnie wraca do locale wynegocjowanego z nagłówka `Accept-Language`.
2. **Wstrzyknięcie do kontekstu**: Dodaje właściwość `intlayer` do kontekstu trasy Elysia (zobacz tabelę Kontekst trasy poniżej).
3. **Zarządzanie kontekstem**: Używa `AsyncLocalStorage` do zarządzania asynchronicznym kontekstem, dzięki czemu globalne funkcje Intlayer (`t`, `getIntlayer`, `getDictionary`) mają dostęp do locale specyficznego dla żądania bez przekazywania obiektu kontekstu.
4. **Przygotowanie słowników**: Wywołuje `prepareIntlayer` przy tworzeniu pluginu, dzięki czemu słowniki są budowane przy starcie aplikacji.

### Kontekst trasy

| Właściwość        | Typ                    | Opis                                                                                                  |
| ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `locale`          | `Locale`               | Locale używane dla tego żądania, przy czym `locale_storage` ma pierwszeństwo przed `locale_detected`. |
| `locale_storage`  | `Locale` (opcjonalne)  | Locale zażądane jawnie przez klienta poprzez cookie lub header.                                       |
| `locale_detected` | `Locale`               | Locale wynegocjowane z nagłówków żądania.                                                             |
| `defaultLocale`   | `Locale`               | Locale skonfigurowane jako fallback w `intlayer.config.ts`.                                           |
| `t`               | `TranslateFunction`    | Funkcja tłumaczenia.                                                                                  |
| `getIntlayer`     | `typeof getIntlayer`   | Funkcja pobierająca słowniki po kluczu.                                                               |
| `getDictionary`   | `typeof getDictionary` | Funkcja przetwarzająca obiekty słowników.                                                             |

> W przeciwieństwie do wtyczek Intlayer opartych na Node, `elysia-intlayer` opiera się na `AsyncLocalStorage` zamiast `cls-hooked`, ponieważ `cls-hooked` zależy od `async_hooks.createHook`, którego Bun nie implementuje.

Kontekst żądania jest zwalniany po zmapowaniu odpowiedzi, więc samodzielne helpery nigdy nie rozwiązują się względem już zakończonego żądania. Wywołane poza żądaniem obsługiwanym przez wtyczkę, wracają do skonfigurowanego domyślnego locale.

## Kolejność rozwiązywania locale

Domyślnie plugin rozwiązuje locale w następującej kolejności:

1. Cookie `INTLAYER_LOCALE`.
2. Nagłówek `x-intlayer-locale`.
3. Negocjacja nagłówka `Accept-Language`.
4. Skonfigurowany `defaultLocale`.

```bash
# Wynegocjowany z `Accept-Language`
curl -H "Accept-Language: fr" http://localhost:3000/
# Bonjour

# Cookie ma pierwszeństwo przed `Accept-Language`
curl -H "Accept-Language: fr" -H "Cookie: INTLAYER_LOCALE=es" http://localhost:3000/
# Hola

# Nagłówek ma pierwszeństwo przed `Accept-Language`
curl -H "Accept-Language: fr" -H "x-intlayer-locale: es" http://localhost:3000/
# Hola
```

## Konfiguracja

Wtyczka odczytuje Twój plik `intlayer.config.ts`. Możesz dostosować cookie i header używane do wykrywania locale:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
  },
};

export default config;
```

> Więcej informacji o konfiguracji znajdziesz w [dokumentacji konfiguracji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/configuration.md).

## Powiązana dokumentacja

- [Dokumentacja pakietu elysia-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/elysia-intlayer/exports.md)
- [Elysia i18n - Kompletny przewodnik tłumaczenia aplikacji](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/intlayer_with_elysia.md)
