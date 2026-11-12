---
createdAt: 2025-04-18
updatedAt: 2026-10-08
priority: 9
title: "Vite + Preact i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Siapkan Intlayer di aplikasi Vite dan Preact: konten bertipe per komponen, pengalih bahasa, rute terlokalisasi, dan bundle kecil."
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
applicationShowcase: https://intlayer-vite-preact-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 7.0.0
    date: 2025-10-28
    changes: "Memperbarui komponen LocaleRouter untuk menggunakan konfigurasi rute baru"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Terjemahkan situs web Vite dan Preact Anda menggunakan Intlayer

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `preact-i18n` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>
<Accordion header="Cakupan Preact Penuh">

Intlayer dioptimalkan untuk bekerja sempurna dengan Preact dengan menawarkan **pelingkupan konten tingkat komponen**, **lazy loading untuk terjemahan**, dan semua fitur yang diperlukan untuk meningkatkan internasionalisasi (i18n).

</Accordion>
<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>
<Accordion header="Kemudahan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **fully typed** (memiliki type safety penuh) untuk memastikan keakuratan konten Anda.

</Accordion>
<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**, dan **[agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

- [LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)
- [MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)
- [agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)

</Accordion>
<Accordion header="Otomatisasi">

Gunakan otomatisasi untuk menerjemahkan dalam pipeline CI/CD Anda menggunakan LLM pilihan Anda dengan biaya penyedia AI Anda. Intlayer juga menawarkan **compiler** untuk mengotomatiskan ekstraksi konten, serta [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk membantu **menerjemahkan di latar belakang**.

- [platform web](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

</Accordion>
<Accordion header="Performa">

Menghubungkan file JSON berukuran besar ke komponen dapat menyebabkan masalah kinerja dan reaktivitas. Intlayer mengoptimalkan pemuatan konten Anda pada saat build.

</Accordion>
<Accordion header="Menskalakan tanpa pengembang">

Lebih dari sekedar solusi i18n, Intlayer menyediakan **[editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)** yang dihosting sendiri dan **[CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)** untuk membantu Anda mengelola konten multibahasa secara **real-time**, membuat kolaborasi dengan penerjemah, copywriter, dan anggota tim lainnya menjadi lancar. Konten dapat disimpan secara lokal dan/atau jarak jauh.

- [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [CMS lengkap](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

</Accordion>
</AccordionGroup>

## Panduan Langkah demi Langkah untuk Mengatur Intlayer dalam Aplikasi Vite dan Preact

<Tabs defaultTab="video">
  <Tab label="Video" value="video">

<iframe title="The best i18n solution for Vite and Preact? Discover Intlayer" class="m-auto aspect-16/9 w-full overflow-hidden rounded-lg border-0" allow="autoplay; gyroscope;" loading="lazy" width="1080" height="auto" src="https://www.youtube.com/embed/dS9L7uJeak4?si=VaKmrYMmXjo3xpk2"/>

  </Tab>
  <Tab label="Code" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-vite-preact-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-vite-preact-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-vite-preact-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-vite-preact-template) di GitHub.

<Steps>
<Step number={1} title="Instalasi Dependensi">

Instal paket yang diperlukan menggunakan npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer preact-intlayer
npm install vite-intlayer --save-dev
```

```bash packageManager="pnpm"
pnpm add intlayer preact-intlayer
pnpm add vite-intlayer --save-dev
```

```bash packageManager="yarn"
yarn add intlayer preact-intlayer
yarn add vite-intlayer --save-dev
```

```bash packageManager="bun"
bun add intlayer preact-intlayer
bun add vite-intlayer --dev
```

- **intlayer**

  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), kompilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **vite-intlayer**

  Termasuk plugin Vite untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

</Step>
<Step number={2} title="Konfigurasi proyek Anda">

### Arsitektur

Dalam arsitektur ini, `preact-intlayer` menyediakan `IntlayerProvider` yang dipasang di `main.tsx` untuk membungkus hierarki Preact. Deklarasi konten berada di `src/` di samping komponen.

```bash
.
├── src
│   ├── app.content.tsx
│   ├── app.css
│   ├── app.tsx                       # Main Preact application component
│   ├── components
│   │   ├── LocaleSwitcher.content.ts
│   │   └── LocaleSwitcher.tsx
│   ├── main.tsx                      # Entry point with IntlayerProvider
│   └── vite-env.d.ts
├── index.html
├── intlayer.config.ts
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### Konfigurasi

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, mode routing, opsi penyimpanan, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

- [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

</Step>
<Step number={3} title="Integrasikan Intlayer dalam Konfigurasi Vite Anda">

Tambahkan plugin intlayer ke trong konfigurasi Anda.

```typescript fileName="vite.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { intlayer } from "vite-intlayer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), intlayer()],
});
```

> Plugin Vite `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Vite. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Vite. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa.

</Step>
<Step number={4} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app.content.tsx" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama berada di dalam direktori `contentDir` (secara default, `./src`) dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

- [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)

> Jika file konten Anda menyertakan kode TSX, Anda mungkin perlu mengimpor `import { h } from "preact";` atau memastikan pragma JSX Anda sudah diatur dengan benar untuk Preact.

</Step>
<Step number={5} title="Gunakan Intlayer dalam Kode Anda">

Akses kamus konten Anda di seluruh aplikasi:

```tsx {6,10} fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
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

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda harus memanggil nilai fungsi tersebut, seperti:

> ```tsx
> <img src={content.image.src.value} alt={content.image.value} />
> <img src={content.image.src.toString()} alt={content.image.toString()} />
> <img src={String(content.image.src)} alt={String(content.image)} />
> ```

> Catatan: Dalam Preact, `className` biasanya ditulis sebagai `class`.

> Untuk mempelajari lebih lanjut tentang hook `useIntlayer`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md) (API-nya serupa untuk `preact-intlayer`).

- [Dokumentasi Hook useIntlayer | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useIntlayer.md)

> Jika aplikasi Anda sudah ada, Anda dapat menggunakan [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) secara kombinasi dengan [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengonversi ribuan komponen dalam satu detik.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

</Step>
<Step number={6} title="Ubah bahasa konten Anda" isOptional={true}>

Untuk mengubah bahasa konten Anda, Anda dapat menggunakan fungsi `setLocale` yang disediakan oleh hook `useLocale`. Fungsi ini memungkinkan Anda mengatur locale aplikasi dan memperbarui konten yang sesuai.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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

> Untuk mempelajari lebih lanjut tentang hook `useLocale`, lihat [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md) (API serupa untuk `preact-intlayer`).

- [Dokumentasi Hook useLocale | react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)

</Step>
<Step number={7} title="Tambahkan Perutean yang Dilokalkan ke aplikasi Anda" isOptional={true}>

Tujuan dari langkah ini adalah untuk membuat rute unik cho mỗi ngôn ngữ. Điều này hữu ích cho SEO và các URL thân thiện với SEO.
Ví dụ:

```plaintext
- https://example.com/about
- https://example.com/es/about
- https://example.com/fr/about
```

> Secara default, rute tidak diberi awalan untuk locale default. Jika Anda ingin menambahkan prefix untuk locale default, Anda dapat mengatur opsi `routing.mode` menjadi `"prefix-all"` dalam konfigurasi Anda. Lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) untuk informasi lebih lanjut.

- [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

Untuk menambahkan routing terlokalisasi ke aplikasi Anda, Anda dapat membuat komponen `LocaleRouter` yang membungkus rute aplikasi dan menangani routing berdasarkan locale. Berikut adalah contoh menggunakan [preact-iso](https://github.com/preactjs/preact-iso):

```tsx fileName="src/components/LocaleRouter.tsx" codeFormat={["typescript", "esm"]}
import { localeMap } from "intlayer";
import { IntlayerProvider } from "preact-intlayer";
import { LocationProvider, Router, Route } from "preact-iso";
import type { ComponentChildren, FunctionalComponent } from "preact";

/**
 * Komponen routing yang mengatur rute spesifik untuk setiap locale.
 * Menggunakan preact-iso untuk mengelola navigasi dan merender komponen lokal.
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

Setelah itu, Anda dapat menggunakan komponen `LocaleRouter` dalam aplikasi Anda:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import { LocaleRouter } from "./components/LocaleRouter";
import type { FunctionalComponent } from "preact";

// ... Komponen AppContent Anda

const App: FunctionalComponent = () => (
  <LocaleRouter>
    <AppContent />
  </LocaleRouter>
);

export default App;
```

Secara bersamaan, Anda juga dapat menggunakan `intlayerProxy` untuk menambahkan routing sisi server ke aplikasi Anda. Plugin ini akan secara otomatis mendeteksi locale saat ini berdasarkan URL dan menetapkan cookie locale yang sesuai. Jika tidak ada locale yang ditentukan, plugin akan menentukan locale yang paling sesuai berdasarkan preferensi bahasa browser pengguna. Jika tidak ada locale yang terdeteksi, plugin akan mengarahkan ulang ke locale default.

> Perhatikan bahwa untuk menggunakan `intlayerProxy` dalam produksi, Anda perlu memindahkan paket `vite-intlayer` dari `devDependencies` ke `dependencies`.

> Sejak Intlayer v9, `intlayerProxy()` digabungkan langsung ke dalam plugin `intlayer()` dan diaktifkan secara default melalui opsi `routing.enableProxy` (`true` secara default). Mendaftarkannya secara terpisah seperti yang ditunjukkan di bawah ini sekarang bersifat opsional, ini dipertahankan untuk kompatibilitas mundur dan untuk setup yang perlu mengontrol urutan plugin. Atur `routing.enableProxy: false` untuk tidak mengikuti. Lihat [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md).

- [catatan rilis v9](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/releases/v9.md)

```typescript {3,7} fileName="vite.config.ts"
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    intlayer({
      proxy: {
        ignore: (req) => req.url?.startsWith("/api"),
      },
    }),
  ],
});
```

</Step>
<Step number={8} title="Ubah URL saat locale berubah" isOptional={true}>

Untuk mengubah URL saat locale berubah, Anda dapat menggunakan properti `onLocaleChange` yang disediakan oleh hook `useLocale`. Pada saat yang sama, Anda dapat menggunakan metode `route` dari `useLocation` milik `preact-iso` untuk memperbarui path URL.

```tsx fileName="src/components/LocaleSwitcher.tsx" codeFormat={["typescript", "esm"]}
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
      // Buat URL dengan locale yang diperbarui
      // Contoh: /es/about?foo=bar
      const pathWithLocale = getLocalizedUrl(url, newLocale);

      // Perbarui path URL
      route(pathWithLocale, true); // true untuk menggantikan (replace)
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
              // Navigasi terprogram setelah mengatur locale akan ditangani oleh onLocaleChange
            }}
            key={localeItem}
          >
            <span>
              {/* Locale - misalnya: FR */}
              {localeItem}
            </span>
            <span>
              {/* Bahasa dalam Locale itu sendiri - misalnya: Français */}
              {getLocaleName(localeItem, localeItem)}
            </span>
            <span dir={getHTMLTextDir(localeItem)} lang={localeItem}>
              {/* Bahasa dalam Locale saat ini - misalnya: Francés dengan locale saat ini diatur ke Locales.SPANISH */}
              {getLocaleName(localeItem, locale)}
            </span>
            <span dir="ltr" lang={Locales.ENGLISH}>
              {/* Bahasa dalam Bahasa Inggris - misalnya: French */}
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

> Lihat dokumentasi:
>
> - [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md) (API serupa untuk `preact-intlayer`)> - [Fungsi `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)> - [Fungsi `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)> - [Fungsi `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)> - [Atribut `hreflang`](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=fr)> - [Atribut `lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)> - [Atribut `dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)> - [Atribut `aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)> - [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)

- [Hook `useLocale`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/useLocale.md)
- [Function `getLocaleName`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocaleName.md)
- [Function `getLocalizedUrl`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getLocalizedUrl.md)
- [Function `getHTMLTextDir`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/intlayer/getHTMLTextDir.md)

Berikut adalah **Langkah 9** yang diperbarui dengan penjelasan tambahan dan contoh kode yang disempurnakan:

</Step>
<Step number={9} title="Ganti atribut bahasa dan arah HTML" isOptional={true}>

Ketika aplikasi Anda mendukung banyak bahasa, memperbarui atribut `lang` dan `dir` dari tag `<html>` agar sesuai dengan locale saat ini sangatlah penting. Melakukan hal ini memastikan:

- **Aksesibilitas**: Pembaca layar (screen reader) dan teknologi asistif bergantung pada atribut `lang` yang tepat untuk melafalkan dan menginterpretasikan konten dengan benar.
- **Rendering Teks**: Atribut `dir` (arah teks) memastikan teks ditampilkan dalam urutan yang tepat (misalnya: kiri-ke-kanan untuk bahasa Inggris/Indonesia, kanan-ke-kiri untuk bahasa Arab atau Ibrani), yang sangat penting untuk keterbacaan.
- **SEO**: Mesin pencari menggunakan atribut `lang` untuk menentukan bahasa halaman Anda, membantu menyajikan konten lokal yang tepat dalam hasil pencarian.

Dengan memperbarui atribut-atribut ini secara dinamis saat locale berubah, Anda memastikan pengalaman yang konsisten dan mudah diakses bagi pengguna di semua bahasa yang didukung.

#### Implementasi Hook

Buat hook kustom untuk mengelola atribut HTML. Hook ini memantau perubahan locale dan memperbarui atribut yang sesuai:

```tsx fileName="src/hooks/useI18nHTMLAttributes.tsx" codeFormat={["typescript", "esm"]}
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
    // Perbarui atribut bahasa menjadi locale saat ini.
    document.documentElement.lang = locale;

    // Atur arah teks berdasarkan locale saat ini.
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
```

#### Gunakan Hook dalam Aplikasi Anda

Integrasikan hook ke dalam komponen utama Anda agar atribut HTML diperbarui setiap kali locale berubah:

```tsx fileName="src/app.tsx" codeFormat={["typescript", "esm"]}
import type { FunctionalComponent } from "preact";
import { IntlayerProvider } from "preact-intlayer"; // useIntlayer diimpor jika AppContent membutuhkannya
import { useI18nHTMLAttributes } from "./hooks/useI18nHTMLAttributes";
import "./app.css";
// Definisikan AppContent dari Langkah 5

const AppWithHooks: FunctionalComponent = () => {
  // Terapkan hook untuk memperbarui atribut lang dan dir tag <html> berdasarkan locale.
  useI18nHTMLAttributes();

  // Anggap AppContent adalah komponen yang menampilkan konten utama Anda dari Langkah 5
  return <AppContent />;
};

const App: FunctionalComponent = () => (
  <IntlayerProvider>
    <AppWithHooks />
  </IntlayerProvider>
);

export default App;
```

Dengan menerapkan perubahan-perubahan ini, aplikasi Anda akan:

- Pastikan atribut **language** (`lang`) dengan benar mencerminkan locale saat ini, yang penting untuk SEO dan perilaku browser.
- Sesuaikan **text direction** (`dir`) menurut locale, meningkatkan keterbacaan dan kegunaan untuk bahasa dengan urutan baca yang berbeda.
- Sediakan pengalaman yang lebih **accessible**, karena teknologi assistive bergantung pada atribut ini untuk berfungsi secara optimal.

</Step>
<Step number={10} title="Membuat Komponen Link yang Dilokalkan" isOptional={true}>

Untuk memastikan navigasi aplikasi Anda mengikuti locale saat ini, Anda dapat membuat komponen `Link` kustom. Komponen ini secara otomatis menambahkan prefix locale saat ini ke URL internal.

Perilaku ini bermanfaat karena beberapa alasan:

- **SEO dan Pengalaman Pengguna**: URL yang dilokalkan membantu mesin pencari mengindeks halaman khusus bahasa dengan benar dan menyediakan konten dalam bahasa pilihan pengguna.
- **Konsistensi**: Dengan menggunakan tautan terlokalisasi di seluruh aplikasi, Anda memastikan navigasi tetap berada dalam locale saat ini, mencegah perubahan bahasa yang tidak disengaja.
- **Kemudahan Pemeliharaan**: Memusatkan logika lokalisasi dalam satu komponen menyederhanakan pengelolaan URL.

Berikut cara mengimplementasikan komponen `Link` yang dilokalkan di Preact:

```tsx fileName="src/components/Link.tsx" codeFormat={["typescript", "esm"]}
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "preact-intlayer";
import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export interface LinkProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Fungsi pembantu untuk memeriksa apakah URL tertentu adalah eksternal.
 * Jika URL dimulai dengan http:// atau https://, itu dianggap eksternal.
 */
export const checkIsExternalLink = (href?: string): boolean =>
  /^https?:\/\//.test(href ?? "");

/**
 * Komponen Link kustom yang menyesuaikan atribut href berdasarkan locale saat ini.
 * Untuk tautan internal, komponen menggunakan `getLocalizedUrl` untuk menambahkan prefix locale ke URL (misalnya /fr/about).
 * Ini memastikan navigasi tetap berada dalam konteks locale yang sama.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    const { locale } = useLocale();
    const isExternalLink = checkIsExternalLink(href);

    // Jika tautan internal dan href yang valid diberikan, ambil URL yang dilokalkan.
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

#### Cara Kerjanya

- **Mendeteksi Tautan Eksternal**:  
  Fungsi pembantu `checkIsExternalLink` menentukan apakah sebuah URL adalah eksternal. Tautan eksternal dibiarkan tanpa perubahan karena tidak memerlukan lokalisasi.
- **Mengambil Locale Saat Ini**:  
  Hook `useLocale` menyediakan locale saat ini (misalnya, `fr` untuk bahasa Prancis).
- **Melokalkan URL**:  
  Untuk tautan internal (yaitu, non-eksternal), `getLocalizedUrl` digunakan untuk secara otomatis menambahkan prefix locale saat ini ke URL. Ini berarti jika pengguna Anda dalam bahasa Prancis, meneruskan `/about` sebagai `href` akan mengubahnya menjadi `/fr/about`.
- **Mengembalikan Tautan**:  
  Komponen mengembalikan elemen `<a>` dengan URL yang sudah dilokalkan, memastikan navigasi konsisten dengan locale.

</Step>
<Step number={11} title="Render Markdown dan HTML" isOptional={true}>

Intlayer mendukung rendering konten Markdown dan HTML dalam Preact.

Anda dapat menyesuaikan tampilan konten Markdown dan HTML menggunakan metode `.use()`. Metode ini memungkinkan Anda menimpa rendering default dari tag tertentu.

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

</Step>
<Step number={1} title="Ekstrak konten komponen Anda" isOptional={true}>

Jika Anda memiliki basis kode yang ada, mengubah ribuan file bisa memakan waktu lama.

Untuk memudahkan proses ini, Intlayer mengusulkan [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengubah komponen Anda dan mengekstrak kontennya.

- [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)
- [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

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

<Tabs>
 <Tab value='Perintah ekstrak'>

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

 </Tab>
 <Tab value='Compiler Babel'>

 <Tabs>
 <Tab value='intlayer >= 9'>

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

 </Tab>
 <Tab value='intlayer < 9'>

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

 </Tab>
 </Tabs>

Build aplikasi Anda untuk mentransformasi komponen Anda dan mengekstrak konten

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

 </Tab>
</Tabs>
</Step>

</Steps>

### (Opsional) Sitemap dan robots.txt (generate saat build)

Intlayer menyediakan `generateSitemap` dan `getMultilingualUrls` untuk memformat `sitemap.xml` multibahasa dan `robots.txt` yang siap untuk crawler, lalu menulisnya secara otomatis ke `public/`. Biasanya skrip Node kecil dijalankan **sebelum** Vite (misalnya hook npm `predev` / `prebuild`).

#### Sitemap

Generator sitemap Intlayer menghormati konfigurasi locale dan menambahkan metadata untuk crawler.

> Sitemap mendukung namespace `xhtml:link` (hreflang). Alih-alih hanya daftar URL datar, Intlayer menghubungkan semua varian bahasa setiap halaman secara dua arah (mis. `/about`, `/fr/about`, atau `/about?lang=fr` tergantung mode routing).

#### Robots.txt

Gunakan `getMultilingualUrls` agar aturan `Disallow` mencakup semua varian URL jalur sensitif.

#### 1. Buat `generate-seo.mjs` di root proyek

```javascript fileName="generate-seo.mjs"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateSitemap, getMultilingualUrls } from "intlayer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = (process.env.SITE_URL || "http://localhost:5173").replace(
  /\/$/,
  ""
);

const pathList = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const sitemapXml = generateSitemap(pathList, {
  siteUrl: "https://example.com",
});
fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemapXml);

const getAllMultilingualUrls = (urls) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)));

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

const robotsTxt = [
  "User-agent: *",
  "Allow: /",
  ...disallowedPaths.map((path) => `Disallow: ${path}`),
  "",
  `Sitemap: https://example.com/sitemap.xml`,
].join("\n");

fs.writeFileSync(path.join(__dirname, "public", "robots.txt"), robotsTxt);

console.log("SEO files generated successfully.");
```

Paket `intlayer` harus terpasang. Setel `SITE_URL` di lingkungan produksi (misalnya di CI).

> Disarankan `generate-seo.mjs` untuk ESM Node. Jika memakai `generate-seo.js`, pastikan `"type": "module"` di `package.json` atau aktifkan ESM lainnya.

#### 2. Jalankan skrip sebelum Vite

```json fileName="package.json"
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-seo.mjs",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

Sesuaikan perintah jika memakai pnpm atau yarn. Skrip juga bisa dipanggil dari CI.

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Pastikan konfigurasi TypeScript Anda mencakup tipe yang dibuat secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "compilerOptions": {
    // ...
    "jsx": "react-jsx",
    "jsxImportSource": "preact", // Direkomendasikan untuk Preact 10+
    // ...
  },
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dibuat secara otomatis
  ],
}
```

> Pastikan `tsconfig.json` Anda diatur untuk Preact, terutama `jsx` dan `jsxImportSource` atau `jsxFactory`/`jsxFragmentFactory` untuk versi Preact yang lebih lama jika tidak menggunakan default `preset-vite`.

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda menghindari komitmen ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```bash
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Intlayer VS Code Extension** resmi.

- [Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Extension ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten yang diterjemahkan.
- **Aksi cepat** untuk mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Ekstensi VS Code Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md).

- [Dokumentasi Ekstensi VS Code Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)

### Melangkah Lebih Jauh

Untuk melangkah lebih jauh, Anda dapat mengimplementasikan [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau mengeksternalisasi konten Anda menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md).

- [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Vite dan Preact?">

Vite tidak memiliki preferensi mengenai i18n, jadi pilihan berasal dari ekosistem Preact:

- **`preact-i18n`** atau **`react-i18next`**: library umum dengan pemuatan JSON di runtime.
- **`Intlayer`**: binding asli `preact-intlayer` tanpa memerlukan `preact/compat`, kompilasi build time, typing penuh, dan AI terjemahan.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

- [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md)
- [Benchmark library i18n: bundle dan performa](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)

</Question>
<Question title="Berapa banyak i18n menambah ukuran bundle Preact saya?">

Jauh lebih sedikit daripada solusi berbasis namespace, karena halaman tidak pernah mengunduh katalog yang tidak di-render. Kompilator build time mengganti panggilan `useIntlayer` dengan entri kamus persis yang digunakan komponen, dan [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md) membagi sisanya per locale, mengurangi bundle hingga 50%. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md) dan [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md).

- [kamus dinamis](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dynamic_dictionaries/index.md)
- [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)
- [benchmark](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/benchmark/index.md)

</Question>
<Question title="Bisakah saya bermigrasi dari preact-i18n atau react-i18next tanpa menulis ulang komponen?">

Sebagian besar ya. Ikuti [panduan migrasi react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md).

- [panduan migrasi react-i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_react-i18next_to_intlayer.md)
- [Adaptor kompatibilitas Intlayer untuk library i18n](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Question>
<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

- [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md)
- [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md)

</Question>
<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu.

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time: memindai kode pada setiap perubahan, menghasilkan kamus, dan menyinkronkannya dengan HMR.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)

Dua batasan perlu diketahui sebelum Anda mengaktifkan compiler. Ini bekerja dengan analisis statis, jadi string yang hanya ada saat runtime, seperti kode kesalahan API atau field CMS, tetap berada di luar jangkauan. Dan ini harus membedakan teks yang dilihat pengguna dari logika aplikasi seperti `className="active"` atau kode status, yang memerlukan beberapa anotasi di basis kode yang besar. [Perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) menghindari keduanya dengan menjaga Anda tetap memegang kendali.

- [Perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

</Question>
<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: pengalaman yang sama di editor mana pun yang mendukung LSP, dengan go to definition, hover preview dari nilai terjemahan, autocompletion kunci, dan peringatan ketika kunci tidak dideklarasikan. Ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>
<Question title="Bagaimana cara menggunakan konten terjemahan di dalam komponen Preact?">

Panggil `useIntlayer` di komponen Anda seperti halnya di React. `preact-intlayer` adalah binding asli untuk Preact. Langkah 5 menunjukkan penggunaan dan langkah 11 mencakup Markdown dan HTML.

</Question>
<Question title="Apakah Intlayer bekerja dengan server pengembangan Vite dan HMR?">

Ya. Plugin Vite memantau file `.content.ts` Anda dan mengompilasi ulang kamus saat Anda menyimpannya, sehingga perubahan muncul tanpa me-restart server pengembangan.

</Question>
<Question title="Bagaimana cara mengatur routing yang terlokalisasi?">

Langkah-langkah dalam panduan ini membahas rute terlokalisasi dan penulisan ulang URL saat bahasa berubah. `routing.mode` mengontrol skema URL: `"prefix-no-default"` (default: `/about` dan `/id/about`), `"prefix-all"`, `"no-prefix"`, atau `"search-params"`. Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

- [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

</Question>
<Question title="Bagaimana cara mendukung bahasa dari kanan ke kiri seperti Arab atau Ibrani?">

`getHTMLTextDir` mengembalikan `ltr`, `rtl`, atau `auto` untuk locale tertentu, sehingga Anda dapat mengikat `lang` dan `dir` pada elemen root dari locale aktif dan membiarkan properti logis CSS Anda menangani sisanya.

</Question>
<Question title="Bagaimana cara mengelola metadata SEO di aplikasi Vite yang dirender di sisi klien?">

Atur `lang` dan `dir` pada elemen `html` dari locale yang aktif, dan gunakan `getMultilingualUrls` untuk menerbitkan alternatif `hreflang` bagi setiap locale yang dideklarasikan. Untuk halaman yang memerlukan pengindeksan andal, pertimbangkan prerender atau SSR.

</Question>
<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. Perintah ini mengisi terjemahan yang hilang menggunakan LLM pilihan Anda dengan provider dan API key Anda sendiri, dan `--git-diff` membatasi proses ke file yang diubah. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

- [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)
- [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md)

</Question>
<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md).

- [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md)
- [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md)
- [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)
- [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)

</Question>
<Question title="Bagaimana penerjemah dapat mengedit konten tanpa menyentuh kode?">

Melalui [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang memungkinkan siapa saja mengedit teks langsung di aplikasi yang berjalan, atau melalui [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten sehingga dapat diubah tanpa perlu redeploy kode.

- [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)
- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)

</Question>
<Question title="Berapa biaya dari visual editor? Apakah berlebihan jika saya tidak membutuhkannya?">

[Visual editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) memiliki **biaya nol** pada aplikasi Anda jika tidak disiapkan. Logika tambahan hanya dimuat jika diaktifkan secara eksplisit dan dibutuhkan.

- [Visual editor Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md)

Bahkan jika diaktifkan, bebannya sangat ringan (+5 KB, dimuat secara dinamis hanya saat diaktifkan) karena sebagian besar logika ditangani oleh server editor di [app.intlayer.org](https://app.intlayer.org) atau melalui paket `intlayer-editor`. Jika Anda hanya memerlukan solusi terjemahan sederhana tanpa pengeditan visual, Intlayer tidak menambahkan overhead apa pun ke aplikasi Anda.

</Question>
<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

- [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)

</Question>

</FAQ>
