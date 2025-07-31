---
createdAt: 2025-05-20
updatedAt: 2025-06-29
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
  - doc
  - faq
  - translated-path-url
---

# Is it possible to translate URLs as follows:

```bash
en -> /product (no prefix) or /en/product (with prefix)
fr -> /fr/produit
es -> /es/producto
```

Unfortunately, Intlayer does not allow translating URLs as specified. To achieve this, you should use your own middleware or proxy to rewrite the URLs.

However, you can use the `getMultilingualUrl` function to insert the prefix in the URL for a given locale.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (no prefix) or /en/product (with prefix)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Or `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
