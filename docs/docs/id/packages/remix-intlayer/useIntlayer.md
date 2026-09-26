---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Hook useIntlayer | remix-intlayer
description: Lihat cara menggunakan hook useIntlayer dalam aplikasi Remix 3 untuk mengakses konten yang dilokalisasi berdasarkan kunci.
keywords:
  - useIntlayer
  - dictionary
  - remix
  - remix-3
  - Intlayer
  - intlayer
  - internasionalisasi
  - dokumentasi
slugs:
  - doc
  - packages
  - remix-intlayer
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi hook useIntlayer"
author: aymericzip
---

# Dokumentasi Hook useIntlayer

Hook `useIntlayer` memungkinkan Anda mengambil konten yang dilokalisasi dari kamus Intlayer berdasarkan kunci dalam aplikasi Remix 3.

Hook ini secara otomatis membaca locale aktif dari konteks permintaan saat ini (melalui `AsyncLocalStorage`), sehingga Anda tidak perlu meneruskan locale melalui handler rute, template tampilan, atau komponen.

## Penggunaan

### Di Handler Rute

```ts fileName="src/server.ts"
import { createRouter } from "remix/router";
import { intlayer, useIntlayer } from "remix-intlayer";

const router = createRouter({
  middleware: [intlayer()],
});

router.get("/api/welcome", () => {
  const content = useIntlayer("home");

  return Response.json({
    title: content.title,
    subtitle: content.subtitle,
  });
});
```

### Di Template Tampilan dan Komponen

```tsx fileName="src/views/home.ts"
import { useIntlayer } from "remix-intlayer";

export const HomeView = () => {
  const content = useIntlayer("home");

  return `
    <main>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </main>
  `;
};
```

## Parameter

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Kunci unik dari kamus (seperti yang ditentukan dalam file deklarasi `.content.ts` Anda).
2. **`localeOrSelector`** (opsional): Objek locale atau pemilih tertentu (`{ item }`, `{ variant }`, secara opsional dengan `locale`). Jika diberikan, ini akan menimpa locale yang terdeteksi dari konteks permintaan.

## Deskripsi

Hook melakukan tugas-tugas berikut:

1. **Pengambilan Locale Konteks**: Mendeteksi locale saat ini dari cakupan `AsyncLocalStorage` yang terikat permintaan yang dibuat oleh middleware `intlayer()`.
2. **Pengambilan Kamus**: Mengambil kamus yang telah dikompilasi sebelumnya yang sesuai dengan kunci yang diberikan.
3. **Pemrosesan Terjemahan**: Menyelesaikan terjemahan, enumerasi, markdown, dan konten kondisional untuk locale yang diselesaikan.
4. **Penanganan Fallback**: Jika dipanggil di luar konteks permintaan HTTP aktif (misalnya tugas latar belakang atau pengujian unit tanpa middleware), hook ini akan kembali dengan aman ke `defaultLocale` yang dikonfigurasi.

## Dokumentasi Terkait

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)
