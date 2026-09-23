---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionaryAsync Function Documentation | intlayer
description: See how to use the getDictionaryAsync function for intlayer package
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

# Documentation: `getDictionaryAsync` Function in `intlayer`

## Description

The `getDictionaryAsync` function loads a **single locale chunk** of a dictionary and returns its interpreted content.

It is the counterpart of [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getDictionary.md) for the per-locale loader maps emitted in `.intlayer/dynamic_dictionaries/`: instead of receiving a dictionary holding every locale, it receives the loader map and awaits only the chunk the requested locale needs.

> In application code you normally call [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayerAsync.md), not this function. The [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) rewrite every `getIntlayerAsync('key', locale)` call into a `getDictionaryAsync(loaderMap, 'key', locale)` one. `getDictionaryAsync` is exported for custom loaders and for tooling that builds its own loader maps.

**Key Features:**

- Loads only the locale chunk that is requested
- Supports plain (`locale → loader`) and qualified (`locale → qualifierId → loader`) loader maps
- Deduplicates concurrent loads of the same chunk, and caches the resolved content
- Failed loads are evicted from the cache so a later call retries the chunk

## Function Signature

```typescript
getDictionaryAsync(
  dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap, // Required
  key: string,                                           // Required
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                                    // Optional
): Promise<DeepTransformContent<...>>
```

## Parameters

- `dictionaryLoaders: PlainDynamicLoaderMap | QualifiedDynamicLoaderMap`
  - **Description**: The per-locale loader map. Plain maps associate a locale with a loader; qualified maps (used by collections and variants) associate a locale with a qualifier id, then with a loader. For a qualified map, only the chunk(s) the selector targets are loaded.
  - **Type**: `PlainDynamicLoaderMap<T> | QualifiedDynamicLoaderMap`
  - **Required**: Yes

- `key: string`
  - **Description**: The dictionary key, used to namespace the chunk cache.
  - **Type**: `string`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: The locale to interpret the content with, or a selector object (`{ item }`, `{ variant }`, optionally with `locale`). See [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Node transformers. Defaults to the base interpreter set.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the loaded chunk.
- **Description**: Resolves to `null` when the map emits no chunk for the requested locale nor for any of its fallbacks, mirroring how a missing qualified coordinate resolves.

## Example Usage

### With a generated loader map

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionaryAsync } from "intlayer";
import appLoaderMap from "../.intlayer/dynamic_dictionaries/app";

const { title } = await getDictionaryAsync(appLoaderMap, "app", "fr");
```

### With a custom loader map

```typescript
import { getDictionaryAsync } from "intlayer";

const loaderMap = {
  en: () => import("./banner.en.json").then((mod) => mod.default),
  fr: () => import("./banner.fr.json").then((mod) => mod.default),
};

const banner = await getDictionaryAsync(loaderMap, "banner", "fr");
```

### With a selector on a qualified map

```typescript
import { getDictionaryAsync } from "intlayer";

const promoBanner = await getDictionaryAsync(bannerLoaderMap, "banner", {
  variant: "black-friday",
  locale: "fr",
});
```

## Behaviour Notes

### Caching and deduplication

The cache stores the **promise** of each `key + locale + selector` triple, so concurrent calls for the same chunk await a single load. A rejected load is removed from the cache, so a failing chunk is retried on the next call instead of replaying the same failure forever.

### Locale fallback

A plain loader map is walked along the same fallback chain as the synchronous mode: the requested locale first, then its fallbacks, then `null` if none emitted a chunk.

## Related Functions

- [`getIntlayerAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayerAsync.md): The function applications call; build plugins rewrite it into `getDictionaryAsync`.
- [`getDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getDictionary.md): Synchronous counterpart taking a full dictionary.
- [Dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md): Collections and variants, and the loader maps they generate.

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
