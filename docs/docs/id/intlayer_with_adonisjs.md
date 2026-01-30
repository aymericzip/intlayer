---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: AdonisJS i18n - Cara menerjemahkan aplikasi AdonisJS Anda – panduan 2026
description: Temukan cara membuat backend AdonisJS Anda multibahasa. Ikuti dokumentasi untuk menginternasionalkan (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - AdonisJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - adonisjs
applicationTemplate: https://github.com/aymericzip/intlayer-adonisjs-template
history:
  - version: 8.0.0
    date: 2025-12-30
    changes: Inisialisasi riwayat
---

# Terjemahkan backend AdonisJS Anda menggunakan Intlayer | Internasionalisasi (i18n)

`adonis-intlayer` adalah paket internasionalisasi (i18n) yang kuat untuk aplikasi AdonisJS, yang dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan memberikan respons yang dilokalkan berdasarkan preferensi klien.

### Kasus Penggunaan Praktis

- **Menampilkan Kesalahan Backend dalam Bahasa Pengguna**: Saat terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna akan meningkatkan pemahaman dan mengurangi rasa frustrasi. Ini sangat berguna untuk pesan kesalahan dinamis yang mungkin ditampilkan dalam komponen front-end seperti toast atau modal.

- **Mengambil Konten Multibahasa**: Untuk aplikasi yang menarik konten dari database, internasionalisasi memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lainnya dalam bahasa yang disukai oleh pengguna.

- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau pemberitahuan, mengirim email dalam bahasa penerima dapat secara signifikan meningkatkan keterlibatan dan efektivitas.

- **Pemberitahuan Push Multibahasa**: Untuk aplikasi seluler, mengirim pemberitahuan push dalam bahasa pilihan pengguna dapat meningkatkan interaksi dan retensi. Sentuhan pribadi ini dapat membuat pemberitahuan terasa lebih relevan dan dapat ditindaklanjuti.

- **Komunikasi Lainnya**: Segala bentuk komunikasi dari backend, seperti pesan SMS, peringatan sistem, atau pembaruan antarmuka pengguna, mendapat manfaat dari penggunaan bahasa pengguna, memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan menginternasionalkan backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga selaras dengan kebutuhan pasar global, menjadikannya langkah kunci dalam menskalakan layanan Anda ke seluruh dunia.

## Memulai

### Instalasi

Untuk mulai menggunakan `adonis-intlayer`, instal paket menggunakan npm:

```bash packageManager="npm"
npm install intlayer adonis-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
bunx intlayer init
```

### Penyiapan

Konfigurasikan pengaturan internasionalisasi dengan membuat `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
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
      Locales.RUSSIAN,
      Locales.JAPANESE,
      Locales.FRENCH,
      Locales.KOREAN,
      Locales.CHINESE,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.ARABIC,
      Locales.ITALIAN,
      Locales.ENGLISH_UNITED_KINGDOM,
      Locales.PORTUGUESE,
      Locales.HINDI,
      Locales.TURKISH,
      Locales.POLISH,
      Locales.INDONESIAN,
      Locales.VIETNAMESE,
      Locales.UKRAINIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="app/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```javascript fileName="app/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

export default indexContent;
```

```javascript fileName="app/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
};

module.exports = indexContent;
```

```json fileName="app/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "id": "Contoh konten yang dikembalikan dalam bahasa Indonesia",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda selama disertakan dalam direktori `contentDir` (secara default, `./src` atau `./app`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Penyiapan Aplikasi AdonisJS

Siapkan aplikasi AdonisJS Anda untuk menggunakan `adonis-intlayer`.

#### Daftarkan middleware

Pertama, Anda perlu mendaftarkan middleware `intlayer` di aplikasi Anda.

```typescript fileName="start/kernel.ts"
router.use([() => import("adonis-intlayer/middleware")]);
```

#### Tentukan rute Anda

```typescript fileName="start/routes.ts"
import router from "@adonisjs/core/services/router";
import { t, getIntlayer, getDictionary } from "adonis-intlayer";
import indexContent from "../app/index.content";

router.get("/t_example", async () => {
  return t({
    en: "Example of returned content in English",
    fr: "Exemple de contenu renvoyé en français",
    id: "Contoh konten yang dikembalikan dalam bahasa Indonesia",
    "es-ES": "Ejemplo de contenido devuelto en español (España)",
    "es-MX": "Ejemplo de contenido devuelto en español (México)",
  });
});

router.get("/getIntlayer_example", async () => {
  return getIntlayer("index").exampleOfContent;
});

router.get("/getDictionary_example", async () => {
  return getDictionary(indexContent).exampleOfContent;
});
```

#### Fungsi

`adonis-intlayer` mengekspor beberapa fungsi untuk menangani internasionalisasi dalam aplikasi Anda:

- `t(content, locale?)`: Fungsi terjemahan dasar.
- `getIntlayer(key, locale?)`: Ambil konten berdasarkan kunci dari kamus Anda.
- `getDictionary(dictionary, locale?)`: Ambil konten dari objek kamus tertentu.
- `getLocale()`: Ambil locale saat ini dari konteks permintaan.

#### Gunakan dalam Controller

```typescript fileName="app/controllers/example_controller.ts"
import type { HttpContext } from "@adonisjs/core/http";
import { t } from "adonis-intlayer";

export default class ExampleController {
  async index({ response }: HttpContext) {
    return response.send(
      t({
        en: "Hello from controller",
        fr: "Bonjour depuis le contrôleur",
        id: "Halo dari pengontrol",
      })
    );
  }
}
```

### Kompatibilitas

`adonis-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md) untuk aplikasi React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md) untuk aplikasi Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md) untuk aplikasi Vite

Ini juga bekerja dengan mulus dengan solusi internasionalisasi apa pun di berbagai lingkungan, termasuk browser dan permintaan API. Anda dapat menyesuaikan middleware untuk mendeteksi locale melalui header atau cookie:

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

Secara default, `adonis-intlayer` akan menginterpretasikan header `Accept-Language` untuk menentukan bahasa pilihan klien.

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md) kami.

### Konfigurasi TypeScript

`adonis-intlayer` memanfaatkan kemampuan TypeScript yang kuat untuk meningkatkan proses internasionalisasi. Pengetikan statis TypeScript memastikan bahwa setiap kunci terjemahan diperhitungkan, mengurangi risiko terjemahan yang hilang dan meningkatkan pemeliharaan.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kesalahan terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan tipe yang dibuat secara otomatis (secara default di ./types/intlayer.d.ts) disertakan dalam file tsconfig.json Anda.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang ada
    ".intlayer/**/*.ts", // Sertakan tipe yang dibuat secara otomatis
  ],
}
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Instal dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau sebaris** dari konten yang diterjemahkan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/id/doc/vs-code-extension).

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari memasukkannya ke dalam repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```
