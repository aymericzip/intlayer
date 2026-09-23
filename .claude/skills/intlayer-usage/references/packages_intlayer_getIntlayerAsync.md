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

# Documentation: `getIntlayerAsync` Function in `intlayer`

## Description

The `getIntlayerAsync` function picks one dictionary by its key and resolves its content for a given locale, **loading that locale alone**.

It is the asynchronous counterpart of [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md), meant for the places a dictionary is read outside of rendering — route `head` / metadata builders, loaders, server functions.

Where `getIntlayer` pulls in the merged dictionary holding every locale, the [build plugins](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/bundle_optimization.md) (`@intlayer/babel`, `@intlayer/swc`) rewrite this call into `getDictionaryAsync(loaderMap, key, locale)`, pointing it at the per-locale chunks in `.intlayer/dynamic_dictionaries/`. The bundle therefore only ever carries the locale actually requested.

Without those plugins — an unoptimized build — the call resolves through the synchronous dictionary registry instead: the same content, without the per-locale split.

**Key Features:**

- Same typed keys, selectors and returned content as `getIntlayer`
- Loads only the requested locale chunk in optimized builds
- Concurrent calls for the same chunk share a single load
- Safe to use in `async` metadata builders, loaders and server functions

## Function Signature

```typescript
getIntlayerAsync(
  key: DictionaryKeys,                        // Required
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                         // Optional
): Promise<DeepTransformContent<...>>
```

## Parameters

- `key: DictionaryKeys`
  - **Description**: The key of the dictionary to read, as declared in your content files.
  - **Type**: `DictionaryKeys` — a union of every declared dictionary key.
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: The locale to interpret the content with, or a selector object for [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md).
    - `'fr'` — a locale
    - `{ item: 2 }` — a [collection](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/collections.md) item (omit `item` to get every item as an array)
    - `{ variant: 'black-friday' }` — a named [variant](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/variants.md) (omit for the `default` one)
    - `{ variant: { id: 'prod_abc', userId: '123' } }` — a structured variant
    - Any selector can carry a locale: `{ item: 2, locale: 'fr' }`
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: Custom node transformers replacing the base interpreter plugins. Advanced use only.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: `Promise<Content>` — a promise resolving to the interpreted content of the dictionary, typed from your declaration.

## Example Usage

### Basic Usage

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getIntlayerAsync } from "intlayer";

const { title } = await getIntlayerAsync("app", "fr"); // "Bonjour"
```

## `getIntlayer` vs `getIntlayerAsync`

|                    | [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md) | `getIntlayerAsync`                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Returns            | The content                                                                                                     | A promise of the content                          |
| Dictionary loaded  | The merged dictionary (all locales)                                                                             | The chunk of the requested locale only            |
| Best suited for    | Rendering, synchronous code paths                                                                               | Metadata, loaders, server functions               |
| Requires a plugin? | No                                                                                                              | No — the per-locale split needs the build plugins |

Both accept the same arguments and return the same content: switching from one to the other only changes **when** and **how much** is loaded.

## Related Functions

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md): Synchronous equivalent reading the merged dictionary.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getDictionaryAsync.md): The lower-level function the build plugins rewrite this call into.
- [`getLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getLocale.md): Detects the locale of an incoming request.

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
