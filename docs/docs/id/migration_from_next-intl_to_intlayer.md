---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrasi dari next-intl ke Intlayer | Internasionalisasi (i18n)"
description: "Pelajari cara migrasi aplikasi Next.js Anda dari next-intl ke Intlayer — langkah demi langkah, tanpa merusak kode yang ada. Gunakan adapter kompatibilitas @intlayer/next-intl untuk transisi tanpa gangguan."
keywords:
  - next-intl
  - intlayer
  - migration
  - internationalization
  - i18n
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - migration
  - next-intl
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Migrasi dari next-intl ke Intlayer

## Mengapa bermigrasi dari next-intl ke Intlayer?

<AccordionGroup>

<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental untuk meninjau seluruh codebase konten Anda. Selain itu, Intlayer **fully typed** untuk memastikan akurasi konten Anda.

Intlayer juga merupakan solusi dengan **pengembangan paling aktif** dalam ekosistem i18n — masalah diperbaiki dengan cepat, adapter framework baru diluncurkan secara teratur, dan core API terus disempurnakan berdasarkan feedback produksi dunia nyata.

</Accordion>

<Accordion header="AI Agent">

Co-locating konten **mengurangi konteks yang diperlukan** oleh Large Language Models (LLMs). Intlayer juga dilengkapi dengan suite alat, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat developer experience (DX) bahkan lebih mulus untuk AI agents.

</Accordion>

<Accordion header="Automation">

Gunakan automation untuk menerjemahkan di CI/CD pipeline Anda menggunakan LLM pilihan Anda dengan biaya dari penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatisasi ekstraksi konten, serta [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Performance">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah performance dan reactivity. Intlayer mengoptimalkan loading konten Anda saat build time.

</Accordion>

<Accordion header="Scaling with non-dev">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** dan **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda secara **real-time**, membuat kolaborasi dengan translator, copywriter, dan anggota tim lainnya menjadi seamless. Konten dapat disimpan secara lokal dan/atau remote.

</Accordion>

</AccordionGroup>

---

## Strategi Migrasi

Pendekatan yang direkomendasikan untuk aplikasi yang sudah ada adalah **compat adapter**: instal `@intlayer/next-intl`, yang mengekspos **API yang persis sama** seperti `next-intl` tetapi mendelegasikan semua pekerjaan terjemahan ke Intlayer di balik layar.

Anda tetap mempertahankan `useTranslations`, `getTranslations`, `NextIntlClientProvider` dan teman-temannya — **satu-satunya perubahan adalah jalur impor**. Tidak ada refactoring dari signature pemanggilan, bentuk prop, atau struktur komponen yang diperlukan.

Seiring waktu, Anda dapat secara opsional memigrasikan file individual ke format `.content.ts` yang lebih kaya dari Intlayer untuk membuka visual editor, CMS, dan scoping konten per-komponen — tetapi langkah tersebut sepenuhnya opsional dan dapat dilakukan secara bertahap.

---

## Daftar Isi

<TOC/>

---

## Migrasi Cepat

Langkah-langkah berikut adalah minimum yang diperlukan untuk menjalankan aplikasi `next-intl` yang sudah ada di Intlayer tanpa perubahan kode sama sekali.

<Steps>

<Step number={1} title="Install Dependencies">

Instal paket inti Intlayer dan adapter kompatibilitas `@intlayer/next-intl`:

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
npm install intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer next-intlayer @intlayer/next-intl @intlayer/sync-json-plugin
```

> Pertahankan `next-intl` yang terinstal — masih diperlukan untuk **URL routing** (`createNavigation`, `createMiddleware`, `Link`, `redirect`, `usePathname`, `useRouter`). Adapter kompatibilitas **tidak** menggantikan lapisan routing.

</Step>

<Step number={2} title="Konfigurasi Intlayer">

Perintah `intlayer init` membuat starter `intlayer.config.ts`. Perbarui untuk mencocokkan locale yang ada dan arahkan plugin `syncJSON` ke file pesan Anda:

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
      // 'icu' cocok dengan sintaks placeholder ICU next-intl: {name}, {count, plural, ...}
      format: "icu",
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
    }),
  ],
};

export default config;
```

> **`source`** memetakan locale ke jalur file JSON-nya. **`location`** memberitahu watcher Intlayer folder mana yang dipantau untuk perubahan. Opsi `format: 'icu'` memastikan placeholder ICU seperti `{name}` dan `{count, plural, one {# item} other {# items}}` diuraikan dengan benar.

> Untuk daftar lengkap opsi konfigurasi, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Tambahkan Plugin Intlayer ke Next.js">

Bungkus konfigurasi Next.js yang ada dengan `createNextIntlPlugin` dari `@intlayer/next-intl/plugin`. Wrapper ini mengomposisi `withIntlayer` **dan** mendaftarkan alias `next-intl` → `@intlayer/next-intl` untuk Anda:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextIntlPlugin } from "@intlayer/next-intl/plugin";

const withIntlayer = createNextIntlPlugin();

const nextConfig: NextConfig = {/* opsi konfigurasi yang sudah ada */};

export default withIntlayer(nextConfig);
```

> `createNextIntlPlugin()` membungkus `withIntlayer`, secara otomatis mendeteksi **Webpack** atau **Turbopack**, mengatur pengawasan konten, kompilasi kamus, dan — secara kritis — **menyuntikkan alias modul** sehingga panggilan `import … from 'next-intl'` yang sudah ada dialihkan secara transparan ke `@intlayer/next-intl` pada waktu build. Entri routing `next-intl/routing` dibiarkan menunjuk ke paket aslinya. Tidak ada perubahan file sumber yang diperlukan.
>
> Lebih suka `withIntlayer` biasa dari `next-intlayer/server`? Ini akan mengkompilasi kamus Anda, tetapi **tidak** menambahkan alias `next-intl` — Anda kemudian harus mengganti nama impor ke `@intlayer/next-intl` secara manual (lihat Langkah 4).

> **Anda tidak lagi memerlukan `getRequestConfig` atau `loadMessages`.** Dengan `next-intl`, Anda harus menulis file `src/i18n.ts` yang memuat bundle pesan JSON pada setiap permintaan melalui `getRequestConfig`. Intlayer mengkompilasi semua kamus pada **waktu build**, jadi tidak ada langkah loading runtime. Anda dapat menghapus file itu sepenuhnya (atau pertahankan hanya bagian routing jika Anda masih menggunakan `createNavigation`).

</Step>

</Steps>

Itu saja untuk migrasi cepat. Aplikasi Anda sekarang berjalan di Intlayer sambil mempertahankan setiap impor dan API `next-intl`.

> **Kunci terjemahan yang diketik — otomatis.** Setelah Intlayer mengkompilasi kamus Anda, `useTranslations` dan `getTranslations` diketik terhadap konten aktual Anda. Kunci secara otomatis dilengkapi di IDE Anda dan jalur yang tidak valid menyebabkan kesalahan TypeScript pada waktu build — tidak ada setup tambahan yang diperlukan.
>
> ```tsx
> // Komponen klien — 'about' adalah kunci kamus yang terdaftar
> const t = useTranslations("about");
> t("counter.label"); // ✓ autocompleted
> t("does.not.exist"); // ✗ kesalahan TypeScript
>
> // Komponen server
> const t = await getTranslations("about");
> t("counter.label"); // ✓ diketik
> ```

---

## Migrasi Lengkap

Langkah-langkah di bawah ini bersifat opsional dan dapat dilakukan secara bertahap. Mereka membuka akses ke seluruh fitur Intlayer: visual editor, CMS, typed content files, AI-powered translation, dan banyak lagi.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Wrapper `createNextIntlPlugin()` sudah menangani aliasing `next-intl` → `@intlayer/next-intl` di level bundler. Jika Anda lebih suka membuat dependensi eksplisit di file sumber Anda (dan menggunakan plugin `withIntlayer` biasa), Anda dapat mengganti nama imports secara manual:

| Sebelum                                              | Sesudah                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------- |
| `import { useTranslations } from 'next-intl'`        | `import { useTranslations } from '@intlayer/next-intl'`        |
| `import { useLocale } from 'next-intl'`              | `import { useLocale } from '@intlayer/next-intl'`              |
| `import { NextIntlClientProvider } from 'next-intl'` | `import { NextIntlClientProvider } from '@intlayer/next-intl'` |
| `import { getTranslations } from 'next-intl/server'` | `import { getTranslations } from '@intlayer/next-intl/server'` |
| `import { getLocale } from 'next-intl/server'`       | `import { getLocale } from '@intlayer/next-intl/server'`       |
| `import { setLocale } from 'next-intl/server'`       | `import { setLocale } from '@intlayer/next-intl/server'`       |
| `import { getMessages } from 'next-intl/server'`     | `import { getMessages } from '@intlayer/next-intl/server'`     |

> Selalu pertahankan routing imports dari `next-intl` yang asli — compat adapter **tidak** mengganti URL routing layer:
>
> ```ts
> // ✅ Selalu pertahankan imports ini dari 'next-intl' yang asli
> import { createNavigation } from "next-intl/routing";
> import { createMiddleware } from "next-intl/server";
> import { defineRouting } from "next-intl/routing";
> ```
>
> Alternatifnya, Anda dapat menggunakan `defineRouting` dari `@intlayer/next-intl/routing` yang secara otomatis menggabungkan konfigurasi locale dari `intlayer.config.ts` Anda.

</Step>

<Step number={5} title="Enable AI-Powered Translation Automation" isOptional={true}>

Setelah Intlayer terhubung, Anda dapat menggunakan CLI-nya untuk mengisi terjemahan yang hilang secara otomatis menggunakan LLM pilihan Anda:

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

Tambahkan `OPENAI_API_KEY` (atau kunci provider pilihan Anda) ke file `.env` Anda, kemudian perluas `intlayer.config.ts` Anda:

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
      source: ({ locale }) => `./messages/${locale}.json`,
      location: "messages",
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

Setelah `@intlayer/next-intl` diterapkan, boilerplate `next-intl` berikut dapat dihapus:

| File / pattern                                    | Mengapa tidak lagi diperlukan                                                                                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n.ts` → `getRequestConfig` export         | Intlayer mengompilasi kamus pada waktu build; tidak ada pemuatan pesan per-request. Pertahankan file hanya jika juga mengekspor `createNavigation` routing helpers. |
| `loadMessages()` / `getMessages()` call in layout | `NextIntlClientProvider` dari `@intlayer/next-intl` membaca dari output yang dikompilasi; tidak ada props `messages` yang diperlukan.                               |
| `locales/{locale}/*.json` imports in layout       | Bundle JSON hanya diperlukan jika Anda masih menggunakan plugin `syncJSON`. Setelah bermigrasi ke file `.content.ts` Anda dapat menghapus folder JSON.              |

Ketika Anda siap untuk melangkah lebih jauh, Intlayer **secara otomatis menemukan semua file `.content.ts` dan `.content.json` di mana pun dalam codebase Anda** (secara default, di mana pun di dalam `./src`). Anda dapat menempatkan file `about.content.ts` tepat di samping `about/page.tsx` Anda dan Intlayer akan mengambilnya pada waktu build tanpa konfigurasi tambahan — tidak ada imports, tidak ada registrasi, tidak ada file indeks terpusat yang diperlukan. Ini membuat co-locating translations dengan pages dan components menjadi sepenuhnya frictionless.

---

## Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk memberikan full TypeScript intellisense untuk translation keys Anda. Pastikan `tsconfig.json` Anda mencakup jenis yang di-generate secara otomatis:

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript yang sudah ada
    ".intlayer/**/*.ts", // Sertakan jenis yang di-generate secara otomatis
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
- **CMS** — Externalize dan kelola konten dari jarak jauh: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- **VS Code Extension** — Dapatkan autocompletion dan deteksi error terjemahan real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- **CLI Reference** — Daftar lengkap perintah CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- **Intlayer with Next.js** — Panduan setup lengkap untuk Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)
