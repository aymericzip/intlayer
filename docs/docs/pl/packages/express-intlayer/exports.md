---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja pakietu express-intlayer
description: Middleware Express dla Intlayer, udostępniający funkcje tłumaczeń i wykrywanie lokalizacji.
keywords:
  - express-intlayer
  - express
  - middleware
  - internationalization
  - i18n
slugs:
  - doc
  - packages
  - express-intlayer
  - exports
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Ujednolicona dokumentacja dla wszystkich eksportów
---

# Pakiet express-intlayer

Pakiet `express-intlayer` dostarcza middleware dla aplikacji Express do obsługi internacjonalizacji. Wykrywa lokalizację użytkownika i udostępnia funkcje tłumaczeń.

## Instalacja

```bash
npm install express-intlayer
```

## Eksporty

### Middleware

Import:

```tsx
import "express-intlayer";
```

| Funkcja    | Opis                                                                                                                                                                                                                                                                                     | Powiązana dokumentacja                                                                                          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `intlayer` | Middleware Express, który wykrywa locale użytkownika i wypełnia `res.locals` danymi Intlayer. Wykrywa locale na podstawie cookies/nagłówków, wstrzykuje `t`, `getIntlayer` i `getDictionary` do `res.locals` oraz konfiguruje namespace CLS, aby umożliwić dostęp w cyklu życia żądania. | [intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/packages/express-intlayer/intlayer.md) |

### Funkcje

Import:

```tsx
import "express-intlayer";
```

| Funkcja         | Opis                                                                                                                                                                                                         | Powiązany dokument                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `t`             | Funkcja tłumaczeń, która pobiera zawartość dla bieżącego locale. Działa w cyklu życia żądania zarządzanym przez middleware `intlayer`. Korzysta z CLS (Async Local Storage) do dostępu do kontekstu żądania. | [translation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/pl/dictionary/translation.md) |
| `getIntlayer`   | Pobiera słownik według klucza z wygenerowanej deklaracji i zwraca jego zawartość dla wskazanego locale. Zoptymalizowana wersja `getDictionary`. Używa CLS do dostępu do kontekstu żądania.                   | -                                                                                                      |
| `getDictionary` | Przetwarza obiekty słownika i zwraca ich zawartość dla wskazanego locale. Obsługuje tłumaczenia `t()`, enumeracje, markdown, HTML itp. Używa CLS do dostępu do kontekstu żądania.                            | -                                                                                                      |
