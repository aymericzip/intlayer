---
createdAt: 2026-11-23
updatedAt: 2026-11-23
title: "vinext i18n - Panduan lengkap menerjemahkan aplikasi Next.js Anda di Vite"
description: "Siapkan Intlayer dengan vinext, API Next.js di atas Vite: routing berdasarkan bahasa dengan proxy.ts, Server dan Client Components, metadata terlokalisasi, sitemap, dan deployment ke Cloudflare Workers."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - vinext
  - Next.js
  - Vite
  - Cloudflare Workers
  - React
slugs:
  - doc
  - environment
  - vinext
history:
  - version: 9.8.4
    date: 2026-11-23
    changes: "Riwayat awal"
author: aymericzip
---

# Terjemahkan situs vinext Anda menggunakan Intlayer

[vinext](https://github.com/cloudflare/vinext) mengimplementasikan ulang API Next.js di atas Vite. Direktori `app/`, impor `next/*`, dan `proxy.ts` Anda tetap berfungsi, tetapi build berjalan melalui Vite, bukan Turbopack atau webpack.

Intlayer terhubung ke setup ini dengan dua paket: `next-intlayer` untuk hook, provider, dan proxy yang sudah dipakai komponen Anda di Next.js, serta `vite-intlayer` untuk sisi build (kompilasi dictionary, watch, dan optimasi bundle).

> Menjalankan Next.js dengan toolchain-nya sendiri? Ikuti [panduan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md).

- [Panduan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibanding alternatif lain?

Dibandingkan solusi seperti `next-intl` atau `i18next`, Intlayer hadir dengan optimasi bawaan:

<AccordionGroup>
<Accordion header="Dibuat untuk API Next.js, di Vite">

Kode `next-intlayer` yang sama berjalan di Next.js dan di vinext. Server Components menyelesaikan konten di server, Client Components membacanya lewat provider, dan routing bahasa berjalan dari `proxy.ts` Anda. Berpindah antara kedua toolchain tidak menyentuh komponen Anda.

</Accordion>
<Accordion header="Ukuran bundle">

Alih-alih memuat file JSON besar ke halaman Anda, muat hanya konten yang diperlukan. Plugin Vite mengganti setiap panggilan `useIntlayer` dengan entri yang benar-benar dipakai komponen, sehingga **mengurangi ukuran bundle dan halaman hingga 50%**.

</Accordion>
<Accordion header="Kemudahan pemeliharaan">

Membagi konten per komponen **menyederhanakan pemeliharaan** aplikasi besar. Anda dapat menduplikasi atau menghapus folder fitur tanpa meninjau seluruh codebase konten, dan Intlayer **sepenuhnya bertipe** agar konten Anda tetap akurat.

</Accordion>
<Accordion header="Agen AI">

Menempatkan konten berdekatan dengan komponen **mengurangi konteks yang dibutuhkan** LLM. Intlayer menyediakan **CLI** untuk menguji terjemahan yang hilang, **[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)
- [Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)
- [Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)

</Accordion>
<Accordion header="Otomatisasi">

Terjemahkan di pipeline CI/CD Anda dengan LLM pilihan Anda, dengan biaya ditanggung penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatiskan ekstraksi konten, dan [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk **menerjemahkan di latar belakang**.

- [Platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

</Accordion>
<Accordion header="Skalabilitas bersama non-developer">

Intlayer menyediakan **[visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) yang dapat di-host sendiri** dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk mengelola konten multibahasa secara **real time** bersama penerjemah dan copywriter. Konten dapat disimpan secara lokal dan/atau jarak jauh.

- [Visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Panduan Langkah demi Langkah untuk Menyiapkan Intlayer di Aplikasi vinext

<Steps>
<Step number={1} title="Instal dependensi">

Mulailah dari proyek vinext yang berjalan. Untuk membuatnya, jalankan `npm create vinext-app@latest`. Untuk memigrasikan aplikasi Next.js yang sudah ada, jalankan `npx vinext init`.

Lalu instal Intlayer:

```bash packageManager="npm"
npm install intlayer next-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn add vite-intlayer --dev
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi: manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **next-intlayer**

  Menyediakan provider, hook, dan proxy untuk API Next.js. vinext mengarahkan `next/navigation`, `next/headers`, dan `next/server` ke implementasinya sendiri, sehingga `next-intlayer` berfungsi tanpa perubahan.

- **vite-intlayer**

  Plugin Vite yang membangun deklarasi konten Anda, memantaunya saat development, dan mengoptimalkan dictionary di bundle produksi. Plugin ini menggantikan plugin Next.js `withIntlayer()`, yang tidak dijalankan oleh vinext.

</Step>
<Step number={2} title="Konfigurasi proyek Anda">

Pilih apakah aplikasi Anda memakai path URL terlokalisasi (mis. `/en/about`, `/fr/about`) atau menyajikan konten tanpa segmen bahasa di path (mis. `/about`, dengan mendeteksi bahasa lewat cookie, header, atau parameter query).

<Tabs group="routing-mode">
<Tab label="Dengan path bahasa" value="with-locale-path">

### Arsitektur

Semua halaman terlokalisasi disarangkan di bawah segmen dinamis `[locale]`. Ini direkomendasikan untuk SEO dan rendering statis, karena setiap bahasa memiliki URL sendiri:

```bash
.
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx            # Locale layout for the Intlayer provider
│   │   │   ├── page.content.ts
│   │   │   └── page.tsx
│   │   └── layout.tsx                # Root layout for style and global providers
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── LocaleSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Konfigurasi

Buat file `intlayer.config.ts` untuk mendeklarasikan bahasa yang didukung:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // or `prefix-all`
  },
};

export default config;
```

</Tab>
<Tab label="Tanpa path bahasa" value="without-locale-path">

### Arsitektur

Route tidak menyertakan segmen `[locale]`. Semua halaman berada langsung di bawah `src/app/`, dan bahasa berasal dari cookie, header, atau parameter query. Ini cocok untuk dashboard dan aplikasi yang memerlukan autentikasi:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx                # Root layout for Intlayer provider and styling
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── client-component-example.content.ts
│   │   ├── ClientComponentExample.tsx
│   │   ├── server-component-example.content.ts
│   │   └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### Konfigurasi

Atur `routing.mode` ke `"search-params"` (mis. `/about?locale=fr`) atau `"no-prefix"`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Your other locales
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // or `no-prefix`
  },
};

export default config;
```

</Tab>
</Tabs>

> File ini juga mengatur pengalihan proxy, nama cookie, lokasi dan ekstensi deklarasi konten Anda, log, dan lainnya. Lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk daftar lengkapnya.

- [Dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

</Step>
<Step number={3} title="Integrasikan Intlayer ke konfigurasi Vite Anda">

Tambahkan plugin `intlayer()` di samping `vinext()` pada `vite.config.ts`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({
      // Locale routing is handled by `src/proxy.ts` (step 7)
      proxy: { ignore: () => true },
    }),
  ],
});
```

> Plugin `intlayer()` membangun dictionary Anda sebelum build dimulai, memantau file konten saat development, dan menyiapkan alias serta optimasi yang dipakai `next-intlayer` di lingkungan RSC, SSR, dan klien.

> `intlayer()` juga menyertakan middleware routing bahasa untuk dev server Vite. Di vinext, `src/proxy.ts` sudah menjalankan tugas itu, baik saat development maupun di runtime produksi, jadi opsi `ignore` mematikan yang milik Vite agar setiap request tidak di-route dua kali.

> Jangan gunakan `withIntlayer()` di `next.config.ts`. vinext membaca `next.config.ts` untuk opsi seperti `redirects`, `rewrites`, dan `headers`, tetapi tidak menjalankan plugin webpack maupun Turbopack.

Jika Anda melakukan deploy ke Cloudflare Workers, pertahankan plugin `cloudflare()` yang dihasilkan oleh `vinext init`:

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm"]}
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import vinext from "vinext";
import { intlayer } from "vite-intlayer";

export default defineConfig({
  plugins: [
    vinext(),
    intlayer({ proxy: { ignore: () => false } }),
    cloudflare({
      viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
    }),
  ],
});
```

</Step>
<Step number={4} title="Tentukan route bahasa dinamis">

<Tabs group="routing-mode">
<Tab label="Dengan path bahasa" value="with-locale-path">

Hapus semua isi `RootLayout` dan ganti dengan kode berikut:

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // You can still wrap the children with other providers, like `next-themes` or `react-query`
  <>{children}</>
);

export default RootLayout;
```

> Dengan membiarkan `RootLayout` kosong, layout bahasa dapat mengatur atribut [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) dan [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) pada tag `<html>`.

Tambahkan layout di direktori `[locale]` Anda:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat={["typescript", "esm"]}
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";
import { IntlayerProvider } from "next-intlayer/server";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
```

> Satu `IntlayerProvider` mencakup kedua sisi pohon: menyediakan bahasa ke Server Components dan memasang provider klien sehingga Client Components menerima bahasa yang sama.

> Segmen `[locale]` menyimpan bahasa: `/en-US/about` diresolusikan ke `en-US`, `/fr/about` ke `fr`. `src/app/page.tsx` yang lama tidak lagi dipakai dan dapat dihapus. Proxy (langkah 7) menyajikan bahasa default di root.

> `generateStaticParams` membuat vinext melakukan prerender setiap halaman untuk setiap bahasa. vinext juga memberlakukan `dynamicParams`, sehingga bahasa yang tidak dikenal mengembalikan 404 saat Anda mengatur `export const dynamicParams = false`.

</Tab>
<Tab label="Tanpa path bahasa" value="without-locale-path">

Tidak ada direktori `[locale]`. Konfigurasikan `src/app/layout.tsx` untuk membaca bahasa dari request dan membungkus aplikasi Anda dengan `IntlayerProvider`:

```tsx fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";

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
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

</Tab>
</Tabs>

</Step>
<Step number={5} title="Deklarasikan konten Anda">

Buat deklarasi konten untuk menyimpan terjemahan Anda:

```tsx fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        id: "Mulai dengan mengedit",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "main": {
        "nodeType": "translation",
        "translation": {
          "id": "Mulai dengan mengedit",
          "en": "Get started by editing",
          "fr": "Commencez par éditer",
          "es": "Comience por editar"
        }
      },
      "pageLink": "src/app/page.tsx"
    }
  }
}
```

> Deklarasi konten dapat berada di mana saja di bawah direktori `contentDir` (secara default `./src`), selama sesuai dengan ekstensi deklarasi konten (secara default `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

- [Dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)

</Step>
<Step number={6} title="Gunakan konten di kode Anda">

Akses dictionary Anda dari komponen mana pun:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type NextPageIntlayer, useIntlayer } from "next-intlayer";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPageIntlayer = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Create related content declaration

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` bersifat isomorfik: kondisi ekspor `react-server`, yang diterapkan vinext pada lingkungan RSC-nya, memberi Server Components implementasi server, sedangkan Client Components mendapat implementasi berbasis context. Panggilan yang sama berfungsi di kedua sisi.

> Untuk memakai konten Anda pada atribut `string`, seperti `alt`, `title`, `href`, atau `aria-label`, baca nilainya:
>
> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Pelajari lebih lanjut di [dokumentasi `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useIntlayer.md).

- [Dokumentasi `useIntlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useIntlayer.md)

> Jika aplikasi Anda sudah ada, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) dan [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) mengubah ribuan komponen dalam satu detik.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [Perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

</Step>
<Step number={7} title="Konfigurasikan proxy untuk deteksi bahasa">

vinext menjalankan `proxy.ts` (dan `middleware.ts`) seperti Next.js 16, saat development maupun produksi, termasuk di Cloudflare Workers. Ekspor proxy Intlayer:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` mendeteksi bahasa pilihan pengguna, mengalihkan ke URL yang sesuai sebagaimana diatur dalam [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md), dan menyimpan bahasa dalam cookie. Proxy ini juga meneruskan bahasa ke `getLocale()` dan hook server, jadi pertahankan meskipun memakai arsitektur tanpa path bahasa.

- [Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

> Untuk merangkai beberapa proxy (misalnya `intlayerProxy` dengan autentikasi), gunakan `multipleProxies`:

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>
<Step number={8} title="Internasionalisasi metadata Anda" isOptional={true}>

vinext mendukung Metadata API. Gunakan `generateMetadata` dengan `getIntlayer` untuk menerjemahkan metadata halaman Anda:

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      id: "Aplikasi vinext saya",
      en: "My vinext app",
      fr: "Mon application vinext",
      es: "Mi aplicación vinext",
    }),
    description: t({
      id: "Aplikasi Next.js yang berjalan di Vite",
      en: "A Next.js app running on Vite",
      fr: "Une application Next.js qui tourne sur Vite",
      es: "Una aplicación Next.js que funciona con Vite",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat={["typescript", "esm"]}
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalPromiseParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Generates an object containing all url for each locale.
   *
   * Example:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Returns
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    ...metadata,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": "/" },
    },
    openGraph: {
      url: localizedUrl,
    },
  };
};

// ... Rest of the code
````

> Fungsi `getIntlayer` yang diimpor dari `intlayer` mengembalikan nilai mentah, siap dipakai untuk objek metadata. Yang dari `next-intlayer` membungkusnya untuk visual editor.

</Step>
<Step number={9} title="Internasionalisasi sitemap.xml dan robots.txt Anda" isOptional={true}>

`sitemap.ts` dan `robots.ts` bekerja seperti di Next.js. Gunakan `getMultilingualUrls` untuk mencantumkan setiap URL terlokalisasi:

```tsx fileName="src/app/sitemap.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { getMultilingualUrls } from "intlayer";
import type { MetadataRoute } from "next";

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: "https://example.com",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com"),
        "x-default": "https://example.com",
      },
    },
  },
  {
    url: "https://example.com/login",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/login"),
        "x-default": "https://example.com/login",
      },
    },
  },
];

export default sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

export default robots;
```

</Step>
<Step number={10} title="Ubah bahasa konten Anda" isOptional={true}>

Gunakan `next/link` untuk menavigasi ke halaman terlokalisasi. vinext mempertahankan navigasi sisi klien dan prefetching, sehingga perpindahan terjadi tanpa reload penuh:

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

export const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
            replace // The browser "back" button returns to the previous page
          >
            <span>
              {/* Locale - e.g. FR */}
              {localeItem}
            </span>
            <span>
              {/* Language in its own Locale - e.g. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Language in current Locale - e.g. Francés with current locale set to Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Language in English - e.g. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
```

> Referensi dokumentasi:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md)
> - [Fungsi `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)
> - [Fungsi `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)
> - [Fungsi `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)

</Step>
<Step number={11} title="Membuat komponen Link terlokalisasi" isOptional={true}>

Komponen `Link` kustom menambahkan awalan bahasa saat ini ke URL internal, sehingga pengguna Prancis yang mengklik `/about` akan tiba di `/fr/about`:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import type { PropsWithChildren, FC } from "react";

/**
 * Checks whether a URL is external (starts with http:// or https://).
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Link that localizes internal URLs with the current locale.
 */
export const Link: FC<PropsWithChildren<NextLinkProps>> = ({
  href,
  children,
  ...props
}) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} {...props}>
      {children}
    </NextLink>
  );
};
```

</Step>
<Step number={12} title="Mendapatkan bahasa saat ini di Server Actions" isOptional={true}>

Panggil `getLocale` dari `next-intlayer/server` di dalam Server Action:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Do something with the locale
};
```

> `getLocale` membaca bahasa yang diatur proxy pada header request, lalu cookie bahasa, lalu header `Accept-Language` browser, dan kembali ke bahasa default.

</Step>
<Step number={13} title="Deploy ke Cloudflare Workers" isOptional={true}>

Intlayer mengompilasi dictionary ke dalam bundle saat build, jadi tidak ada yang membaca file system saat runtime dan aplikasi berjalan apa adanya di workerd. Build dan deploy dengan CLI vinext:

```bash packageManager="npm"
npx @vinext/cloudflare deploy
```

```bash packageManager="pnpm"
pnpm dlx @vinext/cloudflare deploy
```

```bash packageManager="yarn"
yarn dlx @vinext/cloudflare deploy
```

```bash packageManager="bun"
bunx @vinext/cloudflare deploy
```

> Untuk deploy ke tempat lain (Vercel, Netlify, AWS, Node.js), tambahkan plugin Vite [Nitro](https://v3.nitro.build/) di samping `vinext()`, atau atur `output: "standalone"` di `next.config.ts`. Setup Intlayer tidak berubah.

</Step>
<Step number={14} title="Ekstrak konten dari komponen Anda" isOptional={true}>

Pada codebase yang sudah ada, Intlayer menyediakan [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) dan [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk memindahkan string yang di-hardcode ke deklarasi konten.

- [Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [Extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

Aktifkan compiler di `intlayer.config.ts`:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Rest of your config
  compiler: {
    /**
     * Indicates if the compiler should be enabled.
     */
    enabled: true,

    /**
     * Defines the output files path
     */
    output: ({ fileName, extension }) => `./${fileName}${extension}`,

    /**
     * If `true`, the compiler rewrites the component files on disk.
     * If `false`, the transformation stays in the build output only.
     */
    saveComponents: false,

    /**
     * Dictionary key prefix
     */
    dictionaryKeyPrefix: "",
  },
};

export default config;
```

<Tabs>
 <Tab value='Extract command'>

Jalankan extractor untuk mengubah komponen Anda dan mengekstrak kontennya:

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
 <Tab value='Vite compiler'>

Plugin Vite `intlayer()` menyertakan compiler. Setelah `compiler.enabled` diatur, jalankan dev server atau build seperti biasa:

```bash packageManager="npm"
npm run build # Or npm run dev
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

Intlayer menggunakan module augmentation untuk memberi tipe pada key dan nilai konten Anda.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Sertakan tipe yang dihasilkan dalam konfigurasi TypeScript Anda:

```json5 fileName="tsconfig.json"
{
  // ... Your existing TypeScript configurations
  "include": [
    // ... Your existing TypeScript configurations
    ".intlayer/**/*.ts", // Include the auto-generated types
  ],
}
```

### Konfigurasi Git

Abaikan file yang dihasilkan oleh Intlayer:

```plaintext fileName=".gitignore"
# Ignore the files generated by Intlayer
.intlayer
```

### Ekstensi VS Code

Instal **[Ekstensi VS Code Intlayer](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)** resmi untuk autocompletion key, error terjemahan yang hilang, pratinjau inline, dan aksi cepat. Lihat [dokumentasi ekstensi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md).

- [Dokumentasi ekstensi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)

### Langkah Selanjutnya

Tambahkan [visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau eksternalisasikan konten Anda dengan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

- [Visual editor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa itu vinext?">

vinext adalah plugin Vite open source, dikelola oleh Cloudflare, yang mengimplementasikan ulang API publik Next.js: App Router dan Pages Router, React Server Components, Server Actions, `proxy.ts`, route handler, dan modul `next/*`. Kode Next.js Anda berjalan di Vite, dan dapat di-deploy secara native ke Cloudflare Workers atau ke platform lain melalui Nitro.

</Question>
<Question title="Apa yang berubah dibanding setup Next.js?">

Hanya integrasi build. Di Next.js, `withIntlayer()` membungkus `next.config.ts`. Di vinext, plugin `intlayer()` dari `vite-intlayer` ditempatkan di `vite.config.ts`. Provider, hook, `proxy.ts`, metadata, dan kode sitemap tetap identik, sehingga Anda dapat mengikuti [panduan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md) untuk hal-hal yang tidak dibahas di halaman ini.

- [Panduan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)

</Question>
<Question title="Apakah saya memerlukan konfigurasi i18n Next.js atau plugin SWC?">

Tidak. Field `i18n` di `next.config.ts` hanya mencakup awalan bahasa Pages Router di vinext, dan Intlayer melakukan routing-nya sendiri melalui `proxy.ts`. Plugin `@intlayer/swc` juga tidak diperlukan: plugin Vite sudah mengganti panggilan `useIntlayer` sehingga setiap halaman hanya memuat dictionary yang dipakainya. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

- [Optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)

</Question>
<Question title="Apakah saya memerlukan `intlayer watch` saat development?">

Tidak. Plugin Vite `intlayer()` menjalankan content watcher bersama `vite dev`, dan perubahan konten hanya memperbarui komponen yang membaca dictionary yang berubah secara hot update.

</Question>
<Question title="Bisakah saya bermigrasi dari `next-intl` atau `i18next` tanpa menulis ulang komponen?">

Bisa. Ikuti [panduan migrasi dari next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md) atau [panduan migrasi dari i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md), atau pertahankan API Anda saat ini dengan [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md), yang menyediakan API `next-intl`, `react-i18next`, dan `react-intl` dengan dictionary Intlayer.

- [Panduan migrasi dari next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md)
- [Panduan migrasi dari i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md)
- [Adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Question>
<Question title="Apakah saya harus menaruh bahasa di URL, seperti /fr/about?">

Tidak. `routing.mode` menerima:

- `"prefix-no-default"` (default): `/about` untuk bahasa default, `/fr/about` untuk bahasa lainnya.
- `"prefix-all"`: setiap bahasa diberi awalan, `/en/about` dan `/fr/about`.
- `"no-prefix"`: tanpa bahasa di path, ditentukan dari cookie atau header.
- `"search-params"`: `/about?locale=fr`.

Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) dan arsitektur tanpa path bahasa pada langkah 2.

- [Referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

</Question>
<Question title="Bagaimana cara menerjemahkan aplikasi saya secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. CLI mendeteksi terjemahan yang hilang dan mengisinya dengan LLM pilihan Anda, menggunakan penyedia dan API key Anda sendiri. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

- [Perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)
- [Integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md)

</Question>
<Question title="Bagaimana cara menemukan terjemahan yang hilang sebelum rilis?">

Jalankan `npx intlayer test` di CI. Build akan gagal jika sebuah bahasa yang dideklarasikan kekurangan konten. [Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md) menampilkan error yang sama saat Anda mengetik, dan [plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md) menandai string yang di-hardcode.

- [Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)
- [Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)

</Question>
<Question title="Apakah Intlayer gratis dan open source?">

Ya. Intlayer open source di bawah lisensi Apache 2.0, dan library, CLI, visual editor, serta compiler gratis digunakan, termasuk untuk keperluan komersial. CMS terkelola adalah layanan berbayar opsional, dan juga dapat [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

- [Di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)

</Question>

</FAQ>
