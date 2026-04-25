---
createdAt: 2026-04-24
updatedAt: 2026-04-24
title: Astro + Vue i18n - Cara Menerjemahkan Aplikasi Astro + Vue di tahun 2026
description: Pelajari cara menambahkan internasionalisasi (i18n) ke situs Astro + Vue Anda menggunakan Intlayer. Ikuti panduan ini untuk membuat situs Anda multibahasa.
keywords:
  - internasionalisasi
  - dokumentasi
  - Intlayer
  - Astro
  - Vue
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
  - vue
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 8.7.7
    date: 2026-04-24
    changes: "Dokumentasi awal untuk Astro + Vue"
---

# Terjemahkan Situs Astro + Vue Anda dengan Intlayer | Internasionalisasi (i18n)

## Daftar Isi

<TOC/>

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) sumber terbuka yang inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah**: Menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript**: Dengan tipe yang dibuat secara otomatis untuk pelengkapan otomatis dan deteksi kesalahan yang lebih baik.
- **Memanfaatkan fitur-fitur canggih**: Seperti deteksi bahasa dinamis dan peralihan bahasa.

---

## Panduan Langkah-demi-Langkah untuk Mengonfigurasi Intlayer di Astro + Vue

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara menginternasionalisasi aplikasi Anda dengan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [templat aplikasi](https://github.com/aymericzip/intlayer-astro-template) di GitHub.

### Langkah 1: Instal Dependensi

Instal paket yang diperlukan menggunakan manajer paket pilihan Anda:

```bash packageManager="npm"
npm install intlayer astro-intlayer vue vue-intlayer @astrojs/vue

npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer astro-intlayer vue vue-intlayer @astrojs/vue

bun x intlayer init
```

- **intlayer**
  Paket inti yang menyediakan alat i18n untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **astro-intlayer**
  Plugin integrasi Astro untuk menghubungkan Intlayer dengan [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production); juga mencakup middleware untuk mendeteksi bahasa pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

- **vue**
  Paket inti Vue.

- **vue-intlayer**
  Paket untuk mengintegrasikan Intlayer ke dalam aplikasi Vue. Paket ini menyediakan `installIntlayer` serta composable `useIntlayer` dan `useLocale` untuk internasionalisasi di Vue.

- **@astrojs/vue**
  Integrasi resmi Astro yang memungkinkan penggunaan island komponen Vue.

### Langkah 2: Konfigurasikan Proyek Anda

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

### Langkah 3: Integrasikan Intlayer ke dalam konfigurasi Astro Anda

Tambahkan plugin `intlayer` ke konfigurasi Astro Anda dan integrasi Vue.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer(), vue()],
});
```

> Plugin integrasi `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Astro. Plugin ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Astro dan menyediakan alias untuk mengoptimalkan kinerja.

> Integrasi `vue()` memungkinkan penggunaan island komponen Vue melalui `client:only="vue"`.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/app.content.ts"
import { t, type Dictionary } from "intlayer";

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

> Deklarasi konten dapat didefinisikan di mana saja dalam aplikasi Anda, asalkan disertakan dalam `contentDir` (secara default `./src`) dan cocok dengan ekstensi file deklarasi konten (secara default `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk informasi selengkapnya, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 5: Menggunakan Konten di Astro

Anda dapat mengonsumsi kamus langsung di file `.astro` menggunakan pembantu inti yang diekspor dari `intlayer`. Anda juga harus menambahkan metadata SEO (seperti hreflang dan tautan kanonikal) di setiap halaman dan memperkenalkan island Vue untuk konten interaktif di sisi klien.

```astro fileName="src/pages/[...locale]/index.astro"
---
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getPrefix,
  localeMap,
  defaultLocale,
  type LocalesValues,
} from "intlayer";
import VueIsland from "../../components/vue/VueIsland.vue";

export const getStaticPaths = () => {
  return localeMap(({ locale }) => ({
    params: { locale: getPrefix(locale).localePrefix },
  }));
};

const locale = getLocaleFromPath(Astro.url.pathname) as LocalesValues;
const { title } = getIntlayer("app", locale);
---

<!doctype html>
<html lang={locale}>
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
    <!-- Island Vue merender semua konten interaktif, termasuk pengalih bahasa -->
    <VueIsland locale={locale} client:only="vue" />
  </body>
</html>
```

> **Catatan tentang Penyiapan Perutean:**
> Struktur direktori yang Anda gunakan bergantung pada pengaturan `middleware.routing` di `intlayer.config.ts`:
>
> - **`prefix-no-default` (default):** Mempertahankan bahasa default di root (tanpa awalan) dan mengawali bahasa lainnya. Gunakan `[...locale]` untuk menangkap semua kasus.
> - **`prefix-all`:** Semua URL mendapatkan awalan bahasa. Anda dapat menggunakan `[locale]` standar jika tidak perlu menangani root secara terpisah.
> - **`search-param` atau `no-prefix`:** Direktori bahasa tidak diperlukan. Bahasa dikelola melalui parameter kueri atau cookie.

### Langkah 6: Membuat Komponen Island Vue

Buat komponen island yang membungkus aplikasi Vue Anda dan menerima bahasa yang dideteksi server. Anda harus memanggil `installIntlayer` untuk mendaftarkan plugin Intlayer ke dalam instance Vue sebelum menggunakan composable apa pun.

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useIntlayer, useLocale, installIntlayer } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

const props = defineProps<{ locale: LocalesValues }>();

const app = getCurrentInstance()?.appContext.app;
if (app) {
  installIntlayer(app, { locale: props.locale });
}

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});

const count = ref(0);
const { title } = useIntlayer("app");
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <!-- Pengalih bahasa dirender langsung di templat island -->
    <div class="locale-switcher">
      <span class="switcher-label">Ganti bahasa:</span>
      <div class="locale-buttons">
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem"
          :class="['locale-btn', { active: localeItem === currentLocale }]"
          :disabled="localeItem === currentLocale"
          @click="setLocale(localeItem)"
        >
          <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
          <span class="ls-current-name">{{
            getLocaleName(localeItem, currentLocale)
          }}</span>
          <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
```

> Prop `locale` diteruskan dari halaman Astro (deteksi sisi server) dan digunakan untuk menginisialisasi `installIntlayer`, menyetel bahasa awal untuk semua composable di dalam pohon.

### Langkah 7: Menambahkan Pengalih Bahasa

Fungsionalitas peralihan bahasa terintegrasi langsung di templat island Vue (lihat Langkah 6 di atas). Pengalih ini menggunakan composable `useLocale` dari `vue-intlayer` dan menavigasi ke URL yang dilokalkan saat pengguna memilih bahasa baru:

```vue fileName="src/components/vue/VueIsland.vue"
<script setup lang="ts">
import { useLocale } from "vue-intlayer";
import { getLocalizedUrl, getLocaleName, type LocalesValues } from "intlayer";

// Asumsikan logika prop/setup aplikasi yang sama dari Langkah 6...

const {
  locale: currentLocale,
  availableLocales,
  setLocale,
} = useLocale({
  onLocaleChange: (newLocale: LocalesValues) => {
    // Navigasi ke URL yang dilokalkan saat perubahan bahasa
    window.location.href = getLocalizedUrl(window.location.pathname, newLocale);
  },
});
</script>

<template>
  <div class="locale-switcher">
    <span class="switcher-label">Ganti bahasa:</span>
    <div class="locale-buttons">
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem"
        :class="['locale-btn', { active: localeItem === currentLocale }]"
        :disabled="localeItem === currentLocale"
        @click="setLocale(localeItem)"
      >
        <span class="ls-own-name">{{ getLocaleName(localeItem) }}</span>
        <span class="ls-current-name">{{
          getLocaleName(localeItem, currentLocale)
        }}</span>
        <span class="ls-code">{{ localeItem.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
```

> **Catatan tentang Persistensi:**
> Menggunakan `onLocaleChange` untuk mengarahkan ulang melalui `window.location.href` memastikan bahwa URL bahasa baru dikunjungi. Hal ini memungkinkan middleware Intlayer menyetel cookie bahasa dan mengingat preferensi pengguna untuk kunjungan mendatang.

### Langkah 8: Sitemap dan Robots.txt

Intlayer menawarkan utilitas untuk secara dinamis membuat peta situs yang dilokalkan dan file robots.txt Anda.

#### Sitemap

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

const isProd = import.meta.env.PROD;

const getAllMultilingualUrls = (urls: string[]) =>
  urls.flatMap((url) => Object.values(getMultilingualUrls(url)) as string[]);

export const GET: APIRoute = ({ site }) => {
  const disallowedPaths = getAllMultilingualUrls(["/admin", "/private"]);

  const robotsTxt = [
    "User-agent: *",
    isProd ? "Allow: /" : "Disallow: /",
    ...disallowedPaths.map((path) => `Disallow: ${path}`),
    "",
    site ? `Sitemap: ${new URL("/sitemap.xml", site).href}` : "",
  ].join("\n");

  return new Response(robotsTxt, {
    headers: { "Content-Type": "text/plain" },
  });
};
```

### Konfigurasi TypeScript

Intlayer menggunakan augmentasi modul (module augmentation) untuk memanfaatkan TypeScript, membuat basis kode Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation Error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan konfigurasi TypeScript Anda menyertakan tipe yang dibuat secara otomatis.

```json5 fileName="tsconfig.json"
{
  // ... konfigurasi TypeScript Anda yang sudah ada
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

Jika Anda ingin mempelajari lebih lanjut, Anda juga dapat menerapkan [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/id/intlayer_visual_editor.md) atau menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/id/intlayer_CMS.md) untuk mengeksternalisasi konten Anda.
