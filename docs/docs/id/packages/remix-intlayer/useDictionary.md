---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentasi Hook useDictionary | remix-intlayer
description: Lihat cara menggunakan hook useDictionary dalam aplikasi Remix 3 untuk menyelesaikan objek kamus untuk locale permintaan saat ini.
keywords:
  - useDictionary
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
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumentasi hook useDictionary"
author: aymericzip
---

# Dokumentasi Hook useDictionary

Hook `useDictionary` mengubah objek kamus yang diimpor atau inline dan mengembalikan kontennya yang diselesaikan untuk locale permintaan saat ini di aplikasi Remix 3.

Tidak seperti `useIntlayer`, yang menyelesaikan kamus berdasarkan kunci string dari registri kamus global, `useDictionary` menerima objek kamus secara langsung.

## Penggunaan

```ts fileName="src/views/home.ts"
import { useDictionary } from "remix-intlayer";
import homeContent from "./home.content";

export const HomeView = () => {
  const content = useDictionary(homeContent);

  return `
    <div>
      <h1>${content.title}</h1>
      <p>${content.subtitle}</p>
    </div>
  `;
};
```

Anda juga dapat meneruskan kamus inline yang ditentukan dengan `t()`:

```ts
import { useDictionary } from "remix-intlayer";
import { t } from "intlayer";

export const FooterView = () => {
  const content = useDictionary({
    key: "footer",
    content: {
      copyright: t({
        id: "Hak cipta dilindungi undang-undang.",
        en: "All rights reserved.",
        fr: "Tous droits réservés.",
        es: "Todos los derechos reservados.",
      }),
    },
  });

  return `<footer>${content.copyright}</footer>`;
};
```

## Parameter

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Objek kamus atau grup kamus yang memenuhi syarat.
2. **`localeOrSelector`** (opsional): Objek locale atau pemilih tertentu (`{ item }`, `{ variant }`, secara opsional dengan `locale`). Diutamakan daripada locale permintaan jika disediakan.

## Deskripsi

Hook melakukan tugas-tugas berikut:

1. **Deteksi Locale**: Membaca locale permintaan aktif dari penyimpanan `AsyncLocalStorage` yang dibuat oleh middleware `intlayer()`.
2. **Resolusi Konten**: Mengevaluasi terjemahan (`t()`), enumerasi, kondisi, dan struktur bersarang sesuai dengan locale yang diselesaikan.
3. **Pemrosesan Pemilih**: Menerapkan setiap pemilih item atau varian yang ditentukan dalam argumen.

## Dokumentasi Terkait

- [Middleware `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/intlayerMiddleware.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/remix-intlayer/useLocale.md)
