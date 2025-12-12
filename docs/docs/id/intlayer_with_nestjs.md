---
createdAt: 2025-09-09
updatedAt: 2025-09-09
title: Cara menerjemahkan backend Nest Anda – panduan i18n 2025
description: Temukan cara membuat backend NestJS Anda menjadi multibahasa. Ikuti dokumentasi untuk melakukan internasionalisasi (i18n) dan menerjemahkannya.
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - NestJS
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - nest
applicationTemplate: https://github.com/AydinTheFirst/nestjs-intlayer
author: AydinTheFirst
history:
  - version: 5.8.0
    date: 2025-09-09
    changes: Dokumen awal
---

# Terjemahkan website backend Nest Anda menggunakan Intlayer | Internasionalisasi (i18n)

`express-intlayer` adalah middleware internasionalisasi (i18n) yang kuat untuk aplikasi Express, dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan menyediakan respons yang dilokalisasi berdasarkan preferensi klien. Karena NestJS dibangun di atas Express, Anda dapat dengan mudah mengintegrasikan `express-intlayer` ke dalam aplikasi NestJS Anda untuk menangani konten multibahasa secara efektif.

Kasus Penggunaan Praktis

- **Menampilkan Error Backend dalam Bahasa Pengguna**: Ketika terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna meningkatkan pemahaman dan mengurangi frustrasi. Ini sangat berguna untuk pesan kesalahan dinamis yang mungkin ditampilkan di komponen front-end seperti toast atau modal.

- **Mengambil Konten Multibahasa**: Untuk aplikasi yang mengambil konten dari database, internasionalisasi memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lainnya dalam bahasa yang dipilih oleh pengguna.

- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau notifikasi, mengirim email dalam bahasa penerima dapat secara signifikan meningkatkan keterlibatan dan efektivitas.

- **Notifikasi Push Multibahasa**: Untuk aplikasi mobile, mengirim notifikasi push dalam bahasa yang dipilih pengguna dapat meningkatkan interaksi dan retensi. Sentuhan personal ini dapat membuat notifikasi terasa lebih relevan dan dapat ditindaklanjuti.

- **Komunikasi Lainnya**: Bentuk komunikasi apapun dari backend, seperti pesan SMS, peringatan sistem, atau pembaruan antarmuka pengguna, akan mendapat manfaat jika disampaikan dalam bahasa pengguna, memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan melakukan internasionalisasi pada backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga lebih selaras dengan kebutuhan pasar global, menjadikannya langkah penting dalam memperluas layanan Anda secara internasional.

## Memulai

<iframe
  src="https://stackblitz.com/github/aymericzip/intlayer-nestjs-template?embed=1&ctl=1&file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - Cara Menginternasionalisasi aplikasi Anda menggunakan Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Template Aplikasi](https://github.com/aymericzip/intlayer-nestjs-template) di GitHub.

### Membuat Proyek NestJS Baru

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalasi

Untuk mulai menggunakan `express-intlayer`, instal paket menggunakan npm:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

### Konfigurasi tsconfig.json

Untuk menggunakan Intlayer dengan TypeScript, pastikan `tsconfig.json` Anda disiapkan untuk mendukung modul ES. Anda dapat melakukannya dengan mengatur opsi `module` dan `moduleResolution` ke `nodenext`.

```json5 fileName="tsconfig.json"
{
  compilerOptions: {
    module: "nodenext",
    moduleResolution: "nodenext",
    // ... opsi lainnya
  },
}
```

### Pengaturan

Konfigurasikan pengaturan internasionalisasi dengan membuat file `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts"  codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
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
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/app.content.ts" contentDeclarationFormat="typescript"
import { t, type Dictionary } from "intlayer";

const appContent: Dictionary = {
  key: "app",
  content: {
    greet: t({
      en: "Hello World!",
      fr: "Bonjour le monde !",
      es: "¡Hola Mundo!",
    }),
  },
};

export default appContent;
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama mereka dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](/doc/concept/content).

### Pengaturan Middleware Express

Integrasikan middleware `express-intlayer` ke dalam aplikasi NestJS Anda untuk menangani internasionalisasi:

```typescript fileName="src/app.module.ts" codeFormat="typescript"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { intlayer } from "express-intlayer";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(intlayer()).forRoutes("*"); // Terapkan ke semua rute
  }
}
```

### Gunakan Terjemahan di Layanan atau Kontroler Anda

Anda sekarang dapat menggunakan fungsi `getIntlayer` untuk mengakses terjemahan di layanan atau kontroler Anda:

```typescript fileName="src/app.service.ts" codeFormat="typescript"
import { Injectable } from "@nestjs/common";
import { getIntlayer } from "express-intlayer";

@Injectable()
export class AppService {
  getHello(): string {
    return getIntlayer("app").greet; // Mengambil terjemahan 'greet' dari namespace 'app'
  }
}
```

### Kompatibilitas

`express-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](/doc/packages/react-intlayer) untuk aplikasi React
- [`next-intlayer`](/doc/packages/next-intlayer) untuk aplikasi Next.js
- [`vite-intlayer`](/doc/packages/vite-intlayer) untuk aplikasi Vite

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

Secara default, `express-intlayer` akan menginterpretasikan header `Accept-Language` untuk menentukan bahasa yang dipilih oleh klien.

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi kami](/doc/concept/configuration).

### Konfigurasi TypeScript

`express-intlayer` memanfaatkan kemampuan kuat dari TypeScript untuk meningkatkan proses internasionalisasi. Pengetikan statis TypeScript memastikan bahwa setiap kunci terjemahan diperhitungkan, mengurangi risiko terjemahan yang hilang dan meningkatkan pemeliharaan.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Translation error](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.png?raw=true)

Pastikan tipe yang dihasilkan secara otomatis (secara default di ./types/intlayer.d.ts) disertakan dalam file tsconfig.json Anda.

```json5 fileName="tsconfig.json"
{
  // ... Konfigurasi TypeScript Anda yang sudah ada
  include: [
    // ... Konfigurasi TypeScript Anda yang sudah ada
    `.intlayer/**/*.ts`, // Sertakan tipe yang dihasilkan secara otomatis
  ],
}
```

### Ekstensi VS Code

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

[Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten terjemahan.
- **Tindakan cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://intlayer.org/doc/vs-code-extension).

### Konfigurasi Git

Disarankan untuk mengabaikan file-file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file-file tersebut ke repositori Git Anda.

Untuk melakukan ini, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file-file yang dihasilkan oleh Intlayer
.intlayer
```
