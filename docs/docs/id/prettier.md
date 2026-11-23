---
createdAt: 2026-11-03
updatedAt: 2026-11-22
priority: 6
title: Plugin Prettier x Oxfmt | Urutkan terjemahan Intlayer dan perbaiki .value
description: "Urutkan locale pada t(), plural(), enu(), dan select() di deklarasi konten Anda, dan tambahkan .value di tempat konten dipakai sebagai string agar tipe tetap valid dengan editor visual. Berfungsi dengan Prettier dan oxfmt."
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
  - Editor visual
  - IntlayerNode
slugs:
  - doc
  - prettier
history:
  - version: 9.8.5
    date: 2026-11-22
    changes: "Menambahkan penulisan ulang .value untuk konten yang dipakai sebagai string"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Riwayat awal"
  - version: 9.7.1
    date: 2026-11-03
    changes: "Menambahkan penggunaan dengan oxfmt"
author: aymericzip
---

# Plugin Prettier x Oxfmt

`prettier-plugin-intlayer` melakukan dua hal setiap kali Prettier memformat file:

1. **Mengurutkan terjemahan Anda** dalam urutan tetap. Diff tetap kecil, konflik merge lebih jarang, dan locale yang hilang mudah terlihat.
2. **Menambahkan `.value`** di tempat konten dipakai sebagai string, agar tipe Anda tetap valid saat editor visual diaktifkan.

```ts
// sebelum
t({ en: "Hello", ru: "Привет", fr: "Bonjour", "en-GB": "Hello", ar: "مرحبا" });

// sesudah
t({ en: "Hello", ar: "مرحبا", "en-GB": "Hello", fr: "Bonjour", ru: "Привет" });
```

## Instalasi

<Tabs defaultTab="prettier">
  <Tab label="Prettier" value="prettier">

```bash packageManager="npm"
npm install --save-dev prettier-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev prettier-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev prettier-plugin-intlayer
```

```bash packageManager="bun"
bun add --dev prettier-plugin-intlayer
```

Memerlukan Prettier versi 3 atau lebih baru.

Jika proyek Anda sudah menggunakan Prettier, `intlayer init prettier` akan menginstal plugin dan menambahkannya ke konfigurasi Anda secara otomatis.

  </Tab>
  <Tab label="oxfmt" value="oxfmt">

oxfmt tidak dapat memuat plugin pihak ketiga, jadi pengurutan dijalankan melalui Prettier. Instal Prettier di samping oxfmt. Prettier hanya digunakan untuk mengurutkan deklarasi konten Anda; oxfmt tetap memformat proyek Anda.

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

Memerlukan Prettier versi 3 atau lebih baru. `intlayer init` hanya menyiapkan plugin di proyek yang sudah menggunakan Prettier, jadi konfigurasikan secara manual seperti di bawah ini.

  </Tab>
</Tabs>

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

Untuk hanya mengurutkan deklarasi konten, gunakan override. Penulisan ulang `.value` kemudian tidak lagi berjalan pada komponen Anda:

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

Skrip format menjalankan dua alat, masing-masing dengan satu tugas:

1. **Prettier** menjalankan plugin. Glob pertama mengurutkan deklarasi konten, glob kedua menambahkan `.value` di komponen. Hapus glob kedua jika Anda hanya ingin mengurutkan.
2. **oxfmt** memformat seluruh proyek, termasuk deklarasi konten.

```json fileName=".prettierrc.json"
{
  "plugins": ["prettier-plugin-intlayer"]
}
```

```json fileName="package.json"
{
  "scripts": {
    "format": "prettier --write \"**/*.content.{ts,tsx,js,jsx,mjs,cjs,json}\" \"src/**/*.{ts,tsx,js,jsx}\" && oxfmt"
  }
}
```

Pertahankan urutan ini. oxfmt mengganti tata letak yang ditulis Prettier dengan miliknya sendiri, tetapi tidak pernah mengubah urutan key objek, sehingga urutan yang sudah diurutkan tetap terjaga.

Pengaturan ini memiliki beberapa batasan:

- **Format saat menyimpan.** Editor yang memformat dengan oxfmt tidak menjalankan plugin. Jalankan skrip `format` sebagai gantinya.
- **Mode check.** Jangan gunakan `prettier --check` pada file yang diformat oleh oxfmt: tata letaknya berbeda, sehingga setiap file dilaporkan. Untuk memeriksa urutan di CI, jalankan skrip `format` dan gagalkan job jika ada perubahan:

```bash
npm run format && git diff --exit-code
```

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
  zero: "No jobs",
  one: "{{count}} job",
  other: "{{count}} jobs",
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

### Terjemahan identik

Di file `*.content.*`, `t()` yang semua locale-nya berisi string yang sama diganti dengan string tersebut. String biasa disajikan untuk setiap locale, jadi hasilnya tidak berubah.

```ts
// sebelum
nextjs: t({ en: "Next.js", fr: "Next.js", es: "Next.js" }),

// sesudah
nextjs: "Next.js",
```

`t()` dengan satu locale, argumen tipe (`t<string>()`), komentar, atau nilai non-string tetap dipertahankan. Atur `intlayerCollapseIdenticalTranslations: false` untuk menonaktifkannya.

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

## Konten yang dipakai sebagai string

Dengan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) aktif (`editor.enabled: true`), field yang dikembalikan `useIntlayer` atau `getIntlayer` adalah node yang dapat dirender, bukan string. Meneruskannya ke atribut elemen native atau memanggil method string padanya tidak lagi lolos type-check. Template literal, penggabungan string, dan `String()` menerima tipe apa pun sehingga dibiarkan. Plugin menambahkan `.value`, yang berisi string baik editor aktif maupun tidak.

```tsx
// sebelum
const content = useIntlayer("home");
const upper = content.name.toUpperCase();
<img alt={content.alt} />;
<h1>{content.title.value}</h1>;

// sesudah
const upper = content.name.value.toUpperCase();
<img alt={content.alt.value} />;
<h1>{content.title}</h1>;
```

Ditulis ulang:

- method string: `content.name.toUpperCase()`
- atribut elemen native: `<img alt={content.alt} />`

Dibiarkan, karena menerima node:

- children JSX: `<h1>{content.title}</h1>`
- props komponen: `<Card title={content.title} />`
- tagged template: `` html`<h1>${content.title}</h1>` `` (Lit)

Ini berlaku untuk komponen, bukan deklarasi konten, sehingga plugin harus berjalan pada file komponen Anda. Variabel yang namanya dideklarasikan lagi di tempat lain dalam file akan dilewati. Template Vue dan Svelte tidak ditulis ulang: gunakan [aturan ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md) untuknya, yang juga memiliki autofix.

Juga menghapus `.value` dari child JSX: `<h1>{content.title.value}</h1>` menjadi `<h1>{content.title}</h1>`, sehingga editor visual dapat memilih teksnya. Berlaku untuk React, Next.js, Preact, Solid, dan React Native.

Nonaktifkan dengan `intlayerNodeValueAccess: false`.

## Opsi

| Opsi                                    | Default  | Deskripsi                                                                                                         |
| --------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `intlayerPinnedLocales`                 | `["en"]` | Locale yang dipertahankan pertama di `t()`, dalam urutan ini. Berikan `[]` untuk mengurutkan semua locale.        |
| `intlayerSortContentKeys`               | `false`  | Dalam file `*.content.*`, urutkan juga kunci konten kamus dan objek bertingkat.                                   |
| `intlayerCollapseIdenticalTranslations` | `true`   | Di file `*.content.*`, mengganti `t()` yang semua locale-nya berisi string yang sama dengan string tersebut.      |
| `intlayerNodeValueAccess`               | `true`   | Menambahkan `.value` di tempat konten dipakai sebagai string (`alt={content.alt}`, `content.name.toUpperCase()`). |

## Apa yang dibiarkan tidak berubah

- Objek yang berisi spread (`...base`), computed key (`[key]`), method, atau kunci duplikat.
- Pemetaan `plural()` dengan kunci yang bukan kategori CLDR.
- Pemetaan `enu()` yang jika urutannya diubah akan mengubah konten yang diselesaikan.
- Panggilan ke fungsi lain yang bernama mirip helper tetapi menerima argumen bukan objek.

Komentar berpindah bersama kunci tempat mereka berada.

## Parser yang didukung

`babel`, `babel-flow`, `babel-ts`, `typescript`, `flow`, `acorn`, `espree`, `meriyah`, `json`, `json5`, dan `jsonc`. Blok `<script>` pada file Vue, Svelte, dan Astro diformat dengan parser ini.

> **Batasan umum.** Prettier hanya menjalankan satu plugin per parser. Jika plugin lain juga menggantikan parser JavaScript/TypeScript (misalnya `prettier-plugin-tailwindcss`), hanya plugin terakhir yang tercantum yang akan diterapkan pada file tersebut. Batasi cakupan `prettier-plugin-intlayer` ke file `*.content.*` dengan override untuk menghindari konflik. Dengan oxfmt, kelas Tailwind diurutkan oleh opsi bawaan `sortTailwindcss`, sehingga konflik ini tidak terjadi. Dalam kasus itu, andalkan [aturan ESLint `no-node-as-string`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md) untuk `.value` di komponen.
