---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrasi dari @nuxtjs/i18n ke Intlayer | Internasionalisasi (i18n)"
description: "Pelajari cara migrasi aplikasi Nuxt Anda dari @nuxtjs/i18n ke Intlayer — langkah demi langkah, tanpa merusak kode yang sudah ada. Gunakan adapter kompatibilitas @intlayer/vue-i18n untuk transisi tanpa gangguan."
keywords:
  - "@nuxtjs/i18n"
  - vue-i18n
  - intlayer
  - migration
  - internationalization
  - i18n
  - Nuxt
  - Vue
  - JavaScript
slugs:
  - doc
  - migration
  - nuxtjs-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrasi dari @nuxtjs/i18n ke Intlayer

## Mengapa bermigrasi dari @nuxtjs/i18n ke Intlayer?

<AccordionGroup>

<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman hingga 50%**.

</Accordion>

<Accordion header="Kemudahan pemeliharaan">

Membatasi konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental meninjau seluruh codebase konten Anda. Selain itu, Intlayer **sepenuhnya diketik** untuk memastikan akurasi konten Anda.

Intlayer juga merupakan solusi dengan **pengembangan paling aktif** di ekosistem i18n — masalah diperbaiki dengan cepat, adapter framework baru dirilis secara teratur, dan API inti terus disempurnakan berdasarkan umpan balik produksi dunia nyata.

</Accordion>

<Accordion header="AI Agent">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** oleh Large Language Models (LLM). Intlayer juga dilengkapi dengan rangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat pengalaman developer (DX) bahkan lebih lancar untuk agen AI.

</Accordion>

<Accordion header="Otomasi">

Gunakan otomasi untuk menerjemahkan di pipeline CI/CD Anda menggunakan LLM pilihan Anda dengan biaya dari penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatisasi ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Performa">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah performa dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada waktu build.

</Accordion>

<Accordion header="Scaling dengan non-dev">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) yang di-self-hosted** dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya mulus. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>

</AccordionGroup>

---

## Strategi Migrasi

Karena `@nuxtjs/i18n` didukung oleh `vue-i18n` di balik layar, ada dua strategi pelengkap untuk migrasi ke Intlayer:

1. **Compat adapter (direkomendasikan untuk aplikasi yang sudah ada)** — Instal `@intlayer/vue-i18n` dan `nuxt-intlayer`. Ini mengekspos **API yang sama persis** seperti `vue-i18n` tetapi mendelegasikan semua pekerjaan terjemahan ke Intlayer di balik layar. Anda mempertahankan `$t`, `useI18n()`, dan routing Nuxt yang sudah ada — satu-satunya perubahan adalah inisialisasi.

2. **Migrasi penuh** — Secara bertahap ganti API `@nuxtjs/i18n` dengan hooks Intlayer asli (`useIntlayer`) dan co-locate konten dalam file `.content.ts` bersama komponen Anda.

Panduan ini mencakup **Strategi 1** terlebih dahulu (drop-in compat adapter), kemudian menjelaskan migrasi penuh opsional.

---

## Daftar Isi

<TOC/>

---

## Migrasi cepat

Langkah-langkah berikut adalah persyaratan minimum untuk menjalankan aplikasi Nuxt Anda yang sudah ada di Intlayer tanpa perubahan kode di komponen Anda.

<Steps>

<Step number={1} title="Install Dependencies">

Install paket inti Intlayer dan adapter kompatibilitas:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Contohnya:

```bash packageManager="npm"
npm install intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer nuxt-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Anda dapat dengan aman menyimpan `@nuxtjs/i18n` terinstal selama migrasi, meskipun Anda akan menghapusnya dari konfigurasi Nuxt Anda segera.

</Step>

<Step number={2} title="Configure Intlayer">

Perintah `intlayer init` membuat `intlayer.config.ts` pemula. Perbarui untuk mencocokkan locale yang ada dan arahkan plugin `syncJSON` ke file pesan Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tambahkan semua locale yang ada di sini
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // cocok dengan sintaks placeholder vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
    }),
  ],
};

export default config;
```

> **`source`** memetakan locale ke jalur file JSON-nya. **`location`** memberi tahu pengawas Intlayer folder mana yang harus dipantau untuk perubahan. Opsi `format: 'icu'` memastikan bahwa placeholder diuraikan dengan benar untuk `vue-i18n`.

</Step>

<Step number={3} title="Update Nuxt Configuration">

Ganti modul `@nuxtjs/i18n` dengan `nuxt-intlayer` di `nuxt.config.ts` Anda. Plugin Intlayer secara otomatis menyuntikkan alias modul, yang berarti panggilan `import { useI18n } from 'vue-i18n'` yang sudah ada dialihkan secara transparan ke `@intlayer/vue-i18n`.

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  // Hapus '@nuxtjs/i18n'
  modules: ["nuxt-intlayer"],
});
```

> **Anda tidak perlu lagi menentukan objek konfigurasi Nuxt i18n.** Intlayer mengompilasi semua dictionary pada **waktu build**, menangani deteksi locale, routing, dan pemuatan dictionary dengan mulus.

</Step>

</Steps>

Itulah semua untuk migrasi cepat. Aplikasi Nuxt Anda sekarang berjalan di Intlayer sambil menjaga setiap `$t` dan `useI18n()` tetap utuh.

---

## Migrasi Lengkap

Langkah-langkah di bawah ini bersifat opsional dan dapat dilakukan secara bertahap. Langkah-langkah ini membuka akses ke set fitur Intlayer lengkap: visual editor, CMS, typed content files, AI-powered translation, dan banyak lagi.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Plugin Intlayer sudah menangani aliasing di tingkat bundler. Jika Anda lebih suka membuat dependensi eksplisit di file sumber Anda, Anda dapat mengganti nama impor secara manual:

| Sebelum                              | Sesudah                                        |
| ------------------------------------ | ---------------------------------------------- |
| `import { useI18n } from 'vue-i18n'` | `import { useI18n } from '@intlayer/vue-i18n'` |

Ini adalah **drop-in replacements** — tidak ada perubahan pada tanda tangan panggilan, argumen, atau jenis pengembalian yang diperlukan.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Setelah Intlayer terhubung, gunakan CLI-nya untuk mengisi terjemahan yang hilang secara otomatis:

```bash packageManager="npm"
# Uji terjemahan yang hilang (tambahkan ke CI)
npx intlayer test

# Isi terjemahan yang hilang dengan AI
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
      format: "icu",
      source: ({ locale }) => `./locales/${locale}.json`,
      location: "locales",
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

## Yang dapat Anda hapus setelah migrasi

Setelah adapter kompatibilitas sudah disiapkan, boilerplate berikut dapat dihapus:

| File / pattern                            | Mengapa tidak lagi diperlukan                                                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `i18n` configurations in `nuxt.config.ts` | Intlayer menangani routing, dictionary loading, dan default locales secara internal.                                                                         |
| `@nuxtjs/i18n` from `package.json`        | Sepenuhnya digantikan oleh `nuxt-intlayer`.                                                                                                                  |
| JSON language bundles (`locales/*.json`)  | JSON bundles hanya diperlukan jika Anda masih menggunakan plugin `syncJSON`. Setelah Anda bermigrasi ke file `.content.ts` Anda dapat menghapus folder JSON. |

Ketika Anda siap untuk melanjutkan, Intlayer **secara otomatis menemukan semua file `.content.ts` dan `.content.json` di mana pun dalam codebase Anda** (secara default, di mana pun di dalam `./src`). Anda dapat menempatkan file `my-component.content.ts` tepat di sebelah `MyComponent.vue` Anda dan Intlayer akan mengambilnya pada saat build tanpa konfigurasi tambahan — tidak ada imports, tidak ada registration, tidak ada file index terpusat yang diperlukan. Ini membuat co-locating translations dengan pages dan components menjadi sangat mudah.

---

## Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk memberikan intellisense TypeScript lengkap untuk kunci terjemahan Anda. Pastikan `tsconfig.json` Anda menyertakan tipe yang di-generate otomatis:

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang di-generate otomatis
  ],
}
```

---

## Konfigurasi Git

Tambahkan direktori yang dihasilkan oleh Intlayer ke `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## Langkah Selanjutnya

- **Visual Editor** — Kelola terjemahan secara visual di browser Anda: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- **CMS** — Eksternalisasi dan kelola konten dari jarak jauh: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- **VS Code Extension** — Dapatkan autocompletion dan deteksi kesalahan terjemahan real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- **CLI Reference** — Daftar lengkap perintah CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- **Intlayer with Nuxt** — Panduan setup lengkap untuk Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md)
- **Intlayer with Vue** — Panduan setup lengkap untuk Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)
