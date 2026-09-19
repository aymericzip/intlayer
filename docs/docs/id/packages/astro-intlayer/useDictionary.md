---
createdAt: 2026-09-19
updatedAt: 2026-09-19
title: Dokumentasi Hook useDictionary | astro-intlayer
description: Pelajari cara menggunakan hook useDictionary dalam komponen dan skrip Astro untuk menyelesaikan objek kamus.
keywords:
  - useDictionary
  - kamus
  - astro
  - astro-intlayer
  - Intlayer
  - intlayer
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - packages
  - astro-intlayer
  - useDictionary
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumen"
author: aymericzip
---

# Dokumentasi Hook useDictionary

Hook `useDictionary` menyelesaikan objek kamus yang diimpor atau didefinisikan secara inline dan mengembalikan kontennya untuk lokal saat ini dalam aplikasi Astro.

Berbeda dengan `useIntlayer`, yang mengambil kamus berdasarkan kunci dari registri kamus global, `useDictionary` bekerja langsung dengan objek kamus.

## Penggunaan

```astro fileName="src/pages/index.astro"
---
import { useDictionary } from "astro-intlayer";
import homeContent from "../content/home.content";

const content = useDictionary(homeContent);
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

Anda juga dapat meneruskan kamus inline yang didefinisikan dengan `t()`:

```astro fileName="src/components/Footer.astro"
---
import { useDictionary } from "astro-intlayer";
import { t } from "intlayer";

const footer = useDictionary({
  key: "footer",
  content: {
    copyright: t({
      id: "Hak cipta dilindungi undang-undang.",
      en: "All rights reserved.",
      fr: "Tous droits réservés.",
    }),
  },
});
---

<footer>
  <p>{footer.copyright}</p>
</footer>
```

## Parameter

```ts
useDictionary(dictionary, localeOrSelector?)
```

1. **`dictionary`**: Objek kamus atau grup kamus yang memenuhi syarat.
2. **`localeOrSelector`** (opsional): Lokal tertentu atau objek pemilih (`{ item }`, `{ variant }`, secara opsional dengan `locale`).

## Deskripsi

Hook ini melakukan tugas-tugas berikut:

1. **Deteksi Lokal**: Di server, mendapatkan lokal dari `Astro.locals.intlayer`. Di browser, menggunakan lokal store sisi klien.
2. **Pemrosesan Konten**: Menyelesaikan terjemahan (`t()`), enumerasi, kondisi, dan struktur bersarang sesuai dengan lokal yang ditentukan.
3. **Pemilih**: Menerapkan pemilih item atau varian apa pun yang disediakan dalam argumen.

## Dokumentasi Terkait

- [Integrasi `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/intlayer.md)
- [Hook `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useIntlayer.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useLocale.md)
