---
createdAt: 2025-08-23
updatedAt: 2025-08-23
title: Pengenalan
description: Temukan bagaimana Intlayer bekerja. Lihat langkah-langkah yang digunakan oleh Intlayer dalam aplikasi Anda. Lihat apa fungsi berbagai paket yang berbeda.
keywords:
  - Pengenalan
  - Memulai
  - Intlayer
  - Aplikasi
  - Paket
slugs:
  - doc
  - get-started
history:
  - version: 5.5.10
    date: 2025-06-29
    changes: Riwayat awal
---

# Dokumentasi Intlayer

Selamat datang di dokumentasi resmi Intlayer! Di sini, Anda akan menemukan segala yang Anda butuhkan untuk mengintegrasikan, mengonfigurasi, dan menguasai Intlayer untuk semua kebutuhan internasionalisasi (i18n) Anda, baik Anda bekerja dengan Next.js, React, Vite, Express, atau lingkungan JavaScript lainnya.

## Pengenalan

### Apa itu Intlayer?

**Intlayer** adalah pustaka internasionalisasi yang dirancang khusus untuk pengembang JavaScript. Ini memungkinkan deklarasi konten Anda di mana saja dalam kode Anda. Ini mengubah deklarasi konten multibahasa menjadi kamus terstruktur agar mudah diintegrasikan dalam kode Anda. Dengan menggunakan TypeScript, **Intlayer** membuat pengembangan Anda menjadi lebih kuat dan lebih efisien.

Intlayer juga menyediakan editor visual opsional yang memungkinkan Anda dengan mudah mengedit dan mengelola konten Anda. Editor ini sangat berguna bagi pengembang yang lebih suka antarmuka visual untuk manajemen konten, atau untuk tim yang menghasilkan konten tanpa harus khawatir tentang kode.

### Contoh penggunaan

```bash
.
└── Components
    └── MyComponent
        ├── index.content.ts
        └── index.tsx
```

```tsx fileName="src/components/MyComponent/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
} satisfies Dictionary;

// Ekspor konten komponen sebagai default
export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

// Ekspor konten komponen sebagai default
export default componentContent;
```

```javascript fileName="src/components/MyComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const componentContent = {
  key: "component-key",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      es: "Hola Mundo",
      fr: "Bonjour le monde",
    }),
  },
};

// Ekspor konten komponen menggunakan CommonJS
module.exports = componentContent;
```

```json fileName="src/components/MyComponent/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "component-key",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    }
  }
}
```

```tsx fileName="src/components/MyComponent/index.tsx" codeFormat="typescript"
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";

export const MyComponent: FC = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.mjx" codeFormat="esm"
import { useIntlayer } from "react-intlayer";

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

```jsx fileName="src/components/MyComponent/index.csx" codeFormat="commonjs"
const { useIntlayer } = require("react-intlayer");

const MyComponent = () => {
  const { myTranslatedContent } = useIntlayer("component-key");

  return <span>{myTranslatedContent}</span>;
};
```

## Fitur Utama

Intlayer menawarkan berbagai fitur yang disesuaikan untuk memenuhi kebutuhan pengembangan web modern. Berikut adalah fitur utama, dengan tautan ke dokumentasi rinci untuk masing-masing:

- **Dukungan Internasionalisasi**: Tingkatkan jangkauan global aplikasi Anda dengan dukungan bawaan untuk internasionalisasi.
- **Editor Visual**: Tingkatkan alur kerja pengembangan Anda dengan plugin editor yang dirancang untuk Intlayer. Lihat [Panduan Editor Visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md).
- **Fleksibilitas Konfigurasi**: Sesuaikan pengaturan Anda dengan opsi konfigurasi yang luas yang dijelaskan secara rinci dalam [Panduan Konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).
- **Alat CLI Lanjutan**: Kelola proyek Anda dengan efisien menggunakan antarmuka baris perintah Intlayer. Jelajahi kemampuannya dalam [Dokumentasi Alat CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_cli.md).

## Konsep Inti

### Kamus

Atur konten multibahasa Anda dekat dengan kode Anda untuk menjaga semuanya tetap konsisten dan mudah dipelihara.

- **[Memulai](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)**  
  Pelajari dasar-dasar mendeklarasikan konten Anda di Intlayer.

- **[Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/translation.md)**  
  Pahami bagaimana terjemahan dibuat, disimpan, dan digunakan dalam aplikasi Anda.

- **[Enumerasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/enumeration.md)**  
  Kelola dengan mudah data yang berulang atau tetap di berbagai bahasa.

- **[Kondisi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/conditional.md)**  
  Pelajari cara menggunakan logika kondisional di Intlayer untuk membuat konten dinamis.

- **[Penyisipan](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)**  
  Temukan cara menyisipkan nilai dalam string menggunakan placeholder penyisipan.

- **[Pengambilan Fungsi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/function_fetching.md)**  
  Lihat bagaimana mengambil konten secara dinamis dengan logika khusus untuk menyesuaikan alur kerja proyek Anda.

- **[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)**  
  Pelajari cara menggunakan Markdown di Intlayer untuk membuat konten yang kaya.

- **[Penyematan File](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/file_embeddings.md)**  
  Temukan cara menyematkan file eksternal di Intlayer untuk digunakan dalam editor konten.

- **[Nesting](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/nesting.md)**  
  Pahami cara menyusun konten secara bersarang di Intlayer untuk membuat struktur yang kompleks.

### Lingkungan & Integrasi

Kami membangun Intlayer dengan fleksibilitas dalam pikiran, menawarkan integrasi mulus di berbagai framework populer dan alat build:

- **[Intlayer dengan Next.js 16](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_16.md)**
- **[Intlayer dengan Next.js 15](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_15.md)**
- **[Intlayer dengan Next.js 14 (App Router)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_14.md)**
- **[Intlayer dengan Next.js Page Router](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nextjs_page_router.md)**
- **[Intlayer dengan React CRA](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_create_react_app.md)**
- **[Intlayer dengan Vite + React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+react.md)**
- **[Intlayer dengan React Router v7](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_react_router_v7.md)**
- **[Intlayer dengan Tanstack Start](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_tanstack.md)**
- **[Intlayer dengan React Native dan Expo](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_react_native+expo.md)**
- **[Intlayer dengan Lynx dan React](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_lynx+react.md)**
- **[Intlayer dengan Vite + Preact](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+preact.md)**
- **[Intlayer dengan Vite + Vue](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_vite+vue.md)**
- **[Intlayer dengan Nuxt](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nuxt.md)**
- **[Intlayer dengan Express](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_express.md)**
- **[Intlayer dengan NestJS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_nestjs.md)**
- **[Intlayer dengan Angular](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_with_angular.md)**

Setiap panduan integrasi mencakup praktik terbaik untuk menggunakan fitur Intlayer, seperti **server-side rendering**, **dynamic routing**, atau **client-side rendering**, sehingga Anda dapat mempertahankan aplikasi yang cepat, ramah SEO, dan sangat skalabel.

## Kontribusi & Masukan

Kami menghargai kekuatan pengembangan open-source dan yang digerakkan oleh komunitas. Jika Anda ingin mengusulkan perbaikan, menambahkan panduan baru, atau memperbaiki masalah apa pun dalam dokumentasi kami, jangan ragu untuk mengirimkan Pull Request atau membuka isu di [repositori GitHub kami](https://github.com/aymericzip/intlayer/blob/main/docs/docs).

**Siap untuk menerjemahkan aplikasi Anda dengan lebih cepat dan efisien?** Jelajahi dokumentasi kami untuk mulai menggunakan Intlayer hari ini. Rasakan pendekatan internasionalisasi yang kuat dan terstruktur yang menjaga konten Anda tetap terorganisir dan tim Anda menjadi lebih produktif.

---
