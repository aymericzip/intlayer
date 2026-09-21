---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentasi Middleware onRequest | astro-intlayer
description: Pelajari cara menggunakan middleware onRequest di aplikasi Astro untuk menentukan lokal permintaan dan mengisi Astro.locals.intlayer.
keywords:
  - onRequest
  - middleware
  - astro
  - astro-intlayer
  - Astro.locals
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - astro-intlayer
  - onRequest
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumen"
author: aymericzip
---

# Dokumentasi Middleware Astro onRequest

Middleware `onRequest` dari `astro-intlayer/middleware` menentukan lokal dari setiap permintaan HTTP yang masuk dan mengisi `Astro.locals.intlayer`.

Ketika Anda mendaftarkan integrasi `intlayer()` di `astro.config.mjs`, middleware ini disuntikkan secara otomatis. Anda hanya perlu mengimpornya secara langsung jika menyusun middleware Astro secara manual menggunakan `sequence(...)`.

## Penggunaan

```ts fileName="src/middleware.ts"
import { onRequest as intlayer } from "astro-intlayer/middleware";
import { sequence } from "astro:middleware";

export const onRequest = sequence(intlayer, async (context, next) => {
  // Akses lokal yang ditentukan dalam middleware kustom Anda
  const { locale } = context.locals.intlayer;
  console.log(`Menangani permintaan untuk lokal: ${locale}`);

  return next();
});
```

## Deskripsi

Middleware melakukan operasi berikut:

1. **Deteksi Lokal**:
   - **URL**: Menganalisis awalan jalur URL atau parameter pencarian `?locale=` (kecuali jika `routing.mode` diatur ke `no-prefix`).
   - **Cookie / Header**: Memeriksa cookie lokal yang disimpan atau nilai header khusus.
   - **Accept-Language**: Menggunakan negosiasi bahasa preferensi browser jika tidak ada nilai sebelumnya.
   - Untuk halaman yang diprerender (`context.isPrerendered`), lokal diekstraksi secara ketat dari URL untuk mencegah peringatan proses build Astro.
2. **Pengisian Konteks**: Mengisi `Astro.locals.intlayer` dengan:
   - `locale`: Lokal yang ditentukan.
   - `defaultLocale`: Lokal fallback default.
   - `availableLocales`: Array dari lokal yang dikonfigurasi.
3. **Cakupan AsyncLocalStorage**: Membungkus pemrosesan permintaan hilir di dalam cakupan `AsyncLocalStorage`, memungkinkan `useIntlayer()`, `useDictionary()`, dan `useLocale()` mengakses status permintaan tanpa meneruskan argumen.

## Tipe `IntlayerLocals`

```ts
export type IntlayerLocals = {
  locale: DeclaredLocales;
  defaultLocale: DeclaredLocales;
  availableLocales: DeclaredLocales[];
};
```

## Dokumentasi Terkait

- [Integrasi `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useLocale.md)
