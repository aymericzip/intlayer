---
createdAt: 2026-09-26
updatedAt: 2026-09-27
priority: 9
title: "i18n TanStack Start dengan Paraglide JS: Panduan Penyiapan 2026"
description: "Terjemahkan aplikasi TanStack Start Anda dengan Paraglide JS: strategi URL, penulisan ulang router, middleware SSR, hreflang, sitemap dan robots.txt, beserta data tolok ukur nyata."
keywords:
  - Paraglide
  - Paraglide JS
  - inlang
  - TanStack Start
  - TanStack Router
  - Internasionalisasi
  - i18n
  - SEO
  - React
  - Blog
slugs:
  - blog
  - tanstack-start-internationalization-using-paraglide
history:
  - version: 9.5.10
    date: 2026-09-26
    changes: "Versi awal"
author: aymericzip
---

# Cara menginternasionalisasi aplikasi TanStack Start Anda menggunakan Paraglide JS pada tahun 2026

## Daftar Isi

<TOC/>

## Apa itu Paraglide JS?

**Paraglide JS** (oleh inlang) adalah pustaka i18n **berbasis kompilator** (compiler-based). Alih-alih mengirim runtime yang mencari kunci dalam objek JSON, pustaka ini mengompilasi setiap pesan menjadi fungsi JavaScript bertipe (`m.about_title()`). Pesan yang tidak digunakan dapat dihapus oleh bundler, dan kesalahan ketik pada kunci merupakan kesalahan kompilasi.

Paraglide adalah pendekatan i18n yang digunakan dalam contoh resmi TanStack Router, dan terintegrasi dengan TanStack Start melalui tiga bagian:

- sebuah **plugin Vite** yang mengompilasi pesan dan runtime ke dalam `src/paraglide`;
- sebuah **middleware server** yang menentukan lokal dari setiap permintaan;
- sebuah **penulisan ulang router (router rewrite)** yang memetakan URL yang dilokalkan (`/fr/about`) ke pohon rute Anda (`/about`), sehingga Anda tidak memerlukan segmen `$locale`.

Panduan ini menyiapkan ketiganya, kemudian mencakup semua hal yang diserahkan Paraglide kepada Anda: `lang` dan `dir`, pengalih lokal (locale switcher), metadata yang diterjemahkan, `canonical`, `hreflang` dengan `x-default`, Open Graph, JSON-LD, sitemap, `robots.txt`, pra-rendering, dan halaman 404 yang dilokalkan.

> Mencari tumpukan lain?

- [panduan TanStack Start + use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_use-intl.md)
- [panduan TanStack Start + Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_lingui.md)
- [panduan TanStack Start + Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

> Membandingkan dua pendekatan berbasis kompilator? Baca [apakah Intlayer lebih ringan daripada Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_intlayer_lighter_than_paraglide.md).

- [apakah Intlayer lebih ringan daripada Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_intlayer_lighter_than_paraglide.md)

> Untuk memahami asal-usul pustaka-pustaka ini, baca sejarah i18n di JavaScript.

- [Sejarah i18n di JavaScript](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/history_of_i18n.md)

## Apa kata tolok ukur tentang Paraglide di TanStack Start

[Tolok ukur i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) menjalankan aplikasi TanStack Start 10 halaman dan 10 lokal yang sama dengan setiap pustaka utama dan mengukur apa yang sebenarnya diunduh oleh peramban.

- [Tolok ukur i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

<I18nBenchmark framework="tanstack" packages="paraglide,intlayer" vertical/>

Angka-angka utama untuk `@inlang/paraglide-js@2.15.1`, diukur pada 2026-09-26 (gzip):

| Pengaturan                  | Ukuran pustaka | JS per halaman | Kebocoran lokal lain | Kebocoran halaman lain | Pemuatan halaman |
| :-------------------------- | -------------: | -------------: | -------------------: | ---------------------: | ---------------: |
| Tanpa i18n (aplikasi dasar) |              - |       111.0 KB |                   0% |                     0% |          15.7 ms |
| Paraglide JS                |         1.8 KB |       125.1 KB |                49.7% |                     0% |          22.1 ms |
| `react-intlayer`            |         4.5 KB |       126.8 KB |                   0% |                     0% |          14.8 ms |
| `use-intl`                  |        75.9 KB |       128.7 KB |                   0% |                     0% |          17.4 ms |
| Lingui                      |        56.7 KB |       120.2 KB |                 8.6% |                     0% |          21.9 ms |

Poin penting yang perlu diperhatikan:

- **Runtime sangat kecil, dan halaman tidak bocor.** Runtime dibuat untuk konfigurasi Anda, dan pesan diimpor di tempat pesan tersebut digunakan.
- **Lokal bocor.** Setiap fungsi pesan berisi setiap lokal, sehingga sekitar setengah dari string terjemahan yang dikirim ke halaman berada dalam bahasa yang tidak digunakan pengunjung. Semakin banyak lokal yang Anda tambahkan, semakin besar bagian ini.
- **Pemuatan halaman adalah yang paling lambat dari kelompok ini**, sebagian karena lokal ditentukan melalui strategi pada setiap panggilan daripada dibaca dari konteks React.

> Lihat data lengkap: [Laporan tolok ukur TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md), dan [repositori tolok ukur](https://github.com/intlayer-org/benchmark-i18n).

- [Laporan tolok ukur TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

## Perbandingan fitur di TanStack Start

Perbandingan Paraglide JS dengan pustaka lain yang umum digunakan di TanStack Start:

| Fitur                                              | `react-intlayer` (Intlayer)            | `use-intl`              | Paraglide JS                              | Lingui                        |
| -------------------------------------------------- | -------------------------------------- | ----------------------- | ----------------------------------------- | ----------------------------- |
| **Terjemahan dekat komponen**                      | ✅ Ditempatkan bersama                 | ❌ JSON terpusat        | ❌ Satu file JSON per lokal               | ⚠️ Teks sumber dalam komponen |
| **Integrasi TypeScript**                           | ✅ Tipe yang dibuat otomatis           | ✅ Melalui `AppConfig`  | ✅ Fungsi pesan bertipe                   | ⚠️ Hanya makro                |
| **Deteksi terjemahan yang hilang**                 | ✅ Kesalahan tipe dan peringatan build | ⚠️ Fallback runtime     | ⚠️ Kembali ke lokal dasar                 | ⚠️ Kembali ke teks sumber     |
| **Konten kaya (JSX, Markdown)**                    | ✅ Dukungan langsung                   | ⚠️ Tag melalui `t.rich` | ⚠️ String                                 | ✅ JSX di dalam `<Trans>`     |
| **Perutean terlokalisasi**                         | ✅ Bawaan                              | ❌ Manual `{-$locale}`  | ✅ `urlPatterns` + penulisan ulang router | ❌ Manual `{-$locale}`        |
| **Pengalihan lokal tanpa muat ulang**              | ✅ Ya                                  | ✅ Ya                   | ❌ Muat ulang halaman penuh               | ✅ Ya                         |
| **Pluralisasi**                                    | ✅ Berbasis enumerasi                  | ✅ ICU                  | ✅ Varian                                 | ✅ ICU                        |
| **ICU MessageFormat**                              | ✅ Melalui `format: "icu"`             | ✅ Asli                 | ⚠️ Melalui plugin inlang                  | ✅ Asli                       |
| **Format konten**                                  | ✅ `.ts`, `.json`, `.md`, `.yaml`...   | ⚠️ `.json`              | ⚠️ inlang JSON                            | ✅ PO, JSON, CSV              |
| **Terjemahan AI**                                  | ✅ Penyedia dan kunci Anda sendiri     | ❌ Tidak                | ❌ Tidak                                  | ❌ Tidak                      |
| **Editor visual / CMS**                            | ✅ Editor lokal + CMS opsional         | ❌ Platform eksternal   | ⚠️ Aplikasi ekosistem inlang              | ❌ Platform eksternal         |
| **Pembantu SEO (hreflang, sitemap)**               | ✅ Bawaan                              | ❌ Manual               | ⚠️ URL terlokalisasi, sisanya manual      | ❌ Manual                     |
| **Ukuran runtime (gzip, tolok ukur)**              | 4.5 KB                                 | 75.9 KB                 | 1.8 KB                                    | 56.7 KB                       |
| **Kebocoran, penyiapan terbaik (lokal / halaman)** | 0% / 0%                                | 0% / 0%                 | 49.7% / 0%                                | 8.6% / 0%                     |
| **Terjemahan yang hilang di CI**                   | ✅ `npx intlayer test`                 | ⚠️ Tidak bawaan         | ⚠️ Tidak bawaan                           | ✅ `lingui compile --strict`  |

> Angka ukuran runtime dan kebocoran berasal dari [tolok ukur TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md). Kebocoran diukur pada penyiapan terbaik dari setiap pustaka.

- [tolok ukur TanStack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

> Panduan TanStack Start lainnya:

- [Lingui](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_lingui.md)
- [use-intl](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/i18n_using_tanstack-start_use-intl.md)
- [Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

## Praktik yang harus Anda ikuti

- **Tetapkan `lang` dan `dir` pada `<html>`** dari lokal yang telah ditentukan, di server.
- **Pertahankan satu URL per lokal** dengan strategi awalan (`/fr/about`), sehingga setiap versi bahasa dapat diindeks.
- **Tempatkan `url` pertama dalam strategi lokal Anda**, sehingga URL menjadi sumber kebenaran, dan perayap mendapatkan halaman yang mereka minta.
- **Gunakan kunci pesan yang datar dan deskriptif** (`about_title`) yang dipetakan secara bersih ke nama fungsi.
- **Commit `messages/*.json` Anda, bukan folder `src/paraglide` yang dihasilkan**, untuk menghindari konflik penggabungan pada file yang dibuat secara otomatis.
- **Terjemahkan metadata Anda**, dan deklarasikan `canonical`, `hreflang`, serta `x-default` di setiap halaman.
- **Hasilkan sitemap dan robots.txt multibahasa**, serta lakukan pra-rendering untuk setiap lokal.
- **Gunakan tautan nyata untuk pengalih lokal**, sehingga perayap menemukan setiap bahasa.

- [internasionalisasi dan SEO](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/internationalization_and_SEO.md)
- [panduan hreflang](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/hreflang_guide_multilingual_seo.md)

## Panduan Langkah demi Langkah Menyiapkan Paraglide JS di Aplikasi TanStack Start

Berikut struktur proyek yang akan kita buat:

```bash
.
├── project.inlang
│   └── settings.json          # Locales and message format
├── messages
│   ├── en.json
│   ├── fr.json
│   └── es.json
├── vite.config.ts
└── src
    ├── paraglide              # Generated, git-ignored
    ├── server.ts              # Paraglide middleware
    ├── router.tsx             # URL rewrite
    ├── i18n
    │   ├── config.ts          # Site URL, helpers
    │   └── seo.ts             # head() builder
    ├── components
    │   └── LocaleSwitcher.tsx
    └── routes
        ├── __root.tsx
        ├── index.tsx          # / and /fr
        ├── about.tsx          # /about and /fr/about
        ├── $.tsx              # Localized 404
        ├── sitemap[.]xml.ts
        └── robots[.]txt.ts
```

Perhatikan bahwa tidak ada folder `$locale`: penulisan ulang router menghapus awalan sebelum pencocokan rute.

<Steps>
<Step number={1} title="Instal Dependensi">

Mulai dari proyek TanStack Start, lalu inisialisasi Paraglide. Perintah init membuat `project.inlang/settings.json`, sebuah file `messages/en.json` pertama, dan menginstal paket.

```bash packageManager="npm"
npm create @tanstack/start@latest
npx @inlang/paraglide-js@latest init
```

```bash packageManager="pnpm"
pnpm create @tanstack/start@latest
pnpm dlx @inlang/paraglide-js@latest init
```

```bash packageManager="yarn"
yarn create @tanstack/start
yarn dlx @inlang/paraglide-js@latest init
```

```bash packageManager="bun"
bun create @tanstack/start@latest
bunx @inlang/paraglide-js@latest init
```

- **@inlang/paraglide-js**: kompilator dan plugin Vite-nya. Tidak ada paket runtime untuk diinstal: runtime dihasilkan langsung ke dalam proyek Anda.

</Step>
<Step number={2} title="Konfigurasikan Lokal Anda">

`project.inlang/settings.json` adalah satu-satunya sumber kebenaran untuk lokal. Plugin format pesan membaca satu file JSON per lokal.

```json fileName="project.inlang/settings.json"
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": ["en", "fr", "es"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

</Step>
<Step number={3} title="Konfigurasikan Plugin Vite dan Strategi URL">

Plugin mengompilasi pesan pada setiap perubahan. Tiga opsi penting untuk TanStack Start:

- **`strategy`**: daftar berurutan lokasi untuk membaca lokal. `url` di urutan pertama menjadikan URL sebagai sumber kebenaran. `cookie` dan `preferredLanguage` digunakan oleh middleware saat URL tidak menentukannya.
- **`urlPatterns`**: cara lokal dipetakan ke URL. Lokal non-default dicantumkan terlebih dahulu, karena pola pencocokan pertama yang menang. Di sini lokal default tetap tanpa awalan (`/about`), dan lokal lain diberi awalan (`/fr/about`).
- **`outputStructure: "message-modules"`**: satu modul per pesan, yang memungkinkan bundler menghapus pesan yang tidak diimpor oleh halaman.

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide",
      outputStructure: "message-modules",
      cookieName: "PARAGLIDE_LOCALE",
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["fr", "/fr/:path(.*)?"],
            ["es", "/es/:path(.*)?"],
            // Default locale last: it matches every remaining URL
            ["en", "/:path(.*)?"],
          ],
        },
      ],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

Tambahkan folder yang dihasilkan ke `.gitignore`. Folder ini dibangun kembali saat `dev` dan `build`:

```plaintext fileName=".gitignore"
src/paraglide
```

</Step>
<Step number={4} title="Buat File Terjemahan Anda">

Setiap kunci menjadi fungsi yang diekspor dari `src/paraglide/messages`. Kunci snake_case yang datar memberikan nama fungsi yang paling bersih. Variabel menggunakan placeholder `{name}`.

<Tabs group="locale">
 <Tab value='en' label='English'>

```json fileName="messages/en.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Home",
  "nav_about": "About",
  "locale_switcher_label": "Change language",
  "home_meta_title": "Welcome",
  "home_meta_description": "A multilingual TanStack Start application.",
  "home_title": "Hello {name}!",
  "about_meta_title": "About us",
  "about_meta_description": "Learn who we are and why we built this application.",
  "about_title": "About us",
  "not_found_title": "Page not found",
  "not_found_back_home": "Back to home"
}
```

 </Tab>
 <Tab value='fr' label='French'>

```json fileName="messages/fr.json"
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "nav_home": "Accueil",
  "nav_about": "À propos",
  "locale_switcher_label": "Changer de langue",
  "home_meta_title": "Bienvenue",
  "home_meta_description": "Une application TanStack Start multilingue.",
  "home_title": "Bonjour {name} !",
  "about_meta_title": "À propos",
  "about_meta_description": "Découvrez qui kami sommes et pourquoi kami avons créé cette application.",
  "about_title": "À propos",
  "not_found_title": "Page introuvable",
  "not_found_back_home": "Retour à l'accueil"
}
```

 </Tab>
</Tabs>

Bentuk jamak menggunakan sintaks varian dari format pesan inlang:

```json fileName="messages/en.json"
{
  "cart_items": [
    {
      "declarations": ["input count", "local countPlural = count: plural"],
      "selectors": ["countPlural"],
      "match": {
        "countPlural=one": "{count} item",
        "countPlural=other": "{count} items"
      }
    }
  ]
}
```

</Step>
<Step number={5} title="Tambahkan Middleware Server">

Middleware menentukan lokal dari setiap permintaan dengan strategi Anda, dan membuatnya tersedia untuk `getLocale()` di seluruh proses rendering server, melalui cakupan `AsyncLocalStorage`. Hal inilah yang membuat permintaan bersamaan dalam bahasa berbeda tetap aman.

Di TanStack Start, bungkus server entry default:

```ts fileName="src/server.ts"
import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server";

export default {
  fetch(request: Request): Promise<Response> {
    return paraglideMiddleware(request, () => handler.fetch(request));
  },
};
```

</Step>
<Step number={6} title="Tulis Ulang URL yang Dilokalkan di Router">

Opsi `rewrite` TanStack Router menerjemahkan URL di batas router:

- **input**: `/fr/about` di-delokalisasi menjadi `/about` sebelum pencocokan, sehingga satu rute `about.tsx` melayani setiap bahasa;
- **output**: setiap `href` yang dihasilkan (tautan, pengalihan, navigasi) dilokalkan untuk lokal yang aktif, sehingga `<Link to="/about">` merender `/fr/about` pada halaman bahasa Prancis.

```tsx fileName="src/router.tsx"
import { createRouter } from "@tanstack/react-router";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  });

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
```

> Karena tautan dilokalkan oleh penulisan ulang, Anda tidak memerlukan komponen kustom `LocalizedLink`: gunakan `Link` TanStack Router seperti biasa.

</Step>
<Step number={7} title="Buat Dokumen Root">

`getLocale()` mengembalikan lokal yang ditentukan oleh middleware di server, dan lokal dari URL di peramban, sehingga `lang` dan `dir` identik di HTML server dan setelah hidrasi.

```ts fileName="src/i18n/config.ts"
import { baseLocale, type Locale, localizeUrl } from "@/paraglide/runtime";

/** Public origin, used for canonical URLs, hreflang and the sitemap. */
export const siteUrl = "https://example.com";

/** Open Graph expects `language_TERRITORY` codes. */
export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

const rightToLeftLanguages = new Set(["ar", "fa", "he", "ur", "ps", "yi"]);

export const getTextDirection = (locale: string): "ltr" | "rtl" =>
  rightToLeftLanguages.has(new Intl.Locale(locale).language) ? "rtl" : "ltr";

/** `getAbsoluteUrl("/about", "fr")` → `https://example.com/fr/about` */
export const getAbsoluteUrl = (path: string, locale: Locale): string =>
  localizeUrl(new URL(path, siteUrl), { locale }).href;

export const getLocaleName = (locale: Locale): string =>
  new Intl.DisplayNames([locale], { type: "language" }).of(locale) ?? locale;

export { baseLocale };
```

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { NotFound } from "@/components/NotFound";
import { getTextDirection } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = getLocale();

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

function RootLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">{m.nav_home()}</Link>
          <Link to="/about">{m.nav_about()}</Link>
        </nav>
        <LocaleSwitcher />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

</Step>
<Step number={8} title="Gunakan Terjemahan di Halaman Anda">

Pesan adalah fungsi biasa: impor `m`, panggil fungsinya, teruskan variabel sebagai objek. Semuanya bertipe, termasuk variabel.

```tsx fileName="src/routes/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/")({
  head: () =>
    buildLocalizedHead({
      path: "/",
      locale: getLocale(),
      title: m.home_meta_title(),
      description: m.home_meta_description(),
    }),
  component: HomePage,
});

function HomePage() {
  return <h1>{m.home_title({ name: "TanStack" })}</h1>;
}
```

```tsx fileName="src/routes/about.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { buildLocalizedHead } from "@/i18n/seo";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/about")({
  head: () =>
    buildLocalizedHead({
      path: "/about",
      locale: getLocale(),
      title: m.about_meta_title(),
      description: m.about_meta_description(),
    }),
  component: AboutPage,
});

function AboutPage() {
  return <h1>{m.about_title()}</h1>;
}
```

> Fungsi pesan juga menerima lokal eksplisit: `m.about_title({}, { locale: "fr" })`. Ini berguna dalam kode server yang merender bahasa selain yang diminta, seperti email.

</Step>
<Step number={9} title="Ubah Bahasa Konten Anda" isOptional={true}>

Render pengalih sebagai **tautan** dengan `localizeHref`, sehingga perayap menemukan setiap bahasa. `setLocale` menyimpan pilihan dalam cookie dan memuat ulang halaman dalam bahasa baru: muat ulang penuh adalah perilaku yang diharapkan dari Paraglide, karena fungsi pesan membaca lokal pada setiap panggilan alih-alih berlangganan state React.

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/react-router";
import { getLocaleName } from "@/i18n/config";
import { m } from "@/paraglide/messages";
import {
  getLocale,
  type Locale,
  locales,
  localizeHref,
  setLocale,
} from "@/paraglide/runtime";

export const LocaleSwitcher = () => {
  // Router pathname, already de-localized by the rewrite: "/about"
  const { pathname } = useLocation();
  const activeLocale = getLocale();

  const handleClick = (event: React.MouseEvent, locale: Locale) => {
    event.preventDefault();
    setLocale(locale); // Sets the cookie and reloads on the localized URL
  };

  return (
    <nav aria-label={m.locale_switcher_label()}>
      <ul>
        {locales.map((locale) => (
          <li key={locale}>
            <a
              href={localizeHref(pathname, { locale })}
              hrefLang={locale}
              lang={locale}
              aria-current={locale === activeLocale ? "page" : undefined}
              onClick={(event) => handleClick(event, locale)}
            >
              {getLocaleName(locale)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

</Step>
<Step number={10} title="Internasionalisasikan Metadata Anda" isOptional={true}>

Setiap versi bahasa dapat diberi peringkat secara mandiri, asalkan setiap halaman menyediakan:

- `<title>` dan `description` yang **diterjemahkan**;
- URL **canonical** yang mengarah ke dirinya sendiri;
- satu **alternatif `hreflang` per lokal**, ditambah **`x-default`**;
- **Open Graph** `og:locale`, `og:locale:alternate` dan `og:url`;
- **JSON-LD** dengan `inLanguage`.

`localizeUrl` Paraglide membangun URL alternatif dari `urlPatterns` Anda, sehingga tidak akan pernah melenceng dari perutean yang sebenarnya:

```ts fileName="src/i18n/seo.ts"
import { baseLocale, type Locale, locales } from "@/paraglide/runtime";
import { getAbsoluteUrl, openGraphLocales } from "./config";

type LocalizedHeadOptions = {
  /** De-localized path, e.g. "/about" */
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
        href: getAbsoluteUrl(path, baseLocale),
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
<Step number={11} title="Internasionalisasikan Sitemap Anda" isOptional={true}>

Sitemap multibahasa mencantumkan setiap URL dari setiap lokal, dan setiap entri mendeklarasikan semua alternatifnya dengan `xhtml:link`:

```ts fileName="src/routes/sitemap[.]xml.ts"
import { createFileRoute } from "@tanstack/react-router";
import { getAbsoluteUrl } from "@/i18n/config";
import { baseLocale, locales } from "@/paraglide/runtime";

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
    `<xhtml:link rel="alternate" hreflang="x-default" href="${getAbsoluteUrl(path, baseLocale)}"/>`,
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
<Step number={12} title="Internasionalisasikan robots.txt Anda" isOptional={true}>

Rute privat ada di setiap bahasa, jadi aturan `Disallow` harus mencakup setiap jalur yang dilokalkan. Hapus `public/robots.txt` jika template pemula membuatnya, lalu sajikan dari sebuah rute:

```ts fileName="src/routes/robots[.]txt.ts"
import { createFileRoute } from "@tanstack/react-router";
import { siteUrl } from "@/i18n/config";
import { locales, localizeHref } from "@/paraglide/runtime";

const privatePaths = ["/dashboard", "/admin"];

const buildRobots = (): string => {
  // /dashboard, /fr/dashboard, /es/dashboard...
  const disallowRules = privatePaths.flatMap((path) =>
    locales.map((locale) => `Disallow: ${localizeHref(path, { locale })}`)
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
<Step number={13} title="Lakukan Pra-rendering Setiap Lokal" isOptional={true}>

Cantumkan jalur yang dilokalkan dari setiap halaman sehingga TanStack Start melakukan pra-rendering semua versi bahasa. `localizeHref` adalah kode yang dihasilkan tanpa dependensi peramban, sehingga dapat berjalan di `vite.config.ts`, tetapi file tersebut hanya ada setelah kompilasi pertama. Mencantumkan jalur secara manual, seperti di bawah ini, menghindari masalah urutan tersebut:

```ts fileName="vite.config.ts"
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const prefixedLocales = ["fr", "es"]; // Default locale "en" is unprefixed
const pagePaths = ["/", "/about"];

const localizedPages = pagePaths.flatMap((path) => [
  path,
  ...prefixedLocales.map((locale) =>
    path === "/" ? `/${locale}` : `/${locale}${path}`
  ),
]);

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      // ... same options as step 3
      project: "./project.inlang",
      outdir: "./src/paraglide",
    }),
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: [
        ...localizedPages.map((path) => ({
          path,
          prerender: { enabled: true },
        })),
        { path: "/sitemap.xml", prerender: { enabled: true } },
        { path: "/robots.txt", prerender: { enabled: true } },
      ],
    }),
    viteReact(),
  ],
});
```

Karena pengalih merender tautan nyata, `crawlLinks: true` juga menemukan halaman yang lupa Anda cantumkan.

</Step>
<Step number={14} title="Tangani Halaman 404 yang Dilokalkan" isOptional={true}>

Dengan penulisan ulang, `/fr/does-not-exist` dicocokkan sebagai `/does-not-exist`, dan `getLocale()` tetap mengembalikan `fr`, sehingga `notFoundComponent` root dari langkah 7 dirender dalam bahasa Prancis. Rute catch-all memastikan jalur bertingkat dalam juga mencapainya. Tandai halaman dengan `noindex`: React 19 mengangkat `<meta>` ke `<head>`.

```tsx fileName="src/components/NotFound.tsx"
import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const NotFound = () => (
  <div>
    <meta name="robots" content="noindex" />
    <h1>{m.not_found_title()}</h1>
    <Link to="/">{m.not_found_back_home()}</Link>
  </div>
);
```

```tsx fileName="src/routes/$.tsx"
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  beforeLoad: () => {
    throw notFound();
  },
});
```

</Step>
<Step number={15} title="Akses Lokal dalam Server Functions" isOptional={true}>

Server functions berjalan di dalam cakupan middleware Paraglide, jadi `getLocale()` juga berfungsi di sana:

```ts fileName="src/server/sendWelcomeEmail.ts"
import { createServerFn } from "@tanstack/react-start";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator((email: string) => email)
  .handler(async ({ data: email }) => {
    const locale = getLocale();
    const subject = m.home_meta_title({}, { locale });

    // await mailer.send({ to: email, subject, locale });
    return { email, subject, locale };
  });
```

</Step>
<Step number={16} title="Bandingkan dengan Intlayer" isOptional={true}>

Tidak ada adaptor langsung dari Paraglide ke Intlayer, karena keduanya mengikuti ide yang sama: mengompilasi konten pada waktu build dan mengirim runtime sesedikit mungkin. Perbedaannya terletak pada apa yang sampai ke peramban dan bagaimana konten diatur:

- **Lokal**: Intlayer memuat [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) per lokal (kebocoran lokal 0% dalam tolok ukur), sementara setiap fungsi pesan Paraglide membawa setiap lokal (49.7%).
- **Pengorganisasian konten**: konten dapat berada dalam file `.content.ts` di sebelah setiap komponen, atau dalam file terpusat. Lihat [i18n per komponen vs terpusat](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/per-component_vs_centralized_i18n.md).
- **Pengalihan lokal**: konten dibaca dari konteks React, sehingga beralih lokal merender ulang tanpa memuat ulang halaman.
- **Kode yang dihasilkan**: tidak ada yang dihasilkan di dalam `src`, jadi tidak ada yang perlu dibuat ulang sebelum commit.

Jika Anda berasal dari pustaka lain selain Paraglide, [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) mempertahankan API `use-intl`, `next-intl`, `react-i18next`, `react-intl`, atau Lingui dan mengganti runtime-nya.

- [adaptor kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

Lihat [apakah Intlayer lebih ringan daripada Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_intlayer_lighter_than_paraglide.md) dan [panduan TanStack Start Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

- [apakah Intlayer lebih ringan daripada Paraglide?](https://github.com/aymericzip/intlayer/blob/main/docs/blog/id/is_intlayer_lighter_than_paraglide.md)
- [panduan TanStack Start Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

</Step>
<Step number={17} title="Otomatiskan Terjemahan Anda Menggunakan Intlayer" isOptional={true}>

Paraglide merender terjemahan, tetapi tidak membantu Anda **membuatnya**. Intlayer **gratis** dan **sumber terbuka**, dan perkakasnya membantu bahkan pada proyek Paraglide:

- **Terjemahkan dengan AI** menggunakan kunci API dan penyedia Anda sendiri. Lihat [pengisian otomatis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/autoFill.md) dan [CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).
- **Pertahankan file JSON Anda** sebagai sumber kebenaran dengan [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md).
- **Uji terjemahan yang hilang** di CI. Lihat [menguji terjemahan Anda](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/testing.md).
- **Pindai situs Anda yang telah diterapkan** untuk mencari `hreflang` yang hilang, canonical yang salah, dan kebocoran lokal dengan [perintah scan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/scan.md).

</Step>
</Steps>

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apakah Paraglide JS adalah pilihan yang baik untuk TanStack Start?">

Pilihan yang solid: digunakan dalam contoh resmi TanStack Router, memiliki runtime terkecil dalam [tolok ukur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md) (~1.8 KB gzip), dan pesan bertipe lengkap. Komprominya adalah setiap fungsi pesan berisi semua lokal, yang membocorkan sekitar setengah dari string terjemahan kepada pengunjung bahasa lain, serta perpindahan lokal memerlukan muat ulang halaman.

- [tolok ukur](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/tanstack.md)

</Question>
<Question title="Apakah saya memerlukan segmen rute $locale dengan Paraglide?">

Tidak. `rewrite` router menghapus awalan lokal sebelum pencocokan rute dan menambahkannya kembali ke tautan yang dihasilkan, sehingga satu `about.tsx` melayani `/about`, `/fr/about`, dan `/es/about`.

</Question>
<Question title="Mengapa mengubah bahasa memuat ulang halaman?">

Fungsi pesan membaca lokal saat dipanggil, fungsi tersebut tidak berlangganan state React. Oleh karena itu, `setLocale` memuat ulang halaman secara default, sehingga setiap pesan dirender ulang dalam bahasa baru. Anda dapat meneruskan `{ reload: false }`, tetapi Anda harus merender ulang struktur pohon secara manual.

</Question>
<Question title="Haruskah saya meng-commit folder src/paraglide yang dihasilkan?">

Lebih baik tidak. Folder ini dibuat ulang pada setiap `dev` dan `build`, dan meng-commit-nya menyebabkan konflik penggabungan pada file yang dibuat secara otomatis. Commit `messages/*.json` dan `project.inlang/settings.json` sebagai gantinya.

</Question>
<Question title="Bagaimana cara menambahkan tag hreflang dengan Paraglide?">

Gunakan `localizeUrl` untuk membuat satu URL absolut per lokal di rute `head()`, dan tambahkan `x-default` yang mengarah ke lokal dasar. Langkah 10 menyediakan helper yang dapat digunakan kembali, dan langkah 11 menambahkan alternatif yang sama ke sitemap.

</Question>
<Question title="Apakah Paraglide melakukan tree-shake pada terjemahan yang tidak digunakan?">

**Pesan** yang tidak digunakan akan dihapus saat Anda menggunakan `outputStructure: "message-modules"`, sehingga konten halaman lain tidak bocor. Namun **lokal** yang tidak digunakan tidak dihapus: setiap fungsi pesan berisi setiap terjemahan, itulah sebabnya tolok ukur mengukur kebocoran lokal sebesar 49.7%.

</Question>
<Question title="Dapatkah saya bermigrasi dari Paraglide ke Intlayer?">

Ya. Keduanya berbasis kompilator, sehingga model mentalnya serupa. Pertahankan file JSON Anda dengan [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md), lalu ganti panggilan `m.key()` dengan `useIntlayer`, halaman demi halaman. Lihat [panduan TanStack Start Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md).

- [plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [panduan TanStack Start Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)

</Question>

</FAQ>
