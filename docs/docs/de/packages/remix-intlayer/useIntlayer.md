---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: useIntlayer Hook Dokumentation | remix-intlayer
description: Erfahren Sie, wie Sie den useIntlayer-Hook in Remix 3-Anwendungen verwenden, um über Schlüssel auf lokalisierte Inhalte zuzugreifen.
keywords:
  - useIntlayer
  - wörterbuch
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - Internationalisierung
  - Dokumentation
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Init doc"
author: aymericzip
---

# useIntlayer Hook Dokumentation

Mit dem `useIntlayer`-Hook können Sie lokalisierte Inhalte aus einem Intlayer-Wörterbuch anhand eines Schlüssels in Remix 3-Anwendungen abrufen.

Er liest automatisch die aktive Locale aus dem aktuellen Anfragekontext (über `AsyncLocalStorage`), sodass Sie die Locale nicht manuell durch Routen-Handler, Ansichtsvorlagen oder Komponenten weiterreichen müssen.

## Verwendung

### In Routen-Handlern

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### In Ansichtsvorlagen / Komponenten

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parameter

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Der eindeutige Schlüssel des Wörterbuchs (wie in Ihren `.content.ts`-Deklarationsdateien definiert).
2. **`localeOrSelector`** (optional): Eine spezifische Locale oder ein Selektorobjekt (`{ item }`, `{ variant }`, optional mit `locale`). Wenn angegeben, überschreibt dies die aus dem Anfragekontext erkannte Locale.

## Beschreibung

Der Hook führt folgende Aufgaben aus:

1. **Kontext-Locale-Ermittlung**: Erkennt die aktuelle Locale aus dem anfragegebundenen `AsyncLocalStorage`-Bereich, der von der `intlayer()`-Middleware eingerichtet wurde.
2. **Wörterbuch-Abruf**: Ruft das vorkompilierte Wörterbuch ab, das dem angegebenen Schlüssel entspricht.
3. **Übersetzungsverarbeitung**: Löst Übersetzungen, Aufzählungen, Markdown und bedingte Inhalte für die aufgelöste Locale auf.
4. **Fallback-Behandlung**: Bei Aufruf außerhalb eines aktiven HTTP-Request-Kontexts greift er sauber auf die konfigurierte `defaultLocale` zurück.

## Zugehörige Dokumentation

- [`intlayer` Middleware](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/intlayerMiddleware.md)
- [`useDictionary` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useDictionary.md)
- [`useLocale` Hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/remix-intlayer/useLocale.md)
