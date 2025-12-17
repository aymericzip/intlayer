---
createdAt: 2024-03-07
updatedAt: 2025-12-10
title: Cara menerjemahkan aplikasi Vite dan React Anda – panduan i18n 2025
description: Pelajari cara menambahkan internasionalisasi (i18n) ke aplikasi Vite dan React Anda menggunakan Intlayer. Ikuti panduan ini untuk membuat aplikasi Anda multibahasa.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-react
applicationTemplate: https://github.com/aymericzip/intlayer-vite-react-template
youtubeVideo: https://www.youtube.com/watch?v=dS9L7uJeak4
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Vite dan React Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) open-source yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Memanfaatkan fitur canggih**, seperti deteksi dan pergantian locale secara dinamis.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi Vite dan React

<Tab defaultTab="video">
  <TabItem label="Video" value="video">
  
<iframe title="Solusi i18n terbaik untuk Vite dan React? Temukan Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </TabItem>
  <TabItem label="Kode" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-react-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </TabItem>
</Tab>

Lihat [Application Template](https://github.com/aymericzip/intlayer-vite-react-template) di GitHub.

### Langkah 1: Instalasi Dependencies

Instal paket yang diperlukan menggunakan npm:

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

- **intlayer**
  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **react-intlayer**
  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Paket ini menyediakan context providers dan hooks untuk internasionalisasi React.

- **vite-intlayer**
  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Bahasa lain yang Anda gunakan
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
// Konfigurasi internasionalisasi
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Bahasa lain yang Anda gunakan
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
// Konfigurasi internasionalisasi
const config = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      // Bahasa lain yang Anda gunakan
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer ke dalam konfigurasi Anda.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer dalam aplikasi Vite. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> dan simpan untuk menguji HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Klik pada logo Vite dan React untuk mempelajari lebih lanjut",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "React logo",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Jangan lupa impor React jika Anda menggunakan node React dalam konten Anda
        en: (
          <>
            Edit <code>src/App.tsx</code> dan simpan untuk menguji HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
        ),
      },

    readTheDocs: t({
      en: "Click on the Vite and React logos to learn more",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
      id: "Klik pada logo Vite dan React untuk mempelajari lebih lanjut",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Logo Vite",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    reactLogo: t({
      en: "Logo React",
      fr: "Logo React",
      es: "Logo React",
    }),

    title: "Vite + React",

    count: t({
      en: "jumlah adalah ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit:
      t <
      ReactNode >
      {
        // Jangan lupa impor React jika Anda menggunakan node React dalam konten Anda
        en: (
          <>
            Edit <code>src/App.tsx</code> dan simpan untuk menguji HMR
          </>
        ),
        fr: (
          <>
            Éditez <code>src/App.tsx</code> et enregistrez pour tester HMR
          </>
        ),
        es: (
          <>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </>
/        ),
      },

    readTheDocs: t({
      en: "Klik pada logo Vite dan React untuk mempelajari lebih lanjut",
      fr: "Cliquez sur les logos Vite et React pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y React para obtener más información",
    }),
  },
};

module.exports = appContent;
```

```json fileName="src/app.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "app",
  "content": {
    "viteLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Logo Vite",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "reactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Logo React",
        "fr": "Logo React",
        "es": "Logo React"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + React",
        "fr": "Vite + React",
        "es": "Vite + React",
        "id": "Vite + React"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es ",
        "id": "jumlah adalah "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/App.tsx and save to test HMR",
        "fr": "Éditez src/App.tsx et enregistrez pour tester HMR",
        "es": "Edita src/App.tsx y guarda para probar HMR",
        "id": "Edit src/App.tsx dan simpan untuk menguji HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and React logos to learn more",
        "fr": "Cliquez sur les logos Vite et React pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y React para obtener más información",
        "id": "Klik pada logo Vite dan React untuk mempelajari lebih lanjut"
      }
    }
        "id": "Klik pada logo Vite dan React untuk mempelajari lebih lanjut"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama sudah termasuk ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

> Jika file konten Anda menyertakan kode TSX, Anda harus mempertimbangkan untuk mengimpor `import React from "react";` dalam file konten Anda.

### Langkah 5: Gunakan Intlayer dalam Kode Anda

Akses kamus konten Anda di seluruh aplikasi Anda:

```tsx {5,9} fileName="src/App.tsx" codeFormat="typescript"
import { useState, type FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.msx" codeFormat="esm"
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```tsx {5,9} fileName="src/App.csx" codeFormat="commonjs"
const { useState } = require("react");
const reactLogo = require("./assets/react.svg");
const viteLogo = require("/vite.svg");
require("./App.css");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="logo react"
            alt={content.reactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p className="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda harus memanggil nilai fungsi tersebut, seperti:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md).

### (Opsional) Langkah 6: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini memungkinkan Anda untuk mengatur locale aplikasi dan memperbarui konten sesuai dengan locale tersebut.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FC } from "react";
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher: FC = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Ubah Bahasa ke Bahasa Inggris
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Ubah Bahasa ke Bahasa Inggris
    </button>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.English)}>
      Ubah Bahasa ke Bahasa Inggris
    </button>
  );
};
```

> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md).

### (Opsional) Langkah 7: Tambahkan Routing yang Dilokalkan ke aplikasi Anda

Tujuan dari langkah ini adalah untuk membuat rute unik untuk setiap bahasa. Ini berguna untuk SEO dan URL yang ramah SEO.
Contoh:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Secara default, rute tidak diberi awalan untuk locale default. Jika Anda ingin memberi awalan pada locale default, Anda dapat mengatur opsi `middleware.prefixDefault` ke `true` dalam konfigurasi Anda. Lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk informasi lebih lanjut.

Untuk menambahkan routing yang dilokalkan ke aplikasi Anda, Anda dapat membuat komponen `LocaleRouter` yang membungkus rute aplikasi Anda dan menangani routing berbasis locale. Berikut adalah contoh menggunakan [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer"; // Fungsi utilitas dan tipe dari 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipe React untuk komponen fungsional dan props
import { IntlayerProvider } from "react-intlayer"; // Provider untuk konteks internasionalisasi
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Komponen router untuk mengelola navigasi

/**
 * Komponen router yang mengatur rute spesifik berdasarkan locale.
 * Menggunakan React Router untuk mengelola navigasi dan merender komponen yang dilokalkan.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Pola rute untuk menangkap locale (misal: /en/, /fr/) dan mencocokkan semua path berikutnya
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Membungkus children dengan pengelolaan locale
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
import { localeMap } from 'intlayer'; // Fungsi utilitas dan tipe dari 'intlayer'
import type { FC, PropsWithChildren } from 'react'; // Tipe React untuk komponen fungsional dan props
import { IntlayerProvider } from 'react-intlayer'; // Provider untuk konteks internasionalisasi
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Komponen router untuk mengelola navigasi

/**
 * Komponen router yang mengatur rute spesifik locale.
 * Menggunakan React Router untuk mengelola navigasi dan merender komponen yang dilokalkan.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Pola rute untuk menangkap locale (misal: /en/, /fr/) dan mencocokkan semua path berikutnya
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Membungkus children dengan manajemen locale
        />
      ))}
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
const { localeMap } = require("intlayer"); // Fungsi utilitas dan tipe dari 'intlayer'
const React = require("react"); // Import React
const { IntlayerProvider } = require("react-intlayer"); // Provider untuk konteks internasionalisasi
const { BrowserRouter, Route, Routes } = require("react-router-dom"); // Komponen router untuk mengelola navigasi

/**
 * Komponen router yang mengatur rute spesifik locale.
 * Menggunakan React Router untuk mengelola navigasi dan merender komponen yang dilokalisasi.
 */
const LocaleRouter = ({ children }) =>
  React.createElement(
    BrowserRouter,
    {},
    React.createElement(
      Routes,
      {},
      localeMap(({ locale, urlPrefix }) =>
        React.createElement(Route, {
          path: `${urlPrefix}/*`,
          key: locale,
          element: React.createElement(IntlayerProvider, { locale }, children),
        })
      )
    )
  );

exports.LocaleRouter = LocaleRouter;
```

> Catatan: Jika Anda menggunakan `routing.mode: 'no-prefix' | 'search-params'`, Anda mungkin tidak perlu menggunakan fungsi `localeMap`.

Kemudian, Anda dapat menggunakan komponen `LocaleRouter` dalam aplikasi Anda:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FC } from "react";

// ... Komponen AppContent Anda

const App: FC = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.mjx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Komponen AppContent Anda

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

```jsx fileName="src/App.cjx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

jsx fileName="src/App.cjx" codeFormat="commonjs"
// ... Komponen AppContent Anda

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
```

Secara paralel, Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan routing sisi server ke aplikasi Anda. Plugin ini akan secara otomatis mendeteksi locale saat ini berdasarkan URL dan mengatur cookie locale yang sesuai. Jika tidak ada locale yang ditentukan, plugin akan menentukan locale yang paling sesuai berdasarkan preferensi bahasa browser pengguna. Jika tidak ada locale yang terdeteksi, maka akan mengarahkan ulang ke locale default.

> Perlu dicatat bahwa untuk menggunakan `intlayerProxy` dalam produksi, Anda perlu memindahkan paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

```typescript {3,7} fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { intlayer, intlayerProxy } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

```javascript {3,7} fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const { intlayer, intlayerProxy } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react(), intlayer(), intlayerProxy()],
});
```

### (Opsional) Langkah 8: Ubah URL saat locale berubah

Untuk mengubah URL saat locale berubah, Anda dapat menggunakan properti `onLocaleChange` yang disediakan oleh hook `useLocale`. Secara paralel, Anda dapat menggunakan hook `useLocation` dan `useNavigate` dari `react-router-dom` untuk memperbarui path URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { type FC } from "react";

const LocaleSwitcher: FC = () => {
  const { pathname, search } = useLocation(); // Dapatkan path URL saat ini. Contoh: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Bangun URL dengan locale yang diperbarui
      // Contoh: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Perbarui path URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Lokal - misal FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Lokal sendiri - misal Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam Lokal saat ini - misal Francés dengan lokal saat ini diset ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam Bahasa Inggris - misalnya French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.msx" codeFormat="esm"
import { useLocation, useNavigate } from "react-router-dom";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Mendapatkan path URL saat ini. Contoh: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Membangun URL dengan locale yang diperbarui
      // Contoh: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Perbarui path URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Lokal - misal FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Locale-nya sendiri - misal Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam Locale saat ini - misal Francés dengan locale saat ini diset ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam Bahasa Inggris - misal French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
```

```jsx fileName="src/components/LocaleSwitcher.csx" codeFormat="commonjs"
const { useLocation, useNavigate } = require("react-router-dom");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("react-intlayer");

const LocaleSwitcher = () => {
  const { pathname, search } = useLocation(); // Mendapatkan path URL saat ini. Contoh: /fr/about?foo=bar
  const navigate = useNavigate();

  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (locale) => {
      // Membangun URL dengan locale yang diperbarui
      // Contoh: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(`${pathname}${search}`, locale);

      // Memperbarui path URL
      navigate(pathWithLocale);
    },
  });

  return (
    <div>
      <button popoverTarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(location.pathname, localeItem)}
            hrefLang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>
              {/* Lokalisasi - misal FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Lokalisasi sendiri - misal Français */}
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
          </a>
        ))}
      </div>
    </div>
  );
};
```

> Referensi dokumentasi:
>
> - [`useLocale` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)
> - [`getLocaleName` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)
> - [`getLocalizedUrl` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)
> - [`getHTMLTextDir` hook](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)
> - [`hrefLang` attribute](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`lang` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`dir` attribute`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`aria-current` attribute`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

Berikut adalah **Langkah 9** yang diperbarui dengan penjelasan tambahan dan contoh kode yang disempurnakan:

---

### (Opsional) Langkah 9: Mengganti Atribut Bahasa dan Arah pada HTML

Ketika aplikasi Anda mendukung banyak bahasa, sangat penting untuk memperbarui atribut `lang` dan `dir` pada tag `<html>` agar sesuai dengan locale saat ini. Melakukan hal ini memastikan:

- **Aksesibilitas**: Pembaca layar dan teknologi bantu bergantung pada atribut `lang` yang benar untuk mengucapkan dan menginterpretasikan konten dengan akurat.
- **Rendering Teks**: Atribut `dir` (arah) memastikan teks ditampilkan dalam urutan yang tepat (misalnya, kiri-ke-kanan untuk bahasa Inggris, kanan-ke-kiri untuk bahasa Arab atau Ibrani), yang sangat penting untuk keterbacaan.
- **SEO**: Mesin pencari menggunakan atribut `lang` untuk menentukan bahasa halaman Anda, membantu menyajikan konten lokal yang tepat dalam hasil pencarian.

Dengan memperbarui atribut ini secara dinamis saat locale berubah, Anda menjamin pengalaman yang konsisten dan dapat diakses bagi pengguna di semua bahasa yang didukung.

#### Mengimplementasikan Hook

Buat hook kustom untuk mengelola atribut HTML. Hook ini mendengarkan perubahan locale dan memperbarui atribut sesuai:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Memperbarui atribut `lang` dan `dir` elemen HTML <html> berdasarkan locale saat ini.
 * - `lang`: Memberitahu browser dan mesin pencari tentang bahasa halaman.
 * - `dir`: Memastikan urutan bacaan yang benar (misalnya, 'ltr' untuk Bahasa Inggris, 'rtl' untuk Bahasa Arab).
 *
 * Pembaruan dinamis ini penting untuk rendering teks yang tepat, aksesibilitas, dan SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Perbarui atribut bahasa ke locale saat ini.
    document.documentElement.lang = locale;

    // Atur arah teks berdasarkan locale saat ini.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.msx" codeFormat="esm"
import { useEffect } from "react";
import { useLocale } from "react-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Memperbarui atribut `lang` dan `dir` elemen HTML <html> berdasarkan locale saat ini.
 * - `lang`: Memberitahu browser dan mesin pencari tentang bahasa halaman.
 * - `dir`: Memastikan urutan pembacaan yang benar (misalnya, 'ltr' untuk bahasa Inggris, 'rtl' untuk bahasa Arab).
 *
 * Pembaruan dinamis ini penting untuk rendering teks yang tepat, aksesibilitas, dan SEO.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Perbarui atribut bahasa ke locale saat ini.
    document.documentElement.lang = locale;

    // Atur arah teks berdasarkan locale saat ini.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.csx" codeFormat="commonjs"
const { useEffect } = require("react");
const { useLocale } = require("react-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Memperbarui atribut `lang` dan `dir` elemen HTML <html> berdasarkan locale saat ini.
 * - `lang`: Memberitahu browser dan mesin pencari tentang bahasa halaman.
 * - `dir`: Menjamin urutan pembacaan yang benar (misalnya, 'ltr' untuk Bahasa Inggris, 'rtl' untuk Bahasa Arab).
 *
 * Pembaruan dinamis ini penting untuk rendering teks yang tepat, aksesibilitas, dan SEO.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Perbarui atribut bahasa ke locale saat ini.
    document.documentElement.lang = locale;

    // Atur arah teks berdasarkan locale saat ini.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Menggunakan Hook di Aplikasi Anda

Integrasikan hook ini ke dalam komponen utama Anda sehingga atribut HTML akan diperbarui setiap kali locale berubah:

```tsx fileName="src/App.tsx" codeFormat="typescript"
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent: FC = () => {
  // Terapkan hook untuk memperbarui atribut lang dan dir pada tag <html> berdasarkan locale.
  useI18nHTMLAttributes();

  // ... Sisa komponen Anda
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.msx" codeFormat="esm"
import { IntlayerProvider, useIntlayer } from "react-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./App.css";

const AppContent = () => {
  // Terapkan hook untuk memperbarui atribut lang dan dir pada tag <html> berdasarkan locale.
  useI18nHTMLAttributes();

  // ... Sisa komponen Anda
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/App.csx" codeFormat="commonjs"
const { FC } = require("react");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./App.css");

const AppContent = () => {
  // Terapkan hook untuk memperbarui atribut lang dan dir pada tag <html> berdasarkan locale.
  useI18nHTMLAttributes();

  // ... Sisa komponen Anda
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

module.exports = App;
```

Dengan menerapkan perubahan ini, aplikasi Anda akan:

- Memastikan atribut **bahasa** (`lang`) mencerminkan locale saat ini dengan benar, yang penting untuk SEO dan perilaku browser.
- Menyesuaikan **arah teks** (`dir`) sesuai dengan locale, meningkatkan keterbacaan dan kegunaan untuk bahasa dengan urutan baca yang berbeda.
- Memberikan pengalaman yang lebih **aksesibel**, karena teknologi bantu bergantung pada atribut ini agar berfungsi secara optimal.

### (Opsional) Langkah 10: Membuat Komponen Link yang Dilokalkan

Untuk memastikan navigasi aplikasi Anda menghormati locale saat ini, Anda dapat membuat komponen `Link` kustom. Komponen ini secara otomatis menambahkan prefix bahasa saat ini pada URL internal, sehingga, misalnya, ketika pengguna berbahasa Prancis mengklik tautan ke halaman "About", mereka akan diarahkan ke `/fr/about` bukan `/about`.

Perilaku ini berguna untuk beberapa alasan:

- **SEO dan Pengalaman Pengguna**: URL yang dilokalisasi membantu mesin pencari mengindeks halaman spesifik bahasa dengan benar dan menyediakan konten kepada pengguna dalam bahasa pilihan mereka.
- **Konsistensi**: Dengan menggunakan tautan yang dilokalisasi di seluruh aplikasi Anda, Anda menjamin navigasi tetap dalam locale saat ini, mencegah perubahan bahasa yang tidak diinginkan.
- **Maintainability**: Memusatkan logika lokalisasi dalam satu komponen menyederhanakan pengelolaan URL, sehingga codebase Anda lebih mudah dipelihara dan dikembangkan seiring pertumbuhan aplikasi Anda.

Berikut adalah implementasi komponen `Link` yang dilokalisasi dalam TypeScript:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from "react";
import { useLocale } from "react-intlayer";

export interface LinkProps extends DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> {}

/**
 * Fungsi utilitas untuk memeriksa apakah URL yang diberikan bersifat eksternal.
 * Jika URL dimulai dengan http:// atau https://, maka dianggap eksternal.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Komponen Link kustom yang menyesuaikan atribut href berdasarkan locale saat ini.
 * Untuk tautan internal, menggunakan `getLocalizedUrl` untuk menambahkan prefix locale pada URL (misalnya, /fr/about).
 * Ini memastikan navigasi tetap dalam konteks locale yang sama.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Jika tautan bersifat internal dan href valid disediakan, dapatkan URL yang sudah dilokalkan.
    const hrefI18n =
      href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

    return (
      <a href={hrefI18n} ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.mjx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { forwardRef } from "react";

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
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Jika tautan bersifat internal dan href yang valid diberikan, dapatkan URL yang sudah dilokalkan.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return (
    <a href={hrefI18n} ref={ref} {...props}>
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

```jsx fileName="src/components/Link.csx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("react-intlayer");
const { forwardRef } = require("react");

/**
 * Fungsi utilitas untuk memeriksa apakah URL yang diberikan bersifat eksternal.
 * Jika URL dimulai dengan http:// atau https://, maka dianggap eksternal.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Komponen Link kustom yang menyesuaikan atribut href berdasarkan locale saat ini.
 * Untuk tautan internal, menggunakan `getLocalizedUrl` untuk menambahkan prefix locale pada URL (misalnya, /fr/about).
 * Ini memastikan navigasi tetap dalam konteks locale yang sama.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Jika tautan adalah internal dan href valid diberikan, dapatkan URL yang sudah dilokalkan.
  const localizedHref = isExternalLink ? href : getLocalizedUrl(href, locale);

  return (
    <a
      href={localizedHref}
      ref={ref}
      {...props}
      aria-current={isExternalLink ? "external" : undefined}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";
```

#### Cara Kerjanya

- **Mendeteksi Tautan Eksternal**:  
  Fungsi pembantu `checkIsExternalLink` menentukan apakah sebuah URL adalah eksternal. Tautan eksternal dibiarkan tidak berubah karena tidak memerlukan lokalisasi.

- **Mengambil Locale Saat Ini**:  
  Hook `useLocale` menyediakan locale saat ini (misalnya, `fr` untuk bahasa Perancis).

- **Melokalisasi URL**:  
  Untuk tautan internal (yaitu, bukan eksternal), `getLocalizedUrl` digunakan untuk secara otomatis menambahkan prefix locale pada URL. Ini berarti jika pengguna Anda menggunakan bahasa Perancis, memberikan `/about` sebagai `href` akan mengubahnya menjadi `/fr/about`.

- **Mengembalikan Link**:  
  Komponen mengembalikan elemen `<a>` dengan URL yang sudah dilokalisasi, memastikan navigasi konsisten dengan locale.

Dengan mengintegrasikan komponen `Link` ini di seluruh aplikasi Anda, Anda mempertahankan pengalaman pengguna yang koheren dan sadar bahasa sekaligus mendapatkan manfaat dari peningkatan SEO dan kegunaan.

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat dari TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

Disarankan untuk mengabaikan file-file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
