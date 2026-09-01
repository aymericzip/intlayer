---
createdAt: 2025-09-09
updatedAt: 2026-05-31
title: "NestJS i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi NestJS multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
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
author:
  name: AydinTheFirst
  github: AydinTheFirst
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 5.8.0
    date: 2025-09-09
    changes: "Dokumen awal"
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

### Membuat Proyek NestJS Baru

```bash packageManager="npm"
npm install -g @nestjs/cli
nest new my-nest-app
```

### Instalasi

Untuk mulai menggunakan `express-intlayer`, instal paket menggunakan npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer@canary init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer@canary init --interactive
```

```bash packageManager="bun"
bunx intlayer@canary init --interactive
```

> flag `--interactive` bersifat opsional. Gunakan `intlayer-cli init` jika Anda adalah agen AI.

> Perintah ini akan mendeteksi lingkungan Anda dan menginstal paket yang diperlukan. Misalnya:

```bash packageManager="npm"
npm install intlayer express-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer express-intlayer
```

```bash packageManager="yarn"
yarn add intlayer express-intlayer
```

```bash packageManager="bun"
bun add intlayer express-intlayer
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

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/app.content.ts" contentDeclarationFormat=["typescript", "esm", "cjs"]
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

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama mereka dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi NestJS?">

- **`nestjs-i18n`**: modul populer untuk NestJS menggunakan JSON dan YAML.
- **`Intlayer`**: kompatibilitas penuh dengan Dependency Injection dan interceptor, typing build time, terjemahan AI, dan kamus bersama dengan frontend.

Alasan utama untuk menginternasionalkan backend adalah karena sebagian besar teks yang dibaca pengguna tidak pernah melewati frontend: pesan kesalahan API, email transaksional, push notification, SMS, dan ekspor PDF. Hal-hal tersebut memerlukan bahasa penerima, yang diselesaikan per permintaan dan bukan per sesi.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle server NestJS saya?">

Jauh lebih sedikit daripada katalog JSON konvensional. Kompiler Intlayer mengoptimalkan kamus saat build time dan tidak mengurai ulang kamus pada setiap request, menjaga jejak memori dan waktu cold start tetap minimal. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

</Question>

<Question title="Bisakah saya bermigrasi dari nestjs-i18n tanpa menulis ulang handler dan service saya?">

Sebagian besar ya. [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file yang ada sambil menghasilkan kamus Intlayer.

</Question>

<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan lokal dalam satu file.

</Question>

<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

Untuk proses otomatis penuh, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melakukan hal yang sama saat build time dan menghasilkan kamus pada setiap perubahan.

</Question>

<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci ke file konten, ekstrak string, dan jalankan build, fill, test, push dan pull dari command palette.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: go to definition, hover preview nilai terjemahan, dan autocompletion kunci di editor apa pun yang mendukung LSP. Juga menangani panggilan `i18next`.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: aturan `no-raw-text` menandai string hardcoded.

</Question>

<Question title="Bagaimana bahasa klien dideteksi pada request yang masuk?">

Interceptor atau middleware NestJS memeriksa header dan cookie, mengikat locale ke konteks request.

</Question>

<Question title="Bisakah deklarasi konten yang sama melayani respons API dan frontend web saya?">

Ya, dalam monorepo atau paket bersama, ini adalah keunggulan utama. Kamus yang dideklarasikan dapat diimpor di backend (email, error, respons API) dan frontend (React, Vue, Svelte, dll.), menjaga satu sumber kebenaran untuk semua teks.

</Question>

<Question title="Apakah Intlayer memperlambat penanganan request?">

Tidak. Deteksi bahasa dilakukan dalam middleware yang sangat ringan (membaca cookie, query, atau Accept-Language). Kamus telah dikompilasi saat build time dan berada di memori, sehingga tidak ada pembacaan disk atau penguraian template saat request masuk.

</Question>

<Question title="Bagaimana cara melokalisasi respons kesalahan, email, dan push notification?">

Dengan memanggil fungsi `getIntlayer` atau `t()` berdasarkan locale request. Jika bahasa pengguna disimpan di database, fungsi dapat dipanggil dengan locale target secara eksplisit untuk background job di luar request.

</Question>

<Question title="Bagaimana Intlayer bekerja dengan Dependency Injection (DI) di NestJS?">

Service dan interceptor Intlayer dapat diinjeksikan ke dalam kontainer IoC NestJS, memudahkan akses ke locale di controller dan provider.

</Question>

<Question title="Bisakah saya melokalisasi pesan validasi DTO NestJS?">

Ya. Dalam custom decorator `class-validator` atau exception filter, Anda dapat memanggil `t()` atau `getIntlayer()`.

</Question>

<Question title="Bagaimana cara menerjemahkan aplikasi secara otomatis dengan AI?">

Jalankan `npx intlayer fill`. Perintah ini mengisi terjemahan yang hilang menggunakan LLM pilihan Anda dengan provider dan API key Anda sendiri, dan `--git-diff` membatasi proses ke file yang diubah. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

</Question>

<Question title="Apakah Intlayer mendukung bentuk jamak, gender dan rich text?">

Ya: [bentuk jamak (plurals)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [penyisipan (insertions)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md), dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md).

</Question>

<Question title="Bagaimana rekan tim non-teknis dapat mengedit template email dan pesan kesalahan tanpa menyentuh kode?">

Dua opsi tersedia: [Intlayer CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md), yang memisahkan konten dari codebase dan memungkinkan pengeditan teks melalui web, atau [editor visual](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_visual_editor.md), yang menyimpan perubahan langsung ke file kode lokal.

</Question>

<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk penggunaan komersial. CMS yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri (self-host)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

</Question>

</FAQ>
