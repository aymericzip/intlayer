---
createdAt: 2026-06-12
updatedAt: 2026-06-12
title: Dynamic Dictionaries
description: Overview of Intlayer's three dynamic dictionary features — collections, variants, and dynamic records — for building flexible, runtime-driven i18n content.
keywords:
  - Dynamic Dictionaries
  - Collections
  - Variants
  - Dynamic Records
  - Intlayer
  - Internationalization
slugs:
  - doc
  - concept
  - dynamic-dictionaries
history:
  - version: 8.13.0
    date: 2026-06-12
    changes: "Release of the dynamic dictionaries feature"
author: aymericzip
---

# Dynamic Dictionaries

Intlayer supports three mechanisms for expressing content that goes beyond a single static dictionary per key. Each is declared through a **top-level metadata field** in the content file; no wrapper function is needed.

| Feature                                                                                                                  | Metadata field    | Selector in `useIntlayer` |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------- | ------------------------- |
| [Collections](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/collections.md)         | `item: N`         | `{ item: N }`             |
| [Variants](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/variants.md)               | `variant: "name"` | `{ variant: "name" }`     |
| [Dynamic Records](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/dynamic_dictionaries/dynamic_content.md) | `meta: { id, … }` | `{ id, … }`               |

All three compose with the locale argument and support selective / lazy loading via `importMode`.

## When to use which

- **Collections** — ordered list of items managed in separate files (FAQ entries, blog posts, products).
- **Variants** — named content alternatives for A/B tests, seasonal banners, or feature flags.
- **Dynamic records** — content fetched at runtime by an opaque ID (CMS records, user-specific copy).

## Selector disambiguation

When multiple selectors are present on a dictionary, the resolution order is:

```
variant → meta → item
```
