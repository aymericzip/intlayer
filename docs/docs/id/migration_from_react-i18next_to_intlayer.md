---
createdAt: 2026-06-05
updatedAt: 2026-06-05
title: "Migrasi dari react-i18next / i18next ke Intlayer | Internationalization (i18n)"
description: "Pelajari cara migrasi aplikasi React atau Next.js Anda dari react-i18next atau i18next ke Intlayer — langkah demi langkah, tanpa merusak kode yang ada. Gunakan adapter kompatibilitas @intlayer/react-i18next dan @intlayer/i18next untuk transisi tanpa gangguan."
keywords:
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
  - react-i18next
history:
  - version: 9.0.0
    date: 2026-06-05
    changes: "Init history"
author: aymericzip
---

# Bermigrasi dari react-i18next / i18next ke Intlayer

## Mengapa bermigrasi dari react-i18next / i18next ke Intlayer?

<AccordionGroup>

<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Maintainability">

Scoping konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi skala besar. Anda dapat menduplikasi atau menghapus folder fitur tunggal tanpa beban mental meninjau seluruh codebase konten Anda. Selain itu, Intlayer **fully typed** untuk memastikan akurasi konten Anda.

Intlayer juga merupakan solusi dengan **pengembangan paling aktif** dalam ekosistem i18n — masalah diperbaiki dengan cepat, adapter framework baru tiba secara teratur, dan API inti terus disempurnakan berdasarkan feedback produksi dunia nyata.

</Accordion>

<Accordion header="AI Agent">

Co-locating konten **mengurangi konteks yang diperlukan** oleh Large Language Models (LLMs). Intlayer juga dilengkapi dengan rangkaian tools, seperti **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk membuat developer experience (DX) lebih lancar untuk AI agents.

</Accordion>

<Accordion header="Automation">

Gunakan automation untuk menerjemahkan di pipeline CI/CD Anda menggunakan LLM pilihan Anda dengan biaya dari penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomasi ekstraksi konten, serta [web platform](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Performance">

Menghubungkan file JSON besar ke komponen dapat menyebabkan masalah performance dan reactivity. Intlayer mengoptimalkan loading konten Anda pada waktu build.

</Accordion>

<Accordion header="Scaling dengan non-dev">

Lebih dari sekadar solusi i18n, Intlayer menyediakan **self-hosted [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** dan **[full CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa Anda dalam **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya seamless. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>

</AccordionGroup>

---

## Strategi Migrasi

Ada dua strategi komplementer untuk bermigrasi dari `react-i18next` / `i18next` ke Intlayer:

1. **Compat adapter (direkomendasikan untuk aplikasi yang sudah ada)** — Install `@intlayer/react-i18next` (untuk komponen React) dan/atau `@intlayer/i18next` (untuk instance `i18n` inti). Paket-paket ini mengekspos **API yang persis sama** dengan `react-i18next` / `i18next` tetapi mendelegasikan semua pekerjaan terjemahan ke Intlayer di balik layar. Anda tetap mempertahankan panggilan `useTranslation`, `Trans`, `withTranslation`, `i18next.t()` yang ada — satu-satunya perubahan adalah path impor.

2. **Migrasi penuh** — Secara bertahap gantikan API `react-i18next` dengan hook Intlayer native (`useIntlayer`, `IntlayerProvider`) dan co-locate konten di file `.content.ts` bersama komponen Anda.

Panduan ini mencakup **Strategi 1** terlebih dahulu (drop-in compat adapter), kemudian menjelaskan migrasi penuh yang opsional.

---

## Daftar Isi

<TOC/>

---

## Migrasi Cepat

Langkah-langkah berikut adalah yang minimal diperlukan untuk menjalankan aplikasi `react-i18next` yang ada pada Intlayer tanpa perubahan kode sama sekali.

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

> bendera `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan memasang paket yang diperlukan. Sebagai contoh:

```bash packageManager="npm"
npm install intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

```bash packageManager="bun"
bun add intlayer react-intlayer @intlayer/react-i18next @intlayer/i18next @intlayer/sync-json-plugin
```

> Anda dapat membiarkan `react-i18next` dan `i18next` tetap terpasang — adapter kompatibilitas menggunakannya sebagai `devDependencies` / opsional `peerDependencies` untuk tipe TypeScript. Anda tidak perlu mengubah peer apapun di `package.json`.

</Step>

<Step number={2} title="Configure Intlayer">

Perintah `intlayer init` membuat file starter `intlayer.config.ts`. Perbarui file ini agar sesuai dengan lokale yang ada dan tunjukkan plugin `syncJSON` ke file pesan Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tambahkan semua lokale yang ada di sini
    ],
    defaultLocale: Locales.ENGLISH,
  },
  plugins: [
    syncJSON({
      // cocok dengan sintaks placeholder react-i18next: {{name}}
      format: "i18next",
      source: ({ locale }) => `./src/locales/${locale}.json`,
      location: "src/locales",
    }),
  ],
};

export default config;
```

> **`source`** memetakan lokale ke jalur file JSON-nya. **`location`** memberitahu pemantau Intlayer folder mana yang akan dipantau untuk perubahan. Opsi `format: 'i18next'` memastikan bahwa placeholder seperti `{{name}}` diuraikan dengan benar.

</Step>

<Step number={3} title="Add the Intlayer Plugin to your Bundler">

Bungkus konfigurasi bundler yang ada dengan plugin kompatibilitas. Plugin ini menyusun plugin inti Intlayer, menghubungkan pemantauan konten, dan — yang penting — **menyuntikkan alias modul** sehingga pemanggilan `import … from 'react-i18next'` (dan `'i18next'`) yang ada secara transparan dialihkan ke `@intlayer/react-i18next` / `@intlayer/i18next` pada waktu build. Tidak ada perubahan file sumber yang diperlukan.

**For Vite:**

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactI18nextVitePlugin } from "@intlayer/react-i18next/plugin";

export default defineConfig({
  plugins: [react(), reactI18nextVitePlugin()],
});
```

> `reactI18nextVitePlugin()` membungkus plugin `intlayer()` dari `vite-intlayer` dan menambahkan alias `react-i18next` / `i18next`. Menggunakan plugin `intlayer()` biasa dari `vite-intlayer` mengompilasi kamus tetapi **tidak** menambahkan alias tersebut — Anda kemudian harus mengganti nama impor ke `@intlayer/*` secara manual (lihat Langkah 4).

**For Next.js:**

Jika Anda menggunakan `next-i18next` (integrasi Pages Router), pasang `@intlayer/next-i18next` dan `next-intlayer`:

```bash packageManager="npm"
npm install @intlayer/next-i18next next-intlayer
```

Kemudian tambahkan plugin kompatibilitas ke `next.config.ts` Anda (plugin ini menyuntikkan alias `next-i18next` / `react-i18next` / `i18next`):

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { createNextI18nPlugin } from "@intlayer/next-i18next/plugin";

const withIntlayer = createNextI18nPlugin();

const nextConfig: NextConfig = {/* opsi Anda */};

export default withIntlayer(nextConfig);
```

> **Anda tidak lagi memerlukan `i18next.init()` atau penyetup penyedia manual.** Intlayer mengompilasi semua kamus pada **waktu build**, sehingga tidak ada langkah pemuatan runtime. Penyedia dengan alias menangani inisialisasi untuk Anda.

</Step>

</Steps>

Itu saja untuk migrasi cepat. Aplikasi Anda sekarang berjalan di Intlayer sambil mempertahankan setiap impor dan API `react-i18next`.

> **Kunci terjemahan yang diketik — otomatis.** Setelah Intlayer mengompilasi kamus Anda, `useTranslation` dan `getFixedT` diketik sesuai dengan konten aktual Anda. Kunci secara otomatis dilengkapi di IDE Anda dan jalur yang tidak valid menyebabkan kesalahan TypeScript pada waktu build — tidak ada pengaturan tambahan yang diperlukan.
>
> ```tsx
> // 'about' adalah kunci kamus terdaftar → t() hanya menerima jalur titik yang valid
> const { t } = useTranslation("about");
> t("counter.label"); // ✓ dilengkapi
> t("does.not.exist"); // ✗ kesalahan TypeScript
>
> // Server-side (instance i18next)
> const tAbout = i18n.getFixedT(null, "about");
> tAbout("counter.label"); // ✓ diketik
> ```

---

## Migrasi lengkap

Langkah-langkah di bawah ini bersifat opsional dan dapat dilakukan secara bertahap. Langkah-langkah ini membuka set fitur Intlayer yang lengkap: editor visual, CMS, file konten yang diketik, terjemahan bertenaga AI, dan lainnya.

<Steps>

<Step number={4} title="Explicit import renaming (optional)" isOptional={true}>

Plugin Intlayer sudah menangani aliasing di tingkat bundler. Jika Anda lebih suka membuat dependensi eksplisit di file sumber Anda, Anda dapat mengganti nama impor secara manual:

| Before                                             | After                                                        |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `import { useTranslation } from 'react-i18next'`   | `import { useTranslation } from '@intlayer/react-i18next'`   |
| `import { Trans } from 'react-i18next'`            | `import { Trans } from '@intlayer/react-i18next'`            |
| `import { withTranslation } from 'react-i18next'`  | `import { withTranslation } from '@intlayer/react-i18next'`  |
| `import { I18nextProvider } from 'react-i18next'`  | `import { I18nextProvider } from '@intlayer/react-i18next'`  |
| `import { initReactI18next } from 'react-i18next'` | `import { initReactI18next } from '@intlayer/react-i18next'` |
| `import i18next from 'i18next'`                    | `import i18next from '@intlayer/i18next'`                    |
| `import { createInstance } from 'i18next'`         | `import { createInstance } from '@intlayer/i18next'`         |
| `import { t } from 'i18next'`                      | `import { t } from '@intlayer/i18next'`                      |

Untuk Next.js (`next-i18next`):

| Before                                                                         | After                                                             |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `import { serverSideTranslations } from 'next-i18next/serverSideTranslations'` | `import { serverSideTranslations } from '@intlayer/next-i18next'` |
| `import { appWithTranslation } from 'next-i18next'`                            | `import { appWithTranslation } from '@intlayer/next-i18next'`     |
| `import { useTranslation } from 'next-i18next'`                                | `import { useTranslation } from '@intlayer/next-i18next'`         |

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

## Yang dapat Anda hapus setelah migrasi

Setelah adapter kompatibilitas berada di tempat, boilerplate `react-i18next` / `i18next` berikut dapat dihapus:

| File / pattern                           | Mengapa sudah tidak diperlukan                                                                                                                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `i18next.init()` calls                   | Provider Intlayer menginisialisasi semuanya secara otomatis; tidak ada langkah loading runtime.                                                          |
| `I18nextProvider` / `initReactI18next`   | Plugin Intlayer menangani injection dan bootstrapping di balik layar.                                                                                    |
| JSON language bundles (`locales/*.json`) | Bundle JSON hanya diperlukan jika Anda masih menggunakan plugin `syncJSON`. Setelah Anda migrasi ke file `.content.ts` Anda dapat menghapus folder JSON. |

Ketika Anda siap untuk melangkah lebih jauh, Intlayer **secara otomatis menemukan semua file `.content.ts` dan `.content.json` di mana saja dalam codebase Anda** (secara default, di mana saja di dalam `./src`). Anda dapat menempatkan file `my-component.content.ts` tepat di sebelah `MyComponent.tsx` Anda dan Intlayer akan mengambilnya pada waktu build tanpa konfigurasi tambahan — tidak ada imports, tidak ada registrasi, tidak ada file indeks terpusat yang diperlukan. Ini membuat co-locating translations dengan halaman dan komponen sepenuhnya tanpa hambatan.

---

## Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk memberikan intellisense TypeScript penuh untuk kunci terjemahan Anda. Pastikan `tsconfig.json` Anda mencakup tipe yang dihasilkan secara otomatis:

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
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

## Pelajari Lebih Lanjut

- **Visual Editor** — Kelola terjemahan secara visual di browser Anda: [Intlayer Visual Editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- **CMS** — Eksternalisasi dan kelola konten dari jarak jauh: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- **VS Code Extension** — Dapatkan autocompletion dan deteksi kesalahan terjemahan real-time: [Intlayer VS Code Extension](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- **CLI Reference** — Daftar lengkap perintah CLI: [Intlayer CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md)
- **Intlayer with React** — Panduan setup lengkap untuk React: [intlayer_with_vite+react.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- **Intlayer with Next.js** — Panduan setup lengkap untuk Next.js: [intlayer_with_nextjs_16.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)
