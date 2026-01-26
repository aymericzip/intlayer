---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu fastify-intlayer
description: Wtyczka Fastify dla Intlayer, zapewniająca funkcje tłumaczeń i wykrywanie lokalizacji.
keywords:
  - fastify-intlayer
  - fastify
  - plugin
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - fastify-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Unified documentation for all exports
---

# Pakiet fastify-intlayer

Pakiet `fastify-intlayer` udostępnia wtyczkę dla aplikacji Fastify do obsługi internationalization (i18n). Wykrywa locale użytkownika i dekoruje obiekt request.

## Instalacja

```bash
npm install fastify-intlayer
```

## Eksporty

### Wtyczka

Import:

```tsx
import "fastify-intlayer";
```

| Funkcja    | Opis                                                                                                                                                                                                                                                                                                                | Powiązana dokumentacja                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Fastify plugin integrujący Intlayer z Twoją aplikacją Fastify. Obsługuje wykrywanie locale z storage (cookies, headers), dekoruje obiekt request danymi `intlayer` zawierającymi `t`, `getIntlayer` i `getDictionary`, oraz konfiguruje przestrzeń nazw CLS dla programowego dostępu w trakcie cyklu życia żądania. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/fastify-intlayer/intlayer.md) |

### Funkcje

Importowanie:

```tsx
import "fastify-intlayer";
```

| Funkcja         | Opis                                                                                                                                                                                                                                                                 | Powiązany dokument                                                                                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globalna funkcja tłumaczeń, która pobiera zawartość dla aktualnego locale w Fastify. Wykorzystuje CLS (Async Local Storage) i musi być używana w kontekście żądania zarządzanym przez plugin `intlayer`. Można ją też wywołać przez `req.intlayer.t`.                | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getIntlayer`   | Pobiera słownik po jego kluczu z wygenerowanej deklaracji i zwraca jego zawartość dla określonego locale. Wersja zoptymalizowana funkcji `getDictionary`. Używa CLS, aby uzyskać dostęp do kontekstu żądania. Można ją też wywołać przez `req.intlayer.getIntlayer`. | -                                                                                                      |
| `getDictionary` | Przetwarza obiekty słownika i zwraca zawartość dla określonej lokalizacji. Przetwarza tłumaczenia `t()`, enumeracje, markdown, HTML itp. Używa CLS do dostępu do kontekstu żądania. Można go również uzyskać przez `req.intlayer.getDictionary`.                     | -                                                                                                      |
