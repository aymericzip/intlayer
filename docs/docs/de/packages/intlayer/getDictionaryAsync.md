---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync Function Documentation | intlayer
description: Erfahren Sie, wie Sie die getDictionaryAsync-Funktion für das intlayer-Paket verwenden
keywords:
  - getDictionaryAsync
  - dictionary
  - dynamic dictionaries
  - loader map
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
  - getDictionaryAsync
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Dokumentation: `getDictionaryAsync` Funktion in `intlayer`

## Beschreibung

Die `getDictionaryAsync` Funktion lädt einen **einzelnen Locale-Chunk** eines Wörterbuchs und gibt seinen interpretierten Inhalt zurück.

Sie ist das Gegenstück von [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getDictionary.md) für die pro-Locale Loader Maps, die in `.intlayer/dynamic_dictionaries/` emittiert werden: Anstatt ein Wörterbuch zu erhalten, das jede Locale enthält, erhält sie die Loader Map und wartet nur auf den Chunk, den die angeforderte Locale benötigt.

> Im Anwendungscode rufen Sie normalerweise [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayerAsync.md) auf, nicht diese Funktion. Die [Build Plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/bundle_optimization.md) schreiben jeden `getIntlayerAsync('key', locale)` Aufruf in einen `getDictionaryAsync(loaderMap, 'key', locale)` Aufruf um. `getDictionaryAsync` wird für benutzerdefinierte Loader und für Tools exportiert, die ihre eigenen Loader Maps erstellen.

**Hauptmerkmale:**

- Lädt nur den Locale-Chunk, der angefordert wird
- Unterstützt einfache (`locale → loader`) und qualifizierte (`locale → qualifierId → loader`) Loader Maps
- Dedupliziert gleichzeitige Ladevorgänge des gleichen Chunks und cacht den aufgelösten Inhalt
- Fehlgeschlagene Ladevorgänge werden aus dem Cache entfernt, sodass ein späterer Aufruf den Chunk erneut versucht

---

## Funktionssignatur

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Erforderlich
  key: string,                                           // Erforderlich
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                                    // Optional
): Promise<DeepTransformContent<...>>
```

---

## Parameter

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Beschreibung**: Die Loader-Map pro Locale. Plain Maps verknüpfen ein Locale mit einem Loader; qualified Maps (verwendet für Collections und Varianten) verknüpfen ein Locale mit einer Qualifier-ID und dann mit einem Loader. Bei einer qualified Map werden nur die Chunk(s) geladen, auf die der Selector abzielt.
  - **Typ**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Erforderlich**: Ja

- `key: string`
  - **Beschreibung**: Der Dictionary-Key, wird zur Namespacing des Chunk-Cache verwendet.
  - **Typ**: `string`
  - **Erforderlich**: Ja

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Beschreibung**: Das Locale zur Interpretation des Inhalts oder ein Selector-Objekt (`{ item }`, `{ variant }`, optional mit `locale`). Siehe [dynamische Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md).
  - **Typ**: `LocalesValues | DictionarySelector`
  - **Erforderlich**: Nein (Optional) — standardmäßig das konfigurierte `defaultLocale`.

- `plugins: Plugins[]`
  - **Beschreibung**: Node-Transformer. Standardmäßig das Base-Interpreter-Set.
  - **Typ**: `Plugins[]`
  - **Erforderlich**: Nein (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

---

## Beispielverwendung

### Mit einer generierten Loader-Map

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### Mit einer benutzerdefinierten Loader-Map

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### Mit einem Selector auf einer qualified map

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

---

## Verhaltenshinweise

### Caching und Deduplication

Der Cache speichert das **Promise** jedes `key + locale + selector` Triplets, sodass gleichzeitige Aufrufe für denselben Chunk auf einen einzelnen Load warten. Ein abgelehnter Load wird aus dem Cache entfernt, sodass ein fehlgeschlagener Chunk beim nächsten Aufruf erneut versucht wird, anstatt denselben Fehler immer wieder zu wiederholen.

### Locale-Fallback

Eine einfache Loader-Map wird entlang der gleichen Fallback-Kette wie im synchronen Modus durchlaufen: zuerst das angeforderte Locale, dann seine Fallbacks, dann `null`, wenn keiner einen Chunk ausgegeben hat.

---

## Verwandte Funktionen

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getIntlayerAsync.md): Die Funktion, die Anwendungen aufrufen; Build-Plugins schreiben sie in `getDictionaryAsync` um.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/packages/intlayer/getDictionary.md): Synchrones Pendant, das ein vollständiges Dictionary nimmt.
- [Dynamische Dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/dynamic_dictionaries/index.md): Collections und Varianten sowie die Loader-Maps, die sie generieren.

---

## TypeScript

```typescript
function getDictionaryAsync<
  const T extends Dictionary,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionaryLoaders: PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap,
  key: string,
  localeOrSelector?: A,
  plugins?: Plugins[]
): Promise<
  DeepTransformContent<
    T["content"],
    IInterpreterPluginState,
    ExtractSelectorLocale<A>
  >
>;
```
