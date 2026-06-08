---
createdAt: 2025-05-20
updatedAt: 2026-01-22
title: Bisakah saya menerjemahkan jalur URL?
description: Pelajari cara menerjemahkan jalur URL.
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

# Apakah mungkin untuk menerjemahkan URL?

Ya! Intlayer mendukung penulisan ulang URL kustom, yang memungkinkan Anda menentukan jalur khusus lokal. Sebagai contoh:

```bash
en -> /product
fr -> /fr/produit
es -> /es/producto
```

Untuk mengimplementasikan ini, Anda dapat mengonfigurasi bagian `routing` di file `intlayer.config.ts` Anda.

Untuk informasi lebih lanjut tentang cara mengimplementasikan fitur ini, lihat [dokumentasi Penulisan Ulang URL Kustom](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/custom_url_rewrites.md).

Anda juga dapat menggunakan fungsi `getMultilingualUrl` dan `getLocalizedUrl` untuk menghasilkan URL ini secara terprogram, dan mereka akan menghormati aturan penulisan ulang Anda.

```ts
import { getLocalizedUrl, Locales } from "intlayer";

const url = getLocalizedUrl("/product", Locales.FRENCH);

console.log(url); // /fr/produit (jika dikonfigurasi)
```
