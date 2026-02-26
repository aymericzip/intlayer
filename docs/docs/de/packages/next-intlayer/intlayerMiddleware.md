---
createdAt: 2026-01-21
updatedAt: 2026-02-25
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
  - version: 8.1.7
    date: 2026-02-25
    changes: intlayerMiddleware in intlayerProxy umbenannt
  - version: 8.0.0
    date: 2026-01-21
    changes: Dokumentation initialisiert
---

# intlayerProxy (intlayerMiddleware)-Dokumentation

Die Funktion `intlayerProxy` (`intlayerMiddleware` für nextjs < 16) ist ein Next.js-Middleware, das lokalisierungsbasiertes Routing und Weiterleitungen verwaltet. Sie erkennt automatisch die bevorzugte Locale des Benutzers und leitet bei Bedarf zur passenden lokalisierten Route weiter.

## Verwendung

<Tabs>
 <Tab value="nextjs >=16">

```ts fileName="proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
 <Tab value="nextjs <=15">

```ts fileName="middleware.ts"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

 </Tab>
</Tabs>

## Beschreibung

Die Middleware führt die folgenden Aufgaben aus:

1. **Locale Detection**: Sie prüft den URL-Pfad, Cookies und den `Accept-Language`-Header, um die Locale des Nutzers zu bestimmen.
2. **Redirection**: Wenn die URL kein Locale-Präfix enthält und die Konfiguration eines erfordert (oder basierend auf den Präferenzen des Nutzers), leitet sie zur lokalisierten URL weiter.
3. **Cookie Management**: Sie kann die erkannte Locale in einem Cookie für zukünftige Anfragen speichern.

## Parameter

Die Funktion erwartet das standardmäßige Next.js `NextRequest` als Parameter, wenn sie direkt verwendet wird, oder sie kann wie oben exportiert werden.

## Konfiguration

Um das Middleware zu konfigurieren, können Sie die Option `routing` in der Datei `intlayer.config.ts` einrichten. Siehe [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) für weitere Details.
