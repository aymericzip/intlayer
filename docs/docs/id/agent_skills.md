---
createdAt: 2026-02-09
updatedAt: 2026-09-27
priority: 6
title: "Intlayer Agent Skills untuk agen coding AI"
description: "Berikan skill Intlayer kepada agen coding AI Anda: panduan pengaturan untuk konten, metadata, sitemap, dan server actions."
keywords:
  - Intlayer
  - Agent Skills
  - Agen AI
  - Internasionalisasi
  - Dokumentasi
slugs:
  - doc
  - agent_skills
history:
  - version: 8.1.0
    date: 2026-02-09
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Agent Skills

## Penyiapan

### Menggunakan CLI

Perintah `intlayer init skills` adalah cara termudah untuk mengatur Agent Skills di proyek Anda. Perintah ini mendeteksi lingkungan Anda dan menginstal file konfigurasi yang diperlukan untuk platform pilihan Anda.

```bash packageManager="npm"
npx intlayer init skills
```

```bash packageManager="yarn"
yarn intlayer init skills
```

```bash packageManager="pnpm"
pnpm intlayer init skills
```

```bash packageManager="bun"
bun x intlayer init skills
```

### Menggunakan SDK Vercel Skill

```bash
npx skills add aymericzip/intlayer-skills
```

### Menggunakan ekstensi VS Code

1. Buka Command Palette (Ctrl+Shift+P atau Cmd+Shift+P).
2. Ketik `Intlayer: Setup AI Agent Skills`
3. Pilih platform yang Anda gunakan (misalnya `VS Code`, `Cursor`, `Windsurf`, `OpenCode`, `Claude Code`, `GitHub Copilot Workspace`, dll.).
4. Pilih Agent Skills yang ingin Anda instal (misalnya `Next.js`, `React`, `Vite`, `Compiler`, `Configuration`).
5. Tekan Enter.

## Daftar Agent Skills

**intlayer-config**

- Memberdayakan agen untuk memahami pengaturan i18n spesifik proyek Anda, memungkinkan agen untuk mengonfigurasi lokal, pola perutean, dan strategi fallback secara akurat.

**intlayer-cli**

- Memungkinkan agen untuk mengelola siklus hidup terjemahan Anda secara mandiri, termasuk mengaudit terjemahan yang hilang, membangun kamus, dan menyelaraskan konten melalui baris perintah.

**intlayer-angular**

- Membekali agen dengan keahlian khusus kerangka kerja untuk menerapkan pola i18n reaktif dan sinyal dengan benar sesuai dengan praktik terbaik Angular.

**intlayer-astro**

- Memberikan pengetahuan kepada agen untuk menangani terjemahan sisi server dan pola perutean lokal yang unik untuk ekosistem Astro.

**intlayer-content**

- Mengajarkan agen cara memanfaatkan simpul konten tingkat lanjut-seperti pluralisasi, kondisi, dan markdown-untuk membangun kamus yang kaya, dinamis, dan terlokalisasi.

**intlayer-next-js**

- Memberikan kedalaman bagi agen untuk menerapkan i18n di seluruh komponen Server dan Client Next.js, memastikan pengoptimalan SEO dan perutean lokal yang mulus.

**intlayer-react**

- Memberikan pengetahuan khusus bagi agen untuk menerapkan komponen dan hook i18n deklaratif secara efisien dalam lingkungan berbasis React apa pun.

**intlayer-preact**

- Mengoptimalkan kemampuan agen untuk menerapkan i18n bagi Preact, memungkinkannya menulis komponen lokal yang ringan menggunakan sinyal dan pola reaktif yang efisien.

**intlayer-solid**

- Memungkinkan agen untuk memanfaatkan reaktivitas halus SolidJS untuk manajemen konten lokal berkinerja tinggi.

**intlayer-svelte**

- Mengajarkan agen untuk menggunakan store Svelte dan sintaksis idiomatik untuk konten lokal yang reaktif dan aman secara tipe di seluruh aplikasi Svelte dan SvelteKit.

**intlayer-remote-content**

- Memungkinkan agen untuk mengintegrasikan dan mengelola konten jarak jauh, memungkinkannya menangani penyelarasan langsung dan alur kerja terjemahan jarak jauh melalui CMS Intlayer.

**intlayer-usage**

- Menstandardisasi pendekatan agen terhadap struktur proyek dan deklarasi konten, memastikannya mengikuti alur kerja yang paling efisien untuk proyek i18n Anda.

**intlayer-vue**

- Membekali agen dengan pola khusus Vue-termasuk Composable dan dukungan Nuxt-untuk membangun aplikasi web modern dan terlokalisasi.

**intlayer-compiler**

- Menyederhanakan alur kerja agen dengan mengaktifkan ekstraksi konten otomatis, memungkinkannya menulis string yang dapat diterjemahkan langsung dalam kode Anda tanpa file kamus manual.

**intlayer-lit**

- Mengajarkan agen untuk menerjemahkan web component Lit dengan ReactiveController `useIntlayer` dan `useLocale`.

**intlayer-vanilla**

- Memungkinkan agen untuk melokalkan halaman JavaScript / TypeScript biasa dengan `vanilla-intlayer`, dengan atau tanpa bundler.

**intlayer-remix**

- Memberikan agen middleware router Remix 3 serta hook `useIntlayer` / `useLocale` yang terikat pada request.

**intlayer-backend**

- Membekali agen untuk menerjemahkan respons server di Express, Fastify, Hono, NestJS, AdonisJS, dan Elysia melalui satu pola bersama middleware + `t` / `getIntlayer`.

**intlayer-dev-tools**

- Memungkinkan agen menyiapkan tooling Intlayer di sekitar kode Anda: aturan ESLint untuk string hardcoded, Language Server, ekstensi VS Code dan Chrome, server MCP, serta pemeriksaan terjemahan CI/CD.

**intlayer-markdown**

- Mengajarkan agen untuk mendeklarasikan konten Markdown (`md()`, file `.content.md`, file eksternal) dan merendernya dengan komponen MDX, `MarkdownProvider` global, Suspense, dan parsing di sisi server.

**intlayer-compat**

- Memandu agen dalam migrasi dari i18next, react-i18next, next-intl, next-i18next, react-intl, vue-i18n, atau Lingui dengan adapter kompatibilitas yang mempertahankan API asli, sehingga panggilan terjemahan tidak perlu ditulis ulang.
