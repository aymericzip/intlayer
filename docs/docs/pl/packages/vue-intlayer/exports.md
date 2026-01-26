---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu vue-intlayer
description: Integracja Intlayer specyficzna dla Vue, udostępniająca pluginy i composables dla aplikacji Vue.
keywords:
  - vue-intlayer
  - vue
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - vue-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet vue-intlayer

Pakiet `vue-intlayer` dostarcza niezbędne narzędzia do integracji Intlayer z aplikacjami Vue. Zawiera plugin Vue oraz composables do obsługi treści wielojęzycznych.

## Instalacja

```bash
npm install vue-intlayer
```

## Eksporty

### Plugin

Import:

```tsx
import "vue-intlayer";
```

| Funkcja           | Opis                                                       |
| ----------------- | ---------------------------------------------------------- |
| `installIntlayer` | Wtyczka Vue do zainstalowania Intlayer w Twojej aplikacji. |

### Komposables

Import:

```tsx
import "vue-intlayer";
```

| Komposable             | Opis                                                                                                                                                       | Powiązana dokumentacja                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `useIntlayer`          | Oparte na `useDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika z wygenerowanej deklaracji.                                                      | -                                                                                                                     |
| `useDictionary`        | Przetwarza obiekty wyglądające jak słowniki (key, content). Obsługuje tłumaczenia `t()`, enumeracje itd.                                                   | -                                                                                                                     |
| `useDictionaryAsync`   | Tak jak `useDictionary`, ale obsługuje asynchroniczne słowniki.                                                                                            | -                                                                                                                     |
| `useDictionaryDynamic` | Tak jak `useDictionary`, ale obsługuje dynamiczne słowniki.                                                                                                | -                                                                                                                     |
| `useLocale`            | Zwraca bieżący locale oraz funkcję do jego ustawienia.                                                                                                     | -                                                                                                                     |
| `useRewriteURL`        | Composable po stronie klienta do zarządzania przepisywaniem adresów URL. Automatycznie aktualizuje URL, jeśli istnieje zlokalizowana reguła przepisywania. | [useRewriteURL](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/vue-intlayer/useRewriteURL.md) |
| `useIntl`              | Zwraca obiekt Intl dla bieżącej lokalizacji.                                                                                                               | -                                                                                                                     |
| `useLoadDynamic`       | Composable do ładowania dynamicznych słowników.                                                                                                            | -                                                                                                                     |

### Funkcje

Import:

```tsx
import "vue-intlayer";
```

| Function        | Description                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `getDictionary` | Przetwarza obiekty przypominające słowniki (klucz, zawartość). Obsługuje tłumaczenia `t()`, enumeracje itp.          |
| `getIntlayer`   | Opiera się na `getDictionary`, ale wstrzykuje zoptymalizowaną wersję słownika pochodzącą z wygenerowanej deklaracji. |

### Markdown

Import:

```tsx
import "vue-intlayer/markdown";
```

| Funkcja                   | Opis                                                          |
| ------------------------- | ------------------------------------------------------------- |
| `installIntlayerMarkdown` | Wtyczka Vue instalująca Intlayer Markdown w Twojej aplikacji. |
