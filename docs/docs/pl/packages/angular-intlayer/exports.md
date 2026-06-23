---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu angular-intlayer
description: Integracja Intlayer specyficzna dla Angular, dostarczająca providery i serwisy dla aplikacji Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
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

# Pakiet angular-intlayer

Pakiet `angular-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami Angular. Zawiera providery i serwisy do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install angular-intlayer
```

## Eksporty

Import:

```tsx
import "angular-intlayer";
```

### Konfiguracja

| Funkcja           | Opis                                                      |
| ----------------- | --------------------------------------------------------- |
| `provideIntlayer` | Funkcja zapewniająca Intlayer w Twojej aplikacji Angular. |

### Hooki

| Hook                   | Opis                                                                                                                                           | Powiązany dokument                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Opiera się na `useDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika pochodzącą z wygenerowanej deklaracji.                           | -                                                                                                                     |
| `useDictionary`        | Przetwarza obiekty wyglądające jak słowniki (klucz, zawartość). Przetwarza tłumaczenia `t()`, enumeracje itp.                                  | -                                                                                                                     |
| `useDictionaryAsync`   | Tak jak `useDictionary`, ale obsługuje asynchroniczne słowniki.                                                                                | -                                                                                                                     |
| `useDictionaryDynamic` | Tak jak `useDictionary`, ale obsługuje dynamiczne słowniki.                                                                                    | -                                                                                                                     |
| `useLocale`            | Zwraca obecną lokalizację oraz funkcję do jej ustawienia.                                                                                      | -                                                                                                                     |
| `usePathname`          | Zwraca bieżącą ścieżkę jako `Signal<string>` po usunięciu segmentu ustawień regionalnych. Reaguje na `popstate` za pośrednictwem `DestroyRef`. | [usePathname](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/angular-intlayer/usePathname.md) |
| `useIntl`              | Zwraca obiekt Intl dla obecnej lokalizacji.                                                                                                    | -                                                                                                                     |
| `useLoadDynamic`       | Hook do ładowania dynamicznych słowników.                                                                                                      | -                                                                                                                     |

### Komponenty

| Komponent                   | Opis                                               |
| --------------------------- | -------------------------------------------------- |
| `IntlayerMarkdownComponent` | Komponent Angulara renderujący zawartość Markdown. |
