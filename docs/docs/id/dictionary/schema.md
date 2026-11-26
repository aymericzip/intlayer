---
createdAt: 2026-11-25
updatedAt: 2026-11-25
priority: 8
title: "Validasi Kamus dengan Skema (Zod)"
description: "Deklarasikan skema Zod di intlayer.config.ts dan pasangkan ke kamus Anda untuk memvalidasi setiap locale saat build dan memberi tipe pada konten di editor."
keywords:
  - Skema
  - Zod
  - Validasi
  - Kamus
  - Deklarasi Konten
  - Keamanan Tipe
  - Intlayer
slugs:
  - doc
  - concept
  - content
  - schema
history:
  - version: 9.9.0
    date: 2026-11-25
    changes: "Inisialisasi dokumentasi"
author: aymericzip
---

# Validasi Kamus dengan Skema

Skema menggambarkan bentuk yang diharapkan dari konten sebuah kamus. Anda mendeklarasikannya sekali di `intlayer.config.ts`, memberinya nama, lalu memasangkan nama itu ke kamus mana pun melalui field `schema`.

Intlayer kemudian:

- **Memvalidasi** kamus untuk setiap locale saat membangun kamus, dan melaporkan setiap masalah beserta locale dan path field-nya.
- **Memberi tipe** pada konten kamus di editor Anda, sehingga field yang hilang atau salah tipe terdeteksi sebelum build.

Skema berguna ketika beberapa kamus harus berbagi struktur yang sama (metadata SEO, kartu produk, entri ala CMS), atau ketika konten harus mematuhi batasan yang tidak dapat diekspresikan TypeScript, seperti panjang maksimum pada setiap terjemahan.

<Steps>
<Step number={1} title="Deklarasikan skema di konfigurasi">

Instal [Zod](https://zod.dev):

```bash packageManager="npm"
npm install zod --save-dev
```

```bash packageManager="pnpm"
pnpm add zod --save-dev
```

```bash packageManager="yarn"
yarn add zod --dev
```

```bash packageManager="bun"
bun add zod --dev
```

Lalu deklarasikan skema Anda di bawah key `schemas`. Setiap key adalah nama yang akan Anda rujuk dari kamus Anda.

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  schemas: {
    "seo-metadata": z.object({
      title: z.string().min(10).max(60),
      description: z.string().min(50).max(160),
    }),
    "product-card": z.object({
      name: z.string(),
      price: z.number().positive(),
      tags: z.array(z.string()),
    }),
  },
};

export default config;
```

</Step>
<Step number={2} title="Pasangkan skema ke kamus">

Isi field `schema` sebuah kamus dengan salah satu nama yang dideklarasikan di konfigurasi.

```typescript fileName="src/about/aboutMetadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const aboutMetadataContent = {
  key: "about-metadata",
  schema: "seo-metadata",
  content: {
    title: t({
      en: "About us | Our story",
      fr: "À propos | Notre histoire",
      es: "Sobre nosotros | Nuestra historia",
    }),
    description: t({
      en: "Discover the team, the mission and the values behind our product.",
      fr: "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
      es: "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
    }),
  },
} satisfies Dictionary<undefined, "seo-metadata">;

export default aboutMetadataContent;
```

```json5 fileName="src/about/aboutMetadata.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "about-metadata",
  "schema": "seo-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "About us | Our story",
        "fr": "À propos | Notre histoire",
        "es": "Sobre nosotros | Nuestra historia",
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Discover the team, the mission and the values behind our product.",
        "fr": "Découvrez l'équipe, la mission et les valeurs derrière notre produit.",
        "es": "Descubre el equipo, la misión y los valores detrás de nuestro producto.",
      },
    },
  },
}
```

Skema yang sama dapat dipasangkan ke sebanyak mungkin kamus yang Anda perlukan.

</Step>
<Step number={3} title="Jalankan build dan baca laporannya">

Validasi berjalan setiap kali Intlayer membangun kamus: dengan `npx intlayer build`, atau melalui plugin bundler Anda dalam mode dev dan build. Jika sebuah terjemahan melanggar skema, Intlayer mencatat locale, path field, dan pesan Zod:

```bash
[intlayer] Local dictionary about-metadata has invalid content according to schema seo-metadata for locale French (fr) - src/about/aboutMetadata.content.ts
[intlayer] ✗ Error: about-metadata - French (fr) - title: Too big: expected string to have <=60 characters
```

Perintah `intlayer build` yang dijalankan sekali akan gagal jika skema tidak dikenal atau validasi gagal. Dalam mode watch, Intlayer mengecualikan kamus yang tidak valid hingga isinya diperbaiki.

</Step>
</Steps>

<AccordionGroup>
<Accordion header="Metadata Markdown">

Validasi kolom frontmatter seperti `title`, `description`, `date`, dan `tags` sebelum Markdown ditampilkan. Kolom wajib dan tipe yang diharapkan diperiksa saat kamus dibuat. Metadata yang tidak valid dilaporkan bersama locale dan jalur kolomnya.

</Accordion>
<Accordion header="Metadata SEO halaman">

Validasi metadata untuk menampilkan judul dan deskripsi halaman, URL kanonis, gambar sosial, serta arahan pengindeksan. Skema dapat mewajibkan judul sepanjang 1 hingga 60 karakter, membatasi deskripsi hingga 160 karakter, dan memeriksa URL. Konten locale yang tidak valid ditolak sebelum menyebabkan kesalahan saat halaman ditampilkan.

</Accordion>
<Accordion header="Konten terstruktur bersama">

Terapkan satu skema pada kamus yang memiliki struktur konten sama, seperti produk, item navigasi, atau templat email. Kolom yang hilang atau nilai dengan tipe yang salah membuat kamus tidak valid saat proses build, sehingga konten yang tidak konsisten tidak masuk ke aplikasi.

</Accordion>
</AccordionGroup>

## Memberi tipe pada konten dari skema

Parameter generik `Dictionary` menentukan seberapa ketat TypeScript memeriksa sebuah kamus:

| Deklarasi                                               | Field `schema`                                     | Field `content`                          |
| ------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| `satisfies Dictionary`                                  | Autocomplete, nama yang tidak dikenal adalah error | Tidak diperiksa oleh TypeScript          |
| `satisfies Dictionary<undefined, "seo-metadata">`       | Harus `"seo-metadata"`                             | Bertipe dari skema                       |
| `satisfies Dictionary<{ cta: string }, "seo-metadata">` | Harus `"seo-metadata"`                             | Bertipe dari skema dan tipe Anda sendiri |

Dengan skema bertipe, setiap field menerima nilai biasa atau node konten yang menghasilkan nilai tersebut, sehingga `t()` tetap diperbolehkan:

```typescript fileName="src/product/productCard.content.ts"
import { t, type Dictionary } from "intlayer";

const productCardContent = {
  key: "product-card",
  schema: "product-card",
  content: {
    name: t({ en: "Running shoes", fr: "Chaussures de course" }),
    price: "89", // ❌ Type 'string' is not assignable to type 'number'
    tags: ["sport", "outdoor"],
  },
} satisfies Dictionary<undefined, "product-card">;

export default productCardContent;
```

> Intlayer menghasilkan tipe-tipe ini dari skema Zod Anda di `.intlayer/types` setiap kali membangun kamus. Hanya bentuknya yang diberi tipe: batasan seperti `.min()`, `.max()`, atau `.regex()` diperiksa saat build.

## Apa yang divalidasi

Untuk setiap locale yang tercantum di `internationalization.locales`, Intlayer me-resolve konten kamus untuk locale tersebut, lalu memvalidasi hasilnya. Karena itu skema menggambarkan nilai akhir sebuah field (`title: string`), bukan node `t()` yang menyimpan terjemahan.

- **Terjemahan yang hilang**: dengan `strictMode` default, terjemahan yang hilang akan fallback ke locale default sebelum validasi. Dengan `strictMode: "strict"`, terjemahan yang hilang membuat field wajib gagal.
- **Node konten lainnya**: `enu()`, `plural()`, `cond()`, `gender()`, `select()` dan `insert()` di-resolve menjadi fungsi, sedangkan `md()` atau `html()` menjadi node. Deklarasikan field ini dengan `z.any()`, dan simpan batasan pada field yang di-resolve menjadi nilai biasa.
- **Tidak divalidasi**: konten yang disediakan oleh fungsi atau Promise ([function fetching](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/function_fetching.md)), serta kamus yang diambil dari [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

## Menggunakan library validasi lain

Entri `schemas` tidak terikat pada Zod. Objek apa pun yang menyediakan method `safeParse(data)` yang kompatibel dengan Zod dapat digunakan, selama mengembalikan `{ success: true }` atau `{ success: false, error: { issues } }`, di mana setiap issue memiliki array `path` dan `message`. Tipe konten hanya dihasilkan dari skema Zod: dengan library lain, konten kamus yang dipasangkan bertipe `any`.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah error skema menghentikan build saya?">

Perintah `intlayer build` yang dijalankan sekali akan gagal jika kamus tidak sesuai dengan skemanya. Dalam mode watch, Intlayer mencatat kesalahan dan mengecualikan kamus tersebut hingga Anda memperbaiki dan menyimpannya.

</Question>
<Question title="Bisakah beberapa kamus berbagi skema yang sama?">

Bisa. Skema dirujuk berdasarkan nama, sehingga sejumlah kamus berapa pun dapat menunjuk ke skema tersebut. Ini adalah kasus penggunaan utama: menerapkan satu struktur untuk semua metadata halaman, entri produk, atau template email.

</Question>
<Question title="Apa yang terjadi jika nama skema tidak ada?">

TypeScript langsung melaporkannya begitu setidaknya satu skema dideklarasikan, karena field `schema` hanya menerima nama yang dideklarasikan. Untuk file JSON, Intlayer melaporkan nama skema yang tidak dikenal saat build dan menolak kamus tersebut.

</Question>
<Question title="Apakah setiap locale divalidasi, atau hanya locale default?">

Setiap locale yang tercantum di `internationalization.locales`. Laporan menyebutkan locale yang gagal, sehingga terjemahan yang terlalu panjang hanya dalam bahasa Jerman mudah ditemukan.

</Question>

</FAQ>

## Terkait

- [File deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
- [Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)
- [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
