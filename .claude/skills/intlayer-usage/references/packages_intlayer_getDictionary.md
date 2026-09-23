---
createdAt: 2026-08-23
updatedAt: 2026-08-23
title: getDictionary Function Documentation | intlayer
description: See how to use the getDictionary function for intlayer package
keywords:
  - getDictionary
  - dictionary
  - interpreter
  - content
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
  - getDictionary
history:
  - version: 9.4.0
    date: 2026-08-23
    changes: "Initial documentation"
author: aymericzip
---

# Documentation: `getDictionary` Function in `intlayer`

## Description

The `getDictionary` function interprets a dictionary **object you pass yourself** and returns its resolved content for a given locale. It walks the content in a single pass and applies each interpreter plugin as needed, resolving `t()` translations, enumerations, conditions, insertions, nesting, markdown, HTML and file nodes.

Unlike [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md), which looks a dictionary up by key in the generated registry, `getDictionary` takes the dictionary itself. That makes it the right tool for content built at runtime, fetched from an API or a CMS, or declared inline in a test.

**Key Features:**

- Works with any object following the dictionary structure (`{ key, content }`)
- Also accepts a qualified dictionary group (collections, variants) together with a selector
- Fully typed: the returned object mirrors the `content` you passed
- Accepts custom interpreter plugins

## Function Signature

```typescript
getDictionary(
  dictionary: Dictionary | QualifiedDictionaryGroup, // Required
  localeOrSelector?: LocalesValues | DictionarySelector, // Optional
  plugins?: Plugins[]                                // Optional
): DeepTransformContent<...>
```

## Parameters

- `dictionary: Dictionary | QualifiedDictionaryGroup`
  - **Description**: The dictionary (or qualified dictionary group) to interpret.
  - **Type**: `Dictionary | QualifiedDictionaryGroup`
  - **Required**: Yes

- `localeOrSelector: LocalesValues | DictionarySelector`
  - **Description**: The locale to interpret the content with, or a selector object (`{ item }`, `{ variant }`, optionally with `locale`). See [dynamic dictionaries](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/index.md).
  - **Type**: `LocalesValues | DictionarySelector`
  - **Required**: No (Optional) — defaults to the configured `defaultLocale`.

- `plugins: Plugins[]`
  - **Description**: An array of node transformers defining how recognized nodes are interpreted. If omitted, the default set of interpreter plugins is used.
  - **Type**: `Plugins[]`
  - **Required**: No (Optional)

### Returns

- **Type**: The interpreted content of the dictionary.
- **Description**: The `content` you passed, with every Intlayer node resolved for the requested locale. For a collection group without an `item` selector, an ordered array of interpreted entries is returned; `null` is returned when the selector targets nothing.

## Example Usage

### Basic Usage

```typescript codeFormat={["typescript", "esm", "commonjs"]}
import { getDictionary, t } from "intlayer";

const content = getDictionary(
  {
    key: "my_key",
    content: {
      greeting: t({
        en: "Hello",
        fr: "Bonjour",
      }),
    },
  },
  "fr"
);

console.log(content.greeting); // "Bonjour"
```

### Interpreting content fetched at runtime

```typescript
import { getDictionary, type Dictionary } from "intlayer";

const remoteDictionary: Dictionary = await fetch("/api/cms/banner").then(
  (res) => res.json()
);

const banner = getDictionary(remoteDictionary, "fr");
```

### With a selector

```typescript
import { getDictionary } from "intlayer";

// A qualified dictionary group is resolved to a single entry…
const secondItem = getDictionary(blogPostGroup, { item: 2, locale: "fr" });

// …or to an ordered array when no `item` is given
const allItems = getDictionary(blogPostGroup, { locale: "fr" });
```

## Related Functions

- [`getIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getIntlayer.md): Same interpretation, but the dictionary is looked up by key in the generated registry.
- [`getDictionaryAsync`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/intlayer/getDictionaryAsync.md): Counterpart for per-locale loader maps.
- [`useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/packages/react-intlayer/useDictionary.md): The React hook equivalent, reading the locale from the provider.

## TypeScript

```typescript
function getDictionary<
  const T extends Dictionary | QualifiedDictionaryGroup,
  const A extends LocalesValues | DictionarySelector = DeclaredLocales,
>(
  dictionary: T,
  localeOrSelector?: A,
  plugins?: Plugins[]
): DeepTransformContent<
  ResolveQualifiedDictionaryContent<T, A>,
  IInterpreterPluginState,
  ExtractSelectorLocale<A>
>;
```
