---
createdAt: 2026-06-12
updatedAt: 2026-06-26
title: Dynamic Dictionaries
description: Overview of Intlayer's dynamic dictionary features — collections and variants — for building flexible, runtime-driven i18n content.
keywords:
  - Dynamic Dictionaries
  - Collections
  - Variants
  - Intlayer
  - Internationalization
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 9.0.0
    date: 2026-06-12
    changes: "Release of the dynamic dictionaries feature"
  - version: 9.1.0
    date: 2026-06-26
    changes: "Merged dynamic records into variants — `variant` now accepts a string or an object"
author: aymericzip
---

# Dynamic Dictionaries

Intlayer supports two mechanisms for expressing content that goes beyond a single static dictionary per key. Each is declared through a **top-level metadata field** in the content file; no wrapper function is needed.

| Feature                                                                                                          | Metadata field                          | Selector in `useIntlayer`                       |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ----------------------------------------------- |
| [Collections](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/collections.md) | `item: N`                               | `{ item: N }`                                   |
| [Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/variants.md)       | `variant: "name"` _or_ `variant: { … }` | `{ variant: "name" }` _or_ `{ variant: { … } }` |

Both compose with the locale argument and support selective / lazy loading via `importMode`.

## When to use which

- **Collections** — ordered list of items managed in separate files (FAQ entries, blog posts, products).
- **Variants** — named or structured content alternatives:
  - a **string** variant for A/B tests, seasonal banners, or feature flags;
  - an **object** variant for CMS records, user-specific copy, or any content addressed by a set of fields (the former "dynamic records").

> Earlier versions exposed a separate `meta` field for record-keyed content. It has been merged into `variant`: pass an **object** to `variant` instead of using `meta`.

## Selector disambiguation

A key may declare both dimensions at once (e.g. a collection whose items each have a variant). They are resolved in the order:

```
variant → item
```

So `{ variant: "promo" }` on a variant × item key returns every promo item as an array, and adding `{ item: 2 }` narrows it to a single entry.
