---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu solid-intlayer
description: Integracja specyficzna dla Solid z Intlayer, dostarczająca providery i hooki dla aplikacji Solid.
keywords:
  - solid-intlayer
  - solidjs
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - solid-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet solid-intlayer

Pakiet `solid-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami Solid. Zawiera providery i hooki do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install solid-intlayer
```

## Eksporty

### Provider

Import:

```tsx
import "solid-intlayer";
```

| Komponent          | Opis                                                                         | Powiązany dokument                                                                                                            |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `IntlayerProvider` | Główny provider, który otacza Twoją aplikację i dostarcza kontekst Intlayer. | [IntlayerProvider](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/IntlayerProvider.md) |

### Hooki

Import:

```tsx
import "solid-intlayer";
```

| Hook                   | Opis                                                                                                                                                 | Powiązany dokument                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Opiera się na `useDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika pochodzącą z wygenerowanej deklaracji.                                 | [useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useIntlayer.md)     |
| `useDictionary`        | Przetwarza obiekty przypominające słowniki (klucz, zawartość). Obsługuje tłumaczenia `t()`, enumeracje itp.                                          | -                                                                                                                       |
| `useDictionaryAsync`   | Tak jak `useDictionary`, ale obsługuje asynchroniczne słowniki.                                                                                      | -                                                                                                                       |
| `useDictionaryDynamic` | Tak jak `useDictionary`, ale obsługuje dynamiczne słowniki.                                                                                          | -                                                                                                                       |
| `useLocale`            | Zwraca bieżący locale i funkcję do jego ustawienia.                                                                                                  | [useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useLocale.md)         |
| `useRewriteURL`        | Hook po stronie klienta do zarządzania przepisywaniem adresów URL. Automatycznie aktualizuje URL, jeśli istnieje zlokalizowana reguła przepisywania. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/solid-intlayer/useRewriteURL.md) |
| `useIntl`              | Zwraca obiekt Intl dla bieżącego locale.                                                                                                             | -                                                                                                                       |
| `useLoadDynamic`       | Hook do ładowania dynamicznych słowników.                                                                                                            | -                                                                                                                       |
| `t`                    | Wybiera zawartość na podstawie bieżącego locale.                                                                                                     | [tłumaczenie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)                  |

### Komponenty

Import:

```tsx
import "solid-intlayer";
```

| Komponent          | Opis                                          |
| ------------------ | --------------------------------------------- |
| `MarkdownProvider` | Provider dla kontekstu renderowania Markdown. |
