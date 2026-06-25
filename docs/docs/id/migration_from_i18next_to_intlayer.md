---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrasi dari i18next ke Intlayer | Internationalization (i18n)"
description: "Pelajari cara migrasi aplikasi JavaScript/TypeScript Anda dari i18next ke Intlayer — langkah demi langkah, tanpa merusak kode yang ada. Gunakan adapter kompatibilitas @intlayer/i18next untuk transisi tanpa gangguan."
keywords:
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - JavaScript
  - Node.js
slugs:
  - doc
  - migration
  - i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrasi dari i18next ke Intlayer

## Mengapa bermigrasi dari i18next ke Intlayer?

<AccordionGroup>

<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping konten aplikasi Anda **memfasilitasi maintenance** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental meninjau seluruh content codebase Anda. Selain itu, Intlayer **fully typed** untuk memastikan akurasi konten Anda.

Intlayer juga merupakan solusi dengan **pengembangan paling aktif** dalam ekosistem i18n — issue diperbaiki dengan cepat, framework adapters baru tersedia secara teratur, dan core API terus disempurnakan berdasarkan feedback produksi dunia nyata.

</Accordion>

<Accordion header="AI Agent">

Penempatan bersama konten **mengurangi konteks yang diperlukan** oleh Large Language Models (LLMs). Intlayer juga dilengkapi dengan suite tools, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat developer experience (DX) lebih mulus untuk AI agents.

</Accordion>

<Accordion header="Automation">

Gunakan automation untuk menerjemahkan dalam CI/CD pipeline Anda menggunakan LLM pilihan Anda dengan biaya dari AI provider Anda. Intlayer juga menawarkan **compiler** untuk mengotomatisasi ekstraksi konten, serta [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di background**.

</Accordion>

<Accordion header="Performance">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah performance dan reactivity. Intlayer mengoptimalkan content loading Anda pada build time.

</Accordion>

<Accordion header="Scaling with non-dev">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** dan **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda dalam **real-time**, membuat kolaborasi dengan translator, copywriter, dan anggota tim lainnya seamless. Konten dapat disimpan secara lokal dan/atau remote.

</Accordion>

</AccordionGroup>

---

## Strategi Migrasi

Ada dua strategi komplementer untuk migrasi dari `i18next` ke Intlayer:

1. **Compat adapter (direkomendasikan untuk aplikasi yang sudah ada)** — Install `@intlayer/i18next`. Package ini mengekspos **API yang sama persis** dengan `i18next` namun mendelegasikan semua pekerjaan terjemahan ke Intlayer di balik layar. Anda menyimpan panggilan `i18next.t()`, `i18next.changeLanguage()`, dan `createInstance()` yang sudah ada — satu-satunya perubahan adalah jalur import dan inisialisasi.

2. **Migrasi penuh** — Secara bertahap ganti API `i18next` dengan tools native Intlayer dan co-locate konten dalam file `.content.ts`.

Panduan ini mencakup **Strategi 1** terlebih dahulu (drop-in compat adapter), kemudian menjelaskan migrasi penuh yang bersifat opsional.

---

## Daftar Isi

<TOC/>

---

## Migrasi Cepat

Langkah-langkah berikut adalah minimum yang diperlukan untuk menjalankan aplikasi `i18next` yang sudah ada di Intlayer tanpa perubahan kode sama sekali.

<Steps>

<Step number={1} title="Install Dependencies">

Install paket core Intlayer dan adapter kompatibilitas:

```bash packageManager="npm"
npx intlayer-cli init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer-cli init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer-cli init --interactive
```

```bash packageManager="bun"
bunx intlayer-cli init --interactive
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer @intlayer/i18next @intlayer/sync-json-plugin
```

> Anda dapat menjaga `i18next` tetap terpasang — adapter kompatibilitas menggunakannya sebagai `devDependency` / `peerDependency` untuk tipe TypeScript.

</Step>

<Step number={2} title="Configure Intlayer">

Perintah `intlayer init` membuat file `intlayer.config.ts` pemula. Perbarui untuk mencocokkan locale yang sudah ada dan arahkan plugin `syncJSON` ke file pesan Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tambahkan semua locale yang sudah ada di sini
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // cocok dengan sintaks placeholder i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** memetakan locale ke jalur file JSON-nya. **`location`** memberitahu Intlayer watcher folder mana yang harus dipantau untuk perubahan. Opsi `format: 'i18next'` memastikan bahwa placeholder seperti `{{name}}` diurai dengan benar.

</Step>

<Step number={3} title="Update Bundler Aliases (Optional)">

Jika Anda menggunakan bundler (Vite, Webpack, esbuild), Anda dapat menyuntikkan alias modul sehingga `import ... from 'i18next'` secara otomatis diselesaikan ke `@intlayer/i18next`. Ini menghilangkan kebutuhan untuk mengubah impor apa pun di codebase Anda secara manual.

**Untuk Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import i18nextVitePlugin from "@intlayer/i18next/plugin";

export default defineConfig({
  plugins: [i18nextVitePlugin()],
});
```

> `i18nextVitePlugin()` membungkus plugin `intlayer()` dari `vite-intlayer` dan menambahkan alias `i18next` → `@intlayer/i18next` untuk Anda. Menggunakan plugin `intlayer()` biasa dari `vite-intlayer` mengompilasi kamus tetapi **tidak** menambahkan alias itu — Anda kemudian harus mengganti nama impor ke `@intlayer/i18next` secara manual (lihat langkah berikutnya).

</Step>

</Steps>

Itu saja untuk migrasi cepat. Aplikasi Anda sekarang berjalan di Intlayer sambil mempertahankan setiap impor dan API `i18next`.

---

## Migrasi Lengkap

Langkah-langkah di bawah ini bersifat opsional dan dapat dilakukan secara bertahap. Mereka membuka akses ke rangkaian fitur Intlayer yang lengkap: editor visual, CMS, file konten yang diketik, terjemahan bertenaga AI, dan lainnya.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Jika Anda lebih suka membuat dependensi eksplisit dalam file sumber Anda, atau jika Anda tidak menggunakan plugin bundler untuk alias imports, Anda dapat mengganti nama imports secara manual:

| Before                                     | After                                                |
| ------------------------------------------ | ---------------------------------------------------- |
| `import i18next from 'i18next'`            | `import i18next from '@intlayer/i18next'`            |
| `import { createInstance } from 'i18next'` | `import { createInstance } from '@intlayer/i18next'` |
| `import { t } from 'i18next'`              | `import { t } from '@intlayer/i18next'`              |

Ini adalah **drop-in replacements** — tidak ada perubahan yang diperlukan pada call signatures, arguments, atau return types.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Setelah Intlayer terhubung, gunakan CLI-nya untuk mengisi terjemahan yang hilang secara otomatis:

```bash packageManager="npm"
# Test for missing translations (add to CI)
npx intlayer test

# Fill missing translations with AI
npx intlayer fill
```

```bash packageManager="pnpm"
pnpm intlayer test
pnpm intlayer fill
```

```bash packageManager="yarn"
yarn intlayer test
yarn intlayer fill
```

```bash packageManager="bun"
bun x intlayer test
bun x intlayer fill
```

Tambahkan konfigurasi AI ke `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
  ai: {
    apiKey: process.env.OPENAI_API_KEY,
    // provider: "openai",     // default
    // model: "gpt-4o-mini",   // default
  },
};

export default config;
```

> Lihat [dokumentasi Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk semua opsi yang tersedia.

</Step>

</Steps>

---

## Apa yang dapat Anda hapus setelah migrasi

Setelah adapter kompatibilitas sudah tersedia, boilerplate `i18next` berikut dapat dihapus:

| File / pola                              | Mengapa tidak lagi diperlukan                                                                                                                               |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Intlayer menginisialisasi semuanya secara otomatis; tidak ada langkah pemuatan runtime.                                                                     |
| `i18next.use(...)`                       | Intlayer tidak menggunakan plugin i18next, backend, atau pendeteksi bahasa.                                                                                 |
| JSON language bundles (`locales/*.json`) | Bundle JSON hanya diperlukan jika Anda masih menggunakan plugin `syncJSON`. Setelah Anda bermigrasi ke file `.content.ts` Anda dapat menghapus folder JSON. |

Ketika Anda siap untuk melangkah lebih jauh, Intlayer **secara otomatis menemukan semua file `.content.ts` dan `.content.json` di mana saja dalam codebase Anda** (secara default, di mana saja di dalam `./src`). Anda dapat menempatkan file `my-component.content.ts` tepat di sebelah logika Anda dan Intlayer akan mengambilnya pada saat build tanpa konfigurasi tambahan — tidak ada impor, tidak ada pendaftaran, tidak ada file indeks terpusat yang diperlukan. Ini membuat co-locating translations menjadi sepenuhnya lancar.

---

## Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk memberikan intellisense TypeScript lengkap untuk kunci terjemahan Anda. Pastikan `tsconfig.json` Anda menyertakan tipe yang dibuat secara otomatis:

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dibuat secara otomatis
  ],
}
```

---

## Konfigurasi Git

Tambahkan direktori yang dihasilkan oleh Intlayer ke `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

## Lanjutkan Lebih Jauh

- **Visual Editor** — Kelola terjemahan secara visual di browser Anda: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- **CMS** — Eksternal dan kelola konten dari jarak jauh: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- **VS Code Extension** — Dapatkan autocompletion dan deteksi kesalahan terjemahan real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- **CLI Reference** — Daftar lengkap perintah CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
