---
createdAt: 2025-03-25
updatedAt: 2026-03-25
title: i18n Tanstack Start - Cara Menerjemahkan Aplikasi Tanstack Start Menggunakan Solid.js di Tahun 2026
description: Pelajari cara menambahkan internasionalisasi (i18n) ke aplikasi Tanstack Start Anda menggunakan Intlayer dan Solid.js. Ikuti panduan komprehensif ini untuk membuat aplikasi multibahasa dengan perutean yang sadar akan lokal.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Tanstack Start
  - Solid
  - i18n
  - TypeScript
  - Perutean Lokal
slugs:
  - doc
  - environment
  - tanstack-start
  - solid
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-solid-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 8.5.1
    date: 2026-03-25
    changes: "Ditambahkan untuk Tanstack Start Solid.js"
---

# Terjemahkan situs web Tanstack Start + Solid.js Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

Panduan ini mendemonstrasikan cara mengintegrasikan **Intlayer** untuk internasionalisasi yang mulus dalam proyek Tanstack Start dengan Solid.js, perutean yang sadar akan lokal (locale-aware), dukungan TypeScript, dan praktik pengembangan modern.

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) inovatif dan sumber terbuka yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalisasi metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan pelengkapan otomatis (autocompletion) dan deteksi kesalahan.
- **Memanfaatkan fitur-fitur canggih**, seperti deteksi dan pengalihan lokal secara dinamis.
- **Mengaktifkan perutean yang sadar akan lokal** dengan sistem perutean berbasis file Milik Tanstack Start.

---

## Panduan Langkah-demi-Langkah Pengaturan Intlayer di Aplikasi Tanstack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Solusi i18n terbaik untuk Tanstack Start? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-solid-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Bagaimana Melakukan Internasionalisasi pada aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-tanstack-start-solid-template) di GitHub.

### Langkah 1: Pembuatan Proyek

Pertama, buat proyek TanStack Start baru mengikuti panduan [Memulai Proyek Baru](https://tanstack.com/start/latest/docs/framework/solid/quick-start) di situs web TanStack Start.

### Langkah 2: Instal Paket Intlayer

Instal paket-paket yang diperlukan menggunakan pengelola paket pilihan Anda:

```bash packageManager="npm"
npm install intlayer solid-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer solid-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer solid-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer solid-intlayer
bun add vite-intlayer --dev
bun x intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **solid-intlayer**
  Paket yang mengintegrasikan Intlayer ke dalam aplikasi Solid. Paket ini menyediakan penyedia konteks (context providers) dan hook untuk internasionalisasi Solid.

- **vite-intlayer**
  Menyertakan plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi lokal pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 3: Konfigurasi Proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"
import type { IntlayerConfig } from "intlayer";

import { Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Melalui file konfigurasi ini, Anda dapat mengonfigurasi URL yang dilokalisasi, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 4: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer dalam konfigurasi Anda:

```typescript fileName="vite.config.ts"
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
  ],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer dalam aplikasi Vite. Selain itu, ia menyediakan alias untuk mengurangi beban performa.

### Langkah 5: Buat Root Layout

Konfigurasikan root layout Anda untuk mendukung internasionalisasi dengan menggunakan `useParams` untuk mendeteksi lokal saat ini dan mengatur atribut `lang` serta `dir` pada tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { HydrationScript } from "solid-js/web";
import { Suspense, type ParentComponent } from "solid-js";
import { IntlayerProvider } from "solid-intlayer";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { Route as LocaleRoute } from "./{-$locale}/route";

export const Route = createRootRouteWithContext()({
  shellComponent: RootComponent,
});

const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>
          <Suspense>{props.children}</Suspense>
        </IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
};
```

### Langkah 6: Buat Locale Layout (Opsional)

Buat layout yang menangani prefiks lokal dan melakukan validasi. Layout ini akan memastikan hanya lokal yang valid yang diproses.

> Langkah ini opsional jika Anda tidak perlu memvalidasi prefiks lokal pada tingkat rute.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Memvalidasi prefiks lokal
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
        replace: true,
      });
    }
  },
  component: Outlet,
});
```

> Di sini, `{-$locale}` adalah parameter rute dinamis yang digantikan oleh lokal saat ini. Notasi ini membuat slot tersebut opsional, memungkinkannya bekerja dengan mode perutean seperti `'prefix-no-default'` dll.

> Perlu diketahui bahwa slot ini dapat menyebabkan masalah jika Anda menggunakan beberapa segmen dinamis dalam rute yang sama (misal: `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Untuk mode `'prefix-all'`, Anda mungkin lebih suka mengganti slot tersebut menjadi `$locale`.
> Untuk mode `'no-prefix'` atau `'search-params'`, Anda dapat menghapus slot tersebut sepenuhnya.

### Langkah 7: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/contents/page.content.ts"
import type { Dictionary } from "intlayer";

import { t } from "intlayer";

const appContent = {
  content: {
    links: {
      about: t({
        en: "About",
        es: "Acerca de",
        fr: "À propos",
      }),
      home: t({
        en: "Home",
        es: "Inicio",
        fr: "Accueil",
      }),
    },
    meta: {
      title: t({
        en: "Welcome to Intlayer + TanStack Router",
        es: "Bienvenido a Intlayer + TanStack Router",
        fr: "Bienvenue à Intlayer + TanStack Router",
      }),
      description: t({
        en: "This is an example of using Intlayer with TanStack Router",
        es: "Este es un ejemplo de uso de Intlayer con TanStack Router",
        fr: "Ceci est un exemple d'utilisation d'Intlayer dengan TanStack Router",
      }),
    },
  },
  key: "app",
} satisfies Dictionary;

export default appContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda, selama disertakan dalam direktori `contentDir` (secara default, `./app`). Dan harus memiliki ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 8: Gunakan Komponen dan Hook yang Sadar akan Lokal

Buat komponen `LocalizedLink` untuk navigasi yang sadar akan lokal:

```tsx fileName="src/components/LocalizedLink.tsx"
import { Link, type LinkProps } from "@tanstack/solid-router";
import { getPrefix } from "intlayer";
import { useLocale } from "solid-intlayer";
import type { JSX } from "solid-js";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type RemoveLocaleParam<TVal> = TVal extends string
  ? RemoveLocaleFromString<TVal>
  : TVal;

export type To = RemoveLocaleParam<LinkProps["to"]>;

type CollapseDoubleSlashes<TString extends string> =
  TString extends `${infer THead}//${infer TTail}`
    ? CollapseDoubleSlashes<`${THead}/${TTail}`>
    : TString;

export type LocalizedLinkProps = Omit<LinkProps, "to"> & {
  to?: To;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

type RemoveAll<
  TString extends string,
  TSub extends string,
> = TString extends `${infer THead}${TSub}${infer TTail}`
  ? RemoveAll<`${THead}${TTail}`, TSub>
  : TString;

type RemoveLocaleFromString<TString extends string> = CollapseDoubleSlashes<
  RemoveAll<TString, typeof LOCALE_ROUTE>
>;

export const LocalizedLink = (props: LocalizedLinkProps) => {
  const { locale } = useLocale();

  return (
    <Link
      {...props}
      params={{
        locale: getPrefix(locale()).localePrefix,
        ...(typeof props.params === "object" ? props.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to ?? ""}` as LinkProps["to"]}
    />
  );
};
```

Komponen ini melayani dua tujuan:

- Menghapus prefiks `{-$locale}` yang tidak perlu dari URL.
- Menyuntikkan parameter lokal ke dalam URL untuk memastikan pengguna diarahkan langsung ke rute yang dilokalisasi.

Kemudian, kita dapat membuat hook `useLocalizedNavigate` untuk navigasi programatik:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/solid-router";
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "solid-intlayer";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: string) => {
    const localizedTo = getLocalizedUrl(to, locale());
    return navigate({ to: localizedTo });
  };

  return localizedNavigate;
};
```

### Langkah 9: Gunakan Intlayer di Halaman Anda

Akses kamus konten Anda di seluruh aplikasi:

#### Halaman Beranda yang Dilokalisasi

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { useIntlayer } from "solid-intlayer";
import { LocalizedLink } from "@/components/LocalizedLink";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
});

function RouteComponent() {
  const content = useIntlayer("index-page");

  return (
    <main>
      <h1>{content().heroTitle}</h1>
      <p>{content().heroDesc}</p>
      <div>
        <LocalizedLink to="/">{content().navHome}</LocalizedLink>
        <LocalizedLink to="/about">{content().navAbout}</LocalizedLink>
      </div>
    </main>
  );
}
```

> Di Solid, `useIntlayer` mengembalikan fungsi **accessor** (misal: `content()`). Anda harus memanggil fungsi ini untuk mengakses konten reaktif.
>
> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useIntlayer.md).

### Langkah 10: Buat Komponen Locale Switcher

Buat komponen yang memungkinkan pengguna untuk mengubah bahasa:

```tsx fileName="src/components/LocaleSwitcher.tsx"
import { useLocation } from "@tanstack/solid-router";
import { getLocaleName, getPathWithoutLocale, getPrefix } from "intlayer";
import { For } from "solid-js";
import { useIntlayer, useLocale } from "solid-intlayer";
import { LocalizedLink, type To } from "./LocalizedLink";

export const LocaleSwitcher = () => {
  const content = useIntlayer("locale-switcher");
  const location = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = () => getPathWithoutLocale(location().pathname);

  return (
    <div class="flex flex-row gap-2">
      <For each={availableLocales}>
        {(localeEl) => (
          <LocalizedLink
            aria-current={localeEl === locale() ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale() as To}
          >
            {getLocaleName(localeEl)}
          </LocalizedLink>
        )}
      </For>
    </div>
  );
};

export default LocaleSwitcher;
```

> Dalam file Solid, `locale` dari `useLocale` adalah sebuah **signal accessor**. Gunakan `locale()` (dengan tanda kurung) untuk membaca nilai saat ini secara reaktif.
>
> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useLocale.md).

### Langkah 11: Pengelolaan Atribut HTML

Seperti yang terlihat pada Langkah 5, Anda dapat mengelola atribut `lang` dan `dir` dari tag `html` dengan menggunakan `useParams` di root component Anda. Ini memastikan atribut yang benar disetel baik di server maupun klien.

```tsx fileName="src/routes/__root.tsx"
const RootComponent: ParentComponent = (props) => {
  const params = LocaleRoute.useParams();
  const locale = params()?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
};
```

---

### Langkah 12: Tambahkan Middleware (Opsional)

Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan perutean sisi server ke aplikasi Anda. Plugin ini secara otomatis akan mendeteksi lokal saat ini berdasarkan URL dan mengatur cookie lokal yang sesuai. Jika tidak ada lokal yang ditentukan, plugin akan menentukan lokal yang paling tepat berdasarkan preferensi bahasa browser pengguna. Jika tidak ada lokal yang terdeteksi, ia akan mengalihkan ke lokal default.

> Perlu diketahui bahwa untuk menggunakan `intlayerProxy` dalam produksi, Anda perlu memindahkan paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solid from "vite-plugin-solid";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy harus ditempatkan sebelum server jika Anda menggunakan Nitro
    nitro(),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solid(),
  ],
});
```

---

### Langkah 13: Internasionalisasi Metadata Anda (Opsional)

Anda juga dapat menggunakan fungsi `getIntlayer` untuk mengakses kamus konten Anda dalam `head` loader untuk metadata yang sadar akan lokal:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/solid-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const path = "/"; // The path for this route

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Canonical link: Points to the current localized page
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Tell Google about all localized versions
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: For users in unmatched languages
        // Define the default fallback locale (usually your primary language)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: metaContent.title },
        { name: "description", content: metaContent.meta.description },
      ],
    };
  },
});
```

---

### Langkah 14: Ambil lokal di server action Anda (Opsional)

Anda mungkin ingin mengakses lokal saat ini dari dalam server action atau titik akhir API Anda.
Anda dapat melakukan ini menggunakan helper `getLocale` dari `intlayer`.

Berikut adalah contoh penggunaan fungsi server TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/solid-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/solid-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Mendapatkan cookie dari permintaan (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Mendapatkan header dari permintaan (default: 'x-intlayer-locale')
    // Fallback menggunakan negosiasi Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Ambil beberapa konten menggunakan getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Langkah 15: Mengelola halaman "not found" (Opsional)

Saat pengguna mengunjungi halaman yang tidak ada, Anda dapat menampilkan halaman kustom "not found" dan prefiks lokal dapat memengaruhi cara halaman "not found" tersebut dipicu.

#### Memahami penanganan 404 TanStack Router dengan prefiks lokal

Di TanStack Router, menangani halaman 404 dengan rute yang dilokalisasi memerlukan pendekatan berlapis:

1. **Rute 404 khusus**: Rute spesifik untuk menampilkan UI 404
2. **Validasi tingkat rute**: Memvalidasi prefiks lokal dan mengalihkan prefiks yang tidak valid ke 404
3. **Rute catch-all**: Menangkap setiap jalur yang tidak cocok dalam segmen lokal

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/solid-router";

// Ini membuat rute /[locale]/404 khusus
// Digunakan baik sebagai rute langsung maupun diimpor sebagai komponen di file lain
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Diekspor secara terpisah agar bisa digunakan kembali di notFoundComponent dan rute catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/solid-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad berjalan sebelum rute dirender (baik di server maupun klien)
  // Ini adalah tempat yang ideal untuk memvalidasi prefiks lokal
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix memeriksa apakah lokal valid sesuai dengan konfigurasi intlayer Anda
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Prefiks lokal tidak valid - alihkan ke halaman 404 dengan prefiks lokal yang valid
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent dipanggil ketika rute anak tidak ada
  // misal: /en/halaman-tidak-ada memicu ini dalam layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/solid-router";

import { NotFoundComponent } from "./404";

// Rute $ (splat/catch-all) cocok dengan jalur apa pun yang tidak cocok dengan rute lain
// misal: /en/beberapa/jalur/dalam/yang/tidak/valid
// Ini memastikan SEMUA jalur yang tidak cocok dalam sebuah lokal menampilkan halaman 404
// Tanpa ini, jalur dalam yang tidak cocok mungkin menampilkan halaman kosong atau kesalahan
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

### (Opsional) Langkah 16: Ekstrak konten dari komponen Anda

Jika Anda memiliki basis kode yang sudah ada, mengubah ribuan file bisa memakan waktu lama.

Untuk mempermudah proses ini, Intlayer mengusulkan sebuah [konpiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [ekstraktor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mentransformasi komponen Anda dan mengekstrak kontennya.

Untuk mengaturnya, Anda dapat menambahkan bagian `compiler` di file `intlayer.config.ts` Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Sisa konfigurasi Anda
  compiler: {
    /**
     * Menandakan apakah kompiler harus diaktifkan.
     */
    enabled: true,

    /**
     * Mendefinisikan jalur file keluaran
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Menandakan apakah komponen harus disimpan setelah ditransformasikan.
     *
     * - Jika `true`, kompiler akan menulis ulang file komponen di disk. Dengan demikian, transformasi akan permanen, dan kompiler akan melewati transformasi untuk proses selanjutnya. Dengan cara ini, kompiler dapat mentransformasi aplikasi dan kemudian dapat dihapus.
     *
     * - Jika `false`, kompiler hanya akan menyuntikkan pemanggilan fungsi `useIntlayer()` dalam kode hanya di output build, menjaga basis kode asli tetap utuh. Transformasi hanya akan dilakukan di memori.
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
 <Tab value='Perintah extract'>

Jalankan ekstraktor untuk mentransformasi komponen Anda dan mengekstrak kontennya

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
 <Tab value='Kompiler Babel'>

Perbarui `vite.config.ts` Anda untuk menyertakan plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { intlayer, intlayerCompiler } from "vite-intlayer";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/solid-start/plugin/vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    solidPlugin({ ssr: true }),
    intlayer(),
    intlayerCompiler(),
  ],
});
```

```bash packageManager="npm"
npm run build # Atau npm run dev
```

```bash packageManager="pnpm"
pnpm run build # Atau pnpm run dev
```

```bash packageManager="yarn"
yarn build # Atau yarn dev
```

```bash packageManager="bun"
bun run build # Atau bun run dev
```

 </Tab>
</Tabs>

---

### Langkah 17: Konfigurasi TypeScript (Opsional)

Intlayer menggunakan module augmentation untuk mendapatkan manfaat TypeScript dan membuat basis kode Anda lebih kuat.

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis:

```json5 fileName="tsconfig.json"
{
  // ... pengaturan Anda yang sudah ada
  include: [
    // ... penyertaan Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

---

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari melakukan komit file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

## Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menawarkan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata (real-time)** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Quick actions** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Langkah Lebih Lanjut

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

---

## Referensi Dokumentasi

- [Dokumentasi Intlayer](https://intlayer.org)
- [Dokumentasi Tanstack Start](https://tanstack.com/start/latest)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/solid-intlayer/useLocale.md)
- [Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
