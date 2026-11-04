---
createdAt: 2026-11-03
updatedAt: 2026-11-03
priority: 6
title: Plugin Prettier x Oxfmt | Urutkan terjemahan Intlayer
description: "Urutkan locale dari t(), kategori dari plural(), kondisi dari enu(), case dari select(), dan kunci deklarasi konten Anda dengan prettier-plugin-intlayer. Bekerja dengan Prettier dan oxfmt."
keywords:
  - Intlayer
  - Prettier
  - oxfmt
  - Pemformatan
  - Urutkan terjemahan
  - Urutkan locale
  - i18n
  - Internasionalisasi
  - plural
  - enumeration
  - select
slugs:
  - doc
  - prettier
history:
  - version: 9.7.1
    date: 2026-11-03
    changes: "Riwayat awal"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Menambahkan penggunaan dengan oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

`prettier-plugin-intlayer` menyusun kunci terjemahan Anda dalam urutan tetap setiap kali Prettier memformat file. Diff tetap kecil, konflik penggabungan (merge conflicts) berkurang, dan locale yang hilang mudah ditemukan.

```ts
// sebelum
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// sesudah
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalasi

```bash packageManager="npm"
npm install --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier prettier-plugin-intlayer
```

Memerlukan Prettier versi 3 atau lebih baru.

Jika proyek Anda sudah menggunakan Prettier, `intlayer init prettier` akan menginstal plugin dan menambahkannya ke konfigurasi Anda secara otomatis.

## Penggunaan

Plugin ini bekerja dengan Prettier dan dengan [oxfmt](https://oxc.rs/docs/guide/usage/formatter).

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

Tambahkan plugin ke konfigurasi Prettier Anda:

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

Untuk menerapkannya hanya pada file deklarasi konten, gunakan override:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"],
        "intlayerSortContentKeys": true
      }
    }
  ]
}
```

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt tidak memuat plugin Prettier. Biarkan Prettier menjalankan plugin hanya pada deklarasi konten Anda, lalu biarkan oxfmt memformat seluruh proyek:

```json fileName=".prettierrc.json"
{
  "overrides": [
    {
      "files": "*.content.{ts,tsx,js,jsx,mjs,cjs,json}",
      "options": {
        "plugins": ["prettier-plugin-intlayer"]
      }
    }
  ]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" && oxfmt"
  }
}
```

Pertahankan urutan ini. oxfmt menulis ulang tata letak dengan gayanya sendiri, tetapi tidak pernah mengubah urutan kunci objek, sehingga urutan yang telah diurutkan tetap terjaga.

  </Tab>
</Tabs>

## Apa yang diurutkan

### `t()`: locale

Locale yang disematkan (pinned) ditempatkan pertama (`en` secara default). Locale lainnya mengikuti dalam urutan abjad.

```ts
t({
  en: "Invitation not found",
  ar: "الدعوة غير موجودة",
  de: "Einladung nicht gefunden",
  "en-GB": "Invitation not found",
  fr: "Invitation introuvable",
  "he-IL": "ההזמנה לא נמצאה",
});
```

### `plural()`: urutan CLDR

Kategori diurutkan dari kuantitas terkecil hingga fallback: `zero`, `one`, `two`, `few`, `many`, `other`.

```ts
plural({
  one: "{{count}} вакансия",
  few: "{{count}} вакансии",
  many: "{{count}} вакансий",
  other: "{{count}} вакансий",
});
```

### `enu()`: ambang batas meningkat

Kondisi diurutkan berdasarkan angkanya, kemudian berdasarkan operator (`<1`, `<=1`, `1`, `>=1`, `>1`). `fallback` diletakkan paling akhir.

```ts
enu({
  "<-1": "Less than minus one car",
  "0": "No cars",
  "2": "Two cars",
  ">=3": "Many cars",
  fallback: "Some cars",
});
```

Saat runtime, kondisi cocok pertama yang menang. Plugin menerapkan urutan baru hanya jika setiap kuantitas tetap menghasilkan konten yang sama. Ketika urutan menentukan hasil akhir, objek dibiarkan seperti yang ditulis. Misalnya, dalam `{ '<1': …, '<=-2.3': … }` kunci `'<1'` menangkap setiap angka negatif.

### `select()`: abjad

Setiap case diurutkan menurut abjad dan `fallback` ditempatkan di akhir.

```ts
select({
  draft: "This post is a draft",
  published: "This post is live",
  scheduled: "This post is scheduled",
  fallback: "Unknown status",
});
```

Tanpa kunci `fallback` atau `other`, case terakhir digunakan sebagai fallback. Case tersebut tetap di akhir dan hanya case sebelumnya yang diurutkan.

### File `.content.json`

Bentuk serial diurutkan dengan cara yang sama: `{ "nodeType": "translation", "translation": { … } }`, serta node `plural`, `enumeration`, dan `select`.

### Kunci konten (opsional)

Dengan `intlayerSortContentKeys: true`, plugin juga mengurutkan kunci `content` kamus berdasarkan abjad di setiap tingkat hierarki. Ini hanya berlaku pada file `*.content.*`.

```ts fileName="app.content.ts"
export default {
  key: "app",
  content: {
    description: t({ en: "…", fr: "…" }),
    footer: {
      copyright: "© Intlayer",
      links: [{ href: "/doc", label: t({ en: "Docs", fr: "Docs" }) }],
    },
    title: t({ en: "Hello", fr: "Bonjour" }),
  },
} satisfies Dictionary;
```

Pengurutan berlanjut melalui setiap fungsi pembantu (`t`, `plural`, `enu`, `select`, `cond`, `gender`, `md`, `insert`, `nest`, `file`…) untuk mencapai objek di dalamnya. Struktur kunci internal masing-masing helper mempertahankan urutannya sendiri. Kunci yang diberikan ke `cond()` dan `gender()` tidak pernah diubah urutannya karena kunci terakhir berfungsi sebagai fallback. Bidang yang berada di samping `content` (`key`, `title`, `locale`…) tetap seperti semula.

## Opsi

| Opsi                      | Default  | Deskripsi                                                                                                  |
| ------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`   | `["en"]` | Locale yang dipertahankan pertama di `t()`, dalam urutan ini. Berikan `[]` untuk mengurutkan semua locale. |
| `intlayerSortContentKeys` | `false`  | Dalam file `*.content.*`, urutkan juga kunci konten kamus dan objek bertingkat.                            |

## Apa yang dibiarkan tidak berubah

- Objek yang berisi spread (`...base`), computed key (`[key]`), method, atau kunci duplikat.
- Pemetaan `plural()` dengan kunci yang bukan kategori CLDR.
- Pemetaan `enu()` yang jika urutannya diubah akan mengubah konten yang diselesaikan.
- Panggilan ke fungsi lain yang bernama mirip helper tetapi menerima argumen bukan objek.

Komentar berpindah bersama kunci tempat mereka berada.

## Parser yang didukung

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5`, dan `jsonc`. Blok `<script>` pada file Vue, Svelte, dan Astro diformat dengan parser ini.

> **Batasan umum.** Prettier hanya menjalankan satu plugin per parser. Jika plugin lain juga menggantikan parser JavaScript/TypeScript (misalnya `prettier-plugin-tailwindcss`), hanya plugin terakhir yang tercantum yang akan diterapkan pada file tersebut. Batasi cakupan `prettier-plugin-intlayer` ke file `*.content.*` dengan override untuk menghindari konflik. Dengan oxfmt, kelas Tailwind diurutkan oleh opsi bawaan `sortTailwindcss`, sehingga konflik ini tidak terjadi.
