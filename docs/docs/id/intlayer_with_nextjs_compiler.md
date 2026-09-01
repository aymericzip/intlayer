---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Next.js multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
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
  - environment
  - nextjs
  - compiler
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.2.0
    date: 2026-03-09
    changes: "Update compiler options, add FilePathPattern support"
  - version: 8.1.6
    date: 2026-02-23
    changes: "Rilis Awal"
author: aymericzip
---

# Cara membuat aplikasi Next.js yang sudah ada menjadi multibahasa (i18n) (Panduan i18n 2026)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Solusi i18n terbaik untuk Next.js? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
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

<Steps>

<Step number={1} title="Instal dependensi">

Instal paket-paket yang diperlukan menggunakan pengelola paket favorit Anda:

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

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add @intlayer/babel --dev
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi (transpilation), dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **next-intlayer**

  Paket yang mengintegrasikan Intlayer dengan Next.js. Ia menyediakan penyedia konteks dan hook untuk internasionalisasi Next.js. Selain itu, paket ini mencakup plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta middleware untuk mendeteksi preferensi bahasa pengguna, mengelola cookie, dan menangani pengalihan URL.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

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
     * Menunjukkan apakah kompiler harus diaktifkan.
     */
    enabled: true,

    /**
     * Direktori output untuk kamus yang dioptimalkan.
     */
    output: ({ locale, key }) => `compiler/${locale}/${key}.json`,

    /**
     * Masukkan konten saja dalam file yang dihasilkan, tanpa kunci.
     */
    noMetadata: false,

    /**
     * Awalan kunci kamus
     */
    dictionaryKeyPrefix: "", // Remove base prefix

    /**
     * Menunjukkan apakah komponen harus disimpan setelah ditransformasi.
     * Dengan begitu, kompiler hanya perlu dijalankan sekali untuk mentransformasi aplikasi, lalu dapat dihapus.
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

</Step>

<Step number={3} title="Integrasikan Intlayer ke dalam konfigurasi Next.js Anda">

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

</Step>

<Step number={4} title="Deteksi Bahasa di Halaman Anda">

Compiler Intlayer memerlukan Babel untuk mengekstrak dan mengoptimalkan konten Anda. Perbarui `babel.config.js` (atau `babel.config.json`) Anda untuk menyertakan plugin Intlayer:

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

</Step>

<Step number={5} title="Mendeteksi Locale di halaman Anda">

Kosongkan konten `RootLayout` Anda dan ganti dengan contoh di bawah ini:

```tsx fileName="src/app/layout.tsx"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Step>

<Step number={6} title="Deklarasikan Konten Anda">

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

</Tab>
</Tabs>

<Tabs>
<Tab label='Intlayer >=9.4' value='>=9.4'>

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

- **`IntlayerProvider`** dipasang sekali, dalam root layout. Ini menyediakan locale ke komponen server dan client, sehingga halaman tidak lagi membungkus diri mereka sendiri.
- Tanpa segmen path `[locale]`, locale selalu berasal dari request — header `x-intlayer-locale` yang diatur oleh proxy Intlayer, kemudian cookie locale — yang dibaca oleh server hooks mereka sendiri ketika provider belum dijalankan.

</Tab>
<Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx"
import { type FC } from "react";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";

const PageContent: FC = () => {
  const content = useIntlayer("page-content");

  return (
    <>
      <p>{content.getStartedByEditing}</p>
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

- **`IntlayerClientProvider`** digunakan untuk menyediakan bahasa ke komponen sisi klien.
- Sementara **`IntlayerServerProvider`** digunakan untuk menyediakan bahasa ke anak-anak server.

  > Layout and page cannot share a common server context because the server context system is based on a per-request data store (via [React's cache](https://react.dev/reference/react/cache) mechanism), causing each "context" to be re-created for different segments of the application. Placing the provider in a shared layout would break this isolation, preventing the correct propagation of the server context values to your server components.

</Tab>

</Tabs>

</Step>

<Step number={7} title="Isi terjemahan yang hilang" isOptional={true}>

Intlayer menyediakan alat CLI untuk membantu Anda mengisi terjemahan yang hilang. Anda dapat menggunakan perintah `intlayer` untuk menguji dan mengisi terjemahan yang hilang dari kode Anda.

```bash packageManager="npm"
npx intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="yarn"
yarn intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="pnpm"
pnpm intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="bun"
bun x intlayer test         # Uji apakah ada terjemahan yang hilang
```

```bash packageManager="npm"
npx intlayer fill         # Isi terjemahan yang hilang
```

```bash packageManager="yarn"
yarn intlayer fill         # Isi terjemahan yang hilang
```

```bash packageManager="pnpm"
pnpm intlayer fill         # Isi terjemahan yang hilang
```

```bash packageManager="bun"
bun x intlayer fill         # Isi terjemahan yang hilang
```

> Untuk detail lebih lanjut, silakan merujuk ke [dokumentasi CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/ci.md)

</Step>

<Step number={8} title="Middleware Proxy Rute Lokal" isOptional={true}>

Jika Anda ingin secara otomatis mengalihkan pengguna ke bahasa pilihan mereka, buat middleware proxy:

```typescript fileName="src/proxy.ts"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` digunakan untuk mendeteksi bahasa pilihan pengguna dan mengalihkannya ke URL yang sesuai seperti yang ditentukan dalam [pengaturan file konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md). Selain itu, ini memungkinkan penyimpanan bahasa pilihan pengguna di cookie.

> Sejak Intlayer v9, middleware ini menghormati opsi `routing.enableProxy` (`true` secara default). Atur `routing.enableProxy: false` dalam konfigurasi Anda untuk mengubahnya menjadi pass-through tanpa menghapus file ini. Lihat [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md).

</Step>

<Step number={9} title="Ubah Bahasa Konten" isOptional={true}>

Cara paling direkomendasikan untuk mengubah bahasa konten Anda di Next.js adalah dengan menggunakan komponen `Link` untuk mengalihkan pengguna ke rute dengan bahasa yang sesuai. Ini memanfaatkan fitur prefetch Next.js dan menghindari penyegaran halaman secara paksa.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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

</Step>

<Step number={10} title="Optimalkan Ukuran Bundle" isOptional={true}>

Saat menggunakan `next-intlayer`, kamus disertakan dalam bundle untuk setiap halaman secara default. Untuk mengoptimalkan ukuran bundle, Intlayer menyediakan plugin SWC opsional yang secara cerdas mengganti panggilan `useIntlayer` menggunakan makro. Ini memastikan bahwa kamus hanya disertakan dalam bundle halaman yang benar-benar menggunakannya.

Plugin `@intlayer/babel` sudah mengintegrasikan optimasi bundling (lihat `babel.config.js`). Namun plugin `@intlayer/swc` lebih performan. Jika Anda menghapus plugin `@intlayer/babel`, Anda dapat menggunakan plugin `@intlayer/swc`.

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

</Step>

<Step number={11} title="Ekstrak konten komponen Anda" isOptional={true}>

Jika Anda memiliki basis kode yang ada, mengubah ribuan file bisa memakan waktu lama.

Untuk memudahkan proses ini, Intlayer mengusulkan [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengubah komponen Anda dan mengekstrak kontennya.

Untuk mengaturnya, Anda dapat menambahkan bagian `compiler` di file `intlayer.config.ts` Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Sisa konfigurasi Anda
  compiler: {
    /**
     * Menunjukkan apakah compiler harus diaktifkan.
     */
    enabled: true,

    /**
     * Menentukan jalur file output
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Menunjukkan apakah komponen harus disimpan setelah diubah. Dengan begitu, compiler dapat dijalankan satu kali saja untuk mengubah aplikasi, lalu dapat dihapus.
     */
    saveComponents: false,

    /**
     * Prefiks kunci kamus
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
<Tab value='Extract command'>

Jalankan extractor untuk mengubah komponen Anda dan mengekstrak kontennya

```bash packageManager="npm"
npx intlayer extract
```

```bash packageManager="pnpm"
pnpm intlayer extract
```

```bash packageManager="yarn"
yarn intlayer extract
```

```bash packageManager="bun"
bun x intlayer extract
```

</Tab>
<Tab value='Babel compiler'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

```bash packageManager="npm"
npm install @intlayer/babel --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/babel --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/babel --save-dev
```

```bash packageManager="bun"
bun add @intlayer/babel --dev
```

```js fileName="babel.config.js"
const {
  intlayerExtractBabelPlugin,
  getExtractPluginOptions,
} = require("@intlayer/babel");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    // Ekstrak konten dari komponen ke dalam kamus
    [intlayerExtractBabelPlugin, getExtractPluginOptions()],
  ],
};
```

```bash packageManager="npm"
npm run build # Atau npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Or pnpm run dev
```

```bash packageManager="yarn"
yarn build # Or yarn dev
```

```bash packageManager="bun"
bun run build # Or bun run dev
```

</Tab>
</Tabs>
</Step>

</Steps>

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

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Next.js?">

Field `i18n` dari `next.config.js` tidak berlaku untuk App Router, jadi lapisan lokalisasi selalu menjadi pilihan library:

- **`next-intl`**, **`next-i18next` / `i18next`** dan **`react-intl`**: katalog JSON atau ICU yang dimuat per namespace, dengan kunci yang ditulis manual di setiap titik panggilan.
- **`Lingui`**: didorong oleh ekstraksi, dengan pesan ICU yang dikompilasi saat build time.
- **`Intlayer`**: konten yang dikompilasi dari komponen Anda saat build time, bertipe penuh, dengan terjemahan AI, editor visual, dan CMS.

Panduan ini menggunakan penyiapan compiler, di mana Anda tetap menulis string biasa di komponen Anda dan kamus dibuatkan untuk Anda. Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md) dan [tolok ukur i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle Next.js saya?">

Jauh lebih sedikit daripada solusi berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Komponen server menyelesaikan konten di server, dan kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen. [Kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale, mengurangi ukuran bundle hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Bisakah saya bermigrasi dari next-intl, next-i18next atau i18next tanpa menulis ulang komponen saya?">

Ya, ada dua jalur. Anda dapat memigrasikan konten secara bertahap dengan [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md) atau [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md). Atau Anda dapat mempertahankan API saat ini sepenuhnya: [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) mengekspos API yang sama persis dengan `next-intl` dan `i18next` tetapi ditenagai oleh kamus Intlayer.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file sumber Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

Dua batasan perlu diketahui. Compiler bekerja dengan analisis statis, jadi string yang hanya ada saat runtime, seperti kode kesalahan API atau field CMS, tetap berada di luar jangkauan dan masih memerlukan kamus yang dideklarasikan. Dan ini harus membedakan teks yang dilihat pengguna dari logika aplikasi seperti `className="active"` atau kode status, yang memerlukan beberapa anotasi di basis kode yang besar.

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time pada kode JSX, TSX, Vue dan Svelte, menghasilkan kamus pada setiap perubahan tanpa perlu memelihara kunci secara manual. Karena bekerja melalui analisis statis, string yang hanya ada di runtime tetap berada di luar jangkauannya.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Bagaimana compiler memutuskan apa yang merupakan teks pengguna?">

Compiler menggunakan aturan analisis statis: teks dalam node JSX dan atribut umum (`aria-label`, `title`, `placeholder`) dianggap terlokalisasi, sedangkan class CSS dan identifier kode diabaikan.

</Question>

<Question title="Apa yang terjadi pada string yang tidak dapat dilihat compiler?">

String dinamis yang dibuat saat runtime atau respons API tidak tertangkap oleh compiler. Untuk string tersebut, Anda menggunakan `t()` secara eksplisit atau file `.content` standar.

</Question>

<Question title="Haruskah saya menggunakan compiler atau mendeklarasikan konten sendiri?">

Untuk pembuatan prototipe cepat, compiler sangat praktis. Untuk antarmuka kompleks dengan aturan jamak atau format khusus, file `.content` eksplisit memberikan kontrol yang lebih tinggi.

</Question>

<Question title="Apakah Intlayer bekerja dengan React Server Components?">

Ya. Konten di Server Components diselesaikan langsung di server, sehingga tidak ada kamus yang dikirim ke klien untuk teks yang dirender server. Client Components membaca kamus melalui provider.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. CLI mendeteksi terjemahan yang hilang dan mengisinya dengan LLM pilihan Anda menggunakan provider dan API key Anda sendiri. Flag `--git-diff` membatasi proses ke konten yang diubah pada branch saat ini. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

</Question>

<Question title="Bagaimana penerjemah dapat mengedit konten tanpa menyentuh kode?">

Melalui [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang memungkinkan siapa saja mengedit teks langsung di aplikasi yang berjalan, atau melalui [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten sehingga dapat diubah tanpa perlu redeploy kode.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
