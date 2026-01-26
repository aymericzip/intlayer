---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu next-intlayer
description: Integracja Intlayer specyficzna dla Next.js, zapewniająca middleware i providery dla App Router i Page Router.
keywords:
  - next-intlayer
  - nextjs
  - react
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - next-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja wszystkich eksportów
---

# Pakiet next-intlayer

Pakiet `next-intlayer` dostarcza narzędzia niezbędne do integracji Intlayer z aplikacjami Next.js. Obsługuje zarówno App Router, jak i Page Router, w tym middleware do trasowania opartego na locale.

## Instalacja

```bash
npm install next-intlayer
```

## Eksporty

### Middleware

Import:

```tsx
import "next-intlayer/middleware";
```

| Funkcja              | Opis                                                                                                                                                                                     | Powiązana dokumentacja                                                                                                           |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `intlayerMiddleware` | Middleware Next.js do obsługi routingu opartego na lokalizacji i przekierowań. Wykrywa lokalizację na podstawie nagłówków/cookies i przekierowuje do odpowiedniej ścieżki z lokalizacją. | [intlayerMiddleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/intlayerMiddleware.md) |

### Pomocniki konfiguracji

Import:

```tsx
import "next-intlayer/server";
```

| Funkcja            | Opis                                                                                                                                                                                       | Powiązany dokument |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `withIntlayer`     | Asynchroniczny pomocnik do opakowywania konfiguracji Next.js, zapewniający przygotowanie słowników Intlayer przed buildem. Przygotowuje pliki z treścią i konfiguruje wtyczki webpack/SWC. | -                  |
| `withIntlayerSync` | Synchroniczny pomocnik do opakowywania konfiguracji Next.js, idealny dla konfiguracji, w których async nie jest możliwy/pożądany. Nie przygotowuje słowników przy starcie serwera.         | -                  |

### Providery

Import:

```tsx
import "next-intlayer";
```

or

```tsx
import "next-intlayer/server";
```

| Komponent                | Opis                                                                                                                | Powiązany dokument |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `IntlayerClientProvider` | Provider dla komponentów po stronie klienta w Next.js App Router. Opakowuje `IntlayerProvider` z react-intlayer.    | -                  |
| `IntlayerServerProvider` | Provider dla komponentów po stronie serwera w Next.js (App Router). Zapewnia kontekst locale na serwerze.           | -                  |
| `IntlayerServer`         | Serwerowy wrapper dla zawartości Intlayer w App Router. Zapewnia prawidłowe zarządzanie locale w Server Components. | -                  |

### Hooki (po stronie klienta)

Import:

```tsx
import "next-intlayer";
```

Ponownie eksportuje większość hooków z `react-intlayer`.

| Hook                   | Opis                                                                                                                                                             | Powiązany dokument                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Hook po stronie klienta, który wybiera słownik po jego kluczu i zwraca jego zawartość. Używa locale z kontekstu, jeśli nie podano.                               | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useIntlayer.md)     |
| `useDictionary`        | Hook, który przekształca obiekt słownika i zwraca zawartość dla bieżącego locale. Przetwarza tłumaczenia `t()`, enumeracje itp.                                  | [useDictionary](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useDictionary.md) |
| `useDictionaryAsync`   | Hook obsługujący asynchroniczne słowniki. Akceptuje mapę słowników opartą na Promise i rozwiązuje ją dla bieżącego locale.                                       | -                                                                                                                       |
| `useDictionaryDynamic` | Hook obsługujący dynamiczne słowniki ładowane po kluczu. Wewnątrz wykorzystuje React Suspense do obsługi stanów ładowania.                                       | -                                                                                                                       |
| `useLocale`            | Hook po stronie klienta do pobierania bieżącego locale i funkcji do jego ustawiania. Rozszerzony dla Next.js App Router o wsparcie nawigacji.                    | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook po stronie klienta do zarządzania przepisywaniem URL. Automatycznie aktualizuje URL, jeśli istnieje bardziej estetyczna zlokalizowana reguła przepisywania. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/next-intlayer/useRewriteURL.md)  |
| `useLocalePageRouter`  | Hook specyficzny dla Next.js Page Router do zarządzania locale. Obsługuje przekierowania i przeładowania strony przy zmianie locale.                             | -                                                                                                                       |
| `useI18n`              | Hook, który udostępnia funkcję tłumaczącą `t()` do dostępu do zagnieżdżonych treści po kluczu. Imituje wzorzec i18next/next-intl.                                | [useI18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/react-intlayer/useI18n.md)             |
| `useIntl`              | Hook, który dostarcza związany z lokalizacją obiekt `Intl`. Automatycznie wstrzykuje aktualną lokalizację i korzysta z zoptymalizowanego cachowania.             | -                                                                                                                       |
| `useLoadDynamic`       | Hook do ładowania dynamicznych słowników z użyciem React Suspense. Przyjmuje klucz i promise, buforuje wyniki.                                                   | -                                                                                                                       |

### Funkcje (po stronie serwera)

Import:

```tsx
import "next-intlayer/server";
```

| Funkcja                | Opis                                                                                                                                                              | Powiązany dokument                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`                    | Wersja po stronie serwera funkcji tłumaczeniowej dla Next.js App Router. Zwraca tłumaczenie wielojęzycznych treści dla lokalizacji serwera.                       | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getLocale`            | Funkcja pomocnicza do wyodrębniania bieżącej lokalizacji z nagłówków i cookies Next.js. Zaprojektowana dla Server Components, Server Actions lub Route Handlers.  | -                                                                                                      |
| `generateStaticParams` | Generuje statyczne parametry dla dynamicznych tras Next.js na podstawie skonfigurowanych lokalizacji. Zwraca tablicę obiektów `locale` do wstępnego renderowania. | -                                                                                                      |
| `locale`               | Funkcja do pobierania lub ustawiania `locale` w kontekście serwera (App Router). Zapewnia zarządzanie `locale` w Server Components.                               | -                                                                                                      |

### Typy

Import:

```tsx
import "next-intlayer";
```

| Typ                    | Opis                                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `NextPageIntlayer`     | Typ dla stron Next.js ze wsparciem Intlayer. Typ generyczny, który zawiera parametr locale.                                               |
| `Next14PageIntlayer`   | Typ dla stron Next.js 14 ze wsparciem Intlayer.                                                                                           |
| `Next15PageIntlayer`   | Typ dla stron Next.js 15 ze wsparciem Intlayer.                                                                                           |
| `NextLayoutIntlayer`   | Typ dla layoutów Next.js ze wsparciem Intlayer. Typ generyczny, który zawiera parametr locale.                                            |
| `Next14LayoutIntlayer` | Typ dla layoutów Next.js 14 z obsługą Intlayer.                                                                                           |
| `Next15LayoutIntlayer` | Typ dla layoutów Next.js 15 z obsługą Intlayer.                                                                                           |
| `LocalParams`          | Typ dla parametrów trasy Next.js z lokalizacją. Obiekt z właściwością `locale`.                                                           |
| `LocalPromiseParams`   | Typ dla parametrów trasy Next.js z lokalizacją (wersja asynchroniczna). Promise, który rozwiązuje się do obiektu z właściwością `locale`. |
