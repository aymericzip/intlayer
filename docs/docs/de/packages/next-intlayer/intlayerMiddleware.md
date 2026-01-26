---
createdAt: 2026-01-21
updatedAt: 2026-01-21
title: intlayerMiddleware-Dokumentation | next-intlayer
description: Sehen Sie, wie die intlayerMiddleware-Funktion für das next-intlayer-Paket verwendet wird
keywords:
  - intlayerMiddleware
  - nextjs
  - middleware
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - next-intlayer
  - intlayerMiddleware
history:
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentation initialisiert
---

# intlayerMiddleware-Dokumentation

Die Funktion `intlayerMiddleware` ist ein Next.js-Middleware, das lokalisierungsbasiertes Routing und Weiterleitungen verwaltet. Sie erkennt automatisch die bevorzugte Locale des Benutzers und leitet bei Bedarf zur passenden lokalisierten Route weiter.

## Verwendung

```ts
// middleware.ts
export { intlayerMiddleware as middleware } from "next-intlayer";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## Beschreibung

Die Middleware führt die folgenden Aufgaben aus:

1. **Locale Detection**: Sie prüft den URL-Pfad, Cookies und den `Accept-Language`-Header, um die Locale des Nutzers zu bestimmen.
2. **Redirection**: Wenn die URL kein Locale-Präfix enthält und die Konfiguration eines erfordert (oder basierend auf den Präferenzen des Nutzers), leitet sie zur lokalisierten URL weiter.
3. **Cookie Management**: Sie kann die erkannte Locale in einem Cookie für zukünftige Anfragen speichern.

## Parameter

Die Funktion erwartet das standardmäßige Next.js `NextRequest` als Parameter, wenn sie direkt verwendet wird, oder sie kann wie oben exportiert werden.
