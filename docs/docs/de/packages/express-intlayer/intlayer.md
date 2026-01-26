---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayer Express Middleware Dokumentation | express-intlayer
description: Anleitung zur Verwendung der intlayer-Middleware des express-intlayer-Pakets
keywords:
  - intlayer
  - express
  - middleware
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - express-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Initiale Dokumentation
---

# intlayer Express Middleware Dokumentation

Die `intlayer`-Middleware für Express erkennt die Locale des Benutzers und stellt Übersetzungsfunktionen über das Objekt `res.locals` zur Verfügung. Sie ermöglicht außerdem die Verwendung der Funktionen `t` und `getIntlayer` in Ihren Request-Handlern.

## Verwendung

```ts
import express from "express";
import { intlayer } from "express-intlayer";

const app = express();

app.use(intlayer());

app.get("/", (req, res) => {
  const content = res.locals.t({
    de: "Hallo",
    en: "Hello",
    fr: "Bonjour",
  });

  res.send(content);
});
```

## Beschreibung

Die Middleware führt die folgenden Aufgaben aus:

1. **Locale-Erkennung**: Sie prüft Cookies, Header (wie `Accept-Language`) und URL-Parameter, um die Locale des Benutzers zu bestimmen.
2. **Kontextaufbau**: Sie füllt `res.locals` mit:
   - `locale`: Die erkannte Locale.
   - `t`: Eine an die erkannte Locale gebundene Übersetzungsfunktion.
   - `getIntlayer`: Eine Funktion, um an die erkannte Locale gebundene Wörterbücher abzurufen.
3. **Async Local Storage**: Es richtet einen Kontext ein, der die Verwendung der globalen Funktionen `t` und `getIntlayer`, die aus `express-intlayer` importiert werden, innerhalb des Request-Flows ermöglicht.
