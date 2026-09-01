---
createdAt: 2025-08-23
updatedAt: 2026-05-31
title: "AdonisJS i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Tidak ada lagi i18next. Panduan 2026 untuk membangun aplikasi AdonisJS multibahasa (i18n). Terjemahkan dengan agen AI dan optimalkan ukuran bundle, SEO, dan performa."
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
applicationTemplate: https://github.com/aymericzip/intlayer-adonis-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 8.0.0
    date: 2025-12-30
    changes: "Inisialisasi riwayat"
author: aymericzip
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

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-adonis-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Application Template](https://github.com/aymericzip/intlayer-adonis-template) di GitHub.

### Instalasi

Untuk mulai menggunakan `adonis-intlayer`, instal paket menggunakan npm:

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
npm install intlayer adonis-intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer adonis-intlayer
```

```bash packageManager="yarn"
yarn add intlayer adonis-intlayer
```

```bash packageManager="bun"
bun add intlayer adonis-intlayer
```

### Penyiapan

Konfigurasikan pengaturan internasionalisasi dengan membuat `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="app/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
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

> Deklarasi konten Anda dapat ditentukan di mana saja dalam aplikasi Anda selama disertakan dalam direktori `contentDir` (secara default, `./src` atau `./app`). Dan cocok dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

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
  routing: {
    storage: [
      { type: "header", name: "my-locale-header" },
      { type: "cookie", name: "my-locale-cookie" },
    ],
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

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi AdonisJS?">

- **`@adonisjs/i18n`**: paket resmi AdonisJS.
- **`Intlayer`**: integrasi baik untuk backend maupun frontend modern, typing TypeScript lengkap, terjemahan AI, dan CMS.

Alasan utama untuk menginternasionalkan backend adalah karena sebagian besar teks yang dibaca pengguna tidak pernah melewati frontend: pesan kesalahan API, email transaksional, push notification, SMS, dan ekspor PDF. Hal-hal tersebut memerlukan bahasa penerima, yang diselesaikan per permintaan dan bukan per sesi.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

</Question>

<Question title="Berapa banyak i18n menambah ukuran bundle server AdonisJS saya?">

Jauh lebih sedikit daripada katalog JSON konvensional. Kompiler Intlayer mengoptimalkan kamus saat build time dan tidak mengurai ulang kamus pada setiap request, menjaga jejak memori dan waktu cold start tetap minimal. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

</Question>

<Question title="Bisakah saya bermigrasi dari @adonisjs/i18n tanpa menulis ulang handler saya?">

Sebagian besar ya. [Plugin sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file terjemahan yang ada.

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

HTTP middleware AdonisJS memeriksa cookie dan header via `HttpContext`, menyimpan locale di `ctx.locale`.

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

<Question title="Apakah Intlayer bekerja dengan template Edge (EdgeJS)?">

Ya. Dengan mengikat helper Intlayer ke variabel global Edge, Anda dapat me-render teks terlokalisasi langsung di file `.edge`.

</Question>

<Question title="Bagaimana cara melokalisasi pesan validasi VineJS?">

Dalam aturan VineJS, Anda dapat memanggil `t()` atau `getIntlayer()` untuk menghasilkan pesan error sesuai bahasa pengguna.

</Question>

<Question title="Bagaimana cara mengelola segmen locale di rute AdonisJS?">

Mendefinisikan grup rute dengan `prefix('/:locale')` dan menerapkan middleware validasi locale.

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
