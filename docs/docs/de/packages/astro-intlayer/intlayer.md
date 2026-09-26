---
createdAt: 2026-01-21
updatedAt: 2026-09-19
priority: 5
title: intlayer Integrationsdokumentation | astro-intlayer
description: Erfahren Sie, wie Sie die intlayer Astro-Integration in astro.config.mjs konfigurieren und verwenden.
keywords:
  - intlayer
  - astro
  - astro-intlayer
  - integration
  - i18n
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - intlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Integrationsdokumentation mit Middleware- und Hooks-Details aktualisiert"
  - version: 8.0.0
    date: 2026-01-21
    changes: "Initiale Dokumentation"
author: aymericzip
---

# intlayer Astro Integrationsdokumentation

Die `intlayer`-Integration für Astro konfiguriert Ihr Projekt für mehrsprachige Internationalisierung (i18n). Sie übernimmt die Wörterbuchvorbereitung zur Build-Zeit, die Injektion von Vite-Plugins, die automatische Registrierung der Request-Middleware und die Ausgabe lokalisierter vorgerenderter Seiten.

## Verwendung

Fügen Sie `intlayer()` zu Ihrer `astro.config.mjs` hinzu:

```ts fileName="astro.config.mjs"
import { defineConfig } from "astro/config";
import { intlayer } from "astro-intlayer";

export default defineConfig({
  integrations: [intlayer()],
});
```

Das Codemod der Astro CLI (`astro add astro-intlayer`) generiert ebenfalls einen Standard-Import, der unterstützt wird:

```ts
import intlayer from "astro-intlayer";
```

## Beschreibung

Die Integration bindet sich in den Build- und Laufzeit-Lebenszyklus von Astro ein:

1. **Konfigurations-Setup (`astro:config:setup`)**:
   - **Wörterbuchvorbereitung**: Bereitet Intlayer-Wörterbücher und generierte Typen vor dem Build-Lauf vor.
   - **Vite-Plugins**: Injiziert Plugins für Vite-Aliase (für nahtlose Wörterbuchimporte), Locale-Routing-Proxys und Build-Bereinigung.
   - **Middleware-Registrierung**: Injiziert automatisch `astro-intlayer/middleware` in die Middleware-Kette Ihres Projekts und füllt `Astro.locals.intlayer` bei jeder eingehenden Anfrage.
2. **Build abgeschlossen (`astro:build:done`)**:
   - **Seiten-Umschreibungen**: Überprüft lokalisierte URL-Umschreibungsregeln und gibt vorgerenderte HTML-Seiten an ihren entsprechenden lokalisierten Pfaden aus.

## Was standardmäßig bereitgestellt wird

Nach der Konfiguration kann Ihre Astro-Anwendung sofort Folgendes nutzen:

- Die Hooks `useIntlayer`, `useDictionary` und `useLocale` im Frontmatter von `.astro`-Komponenten.
- Das Objekt `Astro.locals.intlayer` in Astro-Endpunkten und -Seiten.
- Clientseitige Importe in `<script>`-Blöcken, die dieselbe API mit reaktiven Updates widerspiegeln.
- Integrierte Formatierer unter `astro-intlayer/format` (`useDate`, `useNumber`, `useCurrency`, etc.).

## Zugehörige Dokumentation

- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useLocale.md)
- [Middleware `onRequest`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/onRequest.md)
