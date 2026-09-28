---
createdAt: 2025-08-23
updatedAt: 2026-05-31
priority: 9
title: "Express i18n - Panduan lengkap menerjemahkan aplikasi Anda"
description: "Siapkan Intlayer di Express: deteksi locale per request dengan middleware, terjemahkan respons API dan pesan error, bertipe dari ujung ke ujung."
keywords:
  - Internasionalisasi
  - Dokumentasi
  - Intlayer
  - Express
  - JavaScript
  - Backend
slugs:
  - doc
  - environment
  - express
applicationTemplate: https://github.com/aymericzip/intlayer-express-template
history:
  - version: 8.9.0
    date: 2026-05-04
    changes: "Perbarui penggunaan API useIntlayer Solid ke akses properti langsung"
  - version: 7.5.9
    date: 2025-12-30
    changes: "Tambahkan perintah init"
  - version: 5.5.10
    date: 2025-06-29
    changes: "Inisialisasi riwayat"
author: aymericzip
---

# Terjemahkan website backend Express Anda menggunakan Intlayer

`express-intlayer` adalah middleware internasionalisasi (i18n) yang kuat untuk aplikasi Express, dirancang untuk membuat layanan backend Anda dapat diakses secara global dengan menyediakan respons yang dilokalisasi berdasarkan preferensi klien.

## Kasus Penggunaan Praktis

- **Menampilkan Error Backend dalam Bahasa Pengguna**: Ketika terjadi kesalahan, menampilkan pesan dalam bahasa asli pengguna meningkatkan pemahaman dan mengurangi frustrasi. Ini sangat berguna untuk pesan error dinamis yang mungkin ditampilkan di komponen front-end seperti toast atau modal.

- **Mengambil Konten Multibahasa**: Untuk aplikasi yang mengambil konten dari database, internasionalisasi memastikan bahwa Anda dapat menyajikan konten ini dalam berbagai bahasa. Ini sangat penting untuk platform seperti situs e-commerce atau sistem manajemen konten yang perlu menampilkan deskripsi produk, artikel, dan konten lain dalam bahasa yang dipilih pengguna.

- **Mengirim Email Multibahasa**: Baik itu email transaksional, kampanye pemasaran, atau notifikasi, mengirim email dalam bahasa penerima dapat secara signifikan meningkatkan keterlibatan dan efektivitas.

- **Notifikasi Push Multibahasa**: Untuk aplikasi mobile, mengirim notifikasi push dalam bahasa yang dipilih pengguna dapat meningkatkan interaksi dan retensi. Sentuhan personal ini dapat membuat notifikasi terasa lebih relevan dan dapat ditindaklanjuti.

- **Komunikasi Lainnya**: Bentuk komunikasi apa pun dari backend, seperti pesan SMS, peringatan sistem, atau pembaruan antarmuka pengguna, akan mendapat manfaat jika disampaikan dalam bahasa pengguna, memastikan kejelasan dan meningkatkan pengalaman pengguna secara keseluruhan.

Dengan menginternasionalisasi backend, aplikasi Anda tidak hanya menghormati perbedaan budaya tetapi juga lebih selaras dengan kebutuhan pasar global, menjadikannya langkah penting dalam memperluas layanan Anda secara global.

## Memulai

<iframe
  src="https://ide.intlayer.org/aymericzip/intlayer-express-template?file=intlayer.config.ts"
  className="m-auto overflow-hidden rounded-lg border-0 max-md:size-full max-md:h-[700px] md:aspect-16/9 md:w-full"
  title="Demo CodeSandbox - How to Internationalize your application using Intlayer"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
/>

Lihat [Application Template](https://github.com/aymericzip/intlayer-express-template) di GitHub.

### Instalasi

Untuk mulai menggunakan `express-intlayer`, instal paket menggunakan npm:

```bash packageManager="npm"
npx intlayer init --interactive
```

```bash packageManager="pnpm"
pnpm dlx intlayer init --interactive
```

```bash packageManager="yarn"
yarn dlx intlayer init --interactive
```

```bash packageManager="bun"
bunx intlayer init --interactive
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

### Pengaturan

Konfigurasikan pengaturan internasionalisasi dengan membuat file `intlayer.config.ts` di root proyek Anda:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

### Deklarasikan Konten Anda

Buat dan kelola deklarasi konten Anda untuk menyimpan terjemahan:

```typescript fileName="src/index.content.ts" contentDeclarationFormat={["typescript", "esm", "commonjs"]}
import { t, type Dictionary } from "intlayer";

const indexContent = {
  key: "index",
  content: {
    exampleOfContent: t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    }),
  },
} satisfies Dictionary;

export default indexContent;
```

```json fileName="src/index.content.json" contentDeclarationFormat="json"
{
  "$schema": "https://intlayer.org/schema.json",
  "key": "index",
  "content": {
    "exampleOfContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Example of returned content in English",
        "fr": "Exemple de contenu renvoyé en français",
        "es-ES": "Ejemplo de contenido devuelto en español (España)",
        "es-MX": "Ejemplo de contenido devuelto en español (México)"
      }
    }
  }
}
```

> Deklarasi konten Anda dapat didefinisikan di mana saja dalam aplikasi Anda selama mereka dimasukkan ke dalam direktori `contentDir` (secara default, `./src`). Dan sesuai dengan ekstensi file deklarasi konten (secara default, `.content.{json,ts,tsx,js,jsx,mjs,cjs,md,mdx,yaml,yml}`).

> Untuk detail lebih lanjut, lihat [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md).

- [dokumentasi deklarasi konten](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/content_file.md)

### Pengaturan Aplikasi Express

Siapkan aplikasi Express Anda untuk menggunakan `express-intlayer`:

```typescript fileName="src/index.ts" codeFormat={["typescript", "esm", "commonjs"]}
import express, { type Express } from "express";
import { intlayer, t, getDictionary, getIntlayer } from "express-intlayer";
import dictionaryExample from "./index.content";

const app: Express = express();

// Memuat handler permintaan internasionalisasi
app.use(intlayer());

// Rute
app.get("/t_example", (_req, res) => {
  res.send(
    t({
      en: "Example of returned content in English",
      fr: "Exemple de contenu renvoyé en français",
      "es-ES": "Ejemplo de contenido devuelto en español (España)",
      "es-MX": "Ejemplo de contenido devuelto en español (México)",
    })
  );
});

app.get("/getIntlayer_example", (_req, res) => {
  res.send(getIntlayer("index").exampleOfContent);
});

app.get("/getDictionary_example", (_req, res) => {
  res.send(getDictionary(dictionaryExample).exampleOfContent);
});

// Memulai server
app.listen(3000, () => console.log(`Listening on port 3000`));
```

### Kompatibilitas

`express-intlayer` sepenuhnya kompatibel dengan:

- [`react-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/react-intlayer/index.md)
- [`next-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/next-intlayer/index.md)
- [`vite-intlayer`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/packages/vite-intlayer/index.md)

Ini juga bekerja dengan mulus dengan solusi internasionalisasi apa pun di berbagai lingkungan, termasuk browser dan permintaan API. Anda dapat menyesuaikan middleware untuk mendeteksi locale melalui header atau cookie:

```typescript fileName="intlayer.config.ts" codeFormat={["typescript", "esm", "commonjs"]}
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

> Untuk informasi lebih lanjut tentang konfigurasi dan topik lanjutan, kunjungi [dokumentasi kami](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

- [Konfigurasi Intlayer (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

### Konfigurasi TypeScript

`express-intlayer` memanfaatkan kemampuan kuat dari TypeScript untuk meningkatkan proses internasionalisasi. Pengetikan statis TypeScript memastikan bahwa setiap kunci terjemahan diperhitungkan, mengurangi risiko terjemahan yang hilang dan meningkatkan pemeliharaan.

![Autocompletion](https://github.com/aymericzip/intlayer/blob/main/docs/assets/autocompletion.png?raw=true)

![Kesalahan Terjemahan](https://github.com/aymericzip/intlayer/blob/main/docs/assets/translation_error.webp?raw=true)

Pastikan tipe yang dihasilkan secara otomatis (secara default di ./types/intlayer.d.ts) sudah termasuk dalam file tsconfig.json Anda.

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

Untuk meningkatkan pengalaman pengembangan Anda dengan Intlayer, Anda dapat menginstal **Ekstensi VS Code Intlayer** resmi.

- [Pasang dari VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=intlayer.intlayer-vs-code-extension)

Ekstensi ini menyediakan:

- **Autocompletion** untuk kunci terjemahan.
- **Deteksi kesalahan waktu nyata** untuk terjemahan yang hilang.
- **Pratinjau inline** dari konten terjemahan.
- **Aksi cepat** untuk dengan mudah membuat dan memperbarui terjemahan.

Untuk detail lebih lanjut tentang cara menggunakan ekstensi ini, lihat [dokumentasi Ekstensi VS Code Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md).

- [dokumentasi Ekstensi VS Code Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)

### Konfigurasi Git

Disarankan untuk mengabaikan file yang dihasilkan oleh Intlayer. Ini memungkinkan Anda untuk menghindari meng-commit file tersebut ke repositori Git Anda.

Untuk melakukannya, Anda dapat menambahkan instruksi berikut ke file `.gitignore` Anda:

```plaintext fileName=".gitignore"
# Abaikan file yang dihasilkan oleh Intlayer
.intlayer
```

## Pertanyaan yang Sering Diajukan

<FAQ>

<Question title="Apa saja solusi berbeda yang tersedia untuk menginternasionalkan aplikasi Express?">

Opsi historisnya adalah `i18next` dengan `i18next-http-middleware`, yang memuat katalog JSON per namespace dan menyimpan locale pada permintaan. Alternatifnya adalah `Intlayer` melalui `express-intlayer`, yang mendeklarasikan konten dalam file bertipe yang dibagikan dengan frontend Anda, menyelesaikan locale per permintaan, dan menambahkan terjemahan AI serta CMS.

Alasan menginternasionalkan backend adalah karena sebagian besar teks yang dibaca pengguna tidak pernah melewati frontend: pesan kesalahan API, email transaksional, notifikasi push, SMS, dan ekspor PDF. Semua ini memerlukan bahasa penerima, yang diselesaikan per permintaan daripada per sesi.

Lihat [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md).

- [mengapa Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/interest_of_intlayer.md)

</Question>
<Question title="Berapa banyak i18n menambah ukuran bundle server Express saya?">

Sangat sedikit. Kamus dikompilasi lebih awal (ahead of time) dan hanya locale yang Anda deklarasikan yang disertakan, sehingga tidak ada pemuatan katalog saat boot dan tidak ada pembacaan file di jalur request. Hal ini paling penting pada deployment serverless dan edge, di mana ukuran bundle menentukan waktu cold start. Lihat [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md).

- [optimasi bundle](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/bundle_optimization.md)

</Question>
<Question title="Bisakah saya bermigrasi dari `i18next` tanpa menulis ulang handler saya?">

Ya, dan ada dua jalur. Anda dapat memigrasikan konten secara bertahap dengan [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md). Atau Anda dapat mempertahankan API Anda saat ini sepenuhnya: [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md) menyediakan API yang persis sama dengan `i18next`, tetapi dilayani oleh kamus Intlayer, sehingga hanya import yang berubah dan kode handler tidak.

- [panduan migrasi i18next](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/migration_from_i18next_to_intlayer.md)
- [compat adapters](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compat/index.md)

</Question>
<Question title="Bisakah saya menyimpan file terjemahan JSON yang sudah ada?">

Ya. Plugin [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md) menjaga file `/messages/{locale}/{namespace}.json` Anda sebagai sumber kebenaran dan menghasilkan kamus Intlayer darinya, di kedua arah. Plugin [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md) melakukan hal yang sama untuk katalog gettext, dan [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md) memungkinkan Anda membagi konten berdasarkan bahasa daripada mengelompokkan locale dalam satu file.

- [sync JSON](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-json.md)
- [sync PO](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/plugins/sync-po.md)
- [file per locale](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/per_locale_file.md)

</Question>
<Question title="Apakah saya harus memindahkan konten saya key by key?">

Tidak. Jalankan `npx intlayer extract` dan Intlayer membaca file sumber Anda, mengeluarkan string yang dihadapi pengguna, dan menulis file `.content` di sebelah masing-masing, sehingga Anda meninjau diff alih-alih menyalin string ke dalam katalog satu per satu. Lihat [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md).

- [perintah extract](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/extract.md)

Di sisi frontend dari proyek yang sama, [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md) melangkah lebih jauh dan menghasilkan kamus saat build time dari sumber JSX, TSX, Vue, atau Svelte Anda, sehingga kedua bagian aplikasi berbagi satu lapisan konten tanpa kunci yang dikelola secara manual.

- [Intlayer Compiler](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/compiler.md)

</Question>
<Question title="Apa tooling editor dan agen AI yang tersedia?">

Lima bagian, semuanya opsional:

- **[Ekstensi VS Code](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/vs_code_extension.md)**: lompat dari kunci `useIntlayer` ke file konten yang mendeklarasikannya, ekstrak konten dari komponen, dan jalankan build, fill, test, push dan pull dari command palette atau tab Intlayer khusus.
- **[Server LSP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/lsp.md)**: kemampuan yang sama di editor apa pun yang mendukung LSP, dengan go to definition, find all references, hover preview nilai terjemahan, autocompletion kunci dan field, serta peringatan ketika sebuah kunci tidak dideklarasikan di mana pun. Server ini juga menyelesaikan panggilan `i18next`, `react-i18next`, `next-intl` dan `use-intl`, yang membantu selama migrasi.
- **[Server MCP](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/mcp_server.md)**: mengekspos dokumentasi Intlayer dan CLI ke Cursor, VS Code, Claude Desktop, Claude Code dan ChatGPT, sehingga asisten menjawab dari dokumentasi terkini alih-alih menebak, dan dapat menjalankan perintah seperti `intlayer fill` sendiri.
- **[Agent skills](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/agent_skills.md)**: keahlian terfokus seperti `intlayer-config`, `intlayer-cli` dan `intlayer-content`, ditambah satu per framework, yang mengajarkan agen konfigurasi routing Anda dan tipe node konten.
- **[Plugin ESLint](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/eslint.md)**: `no-raw-text` menandai string hardcoded, dengan aturan tambahan untuk kunci kamus statis dan konten yang tidak digunakan.

</Question>
<Question title="Bagaimana Intlayer mengetahui bahasa yang digunakan untuk menjawab?">

Secara default `express-intlayer` membaca header `Accept-Language` dari request yang masuk dan memilih locale terdekat yang dideklarasikan, dengan fallback ke locale default Anda. Anda dapat mengubah sumbernya dengan `routing.storage`, misalnya header kustom atau cookie yang diatur oleh frontend Anda, sehingga API menjawab dalam bahasa yang benar-benar dipilih pengguna, bukan bahasa yang diiklankan oleh browsernya. Lihat [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md).

- [referensi konfigurasi](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/configuration.md)

</Question>
<Question title="Apakah locale diisolasi per request?">

Ya. Middleware membatasi locale aktif pada request, sehingga dua request bersamaan dalam bahasa berbeda tidak pernah membaca locale satu sama lain. Itulah yang membuat `t()` dan `getIntlayer()` aman dipanggil dari sebuah service tanpa meneruskan argumen locale melalui setiap fungsi.

</Question>
<Question title="Bagaimana cara mengirim email transaksional dalam bahasa penerima?">

Deklarasikan konten email di file konten seperti konten lainnya, lalu ambil dengan `getIntlayer` untuk locale penerima yang tersimpan alih-alih locale request. Ini penting untuk job dan antrean (queue), di mana bahasa dimiliki oleh data pengguna dan tidak ada request masuk untuk dibaca header-nya.

</Question>
<Question title="Bagaimana cara melokalkan pesan error API?">

Bungkus pesan dengan `t()` di titik tempat error dibuat. Locale request yang aktif akan menyelesaikannya, sehingga klien menerima pesan yang dapat langsung ditampilkan, dan frontend Anda tidak memerlukan katalog kode error paralel.

</Question>
<Question title="Apakah ini berfungsi dengan aplikasi Express yang sudah ada dan middleware lainnya?">

Ya. `express-intlayer` adalah middleware Express standar, sehingga dapat digabungkan dengan stack Anda yang sudah ada. Daftarkan sebelum route yang membaca konten, agar locale sudah ditentukan saat handler memanggil `t()` atau `getIntlayer()`.

</Question>
<Question title="Bagaimana cara menerjemahkan konten backend secara otomatis dengan AI?">

Jalankan `npx intlayer fill`, yang mengisi terjemahan yang hilang dengan LLM pilihan Anda menggunakan provider dan kunci API Anda sendiri. Tambahkan `--git-diff` untuk hanya menerjemahkan konten yang berubah di branch. Lihat [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md) dan [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md).

- [perintah fill](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/cli/fill.md)
- [integrasi CI/CD](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/CI_CD.md)

</Question>
<Question title="Apakah Intlayer mendukung bentuk jamak, gender, dan nilai interpolasi di server?">

Ya: [bentuk jamak](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md), [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md), kondisi, [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md) untuk nilai interpolasi, [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md) untuk isi email, dan [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md) untuk angka, tanggal, dan mata uang.

- [bentuk jamak](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/plurial.md)
- [konten berbasis gender](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/gender.md)
- [insertion](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/insertion.md)
- [Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/dictionary/markdown.md)
- [formatter](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/formatters.md)

</Question>
<Question title="Apakah saya mendapatkan autocompletion TypeScript di server?">

Ya. Intlayer menghasilkan tipe kamus Anda ke `./types/intlayer.d.ts`, sehingga kunci yang tidak ada menjadi error kompilasi, bukan string kosong saat runtime. Jalankan `npx intlayer test` di CI untuk menggagalkan build ketika sebuah locale yang dideklarasikan kekurangan konten.

</Question>
<Question title="Bisakah frontend dan backend berbagi konten yang sama?">

Ya, dan itulah pengaturan yang umum. `express-intlayer` bekerja bersama `react-intlayer`, `next-intlayer` dan `vite-intlayer` pada konten yang dideklarasikan yang sama, sehingga label yang digunakan baik dalam respons API maupun di halaman hanya dideklarasikan sekali. Lihat [cara kerja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/how_works_intlayer.md).

- [cara kerja Intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/how_works_intlayer.md)

</Question>
<Question title="Apakah Intlayer gratis dan open source?">

Ya, di bawah lisensi Apache 2.0, termasuk untuk penggunaan komersial. [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md) yang di-host adalah layanan berbayar opsional yang juga dapat [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md).

- [CMS](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/intlayer_CMS.md)
- [di-host sendiri](https://github.com/aymericzip/intlayer/blob/main/docs/docs/id/self_hosting.md)

</Question>

</FAQ>
