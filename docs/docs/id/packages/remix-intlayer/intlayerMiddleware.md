---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Middleware intlayer | remix-intlayer
description: Pelajari cara menggunakan middleware intlayer di Remix 3 untuk mendeteksi locale, menangani pengalihan, dan menyuntikkan status Intlayer ke dalam konteks permintaan.
keywords:
  - intlayer
  - middleware
  - remix
  - remix-3
  - internasionalisasi
  - i18n
slugs:
  - doc
  - packages
  - remix-intlayer
  - intlayerMiddleware
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi middleware intlayer"
author: aymericzip
---

# Dokumentasi Middleware intlayer untuk Remix 3

Middleware `intlayer` untuk Remix 3 mengelola lapisan internasionalisasi di seluruh aplikasi Anda. Dibangun di atas standar web (`Request` dan `Response`), middleware ini menangani routing locale (pengalihan dan penulisan ulang internal), mendeteksi locale permintaan, menyimpannya ke cookie dan header, serta membentuk scope `AsyncLocalStorage` sehingga handler dan komponen di hilir dapat mengakses terjemahan tanpa prop drilling.

## Penggunaan

Daftarkan middleware `intlayer` saat menginisialisasi router Remix 3 Anda:

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer, useLocale } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

// Melayani `/`, `/fr`, `/es`, locale diselesaikan dari permintaan
router.get("/", () => {
  const { title } = useIntlayer("home");
  return new Response(title);
});
```

## Deskripsi

Middleware `intlayer` melakukan tugas-tugas berikut:

1. **Persiapan Kamus**: Menjalankan `prepareIntlayer` saat startup untuk memastikan semua kamus yang dihasilkan telah dibangun dan tersedia.
2. **Routing Locale**: Mengevaluasi permintaan berdasarkan strategi routing yang dikonfigurasi (`prefix_always`, `prefix_as_needed`, `no_prefix`):
   - **Pengalihan**: Jika pengguna mengunjungi `/about` dan harus diarahkan ke awalan locale (misalnya `/fr/about`), middleware mengeluarkan respons pengalihan dengan header `location` dan `Set-Cookie` yang sesuai.
   - **Penulisan Ulang Internal**: Saat pengguna mengakses `/fr/about`, URL ditulis ulang secara internal sehingga handler rute Anda cocok dengan `/about`, sementara locale yang diselesaikan ditangkap sebagai `fr`.
   - **Alias URL Terlokalisasi**: Mematuhi aturan penulisan ulang URL yang didefinisikan di `intlayer.config.ts` (misalnya menulis ulang `/fr/about` menjadi `/fr/a-propos`).
3. **Resolusi Locale**: Mendeteksi locale aktif berdasarkan awalan URL, cookie yang tersimpan, header kustom, atau preferensi browser `Accept-Language`.
4. **Injeksi Konteks**:
   - Melampirkan `IntlayerState` (`locale`, `defaultLocale`, `availableLocales`) ke `RequestContext` Remix di bawah kunci `Intlayer` dan `context.intlayer`.
   - Menjalankan sisa permintaan di dalam scope `AsyncLocalStorage` (`requestStorage`), sehingga `useIntlayer`, `useDictionary`, dan `useLocale` dapat dipanggil dengan rapi di handler, view, dan komponen.
5. **Persistensi**: Melampirkan header dan cookie locale keluar ke respons HTTP akhir untuk mempertahankan preferensi pengguna.

## Parameter

Fungsi `intlayer` menerima `IntlayerMiddlewareOptions` opsional:

```ts
import { intlayer, type IntlayerMiddlewareOptions } from "remix-intlayer";

const options: IntlayerMiddlewareOptions = {
  // Penimpaan konfigurasi routing kustom
};

const middleware = intlayer(options);
```

## Mengakses Konteks Secara Langsung

Selain menggunakan hook, Anda dapat mengakses `IntlayerState` yang telah ditentukan langsung dari konteks permintaan Remix:

```ts
import { Intlayer } from "remix-intlayer";

router.get("/api/locale", (context) => {
  // Melalui context.get()
  const state = context.get(Intlayer);

  // Atau melalui properti langsung context.intlayer
  const { locale } = context.intlayer;

  return Response.json({ locale });
});
```

## Dokumentasi Terkait

- [Konteks Permintaan `Intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/Intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)
