---
createdAt: 2024-12-07
updatedAt: 2025-06-29
title: Cara menerjemahkan aplikasi Next.js dan Page Router Anda – panduan i18n 2025
description: Temukan cara membuat situs web Next.js Anda yang menggunakan Page Router menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Page Router
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - next-with-page-router
history:
  - version: 5.6.0
    date: 2025-07-06
    changes: Mengubah fungsi `withIntlayer()` menjadi fungsi berbasis promise
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Next.js dan Page Router Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) sumber terbuka yang inovatif, dirancang untuk mempermudah dukungan multibahasa dalam aplikasi web modern. Intlayer terintegrasi dengan mulus dengan kerangka kerja **Next.js** terbaru, termasuk **Page Router** tradisionalnya.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Memanfaatkan fitur canggih**, seperti deteksi dan pengalihan locale secara dinamis.

> Intlayer kompatibel dengan Next.js 12, 13, 14, dan 15. Jika Anda menggunakan Next.js App Router, lihat [panduan App Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_14.md). Untuk Next.js 15, ikuti [panduan ini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md).

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi Next.js Menggunakan Page Router

### Langkah 1: Instalasi Dependensi

Instal paket yang diperlukan menggunakan manajer paket pilihan Anda:

```bash packageManager="npm"
npm install intlayer next-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer next-intlayer
```

```bash packageManager="yarn"
yarn add intlayer next-intlayer
```

- **intlayer**

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

- **next-intlayer**

  Paket yang mengintegrasikan Intlayer dengan Next.js. Paket ini menyediakan context provider dan hook untuk internasionalisasi Next.js. Selain itu, paket ini juga menyertakan plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasikan Proyek Anda

Buat file konfigurasi untuk mendefinisikan bahasa yang didukung oleh aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Tambahkan locale lain Anda di sini
    ],
    defaultLocale: Locales.ENGLISH,
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
      // Tambahkan locale lain Anda di sini
    ],
    defaultLocale: Locales.ENGLISH,
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
      // Tambahkan locale lain Anda di sini
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dengan Konfigurasi Next.js

Ubah konfigurasi Next.js Anda untuk menggabungkan Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi Next.js Anda yang sudah ada
};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` digunakan untuk mengintegrasikan Intlayer dengan Next.js. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer dalam lingkungan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa dan memastikan kompatibilitas dengan komponen server.

> Fungsi `withIntlayer()` adalah fungsi promise. Jika Anda ingin menggunakannya bersama plugin lain, Anda dapat menggunakan `await`. Contoh:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Langkah 4: Konfigurasikan Middleware untuk Deteksi Locale

Siapkan middleware untuk secara otomatis mendeteksi dan menangani locale yang dipilih pengguna:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerProxy as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerProxy as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerProxy } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerProxy, config };
```

> Sesuaikan parameter `matcher` untuk mencocokkan rute aplikasi Anda. Untuk informasi lebih lanjut, lihat [dokumentasi Next.js tentang konfigurasi matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

### Langkah 5: Definisikan Rute Locale Dinamis

Implementasikan routing dinamis untuk menyajikan konten yang dilokalkan berdasarkan locale pengguna.

1.  **Buat Halaman Khusus Locale:**

    Ganti nama file halaman utama Anda untuk menyertakan segmen dinamis `[locale]`.

    ```bash
    mv src/pages/index.tsx src/pages/[locale]/index.tsx
    ```

2.  **Perbarui `_app.tsx` untuk Menangani Lokalisasi:**

    Modifikasi `_app.tsx` Anda untuk menyertakan penyedia Intlayer.

    ```tsx fileName="src/pages/_app.tsx" codeFormat="typescript"
    import type { FC } from "react";
    import type { AppProps } from "next/app";
    import { IntlayerClientProvider } from "next-intlayer";

    const App = FC<AppProps>({ Component, pageProps }) => {
      const { locale } = pageProps;

      return (
        <IntlayerClientProvider locale={locale}>
          <Component {...pageProps} />
        </IntlayerClientProvider>
      );
    }

    export default MyApp;
    ```

    ```jsx fileName="src/pages/_app.mjx" codeFormat="esm"
    import { IntlayerClientProvider } from "next-intlayer";

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    export default App;
    ```

    ```jsx fileName="src/pages/_app.csx" codeFormat="commonjs"
    const { IntlayerClientProvider } = require("next-intlayer");

    const App = ({ Component, pageProps }) => (
      <IntlayerClientProvider locale={locale}>
        <Component {...pageProps} />
      </IntlayerClientProvider>
    );

    module.exports = App;
    ```

3.  **Atur `getStaticPaths` dan `getStaticProps`:**

        Di `[locale]/index.tsx` Anda, definisikan paths dan props untuk menangani berbagai locale.

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getConfiguration } from "intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => <div>{/* Konten Anda di sini */}</div>;

export const getStaticPaths = () => {
  const { internationalization } = getConfiguration();
  const { locales } = internationalization;

  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = ({ params }) => {
  const locale = params?.locale;

  return {
    props: {
      locale,
    },
  };
};
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getConfiguration } = require("intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => <div>{/* Konten Anda di sini */}</div>;

const getStaticPaths = async () => {
  const { internationalization } = getConfiguration();
  const { locales } = internationalization;

  const paths = locales.map((locale) => ({
    params: { locale },
  }));

  return { paths, fallback: false };
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  return {
    props: {
      locale,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};
```

> `getStaticPaths` dan `getStaticProps` memastikan bahwa aplikasi Anda membangun terlebih dahulu halaman-halaman yang diperlukan untuk semua locale di Next.js Page Router. Pendekatan ini mengurangi komputasi saat runtime dan menghasilkan pengalaman pengguna yang lebih baik. Untuk detail lebih lanjut, lihat dokumentasi Next.js tentang [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) dan [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props).

### Langkah 6: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan.

```tsx fileName="src/pages/[locale]/home.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const homeContent = {
  key: "home",
  content: {
    title: t({
      en: "Welcome to My Website",
      fr: "Bienvenue sur mon site Web",
      es: "Bienvenido a mi sitio web",
    }),
    description: t({
      en: "Mulailah dengan mengedit halaman ini.",
      fr: "Commencez par éditer cette page.",
      es: "Comience por editar esta página.",
    }),
  },
} satisfies Dictionary;

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Mulailah dengan mengedit halaman ini.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default homeContent;
```

```javascript fileName="src/pages/[locale]/home.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const homeContent = {
  key: "home",
  content: {
    getStarted: {
      main: t({
        en: "Mulailah dengan mengedit halaman ini.",
        fr: "Commencez par éditer cette page.",
        es: "Comience por editar esta página.",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = homeContent;
```

```json fileName="src/pages/[locale]/home.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "home",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "id": "Mulailah dengan mengedit halaman ini.",
        "en": "Get started by editing this page.",
        "fr": "Commencez par éditer cette page.",
        "es": "Comience por editar esta página."
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "id": "src/app/page.tsx",
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

Untuk informasi lebih lanjut tentang deklarasi konten, lihat [panduan deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 7: Gunakan Konten dalam Kode Anda

Akses kamus konten Anda di seluruh aplikasi untuk menampilkan konten yang diterjemahkan.

```tsx {2,6} fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage: FC = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <ComponentExample />
      {/* Komponen tambahan */}
    </div>
  );
};

// ... Sisa kode, termasuk getStaticPaths dan getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";
import { ComponentExample } from "@components/ComponentExample";

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Komponen tambahan */}
    </div>
  );
};

// ... Sisa kode, termasuk getStaticPaths dan getStaticProps

export default HomePage;
```

```jsx {1,5} fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");
const { ComponentExample } = require("@components/ComponentExample");

const HomePage = () => {
  const content = useIntlayer("home");

  return (
    <div>
      <h1>{content.getStarted.main}</h1>
      <code>{content.getStarted.pageLink}</code>

      <ComponentExample />
      {/* Komponen tambahan */}
    </div>
  );
};

// ... Sisa kode, termasuk getStaticPaths dan getStaticProps
```

```tsx fileName="src/components/ComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

export const ComponentExample: FC = () => {
  const content = useIntlayer("component-example"); // Pastikan Anda memiliki deklarasi konten yang sesuai

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer";

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Pastikan Anda memiliki deklarasi konten yang sesuai

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx fileName="src/components/ComponentExample.csx" codeFormat="commonjs"
const { useIntlayer } = require("next-intlayer");

const ComponentExample = () => {
  const content = useIntlayer("component-example"); // Pastikan Anda memiliki deklarasi konten yang sesuai

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

> Saat menggunakan terjemahan dalam atribut `string` (misalnya, `alt`, `title`, `href`, `aria-label`), panggil

> nilai fungsi sebagai berikut:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useIntlayer.md).

### (Opsional) Langkah 8: Internasionalisasi metadata Anda

Jika Anda ingin menginternasionalisasi metadata Anda, seperti judul halaman Anda, Anda dapat menggunakan fungsi `getStaticProps` yang disediakan oleh Next.js Page Router. Di dalamnya, Anda dapat mengambil konten dari fungsi `getIntlayer` untuk menerjemahkan metadata Anda.

```typescript fileName="src/pages/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { type Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
```

```javascript fileName="src/pages/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Dihasilkan oleh create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/pages/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary<import('next').Metadata>} */
const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Create Next App",
      fr: "Créer une application Next.js",
      es: "Crear una aplicación Next.js",
    }),
    description: t({
      en: "Generated by create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/pages/[locale]/metadata.content.json" contentDeclarationFormat="json"
{
  "key": "page-metadata",
  "content": {
    "title": {
      "nodeType": "translation",
      "translation": {
          "en": "Preact logo",
          "fr": "Logo Preact",
          "es": "Logo Preact",
          "id": "Logo Preact"
      },
    },
    "description": {
      "nodeType": "translation",
      "translation": {
        "en": "Generated by create next app",
        "fr": "Généré par create next app",
        "es": "Generado por create next app",
        "id": "Dihasilkan oleh create next app"
      },
    },
  },
};
```

````tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({
  metadata,
  multilingualUrls,
  locale,
}) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Menghasilkan tag hreflang untuk SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Konten halaman */}
      <main>{/* Konten halaman Anda di sini */}</main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params,
}) => {
  const locale = params?.locale as string;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Menghasilkan objek yang berisi semua url untuk setiap locale.
   *
   * Contoh:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Mengembalikan
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Sisa kode termasuk getStaticPaths
````

````jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Menghasilkan tag hreflang untuk SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Konten halaman */}
      <main>{/* Konten halaman Anda di sini */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Menghasilkan objek yang berisi semua url untuk setiap locale.
   *
   * Contoh:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Mengembalikan
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Sisa kode termasuk getStaticPaths
````

````jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Menghasilkan tag hreflang untuk SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Konten halaman */}
      <main>{/* Konten halaman Anda di sini */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;

  const metadata = getIntlayer("page-metadata", locale);

  /**
   * Menghasilkan objek yang berisi semua url untuk setiap locale.
   *
   * Contoh:
   * ```ts
   *  getMultilingualUrls('/about');
   *
   *  // Mengembalikan
   *  // {
   *  //   en: '/about',
   *  //   fr: '/fr/about',
   *  //   es: '/es/about',
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Sisa kode termasuk getStaticPaths
````

> Perlu dicatat bahwa fungsi `getIntlayer` yang diimpor dari `next-intlayer` mengembalikan konten Anda yang dibungkus dalam `IntlayerNode`, memungkinkan integrasi dengan visual editor. Sebaliknya, fungsi `getIntlayer` yang diimpor dari `intlayer` mengembalikan konten Anda secara langsung tanpa properti tambahan.

Sebagai alternatif, Anda dapat menggunakan fungsi `getTranslation` untuk mendeklarasikan metadata Anda. Namun, menggunakan file deklarasi konten direkomendasikan untuk mengotomatisasi terjemahan metadata Anda dan mengeksternalisasi konten pada suatu titik.

```tsx fileName="src/pages/[locale]/index.tsx" codeFormat="typescript"
import { GetStaticPaths, GetStaticProps } from "next";
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";
import type { FC } from "react";

interface HomePageProps {
  locale: string;
  metadata: {
    title: string;
    description: string;
  };
  multilingualUrls: Record<string, string>;
}

const HomePage: FC<HomePageProps> = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Menghasilkan tag hreflang untuk SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={url}
          />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Konten halaman */}
      <main>
        {/* Konten halaman Anda di sini */}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  params
}) => {
  const locale = params?.locale as string;
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  const metadata = {
    title: t<string>({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Sisa kode termasuk getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.mjx" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";
import { useIntlayer } from "next-intlayer";
import Head from "next/head";

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Menghasilkan tag hreflang untuk SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Konten halaman */}
      <main>{/* Konten halaman Anda di sini */}</main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

export default HomePage;

// ... Sisa kode termasuk getStaticPaths
```

```jsx fileName="src/pages/[locale]/index.csx" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");
const { useIntlayer } = require("next-intlayer");
const Head = require("next/head");

const HomePage = ({ metadata, multilingualUrls, locale }) => {
  const content = useIntlayer("page");

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Menghasilkan tag hreflang untuk SEO */}
        {Object.entries(multilingualUrls).map(([lang, url]) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={url} />
        ))}
        <link rel="canonical" href={multilingualUrls[locale]} />
      </Head>

      {/* Konten halaman */}
      <main>{/* Konten halaman Anda di sini */}</main>
    </div>
  );
};

const getStaticProps = async ({ params }) => {
  const locale = params?.locale;
  const t = (content) => getTranslation(content, locale);

  const metadata = {
    title: t({
      en: "My title",
      fr: "Mon titre",
      es: "Mi título",
    }),
    description: t({
      en: "My description",
      fr: "Ma description",
      es: "Mi descripción",
    }),
  };

  const multilingualUrls = getMultilingualUrls("/");

  return {
    props: {
      locale,
      metadata,
      multilingualUrls,
    },
  };
};

module.exports = {
  getStaticProps,
  getStaticPaths,
  default: HomePage,
};

// ... Sisa kode termasuk getStaticPaths
```

> Pelajari lebih lanjut tentang optimasi metadata [di dokumentasi resmi Next.js](https://nextjs.org/docs/pages/building-your-application/optimizing/metadata).

### (Opsional) Langkah 9: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda di Next.js, cara yang direkomendasikan adalah menggunakan komponen `Link` untuk mengarahkan pengguna ke halaman lokal yang sesuai. Komponen `Link` memungkinkan prefetching halaman, yang membantu menghindari pemuatan ulang halaman secara penuh.

```tsx fileName="src/components/LanguageSwitcher.tsx" codeFormat="typescript"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
          >
            <span>
              {/* Locale - misal FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Locale-nya sendiri - misal Français */}
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
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="esm"
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocalePageRouter } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            key={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
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
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LanguageSwitcher.msx" codeFormat="commonjs"
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocalePageRouter } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales } = useLocalePageRouter();

  return (
    <select>
      {availableLocales.map((localeItem) => (
        <option value={localeItem} key={localeItem}>
          <Link
            href={getLocalizedUrl(pathWithoutLocale, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={() => setLocale(localeItem)}
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
              {/* Bahasa dalam bahasa Inggris - misalnya French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </Link>
        </option>
      ))}
    </select>
  );
};
```

> Cara alternatif adalah menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini tidak akan memungkinkan prefetching halaman dan akan memuat ulang halaman.

> Dalam kasus ini, tanpa pengalihan menggunakan `router.push`, hanya kode sisi server Anda yang akan mengubah locale dari konten.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { getLocalizedUrl } from "intlayer";

// ... Sisa kode

const router = useRouter();
const { setLocale } = useLocale({
  onLocaleChange: (locale) => {
    router.push(getLocalizedUrl(pathWithoutLocale, locale));
  },
});

return (
  <button onClick={() => setLocale(Locales.FRENCH)}>
    Ubah ke Bahasa Perancis
  </button>
);
```

> API `useLocalePageRouter` sama dengan `useLocale`. Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md).

> Referensi dokumentasi:
>
> - [hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)
> - [hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)
> - [hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)
> - [atribut `hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`atribut lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`atribut dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`atribut aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opsional) Langkah 10: Membuat Komponen Link yang Dilokalkan

Untuk memastikan navigasi aplikasi Anda menghormati locale saat ini, Anda dapat membuat komponen `Link` kustom. Komponen ini secara otomatis menambahkan prefix bahasa saat ini pada URL internal, sehingga. Misalnya, ketika pengguna berbahasa Perancis mengklik tautan ke halaman "About", mereka akan diarahkan ke `/fr/about` bukan `/about`.

Perilaku ini berguna untuk beberapa alasan:

- **SEO dan Pengalaman Pengguna**: URL yang dilokalkan membantu mesin pencari mengindeks halaman spesifik bahasa dengan benar dan menyediakan konten kepada pengguna dalam bahasa pilihan mereka.
- **Konsistensi**: Dengan menggunakan tautan yang dilokalkan di seluruh aplikasi Anda, Anda menjamin bahwa navigasi tetap dalam locale saat ini, mencegah perubahan bahasa yang tidak terduga.
- **Pemeliharaan**: Memusatkan logika lokalisasi dalam satu komponen menyederhanakan pengelolaan URL, membuat codebase Anda lebih mudah dipelihara dan dikembangkan seiring pertumbuhan aplikasi Anda.

Berikut adalah implementasi komponen `Link` yang dilokalkan dalam TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
"use client";

import { getLocalizedUrl } from "intlayer";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { useLocale } from "next-intlayer";
import { forwardRef, PropsWithChildren, type ForwardedRef } from "react";

/**
 * Fungsi utilitas untuk memeriksa apakah URL yang diberikan adalah eksternal.
 * Jika URL dimulai dengan http:// atau https://, maka dianggap eksternal.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Komponen Link kustom yang menyesuaikan atribut href berdasarkan locale saat ini.
 * Untuk tautan internal, menggunakan `getLocalizedUrl` untuk menambahkan prefix locale pada URL (misalnya, /fr/about).
 * Ini memastikan navigasi tetap dalam konteks locale yang sama.
 */
export const Link = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<NextLinkProps>
>(({ href, children, ...props }, ref: ForwardedRef<HTMLAnchorElement>) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jika tautan bersifat internal dan href yang valid disediakan, dapatkan URL yang dilokalkan.
  const hrefI18n: NextLinkProps["href"] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
'use client';

import { getLocalizedUrl } from 'intlayer';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { useLocale } from 'next-intlayer';
import { forwardRef, PropsWithChildren, type ForwardedRef } from 'react';

/**
 * Fungsi utilitas untuk memeriksa apakah URL yang diberikan bersifat eksternal.
 * Jika URL dimulai dengan http:// atau https://, maka dianggap eksternal.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Komponen Link kustom yang menyesuaikan atribut href berdasarkan locale saat ini.
 * Untuk tautan internal, menggunakan `getLocalizedUrl` untuk menambahkan prefix locale pada URL (misalnya, /fr/about).
 * Ini memastikan navigasi tetap dalam konteks locale yang sama.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jika tautan bersifat internal dan href yang valid diberikan, dapatkan URL yang sudah dilokalkan.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
'use client';

const { getLocalizedUrl } = require("intlayer");
const NextLink = require("next/link");
const { useLocale } = require("next-intlayer");
const { forwardRef } = require("react");

/**
 * Fungsi utilitas untuk memeriksa apakah URL yang diberikan bersifat eksternal.
 * Jika URL dimulai dengan http:// atau https://, maka dianggap eksternal.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jika tautan bersifat internal dan href yang valid disediakan, dapatkan URL yang sudah dilokalkan.
  const hrefI18n: NextLinkProps['href'] =
    href && !isExternalLink ? getLocalizedUrl(href.toString(), locale) : href;

  return (
    <NextLink href={hrefI18n} ref={ref} {...props}>
      {children}
    </NextLink>
  );
});

Link.displayName = 'Link';
```

#### Cara Kerjanya

- **Mendeteksi Tautan Eksternal**:  
  Fungsi pembantu `checkIsExternalLink` menentukan apakah sebuah URL bersifat eksternal. Tautan eksternal dibiarkan tidak berubah karena tidak memerlukan lokalisasi.

- **Mengambil Locale Saat Ini**:  
  Hook `useLocale` menyediakan locale saat ini (misalnya, `fr` untuk bahasa Perancis).

- **Melokalkan URL**:  
  Untuk tautan internal (yaitu, bukan eksternal), `getLocalizedUrl` digunakan untuk secara otomatis menambahkan prefix locale saat ini ke URL. Ini berarti jika pengguna Anda menggunakan bahasa Perancis, melewatkan `/about` sebagai `href` akan mengubahnya menjadi `/fr/about`.

- **Mengembalikan Link**:  
  Komponen mengembalikan elemen `<a>` dengan URL yang sudah dilokalkan, memastikan navigasi konsisten dengan locale.

Dengan mengintegrasikan komponen `Link` ini di seluruh aplikasi Anda, Anda mempertahankan pengalaman pengguna yang koheren dan sadar bahasa sekaligus mendapatkan manfaat dari peningkatan SEO dan kegunaan.

### (Opsional) Langkah 11: Optimalkan ukuran bundle Anda

Saat menggunakan `next-intlayer`, kamus disertakan dalam bundle untuk setiap halaman secara default. Untuk mengoptimalkan ukuran bundle, Intlayer menyediakan plugin SWC opsional yang secara cerdas menggantikan panggilan `useIntlayer` menggunakan makro. Ini memastikan kamus hanya disertakan dalam bundle untuk halaman yang benar-benar menggunakannya.

Untuk mengaktifkan optimasi ini, instal paket `@intlayer/swc`. Setelah terinstal, `next-intlayer` akan secara otomatis mendeteksi dan menggunakan plugin tersebut:

```bash packageManager="npm"
npm install @intlayer/swc --save-dev
```

```bash packageManager="pnpm"
pnpm add @intlayer/swc --save-dev
```

```bash packageManager="yarn"
yarn add @intlayer/swc --save-dev
```

> Catatan: Optimasi ini hanya tersedia untuk Next.js 13 ke atas.

> Catatan: Paket ini tidak diinstal secara default karena plugin SWC masih bersifat eksperimental di Next.js. Hal ini mungkin akan berubah di masa depan.

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat dari TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Error terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan otomatis
  ],
}
```

### Konfigurasi Git

Untuk menjaga kebersihan repositori Anda dan menghindari commit file yang dihasilkan, disarankan untuk mengabaikan file yang dibuat oleh Intlayer.

Tambahkan baris berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten terjemahan.
- **Aksi cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk informasi lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

## Sumber Daya Tambahan

- **Dokumentasi Intlayer:** [Repositori GitHub](https://github.com/aymericzip/intlayer)
- **Panduan Kamus:** [Kamus](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)
- **Dokumentasi Konfigurasi:** [Panduan Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

Dengan mengikuti panduan ini, Anda dapat mengintegrasikan Intlayer secara efektif ke dalam aplikasi Next.js Anda menggunakan Page Router, memungkinkan dukungan internasionalisasi yang kuat dan skalabel untuk proyek web Anda.

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
