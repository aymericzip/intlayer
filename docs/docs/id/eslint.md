---
createdAt: 2026-08-12
updatedAt: 2026-08-12
title: Plugin ESLint | Aturan lint untuk Intlayer
description: Tangkap string hardcoded dan pemanggilan dinamis yang tidak dapat dioptimalkan oleh compiler Intlayer, dengan eslint-plugin-intlayer. Bekerja dengan ESLint dan oxlint, di React, Vue, Svelte, Angular, dan Astro.
keywords:
  - Intlayer
  - ESLint
  - oxlint
  - Lint
  - i18n
  - Internasionalisasi
  - no-raw-text
  - String hardcoded
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
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Plugin ESLint x OXLint

`eslint-plugin-intlayer` menangkap dua jenis kesalahan i18n yang tidak bisa dilihat TypeScript:

1. **Teks hardcoded** yang tidak pernah masuk ke dictionary.
2. **Pemanggilan dinamis** yang lolos pemeriksaan tipe dan berjalan, tetapi tidak dapat dioptimalkan oleh compiler Intlayer.

Key dictionary yang tidak dikenal, jalur field yang tidak dikenal, dan locale yang hilang sudah menjadi error kompilasi, jadi plugin ini tidak mengulanginya.

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

Membutuhkan ESLint 9 atau lebih baru (flat config).

## Penggunaan

Plugin ini berjalan baik di ESLint maupun [oxlint](https://oxc.rs) — aturan yang sama, opsi yang sama.

<Tabs defaultTab="eslint">
  <Tab label="ESLint" value="eslint">

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [...intlayer.configs.recommended];
```

Atau aktifkan aturan satu per satu:

```javascript fileName="eslint.config.mjs" codeFormat="esm"
import intlayer from "eslint-plugin-intlayer";

export default [
  {
    plugins: { intlayer },
    rules: {
      "intlayer/no-raw-text": "warn",
      "intlayer/static-dictionary-key": "error",
      "intlayer/no-dynamic-field-access": "error",
      "intlayer/enforce-adapter-import": "warn",
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

Dua catatan: dukungan plugin JS di oxlint masih alpha, dan oxlint tidak mendukung parser khusus — sehingga berkas `.vue`, `.svelte`, `.astro` dan template Angular tidak di-lint di sana. Jalankan oxlint pada berkas JS/TS/JSX dan tetap gunakan ESLint untuk sisanya.

  </Tab>
</Tabs>

### Konfigurasi

| Konfigurasi     | `no-raw-text`                 | `static-dictionary-key` | `no-dynamic-field-access` | `enforce-adapter-import` |
| --------------- | ----------------------------- | ----------------------- | ------------------------- | ------------------------ |
| `recommended`   | warn                          | error                   | error                     | off                      |
| `strict`        | error (+ literal di luar JSX) | error                   | error                     | error                    |
| `contract-only` | off                           | error                   | error                     | off                      |

`recommended` sengaja menahan `no-raw-text` di level `warn`: mengarahkannya ke codebase yang sudah ada akan memunculkan semua string yang belum diterjemahkan sekaligus, dan itu tidak seharusnya merusak build Anda di hari pertama.

`enforce-adapter-import` mati secara bawaan — aktifkan secara eksplisit jika Anda menginginkannya.

## Aturan

### `no-raw-text`

Melaporkan teks yang ditujukan ke pengguna namun tidak dideklarasikan di dictionary. Aturan ini memakai deteksi yang sama dengan `intlayer extract`, sehingga nama merek, kelas CSS, dan pengenal teknis diabaikan.

```jsx
// ✗ Dilaporkan
<h1>Welcome to our documentation</h1>
<input placeholder="Enter your email address" />

// ✓ Aman
const { title } = useIntlayer("home");
<h1>{title}</h1>
```

Berkas deklarasi konten (`*.content.ts`, …) dilewati.

Untuk memperbaiki seluruh berkas sekaligus, jalankan `npx intlayer extract` dan biarkan compiler memindahkan string ke dictionary untuk Anda.

**Opsi**

```javascript fileName="eslint.config.mjs" codeFormat="esm"
{
  "intlayer/no-raw-text": [
    "warn",
    {
      // Atribut yang nilainya berupa teks untuk pengguna.
      // Bawaan: title, placeholder, alt, aria-label, label
      attributes: ["title", "placeholder", "alt", "aria-label", "label"],

      // Elemen yang isinya tidak pernah berupa teks untuk pengguna.
      // Bawaan: code, pre, script, style
      ignoreElements: ["code", "pre", "script", "style"],

      // Ekspresi reguler untuk teks yang tidak pernah dilaporkan.
      ignorePatterns: ["^Powered by"],

      // Laporkan juga literal string di luar markup. Bawaan: false
      includeStringLiterals: false,
    },
  ],
}
```

### `static-dictionary-key`

Mewajibkan key dictionary berupa literal string.

Compiler hanya dapat memuat dictionary lebih awal ketika ia bisa membaca key langsung di lokasi pemanggilan. Dengan key hasil komputasi, ia diam-diam melewati optimasi dan justru membundel semua dictionary.

```typescript
// ✗ Dilaporkan
useIntlayer(dictionaryKey);
useIntlayer(`home-${suffix}`);
getTranslations({ namespace: page });

// ✗ Sebuah variabel tetap bukan literal
const key = "home";
useIntlayer(key);

// ✓ Aman
useIntlayer("home");
getTranslations({ namespace: "home" });
```

Ini berlaku untuk `useIntlayer`, `getIntlayer`, dan setiap adapter compat (`useTranslation`, `useTranslations`, `formatMessage`, `<FormattedMessage id>`, `<Trans i18nKey>`, …).

### `no-dynamic-field-access`

Mewajibkan field yang Anda baca dari dictionary diketahui secara statis.

Compiler menghapus field yang tidak terlihat digunakan. Akses hasil komputasi tidak terlihat olehnya, sehingga pembacaan dapat mengembalikan `undefined` saat runtime.

```typescript
// ✗ Dilaporkan
const content = useIntlayer("home");
content[fieldName];

const t = useTranslations("home");
t(messageKey);

// ✓ Aman
content.title;
content["title"];
content.items[0];
t("hero.title");
```

### `enforce-adapter-import`

Mengutamakan adapter compat `@intlayer/*` dibanding package aslinya. Package asli hanya me-resolve ke Intlayer bila alias bundler telah dikonfigurasi; adapter selalu bisa. Dapat diperbaiki otomatis dengan `--fix`.

```typescript
// ✗ Dilaporkan
import { useTranslation } from "react-i18next";
import { getTranslations } from "next-intl/server";

// ✓ Aman
import { useTranslation } from "@intlayer/react-i18next";
import { getTranslations } from "@intlayer/next-intl/server";
```

## Framework

Semua aturan bekerja di seluruh integrasi Intlayer, termasuk di dalam template Vue, Svelte, dan Angular. Anda hanya perlu memberi tahu ESLint parser mana yang membaca setiap tipe berkas.

| Framework                 | Berkas            | Parser                            |
| ------------------------- | ----------------- | --------------------------------- |
| React, Preact, Solid, Lit | `.jsx` `.tsx`     | `typescript-eslint`               |
| Next.js                   | `.jsx` `.tsx`     | `typescript-eslint`               |
| Vue, Nuxt                 | `.vue`            | `vue-eslint-parser`               |
| Svelte, SvelteKit         | `.svelte`         | `svelte-eslint-parser`            |
| Angular                   | `.ts`             | `typescript-eslint`               |
| Template Angular          | `.component.html` | `@angular-eslint/template-parser` |
| Astro                     | `.astro`          | `astro-eslint-parser`             |

```javascript fileName="eslint.config.mjs" codeFormat="esm"
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

Pasang hanya parser yang dibutuhkan proyek Anda.

> **Batasan yang diketahui.** Pada template Vue dan Angular, ekspresi seperti `{{ content[key] }}` tidak diperiksa oleh `no-dynamic-field-access`. Pembacaan dinamis yang ditulis di blok script tetap terdeteksi seperti biasa.
