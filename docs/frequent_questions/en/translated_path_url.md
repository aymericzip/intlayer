---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Can I translate the url path?
description: Learn how to translate the url path.
keywords:
  - array
  - content
  - declaration
  - intlayer
  - middleware
  - proxy
  - rewrite
  - prefix
  - locale
  - url
slugs:
  - frequent-questions
  - translated-path-url
---

# Is it possible to translate URLs?

Yes! Intlayer supports custom URL rewrites, which allow you to define locale-specific paths. For example:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

To implement this, you can configure the `routing` section in your `intlayer.config.ts` file.

For more information on how to implement this feature, see the [Custom URL Rewrites documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

You can also use the `getMultilingualUrl` and `getLocalizedUrl` functions to generate these URLs programmatically, and they will respect your rewrite rules.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (if configured)
```
