---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrasi dari next-i18next ke Intlayer | Internationalization (i18n)"
description: "Pelajari cara melakukan migrasi aplikasi Next.js Anda dari next-i18next ke Intlayer — langkah demi langkah, tanpa merusak kode yang sudah ada. Gunakan adapter kompatibilitas @intlayer/next-i18next untuk transisi tanpa gangguan."
keywords:
  - next-i18next
  - react-i18next
  - i18next
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - React
  - JavaScript
slugs:
  - doc
  - migration
  - next-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Bermigrasi dari next-i18next ke Intlayer

## Mengapa migrasi dari next-i18next ke Intlayer?

<AccordionGroup>

<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemudahan pemeliharaan">

Membatasi konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental meninjau seluruh codebase konten Anda. Selain itu, Intlayer **fully typed** untuk memastikan akurasi konten Anda.

Intlayer juga merupakan solusi dengan **pengembangan paling aktif** di ekosistem i18n — masalah diperbaiki dengan cepat, adapter framework baru dirilis secara teratur, dan core API terus disempurnakan berdasarkan feedback produksi dunia nyata.

</Accordion>

<Accordion header="AI Agent">

Co-locating konten **mengurangi konteks yang diperlukan** oleh Large Language Models (LLMs). Intlayer juga dilengkapi dengan rangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat developer experience (DX) lebih halus untuk AI agents.

</Accordion>

<Accordion header="Otomasi">

Gunakan otomasi untuk menerjemahkan di pipeline CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatisasi ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Performa">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah performa dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda saat build time.

</Accordion>

<Accordion header="Scaling dengan non-dev">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** dan **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya mulus. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>

</AccordionGroup>

---

## Strategi Migrasi

Karena `next-i18next` membungkus `react-i18next` dan `i18next` di bawah tenda, ada dua strategi pelengkap untuk migrasi ke Intlayer:

1. **Compat adapter (direkomendasikan untuk aplikasi yang sudah ada)** — Instal `@intlayer/next-i18next`, `@intlayer/react-i18next`, dan `@intlayer/i18next`. Paket-paket ini mengekspos **API yang persis sama** seperti rekan-rekan mereka tetapi mendelegasikan semua pekerjaan terjemahan ke Intlayer di bawah tenda. Anda menjaga panggilan `useTranslation`, `appWithTranslation`, `serverSideTranslations` yang ada, dan routing Next.js Pages tetap tidak berubah — satu-satunya perubahan adalah inisialisasi.

2. **Migrasi penuh** — Secara bertahap ganti API `next-i18next` dengan hook Intlayer native (`useIntlayer`) dan co-locate content dalam file `.content.ts` bersama komponen Anda.

Panduan ini mencakup **Strategi 1** terlebih dahulu (drop-in compat adapter), kemudian memandu melalui migrasi penuh opsional.

---

## Daftar Isi

<TOC/>

---

## Migrasi Cepat

Langkah-langkah berikut adalah persyaratan minimum untuk menjalankan aplikasi Next.js Pages Router Anda yang sudah ada di Intlayer tanpa perubahan kode di halaman dan komponen Anda.

<Steps>

<Step number={1} title="Install Dependencies">

Pasang paket inti Intlayer dan adapter kompatibilitas:

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

> Perintah ini akan mendeteksi lingkungan Anda dan memasang paket yang diperlukan. Contohnya:

```bash packageManager="npm"
npm install intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer react-intlayer @intlayer/next-i18next @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Anda dapat dengan aman menyimpan `next-i18next`, `react-i18next`, dan `i18next` yang terinstal selama migrasi, meskipun Anda akan menghapusnya setelah dialias.

</Step>

<Step number={2} title="Configure Intlayer">

Perintah `intlayer init` membuat file `intlayer.config.ts` pemula. Perbarui untuk mencocokkan lokal yang ada dan arahkan plugin `syncJSON` ke file pesan `next-i18next` Anda (biasanya di dalam `public/locales`):

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tambahkan semua lokal yang sudah ada di sini
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // cocok dengan sintaks placeholder i18next: {{name}}
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
    }),
  ],
};

export default config;
```

> **`source`** memetakan lokal dan namespace (`key`) ke jalur file JSON-nya. **`location`** memberi tahu pengawas Intlayer folder mana yang akan dipantau untuk perubahan. Opsi `format: 'i18next'` memastikan placeholder diurai dengan benar untuk `next-i18next`.

</Step>

<Step number={3} title="Update Next.js Configuration">

Bungkus `next.config.ts` (atau `.js`) yang sudah ada dengan `createNextI18nPlugin` dari `@intlayer/next-i18next/plugin`. Wrapper ini membuat `withIntlayer` **dan** menyuntikkan alias `next-i18next` / `react-i18next` / `i18next` → `@intlayer/*`, sehingga panggilan `import { useTranslation } from 'next-i18next'` yang sudah ada dialihkan secara transparan saat build. Tidak ada perubahan file sumber yang diperlukan.

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";
// Anda dapat menghapus konfigurasi i18n yang diimpor dari next-i18next.config.js
// import { i18n } from './next-i18next.config';

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {
  // Intlayer mengelola rute i18n Next.js di balik layar,
  // jadi Anda tidak perlu lagi meneruskan objek i18n di sini.
};

export default withIntlayer(nextConfig);
```

> **Anda tidak lagi memerlukan `next-i18next.config.js`.** Intlayer mengkompilasi semua kamus pada **waktu build**, menangani deteksi lokal, rute, dan pemuatan kamus dengan mulus.
>
> Lebih suka `withIntlayer` biasa dari `next-intlayer/server`? Ini mengkompilasi kamus Anda tetapi **tidak** menambahkan alias `next-i18next` / `react-i18next` / `i18next` — Anda kemudian dapat mengganti nama impor ke `@intlayer/*` secara manual (lihat Langkah 4).

</Step>

</Steps>

Itulah migrasi cepat. Aplikasi Next.js Anda sekarang berjalan di Intlayer sambil menjaga setiap panggilan `useTranslation`, `serverSideTranslations`, dan `appWithTranslation` tetap utuh.

> **Kunci terjemahan yang diketik — otomatis.** Setelah Intlayer mengkompilasi kamus Anda, `useTranslation` dan `getFixedT` diketik terhadap konten aktual Anda. Kunci secara otomatis dilengkapi di IDE Anda dan jalur yang tidak valid menyebabkan kesalahan TypeScript pada waktu build — tidak ada pengaturan tambahan yang diperlukan.
>
> ```tsx
> // Pages Router — 'about' adalah kunci kamus yang terdaftar
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ TypeScript error
>
> // getStaticProps / getServerSideProps (instans i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ typed
> ```

---

## Migrasi Lengkap

Langkah-langkah di bawah ini bersifat opsional dan dapat dilakukan secara bertahap. Langkah-langkah ini membuka fitur Intlayer lengkap: visual editor, CMS, typed content files, AI-powered translation, dan banyak lagi.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Plugin Intlayer sudah menangani aliasing di tingkat bundler. Jika Anda lebih suka membuat dependensi eksplisit di file sumber Anda, Anda dapat mengganti nama import secara manual:

| Sebelum                                                                        | Sesudah                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |
| `import { useTranslation } from 'react-i18next'`                               | `import { useTranslation } from '@intlayer/react-i18next'`        |

Ini adalah **drop-in replacements** — tidak ada perubahan yang diperlukan pada call signatures, arguments, atau return types.

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
      format: "i18next",
      source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
      location: "public/locales",
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

Setelah adapter kompatibilitas sudah diterapkan, boilerplate `next-i18next` berikut dapat dihapus:

| File / pola                                     | Mengapa sudah tidak diperlukan                                                                                                                            |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `next-i18next.config.js`                        | Intlayer menangani routing, loading kamus, dan locale default secara internal berdasarkan `intlayer.config.ts`.                                           |
| `next-i18next` dari `package.json`              | Sepenuhnya digantikan oleh `@intlayer/next-i18next` dan aliasing.                                                                                         |
| JSON language bundles (`public/locales/*.json`) | JSON bundles hanya diperlukan jika Anda masih menggunakan plugin `syncJSON`. Setelah Anda migrasi ke file `.content.ts` Anda dapat menghapus folder JSON. |

Ketika Anda siap untuk melangkah lebih jauh, Intlayer **secara otomatis menemukan semua file `.content.ts` dan `.content.json` di mana pun dalam codebase Anda** (secara default, di mana pun di dalam `./src`). Anda dapat menempatkan file `my-component.content.ts` tepat di sebelah `MyComponent.tsx` Anda dan Intlayer akan mengambilnya pada waktu build tanpa konfigurasi tambahan — tidak ada imports, registrasi, atau file index terpusat yang diperlukan. Ini membuat co-locating terjemahan dengan halaman dan komponen sepenuhnya tanpa hambatan.

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

Tambahkan direktori yang dihasilkan Intlayer ke `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

---

## Selanjutnya

- **Visual Editor** — Kelola terjemahan secara visual di browser Anda: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- **CMS** — Externalisasi dan kelola konten dari jarak jauh: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- **VS Code Extension** — Dapatkan autokompletion dan deteksi kesalahan terjemahan real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- **CLI Reference** — Daftar lengkap perintah CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- **Intlayer with Next.js (Pages Router)** — Panduan setup lengkap untuk Next.js: [intlayer_with_nextjs_page_router.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_page_router.md)
