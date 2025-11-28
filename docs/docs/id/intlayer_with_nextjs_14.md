---
createdAt: 2024-12-06
updatedAt: 2025-09-22
title: Cara Menerjemahkan Next.js 14 dan App Router Anda – Panduan i18n 2025
description: Temukan cara membuat situs web Next.js 14 App Router Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Next.js 14
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - nextjs
  - 14
applicationTemplate: https://github.com/aymericzip/intlayer-next-14-template
history:
  - version: 6.2.0
    date: 2025-10-09
    changes: Menambahkan dokumentasi untuk hook `useLocale` dengan opsi `onLocaleChange`
  - version: 5.6.6
    date: 2025-10-02
    changes: Menambahkan dokumentasi untuk fungsi `getLocale` pada server actions
  - version: 5.6.2
    date: 2025-09-22
    changes: Menambahkan dokumentasi untuk helper `multipleMiddlewares`
  - version: 5.6.0
    date: 2025-07-06
    changes: Mengubah fungsi `withIntlayer()` menjadi fungsi berbasis promise
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Menerjemahkan situs web Next.js 14 dan App Router Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) open-source yang inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern. Intlayer terintegrasi dengan mulus dengan kerangka kerja terbaru **Next.js 14**, termasuk **App Router** yang kuat. Ini dioptimalkan untuk bekerja dengan **Server Components** untuk rendering yang efisien dan sepenuhnya kompatibel dengan [**Turbopack**](https://nextjs.org/docs/architecture/turbopack) (dari Next.js >= 15).

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalisasi metadata**, rute, dan konten secara dinamis.
- **Mengakses terjemahan di komponen sisi klien dan sisi server**.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Manfaatkan fitur canggih**, seperti deteksi dan pengalihan locale secara dinamis.

> Intlayer kompatibel dengan Next.js 12, 13, 14, dan 15. Jika Anda menggunakan Next.js Page Router, Anda dapat merujuk ke [panduan ini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_page_router.md). Untuk Next.js 15 dengan atau tanpa turbopack, lihat [panduan ini](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md).

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi Next.js

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-next-14-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-next-14-template) di GitHub.

### Langkah 1: Instalasi Dependensi

Pasang paket yang diperlukan menggunakan npm:

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

  Paket yang mengintegrasikan Intlayer dengan Next.js. Paket ini menyediakan context providers dan hooks untuk internasionalisasi Next.js. Selain itu, paket ini juga menyertakan plugin Next.js untuk mengintegrasikan Intlayer dengan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasikan Proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Bahasa lain milik Anda
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
      // Bahasa lain milik Anda
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
      // Bahasa lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Next.js Anda

Konfigurasikan setup Next.js Anda untuk menggunakan Intlayer:

```typescript fileName="next.config.mjs"
import { withIntlayer } from "next-intlayer/server";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withIntlayer(nextConfig);
```

> Plugin Next.js `withIntlayer()` digunakan untuk mengintegrasikan Intlayer dengan Next.js. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Ia mendefinisikan variabel lingkungan Intlayer dalam lingkungan [Webpack](https://webpack.js.org/) atau [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack). Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa dan memastikan kompatibilitas dengan komponen server.

> Fungsi `withIntlayer()` adalah fungsi promise. Jika Anda ingin menggunakannya bersama plugin lain, Anda dapat menggunakan await. Contoh:
>
> ```tsx
> const nextConfig = await withIntlayer(nextConfig);
> const nextConfigWithOtherPlugins = withOtherPlugins(nextConfig);
>
> export default nextConfigWithOtherPlugins;
> ```

### Langkah 4: Konfigurasikan Middleware untuk Deteksi Locale

Siapkan middleware untuk mendeteksi locale yang diinginkan pengguna:

```typescript fileName="src/middleware.ts" codeFormat="typescript"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.mjs" codeFormat="esm"
export { intlayerMiddleware as middleware } from "next-intlayer/middleware";

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};
```

```javascript fileName="src/middleware.cjs" codeFormat="commonjs"
const { intlayerMiddleware } = require("next-intlayer/middleware");

const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};

module.exports = { middleware: intlayerMiddleware, config };
```

> `intlayerMiddleware` digunakan untuk mendeteksi locale yang diinginkan pengguna dan mengarahkan mereka ke URL yang sesuai seperti yang ditentukan dalam [konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md). Selain itu, ini memungkinkan penyimpanan locale yang diinginkan pengguna dalam cookie.

> Sesuaikan parameter `matcher` agar sesuai dengan rute aplikasi Anda. Untuk detail lebih lanjut, lihat [dokumentasi Next.js tentang konfigurasi matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware).

> Jika Anda perlu menggabungkan beberapa middleware bersama-sama (misalnya, `intlayerMiddleware` dengan autentikasi atau middleware kustom), Intlayer sekarang menyediakan helper yang disebut `multipleMiddlewares`.

```ts
import {
  multipleMiddlewares,
  intlayerMiddleware,
} from "next-intlayer/middleware";
import { customMiddleware } from "@utils/customMiddleware";

export const middleware = multipleMiddlewares([
  intlayerMiddleware,
  customMiddleware,
]);
```

### Langkah 5: Definisikan Rute Locale Dinamis

Hapus semua isi dari `RootLayout` dan ganti dengan kode berikut:

```tsx fileName="src/app/layout.tsx" codeFormat="typescript"
import type { PropsWithChildren, FC } from "react";
import "./globals.css";

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  // Anda masih dapat membungkus children dengan provider lain, seperti `next-themes`, `react-query`, `framer-motion`, dll.
  <>{children}</>
);

export default RootLayout;
```

```jsx fileName="src/app/layout.mjx" codeFormat="esm"
import "./globals.css";

const RootLayout = ({ children }) => (
  // Anda masih dapat membungkus children dengan provider lain, seperti `next-themes`, `react-query`, `framer-motion`, dll.
  <>{children}</>
);

export default RootLayout;
```

```jsx fileName="src/app/layout.csx" codeFormat="commonjs"
require("./globals.css");

const RootLayout = ({ children }) => (
  // Anda masih dapat membungkus children dengan provider lain, seperti `next-themes`, `react-query`, `framer-motion`, dll.
  <>{children}</>
);

module.exports = {
  default: RootLayout,
  generateStaticParams,
};
```

> Membiarkan komponen `RootLayout` kosong memungkinkan untuk mengatur atribut [`lang`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/lang) dan [`dir`](https://developer.mozilla.org/fr/docs/Web/HTML/Global_attributes/dir) pada tag `<html>`.

Untuk mengimplementasikan routing dinamis, sediakan path untuk locale dengan menambahkan layout baru di direktori `[locale]` Anda:

```tsx fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
import type { Next14LayoutIntlayer } from "next-intlayer";
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
import { Inter } from "next/font/google";
import { getHTMLTextDir } from "intlayer";

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

export default LocaleLayout;
```

```jsx fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { Inter } = require("next/font/google");
const { getHTMLTextDir } = require("intlayer");

const inter = Inter({ subsets: ["latin"] });

const LocaleLayout = ({ children, params: { locale } }) => (
  <html lang={locale} dir={getHTMLTextDir(locale)}>
    <body className={inter.className}>{children}</body>
  </html>
);

module.exports = LocaleLayout;
```

> Segmen path `[locale]` digunakan untuk menentukan locale. Contoh: `/en-US/about` akan merujuk ke `en-US` dan `/fr/about` ke `fr`.

> Pada tahap ini, Anda akan menemui error: `Error: Missing <html> and <body> tags in the root layout.`. Ini adalah hal yang diharapkan karena file `/app/page.tsx` tidak lagi digunakan dan dapat dihapus. Sebagai gantinya, segmen path `[locale]` akan mengaktifkan halaman `/app/[locale]/page.tsx`. Akibatnya, halaman akan dapat diakses melalui path seperti `/en`, `/fr`, `/es` di browser Anda. Untuk mengatur locale default sebagai halaman root, lihat pengaturan `middleware` pada langkah 4.

Kemudian, implementasikan fungsi `generateStaticParams` di Layout aplikasi Anda.

```tsx {1} fileName="src/app/[locale]/layout.tsx" codeFormat="typescript"
export { generateStaticParams } from "next-intlayer"; // Baris untuk disisipkan

const LocaleLayout: Next14LayoutIntlayer = ({
  children,
  params: { locale },
}) => {
  /*... Sisa kode*/
};

export default LocaleLayout;
```

```jsx {1} fileName="src/app/[locale]/layout.mjx" codeFormat="esm"
export { generateStaticParams } from "next-intlayer"; // Baris untuk disisipkan

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Sisa kode*/
};

export default LocaleLayout;
```

```jsx {1,7} fileName="src/app/[locale]/layout.csx" codeFormat="commonjs"
const { generateStaticParams } = require("next-intlayer"); // Baris untuk disisipkan

const LocaleLayout = ({ children, params: { locale } }) => {
  /*... Sisa kode*/
};

module.exports = LocaleLayout;
```

> `generateStaticParams` memastikan bahwa aplikasi Anda membangun terlebih dahulu halaman-halaman yang diperlukan untuk semua locale, mengurangi komputasi saat runtime dan meningkatkan pengalaman pengguna. Untuk detail lebih lanjut, lihat [dokumentasi Next.js tentang generateStaticParams](https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering#generate-static-params).

### Langkah 6: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/app/[locale]/page.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Mulai dengan mengedit",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
} satisfies Dictionary;

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Mulai dengan mengedit",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

export default pageContent;
```

```javascript fileName="src/app/[locale]/page.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const pageContent = {
  key: "page",
  content: {
    getStarted: {
      main: t({
        en: "Mulai dengan mengedit",
        fr: "Commencez par éditer",
        es: "Comience por editar",
      }),
      pageLink: "src/app/page.tsx",
    },
  },
};

module.exports = pageContent;
```

```json fileName="src/app/[locale]/page.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "page",
  "content": {
    "getStarted": {
      "nodeType": "translation",
      "translation": {
        "en": "Mulai dengan mengedit",
        "fr": "Commencez par éditer",
        "es": "Comience por editar"
      }
    },
    "pageLink": {
      "nodeType": "translation",
      "translation": {
        "en": "src/app/page.tsx",
        "fr": "src/app/page.tsx",
        "es": "src/app/page.tsx"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama sudah dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 7: Gunakan Konten dalam Kode Anda

Akses kamus konten Anda di seluruh aplikasi Anda:

```tsx fileName="src/app/[locale]/page.tsx" codeFormat="typescript"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { type Next14PageIntlayer, IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page: Next14PageIntlayer = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerServerProvider locale={locale}>
        <IntlayerClientProvider locale={locale}>
          <ServerComponentExample />
          <ClientComponentExample />
        </IntlayerClientProvider>
      </IntlayerServerProvider>
    </>
  );
};

export default Page;
```

```jsx fileName="src/app/[locale]/page.mjx" codeFormat="esm"
import { ClientComponentExample } from "@components/ClientComponentExample";
import { ServerComponentExample } from "@components/ServerComponentExample";
import { IntlayerClientProvider } from "next-intlayer";
import { IntlayerServerProvider, useIntlayer } from "next-intlayer/server";

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

```jsx fileName="src/app/[locale]/page.csx" codeFormat="commonjs"
const { IntlayerClientProvider } = require("next-intlayer");
const { IntlayerServerProvider, useIntlayer } = require("next-intlayer/server");

const Page = ({ params: { locale } }) => {
  const content = useIntlayer("page", locale);

  return (
    <>
      <p>
        {content.getStarted.main}
        <code>{content.getStarted.pageLink}</code>
      </p>

      <IntlayerClientProvider locale={locale}>
        <IntlayerServerProvider locale={locale}>
          <ClientComponentExample />
          <ServerComponentExample />
        </IntlayerServerProvider>
      </IntlayerClientProvider>
    </>
  );
};
```

- **`IntlayerClientProvider`** digunakan untuk menyediakan locale ke komponen sisi klien. Ini dapat ditempatkan di komponen induk mana pun, termasuk layout. Namun, menempatkannya di layout direkomendasikan karena Next.js berbagi kode layout di seluruh halaman, sehingga menjadi lebih efisien. Dengan menggunakan `IntlayerClientProvider` di layout, Anda menghindari inisialisasi ulang untuk setiap halaman, meningkatkan performa dan menjaga konteks lokalisasi yang konsisten di seluruh aplikasi Anda.
- **`IntlayerServerProvider`** digunakan untuk menyediakan locale ke anak server. Ini tidak dapat disetel di layout.

  > Layout dan halaman tidak dapat berbagi konteks server yang sama karena sistem konteks server didasarkan pada penyimpanan data per permintaan (melalui mekanisme [cache React](https://react.dev/reference/react/cache)), yang menyebabkan setiap "konteks" dibuat ulang untuk segmen aplikasi yang berbeda. Menempatkan provider di layout bersama akan merusak isolasi ini, mencegah propagasi nilai konteks server yang benar ke komponen server Anda.

  > Layout dan halaman tidak dapat berbagi konteks server yang sama karena sistem konteks server didasarkan pada penyimpanan data per permintaan (melalui mekanisme [cache React](https://react.dev/reference/react/cache)), yang menyebabkan setiap “konteks” dibuat ulang untuk segmen aplikasi yang berbeda. Menempatkan provider di layout bersama akan memecah isolasi ini, sehingga mencegah propagasi nilai konteks server yang benar ke komponen server Anda.

```tsx {4,7} fileName="src/components/ClientComponentExample.tsx" codeFormat="typescript"
"use client";

import type { FC } from "react";
import { useIntlayer } from "next-intlayer";

const ClientComponentExample: FC = () => {
  const content = useIntlayer("client-component-example"); // Membuat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.mjx" codeFormat="esm"
"use client";

import { useIntlayer } from "next-intlayer";

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Membuat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {3,6} fileName="src/components/ClientComponentExample.csx" codeFormat="commonjs"
"use client";

const { useIntlayer } = require("next-intlayer");

const ClientComponentExample = () => {
  const content = useIntlayer("client-component-example"); // Membuat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```tsx {2} fileName="src/components/ServerComponentExample.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample: FC = () => {
  const content = useIntlayer("server-component-example"); // Membuat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.mjx" codeFormat="esm"
import { useIntlayer } from "next-intlayer/server";

const ServerComponentExample = () => {
  const content = useIntlayer("server-component-example"); // Membuat deklarasi konten terkait

  return (
    <div>
      <h2>{content.title}</h2>
      <p>{content.content}</p>
    </div>
  );
};
```

```jsx {1} fileName="src/components/ServerComponentExample.csx" codeFormat="commonjs"
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

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda harus memanggil nilai dari fungsi tersebut, seperti:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useIntlayer.md).

### (Opsional) Langkah 8: Internasionalisasi metadata Anda

Jika Anda ingin menginternasionalisasi metadata Anda, seperti judul halaman Anda, Anda dapat menggunakan fungsi `generateMetadata` yang disediakan oleh Next.js. Di dalamnya, Anda dapat mengambil konten dari fungsi `getIntlayer` untuk menerjemahkan metadata Anda.

```typescript fileName="src/app/[locale]/metadata.content.ts" contentDeclarationFormat="typescript"
import { type Dictionary, t } from "intlayer";
import { Metadata } from "next";

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

```javascript fileName="src/app/[locale]/metadata.content.mjs" contentDeclarationFormat="esm"
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

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
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
      en: "Dihasilkan oleh create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

export default metadataContent;
```

```javascript fileName="src/app/[locale]/metadata.content.cjs" contentDeclarationFormat="commonjs"
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
      id: "Dihasilkan oleh create next app",
      fr: "Généré par create next app",
      es: "Generado por create next app",
    }),
  },
};

module.exports = metadataContent;
```

```json fileName="src/app/[locale]/metadata.content.json" contentDeclarationFormat="json"
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

````typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
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

// ... Sisa kode
````

````javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getIntlayer, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
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
   *  //   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

// ... Sisa kode
````

````javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getIntlayer, getMultilingualUrls } = require("intlayer");

const generateMetadata = ({ params: { locale } }) => {
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
   *  *   es: '/es/about'
   *  // }
   * ```
   */
  const multilingualUrls = getMultilingualUrls("/");
  const localizedUrl = multilingualUrls[locale];

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

module.exports = { generateMetadata };

// ... Sisa kode
````

> Perhatikan bahwa fungsi `getIntlayer` yang diimpor dari `next-intlayer` mengembalikan konten Anda yang dibungkus dalam sebuah `IntlayerNode`, memungkinkan integrasi dengan editor visual. Sebaliknya, fungsi `getIntlayer` yang diimpor dari `intlayer` mengembalikan konten Anda secara langsung tanpa properti tambahan.

Sebagai alternatif, Anda dapat menggunakan fungsi `getTranslation` untuk mendeklarasikan metadata Anda. Namun, menggunakan file deklarasi konten direkomendasikan untuk mengotomatisasi terjemahan metadata Anda dan mengeksternalisasi konten pada suatu saat.

```typescript fileName="src/app/[locale]/layout.tsx or src/app/[locale]/page.tsx" codeFormat="typescript"
import {
  type IConfigLocales,
  getTranslation,
  getMultilingualUrls,
} from "intlayer";
import type { Metadata } from "next";
import type { LocalParams } from "next-intlayer";

export const generateMetadata = ({
  params: { locale },
}: LocalParams): Metadata => {
  const t = <T>(content: IConfigLocales<T>) => getTranslation(content, locale);

  return {
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
};

// ... Sisa kode
```

```javascript fileName="src/app/[locale]/layout.mjs or src/app/[locale]/page.mjs" codeFormat="esm"
import { getTranslation, getMultilingualUrls } from "intlayer";

export const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  return {
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
};

// ... Sisa kode
```

```javascript fileName="src/app/[locale]/layout.cjs or src/app/[locale]/page.cjs" codeFormat="commonjs"
const { getTranslation, getMultilingualUrls } = require("intlayer");

const generateMetadata = ({ params: { locale } }) => {
  const t = (content) => getTranslation(content, locale);

  return {
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
};

module.exports = { generateMetadata };

// ... Sisa kode
```

> Pelajari lebih lanjut tentang optimasi metadata [di dokumentasi resmi Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata).

### (Opsional) Langkah 9: Internasionalisasi sitemap.xml dan robots.txt Anda

Untuk menginternasionalkan `sitemap.xml` dan `robots.txt` Anda, Anda dapat menggunakan fungsi `getMultilingualUrls` yang disediakan oleh Intlayer. Fungsi ini memungkinkan Anda untuk menghasilkan URL multibahasa untuk sitemap Anda.

```tsx fileName="src/app/sitemap.ts"   codeFormat="typescript"
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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const sitemap = () => [
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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

export default sitemap;
```

```jsx fileName="src/app/sitemap.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const sitemap = () => [
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
  {
    url: "https://example.com/register",
    alternates: {
      languages: {
        ...getMultilingualUrls("https://example.com/register"),
        "x-default": "https://example.com/register",
      },
    },
  },
];

module.exports = sitemap;
```

```tsx fileName="src/app/robots.ts" codeFormat="typescript"
import type { MetadataRoute } from "next";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

// Mendefinisikan aturan robots.txt untuk mengizinkan akses ke root dan melarang akses ke halaman login dan register dalam semua bahasa
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

export default robots;
```

```jsx fileName="src/app/robots.mjx" codeFormat="esm"
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
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

```jsx fileName="src/app/robots.csx" codeFormat="commonjs"
const { getMultilingualUrls } = require("intlayer");

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const robots = () => ({
  rules: {
    userAgent: "*",
    allow: ["/"],
    disallow: getAllMultilingualUrls(["/login", "/register"]),
  },
  host: "https://example.com",
  sitemap: `https://example.com/sitemap.xml`,
});

module.exports = robots;
```

> Pelajari lebih lanjut tentang optimasi sitemap [di dokumentasi resmi Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap). Pelajari lebih lanjut tentang optimasi robots.txt [di dokumentasi resmi Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).

### (Opsional) Langkah 10: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda di Next.js, cara yang direkomendasikan adalah menggunakan komponen `Link` untuk mengarahkan pengguna ke halaman yang sesuai dengan lokal yang diinginkan. Komponen `Link` memungkinkan prefetching halaman, yang membantu menghindari pemuatan ulang halaman secara penuh.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import { type FC } from "react";
import Link from "next/link";

const LocaleSwitcher: FC = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
            replace // Akan memastikan bahwa tombol "kembali" pada browser akan mengarahkan ke halaman sebelumnya
          >
            <span>
              {/* Locale - misalnya FR */}
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

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
"use client";

import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "next-intlayer";
import Link from "next/link";

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
            replace // Akan memastikan bahwa tombol "kembali" pada browser akan mengarahkan ke halaman sebelumnya
          >
            <span>
              {/* Lokal - misalnya FR */}
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

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
"use client";

const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("next-intlayer");
const Link = require("next/link");

const LocaleSwitcher = () => {
  const { locale, pathWithoutLocale, availableLocales, setLocale } =
    useLocale();

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
            replace // Akan memastikan bahwa tombol "kembali" di browser akan mengarahkan ke halaman sebelumnya
          >
            <span>
              {/* Lokalisasi - misalnya FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Lokalisasi sendiri - misalnya Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam Lokalisasi saat ini - misalnya Francés dengan lokalisasi saat ini disetel ke Locales.SPANISH */}
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

> Cara alternatif adalah menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini tidak akan memungkinkan prefetching halaman. Lihat dokumentasi [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md) untuk detail lebih lanjut.

> Anda juga dapat mengatur fungsi pada opsi `onLocaleChange` untuk memicu fungsi kustom saat locale berubah.

```tsx fileName="src/components/LocaleSwitcher.tsx"
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
    Ganti ke Bahasa Perancis
  </button>
);
```

> Referensi dokumentasi:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`atribut lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`atribut dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`atribut aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opsional) Langkah 11: Membuat Komponen Link yang Dilokalisasi

Untuk memastikan navigasi aplikasi Anda menghormati locale saat ini, Anda dapat membuat komponen `Link` kustom. Komponen ini secara otomatis menambahkan prefix bahasa saat ini pada URL internal, sehingga misalnya, ketika pengguna berbahasa Prancis mengklik tautan ke halaman "About", mereka diarahkan ke `/fr/about` bukan `/about`.

Perilaku ini berguna untuk beberapa alasan:

- **SEO dan Pengalaman Pengguna**: URL yang dilokalkan membantu mesin pencari mengindeks halaman spesifik bahasa dengan benar dan menyediakan konten kepada pengguna dalam bahasa pilihan mereka.
- **Konsistensi**: Dengan menggunakan tautan yang dilokalkan di seluruh aplikasi Anda, Anda menjamin bahwa navigasi tetap dalam locale saat ini, mencegah perubahan bahasa yang tidak diinginkan.
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

  // Jika tautan bersifat internal dan href yang valid diberikan, dapatkan URL yang sudah dilokalkan.
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
 * Fungsi utilitas untuk memeriksa apakah sebuah URL merupakan link eksternal.
 * Jika URL dimulai dengan http:// atau https://, maka dianggap sebagai link eksternal.
 */
export const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');

/**
 * Komponen Link kustom yang menyesuaikan atribut href berdasarkan locale saat ini.
 * Untuk link internal, menggunakan `getLocalizedUrl` untuk menambahkan prefix locale pada URL (misalnya, /fr/about).
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
 * Jika URL diawali dengan http:// atau https://, maka dianggap eksternal.
 */
const checkIsExternalLink = (href) =>
  /^https?:\/\//.test(href ?? '');


const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href.toString());

  // Jika tautan bersifat internal dan href yang valid diberikan, dapatkan URL yang sudah dilokalkan.
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
- **Melokalisasi URL**:  
  Untuk tautan internal (yaitu, bukan tautan eksternal), `getLocalizedUrl` digunakan untuk secara otomatis menambahkan prefiks URL dengan locale saat ini. Ini berarti jika pengguna Anda menggunakan bahasa Prancis, melewatkan `/about` sebagai `href` akan mengubahnya menjadi `/fr/about`.

- **Mengembalikan Link**:  
  Komponen mengembalikan elemen `<a>` dengan URL yang sudah dilokalisasi, memastikan navigasi konsisten dengan locale.

Dengan mengintegrasikan komponen `Link` ini di seluruh aplikasi Anda, Anda mempertahankan pengalaman pengguna yang koheren dan sadar bahasa sekaligus mendapatkan manfaat dari peningkatan SEO dan kegunaan.

### (Opsional) Langkah 12: Mendapatkan locale saat ini dalam Server Actions

Jika Anda membutuhkan locale aktif di dalam Server Action (misalnya, untuk melokalkan email atau menjalankan logika yang sadar locale), panggil `getLocale` dari `next-intlayer/server`:

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
> 1. Pertama, memeriksa header permintaan untuk nilai locale yang mungkin telah diatur oleh middleware
> 2. Jika tidak ditemukan locale di header, mencari locale yang disimpan di cookie
> 3. Jika tidak ditemukan cookie, mencoba mendeteksi bahasa yang dipilih pengguna dari pengaturan browser mereka
> 4. Sebagai upaya terakhir, ia akan kembali ke locale default yang dikonfigurasi dalam aplikasi
>
> Ini memastikan locale yang paling sesuai dipilih berdasarkan konteks yang tersedia.

### (Opsional) Langkah 13: Optimalkan ukuran bundle Anda

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

> Catatan: Paket ini tidak diinstal secara default karena plugin SWC masih bersifat eksperimental di Next.js. Hal ini mungkin berubah di masa depan.

> Catatan: Jika Anda mengatur opsi sebagai `importMode: 'dynamic'` atau `importMode: 'live'`, maka akan bergantung pada Suspense, sehingga Anda harus membungkus pemanggilan `useIntlayer` Anda dalam batas `Suspense`. Itu berarti, Anda tidak dapat menggunakan `useIntlayer` secara langsung di tingkat atas komponen Halaman / Layout Anda.

### Konfigurasi TypeScript

Intlayer menggunakan augmentasi modul untuk mendapatkan manfaat dari TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kesalahan Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

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
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
