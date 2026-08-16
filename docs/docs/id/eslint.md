---
createdAt: 2026-08-12
updatedAt: 2026-08-13
title: Plugin ESLint | Aturan Lint untuk Intlayer
description: Deteksi string hardcoded, panggilan dinamis yang tidak dapat dioptimalkan oleh compiler Intlayer, dan konten kamus yang tidak terpakai dengan eslint-plugin-intlayer. Bekerja dengan ESLint dan oxlint di seluruh React, Vue, Svelte, Angular, dan Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Linting
  - i18n
  - Internasionalisasi
  - no-raw-text
  - String hardcoded
  - Terjemahan tidak terpakai
  - Konten mati
  - React
  - Vue
  - Svelte
  - Angular
slugs:
  - doc
  - eslint
history:
  - version: 9.3.1
    date: 2026-08-12
    changes: "Riwayat awal"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` menangkap jenis kesalahan i18n yang tidak dapat dideteksi oleh TypeScript:

1. **Teks hardcoded** yang tidak pernah dimasukkan ke dalam kamus.
2. **Panggilan dinamis** yang lolos pemeriksaan tipe dan berjalan, namun tidak dapat dioptimalkan oleh compiler Intlayer.
3. **Konten mati (Dead content)** — kamus dan field yang tidak dibaca oleh apa pun di dalam proyek (opsional/opt-in).

Kunci kamus yang tidak diketahui, path field yang tidak diketahui, dan locale yang hilang sudah merupakan kesalahan kompilasi, sehingga plugin tidak mengulanginya.

## Instalasi

```bash packageManager="npm"
npm install --save-dev eslint-plugin-intlayer
```

```bash packageManager="pnpm"
pnpm add --save-dev eslint-plugin-intlayer
```

```bash packageManager="yarn"
yarn add --dev eslint-plugin-intlayer
```

Memerlukan ESLint 9 atau lebih baru (flat config). ESLint 10 didukung.

## Penggunaan

Plugin ini berjalan di ESLint dan [oxlint](https://oxc.rs) — aturan yang sama, opsi yang sama.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Atau sebarkan sebuah konfigurasi dan tetapkan sendiri tingkat keparahannya:

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";

export default [
  ...intlayer.configs.recommended,
  {
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
      "intlayer/no-unused-content": "warn",
    },
  },
];
```

  </Tab>
  <Tab label="oxlint" value="oxlint">

```json fileName=".oxlintrc.json"
{
  "jsPlugins": ["eslint-plugin-intlayer"],
  "rules": {
    "intlayer/no-raw-text": "warn",
    "intlayer/static-dictionary-key": "error",
    "intlayer/no-dynamic-field-access": "error",
    "intlayer/enforce-adapter-import": "warn"
  }
}
```

Dua catatan: dukungan plugin JS di oxlint masih berstatus alfa, dan oxlint tidak mendukung parser kustom — sehingga file `.vue`, `.svelte`, `.astro`, dan template Angular tidak diperiksa di sana. Jalankan oxlint untuk file JS/TS/JSX Anda dan gunakan ESLint untuk sisanya.

`no-unused-content` sengaja tidak disertakan di atas: aturan ini memerlukan direktori kerja dan path file yang diperiksa dari konteks aturan, yang belum dijamin oleh bridge plugin JS alfa. Jalankan aturan ini di bawah ESLint.

  </Tab>
</Tabs>

### Konfigurasi

| Konfigurasi     | `no-raw-text`             | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` | `no-unused-content` |
| --------------- | ------------------------- | ----------------------- | ------------------------- | ------------------------ | ------------------- |
| `recommended`   | warn                      | error                   | error                     | off                      | off                 |
| `strict`        | error (+ literal non-JSX) | error                   | error                     | error                    | off                 |
| `contract-only` | off                       | error                   | error                     | off                      | off                 |

`recommended` sengaja menetapkan `no-raw-text` pada `warn`: menerapkannya pada codebase yang ada akan menampilkan semua string yang belum diterjemahkan sekaligus, yang seharusnya tidak merusak proses build Anda pada hari pertama.

`enforce-adapter-import` dinonaktifkan secara default — aktifkan secara eksplisit jika Anda menginginkannya.

`no-unused-content` dinonaktifkan di setiap konfigurasi, termasuk `strict`. Ini adalah satu-satunya aturan yang membaca konfigurasi Intlayer Anda dan memindai file sumber dari disk, jadi mengaktifkannya harus menjadi pilihan yang disengaja daripada sesuatu yang dilakukan preset secara otomatis.

## Aturan

### `no-raw-text`

Melaporkan teks yang ditampilkan kepada pengguna yang tidak dideklarasikan dalam kamus. Aturan ini menggunakan deteksi yang sama dengan `intlayer extract`, sehingga nama merek, class CSS, dan identifier teknis diabaikan.

```jsx
// ✗ Dilaporkan
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Benar
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

File deklarasi konten (`*.content.ts`, …) dilewati.

Untuk memperbaiki seluruh file sekaligus, jalankan `npx intlayer extract` dan biarkan compiler memindahkan string ke dalam kamus untuk Anda.

**Opsi**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atribut yang nilainya berupa teks yang ditampilkan kepada pengguna.
      // Default: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elemen yang kontennya bukan teks yang ditampilkan kepada pengguna.
      // Default: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Ekspresi reguler untuk teks yang tidak boleh dilaporkan.
      ignorePatterns: ["^Powered by"],

      // Laporkan juga literal string di luar markup. Default: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Mengharuskan kunci kamus berupa literal string.

Compiler hanya dapat memuat awal kamus ketika dapat membaca kunci secara langsung di lokasi pemanggilan. Dengan kunci yang dihitung, compiler secara diam-diam melewati optimasi dan menggabungkan setiap kamus sebagai gantinya.

```typescript
// ✗ Dilaporkan
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Variabel tetap bukan literal
const key = "home";
useIntlayer(key);

// ✓ Benar
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Ini berlaku untuk `useIntlayer`, `getIntlayer`, dan setiap adapter kompatibilitas (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Mengharuskan field yang Anda baca dari kamus diketahui secara statis.

Compiler menghapus field yang tidak terdeteksi digunakan. Akses yang dihitung tidak terlihat oleh compiler, sehingga pembacaan dapat menghasilkan `undefined` saat runtime.

```typescript
// ✗ Dilaporkan
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Benar
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Lebih memilih adapter kompatibilitas `@intlayer/*` daripada paket asli. Paket asli hanya me-resolve ke Intlayer ketika alias bundler dikonfigurasi; adapter selalu melakukannya. Dapat diperbaiki otomatis dengan `--fix`.

```typescript
// ✗ Dilaporkan
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Benar
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

### `no-unused-content`

**Dinonaktifkan secara default.** Melaporkan konten yang tidak dibaca oleh apa pun di proyek Anda, ditambah kunci kamus yang dideklarasikan di lebih dari satu tempat.

```typescript fileName="src/home.content.ts"
export default {
  key: "home", // ✗ Dilaporkan jika tidak ada pemanggil di mana pun yang meminta "home"
  content: {
    title: t({ id: "Judul", en: "Title" }),

    // ✗ Dilaporkan jika tidak ada yang membaca `hero`
    hero: {
      subtitle: t({ id: "Subjudul", en: "Subtitle" }),
    },
  },
};
```

Berbeda dengan aturan lainnya, aturan ini tidak dapat mengambil keputusan hanya dari file yang sedang diperiksa — sebuah field hanya dianggap tidak digunakan secara relatif terhadap keseluruhan proyek. Pada deklarasi konten pertama dalam satu sesi lint, aturan ini memuat konfigurasi Intlayer Anda, memindai file sumber yang dideklarasikan konfigurasi tersebut (`build.traversePattern`, `compiler.transformPattern`), dan menjalankan penganalisis penggunaan yang sama yang menggerakkan `@intlayer/lsp` dan coretan "tidak digunakan" di ekstensi VS Code. Hasilnya di-cache selama `cacheTtl` milidetik, sehingga pemindaian terjadi sekali per sesi dan bukan per file.

**Opsi**

```javascript fileName="eslint.config.mjs"
{
  "intlayer/no-unused-content": [
    "warn",
    {
      // Laporkan kunci kamus yang tidak direferensikan oleh apa pun. Default: true
      reportUnusedDictionaries: true,

      // Laporkan field konten yang tidak dibaca oleh apa pun. Default: true
      reportUnusedFields: true,

      // Laporkan kunci yang dideklarasikan di lebih dari satu tempat. Default: true
      reportDuplicateKeys: true,

      // Ekspresi reguler untuk path field yang tidak boleh dilaporkan.
      ignoreFields: ["^meta"],

      // Root proyek tempat pemindaian dimulai. Default: direktori kerja ESLint
      baseDir: process.cwd(),

      // Berapa lama satu pemindaian proyek digunakan kembali, dalam ms. Default: 30000
      cacheTtl: 30000,
    },
  ],
}
```

Kurangi `cacheTtl` jika Anda melakukan lint dari server editor jangka panjang dan ingin editan Anda terlihat lebih cepat; atur `baseDir` ketika satu sesi lint mencakup beberapa proyek Intlayer di dalam sebuah monorepo.

> **Cenderung memilih untuk diam.** Laporan positif palsu di sini dapat menghapus terjemahan, jadi tidak ada yang dilaporkan ketika kamus digunakan dengan cara yang tidak dapat diikuti oleh analisis: objek konten yang diteruskan secara utuh, fungsi penerjemah yang diikat darinya (`const t = useTranslations("home")`), deklarasi yang dijangkau melalui impor langsung (`useDictionary(myDictionary)`), sebuah `nest()` dari kamus lain, atau daftar field yang dibuat tidak lengkap oleh spread operator. Komponen file tunggal (`.vue`, `.svelte`, `.astro`) dihitung menggunakan setiap field dari kamus yang mereka sebutkan, karena blok skrip mereka tidak diparsing di sini.

`reportDuplicateKeys` membaca kamus yang belum digabungkan yang ditulis proses build di bawah `.intlayer/`, sehingga tetap diam sampai proyek dibangun setidaknya satu kali. Dua deklarasi yang berbagi kunci akan digabungkan, yang merupakan pola yang sah — laporan ini ada karena field yang ditentukan di kedua sisi secara diam-diam hanya menyimpan salah satu dari dua nilai.

Penganalisis dimuat dari `@intlayer/lsp`, yang didistribusikan sebagai ESM. Oleh karena itu, aturan ini memerlukan versi Node yang dapat melakukan `require()` pada modul ES — Node 20.19+ atau 22.12+. Pada versi yang lebih lama, aturan ini tidak melaporkan apa pun alih-alih menggagalkan sesi lint.

## Framework

Setiap aturan berfungsi di semua integrasi Intlayer, termasuk di dalam template Vue, Svelte, dan Angular. Anda hanya perlu memberi tahu ESLint parser mana yang membaca setiap tipe file.

| Framework                 | File              | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Template Angular          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs"
import intlayer from "eslint-plugin-intlayer";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import svelteParser from "svelte-eslint-parser";
import angularTemplateParser from "@angular-eslint/template-parser";

export default [
  ...intlayer.configs.recommended,

  {
    files: ["**/*.{ts,tsx,jsx}"],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    files: ["**/*.component.html"],
    languageOptions: { parser: angularTemplateParser },
  },
];
```

Instal hanya parser yang dibutuhkan proyek Anda.

> **Keterbatasan yang diketahui.** Dalam template Vue dan Angular, ekspresi seperti `{{ content[key] }}` tidak diperiksa oleh `no-dynamic-field-access`. Pembacaan dinamis yang ditulis dalam blok skrip tertangkap secara normal.
