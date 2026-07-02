---
createdAt: 2026-04-24
updatedAt: 2026-06-23
title: "Astro + Preact i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi Astro + Preact multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
keywords:
  - internasionalisasi
  - dokumentasi
  - Intlayer
  - Astro
  - Preact
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - preact
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
applicationShowcase: https://intlayer-astro-template.vercel.app
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.7.7
    date: 2026-04-24
    changes: "Dokumentasi awal untuk Astro + Preact"
author: aymericzip
---

# Terjemahkan Situs Astro + Preact Anda dengan Intlayer | Internasionalisasi (i18n)

<Tabs defaultTab="code">
  <Tab label="Kode" value="code">

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-astro-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara menginternasionalisasi aplikasi Anda dengan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
  <Tab label="Demo" value="demo">

<iframe
  src="https://intlayer-astro-template.vercel.app"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo - intlayer-astro-template"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

  </Tab>
</Tabs>

## Daftar Isi

<TOC/>

## Mengapa Intlayer dibandingkan alternatif?

Dibandingkan dengan solusi utama seperti `astro-i18n` atau `i18next`, Intlayer adalah solusi yang hadir dengan pengoptimalan terintegrasi seperti:

<AccordionGroup>

<Accordion header="Cakupan Astro penuh">

Intlayer dioptimalkan untuk bekerja sempurna dengan Astro dengan menawarkan **perutean multibahasa**, **peta situs**, dan semua fitur yang diperlukan untuk penskalaan internasionalisasi (i18n).

</Accordion>

<Accordion header="Ukuran bundle">

Daripada memuat file JSON berukuran besar ke halaman Anda, muat saja konten yang diperlukan. Intlayer membantu **mengurangi ukuran bundle dan halaman Anda hingga 50%**.

</Accordion>

<Accordion header="Kemampuan Pemeliharaan">

Mencakup konten aplikasi Anda **memfasilitasi pemeliharaan** untuk aplikasi berskala besar. Anda dapat menduplikasi atau menghapus satu folder fitur tanpa beban mental untuk meninjau seluruh basis kode konten Anda. Selain itu, Intlayer **diketik sepenuhnya** untuk memastikan keakuratan konten Anda.

</Accordion>

<Accordion header="Agen AI">

Menempatkan konten bersama **mengurangi konteks yang diperlukan** dengan Model Bahasa Besar (LLM). Intlayer juga dilengkapi dengan serangkaian alat, seperti **CLI** untuk menguji terjemahan yang hilang,**[LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/lsp.md)**, **[MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/mcp_server.md)**, dan **[agent skill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/agent_skills.md)**, untuk menjadikan pengalaman pengembang (DX) lebih lancar bagi agen AI.

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

## Panduan Langkah-demi-Langkah untuk Mengonfigurasi Intlayer di Astro + Preact

Lihat [templat aplikasi](https://github.com/aymericzip/intlayer-astro-template) di GitHub.

<Steps>

<Step number={1} title="Instal Dependensi">

Instal paket yang diperlukan menggunakan manajer paket pilihan Anda:

```bash packageManager="npm"
npx intlayer@canary init --interactive    # v9
# npx intlayer init                       # v8
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive   # v9
# pnpm dlx intlayer init                      # v8
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive   # v9
# yarn dlx intlayer init                      # v8
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive   # v9
# bunx intlayer init                      # v8
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer astro-intlayer preact preact-intlayer @astrojs/preact
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer preact preact-intlayer @astrojs/preact
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer preact preact-intlayer @astrojs/preact
```

```bash packageManager="bun"
bun add intlayer astro-intlayer preact preact-intlayer @astrojs/preact
```

- **intlayer**
  Paket inti yang menyediakan alat i18n untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasyon, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **astro-intlayer**
  Plugin integrasi Astro untuk menghubungkan Intlayer dengan [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production); juga mencakup middleware untuk mendeteksi bahasa pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

- **preact**
  Paket inti Preact - alternatif yang cepat dan ringan untuk React.

- **preact-intlayer**
  Paket untuk mengintegrasikan Intlayer ke dalam aplikasi Preact. Paket ini menyediakan `IntlayerProvider` serta hook `useIntlayer` dan `useLocale` untuk internasionalisasi di Preact.

- **@astrojs/preact**
  Integrasi resmi Astro yang memungkinkan penggunaan island komponen Preact.

</Step>

<Step number={2} title="Konfigurasikan Proyek Anda">

Buat file konfigurasi untuk menentukan bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.INDONESIAN,
      // Bahasa Anda yang lain
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten, menonaktifkan log Intlayer di konsole, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

</Step>

<Step number={3} title="Integrasikan Intlayer ke dalam konfigurasi Astro Anda">

Tambahkan plugin `intlayer` ke konfigurasi Astro Anda dan integrasi Preact.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), preact()],
});
```

> Plugin integrasi `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Astro. Plugin ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Astro dan menyediakan alias untuk mengoptimalkan kinerja.

> Integrasi `preact()` memungkinkan penggunaan island komponen Preact melalui `client:only="preact"`.

</Step>

<Step number={4} title="Deklarasikan Konten Anda">

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app.content.tsx"
import { h } from "preact";
import { t, type Dictionary } from "intlayer";
import type { ComponentChildren } from "preact";

const appContent = {
  key: "app",
  content: {
    title: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola mundo",
      id: "Halo Dunia",
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklarasi konten dapat didefinisikan di mana saja dalam aplikasi Anda, asalkan disertakan dalam `contentDir` (secara default `./src`) dan cocok dengan ekstensi file deklarasi konten (secara default `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk informasi selengkapnya, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

> Jika file konten Anda mengandung kode TSX, Anda mungkin perlu mengimpor `import { h } from "preact";` atau memastikan pragma JSX Anda dikonfigurasi dengan benar untuk Preact.

</Step>

<Step number={5} title="Menggunakan Konten di Astro">

Anda dapat mengonsumsi kamus langsung di file `.astro` menggunakan pembantu inti yang diekspor dari `intlayer`. Anda juga harus menambahkan metadata SEO (seperti hreflang dan tautan kanonikal) di setiap halaman dan memperkenalkan island Preact untuk konten interaktif di sisi klien.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getHTMLTextDir,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import { PreactIsland } from "../../components/preact/ReactIsland";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale} dir={getHTMLTextDir(locale)}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>

    <!-- Tautan Kanonikal: Memberitahu mesin pencari tentang versi utama halaman ini -->
    <link
      rel="canonical"
      href={new URL(getLocalizedUrl(Astro.url.pathname, locale), Astro.site)}
    />

    <!-- Hreflang: Memberitahu Google tentang semua versi yang dilokalkan -->
    {
      localeMap(({ locale: mapLocale }) => (
        <link
          rel="alternate"
          hreflang={mapLocale}
          href={new URL(
            getLocalizedUrl(Astro.url.pathname, mapLocale),
            Astro.site
          )}
        />
      ))
    }

    <!-- x-default: Opsi fallback saat bahasa tidak cocok dengan bahasa pengguna -->
    <link
      rel="alternate"
      hreflang="x-default"
      href={new URL(
        getLocalizedUrl(Astro.url.pathname, defaultLocale),
        Astro.site
      )}
    />
  </head>
  <body>
    <!-- Island Preact merender semua konten interaktif, termasuk pengalih bahasa -->
    <PreactIsland locale={locale} client:only="preact" />
  </body>
</html>
```

> Jika Anda ingin menggunakan konten Anda dalam atribut `string`, seperti `alt`, `title`, `href`, `aria-label`, dll., Anda dapat menggunakan nilai fungsi, seperti:

> ```html
> <img src="{content.image.src.value}" alt="{content.image.value}" />
> <img src="{content.image.src.toString()}" alt="{content.image.toString()}" />
> <img src="{String(content.image.src)}" alt="{String(content.image)}" />
> ```

> **Catatan tentang Penyiapan Perutean:**
> Struktur direktori yang Anda gunakan bergantung pada pengaturan `middleware.routing` di `intlayer.config.ts`:
>
> - **`prefix-no-default` (default):** Mempertahankan bahasa default di root (tanpa awalan) dan mengawali bahasa lainnya. Gunakan `[...locale]` untuk menangkap semua kasus.
> - **`prefix-all`:** Semua URL mendapatkan awalan bahasa. Anda dapat menggunakan `[locale]` standar jika tidak perlu menangani root secara terpisah.
> - **`search-param` atau `no-prefix`:** Direktori bahasa tidak diperlukan. Bahasa dikelola melalui parameter kueri atau cookie.

</Step>

<Step number={6} title="Membuat Komponen Island Preact">

Buat komponen island yang membungkus aplikasi Preact Anda dan menerima bahasa yang dideteksi server:

```tsx fileName="src/components/preact/PreactIsland.tsx"
/** @jsxImportSource preact */
import { IntlayerProvider, useIntlayer } from "preact-intlayer";
import { type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";
import { LocaleSwitcher } from "./LocaleSwitcher";

const App: FunctionalComponent = () => {
  const { title } = useIntlayer("app");

  return (
    <div>
      <h1>{title}</h1>
      <LocaleSwitcher />
    </div>
  );
};

export const PreactIsland: FunctionalComponent<{ locale: LocalesValues }> = ({
  locale,
}) => (
  <IntlayerProvider locale={locale}>
    <App />
  </IntlayerProvider>
);
```

> Prop `locale` diteruskan dari halaman Astro (deteksi sisi server) ke `IntlayerProvider`, yang berfungsi sebagai bahasa awal untuk semua hook Preact di dalam pohon.

> Catatan: Di Preact, atribut HTML `class` digunakan alih-alih `className`.

</Step>

<Step number={7} title="Menambahkan Pengalih Bahasa">

Buat komponen Preact `LocaleSwitcher` yang membaca bahasa yang tersedia dan menavigasi ke URL yang dilokalkan saat pengguna memilih bahasa baru:

```tsx fileName="src/components/preact/LocaleSwitcher.tsx"
/** @jsxImportSource preact */
import { useLocale } from "preact-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";
import type { FunctionalComponent } from "preact";

export const LocaleSwitcher: FunctionalComponent = () => {
  const { locale, availableLocales, setLocale } = useLocale({
    onLocaleChange: (newLocale: LocalesValues) => {
      // Navigasi ke URL yang dilokalkan saat perubahan bahasa
      window.location.href = getLocalizedUrl(
        window.location.pathname,
        newLocale
      );
    },
  });

  return (
    <div class="locale-switcher">
      <span class="switcher-label">Ganti bahasa:</span>
      <div class="locale-buttons">
        {availableLocales.map((localeItem) => (
          <button
            key={localeItem}
            onClick={() => setLocale(localeItem)}
            class={`locale-btn ${localeItem === locale ? "active" : ""}`}
            disabled={localeItem === locale}
          >
            <span class="ls-own-name">{getLocaleName(localeItem)}</span>
            <span class="ls-current-name">
              {getLocaleName(localeItem, locale)}
            </span>
            <span class="ls-code">{localeItem.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

> **Catatan tentang Persistensi:**
> Menggunakan `onLocaleChange` untuk mengarahkan ulang melalui `window.location.href` memastikan bahwa URL bahasa baru dikunjungi. Hal ini memungkinkan middleware Intlayer menyetel cookie bahasa dan mengingat preferensi pengguna untuk kunjungan mendatang.

> `LocaleSwitcher` harus dirender di dalam `IntlayerProvider` - gunakan ini di komponen island Anda (seperti yang ditunjukkan pada Langkah 6).

</Step>

<Step number={8} title="Sitemap dan Robots.txt">

Intlayer menawarkan utilitas untuk secara dinamis membuat peta situs yang dilokalkan dan file robots.txt Anda.

#### Sitemap

Intlayer comes with a built-in sitemap generator to help you create a sitemap for your application easily. It handles localized routes and adds the necessary metadata for search engines.

> The Intlayer generated sitemap supports the `xhtml:link` namespace (Hreflang XML Extensions). Unlike the default sitemap generators that only list raw URLs, Intlayer automatically creates the required bidirectional links between all language versions of a page (e.g., `/about`, `/about?lang=fr`, and `/about?lang=es`). This ensures search engines correctly index and serve the right language version to the right audience.

Buat `src/pages/sitemap.xml.ts` untuk menghasilkan peta situs yang mencakup semua rute yang dilokalkan.

```typescript fileName="src/pages/sitemap.xml.ts"
import type { APIRoute } from "astro";
import { generateSitemap, type SitemapUrlEntry } from "intlayer";

const pathList: SitemapUrlEntry[] = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.7 },
];

const SITE_URL = import.meta.env.SITE ?? "http://localhost:4321";

export const GET: APIRoute = async ({ site }) => {
  const xmlOutput = generateSitemap(pathList, { siteUrl: SITE_URL });

  return new Response(xmlOutput, {
    headers: { "Content-Type": "application/xml" },
  });
};
```

#### Robots.txt

Buat `src/pages/robots.txt.ts` untuk mengontrol perayapan mesin pencari.

```typescript fileName="src/pages/robots.txt.ts"
import type { APIRoute } from "astro";
import { getMultilingualUrls } from "intlayer";

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

export const GET: APIRoute = ({ site }) => {
  const robotsTxt = [
    "User-agent: *",
    "Allow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${new URL("/sitemap.xml", site).href}`,
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

</Step>

<Step number={1} title="Ekstrak konten komponen Anda" isOptional={true}>

Jika Anda memiliki basis kode yang ada, mengubah ribuan file bisa memakan waktu lama.

Untuk memudahkan proses ini, Intlayer mengusulkan [compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) / [extractor](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md) untuk mengubah komponen Anda dan mengekstrak kontennya.

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

> Since v9, the `intlayerCompiler` is included in the `intlayer` plugin. So you don't need to add it manually.

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

---

</Step>

</Steps>

### Konfigurasi TypeScript

Intlayer menggunakan augmentasi modul (module augmentation) untuk memanfaatkan TypeScript, membuat basis kode Anda lebih kuat. Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dibuat secara otomatis dan dikonfigurasi untuk Preact:

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    // ...
    jsx: "react-jsx",
    jsxImportSource: "preact", // Direkomendasikan untuk Preact 10+
  },
  "include": [
    // ... konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dibuat secara otomatis
  ],
}
```

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini mencegah file tersebut di-commit ke repositori Git Anda.

Untuk melakukannya, tambahkan instruksi berikut ke file `.gitignore` Anda:

```bash
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **ekstensi resmi Intlayer untuk VS Code**.

[Instalasi dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** untuk konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk informasi selengkapnya tentang cara menggunakan ekstensi, lihat [dokumentasi ekstensi VS Code](https://intlayer.org/doc/vs-code-extension).

---

### Perdalam Pengetahuan Anda

Jika Anda ingin mempelajari lebih lanjut, Anda juga dapat menerapkan [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk mengeksternalisasi konten Anda.
