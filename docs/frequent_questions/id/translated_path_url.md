---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Bisakah saya menerjemahkan jalur url?
description: Pelajari cara menerjemahkan jalur url.
keywords:
  - array
  - konten
  - deklarasi
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

# Apakah mungkin menerjemahkan url seperti berikut:

```bash
en -> /product (tanpa prefix) atau /en/product (dengan prefix)
fr -> /fr/produit
es -> /es/producto
```

Sayangnya Intlayer tidak mengizinkan menerjemahkan URL seperti yang ditentukan. Untuk mencapai ini, Anda harus menggunakan middleware atau proxy Anda sendiri untuk menulis ulang URL.

Namun Anda dapat menggunakan fungsi `getMultilingualUrl` untuk menyisipkan prefix di url untuk locale tertentu.

```ts
import { getMultilingualUrl, Locales } from "intlayer";

const url = getMultilingualUrl("/product");

/**
 * en -> /product (tanpa prefix) atau /en/product (dengan prefix)
 * fr -> /fr/product
 * es -> /es/product
 */
console.log(url);
```

Atau `getLocalizedUrl`

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/product
```
