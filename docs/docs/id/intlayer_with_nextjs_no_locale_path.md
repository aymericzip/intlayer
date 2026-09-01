---
createdAt: 2026-01-10
updatedAt: 2026-06-23
title: "Next.js 16 i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Next.js 16 multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js 16
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - no-locale-path
applicationTemplate: https://github.com/aymericzip/intlayer-next-no-lolale-path-template
youtubeVideo: https://www.youtube.com/watch?v=e_PPG7PTqGU
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.0.0
    date: 2026-01-10
    changes: "Rilis awal"
author: aymericzip
---

# Terjemahkan situs Next.js 16 Anda (tanpa [locale] di jalur halaman) menggunakan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="Solusi i18n terbaik untuk Next.js? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=https://intlayer.org&amp;controls=0&amp;rel=1"/>

  </Tab>
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-next-16-no-locale-path-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) di GitHub.

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `next-intl` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>
<Accordion header="Cakupan lengkap Next.js">

Intlayer dioptimalkan untuk bekerja dengan **Komponen Server** untuk rendering yang efisien dan sepenuhnya kompatibel dengan [**Turbopack**](https://nextjs.org/docs/architecture/turbopack). Itu tidak memblokir rendering statis dan menawarkan middleware serta semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

> Intlayer kompatibel dengan Next.js 12, 13, 14, 15, dan 16. Jika Anda menggunakan Next.js Pages Router, Anda dapat merujuk ke [panduan] ini(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_page_router.md).
> Perutean lokal berguna untuk SEO, ukuran bundle, dan kinerja. Jika Anda tidak membutuhkannya, Anda dapat merujuk ke [panduan] ini(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_no_locale_path.md).
> Untuk Next.js 12, 13, 14, dan 15 dengan App Router, lihat [panduan] ini(https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_14.md).

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

## Panduan Langkah demi Langkah untuk Mengatur Intlayer di Aplikasi Next.js

<Steps>

<Step number={1} title="Instal Dependensi">

Pasang paket yang diperlukan menggunakan npm:

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
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

```bash packageManager="bun"
bun add intlayer next-intlayer
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **next-intlayer**

Paket yang mengintegrasikan Intlayer dengan Next.js. Paket ini menyediakan context providers dan hooks untuk internasionalisasi Next.js. Selain itu, paket ini menyertakan plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta proxy untuk mendeteksi locale pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

</Step>

<Step number={2} title="Konfigurasikan Proyek Anda">

Berikut adalah struktur akhir yang akan kita buat:

```bash
.
├── src
│   ├── app
│   │   ├── layout.tsx
│   │   ├── page.content.ts
│   │   └── page.tsx
│   ├── components
│   │   ├── clientComponentExample
│   │   │   ├── client-component-example.content.ts
│   │   │   └── ClientComponentExample.tsx
│   │   ├── localeSwitcher
│   │   │   ├── localeSwitcher.content.ts
│   │   │   └── LocaleSwitcher.tsx
│   │   └── serverComponentExample
│   │       ├── server-component-example.content.ts
│   │       └── ServerComponentExample.tsx
│   └── proxy.ts
├── intlayer.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

> Jika Anda tidak ingin routing locale, intlayer dapat digunakan sebagai provider / hook sederhana. Lihat [panduan ini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/intlayer_with_nextjs_no_locale_path.md) untuk detail lebih lanjut.

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Lokal lainnya
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // atau `no-prefix` - Berguna untuk deteksi middleware
  },
};

export default config;
```

> Melalui berkas konfigurasi ini, Anda dapat mengatur URL terlokalisasi, pengalihan proxy, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer ke Konfigurasi Next.js Anda">

Konfigurasikan setup Next.js Anda untuk menggunakan Intlayer:

```typescript fileName="next.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {/* opsi konfigurasi di sini */};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` digunakan untuk mengintegrasikan Intlayer dengan Next.js. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file-file tersebut dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer dalam lingkungan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa dan memastikan kompatibilitas dengan server components.

> Fungsi `withIntlayer()` adalah fungsi promise. Fungsi ini memungkinkan Anda untuk menyiapkan kamus intlayer sebelum build dimulai. Jika Anda ingin menggunakannya dengan plugin lain, Anda dapat menungguinya. Contoh:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Jika Anda ingin menggunakannya secara sinkron, Anda dapat menggunakan fungsi `withIntlayerSync()`. Contoh:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

> Fungsi `withIntlayer()` adalah fungsi yang mengembalikan Promise. Fungsi ini memungkinkan mempersiapkan kamus intlayer sebelum proses build dimulai. Jika Anda ingin menggunakannya bersama plugin lain, Anda dapat melakukan await padanya. Contoh:
>
> ```ts
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Jika Anda ingin menggunakannya secara sinkron, Anda dapat menggunakan fungsi `withIntlayerSync()`. Contoh:
>
> ```ts
> const nextConfig = withIntlayerSync(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```
>
> Intlayer secara otomatis mendeteksi apakah proyek Anda menggunakan **webpack** atau **Turbopack** berdasarkan flag baris perintah `--webpack`, `--turbo`, atau `--turbopack`, serta **versi Next.js** Anda saat ini.
>
> Sejak `next>=16`, jika Anda menggunakan **Rspack**, Anda harus secara eksplisit memaksa Intlayer untuk menggunakan konfigurasi webpack dengan menonaktifkan Turbopack:
>
> ```ts
> withRspack(withIntlayer(nextConfig, { enableTurbopack: false }));
> ```

</Step>

<Step number={4} title="Definisikan Rute Locale Dinamis">

Hapus semua isi `RootLayout` dan ganti dengan kode berikut:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {5} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale, IntlayerProvider } from "next-intlayer/server";
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
      <body>
        <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

> Satu `IntlayerProvider` mencakup kedua bagian dari tree: ini memberikan seed pada konteks server yang di-scope request yang dibaca oleh server hooks, dan memasang client provider sehingga client components menerima locale yang sama.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {3} fileName="src/app/layout.tsx" codeFormat={["typescript", "esm"]}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerProvider, LocalPromiseParams } from "next-intlayer";
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
      <body>
        <IntlayerProvider defaultLocale={locale}>{children}</IntlayerProvider>
      </body>
    </html>
  );
};

export default RootLayout;
```

 </Tab>
</Tabs>

</Step>

<Step number={5} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";
import { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      id: "Judul Proyek Saya",
      en: "My Project Title",
      fr: "Le Titre de mon Projet",
      es: "El Título de mi Proyecto",
    }),

    description: t({
      id: "Temukan platform inovatif kami yang dirancang untuk menyederhanakan alur kerja Anda dan meningkatkan produktivitas.",
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      id: ["inovasi", "produktivitas", "alur kerja", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      id: ["inovasi", "produktivitas", "alur kerja", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
```

```json fileName="src/app/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
        "id": "Judul Proyek Saya",
        "en": "My Project Title",
        "fr": "Le Titre de mon Projet",
        "es": "El Título de mi Proyecto"
      }
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "id": "Temukan platform inovatif kami yang dirancang untuk menyederhanakan alur kerja Anda dan meningkatkan produktivitas.",
        "en": "Discover our innovative platform designed to streamline your workflow and boost productivity.",
        "fr": "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
        "es": "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad."
      }
    },
    "keywords": {
      "nodeType": "translation",
      "translation": {
        "id": ["inovasi", "produktivitas", "alur kerja", "SaaS"],
        "en": ["innovation", "productivity", "workflow", "SaaS"],
        "fr": ["innovation", "productivité", "flux de travail", "SaaS"],
        "es": ["innovación", "productividad", "flujo de trabajo", "SaaS"]
      }
    }
  }
}
```

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

```json fileName="src/app/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
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
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda sepanjang file tersebut dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

</Step>

<Step number={6} title="Manfaatkan Konten dalam Kode Anda">

Akses kamus konten Anda di seluruh aplikasi:

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { useIntlayer } from "next-intlayer";
import { NextPage } from "next";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = () => (
  <>
    <PageContent />
    <ServerComponentExample />
    <ClientComponentExample />
  </>
);

export default Page;
```

- **`IntlayerProvider`** dipasang sekali, dalam root layout. Ini menyediakan locale ke kedua komponen server dan client, sehingga halaman tidak lagi membungkus diri mereka sendiri.
- Tanpa segmen path `[locale]`, locale selalu berasal dari request — header `x-intlayer-locale` yang ditetapkan oleh proxy Intlayer, kemudian cookie locale — yang dibaca oleh server hooks mereka sendiri ketika provider belum dijalankan.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx fileName="src/app/page.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import {
  IntlayerServerProvider,
  useIntlayer,
  getLocale,
} from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page: NextPage = async () => {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
      <ServerComponentExample />
      <ClientComponentExample />
    </IntlayerServerProvider>
  );
};

export default Page;
```

- **`IntlayerClientProvider`** digunakan untuk menyediakan locale ke komponen sisi-klien. Dapat diletakkan di parent component mana pun, termasuk layout. Namun, menempatkannya di layout direkomendasikan karena Next.js membagikan kode layout di seluruh halaman, sehingga lebih efisien. Dengan menggunakan `IntlayerClientProvider` di layout, Anda menghindari menginisialisasi ulang untuk setiap halaman, meningkatkan performa dan menjaga konteks lokalisasi tetap konsisten di seluruh aplikasi Anda.
- **`IntlayerServerProvider`** digunakan untuk menyediakan locale kepada komponen anak di server. Tidak dapat ditempatkan di layout.

  > Layout dan halaman tidak dapat berbagi server context yang sama karena sistem server context didasarkan pada penyimpanan data per-request (melalui mekanisme [React's cache](https://react.dev/reference/react/cache)), yang menyebabkan setiap "context" dibuat ulang untuk segmen aplikasi yang berbeda. Menempatkan provider di layout bersama akan merusak isolasi ini, sehingga mencegah propagasi nilai server context yang benar ke komponen server Anda.

 </Tab>
</Tabs>

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

<Tabs>
 <Tab label='Intlayer >=9.4' value='>=9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> `next-intlayer` adalah isomorphic import path: kondisi export `react-server` memberikan server components implementasi ambient-locale, sementara client components mendapatkan yang context-backed. Panggilan yang sama berfungsi di kedua sisi.

 </Tab>
 <Tab label='Intlayer <9.4' value='<9.4'>

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx" codeFormat={["typescript", "esm"]}
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

export const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

 </Tab>
</Tabs>

> Jika Anda ingin menggunakan konten Anda dalam atribut bertipe `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda harus memanggil nilai fungsi tersebut, seperti:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useIntlayer.md).

</Step>

<Step number={7} title="Konfigurasikan Proxy untuk Deteksi Locale" isOptional={true}>

Atur proxy untuk mendeteksi locale preferensi pengguna:

```typescript fileName="src/proxy.ts" codeFormat={["typescript", "esm", "commonjs"]}
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

> `intlayerProxy` digunakan untuk mendeteksi locale pilihan pengguna dan mengarahkan mereka ke URL yang sesuai seperti ditentukan dalam [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md). Selain itu, ini memungkinkan penyimpanan locale pilihan pengguna dalam cookie.

> Sejak Intlayer v9, middleware ini menghormati opsi `routing.enableProxy` (`true` secara default). Atur `routing.enableProxy: false` di konfigurasi Anda untuk mengubahnya menjadi pass-through tanpa menghapus file ini. Lihat [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md).

> Jika Anda perlu menggabungkan beberapa proxy bersama-sama (misalnya, `intlayerProxy` dengan otentikasi atau proxy kustom), Intlayer kini menyediakan helper yang disebut `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

</Step>

<Step number={8} title="Ubah bahasa konten Anda" isOptional={true}>

Untuk mengubah bahasa konten Anda di Next.js, cara yang direkomendasikan adalah menggunakan komponen `Link` untuk mengarahkan pengguna ke halaman yang sesuai dengan lokal. Komponen `Link` memungkinkan prefetching halaman, yang membantu menghindari reload halaman penuh.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale();

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
              {/* Kode locale - mis. FR */}
              {localeItem}
            </span>
            <span>
              {/* Nama bahasa dalam locale-nya sendiri - mis. Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Nama bahasa dalam locale saat ini - mis. Francés ketika locale saat ini diset ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Nama bahasa dalam Bahasa Inggris - mis. French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> Cara alternatif adalah menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini tidak akan memungkinkan prefetching halaman. Lihat dokumentasi hook [`useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md) untuk detail lebih lanjut.

> Referensi dokumentasi:
>
> - [hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md)
> - [hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)
> - [hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` atribut](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` atribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` atribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` atribut](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

</Step>

<Step number={9} title="Dapatkan locale saat ini di Server Actions" isOptional={true}>

Jika Anda membutuhkan locale aktif di dalam Server Action (mis. untuk melokalisasi email atau menjalankan logika yang peka terhadap locale), panggil `getLocale` dari `next-intlayer/server`:

```tsx fileName="src/app/actions/getLocale.ts" codeFormat="typescript"
"use server";

import { getLocale } from "next-intlayer/server";

export const myServerAction = async () => {
  const locale = await getLocale();

  // Lakukan sesuatu dengan locale
};
```

> Fungsi `getLocale` mengikuti strategi bertingkat untuk menentukan locale pengguna:
>
> 1. Pertama, ia memeriksa header permintaan untuk nilai locale yang mungkin telah disetel oleh proxy
> 2. Jika tidak ada locale yang ditemukan di header, ia mencari locale yang disimpan dalam cookie
> 3. Jika tidak ada cookie yang ditemukan, ia mencoba mendeteksi bahasa pilihan pengguna dari pengaturan browser mereka
> 4. Sebagai upaya terakhir, ia kembali ke locale default yang dikonfigurasi aplikasi
>
> Ini memastikan lokal yang paling sesuai dipilih berdasarkan konteks yang tersedia.

</Step>

<Step number={10} title="Optimize ukuran bundle Anda" isOptional={true}>

Saat menggunakan `next-intlayer`, kamus disertakan dalam bundle untuk setiap halaman secara default. Untuk mengoptimalkan ukuran bundle, Intlayer menyediakan plugin SWC opsional yang secara cerdas menggantikan pemanggilan `useIntlayer` menggunakan makro. Ini memastikan kamus hanya disertakan dalam bundle untuk halaman yang benar-benar menggunakannya.

Untuk mengaktifkan optimisasi ini, pasang paket `@intlayer/swc`. Setelah terpasang, `next-intlayer` akan secara otomatis mendeteksi dan menggunakan plugin tersebut:

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

> Catatan: Optimisasi ini hanya tersedia untuk Next.js 13 ke atas.

> Catatan: Paket ini tidak terpasang secara default karena plugin SWC masih eksperimental pada Next.js. Hal ini dapat berubah di masa depan.

> Catatan: Jika Anda mengatur opsi sebagai `importMode: 'dynamic'` atau `importMode: 'fetch'`, itu akan bergantung pada Suspense, jadi Anda harus membungkus pemanggilan `useIntlayer` Anda dalam boundary `Suspense`. Artinya, Anda tidak akan dapat menggunakan `useIntlayer` langsung di tingkat atas komponen Page / Layout Anda.
> </Step>

</Steps>

### Pantau perubahan kamus pada Turbopack

Ketika menggunakan Turbopack sebagai server pengembangan dengan perintah `next dev`, perubahan kamus tidak akan terdeteksi secara otomatis secara default.

Keterbatasan ini terjadi karena Turbopack tidak dapat menjalankan plugin webpack secara paralel untuk memantau perubahan pada file konten Anda. Untuk mengatasi hal ini, Anda perlu menggunakan perintah `intlayer watch` untuk menjalankan server pengembangan dan watcher build Intlayer secara bersamaan.

```json5 fileName="package.json"
{
  // ... Konfigurasi package.json Anda yang sudah ada
  "scripts": {
    // ... Konfigurasi skrip yang sudah ada
    "dev": "intlayer watch --with 'next dev'",
  },
}
```

> Jika Anda menggunakan next-intlayer@<=6.x.x, Anda perlu mempertahankan flag `--turbopack` agar aplikasi Next.js 16 bekerja dengan benar menggunakan Turbopack. Kami merekomendasikan menggunakan next-intlayer@>=7.x.x untuk menghindari keterbatasan ini.

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat TypeScript dan membuat codebase Anda lebih kuat.

![Pelengkapan Otomatis](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kesalahan terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan berkas yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari meng-commit berkas-berkas tersebut ke repository Git Anda.

Untuk melakukan ini, Anda bisa menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan berkas yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat memasang resmi **Ekstensi Intlayer untuk VS Code**.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan secara real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat dokumentasi [Intlayer VS Code Extension](https://intlayer.org/doc/vs-code-extension).

### Lebih Lanjut

Untuk langkah lebih lanjut, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Next.js?">

Bidang `i18n` dari `next.config.js` tidak berlaku untuk App Router, sehingga lapisan pelokalan selalu merupakan pilihan pustaka:

- **`next-intl`**, **`next-i18next` / `i18next`** dan **`react-intl`**: Katalog JSON atau ICU yang dimuat per namespace.
- **`Lingui`**: Didorong oleh ekstraksi, dengan pesan ICU yang dikompilasi pada saat build.
- **`Intlayer`**: Solusi paling canggih. Konten dideklarasikan di mana saja di basis kode Anda ([di sebelah setiap komponen atau terpusat](https://intlayer.org/blog/per-component-vs-centralized-i18n)) dan dikompilasi per komponen, bertipe penuh, dengan terjemahan AI, editor visual, dan CMS.

Panduan ini mencakup penyiapan tanpa locale di path. Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md) dan [tolok ukur i18n Next.js](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/nextjs.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle Next.js saya?">

Jauh lebih sedikit daripada solusi berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Komponen server menyelesaikan konten di server, dan kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen. [Kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale, mengurangi ukuran bundle hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

</Question>

<Question title="Bisakah saya bermigrasi dari next-intl, next-i18next atau i18next tanpa menulis ulang komponen saya?">

Ya, ada dua jalur. Anda dapat memigrasikan konten secara bertahap dengan [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md) atau [next-intl](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_next-intl_to_intlayer.md). Atau Anda dapat mempertahankan API saat ini sepenuhnya: [adapter kompatibilitas](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) mengekspos API yang sama persis dengan `next-intl` dan `i18next` tetapi ditenagai oleh kamus Intlayer.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca komponen Anda, menarik string yang ditampilkan ke pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu.

Untuk pipeline otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time: memindai sumber JSX, TSX, Vue, dan Svelte Anda pada setiap perubahan, menghasilkan kamus dan menjaganya tetap sinkron melalui hot module replacement, sehingga tidak ada kunci yang perlu dikelola secara manual.

Dua batasan perlu diketahui sebelum mengaktifkan compiler. Ini bekerja melalui analisis statis, sehingga string yang hanya ada saat runtime, seperti kode kesalahan API atau field CMS, tetap berada di luar jangkauan. Dan ini harus membedakan teks yang ditampilkan ke pengguna dari logika aplikasi seperti `className="active"` atau kode status, yang memerlukan beberapa anotasi di basis kode besar. [Perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) menghindari keduanya dengan menjaga Anda tetap memegang kendali.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Mengapa saya ingin menyajikan aplikasi saya tanpa locale di URL?">

Karena locale tidak selalu menjadi bagian dari identitas halaman. Dasbor terotentikasi, alat internal, atau aplikasi di balik login tidak memiliki alasan untuk mengekspos `/fr/` di setiap URL: bahasa adalah preferensi pengguna, bukan dokumen yang berbeda. Menghapus awalan juga menjaga rute, tautan, dan analitik Anda pada satu set jalur.

</Question>

<Question title="Apa konsekuensi SEO dari tidak adanya locale di URL?">

Konsekuensinya nyata, jadi pilihlah dengan sengaja. Tanpa URL yang berbeda per bahasa, mesin pencari tidak memiliki halaman terpisah untuk diindeks untuk setiap locale, `hreflang` tidak memiliki apa pun untuk dituju, dan perayap hanya melihat bahasa yang disajikan oleh deteksi default Anda. Itu tidak masalah untuk konten di balik login, yang toh tidak diindeks, dan kurang cocok untuk situs pemasaran publik atau dokumentasi. Jika lalu lintas organik per bahasa penting, gunakan penyiapan berawalan di [panduan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md) sebagai gantinya.

</Question>

<Question title="Apa perbedaan antara mode `no-prefix` dan `search-params`?">

`"no-prefix"` menjaga locale sepenuhnya di luar URL dan menyelesaikannya dari cookie, header, atau domain, sehingga setiap bahasa berbagi satu alamat. `"search-params"` menempatkannya di string kueri sebagai `/dashboard?locale=fr`, yang tetap memberi setiap bahasa URL berbeda yang dapat ditautkan dan di-bookmark tanpa mengubah pohon rute Anda. Pilih `"search-params"` saat Anda menginginkan tautan yang dapat dibagikan per bahasa.

</Question>

<Question title="Lalu bagaimana locale dideteksi?">

Dari sumber yang tercantum dalam `routing.storage`, secara default cookie terlebih dahulu lalu header `Accept-Language`, dan kembali ke locale default Anda. Langkah 7 menambahkan proxy yang menerapkannya. Bahasa yang dipilih pengguna secara eksplisit akan dipertahankan, sehingga tetap ada pada kunjungan berikutnya. Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Question>

<Question title="Bisakah saya memetakan setiap bahasa ke domainnya sendiri?">

Ya, dan ini adalah opsi yang perlu dipertimbangkan saat Anda menghapus awalan untuk alasan estetika tetapi tetap menginginkan SEO. `routing.domains` memetakan locale ke nama host, sehingga domain mengidentifikasi bahasa, tidak ada awalan yang ditambahkan ke path, dan setiap bahasa mendapatkan URL yang dapat diindeks yang dapat dituju oleh `hreflang`.

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
