---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayerAsync Function Documentation | intlayer
description: See how to use the getIntlayerAsync function for intlayer package
keywords:
  - getIntlayerAsync
  - dictionary
  - dynamic import
  - metadata
  - bundle optimization
  - Intlayer
  - intlayer
  - Internationalization
  - Documentation
  - JavaScript
  - TypeScript
slugs:
  - doc
  - packages
  - intlayer
  - getIntlayerAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentation: `getIntlayerAsync` Funktion in `intlayer`

## Beschreibung

Die Funktion `getIntlayerAsync` wählt ein Dictionary nach seinem Schlüssel aus und löst seinen Inhalt für ein bestimmtes Locale auf, **wobei nur dieses Locale geladen wird**.

Es ist das asynchrone Gegenstück zu [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md), gedacht für Stellen, an denen ein Dictionary außerhalb des Rendering gelesen wird — Route `head` / Metadata Builder, Loader, Server Functions.

Während `getIntlayer` das zusammengeführte Dictionary mit jedem Locale einzieht, schreiben die [Build Plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) diesen Aufruf in `getDictionaryAsync(loaderMap, key, locale)` um und verweisen auf die Locale-spezifischen Chunks in `.intlayer/dynamic_dictionaries/`. Das Bundle enthält daher nur noch das tatsächlich angeforderte Locale.

Ohne diese Plugins — ein nicht optimierter Build — wird der Aufruf stattdessen durch die synchrone Dictionary Registry aufgelöst: derselbe Inhalt, aber ohne die Locale-spezifische Aufteilung.

**Wichtigste Funktionen:**

- Gleiche typisierte Schlüssel, Selektoren und zurückgegebener Inhalt wie `getIntlayer`
- Lädt in optimierten Builds nur den angeforderten Locale-Chunk
- Gleichzeitige Aufrufe für denselben Chunk teilen sich einen einzelnen Load
- Sicher zu verwenden in `async` Metadata Buildern, Loadern und Server Functions

---

## Funktionssignatur

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Erforderlich
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                         // Optional
): Promise<DeepTransformContent<...>>
```

---

## Parameter

- `key: DictionaryKeys`
  - **Beschreibung**: Der Schlüssel des zu lesenden Wörterbuchs, wie in deinen Content-Dateien deklariert.
  - **Typ**: `DictionaryKeys` — eine Union aller deklarierten Wörterbuchschlüssel.
  - **Erforderlich**: Ja

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Beschreibung**: Die Locale zur Interpretation des Inhalts oder ein Selector-Objekt für [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md).
    - `'fr'` — eine Locale
    - `{ item: 2 }` — ein [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/collections.md)-Element (omit `item` um jedes Element als Array zu erhalten)
    - `{ variant: 'black-friday' }` — eine benannte [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md) (omit für die `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — eine strukturierte Variante
    - Jeder Selector kann eine Locale tragen: `{ item: 2, locale: 'fr' }`
  - **Typ**: `LocalesValues | DictionarySelector`
  - **Erforderlich**: Nein (Optional) — standardmäßig auf die konfigurierte `defaultLocale`.

- `plugins: Plugins[]`
  - **Beschreibung**: Benutzerdefinierte Node-Transformer, die die Standard-Interpreter-Plugins ersetzen. Nur für fortgeschrittene Verwendung.
  - **Typ**: `Plugins[]`
  - **Erforderlich**: Nein (Optional)

### Rückgabewert

- **Type**: `Promise<Content>` — ein Promise, das sich zum interpretierten Inhalt des Wörterbuchs auflöst, typisiert aus Ihrer Deklaration.

---

## Beispielverwendung

### Grundlegende Verwendung

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

### In einer TanStack Start Route `head`

Da der Locale-Chunk on demand geladen wird, wird `head` zu `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayerAsync } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale } = params;

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

### In a Next.js `generateMetadata`

```tsx fileName="src/app/[locale]/page.tsx"
import { getIntlayerAsync } from "intlayer";
import type { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await params;
  const { title, description } = await getIntlayerAsync(
    "page-metadata",
    locale
  );

  return { title, description };
};
```

### In einer Server-Funktion

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { getCookie, getIntlayerAsync, getLocale } from "intlayer";

export const getLocalizedContent = createServerFn().handler(async () => {
  const locale = await getLocale({
    getCookie: (name) => getCookie(name, getRequestHeader("cookie")),
    getHeader: (name) => getRequestHeader(name),
  });

  const content = await getIntlayerAsync("app", locale);

  return { locale, content };
});
```

---

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Returns            | Der Inhalt                                                                                                      | Ein Promise des Inhalts                                     |
| Dictionary loaded  | Das zusammengeführte Wörterbuch (alle Locales)                                                                  | Das Chunk der angeforderten Locale nur                      |
| Best suited for    | Rendering, synchrone Code-Pfade                                                                                 | Metadaten, Loader, Server-Funktionen                        |
| Requires a plugin? | Nein                                                                                                            | Nein — die Per-Locale-Aufteilung benötigt die Build-Plugins |

Beide akzeptieren die gleichen Argumente und geben den gleichen Inhalt zurück: Der Wechsel von einem zum anderen ändert nur **wann** und **wie viel** geladen wird.

---

## Verwandte Funktionen

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayer.md): Synchrones Äquivalent, das das zusammengeführte Dictionary liest.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getDictionaryAsync.md): Die Low-Level-Funktion, die die Build-Plugins in diesen Aufruf umschreiben.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getLocale.md): Erkennt das Locale einer eingehenden Anfrage.

---

## TypeScript

```typescript
function getIntlayerAsync<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    DictionaryRegistryResult<T, A>,
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
