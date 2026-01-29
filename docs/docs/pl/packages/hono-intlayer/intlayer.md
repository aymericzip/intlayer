---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: Dokumentacja Middleware intlayer dla Hono | hono-intlayer
description: Zobacz jak używać middleware intlayer dla pakietu hono-intlayer
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internacjonalizacja
  - Dokumentacja
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Inicjalizacja dokumentacji
---

# Dokumentacja Middleware intlayer dla Hono

Middleware `intlayer` dla Hono wykrywa język użytkownika i uzupełnia obiekt kontekstu o funkcje Intlayer. Umożliwia również korzystanie z globalnych funkcji tłumaczenia w kontekście żądania.

## Użycie

```ts
import { Hono } from "hono";
import { intlayer } from "hono-intlayer";

const app = new Hono();

app.use("*", intlayer());

app.get("/", async (c) => {
  const t = c.get("t");
  const content = t({
    en: "Hello",
    fr: "Bonjour",
    pl: "Witaj",
  });

  return c.text(content);
});
```

## Opis

Middleware wykonuje następujące zadania:

1. **Wykrywanie Języka**: Analizuje żądanie (nagłówki, pliki cookie itp.) w celu określenia preferowanego języka użytkownika.
2. **Uzupełnianie Kontekstu**: Dodaje dane Intlayer do kontekstu Hono, dostępne poprzez `c.get()`. Obejmuje to:
   - `locale`: Wykryty język.
   - `t`: Funkcja tłumaczenia.
   - `getIntlayer`: Funkcja do pobierania słowników.
   - `getDictionary`: Funkcja do przetwarzania obiektów słownika.
3. **Zarządzanie Kontekstem**: Używa `cls-hooked` do zarządzania asynchronicznym kontekstem, co pozwala globalnym funkcjom Intlayer (`t`, `getIntlayer`, `getDictionary`) na dostęp do języka specyficznego dla żądania bez przekazywania obiektu kontekstu.
