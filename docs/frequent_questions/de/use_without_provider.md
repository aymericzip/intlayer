---
createdAt: 2026-09-28
updatedAt: 2026-09-28
priority: 4
title: "Kann ich Intlayer ohne globalen Provider verwenden?"
description: "Intlayer-Inhalte ohne Provider lesen, wie die Locale auf dem Server und im Browser aufgelöst wird, und der Performance-Unterschied zu einem Provider."
keywords:
  - Provider
  - IntlayerProvider
  - getIntlayer
  - getIntlayerAsync
  - useIntlayer
  - Locale
  - Performance
  - Hydration
  - intlayer
slugs:
  - frequent-questions
  - use-without-provider
author: aymericzip
---

# Kann ich Intlayer ohne globalen Provider verwenden?

Ja. `getIntlayer` und `getDictionary` sind einfache Funktionen, die keinen Provider benötigen, und `useIntlayer` funktioniert auch außerhalb eines Providers.

```ts
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Keine Locale übergeben
```

## Welche Locale wird verwendet?

Eine explizit übergebene Locale hat immer Vorrang. Andernfalls wird die Locale in dieser Reihenfolge aufgelöst:

1. **Die Locale der aktuellen Anfrage**, auf dem Server, wenn eine Intlayer-Integration sie verarbeitet: die Middlewares von `express-intlayer`, `fastify-intlayer`, `hono-intlayer`, `adonis-intlayer`, `elysia-intlayer`, `remix-intlayer` und `astro-intlayer` oder `IntlayerProvider` in React Server Components.
2. **Die im Browser gespeicherte Locale** (Cookie, `localStorage`, `sessionStorage`), die dein Sprachumschalter speichert.
3. **Die `defaultLocale`** deiner Konfiguration.

Jede Anfrage wird aus ihren eigenen Cookies und Headern aufgelöst und in einem anfragespezifischen Kontext gehalten. Gleichzeitige Nutzer mit unterschiedlichen Locales teilen sich nie eine Locale.

Dieselbe Auflösung gilt für `getDictionary`, für die von der [Build-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) umgeschriebenen Aufrufe sowie für `useIntlayer` und `useDictionaryDynamic`, wenn sie außerhalb eines Providers gerendert werden.

- [Build-Optimierung](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md)

### Next.js Server Components

In Next.js ist die Locale der Anfrage nur asynchron lesbar, über `headers()` und `cookies()`. Verwende [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayerAsync.md), das auf sie genauso wartet wie `getLocale()` aus `next-intlayer/server`:

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayerAsync.md)

```tsx
import { getIntlayerAsync } from "intlayer";

export const generateMetadata = async () => {
  const { title } = await getIntlayerAsync("app"); // Locale der Anfrage

  return { title };
};
```

Das Lesen der Header schaltet die Route auf dynamisches Rendering um. Stellt `IntlayerProvider` die Locale bereits bereit, werden die Header nicht gelesen und die Route bleibt statisch.

## Performance: mit oder ohne Provider

Der Inhalt ist derselbe. Der Unterschied betrifft Reaktivität und Rendering-Kosten.

|                           | Mit Provider                                           | Ohne Provider                                                                                                                                    |
| ------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Locale-Wechsel            | Komponenten werden direkt neu gerendert, ohne Neuladen | Nichts wird neu gerendert; die neue Locale erscheint beim nächsten Aufruf (Navigation, Neuladen)                                                 |
| Kosten eines Lesezugriffs | Kontextzugriff und Abonnement der Locale               | Ein memoisierter Funktionsaufruf, dasselbe Objekt für dieselbe `key + locale`                                                                    |
| Kosten eines Wechsels     | Neues Rendern jedes Konsumenten                        | Keine                                                                                                                                            |
| Server-Rendering          | Server und Browser rendern dieselbe Locale             | Außerhalb einer Anfrage-Integration rendert der Server die `defaultLocale` und der Browser die gespeicherte Locale: möglicher Hydration-Mismatch |
| Bundle                    | Der Provider-Code                                      | Etwa 100 Byte (gzip), um die gespeicherte Locale zu lesen, zwischengespeichert bis zum nächsten Wechsel                                          |

Behalte den Provider für interaktive Apps, die die Locale direkt wechseln oder auf dem Server rendern. Verzichte darauf bei Backends, Skripten, statischen Seiten, deren Locale aus der URL kommt (übergib sie explizit), oder Code, der Inhalte nur einmal liest.

Siehe [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md) für weitere Details.

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md)
