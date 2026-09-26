---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: intlayer Middleware Dokumentation | remix-intlayer
description: Erfahren Sie, wie Sie die intlayer-Middleware in Remix 3-Anwendungen für sprachenbasiertes Routing und Request-Kontextverwaltung verwenden.
keywords:
  - intlayer
  - intlayerMiddleware
  - remix
  - remix-3
  - middleware
  - routing
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# intlayer Remix 3 Middleware Dokumentation

Die `intlayer`-Middleware für Remix 3 verwaltet die Internationalisierungsschicht in Ihrer gesamten Anwendung. Aufgebaut auf Webstandards (`Request` und `Response`), handhabt sie sprachenbasiertes Routing (Weiterleitungen und interne Umschreibungen), erkennt die Request-Locale, speichert sie in Cookies und Headern und richtet einen `AsyncLocalStorage`-Bereich ein, sodass Downstream-Handler und -Komponenten ohne manuelles Übergeben von Props auf Übersetzungen zugreifen können.

## Verwendung

Registrieren Sie die `intlayer`-Middleware bei der Initialisierung Ihres Remix 3-Routers:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Bedient `/`, `/fr`, `/es`, die Locale wird aus der Anfrage aufgelöst
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Beschreibung

Die `intlayer`-Middleware führt folgende Aufgaben aus:

1. **Vorbereitung von Wörterbüchern**: Führt beim Start `prepareIntlayer` aus, um sicherzustellen, dass alle generierten Wörterbücher erstellt und verfügbar sind.
2. **Sprachenbasiertes Routing**: Bewertet die Anfrage anhand der konfigurierten Routing-Strategie (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Weiterleitungen**: Wenn ein Benutzer `/about` besucht und zu einem Sprachpräfix weitergeleitet werden soll (z. B. `/de/about`), gibt die Middleware eine Weiterleitungsantwort mit den entsprechenden Headern `location` und `Set-Cookie` aus.
   - **Interne Umschreibungen**: Wenn ein Benutzer auf `/de/about` zugreift, wird die URL intern umgeschrieben, sodass Ihr Routen-Handler mit `/about` übereinstimmt, während die aufgelöste Locale als `de` erfasst wird.
   - **Lokalisierte URL-Aliase**: Beachtet in `intlayer.config.ts` definierte URL-Umschreibungsregeln (z. B. Umschreiben von `/de/about` in `/de/ueber-uns`).
3. **Locale-Auflösung**: Erkennt die aktive Locale basierend auf URL-Präfix, gespeicherten Cookies, benutzerdefinierten Headern oder `Accept-Language`-Browsereinstellungen.
4. **Kontext-Injektion**:
   - Hängt `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) unter dem Schlüssel `Intlayer` und `context.intlayer` an den Remix `RequestContext` an.
   - Führt den Rest der Anfrage innerhalb eines `AsyncLocalStorage`-Bereichs (`requestStorage`) aus, wodurch `useIntlayer`, `useDictionary` und `useLocale` sauber in Handlern, Ansichten und Komponenten aufgerufen werden können.
5. **Persistenz**: Hängt ausgehende Locale-Header und -Cookies an die endgültige HTTP-Antwort an, um die Präferenz des Benutzers zu speichern.

## Parameter

Die Funktion `intlayer` akzeptiert optionale `IntlayerMiddlewareOptions`:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Benutzerdefinierte Routing-Konfigurationsüberschreibungen
};

const middleware = intlayer(options);
```

## Direkter Kontextzugriff

Zusätzlich zur Verwendung von Hooks können Sie direkt aus dem Remix-Anfragekontext auf den aufgelösten `IntlayerState` zugreifen:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Über context.get()
  const state = context.get(Intlayer);

  // Oder über die direkte Eigenschaft context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Zugehörige Dokumentation

- [`Intlayer` Kontext](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/Intlayer.md)
- [`useIntlayer` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useIntlayer.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useLocale.md)
