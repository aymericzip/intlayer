---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Cara menerjemahkan Create React App Anda – panduan i18n 2025
description: Temukan cara membuat situs web Create React App (CRA) Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Create React App
  - CRA
  - JavaScript
  - React
slugs:
  - doc
  - environment
  - create-react-app
applicationTemplate: https://github.com/aymericzip/intlayer-react-cra-template
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Create React App Anda menggunakan Intlayer | Internasionalisasi (i18n)

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-react-cra-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Application Template](https://github.com/aymericzip/intlayer-react-cra-template) di GitHub.

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) open-source yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Kelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Lokalisisasi metadata**, rute, dan konten secara dinamis.
- **Pastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Manfaatkan fitur canggih**, seperti deteksi dan pergantian locale secara dinamis.

## Panduan Langkah demi Langkah untuk Mengatur Intlayer di Aplikasi React

### Langkah 1: Instalasi Dependensi

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer react-intlayer react-scripts-intlayer
```

```bash packageManager="yarn"
yarn add intlayer react-intlayer react-scripts-intlayer
```

- **intlayer**

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

- **react-intlayer**

  Paket yang mengintegrasikan Intlayer dengan aplikasi React. Paket ini menyediakan context providers dan hooks untuk internasionalisasi React.

- **react-scripts-intlayer**

  Termasuk perintah `react-scripts-intlayer` dan plugin untuk mengintegrasikan Intlayer dengan aplikasi berbasis Create React App. Plugin ini berbasis pada [craco](https://craco.js.org/) dan mencakup konfigurasi tambahan untuk bundler [Webpack](https://webpack.js.org/).

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
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
// konfigurasi untuk internasionalisasi
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

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi CRA Anda

Ubah skrip Anda untuk menggunakan react-intlayer

```json fileName="package.json"
  "scripts": {
    "build": "react-scripts-intlayer build",
    "start": "react-scripts-intlayer start",
    "transpile": "intlayer build"
  },
```

> Skrip `react-scripts-intlayer` didasarkan pada [CRACO](https://craco.js.org/). Anda juga dapat mengimplementasikan pengaturan Anda sendiri berdasarkan plugin craco intlayer. [Lihat contoh di sini](https://github.com/aymericzip/intlayer/blob/main/examples/react-app/craco.config.js).

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app.content.tsx" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";
import React, { type ReactNode } from "react";

const appContent = {
  key: "app",
  content: {
    getStarted: t<ReactNode>({
      en: (
        <>
          Edit <code>src/App.tsx</code> dan simpan untuk memuat ulang
        </>
      ),
      fr: (
        <>
          Éditez <code>src/App.tsx</code> et enregistrez pour recharger
        </>
      ),
      es: (
        <>
          Edita <code>src/App.tsx</code> dan simpan untuk memuat ulang
        </>
      ),
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
} satisfies Dictionary;

export default appContent;
```

```jsx fileName="src/app.content.mjx" codeFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Mulai dengan mengedit",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Learn React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

export default appContent;
```

```jsx fileName="src/app.content.csx" codeFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    getStarted: t({
      en: "Mulai dengan mengedit",
      fr: "Commencez par éditer",
      es: "Comience por editar",
    }),
    reactLink: {
      href: "https://reactjs.org",
      content: t({
        en: "Pelajari React",
        fr: "Apprendre React",
        es: "Aprender React",
      }),
    },
  },
};

module.exports = appContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama sudah dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

> Jika file konten Anda menyertakan kode TSX, Anda harus mempertimbangkan untuk mengimpor `import React from "react";` di file konten Anda.

### Langkah 5: Gunakan Intlayer dalam Kode Anda

Akses kamus konten Anda di seluruh aplikasi Anda:

```tsx {4,7} fileName="src/App.tsx"  codeFormat="typescript"
import logo from "./logo.svg";
import "./App.css";
import type { FC } from "react";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent: FC = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App: FC = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {3,6} fileName="src/App.mjx" codeFormat="esm"
import "./App.css";
import logo from "./logo.svg";
import { IntlayerProvider, useIntlayer } from "react-intlayer";

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

```jsx {3,6} fileName="src/App.csx" codeFormat="commonjs"
require("./App.css");
const logo = require("./logo.svg");
const { IntlayerProvider, useIntlayer } = require("react-intlayer");

const AppContent = () => {
  const content = useIntlayer("app");

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {content.getStarted}
      <a
        className="App-link"
        href={content.reactLink.href.value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content.reactLink.content}
      </a>
    </div>
  );
};

const App = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);
```

> Catatan: Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda harus memanggil nilai fungsi tersebut, seperti:

> ```jsx
> <img src={content.image.src.value} alt={content.image.value} />
> ```

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md).

### (Opsional) Langkah 6: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini memungkinkan Anda untuk mengatur locale aplikasi dan memperbarui konten sesuai dengan locale tersebut.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
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

```jsx fileName="src/components/LocaleSwitcher.mjx" codeFormat="esm"
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

> Secara default, rute tidak diberi prefix untuk locale default. Jika Anda ingin memberikan prefix pada locale default, Anda dapat mengatur opsi `middleware.prefixDefault` ke `true` dalam konfigurasi Anda. Lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk informasi lebih lanjut.

Untuk menambahkan routing yang dilokalisasi ke aplikasi Anda, Anda dapat membuat komponen `LocaleRouter` yang membungkus rute aplikasi Anda dan menangani routing berdasarkan locale. Berikut adalah contoh menggunakan [React Router](https://reactrouter.com/home):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
// Mengimpor dependensi dan fungsi yang diperlukan
import { type Locales, configuration, getPathWithoutLocale } from "intlayer"; // Fungsi utilitas dan tipe dari 'intlayer'
// Fungsi utilitas dan tipe dari 'intlayer'
import type { FC, PropsWithChildren } from "react"; // Tipe React untuk komponen fungsional dan props
import { IntlayerProvider } from "react-intlayer"; // Provider untuk konteks internasionalisasi
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Komponen router untuk mengelola navigasi

// Mendestrukturisasi konfigurasi dari Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponen yang menangani lokalisasi dan membungkus children dengan konteks locale yang sesuai.
 * Ini mengelola deteksi dan validasi locale berbasis URL.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Mendapatkan path URL saat ini

  // Menentukan locale saat ini, menggunakan default jika tidak diberikan
  const currentLocale = locale ?? defaultLocale;

  // Menghapus prefix locale dari path untuk membentuk path dasar
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Path URL saat ini
  );

  /**
   * Jika middleware.prefixDefault bernilai true, locale default harus selalu diberi prefix.
   */
  if (middleware.prefixDefault) {
    // Validasi locale
    if (!locale || !locales.includes(locale)) {
      // Redirect ke locale default dengan path yang diperbarui
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Gantikan entri riwayat saat ini dengan yang baru
        />
      );
    }

    // Bungkus children dengan IntlayerProvider dan set locale saat ini
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Ketika middleware.prefixDefault adalah false, locale default tidak diprefiks.
     * Pastikan locale saat ini valid dan bukan locale default.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Kecualikan locale default
        )
        .includes(currentLocale) // Periksa apakah locale saat ini ada dalam daftar locale yang valid
    ) {
      // Redirect ke path tanpa prefix locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bungkus children dengan IntlayerProvider dan set locale saat ini
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponen router yang mengatur rute spesifik locale.
 * Menggunakan React Router untuk mengelola navigasi dan merender komponen yang dilokalkan.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Pola rute untuk menangkap locale (misalnya, /en/, /fr/) dan mencocokkan semua path berikutnya
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Membungkus children dengan manajemen locale
          />
        ))}

      {
        // Jika prefix untuk locale default dinonaktifkan, render children langsung di path root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Membungkus children dengan manajemen locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.mjx" codeFormat="esm"
// Mengimpor dependensi dan fungsi yang diperlukan
import { configuration, getPathWithoutLocale } from "intlayer"; // Fungsi utilitas dan tipe dari 'intlayer'
// Fungsi utilitas dan tipe dari 'intlayer'
import { IntlayerProvider } from "react-intlayer"; // Provider untuk konteks internasionalisasi
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"; // Komponen router untuk mengelola navigasi

// Mendestrukturisasi konfigurasi dari Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponen yang menangani lokalisasi dan membungkus children dengan konteks locale yang sesuai.
 * Ini mengelola deteksi dan validasi locale berbasis URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Mendapatkan path URL saat ini

  // Menentukan locale saat ini, menggunakan default jika tidak disediakan
  const currentLocale = locale ?? defaultLocale;

  // Menghapus prefix locale dari path untuk membangun path dasar
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Path URL saat ini
  );

  /**
   * Jika middleware.prefixDefault bernilai true, locale default harus selalu diprefix.
   */
  if (middleware.prefixDefault) {
    // Validasi locale
    if (!locale || !locales.includes(locale)) {
      // Redirect ke locale default dengan path yang diperbarui
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Ganti entri riwayat saat ini dengan yang baru
        />
      );
    }

    // Bungkus children dengan IntlayerProvider dan set locale saat ini
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Ketika middleware.prefixDefault adalah false, locale default tidak diberi prefix.
     * Pastikan locale saat ini valid dan bukan locale default.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Kecualikan locale default
        )
        .includes(currentLocale) // Periksa apakah locale saat ini ada dalam daftar locale yang valid
    ) {
      // Redirect ke path tanpa prefix locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bungkus children dengan IntlayerProvider dan set locale saat ini
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponen router yang mengatur rute spesifik locale.
 * Menggunakan React Router untuk mengelola navigasi dan merender komponen yang dilokalkan.
 */
export const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Pola rute untuk menangkap locale (misalnya, /en/, /fr/) dan mencocokkan semua path berikutnya
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Membungkus children dengan manajemen locale
          />
        ))}

      {
        // Jika prefix untuk locale default dinonaktifkan, render children langsung di path root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Membungkus children dengan manajemen locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

```jsx fileName="src/components/LocaleRouter.cjx" codeFormat="commonjs"
// Mengimpor dependensi dan fungsi yang diperlukan
const { configuration, getPathWithoutLocale } = require("intlayer"); // Fungsi utilitas dan tipe dari 'intlayer'
const { IntlayerProvider, useLocale } = require("react-intlayer"); // Provider untuk konteks internasionalisasi
const {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} = require("react-router-dom"); // Komponen router untuk mengelola navigasi

// Mendestrukturisasi konfigurasi dari Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * Komponen yang menangani lokalisasi dan membungkus children dengan konteks locale yang sesuai.
 * Komponen ini mengelola deteksi dan validasi locale berbasis URL.
 */
const AppLocalized = ({ children, locale }) => {
  const { pathname, search } = useLocation(); // Mendapatkan path URL saat ini

  // Menentukan locale saat ini, menggunakan default jika tidak disediakan
  const currentLocale = locale ?? defaultLocale;

  // Menghapus prefix locale dari path untuk membentuk path dasar
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Path URL saat ini
  );

  /**
   * Jika middleware.prefixDefault bernilai true, locale default harus selalu diprefix.
   */
  if (middleware.prefixDefault) {
    // Memvalidasi locale
    if (!locale || !locales.includes(locale)) {
      // Redirect ke locale default dengan path yang diperbarui
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Gantikan entri history saat ini dengan yang baru
        />
      );
    }

    // Bungkus children dengan IntlayerProvider dan set locale saat ini
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * Ketika middleware.prefixDefault adalah false, locale default tidak diberi prefix.
     * Pastikan locale saat ini valid dan bukan locale default.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (locale) => locale.toString() !== defaultLocale.toString() // Kecualikan locale default
        )
        .includes(currentLocale) // Periksa apakah locale saat ini ada dalam daftar locale yang valid
    ) {
      // Redirect ke path tanpa prefix locale
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Bungkus children dengan IntlayerProvider dan set locale saat ini
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

/**
 * Komponen router yang mengatur rute spesifik locale.
 * Menggunakan React Router untuk mengelola navigasi dan merender komponen yang dilokalisasi.
 */
const LocaleRouter = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Pola rute untuk menangkap locale (misalnya, /en/, /fr/) dan mencocokkan semua path berikutnya
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Membungkus children dengan manajemen locale
          />
        ))}

      {
        // Jika prefix untuk locale default dinonaktifkan, render children langsung di path root
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Membungkus children dengan manajemen locale
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
```

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

// ... Komponen AppContent Anda

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);
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
  const { pathname, search } = useLocation(); // Mendapatkan path URL saat ini. Contoh: /fr/about?foo=bar
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
              {/* Bahasa dalam bahasa Inggris - misalnya French */}
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
              {/* Bahasa dalam bahasa Inggris - misalnya French */}
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
      // Membuat URL dengan locale yang diperbarui
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
              {/* Lokal - misalnya FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Lokal sendiri - misalnya Français */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam Lokal saat ini - misalnya Francés dengan lokal saat ini disetel ke Locales.SPANISH */}
              {getLocaleName(localeItem)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam bahasa Inggris - misalnya French */}
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
> - [`atribut hrefLang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)
> - [`atribut lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
> - [`atribut dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)
> - [`atribut aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)

### (Opsional) Langkah 9: Mengubah Atribut Bahasa dan Arah pada HTML

Ketika aplikasi Anda mendukung banyak bahasa, sangat penting untuk memperbarui atribut `lang` dan `dir` pada tag `<html>` agar sesuai dengan lokal saat ini. Melakukan hal ini memastikan:

- **Aksesibilitas**: Pembaca layar dan teknologi bantu mengandalkan atribut `lang` yang benar untuk mengucapkan dan menginterpretasikan konten dengan akurat.
- **Perenderan Teks**: Atribut `dir` (arah) memastikan teks dirender dalam urutan yang tepat (misalnya, kiri-ke-kanan untuk bahasa Inggris, kanan-ke-kiri untuk bahasa Arab atau Ibrani), yang penting untuk keterbacaan.
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
 * - `dir`: Memastikan urutan bacaan yang benar (misalnya, 'ltr' untuk bahasa Inggris, 'rtl' untuk bahasa Arab).
 *
 * Pembaruan dinamis ini penting untuk perenderan teks yang tepat, aksesibilitas, dan SEO.
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
 * - `lang`: Memberi tahu browser dan mesin pencari tentang bahasa halaman.
 * - `dir`: Memastikan urutan pembacaan yang benar (misalnya, 'ltr' untuk Bahasa Inggris, 'rtl' untuk Bahasa Arab).
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
 * - `dir`: Memastikan urutan pembacaan yang benar (misalnya, 'ltr' untuk Bahasa Inggris, 'rtl' untuk Bahasa Arab).
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

Integrasikan hook ini ke dalam komponen utama Anda agar atribut HTML diperbarui setiap kali locale berubah:

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

module.exports = App;
```

Dengan menerapkan perubahan ini, aplikasi Anda akan:

- Memastikan atribut **bahasa** (`lang`) mencerminkan locale saat ini dengan benar, yang penting untuk SEO dan perilaku browser.
- Menyesuaikan **arah teks** (`dir`) sesuai dengan locale, meningkatkan keterbacaan dan kegunaan untuk bahasa dengan urutan baca yang berbeda.
- Memberikan pengalaman yang lebih **aksesibel**, karena teknologi bantu bergantung pada atribut ini untuk berfungsi secara optimal.

### Konfigurasi TypeScript

Intlayer menggunakan augmentasi modul untuk mendapatkan manfaat dari TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

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

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

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
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).
