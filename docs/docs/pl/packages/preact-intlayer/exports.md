---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu preact-intlayer
description: Integracja Intlayer specyficzna dla Preact, dostarcza providery i hooki dla aplikacji Preact.
keywords:
  - preact-intlayer
  - preact
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - preact-intlayer
  - exports
history:
  - version: 10.0.0
    date: 2026-06-23
    changes: "Dodano narzędzie usePathname"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Ujednolicona dokumentacja dla wszystkich eksportów"
author: aymericzip
---

# Pakiet preact-intlayer

Pakiet `preact-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami Preact. Zawiera providery i hooki do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install preact-intlayer
```

## Eksporty

### Provider

| Component          | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `IntlayerProvider` | Główny provider, który otacza aplikację i udostępnia kontekst Intlayer. |

### Hooki

| Hook            | Opis                                                                                                                              | Powiązana dokumentacja                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`   | Bazuje na `useDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika pochodzącą z wygenerowanej deklaracji.                  | -                                                                                                                    |
| `useDictionary` | Przetwarza obiekty przypominające słowniki (klucz, zawartość). Przetwarza tłumaczenia `t()`, enumeracje itp.                      | -                                                                                                                    |
| `useLocale`     | Zwraca bieżący locale oraz funkcję do jego ustawienia.                                                                            | -                                                                                                                    |
| `usePathname`   | Hook, który zwraca bieżącą ścieżkę (pathname) po usunięciu segmentu locale. Reaguje na nawigację przeglądarki poprzez `popstate`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/preact-intlayer/usePathname.md) |
| `t`             | Wybiera treść na podstawie bieżącego locale.                                                                                      | [tłumaczenie](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md)               |

### Komponenty

| Komponent          | Opis                                                                   |
| ------------------ | ---------------------------------------------------------------------- |
| `MarkdownProvider` | Provider dla kontekstu renderowania markdown.                          |
| `MarkdownRenderer` | Renderuje zawartość markdown przy użyciu niestandardowych komponentów. |
