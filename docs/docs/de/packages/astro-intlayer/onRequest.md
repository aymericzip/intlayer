---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: onRequest Middleware Dokumentation | astro-intlayer
description: Erfahren Sie, wie Sie die onRequest Middleware in Astro-Anwendungen verwenden, um das Anfrage-Locale aufzulösen und Astro.locals.intlayer zu füllen.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Initiale Dokumentation"
author: aymericzip
---

# onRequest Astro Middleware Dokumentation

Die `onRequest`-Middleware aus `astro-intlayer/middleware` löst das Locale jeder eingehenden HTTP-Anfrage auf und füllt `Astro.locals.intlayer`.

Wenn Sie die `intlayer()`-Integration in `astro.config.mjs` registrieren, wird diese Middleware automatisch injiziert. Sie müssen sie nur direkt importieren, wenn Sie Astro-Middleware manuell mit `sequence(...)` zusammenstellen.

## Verwendung

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Zugriff auf das aufgelöste Locale in Ihrer benutzerdefinierten Middleware
  const { locale } = context.locals.intlayer;
  console.log(`Bearbeite Anfrage für Locale: ${locale}`);

  return next();
});
```

## Beschreibung

Die Middleware führt folgende Aufgaben aus:

1. **Locale-Erkennung**:
   - **URL**: Analysiert das URL-Pfadpräfix oder den Suchparameter `?locale=` (außer wenn `routing.mode` auf `no-prefix` gesetzt ist).
   - **Cookies / Header**: Prüft gespeicherte Locale-Cookies oder benutzerdefinierte Header-Werte.
   - **Accept-Language**: Verwendet als Fallback die bevorzugte Sprachverhandlung des Browsers.
   - Für vorgerenderte Seiten (`context.isPrerendered`) wird das Locale ausschließlich aus der URL extrahiert, um Astro-Build-Warnungen zu vermeiden.
2. **Kontext-Befüllung**: Füllt `Astro.locals.intlayer` mit:
   - `locale`: Das aufgelöste Locale.
   - `defaultLocale`: Das standardmäßige Fallback-Locale.
   - `availableLocales`: Das Array der konfigurierten Locales.
3. **AsyncLocalStorage-Bereich**: Bettet die nachfolgende Anforderungsverarbeitung in einen `AsyncLocalStorage`-Bereich ein, sodass `useIntlayer()`, `useDictionary()` und `useLocale()` auf den Anfragezustand zugreifen können, ohne Argumente zu übergeben.

## Typ `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Zugehörige Dokumentation

- [`intlayer` Integration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/astro-intlayer/useLocale.md)
