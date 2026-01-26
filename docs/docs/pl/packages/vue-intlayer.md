---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Pakiet vue-intlayer — Dokumentacja
description: Integracja specyficzna dla Vue dla Intlayer, dostarczająca pluginy i composables dla aplikacji Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# vue-intlayer Package

Pakiet `vue-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer w aplikacjach Vue. Zawiera plugin Vue oraz composables do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install vue-intlayer
```

## Eksporty

### Wtyczka

| Function          | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `installIntlayer` | Wtyczka Vue instalująca Intlayer w Twojej aplikacji. |

### Composables

| Composable      | Opis                                                         |
| --------------- | ------------------------------------------------------------ |
| `useIntlayer`   | Wybiera słownik na podstawie klucza i zwraca jego zawartość. |
| `useDictionary` | Wybiera słownik na podstawie klucza i zwraca jego zawartość. |
| `useLocale`     | Zwraca bieżący locale oraz funkcję do jego ustawienia.       |
| `useIntl`       | Zwraca obiekt Intl dla bieżącego locale.                     |

### Funkcje

| Function        | Description                    |
| --------------- | ------------------------------ |
| `getDictionary` | Pobiera słownik.               |
| `getIntlayer`   | Pobiera zawartość ze słownika. |

### Markdown

| Funkcja                   | Opis                                                          |
| ------------------------- | ------------------------------------------------------------- |
| `installIntlayerMarkdown` | Wtyczka Vue instalująca Intlayer Markdown w Twojej aplikacji. |
