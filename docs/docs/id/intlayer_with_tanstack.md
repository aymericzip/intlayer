---
createdAt: 2025-09-09
updatedAt: 2026-08-25
title: "TanStack Start i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi TanStack Start multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
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
applicationShowcase: https://intlayer-tanstack-start-template.vercel.app
youtubeVideo: https://www.youtube.com/watch?v=_XTdKVWaeqg
history:
  - version: 9.4.0
    date: 2026-08-25
    changes: "Membandingkan resolusi statis, dinamis, dan dinamis dengan cache untuk kamus metadata pada fungsi head rute"
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 7.4.0
    date: 2025-12-11
    changes: "Memperkenalkan validatePrefix dan menambah langkah 14: Menangani halaman 404 dengan rute terlokalisasi."
  - version: 7.3.9
    date: 2025-12-05
    changes: "Menambah langkah 13: Mengambil locale di server actions Anda (Opsional)"
  - version: 7.2.3
    date: 2025-11-18
    changes: "Menambah langkah 13: Adaptasi Nitro"
  - version: 7.1.0
    date: 2025-11-17
    changes: "Memperbaiki default prefix dengan menambahkan fungsi getPrefix, gunakan useLocalizedNavigate, LocaleSwitcher dan LocalizedLink."
  - version: 6.5.2
    date: 2025-10-03
    changes: "Perbarui dokumen"
  - version: 5.8.1
    date: 2025-09-09
    changes: "Ditambahkan untuk TanStack Start"
author: aymericzip
---

# Terjemahkan situs web TanStack Start Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

Panduan ini mendemonstrasikan cara mengintegrasikan **Intlayer** untuk internasionalisasi yang mulus dalam proyek TanStack Start dengan routing yang mendukung locale, dukungan TypeScript, dan praktik pengembangan modern.

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `react-i18next` atau `use-intl`, atau `paraglide`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan TanStack Start penuh">

Intlayer sepenuhnya dioptimalkan untuk TanStack Start, menyediakan **perutean multibahasa**, **manajemen cookie**, **pembuatan peta situs**, **pemuatan konten dinamis**, dan semua fitur yang diperlukan untuk meningkatkan upaya internasionalisasi Anda (i18n).

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

## Panduan Langkah-demi-Langkah untuk Mengatur Intlayer dalam Aplikasi TanStack Start

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Solusi i18n terbaik untuk TanStack Start? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/_XTdKVWaeqg?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-tanstack-start-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-tanstack-start-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-tanstack-start-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-tanstack-start-template) di GitHub.

<Steps>

<Step number={1} title="Buat Proyek">

Mulailah dengan membuat proyek TanStack Start baru dengan mengikuti panduan [Memulai proyek baru](https://tanstack.com/start/latest/docs/framework/react/quick-start) di situs web TanStack Start.

</Step>

<Step number={2} title="Pasang Paket Intlayer">

Pasang paket yang diperlukan menggunakan manajer paket pilihan Anda:

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
npm install intlayer react-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer react-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpiler, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **react-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Ini menyediakan context provider dan hook untuk internasionalisasi React.

- **vite-intlayer**
  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang disukai pengguna, mengelola cookie, dan menangani pengalihan URL.

</Step>

<Step number={3} title="Konfigurasi proyek Anda">

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

</Step>

<Step number={4} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Tambahkan plugin intlayer ke dalam konfigurasi Anda:

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});

export default config;
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Vite. Selain itu, ini menyediakan alias untuk mengoptimalkan kinerja.

</Step>

<Step number={5} title="Buat Layout Root">

Konfigurasikan layout root Anda untuk mendukung internasionalisasi dengan menggunakan `useParams` untuk mendeteksi locale saat ini dan mengatur atribut `lang` dan `dir` pada tag `html`.

```tsx fileName="src/routes/__root.tsx"
import {
  createRootRouteWithContext,
  getRouteApi,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { type ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";

const localeRoute = getRouteApi("/{-$locale}");

export const Route = createRootRouteWithContext<{}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
  }),

  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

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

</Step>

<Step number={6} title="Buat Layout Locale">

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

</Step>

<Step number={7} title="Deklarasikan Konten Anda">

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

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda segera setelah mereka dimasukkan ke dalam direktori `contentDir` (secara default, `./app`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={8} title="Buat Komponen dan Hook yang Menyadari Locale">

Buat komponen `LocalizedLink` untuk navigasi yang menyadari locale:

```tsx fileName="src/components/localized-link.tsx"
import type { FC } from "react";

import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { getPrefix } from "intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

export type To = StripLocalePrefix<LinkComponentProps["to"]>;

export type StripLocalePrefix<T extends string | undefined> = T extends
  `/${typeof LOCALE_ROUTE}/` | `/${typeof LOCALE_ROUTE}`
  ? "/"
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : T;

type LocalizedLinkProps = {
  to?: To;
} & Omit<LinkComponentProps, "to">;

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
import type { StripLocalePrefix } from "@/components/localized-link";
import type { FileRouteTypes } from "@/routeTree.gen";

type NavigateFn = ReturnType<typeof useNavigate>;
type BaseNavigateOptions = Parameters<NavigateFn>[0];

type LocalizedTo = StripLocalePrefix<FileRouteTypes["to"]>;

export type LocalizedNavigateOptions = Omit<
  BaseNavigateOptions,
  "to" | "params"
> & {
  to: LocalizedTo;
  params?: Omit<NonNullable<BaseNavigateOptions["params"]>, "locale">;
};

type LocalizedNavigate = (
  options: LocalizedNavigateOptions
) => ReturnType<NavigateFn>;

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

</Step>

<Step number={9} title="Manfaatkan Intlayer di Halaman Anda">

> Gunakan **`useIntlayer`** secara default: ini cara yang direkomendasikan untuk membaca konten di dalam komponen, dan compiler meresolusinya ke locale yang sedang dirender. Gunakan `getIntlayer` / `getIntlayerAsync` hanya di luar pohon React: `head` rute, loader, dan server function.

Akses kamus konten Anda di seluruh aplikasi Anda:

#### Halaman Beranda Terlokalisasi

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";

import LocaleSwitcher from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { useLocalizedNavigate } from "@/hooks/useLocalizedNavigate";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
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

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda dapat menggunakan nilai dari fungsi, seperti:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md).

</Step>

<Step number={9} title="Buat Komponen Locale Switcher">

Buat komponen untuk memungkinkan pengguna mengubah bahasa:

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
              {/* Bahasa dalam Bahasa Inggris - misalnya French */}
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

</Step>

<Step number={10} title="Manajemen Atribut HTML">

Seperti yang terlihat di Step 5, Anda dapat mengelola atribut `lang` dan `dir` dari tag `html` menggunakan `useParams` di komponen root Anda. Ini memastikan bahwa atribut yang benar ditetapkan di server dan klien.

```tsx fileName="src/routes/__root.tsx"
const localeRoute = getRouteApi("/{-$locale}");

function RootDocument({ children }: { children: ReactNode }) {
  const params = localeRoute.useParams();
  const locale = params?.locale ?? defaultLocale;

  return (
    <html dir={getHTMLTextDir(locale)} lang={locale}>
      {/* ... */}
    </html>
  );
}
```

---

</Step>

<Step number={11} title="Tambahkan middleware">

Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan routing sisi server ke aplikasi Anda. Plugin ini akan secara otomatis mendeteksi locale saat ini berdasarkan URL dan menetapkan cookie locale yang sesuai. Jika tidak ada locale yang ditentukan, plugin akan menentukan locale yang paling sesuai berdasarkan preferensi bahasa browser pengguna. Jika tidak ada locale yang terdeteksi, plugin akan mengalihkan ke locale default.

> Perhatikan bahwa untuk menggunakan `intlayerProxy` dalam produksi, Anda perlu memindahkan paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

> Sejak Intlayer v9, `intlayerProxy()` dikemas langsung ke dalam plugin `intlayer()` dan diaktifkan secara default melalui opsi `routing.enableProxy` (`true` secara default). Mendaftarnya secara terpisah seperti yang ditunjukkan di bawah ini sekarang bersifat opsional: ini disimpan untuk kompatibilitas backward dan untuk setup yang perlu mengontrol urutan plugin. Atur `routing.enableProxy: false` untuk tidak memilih. Lihat [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md).

```typescript fileName="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    nitro(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
    tanstackStart({
      router: {
        routeFileIgnorePattern:
          ".content.(ts|tsx|js|mjs|cjs|jsx|json|jsonc|json5|md|mdx|yaml|yml)$",
      },
    }),
    viteReact(),
  ],
});
```

---

</Step>

<Step number={12} title="Internasionalisasi Metadata Anda">

<Tabs>

<Tab label="Resolusi statis" value="static">

`getIntlayer` menyelesaikan secara sinkron terhadap kamus **merged**, yang memegang setiap locale yang dideklarasikan. `head` tetap sinkron dan tidak ada yang diharapkan, tetapi seluruh kamus multilingua ditarik ke dalam chunk rute yang dikirim ke browser.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayer,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Path untuk rute ini

    const metaContent = getIntlayer("app", locale);

    return {
      links: [
        // Link canonical: Menunjuk ke halaman terlokalisasi saat ini
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Beritahu Google tentang semua versi terlokalisasi
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Untuk pengguna dalam bahasa yang tidak cocok
        // Tentukan locale fallback default (biasanya bahasa utama Anda)
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

Terbaik untuk kamus metadata kecil, beberapa locale, atau saat prototyping.

</Tab>

<Tab label="Resolusi dinamis" value="dynamic">

`getIntlayerAsync` (tersedia dari **v9.4**) berperilaku seperti `getIntlayer`, tetapi plugin build mengarahkannya ke chunk per-locale di `.intlayer/dynamic_dictionaries/` bukan kamus merged. Halaman karenanya hanya mengirim locale yang ditampilkannya. Karena chunk itu dimuat sesuai permintaan, `head` menjadi `async`:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  head: async ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Path untuk rute ini

    const metaContent = await getIntlayerAsync("app", locale);

    return {
      links: [
        // Link canonical: Menunjuk ke halaman terlokalisasi saat ini
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Beritahu Google tentang semua versi terlokalisasi
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Untuk pengguna dalam bahasa yang tidak cocok
        // Tentukan locale fallback default (biasanya bahasa utama Anda)
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

> Jika `head` membaca beberapa kamus, selesaikan dengan `Promise.all`: menunggu setiap `getIntlayerAsync` pada baris sendiri merantai permintaan alih-alih menjalankannya secara paralel.

Tradeoff: impor dinamis diselesaikan saat `head` berjalan, di jalur penting render dokumen. Pada rute dingin ini menunda head selama beberapa milidetik dan dapat sedikit merusak **LCP**.

</Tab>

<Tab label="Resolusi dinamis yang di-cache" value="cached">

Selesaikan kamus di route `loader` dan baca kembali dari `loaderData` di `head`. Loader dari rute yang cocok berjalan secara paralel, dan `staleTime: Infinity` memberi tahu TanStack Router bahwa hasil tidak pernah basi, jadi chunk per-locale diselesaikan sekali dan disajikan dari cache router setelahnya, meninggalkan `head` sinkron.

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createFileRoute } from "@tanstack/react-router";
import {
  defaultLocale,
  getIntlayerAsync,
  getLocalizedUrl,
  localeMap,
} from "intlayer";

export const Route = createFileRoute("/{-$locale}/")({
  component: RouteComponent,
  // Diselesaikan secara paralel dengan rute yang cocok lainnya, lepas dari jalur penting head
  loader: async ({ params }) => {
    const { locale = defaultLocale } = params;

    return { metaContent: await getIntlayerAsync("app", locale) };
  },
  // Kamus tidak pernah berubah untuk locale tertentu: selesaikan chunk sekali
  staleTime: Infinity,
  head: ({ params, loaderData }) => {
    const { locale = defaultLocale } = params;
    const path = "/"; // Path untuk rute ini

    return {
      links: [
        // Link canonical: Menunjuk ke halaman terlokalisasi saat ini
        { rel: "canonical", href: getLocalizedUrl(path, locale) },

        // Hreflang: Beritahu Google tentang semua versi terlokalisasi
        ...localeMap(({ locale: mapLocale }) => ({
          rel: "alternate",
          hrefLang: mapLocale,
          href: getLocalizedUrl(path, mapLocale),
        })),

        // x-default: Untuk pengguna dalam bahasa yang tidak cocok
        // Tentukan locale fallback default (biasanya bahasa utama Anda)
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: getLocalizedUrl(path, defaultLocale),
        },
      ],
      meta: [
        { title: loaderData?.metaContent.title },
        {
          name: "description",
          content: loaderData?.metaContent.meta.description,
        },
      ],
    };
  },
});
```

> `head` dapat dipanggil sebelum loader settles, jadi `loaderData` diketik sebagai kemungkinan `undefined`. Pertahankan rantai opsional, atau kembalikan judul fallback.

Anda menyimpan chunk per-locale tanpa membayar biayanya di jalur penting head. Harganya adalah pengalaman pengembang: konten harus dithread secara eksplisit dari loader ke `head` melalui `loaderData`.

</Tab>

</Tabs>

### Resolusi mana yang harus saya pilih?

|                      | Static resolution     | Dynamic resolution         | Cached dynamic resolution              |
| -------------------- | --------------------- | -------------------------- | -------------------------------------- |
| API                  | `getIntlayer`         | `getIntlayerAsync` (v9.4+) | `getIntlayerAsync` in `loader` (v9.4+) |
| `head` signature     | synchronous           | `async`                    | synchronous, reads `loaderData`        |
| Locales shipped      | every declared locale | requested locale only      | requested locale only                  |
| Client navigations   | nothing to resolve    | re-entered on every match  | served from the router cache           |
| Developer experience | simplest              | one `await`                | content threaded through `loaderData`  |

---

</Step>

<Step number={13} title="Ambil locale di server actions Anda">

Anda mungkin ingin mengakses locale saat ini dari dalam server actions atau API endpoints Anda.
Anda dapat melakukan ini menggunakan helper `getLocale` dari `intlayer`.

Berikut adalah contoh menggunakan TanStack Start's server functions:

```tsx fileName="src/routes/{-$locale}/index.tsx"
import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  getRequestHeaders,
} from "@tanstack/react-start/server";
import { getCookie, getIntlayer, getLocale } from "intlayer";

export const getLocaleServer = createServerFn().handler(async () => {
  const locale = await getLocale({
    // Ambil cookie dari request (default: 'INTLAYER_LOCALE')
    getCookie: (name) => {
      const cookieString = getRequestHeader("cookie");

      return getCookie(name, cookieString);
    },
    // Ambil header dari request (default: 'x-intlayer-locale')
    // Fallback menggunakan negosiasi Accept-Language
    getHeader: (name) => getRequestHeader(name),
  });

  // Ambil beberapa konten menggunakan getIntlayerAsync()
  const content = getIntlayer("app", locale);

  return { locale, content };
});
```

---

</Step>

<Step number={14} title="Kelola halaman not found">

Ketika pengguna mengunjungi halaman yang tidak ada, Anda dapat menampilkan halaman not found kustom dan prefiks locale dapat mempengaruhi cara halaman not found dipicu.

#### Halaman Beranda yang Terlokalisasi

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda dapat menggunakan nilai dari fungsi, seperti:
>
> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md).

</Step>

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

</Step>

<Step number={11} title="Manajemen Atribut HTML">

return (
<html dir={getHTMLTextDir(locale)} lang={locale}>
{/* ... _/}
</html>
);
} {/_ ... */}
</html>
);
}

export const Route = createFileRoute("/{-$locale}/")({
component: RouteComponent,
head: async ({ params }) => {
const { locale = defaultLocale } = params;
const path = "/"; // The path for this route

    const metaContent = await getIntlayerAsync("app", locale);

````

> Jika sebuah `head` membaca beberapa kamus, selesaikan dengan `Promise.all`; meng-await setiap `getIntlayerAsync` di barisnya sendiri membuat permintaan berantai alih-alih berjalan paralel.

Kompromnya: import dinamis diselesaikan saat `head` berjalan, di jalur kritis rendering dokumen. Pada rute dingin hal ini menunda `head` beberapa milidetik dan dapat sedikit memperburuk **LCP**.

</Tab>

<Tab label="Resolusi dinamis dengan cache" value="cached">

Selesaikan kamus di `loader` rute lalu baca kembali dari `loaderData` di `head`. Loader rute yang cocok berjalan paralel, dan `staleTime: Infinity` memberi tahu TanStack Router bahwa hasilnya tidak pernah basi, sehingga chunk per-locale diselesaikan sekali lalu disajikan dari cache router, dan `head` tetap sinkron.

```tsx fileName="src/routes/{-$locale}/index.tsx"

<Tabs>
 <Tab value='Extract command'>

  return { locale, content };
});
import { createFileRoute } from "@tanstack/react-router";

````

```tsx fileName="src/routes/{-$locale}/route.tsx"

```

```tsx fileName="src/routes/{-$locale}/$.tsx"
import { NotFoundComponent } from "./404";
```

</Step>

<Step number={1} title="Ekstrak konten komponen Anda" isOptional={true}>

Jika Anda memiliki basis kode yang ada, mengubah ribuan file bisa memakan waktu lama.

Untuk memudahkan proses ini, Intlayer mengusulkan [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengubah komponen Anda dan mengekstrak kontennya.

Untuk mengaturnya, Anda dapat menambahkan bagian `compiler` di file `intlayer.config.ts` Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

    /**
     * Menentukan jalur file output
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * Prefiks kunci kamus
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Perintah ekstrak'>

Jalankan extractor untuk mengubah komponen Anda dan mengekstrak kontennya

```bash packageManager="npm"

```

```bash packageManager="pnpm"

```

```bash packageManager="yarn"

```

```bash packageManager="bun"

 </Tab>
</Tabs>

bun x intlayer extract
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

---

bun run build # Or bun run dev
import { localeFlatMap } from "intlayer";
// ... import lainnya

export const pathList = ["", "/about", "/404"];

const localizedPages = localeFlatMap(({ urlPrefix }) =>
  pathList.map((path) => ({
    path: `${urlPrefix}${path}`,
    prerender: {
      enabled: true,
    },
  }))
);

export default defineConfig({
  plugins: [
    // ... plugin lainnya
    tanstackStart({
      // ... konfigurasi lainnya
      sitemap: {
        enabled: false,
      },
      prerender: {
        enabled: true,
        crawlLinks: false,
        concurrency: 10,
      },
      pages: localizedPages,
    }),
  ],
});
```

Kemudian, buat rute `src/routes/sitemap[.]xml.ts` yang menggunakan fungsi `generateSitemap`:

````typescript fileName="src/routes/sitemap[.]xml.ts"

---

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = generateSitemap(
          [
            { path: "/", changefreq: "daily", priority: 1.0 },
            { path: "/about", changefreq: "monthly", priority: 0.8 },
          ],
          { siteUrl: SITE_URL }
        );

        return new Response(sitemap, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
{
  // ... konfigurasi yang sudah ada
  include: [
    // ... include yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dibuat secara otomatis
  ],
}

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari commit mereka ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
````

---

## Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Intlayer VS Code Extension** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

---

## Lanjutkan Lebih Jauh

Untuk melanjutkan lebih jauh, Anda dapat menerapkan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengekstensikan konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

---

## Referensi Dokumentasi

- [Dokumentasi Intlayer](https://intlayer.org)
- [Dokumentasi Tanstack Start](https://reactrouter.com/)
- [hook useIntlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md)
- [hook useLocale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)
- [Content Declaration](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)
