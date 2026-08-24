---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getIntlayer Function Documentation | intlayer
description: Siehe, wie du die getIntlayer-Funktion für das intlayer-Paket verwendest
keywords:
  - getIntlayer
  - dictionary
  - content
  - selector
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
  - getIntlayer
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentation: `getIntlayer` Funktion in `intlayer`

## Beschreibung

Die Funktion `getIntlayer` wählt ein Wörterbuch nach seinem Schlüssel aus und gibt seinen Inhalt interpretiert für ein bestimmtes Gebietsschema zurück. Sie ist das Framework-agnostische Äquivalent des Hooks `useIntlayer`: derselbe Inhalt, dieselben Selektoren, aber überall dort einsetzbar, wo ein React Context nicht verfügbar ist — Node-Skripte, Server-Funktionen, Route Loader, Metadata-Builder, Express/Fastify-Handler, Tests.

Sie liest die von Intlayer in `.intlayer/` generierten Wörterbücher, sodass das Argument `key` typisiert und automatisch aus deinen eigenen Content-Deklarationen vervollständigt wird, und das zurückgegebene Objekt ist vollständig typisiert bis auf jedes Blatt.

**Hauptfunktionen:**

- Typisierte Wörterbuch-Schlüssel und typisierter zurückgegebener Inhalt
- Interpretiert jeden Content-Knoten (`t()`, `enu()`, `cond()`, `insert()`, `nest()`, `md()`, `html()`, `file()`, `gender()`)
- Akzeptiert ein Gebietsschema oder ein Selector-Objekt (Collections, Varianten)
- Ergebnisse werden pro `key + locale + selector` im Speicher gespeichert
- Fällt in der Entwicklung auf einen sicheren Proxy zurück, wenn ein Wörterbuch fehlt, anstatt zu crashen

---

## Funktionssignatur

```typescript
getIntlayer(
  key: DictionaryKeys,                        // Erforderlich
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                         // Optional
): DeepTransformContent<...>
```

---

## Parameter

- `key: DictionaryKeys`
  - **Description**: Der Schlüssel des zu lesenden Wörterbuchs, wie in deinen Content-Dateien deklariert.
  - **Type**: `DictionaryKeys` — eine Vereinigung aller deklarierten Wörterbuchschlüssel.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: Das Locale zur Interpretation des Inhalts oder ein Selector-Objekt für [dynamische Wörterbücher](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md).
    - `'fr'` — ein Locale
    - `{ item: 2 }` — ein [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/collections.md) Element (omit `item` um alle Elemente als Array zu erhalten)
    - `{ variant: 'black-friday' }` — eine benannte [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/variants.md) (omit für die `default`)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — eine strukturierte Variante
    - Jeder Selector kann ein Locale enthalten: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Custom Node Transformer, die die Basis-Interpreter-Plugins ersetzen. Nur für fortgeschrittene Verwendung; omit it to keep the default behaviour.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Rückgabewert

- **Type**: Der interpretierte Inhalt des Wörterbuchs, typisiert aus Ihrer Deklaration.
- **Description**: Ein einfaches Objekt, das das `content`-Feld Ihres Wörterbuchs widerspiegelt, wobei jeder Intlayer-Knoten auf seinen Endwert für das angeforderte Locale aufgelöst wurde.

---

## Beispielverwendung

### Grundlegende Verwendung

```typescript fileName="src/app.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    title: t({
      de: "Hallo",
      en: "Hello",
      fr: "Bonjour",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app", "de"); // "Hallo"
```

### Ohne Locale

Das Weglassen der Locale interpretiert den Inhalt mit dem `defaultLocale`, der in Ihrer [Konfiguration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/configuration.md) deklariert ist.

```typescript
import { getIntlayer } from "intlayer";

const { title } = getIntlayer("app"); // Interpretiert mit der Standard-Locale
```

### Inside a server handler

```typescript fileName="src/routes/greeting.ts" codeFormat="typescript"
import { getIntlayer, getLocale } from "intlayer";

export const greetingHandler = async (request: Request) => {
  const locale = await getLocale({
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  const { title } = getIntlayer("app", locale);

  return Response.json({ title });
};
```

### Mit einem Selector (Collections und Varianten)

```typescript
import { getIntlayer } from "intlayer";

// Ein einzelnes Collection-Element
const secondPost = getIntlayer("blog-post", { item: 2, locale: "fr" });

// Alle Elemente der Collection als sortiertes Array
const allPosts = getIntlayer("blog-post", { locale: "fr" });

// Eine benannte Variante
const banner = getIntlayer("banner", { variant: "black-friday", locale: "fr" });
```

---

## Verhaltenshinweise

### Caching

Ergebnisse werden in einem Cache auf Modulebene zwischengespeichert, dessen Schlüssel `key + locale + selector` ist. Das wiederholte Aufrufen von `getIntlayer("app", "fr")` interpretiert das Dictionary einmal und gibt danach immer dasselbe Objekt zurück.

### Fehlende Wörterbücher

Beim Anfordern eines Schlüssels, der kein generiertes Wörterbuch hat, protokolliert die Entwicklung eine Warnung einmal und gibt einen sicheren Fallback-Proxy zurück: Das Lesen von `content.title` ergibt die Zeichenkette `"app.title"` anstatt einen Fehler auszulösen. Dies hält eine Seite nutzbar, während die fehlende Deklaration behoben wird. Führen Sie den Intlayer-Build (oder den Dev-Server) aus, damit das Wörterbuch generiert wird.

### Bundle-Größe

`getIntlayer` liest das zusammengeführte Wörterbuch, das **jedes** Locale enthält. In Client-Bundles schreiben die [Build-Plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) den Aufruf um, sodass nur der erforderliche Inhalt ausgeliefert wird. Wenn Sie Inhalte außerhalb des Rendering lesen (Metadaten, Loaders, Server-Funktionen) und ein einzelnes Locale bei Bedarf laden möchten, verwenden Sie stattdessen [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayerAsync.md).

---

## Verwandte Funktionen

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayerAsync.md): Asynchrones Äquivalent, das einen einzelnen Locale-Chunk lädt.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getDictionary.md): Interpretiert ein Wörterbuch-Objekt, das Sie selbst übergeben, anstatt eines, das nach Schlüssel nachgeschlagen wird.
- [`useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/react-intlayer/useIntlayer.md): Das React-Hook-Äquivalent, das das Locale vom Provider liest.

---

## TypeScript

```typescript
function getIntlayer<
  const T extends DictionaryKeys,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  key: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  DictionaryRegistryResult<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
