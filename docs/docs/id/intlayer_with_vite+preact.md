---
createdAt: 2025-04-18
updatedAt: 2025-12-30
title: Vite dan Preact i18n - Cara menerjemahkan aplikasi Preact Anda – panduan 2026
description: Temukan cara membuat situs web Vite dan Preact Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Vite
  - Preact
  - JavaScript
slugs:
  - doc
  - environment
  - vite-and-preact
applicationTemplate: https://github.com/aymericzip/intlayer-vite-preact-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 7.0.0
    date: 2025-10-28
    changes: Memperbarui komponen LocaleRouter untuk menggunakan konfigurasi rute baru
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web Vite dan Preact Anda menggunakan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="video">
  <Tab label="Video" value="video">
  
<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-vite-preact-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) open-source yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Menjamin dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion và deteksi kesalahan.
- **Memanfaatkan fitur canggih**, seperti deteksi dan pergantian locale secara dinamis.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi Vite dan Preact

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-vite-preact-template) di GitHub.

### Langkah 1: Instalasi Dependensi

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
bunx intlayer init
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), kompilasi, và [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **preact-intlayer**

  Paket yang mengintegrasikan Intlayer dengan aplikasi Preact. Ini menyediakan context providers dan hooks untuk internasionalisasi Preact.

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
      // Locale lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Default: prefix semua locale kecuali locale default
    storage: ["cookie", "header"], // Default: simpan locale di cookie dan deteksi dari header
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
      // Locale lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Default: prefix semua locale kecuali locale default
    storage: ["cookie", "header"], // Default: simpan locale di cookie và deteksi dari header
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
      // Locale lain milik Anda
    ],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "prefix-no-default", // Default: prefix semua locale kecuali locale default
    storage: ["cookie", "header"], // Default: simpan locale di cookie và deteksi dari header
  },
};

module.exports = config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, mode routing, opsi penyimpanan, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Vite Anda

Tambahkan plugin intlayer ke trong konfigurasi Anda.

```typescript fileName="vite.config.ts" codeFormat="typescript"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.mjs" codeFormat="esm"
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

```javascript fileName="vite.config.cjs" codeFormat="commonjs"
const { defineConfig } = require("vite");
const preact = require("@preact/preset-vite");
const { intlayer } = require("vite-intlayer");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Vite. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t<ComponentChildren>({
      en: (
        <>
          Edit <code>src/app.tsx</code> and save to test HMR
        </>
      ),
      fr: (
        <>
          Éditez <code>src/app.tsx</code> et enregistrez pour tester HMR
        </>
      ),
      es: (
        <>
          Edita <code>src/app.tsx</code> y guarda para probar HMR
        </>
      ),
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

```javascript fileName="src/app.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";
// import { h } from 'preact'; // Diperlukan jika Anda menggunakan JSX langsung di .mjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.jsx and save to test HMR",
      fr: "Éditez src/app.jsx et enregistrez pour tester HMR",
      es: "Edita src/app.jsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
    }),
  },
};

export default appContent;
```

```javascript fileName="src/app.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");
// const { h } = require('preact'); // Diperlukan jika Anda menggunakan JSX langsung di .cjs

/** @type {import('intlayer').Dictionary} */
const appContent = {
  key: "app",
  content: {
    viteLogo: t({
      en: "Vite logo",
      fr: "Logo Vite",
      es: "Logo Vite",
    }),
    preactLogo: t({
      en: "Preact logo",
      fr: "Logo Preact",
      es: "Logo Preact",
    }),

    title: "Vite + Preact",

    count: t({
      en: "count is ",
      fr: "le compte est ",
      es: "el recuento es ",
    }),

    edit: t({
      en: "Edit src/app.tsx and save to test HMR",
      fr: "Éditez src/app.tsx et enregistrez pour tester HMR",
      es: "Edita src/app.tsx y guarda para probar HMR",
    }),

    readTheDocs: t({
      en: "Click on the Vite and Preact logos to learn more",
      fr: "Cliquez sur les logos Vite et Preact pour en savoir plus",
      es: "Haga clic en los logotipos de Vite y Preact para obtener más información",
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
        "en": "Vite logo",
        "fr": "Logo Vite",
        "es": "Logo Vite"
      }
    },
    "preactLogo": {
      "nodeType": "translation",
      "translation": {
        "en": "Preact logo",
        "fr": "Logo Preact",
        "es": "Logo Preact"
      }
    },
    "title": {
      "nodeType": "translation",
      "translation": {
        "en": "Vite + Preact",
        "fr": "Vite + Preact",
        "es": "Vite + Preact"
      }
    },
    "count": {
      "nodeType": "translation",
      "translation": {
        "en": "count is ",
        "fr": "le compte est ",
        "es": "el recuento es "
      }
    },
    "edit": {
      "nodeType": "translation",
      "translation": {
        "en": "Edit src/app.tsx and save to test HMR",
        "fr": "Éditez src/app.tsx et enregistrez pour tester HMR",
        "es": "Edita src/app.tsx y guarda para probar HMR"
      }
    },
    "readTheDocs": {
      "nodeType": "translation",
      "translation": {
        "en": "Click on the Vite and Preact logos to learn more",
        "fr": "Cliquez sur les logos Vite et Preact pour en savoir plus",
        "es": "Haga clic en los logotipos de Vite y Preact para obtener más información"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama sudah dimasukkan ke trong direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/get_started.md).

> Jika file konten Anda menyertakan kode TSX, Anda mungkin perlu mengimpor `import { h } from "preact";` hoặc đảm bảo pragma JSX Anda sudah diatur dengan benar untuk Preact.

### Langkah 5: Gunakan Intlayer dalam Kode Anda

Akses kamus konten Anda di seluruh aplikasi:

```tsx {6,10} fileName="src/app.tsx" codeFormat="typescript"
import { useState } from "preact/hooks";
import type { FunctionalComponent } from "preact";
import preactLogo from "./assets/preact.svg"; // Mengasumsikan Anda memiliki preact.svg
import viteLogo from "/vite.svg";
import "./app.css"; // Mengasumsikan file CSS Anda bernama app.css
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent: FunctionalComponent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      {/* Konten Markdown */}
      <div>{content.myMarkdownContent}</div>

      {/* Konten HTML */}
      <div>{content.myHtmlContent}</div>

      <p class="read-the-docs">{content.readTheDocs}</p>
    </>
  );
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppContent />
  </IntlayerProvider>
);

export default App;
```

```jsx {5,9} fileName="src/app.jsx" codeFormat="esm"
import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";
import { IntlayerProvider, useIntlayer } from "preact-intlayer";

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

```jsx {5,9} fileName="src/app.cjsx" codeFormat="commonjs"
const { useState } = require("preact/hooks");
const preactLogo = require("./assets/preact.svg");
const viteLogo = require("/vite.svg");
require("./app.css");
const { IntlayerProvider, useIntlayer } = require("preact-intlayer");

const AppContent = () => {
  const [count, setCount] = useState(0);
  const content = useIntlayer("app");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} class="logo" alt={content.viteLogo.value} />
        </a>
        <a href="https://preactjs.com" target="_blank">
          <img
            src={preactLogo}
            class="logo preact"
            alt={content.preactLogo.value}
          />
        </a>
      </div>
      <h1>{content.title}</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          {content.count}
          {count}
        </button>
        <p>{content.edit}</p>
      </div>
      <p class="read-the-docs">{content.readTheDocs}</p>
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

> Catatan: Dalam Preact, `className` biasanya ditulis sebagai `class`.

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md) (API-nya serupa untuk `preact-intlayer`).

### (Opsional) Langkah 6: Ubah bahasa konten Anda

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini memungkinkan Anda để thiết lập locale ứng dụng và cập nhật nội dung tương ứng.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher: FunctionalComponent = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Ubah Bahasa ke Bahasa Inggris
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { Locales } from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Ubah Bahasa ke Bahasa Inggris
    </button>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { Locales } = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { setLocale } = useLocale();

  return (
    <button onClick={() => setLocale(Locales.ENGLISH)}>
      Ubah Bahasa ke Bahasa Inggris
    </button>
  );
};

module.exports = LocaleSwitcher;
```

> Để tìm hiểu thêm về hook `useLocale`, hãy tham khảo [tài liệu](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md) (API serupa cho `preact-intlayer`).

### (Opsional) Langkah 7: Tambahkan Perutean yang Dilokalkan ke aplikasi Anda

Tujuan dari langkah ini adalah untuk membuat rute unik cho mỗi ngôn ngữ. Điều này hữu ích cho SEO và các URL thân thiện với SEO.
Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Secara default, rute tidak diberi awalan cho locale mặc định. Nếu bạn muốn thêm tiền tố cho locale mặc định, bạn có thể đặt tùy chọn `routing.mode` thành `"prefix-all"` trong cấu hình của mình. Xem [tài liệu cấu hình](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) để biết thêm thông tin.

Để thêm perutean được bản địa hóa vào ứng dụng của bạn, bạn có thể tạo một thành phần `LocaleRouter` bao bọc các tuyến đường của ứng dụng và xử lý định tuyến dựa trên ngôn ngữ. Dưới đây là một ví dụ sử dụng [preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx"  codeFormat="typescript"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * Một thành phần định tuyến thiết lập các tuyến đường cụ thể cho từng ngôn ngữ.
 * Nó sử dụng preact-iso để quản lý điều hướng và hiển thị các thành phần cục bộ.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.jsx" codeFormat="esm"
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";

/**
 * Một thành phần định tuyến thiết lập các tuyến đường cụ thể cho từng ngôn ngữ.
 * Nó sử dụng preact-iso để quản lý điều hướng và hiển thị các thành phần cục bộ.
 */
export const LocaleRouter = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
```

```jsx fileName="src/components/LocaleRouter.cjsx" codeFormat="commonjs"
const { localeMap } = require("intlayer");
const { IntlayerProvider } = require("preact-intlayer");
const { LocationProvider, Router, Route } = require("preact-iso");

/**
 * Một thành phần định tuyến thiết lập các tuyến đường cụ thể cho từng ngôn ngữ.
 * Nó sử dụng preact-iso để quản lý điều hướng và hiển thị các thành phần cục bộ.
 */
const LocaleRouter = ({ children }) =>
  h(
    LocationProvider,
    {},
    h(
      Router,
      {},
      localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) =>
          h(Route, {
            key: locale,
            path: `${urlPrefix}/:rest*`,
            component: () => h(IntlayerProvider, { locale }, children),
          })
        )
    )
  );

module.exports = { LocaleRouter };
```

Sau đó, bạn có thể sử dụng thành phần `LocaleRouter` trong ứng dụng của mình:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... Thành phần AppContent của bạn

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { LocaleRouter } from "./components/LocaleRouter";

// ... Thành phần AppContent của bạn

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { LocaleRouter } = require("./components/LocaleRouter");

// ... Thành phần AppContent của bạn

const App = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

module.exports = App;
```

### (Opsional) Langkah 8: Ubah URL saat locale berubah

Để thay đổi URL khi ngôn ngữ thay đổi, bạn có thể sử dụng thuộc tính `onLocaleChange` được cung cấp bởi hook `useLocale`. Đồng thời, bạn có thể sử dụng phương thức `route` từ `useLocation` của `preact-iso` để cập nhật đường dẫn URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat="typescript"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";
import type { FunctionalComponent } from "preact";

const LocaleSwitcher: FunctionalComponent = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      // Xây dựng URL với ngôn ngữ đã cập nhật
      // Ví dụ: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // Cập nhật đường dẫn URL
      route(pathWithLocale, true); // true để thay thế (replace)
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
              // Điều hướng theo lập trình sau khi thiết lập ngôn ngữ sẽ được xử lý bởi onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - ví dụ: FR */}
              {localeItem}
            </span>
            <span>
              {/* Ngôn ngữ trong chính Locale đó - ví dụ: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Ngôn ngữ trong Locale hiện tại - ví dụ: Francés với ngôn ngữ hiện tại được đặt thành Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Ngôn ngữ bằng tiếng Anh - ví dụ: French */}
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.jsx" codeFormat="esm"
import { useLocation } from "preact-iso";
import {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "preact-intlayer";

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return (
    <div>
      <button popovertarget="localePopover">{getLocaleName(locale)}</button>
      <div id="localePopover" popover="auto">
        {availableLocales.map((localeItem) => (
          <a
            href={getLocalizedUrl(url, localeItem)}
            hreflang={localeItem}
            aria-current={locale === localeItem ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLocale(localeItem);
            }}
            key={localeItem}
          >
            <span>{localeItem}</span>
            <span>{getLocaleName(localeItem, localeItem)}</span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {getLocaleName(localeItem, Locales.ENGLISH)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LocaleSwitcher;
```

```jsx fileName="src/components/LocaleSwitcher.cjsx" codeFormat="commonjs"
const { useLocation } = require("preact-iso");
const {
  Locales,
  getHTMLTextDir,
  getLocaleName,
  getLocalizedUrl,
} = require("intlayer");
const { useLocale } = require("preact-intlayer");

const LocaleSwitcher = () => {
  const { url, route } = useLocation();
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(url, newLocale);
      route(pathWithLocale, true);
    },
  });

  return h(
    "div",
    {},
    h("button", { popovertarget: "localePopover" }, getLocaleName(locale)),
    h(
      "div",
      { id: "localePopover", popover: "auto" },
      availableLocales.map((localeItem) =>
        h(
          "a",
          {
            href: getLocalizedUrl(url, localeItem),
            hreflang: localeItem,
            "aria-current": locale === localeItem ? "page" : undefined,
            onClick: (e) => {
              e.preventDefault();
              setLocale(localeItem);
            },
            key: localeItem,
          },
          h("span", {}, localeItem),
          h("span", {}, getLocaleName(localeItem, localeItem)),
          h(
            "span",
            { dir: getHTMLTextDir(localeItem), lang: localeItem },
            getLocaleName(localeItem, locale)
          ),
          h(
            "span",
            { dir: "ltr", lang: Locales.ENGLISH },
            getLocaleName(localeItem, Locales.ENGLISH)
          )
        )
      )
    )
  );
};

module.exports = LocaleSwitcher;
```

> Tham khảo tài liệu:
>
> > - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md) (API tương tự cho `preact-intlayer`)> - [Hook `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)> - [Hook `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)> - [Hook `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)> - [Thuộc tính `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)> - [Thuộc tính `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)> - [Thuộc tính `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [Thuộc tính `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

### (Opsional) Langkah 9: Ganti atribut bahasa dan arah HTML

Khi ứng dụng của bạn hỗ trợ nhiều ngôn ngữ, việc cập nhật các thuộc tính `lang` và `dir` của thẻ `<html>` để khớp với locale hiện tại là rất quan trọng. Làm như vậy đảm bảo:

- **Khả năng truy cập**: Trình đọc màn hình và các công nghệ hỗ trợ dựa trên thuộc tính `lang` chính xác để phát âm và diễn giải nội dung một cách chính xác.
- **Hiển thị văn bản**: Thuộc tính `dir` (hướng) đảm bảo văn bản được hiển thị theo thứ tự thích hợp (ví dụ: từ trái sang phải cho tiếng Anh, từ phải sang trái cho tiếng Ả Rập hoặc tiếng Do Thái), điều này rất cần thiết cho khả năng đọc.
- **SEO**: Mesin pencari menggunakan atribut `lang` untuk menentukan bahasa halaman Anda, membantu menyajikan konten lokal yang tepat dalam hasil pencarian.

Bằng cách cập nhật các thuộc tính này một cách động khi locale thay đổi, bạn đảm bảo trải nghiệm nhất quán và dễ tiếp cận cho người dùng trên tất cả các ngôn ngữ được hỗ trợ.

#### Triển khai Hook

Tạo một hook tùy chỉnh để quản lý các thuộc tính HTML. Hook này lắng nghe các thay đổi về ngôn ngữ và cập nhật các thuộc tính cho phù hợp:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat="typescript"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên ngôn ngữ hiện tại.
 * - `lang`: Thông báo cho trình duyệt và công cụ tìm kiếm về ngôn ngữ của trang.
 * - `dir`: Đảm bảo thứ tự đọc chính xác (ví dụ: 'ltr' cho tiếng Anh, 'rtl' cho tiếng Ả Rập).
 *
 * Bản cập nhật động này rất cần thiết để hiển thị văn bản, khả năng truy cập và SEO thích hợp.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    // Cập nhật thuộc tính ngôn ngữ thành ngôn ngữ hiện tại.
    document.documentElement.lang = locale;

    // Đặt hướng văn bản dựa trên ngôn ngữ hiện tại.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.jsx" codeFormat="esm"
import { useEffect } from "preact/hooks";
import { useLocale } from "preact-intlayer";
import { getHTMLTextDir } from "intlayer";

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên ngôn ngữ hiện tại.
 */
export const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

```jsx fileName="src/hooks/useI18nHTMLAttributes.cjsx" codeFormat="commonjs"
const { useEffect } = require("preact/hooks");
const { useLocale } = require("preact-intlayer");
const { getHTMLTextDir } = require("intlayer");

/**
 * Cập nhật các thuộc tính `lang` và `dir` của phần tử HTML <html> dựa trên ngôn ngữ hiện tại.
 */
const useI18nHTMLAttributes = () => {
  const { locale } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};

module.exports = { useI18nHTMLAttributes };
```

#### Sử dụng Hook trong ứng dụng của bạn

Tích hợp hook vào thành phần chính của bạn để các thuộc tính HTML cập nhật bất cứ khi nào ngôn ngữ thay đổi:

```tsx fileName="src/app.tsx" codeFormat="typescript"
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer đã được nhập nếu AppContent cần nó
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Định nghĩa AppContent từ Bước 5

const AppWithHooks: FunctionalComponent = () => {
  // Áp dụng hook để cập nhật các thuộc tính lang và dir của thẻ <html> dựa trên ngôn ngữ.
  useI18nHTMLAttributes();

  // Giả sử AppContent là thành phần hiển thị nội dung chính của bạn từ Bước 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.jsx" codeFormat="esm"
import { IntlayerProvider } from "preact-intlayer";
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Định nghĩa AppContent từ Bước 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

```jsx fileName="src/app.cjsx" codeFormat="commonjs"
const { IntlayerProvider } = require("preact-intlayer");
const { useI18nHTMLAttributes } = require("./hooks/useI18nHTMLAttributes");
require("./app.css");
// Định nghĩa AppContent từ Bước 5

const AppWithHooks = () => {
  useI18nHTMLAttributes();
  return <AppContent />;
};

const App = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

module.exports = App;
```

### (Opsional) Langkah 10: Membuat Komponen Link yang Dilokalkan

Để đảm bảo rằng điều hướng của ứng dụng của bạn tôn trọng ngôn ngữ hiện tại, bạn có thể tạo một thành phần `Link` tùy chỉnh. Thành phần này tự động thêm tiền tố ngôn ngữ hiện tại vào các URL nội bộ.

Hành vi này hữu ích vì một số lý do:

- **SEO và Trải nghiệm người dùng**: URL được bản địa hóa giúp công cụ tìm kiếm lập chỉ mục các trang dành riêng cho ngôn ngữ một cách chính xác và cung cấp cho người dùng nội dung bằng ngôn ngữ ưa thích của họ.
- **Tính nhất quán**: Bằng cách sử dụng một liên kết được bản địa hóa trong toàn bộ ứng dụng của mình, bạn đảm bảo rằng điều hướng vẫn nằm trong ngôn ngữ hiện tại, ngăn chặn các thay đổi ngôn ngữ không mong muốn.
- **Khả năng bảo trì**: Centralizing logic bản địa hóa trong một component duy nhất giúp đơn giản hóa việc quản lý các URL.

Dưới đây là cách triển khai thành phần `Link` được bản địa hóa trong Preact:

```tsx fileName="src/components/Link.tsx" codeFormat="typescript"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Hàm tiện ích để kiểm tra xem một URL nhất định có phải là bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là bên ngoài.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Một thành phần Link tùy chỉnh thích ứng với thuộc tính href dựa trên ngôn ngữ hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố ngôn ngữ vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo rằng điều hướng vẫn nằm trong cùng một bối cảnh ngôn ngữ.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Nếu liên kết là nội bộ và một href hợp lệ được cung cấp, hãy lấy URL được bản địa hóa.
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

```jsx fileName="src/components/Link.jsx" codeFormat="esm"
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";

/**
 * Hàm tiện ích để kiểm tra xem một URL nhất định có phải là bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là bên ngoài.
 */
export const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Một thành phần Link tùy chỉnh thích ứng với thuộc tính href dựa trên ngôn ngữ hiện tại.
 * Đối với các liên kết nội bộ, it sử dụng `getLocalizedUrl` để thêm tiền tố ngôn ngữ vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo rằng điều hướng vẫn nằm trong cùng một bối cảnh ngôn ngữ.
 */
export const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Nếu liên kết là nội bộ và một href hợp lệ được cung cấp, hãy lấy URL được bản địa hóa.
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

```jsx fileName="src/components/Link.cjsx" codeFormat="commonjs"
const { getLocalizedUrl } = require("intlayer");
const { useLocale } = require("preact-intlayer");
const { forwardRef } = require("preact/compat");

/**
 * Hàm tiện ích để kiểm tra xem một URL nhất định có phải là bên ngoài hay không.
 * Nếu URL bắt đầu bằng http:// hoặc https://, nó được coi là bên ngoài.
 */
const checkIsExternalLink = (href) => /^https?:\/\//.test(href ?? "");

/**
 * Một thành phần Link tùy chỉnh thích ứng với thuộc tính href dựa trên ngôn ngữ hiện tại.
 * Đối với các liên kết nội bộ, nó sử dụng `getLocalizedUrl` để thêm tiền tố ngôn ngữ vào URL (ví dụ: /fr/about).
 * Điều này đảm bảo rằng điều hướng vẫn nằm trong cùng một bối cảnh ngôn ngữ.
 */
const Link = forwardRef(({ href, children, ...props }, ref) => {
  const { locale } = useLocale();
  const isExternalLink = checkIsExternalLink(href);

  // Nếu liên kết là nội bộ và một href hợp lệ được cung cấp, hãy lấy URL được bản địa hóa.
  const hrefI18n =
    href && !isExternalLink ? getLocalizedUrl(href, locale) : href;

  return h(
    "a",
    {
      href: hrefI18n,
      ref: ref,
      ...props,
    },
    children
  );
});

Link.displayName = "Link";

module.exports = { Link, checkIsExternalLink };
```

#### Cara Kerjanya

- **Mendeteksi Tautan Eksternal**:  
  Fungsi pembantu `checkIsExternalLink` menentukan apakah sebuah URL adalah eksternal. Tautan eksternal dibiarkan tanpa perubahan karena tidak memerlukan lokalisasi.
- **Mengambil Locale Saat Ini**:  
  Hook `useLocale` menyediakan locale saat ini (misalnya, `fr` untuk bahasa Prancis).
- **Melokalkan URL**:  
  Untuk tautan internal (yaitu, non-eksternal), `getLocalizedUrl` digunakan untuk secara otomatis menambahkan prefix locale saat ini ke URL. Ini berarti jika pengguna Anda dalam bahasa Prancis, meneruskan `/about` sebagai `href` akan mengubahnya menjadi `/fr/about`.
- **Mengembalikan Tautan**:  
  Komponen mengembalikan elemen `<a>` dengan URL yang sudah dilokalkan, memastikan navigasi konsisten dengan locale.

### (Opsional) Langkah 11: Render Markdown dan HTML

Intlayer mendukung rendering konten Markdown và HTML dalam Preact.

Bạn có thể tùy chỉnh việc hiển thị nội dung Markdown và HTML bằng cách sử dụng phương thức `.use()`. Phương thức này cho phép bạn ghi đè việc hiển thị mặc định của các thẻ cụ thể.

```tsx
import { useIntlayer } from "preact-intlayer";

const { myMarkdownContent, myHtmlContent } = useIntlayer("my-component");

// ...

return (
  <div>
    {/* Rendering dasar */}
    {myMarkdownContent}

    {/* Rendering kustom cho Markdown */}
    {myMarkdownContent.use({
      h1: (props) => <h1 style={{ color: "red" }} {...props} />,
    })}

    {/* Rendering dasar cho HTML */}
    {myHtmlContent}

    {/* Rendering kustom cho HTML */}
    {myHtmlContent.use({
      b: (props) => <strong style={{ color: "blue" }} {...props} />,
    })}
  </div>
);
```

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation để tận dụng lợi ích của TypeScript và làm cho codebase của bạn mạnh mẽ hơn.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dihasilkan secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Direkomendasikan cho Preact 10+
    // ...
  },
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

> Pastikan `tsconfig.json` Anda diatur cho Preact, terutama `jsx` và `jsxImportSource` hoặc `jsxFactory`/`jsxFragmentFactory` cho các phiên bản Preact cũ hơn nếu không sử dụng mặc định của `preset-vite`.

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari meng-commit file tersebut ke repository Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** cho các khóa dịch.
- **Deteksi kesalahan waktu nyata** cho các bản dịch còn thiếu.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Tindakan cepat** để dễ dàng tạo và cập nhật bản dịch.

Để biết thêm chi tiết về cách sử dụng tiện ích mở rộng, hãy tham khảo [tài liệu Tiện ích mở rộng Intlayer cho VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Melangkah Lebih Jauh

Để đi xa hơn, bạn có thể triển khai [trình soạn thảo trực quan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) hoặc mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

---
