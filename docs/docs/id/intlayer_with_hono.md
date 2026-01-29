---
createdAt: 2025-08-23
updatedAt: 2025-12-30
title: i18n Hono - Cara menerjemahkan aplikasi Hono Anda – panduan 2026
description: Temukan cara membuat backend Hono Anda multibahasa. Ikuti dokumentasi untuk internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Hono
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - hono
applicationTemplate: https://github.com/aymericzip/intlayer-hono-template
history:
  - version: 7.5.9
    date: 2025-12-30
    changes: Tambahkan perintah init
  - version: 5.5.10
    date: 2025-06-29
    changes: Inisialisasi riwayat
---

# Terjemahkan situs web backend Hono Anda menggunakan Intlayer | Internasionalisasi (i18n)

`hono-intlayer` adalah middleware internasionalisasi (i18n) yang kuat untuk aplikasi Hono, dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan menyediakan respons yang dilokalkan berdasarkan preferensi klien.

### Kasus Penggunaan Praktis

- **Menampilkan Kesalahan Backend dalam Bahasa Pengguna**: Saat terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna akan meningkatkan pemahaman dan mengurangi rasa frustrasi. Ini sangat berguna untuk pesan kesalahan dinamis yang mungkin ditampilkan di komponen front-end seperti toast atau modal.

- **Mengambil Konten Multibahasa**: Untuk aplikasi yang menarik konten dari database, internasionalisasi memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lainnya dalam bahasa yang disukai oleh pengguna.

- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau notifikasi, mengirim email dalam bahasa penerima dapat meningkatkan keterlibatan dan efektivitas secara signifikan.

- **Notifikasi Push Multibahasa**: Untuk aplikasi seluler, mengirim notifikasi push dalam bahasa pilihan pengguna dapat meningkatkan interaksi dan retensi. Sentuhan personal ini dapat membuat notifikasi terasa lebih relevan dan dapat ditindaklanjuti.

- **Komunikasi Lainnya**: Segala bentuk komunikasi dari backend, seperti pesan SMS, peringatan sistem, atau pembaruan antarmuka pengguna, mendapatkan keuntungan dari penggunaan bahasa pengguna, memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan menginternasionalisasi backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga selaras dengan kebutuhan pasar global, menjadikannya langkah kunci dalam menskalakan layanan Anda ke seluruh dunia.

## Memulai

### Instalasi

Untuk mulai menggunakan `hono-intlayer`, instal paket menggunakan npm:

```bash packageManager="npm"
npm install intlayer hono-intlayer
npx intlayer init
```

```bash packageManager="pnpm"
pnpm add intlayer hono-intlayer
pnpm intlayer init
```

```bash packageManager="yarn"
yarn add intlayer hono-intlayer
yarn intlayer init
```

```bash packageManager="bun"
bun add intlayer hono-intlayer
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
      Locales.FRENCH,
      Locales.SPANISH_MEXICO,
      Locales.SPANISH_SPAIN,
      Locales.INDONESIAN,
    ],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/index.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      id: "Contoh konten yang dikembalikan dalam Bahasa Indonesia",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda selama disertakan ke dalam direktori `contentDir` (secara default, `./src`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

### Penyiapan Aplikasi Hono

Siapkan aplikasi Hono Anda untuk menggunakan `hono-intlayer`:

```typescript fileName="src/index.ts" codeFormat="typescript"
import { Hono } from "hono";
import { intlayer, t, getDictionary, getIntlayer } from "hono-intlayer";
import dictionaryExample from "./index.content";

const app = new Hono();

// Muat handler permintaan internasionalisasi
app.use("*", intlayer());

// Rute
app.get("/t_example", (c) => {
  return c.text(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      id: "Contoh konten yang dikembalikan dalam Bahasa Indonesia",
    })
  );
});

app.get("/getIntlayer_example", (c) => {
  return c.json(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (c) => {
  return c.json(getDictionary(dictionaryExample).exampleOfContent);
});

export default app;
```

### Kompatibilitas

`hono-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md) untuk aplikasi React
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md) untuk aplikasi Next.js
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md) untuk aplikasi Vite

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

Secara default, `hono-intlayer` akan menginterpretasikan header `Accept-Language` untuk menentukan bahasa pilihan klien.

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi kami](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

### Konfigurasikan TypeScript

`hono-intlayer` memanfaatkan kemampuan TypeScript yang kuat untuk meningkatkan proses internasionalisasi. Pengetikan statis TypeScript memastikan bahwa setiap kunci terjemahan diperhitungkan, mengurangi risiko terjemahan yang hilang dan meningkatkan pemeliharaan.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan tipe yang dibuat secara otomatis (secara default di ./types/intlayer.d.ts) disertakan dalam file tsconfig.json Anda.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  "include": [
    // ... Konfigurasi TypeScript Anda yang sudah ada
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
- **Pratinjau sebaris** konten terjemahan.
- **Tindakan cepat** untuk membuat dan memperbarui terjemahan dengan mudah.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dibuat oleh Intlayer. Ini memungkinkan Anda menghindari komitmen file-file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dibuat oleh Intlayer
.intlayer
```
