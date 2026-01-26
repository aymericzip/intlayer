---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu angular-intlayer
description: Integracja Intlayer dla Angulara, udostępniająca providery i serwisy dla aplikacji Angular.
keywords:
  - angular-intlayer
  - angular
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - angular-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja wszystkich eksportów
---

# Pakiet angular-intlayer

Pakiet `angular-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami Angular. Zawiera providery i serwisy do obsługi wielojęzycznych treści.

## Instalacja

```bash
npm install angular-intlayer
```

## Eksporty

### Konfiguracja

| Funkcja           | Opis                                                       |
| ----------------- | ---------------------------------------------------------- |
| `provideIntlayer` | Funkcja dostarczająca Intlayer w Twojej aplikacji Angular. |

### Usługi

| Usługa            | Opis                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `IntlayerService` | Usługa, która wybiera słownik po jego kluczu i zwraca zawartość.     |
| `LocaleService`   | Usługa, która zwraca bieżący locale oraz funkcję do jego ustawiania. |

### Komponenty

| Komponent                   | Opis                                                   |
| --------------------------- | ------------------------------------------------------ |
| `IntlayerMarkdownComponent` | Komponent Angular, który renderuje zawartość Markdown. |
