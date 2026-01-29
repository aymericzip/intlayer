---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Dokumentacja Pakietu hono-intlayer
description: Middleware Hono dla Intlayer, dostarczający funkcje tłumaczenia i wykrywanie języka.
keywords:
  - hono-intlayer
  - hono
  - middleware
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - hono-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Zunifikowana dokumentacja dla wszystkich eksportów
---

# Pakiet hono-intlayer

Pakiet `hono-intlayer` dostarcza middleware dla aplikacji Hono do obsługi internacjonalizacji. Wykrywa język użytkownika i uzupełnia obiekt kontekstu.

## Instalacja

```bash
npm install hono-intlayer
```

## Eksporty

### Middleware

Import:

```tsx
import { intlayer } from "hono-intlayer";
```

| Funkcja    | Opis                                                                                                                                                                                                                                                                                | Powiązana Dok.                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `intlayer` | Middleware Hono integrujące Intlayer z Twoją aplikacją Hono. Obsługuje wykrywanie języka z pamięci masowej (pliki cookie, nagłówki), uzupełnia kontekst o `t`, `getIntlayer` i `getDictionary` oraz konfiguruje przestrzeń nazw CLS dla dostępu programowego w cyklu życia żądania. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/hono-intlayer/intlayer.md) |

### Funkcje

Import:

```tsx
import { t, getIntlayer, getDictionary } from "hono-intlayer";
```

| Funkcja         | Opis                                                                                                                                                                                                                                  | Powiązana Dok.                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Globalna funkcja tłumaczenia pobierająca treść dla aktualnego języka w Hono. Wykorzystuje CLS (Async Local Storage) i musi być używana w kontekście żądania zarządzanym przez middleware `intlayer`. Dostępna również przez kontekst. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getIntlayer`   | Pobiera słownik według klucza z wygenerowanej deklaracji i zwraca jego treść dla określonego języka. Zoptymalizowana wersja `getDictionary`. Używa CLS do dostępu do kontekstu żądania. Dostępna również przez kontekst.              | -                                                                                                      |
| `getDictionary` | Przetwarza obiekty słownika i zwraca treść dla określonego języka. Przetwarza tłumaczenia `t()`, wyliczenia, markdown, HTML itp. Używa CLS do dostępu do kontekstu żądania. Dostępna również przez kontekst.                          | -                                                                                                      |
