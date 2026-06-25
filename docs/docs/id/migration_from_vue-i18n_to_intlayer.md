---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrasi dari vue-i18n ke Intlayer | Internasionalisasi (i18n)"
description: "Pelajari cara memigrasikan aplikasi Vue atau Nuxt Anda dari vue-i18n ke Intlayer — langkah demi langkah, tanpa merusak kode yang ada. Gunakan adapter kompatibilitas @intlayer/vue-i18n untuk transisi tanpa gangguan."
keywords:
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
  - vue-i18n
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Inisialisasi history"
author: aymericzip
---

# Migrasi dari vue-i18n ke Intlayer

## Mengapa bermigrasi dari vue-i18n ke Intlayer?

<AccordionGroup>

<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Maintainability">

Menentukan ruang lingkup konten aplikasi Anda **memudahkan pemeliharaan** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental meninjau seluruh codebase konten Anda. Selain itu, Intlayer **sepenuhnya diketik** untuk memastikan akurasi konten Anda.

Intlayer juga merupakan solusi dengan **pengembangan paling aktif** dalam ekosistem i18n — masalah diperbaiki dengan cepat, adapter framework baru dirilis secara teratur, dan core API terus disempurnakan berdasarkan umpan balik produksi dunia nyata.

</Accordion>

<Accordion header="AI Agent">

Kolokasi konten **mengurangi konteks yang diperlukan** oleh Large Language Models (LLM). Intlayer juga dilengkapi dengan rangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat pengalaman pengembang (DX) bahkan lebih mulus untuk AI agents.

</Accordion>

<Accordion header="Automation">

Gunakan automation untuk menerjemahkan dalam pipeline CI/CD Anda menggunakan LLM pilihan Anda dengan biaya dari penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatisasi ekstraksi konten, serta [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Performance">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah performa dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada saat build.

</Accordion>

<Accordion header="Scaling with non-dev">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) yang self-hosted** dan **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi seamless. Konten dapat disimpan secara lokal dan/atau remote.

</Accordion>

</AccordionGroup>

---

## Strategi Migrasi

Ada dua strategi pelengkap untuk bermigrasi dari `vue-i18n` ke Intlayer:

1. **Compat adapter (direkomendasikan untuk aplikasi yang sudah ada)** — Instal `@intlayer/vue-i18n` (untuk komponen Vue). Package ini mengekspos **API yang sama persis** seperti `vue-i18n` tetapi mendelegasikan semua pekerjaan terjemahan ke Intlayer di balik layar. Anda menyimpan panggilan `$t`, `useI18n()`, dan `<i18n-t>` yang sudah ada — satu-satunya perubahan adalah path import dan inisialisasi.

2. **Migrasi penuh** — Secara bertahap gantikan API `vue-i18n` dengan hooks Intlayer asli (`useIntlayer`) dan co-locate konten di file `.content.ts` bersama komponen Anda.

Panduan ini mencakup **Strategy 1** terlebih dahulu (compat adapter drop-in), kemudian menjelaskan migrasi penuh opsional.

---

## Daftar Isi

<TOC/>

---

## Migrasi Cepat

Langkah-langkah berikut adalah minimum yang diperlukan untuk menjalankan aplikasi `vue-i18n` yang sudah ada di Intlayer tanpa perubahan kode dalam komponen Anda.

<Steps>

<Step number={1} title="Install Dependencies">

Install paket inti Intlayer dan adapter kompatibilitas:

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

> Perintah ini akan mendeteksi lingkungan Anda dan menginstall paket yang diperlukan. Sebagai contoh:

```bash packageManager="npm"
npm install intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer vue-intlayer @intlayer/vue-i18n @intlayer/sync-json-plugin
```

> Anda dapat tetap menginstal `vue-i18n` — adapter kompatibilitas menggunakannya sebagai `devDependency` / `peerDependency` untuk tipe TypeScript.

</Step>

<Step number={2} title="Configure Intlayer">

Perintah `intlayer init` membuat `intlayer.config.ts` pemula. Update untuk menyesuaikan dengan locale yang sudah ada dan arahkan plugin `syncJSON` ke file pesan Anda:

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
      // cocok dengan sintaks placeholder vue-i18n: {name}
      format: "icu",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** memetakan locale ke jalur file JSON-nya. **`location`** memberi tahu watcher Intlayer folder mana yang harus dipantau untuk perubahan. Opsi `format: 'icu'` memastikan bahwa placeholder diurai dengan benar untuk `vue-i18n`.

</Step>

<Step number={3} title="Add the Intlayer Plugin to your Bundler">

Bungkus konfigurasi bundler yang sudah ada dengan plugin kompatibilitas. Plugin ini menggabungkan plugin Intlayer inti, mengatur content watching, dan — yang penting — **menyuntikkan alias modul** sehingga panggilan `import … from 'vue-i18n'` yang sudah ada dialihkan secara transparan ke `@intlayer/vue-i18n` pada saat build. Tidak ada perubahan file sumber yang diperlukan.

**For Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { vueI18nVitePlugin } from "@intlayer/vue-i18n/plugin";

export default defineConfig({
  plugins: [vue(), vueI18nVitePlugin()],
});
```

> `vueI18nVitePlugin()` membungkus plugin `intlayer()` dari `vite-intlayer` dan menambahkan alias `vue-i18n`. Menggunakan plugin `intlayer()` biasa dari `vite-intlayer` mengompilasi kamus tetapi **tidak** menambahkan alias — Anda kemudian harus mengganti nama impor ke `@intlayer/vue-i18n` secara manual (lihat Langkah 4).

**For Nuxt:**

Jika Anda menggunakan `@nuxtjs/i18n` (integrasi Nuxt), install `nuxt-intlayer` dan tambahkan ke `nuxt.config.ts` Anda:

```bash packageManager="npm"
npm install nuxt-intlayer
```

```typescript fileName="nuxt.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
export default defineNuxtConfig({
  modules: ["nuxt-intlayer"],
  // Anda dapat dengan aman menghapus @nuxtjs/i18n dari modul Anda
});
```

> **Anda tidak lagi memerlukan `createI18n()` atau bootstrap provider manual.** Intlayer mengompilasi semua kamus pada **waktu build**, jadi tidak ada langkah loading runtime. Provider dengan alias menangani inisialisasi untuk Anda.

</Step>

</Steps>

Itu saja untuk migrasi cepat. Aplikasi Anda sekarang berjalan di Intlayer sambil mempertahankan setiap impor dan API `vue-i18n`.

> **Kunci terjemahan yang diketik — otomatis.** Setelah Intlayer mengompilasi kamus Anda, `useI18n` diketik terhadap konten aktual Anda ketika Anda melewatkan opsi `namespace`. Kunci secara otomatis dilengkapi di IDE Anda dan jalur yang tidak valid menyebabkan kesalahan TypeScript pada waktu build — tidak ada pengaturan tambahan yang diperlukan.
>
> ```ts
> // 'about' adalah kunci kamus yang terdaftar
> const { t } = useI18n({ namespace: "about" });
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
> ```

---

## Migrasi Lengkap

Langkah-langkah di bawah ini bersifat opsional dan dapat dilakukan secara bertahap. Mereka membuka kumpulan fitur Intlayer lengkap: editor visual, CMS, file konten yang diketik, terjemahan bertenaga AI, dan banyak lagi.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Plugin Intlayer sudah menangani aliasing di tingkat bundler. Jika Anda lebih suka membuat dependensi eksplisit dalam file sumber Anda, Anda dapat mengganti nama impor secara manual:

| Sebelum                                 | Sesudah                                           |
| --------------------------------------- | ------------------------------------------------- |
| `import { useI18n } from 'vue-i18n'`    | `import { useI18n } from '@intlayer/vue-i18n'`    |
| `import { createI18n } from 'vue-i18n'` | `import { createI18n } from '@intlayer/vue-i18n'` |

Ini adalah **drop-in replacements** — tidak ada perubahan pada tanda tangan panggilan, argumen, atau jenis pengembalian yang diperlukan.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Setelah Intlayer terhubung, gunakan CLI-nya untuk mengisi terjemahan yang hilang secara otomatis:

```bash packageManager="npm"
# Test untuk terjemahan yang hilang (tambahkan ke CI)
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

> Lihat [dokumentasi CLI Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md) untuk semua opsi yang tersedia.

</Step>

</Steps>

---

## Apa yang dapat Anda hapus setelah migrasi

Setelah adapter kompatibilitas ditempatkan, boilerplate `vue-i18n` berikut dapat dihapus:

| File / pola                               | Mengapa tidak lagi diperlukan                                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `createI18n()` calls                      | Provider Intlayer menginisialisasi semuanya secara otomatis; tidak ada langkah loading runtime.                                                        |
| Vue plugin registration (`app.use(i18n)`) | Plugin Intlayer menangani injection dan bootstrapping di balik layar.                                                                                  |
| JSON language bundles (`locales/*.json`)  | Bundle JSON hanya diperlukan jika Anda masih menggunakan plugin `syncJSON`. Setelah bermigrasi ke file `.content.ts` Anda dapat menghapus folder JSON. |

Ketika Anda siap untuk melangkah lebih jauh, Intlayer **secara otomatis menemukan semua file `.content.ts` dan `.content.json` di mana saja dalam codebase Anda** (secara default, di mana saja di dalam `./src`). Anda dapat menempatkan file `my-component.content.ts` tepat di sebelah `MyComponent.vue` Anda dan Intlayer akan mengambilnya pada waktu build tanpa konfigurasi tambahan — tidak ada imports, tidak ada registrasi, tidak ada file index terpusat yang diperlukan. Ini membuat co-locating translations dengan pages dan components benar-benar tanpa hambatan.

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
# Ignore the files generated by Intlayer
.intlayer
```

---

## Lanjutkan Lebih Jauh

- **Visual Editor** — Kelola terjemahan secara visual di browser Anda: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- **CMS** — Eksternalisasi dan kelola konten dari jarak jauh: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- **VS Code Extension** — Dapatkan autocompletion dan deteksi kesalahan terjemahan real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- **CLI Reference** — Daftar lengkap perintah CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- **Intlayer with Vue** — Panduan setup lengkap untuk Vue: [intlayer_with_vite+vue.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)
- **Intlayer with Nuxt** — Panduan setup lengkap untuk Nuxt: [intlayer_with_nuxt.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md)
