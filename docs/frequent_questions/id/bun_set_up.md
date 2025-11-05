---
createdAt: 2025-05-20
updatedAt: 2025-06-29
title: Saya mendapatkan error module not found saat menggunakan bun
description: Memperbaiki error saat menggunakan bun.
keywords:
  - bun
  - module not found
  - intlayer
  - konfigurasi
  - package manager
slugs:
  - frequent-questions
  - bun-set-up
---

# Saya mendapatkan error module not found saat menggunakan bun

## Deskripsi Masalah

Saat menggunakan bun, Anda mungkin menemui error seperti ini:

```bash
Cannot find package 'intlayer' from '/workspace/packages/@intlayer/config/dist/cjs/utils/ESMxCJSHelpers.cjs' undefined
```

## Alasan

Intlayer menggunakan `require` secara internal. Dan bun membatasi fungsi require untuk hanya menyelesaikan paket dari paket `@intlayer/config`, bukan seluruh proyek.

## Solusi

### Berikan fungsi `require` dalam konfigurasi

```ts
const config: IntlayerConfig = {
  build: {
    require, // berikan fungsi require dalam konfigurasi build
  },
};

export default config;
```

```ts fileName="next.config.ts" codeFormat="typescript"
import { withIntlayer } from "next-intlayer/server";

const configuration = withIntlayer({
  require, // sertakan fungsi require saat menggunakan withIntlayer
});

export default configuration;
```
