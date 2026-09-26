---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Intlayer Kontext Dokumentation | remix-intlayer
description: Erfahren Sie, wie Sie den Intlayer-Request-Kontextschlüssel und die Eigenschaft in Remix 3-Anwendungen verwenden.
keywords:
  - Intlayer
  - remix
  - remix-3
  - kontext
  - RequestContext
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - Intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# Intlayer Kontext Dokumentation

In `remix-intlayer` ist `Intlayer` der `RequestContext`-Schlüssel, der für den Zugriff auf den Internationalisierungszustand innerhalb von Remix 3-Request-Handlern verwendet wird.

## Verwendung

Wenn die `intlayer()`-Middleware ausgeführt wird, speichert sie ein `IntlayerState`-Objekt im Anfragekontext unter dem Schlüssel `Intlayer`. Sie können es in jedem Routen-Handler abrufen:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, Intlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/profile", (context) => {
  // Zugriff über context.get(Intlayer)
  const { locale, defaultLocale, availableLocales } = context.get(Intlayer);

  return Response.json({
    locale,
    defaultLocale,
    availableLocales,
  });
});
```

Sie können auch über die direkte Eigenschaft `context.intlayer` zugreifen:

```ts
router.get("/api/status", (context) => {
  const currentLocale = context.intlayer.locale;
  return Response.json({ status: "ok", locale: currentLocale });
});
```

## Struktur von `IntlayerState`

Das `IntlayerState`-Objekt enthält:

| Eigenschaft        | Typ                 | Beschreibung                                                 |
| ------------------ | ------------------- | ------------------------------------------------------------ |
| `locale`           | `DeclaredLocales`   | Die für die aktuelle Anfrage aufgelöste Locale.              |
| `defaultLocale`    | `DeclaredLocales`   | Die in `intlayer.config.ts` konfigurierte Fallback-Locale.   |
| `availableLocales` | `DeclaredLocales[]` | Liste aller im Projekt konfigurierten unterstützten Locales. |

## Zugehörige Dokumentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/intlayerMiddleware.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useLocale.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useIntlayer.md)
