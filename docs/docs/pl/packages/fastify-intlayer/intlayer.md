---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: Dokumentacja wtyczki intlayer dla Fastify | fastify-intlayer
description: Zobacz, jak używać wtyczki intlayer dla pakietu fastify-intlayer
keywords:
  - intlayer
  - fastify
  - plugin
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
slugs:
  - doc
  - packages
  - fastify-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Init doc
---

# Dokumentacja wtyczki intlayer dla Fastify

Wtyczka `intlayer` dla Fastify wykrywa locale użytkownika i dekoruje obiekt żądania funkcjami Intlayer. Umożliwia również użycie globalnych funkcji tłumaczeniowych w kontekście żądania.

## Użycie

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    pl: "Cześć",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Opis

Wtyczka wykonuje następujące zadania:

1. **Wykrywanie lokalizacji**: Analizuje żądanie (nagłówki, ciasteczka itp.), aby określić preferowaną lokalizację użytkownika.
2. **Dekorowanie żądania**: Dodaje właściwość `intlayer` do obiektu `FastifyRequest`, zawierającą:
   - `locale`: Wykryta lokalizacja.
   - `t`: Funkcja tłumacząca.
   - `getIntlayer`: Funkcja do pobierania słowników.
3. **Zarządzanie kontekstem**: Używa `cls-hooked` do zarządzania asynchronicznym kontekstem, umożliwiając globalnym funkcjom Intlayer dostęp do lokalizacji specyficznej dla żądania.
