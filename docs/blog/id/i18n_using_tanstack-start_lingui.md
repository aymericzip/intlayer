---
createdAt: 2026-09-26
updatedAt: 2026-09-26
priority: 9
title: "i18n TanStack Start dengan Lingui: Panduan Pengaturan Lengkap 2026"
description: "Terjemahkan aplikasi TanStack Start Anda dengan Lingui: makro, katalog PO, SSR, perutean lokal, hreflang, sitemap dan robots.txt, serta data benchmark ukuran bundle nyata."
keywords:
  - Lingui
  - LinguiJS
  - TanStack Start
  - TanStack Router
  - Internasionalisasi
  - i18n
  - SEO
  - File PO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-lingui
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versi awal"
author: aymericzip
---

# Cara menginternasionalisasi aplikasi TanStack Start Anda menggunakan Lingui pada tahun 2026

## Daftar Isi

<TOC/>

## Apa itu Lingui?

**Lingui** adalah library i18n yang dibangun di sekitar **makro** dan **ekstraksi pesan**. Anda menulis teks sumber secara langsung di komponen Anda (`` t`Hello` ``, `<Trans>Hello</Trans>`), `lingui extract` mengumpulkan setiap pesan ke dalam katalog (file PO secara default), penerjemah mengisinya, dan plugin Vite mengompilasinya menjadi JavaScript yang ringkas. Pesan menggunakan ICU MessageFormat, sehingga bentuk jamak (plurals) dan pilihan (selects) didukung.

TanStack Start tidak menyertakan lapisan i18n bawaan, jadi panduan ini menghubungkan Lingui dari awal:

- **Makro dikompilasi oleh Babel** melalui `@rolldown/plugin-babel` (diperlukan dengan `@vitejs/plugin-react` v6 dan Vite 8).
- **Perutean lokal** dengan segmen opsional `{-$locale}` (`/about`, `/fr/about`).
- **Satu katalog per lokal, dimuat sesuai kebutuhan (on demand)**, dan satu instance `I18n` per render sehingga permintaan SSR bersamaan tidak pernah berbagi lokal yang sama.
- **SEO multibahasa lengkap**: `<title>` dan deskripsi yang diterjemahkan, URL kanonikal, `hreflang` dengan `x-default`, lokal Open Graph, JSON-LD, sitemap, `robots.txt`, pre-rendering, dan halaman 404 yang terlokalisasi.

> Mencari stack lain? Lihat [panduan TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_use-intl.md), [panduan TanStack Start + Paraglide](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_paraglide.md), atau [panduan TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

> Menggunakan Next.js? Lihat [panduan Next.js + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_nextjs_lingui.md). Membandingkan library? Baca [Lingui vs Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer.md).

## Apa yang dikatakan benchmark tentang Lingui di TanStack Start

[Benchmark i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) menjalankan aplikasi TanStack Start 10 halaman, 10 lokal yang sama dengan setiap library utama dan mengukur apa yang sebenarnya diunduh oleh browser.

<I18nBenchmark framework="tanstack" packages="lingui,@intlayer/lingui,intlayer" vertical/>

Angka-angka utama untuk `@lingui/core@6.6.0`, diukur pada 2026-09-26 (gzip):

| Pengaturan                          | Ukuran library | JS per halaman | Kebocoran lokal lain | Kebocoran halaman lain |
| :---------------------------------- | -------------: | -------------: | -------------------: | ---------------------: |
| Tanpa i18n (aplikasi dasar)         |              - |       111.0 KB |                   0% |                     0% |
| Lingui (pengaturan panduan ini)     |        56.7 KB |       115.2 KB |                 9.3% |                     0% |
| `@intlayer/lingui` (kompatibilitas) |         9.8 KB |       136.7 KB |                 9.9% |                     0% |
| `react-intlayer` (Intlayer native)  |         4.5 KB |       126.8 KB |                   0% |                     0% |

Hal penting yang dapat dipelajari:

- **Muat satu katalog per lokal, sesuai kebutuhan.** Ini menjaga ukuran halaman mendekati ukuran aplikasi dasar.
- **Ukuran runtime tetap besar** (~57 KB gzip). Adaptor kompatibilitas `@intlayer/lingui` (langkah 16) mempertahankan makro Anda dan memotong ukurannya menjadi ~10 KB.

> Lihat data selengkapnya: [Laporan benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md), dan [repositori benchmark](https://github.com/intlayer-org/benchmark-i18n).

## Perbandingan fitur di TanStack Start

Perbandingan Lingui dengan library lain yang biasa digunakan di TanStack Start:

| Fitur                                          | `react-intlayer` (Intlayer)                | `use-intl`             | Paraglide JS                         | Lingui                        |
| ---------------------------------------------- | ------------------------------------------ | ---------------------- | ------------------------------------ | ----------------------------- |
| **Terjemahan dekat komponen**                  | ✅ Terlokalisasi berdampingan (co-located) | ❌ JSON terpusat       | ❌ Satu file JSON per lokal          | ⚠️ Teks sumber dalam komponen |
| **Integrasi TypeScript**                       | ✅ Tipe yang dibuat secara otomatis        | ✅ Melalui `AppConfig` | ✅ Fungsi pesan bertipe              | ⚠️ Hanya makro                |
| **Deteksi terjemahan yang hilang**             | ✅ Kesalahan tipe dan peringatan build     | ⚠️ Fallback runtime    | ⚠️ Fallback ke lokal dasar           | ⚠️ Fallback ke teks sumber    |
| **Konten kaya (JSX, Markdown)**                | ✅ Dukungan langsung                       | ⚠️ Tag via `t.rich`    | ⚠️ String                            | ✅ JSX di dalam `<Trans>`     |
| **Perutean terlokalisasi**                     | ✅ Bawaan (built-in)                       | ❌ Manual `{-$locale}` | ✅ `urlPatterns` + router rewrite    | ❌ Manual `{-$locale}`        |
| **Penggantian lokal tanpa reload**             | ✅ Ya                                      | ✅ Ya                  | ❌ Muat ulang halaman penuh          | ✅ Ya                         |
| **Pluralisasi**                                | ✅ Berbasis enumerasi                      | ✅ ICU                 | ✅ Varian                            | ✅ ICU                        |
| **ICU MessageFormat**                          | ✅ Melalui `format: "icu"`                 | ✅ Native              | ⚠️ Melalui plugin inlang             | ✅ Native                     |
| **Format konten**                              | ✅ `.ts`, `.json`, `.md`, `.yaml`...       | ⚠️ `.json`             | ⚠️ inlang JSON                       | ✅ PO, JSON, CSV              |
| **Terjemahan AI**                              | ✅ Penyedia dan kunci API Anda sendiri     | ❌ Tidak               | ❌ Tidak                             | ❌ Tidak                      |
| **Editor visual / CMS**                        | ✅ Editor lokal + CMS opsional             | ❌ Platform eksternal  | ⚠️ Aplikasi ekosistem inlang         | ❌ Platform eksternal         |
| **Helper SEO (hreflang, sitemap)**             | ✅ Bawaan (built-in)                       | ❌ Manual              | ⚠️ URL terlokalisasi, sisanya manual | ❌ Manual                     |
| **Ukuran runtime (gzip, benchmark)**           | 4.5 KB                                     | 75.9 KB                | 1.8 KB                               | 56.7 KB                       |
| **Kebocoran, setup terbaik (lokal / halaman)** | 0% / 0%                                    | 0% / 0%                | 49.7% / 0%                           | 8.6% / 0%                     |
| **Terjemahan hilang di CI**                    | ✅ `npx intlayer test`                     | ⚠️ Tidak bawaan        | ⚠️ Tidak bawaan                      | ✅ `lingui compile --strict`  |

> Angka ukuran runtime dan kebocoran berasal dari [benchmark TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md). Kebocoran diukur pada pengaturan terbaik dari setiap library.

> Panduan TanStack Start lainnya: [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_use-intl.md), [Paraglide JS](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_paraglide.md), dan [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

## Praktik terbaik yang harus Anda ikuti

- **Tetapkan `lang` dan `dir` pada `<html>`** dari lokal rute, sehingga atribut tersebut benar dalam HTML server.
- **Pertahankan satu URL per lokal** dengan awalan (prefix), sehingga setiap versi bahasa dapat diindeks.
- **Buat satu instance `I18n` per lokal**, jangan pernah mengubah instance global selama SSR: dua permintaan bersamaan dapat menimpa lokal satu sama lain.
- **Muat hanya katalog yang aktif**, jangan pernah mengimpor semuanya dalam kode klien.
- **Pilih satu gaya makro** (`useLingui` + `t` dalam komponen, `msg` untuk deskriptor lazy) dan konsisten menggunakannya. Mencampur `t`, `i18n._`, `i18n.t`, dan `<Trans>` membuat kode lebih sulit dibaca oleh manusia dan asisten AI.
- **Jalankan `lingui extract` di CI** agar pesan baru tidak pernah dirilis tanpa diterjemahkan.
- **Terjemahkan metadata Anda**, dan deklarasikan `canonical`, `hreflang`, dan `x-default` di setiap halaman.
- **Buat sitemap multibahasa dan robots.txt**, dan lakukan pre-render untuk setiap lokal.
- **Gunakan tautan nyata untuk pengalih lokal**, sehingga perayap (crawlers) dapat menemukan setiap bahasa.

> Lihat panduan kami tentang [internasionalisasi dan SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md) dan [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md).

## Panduan Langkah demi Langkah untuk Menyiapkan Lingui dalam Aplikasi TanStack Start

Berikut struktur proyek yang akan kita buat:

```bash
.
├── lingui.config.ts
├── vite.config.ts
└── src
    ├── locales
    │   ├── en
    │   │   └── messages.po     # Dihasilkan oleh `lingui extract`
    │   ├── fr
    │   │   └── messages.po
    │   └── es
    │       └── messages.po
    ├── start.ts                # Middleware permintaan (pengalihan lokal)
    ├── i18n
    │   ├── config.ts           # Lokal, helper URL
    │   ├── lingui.ts           # Pemuat katalog, instance I18n
    │   ├── negotiateLocale.ts  # Penguraian Accept-Language
    │   └── seo.ts              # Pembangun head()
    ├── components
    │   ├── LocaleSwitcher.tsx
    │   ├── LocalizedLink.tsx
    │   └── NotFound.tsx
    └── routes
        ├── __root.tsx
        ├── sitemap[.]xml.ts
        ├── robots[.]txt.ts
        └── {-$locale}
            ├── route.tsx       # Tata letak lokal + I18nProvider
            ├── index.tsx
            ├── about.tsx
            └── $.tsx           # 404 terlokalisasi
```

<Steps>
<Step number={1} title="Pasang Dependensi">

```bash packageManager="npm"
npm install @lingui/core @lingui/react
npm install -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="pnpm"
pnpm add @lingui/core @lingui/react
pnpm add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="yarn"
yarn add @lingui/core @lingui/react
yarn add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

```bash packageManager="bun"
bun add @lingui/core @lingui/react
bun add -D @lingui/cli @lingui/vite-plugin @lingui/babel-plugin-lingui-macro @lingui/format-po @rolldown/plugin-babel
```

- **@lingui/core** / **@lingui/react**: runtime, `I18nProvider` dan makro (`@lingui/core/macro`, `@lingui/react/macro`).
- **@lingui/cli**: `lingui extract` untuk mengumpulkan pesan ke dalam katalog.
- **@lingui/vite-plugin**: mengompilasi katalog `.po` saat diimpor, sehingga `lingui compile` tidak diperlukan.
- **@lingui/babel-plugin-lingui-macro** + **@rolldown/plugin-babel**: mentransformasikan makro saat waktu build.

</Step>
<Step number={2} title="Pusatkan Konfigurasi Lokal Anda">

Lokal default tetap tanpa awalan (`/about`), lokal lain memiliki awalan (`/fr/about`).

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
<Step number={3} title="Konfigurasikan Lingui">

Konfigurasi Lingui menggunakan kembali daftar lokal yang sama, sehingga katalog, router, dan sitemap selalu selaras.

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

Tambahkan skrip ekstraksi:

```json fileName="package.json"
{
  "scripts": {
    "i18n:extract": "lingui extract --clean",
    "i18n:check": "lingui extract --clean && git diff --exit-code src/locales"
  }
}
```

`i18n:check` gagal di CI ketika suatu komponen berisi pesan yang belum diekstrak dan di-commit.

</Step>
<Step number={4} title="Konfigurasikan Vite">

Dengan `@vitejs/plugin-react` v6, Babel tidak lagi disertakan secara bawaan. `@rolldown/plugin-babel` menjalankan plugin makro Lingui, dan `linguiTransformerBabelPreset` hanya memproses file yang mengimpor makro, menjaga proses build tetap cepat.

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={5} title="Muat Katalog per Lokal">

Literal template di `import()` memungkinkan Vite memancarkan **satu chunk per katalog**, dan plugin Lingui mengompilasi file `.po` ke dalamnya. Pengunjung berbahasa Prancis hanya mengunduh katalog bahasa Prancis.

Pesan yang dikompilasi adalah data biasa, sehingga dapat dikembalikan oleh loader rute, diserialisasikan ke dalam HTML, dan digunakan kembali saat hidrasi.

```ts fileName="src/i18n/lingui.ts"
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import type { Locale } from "./config";

/**
 * Loads the compiled catalog of one locale (one chunk per locale).
 */
export const loadCatalog = async (locale: Locale): Promise<Messages> => {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  return messages;
};

/**
 * Creates an isolated I18n instance: safe for concurrent SSR requests.
 */
export const createI18n = (locale: Locale, messages: Messages): I18n =>
  setupI18n({ locale, messages: { [locale]: messages } });

/**
 * Loads a catalog and returns a ready-to-use instance, for loaders and
 * server functions.
 */
export const loadI18n = async (locale: Locale): Promise<I18n> =>
  createI18n(locale, await loadCatalog(locale));
```

Agar TypeScript menerima impor `.po`, deklarasikan modul sekali:

```ts fileName="src/i18n/po.d.ts"
declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}
```

</Step>
<Step number={6} title="Buat Dokumen Root">

Rute root membaca parameter lokal opsional untuk mengatur `lang` dan `dir` pada `<html>` yang dirender di server.

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
<Step number={7} title="Buat Rute Tata Letak Lokal">

Folder `{-$locale}` membuat segmen jalur opsional: `/about` dan `/fr/about` keduanya cocok dengan `/{-$locale}/about`. Tata letak menolak awalan yang tidak dikenal, memuat katalog lokal saat ini, dan menyediakan instance `I18n` khusus.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { I18nProvider } from "@lingui/react";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/Header";
import { NotFound } from "@/components/NotFound";
import { isLocale, resolveLocale } from "@/i18n/config";
import { createI18n, loadCatalog } from "@/i18n/lingui";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    if (params.locale !== undefined && !isLocale(params.locale)) {
      throw notFound();
    }
  },
  loader: async ({ params }) => {
    const locale = resolveLocale(params.locale);

    return { locale, messages: await loadCatalog(locale) };
  },
  // A catalog never changes for a given locale
  staleTime: Infinity,
  component: LocaleLayout,
  notFoundComponent: NotFound,
});

function LocaleLayout() {
  const { locale, messages } = Route.useLoaderData();

  // One instance per locale, never shared between requests
  const i18n = useMemo(() => createI18n(locale, messages), [locale, messages]);

  return (
    <I18nProvider i18n={i18n}>
      <Header />
      <main>
        <Outlet />
      </main>
    </I18nProvider>
  );
}
```

</Step>
<Step number={8} title="Gunakan Terjemahan di Halaman Anda">

Tulis teks sumber di dalam komponen. Makro mengubahnya menjadi ID pesan saat waktu build, dan `lingui extract` mengumpulkannya.

- `<Trans>` untuk konten JSX, termasuk elemen bersarang;
- `useLingui().t` untuk string (atribut, props);
- `<Plural>` untuk bentuk jamak ICU.

```tsx fileName="src/routes/{-$locale}/about.tsx"
import { msg } from "@lingui/core/macro";
import { Plural, Trans, useLingui } from "@lingui/react/macro";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resolveLocale } from "@/i18n/config";
import { loadI18n } from "@/i18n/lingui";
import { buildLocalizedHead } from "@/i18n/seo";

export const Route = createFileRoute("/{-$locale}/about")({
  // Translate the metadata in the loader: head() stays synchronous
  loader: async ({ params }) => {
    const i18n = await loadI18n(resolveLocale(params.locale));

    return {
      metadata: {
        title: i18n._(msg`About us`),
        description: i18n._(
          msg`Learn who we are and why we built this application.`
        ),
      },
    };
  },
  staleTime: Infinity,
  head: ({ params, loaderData }) =>
    loaderData
      ? buildLocalizedHead({
          path: "/about",
          locale: resolveLocale(params.locale),
          ...loaderData.metadata,
        })
      : {},
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLingui();
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>
        <Trans>About us</Trans>
      </h1>
      <p>
        <Plural
          value={count}
          _0="No clicks yet"
          one="# click"
          other="# clicks"
        />
      </p>
      <button
        type="button"
        aria-label={t`Counter`}
        onClick={() => setCount((value) => value + 1)}
      >
        <Trans>Increment</Trans>
      </button>
    </>
  );
}
```

> Impor dinamis `import()` dari suatu katalog di-cache oleh sistem modul, jadi memanggil `loadI18n` di beberapa loader tidak mengunduh katalog dua kali.

</Step>
<Step number={9} title="Ekstrak dan Terjemahkan Pesan Anda">

Jalankan ekstraksi. Lingui menulis setiap pesan ke dalam setiap katalog lokal:

```bash
npm run i18n:extract
```

Kemudian terjemahkan `msgstr` dari setiap entri:

<Tabs group="locale">
 <Tab value='fr' label='French'>

```plaintext fileName="src/locales/fr/messages.po"
msgid "About us"
msgstr "À propos"

msgid "Learn who we are and why we built this application."
msgstr "Découvrez qui nous sommes et pourquoi nous avons créé cette application."

msgid "Increment"
msgstr "Incrémenter"

msgid "Counter"
msgstr "Compteur"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Aucun clic} one {# clic} other {# clics}}"
```

 </Tab>
 <Tab value='es' label='Spanish'>

```plaintext fileName="src/locales/es/messages.po"
msgid "About us"
msgstr "Sobre nosotros"

msgid "Learn who we are and why we built this application."
msgstr "Descubre quiénes somos y por qué creamos esta aplicación."

msgid "Increment"
msgstr "Incrementar"

msgid "Counter"
msgstr "Contador"

msgid "{count, plural, =0 {No clicks yet} one {# click} other {# clicks}}"
msgstr "{count, plural, =0 {Ningún clic} one {# clic} other {# clics}}"
```

 </Tab>
</Tabs>

> Secara default, ID pesan adalah hash dari teks sumber: mengubah teks bahasa Inggris akan membuat pesan baru. Gunakan ID eksplisit (`<Trans id="about.title">About us</Trans>`) untuk teks yang sering berubah.

</Step>
<Step number={10} title="Bangun Komponen Tautan Terlokalisasi" isOptional={true}>

Setiap rute berada di bawah `{-$locale}`, sehingga tautan harus membawa parameter lokal saat ini.

```tsx fileName="src/components/LocalizedLink.tsx"
import { useLingui } from "@lingui/react";
import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { type Locale, toLocaleParam } from "@/i18n/config";

type LocalizedLinkProps = Omit<LinkComponentProps, "params">;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { i18n } = useLingui();

  return (
    <Link
      {...props}
      params={{ locale: toLocaleParam(i18n.locale as Locale) }}
    />
  );
};
```

</Step>
<Step number={11} title="Ubah Bahasa Konten Anda" isOptional={true}>

Tampilkan pengalih sebagai **tautan**, sehingga perayap menemukan setiap versi bahasa. `to="."` mempertahankan halaman saat ini dan mengganti parameter lokal. Loader dari tata letak lokal kemudian mengambil katalog baru.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLingui } from "@lingui/react/macro";
import { Link } from "@tanstack/react-router";
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
  // The macro version also returns the i18n instance
  const { i18n, t } = useLingui();

  return (
    <nav aria-label={t`Change language`}>
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
<Step number={12} title="Internasionalisasikan Metadata Anda" isOptional={true}>

Setiap versi bahasa dapat memiliki peringkat tersendiri, asalkan setiap halaman menampilkan `<title>` dan deskripsi yang diterjemahkan, URL kanonikal yang merujuk pada diri sendiri, satu `hreflang` per lokal ditambah `x-default`, lokal Open Graph, dan JSON-LD dengan `inLanguage`. Metadata diterjemahkan di loader (langkah 8), dan helper ini menyusun sisanya:

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
      { rel: "canonical", href: url },
      ...locales.map((alternateLocale) => ({
        rel: "alternate",
        hrefLang: alternateLocale,
        href: getAbsoluteUrl(path, alternateLocale),
      })),
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

</Step>
<Step number={13} title="Internasionalisasikan Sitemap dan robots.txt Anda" isOptional={true}>

Sitemap mencantumkan setiap URL dari setiap lokal, dengan setiap entri mendeklarasikan semua alternatifnya menggunakan `xhtml:link`. `robots.txt` memblokir rute privat di setiap bahasa dan mengarah ke sitemap. Hapus `public/robots.txt` jika starter membuatnya.

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

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { locales, localizePath, siteUrl } from "@/i18n/config";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string =>
  [
    "User-agent: *",
    "Allow: /",
    ...privatePaths.flatMap((path) =>
      locales.map((locale) => `Disallow: ${localizePath(path, locale)}`)
    ),
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ].join("\n");

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
<Step number={14} title="Lakukan Pre-render untuk Setiap Lokal" isOptional={true}>

Daftarkan setiap jalur terlokalisasi sehingga TanStack Start melakukan pre-render untuk semua versi bahasa pada saat build:

```ts fileName="vite.config.ts"
import { lingui, linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
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
    lingui(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
  ],
});
```

</Step>
<Step number={15} title="Arahkan Pengunjung Pertama Kali dan Tangani Halaman 404" isOptional={true}>

Middleware permintaan mengarahkan pengunjung yang mendarat di `/` ke bahasa pilihan mereka (cookie terlebih dahulu, kemudian `Accept-Language`). Deep link tidak pernah dialihkan, sehingga perayap dan URL yang dibagikan selalu mendapatkan halaman yang diminta.

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

```ts fileName="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { defaultLocale, isLocale, localeCookieName } from "@/i18n/config";
import { negotiateLocale } from "@/i18n/negotiateLocale";

const localeRedirectMiddleware = createMiddleware().server(
  ({ request, next }) => {
    if (new URL(request.url).pathname !== "/") return next();

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

Untuk halaman 404, rute catch-all merender `notFoundComponent` terlokalisasi dari tata letak. Tandai dengan `noindex`: React 19 mengangkat tag `<meta>` ke dalam `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Trans } from "@lingui/react/macro";
import { LocalizedLink } from "./LocalizedLink";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>
      <Trans>Page not found</Trans>
    </h1>
    <LocalizedLink to="/{-$locale}">
      <Trans>Back to home</Trans>
    </LocalizedLink>
  </div>
);
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={16} title="Pertahankan Makro Anda, Kurangi Ukuran Runtime dengan Intlayer" isOptional={true}>

Adaptor kompatibilitas [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md) mempertahankan kode sumber Anda tanpa perubahan: makro dikompilasi persis seperti sebelumnya, dan panggilan `i18n._()`, `useLingui()`, serta `<Trans>` yang dihasilkan dilayani oleh kamus Intlayer yang dikompilasi. Dalam benchmark, ukuran runtime berkurang dari **~56.7 KB menjadi ~9.8 KB** gzip.

```bash packageManager="npm"
npm install @intlayer/lingui intlayer @intlayer/sync-json-plugin
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/lingui intlayer @intlayer/sync-json-plugin
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/lingui intlayer @intlayer/sync-json-plugin
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/lingui intlayer @intlayer/sync-json-plugin
bunx intlayer init
```

Tambahkan plugin setelah transformasi makro, sehingga meng-alias `@lingui/core` dan `@lingui/react` ke adaptor:

```ts fileName="vite.config.ts"
import { lingui as linguiIntlayer } from "@intlayer/lingui/plugin";
import { linguiTransformerBabelPreset } from "@lingui/vite-plugin";
import babel from "@rolldown/plugin-babel";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    viteReact(),
    babel({ presets: [linguiTransformerBabelPreset()] }),
    linguiIntlayer(),
  ],
});
```

Katalog disinkronkan dengan [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) (katalog JSON) atau [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) (katalog PO). Lihat konfigurasi lengkapnya di [panduan kompatibilitas Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md), dan perbandingan berdampingan di [Lingui vs @intlayer/lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/lingui_vs_intlayer-lingui.md).

</Step>
<Step number={17} title="Otomatiskan Terjemahan Anda Menggunakan Intlayer" isOptional={true}>

Lingui mengekstrak pesan, tetapi mengisi puluhan katalog secara manual adalah hal yang memakan sebagian besar waktu. Intlayer bersifat **gratis** dan **open source**, dan perkakasnya bekerja berdampingan dengan Lingui:

- **Terjemahkan dengan AI** menggunakan kunci API dan penyedia Anda sendiri. Lihat [auto fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md) dan [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).
- **Pertahankan file PO Anda** sebagai sumber kebenaran (source of truth) dengan [plugin sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md).
- **Uji terjemahan yang hilang** di CI. Lihat [menguji terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).
- **Audit situs Anda yang telah di-deploy** untuk memeriksa `hreflang` yang hilang, kanonikal yang salah, dan kebocoran lokal dengan [perintah scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/scan.md).

</Step>
</Steps>

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah Lingui bekerja dengan TanStack Start?">

Ya. Lingui tidak memiliki integrasi khusus bawaan untuk TanStack Start, tetapi plugin Vite dan plugin makro Babel miliknya dapat langsung berfungsi. Dua hal penting yang harus diperhatikan adalah menjalankan makro melalui `@rolldown/plugin-babel` (Vite 8 dan `@vitejs/plugin-react` v6 tidak lagi menyertakan Babel), dan membuat satu instance `I18n` per lokal daripada mengaktifkan instance global selama SSR.

</Question>
<Question title="Mengapa tidak menggunakan objek i18n global dari @lingui/core?">

Di server, satu proses merender banyak permintaan secara bersamaan. Memanggil `i18n.activate("fr")` pada objek bersama akan mengubah bahasa permintaan yang sedang dirender dalam bahasa Inggris secara paralel. `setupI18n` membuat instance terisolasi per lokal, yang aman dari kondisi tersebut.

</Question>
<Question title="Apakah saya perlu menjalankan lingui compile?">

Tidak. `@lingui/vite-plugin` mengompilasi katalog `.po` saat diimpor. Anda hanya perlu menjalankan `lingui extract` untuk mengumpulkan pesan baru.

</Question>
<Question title="Bagaimana cara menerjemahkan judul halaman dan meta deskripsi dengan Lingui?">

Deklarasikan dengan makro `msg`, dan terjemahkan di loader rute dengan ``i18n._(msg`...`)``. Loader mengembalikan string biasa, sehingga `head()` tetap sinkron dan nilainya diserialisasikan untuk hidrasi. Langkah 8 dan langkah 12 menunjukkan konfigurasi lengkapnya.

</Question>
<Question title="Berapa ukuran Lingui dalam bundle TanStack Start?">

[Benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) mengukur ~56.7 KB gzip untuk runtime. Dengan satu katalog per lokal yang dimuat sesuai kebutuhan, ukuran halaman sekitar ~115 KB dibandingkan 111 KB tanpa i18n. Mengimpor semua katalog secara statis meningkatkannya menjadi ~152 KB.

</Question>
<Question title="Dapatkah saya mempertahankan makro Lingui dan bermigrasi ke Intlayer?">

Ya. Adaptor [`@intlayer/lingui`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/lingui.md) mempertahankan makro dan menukar runtime. Anda kemudian dapat memindahkan komponen ke `useIntlayer` satu per satu. Lihat [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md).

</Question>

</FAQ>
