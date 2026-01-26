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
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
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

| Hook                   | Opis                                                                                                                 | Powiązany dokument |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `useIntlayer`          | Opiera się na `useDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika pochodzącą z wygenerowanej deklaracji. | -                  |
| `useDictionary`        | Przetwarza obiekty wyglądające jak słowniki (klucz, zawartość). Przetwarza tłumaczenia `t()`, enumeracje itp.        | -                  |
| `useDictionaryAsync`   | Tak jak `useDictionary`, ale obsługuje asynchroniczne słowniki.                                                      | -                  |
| `useDictionaryDynamic` | Tak jak `useDictionary`, ale obsługuje dynamiczne słowniki.                                                          | -                  |
| `useLocale`            | Zwraca bieżący locale i funkcję do jego ustawienia.                                                                  | -                  |
| `useIntl`              | Zwraca obiekt Intl dla bieżącego locale.                                                                             | -                  |
| `useLoadDynamic`       | Hook do ładowania dynamicznych słowników.                                                                            | -                  |

### Komponenty

| Komponent                   | Opis                                               |
| --------------------------- | -------------------------------------------------- |
| `IntlayerMarkdownComponent` | Komponent Angulara renderujący zawartość Markdown. |
