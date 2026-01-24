---
createdAt: 2025-09-09
updatedAt: 2025-12-30
title: Cara menerjemahkan aplikasi TanStack Start Anda – panduan i18n 2026
description: Pelajari cara menambahkan internasionalisasi (i18n) ke aplikasi TanStack Start Anda menggunakan Intlayer. Ikuti panduan komprehensif ini untuk membuat aplikasi Anda multibahasa dengan routing yang mendukung locale.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - TanStack Start
  - React
  - i18n
  - TypeScript
  - Routing Locale
slugs:
  - doc
  - environment
  - tanstack-start
applicationTemplate: https://github.com/aymericzip/intlayer-tanstack-start-template
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 7.4.0
    date: 2025-12-11
    changes: Memperkenalkan validatePrefix dan menambah langkah 14: Menangani halaman 404 dengan rute terlokalisasi.
  - version: 7.3.9
    date: 2025-12-05
    changes: Menambah langkah 13: Mengambil locale di server actions Anda (Opsional)
  - version: 7.2.3
    date: 2025-11-18
    changes: Menambah langkah 13: Adaptasi Nitro
  - version: 7.1.0
    date: 2025-11-17
    changes: Memperbaiki default prefix dengan menambahkan fungsi getPrefix, gunakan useLocalizedNavigate, LocaleSwitcher dan LocalizedLink.
  - version: 6.5.2
    date: 2025-10-03
    changes: Perbarui dokumen
  - version: 5.8.1
    date: 2025-09-09
    changes: Ditambahkan untuk TanStack Start
---

# Terjemahkan situs web TanStack Start Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

Panduan ini mendemonstrasikan cara mengintegrasikan **Intlayer** untuk internasionalisasi yang mulus dalam proyek TanStack Start dengan routing yang mendukung locale, dukungan TypeScript, dan praktik pengembangan modern.

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) sumber terbuka yang inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan pelengkapan otomatis dan deteksi kesalahan.
- **Manfaatkan fitur-fitur canggih**, seperti deteksi dan pengalihan locale secara dinamis.
- **Aktifkan routing yang mendukung locale** dengan sistem routing berbasis file TanStack Start.

---

## Panduan Langkah-demi-Langkah untuk Mengatur Intlayer dalam Aplikasi TanStack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="Solusi i18n terbaik untuk TanStack Start? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-tanstack-start-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-tanstack-start-template) di GitHub.

### Langkah 1: Buat Proyek

Mulailah dengan membuat proyek TanStack Start baru dengan mengikuti panduan [Memulai proyek baru](https://tanstack.com/start/latest/docs/framework/react/quick-start) di situs web TanStack Start.

### Langkah 2: Pasang Paket Intlayer

Pasang paket yang diperlukan menggunakan manajer paket pilihan Anda:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpiler, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **react-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Ini menyediakan context provider dan hook untuk internasionalisasi React.

- **vite-intlayer**
  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang disukai pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 3: Konfigurasi proyek Anda

Buat file konfigurasi untuk mengonfigurasi bahasa aplikasi Anda:

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

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 4: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer ke dalam konfigurasi Anda:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Vite. Selain itu, ini menyediakan alias untuk mengoptimalkan kinerja.

### Langkah 5: Buat Layout Root

Konfigurasikan layout root Anda untuk mendukung internasionalisasi dengan menggunakan `useMatches` untuk mendeteksi locale saat ini dan mengatur atribut `lang` dan `dir` pada tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

export const Route = createRootRouteWithContext<{}>()({
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Coba cari locale di params dari match yang aktif
  // Ini mengasumsikan Anda menggunakan segmen dinamis "/{-$locale}" dalam route tree Anda
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      <head>
        <HeadContent />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

### Langkah 6: Buat Layout Locale

Buat layout yang menangani awalan locale dan melakukan validasi.

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // Validasi awalan locale
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
});
```

> Di sini, `{-$locale}` adalah parameter rute dinamis yang digantikan dengan locale saat ini. Notasi ini membuat slot bersifat opsional, memungkinkannya bekerja dengan mode perutean seperti `'prefix-no-default'` dll.

> Sadari bahwa slot ini dapat menyebabkan masalah jika Anda menggunakan beberapa segmen dinamis dalam rute yang sama (misalnya, `/{-$locale}/other-path/$anotherDynamicPath/...`).
> Untuk mode `'prefix-all'`, Anda mungkin lebih suka mengganti slot menjadi `$locale` sebagai gantinya.
> Untuk mode `'no-prefix'` atau `'search-params'`, Anda dapat menghapus slot sepenuhnya.

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

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda segera setelah mereka dimasukkan ke dalam direktori `contentDir` (secara default, `./app`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 8: Buat Komponen dan Hook yang Menyadari Locale

Buat komponen `LocalizedLink` untuk navigasi yang menyadari locale:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Utilitas utama
export type RemoveLocaleParam<T> = T extends string
  ? RemoveLocaleFromString<T>
  : T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
  S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

// Pembantu
type RemoveAll<
  S extends string,
  Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
  RemoveAll<S, typeof LOCALE_ROUTE>
>;

export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
  const { locale } = useLocale();
  const { localePrefix } = getPrefix(locale);

  return (
    <Link
      {...props}
      params={{
        locale: localePrefix,
        ...(typeof props?.params === "object" ? props?.params : {}),
      }}
      to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
    />
  );
};
```

Komponen ini memiliki dua tujuan:

- Menghapus awalan `{-$locale}` yang tidak perlu dari URL.
- Menyuntikkan parameter locale ke dalam URL untuk memastikan pengguna langsung diarahkan ke rute yang terlokalisasi.

Kemudian kita dapat membuat hook `useLocalizedNavigate` untuk navigasi secara terprogram:

```tsx fileName="src/hooks/useLocalizedNavigate.tsx"
import { useNavigate } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import { useLocale } from "react-intlayer";
import { LOCALE_ROUTE } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never;

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

type LocalizedNavigate = {
  (to: LocalizedTo): ReturnType<ReturnType<typeof useNavigate>>;
  (
    opts: { to: LocalizedTo } & Record<string, unknown>
  ): ReturnType<ReturnType<typeof useNavigate>>;
};

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();

  const { locale } = useLocale();

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    const { localePrefix } = getPrefix(locale);

    if (typeof args === "string") {
      return navigate({
        to: `/${LOCALE_ROUTE}${args}`,
        params: { locale: localePrefix },
      });
    }

    const { to, ...rest } = args;

    const localizedTo = `/${LOCALE_ROUTE}${to}` as any;

    return navigate({
      to: localizedTo,
      params: { locale: localePrefix, ...rest } as any,
    });
  };

  return localizedNavigate;
};
```

### Langkah 9: Manfaatkan Intlayer di Halaman Anda

Akses kamus konten Anda di seluruh aplikasi Anda:

#### Halaman Beranda yang Terlokalisasi

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("app", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.meta.description, name: "description" },
      ],
    };
  },
});

function RouteComponent() {
  const content = useIntlayer("app");
  const navigate = useLocalizedNavigate();

  return (
    <div>
      <div>
        {content.title}
        <LocaleSwitcher />
        <div>
          <LocalizedLink to="/">{content.links.home}</LocalizedLink>
          <LocalizedLink to="/about">{content.links.about}</LocalizedLink>
        </div>
        <div>
          <button onClick={() => navigate({ to: "/" })}>
            {content.links.home}
          </button>
          <button onClick={() => navigate({ to: "/about" })}>
            {content.links.about}
          </button>
        </div>
      </div>
    </div>
  );
}
```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md).

### Langkah 10: Buat Komponen Locale Switcher

Buat komponen untuk memungkinkan pengguna mengganti bahasa:

```tsx fileName="src/components/locale-switcher.tsx"
import { useLocation } from "@tanstack/react-router";
import {
  getHTMLTextDir,
  getLocaleName,
  getPathWithoutLocale,
  getPrefix,
  Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeEl) => (
        <li key={localeEl}>
          <LocalizedLink
            aria-current={localeEl === locale ? "page" : undefined}
            onClick={() => setLocale(localeEl)}
            params={{ locale: getPrefix(localeEl).localePrefix }}
            to={pathWithoutLocale as To}
          >
            <span>
              {/* Locale - misalnya FR */}
              {localeEl}
            </span>
            <span>
              {/* Bahasa dalam Locale-nya sendiri - misalnya Français */}
              {getLocaleName(localeEl, locale)}
            </span>
            <span dir={getHTMLTextDir(localeEl)} lang={localeEl}>
              {/* Bahasa dalam Locale saat ini - misalnya Francés dengan locale saat ini diatur ke Locales.SPANISH */}
              {getLocaleName(localeEl)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam bahasa Inggris - misalnya French */}
              {getLocaleName(localeEl, Locales.ENGLISH)}
            </span>
          </LocalizedLink>
        </li>
      ))}
    </ol>
  );
};
```

> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md).

### Langkah 11: Manajemen Atribut HTML

Seperti yang terlihat pada Langkah 5, Anda dapat mengelola atribut `lang` dan `dir` dari tag `html` menggunakan `useMatches` di komponen root Anda. Ini memastikan bahwa atribut yang benar diatur pada server dan klien.

```tsx fileName="src/routes/__root.tsx"
function RootDocument({ children }: { children: ReactNode }) {
  const matches = useMatches();

  // Coba cari locale di params dari match yang aktif
  const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
  const locale = localeRoute?.params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

### Langkah 12: Tambahkan middleware (Opsional)

Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan routing sisi server ke aplikasi Anda. Plugin ini akan secara otomatis mendeteksi locale saat ini berdasarkan URL dan mengatur cookie locale yang sesuai. Jika tidak ada locale yang ditentukan, plugin akan menentukan locale yang paling sesuai berdasarkan preferensi bahasa browser pengguna. Jika tidak ada locale yang terdeteksi, itu akan dialihkan ke locale default.

> Perhatikan bahwa untuk menggunakan `intlayerProxy` di produksi, Anda perlu mengganti paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

```typescript {7,14-17} fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer, intlayerProxy } from "vite-intlayer";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    intlayerProxy(), // Proxy harus ditempatkan sebelum server jika Anda menggunakan Nitro
    nitro(),
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    intlayer(),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5)$",
      },
    }),
    viteReact(),
  ],
});
```

---

### Langkah 13: Internasionalisasi Metadata Anda (Opsional)

Anda juga dapat menggunakan hook `getIntlayer` untuk mengakses kamus konten Anda di seluruh aplikasi Anda:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale } = params;
    const metaContent = getIntlayer("page-metadata", locale);

    return {
      meta: [
        { title: metaContent.title },
        { content: metaContent.description, name: "description" },
      ],
    };
  },
});
```

---

### Langkah 14: Ambil locale dalam server actions Anda (Opsional)

Anda mungkin ingin mengakses locale saat ini dari dalam server actions atau endpoint API Anda.
Anda dapat melakukannya menggunakan pembantu `getLocale` dari `intlayer`.

Berikut adalah contoh menggunakan fungsi server TanStack Start:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Dapatkan cookie dari permintaan (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Dapatkan header dari permintaan (default: 'x-intlayer-locale')
    // Fallback menggunakan negosiasi Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Ambil beberapa konten menggunakan getIntlayer()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

### Langkah 15: Kelola halaman tidak ditemukan (Opsional)

Ketika seorang pengguna mengunjungi halaman yang tidak ada, Anda dapat menampilkan halaman tidak ditemukan yang disesuaikan dan awalan locale dapat mempengaruhi cara halaman tidak ditemukan dipicu.

#### Memahami Penanganan 404 TanStack Router dengan Awalan Locale

Di TanStack Router, menangani halaman 404 dengan rute yang dilokalisasi memerlukan pendekatan berlapis:

1. **Rute 404 khusus**: Rute khusus untuk menampilkan UI 404
2. **Validasi tingkat rute**: Memvalidasi awalan locale dan mengalihkan yang tidak valid ke 404
3. **Rute catch-all**: Menangkap setiap jalur yang tidak cocok dalam segmen locale

```tsx fileName="src/routes/{-$locale}/404.tsx"
import { createFileRoute } from "@tanstack/react-router";

// Ini membuat rute /[locale]/404 khusus
// Ini digunakan baik sebagai rute langsung maupun diimpor sebagai komponen di file lain
export const Route = createFileRoute("/{-$locale}/404")({
  component: NotFoundComponent,
});

// Diekspor secara terpisah sehingga dapat digunakan kembali dalam notFoundComponent dan rute catch-all
export function NotFoundComponent() {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}
```

```tsx fileName="src/routes/{-$locale}/route.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";
import { NotFoundComponent } from "./404";

export const Route = createFileRoute("/{-$locale}")({
  // beforeLoad berjalan sebelum rute merender (di server maupun klien)
  // Ini adalah tempat yang ideal untuk memvalidasi awalan locale
  beforeLoad: ({ params }) => {
    const localeParam = params.locale;

    // validatePrefix memeriksa apakah locale valid sesuai dengan konfigurasi intlayer Anda
    const { isValid, localePrefix } = validatePrefix(localeParam);

    if (!isValid) {
      // Awalan locale tidak valid - alihkan ke halaman 404 dengan awalan locale yang valid
      throw redirect({
        to: "/{-$locale}/404",
        params: { locale: localePrefix },
      });
    }
  },
  component: Outlet,
  // notFoundComponent dipanggil ketika rute anak tidak ada
  // misal, /en/non-existent-page memicu ini dalam layout /en
  notFoundComponent: NotFoundComponent,
});
```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { NotFoundComponent } from "./404";

// Rute $ (splat/catch-all) cocok dengan jalur mana pun yang tidak cocok dengan rute lain
// misal, /en/some/deeply/nested/invalid/path
// Ini memastikan SEMUA jalur yang tidak cocok dalam suatu locale menampilkan halaman 404
// Tanpa ini, jalur dalam yang tidak cocok mungkin menampilkan halaman kosong atau kesalahan
export const Route = createFileRoute("/{-$locale}/$")({
  component: NotFoundComponent,
});
```

---

### Langkah 16: Konfigurasi TypeScript (Opsional)

Intlayer menggunakan augmentasi modul untuk mendapatkan manfaat TypeScript dan membuat basis kode Anda lebih kuat.

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis:

```json5 fileName="tsconfig.json"
{
  // ... konfigurasi yang ada
  include: [
    // ... include yang ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan otomatis
  ],
}
```

---

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari melakukan commit ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

## Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

---

## Referensi Dokumentasi

- [Dokumentasi Intlayer](https://intlayer.org)
- [Dokumentasi TanStack Start](https://reactrouter.com/)
- [Hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md)
- [Hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)
- [Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
