---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Terjemahan Astro i18n - Cara Menerjemahkan Aplikasi Astro di tahun 2026
description: Pelajari cara menambahkan internasionalisasi (i18n) ke situs Astro Anda menggunakan Intlayer. Ikuti panduan ini untuk membuat situs Anda multibahasa.
keywords:
  - internasionalisasi
  - dokumentasi
  - Intlayer
  - Vite
  - React
  - i18n
  - JavaScript
slugs:
  - doc
  - environment
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: "Menambahkan perintah init"
  - version: 6.2.0
    date: 2025-10-03
    changes: "Pembaruan integrasi Astro, konfigurasi, dan penggunaan"
---

# Terjemahkan Situs Astro Anda dengan Intlayer | Internasionalisasi (i18n)

## Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi (i18n) sumber terbuka yang inovatif yang dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah**: Menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata, rute, dan konten secara dinamis**.
- **Memastikan dukungan TypeScript**: Dengan tipe yang dibuat secara otomatis untuk pelengkapan otomatis dan deteksi kesalahan yang lebih baik.
- **Memanfaatkan fitur-fitur canggih**: Seperti deteksi bahasa dinamis dan peralihan bahasa.

---

## Panduan Langkah-demi-Langkah untuk Mengonfigurasi Intlayer di Astro

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
npm install intlayer astro-intlayer
# opsional: jika Anda ingin menambahkan dukungan island React
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# opsional: jika Anda ingin menambahkan dukungan island React
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
# opsional: jika Anda ingin menambahkan dukungan island React
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Paket inti yang menyediakan alat i18n untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpilasi, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/index.md).

- **astro-intlayer**
  Plugin integrasi Astro untuk menghubungkan Intlayer dengan [bundler Vite](https://vite.dev/guide/why.html#why-bundle-for-production); juga mencakup middleware untuk mendeteksi bahasa pilihan pengguna, mengelola cookie, dan menangani pengalihan URL.

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

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten, menonaktifkan log Intlayer di konsol, dan banyak lagi. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer ke dalam konfigurasi Astro Anda

Tambahkan plugin `intlayer` ke konfigurasi Astro Anda.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Plugin integrasi `intlayer()` digunakan untuk mengintegrasikan Intlayer dengan Astro. Plugin ini memastikan pembuatan file deklarasi konten dan memantaunya dalam mode pengembangan. Plugin ini mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Astro dan menyediakan alias untuk mengoptimalkan kinerja.

### Langkah 4: Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```tsx fileName="src/app.content.tsx"
import { t, type Dictionary } from "intlayer";
import type { ReactNode } from "react";

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

Anda dapat mengonsumsi kamus langsung di file `.astro` menggunakan pembantu inti yang diekspor dari `intlayer`.

```astro fileName="src/pages/index.astro"
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
  </body>
</html>
```

### Langkah 6: Perutean yang Dilokalkan

Buat segmen rute dinamis (misalnya, `src/pages/[locale]/index.astro`) untuk melayani halaman yang dilokalkan:

```astro fileName="src/pages/[locale]/index.astro"
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Integrasi Astro menambahkan middleware Vite yang membantu perutean yang sadar bahasa dan definisi lingkungan selama pengembangan. Anda juga dapat menggunakan logika Anda sendiri atau alat `intlayer` seperti `getLocalizedUrl` untuk menautkan lintas bahasa.

### Langkah 7: Terus Gunakan Framework Favorit Anda

Lanjutkan membangun aplikasi Anda menggunakan framework pilihan Anda.

- Intlayer + React: [Intlayer dengan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer dengan Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer dengan Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer dengan Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer dengan Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+preact.md)

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

Jika Anda ingin mempelajari lebih lanjut, Anda juga dapat menerapkan [Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md) atau menggunakan [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) untuk mengeksternalisasi konten Anda.
