---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Ubah aplikasi Next.js yang sudah ada menjadi aplikasi multibahasa (panduan i18n 2026)
description: Temukan cara membuat aplikasi Next.js Anda yang sudah ada menjadi multibahasa menggunakan Intlayer Compiler. Ikuti panduan dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkan aplikasi Anda menggunakan AI.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js
  - JavaScript
  - React
  - Kompiler
  - AI
slugs:
  - doc
  - konfigurasi
  - nextjs
  - kompiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.1.6
    date: 2026-02-23
    changes: Rilis Awal
---

# Cara membuat aplikasi Next.js yang sudah ada menjadi multibahasa (i18n) (Panduan i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Solusi i18n terbaik untuk Next.js? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Bagaimana menginternasionalisasi aplikasi Anda dengan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) di GitHub.

## Daftar Isi

<TOC/>

## Mengapa internasionalisasi aplikasi yang sudah ada itu sulit?

Jika Anda pernah mencoba menambahkan beberapa bahasa ke aplikasi yang hanya dibuat untuk satu bahasa, Anda pasti tahu tantangannya. Ini bukan sekadar "sulit" - ini melelahkan. Anda harus menelusuri setiap file, menemukan setiap string teks, dan memindahkannya ke file kamus (dictionary) yang terpisah.

Lalu bagian yang berisiko: mengganti semua teks tersebut dengan kait kode (code hooks) tanpa merusak tata letak atau logika. Ini adalah jenis pekerjaan yang menghentikan pengembangan fitur baru selama berminggu-minggu dan terasa seperti refactoring yang tak ada ujungnya.

## Apa itu Intlayer Compiler?

**Intlayer Compiler** dibuat untuk melewati pekerjaan manual tersebut. Alih-alih memaksa Anda mengekstrak string secara manual, kompiler melakukannya untuk Anda. Ia memindai kode Anda, menemukan teks, dan menggunakan AI untuk menghasilkan kamus (dictionary) di latar belakang (background).
Kemudian, ia memodifikasi kode sumber (source code) Anda selama langkah build untuk menyuntikkan i18n hooks yang diperlukan. Pada dasarnya, Anda tetap menulis aplikasi Anda seolah-olah dalam satu bahasa, dan kompiler akan menangani transformasi multibahasa secara asli.

> Dokumentasi Kompiler: [https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)

### Keterbatasan

Karena kompiler melakukan analisis dan transformasi kode (menyuntikkan kait dan menghasilkan kamus) pada saat **kompilasi (compile time)**, hal ini dapat **memperlambat waktu build** aplikasi Anda.

Untuk membatasi dampak ini selama pengembangan aktif (dev mode), Anda dapat mengatur kompiler ke mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) atau menonaktifkannya saat tidak diperlukan.

---

## Panduan selangkah demi selangkah untuk mengatur Intlayer dalam aplikasi Next.js

### Langkah 1: Instal dependensi

Instal paket-paket yang diperlukan menggunakan pengelola paket favorit Anda:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
bunx intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi (transpilation), dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **next-intlayer**

  Paket yang mengintegrasikan Intlayer dengan Next.js. Ia menyediakan penyedia konteks dan hook untuk internasionalisasi Next.js. Selain itu, paket ini mencakup plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta middleware untuk mendeteksi preferensi bahasa pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mendefinisikan bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.INDONESIAN],
    defaultLocale: Locales.INDONESIAN,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    /**
     * Menunjukkan apakah kompilator harus diaktifkan.
     */
    enabled: true,

    /**
     * Direktori output untuk kamus yang dioptimalkan.
     */
    outputDir: "compiler",

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "", // Hapus awalan dasar

    /**
     * Menunjukkan apakah komponen harus disimpan setelah diubah.
     * Dengan begitu, kompilator dapat dijalankan satu kali saja untuk mengubah aplikasi, kemudian dapat dihapus.
     */
    saveComponents: false,
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Ini adalah contoh sederhana aplikasi peta",
  },
};

export default config;
```

> **Catatan**: Pastikan Anda telah menetapkan `OPEN_AI_API_KEY` di variabel lingkungan Anda.

> Melalui file konfigurasi ini, Anda dapat menyiapkan URL yang dilokalkan, pengalihan proxy, pemetaan cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, periksa dokumentasi [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer ke dalam konfigurasi Next.js Anda

Konfigurasikan pengaturan Next.js Anda untuk menggunakan Intlayer:

```typescript fileName="next.config.ts"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Opsional konfigurasi Next.js tambahan di sini */
};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` digunakan untuk mengintegrasikan Intlayer dengan Next.js. Ini memastikan pembuatan file kamus dan memantaunya dalam mode dev. Ini mendefinisikan variabel lingkungan Intlayer di dalam lingkungan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Terlebih lagi, ini menyediakan alias untuk mengoptimalkan kinerja dan bekerja secara menyeluruh dengan Komponen Server.

### Konfigurasi Babel

Kompilator Intlayer memerlukan Babel untuk mengekstrak dan mengoptimalkan konten Anda. Perbarui `babel.config.js` (atau `babel.config.json`) Anda untuk menyertakan plugin Intlayer:

```typescript fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  intlayerOptimizeBabelPlugin,
  getExtractPluginOptions,
  getOptimizePluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
    [intlayerOptimizeBabelPlugin, getOptimizePluginOptions()],
  ],
};
```

### Langkah 4: Deteksi Bahasa di Halaman Anda

Kosongkan konten `RootLayout` Anda dan ganti dengan contoh di bawah ini:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

### Langkah 5: Deklarasikan Konten Anda (Otomatis)

Dengan Kompiler diaktifkan, Anda **tidak lagi perlu** mendeklarasikan kamus konten (misalnya file `.content.ts`) secara manual.

Sebagai gantinya, Anda cukup menulis konten sebagai string yang dikodekan secara keras di kode Anda. Intlayer akan memindai kode sumber, menghasilkan terjemahan menggunakan penyedia AI yang dikonfigurasi, dan secara diam-diam mengganti string tersebut dengan konten yang dilokalkan selama langkah kompilasi build. Semuanya benar-benar otomatis.

Cukup tulis komponen Anda dengan string hardcoded dalam bahasa default Anda dan biarkan Intlayer Compiler menangani sisanya.

Contoh tampilan `page.tsx` Anda:

<Tabs>
  <Tab value="Code">

```tsx fileName="src/app/page.tsx"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  return (
    <>
      <p>Mulai dengan mengedit ini!</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
  <Tab value="Output">

```ts fileName="i18n/page-content.content.tsx"
{
  key: "page-content",
  content: {
    nodeType: "translation",
    translation: {
      en: {
        getStartedByEditingThis: "Get started by editing this!",
      },
      fr: {
        getStartedByEditingThis: "Commencez par éditer ceci !",
      },
      id: {
        getStartedByEditingThis: "Mulai dengan mengedit ini!",
      },
    }
  }
}
```

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditingThis}</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
```

  </Tab>
</Tabs>

- **`IntlayerClientProvider`** digunakan untuk menyediakan bahasa ke komponen sisi klien.
- Sementara **`IntlayerServerProvider`** digunakan untuk menyediakan bahasa ke anak-anak server.

### (Opsional) Langkah 7: Isi terjemahan yang hilang

Intlayer menyediakan alat CLI untuk membantu Anda mengisi terjemahan yang hilang. Anda dapat menggunakan perintah `intlayer` untuk menguji dan mengisi terjemahan yang hilang dari kode Anda.

```bash
npx intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash
npx intlayer fill         # Isi terjemahan yang hilang
```

> Untuk detail lebih lanjut, silakan merujuk ke [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/ci.md)

### (Opsional) Langkah 8: Middleware Proxy Rute Lokal

Jika Anda ingin secara otomatis mengalihkan pengguna ke bahasa pilihan mereka, buat middleware proxy:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` digunakan untuk mendeteksi bahasa pilihan pengguna dan mengalihkannya ke URL yang sesuai seperti yang ditentukan dalam [pengaturan file konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md). Selain itu, ini memungkinkan penyimpanan bahasa pilihan pengguna di cookie.

### (Opsional) Langkah 9: Ubah Bahasa Konten

Cara paling direkomendasikan untuk mengubah bahasa konten Anda di Next.js adalah dengan menggunakan komponen `Link` untuk mengalihkan pengguna ke rute dengan bahasa yang sesuai. Ini memanfaatkan fitur prefetch Next.js dan menghindari penyegaran halaman secara paksa.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Bahasa - contoh: ID */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam bahasanya sendiri - contoh: Bahasa Indonesia */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam bahasa saat ini - contoh: Francés (jika bahasa saat ini adalah Locales.SPANISH) */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam bahasa Inggris - contoh: Indonesian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Secara alternatif, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini tidak mengizinkan prefetch halaman. Periksa [dokumentasi hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md) untuk detail lebih lanjut.

### (Opsional) Langkah 10: Optimalkan Ukuran Bundle

Saat menggunakan `next-intlayer`, kamus disertakan dalam bundle untuk setiap halaman secara default. Untuk mengoptimalkan ukuran bundle, Intlayer menyediakan plugin SWC opsional yang secara cerdas mengganti panggilan `useIntlayer` menggunakan makro. Ini memastikan bahwa kamus hanya disertakan dalam bundle halaman yang benar-benar menggunakannya.

Untuk mengaktifkan optimasi ini, instal paket `@intlayer/swc`. Setelah diinstal, `next-intlayer` akan secara otomatis mendeteksi dan menggunakan plugin tersebut:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
```

> Catatan: Optimasi ini hanya tersedia untuk Next.js 13 ke atas.

> Catatan: Paket ini tidak diinstal secara default karena plugin SWC masih eksperimental di Next.js. Ini mungkin berubah di masa depan.

> Catatan: Jika Anda menyetel opsi sebagai `importMode: 'dynamic'` atau `importMode: 'fetch'` (dalam konfigurasi kamus), ini akan bergantung pada Suspense, jadi Anda perlu membungkus panggilan `useIntlayer` Anda dalam batas `Suspense`. Ini berarti Anda tidak dapat menggunakan `useIntlayer` secara langsung di tingkat atas komponen Halaman / Layout Anda.

### Konfigurasi TypeScript

Intlayer menggunakan augmentasi modul untuk memanfaatkan keunggulan TypeScript dan membuat basis kode Anda lebih kuat.

![Autocomplete](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari mengunggahnya ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code resmi Intlayer**.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocomplete** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Quick actions** untuk membuat dan memperbarui terjemahan dengan mudah.

Baca [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension) untuk instruksi mendetail tentang penggunaan ekstensi.

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasikan konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
