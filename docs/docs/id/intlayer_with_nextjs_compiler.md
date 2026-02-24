---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Next.js i18n - Cara membuat aplikasi Next.js yang sudah ada menjadi multibahasa (i18n) di kemudian hari (Panduan i18n 2026)
description: Temukan cara membuat aplikasi Next.js Anda yang sudah ada menjadi multibahasa menggunakan Intlayer Compiler. Ikuti panduan dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkan aplikasi Anda menggunakan AI.
keywords:
  - Internasionalisasi
  - Terjemahan
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

# Cara membuat aplikasi Next.js yang sudah ada menjadi multibahasa (i18n) di kemudian hari (Panduan i18n 2026)

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
Kemudian, ia memodifikasi kode sumber (source code) Anda selama langkah build untuk menyuntikkan i18n hooks yang diperlukan. Pada dasarnya, Anda tetap menulis aplikasi Anda seolah-olah dalam satu bahasa, dan kompiler akan menangani transformasi multibahasa secara otomatis.

> Dokumentasi Kompiler: https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md

### Keterbatasan

Karena kompiler melakukan analisis dan transformasi kode (menyuntikkan kait dan menghasilkan kamus) pada saat **kompilasi (compile time)**, hal ini dapat **memperlambat proses build** aplikasi Anda.

Untuk membatasi dampak ini selama pengembangan (development), Anda dapat mengatur kompiler untuk berjalan dalam mode [`'build-only'`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) atau menonaktifkannya saat tidak diperlukan.

---

## Panduan selangkah demi selangkah untuk mengatur Intlayer dalam aplikasi Next.js

### Langkah 1: Instal dependensi

Instal paket-paket yang diperlukan menggunakan pengelola paket favorit Anda:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi (transpilation), dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **next-intlayer**

  Paket yang mengintegrasikan Intlayer dengan Next.js. Ia menyediakan penyedia konteks (context providers) dan hook untuk internasionalisasi Next.js. Selain itu, paket ini mencakup plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta middleware untuk mendeteksi lokal bahasa pilihan pengguna, mengelola cookie, dan menangani pengalihan URL (URL redirection).

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mendefinisikan bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Dapat diatur ke 'build-only' untuk membatasi dampak dalam mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Tidak ada awalan kompilasi
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Aplikasi ini adalah contoh sederhana aplikasi peta",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Dapat diatur ke 'build-only' untuk membatasi dampak dalam mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Tidak ada awalan kompilasi
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Aplikasi ini adalah contoh sederhana aplikasi peta",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH],
    defaultLocale: Locales.FRENCH,
  },
  routing: {
    mode: "search-params",
  },
  compiler: {
    enabled: true, // Dapat diatur ke 'build-only' untuk membatasi dampak dalam mode dev
    outputDir: "i18n",
    dictionaryKeyPrefix: "", // Tidak ada awalan kompilasi
  },
  ai: {
    provider: "openai",
    model: "gpt-5-mini",
    apiKey: process.env.OPEN_AI_API_KEY,
    applicationContext: "Aplikasi ini adalah contoh sederhana aplikasi peta",
  },
};

module.exports = config;
```

> **Catatan**: Pastikan Anda telah menetapkan `OPEN_AI_API_KEY` di environment variables Anda.

> Melalui file konfigurasi ini, Anda dapat menyiapkan URL yang dilokalkan (localized URLs), pengalihan proxy (proxy redirection), pemetaan cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, periksa dokumentasi [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer ke dalam konfigurasi Next.js Anda

Konfigurasikan penyiapan Next.js Anda untuk menggunakan Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* Opsional konfigurasi Next.js Anda yang lain di sini */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Opsional konfigurasi Next.js Anda yang lain di sini */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Opsional konfigurasi Next.js Anda yang lain di sini */
};

module.exports = withIntlayer(nextConfig);
```

> Plugin `withIntlayer()` untuk Next.js terintegrasi penuh mengawasi Intlayer menjadi environment Next.js. Ia memastikan file kamus (dictionary) di-build ulang (re-built) saat dimodifikasi dalam dev mode (watch mode). Ia mendefinisikan variabel environment Intlayer di dalam sistem [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Lebih lanjut menyediakan alias (aliases) untuk meningkatkan kinerja, dan bekerja sempurna dengan Komponen Server (Server Components).

### Langkah 4: Rute bahasa (Locale) dinamis dikonfigurasi

Kosongkan fungsionalitas di `RootLayout` Anda dan ganti isinya dengan contoh di bawah ini:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
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

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
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

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const locale = await getLocale();
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Langkah 5: Deklarasikan konten Anda (Otomatis)

Dengan Kompiler (Compiler) diaktifkan, Anda **tidak lagi perlu** mendeklarasikan kamus konten (misalnya file `.content.ts`) secara manual.

Sebaliknya, Anda cukup menulis konten Anda sebagai string numerik langsung di kode visual React Anda. Intlayer akan menganalisis kode sumber, menghasilkan (generate) terjemahan menggunakan provider AI (Artificial Intelligence) dari konfigurasi, dan diam-diam mengganti string-string asli tersebut dengan konten yang dilokalkan saat proses build compile. Semua langkah ini diotomatiskan.

### Langkah 6: Gunakan fungsionalitas di kode Anda

Cukup ketik string statis/hardcoded di dalam lokakalan default Anda pada komponen, sisanya serahkan pada Compiler Intlayer.

Contoh dasar seperti apa `page.tsx` di aplikasi Anda:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const PageContent: FC = () => {
  return (
    <>
      <p>Mulai dengan mengubah ini!</p>
      <code>src/app/page.tsx</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { IntlayerServerProvider } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Mulai dengan mengubah ini!</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};

export default Page;
```

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { IntlayerServerProvider, getLocale } from "next-intlayer/server";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <>
        <p>Mulai dengan mengubah ini!</p>
        <code>src/app/page.tsx</code>
      </>
    </IntlayerServerProvider>
  );
};
```

- Ingat bahwa **`IntlayerClientProvider`** ditujukan untuk mendistribusikan preferensi lokakalan sisi-Klien (Client-side) secara reaktif menuruni children.
- Di sisi lain, **`IntlayerServerProvider`** bertugas memberikan lokakalan ke node anak (children nodes) dari komponen berjenis "Server render".

### (Opsional) Langkah 7: Tambahkan Proxy intersepsi Next.js

Jika Anda ingin pengguna otomatis diarahkan dan dilacak bahasanya, aktifkan Proxy di sistem aplikasi Anda:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> Fungsi kustom `intlayerProxy` akan secara proaktif membaca lokakalan dari pengguna Anda (berdasarkan bahasa browser) dan meredirect pengunjung ke tautan yang sesuai berlandaskan pengaturan di file [konfigurasi / Configuration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md). Ia juga menyimpannya di cookie untuk akses ke depannya supaya memuat lebih efisien.

### (Opsional) Langkah 8: Navigasi Antar Bahasa (Language Switcher)

Untuk antarmuka yang optimal dan navigasi organik Next.js (agar page tak mengalami _hard-refresh_ murni ke server), buat tombol perubah bahasa dengan memanggil `useLocale` hook kustom:

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
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
              {/* Bahasa Singkat - contoh: ID */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa yang Anda terjemahkan lokakalan tersebut - contoh: Indonesia */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Nama yang native/asli - contoh: Français */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Netral bahasa inggris untuk contoh opsi - contoh: Indonesian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
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
              {/* Bahasa Singkat - contoh: ID */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa yang Anda terjemahkan lokakalan tersebut - contoh: Indonesia */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Nama yang native/asli - contoh: Français */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Netral bahasa inggris untuk contoh opsi - contoh: Indonesian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
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
              {/* Bahasa Singkat - contoh: ID */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa yang Anda terjemahkan lokakalan tersebut - contoh: Indonesia */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Nama yang native/asli - contoh: Français */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Netral bahasa inggris untuk contoh opsi - contoh: Indonesian */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> API properti `setLocale` mengubah string rute preferensi ke state, dan juga mengatur persistensi preferensi user melalui penyetelan cookie di balik layar. Simak referensi API/Hooks untuk kapabilitas _routing_ lebih jauh di artikel dokumentasi manual [referensi hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md).

### (Opsional) Langkah 9: Akses Server Actions / State Lokal Latar Belakang

Apabila aplikasi Next Anda bereaksi di arsitektur SSR di background layaknya trigger Email massal dinamis dengan lokakalan pengguna: `getLocale` adalah fungsi andalan Anda untuk mengait ke lokal data klien (meskipun ia bukan client render React visual):

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Menjalankan tugas atau Fetch data server memakai fungsi bahasa teridentifikasi (contoh: ngirim email dalam bhs Indonesia..).
};
```

> Tingkatan metode membaca urutan `getLocale` mengikuti fallback canggih yaitu:
>
> 1. Next.js Default Request Header URL (Parameter request query header Middleware).
> 2. Variasi State "Cookie" yang direkam di Cache navigasi.
> 3. Tipe Lokal bahasa Sistem perangkat (Client headers navigator request system preferensi).
> 4. Pengambil-alihan Fall-over via penugasan dasar kunci "lokakalan fallback / Default Locale Config" pada string `intlayer.config.ts`.

### (Opsional) Langkah 10: Kurangi beban di dalam Bundling File Client/Transpiler (SWC Plugin Next js)

Di lingkungan Next.js modern, Anda bisa mencegah modul pengunduhan (Json payload bundle Client size) terlalu gemuk di jaringan transfer. Secara default pustaka komponen kamus dikirm via Client; namun ekstensi NextJS SWC (menggantikan webpack-loaders transpiler macro), seperti `@intlayer/swc`, dirakit untuk menjahit string hanya di komputasi dan mematikan pengiriman seluruh kamus untuk setiap pemuatan _page/rute_ statis. Transpiler hanya mengimbuhi kalimat spesifik!

Pasang package transpiler ke dalam Development Dev dependencies Node pipeline:

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

> Perhatian Konteks: SWC ekosistem (Experimental API react flag Plugin) Next.js di vercel masih dibentuk secara progresif dan memerlukan Vercel engine/Next versi Next.js di atas generasi _ver 13_. (Khusus turbopack flag dsb).

> Diarahkan: Untuk aplikasi React layout komponen Next App yang menyokong fungsi data-fetching tertunda secara asynchronous (Asynchronous hook `importMode`: dynamic / fetch `useIntlayer`), pastikan `<Suspense>` node tags telah dijahit menutupi root. Komponen React membutuhkan pelukan React Suspense, tanpa itu maka error Fatal Next.js render di Server akan melapor secara konsisten.

### Pengembangan "Live-Watch" Intlayer bersama Turbopack (.Next Dev mode)

Pengemasan ulang/Re-Build Next turbopack (Vercel) berjalan secara instan, akan tetapi hal tersebut tidak bersahabat dengan "Background plugin asynchronizing" Webpack Next. Alhasil Modul Kompiler JSON kamus .content di .intlayer directory mungkin butuh re-start jika tidak dibundling secara paralel.

Penyelesaian _Watch Mode Generator Intlayer_ tanpa hambatan perlu Anda masukkan ke scripts package :

Buka pengaturan utama `package.json`:

```json5 fileName="package.json"
{
  "scripts": {
    "dev": "intlayer watch --with 'next dev'", // Sintaksis Dev memicu dua Watcher dev environment (Intlayer dan Next Dev) bersamaan di Node terminal!
  },
}
```

> Kasus Spesifik Jika anda belum di next-intlayer > / = versi `7.0.0` (Anda masih memakai versi paket `@6.xxx` lawas): Opsi watch akan meminta string wajib flag `--turbopack` -> `"intlayer watch --with 'next dev --turbopack'"`. Build masa kini telah mengantisipasi itu tanpa flag secara bawaan!

### Autocomplete & Syntax Typescript Hints di Editor Anda

Saat sistem Intlayer bertugas memindai `JSON content output generation`, pustaka Types (.d.ts) dikonstruksi secara dinamis untuk proyek Typescript Anda.
Maka VS code / IDE Editor sanggup memberi autocompletion list prediksi dan mendeteksi string translasi kunci (_Key_ error linting jika key tak tersedia!)

![Contoh Live-Autocomplete IDE](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Contoh Peringatan Syntax Error / Kosong Translations Type-safe](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Beri pemahaman VS Code lokasi dimana type definisi I18n itu berada.
Masukkan ke folder roots include di `.tsconfig` project React Anda:

```json5 fileName="tsconfig.json"
{
  "include": [
    // Struktur direktori normal aplikasi
    ".intlayer/**/*.ts", // Pemasukan Direktori Output Dinamis dari Intlayer ke system Types.
  ],
}
```

### Konfigurasi Git / Code Versioning System

Output transpiler kompilasi atau generasi dinamis yang muncul (Folder Output `.intlayer`) bukan ditujukan mendarat ke _Git Remote Cloud Pipeline Repository_ karena hal ini spesifik proses CI / Local Computer-Engine cache processing, berpotensi tabrakan branch.

Kirim `Gitignore` dan saring output Folder:

```plaintext fileName=".gitignore"
# Hiraukan Modul Output Background Intlayer Build di Repositori!
.intlayer
```

### Penambah Produktivitas Tingkat Lanjut: VS Code Extension

Maksimalkan kenyamanan modifikasi i18n dalam Code (VS code Text Editor). Temui Extensi Oficial Microsoft VS Library Intlayer:

[Raup Kelebihan Mengunduh VS Code Extension di Marketplace!](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Fitur yang melekat ke IDE Anda:

- **Hover/Tooltip Prediksi Teks**: Arahkan Kursor Mouse di komponen IDE ke strings I18n dan rasakan keluaran _Pop-up Window_ yang menerjemahkan kalimat-kalimat output secara Native (Tanpa harus buka tab dokumen konten translasi).
- **Linter Merah Kesalahan Transalasi**: Cek-syntax untuk Missing translations dengan Garis Error Lint pada Code IDE secara live.
- **Konstruksi Keys Hotkey Cepat**: Mengekstrak _Strings hardcoded / teks default_ secara ajaib keluar Code, lalu disebar otomatis ke module direktori konten-translasi (File .content) melalui Key-Shortcut dan otomatis mengimpor Hook terkait hanya dari Editor UI Anda! Pelajari trik efisien ini di halaman manual ekstensip [Instruksi Ekstensi Kode Intlayer VS Code](https://intlayer.org/doc/vs-code-extension).

### Ekspansi Ekosistem Setelah Next.js Diatur?

Apakah arsitektur lokal repositori Anda (IDE/VS Code level files) telah sukses dikerjakan? Lanjutkan potensi kolaborasi Tim (Desainer/Copywriters dll). Alihkan kapabilitas "Hard Coding File Content" di Repo Node lokal menjadi UI Aplikasi Editor Manajemen Terbuka (Admin-Panel Front-End Layout Edit). Baca tutorial ini segera! [Intlayer Konfigurasi Modul Aplikasi Admin Visual "Visual Editor"](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).

Pengelolaan Backend Data Database Headless CMS / System Jaringan _Remote Online Editor_ yang mandiri dari Server Rendering Node Application : Mulai rakit konfigurasi di Cloud dengan [Headless Cloud Backend CMS Setup I18n Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
