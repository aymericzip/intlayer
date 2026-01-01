---
createdAt: 2025-12-30
updatedAt: 2025-12-30
title: Cara menerjemahkan backend Fastify Anda – i18n guide 2026
description: Temukan cara membuat backend Fastify Anda mendukung banyak bahasa. Ikuti dokumentasi untuk menginternasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internationalization
  - Dokumentasi
  - Intlayer
  - Fastify
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - fastify
applicationTemplate: https://github.com/aymericzip/intlayer-fastify-template
history:
  - version: 7.6.0
    date: 2025-12-31
    changes: Menambahkan perintah init
  - version: 7.6.0
    date: 2025-12-31
    changes: Riwayat awal
---

# Terjemahkan situs backend Fastify Anda menggunakan Intlayer | Internationalization (i18n)

`fastify-intlayer` adalah plugin Internationalization (i18n) yang kuat untuk aplikasi Fastify, dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan menyediakan respons yang dilokalisasi berdasarkan preferensi klien.

### Kasus Penggunaan Praktis

- **Menampilkan Error Backend dalam Bahasa Pengguna**: Ketika terjadi error, menampilkan pesan dalam bahasa asli pengguna meningkatkan pemahaman dan mengurangi frustrasi. Ini sangat berguna untuk pesan error dinamis yang mungkin ditampilkan di komponen front-end seperti toast atau modal.

`fastify-intlayer` adalah plugin internationalization (i18n) yang kuat untuk aplikasi Fastify, dirancang agar layanan backend Anda dapat diakses secara global dengan menyediakan respons yang dilokalkan berdasarkan preferensi klien.

### Kasus Penggunaan Praktis

- **Menampilkan Kesalahan Backend dalam Bahasa Pengguna**: Ketika terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna meningkatkan pemahaman dan mengurangi frustrasi. Ini sangat berguna untuk pesan error dinamis yang mungkin ditampilkan di komponen frontend seperti toasts atau modals.
- **Mengambil Konten Multibahasa**: Untuk aplikasi yang mengambil konten dari database, internationalization memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lain dalam bahasa yang dipilih pengguna.
- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau notifikasi, mengirim email dalam bahasa penerima dapat secara signifikan meningkatkan keterlibatan dan efektivitas.
- **Notifikasi Push Multibahasa**: Untuk aplikasi seluler, mengirim notifikasi push dalam bahasa yang dipilih pengguna dapat meningkatkan interaksi dan retensi. Sentuhan personal ini membuat notifikasi terasa lebih relevan dan lebih mudah ditindaklanjuti.
- **Komunikasi Lainnya**: Bentuk komunikasi apa pun dari backend, seperti pesan SMS, peringatan sistem, atau pembaruan antarmuka pengguna, mendapat manfaat bila disampaikan dalam bahasa pengguna, sehingga memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan melakukan internasionalisasi pada backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga lebih selaras dengan kebutuhan pasar global, menjadikannya langkah penting untuk menskalakan layanan Anda secara internasional.

## Memulai

### Instalasi

Untuk mulai menggunakan `fastify-intlayer`, pasang paket menggunakan npm:

```bash packageManager="npm"
npm install intlayer fastify-intlayer
npx intlayer init

```

```bash packageManager="pnpm"
pnpm add intlayer fastify-intlayer
pnpm intlayer init

```

```bash packageManager="yarn"
yarn add intlayer fastify-intlayer
yarn intlayer init

```

```bash packageManager="bun"
bun add intlayer fastify-intlayer
bunx intlayer init

```

### Penyiapan

Konfigurasikan pengaturan internationalization dengan membuat sebuah `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
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
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      id: "Contoh konten yang dikembalikan dalam Bahasa Indonesia",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="src/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      id: "Contoh konten yang dikembalikan dalam Bahasa Indonesia",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      id: "Contoh konten yang dikembalikan dalam bahasa Inggris",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="src/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      id: "Contoh konten yang dikembalikan dalam bahasa Inggris",
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "id": "Contoh konten yang dikembalikan dalam bahasa Indonesia",
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama mereka dimasukkan ke direktori `contentDir` (secara default, `./src`). Dan cocokkan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Pengaturan Aplikasi Fastify

Siapkan aplikasi Fastify Anda untuk menggunakan `fastify-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

typescript fileName="src/index.ts" codeFormat="typescript"
// Muat plugin internasionalisasi
await fastify.register(intlayer);

// Rute
fastify.get("/t_example", async (_req, reply) => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Mulai server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.mjs" codeFormat="esm"
import Fastify from "fastify";
import { intlayer, t, getDictionary, getIntlayer } from "fastify-intlayer";
import dictionaryExample from "./index.content";

const fastify = Fastify({ logger: true });

// Muat plugin internasionalisasi
await fastify.register(intlayer);

// Rute
fastify.get("/t_example", async (_req, reply) => {
  return t({
    id: "Contoh konten yang dikembalikan dalam bahasa Inggris",
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

fastify.get("/getIntlayer_example", async (_req, reply) => {
  return getIntlayer("index").exampleOfContent;
});

fastify.get("/getDictionary_example", async (_req, reply) => {
  return getDictionary(dictionaryExample).exampleOfContent;
});

// Mulai server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

```javascript fileName="src/index.cjs" codeFormat="commonjs"
const Fastify = require("fastify");
const { intlayer, t, getDictionary, getIntlayer } = require("fastify-intlayer");
const dictionaryExample = require("./index.content");

const fastify = Fastify({ logger: true });

// Pembungkus untuk memulai server (async/await)
const start = async () => {
  try {
    // Muat plugin internasionalisasi
    await fastify.register(intlayer);

    // Rute
    fastify.get("/t_example", async (_req, reply) => {
      return t({
        id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
        en: "Example of returned content in English",
        fr: "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)",
      });
    });

    fastify.get("/getIntlayer_example", async (_req, reply) => {
      return getIntlayer("index").exampleOfContent;
    });

    fastify.get("/getDictionary_example", async (_req, reply) => {
      return getDictionary(dictionaryExample).exampleOfContent;
    });

    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Kompatibilitas

`fastify-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md)>) untuk aplikasi React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md)>) untuk aplikasi Next.js

- [`react-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md)>) untuk aplikasi React
- [`next-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md)>) untuk aplikasi Next.js
- [`vite-intlayer`](<https://www.google.com/search?q=%5Bhttps://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md%5D(https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md)>) untuk aplikasi Vite

Ini juga berfungsi mulus dengan solusi internasionalisasi apa pun di berbagai lingkungan, termasuk browser dan permintaan API. Anda dapat menyesuaikan middleware untuk mendeteksi locale melalui header atau cookie:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  // ... Opsi konfigurasi lainnya
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Opsi konfigurasi lainnya
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  // ... Opsi konfigurasi lainnya
  middleware: {
    headerName: "my-locale-header",
    cookieName: "my-locale-cookie",
  },
};

module.exports = config;
```

Secara default, `fastify-intlayer` akan menginterpretasikan header `Accept-Language` untuk menentukan bahasa yang dipilih klien.

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi kami](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Konfigurasi TypeScript

`fastify-intlayer` memanfaatkan kemampuan kuat TypeScript untuk meningkatkan proses internasionalisasi. Tipe statis TypeScript memastikan setiap kunci terjemahan tercakup, mengurangi risiko terjemahan yang hilang dan meningkatkan pemeliharaan.

Pastikan tipe yang dihasilkan secara otomatis (secara default di ./types/intlayer.d.ts) disertakan dalam file tsconfig.json Anda.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dihasilkan otomatis
  ],
}
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat memasang **Ekstensi Intlayer untuk VS Code** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan real-time** untuk terjemahan yang hilang.
- **Pratinjau inline** untuk konten yang diterjemahkan.
- **Tindakan cepat** untuk memudahkan pembuatan dan pembaruan terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi Intlayer untuk VS Code](https://intlayer.org/doc/vs-code-extension).

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Hal ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```
