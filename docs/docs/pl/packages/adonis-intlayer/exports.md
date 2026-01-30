---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: Dokumentacja pakietu adonis-intlayer
description: Middleware AdonisJS dla Intlayer, zapewniający funkcje tłumaczenia i wykrywanie ustawień regionalnych.
keywords:
  - adonis-intlayer
  - adonisjs
  - middleware
  - internacjonalizacja
  - i18n
slugs:
  - doc
  - packages
  - adonis-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Dokumentacja początkowa
---

# Pakiet adonis-intlayer

Pakiet `adonis-intlayer` zapewnia oprogramowanie pośredniczące dla aplikacji AdonisJS do obsługi internacjonalizacji. Wykrywa ustawienia regionalne użytkownika i zapewnia funkcje tłumaczenia.

## Instalacja

```bash
npm install adonis-intlayer
```

## Eksporty

### Middleware

Pakiet zapewnia middleware AdonisJS do obsługi internacjonalizacji.

| Funkcja              | Opis                                                                                                                                                                                                                                                                                              | Powiązana dokumentacja                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `IntlayerMiddleware` | Middleware AdonisJS, który wykrywa ustawienia regionalne użytkownika i wypełnia kontekst żądania danymi Intlayer. Ustawia również przestrzeń nazw CLS (Async Local Storage) dla dostępu do cyklu życia żądania, umożliwiając korzystanie z globalnych funkcji, takich jak `t`, `getIntlayer` itp. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/adonis-intlayer/intlayer.md) |

### Funkcje

| Funkcja         | Opis                                                                                                                                                                                                                   | Powiązana dokumentacja                                                                                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funkcja tłumaczenia, która pobiera treść dla bieżącego ustawienia regionalnego. Działa w cyklu życia żądania zarządzanym przez middleware `intlayer`. Używa CLS (Async Local Storage) do dostępu do kontekstu żądania. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getIntlayer`   | Pobiera słownik za pomocą jego klucza z wygenerowanej deklaracji i zwraca jego treść dla określonego ustawienia regionalnego. Zoptymalizowana wersja `getDictionary`. Używa CLS do dostępu do kontekstu żądania.       | -                                                                                                      |
| `getDictionary` | Przetwarza obiekty słownika i zwraca treść dla określonego ustawienia regionalnego. Przetwarza tłumaczenia `t()`, wyliczenia, markdown, HTML itp. Używa CLS do dostępu do kontekstu żądania.                           | -                                                                                                      |
| `getLocale`     | Pobiera bieżące ustawienie regionalne z kontekstu żądania za pomocą CLS.                                                                                                                                               | -                                                                                                      |
