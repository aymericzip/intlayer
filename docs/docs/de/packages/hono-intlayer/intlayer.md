---
createdAt: 2026-01-29
updatedAt: 2026-01-29
title: intlayer Hono Middleware Dokumentation | hono-intlayer
description: Sehen Sie, wie Sie die intlayer-Middleware für das hono-intlayer-Paket verwenden
keywords:
  - intlayer
  - hono
  - middleware
  - Intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - hono-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-29
    changes: Dokumentation initialisiert
---

# intlayer Hono Middleware Dokumentation

Die `intlayer`-Middleware für Hono erkennt das Locale des Benutzers und füllt das Kontextobjekt mit Intlayer-Funktionen. Sie ermöglicht auch die Verwendung globaler Übersetzungsfunktionen innerhalb des Anforderungskontexts.

## Verwendung

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
  });

  return c.text(content);
});
```

## Beschreibung

Die Middleware führt die folgenden Aufgaben aus:

1. **Locale-Erkennung**: Sie analysiert die Anfrage (Header, Cookies usw.), um das bevorzugte Locale des Benutzers zu bestimmen.
2. **Kontext-Population**: Sie fügt Intlayer-Daten zum Hono-Kontext hinzu, auf die über `c.get()` zugegriffen werden kann. Dies beinhaltet:
   - `locale`: Das erkannte Locale.
   - `t`: Eine Übersetzungsfunktion.
   - `getIntlayer`: Eine Funktion zum Abrufen von Wörterbüchern.
   - `getDictionary`: Eine Funktion zum Verarbeiten von Wörterbuchobjekten.
3. **Kontext-Management**: Sie verwendet `cls-hooked`, um einen asynchronen Kontext zu verwalten, der es globalen Intlayer-Funktionen (`t`, `getIntlayer`, `getDictionary`) ermöglicht, auf das anforderungsspezifische Locale zuzugreifen, ohne das Kontextobjekt zu übergeben.
