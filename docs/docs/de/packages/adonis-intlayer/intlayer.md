---
createdAt: 2026-01-30
updatedAt: 2026-01-30
title: intlayer AdonisJS Middleware Dokumentation | adonis-intlayer
description: Sehen Sie, wie Sie die intlayer-Middleware für das adonis-intlayer-Paket verwenden
keywords:
  - intlayer
  - adonisjs
  - middleware
  - Intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - adonis-intlayer
  - intlayer
history:
  - version: 8.0.0
    date: 2026-01-30
    changes: Initiale Dokumentation
---

# intlayer AdonisJS Middleware Dokumentation

Die `intlayer`-Middleware für AdonisJS erkennt die Locale des Benutzers und stellt Übersetzungsfunktionen über den Anfragekontext bereit. Sie ermöglicht auch die Verwendung globaler Übersetzungsfunktionen innerhalb des Anfrageflusses.

## Verwendung

```ts fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

```ts fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t } from "adonis-intlayer";

router.get("/", async () => {
  return t({
    en: "Hello",
    fr: "Bonjour",
  });
});
```

## Beschreibung

Die Middleware führt die folgenden Aufgaben aus:

1. **Locale-Erkennung**: Sie analysiert die Anfrage (Header, Cookies usw.), um die bevorzugte Locale des Benutzers zu bestimmen.
2. **Kontext-Einrichtung**: Sie füllt den Anfragekontext mit Locale-Informationen.
3. **Async Local Storage**: Sie verwendet `cls-hooked`, um einen asynchronen Kontext zu verwalten, der es globalen Intlayer-Funktionen wie `t`, `getIntlayer` und `getDictionary` ermöglicht, auf die anfragespezifische Locale zuzugreifen, ohne sie manuell übergeben zu müssen.

> Hinweis: Um Cookies für die Locale-Erkennung zu verwenden, stellen Sie sicher, dass `@adonisjs/cookie` konfiguriert ist und in Ihrer Anwendung verwendet wird.
