---
createdAt: 2024-03-07
updatedAt: 2025-12-30
title: Cara menerjemahkan aplikasi Astro Anda – panduan i18n 2026
description: Pelajari cara menambahkan internasionalisasi (i18n) ke situs web Astro Anda menggunakan Intlayer. Ikuti panduan ini untuk membuat situs web Anda multibahasa.
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
  - astro
applicationTemplate: https://github.com/aymericzip/intlayer-astro-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 6.2.0
    date: 2025-10-03
    changes: Penyegaran untuk integrasi Astro, konfigurasi, penggunaan
---

# Terjemahkan situs web Astro Anda menggunakan Intlayer | Internasionalisasi (i18n)

## Apa itu Intlayer?

**Intlayer** adalah perpustakaan internasionalisasi (i18n) open-source yang inovatif, dirancang untuk menyederhanakan dukungan multibahasa dalam aplikasi web modern.

Dengan Intlayer, Anda dapat:

- **Mengelola terjemahan dengan mudah** menggunakan kamus deklaratif di tingkat komponen.
- **Melokalkan metadata**, rute, dan konten secara dinamis.
- **Memastikan dukungan TypeScript** dengan tipe yang dihasilkan secara otomatis, meningkatkan autocompletion dan deteksi kesalahan.
- **Memanfaatkan fitur canggih**, seperti deteksi dan pergantian locale secara dinamis.

---

## Panduan Langkah demi Langkah untuk Mengatur Intlayer di Astro

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-astro-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-astro-template) di GitHub.

### Langkah 1: Instalasi Dependensi

Instal paket yang diperlukan menggunakan package manager Anda:

```bash packageManager="npm"
npm install intlayer astro-intlayer
# Opsional: tambahkan dukungan React island
npm install react react-dom react-intlayer @astrojs/react
```

```bash packageManager="pnpm"
pnpm add intlayer astro-intlayer
# Opsional: tambahkan dukungan React island
pnpm add react react-dom react-intlayer @astrojs/react
```

```bash packageManager="yarn"
yarn add intlayer astro-intlayer
 # Opsional: tambahkan dukungan React island
yarn add react react-dom react-intlayer @astrojs/react
```

- **intlayer**
  Paket inti yang menyediakan alat internasionalisasi untuk manajemen konfigurasi, terjemahan, [deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md), transpile, dan [perintah CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

- **astro-intlayer**
  Termasuk plugin integrasi Astro untuk mengintegrasikan Intlayer dengan [Vite bundler](https://vite.dev/guide/why.html#why-bundle-for-production), serta middleware untuk mendeteksi locale yang dipilih pengguna, mengelola cookie, dan menangani pengalihan URL.

### Langkah 2: Konfigurasi proyek Anda

Buat file konfigurasi untuk mengatur bahasa aplikasi Anda:

```typescript fileName="intlayer.config.ts"
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
};

export default config;
```

> Melalui file konfigurasi ini, Anda dapat mengatur URL yang dilokalkan, pengalihan middleware, nama cookie, lokasi dan ekstensi deklarasi konten Anda, menonaktifkan log Intlayer di konsol, dan lainnya. Untuk daftar lengkap parameter yang tersedia, lihat [dokumentasi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Langkah 3: Integrasikan Intlayer dalam Konfigurasi Astro Anda

Tambahkan plugin intlayer ke dalam konfigurasi Anda.

```typescript fileName="astro.config.ts"
// @ts-check

import { intlayer } from "astro-intlayer";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [intlayer()],
});
```

> Plugin integrasi `intlayer()` untuk Astro digunakan untuk mengintegrasikan Intlayer dengan Astro. Plugin ini memastikan pembuatan file deklarasi konten dan memantau file tersebut dalam mode pengembangan. Plugin ini juga mendefinisikan variabel lingkungan Intlayer di dalam aplikasi Astro. Selain itu, plugin ini menyediakan alias untuk mengoptimalkan performa.

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
    }),
  },
} satisfies Dictionary;

export default appContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama sudah dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Langkah 5: Gunakan konten Anda di Astro

Anda dapat menggunakan kamus secara langsung di file `.astro` menggunakan helper inti yang diekspor oleh `intlayer`.

```astro fileName="src/pages/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";
import appContent from "../app.content";

const { title } = getIntlayer('app');
---

<html lang="en">
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

### Langkah 6: Routing yang dilokalisasi

Buat segmen rute dinamis untuk menyajikan halaman yang dilokalisasi, misalnya `src/pages/[locale]/index.astro`:

```astro fileName="src/pages/[locale]/index.astro"
<!-- astro -->
---
import { getIntlayer } from "intlayer";

const { title } = getIntlayer('app');
---

<h1>{title}</h1>
```

Integrasi Astro menambahkan middleware Vite selama pengembangan yang membantu dengan routing yang sadar locale dan definisi lingkungan. Anda masih dapat membuat tautan antar locale menggunakan logika Anda sendiri, atau fungsi utilitas seperti `getLocalizedUrl` dari `intlayer`.

### Langkah 7: Lanjutkan menggunakan framework favorit Anda

Lanjutkan menggunakan framework favorit Anda untuk membangun aplikasi Anda.

- Intlayer + React: [Intlayer dengan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)
- Intlayer + Vue: [Intlayer dengan Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)
- Intlayer + Svelte: [Intlayer dengan Svelte](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+svelte.md)
- Intlayer + Solid: [Intlayer dengan Solid](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+solid.md)
- Intlayer + Preact: [Intlayer dengan Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+preact.md)

### Konfigurasi TypeScript

Intlayer menggunakan module augmentation untuk mendapatkan manfaat dari TypeScript dan membuat codebase Anda lebih kuat.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kesalahan Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

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

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

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

---
