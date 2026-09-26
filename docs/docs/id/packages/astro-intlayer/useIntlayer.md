---
createdAt: 2026-09-19
updatedAt: 2026-09-19
priority: 5
title: Dokumentasi Hook useIntlayer | astro-intlayer
description: Pelajari cara menggunakan hook useIntlayer dalam komponen Astro dan skrip klien untuk mengakses konten yang dilokalisasi.
keywords:
  - useIntlayer
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
  - useIntlayer
history:
  - version: 9.5.5
    date: 2026-09-19
    changes: "Inisialisasi dokumen"
author: aymericzip
---

# Dokumentasi Hook useIntlayer

Hook `useIntlayer` memungkinkan Anda mengambil konten kamus yang dilokalisasi berdasarkan kunci dalam aplikasi Astro.

Hook ini dapat dipanggil dalam dua konteks berbeda menggunakan jalur impor yang sama:

1. **Server / Frontmatter**: Di dalam file `.astro`, hook ini secara otomatis menentukan konten menggunakan lokal permintaan yang disimpan di `Astro.locals.intlayer`.
2. **Browser / Skrip Klien `<script>`**: Di dalam skrip klien atau komponen kerangka kerja UI, hook ini menggunakan implementasi store sisi klien (`vanilla-intlayer`).

## Penggunaan

### Di Frontmatter Komponen Astro

```astro fileName="src/pages/index.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<main>
  <h1>{content.title}</h1>
  <p>{content.description}</p>
</main>
```

### Di Blok `<script>` Klien

```astro fileName="src/components/InteractiveWidget.astro"
---
import { useIntlayer } from "astro-intlayer";

const content = useIntlayer("home");
---

<button id="alert-btn">{content.buttonText}</button>

<script>
  import { useIntlayer } from "astro-intlayer";

  const content = useIntlayer("home");

  document.getElementById("alert-btn")?.addEventListener("click", () => {
    alert(content.buttonText);
  });
</script>
```

## Parameter

```ts
useIntlayer(key, localeOrSelector?)
```

1. **`key`**: Kunci unik kamus (sebagaimana ditentukan dalam file deklarasi `.content.ts` Anda).
2. **`localeOrSelector`** (opsional): Lokal tertentu atau objek pemilih (`{ item }`, `{ variant }`, secara opsional dengan `locale`). Jika disediakan, parameter ini akan menimpa lokal yang terdeteksi dari konteks permintaan atau store klien.

## Deskripsi

Hook ini melakukan tugas-tugas berikut:

1. **Resolusi Lokal**:
   - Di server, membaca lokal aktif dari `Astro.locals.intlayer` melalui cakupan `AsyncLocalStorage` yang diinisialisasi oleh `astro-intlayer/middleware`.
   - Di browser, membaca lokal aktif dari penyimpanan atau store klien.
2. **Pengambilan Kamus**: Menyuntikkan konten kamus yang cocok dengan kunci yang ditentukan.
3. **Pemrosesan Terjemahan**: Menyelesaikan terjemahan (`t()`), enumerasi, kondisi, dan markdown menjadi konten yang siap dirender.

## Dokumentasi Terkait

- [Integrasi `intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/intlayer.md)
- [Hook `useDictionary`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useDictionary.md)
- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/astro-intlayer/useLocale.md)
