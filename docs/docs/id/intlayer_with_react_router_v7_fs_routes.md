---
createdAt: 2025-09-04
updatedAt: 2026-06-23
title: "React Router v7 i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi React Router v7 multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - React Router v7
  - React
  - i18n
  - TypeScript
  - Routing Locale
slugs:
  - doc
  - environment
  - vite-and-react
  - react-router-v7-fs-routes
applicationTemplate: https://github.com/aymericzip/intlayer-react-router-v7-template
applicationShowcase: https://intlayer-react-router-v7.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 6.1.5
    date: 2025-10-03
    changes: "Memperbarui dokumen"
  - version: 5.8.2
    date: 2025-09-04
    changes: "Ditambahkan untuk React Router v7"
author: aymericzip
---

# Terjemahkan situs web React Router v7 Anda menggunakan Intlayer | Internasionalisasi (i18n)

Panduan ini menunjukkan cara mengintegrasikan **Intlayer** untuk internasionalisasi yang mulus dalam proyek React Router v7 dengan routing yang mendukung locale, dukungan TypeScript, dan praktik pengembangan modern.

Untuk routing sisi klien, lihat panduan [Intlayer dengan React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_react_router_v7.md).

## Table of Contents

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `react-i18next` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>
<Accordion header="Cakupan React Router Penuh">

Intlayer dioptimalkan untuk bekerja sempurna dengan React Router dengan menawarkan **perutean sadar lokal**, **middleware untuk deteksi lokal**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemampuan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **diketik sepenuhnya** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

</Accordion>

<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan dalam saluran CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

</Accordion>

<Accordion header="Pertunjukan">

Menghubungkan file JSON berukuran besar ke komponen dapat menyebabkan masalah kinerja dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada waktu pembuatan.

</Accordion>

<Accordion header="Menskalakan tanpa pengembang">

Lebih dari sekedar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_visual_editor.md)** yang dihosting sendiri dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi lancar. Konten dapat disimpan secara lokal dan/atau jarak jauh.

</Accordion>
</AccordionGroup>

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi React Router v7 dengan Rute Berbasis Sistem File

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="How to translate an React Router v7 (File-System Routes) app using Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-react-router-v7-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-react-router-v7.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-react-router-v7-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

See [Application Template](https://github.com/aymericzip/intlayer-react-router-v7-template) on GitHub.

<Steps>

<Step number={1} title="Install Dependencies">

Instal paket yang diperlukan menggunakan package manager pilihan Anda:

```bash packageManager="npm"
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
npm install @react-router/fs-routes --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
pnpm add @react-router/fs-routes --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
bun add @react-router/fs-routes --dev
bun x intlayer init
```

- **intlayer**

Paket inti yang menyediakan tools internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **react-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Menyediakan context providers dan hooks untuk internasionalisasi React.

- **vite-intlayer**
  Mencakup plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale pilihan pengguna, mengelola cookies, dan menangani pengalihan URL.

- **@react-router/fs-routes**
  Package yang mengaktifkan file-system based routing untuk React Router v7.

</Step>

<Step number={2} title="Konfigurasi proyek Anda">

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    defaultLocale: Locales.ENGLISH,
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
  },
};

export default config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Tambahkan plugin intlayer ke dalam konfigurasi Anda:

```typescript fileName="vite.config.ts"
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [reactRouter(), intlayer()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Vite. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa.

</Step>

<Step number={4} title="Konfigurasikan Rute React Router v7">

Atur konfigurasi routing Anda dengan rute yang mendukung lokal:

```typescript fileName="app/routes.ts"
import { layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    route("/:lang?", "routes/page.tsx"), // Halaman beranda yang dilokalkan
    route("/:lang?/about", "routes/about/page.tsx"), // Halaman about yang dilokalkan
  ]),
] satisfies RouteConfig;
```

> Fungsi `flatRoutes` dari `@react-router/fs-routes` memungkinkan routing berbasis sistem file, di mana struktur file dalam direktori `routes/` menentukan rute aplikasi Anda. Opsi `ignoredRouteFiles` memastikan bahwa file deklarasi konten Intlayer (`.content.ts`, dll.) tidak diperlakukan sebagai file rute.

</Step>

<Step number={5} title="Buat Komponen Layout">

Dengan file-system routing, Anda menggunakan konvensi penamaan yang rata di mana titik (`.`) mewakili segmen path dan tanda kurung `()` menunjukkan segmen opsional.

Atur layout root Anda dan layout spesifik lokal:

#### Struktur File

```bash
app/
├── root.tsx                         # Layout wrapper untuk locale routes
└──routes/
    ├── ($locale)._index.tsx         # Home page (/, /es, dll.)
    ├── ($locale)._index.content.ts  # Home page content
    ├── ($locale).about.tsx          # About page (/about, /es/about, dll.)
    └── ($locale).about.content.ts   # About page content
```

Konvensi penamaan:

- `($locale)` - Optional dynamic segment untuk parameter locale
- `_layout` - Layout route yang membungkus child routes
- `_index` - Index route (renders di parent path)
- `.` (dot) - Memisahkan path segments (contoh: `($locale).about` → `/:locale?/about`)

#### Komponen Layout

```tsx fileName="app/root.tsx"
import { getLocaleFromPath } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";

import "./app.css";

// ... Kode App, links dan ErrorBoundary yang tidak berubah

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);

  return { locale };
}

export function Layout({
  children,
}: { children: React.ReactNode } & Route.ComponentProps) {
  const data = useLoaderData<typeof loader>();
  const { locale } = data ?? {};

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

#### Layout Root

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

#### Halaman Beranda yang Dilokalkan

```tsx fileName="app/routes/[lang]/page.tsx"
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "~/components/localized-link";

export default function Page() {
  const { title, description, aboutLink } = useIntlayer("page");

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <nav>
        <LocalizedLink to="/about">{aboutLink}</LocalizedLink>
      </nav>
    </div>
  );
}
```

</Step>

<Step number={6} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan. Tempatkan file konten di samping file rute Anda:

```tsx fileName="app/routes/($locale)._index.content.ts"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    title: t({
      id: "Selamat datang di React Router v7 + Intlayer",
      en: "Welcome to React Router v7 + Intlayer",
      es: "Bienvenido a React Router v7 + Intlayer",
      fr: "Bienvenue sur React Router v7 + Intlayer",
    }),
    description: t({
      id: "Buat aplikasi multibahasa dengan mudah menggunakan React Router v7 dan Intlayer.",
      en: "Build multilingual applications with ease using React Router v7 and Intlayer.",
      es: "Cree aplicaciones multilingües fácilmente usando React Router v7 y Intlayer.",
      fr: "Créez des applications multilingues facilement avec React Router v7 et Intlayer.",
    }),
    aboutLink: t({
      id: "Pelajari Tentang Kami",
      en: "Learn About Us",
      es: "Aprender Sobre Nosotros",
      fr: "En savoir plus sur nous",
    }),
  },
} satisfies Dictionary;

export default pageContent;
```

```tsx fileName="app/routes/($locale).about.content.ts"
import { t, type Dictionary } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({
      id: "Tentang Kami",
      en: "About Us",
      es: "Sobre Nosotros",
      fr: "À propos de nous",
    }),
    content: t({
      id: "Ini adalah konten halaman tentang kami.",
      en: "This is the about page content.",
      es: "Este es el contenido de la página de información.",
      fr: "Ceci est le contenu de la page à propos.",
    }),
    homeLink: t({
      id: "Beranda",
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
    }),
  },
} satisfies Dictionary;

export default aboutContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda asalkan disertakan dalam direktori `contentDir` (secara default, `./app`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md).

> Jika aplikasi Anda sudah ada, Anda dapat menggunakan [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) secara kombinasi dengan [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengonversi ribuan komponen dalam satu detik.

</Step>

<Step number={7} title="Buat Komponen yang Menyadari Locale">

Buat komponen `LocalizedLink` untuk navigasi yang aware terhadap locale:

```tsx fileName="app/components/localized-link.tsx"
import type { FC } from "react";

import { getLocalizedUrl, type LocalesValues } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps, type To } from "react-router";

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === "string") {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? "")) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? "", locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
```

Jika Anda ingin menavigasi ke rute yang dilokalisasi, Anda dapat menggunakan hook `useLocalizedNavigate`:

```tsx fileName="app/hooks/useLocalizedNavigate.ts"
import { useLocale } from "react-intlayer";
import { type NavigateOptions, type To, useNavigate } from "react-router";

import { locacalizeTo } from "~/components/localized-link";

export const useLocalizedNavigate = () => {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const localizedNavigate = (to: To, options?: NavigateOptions) => {
    const localedTo = locacalizeTo(to, locale);

    navigate(localedTo, options);
  };

  return localizedNavigate;
};
```

</Step>

<Step number={8} title="Buat Komponen Locale Switcher">

Buat komponen untuk memungkinkan pengguna mengganti bahasa:

```tsx fileName="app/components/locale-switcher.tsx"
import type { FC } from "react";

import {
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
  getPathWithoutLocale,
  Locales,
} from "intlayer";
import { setLocaleInStorage, useIntlayer, useLocale } from "react-intlayer";
import { Link, useLocation } from "react-router";

export const LocaleSwitcher: FC = () => {
  const { localeSwitcherLabel } = useIntlayer("locale-switcher");
  const { pathname } = useLocation();

  const { availableLocales, locale } = useLocale();

  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <ol>
      {availableLocales.map((localeItem) => (
        <li key={localeItem}>
          <Link
            aria-current={localeItem === locale ? "page" : undefined}
            aria-label={`${localeSwitcherLabel.value} ${getLocaleName(localeItem)}`}
            onClick={() => setLocale(localeItem)}
            to={getLocalizedUrl(pathWithoutLocale, localeItem)}
          >
            <span>
              {/* Locale - misal FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Locale-nya sendiri - misalnya Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam Locale saat ini - misalnya Francés dengan locale saat ini disetel ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam Bahasa Inggris - misalnya French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
};
```

> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md).

</Step>

<Step number={9} title="Tambahkan Manajemen Atribut HTML">

Buat hook untuk mengelola atribut lang dan dir HTML:

```tsx fileName="app/hooks/useI18nHTMLAttributes.tsx"
import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";
import { useLocale } from "react-intlayer";

export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

Hook ini sudah digunakan dalam komponen layout (`($locale)._layout.tsx`) yang ditampilkan di Step 5.

</Step>

<Step number={10} title="Add middleware">

Kemudian gunakan di komponen root Anda:

Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan routing di sisi server ke aplikasi Anda. Plugin ini akan secara otomatis mendeteksi locale saat ini berdasarkan URL dan menetapkan cookie locale yang sesuai. Jika tidak ada locale yang ditentukan, plugin akan menentukan locale yang paling sesuai berdasarkan preferensi bahasa browser pengguna. Jika tidak ada locale yang terdeteksi, plugin akan mengarahkan ulang ke locale default.

> Perhatikan bahwa untuk menggunakan `intlayerProxy` di production, Anda perlu memindahkan paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

> Sejak Intlayer v9, `intlayerProxy()` digabungkan langsung ke dalam plugin `intlayer()` dan diaktifkan secara default melalui opsi `routing.enableProxy` (`true` secara default). Mendaftarkannya secara terpisah seperti yang ditunjukkan di bawah ini sekarang bersifat opsional — ini dipertahankan untuk kompatibilitas backward dan untuk setup yang perlu mengontrol urutan plugin. Atur `routing.enableProxy: false` untuk tidak menggunakannya. Lihat [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md).

```tsx fileName="app/routes/layout.tsx"
import { Outlet } from "react-router";
import { IntlayerProvider } from "react.intlayer";

import { useI18nHTMLAttributes } from "app/hooks/useI18nHTMLAttributes"; // impor hook

export default function RootLayout() {
  useI18nHTMLAttributes(); // panggil hook

  return (
    <IntlayerProvider>
      <Outlet />
    </IntlayerProvider>
  );
}
```

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

Perbarui `vite.config.ts` Anda untuk menyertakan plugin `intlayerCompiler`:

```ts fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer, intlayerCompiler } from "vite-intlayer";

export default defineConfig({
  plugins: [
    intlayer(),
    intlayerCompiler(), // Adds the compiler plugin
  ],
});
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

</Step>

</Steps>

## Configure TypeScript

Intlayer uses module augmentation to get benefits of TypeScript and make your codebase stronger.

Ensure your TypeScript configuration includes the autogenerated types:

```json5 fileName="tsconfig.json"
{
  // ... your existing configurations
  include: [
    // ... your existing includes
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

---

## Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

---

## Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi Intlayer VS Code** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan secara real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

## Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

---

## Referensi Dokumentasi

- [Dokumentasi Intlayer](https://intlayer.org)
- [Dokumentasi React Router v7](https://reactrouter.com/)
- [useIntlayer hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md)
- [useLocale hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)
- [Deklarasi Konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

Panduan komprehensif ini menyediakan semua yang Anda butuhkan untuk mengintegrasikan Intlayer dengan React Router v7 guna aplikasi yang sepenuhnya diinternasionalkan dengan routing yang mengenali locale dan dukungan TypeScript.

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi React Router v7?">

- **`react-i18next`**: pemuatan JSON di runtime.
- **`react-intl`**: format ICU.
- **`Intlayer`**: terintegrasi penuh dengan routing berbasis file system, deklarasi di sebelah komponen, optimasi build time, terjemahan AI, dan visual editor.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle React Router saya?">

Jauh lebih sedikit daripada sistem katalog konvensional, karena halaman hanya memuat konten yang digunakannya. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

</Question>

<Question title="Bisakah saya bermigrasi dari react-i18next atau react-intl tanpa menulis ulang komponen saya?">

Ya, ikuti panduan migrasi atau gunakan adapter kompatibilitas.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca komponen Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Langkah 11 dari panduan ini menjelaskannya.

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time: memindai kode sumber JSX, TSX, Vue, dan Svelte Anda pada setiap perubahan, menghasilkan kamus dan menjaganya tetap sinkron melalui hot module replacement, sehingga tidak ada kunci yang perlu dikelola secara manual.

Dua batasan perlu diketahui sebelum Anda mengaktifkan compiler. Ini bekerja dengan analisis statis, jadi string yang hanya ada saat runtime, seperti kode kesalahan API atau field CMS, tetap berada di luar jangkauan. Dan ini harus membedakan teks yang dilihat pengguna dari logika aplikasi seperti `className="active"` atau kode status, yang memerlukan beberapa anotasi di basis kode yang besar. [Perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) menghindari keduanya dengan menjaga Anda tetap memegang kendali.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Apa perbedaan antara panduan ini dan panduan React Router berbasis konfigurasi?">

Hanya cara mendeklarasikan rute: panduan ini menggunakan konvensi nama file alih-alih pohon rute di `routes.ts`. Deklarasi konten dan hook-nya identik.

</Question>

<Question title="Bagaimana cara menambahkan segmen locale dalam file system routes?">

Segmen locale menjadi bagian dinamis dari nama file. `validatePrefix` memfilter bahasa yang tidak dikenal, dan `getLocalizedUrl` mengubah URL.

</Question>

<Question title="Apakah ini bekerja dalam mode framework di React Router dengan SSR dan loaders?">

Ya. Server rendering dan loader function menyelesaikan locale secara langsung dan mengirimkan markup siap pakai ke klien.

</Question>

<Question title="Bagaimana cara menambahkan tag hreflang dan metadata terlokalisasi untuk SEO?">

Menggunakan `getMultilingualUrls` dalam ekspor `meta` rute untuk memetakan alternatif bahasa.

</Question>

<Question title="Bagaimana cara membuat komponen Link yang terlokalisasi?">

Dengan membuat wrapper di atas `Link` menggunakan `getLocalizedUrl`, yang secara otomatis menambahkan prefix locale aktif ke tautan internal.

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
