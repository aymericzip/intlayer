---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "Czy mogę używać Intlayer bez globalnego providera?"
description: "Odczyt treści Intlayer bez montowania providera, jak locale jest rozwiązywane na serwerze i w przeglądarce oraz różnica wydajności względem providera."
keywords:
  - provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - locale
  - wydajność
  - hydratacja
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Czy mogę używać Intlayer bez globalnego providera?

Tak. `getIntlayer` i `getDictionary` to zwykłe funkcje, które nie potrzebują żadnego providera, a `useIntlayer` również działa poza nim.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Bez przekazanego locale
```

## Które locale jest używane?

Jawnie przekazane locale zawsze ma pierwszeństwo. W przeciwnym razie locale jest rozwiązywane w tej kolejności:

1. **Locale bieżącego żądania**, na serwerze, gdy obsługuje je integracja Intlayer: middleware `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` i `astro-intlayer` lub `IntlayerProvider` w React Server Components.
2. **Locale zapisane w przeglądarce** (cookie, `localStorage`, `sessionStorage`), które utrwala Twój przełącznik języka.
3. **`defaultLocale`** z Twojej konfiguracji.

Każde żądanie jest rozwiązywane na podstawie własnych cookies i nagłówków i przechowywane w zakresie tego żądania. Równocześni użytkownicy z różnymi locale nigdy nie współdzielą locale.

To samo rozwiązywanie dotyczy `getDictionary`, wywołań przepisanych przez [optymalizację builda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md) oraz `useIntlayer` i `useDictionaryDynamic` renderowanych poza providerem.

- [optymalizację builda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/bundle_optimization.md)

### Server Components w Next.js

W Next.js locale żądania można odczytać tylko asynchronicznie, przez `headers()` i `cookies()`. Użyj [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md), która czeka na nie tak samo jak `getLocale()` z `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale żądania

  return { title };
};
```

Odczyt nagłówków przełącza trasę na renderowanie dynamiczne. Gdy `IntlayerProvider` już dostarcza locale, nagłówki nie są odczytywane, a trasa pozostaje statyczna.

## Wydajność: z providerem czy bez

Treść jest taka sama. Różnica dotyczy reaktywności i kosztu renderowania.

|                          | Z providerem                                                    | Bez providera                                                                                                      |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Zmiana locale            | Komponenty renderują się ponownie na miejscu, bez przeładowania | Nic nie renderuje się ponownie; nowe locale pojawia się przy następnym wywołaniu (nawigacja, przeładowanie)        |
| Koszt odczytu            | Odczyt kontekstu i subskrypcja locale                           | Memoizowane wywołanie funkcji, ten sam obiekt dla tego samego `key + locale`                                       |
| Koszt zmiany             | Ponowne renderowanie każdego konsumenta                         | Brak                                                                                                               |
| Renderowanie na serwerze | Serwer i przeglądarka renderują to samo locale                  | Poza integracją żądań serwer renderuje `defaultLocale`, a przeglądarka zapisane locale: możliwy hydration mismatch |
| Bundle                   | Kod providera                                                   | Około 100 bajtów (gzip) na odczyt zapisanego locale, cache'owane do następnej zmiany                               |

Zostaw provider w interaktywnych aplikacjach, które zmieniają locale na miejscu lub renderują na serwerze. Zrezygnuj z niego w backendach, skryptach, stronach statycznych, których locale pochodzi z URL (przekaż je jawnie), lub w kodzie, który odczytuje treść tylko raz.

Więcej szczegółów w [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md).

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/intlayer/getIntlayer.md)
