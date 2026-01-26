---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja middleware intlayer dla Express | express-intlayer
description: Zobacz, jak używać middleware intlayer w pakiecie express-intlayer
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalization
  - Dokumentacja
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Dokumentacja middleware intlayer dla Express

Middleware `intlayer` dla Express wykrywa lokalizację użytkownika i udostępnia funkcje tłumaczące przez obiekt `res.locals`. Umożliwia też korzystanie z funkcji `t` oraz `getIntlayer` w całej obsłudze żądań.

## Użycie

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Opis

Middleware wykonuje następujące zadania:

1. **Wykrywanie lokalizacji (locale)**: Sprawdza ciasteczka, nagłówki (np. `Accept-Language`) oraz parametry URL, aby określić lokalizację użytkownika.
2. **Ustawienie kontekstu**: wypełnia `res.locals` następującymi wartościami:
   - `locale`: wykryta lokalizacja.
   - `t`: funkcja tłumacząca powiązana z wykrytą lokalizacją.
   - `getIntlayer`: funkcja pobierająca słowniki powiązane z wykrytą lokalizacją.
3. **Async Local Storage**: ustawia kontekst umożliwiający użycie globalnych funkcji `t` i `getIntlayer` importowanych z `express-intlayer` w przebiegu żądania.
