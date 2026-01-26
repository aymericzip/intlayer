---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Fastify Plugin Dokumentation | fastify-intlayer
description: Anleitung zur Verwendung des intlayer-Plugins für das fastify-intlayer-Paket
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

# intlayer Fastify Plugin Dokumentation

Das `intlayer`-Plugin für Fastify ermittelt die Locale des Benutzers und dekoriert das Request-Objekt mit Intlayer-Funktionen. Es ermöglicht außerdem die Verwendung globaler Übersetzungsfunktionen innerhalb des Request-Kontexts.

## Verwendung

```ts
import Fastify from "fastify";
import { intlayer } from "fastify-intlayer";

const fastify = Fastify();

fastify.register(intlayer);

fastify.get("/", async (req, reply) => {
  const content = req.intlayer.t({
    de: "Hallo",
    en: "Hello",
    fr: "Bonjour",
  });

  return content;
});
```

## Beschreibung

Das Plugin führt die folgenden Aufgaben aus:

1. **Locale-Erkennung**: Es analysiert die Anfrage (Header, Cookies usw.), um die bevorzugte Locale des Benutzers zu ermitteln.
2. **Request-Dekoration**: Es fügt dem `FastifyRequest`-Objekt eine `intlayer`-Eigenschaft hinzu, die enthält:
   - `locale`: Die erkannte Locale.
   - `t`: Eine Übersetzungsfunktion.
   - `getIntlayer`: Eine Funktion zum Abrufen von Wörterbüchern.
3. **Kontextverwaltung**: Es verwendet `cls-hooked`, um einen asynchronen Kontext zu verwalten, wodurch globale Intlayer-Funktionen auf die anfragebezogene Locale zugreifen können.
