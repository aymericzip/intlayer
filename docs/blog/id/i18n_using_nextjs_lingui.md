---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n Next.js 16 dengan Lingui: Panduan Pengaturan App Router"
description: "Siapkan Lingui di App Router Next.js 16: Server Components, makro SWC, perutean proxy, generateMetadata, hreflang, sitemap, dan robots.txt, lengkap dengan data tolok ukur (benchmark)."
keywords:
  - Lingui
  - LinguiJS
  - Next.js
  - Next.js 16
  - App Router
  - React Server Components
  - Internasionalisasi
  - i18n
  - SEO
  - Blog
slugs:
  - blog
  - nextjs-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versi awal"
author: aymericzip
---

# Cara Menginternasionalisasi Aplikasi Next.js Anda Menggunakan Lingui pada Tahun 2026

## Daftar Isi

<TOC/>

## Apa itu Lingui?

**Lingui** adalah pustaka i18n yang dibangun di sekitar **makro** dan **ekstraksi pesan**. Anda menulis teks sumber di dalam komponen Anda (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` mengumpulkan setiap pesan ke dalam katalog (file PO secara default), dan sebuah loader mengompilasinya menjadi JavaScript yang ringkas. Pesan menggunakan format ICU MessageFormat, dan Lingui mendukung **React Server Components** di App Router.

Panduan ini menyiapkan Lingui dalam proyek **Next.js 16 App Router**, dengan:

- **Makro yang dikompilasi oleh SWC**, sehingga Turbopack tetap mempertahankan kecepatannya.
- **Server dan Client Components** berbagi API `Trans` dan `useLingui` yang sama.
- **Perutean lokal (locale routing)** melalui `proxy.ts`: `/about` untuk lokal default, `/fr/about` untuk lokal lainnya, serta deteksi bahasa pada kunjungan pertama.
- **Rendering statis** untuk setiap lokal dengan `generateStaticParams`.
- **SEO multibahasa yang lengkap**: `generateMetadata` yang diterjemahkan, canonical, `hreflang` dengan `x-default`, Open Graph locales, JSON-LD, `sitemap.ts`, `robots.ts`, dan halaman 404 yang dilokalkan.

> Mencari pustaka lain?

- [panduan next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-intl.md)
- [panduan next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-i18next.md)
- [panduan Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)

> Menggunakan TanStack Start?

- [panduan TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_lingui.md)

> Ingin membandingkan pustaka?

- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer.md)
- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md)

> Untuk memahami asal-usul pustaka-pustaka ini, baca sejarah i18n di JavaScript.

- [Sejarah i18n di JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)

## Apa yang Dikatakan Tolok Ukur (Benchmark) Mengenai Lingui di Next.js

[Tolok ukur i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md) menjalankan aplikasi Next.js 10 halaman dan 10 lokal yang sama dengan setiap pustaka utama dan mengukur apa yang sebenarnya diunduh oleh peramban.

- [Tolok ukur i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)

<I18nBenchmark framework="nextjs" packages="lingui,@intlayer/lingui,next-intlayer" vertical/>

Angka-angka penting untuk `@lingui/core@6.6.0` di Next.js 16, diukur pada 2026-09-26 (gzip):

| Pengaturan                       | Ukuran pustaka | JS per halaman | Kebocoran lokal lain | Kebocoran halaman lain |
| :------------------------------- | -------------: | -------------: | -------------------: | ---------------------: |
| Tanpa i18n (aplikasi dasar)      |              - |       141.0 KB |                   0% |                     0% |
| Lingui, satu katalog per lokal   |        72.1 KB |       145.4 KB |                 2.8% |                  89.9% |
| `@intlayer/lingui` (kompatibel)  |        10.7 KB |       221.6 KB |                  50% |                    90% |
| `next-intlayer` (Intlayer natif) |         4.9 KB |       141.5 KB |                   0% |                     0% |

Poin penting yang perlu diperhatikan:

- **Satu katalog per lokal masih membocorkan pesan halaman lain** ke penyedia (provider) klien. Simpan teks sebanyak mungkin di Server Components, yang mengirimkan HTML hasil render, bukan katalog pesan.
- **Runtime Lingui berbobot ~72 KB gzip.** Adaptor kompatibilitas `@intlayer/lingui` memangkas ukuran runtime menjadi ~11 KB, tetapi dalam tolok ukur ini pengaturan kompatibilitas Next.js masih mengirimkan seluruh katalog ke halaman. API bawaan `next-intlayer` adalah pengaturan yang tetap berada pada ukuran aplikasi dasar.

> Lihat data selengkapnya: [Laporan tolok ukur Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md), dan [repositori tolok ukur](https://github.com/intlayer-org/benchmark-i18n).

- [Laporan tolok ukur Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)

## Perbandingan Fitur di Next.js

Perbandingan Lingui dengan `next-intl` dan Intlayer pada fitur-fitur yang biasanya dibutuhkan oleh proyek Next.js App Router:

| Fitur                                | `next-intlayer` (Intlayer)                                                  | Lingui                                                                | `next-intl`                                 |
| ------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------- |
| **Terjemahan dekat dengan komponen** | ✅ Konten ditempatkan bersama setiap komponen                               | ⚠️ Teks sumber dalam komponen, katalog terpusat                       | ❌ JSON terpusat                            |
| **Integrasi TypeScript**             | ✅ Tipe ketat yang dibuat otomatis                                          | ⚠️ Makro memiliki tipe, katalog pesan tidak                           | ✅ Bagus, melalui augmentasi `AppConfig`    |
| **Deteksi terjemahan yang hilang**   | ✅ Kesalahan TypeScript dan peringatan saat build                           | ⚠️ Fallback runtime ke teks sumber                                    | ⚠️ Fallback runtime                         |
| **Konten kaya (JSX, Markdown)**      | ✅ Dukungan langsung                                                        | ✅ JSX di dalam `<Trans>`, tidak ada Markdown                         | ⚠️ Tag melalui `t.rich`, tidak ada Markdown |
| **Terjemahan AI**                    | ✅ Menggunakan penyedia dan kunci API Anda sendiri, dengan konteks aplikasi | ❌ Tidak                                                              | ❌ Tidak                                    |
| **Editor visual / CMS**              | ✅ Editor visual lokal + CMS opsional                                       | ❌ Melalui platform eksternal                                         | ❌ Melalui platform eksternal               |
| **Perutean terlokalisasi**           | ✅ Bawaan                                                                   | ❌ Tulis `proxy.ts` Anda sendiri                                      | ✅ Segmen `[locale]` bawaan                 |
| **Pluralisasi**                      | ✅ Berbasis enumerasi                                                       | ✅ ICU, makro `<Plural>`                                              | ✅ ICU                                      |
| **Format konten**                    | ✅ `.ts`, `.tsx`, `.js`, `.json`, `.md`, `.yaml`                            | ✅ PO, JSON, CSV                                                      | ✅ `.json`, `.js`, `.ts`                    |
| **ICU MessageFormat**                | ✅ Melalui `format: "icu"`                                                  | ✅ Natif                                                              | ✅ Natif                                    |
| **Pembantu SEO (hreflang, sitemap)** | ✅ Pembantu metadata, sitemap, dan robots.txt                               | ❌ Manual                                                             | ✅ Bagus                                    |
| **Server Components**                | ✅ Akses langsung di Server Component apa pun                               | ⚠️ `setI18n` di setiap layout dan page                                | ⚠️ `await getTranslations()` per komponen   |
| **Tree-shaking per komponen**        | ✅ Pada saat build (Babel / SWC)                                            | ⚠️ Satu katalog per lokal, ekstraktor per halaman masih eksperimental | ⚠️ Manual, dengan `pick()` per rute         |
| **Ukuran runtime (gzip, benchmark)** | 4.9 KB                                                                      | 72.1 KB                                                               | 14.7 KB                                     |
| **Terjemahan hilang di CI**          | ✅ `npx intlayer test`                                                      | ✅ `lingui compile --strict`                                          | ⚠️ Tidak tersedia secara bawaan             |
| **Ekosistem / komunitas**            | ⚠️ Lebih kecil, berkembang pesat                                            | ✅ Matang                                                             | ✅ Besar                                    |

> Ukuran runtime bersumber dari [Tolok ukur Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md). Untuk pembahasan mendalam, baca [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer.md).

- [Tolok ukur Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)
- [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer.md)

> Panduan Next.js lainnya:

- [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-intl.md)
- [next-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-i18next.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)

## Praktik Terbaik yang Harus Anda Ikuti

- **Tetapkan `lang` dan `dir` pada tag `<html>`** di dalam layout `[locale]`.
- **Utamakan Server Components** untuk teks: komponen ini merender HTML di server dan tidak memerlukan katalog pesan di sisi klien.
- **Panggil `initLingui(locale)` di setiap layout dan page.** Layout tidak merender ulang saat navigasi, sehingga sebuah halaman tidak dapat mengandalkan layout-nya untuk menyetel lokal.
- **Pertahankan satu URL per lokal** dan lakukan pra-render setiap lokal dengan `generateStaticParams`.
- **Terjemahkan metadata Anda** di dalam `generateMetadata`, lengkap dengan `canonical`, `hreflang`, dan `x-default`.
- **Buat sitemap dan robots.txt multibahasa** dengan konvensi `sitemap.ts` dan `robots.ts`.
- **Gunakan tautan nyata untuk pengalih bahasa**, agar mesin perayap (crawler) dapat menemukan setiap versi bahasa.
- **Jalankan `lingui extract` di CI** agar pesan baru tidak pernah terkirim ke produksi dalam keadaan belum diterjemahkan.

- [internasionalisasi dan SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md)
- [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md)
- [perbandingan SEO multibahasa Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/nextjs-multilingual-seo-comparison.md)

## Panduan Langkah demi Langkah untuk Menyiapkan Lingui di Aplikasi Next.js

Berikut adalah struktur proyek yang akan kita buat:

```bash
.
├── lingui.config.ts
├── next.config.ts
└── src
    ├── proxy.ts                    # Perutean dan deteksi lokal
    ├── locales
    │   ├── en
    │   │   └── messages.po         # Dihasilkan oleh `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── i18n
    │   ├── config.ts               # Lokal, pembantu URL
    │   ├── appRouterI18n.ts        # Katalog dan instance khusus server
    │   ├── initLingui.ts
    │   ├── negotiateLocale.ts
    │   └── metadata.ts             # Pembangun generateMetadata
    ├── components
    │   ├── LinguiClientProvider.tsx
    │   ├── LocaleSwitcher.tsx
    │   └── LocalizedLink.tsx
    └── app
        ├── sitemap.ts
        ├── robots.ts
        └── [locale]
            ├── layout.tsx
            ├── page.tsx
            ├── not-found.tsx
            ├── [...rest]
            │   └── page.tsx        # 404 terlokalisasi untuk rute tak dikenal
            └── about
                └── page.tsx
```

<Steps>
<Step number={1} title="Instal Dependensi">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/swc-plugin @lingui/loader @lingui/format-po
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider`, `setI18n` untuk Server Components, serta makro (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/swc-plugin**: mengompilasi makro di dalam pipeline Next.js SWC.
- **@lingui/loader**: mengompilasi katalog `.po` saat diimpor, sehingga `lingui compile` tidak diperlukan.
- **@lingui/cli**: `lingui extract` untuk mengumpulkan pesan ke dalam katalog.

> `@lingui/swc-plugin` adalah plugin WebAssembly yang terikat pada versi SWC Next.js. Jika build gagal setelah pembaruan Next.js, perbarui plugin ke versi yang terdaftar kompatibel di README-nya.

</Step>
<Step number={2} title="Pusatkan Konfigurasi Lokal Anda">

Satu file menentukan lokal dan fungsi pembantu URL. Perutean, metadata, sitemap, dan Lingui semuanya membaca dari file ini.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Asal publik, digunakan untuk URL kanonikal, hreflang, dan sitemap. */
export const siteUrl = "https://example.com";

/** Cookie yang menyimpan lokal yang dipilih secara eksplisit oleh pengunjung. */
export const localeCookieName = "NEXT_LOCALE";

/** Open Graph membutuhkan kode `language_TERRITORY`. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const resolveLocale = (value: string | undefined): Locale =>
  isLocale(value) ? value : defaultLocale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, lokal default tanpa awalan. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

/** `/fr/about` → `/about` */
export const stripLocale = (pathname: string): string => {
  const [, firstSegment, ...rest] = pathname.split("/");

  return isLocale(firstSegment) ? `/${rest.join("/")}` : pathname;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Konfigurasikan Lingui dan Next.js">

```ts fileName="lingui.config.ts"
import { defineConfig } from "@lingui/cli";
import { formatter } from "@lingui/format-po";
import { defaultLocale, locales } from "./src/i18n/config";

export default defineConfig({
  sourceLocale: defaultLocale,
  locales: [...locales],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false }),
});
```

Plugin SWC mengompilasi makro, dan loader mengompilasi file `.po`, baik untuk Turbopack (default di Next.js 16) maupun webpack:

```ts fileName="next.config.ts"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },
  turbopack: {
    rules: {
      "*.po": { loaders: ["@lingui/loader"], as: "*.js" },
    },
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.po$/, use: "@lingui/loader" });

    return config;
  },
};

export default nextConfig;
```

Tambahkan skrip ekstraksi:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

</Step>
<Step number={4} title="Muat Katalog dan Buat Instance Server">

Server Components tidak memiliki React context, sehingga Lingui menyediakan `setI18n` untuk mendaftarkan instance pada render saat ini. Modul ini memuat setiap katalog **satu kali per proses server** dan membuat satu instance `I18n` per lokal. Modul ini bersifat `server-only`: katalog dari lokal lain tidak akan pernah masuk ke dalam bundel klien.

```ts fileName="src/i18n/appRouterI18n.ts"
import "server-only";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { type Locale, locales } from "./config";

const loadCatalog = async (locale: Locale): Promise<[Locale, Messages]> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return [locale, messages];
};

const catalogs = Object.fromEntries(
  await Promise.all(locales.map(loadCatalog))
) as Record<Locale, Messages>;

const i18nInstances = Object.fromEntries(
  locales.map((locale) => [
    locale,
    setupI18n({ locale, messages: { [locale]: catalogs[locale] } }),
  ])
) as Record<Locale, I18n>;

export const getMessages = (locale: Locale): Messages => catalogs[locale];

export const getI18nInstance = (locale: Locale): I18n => i18nInstances[locale];
```

```ts fileName="src/i18n/initLingui.ts"
import { setI18n } from "@lingui/react/server";
import { getI18nInstance } from "./appRouterI18n";
import type { Locale } from "./config";

/**
 * Mendaftarkan instance untuk render Server Component saat ini.
 * Panggil fungsi ini di setiap layout dan page.
 */
export const initLingui = (locale: Locale) => {
  const i18n = getI18nInstance(locale);

  setI18n(i18n);

  return i18n;
};
```

Agar TypeScript mengenali impor `.po`, deklarasikan modul ini satu kali:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={5} title="Buat Provider Klien">

Client Components membaca terjemahan dari React context. Provider menerima katalog dari lokal aktif dari layout server, dan membuat instance-nya sendiri satu kali.

```tsx fileName="src/components/LinguiClientProvider.tsx"
"use client";

import { type Messages, setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useState } from "react";

type LinguiClientProviderProps = {
  children: ReactNode;
  initialLocale: string;
  initialMessages: Messages;
};

export const LinguiClientProvider = ({
  children,
  initialLocale,
  initialMessages,
}: LinguiClientProviderProps) => {
  const [i18n] = useState(() =>
    setupI18n({
      locale: initialLocale,
      messages: { [initialLocale]: initialMessages },
    })
  );

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
```

</Step>
<Step number={6} title="Definisikan Rute Lokal Dinamis">

Segmen `[locale]` menampung root layout. `generateStaticParams` melakukan pra-render setiap lokal saat waktu build, dan `dynamicParams = false` mengembalikan respons 404 untuk setiap awalan lainnya.

```tsx fileName="src/app/[locale]/layout.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LinguiClientProvider } from "@/components/LinguiClientProvider";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { getMessages } from "@/i18n/appRouterI18n";
import { getTextDirection, isLocale, locales, siteUrl } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

// Awalan yang tidak dikenal (/xx/about) → 404
export const dynamicParams = false;

export const metadata: Metadata = {
  // Menyelesaikan URL kanonikal dan Open Graph relatif
  metadataBase: new URL(siteUrl),
};

const LocaleLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!isLocale(locale)) notFound();

  initLingui(locale);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <body>
        <LinguiClientProvider
          initialLocale={locale}
          initialMessages={getMessages(locale)}
        >
          <header>
            <LocaleSwitcher />
          </header>
          <main>{children}</main>
        </LinguiClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Provider klien menerima seluruh katalog dari lokal aktif. Inilah yang diukur oleh tolok ukur sebagai "kebocoran halaman lain". Menyimpan teks di Server Components akan membatasi apa yang benar-benar dibutuhkan oleh klien. Untuk aplikasi besar, ekstraktor per halaman eksperimental Lingui (`experimental.extractor` di `lingui.config.ts`) dapat membagi katalog berdasarkan titik masuk (entry point).

</Step>
<Step number={7} title="Gunakan Terjemahan di Server Components">

Server Components menggunakan makro yang sama dengan Client Components. `initLingui` juga harus dijalankan di halaman, karena layout tidak merender ulang saat berpindah antar halaman di dalamnya.

```tsx fileName="src/app/[locale]/about/page.tsx"
import { Trans, useLingui } from "@lingui/react/macro";
import { Counter } from "@/components/Counter";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const AboutPage = async ({ params }: PageProps<"/[locale]/about">) => {
  const { locale } = await params;

  initLingui(resolveLocale(locale));

  return <AboutContent />;
};

const AboutContent = () => {
  const { t } = useLingui();

  return (
    <section aria-label={t`About section`}>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Trans>
          We build <strong>fast</strong>, multilingual applications.
        </Trans>
      </p>
      <Counter />
    </section>
  );
};

export default AboutPage;
```

</Step>
<Step number={8} title="Gunakan Terjemahan di Client Components">

Client Components menggunakan impor yang sama. Makro membaca instance dari `LinguiClientProvider`.

```tsx fileName="src/components/Counter.tsx"
"use client";

import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { useState } from "react";

export const Counter = () => {
  const { t, i18n } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <p>{i18n.number(count)}</p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </div>
  );
};
```

</Step>
<Step number={9} title="Ekstrak dan Terjemahkan Pesan Anda">

Jalankan ekstraksi. Lingui menulis setiap pesan yang ditemukan di `src` ke dalam setiap katalog lokal:

```bash
npm run i18n:extract
```

Kemudian terjemahkan nilai `msgstr` pada setiap entri:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Nous créons des applications <0>rapides</0> et multilingues."

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "We build <0>fast</0>, multilingual applications."
msgstr "Creamos aplicaciones <0>rápidas</0> y multilingües."

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clics}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Placeholder `<0>` menjaga posisi elemen JSX dari `<Trans>`, sehingga penerjemah dapat memindahkannya tanpa merusak markup.

</Step>
<Step number={10} title="Siapkan Proxy untuk Perutean Lokal" isOptional={true}>

Next.js 16 mengubah nama `middleware.ts` menjadi `proxy.ts`. Proxy menerapkan strategi awalan "sesuai kebutuhan" (as-needed):

- `/fr/about` disajikan sebagaimana adanya;
- `/en/about` mengalihkan ke `/about`, sehingga lokal default memiliki satu URL tunggal;
- `/about` ditulis ulang secara internal ke `/en/about`, tanpa mengubah URL;
- kunjungan pertama ke `/` mengalihkan ke bahasa yang diinginkan (cookie terlebih dahulu, kemudian `Accept-Language`).

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/** "fr-CA,fr;q=0.9,en;q=0.8" → "fr" */
export const negotiateLocale = (
  acceptLanguage: string | null | undefined
): Locale | undefined => {
  if (!acceptLanguage) return undefined;

  return acceptLanguage
    .split(",")
    .map((part) => {
      const [tag = "", quality] = part.trim().split(";q=");

      return {
        language: tag.toLowerCase().split("-")[0],
        quality: quality ? Number(quality) : 1,
      };
    })
    .sort((first, second) => second.quality - first.quality)
    .map(({ language }) => language)
    .find(isLocale);
};
```

```ts fileName="src/proxy.ts"
import { type NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  localizePath,
  stripLocale,
} from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const url = request.nextUrl.clone();

  if (isLocale(firstSegment)) {
    // /en/about → /about: satu URL untuk lokal default
    if (firstSegment === defaultLocale) {
      url.pathname = stripLocale(pathname);

      return NextResponse.redirect(url, 308);
    }

    return NextResponse.next();
  }

  // Kunjungan pertama pada "/": arahkan pengunjung ke bahasa mereka
  if (pathname === "/") {
    const cookieLocale = request.cookies.get(localeCookieName)?.value;
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      url.pathname = localizePath("/", preferredLocale);

      return NextResponse.redirect(url, 307);
    }
  }

  // /about → disajikan oleh /en/about, URL tidak berubah
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.rewrite(url);
};

export const config = {
  // Lewati rute API, internal Next.js, dan file statis (sitemap.xml, robots.txt...)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
```

</Step>
<Step number={11} title="Ubah Bahasa Konten Anda" isOptional={true}>

`usePathname` mengembalikan URL yang dilihat oleh peramban (`/about` atau `/fr/about`). Hapus lokal, lalu bangun tautan untuk setiap bahasa. Pengalih bahasa merender tautan nyata, sehingga mesin perayap dapat menjangkau setiap versi bahasa, dan cookie akan mengingat pilihan eksplisit tersebut.

```tsx fileName="src/components/LocaleSwitcher.tsx"
"use client";

import { useLingui } from "@lingui/react/macro";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  localizePath,
  stripLocale,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const { i18n, t } = useLingui();
  const basePath = stripLocale(usePathname());

  return (
    <nav aria-label={t`Change language`}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              href={localizePath(basePath, locale)}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === i18n.locale ? "page" : undefined}
              onClick={() => persistLocale(locale)}
            >
              {getLocaleName(locale)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={12} title="Bangun Komponen LocalizedLink" isOptional={true}>

```tsx fileName="src/components/LocalizedLink.tsx"
"use client";

import { useLingui } from "@lingui/react";
import Link from "next/link";
import type { ComponentProps } from "react";
import { type Locale, localizePath } from "@/i18n/config";

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Jalur tanpa awalan lokal, misalnya "/about" */
  href: string;
};

export const LocalizedLink = ({ href, ...props }: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return <Link href={localizePath(href, i18n.locale as Locale)} {...props} />;
};
```

Komponen ini juga berfungsi dari Server Components karena dirender di dalam `LinguiClientProvider`:

```tsx
<LocalizedLink href="/about">
  <Trans>About us</Trans>
</LocalizedLink>
```

</Step>
<Step number={13} title="Internasionalisasi Metadata Anda" isOptional={true}>

Setiap versi bahasa dapat memiliki peringkat SEO mandiri, asalkan setiap halaman menyediakan:

- `title` dan `description` yang **diterjemahkan**;
- URL **kanonikal** yang mengarah ke dirinya sendiri;
- satu **alternatif `hreflang` per lokal**, ditambah **`x-default`**;
- `locale`, `alternateLocale`, dan `url` pada **Open Graph**;
- **JSON-LD** dengan `inLanguage`.

`generateMetadata` berjalan di luar React tree, sehingga menggunakan instance server secara langsung dengan makro `msg`:

```ts fileName="src/i18n/metadata.ts"
import type { Metadata } from "next";
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedMetadataOptions = {
  /** Jalur tanpa awalan lokal, misalnya "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedMetadata = ({
  path,
  locale,
  title,
  description,
}: LocalizedMetadataOptions): Metadata => {
  const url = getAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales.map((alternateLocale) => [
            alternateLocale,
            getAbsoluteUrl(path, alternateLocale),
          ])
        ),
        "x-default": getAbsoluteUrl(path, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: openGraphLocales[locale],
      alternateLocale: locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => openGraphLocales[alternateLocale]),
    },
  };
};
```

```tsx fileName="src/app/[locale]/about/page.tsx"
import { msg } from "@lingui/core/macro";
import type { Metadata } from "next";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";
import { buildLocalizedMetadata } from "@/i18n/metadata";

export const generateMetadata = async ({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> => {
  const locale = resolveLocale((await params).locale);
  const i18n = getI18nInstance(locale);

  return buildLocalizedMetadata({
    path: "/about",
    locale,
    title: i18n._(msg`About us`),
    description: i18n._(
      msg`Learn who we are and why we built this application.`
    ),
  });
};

// ... komponen halaman dari langkah 7
```

JSON-LD dirender oleh halaman itu sendiri. File halaman hanya boleh mengekspor bidang Next.js, jadi simpan komponen ini di filenya sendiri:

```tsx fileName="src/components/WebPageJsonLd.tsx"
import { getAbsoluteUrl, type Locale } from "@/i18n/config";

type WebPageJsonLdProps = {
  path: string;
  locale: Locale;
  title: string;
};

export const WebPageJsonLd = ({ path, locale, title }: WebPageJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: getAbsoluteUrl(path, locale),
        inLanguage: locale,
      }),
    }}
  />
);
```

```tsx fileName="src/app/[locale]/about/page.tsx"
// Di dalam AboutContent
<WebPageJsonLd
  path="/about"
  locale={i18n.locale as Locale}
  title={t`About us`}
/>
```

</Step>
<Step number={14} title="Internasionalisasi Sitemap Anda" isOptional={true}>

Konvensi `sitemap.ts` mendukung `alternates.languages`, yang dirender Next.js sebagai alternatif `xhtml:link`. Daftarkan setiap URL dari setiap lokal:

```ts fileName="src/app/sitemap.ts"
import type { MetadataRoute } from "next";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const getAlternateLanguages = (path: string) => ({
  ...Object.fromEntries(
    locales.map((locale) => [locale, getAbsoluteUrl(path, locale)])
  ),
  "x-default": getAbsoluteUrl(path, defaultLocale),
});

const sitemap = (): MetadataRoute.Sitemap =>
  sitemapPages.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: getAbsoluteUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: getAlternateLanguages(path) },
    }))
  );

export default sitemap;
```

</Step>
<Step number={15} title="Internasionalisasi robots.txt Anda" isOptional={true}>

Rute privat ada di setiap bahasa, sehingga `disallow` harus mencakup setiap jalur terlokalisasi:

```ts fileName="src/app/robots.ts"
import type { MetadataRoute } from "next";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    // /dashboard, /fr/dashboard, /es/dashboard...
    disallow: privatePaths.flatMap((path) =>
      locales.map((locale) => localizePath(path, locale))
    ),
  },
  sitemap: `${siteUrl}/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={16} title="Tangani Halaman 404 Terlokalisasi" isOptional={true}>

`not-found.tsx` dirender di dalam layout `[locale]`, sehingga memiliki akses ke provider klien. Rute catch-all mengarahkan jalur yang tidak dikenal di dalam lokal ke file tersebut. Next.js menambahkan `noindex` ke respons 404 secara otomatis.

```tsx fileName="src/app/[locale]/not-found.tsx"
"use client";

import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "@/components/LocalizedLink";

const NotFound = () => (
  <div>
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink href="/">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);

export default NotFound;
```

```tsx fileName="src/app/[locale]/[...rest]/page.tsx"
import { notFound } from "next/navigation";

// /fr/does/not/exist → not-found.tsx terlokalisasi
const CatchAllPage = () => notFound();

export default CatchAllPage;
```

</Step>
<Step number={17} title="Akses Lokal di Server Actions" isOptional={true}>

Server Actions tidak menerima parameter rute. Pendekatan yang paling andal adalah mengirimkan lokal bersama formulir, dari halaman yang mengetahuinya:

```tsx fileName="src/app/[locale]/contact/page.tsx"
import { Trans } from "@lingui/react/macro";
import { sendContactMessage } from "@/app/actions/sendContactMessage";
import { resolveLocale } from "@/i18n/config";
import { initLingui } from "@/i18n/initLingui";

const ContactPage = async ({ params }: PageProps<"/[locale]/contact">) => {
  const locale = resolveLocale((await params).locale);

  initLingui(locale);

  return (
    <form action={sendContactMessage}>
      <input type="hidden" name="locale" value={locale} />
      <textarea name="message" />
      <button type="submit">
        <Trans>Send</Trans>
      </button>
    </form>
  );
};

export default ContactPage;
```

```ts fileName="src/app/actions/sendContactMessage.ts"
"use server";

import { msg } from "@lingui/core/macro";
import { getI18nInstance } from "@/i18n/appRouterI18n";
import { resolveLocale } from "@/i18n/config";

export const sendContactMessage = async (formData: FormData) => {
  const locale = resolveLocale(formData.get("locale")?.toString());
  const i18n = getI18nInstance(locale);

  const subject = i18n._(msg`Thanks for your message`);

  // await mailer.send({ subject, locale, ... });
  console.log(`[${locale}] ${subject}`);
};
```

</Step>
<Step number={18} title="Pertahankan Makro Anda, Pangkas Runtime dengan Intlayer" isOptional={true}>

Adaptor kompatibilitas [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md) mempertahankan kode sumber Anda tanpa perubahan: makro dikompilasi seperti sebelumnya, dan panggilan `i18n._()`, `useLingui()`, serta `<Trans>` yang dihasilkan dilayani oleh kamus Intlayer. Dalam tolok ukur Next.js, ukuran runtime turun dari **~72.1 KB menjadi ~10.7 KB** gzip.

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md)

Pada Next.js, adaptor ini dihubungkan dengan membuat alias `@lingui/core` dan `@lingui/react` ke `@intlayer/lingui` di `next.config.ts` (webpack dan Turbopack), dan membungkus konfigurasi dengan `withIntlayer` dari `next-intlayer/server`. Pertahankan `@lingui/swc-plugin` agar makro tetap dikompilasi terlebih dahulu. Konfigurasi lengkap ada di [panduan kompatibilitas Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md).

- [panduan kompatibilitas Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md)

Seperti yang ditunjukkan tabel tolok ukur, adaptor ini mengurangi ukuran runtime tetapi belum mengurangi katalog yang dikirimkan ke setiap halaman di Next.js. Adaptor ini paling tepat digunakan sebagai jembatan migrasi: setelah berjalan, pindahkan komponen satu per satu ke API bawaan `useIntlayer`, yang hanya mengirimkan konten yang dirender oleh masing-masing komponen. Lihat [panduan Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md), [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer-lingui.md), dan semua [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md).

- [panduan Next.js + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)
- [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer-lingui.md)
- [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Step>
<Step number={19} title="Otomatiskan Terjemahan Anda Menggunakan Intlayer" isOptional={true}>

Lingui mengekstrak pesan, tetapi mengisi puluhan katalog secara manual adalah proses yang paling memakan waktu. Intlayer bersifat **gratis** dan **sumber terbuka (open source)**, dan perkakasnya bekerja berdampingan dengan Lingui:

- **Terjemahkan dengan AI** menggunakan kunci API dan penyedia Anda sendiri. Lihat [pengisian otomatis (auto fill)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md) dan [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).
- **Pertahankan file PO Anda** sebagai sumber kebenaran tunggal dengan [plugin sinkronisasi PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md).
- **Uji terjemahan yang hilang** di CI. Lihat [menguji terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).
- **Audit situs Anda yang telah di-deploy** untuk memeriksa `hreflang` yang hilang, canonical yang salah, dan kebocoran lokal dengan [perintah scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/scan.md).

</Step>
</Steps>

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah Lingui mendukung Next.js App Router dan Server Components?">

Ya. `@lingui/react` mendukung React Server Components. Server Components mendaftarkan instance dengan `setI18n` dari `@lingui/react/server`, Client Components membacanya dari `I18nProvider`, dan keduanya menggunakan makro `Trans` serta `useLingui` yang sama.

</Question>
<Question title="Mengapa saya harus memanggil initLingui di setiap halaman dan layout?">

Server Components tidak memiliki context, sehingga instance didaftarkan per render. Layout dipertahankan di seluruh navigasi dan tidak merender ulang, sehingga halaman tidak dapat mengandalkan layout untuk menyetel lokal. Memanggil `initLingui(locale)` di bagian atas setiap layout dan page membuat keduanya tetap independen.

</Question>
<Question title="Haruskah saya menggunakan plugin SWC atau Babel dengan Next.js?">

Gunakan `@lingui/swc-plugin`. Plugin ini mempertahankan pipeline SWC dan Turbopack. Menambahkan konfigurasi Babel akan menonaktifkan SWC di Next.js dan memperlambat proses build. Satu-satunya batasan adalah memastikan versi plugin tetap kompatibel dengan versi SWC dari rilis Next.js Anda.

</Question>
<Question title="Bagaimana cara menerjemahkan generateMetadata dengan Lingui?">

Dapatkan instance server dengan `getI18nInstance(locale)` dan terjemahkan deskriptor yang dideklarasikan dengan makro `msg`: ``i18n._(msg`About us`)``. Kembalikan `alternates.canonical`, `alternates.languages` dengan `x-default`, dan `openGraph.locale`. Langkah 13 menyediakan helper yang dapat digunakan kembali.

</Question>
<Question title="Seberapa besar ukuran Lingui dalam bundel Next.js?">

[Tolok ukur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md) mengukur ukuran runtime ~72 KB gzip. Dengan satu katalog per lokal, ukuran halaman adalah ~145 KB dibandingkan 141 KB tanpa i18n, tetapi setiap halaman masih menerima pesan dari halaman lain melalui penyedia klien.

- [Tolok ukur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)

</Question>
<Question title="Lingui, next-intl, atau next-i18next: mana yang sebaiknya saya pilih untuk Next.js?">

Lingui cocok untuk tim yang suka menulis teks sumber langsung di dalam komponen dan bekerja dengan file PO serta penerjemah. next-intl cocok untuk tim yang lebih memilih katalog JSON dan API `t("key")` yang terintegrasi erat dengan Next.js. next-i18next membawa ekosistem plugin i18next. Lihat [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md) dan [Tolok ukur Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md).

- [next-i18next vs next-intl vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/next-i18next_vs_next-intl_vs_intlayer.md)
- [Tolok ukur Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md)

</Question>
<Question title="Bisakah saya bermigrasi dari Lingui ke Intlayer tanpa menulis ulang komponen saya?">

Ya. Adaptor [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md) mempertahankan makro dan menukar runtime, kemudian Anda dapat memindahkan komponen ke `useIntlayer` secara bertahap. Lihat [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md).

- [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md)
- [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Question>

</FAQ>
