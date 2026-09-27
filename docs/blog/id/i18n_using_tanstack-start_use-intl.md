---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n TanStack Start dengan use-intl: Panduan Penyiapan Lengkap 2026"
description: "Terjemahkan aplikasi TanStack Start Anda dengan use-intl: perutean lokal, pesan bertipe, SSR, hreflang, sitemap dan robots.txt, serta data benchmark ukuran bundle nyata."
keywords:
  - use-intl
  - TanStack Start
  - TanStack Router
  - Internasionalisasi
  - i18n
  - SEO
  - Sitemap
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-use-intl
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versi awal"
author: aymericzip
---

# Cara menginternasionalkan aplikasi TanStack Start Anda menggunakan use-intl pada tahun 2026

## Daftar Isi

<TOC/>

## Apa itu use-intl?

**use-intl** adalah inti agnostik-kerangka-kerja (framework-agnostic) dari `next-intl`. Library ini mengekspos API `useTranslations`, `useFormatter`, dan `IntlProvider` yang sama, dukungan ICU MessageFormat, serta integrasi TypeScript yang kuat, tanpa ketergantungan apa pun pada Next.js. Hal ini menjadikannya salah satu pilihan paling umum untuk menerjemahkan aplikasi **TanStack Start**, dan merupakan library yang paling sering disarankan oleh asisten AI untuk stack ini.

TanStack Start tidak menyertakan lapisan i18n bawaan. Perutean, deteksi lokal, metadata SEO, dan pembuatan sitemap diserahkan kepada Anda. Panduan ini mencakup semuanya, dari awal hingga akhir:

- **Perutean yang mendukung lokal (locale-aware)** dengan segmen opsional `{-$locale}` (`/about`, `/fr/about`).
- **Pemuatan pesan per rute** sehingga sebuah halaman hanya mengunduh namespace dan lokal yang dirender.
- **Server rendering dan hidrasi** tanpa ketidakcocokan teks (text mismatches).
- **SEO multibahasa lengkap**: `<title>` dan deskripsi yang diterjemahkan, canonical URL, alternatif `hreflang` dengan `x-default`, Open Graph locales, JSON-LD, sitemap dengan alternatif `xhtml:link`, `robots.txt`, dan pra-rendering setiap lokal.

> Mencari stack lain?

- [panduan TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_paraglide.md)
- [panduan TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_lingui.md)
- [panduan TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

> Menggunakan Next.js sebagai gantinya? Lihat [panduan next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-intl.md).

- [panduan next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_next-intl.md)

> Untuk memahami asal-usul pustaka-pustaka ini, baca sejarah i18n di JavaScript.

- [Sejarah i18n di JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)

## Apa yang dikatakan tolok ukur (benchmark) tentang use-intl di TanStack Start

[Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) menjalankan aplikasi TanStack Start 10 halaman, 10 lokal yang sama dengan setiap library utama dan mengukur apa yang sebenarnya diunduh oleh browser.

- [Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="use-intl,@intlayer/use-intl,intlayer" vertical/>

Angka kunci untuk `use-intl@4.14.2`, diukur pada 2026-09-26 (gzip):

| Pengaturan                            | Ukuran library | JS per halaman | Kebocoran lokal lain | Kebocoran halaman lain |
| :------------------------------------ | -------------: | -------------: | -------------------: | ---------------------: |
| Tanpa i18n (aplikasi dasar)           |              - |       111.0 KB |                   0% |                     0% |
| `use-intl` (pengaturan panduan ini)   |        75.9 KB |       128.7 KB |                   0% |                     0% |
| `@intlayer/use-intl` (kompatibilitas) |         6.7 KB |       129.4 KB |                   0% |                     0% |
| `react-intlayer` (Intlayer native)    |         4.5 KB |       126.8 KB |                   0% |                     0% |

Poin penting yang perlu diperhatikan:

- **Pisahkan pesan berdasarkan halaman dan muat per lokal.** Ini menghilangkan kedua jenis kebocoran, dan itulah yang diimplementasikan pada langkah-langkah di bawah ini.
- **Ukuran runtime tetap besar** (~76 KB gzip), karena parser ICU dikirimkan ke klien. Adapter kompatibilitas `@intlayer/use-intl` (langkah 17) mempertahankan API yang sama persis dengan runtime ~7 KB.

> Lihat data lengkapnya: [Laporan benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md), dan [repositori benchmark](https://github.com/intlayer-org/benchmark-i18n).

- [Laporan benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

## Perbandingan fitur di TanStack Start

Perbandingan `use-intl` dengan library lain yang umum digunakan pada TanStack Start:

| Fitur                                          | `react-intlayer` (Intlayer)          | `use-intl`              | Paraglide JS                              | Lingui                        |
| ---------------------------------------------- | ------------------------------------ | ----------------------- | ----------------------------------------- | ----------------------------- |
| **Terjemahan dekat dengan komponen**           | ✅ Ditempatkan bersama (co-located)  | ❌ JSON terpusat        | ❌ Satu file JSON per lokal               | ⚠️ Teks sumber dalam komponen |
| **Integrasi TypeScript**                       | ✅ Tipe dibuat otomatis              | ✅ Melalui `AppConfig`  | ✅ Fungsi pesan bertipe                   | ⚠️ Hanya makro                |
| **Deteksi terjemahan yang hilang**             | ✅ Error tipe dan peringatan build   | ⚠️ Fallback runtime     | ⚠️ Fallback ke lokal dasar                | ⚠️ Fallback ke teks sumber    |
| **Konten kaya (JSX, Markdown)**                | ✅ Dukungan langsung                 | ⚠️ Tag melalui `t.rich` | ⚠️ String                                 | ✅ JSX di dalam `<Trans>`     |
| **Perutean terlokalisasi**                     | ✅ Bawaan                            | ❌ Manual `{-$locale}`  | ✅ `urlPatterns` + penulisan ulang router | ❌ Manual `{-$locale}`        |
| **Penggantian lokal tanpa memuat ulang**       | ✅ Ya                                | ✅ Ya                   | ❌ Muat ulang halaman penuh               | ✅ Ya                         |
| **Pluralisasi**                                | ✅ Berbasis enumerasi                | ✅ ICU                  | ✅ Varian                                 | ✅ ICU                        |
| **ICU MessageFormat**                          | ✅ Melalui `format: "icu"`           | ✅ Native               | ⚠️ Melalui plugin inlang                  | ✅ Native                     |
| **Format konten**                              | ✅ `.ts`, `.json`, `.md`, `.yaml`... | ⚠️ `.json`              | ⚠️ JSON inlang                            | ✅ PO, JSON, CSV              |
| **Terjemahan AI**                              | ✅ Provider dan API key Anda sendiri | ❌ Tidak                | ❌ Tidak                                  | ❌ Tidak                      |
| **Editor visual / CMS**                        | ✅ Editor lokal + CMS opsional       | ❌ Platform eksternal   | ⚠️ Aplikasi ekosistem inlang              | ❌ Platform eksternal         |
| **Pembantu SEO (hreflang, sitemap)**           | ✅ Bawaan                            | ❌ Manual               | ⚠️ URL terlokalisasi, sisanya manual      | ❌ Manual                     |
| **Ukuran runtime (gzip, benchmark)**           | 4.5 KB                               | 75.9 KB                 | 1.8 KB                                    | 56.7 KB                       |
| **Kebocoran, setup terbaik (lokal / halaman)** | 0% / 0%                              | 0% / 0%                 | 49.7% / 0%                                | 8.6% / 0%                     |
| **Terjemahan yang hilang di CI**               | ✅ `npx intlayer test`               | ⚠️ Tidak bawaan         | ⚠️ Tidak bawaan                           | ✅ `lingui compile --strict`  |

> Angka ukuran runtime dan kebocoran berasal dari [Benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md). Kebocoran diukur pada setup terbaik dari setiap library.

- [Benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

> Panduan TanStack Start lainnya:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_lingui.md)
- [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_paraglide.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

## Praktik yang harus Anda ikuti

- **Atur `lang` dan `dir` pada `<html>`** untuk aksesibilitas, pembaca layar, dan mesin pencari.
- **Pertahankan satu URL per lokal.** Gunakan awalan lokal (`/fr/about`) daripada peralihan berbasis cookie saja, sehingga setiap halaman yang diterjemahkan dapat dirayapi dan dibagikan.
- **Pisahkan pesan berdasarkan namespace** (`common`, `home`, `about`) dan muat per rute.
- **Hanya muat lokal yang aktif.** Jangan pernah mengimpor semua file lokal dalam modul yang dikirimkan ke klien.
- **Tetapkan zona waktu** di `IntlProvider`. Jika tidak, tanggal akan diformat dalam zona waktu server selama SSR dan dalam zona waktu pengunjung saat hidrasi, yang menyebabkan ketidakcocokan hidrasi.
- **Terjemahkan metadata Anda**, dan deklarasikan `canonical`, `hreflang`, serta `x-default` di setiap halaman.
- **Buat sitemap multibahasa dan robots.txt**, serta lakukan pra-render untuk setiap lokal.
- **Gunakan tautan nyata untuk pengalih lokal**, bukan `<select>`, agar perayap (crawlers) dapat menemukan setiap bahasa.
- **Berikan tipe pada pesan Anda** sehingga kunci yang hilang akan memicu error pada waktu kompilasi.

- [internasionalisasi dan SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md)
- [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md)

## Panduan Langkah demi Langkah Menyiapkan use-intl dalam Aplikasi TanStack Start

Berikut struktur proyek yang akan kita buat:

```bash
.
├── messages
│   ├── en
│   │   ├── common.json
│   │   ├── home.json
│   │   └── about.json
│   ├── fr
│   │   └── ... same files
│   └── es
│       └── ... same files
├── vite.config.ts
└── src
    ├── start.ts                  # Request middleware (locale redirect)
    ├── router.tsx
    ├── i18n
    │   ├── config.ts             # Locales, URL helpers
    │   ├── messages.ts           # Per-namespace, per-locale loader
    │   ├── negotiateLocale.ts    # Accept-Language parsing
    │   ├── seo.ts                # head() builder
    │   └── use-intl.d.ts         # Typed messages
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   ├── ScopedMessages.tsx
    │   └── Counter.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx         # Locale layout + IntlProvider
            ├── index.tsx         # / and /fr
            ├── about.tsx         # /about and /fr/about
            └── $.tsx             # Localized 404
```

<Steps>
<Step number={1} title="Instal Dependensi">

Mulai dari proyek TanStack Start, kemudian tambahkan `use-intl`:

```bash packageManager="npm"
npm create @tanstack/start@latest
npm install use-intl
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm add use-intl
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn add use-intl
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bun add use-intl
```

- **use-intl**: menyediakan `IntlProvider`, `useTranslations`, `useFormatter`, dan `createTranslator` (dapat digunakan di luar React, misalnya di `head()`).

</Step>
<Step number={2} title="Pusatkan Konfigurasi Lokal Anda">

Buat satu sumber kebenaran (single source of truth) untuk lokal dan pembantu URL Anda. Setiap file lain (rute, SEO, sitemap, pra-rendering) mengimpor dari sini, sehingga menambahkan lokal baru hanyalah perubahan satu baris.

Lokal default tetap tanpa awalan (`/about`), sedangkan lokal lain diberi awalan (`/fr/about`). Ini adalah strategi "sesuai kebutuhan" (as-needed): satu URL per halaman per lokal, dan URL pendek untuk audiens utama Anda.

```ts fileName="src/i18n/config.ts"
export const locales = ["en", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Cookie storing the locale explicitly chosen by the visitor. */
export const localeCookieName = "locale";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Maps the optional `{-$locale}` route param to a supported locale. */
export const resolveLocale = (localeParam: string | undefined): Locale =>
  isLocale(localeParam) ? localeParam : defaultLocale;

/** The value to pass as `locale` param: `undefined` for the default locale. */
export const toLocaleParam = (locale: Locale): Locale | undefined =>
  locale === defaultLocale ? undefined : locale;

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `localizePath("/about", "fr")` → `/fr/about`, default locale unprefixed. */
export const localizePath = (path: string, locale: Locale): string => {
  if (locale === defaultLocale) return path;

  return path === "/" ? `/${locale}` : `/${locale}${path}`;
};

export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  `${siteUrl}${localizePath(path, locale)}`;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;
```

</Step>
<Step number={3} title="Buat File Terjemahan Anda">

Atur pesan per lokal dan per namespace. `common` menyimpan apa yang dibutuhkan setiap halaman (navigasi, footer), dan setiap halaman mendapatkan filenya sendiri, termasuk metadatanya.

use-intl menggunakan **ICU MessageFormat**, sehingga bentuk jamak, select, dan argumen yang diformat berada di dalam pesan itu sendiri.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en/common.json"
{
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "localeSwitcher": {
    "label": "Change language"
  },
  "notFound": {
    "title": "Page not found",
    "backHome": "Back to home"
  }
}
```

```json fileName="messages/en/about.json"
{
  "metadata": {
    "title": "About us",
    "description": "Learn who we are and why we built this application."
  },
  "title": "About us",
  "counter": {
    "label": "Counter",
    "increment": "Increment",
    "clicks": "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
  }
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr/common.json"
{
  "navigation": {
    "home": "Accueil",
    "about": "À propos"
  },
  "localeSwitcher": {
    "label": "Changer de langue"
  },
  "notFound": {
    "title": "Page introuvable",
    "backHome": "Retour à l'accueil"
  }
}
```

```json fileName="messages/fr/about.json"
{
  "metadata": {
    "title": "À propos",
    "description": "Découvrez qui nous sommes et pourquoi nous avons créé cette application."
  },
  "title": "À propos",
  "counter": {
    "label": "Compteur",
    "increment": "Incrémenter",
    "clicks": "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
  }
}
```

 </Tab>
</Tabs>

Buat `home.json` dengan cara yang sama, berisi objek `metadata` dan konten halaman.

</Step>
<Step number={4} title="Muat Pesan per Namespace dan per Lokal">

Loader ini adalah file terpenting untuk performa. `import.meta.glob` menginstruksikan Vite untuk menghasilkan **satu chunk per file JSON**. Rute yang meminta `["about"]` dalam bahasa Prancis hanya mengunduh `messages/fr/about.json` dan tidak ada yang lain, yang merupakan alasan benchmark mencapai 0% kebocoran lokal dan 0% kebocoran halaman.

```ts fileName="src/i18n/messages.ts"
import type about from "../../messages/en/about.json";
import type common from "../../messages/en/common.json";
import type home from "../../messages/en/home.json";
import type { Locale } from "./config";

/** Shape of every namespace, inferred from the English source files. */
export type AppMessages = {
  common: typeof common;
  home: typeof home;
  about: typeof about;
};

export type Namespace = keyof AppMessages;

type JsonModule = { default: AppMessages[Namespace] };

// Lazy: each JSON file becomes its own chunk, loaded on demand
const messageLoaders = import.meta.glob<JsonModule>("../../messages/*/*.json");

/**
 * Loads the requested namespaces for one locale, in parallel.
 */
export const loadMessages = async <
  const TNamespaces extends readonly Namespace[],
>(
  locale: Locale,
  namespaces: TNamespaces
): Promise<Pick<AppMessages, TNamespaces[number]>> => {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const loadNamespace =
        messageLoaders[`../../messages/${locale}/${namespace}.json`];

      if (!loadNamespace) {
        throw new Error(`Missing messages: ${locale}/${namespace}.json`);
      }

      const namespaceModule = await loadNamespace();

      return [namespace, namespaceModule.default] as const;
    })
  );

  return Object.fromEntries(entries) as Pick<AppMessages, TNamespaces[number]>;
};
```

</Step>
<Step number={5} title="Berikan Tipe pada Pesan Anda">

Augmentasi modul memberi Anda pelengkapan otomatis (autocompletion) pada `useTranslations("about")` dan `t("counter.label")`, serta error kompilasi jika ada saltik (typo) atau kunci yang dihapus.

```ts fileName="src/i18n/use-intl.d.ts"
import type { Locale } from "./config";
import type { AppMessages } from "./messages";

declare module "use-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: AppMessages;
  }
}
```

Pastikan `resolveJsonModule` diaktifkan di `tsconfig.json` Anda.

</Step>
<Step number={6} title="Buat Dokumen Root">

Rute root merender `<html>`. Rute ini membaca parameter lokal opsional untuk menetapkan `lang` dan `dir`, sehingga atribut tersebut sudah benar dalam HTML yang dirender server, sebelum JavaScript apa pun dijalankan.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useParams,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { getTextDirection, resolveLocale } from "@/i18n/config";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // strict: false reads params from whichever route is matched
  const { locale: localeParam } = useParams({ strict: false });
  const locale = resolveLocale(localeParam);

  return (
    <html lang={locale} dir={getTextDirection(locale)}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

</Step>
<Step number={7} title="Buat Rute Layout Lokal">

Folder `{-$locale}` membuat segmen jalur **opsional**: `/about` dan `/fr/about` keduanya cocok dengan `/{-$locale}/about`. Layout ini:

1. Menolak awalan yang tidak didukung (`/xx/about` → 404).
2. Memuat namespace `common` hanya untuk lokal saat ini.
3. Menyediakan pesan melalui `IntlProvider`.

Hasil loader diserialisasi ke dalam HTML dan digunakan kembali saat hidrasi, sehingga klien tidak mengunduh `common.json` untuk kedua kalinya. `staleTime: Infinity` menyimpannya dalam cache di seluruh navigasi klien.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { IntlProvider } from "use-intl";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    // /xx/about with an unknown prefix → 404
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadMessages(locale, ["common"]) };
  },
  // Messages never change for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      // A fixed time zone prevents SSR / hydration date mismatches
      timeZone="UTC"
    >
      <Header />
      <main>
        <Outlet />
      </main>
    </IntlProvider>
  );
}
```

> `IntlProvider` tidak menggabungkan pesan dari provider induk secara otomatis. Langkah selanjutnya menambahkan komponen kecil untuk melakukannya, sehingga setiap halaman dapat menambahkan namespace-nya sendiri di atas `common`.

</Step>
<Step number={8} title="Cakupi Pesan Halaman (Scope Page Messages)">

Setiap halaman memuat namespace miliknya sendiri di loader-nya, kemudian membungkus kontennya dengan `ScopedMessages`, yang menggabungkan namespace halaman dengan pesan induk.

```tsx fileName="src/components/ScopedMessages.tsx"
import { type ReactNode, useMemo } from "react";
import {
  type AbstractIntlMessages,
  IntlProvider,
  useLocale,
  useMessages,
  useTimeZone,
} from "use-intl";

type ScopedMessagesProps = {
  messages: AbstractIntlMessages;
  children: ReactNode;
};

/**
 * Adds route-level namespaces on top of the messages already provided.
 */
export const ScopedMessages = ({ messages, children }: ScopedMessagesProps) => {
  const parentMessages = useMessages();
  const locale = useLocale();
  const timeZone = useTimeZone();

  const mergedMessages = useMemo(
    () => ({ ...parentMessages, ...messages }),
    [parentMessages, messages]
  );

  return (
    <IntlProvider locale={locale} timeZone={timeZone} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
};
```

</Step>
<Step number={9} title="Gunakan Terjemahan di Halaman Anda">

Loader halaman mengambil namespace `about` untuk lokal saat ini, `head()` membangun metadata terlokalisasi dan lengkap untuk SEO dari namespace tersebut (lihat langkah 13), dan komponen merender kontennya.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { createTranslator, useTranslations } from "use-intl";
import { Counter } from "@/components/Counter";
import { ScopedMessages } from "@/components/ScopedMessages";
import { resolveLocale } from "@/i18n/config";
import { loadMessages } from "@/i18n/messages";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  loader: async ({ params }) => ({
    messages: await loadMessages(resolveLocale(params.locale), ["about"]),
  }),
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const locale = resolveLocale(params.locale);

    if (!loaderData) return {};

    // createTranslator works outside React, perfect for head()
    const t = createTranslator({
      locale,
      messages: loaderData.messages,
      namespace: "about.metadata",
    });

    return buildLocalizedHead({
      path: "/about",
      locale,
      title: t("title"),
      description: t("description"),
    });
  },
  component: AboutPage,
});

function AboutPage() {
  const { messages } = Route.useLoaderData();

  return (
    <ScopedMessages messages={messages}>
      <AboutContent />
    </ScopedMessages>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      <h1>{t("title")}</h1>
      <Counter />
    </>
  );
}
```

</Step>
<Step number={10} title="Gunakan Terjemahan dan Formatter di Komponen">

Setiap komponen di bawah provider dapat memanggil `useTranslations` dan `useFormatter`. Jamak ditangani oleh ICU, dan angka diformat sesuai dengan lokal yang aktif.

```tsx fileName="src/components/Counter.tsx"
import { useState } from "react";
import { useFormatter, useTranslations } from "use-intl";

export const Counter = () => {
  const t = useTranslations("about.counter");
  const format = useFormatter();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{t("clicks", { count })}</p>
      <p>{format.number(count)}</p>
      <button
        type="button"
        aria-label={t("label")}
        onClick={() => setCount((value) => value + 1)}
      >
        {t("increment")}
      </button>
    </div>
  );
};
```

</Step>
<Step number={11} title="Bangun Komponen Link Terlokalisasi" isOptional={true}>

Setiap rute berada di bawah `{-$locale}`, sehingga tautan harus membawa parameter lokal saat ini. Wrapper ini mempertahankan `to` bertipe dari TanStack Router dan menyisipkan lokal untuk Anda.

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "use-intl";
import { toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const locale = useLocale();

  return <Link {...props} params={{ locale: toLocaleParam(locale) }} />;
};
```

```tsx fileName="src/components/Header.tsx"
import { useTranslations } from "use-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { LocalizedLink } from "./LocalizedLink";

export const Header = () => {
  const t = useTranslations("common.navigation");

  return (
    <header>
      <nav>
        <LocalizedLink to="/{-$locale}">{t("home")}</LocalizedLink>
        <LocalizedLink to="/{-$locale}/about">{t("about")}</LocalizedLink>
      </nav>
      <LocaleSwitcher />
    </header>
  );
};
```

</Step>
<Step number={12} title="Ubah Bahasa Konten Anda" isOptional={true}>

Render pengalih bahasa sebagai **tautan**, bukan `<select>`. Tautan dapat dirayapi mesin pencari sehingga menemukan setiap versi bahasa, dan tetap berfungsi tanpa JavaScript. `to="."` mempertahankan halaman saat ini dan hanya mengganti parameter lokal. Cookie mengingat pilihan eksplisit untuk middleware pengalihan pada langkah 16.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { Link } from "@tanstack/react-router";
import { useLocale, useTranslations } from "use-intl";
import {
  getLocaleName,
  type Locale,
  localeCookieName,
  locales,
  toLocaleParam,
} from "@/i18n/config";

const persistLocale = (locale: Locale) => {
  document.cookie = `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const LocaleSwitcher = () => {
  const t = useTranslations("common.localeSwitcher");
  const activeLocale = useLocale();

  return (
    <nav aria-label={t("label")}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <Link
              to="."
              params={(previous) => ({
                ...previous,
                locale: toLocaleParam(locale),
              })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
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
<Step number={13} title="Internasionalkan Metadata Anda" isOptional={true}>

Di sinilah i18n memberikan hasil terbaik: setiap versi bahasa dapat bersaing secara mandiri di mesin pencari. Setiap halaman harus mengekspos:

- `<title>` dan `description` yang **diterjemahkan**;
- URL **canonical** yang menunjuk ke dirinya sendiri (bukan ke lokal default);
- satu **alternatif `hreflang` per lokal**, ditambah **`x-default`** untuk bahasa yang tidak cocok;
- **Open Graph** `og:locale`, `og:locale:alternate`, dan `og:url`, yang digunakan oleh pratinjau media sosial;
- **JSON-LD** dengan `inLanguage`, yang membantu mesin pencari dan asisten AI mengidentifikasi bahasa halaman.

Satu helper tunggal membangun semuanya, sehingga kode halaman tetap ringkas:

```ts fileName="src/i18n/seo.ts"
import {
  defaultLocale,
  getAbsoluteUrl,
  type Locale,
  locales,
  openGraphLocales,
} from "./config";

type LocalizedHeadOptions = {
  /** Path without locale prefix, e.g. "/about" */
  path: string;
  locale: Locale;
  title: string;
  description: string;
};

export const buildLocalizedHead = ({
  path,
  locale,
  title,
  description,
}: LocalizedHeadOptions) => {
  const url = getAbsoluteUrl(path, locale);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: openGraphLocales[locale] },
      ...locales
        .filter((alternateLocale) => alternateLocale !== locale)
        .map((alternateLocale) => ({
          property: "og:locale:alternate",
          content: openGraphLocales[alternateLocale],
        })),
    ],
    links: [
      // Canonical: each locale is its own canonical page
      { rel: "canonical", href: url },
      // hreflang: every language version, including the current one
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
      // x-default: fallback for visitors whose language is not supported
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: getAbsoluteUrl(path, defaultLocale),
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url,
          inLanguage: locale,
        }),
      },
    ],
  };
};
```

Gunakan helper ini di setiap `head()` halaman, seperti yang ditunjukkan pada langkah 9. Untuk halaman beranda, berikan `path: "/"`.

</Step>
<Step number={14} title="Internasionalkan Sitemap Anda" isOptional={true}>

Sitemap multibahasa mencantumkan **setiap URL dari setiap lokal**, dan setiap entri mendeklarasikan semua alternatifnya dengan `xhtml:link`. Google menggunakan anotasi ini persis seperti tag `hreflang` pada halaman, menjadikannya cadangan yang andal saat sebuah halaman jarang dirayapi.

Rute server TanStack Start memungkinkan Anda menyajikannya dari rute file:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, getAbsoluteUrl, locales } from "@/i18n/config";

type SitemapPage = {
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

export const sitemapPages: SitemapPage[] = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];

const buildAlternateLinks = (path: string): string =>
  [
    ...locales.map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${getAbsoluteUrl(path, locale)}"/>`
    ),
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, defaultLocale)}"/>`,
  ].join("");

const buildSitemap = (): string => {
  const urls = sitemapPages.flatMap((page) =>
    locales.map(
      (locale) =>
        `<url><loc>${getAbsoluteUrl(page.path, locale)}</loc>${buildAlternateLinks(page.path)}<changefreq>${page.changeFrequency}</changefreq><priority>${page.priority}</priority></url>`
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
};

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildSitemap(), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={15} title="Internasionalkan robots.txt Anda" isOptional={true}>

Rute privat ada di setiap bahasa, sehingga aturan `Disallow` harus mencakup setiap awalan. Hapus `public/robots.txt` jika starter membuatnya, lalu sajikan dari rute:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
  );

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowRules,
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");
};

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildRobots(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
```

</Step>
<Step number={16} title="Arahkan Ulang Pengunjung Pertama Kali ke Bahasa Mereka" isOptional={true}>

Middleware request mengirim pengunjung yang membuka `/` ke bahasa pilihan mereka, berdasarkan cookie lokal terlebih dahulu, lalu header `Accept-Language`. Hanya `/` yang dialihkan: deep link tidak pernah diubah, sehingga URL bersama dan perayap selalu mendapatkan halaman yang diminta.

```ts fileName="src/i18n/negotiateLocale.ts"
import { isLocale, type Locale } from "./config";

/**
 * Picks the best supported locale from an Accept-Language header.
 * "fr-CA,fr;q=0.9,en;q=0.8" → "fr"
 */
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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    const { pathname } = new URL(request.url);

    if (pathname !== "/") return next();

    const cookieLocale = getCookie(localeCookieName);
    const preferredLocale = isLocale(cookieLocale)
      ? cookieLocale
      : negotiateLocale(request.headers.get("accept-language"));

    if (preferredLocale && preferredLocale !== defaultLocale) {
      throw redirect({ href: `/${preferredLocale}`, statusCode: 307 });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [localeRedirectMiddleware],
}));
```

> Pengunjung yang secara eksplisit memilih bahasa Inggris di pengalih bahasa akan mendapatkan `locale=en` di cookie, sehingga mereka tidak akan pernah dialihkan lagi. Pada deployment statis penuh (langkah 18), `/` disajikan sebagai file dan middleware ini tidak berjalan, yang tidak masalah: halaman tetap dapat diakses dan pengalih bahasa menangani sisanya.

</Step>
<Step number={17} title="Pertahankan API use-intl, Pangkas Runtime dengan Intlayer" isOptional={true}>

Benchmark menunjukkan bagian terberat dari setup use-intl adalah runtime itu sendiri (~76 KB gzip). Adapter kompatibilitas [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) mengekspos **API yang sama** (`useTranslations`, `useFormatter`, `IntlProvider`, `createTranslator`, jamak ICU, `t.rich`), tetapi menyajikannya dari kamus Intlayer yang dikompilasi: **~6.7 KB dibandingkan ~75.9 KB**, 0% kebocoran lokal dan 0% kebocoran halaman, tanpa perubahan pada komponen Anda.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

```bash packageManager="npm"
npm install @intlayer/use-intl intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/use-intl intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Plugin Vite mengarahkan alias `use-intl` ke adapter, sehingga impor yang ada tetap berfungsi:

```ts fileName="vite.config.ts"
import useIntlVitePlugin from "@intlayer/use-intl/plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tanstackStart(), viteReact(), useIntlVitePlugin()],
});
```

File JSON Anda tetap menjadi sumber kebenaran berkat [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md):

```ts fileName="intlayer.config.ts"
import { syncJSON } from "@intlayer/sync-json-plugin";
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
  dictionary: {
    // One chunk per locale, loaded on demand
    importMode: "dynamic",
    format: "icu",
  },
  plugins: [
    syncJSON({
      format: "icu",
      source: ({ locale, key }) => `./messages/${locale}/${key}.json`,
    }),
  ],
};

export default config;
```

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)

> Adapter ini juga menyediakan jalur migrasi yang mulus: setelah berjalan, Anda dapat memindahkan komponen satu per satu ke API native `useIntlayer`. Lihat [panduan Intlayer TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

- [panduan Intlayer TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

</Step>
<Step number={18} title="Pra-render Setiap Lokal" isOptional={true}>

HTML statis adalah halaman tercepat yang dapat Anda sajikan dan paling mudah diindeks. Buat daftar setiap jalur terlokalisasi sehingga TanStack Start melakukan pra-render untuk semua versi bahasa pada saat build, ditambah file sitemap dan robots:

```ts fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { locales, localizePath } from "./src/i18n/config";

const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) =>
  locales.map((locale) => ({
    path: localizePath(path, locale),
    prerender: { enabled: true },
  }))
);

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages,
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Karena pengalih lokal merender tautan nyata, `crawlLinks: true` juga akan menemukan halaman yang lupa Anda daftarkan.

</Step>
<Step number={19} title="Tangani Halaman 404 Terlokalisasi" isOptional={true}>

Layout pada langkah 7 sudah melempar `notFound()` untuk awalan lokal yang tidak diketahui. Tambahkan rute catch-all sehingga jalur yang tidak diketahui di dalam lokal tertentu juga merender 404 terlokalisasi, dan tandai dengan `noindex`: React 19 memindahkan tag `<meta>` ke dalam `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { useTranslations } from "use-intl";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => {
  const t = useTranslations("common.notFound");

  return (
    <div>
      <meta name="robots" content="noindex" />
      <h1>{t("title")}</h1>
      <LocalizedLink to="/{-$locale}">{t("backHome")}</LocalizedLink>
    </div>
  );
};
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

// /fr/does/not/exist → rendered by the layout notFoundComponent
export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={20} title="Akses Lokal di Server Functions" isOptional={true}>

Server function tidak menerima parameter rute. Baca cookie lokal, dan gunakan header `Accept-Language` sebagai cadangan (fallback), untuk mengirim email terlokalisasi atau menyimpan preferensi bahasa:

```ts fileName="src/server/getServerLocale.ts"
import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

export const getServerLocale = createServerFn().handler(() => {
  const cookieLocale = getCookie(localeCookieName);

  if (isLocale(cookieLocale)) return cookieLocale;

  return negotiateLocale(getRequestHeader("accept-language")) ?? defaultLocale;
});
```

Untuk menerjemahkan di dalam server function, gabungkan dengan `loadMessages` dan `createTranslator` dari `use-intl`.

</Step>
<Step number={21} title="Otomatiskan Terjemahan Anda Menggunakan Intlayer" isOptional={true}>

use-intl merender terjemahan, tetapi tidak membantu Anda **membuatnya**. Intlayer bersifat **gratis** dan **open source**, serta mengisi celah tersebut meskipun Anda tetap menggunakan use-intl:

- **Uji terjemahan yang hilang** di CI atau unit test. Lihat [menguji terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).
- **Terjemahkan dengan AI** menggunakan API key dan penyedia Anda sendiri: `npx intlayer fill` menerjemahkan kunci yang hilang dengan konteks aplikasi Anda. Lihat [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md) dan [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).
- **Pertahankan file JSON Anda** sebagai sumber kebenaran dengan [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md).
- **Edit konten secara visual** dengan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) dan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), sehingga non-developer dapat memperbarui terjemahan.
- **Berikan konteks pada AI agent Anda** dengan [server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md) dan [skill agent](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md).
- **Pindai situs Anda yang telah di-deploy** untuk mencari `hreflang` yang hilang, canonical yang salah, dan kebocoran lokal dengan [perintah scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/scan.md).

Untuk mempelajari semua fitur, lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

- [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md)

</Step>
</Steps>

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah use-intl pilihan yang baik untuk TanStack Start?">

Ya, jika Anda menginginkan API `next-intl` di luar Next.js. Library ini memberi Anda pesan ICU, formatter, dan dukungan TypeScript yang baik, serta menghindari batasan khusus Next.js seperti `setRequestLocale`. Konsekuensinya adalah bobot: [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) mengukur ~76 KB gzip untuk runtime, dan konfigurasi standar akan mengirimkan setiap lokal dan setiap halaman ke browser. Muat namespace per rute dan per lokal, seperti dalam panduan ini, untuk menghindari kebocoran tersebut.

- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

</Question>
<Question title="Apa perbedaan antara use-intl dan next-intl?">

`use-intl` adalah inti dari `next-intl`. `next-intl` menambahkan integrasi Next.js di atasnya: middleware, pembantu navigasi, `getTranslations` untuk Server Components, dan konfigurasi request. Di TanStack Start Anda menggunakan `use-intl` secara langsung dan mengimplementasikan perutean dengan TanStack Router, seperti yang ditunjukkan di atas.

</Question>
<Question title="Haruskah saya menggunakan awalan lokal atau cookie untuk menyimpan bahasa?">

Gunakan awalan di URL. Setiap versi bahasa kemudian memiliki URL tersendiri yang dapat diindeks oleh mesin pencari dan dibagikan oleh pengguna. Cookie tetap berguna untuk mengingat pilihan eksplisit pengguna, yang merupakan fungsi dari middleware pengalihan pada langkah 16.

</Question>
<Question title="Mengapa saya mendapatkan ketidakcocokan hidrasi saat memformat tanggal?">

Server dan browser memformat tanggal dalam zona waktu yang berbeda. Berikan `timeZone` eksplisit ke `IntlProvider` (atau zona waktu pengunjung yang disimpan dalam cookie), sehingga kedua sisi menghasilkan teks yang sama.

</Question>
<Question title="Bagaimana cara mengurangi ukuran bundle use-intl?">

Pertama, pisahkan pesan berdasarkan namespace dan muat per rute serta per lokal dengan `import.meta.glob`, yang menghilangkan kebocoran lokal dan halaman. Kemudian, jika ukuran runtime penting, beralihlah ke adapter [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md): API yang sama, ~6.7 KB alih-alih ~75.9 KB dalam benchmark.

- [`@intlayer/use-intl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Question>
<Question title="Bagaimana cara menerjemahkan judul dan deskripsi meta dengan use-intl?">

Panggil `createTranslator` di dalam fungsi `head()` rute dengan pesan yang dikembalikan oleh loader rute, lalu kembalikan tautan `title`, `description`, canonical, dan `hreflang`. Langkah 13 menyediakan helper yang dapat digunakan kembali.

</Question>
<Question title="Bisakah saya bermigrasi dari use-intl ke Intlayer secara bertahap?">

Ya. Pasang adapter kompatibilitas terlebih dahulu (langkah 17): komponen Anda tetap memanggil `useTranslations`, yang sekarang didukung oleh Intlayer. Kemudian pindahkan komponen satu per satu ke `useIntlayer`, dan deklarasikan konten di sampingnya. Lihat [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) dan [panduan Intlayer TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

- [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)
- [panduan Intlayer TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

</Question>

</FAQ>
