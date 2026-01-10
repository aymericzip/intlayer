---
createdAt: 2026-01-10
updatedAt: 2026-01-10
title: Cara menerjemahkan aplikasi Next.js 16 Anda (tanpa [locale] di path halaman) – panduan i18n 2026
description: Pelajari cara membuat situs Next.js 16 Anda menjadi multibahasa tanpa [locale] di path halaman. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
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
  - version: 1.0.0
    date: 2026-01-10
    changes: Rilis awal
---

# Terjemahkan situs Next.js 16 Anda (tanpa [locale] di jalur halaman) menggunakan Intlayer | Internasionalisasi (i18n)

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Solusi i18n terbaik untuk Next.js? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/e_PPG7PTqGU?autoplay=0&amp;origin=http://intlayer.org&amp;controls=0&amp;rel=1"/>

  </TabItem>
  <TabItem label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-16-no-locale-path-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Lihat [Templat Aplikasi](https://github.com/aymericzip/intlayer-next-no-lolale-path-template) di GitHub.

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah library internasionalisasi (i18n) yang inovatif dan open-source, dirancang untuk menyederhanakan dukungan multi-bahasa dalam aplikasi web modern. Intlayer terintegrasi dengan mulus ke framework **Next.js 16** terbaru, termasuk **App Router** yang kuat. Library ini dioptimalkan untuk bekerja dengan **Server Components** agar rendering lebih efisien dan sepenuhnya kompatibel dengan [**Turbopack**](https://nextjs.org/docs/architecture/turbopack).

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Mengakses terjemahan di komponen client-side dan server-side**.
- **Menjamin dukungan TypeScript** dengan tipe yang dihasilkan otomatis, meningkatkan autocompletion dan deteksi error.
- **Manfaatkan fitur canggih**, seperti deteksi locale dinamis dan pergantian bahasa.

> Intlayer kompatibel dengan Next.js 12, 13, 14, dan 16. Jika Anda menggunakan Next.js Page Router, Anda dapat merujuk ke [panduan ini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_page_router.md). Untuk Next.js 12, 13, 14 dengan App Router, lihat [panduan ini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_14.md).

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer di Aplikasi Next.js

### Langkah 1: Instal Dependensi

Pasang paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer next-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer next-intlayer
bunx intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **next-intlayer**

Paket yang mengintegrasikan Intlayer dengan Next.js. Paket ini menyediakan context providers dan hooks untuk internasionalisasi Next.js. Selain itu, paket ini menyertakan plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta proxy untuk mendeteksi locale pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasikan Proyek Anda

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

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
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

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
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

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Locales lain Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "search-params", // atau `no-prefix` - Berguna untuk deteksi middleware
  },
};

module.exports = config;
```

> Melalui berkas konfigurasi ini, Anda dapat mengatur URL terlokalisasi, pengalihan proxy, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer ke Konfigurasi Next.js Anda

Konfigurasikan setup Next.js Anda untuk menggunakan Intlayer:

```typescript fileName="next.config.ts" codeFormat="typescript"
import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  /* opsi konfigurasi di sini */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.mjs" codeFormat="esm"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opsi konfigurasi di sini */
};

export default withIntlayer(nextConfig);
```

```typescript fileName="next.config.cjs" codeFormat="commonjs"
const { withIntlayer } = require("next-intlayer/server");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* opsi konfigurasi di sini */
};

module.exports = withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` digunakan untuk mengintegrasikan Intlayer dengan Next.js. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file-file tersebut dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer dalam lingkungan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa dan memastikan kompatibilitas dengan server components.

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

### Langkah 4: Definisikan Rute Locale Dinamis

Hapus semua isi `RootLayout` dan ganti dengan kode berikut:

```tsx {3} fileName="src/app/layout.tsx" codeFormat="typescript"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { IntlayerClientProvider, LocalPromiseParams } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;
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
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {3} fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";
import { IntlayerClientProvider } from "next-intlayer";
import { getHTMLTextDir, getIntlayer } from "intlayer";
import { getLocale } from "next-intlayer/server";
export { generateStaticParams } from "next-intlayer";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

export default RootLayout;
```

```jsx {1,8} fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");
const { IntlayerClientProvider } = require("next-intlayer");
const { getHTMLTextDir, getIntlayer } = require("intlayer");
const { getLocale } = require("next-intlayer/server");
const { generateStaticParams } = require("next-intlayer");

const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { title, description, keywords } = getIntlayer("metadata", locale);

  return {
    title,
    description,
    keywords,
  };
};

const RootLayout = async ({ children }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={getHTMLTextDir(locale)}>
      <IntlayerClientProvider defaultLocale={locale}>
        <body>{children}</body>
      </IntlayerClientProvider>
    </html>
  );
};

module.exports = {
  default: RootLayout,
  generateStaticParams,
  generateMetadata,
};
```

### Langkah 5: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app/metadata.content.ts" contentDeclarationFormat="typescript"
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

```tsx fileName="src/app/metadata.content.mjs" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
      id: "Temukan platform inovatif kami yang dirancang untuk menyederhanakan alur kerja Anda dan meningkatkan produktivitas.",
      fr: "Découvrez notre plateforme innovante conçue pour simplifier votre flux de travail et booster votre productivité.",
      es: "Descubra nuestra plataforma innovadora diseñada para simplificar su flujo de trabajo y aumentar su productividad.",
    }),

    keywords: t({
      id: ["inovasi", "produktivitas", "alur kerja", "SaaS"],
      en: ["innovation", "productivity", "workflow", "SaaS"],
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
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
      fr: ["innovation", "productivité", "flux de travail", "SaaS"],
      es: ["innovación", "productividad", "flujo de trabajo", "SaaS"],
    }),
  },
};

module.exports = metadataContent;
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

```tsx fileName="src/app/page.content.ts" contentDeclarationFormat="typescript"
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

```javascript fileName="src/app/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** Kumpulan konten halaman.
 * @type {import('intlayer').Dictionary}
 */
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
};

export default pageContent;
```

```javascript fileName="src/app/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** Kumpulan konten halaman.
 * @type {import('intlayer').Dictionary}
 */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        id: "Mulai dengan mengedit",
        en: "Get started by editing",
        fr: "Commencez par éditer",
        id: "Mulai dengan mengedit",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
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

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda sepanjang file tersebut dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 6: Manfaatkan Konten dalam Kode Anda

Akses kamus konten Anda di seluruh aplikasi:

```tsx fileName="src/app/page.tsx" codeFormat="typescript"
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

```jsx fileName="src/app/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";
import { getLocale } from "intlayer";
import { headers, cookies } from "next/headers";
import { NextPage } from "next";

const Page: NextPage = async () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
    </>
  );
};

const Page = async () => {

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

```jsx fileName="src/app/page.csx" codeFormat="commonjs"
import { ClientComponentExample } from "@components/clientComponentExample/ClientComponentExample";
import { ServerComponentExample } from "@components/serverComponentExample/ServerComponentExample";
import { IntlayerServerProvider, useIntlayer, getLocale } from "next-intlayer/server";
import { NextPage } from "next";
import { headers, cookies } from "next/headers";

const Page: NextPage = async () => {
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
```

- **`IntlayerClientProvider`** digunakan untuk menyediakan locale ke komponen sisi-klien. Dapat diletakkan di parent component mana pun, termasuk layout. Namun, menempatkannya di layout direkomendasikan karena Next.js membagikan kode layout di seluruh halaman, sehingga lebih efisien. Dengan menggunakan `IntlayerClientProvider` di layout, Anda menghindari menginisialisasi ulang untuk setiap halaman, meningkatkan performa dan menjaga konteks lokalisasi tetap konsisten di seluruh aplikasi Anda.
- **`IntlayerServerProvider`** digunakan untuk menyediakan locale kepada komponen anak di server. Tidak dapat ditempatkan di layout.

  > Layout dan halaman tidak dapat berbagi server context yang sama karena sistem server context didasarkan pada penyimpanan data per-request (melalui mekanisme [React's cache](https://react.dev/reference/react/cache)), yang menyebabkan setiap "context" dibuat ulang untuk segmen aplikasi yang berbeda. Menempatkan provider di layout bersama akan merusak isolasi ini, sehingga mencegah propagasi nilai server context yang benar ke komponen server Anda.

```tsx {4,7} fileName="src/components/clientComponentExample/ClientComponentExample.tsx" codeFormat="typescript"
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

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/clientComponentExample/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/serverComponentExample/ServerComponentExample.tsx"  codeFormat="typescript"
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

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/serverComponentExample/ServerComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer/server");

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Buat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Jika Anda ingin menggunakan konten Anda dalam atribut bertipe `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda harus memanggil nilai fungsi tersebut, seperti:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useIntlayer.md).

### (Opsional) Langkah 7: Konfigurasikan Proxy untuk Deteksi Locale

Atur proxy untuk mendeteksi locale preferensi pengguna:

```typescript fileName="src/proxy.ts" codeFormat="typescript"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.mjs" codeFormat="esm"
export { intlayerProxy as proxy } from "next-intlayer/proxy";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/proxy.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/proxy");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { proxy: intlayerProxy, config };
```

> `intlayerProxy` digunakan untuk mendeteksi locale pilihan pengguna dan mengarahkan mereka ke URL yang sesuai seperti ditentukan dalam [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md). Selain itu, ini memungkinkan penyimpanan locale pilihan pengguna dalam cookie.

> Jika Anda perlu menggabungkan beberapa proxy bersama-sama (misalnya, `intlayerProxy` dengan otentikasi atau proxy kustom), Intlayer kini menyediakan helper yang disebut `multipleProxies`.

```ts
import { multipleProxies, intlayerProxy } from "next-intlayer/proxy";
import { customProxy } from "@utils/customProxy";

export const proxy = multipleProxies([intlayerProxy, customProxy]);
```

### (Opsional) Langkah 8: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda di Next.js, cara yang direkomendasikan adalah menggunakan komponen `Link` untuk mengarahkan pengguna ke halaman yang sesuai dengan lokal. Komponen `Link` memungkinkan prefetching halaman, yang membantu menghindari reload halaman penuh.

```tsx fileName="src/components/localeSwitcher/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher: FC = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import { Locales, getHTMLTextDir, getLocaleName } from "intlayer";
import { useLocale } from "next-intlayer";

export const LocaleSwitcher = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onChange: () => window.location.reload(),
  });

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
              {/* Locale - contohnya FR */}
              {localeItem}
            </span>
            <span>
              {/* Nama bahasa dalam Locale-nya sendiri - contohnya Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Nama bahasa dalam Locale saat ini - contohnya Francés ketika locale saat ini disetel ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Nama bahasa dalam Bahasa Inggris - contohnya French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/localeSwitcher/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const { Locales, getHTMLTextDir, getLocaleName } = require("intlayer");
const { useLocale } = require("next-intlayer");

export const LocaleSwitcher = () => {
  const path
  const { locale availableLocales, setLocale } = useLocale({
       onChange: ()=> window.location.reload(),
  });

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
              {/* Locale - contoh: FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam locale-nya sendiri - contoh: Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam locale saat ini - contoh: Francés ketika locale saat ini diatur ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam bahasa Inggris - contoh: French */}
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

### (Opsional) Langkah 9: Dapatkan locale saat ini di Server Actions

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

### (Opsional) Langkah 10: Optmize ukuran bundle Anda

Saat menggunakan `next-intlayer`, kamus disertakan dalam bundle untuk setiap halaman secara default. Untuk mengoptimalkan ukuran bundle, Intlayer menyediakan plugin SWC opsional yang secara cerdas menggantikan pemanggilan `useIntlayer` menggunakan makro. Ini memastikan kamus hanya disertakan dalam bundle untuk halaman yang benar-benar menggunakannya.

Untuk mengaktifkan optimisasi ini, pasang paket `@intlayer/swc`. Setelah terpasang, `next-intlayer` akan secara otomatis mendeteksi dan menggunakan plugin tersebut:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add @intlayer/swc --dev
bunx intlayer init
```

> Catatan: Optimisasi ini hanya tersedia untuk Next.js 13 ke atas.

> Catatan: Paket ini tidak terpasang secara default karena plugin SWC masih eksperimental pada Next.js. Hal ini dapat berubah di masa depan.

> Catatan: Jika Anda mengatur opsi sebagai `importMode: 'dynamic'` atau `importMode: 'live'`, itu akan bergantung pada Suspense, jadi Anda harus membungkus pemanggilan `useIntlayer` Anda dalam boundary `Suspense`. Artinya, Anda tidak akan dapat menggunakan `useIntlayer` langsung di tingkat atas komponen Page / Layout Anda.

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
